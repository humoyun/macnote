<template>
  <div
    class="note-folder"
    @click="selectFolder()"
    :class="{ 'active-folder': isCurrent }"
  >
    <div class="note-folder-content">
      <el-input
        v-if="folder.isNew || folder.onUpdate"
        ref="inputRef"
        :key="folder.id"
        @blur="onInputBlur"
        @change="onInputChange"
        @focus="onInputFocus"
        size="mini"
        autofocus
        placeholder="Folder name..."
        v-model="folder.title"
        maxlength="20"
        show-word-limit
      ></el-input>

      <div v-else>
        <i v-if="type==='folder'" class="el-icon-folder"></i>
        <i v-else class="el-icon-delete"></i>

        <span>{{ folder.title }}</span>
        <div class="folder-icons" v-if="type==='folder'">
          <i @click="editFolderName()" class="el-icon-edit"></i>
          <i @click="deleteFolder()" class="el-icon-delete"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { $api } from '@/core.js';

export default {
  props: {
    folder: {
      type: Object,
      default: () => {}
    },

    type: {
      type: String,
      default: 'active'
    }
  },

  computed: {
    isCurrent() {
      return this.folder.id === (this.memo.folder ? this.memo.folder.id : '');
    }
  },

  data() {
    return {
      memo: this.$store.state.main.memo,
      editor: this.$store.state.main.editor,
      done: false
    };
  },

  mounted() {
    if (this.$refs.inputRef) this.$refs.inputRef.focus();
  },

  methods: {

    // hasElementByTagname(parent, tag) {
    //   if (!parent) return;

    //   // eslint-disable-next-line no-restricted-syntax
    //   for (const node of Array.from(parent.children)) {
    //     // if (node.nodeName === tag.toUpperCase()) {
    //     //   console.log('__- ', node);
    //     //   return node;
    //     // }
    //     if (node.nodeName === tag.toUpperCase()) return node;
    //     this.hasElementByTagname(node, tag);
    //   }
    // },

    async selectFolder() {
      if (this.memo.note && this.memo.current !== 'trash') {
        await this.saveNote();
      }

      this.memo.setFolderById(this.folder.id);
    },

    async saveNote() {
      const expiredAt = (new Date(this.memo.note.expiredAt)).getTime();
      const payload = {
        content: this.editor.getHTML(),
        expiredAt,
        title: this.memo.note.title
      };

      await $api.updateMemoNote(this.memo.note.id, payload).then((resp) => {
        this.memo.addOrUpdateNote(resp);
        console.log('[NNOteFolder] note content saved from selected folder', resp);
      });
    },

    editFolderName() {
      this.folder.onUpdate = true;
    },

    async deleteFolder(arg) {
      console.log('>> ', arg);
      if (!this.folder.isNew) {
        try {
          const resp = await $api.deleteMemoFolder(this.folder.id);

          if (resp) {
            this.memo.removeFolder(this.folder.id);
            console.log('-- - -- - createMemoFolder: ', resp);
          }
        } catch (e) {
          console.error(e);
        }
      }
    },

    notify() {
      this.$notify({
        title: 'Empty Folder',
        message: 'Folder name cannot be empty',
        type: 'warning'
      });
      // if (e && e.target) {
      //   e.target.focus({ preventScroll: false });
      // }
    },

    onInputBlur(e) {
      console.log('blur change ');
      if (!this.done) {
        console.log('done false');
        if (this.folder.title === '') {
          this.notify(e);
        } else if (this.folder.isNew) {
          this.createUpdateFolder('create');

          this.folder.onUpdate = false;
          this.folder.isNew = false;
        }
      }
    },

    async onInputChange(e) {
      this.done = true;
      console.log('input change: ', e);
      if (this.folder.title === '') {
        this.notify(e);
      } else if (this.folder.isNew) {
        console.log('create Folder');
        await this.createUpdateFolder('create');
      } else if (this.folder.onUpdate) {
        console.log('update Folder');
        await this.createUpdateFolder('update');
      }
      this.done = false;
    },

    async createUpdateFolder(type) {
      try {
        if (type === 'create') {
          const resp = await $api.createMemoFolder(this.folder);
          if (resp) {
            Object.assign(this.folder, resp);
            this.folder.isNew = false;
            this.memo.addUpdateFolder(resp);
            console.log('-- - -- - createMemoFolder: ', resp);
          }
        } else if (type === 'update') {
          const resp = await $api.updateMemoFolder(this.folder.id, this.folder);
          if (resp) {
            Object.assign(this.folder, resp);
            this.folder.isNew = false;
            this.memo.addUpdateFolder(resp);
            console.log('-- - -- - memom fodler updated: ', resp);
          }
        }
      } catch (e) {
        console.error(e);
      }
    },

    onInputFocus(e) {
      console.log('Focus:  ', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.note-folder {
  width: 100%;
  padding: 4px 0;
  text-align: start;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.2s;

  .note-folder-content {
    padding: 1px;
    font-size: 12px;

    i {
      margin-left: 2px;
      opacity: 0.4;
    }

    span {
      margin-left: 2px;
    }

    .folder-icons {
      float: right;
      margin-right: 10px;
      font-size: 14px;
      transition: opacity 0.3s;

      i {
        opacity: 0;
        transition: opacity 0.3s;
      }
    }
  }
}

.note-folder:hover {
  background-color: rgb(218, 235, 252);

  .folder-icons {
    i {
      color: rgb(82, 79, 79);
      opacity: 1;
    }
  }
}

.active-folder {
  background-color: rgb(218, 235, 252);
}
</style>

<style lang="scss">
.note-folder-content {
  .el-input {
    input {
      height: 22px;
      line-height: 22px;
      border: none;
    }
  }
}
</style>

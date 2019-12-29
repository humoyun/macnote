<template>
  <div
    class="mc-note"
    @click="selectNote()"
    :class="{'active-note': currentNote}"
  >
    <div class="note-memo-header">
      <span class="note-memo_title">{{ note.title }}</span>
      <span
        class="note-memo_content-expires"
      >(expires {{ note.expiredAt | moment('YYYY.MM.DD') }})</span>
    </div>
    <div class="note-memo_content">
      <i class="el-icon-folder-opened"></i>
      <!-- <span>{{ noteDate() }} |</span> -->
      <span>{{ note.createdAt }} |</span>
      <span v-if="note.user">{{ note.user.username }}</span>
      <span v-else>{{ memo.user.username }}</span>
      <!-- <span>Samsung</span> -->
    </div>
  </div>
</template>

<script>
import { $api } from '@/core.js';

export default {
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      memo: this.$store.state.main.memo,
      editor: this.$store.state.main.editor
    };
  },

  computed: {
    currentNote() {
      return this.note.id === (this.$db.note ? this.$db.note.id : '');
    }
  },

  methods: {
    async selectNote() {
      if (this.$db.note && this.memo.current !== 'trash') {
        await this.saveNote();
      }

      // this.memo.note = this.note;
      // just selected note
      this.memo.setNoteById(this.note.id);
      // now note is different
      // this.editor.setContent(this.note.content);
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
        console.log('[NoteMemo]note content saved ', resp);
      });
    },

    noteDate() {
      const time = this.note.createdAt || new Date();
      return this.$moment(time).format('YYYY.MM.DD hh:mm A');
    }
  }
};
</script>

<style lang="scss" scoped>
.mc-note {
  width: 100%;
  height: 51px;
  padding: 10px;
  text-align: start;
  cursor: pointer;
  border-bottom: 1px solid rgb(219, 216, 216);
  transition: background-color 0.3s;

  .note-memo-header {
    display: flex;
    align-items: center;
    color: black;
  }

  &_title {
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &_content-expires {
    display: inline-block;
    margin-left: 4px;
    font-size: 11px;
    color: #606266;
  }

  &_content {
    padding: 1px;
    font-size: 12px;
    color: #606266;
  }
}

.note-memo:hover {
  background-color: rgba(231, 227, 227, 0.904);
}

.active-note {
  background-color: rgba(231, 227, 227, 0.904);
}
</style>

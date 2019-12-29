<template>
  <div class="mc-folders-container">
    <div class="mc-folders-header">
      <span>Folders</span>
    </div>

    <div class="mc-folders-list">
      <div
        v-for="folder of $db.folders"
        :key="folder.id"
        class="mc-folders-item"
        @click="selectFolder(folder.id)"
      >
        <div>
          <svg-icon icon-class="folder" />
          <span>{{ folder.name }}</span>
        </div>
      </div>
      <div key="mc-trash-folder" class="mc-folders-trash">
        <div>
          <svg-icon icon-class="garbage" />
          <span>Trash</span>
        </div>
      </div>
    </div>

    <div class="mc-folders-footer">
      <mc-button @click="logout()" type="info" plain>Logout</mc-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {
    console.log("======================");
    console.log(this.$db.folders);
  },

  methods: {
    selectFolder(id) {
      this.$db.setFolderById(id)
    },

    logout() {
      console.log("macnote logout");
      try {
        this.$firebase.logout(() => {
          console.log("-- callback from McFolders --");
        });
        // this is temp, it should return promise
        this.$router.push({ name: "login" });
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mc-folders-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 4;
  flex-direction: column;
  border-right: 1px solid rgb(230, 230, 236);
  background-color: #f2f2f2;

  .mc-folders-header {
    width: 100%;
    height: 40px;
    @include flex-centered;
  }

  .mc-folders-list {
    width: 100%;
    height: calc(100% - 40px - 40px);
    display: flex;
    flex-direction: column;

    .mc-folders-item {
      padding: 5px;
      cursor: pointer;
      transition: margin-left 0.3s, background-color 0.2s ease-out;

      &:hover {
        background-color: lighten($base-color, 60);
        margin-left: 2px;
      }

      div {
        margin-left: 10px;
      }
    }
  }

  .mc-folders-trash {
    padding: 5px;
    cursor: pointer;
    transition: margin-left 0.3s, background-color 0.2s ease-out;
    border-top: 1px solid #ccc;
    margin-top: 5px;

    &:hover {
      background-color: lighten($base-color, 60);
      margin-left: 2px;
    }

    div {
      margin-left: 10px;
    }
  }

  .mc-folders-footer {
    height: 40px;
    border-top: 1px solid rgb(233, 229, 229);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<template>
  <div class="mc-folders-container">
    <div class="mc-folders-header">Folders</div>
    <div class="mc-folders-list">
      <div v-for="item of local" :key="item.id" class="mc-folders-item">
        <svg-icon icon-class="folder" />
        <div>{{ item.name }}</div>
      </div>
      <div></div>
      <div key="mc-trash-folder" class="mc-folders-trash">
        <div>Trash</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        firebase: this.$store.state.firebase,
        local: [
          { name: 'meetups', id: 123 },
          { name: 'awesome', id: 223 },
          { name: 'courses', id: 323 },
          { name: 'brainstrominng', id: 523 },
        ]
      }
    }
  }
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
    border-bottom: 1px solid #ccc;
  }

  .mc-folders-list {
    width: 100%;
    height: calc(100% - 50px);
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

    &:hover {
      background-color: lighten($base-color, 60);
      margin-left: 2px;
    }

    div {
      margin-left: 10px;
    }
  }
}
</style>
<template>
  <div id="macnote-app">
    <div class="mc-header">
      <span>Macnote App</span>
      <span>Currently under development</span>
    </div>
    <div class="mc-container">
      <div class="mc-app-body">
        <div></div>
        <folders class="mc-body-folders"></folders>
        <div class="mc-body-notes"></div>
        <div class="mc-body-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Folders from './McFolders.vue';
import Firebase from '@/models/Firebase.js';

export default {
  data() {
    return {
      visible: false,

    }
  },

  async created() {
    const store = new Firebase();
    await store.init()
    window.fstore = store;
    
    this.$store.commit('setFirebase', store);
  },

  components: {
    Folders
  },

  methods: {
    openModal() {
      // this.visible = true;
    }
  }
}
</script>

<style lang="scss">
#macnote-app {
  @include flex-centered;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: lighten($base-color, 10%); 

  .mc-header {
    padding-bottom: 10px;
  }

  .mc-header > span {
    display: block;
    color: $grey-color;
  }

  .mc-header > span:nth-child(1) {
    font-size: 32px;
    color: white;
  }

  .mc-container {
    display: flex;
    flex-direction: column;
    width: 95vw;
    min-width: 600px;
    height: 85vh;
    background-color: rgb(250, 249, 249);
    border-radius: 4px;
    box-shadow: 0 3px 6px 3px rgba(0,0,0,0.2);
    transition: all 0.3s;

    .mc-app-body {
      display: flex;
      flex: 15;

      // .mc-body-folders {

      // }

      .mc-body-notes {
        display: flex;
        flex: 5;
        border-right: 1px solid rgb(230, 230, 236);
      }

      .mc-body-content {
        display: flex;
        flex: 15;
      }
    }
  }

  .mc-container:hover {
    box-shadow: 0 5px 10px 5px rgba(0,0,0,0.2);
  }
}

@media only screen and (max-width: 1000px) {
  .mc-body-folders {
    flex: 0;
  }

  .mc-body-notes {
    flex: 2;
  }
}
</style>

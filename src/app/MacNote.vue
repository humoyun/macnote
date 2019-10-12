<template>
  <div id="macnote-app">
    <div class="mc-header">
      <span>Macnote App</span>
      <span>Currently under development</span>
    </div>
    <div class="mc-container">
      <div class="mc-app-header"></div>
      <div class="mc-app-body">
        <div class="mc-body-folders"></div>
        <div class="mc-body-notes"></div>
        <div class="mc-body-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },

  components: {
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
  width: 100%;
  height: 100%;
  background-color: $base-color;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  
  flex-direction: column;

  .mc-header {
    padding: 20px;
    margin-top: -30px;
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
    width: 80vw;
    min-width: 600px;
    height: 80vh;
    background-color: rgb(250, 249, 249);
    border-radius: 4px;
    box-shadow: 0 3px 6px 3px rgba(0,0,0,0.2);
    transition: all 0.3s;

    .mc-app-header {
      display: flex;
      flex: 1;
      border-bottom: 1px solid rgb(230, 225, 225);
    }

    .mc-app-body {
      display: flex;
      flex: 13;

      .mc-body-folders {
        display: flex;
        flex: 2;
        border-right: 1px solid rgb(230, 230, 236);
      }

      .mc-body-notes {
        display: flex;
        flex: 3;
        border-right: 1px solid rgb(230, 230, 236);
      }

      .mc-body-content {
        display: flex;
        flex: 5;
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

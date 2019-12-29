<template>
  <div id="mc-header">
    <div class="user-space">
      <div class="user-profile-img">
        <!-- <img src="" alt=""> -->
        <svg-icon icon-class="user" size="32"></svg-icon>
      </div>
      <div>Humoyun Ahmed</div>
    </div>

    <div class="control-space">
      <mc-button
        type="primary"
        @click="createNote()"
        :disabled="canDelete()"
        circle
      >
        <svg-icon icon-class="edit" />
      </mc-button>
      <mc-button
        style="margin-left: 10px;"
        type="danger"
        @click="createNote()"
        :disabled="canCreateNote()"
        circle
      >
        <svg-icon icon-class="trash" />
      </mc-button>
      <!-- <div class="header-icons">
        <el-button
          :disabled="canCreateNote"
          @click="createNote()"
          icon="el-icon-edit"
          circle
        ></el-button>
        <el-button
          :disabled="canDelete"
          @click="deleteNote()"
          icon="el-icon-delete"
          circle
        ></el-button>
      </div>
      <div class="header-search">
        <el-input
          size="mini"
          placeholder="Search for notes..."
          v-model="search"
          @input="handleSearch"
          @focus="handleFocus"
        ></el-input>
      </div> -->
    </div>

    <div class="editor-space"></div>
  </div>
</template>

<script>
export default {
  name: "",

  data() {
    return {};
  },

  methods: {
    canCreateNote() {
      return true;
    },

    canDelete() {
      return false;
    },

    createNote() {
      console.log("createNote");
    },

    deleteNote() {}
  }
};
</script>

<style lang="scss" scoped>
#mc-header {
  width: 100%;
  height: 50px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #ccc;

  @include flex-centered;

  .user-space {
    height: 100%;
    @include flex-centered;
    flex: 4;

    .user-profile-img {
      @include flex-centered;
      width: 50px;
      height: 100%;
    }
  }

  .control-space {
    @include flex-centered;
    height: 100%;
    flex: 6;
  }

  .editor-space {
    height: 100%;
    flex: 14;
  }
}
</style>

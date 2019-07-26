<template>
  <div id="mac-note">
    <div class="mc-open-btn">
      <mc-button @click="openModal()">Open</mc-button>
    </div>

    <modal v-model="visible"></modal>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue';
import McButton from '../components/Button.vue'

export default {
  data() {
    return {
      visible: false
    }
  },

  components: {
    Modal,
    McButton
  },

  methods: {
    openModal() {
      // this.visible = true;
    }
  }
}
</script>

<style>
#mac-note {
  width: 100%;
  height: 100vh;
  background-color: rgb(7, 121, 141);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mc-open-btn {
  width: 200px;
}
</style>

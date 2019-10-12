<template>
  <div id="app">
    <!-- <mac-note></mac-note> -->
    <login></login>
  </div>
</template>

<script>
import MacNote from '@/app/MacNote.vue'
import Login from '@/app/Login.vue'

export default {
  name: 'app',
  components: {
    MacNote,
    Login
  }
}
</script>

<style>
html, body {
  margin: 0;
}

#app {
  width: 100%;
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <div id="app">
    <mac-note></mac-note>
  </div>
</template>

<script>
import MacNote from '@/app/MacNote.vue'

export default {
  name: 'app',
  components: {
    MacNote
  }
}
</script>

<style>
html, body {
  margin: 0;
}

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

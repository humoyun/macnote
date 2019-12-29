<template>
  <div id="mc-notes-container">
    <div
      v-if="$db.folder || ($db.folder && $db.folder.notes.length > 0)"
      class="note-list"
    >
      <!-- <note v-for="note in $db.folder.notes" :note="note" :key="note.id"></note> -->
      <div
        v-for="note in $db.folder.notes"
        :key="note.id"
        class="mc-note"
      >{{ note }}</div>
    </div>

    <div v-else>
      <div class="empty-folder">
        <h2>Empty Folder</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Note from './Note.vue';

export default {
  name: 'note',

  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
#mc-notes-container {

}
</style>
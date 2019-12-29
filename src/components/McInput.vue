<template>
  <div class="mc-input">
    <input type="text" :value="value" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },

  data() {
    return {};
  },

  methods: {
    change() {
      this.$emit("change", this.value);
    }
  }
};
</script>

<style lang="scss">
.mc-input {
  input {
    padding: 5px 10px;
  }
}
</style>

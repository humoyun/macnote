<template>
  <button
    class="mc-button"
    @click="handleClick"
    :disabled="disabled || loading"
    :class="[
      type ? 'mc-button--' + type : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-circle': circle
      }
    ]"
  >
    <!-- if loading is true show loading icon on the center -->
    <svg-icon icon-class="loading" v-if="loading"></svg-icon>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "McButton",

  props: {
    type: {
      type: String,
      default: "default" // primary, success, error, info, warning
    },

    circle: {
      type: Boolean
    },

    plain: {
      type: Boolean
    },

    disabled: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    itemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },

    size() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },

  data() {
    return {};
  },

  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>

<style lang="scss">
.mc-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  // background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  font-size: 14px;

  &.is-circle {
    padding: 8px 8px;
    border-radius: 50%;
  }

  &.is-plain {
    padding: 6px 12px;
    border-radius: 4px;
  }

  &.mc-button--primary {
    background: $primary-color;
    color: #fff;
    border-color: $primary-color;

    &:hover {
      background: lighten($primary-color, 10%);
      border-color: lighten($primary-color, 8%);
    }
  }

  &.mc-button--success {
    background: #67c23a;
    color: #fff;
    border-color: #67c23a;

    &:hover {
      background: lighten(#67c23a, 10%);
      border-color: lighten(#67c23a, 8%);
    }
  }

  &.mc-button--danger {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;

    &:hover {
      background: lighten(#f56c6c, 10%);
      border-color: lighten(#f56c6c, 8%);
    }
  }

  &.mc-button--info {
    background: #c0c1c4;
    border-color: #c0c1c4;
    color: #fff;

    &:hover {
      background: lighten(#c0c1c4, 10%);
      border-color: lighten(#c0c1c4, 8%);
    }
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // &:focus {
  //   background: #f56c6c;
  //   border-color: #f56c6c;
  //   color: #fff;
  // }
}
</style>

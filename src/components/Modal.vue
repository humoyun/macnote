<template>
  <div id="mc-modal-container">
    <transition name="fade-in">
      <div class="mc-modal-mask" v-show="visible"></div>
    </transition>

    <div class="mc-modal-wrapper" v-show="visible">
      <transition name="fade-in">
        <div class="mc-modal">
          <!-- <div :class="[prefixCls + '-header']">
            <slot></slot>
          </div>
          <div :class="[prefixCls + '-body']">
            <slot></slot>
          </div>
          <div :class="[prefixCls + '-footer']">
            <slot></slot>
          </div>-->
          <h1>body</h1>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '60'
    },
    padding: {
      type: String,
      default: '10'
    }
  },

  watch: {
    value(val) {
      this.visible = val;
    }
  },

  data() {
    return {
      visible: this.value,
      prefixCls: 'mc'
    }
  }
}
</script>

<style>
#mac-modal {
}

.mc-modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.mc-modal-wrapper {
  position: absolute;
  top: 30%;
  left: 50%;
  width: 800px;
  height: 400px;
  transform: translate(-50%, -30%);
  background-color: white;
  border-radius: 3px;
}
</style>

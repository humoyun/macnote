<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="mc-svg-external-icon mc-svg-icon"
    v-on="$listeners"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from '@/utils/Utils';

export default {
  name: 'svg-icon',

  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },

  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },

    iconName() {
      return `#mc-icon-${this.iconClass}`
    },
    
    svgClass() {
      if (this.className) {
        return 'mc-svg-icon ' + this.className
      } else {
        return 'mc-svg-icon'
      }
    },

    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.mc-svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.mc-svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
<template>
  <div @click="clickBtn()" class="mc-button">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    clickBtn() {
      // console.log('clickBtn')
      this.$emit('click');
    }
  }
}
</script>


<style lang="scss">
/* .mc-button {
  padding: 8px 16px;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
} */
.mc-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
}

.mc-button:focus {
  background: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}

span {
  /* line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;   */
}

</style>

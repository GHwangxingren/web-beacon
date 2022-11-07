<!--
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2021-08-13 11:43:45
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-24 19:00:45
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/App.vue
-->
<template>
  <div id="app">
    <Application></Application>
  </div>
</template>
<script>
import Application from 'wb@/components/layouts/index.vue';
export default {
  name: 'app',
  components: {
    Application
  }
};
</script>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  background: #eff1f4;
  box-sizing: border-box;
  overflow: auto;
}
</style>

<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-05-30 16:52:25
 * @FilePath: /bus-boss-refact-view/src/components/layouts/src/layoutHeader/LayoutHeaderSearch.vue
-->
<template>
  <div class="flex ai-center">
    <icon-class padding-left="5px" icon-class="icon-C-C5" font="24" color="#7e84a3"> </icon-class>
    <span class="pl-5" :font="layoutSetting.layout.value == '0' ? '14' : ''">{{ layoutSetting.layout.value == '0' ? 'Search...' : '' }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LayoutHeaderSearch',
  computed: {
    ...mapGetters(['layoutSetting'])
  }
};
</script>

<style scoped></style>

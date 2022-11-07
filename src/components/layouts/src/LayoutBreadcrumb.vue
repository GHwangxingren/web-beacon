<!--
 * @Author: 段丽军
 * @Date: 2021-11-25 10:40:07
 * @LastEditTime: 2022-06-30 11:05:56
 * @LastEditors: 李大玄
 * @Description:
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/components/layouts/src/LayoutBreadcrumb.vue
-->
<template>
  <div>
    <div class="breadcrumb" font="18" font-weight="400">{{breadcrumb.menuItem}}</div>
    <el-breadcrumb separator="/" class="mt-5">
        <el-breadcrumb-item v-for="(parent,index) in breadcrumb.menuModules" :key="index+'breadcrumb'">{{parent}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "LayoutBreadcrumb",
  computed: {
    breadcrumb() {
      return this.getMenuItem(this.$store.state.layoutMenus.nomalMenu, this.$route.name, []) || { menuModules: ["--"], menuItem: "--" };
    }
  },
  data() {
    return {
      value: "",
      drawer: false
    };
  },
  methods: {
    getMenuItem(menuTree, menuCode, menuModules) {
      if(!menuTree || menuTree.length === 0) {
        return;
      }
      let result;
      for (let i = 0; i < menuTree.length; i++) {
        const item = menuTree[i];
        if(item.code === menuCode) {
          menuModules.unshift(item.name);
          result = item.name;
          break;
        }
        const childrenItem = this.getMenuItem(item.children, menuCode, menuModules);
        if(childrenItem && childrenItem.menuItem) {
          menuModules.unshift(item.name);
          result = childrenItem.menuItem;
          break;
        }
      }
      return { menuModules, menuItem: result };
    }
  }
};
</script>

<style lang="scss" scoped>
  .breadcrumb{
    color: var(--layoutBreadcrumbCol);
  }

  ::v-deep .el-breadcrumb__inner,
  ::v-deep .el-breadcrumb__separator {
    font-size: 12px;
    font-weight: 400;
    color: $-color-7D8DBF !important;
  }
</style>

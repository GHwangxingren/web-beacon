<template>
  <el-menu
    :default-active="defaultActiveMenu"
    :default-openeds="defaultOpeneds"
    :unique-opened="true"
    class="pt-22"
    :collapse-transition="false"
    @select="handleSelect"
    :collapse="isCollapse"
  >
    <LayoutSideItem :menuData="menuList" :is-collapse="isCollapse" :class="isCollapse ? 'el-menu--collapse' : ''" />
  </el-menu>
</template>

<script>
import LayoutSideItem from './LayoutSideItem.vue';
import findData from 'wb@/utils/findData';
import { mapGetters } from 'vuex';

export default {
  name: 'LayoutSide',
  props: ['isCollapse'],
  components: {
    LayoutSideItem
  },
  computed: {
    ...mapGetters(['breadcrumb', 'routeView', 'nomalMenu', 'sideMenu', 'defaultActiveMenu', 'layoutTag', 'layoutSetting', 'defaultActiveHorizontalMenu'])
  },
  watch: {
    sideMenu: {
      handler(newVal) {
        this.menuList = findData.levelFun(this.dufFun(newVal), this.layoutSetting.layout.value);
      },
      deep: true
    },
    'layoutSetting.layout': {
      handler(newVal) {
        this.getLayout(newVal.value);
      },
      deep: true
    },
    'layoutSetting.tag': {
      handler(v) {
        this.$store.dispatch('setLayoutTag', '');
        if (v.value === '1') {
          let obj = this.breadcrumb.find((item) => item.id === this.defaultActiveMenu);
          this.$store.dispatch('setLayoutTag', obj);
        }
      },
      deep: true
    }
  },
  data() {
    return {
      menuList: [],
      defaultOpeneds: []
    };
  },
  methods: {
    dufFun(setHomeSideMenu) {
      let other = setHomeSideMenu.filter((item) => {
        return item.disabled !== true;
      });
      return other;
    },
    handleSelect(key) {
      let dispatch = findData.findParentArr(key, this.menuList);
      if (dispatch.length > 0) {
        this.$store.dispatch('setBreadcrumb', dispatch);
      } else {
        let obj = this.layoutTag.find((item) => {
          return item.id === defaultActive;
        });
        this.$store.dispatch('setBreadcrumb', [obj]);
      }
      let obj = findData.getParentId(this.menuList, key);
      this.$store.dispatch('setDefaultActiveHorizontalMenu', dispatch[0].countId);
      this.$store.dispatch('setDefaultActiveMenu', key);
      this.defaultOpeneds = dispatch.map((item) => {
        return item.id;
      });
      this.$store.dispatch('setLayoutTag', obj);
      this.$router.push(obj.path);
    },
    getLayout(value) {
      if (value === '0') {
        this.menuList = findData.levelFun(JSON.parse(JSON.stringify(this.nomalMenu)), value);
      } else {
        let dispatch = findData.findParentArr(this.defaultActiveMenu, this.nomalMenu);
        if (dispatch.length > 0) {
          this.menuList = findData.levelFun(this.dufFun(this.sideMenu), value);
        } else {
          let children = this.nomalMenu[0].children ? this.nomalMenu[0].children : [this.nomalMenu[0]];
          this.menuList = findData.levelFun(this.dufFun(children), value);
        }
      }
      // this.dispatchBreadcrumb(this.defaultActiveMenu, this.menuList);
    }
  },
  mounted() {
    this.getLayout(this.layoutSetting.layout.value);
  }
};
</script>
<style lang="scss" scoped>
.el-menu {
  border-right: none;
  box-shadow: 2px 4px 4px 0px rgba(21, 34, 50, 0.08);
  background-color: var(--layoutSideMenuBg);
  z-index: 2;
  @include hoverScrollBarStyle($-color-DBE1F2);

  .isCollapseMore {
    bottom: 77px;
    left: 50%;
    margin-left: -13px;
    background: #f9f8fd;
  }
}
</style>

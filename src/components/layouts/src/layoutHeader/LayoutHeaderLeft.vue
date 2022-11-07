<template>
  <div class="layoutMenu">
    <el-menu :collapse-transition="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="menu in menuList" :index="menu.countId" :ref="'tabs'" class="flex ai-center" :key="menu.countId">
        <icon-class :icon-class="menu.icon" class="mr-5" font="26" color="#7e84a3" />
        <span class="menuName">{{ menu.name }}</span>
      </el-menu-item>
      <div :style="styleObj" class="positon-a styleBj"></div>
    </el-menu>
  </div>
</template>

<script>
import findData from 'wb@/utils/findData';
import { mapGetters } from 'vuex';

export default {
  name: 'LayoutHeaderLeft',
  data() {
    return {
      activeIndex: '0',
      menuList: [],
      styleObj: {}
    };
  },
  computed: {
    ...mapGetters(['defaultActiveMenu', 'defaultActiveHorizontalMenu', 'layoutSetting', 'easyDetail', 'authCodeArr', 'layoutTag', 'userMsg', 'nomalMenu'])
  },
  watch: {
    defaultActiveHorizontalMenu: {
      handler(newVal) {
        this.activeIndex = newVal;
        if (newVal !== this.easyDetail[0].id) {
          this.setIndex(Number(newVal));
          this.comFun(newVal);
        } else {
          this.styleObj = {
            width: '0px'
          };
        }
      },
      deep: true
    }
  },
  created() {
    this.getMenu(this.nomalMenu);
    this.activeIndex = this.defaultActiveHorizontalMenu;
  },
  methods: {
    fifterMenuAuthCode(treeData = [], map = []) {
      for (let i = treeData.length; i > 0; i--) {
        if (map.indexOf(treeData[i - 1].authCode) === -1) {
          treeData.splice(i - 1, 1);
        } else if (treeData[i - 1].children) {
          this.fifterMenuAuthCode(treeData[i - 1].children, map);
        }
      }
      return treeData;
    },
    getMenu(nomalMenu) {
      // this.result = findData.treeLevel(nomalMenu);
      // let tempArray = this.authCodeArr.map(item => {
      //     return item.name;
      // })
      // let tempArray1 = this.authCodeArr.map(item => {
      //     return item.authority;
      // })
      // if (tempArray.indexOf(this.userMsg.userId) == -1) {
      //     this.menuList = this.fifterMenuAuthCode(nomalMenu, tempArray1)
      // } else {
      //     this.menuList = nomalMenu;
      // }
      this.menuList = nomalMenu;

      return this.menuList;
    },
    handleSelect(key) {
      this.setIndex(key);
      this.comFun(key);
      this.$store.dispatch('setDefaultActiveHorizontalMenu', key);
      let obj = this.nomalMenu.find((item) => {
        return item.countId === key;
      });
      this.$store.dispatch('setDefaultActiveMenu', findData.getDataId([obj]).id);
    },
    dispatchBreadcrumb(defaultActive, menuList) {
      let dispatch = findData.findParentArr(defaultActive, menuList);
      if (dispatch.length > 0) {
        this.$store.dispatch('setBreadcrumb', dispatch);
      } else {
        let obj = this.layoutTag.find((item) => {
          return item.id === defaultActive;
        });
        this.$store.dispatch('setBreadcrumb', [obj]);
      }
    },
    comFun(key) {
      let obj = this.nomalMenu.find((item) => {
        return item.countId === key;
      });
      if (this.layoutSetting.layout.value === '1') {
        let child = findData.getDataId([obj]);
        let objKey = findData.getParentId(this.menuList, this.defaultActiveMenu);
        if (child.id === this.defaultActiveMenu) {
          this.$store.dispatch('setLayoutTag', child);
          this.$router.push(child.path);
        } else {
          objKey ? this.$router.push(objKey.path) : '';
        }
        this.$store.dispatch('setSideMenu', obj.children ? obj.children : [obj]);
        this.dispatchBreadcrumb(this.defaultActiveMenu, this.menuList);
      }
    },
    setIndex(val) {
      this.activeIndex = val + '';
      this.styleObj = {
        height: '2px',
        width: this.$refs.tabs[val].$el.offsetWidth + 'px',
        'margin-left': this.$refs.tabs[val].$el.offsetLeft + 'px',
        transition: 'all 0.3s linear',
        bottom: '0px',
        position: 'absolute'
      };
    }
  },

  mounted() {
    if (this.activeIndex !== this.easyDetail[0].id) {
      Promise.all([this.setIndex(Number(this.activeIndex)), this.comFun(this.activeIndex)]);
    }
  }
};
</script>

<style lang="scss" scoped>
.layoutMenu {
  ::v-deep .el-menu {
    background: #ffffff;
    border-bottom: none;
  }

  .el-menu.el-menu--horizontal {
    border-bottom: 0px solid transparent;
  }

  .el-menu--horizontal > .el-menu-item {
    height: 67px;
    line-height: 67px;

    &:focus,
    &:hover {
      background: none;
    }

    i,
    .menuName {
      color: #7e84a3 !important;
    }

    &.is-active i,
    &.is-active .menuName,
    &:hover i,
    &:hover .menuName {
      color: #6359ca !important;
    }

    &.is-active .menuName,
    &:hover .menuName {
      font-weight: 600;
    }

    &.is-active {
      border-bottom: 0px solid transparent;
    }
  }

  .styleBj {
    background: #6359ca;
  }
}
</style>

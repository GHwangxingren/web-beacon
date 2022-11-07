<template>
  <div class="layout flex jc-between position-r" height="100%">
    <el-container class="overflow-y-a layout-container position-a" :style="styleObj" width="100%" height="100%">
      <el-aside class="position-r overflow-i layout-elaside" :width="isCollapseShow ? '65px' : '235px'">
        <div class="br-1 layout-aside">
          <div class="h-68 layout-aside-box" width="100%">
            <div :class="['layout-aside-boxIcon position-r', 'h-66 flex ai-center', 'pl-15', isCollapse ? 'w-48' : 'w-219']">
              <icon-class icon-class="icon-A-A1" font="28" color="var(--layoutBeacon)" />
              <div align="center" :class="['position-a mt-5', isCollapse ? '' : 'pl-12']" v-if="!isCollapse">
                <div font-weight="600" class="w-95" font="18">{{appName}}</div>
                <div font-weight="600" font="12" style="transform: scale(0.51); margin-top: -4px">EASYLIAO TECHNOLOGY</div>
              </div>
            </div>
          </div>
          <LayoutSide class="overflow-y-a overflow-x-h layout-menu" :isCollapse="isCollapse" height="100%" />
        </div>
        <!-- 折叠按钮 -->
        <div class="layout-aside-collapse position-a" @click="collapseChage">
          <div class="w-27 h-27 flex jc-center ai-center layout-aside-collapseBtn">
            <el-button round size="mini"><i font-weight="600" :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i> </el-button>
          </div>
        </div>
      </el-aside>
      <el-main class="p-0 position-r overflow-h" height="100%">
        <el-header class="layout-nav h-68 position-a" width="100%">
          <LayoutHeader @client="clientFun" @setting="settingFun" />
        </el-header>
        <layout-tag
          v-model="defaultValue"
          :tags-list="tagsList"
          @tabClick="tabClick"
          @closeAll="closeAll"
          @closeCru="closeCru"
          @lrClose="lrClose"
          v-if="layoutSetting.tag.value == '1'"
          :class="layoutSetting.tag.value == '1' ? 'mt-68' : ''"
          :style="layoutSetting.tag.value == '1' ? 'border-top: 1px solid rgba(0, 0, 0, 0.1);z-index:1' : ''"
        ></layout-tag>
        <div
          id="layout-main"
          :class="['layout-main plr-24 pb-24 overflow-a position-r pt-32', layoutSetting.tag.value == '0' ? 'mt-68' : '']"
          :style="layoutSetting.tag.value == '1' ? 'height: calc(100% - 107px)' : 'height: calc(100% - 68px)'"
        >
          <LayoutBreadcrumb class="mb-30" />
          <div class="layout-routeView" width="100%" height="100%" v-loading="routeView">
            <transition name="left-to-right" mode="out-in" appear>
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
            </transition>
            <transition name="left-to-right" mode="out-in" appear>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
          </div>
        </div>
        <el-backtop target=".layout-main" :bottom="100">
          <div class="el-icon-caret-top" style="border-radius: 50%"></div>
        </el-backtop>
      </el-main>
    </el-container>

    <e-drawer-sp
      :visible.sync="settingLayout"
      title="系统主题设置"
      titleIconBg="#6359ca"
      titleIcon="icon-D1-A6"
      footerBtnPosition="right"
      :isFooter="false"
      :wrapperClosable="true"
      :contentPadding="false"
      append-to-body
      size="396px"
    >
      <LayoutSetting></LayoutSetting>
    </e-drawer-sp>
  </div>
</template>
<script>
import utils from "wb@/utils";
import colorSetting from "wb@/utils/layoutColorSetting";
const vueFiles = require.context("./src", false, /\.vue$/);
import LayoutHeader from "./src/layoutHeader/index";
import LayoutSetting from "./src/layoutSetting/index";
import { mapActions, mapGetters } from "vuex";
import layoutTag from "wb@/mixins/layoutTag";
import LayoutTag from "./src/LayoutTag";

export default {
  name: "Layout",
  mixins: [layoutTag],
  computed: {
    ...mapGetters(["routeView", "nomalMenu", "defaultActiveMenu", "layoutSetting", "layoutTag", "easyDetail"])
  },

  data() {
    return {
      isCollapse: false,
      isCollapseShow: false,
      client: true,
      clientIsShow: false,
      settingLayout: false,
      styleObj: {},
      asideObj: {},
      appName: ''
    };
  },
  components: {
    LayoutTag,
    LayoutHeader,
    LayoutSetting,
    // Dra,
    ...utils.readFile(vueFiles)
  },
  methods: {
    ...mapActions(["setMesslist"]),
    // 侧边栏折叠
    collapseChage() {
      this.isCollapseShow = !this.isCollapseShow;
      if (this.isCollapseShow) {
        setTimeout(() => {
          this.isCollapse = !this.isCollapse;
        }, 300);
      } else {
        this.isCollapse = !this.isCollapse;
      }
    },
    settingFun(v) {
      this.settingLayout = v;
    },
    // 侧边栏折叠
    clientFun(v) {
      this.clientIsShow = v;
      if (this.clientIsShow) {
        this.styleObj = {
          width: "calc(100% - 250px)"
        };
      } else {
        this.styleObj = {
          width: "100%"
        };
      }
    },
    comSetColor(value) {
      // 初始化主题色和布局
      colorSetting.setLayoutColor(value);
      colorSetting.isThemeLayout(this.layoutSetting.themeLayout.value, value);
      this.setMesslist(); //消息通知
    }
  },
  mounted() {
    this.appName = this.$store.state.appConfig.appName;
    // if (this.layoutSetting.color.value !== '') {
    //   this.comSetColor(this.layoutSetting.color.value);
    // } else {
    //   this.comSetColor(this.layoutSetting.color.pickerColor);
    // }
  }
};
</script>

<style lang="scss" scoped>
.layout-main {
  box-sizing: border-box;
  // @include hoverScrollBarStyle($-color-DBE1F2);
}

.layout-container {
  transition: all 0.3s linear;
}

.layout-elaside {
  transition: all 0.3s linear;
  height: calc(100% - 30px);
}

.left-to-right-enter {
  opacity: 0;
  margin-left: -50px;
  /*
        transform: translateX(-30px);
*/
}

.left-to-right-enter-active,
.left-to-right-leave-active {
  transition: all 0.6s;
}

.left-to-right-leave-to {
  opacity: 0;
  margin-left: 50px;
  /*transform: translateX(30px);*/
}

.layoutTag {
  position: absolute;
  z-index: 1;
  top: 68px;
}

@import '~@scss/home/layouts';
</style>

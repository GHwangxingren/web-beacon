<template>
  <div class="tags-el" ref="tags">
    <el-tabs
      v-model="defaultValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="tabClick"
    >
      <el-tab-pane
        v-for="item in tagsList"
        :key="item.id"
        :label="item.name"
        :name="item.id"
      />
    </el-tabs>
    <div class="tags-close-box">
      <!--            <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">-->
      <!--                -->
      <!--                <el-button size="mini" font="16" type="text" @click="loadFun" class="el-icon-refresh"/>-->
      <!--            </el-tooltip>-->
      <el-tooltip class="item" effect="dark" content="设置" placement="bottom">
        <el-dropdown @command="handleTags" trigger="click">
          <!--                    <el-button size="mini" type="text">-->
          <!--                        <i class="icon-D1-B2  el-icon&#45;&#45;right"/>-->
          <!--                    </el-button>-->

          <icon-class
            class="cursor-p"
            icon-class="icon-D1-B2"
            font="24"
            :color="'#7E84A3'"
          />
          <el-dropdown-menu size="small" slot="dropdown" class="tags">
            <el-dropdown-item
              v-for="item in dropdownArr"
              :key="item.command"
              :icon="item.icon"
              :command="item.command"
              >{{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default() {
        return "";
      }
    },
    tagsList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    defaultValue: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("input", value);
      }
    }
  },
  data() {
    return {
      dropdownArr: [
        { command: "l", name: "关闭左侧", icon: "el-icon-back" },
        { command: "r", name: "关闭右侧", icon: "el-icon-right" },
        { command: "c", name: "关闭当前", icon: "el-icon-close" },
        { command: "o", name: "关闭其他", icon: "el-icon-files" },
        { command: "a", name: "关闭所有", icon: "el-icon-minus" }
      ]
    };
  },
  methods: {
    removeTab(v) {
      this.closeCru(v);
    },
    tabClick(v) {
      this.$emit("tabClick", v.name);
    },
    // 关闭全部标签
    closeAll() {
      this.$emit("closeAll", "");
    },
    // 关闭其他标签
    closeOther() {
      this.closeAll();
    },
    // 关闭当前标签
    closeCru(v) {
      this.$emit("closeCru", v);
    },
    loadFun() {
      this.$store.dispatch("setRouteView", true);
      this.$nextTick(() => {
        setTimeout(() => {
          this.$store.dispatch("setRouteView", false);
        }, 1000);
      });
    },
    comFun(index) {
      if (index >= 0) {
        this.$emit("lrClose", index);
      }
    },
    handleTags(command) {
      if (command === "o") {
        this.closeOther();
      } else if (command === "c") {
        this.closeCru(this.defaultValue);
      } else if (command === "a") {
        this.closeAll();
      } else if (command === "l") {
        let indexL = this.tagsList.findIndex(
          (item) => item.id === this.defaultValue
        );
        this.comFun(indexL - 1);
      } else if (command === "r") {
        let indexR = this.tagsList.findIndex(
          (item) => item.id === this.defaultValue
        );
        this.comFun(indexR + 1);
      }
    }
  }
};
</script>

<style lang="scss">
.tags.el-popper[x-placement^="bottom"] .popper__arrow {
  display: none !important;
}

.tags.el-popper[x-placement^="bottom"] {
  margin-top: 18px !important;
}

.tags.el-popper {
  top: 88px !important;
}
</style>
<style lang="scss" scoped>
.tags-el {
  position: relative;
  height: 30px;
  line-height: 27px;
  overflow: hidden;
  padding: 3px 55px 5px 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #ffffff;
  box-shadow: 0px 4px 4px 0px rgba(21, 34, 50, 0.08);

  ::v-deep .el-tabs--card > .el-tabs__header,
  ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }

  ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
    border-left: 1px solid #e4e7ed;
  }

  ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item {
    border-bottom: 1px solid #e4e7ed;
    outline: none;
  }

  ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom: 1px solid #e4e7ed;
    outline: none;
    background: #f1f4fa;
    color: #344563 !important;
  }

  ::v-deep .el-tabs__item {
    height: 24px;
    line-height: 21px;
    margin-left: 5px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    font-size: 12px;

    &:hover {
      background: #f1f4fa;
      color: #344563;
    }

    &:hover > .el-icon-close,
    .el-icon-close:hover {
      background-color: #7d8dbf;
      /*
                color: $-color-ffffff;
*/
      color: #ffffff;
    }
  }

  ::v-deep .is-active {
    .el-icon-close,
    .el-icon-close:hover {
      /*
                color: $-color-ffffff;
*/
      color: #ffffff;
      background-color: #7d8dbf;
    }

    &:focus {
      border-color: #e4e7ed;
    }
  }

  ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item .el-icon-close {
    width: 14px;
    height: 14px;
    line-height: 14px;
  }

  ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item {
    transition: none;
  }

  ::v-deep .el-tabs__nav-next,
  ::v-deep .el-tabs__nav-prev {
    line-height: 30px;
  }

  ::v-deep .el-tabs__item:focus.is-active.is-focus:not(:active) {
    box-shadow: none;
  }

  ::v-deep .el-tabs--top.el-tabs--border-card > .el-tabs__header .el-tabs__item,
  ::v-deep.el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item,
  ::v-deep .el-tabs--top .el-tabs--left > .el-tabs__header .el-tabs__item,
  ::v-deep .el-tabs--top .el-tabs--right > .el-tabs__header .el-tabs__item,
  ::v-deep
    .el-tabs--bottom.el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item,
  ::v-deep .el-tabs--bottom.el-tabs--card > .el-tabs__header .el-tabs__item,
  ::v-deep .el-tabs--bottom .el-tabs--left > .el-tabs__header .el-tabs__item,
  ::v-deep .el-tabs--bottom .el-tabs--right > .el-tabs__header .el-tabs__item {
    padding: 0 8px;
  }

  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    display: flex;
    justify-content: left;
    align-content: center;
    width: 44px;
    height: 38px;
    line-height: 38px;
    /*background: #fff;*/
    /*box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);*/
    z-index: 10;

    .el-icon-refresh {
      margin-right: 10px;
    }
  }
}
</style>

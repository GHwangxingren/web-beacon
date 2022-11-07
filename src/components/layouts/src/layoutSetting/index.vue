<template>
  <div class="ptb-30 setting">
    <div class="plr-24">
      <div class="flex ai-center mb-21">
        <div class="settingLine"></div>
        <div font="14" class="ml-8 settingName">菜单布局</div>
      </div>

      <LayoutMenuTheme></LayoutMenuTheme>
    </div>
    <div class="mtb-30 h-1 br-1 settingBg-EAECF0" />
    <div class="plr-24">
      <div class="flex ai-center mb-21">
        <div class="settingLine"></div>
        <div font="14" class="ml-8 settingName">主题布局</div>
      </div>

      <LayoutTheme @layoutThemeClick="layoutThemeClick"></LayoutTheme>
    </div>
    <div class="mtb-30 h-1 br-1 settingBg-EAECF0" />
    <div class="plr-24 mt-34">
      <div class="flex ai-center mb-21">
        <div class="settingLine"></div>
        <div font="14" class="ml-8 settingName">主题色系</div>
      </div>
      <div class="flex ai-center">
        <div
          class="w-28 h-28 br-4 mr-18 cursor-p"
          v-for="(color, index) in colorList"
          @click="clickColorChange(color)"
          :style="{ background: color.color, opacity: color.opacity }"
          :key="index"
        ></div>
        <el-color-picker @change="colorChange" v-model="setting.color.pickerColor"></el-color-picker>
      </div>
    </div>
    <div class="mtb-30 h-1 br-1 settingBg-EAECF0" />
    <div class="plr-24 flex jc-between ai-center">
      <div class="flex ai-center">
        <div class="settingLine"></div>
        <div font="14" class="ml-8 settingName">标签页</div>
      </div>
      <e-switch-sp
        active-text=""
        inactive-text=""
        width="60px"
        statePosition="i"
        title=""
        borderWidth="0px"
        height="32px"
        active-value="1"
        inactive-value="0"
        :isPopover="false"
        :disabled="setting.tag.disabled"
        :before-change="tagBeforeChange"
        @change="tagChange"
        :stateText="setting.tag.value"
        innerTextWidth="40px"
        v-model="setting.tag.value"
      />
    </div>
  </div>
</template>

<script>
// import SwitchEl from '@/components/switch/SwitchEl.vue';
import LayoutTheme from './LayoutTheme';
import LayoutMenuTheme from './LayoutMenuTheme';
import colorSetting from 'wb@/utils/layoutColorSetting';
import { mapGetters } from 'vuex';

export default {
  name: 'LayoutHomeSetting',
  components: {
    // SwitchEl,
    LayoutTheme,
    LayoutMenuTheme
  },
  computed: {
    ...mapGetters(['layoutSetting'])
  },
  data() {
    return {
      setting: {},
      color1: '#7C90FF',
      checkList: [
        {
          id: 0,
          name: '左侧底部'
        },
        {
          id: 1,
          name: '中部底部'
        }
      ],
      colorList: [
        { color: '#6359CA', opacity: 1 },
        { color: '#3485FB', opacity: 0.4 },
        { color: '#01CFE8', opacity: 0.4 },
        { color: '#2EB7AA', opacity: 0.4 },
        { color: '#FF9F44', opacity: 0.4 },
        { color: '#FF6602', opacity: 0.4 },
        { color: '#FD4C00', opacity: 0.4 }
      ]
    };
  },
  created() {
    this.setting = this.layoutSetting;
    this.comCol(this.setting.color.value);
    this.layoutBrNoneFun();
  },
  methods: {
    tagChange(v) {
      this.setting.tag.value = v;
      this.$store.dispatch('setLayoutSetting', this.setting);
    },
    tagBeforeChange() {
      this.setting.tag.disabled = true;
      this.$store.dispatch('setLayoutSetting', this.setting);
      return new Promise((resolve) => {
        setTimeout(() => {
          this.setting.tag.disabled = false;
          this.$store.dispatch('setLayoutSetting', this.setting);
          return resolve();
        }, 1000);
      });
    },
    layoutThemeClick(v) {
      if (v === '1') {
        this.layoutBrNoneFun();
      }
    },
    changeCol(v) {
      this.comCol(v);
      this.$store.dispatch('setLayoutSetting', this.setting);
      colorSetting.setLayoutColor(v);
      colorSetting.isThemeLayout(this.layoutSetting.themeLayout.value, v);
    },
    comCol(v) {
      this.colorList.forEach((item) => {
        if (v === item.color) {
          item.opacity = 1;
        } else {
          item.opacity = 0.4;
        }
        return item;
      });
    },
    layoutBrNoneFun() {
      return colorSetting.serRootStyle(
        "root",
        "--layoutPickerBrNone",
        "1px solid #999"
      );
    },
    clickColorChange(v) {
      this.setting.color.value = v.color;
      this.setting.color.pickerColor = '';
      this.changeCol(v.color);
      this.layoutBrNoneFun();
    },
    colorChange(v) {
      if (v === null) {
        this.setting.color.value = '#6359CA';
        this.setting.themeLayout.value = '0';
        this.changeCol(this.setting.color.value);
        this.layoutBrNoneFun();
        colorSetting.serRootStyle(
          "root",
          "--layoutMain-6359CA-rgba1",
          colorSetting.colorRgb("#6359CA", 0.9)
        );
        colorSetting.serRootStyle(
          "root",
          "--layoutMain-6359CA-rgba2",
          colorSetting.colorRgb("#6359CA", 1)
        );
      } else {
        this.setting.color.pickerColor = v;
        this.setting.color.value = '';
        this.changeCol(v);
      }
      this.$store.dispatch('setLayoutSetting', this.setting);
    }

    // checkClick(v) {
    //     this.setting.copyright.radio = v.id;
    //     this.$store.dispatch("setSystemThemeSetting", this.setting);
    // },
    //
    // copyBeforeChange() {
    //     this.setting.copyright.disabled = true;
    //     this.$store.dispatch("setSystemThemeSetting", this.setting);
    //     // this.setting.tag.disabled=true;
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             this.setting.copyright.disabled = false;
    //             this.$store.dispatch("setSystemThemeSetting", this.setting);
    //             return resolve()
    //         }, 1000)
    //     })
    // },
    // productsBeforeChange() {
    //     this.setting.products.disabled = true;
    //     this.$store.dispatch("setSystemThemeSetting", this.setting);
    //     // this.setting.tag.disabled=true;
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             this.setting.products.disabled = false;
    //             this.$store.dispatch("setSystemThemeSetting", this.setting);
    //             return resolve()
    //         }, 1000)
    //     })
    // }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-switch.is-checked .el-switch__core {
  border-color: #6359ca;
  background-color: #6359ca;
}
::v-deep .el-color-picker__trigger {
  border: none;
}
::v-deep .el-color-picker__color {
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
}
::v-deep .el-color-picker__color-inner {
  border-radius: 4px;
}
.setting {
  &Line {
    width: 2px;
    height: 14px;
    background: #6f82b3;
  }
  &Bg-EAECF0 {
    background: #eaecf0;
  }
  &Name {
    color: #6f82b3;
  }

  .checkIsative {
    background: #edf2fc !important;
    border: 1px solid #dcdfe6 !important;
    color: #fff !important;
  }

  .color-ddd {
    color: #c0c4cc !important;
  }
}
</style>

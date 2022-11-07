<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-06-30 11:06:48
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/components/layouts/src/layoutHeader/LayoutHeaderRight copy.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 11:06:49
-->
<!--
 * @version: v1.2.0
 * @Author: 胡鹏飞
 * @Date: 2021-09-03 14:24:34
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 10:56:03
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/components/layouts/src/layoutHeader/LayoutHeaderRight.vue
-->
<template>
  <div class="flex ai-center">
    <!--        <icon-class class="mr-43 cursor-p" @click.native="drawer = true" icon-class="icon-C-C1" font="24"-->
    <!--                    color="var(&#45;&#45;layoutTopMenuCol)"/>-->

    <icon-class class="mr-43 cursor-p" @click.native="drawer = true" icon-class="icon-C-C14" font="24" color="#7e84a3" @iconClick="$router.push('/other/asyncDownload')" />
    <LayoutHeaderMessage class="cursor-p mr-36" @msgClick="msgClick" />
    <!--        -->
    <!--        <icon-class class="mr-40 cursor-p" icon-class="icon-C-C3" @iconClick="detailsFun" font="24" color="var(&#45;&#45;layoutTopMenuCol)"/>-->
    <!--        -->
    <icon-class
      :title="isFullscreen ? '全屏' : '取消全屏'"
      class="mr-40 cursor-p"
      :icon-class="isFullscreen ? 'icon-C-C6' : 'icon-C-C7'"
      @iconClick="isScreenFull"
      font="24"
      color="#7e84a3"
    />
    <icon-class class="mr-44 cursor-p" icon-class="icon-C-C13" @iconClick="settingFun" font="24" color="#7e84a3" />

    <el-button type="primary" size="mini" font="14" class="w-32 h-32 mr-12 btnName" circle>
      {{ userMsg.currentRoles[0].roleName.charAt(0) }}
    </el-button>
    <el-dropdown class="mr-14" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ userMsg.currentUser.realName }}
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown" class="p-0 popoverCard">
        <div class="w-232 pt-15">
          <div align="center" class="el-dropdown-name" font="14">
            {{ userMsg.currentRoles[0].roleName }}
          </div>
          <div align="center" class="ptb-5 el-dropdown-easyChat" font="12">
            {{ userMsg.currentDepartment.name }}
          </div>
        </div>

        <el-dropdown-item v-for="item in dropdown" font-weight="600" :key="item.id" class="flex ai-center pl-55" font="12" :command="item.id" divided>
          <icon-class :icon-class="item.icon" font="24" color="#7e84a3" />
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--        <icon-class @iconClick="client" class="cursor-p" icon-class="icon-C-C4" font="24" color="var(&#45;&#45;layoutTopMenuCol)"/>-->
    <!--        <Dra-->
    <!--              :visible.sync="drawer"-->
    <!--              title="外呼拨打电话"-->
    <!--              titleIcon="icon-E-E9"-->
    <!--              footerBtnPosition="right"-->
    <!--              append-to-body-->
    <!--              titleIconBg="var(&#45;&#45;layoutMain-6359CA)"-->
    <!--              size="396px"-->
    <!--        >-->
    <!--            <layout-header-kcall/>-->
    <!--    -->
    <!--        </Dra>-->
    <LayoutUpdatePass :type="2" ref="updatePass" />

    <e-drawer-sp :visible.sync="drawerVisible" :wrapperClosable="true" size="552px" titleIconBg="#6359ca" :title="messTitle">
      <MessageItemDrawer v-if="drawerVisible" ref="message" :drawerVisible="drawerVisible" :selectRow="selectRow"></MessageItemDrawer>
      <template #footer>
        <el-button size="small" @click="drawerVisible = false">取消</el-button>
        <!--                <el-dropdown split-button class="ml-10" size="small" type="primary" trigger="click" @command="drawerHandleCommand">-->
        <!--                    未处理-->
        <!--                    <el-dropdown-menu slot="dropdown">-->
        <!--                        <el-dropdown-item command="已处理">已处理</el-dropdown-item>-->
        <!--                        <el-dropdown-item command="已驳回">已驳回</el-dropdown-item>-->
        <!--                    </el-dropdown-menu>-->
        <!--                </el-dropdown>-->
        <el-button size="small" type="primary" @click="confrimBtn">确定</el-button>
      </template>
    </e-drawer-sp>
    <e-drawer-sp :visible.sync="processedDrawerVisible" :wrapperClosable="false" size="552px" titleIconBg="#6359ca" :title="processedTitle">
      <el-form ref="form" :rules="rules" :model="processedForm" label-position="top" label-width="80px">
        <el-form-item label="意见内容:" prop="value">
          <e-editor-n v-model="processedForm.value" uploadImgMethod="uploadUrl" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="processedDrawerVisible = false">取消</el-button>
        <el-button type="primary" @click="processedDrawerVisible = false">确定</el-button>
      </template>
    </e-drawer-sp>
  </div>
</template>

<script>
import watermark from 'wb@/utils/watermark';

import LayoutHeaderMessage from './LayoutHeaderMessage';
// import LayoutHeaderKcall from "./LayoutHeaderKcall"
//
// import Dra from '@/components/drawer/Dra.vue';
import LayoutUpdatePass from '../layoutSetting/LayoutUpdatePass';
import { mapActions, mapGetters } from 'vuex';
import MessageItemDrawer from 'wb@/views/messageManage/messageItemDrawer';

//引入全屏插件
import screenfull from 'screenfull';

export default {
  name: 'LayoutHeaderRight',
  components: {
    LayoutUpdatePass,
    LayoutHeaderMessage,
    MessageItemDrawer
    // LayoutHeaderKcall,
    // Dra
  },
  computed: {
    ...mapGetters(['userMsg'])
  },
  data() {
    return {
      isShow: false,
      isDetails: false,
      drawerVisible: false,
      isFullscreen: true,
      drawer: false,
      selectRow: {},
      messTitle: '',
      processedDrawerVisible: false,
      processedForm: {
        value: ''
      },
      processedTitle: '',
      dropdown: [
        {
          id: '1',
          name: '修改密码',
          icon: 'icon-C-C8'
        },
        // {
        //     id: "2",
        //     name: "意见反馈",
        //     icon: "icon-C-C9",
        // },
        // {
        //     id: "3",
        //     name: "坐席配置",
        //     icon: "icon-C-C10",
        // },
        {
          id: '4',
          name: '退出登录',
          icon: 'icon-C-C11'
        }
      ]
    };
  },
  created() {
    watermark.set(this.userMsg.currentRoles[0].createUser);
  },
  methods: {
    ...mapActions(['setMesslist']),
    isScreenFull() {
      if (!screenfull.isEnabled) {
        // 如果不支持进入全屏，发出不支持提示
        this.$message({
          message: '您的浏览器版本过低不支持全屏显示！',
          type: 'warning'
        });
        return false;
      }
      screenfull.toggle();
      this.isFullscreen = screenfull.isFullscreen;
    },
    drawerHandleCommand(command) {
      this.processedTitle = command;
      this.processedDrawerVisible = true;
    },
    client() {
      this.isShow = !this.isShow;
      this.$emit('client', this.isShow);
    },
    confrimBtn() {
      this.$refs.message.confrimBtn().then(() => {
        this.drawerVisible = false;
      });
    },
    // 点击某一个任务
    msgClick(row) {
      // 更新已读、调消息数量接口更新消息数量
      // this.clickMessage(item);

      // 更新已读、调消息数量接口更新消息数量
      this.$HttpNomal.setReadStatus({ receiveId: row.id }, { contentType: 'x-form' }).then(() => {
        this.setMesslist();
      });
      this.$nextTick(() => {
        this.drawerVisible = true;
      });
      if (row.type === 1) {
        this.messTitle = '系统消息';
      } else if (row.type === 2) {
        this.messTitle = '任务消息';
      } else if (row.type === 3) {
        this.messTitle = '审批消息';
      }
      this.selectRow = row;
    },
    // detailsFun() {
    //     this.isDetails = !this.isDetails;
    //     this.$emit("isDetails", this.isDetails)
    // },
    settingFun() {
      this.$emit('setting', true);
    },
    handleCommand(command) {
      if (command === '1') {
        this.$refs.updatePass.dialogVisible = true;
      } else if (command === '4') {
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.popoverCard.el-popper[x-placement^='bottom'] .popper__arrow {
  display: none !important;
}

.popoverCard.el-popper[x-placement^='bottom'] {
  margin-top: 18px !important;
}

.popoverCard.el-popper {
  top: 50px !important;
}

::v-deep .el-badge__content.is-fixed {
  right: 13px;
}

.el-dropdown-menu--medium .el-dropdown-menu__item.el-dropdown-menu__item--divided {
  margin-top: 0px;
}

.el-dropdown-menu__item i {
  margin-right: 8px;
}

.el-dropdown-menu--medium .el-dropdown-menu__item.el-dropdown-menu__item--divided:before {
  height: 0;
}

.el-dropdown-menu--medium .el-dropdown-menu__item {
  line-height: 37px;
  height: 37px;
}

.el-dropdown-link {
  color: #7e84a3;
}

.btnName,
.btnName:hover,
.btnName:focus {
  background-color: #6359ca;
  border-color: #6359ca;
  color: #ffffff;
}

.el-dropdown-menu {
  border: none;

  .el-dropdown-name {
    font-weight: 600;
    /*color: $-color-344563;*/
    color: #344563;
  }

  .el-dropdown-easyChat {
    font-weight: 400;
    color: #7e84a3;
  }

  .el-dropdown-menu__item {
    font-weight: 500;
    /*color: $-color-344563;*/
    color: #344563;
  }

  .el-dropdown-menu__item:not(.is-disabled):hover,
  .el-dropdown-menu__item:focus {
    background-color: #6359ca;
    /*
                    color: $-color-ffffff;
        */
    color: #ffffff;
    border-radius: 1px;

    &:hover ::v-deep i {
      /*
                          color: $-color-ffffff !important;
          */
      color: #ffffff !important;
    }
  }
}
</style>

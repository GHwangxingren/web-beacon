<template>
  <el-popover placement="bottom" width="420" ref="popover" @show="showPoper" popper-class="popoverCard" trigger="click">
    <div class="flex jc-between ai-center h-56 plr-24 header">
      <div font="16" class="message">消息通知</div>
      <div class="ptb-10 flex jc-between ai-center">
        <!--        <el-switch-->
        <!--              v-model="chromeNotify"-->
        <!--              @change="chromeNotifyBtn"-->
        <!--              inactive-text="桌面消息推送"-->
        <!--              size="mini"-->
        <!--        >-->
        <!--        </el-switch>-->
        <!--        :disabled="setting.tag.disabled"-->

        <e-switch-sp
          active-text=""
          inactive-text=""
          width="158px"
          statePosition="i"
          title="桌面消息推送"
          borderWidth="0px"
          height="32px"
          :active-value="true"
          :inactive-value="false"
          :disabled="settingDisabled"
          :isPopover="false"
          :before-change="chromeNotifyBtn"
          :stateText="chromeNotify"
          innerTextWidth="40px"
          v-model="chromeNotify"
        />
        <el-tooltip class="item cursor-p" effect="dark" content="查看全部" placement="top">
          <icon-class class="cursor-p" icon-class="icon-F-F18" font="24" @iconClick="allNotifications" color="var(--layoutTopMenuCol)" />
        </el-tooltip>
      </div>
    </div>
    <!--        <el-tabs v-if="flag" v-model="activeName">-->
    <!--            <el-tab-pane-->
    <!--                  v-for="nav in navs"-->
    <!--                  :key="nav.name"-->
    <!--                  :label="`${nav.label}`"-->
    <!--                  :name="nav.name"-->
    <!--            >-->
    <!--            </el-tab-pane>-->
    <!--        </el-tabs>-->
    <el-card class="box-card" shadow="never">
      <div class="listBox">
        <div v-if="messageList != ''">
          <div v-for="(o, index) in messageList" :key="index" class="list plr-24 ptb-4 cursor-p" font="12" @click="toMessageDetail(o)">
            <div class="flex jc-between pt-10">
              <div class="flex ai-center">
                <!--                                <div @click="o.read=!o.read" class="w-10 h-10 mr-15"-->
                <!--                                     :style="{backgroundColor: o.read?'#D4DBF8':'#FF8A8A',borderRadius:'50%'}"></div>-->
                <div font="14" class="message ellipsis w-215" font-weight="600">
                  {{ o.title }}
                </div>
              </div>
              <div font="12" class="message">
                {{ o.createTime }}
              </div>
            </div>
            <div class="pb-10" v-if="o.content != ''">
              <div class="ellipsis pl-33 news" font="12">
                {{ o.content }}
              </div>
            </div>
          </div>
        </div>
        <el-empty v-else description="无数据" :image-size="80"></el-empty>
      </div>
      <div class="plr-20 ptb-21">
        <el-button size="small" class="ptb-12" type="primary" width="100%" @click="allRead"> 标记为查看已读 </el-button>
      </div>
    </el-card>
    <!--        <el-button @click="$refs.popover.showPopper = false">取 消</el-button>-->
    <el-badge slot="reference" :value="messNum" class="item">
      <icon-class icon-class="icon-C-C2" font="24" color="var(--layoutTopMenuCol)" />
    </el-badge>
  </el-popover>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import message from 'wb@/mixins/message';

export default {
  name: 'LayoutHeaderMessage',

  computed: {
    ...mapGetters(['messList', 'messNum', 'chromeNotify', 'userMsg', 'defaultActiveMenu'])
  },
  mixins: [message],
  watch: {
    messList: {
      handler(nval) {
        if (this.activeName === 'sys') {
          this.messageList = nval?.promptMessage && nval.promptMessage.length ? JSON.parse(JSON.stringify(nval.promptMessage)) : [];
        } else if (this.activeName === 'task') {
          this.messageList = nval?.taskMessage && nval.taskMessage.length ? JSON.parse(JSON.stringify(nval.taskMessage)) : [];
        } else if (this.activeName === 'approve') {
          this.messageList = nval?.approveMessage && nval.approveMessage.length ? JSON.parse(JSON.stringify(nval.approveMessage)) : [];
        }
      },
      deep: true
    },
    activeName(nval) {
      if (nval === 'sys') {
        this.messageList = this.messList?.promptMessage && this.messList.promptMessage.length ? JSON.parse(JSON.stringify(this.messList.promptMessage)) : [];
      } else if (nval === 'task') {
        this.messageList = this.messList?.taskMessage && this.messList.taskMessage.length ? JSON.parse(JSON.stringify(this.messList.taskMessage)) : [];
      } else if (nval === 'approve') {
        this.messageList = this.messList?.approveMessage && this.messList.approveMessage.length ? JSON.parse(JSON.stringify(this.messList.approveMessage)) : [];
      }
    }
  },
  data() {
    return {
      messageList: [],
      activeName: 'sys',
      desktopSend: {
        disabled: false,
        value: ''
      },
      flag: true,
      dialogVisible: false,
      settingDisabled: false,
      notify: false,
      navs: [
        { name: 'sys', label: '系统消息' },
        { name: 'task', label: '任务消息' },
        { name: 'approve', label: '审批消息' }
      ],
      readState: true
    };
  },
  methods: {
    ...mapActions(['setMesslist']),

    // 点击时
    showPoper() {
      this.flag = false;
      this.$nextTick(() => {
        this.flag = true;
      });
      this.activeName = 'sys';
      this.setMesslist();
      this.$HttpNomal.getChrome({ userId: this.userMsg.currentUser.userId }).then((res) => {
        if (res && res.code === 0) {
          this.$store.dispatch('setNotify', !!res.data);
        }
      });
    },
    chromeNotifyBtn(val) {
      this.settingDisabled = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          this.settingDisabled = false;
          //调接口存储 成功后
          this.$HttpNomal.setChrome({ userId: this.userMsg.currentUser.userId }).then((res) => {
            if (res && res.code === 0) {
              // chrome开关方法
              this.$store.dispatch('setNotify', val);
              // 判断用户是否开启通知 提示请用户开启通知
              if (val && window.Notification && Notification.permission !== 'granted') {
                Notification.requestPermission(function (status) {
                  if (Notification.permission !== status) {
                    Notification.permission = status;
                  }
                });
              }
            } else {
              this.$message.error('桌面消息推送失败');
            }
          });
          return resolve();
        }, 1000);
      });
    },
    allRead() {
      // //全部标为已读
      this.$HttpNomal.setReadStatus().then(() => {
        this.setMesslist();
      });
    },
    allNotifications() {
      // mixin混入的方法
      this.clickMessage();
      this.$refs.popover.showPopper = true; // 关闭当前popover
      this.dialogVisible = true;
    },
    // 点击某一个任务
    toMessageDetail(row) {
      // 更新已读、调消息数量接口更新消息数量
      // this.clickMessage(item);
      this.$refs.popover.showPopper = false; // 关闭当前popover
      this.$emit('msgClick', row);
    }
    // close() {
    //     this.dialogVisible = false
    //     setTimeout(() => {
    //         this.$refs.popover.showPopper = true
    //     }, 100)
    //
    // }
  }
};
</script>

<style lang="scss">
.popoverCard.el-popper[x-placement^='bottom'] .popper__arrow {
  display: none !important;
}

.popoverCard.el-popper[x-placement^='bottom'] {
  margin-top: 17px !important;
}

.popoverCard.el-popper {
  top: 50px !important;
}

.popoverCard {
  padding: 0 !important;

  .list {
    /*border-bottom: 1px solid $-color-E1E5EE;*/
    border-bottom: 1px solid #e1e5ee;
  }

  .el-card__header,
  .el-card__body {
    padding: 0;
  }
}
</style>
<style lang="scss" scoped>

::v-deep .el-badge__content {
  background-color: var(--layoutTopBadge);
  color: var(--layoutTopBadgeCol);
}

::v-deep .el-tabs__header {
  margin: 0;
}

::v-deep .el-tabs__nav-scroll {
  padding-left: 25px;
}

.header {
  border-bottom: 1px solid #e1e5ee;
}

.popoverCard {
  .message {
    /*color: $-color-344563;*/
    color: #344563;
  }

  .listBox {
    max-height: 240px;
    overflow: auto;
  }

  .message,
  .news {
    font-weight: 500;
  }

  .news {
    /*color: $-color-7D8DBF;*/
    color: #7d8dbf;
  }
}
</style>

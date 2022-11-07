<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-06-30 10:59:26
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/views/messageManage/messageItemDrawer.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 10:59:26
-->
<template>
    <el-form
          label-width="140px"
          :model="currentMessage"
          label-position="top"
    >

        <div class="flex jc-between ai-center mb-20">
            <div>
                <div font-weight="500" class="mb-5" font="16" style="color:#344563"> {{currentMessage.configTypeName}}
                </div>
                <div class="flex jc-between ai-center" font="12" style="color:#6F82B3">
                    <div>任务编号：{{currentMessage.taskNo||'-'}}</div>
                    <div class="ml-15">创建时间：{{selectRow.createTime||'-'}}</div>
                </div>
            </div>
            <div align="center">
                <div  @click="iconClick">
                    <icon-class
                          class="cursor-p"
                          icon-class="icon-F-F22"
                          :color="star?'#FF9C22':'#6F82B3'"
                          font="24"
                    />
                </div>

                <div font="12" style="color:#6F82B3">
                    星标
                </div>
            </div>
        </div>
        <el-form-item label="公司名称：">
            {{currentMessage.companyName||'-'}}
        </el-form-item>
        <div class="flex ai-center">
            <el-form-item label="行业类型：" class="flex-3">
                {{currentMessage.industryType||'-'}}
            </el-form-item>
            <el-form-item label="消息来源：" class="flex-3">
                {{selectRow.sendName||'-'}}
            </el-form-item>
        </div>
        <div class="flex ai-center">
            <el-form-item label="产品类型：" class="flex-3">
                {{currentMessage.productType||'-'}}
            </el-form-item>
            <el-form-item label="项目类型：" class="flex-3">
                {{currentMessage.projectType||'-'}}
            </el-form-item>

        </div>
        <el-form-item label="消息内容：">
            <el-input
                  v-model="currentMessage.content"
                  disabled
                  type="textarea"
            ></el-input>
        </el-form-item>
        <el-form-item label="相关备注" v-if="someRemark">
            <el-input
                  v-model="someRemark"
                  disabled
                  type="textarea"
            ></el-input>
        </el-form-item>
        <div v-if="type == 3">
            <h5
                  class="mb10"
                  v-if="currentMessage.annex && currentMessage.annex.length"
            >
                消息附件
            </h5>
            <el-row
                  :gutter="20"
                  v-if="currentMessage.annex && currentMessage.annex.length"
            >
                <el-col
                      :span="12"
                      v-for="(item, index) of currentMessage.annex"
                      :key="index"
                >
                    <span>{{ item.fileName }}</span>
                    <span>----------------------</span>
                    <el-button type="text" @click="downloadFile(item)">下载</el-button>
                    <el-button
                          type="text"
                          @click="priviewFile(item)"
                          v-if="showPriview(item.filePath)"
                    >预览
                    </el-button
                    >
                    <span v-if="showPriview(item.fileName)">
              <img :src="item.filePath" alt="" style="display: none"/>
            </span>
                </el-col>
            </el-row>
            <div class="mt-10">
                <!-- approveStatus -->
                <el-radio-group
                      v-model="auditStatus"
                      @change="auditRemark = ''"
                      :disabled="approveStatus ? true : false"
                >
                    <el-radio :label="1">审批通过</el-radio>
                    <el-radio :label="2">审批驳回</el-radio>
                </el-radio-group>
                <!-- rejectType -->
                <el-input
                      v-model="rejectType"
                      placeholder="请输入审核驳回类型"
                      v-if="auditStatus == 2"
                      class="mt-10"
                      maxlength="20"
                      :disabled="approveStatus ? true : false"
                ></el-input>
                <!-- rejectReason -->
                <el-input
                      :disabled="approveStatus ? true : false"
                      class="mt-10"
                      type="textarea"
                      v-model="auditRemark"
                      :rows="5"
                      maxlength="200"
                      :placeholder="
              auditStatus == 1 ? '请输入审批通过备注' : '请输入审批驳回原因'
            "
                ></el-input>
            </div>
        </div>
    </el-form>
</template>

<script>
    import {mapGetters} from "vuex";
    import message from "wb@/mixins/message";

    export default {
        mixins: [message],
        props: ["drawerVisible", "selectRow"],
        data() {
            return {
                type: 1,
                auditStatus: 1,
                auditRemark: "",
                rejectType: "",
                currentMessage: {},
                approveStatus: null,
                someRemark: "",
                star: false
            };
        },
        computed: {
            ...mapGetters(["defaultActiveMenu"])
        },
        watch: {
            defaultActiveMenu: {
                handler() {
                    this.getDetail();
                }
            }
        },
        methods: {
            iconClick(){
                this.star=!this.star;
            },
            // 取消
            cancelFun() {
                this.clickMessage();
            },
            downloadFile(item) {
                let aEle = document.createElement("a");
                aEle.target = "_blank";
                aEle.href = item.filePath; //http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1308/01/c0/24007771_1375339039075.jpg  //http://kcall-test-oss.oss-cn-beijing.aliyuncs.com/10505/2021/8/16/189c40a549f840afb2baac64362a7e4f.jpg     //http://192.168.169.54:8010/mine/test.jpg
                // let filePpx = item.filePath.substring(item.filePath.lastIndexOf('.'), item.filePath.length)
                // aEle.setAttribute('download', filePpx)
                aEle.click();
            },
            priviewFile(item) {
                // 预览图片
                this.$imagePreview({
                    images: [item.filePath],
                    index: 0,
                    defaultOpt: {
                        fullscreenEl: true,
                        shareEl: false,
                        arrowEl: true,
                        preloaderEl: true,
                        loop: false,
                        bgOpacity: 0.85,
                        showHideOpacity: true,
                        errorMsg: "<div class='pswp__error-msg'>图片加载失败</div>"
                    }
                });
            },
            async confrimBtn() {
                // 通过 驳回 关闭
                let obj = {
                    id: this.selectRow.id,
                    type: this.type,
                    taskNo: this.currentMessage?.taskNo || ""
                };
                if (this.type === 3) {
                    obj.auditStatus = this.auditStatus;
                    obj.auditRemark = this.auditRemark;
                }
                if (obj.auditStatus === 2) {
                    obj.rejectType = this.rejectType;
                }
                await this.$HttpNomal.setProcessStatus(obj).then((res) => {
                    if (res && res.code === 0) {
                        this.$message.success("操作成功");
                    }
                });
            },
            showPriview(url) {
                let fileTypes = ["png", "jpg", "jpeg", "gif"],
                      filePpx = url.substring(url.lastIndexOf(".") + 1, url.length);
                if (fileTypes.includes(filePpx)) {
                    return true;
                }
                return false;
            },
            getDetail() {
                this.$HttpNomal
                      .getMessageDetail({id: this.selectRow.id})
                      .then((res) => {
                          if (res && res.data) {
                              this.currentMessage = res.data;
                              this.type = this.currentMessage.type || 1;
                              // 禁用标识
                              this.approveStatus = this.currentMessage.approveStatus;
                              // 回显审批
                              this.auditStatus = this.currentMessage.approveStatus || 1;
                              this.rejectType = this.currentMessage.rejectType || "";
                              this.auditRemark = this.currentMessage.rejectReason || "";
                              this.someRemark = this.currentMessage.relatedNote || "";
                          }
                      });
            }
        },
        mounted() {
            this.getDetail();
        }
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-form-item__label {
        color: #6F82B3
    }

    ::v-deep .el-form-item__content,
    ::v-deep .el-textarea.is-disabled .el-textarea__inner {
        color: #344563
    }

    ::v-deep .el-textarea.is-disabled .el-textarea__inner {
        height: 120px;
        min-height: 120px;
    }
</style>

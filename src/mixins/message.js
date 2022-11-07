/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-06-30 10:56:51
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/mixins/message.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 10:56:52
 */
import { mapActions, mapGetters } from "vuex";
import findData from "wb@/utils/findData";

export default {
    data() {
        return {
            notification: [
                {
                    icon: "icon-A-A2",
                    name: "消息通知",
                    level: "0-0"
                }
            ]
        };
    },
    computed: {
        ...mapGetters([
            "breadcrumb",
            "nomalMenu",
            "defaultActiveMenu"
        ])
    },

    methods: {
        ...mapActions(["setMesslist"]),
        clickMessage(item) {
            let msg = "";
            if (item && item.type === 1) {
                msg = "系统消息";
            } else if (item && item.type === 2) {
                msg = "任务消息";
            } else if (item && item.type === 3) {
                msg = "审批消息";
            }
            let obj = {
                id: item && item.id !== "8-8" ? item.id : "8-8",
                icon: "icon-A-A2",
                name: item && item.id !== "8-8" ? msg + item.id : "查看全部通知",
                level: "0-0",
                type: item && item.id !== "8-8" ? item.type : "",
                path: item && item.id !== "8-8" ? "/message/detail" : "/message/index"
            };
            this.$HttpNomal
                .setReadStatus(item ? { receiveId: obj.id } : "")
                .then(() => {
                    this.setMesslist();
                });
            let arr = [...this.notification, obj];
            this.clickBtnRouter(obj, arr);
            this.$router.push(obj.path);
        },
        // 点击按钮跳转页面
        clickBtnRouter(obj, arr) {
            this.$store.dispatch("setLayoutTag", obj);
            this.$store.dispatch("setDefaultActiveMenu", obj.id); //选中
            this.$store.dispatch("setBreadcrumb", arr ? arr : this.resetBreadcrumb(obj.id)); //面包屑
            this.$store.dispatch("setDefaultActiveHorizontalMenu", obj.id);
        },
        // 通过path找到当前选中
        clickBtnResetPath(path) {
            return findData.getParentId(this.nomalMenu, path);
        },
        // 通过选中的值找到当前选中 的面包屑数据
        resetBreadcrumb(defaultActiveMenu = this.defaultActiveMenu) {
            return findData.findParentArr(defaultActiveMenu, this.nomalMenu);
        },
        // 找到当前选中 的数据
        findCurData() {
            return this.resetBreadcrumb().find(item => item.id === this.defaultActiveMenu);
        },
        setDetails(obj) { //设置某个详情页面  菜单数据里没有的路由数据 第一级详情跳转
            let arr;
            // pid 很重要 判断是二级以上的详情跳转
            if (obj.pid) {
                arr = [...this.breadcrumb, obj];
            } else {
                arr = [...this.resetBreadcrumb(), obj];
            }
            this.$store.dispatch("setBreadcrumb", arr); //面包屑
        }
    }
};

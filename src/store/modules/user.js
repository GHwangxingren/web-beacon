/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-06-30 11:09:36
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/store/modules/user.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 11:11:38
 */
/*
 * @Author: web.范庆龙
 * @Date: 2020-04-26 10:40:48
 * @LastEditors: web.范庆龙
 * @LastEditTime: 2020-04-26 10:45:43
 * @Description: file content
 */
import * as types from "../types";
import setting from "./setting";
// import service from "@/service";
// const HttpNomal = service.apiArr.find((item) => {
//   return item.http == "$HttpNomal";
// }),
const user = {
  state: {
    // 用户信息
    userMsg: {},
    token: null,
    messList: [], //消息列表
    messNum: 0, //消息数量
    chromeNotify: false, //推送桌面开关
    // ui系统主题设置
    layoutSetting: setting.layoutSetting,
  },
  mutations: {
    [types.TOKEN]: (state, token) => {
      state.token = token;
    },
    [types.USERMSG]: (state, userMsg = {}) => {
      state.userMsg = userMsg;
    },

    [types.LAYOUTSETTING]: (state, layoutSetting = {}) => {
      state.layoutSetting = layoutSetting;
    },

    SET_SYSLIST(state) {
      //请求接口
      // HttpNomal.fun.getbBriefNews().then((res) => {
      //   state.messList = res.data;
      //   state.messNum = res.data?.unReadNum || 0;
      // });
    },
    [types.CHROMENOTIFY]: (state, chromeNotify) => {
      state.chromeNotify = chromeNotify;
    },
  },
  actions: {
    setToken({ commit }, token = null) {
      commit(types.TOKEN, token);
    },
    setUserMsg({ commit }, userMsg = {}) {
      commit(types.USERMSG, userMsg);
    },
    setMesslist({ commit }) {
      commit("SET_SYSLIST");
    },
    // 主题设置
    setLayoutSetting({ commit }, layoutSetting = {}) {
      commit(types.LAYOUTSETTING, layoutSetting);
    },
    setNotify({ commit }, chromeNotify = false) {
      commit(types.CHROMENOTIFY, chromeNotify);
    },
  },
};

export default user;

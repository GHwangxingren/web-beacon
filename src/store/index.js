/*
 * @Author: web.范庆龙
 * @Date: 2020-04-26 10:40:48
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 10:07:34
 * @Description: file content
 */
import Vuex from "vuex";
import utils from "wb@/utils";
import getters from "./getters";
const files = require.context("./modules", false, /\.js$/);
import createPersistedState from "vuex-persistedstate";


export function createStore(data, storeKey) {
  let key = 'web_beacon'; // 默认值 
  if (typeof data == 'string' && data) {
    key = data; // 如果没传配置
  } else if (typeof storeKey == 'string' && storeKey) {
    key = storeKey; // 传了 配置 也穿了key
  }
  const store = new Vuex.Store({
    modules: {
      ...utils.readFile(files),
      ...data.modules
    },
    getters: {
      ...getters,
      ...data.getters
    },
    plugins: data.plugins || [
      createPersistedState({
        key: key,
        storage: window.sessionStorage, //选择 sessionStorage 进行存储
        // paths: []
      }),
      // createPersistedState({
      //   key: "xxx-web-view.L",
      //   storage: window.localStorage, //选择 localStorage 进行存储
      //   paths: ["layoutMenus", "user"]
      // })
    ]
  });
  return store
};
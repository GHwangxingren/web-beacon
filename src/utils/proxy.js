/*
 * @Description: proxy
 * @Author: 李大玄
 * @Date: 2022-06-30 15:26:26
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/utils/proxy.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 15:26:48
 */
export const inter = {
  router: '',
  store: '',
  auth: '',
  setRouter(val) {
    this.router = val;
  },
  getRouter() {
    return this.router;
  },
  setStore(val) {
    this.store = val;
  },
  getStore() {
    return this.store;
  },
  setAuth(val) {
    this.auth = val;
  },
  getAuth() {
    return this.auth;
  }
}
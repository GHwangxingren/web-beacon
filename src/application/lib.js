/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-06-23 10:09:24
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/application/lib.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 17:36:27
 */


import application from 'wb@/components/layouts/index.vue';
export default application;

export { createRouter } from 'wb@/router/index';
export { createStore } from 'wb@/store/index';
export { createService  } from 'wb@/service/index';
export { createApp } from '../main';

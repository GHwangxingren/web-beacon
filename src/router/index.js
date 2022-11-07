/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 1985-10-26 16:15:00
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/router/index.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 19:10:36
 */
/*
 * @Author: web.范庆龙
 * @Date: 2020-04-26 10:40:48
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-24 15:43:11
 * @Description: file content
 */
import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "wb@/components/layouts/index.vue";
import utils from "wb@/utils";
// import store from "wb@/store";
import NProgress from "nprogress"; //进度条
import "nprogress/nprogress.css";// 进度条样式
import overAll from "./overAll";


NProgress.configure({ showSpinner: false }); // 不显示螺旋加载
const vueFiles = require.context("./modules", true, /\.js$/);
//解决重复点击报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
// const children = Object.values(utils.readFile(vueFiles)).flat();
Vue.use(VueRouter);


// 跳转路由
// 情况1).地址存在且有权限，直接跳转到对应路由即可
// 情况2).地址存在且没有权限，跳转404页面
// 情况3).地址不存在，跳转到获取菜单中的首个权限
function jumpRoute(routeName, next, to) {
  if (routeName !== "/") {
    // 情况1)
    if (window.auth.checkPermission(routeName)) {
      window.auth.jumpConfig(to);
      next();
    }
    // 情况2)
    else {
      next("./404");
    }
  }
  // 情况3)
  else {
    next(auth.getFirstPermission());
  }
}

export const createRouter = function (routes = []) {
  const router = new VueRouter({
    mode: "hash",
    routes: routes.concat(overAll)
    // base: process.env.VUE_APP_BASE_URL,
  });

  router.beforeEach(async (to, from, next) => {
    // 开启进度条
    NProgress.start();

    if (to.path === "/login") {
      next();
    } else {
      if (window.store.state.user.token) {
        next();
      } else {
        next({ path: "/login", replace: true });
      }
    }
    // // 一、登录流程
    // // 步骤1.地址存在token信息，表示从统一页面登录也跳转过来，首先缓存token信息；
    // // 步骤2.获取菜单和用户信息，并缓存；
    // // 步骤3.地址跳转逻辑「调用进入系统，清除地址参数相关」
    // if (to.query["access_token"]) {
    //   // 步骤1
    //   window.auth.cacheToken(to.query["access_token"]);
    //   // 步骤2
    //   await window.auth.loadMenuInfo();
    //   await window.auth.loadUserInfo();
    //   // 步骤3
    //   window.auth.entrySystem(to.path, next, to.query);
    // }
    // // 二、正常页面跳转「已登录（缓存中存在Token）」
    // // 情况1.校验登录信息是否完整，存在「菜单信息」
    // //   步骤1).执行跳转路由
    // // 情况2.不存在「菜单信息」
    // //   步骤1).获取菜单信息
    // //   步骤2).执行跳转路由
    // else if (store.state.user.token) {
    //   // 情况1
    //   console.log(window.auth.checkLoginInfo());
    //   if (window.auth.checkLoginInfo()) {
    //     jumpRoute(to.path, next, to);
    //   }
    //   // 情况2
    //   else {
    //     // 步骤1)
    //     await window.auth.loadMenuInfo();
    //     // 步骤2)
    //     jumpRoute(to.path, next, to);
    //   }
    // }
    // // 三、非正常页面跳转「未登录（缓存中不存在Token）」
    // // 编码当前地址作为回调地址，以及其它登录必要参数，跳转到统一登录页面
    // else {
    //   window.auth.jumpLogin();
    // }
  });

  router.afterEach((to) => {
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    NProgress.done();// 结束Progress
  });
  return router;
}

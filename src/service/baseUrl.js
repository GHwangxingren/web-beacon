/*
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2020-06-25 12:09:53
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 19:29:27
 * 用法：挂在到vue原型全局
 *
 * 就可以直接  this.$HttpNomal.labelAll().then(res=>{})
 */
// const isProduction = process.env.NODE_ENV === 'production'; //根据环境处理
// const isTest= process.env.NODE_ENV === 'test'; //根据环境处理
// const isDev= process.env.NODE_ENV === 'dev'; //根据环境处理
// icon 库集合
const Env = {
    devLoginUrl: "//dev-app.easyliao.com/auth-sso/oauth/web/login/view",
    testLoginUrl: "//test.easyliao.com/auth-sso/oauth/web/login/view",
    prdLoginUrl: "//auth.easyliao.com/auth-sso/oauth/web/login/view"
  },

  apiBaseUrl = (type) => {
    let apis = {
      billing: {
        production: "/toll-collection-web",
        development: "/toll-collection-web"
      },
      bus: { production: "/boss-web", development: "/boss-web" },
      front: { production: '/boss-front', development: '/boss-front' },
      inner: { production: "/inner-admin", development: "/inner-admin" }
    };
    if (type) {
      return apis[type][process.env.NODE_ENV];
    }
    return apis["bus"][process.env.NODE_ENV];
  };

exports.Env = Env;
module.exports.Env = Env;
// module.exports.iconFontFaceArr = iconFontFaceArr;
// exports.iconFontFaceArr = iconFontFaceArr;
exports.apiBaseUrl = apiBaseUrl;
module.exports.apiBaseUrl = apiBaseUrl;

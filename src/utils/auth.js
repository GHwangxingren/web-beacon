import { Env } from "@/service/baseUrl";
import { inter } from '../utils/proxy'

export let params = {
  welcomeMessage: "欢迎登录BOSS管理系统",
  pageTitle: "BOSS系统",
  appId: "10000"
};

function getParams() {
  let params = {}
  let store = inter.getStore();
  const { welcomeMessage, pageTitle, appId } = store.state.appConfig;
  params.welcomeMessage = welcomeMessage;
  params.pageTitle = pageTitle;
  params.appId = appId;
  return params;
}

const obj = {
  originUrl: window.location.origin,
  loginUrl: '',
  unified: '',
  // 获取token
  async getToken(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      r = window.location.search.substr(1).match(reg);
    if (r !== null) {
      return unescape(r[2]);
    }
    return null;
  },
  // 跳转认证登录
  jumpLogin() {
    window.location.href = getunified();
  },
  // 进入项目
  async jumpOriginUrl() {
    window.history.pushState(null, null, this.originUrl);
  }
}
if (window.__sso) {
  obj.loginUrl = Env[window.__sso + "LoginUrl"];
} else {
  obj.loginUrl = process.env.VUE_APP_LOGIN_URL;
}
function getunified(params) {
  return obj.loginUrl + "?redirectUri=" + obj.originUrl + "&" + new URLSearchParams(getParams());
}



class Auth {
  constructor() {
    let params = {
      welcomeMessage: "欢迎登录BOSS管理系统",
      pageTitle: "BOSS系统",
      appId: "10000"
    };
    // 登录认证服务
    this.originUrl = window.location.origin;
    if (window.__sso) {
      this.loginUrl = Env[window.__sso + "LoginUrl"];
      // this.originUrl =  this.originUrl+'/web_beacon/view/';
    } else {
      this.loginUrl = process.env.VUE_APP_LOGIN_URL;
    }
    this.unified =
      this.loginUrl +
      "?redirectUri=" +
      this.originUrl +
      "&" +
      new URLSearchParams(params);
  }
  // 获取token
  async getToken(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      r = window.location.search.substr(1).match(reg);
    if (r !== null) {
      return unescape(r[2]);
    }
    return null;
  }
  // 跳转认证登录
  jumpLogin() {
    window.location.href = this.unified;
  }
  // 进入项目
  async jumpOriginUrl() {
    window.history.pushState(null, null, this.originUrl);
  }
}

// export default new Auth()
export default obj

import axios from "axios";
import { serveApi } from "./request";
import utils from "wb@/utils";

// const isProduction = process.env.NODE_ENV === 'production'; //根据环境处理
// const isTest = process.env.NODE_ENV === 'test'; //根据环境处理
// const isDev = process.env.NODE_ENV === 'dev'; //根据环境处理
// const islocal= process.env.NODE_ENV === 'local'; //根据环境处理

function getApiArr(Api, ApiMap, apiBaseUrl) {
  let apiArr = [];
  Api.forEach((item) => {
    let instance = {};
    instance.http = item.http;
    instance.fun = serveApi(
      axios.create({
        baseURL: window.__sso ? item[window.__sso + "Url"] : item.localUrl,
        timeout: 600000 // 请求超时时间
      }),
      item.name,
      ApiMap,
      apiBaseUrl
    );
    apiArr.push(instance);
  });
  return apiArr;
}
export function createService(Api, ApiMap, iconLinkArr, apiBaseUrl) {
  const apiArr = getApiArr(Api, ApiMap, apiBaseUrl);
  return {
    apiArr,
    install(Vue) {
      apiArr.forEach((item) => {
        Vue.prototype[item.http] = item.fun;
      });
      // addFontFace()
      utils.addLinkArr(iconLinkArr); //加载iconurl
    }
  }
}
export default {};

/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 1985-10-26 16:15:00
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/api/utilsApi.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 16:02:15
 */
import utils from "wb@/utils";

export function mergeExport(vueFiles) {
  let obj = {};
  Object.values(utils.readFile(vueFiles)).map((item) => {
    obj = { ...obj, ...item };
  });
  return obj;
}

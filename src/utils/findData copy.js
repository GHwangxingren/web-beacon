/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-06-30 11:00:54
 * @FilePath: /el-packaging-use/node_modules/web_beacon/src/utils/findData copy.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-30 11:00:55
 */
class NewData {
  //   从上往下找 第一个id 组成 ['2-2', '2-2-1', '2-2-1-1']
  getTreeExpandKeys({ id, children }, array = []) {
    array.push(id);
    if (children && children.length > 0) {
      for (let child of [children[0]]) {
        this.getTreeExpandKeys(child, array);
      }
    }
    return array;
  }
  // 侧边栏层级
  levelFun(array, menuFlag, levelName = "level", childrenName = "children") {
    if (!Array.isArray(array)) return [];
    const recursive = (array, level = -1) => {
      level++;
      return array.map((v) => {
        v[levelName] = level;
        const child = v[childrenName];
        if (child && child.length > 0) {
          if (menuFlag == "0") {
            for (let j of child || []) {
              j.icon = "";
            }
          }
          recursive(child, level);
        }
        return v;
      });
    };
    return recursive(array);
  }

  // 侧边栏层级
  // levelFun(arr,level1){
  //     var level=level1||-1;
  //     level++;
  //     for(let i=0;i<arr.length;i++){
  //         arr[i].level=level;
  //         if(arr[i].children){
  //             for (let j of arr[i].children || []) {
  //                 j.icon = "";
  //             }
  //             this.levelFun(arr[i],level);
  //         }
  //
  //     }
  //     return arr;
  // }
  // 获取数据id
  getDataId(treeData) {
    for (let i = 0; i < treeData.length; i++) {
      const item = treeData[i];
      if (item.disabled) {
        continue;
      }
      if (item.children && item.children.length > 0) {
        return this.getDataId(item.children);
      } else {
        return item;
      }
    }
  }

  // 递归id取当前数据 从上往下找
  //id:特定的id 和list数组中的匹配 取list对应的数据
  getParentId(list, id) {
    for (let o of list || []) {
      if (o.id == id) return o;
      if (o.children && o.children.length > 0) {
        const o_ = this.getParentId(o.children, id);
        if (o_) return o_;
      }
    }
  }

  // 把树拉平 (每个节点之间的联系依靠parentid)
  treeLevel(data) {
    const treeData = JSON.parse(JSON.stringify(data));
    const flattenData = [];
    let flattenTree = (data, parentid) => {
      data.forEach((ele) => {
        const { path, icon, name, id, children } = ele;
        flattenData.push({ path, icon, name, id, parentid });
        if (children && children.length > 0) {
          flattenTree(children, id, path, icon, name);
        }
      });
    };
    flattenTree(treeData, null);
    return flattenData;
  }

  /*
   *  把树拉平后的数据来找对应的数据 从下往上找  根据根据某个id  找到对应id数据
   *  如 根据0-0-2  找到id数组 ：['0','0-0-1','0-0-2']
   */
  findParentArr(item, flattenTree) {
    const parentArr = []; // 存所有的父级元素
    let find = (item, flattenTree) => {
      flattenTree.forEach((ele) => {
        if (ele.id === item) {
          // 找到ele.id数组 ：['0','0-0-1','0-0-2']
          // 找到ele数组对象 ：[[{"id":"1","icon":"icon-A-A2","name":"首页总框架","level":"0","children":[{"id":"1-1","icon":"","name":"首页总框架","disabled":true,"pid":"1"},{"id":"1-2","icon":"","path":"/newMenu","name":"主推框架样式","pid":"1"},{"id":"1-3","icon":"","path":"/oldMenu","name":"老版框架样式","pid":"1"}]},{"id":"1-3","icon":"","path":"/oldMenu","name":"老版框架样式","pid":"1"}]
          parentArr.unshift(ele);
          find(ele.parentid, flattenTree);
        }
      });
    };
    find(item, flattenTree);
    return parentArr;
  }
}

export default new NewData();

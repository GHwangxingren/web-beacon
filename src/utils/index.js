class Utils {
  // 全局设置
  serRootStyle(root, val, style) {
    let roots = document.querySelector(":" + root);
    return roots.style.setProperty(val, style);
  }
  // 锚点初始化
  goAnchorInit() {
    var layoutMain = document.getElementById("layout-main");
    if (layoutMain.scrollTop != null) layoutMain.scrollTop = 0;
  }
  // 锚点
  goAnchor(selector) {
    this.goAnchorInit();
    var anchor = document.querySelector(selector);
    // anchor.scrollIntoView({
    //   block: "end",
    //   behavior: "smooth",
    // });
  }
  // 唯一id
  guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  // js电话号码正则校验--座机和手机号
  // 移动 134(1349除外）135 136 137 138 139
  // 联通： 130 131 132 155 156 185 186  145
  // 电信：133 153 177 180 181 189
  // 固话 400-1001-1111： /^([0-9]{3,4}-)?[0-9]{3,4}-[0-9]{3,4}$/
  // 固话 0379-10011111：/^([0-9]{3,4}-)?[0-9]{7,8}$/
  checkTel(value) {
    var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    var isMob =
      /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    if (isMob.test(value) || isPhone.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  getModule(ks, value, modules, i, len) {
    modules = modules || {};
    if (i < len) {
      if (i == len - 1) {
        // 最后一层，赋值
        modules[ks[len - 1]] = value;
      } else {
        let m = {};
        // 在父级模块，是否存在对象
        if (modules[ks[i]] && modules[ks[i]]["modules"]) {
          m = modules[ks[i]]["modules"];
        } else if (modules[ks[i]]) {
          let pm = modules[ks[i]];
          m = pm["modules"];
          pm["namespaced"] = true;
        } else {
          let pm = modules[ks[i]] || {};
          modules[ks[i]] = pm;
          pm["modules"] = m;
          pm["namespaced"] = true;
        }

        i++;

        this.getModule(ks, value, m, i, len);
      }
    }
    return modules;
  }
  // 判断icon后缀css、js
  addLinkArr(srcArr) {
    let arr = srcArr;
    arr.forEach((item) => {
      if (/\.(?:css)$/.test(item)) {
        this.addCssByLink(item);
      } else if (item.match(".css")) {
        this.addCssByLink(item);
      } else if (/\.(?:js)$/.test(item)) {
        this.addJsByScript(item);
      }
    });
  }
  addCssByLink(url) {
    var doc = document;
    var link = doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);
    var heads = doc.getElementsByTagName("head");
    if (heads.length) heads[0].appendChild(link);
    else doc.documentElement.appendChild(link);
  }
  addJsByScript(url) {
    const s = document.createElement("script");
    s.type = "module";
    s.src = url;
    document.body.appendChild(s);
  }
  // 读取文件  正则后缀
  readFile(modulesFiles) {
    const modules = {};
    modulesFiles.keys().map((name) => {
      // 获取文件配置
      const componentConfig = modulesFiles(name);
      // 将被注册的组件名字,对获取的文件名进行处理
      const componentName = name
        .replace(/^\.\/_/, "")
        .replace(/\.\w+$/, "")
        .split("./")
        .join("");
      modules[componentName] = componentConfig.default || componentConfig;
    });
    return modules;
  }
}

export default new Utils();

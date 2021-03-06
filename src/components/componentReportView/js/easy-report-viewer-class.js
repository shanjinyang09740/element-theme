const cssBuilder = {
  /**
   *
   * @field
   */
  cssName: {
    borderRightWidth: "border-right-width",
    borderRightStyle: "border-right-style",
    borderRightColor: "border-right-color",
    borderBottomWidth: "border-bottom-width",
    borderBottomStyle: "border-bottom-style",
    borderBottomColor: "border-bottom-color",
    borderLeftWidth: "border-left-width",
    borderLeftStyle: "border-left-style",
    borderLeftColor: "border-left-color",
    borderTopWidth: "border-top-width",
    borderTopStyle: "border-top-style",
    borderTopColor: "border-top-color",

    verticalAlign: "vertical-align",
    align: "text-align",

    lineHeight: "line-height",

    textIndent: "text-indent",
    fontUnderline: "text-decoration",
    fontItalic: "font-style",
    fontBold: "font-weight",
    fontSize: "font-size",
    fontFamily: "font-family",
    fontColor: "color",

    backgroundColor: "background-color",
    backgroundImage: "background-image",
    backgroundRepeat: "background-repeat",
    backgroundPosition: "background-position",

    height: "height",
    width: "width",
  },

  /**
   *
   * @field
   */
  styleMap: {
    textControl: {
      1: {},
      2: {
        "white-space": "normal",
        "word-wrap": "break-word",
      },
      3: {
        "white-space": "nowrap",
        "word-wrap": "normal",
      },
    },
  },

  /**
   *
   * @field
   */
  borderStyle: {
    0: "",
    2: "solid",
    3: "dashed",
    6: "double",
    7: "dotted",

    solid: 2,
    dashed: 3,
    double: 6,
    dotted: 7,
  },

  /**
   *
   * @field
   */
  verticalAlign: {
    0: "top",
    1: "middle",
    2: "bottom",

    top: 0,
    middle: 1,
    bottom: 2,
  },

  /**
   *
   * @field
   */
  align: {
    0: "general",
    1: "left",
    2: "center",
    3: "right",

    general: 0,
    left: 1,
    center: 2,
    right: 3,
  },

  /**
   *
   * @field
   */
  fontBold: {
    1: "bold",
    0: "normal",

    bold: 1,
    normal: 0,
  },

  /**
   *
   * @field
   */
  fontItalic: {
    1: "italic",
    0: "normal",

    italic: 1,
    normal: 0,
  },

  /**
   *
   * @field
   */
  fontUnderline: {
    1: "underline",
    0: "none",

    underline: 1,
    none: 0,
  },

  /**
   *
   * @field
   */
  textControl: {
    1: "hidden",
    2: "wrap",
    3: "reduce",

    hidden: 1,
    wrap: 2,
    reduce: 3,
  },

  /**
   *
   * @param  {unknown} cssData {}
   * @param  {unknown} key
   * @param  {unknown} value
   * @return {unknown}
   * @example
   * func({}, 'cellValue', 1);
   * func({}, {k:v})
   */
  appendCssData: function(cssData, key, value) {
    if (value === undefined) {
      for (var k in key) {
        this.appendCssData(cssData, k, key[k]);
      }

      return this;
    }

    // ???????????????
    if (this.styleMap[key]) {
      var d = this.styleMap[key][value];

      for (var k in d) {
        cssData[k] = d[k];
      }

      return this;
    }

    // css??????
    var cssKey = this.cssName[key];

    if (cssKey === undefined) {
      return this;
    }

    var valueMap = this[key];
    if (valueMap !== undefined) {
      cssData[cssKey] = valueMap[value];
      return this;
    }

    if (cssKey.indexOf("border-") != -1 && cssKey.indexOf("-style") != -1) {
      cssData[cssKey] = this.borderStyle[value];
      return this;
    }

    cssData[cssKey] = value;

    return this;
  },
};

/**
 * @class
 * @description event?????????(?????????????????????)
 * @author ZHAO.CJ
 */
class Event {
  /**
   * @constructor
   */
  constructor() {
    this.eventMap = new Map();
    this.step = 1;
  }

  /**
   * @description ????????????
   * @param {String} name ?????????
   * @param {Function} callback ????????????
   */
  on(name, callback) {
    let UUID = `${Date.now()}-${this.step++}`;
    if (!this.eventMap.has(name)) {
      this.eventMap.set(name, new Map());
    }
    this.eventMap.get(name).set(UUID, {
      callback: callback,
      once: false,
    });
    return UUID;
  }

  /**
   * @description ??????????????????
   * @param {String} name ?????????
   * @param {Function} callback ????????????
   */
  once(name, callback) {
    let UUID = `${Date.now()}-${this.step++}`;
    if (!this.eventMap.has(name)) {
      this.eventMap.set(name, new Map());
    }
    this.eventMap.get(name).set(UUID, {
      callback: callback,
      once: true,
    });
    return UUID;
  }

  /**
   * @description ??????????????????
   * @param {String} name ?????????
   * @param {Function|String|?} info ????????????|???????????????ID
   */
  off(name, info) {
    if (this.eventMap.has(name)) {
      let ite = this.eventMap.get(name);
      if (info === undefined) {
        // ??????name?????????callback
        this.eventMap.delete(name);
      } else if (typeof info === "function") {
        // ????????????????????????
        for (let [id, info] of ite) {
          if (info.callback === info) {
            ite.delete(id);
          }
        }
      } else {
        // ??????id????????????
        ite.delete(info);
      }
    }
  }

  /**
   * @description ????????????
   * @param {String} name ?????????
   * @param {Object} data ??????
   */
  emit(name, data) {
    if (this.eventMap.has(name)) {
      let ite = this.eventMap.get(name);
      for (let [id, info] of ite) {
        info.callback(data);
        if (info.once) {
          ite.delete(id);
        }
      }
    }
  }
}

/**
 * @class
 * @description ??????????????????
 * @author ZHAO.CJ
 */
class TopicReport extends Event {
  /**
   * @constructor
   * @description ?????????
   * @param {Object<ReportData>|?} reportData ??????????????????
   * @param {Object|?} reportSize ???????????? {width: '100%', height: '100%'}
   */
  constructor(reportData, reportSize) {
    super();
    this._styleRenderType = 1;
    if (reportSize) {
      this.resize(reportSize);
    }
    if (reportData) {
      this.loadData(reportData);
    }
    this._isBindEventListener = false;
    this._lastRenderRootElement = null;
  }
  /**
   * @description ?????????????????????dom??????
   * @param {*} rootElement
   */
  renderTo(rootElement) {
    if (this._lastRenderRootElement !== rootElement) {
      this._lastRenderRootElement = rootElement;
      this._isBindEventListener = false;
    }
    if (rootElement instanceof Element) {
      this.rootElement = rootElement;
      this._appendToTarget();
    } else {
      console.error(`????????????Element??????`);
    }
  }
  /**
   * @description ????????????????????????
   * @param {String} reportFileName ???????????????
   * @param {Object|?} reportParams ????????????
   */
  request(reportFileName, reportParams) {
    var self = this;
    // ???????????????????????????????????????
    reportParams = JSON.stringify(reportParams);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/bi/report/loadCalculatedReport.action");

    xhr.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded; charset=utf-8"
    );

    xhr.setRequestHeader(
      "Accept",
      "application/json, text/javascript, */*; q=0.01"
    );
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let resData = JSON.parse(this.responseText);
          self.loadData(JSON.parse(resData.data[0].data), true);
        } else {
          var resJson = {
            code: this.status,
            response: this.response,
          };
          console.error(resJson);
        }
      }
    };

    let postData = `postData=${JSON.stringify({
      data: [
        {
          vtype: "attr",
          name: "reportFile",
          data: reportFileName,
        },
        {
          vtype: "attr",
          name: "paramValue",
          data: reportParams || "",
        },
      ],
    })}`;

    xhr.send(postData);
  }
  /**
   * @description ???????????????????????????????????????
   * @param {Object<ReportData>} reportData
   * @param {Boolean} isAutoRender [true] ????????????????????????
   */
  loadData(reportData, isAutoRender = true) {
    this.reportData = reportData;
    if (isAutoRender) {
      if (this.reportElement) {
        this.reportElement.remove();
      }
      this.reportElement = this._renderElement();
      this._resizeElement();
      this._appendToTarget();
    }
  }
  /**
   * @description ????????????????????????????????????????????????????????????????????????
   */
  render() {
    if (this.reportData) {
      if (this.reportElement) {
        this.reportElement.remove();
      }
      this.reportElement = this._renderElement();
      this._resizeElement();
      this._appendToTarget();
    } else {
      console.error(`[EASY_REPORT]<render> ??????????????????`);
    }
  }
  /**
   * @description ??????????????????
   * @param {Object|?} reportSize ???????????? {width: '100%', height: '100%'}
   */
  resize(reportSize) {
    this.reportSize = reportSize;
    this._resizeElement();
  }
  /**
   * @description ????????????css????????????
   * @param {String} type ???????????? autoBuild: ??????cell.p??????????????????style; cssKey: ????????????cell.p.css???style
   */
  setStyleRender(type) {
    switch (type) {
      case "autoBuild":
        this._styleRenderType = 1;
        break;
      case "cssKey":
        this._styleRenderType = 2;
        break;
      default:
        console.warn(`[EASY_REPORT]<setCssRender> ???????????????????????????`);
    }
  }
  /**
   * @description ???????????????????????????
   * @private
   */
  _resizeElement() {
    if (this.reportElement) {
      let reportSize = this.reportSize || {
        width: "100%",
        height: "100%",
      };
      this.reportElement.style.width = reportSize.width || "100%";
      this.reportElement.style.height = reportSize.height || "100%";
    }
  }
  /**
   * @description ???????????????????????????????????????
   * @private
   */
  _appendToTarget() {
    if (this.reportElement && this.rootElement) {
      this.rootElement.appendChild(this.reportElement);
      if (!this._isBindEventListener) {
        this._bindEventListener();
        this._isBindEventListener = true;
      }
    }
  }
  /**
   * @description ??????????????????
   * @private
   */
  _renderElement() {
    let data = this.reportData;
    const DEFAULT_VALUE_MAP = this._getDefaultValue();

    let reportWrapper = document.createElement("div");
    reportWrapper.classList.add("report-wrapper");

    let reportDiv = document.createElement("div");
    reportDiv.classList.add("report-div");

    let reportBody = document.createElement("div");
    reportBody.classList.add("report-body");

    let reportSheet = document.createElement("div");
    reportSheet.classList.add("report-sheet");

    let reportSheetTable = document.createElement("table");
    reportSheetTable.classList.add("report-sheet-table");
    reportSheetTable.setAttribute("cellspacing", "0");
    reportSheetTable.setAttribute("cellpadding", "0");
    reportSheetTable.setAttribute("border", "0");
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.style = "width:0px;";
    tr.appendChild(th);
    data.sheet.cols.forEach(({ p }) => {
      let th = document.createElement("th");
      // ????????????????????????????????????????????????css????????????????????????????????? ???????????????
      // ????????????css??????
      if (this._styleRenderType === 1) {
        th.style = this._getStyle(p);
      } else if (this._styleRenderType === 2) {
        th.style = p.css || DEFAULT_VALUE_MAP.get("columnCss");
      }
      tr.appendChild(th);
    });
    thead.appendChild(tr);

    let tbody = document.createElement("tbody");
    data.sheet.rows.forEach(({ p, cells }) => {
      let tr = document.createElement("tr");
      let th = document.createElement("th");
      // ????????????????????????????????????????????????css????????????????????????????????? ???????????????
      // ????????????css??????
      if (this._styleRenderType === 1) {
        th.style = this._getStyle(p);
      } else if (this._styleRenderType === 2) {
        th.style = p.css || DEFAULT_VALUE_MAP.get("rowCss");
      }
      tr.appendChild(th);
      cells.forEach(({ p }) => {
        let td = document.createElement("td");
        // ????????????????????????????????????????????????css????????????????????????????????? ???????????????
        // ????????????css??????
        if (this._styleRenderType === 1) {
          td.style = this._getStyle(p);
        } else if (this._styleRenderType === 2) {
          td.style = p.css || DEFAULT_VALUE_MAP.get("cellCss");
        }
        if (p.rowspan !== undefined) {
          td.setAttribute("rowspan", p.rowspan);
        }
        if (p.colspan !== undefined) {
          td.setAttribute("colspan", p.colspan);
        }
        if (p.rowspan === 0 && p.colspan === 0) {
          td.style.display = "none";
        }
        td.setAttribute("name", p.name);
        td.innerHTML = p.cellValue || DEFAULT_VALUE_MAP.get("cellValue") || "";
        td.classList.add("cell");
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    reportSheetTable.appendChild(thead);
    reportSheetTable.appendChild(tbody);

    reportSheet.appendChild(reportSheetTable);
    reportBody.appendChild(reportSheet);
    reportDiv.appendChild(reportBody);
    reportWrapper.appendChild(reportDiv);

    return reportWrapper;
  }
  /**
   * @description ??????????????????
   * @private
   */
  _getDefaultValue() {
    let data = this.reportData;
    let defaultValueMap = new Map();
    for (let key in data.dp.report) {
      defaultValueMap.set(key, data.dp.report[key]["defaultValue"]);
    }
    return defaultValueMap;
  }
  /**
   * @description ????????????
   */
  _bindEventListener() {
    this.rootElement.addEventListener("click", (e) => {
      let target = e.target;
      if (
        target.tagName.toLocaleUpperCase() === "TD" &&
        target.classList.contains("cell")
      ) {
        this.emit("cellClick", {
          target,
          name: target.getAttribute("name"),
        });
      }
    });
  }
  _getStyle(config) {
    let styleMap = {};
    cssBuilder.appendCssData(styleMap, config);
    let styleString = "";
    for (let key in styleMap) {
      let value = styleMap[key];
      styleString += `${key}:${value}${isNaN(value) ? "" : "px"};`;
    }
    return styleString;
  }
}

export  { TopicReport };

//配置页面
var productPages = {
  index: {
    entry: "src/main.js",
    template: "public/index.html",
    filename: "index.html",
    title: "首页",
  },
  MultiLevelFilter: {
    entry: "src/pages/MultiLevelFilter/index.js",
    template: "public/index.html",
    filename: "multiLevelFilter.html",
    title: "多级筛选",
  },
  Pdf: {
    entry: "src/pages/Pdf/index.js",
    template: "public/index.html",
    filename: "pdf.html",
    title: "VuePdf",
  },
};

//打包
var pages = Object.assign({}, productPages);

module.exports = pages;

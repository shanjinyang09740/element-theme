const path = require("path");
const URL = "cqtjj.hgk.jck.test.gofusion.cn";

const resolve = (dir) => path.join(__dirname, dir);

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const PUBLIC_PATH = IS_PRODUCTION ? "." : ".";

module.exports = {
  //构建好的文件放在哪个目录
  outputDir: "./dist/elementTheme",
  //放静态资源（js、css、image、fonts）
  assetsDir: "./static",
  lintOnSave: false, // 关闭ESLint编译
  publicPath: PUBLIC_PATH,
  css: {
    // 配置css模块
    loaderOptions: {
      // 向预处理器 Loader 传递配置选项
      less: {
        lessOptions: {
          // 配置less（其他样式解析用法一致）
          javascriptEnabled: true, // 设置为true
        },
      },
    },
    extract: false,
  },
  chainWebpack: (config) => {
    //热替换
    config.resolve.alias
      .set("root", resolve("/"))
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@utils", resolve("src/utils"))
      .set("@com", resolve("src/components"))
      .set("@assets", resolve("src/assets"));
  },
  // 打包相关
  configureWebpack: {
    devtool: "source-map",
    module: {
      rules: [],
    },
    optimization: {
      splitChunks: false,
    },
  },
  devServer: {
    proxy: {
      "/login": {
        target: `http://${URL}:9000`,
        changeOrigin: true,
        autoRewrite: true,
        pathRewrite: {
          "^/login": "/login",
        },
      },
      "/api": {
        target: `http://${URL}:9000`,
        changeOrigin: true,
        autoRewrite: true,
      },
      "/bi": {
        target: `http://${URL}:9000`,
        changeOrigin: true,
        autoRewrite: true,
      },
      "/meta": {
        target: `http://${URL}:9000`,
        changeOrigin: true,
        autoRewrite: true,
      },
    },
  },
};

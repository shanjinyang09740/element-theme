import http from "./axiosConfig";
import qs from "qs";

//接口对象
let getData = {};

//基准url地址
let baseUrl = "/api";

//请求登录用户信息
getData.ajaxData = (url, data) => {
  return http.post(
     baseUrl + url,
      qs.stringify(data)
  );
};

//导出模块
export default getData;

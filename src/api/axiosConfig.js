import axios from "axios";

//初始化请求
let http = axios.create();

//请求拦截
http.interceptors.request.use((config) => {
  return config;
});

//响应拦截
http.interceptors.response.use((response) => {
  return response.data;
});

//抛出模块
export default http;

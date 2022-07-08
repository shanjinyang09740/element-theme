import { Notification } from "fusion-ui";
//引入判断数据是否为json类型方法
import { isJsonString } from "@/utils/tools";

/**
 * @description get请求方法
 * @param {String} url 请求路径
 * @returns {Object | String} response
 */
export const getAjax = (url) => {
  //返回promise对象
  return new Promise(function(resolve, reject) {
    //创建xml对象
    var xhr = new XMLHttpRequest();
    //建立请求服务器连接
    xhr.open("get", url);
    //只要进入onload函数中，一定是已经到状态码(HTTP)为 4 这个状态了
    xhr.onload = function() {
      if (xhr.status == 200) {
        let result = isJsonString(xhr.response)
          ? JSON.parse(xhr.response)
          : xhr.response;
        resolve(result);
      } else {
        //处理请求错误信息
        reject();
      }
    };
    //处理网络错误信息
    xhr.onerror = function() {
      reject(Error("Network Error"));
    };
    //发送请求
    xhr.send();
  });
};

/**
 * @description post请求方法
 * @param {String} url 请求路径
 * @param {Object} paramsObj 请求参数
 * @returns {Object | String} response
 */
export const postAjax = (url, paramsObj) => {
  //返回promise对象
  return new Promise(function(resolve, reject) {
    //创建xml对象
    var XHR = new XMLHttpRequest();
    //建立请求服务器连接 --- true 为异步请求
    XHR.open("POST", url, true);
    //设置请求头
    XHR.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded; charset=utf-8"
    );
    XHR.setRequestHeader(
      "Accept",
      "application/json, text/javascript, */*; q=0.01"
    );
    XHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    //处理请求参数
    let postDataArr = [];
    for (var key in paramsObj) {
      postDataArr.push(_addParam(key, paramsObj[key]));
    }

    /**
     * @description 处理相应错误监听
     */
    XHR.addEventListener("load", (e) => {
      if (e.currentTarget.status !== 200) {
        let connectPerson = "";
        if (e.currentTarget.status === 500) {
          connectPerson = "请联系后端开发！";
        } else if (e.currentTarget.status === 401) {
          connectPerson = "当前状态未登录，请登录！";
        } else if (e.currentTarget.status === 403) {
          connectPerson = "您的账户没有权限，请联系项目组人员！";
        } else if (e.currentTarget.status === 404) {
          connectPerson = "当前接口无法访问，请联系运维组人员！";
        }
        if (e.currentTarget.status !== 501) {
          Notification.error({
            title: `请求发生错误`,
            dangerouslyUseHTMLString: true,
            message: `<h5>错误的url：</h5>
                         <div>${e.currentTarget.responseURL}</div>
                         <h5>错误信息：</h5>
                         <div>${e.currentTarget.responseText}  ${connectPerson}</div>`,
          });
        } else {
          console.log(
            "接口501了，现在501的请求接口不再弹出右侧的框，可在catch里拿到信息"
          );
        }
      } else {
        try {
          let responseText = e.currentTarget.responseText;
          responseText = JSON.parse(responseText);
          if (
            !(
              Array.isArray(responseText.data) &&
              !!responseText.data[0] &&
              Object.prototype.toString.call(responseText.data[0]) ===
                "[object Object]"
            )
          ) {
            Notification.error({
              title: `请求返回格式非通用格式`,
              dangerouslyUseHTMLString: true,
              message: `<h5>错误的url：</h5>
                           <div>${e.currentTarget.responseURL}</div>
                           <h5>返回格式：</h5>
                           <div>${e.currentTarget.responseText}</div>`,
            });
          }
        } catch (error) {}
      }
    });

    //处理请求返回数据
    XHR.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          try {
            resolve(JSON.parse(this.responseText), this);
          } catch (error) {
            resolve(this.responseText);
          }
        } else {
          var resJson = {
            code: this.status,
            response: this.response,
          };
          reject(resJson, this);
        }
      }
    };

    XHR.send(postDataArr.join("&").replace(/%20/g, "+"));
  });
};

/**
 * @description 处理post请求参数
 * @param {String} key
 * @param {String} key
 * @returns {String} val
 */
function _addParam(key, value) {
  // If value is a function, invoke it and return its value
  value =
    Object.prototype.toString.call(value) === "Function"
      ? value()
      : value == null
      ? ""
      : value;
  return encodeURIComponent(key) + "=" + encodeURIComponent(value);
}

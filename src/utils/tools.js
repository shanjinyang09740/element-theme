import axios from "axios";

/***
 * @decription 防抖函数--- 用户触发事件过于频繁，控制事件函数只执行最后一次----可作用于输入框
 * @param {Function} fn 传入的主体函数
 * @param {String} delay 延迟时间
 *
 */
export const debounce = (fn, delay) => {
    let t = null;
    return function() {
        if (t !== null) {
            clearTimeout(t);
        }
        t = setTimeout(() => {
            fn.call(this);
        }, delay);
    };
};

/**
 * @description 判断传入的是否为json类型数据
 * @param {} data
 * @returns {Boolean}
 */
export const isJsonString = (data) => {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        }
    } catch (e) {
        return false;
    }
    return false;
};

/**
 * @description 复杂对象数组去重---根据数组中对象的某个属性进行过滤
 * @param {Array} arr 传入的数组
 * @param {String} arr 传入的属性
 */
export const arrDistinctByProp = (arr, prop) => {
    return arr.filter(function(item, index, self) {
        return self.findIndex((el) => el[prop] == item[prop]) === index;
    });
};

/**
 * @description 复杂对象数组排序---根据数组中对象的某个属性进行排序
 * @param {Array} arr 传入的数组
 * @param {String} arr 传入的属性
 */
export const sortByProp = (field) => {
    return function(a, b) {
        return a[field] - b[field];
    };
};

/**
 * @description 生成组件id
 *
 */
export const setComponentId = () => {
    let random = Number(Math.random().toString().substring(3, 16));
    let timestaper = Number(Date.now());
    return `component${(random + timestaper).toString()}`;
};

/**
 * @description 返回数组匹配项
 * @param {Array} arr 数组
 * @param {String} key 匹配字段
 * @param {String} value 匹配值
 * @returns {Number} _index 数组索引
 *
 */
export const getDicArrayItem = (arr, key, value) => {
    let _index = null;
    if (Array.isArray(arr)) {
        arr.some((item, index) => {
            if (item[key] == value) {
                _index = index;
                return true;
            }
        });
    }
    return _index;
};

/**
 * @description 根据参数名字获取url参数值
 * @param {*} name 参数名称
 * @param {*} locationSearch  window.location.search 可不传，不传函数内部会自己取，为url中?后边的那部分
 * @returns 参数值
 */
export const getUrlParam = (name, locationSearch) => {
    locationSearch = locationSearch || window.location.search;
    let obj = new URLSearchParams(locationSearch);
    return obj.get(name);
};

/**
 *
 * @param {*} params 传递给后台的参数
 * @param {*} url 后台请求url
 * @param {*} fileName 下载后的文件名，包含扩展名
 */
export const downloadFilePost = (params, url, fileName) => {
    const postData = new URLSearchParams();
    postData.append("postData", JSON.stringify(params));
    axios({
            url: url,
            method: "post",
            data: postData,
            responseType: "blob",
        })
        .then((res) => {
            let url = window.URL.createObjectURL(res.data); //表示一个指定的file对象或Blob对象
            console.log(url, "看一下这是啥");
            let a = document.createElement("a");
            document.body.appendChild(a);
            fileName = `${fileName}.docx`; //filename名称截取
            a.href = url;
            a.download = fileName; //命名下载名称
            a.click(); //点击触发下载
            window.URL.revokeObjectURL(url);
        })
        .catch(() => {});
};
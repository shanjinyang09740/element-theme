/**
 * @description 定义拖拽函数类
 */
class Drag {
  constructor() {
    //声明拖拽目标及父容器dom
    this.dragDom = null;
    this.dragParentDom = null;
    //拖拽目标对象相对于拖拽父容器对象的位置坐标
    this.disX = 0;
    this.disY = 0;
    //设置默认配置参数
    this.setting = {
      //拖拽目标id
      id: "",
      //拖拽目标的父容器id
      parentId: "",
      //是否限制只在父容器区域拖拽
      flag: false,
    };
  }
  /**
   * @description 初始化拖拽函数
   * @param {Object} paramsObj 拖拽数据对象
   */
  init(paramsObj) {
    const That = this;
    //初始化拖拽目标对象dom
    this.dragDom = paramsObj.id
      ? document.querySelector("#" + paramsObj.id)
      : null;
    //初始化拖拽目标的父容器对象dom
    this.dragParentDom = paramsObj.parentId
      ? document.querySelector("#" + paramsObj.parentId)
      : null;
    //拷贝实例传入的配置参数，覆盖默认配置参数
    extendFunc(this.setting, paramsObj);
    //鼠标按下事件处理
    this.dragDom.onmousedown = function(ev) {
      var evt = ev || window.ev;
      //设置鼠标按下时刻相对于父容器的位置坐标
      That.fnDown(evt);

      //鼠标移动事件
      document.onmousemove = function(ev) {
        var evt = ev || window.event;
        //鼠标移动过程中拖拽目标对象相对父容器的位置
        That.fnMove(evt);
      };

      //鼠标抬起事件
      document.onmouseup = function() {
        //鼠标抬起时，移除鼠标移动和鼠标抬起事件
        That.fnUp();
      };
      return false;
    };
  }
  /**
   * @description 设置鼠标按下时刻相对于父容器的位置坐标
   * @param {Object} ev 事件对象
   */
  fnDown(ev) {
    this.disX = ev.clientX - this.dragDom.offsetLeft;
    this.disY = ev.clientY - this.dragDom.offsetTop;
  }
  /**
   * @description 鼠标移动过程中拖拽目标对象相对父容器的位置（并根据传入的参数flag， 添加拖拽范围限制条件）
   * @param {Object} 事件对象
   */
  fnMove(ev) {
    let L = ev.clientX - this.disX,
      T = ev.clientY - this.disY;

    if (this.setting.flag) {
      let dragAreaMaxLeft =
          viewWidth(this.dragParentDom) - this.dragDom.offsetWidth,
        dragAreaMaxTop =
          viewHeight(this.dragParentDom) - this.dragDom.offsetHeight;
      if (L < 0) {
        L = 0;
      } else if (L > dragAreaMaxLeft) {
        L = dragAreaMaxLeft;
      }
      if (T < 0) {
        T = 0;
      } else if (T > dragAreaMaxTop) {
        T = dragAreaMaxTop;
      }
    }
    //设置拖拽对象左上角位置
    this.dragDom.style.left = L + "px";
    this.dragDom.style.top = T + "px";
  }
  /**
   * @description 鼠标抬起时，移除鼠标移动和鼠标抬起事件
   */
  fnUp() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

/**
 * @description 当前拖拽区域的宽度（如果没有设置父容器，则拖拽区域为可视区域）
 * @param {Object} parentDom 拖拽对象的父容器对象
 */
function viewWidth(parentDom) {
  return parentDom && parentDom.offsetWidth
    ? parentDom.offsetWidth
    : document.documentElement.clientWidth;
}

/**
 * @description 当前拖拽区域的高度（如果没有设置父容器，则拖拽区域为可视区域）
 * @param {Object} parentDom 拖拽对象的父容器对象
 */
function viewHeight(parentDom) {
  return parentDom && parentDom.offsetHeight
    ? parentDom.offsetHeight
    : document.documentElement.clientHeight;
}

/**
 * @description 对象拷贝属性覆盖方法
 * @param {Object} originObj
 * @param {Object} passObj
 */
function extendFunc(originObj, passObj) {
  for (let key in passObj) {
    originObj[key] = passObj[key];
  }
}

/**
 * @description 导出（向外暴露）拖拽函数类
 */
export {
    Drag
};

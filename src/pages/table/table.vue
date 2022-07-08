<template>
  <div class="container" id="container" v-clickoutside="triggerOutTableEvent">
    <table-child :tableData="tableData"></table-child>
    <div id="menu" v-show="isShowRightMenu">
      <ul>
        <li><span>插入行</span></li>
        <li>
          <span>插入列</span>
        </li>
        <li><span>删除行</span></li>
        <li><span>删除列</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
//自定义事件---点击除目标容器外空白区域触发
Vue.directive("clickoutside", {
  bind(el, binding) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    }
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  unbind(el) {
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
});
import TableChild from "./tableChild.vue";
export default {
  name: "Table",
  components: {
    TableChild,
  },
  // extends: null,
  // minxins: [],
  props: {},
  data() {
    return {
      //鼠标右键菜单是否显示
      isShowRightMenu: false,
      tableData: [
        {
          id: "1",
          text: "",
          value: "",
          type: "tr",
          children: [
            {
              id: "1-1",
              text: "11",
              value: "",
              type: "td",
            },
            {
              id: "1-2",
              text: "12",
              value: "",
              type: "td",
              children: [
                {
                  id: "1-2-1",
                  text: "",
                  value: "",
                  type: "tr",
                  children: [
                    {
                      id: "1-2-1-1",
                      text: "",
                      value: "",
                      type: "td",
                      children: [
                        {
                          id: "1-2-1-1-1",
                          text: "",
                          value: "",
                          type: "tr",
                          children: [
                            {
                              id: "1-2-1-1-1-1",
                              text: "",
                              value: "",
                              type: "td",
                            },
                            {
                              id: "1-2-1-1-1-2",
                              text: "",
                              value: "",
                              type: "td",
                            },
                            {
                              id: "1-2-1-1-1-3",
                              text: "",
                              value: "",
                              type: "td",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "1-2-1-2",
                      text: "",
                      value: "",
                      type: "td",
                    },
                  ],
                },
                {
                  id: "1-2-2",
                  text: "",
                  value: "",
                  type: "tr",
                  children: [
                    {
                      id: "1-2-2-1",
                      text: "",
                      value: "",
                      type: "tr",
                    },
                    {
                      id: "1-2-2-2",
                      text: "",
                      value: "",
                      type: "tr",
                    },
                  ],
                },
              ],
            },
            {
              id: "1-3",
              text: "13",
              value: "",
              type: "td",
            },
          ],
        },
        {
          id: "2",
          text: "",
          value: "",
          type: "tr",
          children: [
            {
              id: "2-1",
              text: "21",
              value: "",
              type: "td",
            },
            {
              id: "2-2",
              text: "22",
              value: "",
              type: "td",
            },
            {
              id: "2-3",
              text: "",
              value: "",
              type: "td",
            },
          ],
        },
        {
          id: "3",
          text: "",
          value: "",
          type: "tr",
          children: [
            {
              id: "3-1",
              text: "",
              value: "",
              type: "td",
            },
            {
              id: "3-2",
              text: "",
              value: "",
              type: "td",
            },
            {
              id: "3-3",
              text: "33",
              value: "",
              type: "td",
            },
          ],
        },
      ],
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    //注册初始化默认事件
    this.registerEvent();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    /**
     * @description 表格外部点击事件
     */
    triggerOutTableEvent() {
      //隐藏右键菜单
      this.isShowRightMenu = false;
    },
    /**
     * @description 注册初始化默认事件
     */
    registerEvent() {
      //注册鼠标右键事件
      this.registerMouseRightClick();
    },
    /**
     * @description 注册鼠标右键事件
     */
    registerMouseRightClick() {
      const THAT = this;
      //去掉默认的contextmenu事件，否则会和右键事件同时出现。
      document.oncontextmenu = function(e) {
        e.preventDefault();
      };
      document.querySelector("#container").onmousedown = function(e) {
        console.log("target1", e.target.hasAttribute("class"));
        console.log("target", e.target.getAttribute("class"));
        if (e.button == 2) {
          //鼠标右键
          e.preventDefault();
          let menu = document.querySelector("#menu");
          //树dom相对浏览器的坐标
          let { x: containerX, y: containerY } = document
            .querySelector("#container")
            .getBoundingClientRect();
          // 根据事件对象中鼠标点击的位置，进行定位
          menu.style.left = e.clientX - containerX + "px";
          menu.style.top = e.clientY - containerY + "px";
          THAT.isShowRightMenu = true;
        } else if (e.button == 0) {
          //鼠标左键
          THAT.isShowRightMenu = false;
        }
      };
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 50px auto;
  position: relative;
}
#menu {
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #ffffff;
  cursor: pointer;
  color: #606266;
  width: 200px;
  border: 1px solid #e4e7ed;
  font-size: 16px;
}

#menu ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

#menu ul li {
  padding: 0px 10px;
  height: 30px;
  line-height: 30px;
  position: relative;
  box-sizing: border-box;
  text-indent: 8px;
}
#menu ul li .iconfont {
  float: right;
}

#menu ul li ul {
  display: none;
  position: absolute;
  left: 200px;
  top: 0px;
  width: 200px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

#menu ul li ul li {
  background-color: #fff;
}

#menu ul li:hover {
  background-color: #ecf5ff;
}

#menu ul li:hover ul {
  display: block;
}
</style>

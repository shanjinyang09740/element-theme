<template>
  <div>
    <div class="view-list">
      <div class="item" v-for="(item, index) in testArr" :key="index">
        内容................{{ item }}
      </div>
      <div ref="loading">加载中</div>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/tools";
import { MyEmitter } from "@/utils/eventEmitter";

export default {
  data() {
    return {
      //初始化数据
      testArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      //观察器
      io: null,
    };
  },
  // 页面初始化 created activated
  created() {
    /**
     * @description 实例化事件
     */
    const myEmitter = new MyEmitter();
    /**
     * @description 订阅事件
     */
    myEmitter.on("event01", function (a, b) {
      console.log(a, b, this);
    });
    myEmitter.once("event02", function (a, b) {
      console.log(a, b, this);
    });

    /**
     * @description 触发事件
     */
    myEmitter.emit("event01", "123", "456");
    myEmitter.emit("event01", "1231", "4561");
    myEmitter.emit("event02", "78", "89");
    myEmitter.emit("event02", "781", "891");
  },
  // 计算属性顾名思义就是通过其他变量计算得来的另一个属性
  computed: {},
  // 侦听一个特定的值，当该值变化时执行特定的函数
  watch: {},
  // 页面加载完
  mounted() {
    // 初始化观察对象
    this.io = new IntersectionObserver(this.handleScroll, {});
    // 获取被监听元素
    let viewList = this.$refs.loading;
    // 绑定
    this.io.observe(viewList);
  },
  // 页面离开 destroyed deactivated
  destroyed() {
    console.log("---关闭观察器---");
    // 关闭观察器
    this.io.disconnect();
  },
  methods: {
    handleScroll(status) {
      console.log("-----handleScroll----");
      const THAT = this;
      debounce(THAT.sayDebounce(status), 500);
    },
    // 触发监听回调
    sayDebounce(status) {
      console.log("防抖成功");
      status = status[0];
      let isShow = status.isIntersecting;
      if (isShow) {
        console.log("加载中 ---- ");
        let arr = [];
        for (
          let i = this.testArr.length + 1;
          i < this.testArr.length + 10;
          i++
        ) {
          arr.push(i);
        }
        console.log(arr);
        let test = this.testArr.concat(arr);
        this.testArr = test;
        console.log(this.testArr);
      }
    },
  },
};
</script>
<style>
.view-list {
  width: 100%;
  height: 100vh;
  overflow-x: scroll;
  background-color: rgba(0, 0, 255, 0.25);
}
.item {
  height: 50px;
  border: 1px gray solid;
  margin-bottom: 10px;
}
</style>

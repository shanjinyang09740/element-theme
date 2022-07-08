<template>
  <div>
    <div id="contain" class="contain">
      <div id="drag" class="drag"></div>
    </div>
  </div>
</template>

<script>
import { Drag } from "@/utils/drag.js";
export default {
  name: "classApply",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    //初始化拖拽函数
    this.initDrag();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    /**
     * @description 初始化拖拽函数
     */
    initDrag() {
      const Drag1 = new Drag();

      Drag1.init({
        id: "drag",
        parentId: "contain",
        //是否限制在父容器内拖拽
        flag: true,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.contain {
  width: 500px;
  height: 500px;
  border: 1px solid red;
  margin: 50px auto;
  position: relative;
  .drag {
    width: 50px;
    height: 50px;
    background-color: blue;
    position: absolute;
    cursor: pointer;
  }
}
</style>

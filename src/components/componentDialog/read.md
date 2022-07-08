# fusion-ui 弹窗组件文档

## 在 vue 组件中引入

```vue
<template>
  <div>
    <custom-dialog
      //是否显示弹窗组件---必写
      v-if="isShowDialog"
      //弹窗显示状态---必传
      :isShowDialog="isShowDialog"
      //标题
      :title="'自定义弹窗实例'"
      //宽度
      :width="'50%'"
      //监听弹窗内部组件弹窗打开关闭状态并同步到外部组件---必传
      @on-result-change="changeIsShowDialog"
      //监听弹窗内部组件操作按钮触发事件----confirm/cancel 确认/取消---必传
      @child-operation="operation"
    >
      //插入的弹窗内容组件
      <dia-component></dia-component>
    </custom-dialog>
  </div>
</template>
<script>
import CustomDialog from "@/components/componentDialog";
import DiaComponent from "./diacomponent.vue";
export default {
  name: "dialogInstance",
  components: {
    CustomDialog,
    DiaComponent,
  },
  props: {},
  data() {
    return {
      //是否显示弹窗组件
      isShowDialog: false,
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    /**
     * @description 弹窗关闭之前处理事件
    */
    beforeClose() {
      this.isShowDialog = false;
    },
    /**
     * @description 切换弹窗显示状态
     * @param {Boolean} val
     */
    changeIsShowDialog(val) {
      this.isShowDialog = val;
    },
    /**
     * @description 弹窗操作按钮事件
     * @param {String} val ---- confirm/cancel 确认/取消
     * @param {Object} data 表单数据
     */
    operation(val) {
      if (val == "confirm") {
        //确认处理逻辑
        ....
      } else {
        //取消处理逻辑
        this.isShowDialog = false;
      }
    },
  },
};
</script>
```

## 具体配置信息

请参照组件 componentDialog 中 props 属性配置。

<template>
  <fu-dialog
    :title="title"
    :center="center"
    :width="width"
    :visible.sync="showDialog"
    :fullscreen="fullscreen"
    :append-to-body="appendToBody"
    :show-close="showClose"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
    :before-close="handleClose"
  >
    <slot></slot>
    <span slot="footer" v-if="isShowOperation" class="dialog-footer">
      <fu-button @click="childOperation('cancel')">{{ cancelText }}</fu-button>
      <fu-button type="primary" @click="childOperation('confirm')">{{
        confirmText
      }}</fu-button>
    </span>
  </fu-dialog>
</template>

<script>
import { Dialog, Button } from "fusion-ui";
export default {
  name: "customDialog",
  components: {
    FuButton: Button,
    FuDialog: Dialog,
  },
  props: {
    //是否显示弹窗
    isShowDialog: {
      required: true,
      type: Boolean,
      default: true,
    },
    //弹窗内容---暂时用不到（用solt插槽替换）
    content: {
      type: String,
      default: "这是一段信息",
    },
    //标题
    title: {
      type: String,
      default: "提示",
    },
    //标题是否居中
    center: {
      type: Boolean,
      default: false,
    },
    //宽度
    width: {
      type: String,
      default: "50%",
    },
    //是否全屏展示
    fullscreen: {
      type: Boolean,
      default: false,
    },
    //Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
    appendToBody: {
      type: Boolean,
      default: false,
    },
    //是否显示操作栏按钮
    isShowOperation: {
      type: Boolean,
      default: true,
    },
    //是否显示取消按钮
    isShowCancel: {
      type: Boolean,
      default: true,
    },
    //是否显示确认按钮
    isShowConfirm: {
      type: Boolean,
      default: true,
    },
    //取消按钮文本
    cancelText: {
      type: String,
      default: "取 消",
    },
    //确认按钮文本
    confirmText: {
      type: String,
      default: "确 认",
    },
    //是否显示关闭图标
    showClose: {
      type: Boolean,
      default: true,
    },
    //是否关闭时销毁 Dialog 中的元素
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      //弹窗显示/关闭
      showDialog: this.isShowDialog ? this.isShowDialog : false,
    };
  },
  created() {},
  methods: {
    /**
     * @description 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
     */
    handleClose(done) {
      if(this.$listeners['before-close']){
        this.$emit("before-close");
      }else{
        done();
      }
    },
    /**
     * @description 操作按钮事件----confirm/cancel 确认/取消
     * @param {String} value
     */
    childOperation(value) {
      this.$emit("child-operation", value);
    },
  },
  watch: {
    /**
     * @description 监听外部对props属性isShowDialog的变更，并同步到本组件内的data属性showDialog中
     * @param {Boolean} val 
    */
    isShowDialog(val) {
      this.showDialog = val;
    },
    /**
     * @description 组件内对弹窗打开关闭状态变更后向外部发送事件通知
     * @param {Boolean} val 
    */
    showDialog(val) {
      this.$emit("on-result-change", val);
    },
  },
};
</script>

<style scoped></style>

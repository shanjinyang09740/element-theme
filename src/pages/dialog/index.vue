<template>
  <div id="ServeManage" class="page">
    <fu-button type="primary" @click="isShowDialog = true">点击弹出</fu-button>
    <custom-dialog
      v-if="isShowDialog"
      :isShowDialog="isShowDialog"
      :title="'自定义弹窗实例'"
      :content="content"
      :width="'50%'"
      @on-result-change="changeIsShowDialog"
      @child-operation="operation"
      @before-close="beforeClose"
    >
      <dia-form ref="formChild" :diaFormData="diaFormData"></dia-form>
    </custom-dialog>
  </div>
</template>

<script>
import { Button } from "fusion-ui";
import CustomDialog from "@/components/componentDialog";
import DiaForm from "./diaForm.vue";
export default {
  name: "dialogInstance",
  components: {
    FuButton: Button,
    CustomDialog,
    DiaForm,
  },
  props: {},
  data() {
    return {
      //是否显示弹窗组件
      isShowDialog: false,
      //嵌入的弹窗内容
      content: `
            <h1>弹窗标题</h1>
            <div style="color:red;">自定义弹窗内容</div>
        `,
      //弹窗表单数据
      diaFormData: [
        {
          label: "地区",
          name: "dq",
          value: "北京",
        },
        {
          label: "学校",
          name: "school",
          value: "清华大学",
        },
      ],
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
     * @description 切换弹窗打开关闭
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
        this.$refs.formChild.submit((data) => {
          console.log("表单数据提交了", data);
          this.isShowDialog = false;
        });
      } else {
        this.isShowDialog = false;
      }
    },
  },
};
</script>

<style lang="less" scoped></style>

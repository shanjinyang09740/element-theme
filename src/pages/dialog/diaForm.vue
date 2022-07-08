<template>
  <fu-form
    ref="modifyForm"
    :rules="diaFormRules"
    :inline="true"
    :fu-data="formData"
  >
    <fu-form-item
      v-for="(item, index) in diaFormData"
      :key="index"
      :label="item.label"
      :prop="item.name"
      label-width="120px"
    >
      <fu-input v-model="formData[item.name]" clearable></fu-input>
    </fu-form-item>
  </fu-form>
</template>

<script>
import { Button, Input, Form, FormItem, Message } from "fusion-ui";
export default {
  name: "diaForm",
  components: {
    FuInput: Input,
    FuForm: Form,
    FuFormItem: FormItem,
  },
  props: {
    diaFormData: {
      type: Array,
      default: function() {
        return {};
      },
    },
  },
  data() {
    return {
      formData: {},
      diaFormRules: {
        dq: {
          required: true,
          message: "请输入地区",
          trigger: "blur",
        },
        school: {
          required: true,
          message: "请输入学校",
          trigger: "blur",
        },
      },
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    let newObj = {};
    this.diaFormData.forEach((item) => {
      newObj[item.name] = item.value;
    });
    this.$set(this, "formData", newObj);
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    /**
     * @description 提交表单数据
     * @params {Function} callback
     */
    submit(callback) {
      this.$refs["modifyForm"].$refs.el.validate((valid) => {
        if (valid) {
          //TODO 触发提交表单事件
          callback(this.formData);
        } else {
          Message.warning("请检查输入是否合法");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>

<template>
  <div class="wrapper">
    <h1>表格嵌套表单组件展示</h1>
    <component-table-form :postTableForm="postTableForm"></component-table-form>
  </div>
</template>

<script>
import ComponentTableForm from "@/components/componentTableForm";
export default {
  name: "tableForm",
  components: {
    ComponentTableForm,
  },
  props: {},
  data() {
    return {
      postTableForm: {
        tableColumn: [
          {
            prop: "name",
            label: "成员名称",
            isRequired: true,
          },
          {
            prop: "value",
            label: "成员值",
          },
        ],
        tableData: [
          {
            name: "",
            value: "",
          },
        ],
        tableFormRules: {
          name: [
            { required: true, message: "请输入成员名称", trigger: "blur" },
          ],
          value2: [
            { required: true, message: "成员值不能为空", trigger: "blur" },
          ],
        },
      },
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped></style>

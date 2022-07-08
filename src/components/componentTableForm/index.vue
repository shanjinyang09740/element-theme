<template>
  <div>
    <el-form
      :model="tableForm"
      ref="tableForm"
      :rules="tableForm.tableFormRules"
      :inline="true"
      label-width="108px"
    >
      <el-table :data="tableForm.tableData" style="width: 100%" border>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>

        <el-table-column
          v-for="(item, index) in tableForm.tableColumn"
          :key="index"
          align="center"
        >
          <template slot="header" slot-scope="scope">
            <span style="color: #2d65dc">{{ item.label }}</span>
            <i v-if="item.isRequired" style="color: #f56c6c">*</i>
          </template>

          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + item.prop"
              :rules="tableForm.tableFormRules[item.prop]"
            >
              <el-input
                type="text"
                v-model="scope.row[item.prop]"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
import { Form, FormItem, Input, Button, Table, TableColumn } from "element-ui";
export default {
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button,
    ElTable: Table,
    ElTableColumn: TableColumn,
  },
  props: {
    postTableForm: {
      required: true,
      type: Object,
    },
  },
  computed: {
    tableForm() {
      return this.postTableForm;
    },
  },
  data() {
    return {};
  },
};
</script>

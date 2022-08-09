<template>
  <div class="table-container-box main-container">
    <div class="form">
      <el-input v-model="input" placeholder="请输入内容" style="width: 300px" />
      <el-button type="primary" style="margin-left: 15px">搜索</el-button>
    </div>
    <div class="self-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        :header-cell-style="{ background: '#eee' }"
        border
        row-key="id"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          fixed="left"
          type="selection"
          width="40"
          :reserve-selection="true"
        />
        <el-table-column
          align="center"
          fixed="left"
          prop="name"
          label="名称"
          width="40"
        />
        <el-table-column
          v-for="(row, index) in tableColumns"
          :key="index"
          :prop="row.prop"
          :label="row.label"
        />
      </el-table>
    </div>
  </div>
</template>
<script>
import stacky from "@/utils/table-sticky";
import { genID } from "@/utils/tools";
export default {
  name: "tableSticky",
  components: {},
  props: {},
  mixins: [stacky],
  data() {
    return {
      tableColumns: [],
      tableData: [],
      headerWidth: 0,
      parent: "self-table",
      input: "",
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.tableData[0] = {};
    for (let i = 0; i < 40; i++) {
      this.tableData[0]["data" + i] = genID(5);
      this.tableColumns.push({
        prop: "data" + i,
        label: "标签" + i,
      });
    }
    for (let k = 1; k < 40; k++) {
      this.tableData.push({ ...this.tableData[0], id: genID(6) });
    }
  },
  methods: {
    setWidth() {
      this.headerDragend();
    },
  },
};
</script>
<style lang="less" scoped>
.divid {
  height: 100px;
  background-color: blue;
}
.form {
  padding: 20px 0;
}
.main-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>

<template>
  <div>
    excel....
    <div id="MySheet"></div>
  </div>
</template>

<script>
const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
workbook.creator = "Me";
workbook.lastModifiedBy = "Her";
workbook.created = new Date(1985, 8, 30);
workbook.modified = new Date();
workbook.lastPrinted = new Date(2016, 9, 27);
const Sheet3 = workbook.addWorksheet("市名表");
Sheet3.addRows([{
    "上海市": {
        totalSize: 1,
        start: 72
    }
}]);

export default {
  name: "",
  components: {},
  // extends: null,
  // minxins: [],
  props: {},
  data() {
    return {};
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
  methods: {},
};
</script>

<style lang="less" scoped></style>

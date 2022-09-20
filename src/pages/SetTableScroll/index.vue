<template>
  <div class="wrapper">
    <h1>表格滚动条精准定位</h1>
    <fu-button type="primary" size="medium" @click="setTableScroll">定位{{setIndex+1}}</fu-button>
    <fu-table ref="myTable" :fu-data="tableData" height="500" border style="width: 100%">
      <fu-table-column prop="date" label="日期" width="180">
      </fu-table-column>
      <fu-table-column prop="name" label="姓名" width="180">
      </fu-table-column>
      <fu-table-column prop="address" label="地址">
      </fu-table-column>
    </fu-table>
  </div>
</template>

<script>
import { Table, TableColumn, Button } from "fusion-ui";
export default {
  name: "tableForm",
  components: {
    FuTable: Table,
    FuTableColumn: TableColumn,
    FuButton: Button
  },
  props: {},
  data () {
    return {
      setIndex: 0,
      tableData: {
        rows: [{
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-05',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-09',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-10',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-11',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-12',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-13',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-14',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-15',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-16',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-17',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-18',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-19',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-20',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-21',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    };
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    setTableScroll () {
      this.setIndex += 5;
      if (this.setIndex >= this.tableData.rows.length - 1) {
        this.setIndex = 0;
      }
      this.$tableScrollMove("myTable", this.setIndex);
    },
    /**
     * @description: 通过表格索引 定位表格的位置
     * @param {refName} table的ref值
     * @param {index} table的索引值
     * @return: 
     * @author: hch
     */
    $tableScrollMove (refName, index = 0) {
      if (!refName || !this.$refs[refName]) return;//不存在表格的ref vm 则返回
      let vmEl = this.$refs[refName].$el;
      if (!vmEl) return;
      //计算滚动条的位置
      const targetTop = vmEl.querySelectorAll('.el-table__body tr')[index].getBoundingClientRect().top;
      const containerTop = vmEl.querySelector('.el-table__body').getBoundingClientRect().top;
      const scrollParent = vmEl.querySelector('.el-table__body-wrapper');
      scrollParent.scrollTop = targetTop - containerTop;
    },

  },
};
</script>
<style lang="less" scoped>

</style>

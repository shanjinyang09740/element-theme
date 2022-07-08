<template>
  <div id="hot-preview">
    <HotTable :root="root" :ref="root" :settings="hotSettings"></HotTable>
  </div>
</template>

<script>
import { HotTable } from "@handsontable-pro/vue";
import "handsontable/dist/handsontable.full.css";
import "./table.less";

export default {
  components: {
    HotTable,
  },
  data: function() {
    return {
      root: "testHot",
      hotRef: null,
      mergeArrSubmit: [],
      hotSettings: {
        data: [
          [false, "20080101", 10, 11, 12, 13, true],
          [false, "20090101", 20, 11, 14, 13, true],
        ],
        rowHeaders: false,
        colHeaders: false,
        // colHeaders: ['选择','题目', 'A选项', 'B选项', 'C选项', 'D选项','答案'],
        // 'single', 'range' or 'multiple'
        selectionMode: 'multiple', 
        cells: function (row, col, prop) { 
                // console.log(row, col, prop);
                var cellProperties = {};
                // cellProperties.renderer = "negativeValueRenderer";
                return cellProperties;
        },
        mergeCells: true, 
        contextMenu: {
          items: {
            row_above: {
              name: "上方插入一行",
            },
            row_below: {
              name: "下方插入一行",
            },
            col_left: {
              name: "左方插入列",
            },
            col_right: {
              name: "右方插入列",
            },
            remove_row: {
              name: "删除行",
            },
            remove_col: {
              name: "删除列",
              // callback: function(key, options) {
              //   console.log(key, options);
              // }
            },
            mergeCells: {
              key: "mergeCells",
              name: "合并单元格",
            }
          },
        },
        dragToScroll: true,
      },
    };
  },
  mounted() {
    this.hotRef = this.$refs.testHot.hotInstance;
    this.hotRef.addHook("afterMergeCells", this.mergeCells, this.hotRef);
    this.hotRef.addHook("afterUnmergeCells", this.unMergeCells, this.hotRef);
    HotTable.renderers.registerRenderer('negativeValueRenderer', this.negativeValueRenderer);
  },
  methods: {
    negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
        console.log(td, prop, value, cellProperties);
        if (prop === 'smallProductImg') {
            HotTable.renderers.TextRenderer.apply(this, arguments);
            td.innerHTML = value;
        } else if (cellProperties.type == 'date') {
            HotTable.renderers.DropdownRenderer.apply(this, arguments);
        } else if (cellProperties.type == 'dropdown') {
            HotTable.renderers.DropdownRenderer.apply(this, arguments);
        } else if (cellProperties.type == 'checkbox'){
            HotTable.renderers.CheckboxRenderer.apply(this, arguments);
        }else{
            HotTable.renderers.TextRenderer.apply(this, arguments);
        }
    },
    mergeCells() {
      if (this.hotRef !== undefined) {
        this.mergeArrSubmit = JSON.parse(
          JSON.stringify(
            this.hotRef.getPlugin("mergeCells").mergedCellsCollection
              .mergedCells
          )
        );
        console.log(this.mergeArrSubmit);
      }
    },
    unMergeCells() {
      if (this.hotRef !== undefined) {
        this.mergeArrSubmit = JSON.parse(
          JSON.stringify(
            this.hotRef.getPlugin("mergeCells").mergedCellsCollection
              .mergedCells
          )
        );
        console.log(this.mergeArrSubmit);
      }
    },
    /**
     * @description 获取选中行数据
     * @param {}
     * @returns {}
     */
    getTableData() {
      // const hotInstance = this.$refs.testHot.hotInstance;
      // console.log("hotInstance", hotInstance);
      // console.log("数据", hotInstance.getSelectedLast());
    },
  },
};
</script>
<style lang="less" scoped></style>

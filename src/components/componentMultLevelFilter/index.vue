<template>
  <div class="multiFilter">
    <div class="selectOption">
      <div class="group" v-for="(item, index) in filterFormData" :key="index">
        <div class="groupLeft">
          <div
            class="labelArea"
            :style="{
              width: labelWidth + 'px',
              minWidth: labelWidth + 'px',
              textAlign: labelAlign + '',
            }"
          >
            <strong>{{ item.label + ":" }}</strong>
          </div>
          <span
            class="filterTotal"
            :class="item.isFilterTotal ? 'selected' : 'filterTotal'"
            @click="filterTotalClick(index, item)"
            >全部</span
          >
          <div class="groupLeftOption">
            <div
              v-if="item.isRadio"
              class="itemList"
              :style="{
                maxHeight: item.isShowMore ? '200px' : '35px',
                overflow: item.isShowMore ? 'auto' : 'hidden',
              }"
            >
              <span
                class="radioItem"
                :class="ele.selected ? 'selected' : ''"
                v-for="(ele, index) in item.children"
                :key="index"
                @click="radioSelectClick(ele, item, item.index)"
                >{{ ele.label }}</span
              >
            </div>
            <div v-else class="multItemList">
              <fu-checkbox-group v-model="item.multCheckboxList">
                <fu-checkbox
                  v-for="(ele, index) in item.children"
                  :key="index"
                  :label="ele.label + ',' + ele.value"
                >
                  {{ ele.label }}
                </fu-checkbox>
              </fu-checkbox-group>
              <div class="multBtns">
                <fu-button
                  size="mini"
                  type="danger"
                  plain
                  v-show="item.multCheckboxList.length"
                  @click="multSelectConfirm(item.index, item)"
                  >提交</fu-button
                >
                <fu-button
                  size="mini"
                  type="primary"
                  plain
                  @click="multSelectCancel(item.index, item)"
                  >取消</fu-button
                >
              </div>
            </div>
          </div>
        </div>
        <div class="groupRight">
          <fu-button
            size="medium"
            type="text"
            v-show="isShowMult && item.isShowMult"
            @click="switchSelectType(item.index, item)"
            >多选</fu-button
          >
          <fu-button size="medium" type="text" @click="showMore(index, item)">{{
            item.isShowMore ? "收起" : "更多"
          }}</fu-button>
        </div>
      </div>
    </div>
    <div class="selectResult">
      <div class="selectResultLeft">
        <div
          class="labelArea"
          :style="{
            width: labelWidth + 'px',
            minWidth: labelWidth + 'px',
            textAlign: labelAlign,
          }"
        >
          <strong>已选择分类:&nbsp;</strong>
        </div>
        <div class="selectedList">
          <div
            class="selectedBox"
            v-for="(item, index) in filterSelectedForm"
            :key="index"
            :title="`${item.groupLabel}: ${item.itemLabel}`"
          >
            <span>{{ `${item.groupLabel}: ${item.itemLabel}` }}</span
            ><i class="el-icon-close" @click="closeSelectedItemClick(item)"></i>
          </div>
        </div>
      </div>
      <fu-button
        type="primary"
        plain
        class="emptyFilter"
        @click="emptyAllFilterCondition"
      >
        清空筛选
      </fu-button>
    </div>
  </div>
</template>

<script>
import { Button, Checkbox, CheckboxGroup } from "fusion-ui";
export default {
  name: "multiLevelFilter",
  components: {
    FuButton: Button,
    FuCheckbox: Checkbox,
    FuCheckboxGroup: CheckboxGroup,
  },
  props: {
    //筛选数据
    fuData: {
      type: Array,
      default: () => [],
    },
    //是否显示多选
    isShowMult: {
      type: Boolean,
      default: false,
    },
    //分类名称宽度
    labelWidth: {
      type: Number,
      default: 80,
    },
    //分类名称对齐方式
    labelAlign: {
      type: String,
      default: "left",
    },
  },
  data() {
    return {
      //筛选表单数据
      filterFormData: [],
    };
  },
  computed: {
    /**
     * @description 处理已选中的数据
     * @returns {Array}
     */
    filterSelectedForm() {
      let newArr = [];
      this.filterFormData.forEach((item) => {
        if (item["checkList"] && Object.keys(item["checkList"]).length) {
          newArr.push(item.checkList);
        }
      });
      return newArr;
    },
  },
  watch: {
    fuData: {
      handler(newValue, oldValue) {
        this.initData();
      },
      deep: true,
    },
  },
  beforeCreate() {},
  created() {
    this.initData();
  },
  methods: {
    /**
     * @description 初始化数据
     * @returns {Array} 表单数据
     */
    initData() {
      this.filterFormData = this.fuData.map((item, index) => {
        return {
          ...item,
          index: index,
          isRadio: true,
          isShowMult: true,
          isShowMore: false,
          isFilterTotal: true,
          checkList: {},
          multCheckboxList: [],
        };
      });
    },
    /**
     * @description 全部筛选事件
     * @param {}
     * @returns {}
     */
    filterTotalClick(index, item) {
      item["children"] &&
        item.children.forEach((item) => {
          item.selected = false;
        });
      this.$set(this.filterFormData, index, {
        ...item,
        checkList: {},
        multCheckboxList: [],
        isFilterTotal: !item.isFilterTotal,
      });
      this.$emit("getFilterSelectData", this.filterSelectedForm);
    },
    /**
     * @description 多选框确定事件
     * @param {}
     * @returns {}
     */
    multSelectConfirm(index, item) {
      let { label, value, multCheckboxList } = item;
      let newItemLabelArr = [],
        newItemValueArr = [];
      multCheckboxList.length &&
        multCheckboxList.forEach((item) => {
          let $item = item.split(",");
          newItemLabelArr.push($item[0]);
          newItemValueArr.push($item[1]);
        });
      item["children"] &&
        item.children.forEach((item) => {
          item.selected = false;
        });
      this.$set(this.filterFormData, index, {
        ...item,
        checkList: {
          groupLabel: label,
          groupValue: value,
          itemLabel: newItemLabelArr.join(","),
          itemValue: newItemValueArr.join(","),
        },
        isShowMult: true,
        isRadio: true,
      });
      this.$emit("getFilterSelectData", this.filterSelectedForm);
    },
    /**
     * @description 多选框取消事件
     * @param {}
     * @returns {}
     */
    multSelectCancel(index, item) {
      this.$set(this.filterFormData, index, {
        ...item,
        multCheckboxList: [],
        isRadio: true,
        isShowMult: true,
        isFilterTotal: false,
      });
    },
    /**
     * @description 单选选项点击事件
     * @param {}
     * @returns {}
     */
    radioSelectClick(ele, item, index) {
      let $children = item.children.map((element) => {
        let $ele = { ...element };
        $ele.selected = element.value == ele.value ? true : false;
        return $ele;
      });
      this.$set(this.filterFormData, index, {
        ...item,
        children: $children,
        isFilterTotal: false,
        checkList: {
          groupLabel: item.label,
          groupValue: item.value,
          itemLabel: ele.label,
          itemValue: ele.value,
        },
      });
      this.$emit("getFilterSelectData", this.filterSelectedForm);
    },
    /**
     * @description 已选择项关闭事件
     * @param {Object} data
     */
    closeSelectedItemClick(data) {
      let { groupValue } = data;
      //清空数据
      let currentIndex, currentItem;
      this.filterFormData.some((item, index) => {
        if (groupValue == item.value) {
          currentIndex = index;
          currentItem = item;
          return true;
        }
      });
      currentItem["children"] &&
        currentItem.children.forEach((item) => {
          item.selected = false;
        });
      this.$set(this.filterFormData, currentIndex, {
        ...currentItem,
        checkList: {},
        multCheckboxList: [],
      });
    },
    /**
     * @description 切换单选多选
     */
    switchSelectType(index, item) {
      this.$set(this.filterFormData, index, {
        ...item,
        isShowMult: false,
        isRadio: !item.isRadio,
      });
    },
    /**
     * @description 获取选中的条件数据
     * @returns {Object} 表单筛选条件对象
     */
    getSelectData() {
      this.$emit("getFilterSelectData", this.filterSelectedForm);
    },
    /**
     * @description 展示更多选项
     * @param {}
     * @returns {}
     */
    showMore(index, item) {
      this.$set(this.filterFormData, index, {
        ...item,
        isShowMore: !item.isShowMore,
      });
    },
    /**
     * @description 清空已选择区筛选条件
     * @param {}
     * @returns {}
     */
    emptyAllFilterCondition() {
      this.filterFormData = this.filterFormData.map((item) => {
        return {
          ...item,
          checkList: {},
          multCheckboxList: [],
          isFilterTotal: true,
        };
      });
    },
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
};
</script>

<style lang="less" scoped>
.multiFilter {
  font-size: 14px;
  .selectResult {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    .selectResultLeft {
      display: flex;
    }
    .selectedList {
      display: flex;
      flex-wrap: wrap;
    }
    .emptyFilter {
      margin-right: 10px;
      &.el-button {
        padding: 5px 10px;
      }
    }
    .el-icon-close {
      position: absolute;
      top: 3px;
      right: 3px;
      color: #999;
      cursor: pointer;
      border-radius: 9px;
      padding: 2px;
      font-weight: bolder;
      font-size: 12px;
      &:hover {
        color: #fff;
        background-color: #409eff;
      }
    }
  }
  .labelArea {
    color: #666;
  }
  .selectedBox {
    max-width: 200px;
    height: 24px;
    line-height: 24px;
    border: 1px dashed #2a95f8;
    font-size: 14px;
    color: #409eff;
    vertical-align: top;
    margin: 0 10px 5px 0;
    padding: 0 26px 0 4px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .group {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    line-height: 32px;
    .groupRight {
      min-width: 75px;
    }
    .multBtns {
      padding-bottom: 10px;
      margin: 0 auto;
    }
    .groupLeft {
      display: flex;
      padding-top: 3px;
      .filterTotal {
        width: 40px;
        height: 30px;
        min-width: 40px;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
        cursor: pointer;
        &.selected {
          color: #fff;
          background-color: #409eff;
        }
        &:hover {
          color: #fff;
          background-color: #409eff;
        }
      }
      .itemList {
        display: flex;
        flex-wrap: wrap;
      }
      /deep/ .el-checkbox-group {
        display: flex;
        flex-wrap: wrap;
        padding-left: 10px;
      }
      .radioItem {
        padding: 0 10px;
        cursor: pointer;
        &.selected {
          color: #409eff;
        }
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>

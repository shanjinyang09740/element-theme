<template>
  <div id="app">
    <multi-level-filter
      :fuData="filterData"
      :isShowMult="true"
      :labelWidth="80"
      labelAlign="left"
      @getFilterSelectData="getFilterSelectData"
    ></multi-level-filter>
    <!-- <button @click="switchFilter" style="margin-top:30px;">添加筛选组</button> -->
  </div>
</template>

<script>
import MultiLevelFilter from "@/components/componentMultLevelFilter";

export default {
  name: "App",
  components: {
    MultiLevelFilter,
  },
  data() {
    return {
      //多级筛选组件数据
      filterData: [
        {
          label: "品牌",
          value: "grand",
          children: [
            {
              label: "苹果",
              value: "apple",
            },
            {
              label: "华为",
              value: "huawei",
            },
            {
              label: "小米",
              value: "xiaomi10",
            },
            {
              label: "苹果苹果苹果苹果苹果苹果22222",
              value: "apple2",
            },
            {
              label: "华为华为华为华为",
              value: "huawei3",
            },
            {
              label: "小米",
              value: "xiaomi9",
            },
            {
              label: "苹果",
              value: "apple33",
            },
            {
              label: "华为华为华为华为华为华为",
              value: "huawei4",
            },
            {
              label: "小米",
              value: "xiaomi8",
            },
            {
              label: "苹果华为华为华为华为",
              value: "apple5",
            },
            {
              label: "华为",
              value: "huawei23",
            },
            {
              label: "小米",
              value: "xiaomi4",
            },
            {
              label: "苹果",
              value: "apple34",
            },
            {
              label: "华为",
              value: "huawei33",
            },
            {
              label: "小米",
              value: "xiaomi3",
            },
            {
              label: "苹果",
              value: "apple55",
            },
            {
              label: "华为",
              value: "huawei56",
            },
            {
              label: "小米",
              value: "xiaomi2",
            },
          ],
        },
        {
          label: "CPU型号",
          value: "cputype",
          children: [
            {
              label: "骁龙439",
              value: "xl439",
            },
            {
              label: "骁龙855plus",
              value: "xl855plus",
            },
            {
              label: "骁龙730G",
              value: "xl730G",
            },
            {
              label: "骁龙845",
              value: "xl845",
            },
          ],
        },
        {
          label: "运行内存",
          value: "runram",
          children: [
            {
              label: "8GB",
              value: "8GB",
            },
            {
              label: "6GB",
              value: "6GB",
            },
            {
              label: "4GB",
              value: "4GB",
            },
            {
              label: "3GB",
              value: "3GB",
            },
            {
              label: "其他",
              value: "other",
            },
          ],
        },
      ],
    };
  },
  methods: {
    getFilterSelectData(data) {
      console.log("获取到表单筛选条件数据", data);
    },
    switchFilter() {
      this.filterData.push({
        label: "机身存储",
        value: "jscc",
        children: [
          {
            label: "32GB",
            value: "32GB",
          },
          {
            label: "16GB",
            value: "16GB",
          },
          {
            label: "8GB",
            value: "4GB",
          },
          {
            label: "4GB",
            value: "3GB",
          },
          {
            label: "其他",
            value: "other",
          },
        ],
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

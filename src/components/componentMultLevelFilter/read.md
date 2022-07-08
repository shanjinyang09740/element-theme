# 多级筛选组件文档

## 在页面中引入
//在template中使用
<multi-level-filter
      //组件数据
      :fuData="filterData"
      //是否显示多选---默认不显示
      :isShowMult="true"
      //分类名称宽度
      :labelWidth="80"
      //分类名称对齐方式---默认左对齐
      labelAlign="left"
      //获取筛选条件参数方法
      @getFilterSelectData="getFilterSelectData"
></multi-level-filter>

//在script中引入
import MultiLevelFilter from "@/components/multiLevelFilter.vue";

## 组件数据格式
    格式要求:
        1. 数据类型为 Array（数组）
        2. 数据键值对 中文名 label, 英文名 value
        3. 数据举例:
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
# 公共表格CommonTable

## 基本用法

请求地址`reqUrl`和请求参数`reqParams`用来动态请求表格的数据。

例子省略。

## 表格唯一标识

通过设置`table-id`属性为`xxx`，保证`CommonTable`的请求的数据可以渲染到正确的对象上

## 分页表格

通过设置`isNeedPaging`属性为`true`开启分页逻辑

## 单选表格

通过设置`isSingleChoice`属性为`true`开启单选列

## 多选表格

通过设置`isHasSelection`属性为`true`开启多选列

也可设置`selectable`属性，类型为 `Function`，函数的返回值用来决定这一行的 CheckBox 是否可以勾选，Function(row, index)

## 插槽操作列

### 通过`dynamicSlotName`属性的修改，就能渲染不同的操作列；通过设置`operationName`属性为table修改操作列的名称。设置`operationWidth`属性修改操作列的宽度；当不需要渲染操作列时，设置`isNeedOperation`为`false`,表格默认显示操作列。

```
<template>
    <common-table 
    	:reqUrl="'/api/oa/auditMeeting/getMeetingFeedbackList.do'"
        :reqParams="params"
        :fu-column="column"
        :dynamicSlotName="dynamicSlotName">
    
        <template slot-scope="myscope" slot="one">
            <i class="iconfont icon-peizhi" title="字段规则"></i>
            <i class="iconfont iconbiaoge_shanchu" title="删除" @click="deleteItem(myscope.data)"></i>
        </template>	
        
        <template slot-scope="myscope" slot="two">
            <i class="iconfont icon-peizhi" title="规则"></i>
        </template>
        
    </common-table>
</template>

<script>
import CommonTable from "@/components/CommonTable/index.vue";
export default {
  name: "mainTable",
  components: {
    CommonTable,
  },
  props: {},
  data() {
    return {
      dynamicSlotName: "one",
      column: [
        {
          label: "项目名称",
          prop: "pName",
          width: "200",
        },

        {
          label: "项目年度",
          prop: "pYear",
          width: "120",
        },

        {
          label: "申请人",
          prop: "applicationUserId",
          width: "120",
          reqUrl: "/api/oa/userManage/userInfoList.do",
        },
        {
          label: "申请部门",
          prop: "applicationDeptId",
          width: "120",
          reqUrl: "/api/oa/userManage/orgInfoList.do",
        },
        {
          label: "申请时间",
          prop: "applicationTime",
          width: "120",
        },
        {
          label: "审核状态",
          prop: "projectSchedule",
          width: "120",
          reqUrl:
            "/api/core/v1/dictionary/queryData.do?dicId=projectScheduleFeedStatus",
        },
      ],
    };
  },
  computed: {
    params() {
      return [
        {
          name: "queryParam",
          vtype: "formpanel",
          data: {
            projectYear: '',
          },
        },
      ];
    },
  },
  methods: {
    handleClickManagement(row) {
      console.log(row)
    },
  },
};
</script>
```

### 表格操作列按钮风格统一为 图标+文字, 模板里面需传入参数 tableOperateBtnGroup（数据类型：数组）, 默认最多展示两个按钮， 超过2个按钮，显示更多下拉。示例如下：

```
<common-table
        ...
        :tableOperateBtnGroup="tableOperateBtnGroup"
        ...
      >
</common-table>

data() {
  tableOperateBtnGroup: [
        {
          // 按钮显示文本
          label: "查看",
          // 按钮类型
          value: "viewRow",
          // 按钮字体图标---图标和图片选其一
          icon: "iconbiaoge_xieyuanguanxi",
          // 按钮图片路径---图标和图片选其一
          imgPath: "",
          // 按钮点击事件回调
          callback: (scope) => {
            this.viewRow(scope.row);
          },
        },
        {
          label: "编辑",
          value: "editRow",
          icon: "iconbiaoge_bianji",
          imgPath: "",
          callback: (scope) => {
            this.editRow(scope.row);
          },
        },
        {
          label: "表式设计",
          value: "design",
          icon: "iconqita_zidingyi",
          imgPath: "",
          callback: (scope) => {
            this.design(scope.row);
          },
        },
      ],
}

```

## 表格重新加载

 `this.$refs.xxx.reloadTable()`    xxx指外层赋的名字  :ref="xxx"

## fu-column 属性

| 参数                   | 说明                                                         | 类型            | 可选值                                           | 默认值 |
| ---------------------- | ------------------------------------------------------------ | --------------- | ------------------------------------------------ | ------ |
| prop                   | 对应列内容的字段名                                           | String          |                                                  |        |
| label                  | 列名                                                         | String          | ''                                               | ''     |
| width                  | 列宽                                                         |                 |                                                  |        |
| sortable               | 是否是排序列                                                 | Boolean         |                                                  | false  |
| fixedType              | 列是否固定在左侧或者右侧，true 表示固定在左侧                | string, boolean | true, left, right                                | false  |
| handlePropertyCallback | 按自定义规则处理单元格内的数据                               | Function        |                                                  |        |
| changeArr              | 自定义转码的数组（与reqUrl互斥，仅在reqUrl不存在时生效）     | Array           | [{text:"",value:""}]                             |        |
| reqUrl                 | 自定义转码的url。（请求类型POST，参数为空，仅需一个url。如果此时的转码需要额外参数，建议使用changeArr。） | String          | /api/core/v1/dictionary/queryData.do?dicId=DWDZS |        |
| headerAlign            | 对齐方式                                                     | String          | left/center/right                                | left   |
| align                  | 表头对齐方式，若不设置该项，则使用表格的对齐方式             | String          | left/center/right                                | left   |

## common_table_Methods

| 事件名            | 说明                           | 参数  | 备注 |
| ----------------- | ------------------------------ | ----- | ---- |
| deliverySelection | 当选择项发生变化时会触发该事件 | [row] |      |

## common_table_props

| 参数            | 说明                                                         | 类型                 | 可选值 | 默认值              |
| --------------- | ------------------------------------------------------------ | -------------------- | ------ | ------------------- |
| isNeedPaging    | 是否需要分页                                                 | boolean              |        | true                |
| isSingleChoice  | 是否单选表格                                                 | boolean              |        | false               |
| isNeedOperation | 是否需要操作列                                               | boolean              |        | true                |
| isHasSelection  | 是否显示复选框                                               | Boolean              |        | false               |
| operationWidth  | 操作列宽度                                                   | String               |        | "120"               |
| operationName   | 操作列名称                                                   | String               |        | "操作"              |
| dynamicSlotName | 显示的插槽名称                                               | String               |        | "one"               |
| fuColumn        | 表格列数据                                                   | Array                |        | []                  |
| tableId         | 当一个页面需要引入多个commonTable时，需要定义不同的id        | String               |        | "table_template_id" |
| reqParams       | 表格请求参数                                                 | Array                |        | []                  |
| reqUrl          | 表格请求url                                                  | String               |        |                     |
| maxHeight       | 表格最大高度                                                 | String               |        | "550px"             |
| selectable      | 类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | Function(row, index) |        | （）=>{return true} |

# 关于列插槽使用

> 用途：可以制作编辑表格

## 引入和使用

```vue
<template>
    <common-table
        table-id="xxxxx"
        :fu-column="detailColumn"
    >
        <!-- 此处插槽具名必须和columns配置的列信息中slot的值一致 -->
        <template
			slot-scope="{ row, column, columnName, value, rowIndex, data }"
			slot="range"
        >
            <span>{{ log(row, column, value, data, rowIndex) }}</span>
        </template>
    </common-table>
</template>

<script>
import CommonTable from "@/components/CommonTable"
    
export default {
    ...
    components: {
        ...
        CommonTable,
        ...
    },
    ...
    data(){
        return {
        	columns: [
        		// 更多列属性请参考文档
        		{
        			// 列头文本
        			label: "列头文本",
        			// 列名
        			prop: "range",
        			// 最小列宽
        			width： "120",
        			// *** 插槽具名
        			slot: "range"
    			}
    		]
    	}
    }
}
</script>
```

## 插槽参数

- 获取

```vue
<template>
    <common-table
        table-id="xxxxx"
        :fu-column="detailColumn"
    >
        <!-- 获取slot插槽参数 -->
        <template
			slot-scope="{ row, column, columnName, value, rowIndex, data }"
			slot="range"
        >
            <span>{{ log(row, column, value, data, rowIndex) }}</span>
        </template>
    </common-table>
</template>
```

- 参数列表

| 参数名       | 类型             | 描述                             |
| ------------ | ---------------- | -------------------------------- |
| `row`        | `Object<Row>`    | 参考`el-tree`的行对象            |
| `column`     | `Object<Column>` | 参考`el-tree`的列对象            |
| `columnName` | `String`         | 当前单元格的对应的列名（键值名） |
| `value`      | `String|Number`  | 当前单元格的值                   |
| `rowIndex`   | `Int`            | 当前行序号                       |
| `data`       | `Object`         | 参考`el-tree`的插槽数据          |

- 设置编辑单元格

```vue
<template>
    <common-table
        table-id="xxxxx"
        :fu-column="detailColumn"
    >
        <!-- 获取slot插槽参数 -->
        <template
			slot-scope="{ row, column, columnName, value, rowIndex, data }"
			slot="range"
        >
            <fu-input v-model="value" @input="input"/>
        </template>
    </common-table>
</template>

<script>
export default {
    ...
    methods: {
        input(val) {
            // TODO. do sth
        }
    }
}
</script>
```


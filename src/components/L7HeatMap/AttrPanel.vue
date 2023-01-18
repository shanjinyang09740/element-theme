<template>
    <div class="attr-panel-l7 attr-panel">
        <el-collapse v-model="activeNames">
            <base-attr-group :ucid="realConfig.base.ucid" :c-name="realConfig.setting.cName"
                :custom-config="customConfig.base" :default-config="defaultConfig.base" />
            <container-attr-group :ucid="customConfig.base.ucid" :custom-config="customConfig.container"
                :default-config="defaultConfig.container" :is-show-attr-script="true"
                :script-code-map="realConfig.subOfVariables.attrScript" @save-script="saveScript" />
            <attr-group title="热力区间设置">
                <div class="operateLan">
                    <el-button type="primary" size="mini" @click="operateColor('add')">新增</el-button>
                    <el-button type="primary" size="mini" @click="operateColor('del')">删除</el-button>
                </div>
                <attr-color-picker v-for="(item, index) in colorOption" :key="index" :label="item.label"
                    label-position="left" :value="item.color" @dv-change="(val)=>{
                        updateColor(val, index)
                    }" />
                <div class="hotRangeLan">
                    <span>热力区间</span>
                    <el-input v-model="hotRange"></el-input>
                </div>
            </attr-group>
            <attr-group title="数据属性">
                <div class="operateLan">
                    <el-button type="primary" size="mini" @click="operateCode('add')">新增</el-button>
                    <el-button type="primary" size="mini" @click="operateCode('del')">删除</el-button>
                </div>
                <attr-data-source :dataSourceId="realConfig.requestConfig.dataSourceId" @dv-change="updateDatasetId">
                    <attr-drop-item v-for="(item,index) in dataAttrList" :key="index" :label="item.text"
                        :node-info="selectedColumnInfo(item.prop)" @dv-change="updateDropItem" />
                </attr-data-source>
                <attr-data-filter :data-filter="realConfig.requestConfig.dataFilter" label="数据筛选"
                    @dv-change="updateDataFilter" />
            </attr-group>

            <develop-attr-group :real-config="realConfig" :output="$instance.output" :custom-config="customConfig"
                @update-extend-script="updateExtendScript" />
        </el-collapse>
    </div>
</template>
<script>
//常量
import { DefaultValue } from './defaultValue'
import { fakeDeepClone } from '@/utils/tool'
//基类
import AttrPanelBase from '@/elements/common/base/AttrPanelBase'
//vue面板
import AttrGroup from '@/components/ElementsConfig/AttrGroup'
// 属性面板 数据属性
import AttrDataSource from '@/components/attrPanelItem/dataView/request/AttrPanelDataSource.vue'
import AttrDataFilter from '@/components/attrPanelItem/dataView/request/AttrPanelDataFilter.vue'
import AttrDropItem from '@/components/attrPanelItem/dataView/request/AttrPanelDropItem.vue'
import AttrColorPicker from '@/components/ElementsConfig/AttrPanelColorPicker'
export default {
    name: 'HEAT-MAP',
    components: {
        AttrGroup,
        AttrDataSource,
        AttrDataFilter,
        AttrDropItem,
        AttrColorPicker,
    },
    mixins: [AttrPanelBase],
    props: {
        defaultConfig: {
            type: Object,
            default () {
                return fakeDeepClone(DefaultValue)
            },
        },
        customConfig: {
            type: Object,
            required: true,
        },
    },
    computed: {},
    data () {
        return {
            unitList: [
                {
                    text: 'px',
                    value: 'px',
                },
                {
                    text: '%',
                    value: '%',
                },
            ],
            activeNames: [
                '基础信息',
                '容器',
                '数据联动',
                '样式设置',
                '数据属性',
                '高级',
            ],
            // 所有变量
            publicVarList: [],
            dataSourceOptions: [
                {
                    text: '数据源',
                    value: 'dataSource',
                },
            ],
            info: {
                variableName: '',
                columnName: '',
            },
            hotRange: "",
            colorOption: [],
            dataAttrList: [
                {
                    text: "地区代码",
                    prop: "name"
                },
                {
                    text: "热力值",
                    prop: "hot"
                },
            ]
        }
    },
    watch: {
        colorOption: {
            handler: function (newVal) {
                if (newVal && newVal.length) {
                    let colorsArr = [];
                    colorsArr = newVal.map(item => item.color)
                    this.$set(this.customConfig.setting, "heatColors", colorsArr)
                }
            },
            deep: true
        },
        hotRange: {
            handler: function (newVal) {
                if (newVal) {
                    this.$set(this.customConfig.setting, "hotRange", newVal)
                }
            },
            deep: true
        },
    },
    created () {
        let { heatColors, hotRange } = this.realConfig.setting;
        let requestConfig = this.realConfig.requestConfig;
        if (heatColors && heatColors.length) {
            this.colorOption = heatColors.map((item, index) => {
                return {
                    color: item,
                    label: `色值${index + 1}`
                }
            });
        }
        if (hotRange) this.hotRange = hotRange;
        if (requestConfig && requestConfig.columns && requestConfig.columns.length) {
            this.dataAttrList = requestConfig.columns.map((item, index) => {
                let newText = "";
                if (item.alias == "name") {
                    newText = "地区代码"
                } else if (item.alias == "hot") {
                    newText = "热力值"
                } else {
                    newText = `指标${index + 1}`
                }
                return {
                    text: newText,
                    prop: item.alias
                }
            })
        }
    },
    mounted () { },
    methods: {
        //修改色系
        operateColor (val) {
            if (val == "add") {
                this.colorOption.push({
                    color: "",
                    label: `色值${this.colorOption.length + 1}`
                })
            } else {
                this.colorOption.pop();
            }
        },
        //修改字段
        operateCode (val) {
            let len = this.dataAttrList.length;
            if (val == "add") {
                this.dataAttrList.push({
                    text: `指标${len + 1}`,
                    prop: `key${len + 1}`
                })
            } else {
                if (len < 2) return
                let lastItem = this.dataAttrList.pop();
                let newColumns = this.customConfig.requestConfig.columns.filter(item => item.alias != lastItem.prop);
                this.$set(this.customConfig.requestConfig, "columns", newColumns)
            }
        },
        //更新色值
        updateColor (val, index) {
            this.$set(this.colorOption[index], "color", val)
        },
    },
}
</script>
<style lang="less" scoped>
.hotRangeLan {
    display: flex;
    align-items: center;
    padding: 0 10px 10px 0;

    span {
        font-size: 12px;
        color: #333;
        white-space: nowrap;
        padding-right: 10px;
    }
}

.operateLan {
    padding-bottom: 10px;
}
</style>

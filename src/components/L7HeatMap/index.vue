<template>
    <container :real-config="realConfig.container" :ucid="realConfig.base.ucid" :ctype="realConfig.setting.ctype"
        :etype="realConfig.setting.etype" @resize="resize">
        <Content v-if="realConfig.container.visible" :customConfig="customConfig"
            :is-show-china-full-area="realConfig.setting.isShowChinaFullArea" :adcode="adcode"
            :req-heat-data="reqHeatData" @layerClick="layerClick" />
    </container>
</template>
<script>
//vue组件
import Container from '@/elements/common/Container'
import Content from './content.vue'
//常量
import { DefaultValue } from './defaultValue'
//工具方法
import { fakeDeepClone, fakeAssign, debounce, FlatToNested } from '@/utils/tool'
//Base基类
import ElementBase from '../../common/base/ElementBase'
import ComponentBase from '../../common/base/ComponentBase'
import RequestBase from '../../common/base/RequestBase'
import { VariableEvent } from '@/core/dataView/constant'
export default {
    name: 'shL7Heatmap',
    components: {
        Container,
        Content,
    },
    mixins: [ElementBase, ComponentBase, RequestBase],
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
        children: {
            type: Array,
            default () {
                return []
            },
        },
    },
    data () {
        return {
            reqHeatData: [],
            realConfig: {},
            output: {
                adcode: '310000',
                name: '上海',
            },
            adcode: '310000',
            heatColors: null,
            variableList: new Map(),
        }
    },
    computed: {},
    watch: {
        customConfig: {
            deep: true,
            handler () {
                fakeAssign(this.realConfig, this.customConfig)
            },
        },
        'realConfig.requestConfig': {
            deep: true,
            handler () {
                this.collectVariable()
            },
        },
    },
    created () {
        this.realConfig = fakeAssign({}, this.defaultConfig, this.customConfig)
        console.log("获取地图初始化热力配置信息=================", this.realConfig.setting);
    },
    mounted () {
        // 收集变量
        this.collectVariable()
        // 先解绑
        this.removeEventListener()
        // 监听变量变化逻辑
        this.addEventListener()
    },
    methods: {
        afterReload (res) {
            this.reqHeatData = FlatToNested(res)
        },
        collectVariable () {
            if (
                !this.realConfig.requestConfig ||
                !this.realConfig.requestConfig.dataFilter ||
                !this.realConfig.requestConfig.dataFilter.groups ||
                !this.realConfig.requestConfig.dataFilter.groups[0]
            ) {
                return
            }
            let variableName =
                this.realConfig.requestConfig.dataFilter.groups[0].filter.value
            this.variableList = new Map()
            this.variableList.set(variableName, true)
        },
        removeEventListener () {
            this.$global.eventBus.off(
                VariableEvent.UPDATED_CHANGED,
                this.eventHandle
            )
        },
        addEventListener () {
            this.$global.eventBus.on(
                VariableEvent.UPDATED_CHANGED,
                this.eventHandle
            )
        },
        eventHandle ({ id }) {
            if (this.variableList.has(id)) {
                this.updateParams()
            }
        },
        layerClick (event) {
            this.$set(this.output, 'adcode', event.feature.properties.adcode)
            this.$set(this.output, 'name', event.feature.properties.name)
            this.runExtendScript('layerClick', event)
        },
    },
}
</script>

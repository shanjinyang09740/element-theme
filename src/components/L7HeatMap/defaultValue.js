import { ComponentType } from './constant'
import { DefaultValue as ContainerDefaultValue } from '@/elements/common/Container/defaultValue'

import { fakeDeepClone } from '@/utils/tool'

import { ElementType } from '@/core/dataView/constant'

let container = fakeDeepClone(ContainerDefaultValue)
container.width = '100%'
container.height = '100%'

export const DefaultValue = {
    // 组件版本
    version: '1.0.0',
    // 基础信息
    base: {
        // 组件名称
        name: '热力地图',
        // 组件唯一标识
        ucid: 'heat-map',
        // 组件描述
        desc: '',
    },
    // 容器信息
    container,
    // 配置信息
    setting: {
        //元素类型
        etype: ElementType.COMPONENT,
        // 组件类型
        ctype: ComponentType,
        // 组件类型名称
        cName: '热力地图',
        // 关联信息
        relationVars: [],
        // 地图类型
        adcode: '100000',
        // 是否显示中国全境，关闭的话不显示九段线部分
        isShowChinaFullArea: true,
        // 热力颜色渐变
        heatColors:
            ["rgba(0,159,255,1)","rgba(84,225,252,1)","rgba(184,227,149,1)","rgba(251,241,98,1)","rgba(252,168,84,1)","rgba(250,135,55,1)"],
        hotRange: "10,20,30,40,50"
    },
    // 脚本扩展
    extendScript: '',
    subOfVariables: {
        // 属性脚本
        attrScript: {},
        // 请求相关
        request: {},
    },
    requestConfig: {},
}

<template>
    <div class="mapContent">
        <div id="map"></div>
        <div class="popup" ref="popup">
            <ul>
                <li v-for="(item, index) in popList" :key="index">
                    <span :class="[item.className?item.className:'']">{{item.text}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import {
    Scene,
    PolygonLayer,
    LineLayer,
    CanvasLayer,
} from "@antv/l7";
import { Mapbox } from "@antv/l7-maps";

export default {
    name: "Polygon_province_shanghai_gai",
    props: {
        reqHeatData: {
            type: Array,
        },
        adcode: {
            type: String,
            default: "310000"
        },
        customConfig: {
            type: Object,
            required: true,
        },
    },
    components: {},
    data () {
        return {
            // 地图实例
            scene: null,
            // 地图提示框
            popup: null,
            popList: [],
            // 地图数据
            mapData: {},
            // 地图图层
            filllayer: null,
            lineLayer: null,
            wallLayer: null,
            labelLayer: null,
            // 地图点坐标
            pointData: [
                { lng: 121.523572, lat: 31.158946, name: "黄浦区", color: "#fff" },
                { lng: 121.459405, lat: 31.092992, name: "徐汇区", color: "#fff" },
                { lng: 121.380949, lat: 31.13737, name: "长宁区", color: "#fff" },
                { lng: 121.470659, lat: 31.200821, name: "静安区", color: "#fff" },
                { lng: 121.372042, lat: 31.197895, name: "普陀区", color: "#fff" },
                { lng: 121.505443, lat: 31.246649, name: "虹口区", color: "#fff" },
                { lng: 121.589302, lat: 31.23835, name: "杨浦区", color: "#fff" },
                { lng: 121.418901, lat: 30.957213, name: "闵行区", color: "#fff" },
                { lng: 121.384861, lat: 31.352111, name: "宝山区", color: "#fff" },
                { lng: 121.20439, lat: 31.288138, name: "嘉定区", color: "#fff" },
                { lng: 121.742177, lat: 31.083823, name: "浦东新区", color: "#fff" },
                { lng: 121.255144, lat: 30.758932, name: "金山区", color: "#fff" },
                { lng: 121.220231, lat: 30.955194, name: "松江区", color: "#fff" },
                { lng: 121.085188, lat: 31.124681, name: "青浦区", color: "#fff" },
                { lng: 121.56251, lat: 30.797998, name: "奉贤区", color: "#fff" },
                { lng: 121.568484, lat: 31.475916, name: "崇明区", color: "#fff" },
            ],
            // 图例
            legendList: [],
        };
    },
    created () { },
    watch: {
        reqHeatData: {
            deep: true,
            handler () {
                console.log("获取地图相关热力数据", this.reqHeatData);
                if (this.reqHeatData.length) {
                    this.render()
                }
            },
        },
        "customConfig": {
            immediate: true,
            deep: true,
            handler () {
                console.log("获取地图相关配置信息", this.customConfig);
                this.render();
            },
        },
    },
    mounted () {
        //渲染地图
        this.initMap();
    },
    methods: {
        initMap () {
            window.map = this.scene = new Scene({
                id: "map",
                map: new Mapbox({
                    pitch: 24,
                    style: "blank",
                    center: [121.48687803809675, 31.057253211651545],
                    zoom: 8.4,
                }),
                logoVisible: false,
                preserveDrawingBuffer: true,
                rotateEnable: false,
            });
            this.scene.on("loaded", () => {
                this.render()
            });
        },
        drawLabel (option) {
            const { size, ctx, mapService } = option;
            const [width, height] = size;
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#fff";
            ctx.font = "normal small-caps bold 14px arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            this.pointData.map((point) => {
                const pixelCenter = mapService.lngLatToContainer([
                    point.lng,
                    point.lat,
                ]);
                pixelCenter.x *= window.devicePixelRatio;
                pixelCenter.y *= window.devicePixelRatio;

                ctx.save();

                ctx.fillText(point.name, pixelCenter.x, pixelCenter.y);

                ctx.beginPath();
                ctx.arc(pixelCenter.x, pixelCenter.y, 0, 0, Math.PI * 2);
                ctx.closePath();

                ctx.fill();

                ctx.restore();
                return "";
            });
            return "";
        },
        getAreaBgColor (name, value) {
            let areaColor = "#47A5F7";
            this.legendList.some((item) => {
                if (value >= item.min && value <= item.max) {
                    areaColor = item.color;
                    return true;
                }
            });
            return areaColor;
        },
        showPopup (e) {
            let { name, adcode } = e.feature.properties
            this.popList = [];
            this.popList.push({
                text: name,
                className: "dqName"
            })
            let columns = this.customConfig.requestConfig.columns.filter(item => item.alias != "name" && item.alias != "hot");
            columns.forEach(item => {
                let { alias, columnLabel, columnName } = item;
                this.reqHeatData.some(ite => {
                    if (ite.name == adcode) {
                        for (let key in ite) {
                            if (key == alias && columnLabel) {
                                this.popList.push({
                                    text: `${columnLabel}：${ite[key]}`,
                                })
                            }
                        }
                        return true;
                    }
                })

            })
            this.$refs.popup.style.display = 'block'
            this.$refs.popup.style.transform = `translate(${e.x + 10}px, ${e.y + 10}px)`
        },
        hidePopup () {
            this.$refs.popup && this.$refs.popup.style && (this.$refs.popup.style.display = 'none')
        },
        clickArea (e) {
            this.showPopup(e)
            this.$emit("layerClick", e)
        },
        render () {
            //渲染热力区间
            this.afrashHotList();
            this.hidePopup();
            if (!this.scene || !this.scene.loaded) {
                return
            }
            if (this.fillLayer) {
                this.fillLayer.off('mousemove', this.showPopup)
                this.fillLayer.off('mouseout', this.hidePopup)
                this.fillLayer.off('click', this.clickArea)
                this.scene.removeLayer(this.fillLayer)
            }
            if (this.labelLayer) {
                this.scene.removeLayer(this.labelLayer)
            }
            if (this.wallLayer) {
                this.scene.removeLayer(this.wallLayer)
            }
            if (this.lineLayer) {
                this.scene.removeLayer(this.lineLayer)
            }
            if (this.reqHeatData.length) {
                fetch(
                    `/cdn/js/dataView/geoJson/310000_full.json`
                )
                    .then((res) => res.json())
                    .then((geoData) => {
                        let tempMapData = { ...geoData };
                        tempMapData.features.map(item => {
                            let code = item.properties.adcode;
                            this.reqHeatData.some((ite) => {
                                if (code == ite.name) {
                                    item.properties.hot = ite.hot || 0;
                                    item.properties.value = ite.hot || 0;
                                    return true;
                                }
                            });

                        })
                        this.mapData = tempMapData;
                        this.renderLayer()
                    })
            }
        },
        //渲染热力区间及图例
        afrashHotList () {
            this.legendList = [];
            let hotList = [];
            let { heatColors, hotRange } = this.customConfig.setting;
            //获取热力区间
            hotList = hotRange ? hotRange.split(",") : [];
            if (hotList.length && heatColors.length) {
                hotList = hotList.map(item => Number(item))
                hotList.forEach((item, index) => {
                    if (index == 0) {
                        this.legendList.push({
                            min: 0,
                            max: item,
                            color: heatColors[index]
                        })
                    } else {
                        this.legendList.push({
                            min: hotList[index - 1],
                            max: item,
                            color: heatColors[index]
                        })
                    }
                });
                this.legendList.push({
                    min: hotList[hotList.length - 1],
                    max: Number.POSITIVE_INFINITY,
                    color: heatColors[hotList.length - 1]
                })
            }


        },
        //渲染图层
        renderLayer () {
            this.fillLayer = new PolygonLayer({
                zIndex: 2,
            })
                .source(this.mapData)
                .shape("extrude")
                .color("name*value", (name, value) => {
                    return this.getAreaBgColor(name, value);
                })
                .size(20)
                .active(true)
                .style({
                    opacityLinear: {
                        // true - false
                        enable: true,
                        // in - out
                        dir: "in",
                    },
                    heightfixed: true, //  默认为 false
                    pickLight: true, //  默认为 false
                    raisingHeight: 20,
                });
            this.scene.addLayer(this.fillLayer);
            this.fillLayer.on('mousemove', this.showPopup)
            this.fillLayer.on('mouseout', this.hidePopup)
            this.fillLayer.on('click', this.clickArea)

            this.lineLayer = new LineLayer({ zIndex: 1 })
                .source(this.mapData)
                .shape("line")
                .color("name*value", (name, value) => {
                    return this.getAreaBgColor(name, value);
                })
                .size(1);
            this.scene.addLayer(this.lineLayer);

            this.wallLayer = new LineLayer({ zIndex: 1 })
                .source(this.mapData)
                .shape("wall")
                .color("name*value", (name, value) => {
                    return this.getAreaBgColor(name, value);
                })
                .size(10)
                .style({
                    heightfixed: true,
                    opacity: 1,
                    targetColor: "rbga(255,255,255, 0)",
                });
            this.scene.addLayer(this.wallLayer);

            this.labelLayer = new CanvasLayer({})
                .style({
                    zIndex: 10,
                    update: "always",
                    drawingOnCanvas: this.drawLabel,
                })
                .animate({
                    enable: true,
                });
            this.scene.addLayer(this.labelLayer);
        }
    },
};
</script>
  
<style lang="less" scoped>
.mapContent {
    width: 100%;
    height: 100%;
    position: relative;
    font-family: "Microsoft YaHei";

    #map {
        width: 98%;
        height: 100%;
        position: relative;
        margin: 0 auto;
    }

    .popup {
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        padding: 10px 15px;
        line-height: 25px;

        .dqName {
            font-weight: bolder;
        }
    }

    .legend {
        position: absolute;
        right: 10px;
        top: 10px;

        .title {
            color: #71ede8;
            font-size: 18px;
            padding-bottom: 5px;
            font-weight: bolder;
        }

        ul {
            li {
                display: flex;
                height: 25px;
                align-items: center;
                font-size: 16px;
                color: #fff;

                i {
                    width: 10px;
                    height: 10px;
                    margin-right: 5px;
                }
            }
        }

    }


}
</style>
  
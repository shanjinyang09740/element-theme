<template>
  <div id="map"></div>
</template>

<script>
import { Scene, PolygonLayer, LineLayer, PointLayer } from "@antv/l7";
import { Mapbox } from "@antv/l7-maps";
import geoData from "./shanghai.json";

export default {
  name: "Polygon_province_shanghai_gai",
  mounted() {
    const scene = new Scene({
      id: "map",
      map: new Mapbox({
        pitch: 24,
        style: "blank",
        center: [121.34687803809675, 31.397253211651545],
        zoom: 8.151412188068154,
      }),
      logoVisible: false,
      preserveDrawingBuffer: true,
      rotateEnable: false,
    });
    window.scene = scene;
    scene.on("loaded", () => {
      const filllayer = new PolygonLayer({
        zIndex: 2,
      })
        .source(geoData)
        .shape("extrude")
        .color("name", [
          "#009449c8",
          "#0084acc8",
          "#c83238c8",
          "#a98a06c8",
          "#00a600c8",
        ])
        .size(20)
        .style({
          opacityLinear: {
            enable: true, // true - false
            dir: "in", // in - out
          },
          heightfixed: true, //  默认为 false
          pickLight: true, //  默认为 false
          raisingHeight: 20,
        });
      scene.addLayer(filllayer);

      const lineLayer = new LineLayer({ zIndex: 1 })
        .source(geoData)
        .shape("line")
        .color("#0DCCFF")
        .size(1);
      scene.addLayer(lineLayer);

      const wallLayer = new LineLayer({ zIndex: 1 })
        .source(geoData)
        .shape("wall")
        .color("name", [
          "#009449a0",
          "#0084aca0",
          "#c83238a0",
          "#a98a06a0",
          "#00a600a0",
        ])
        .size(10)
        .style({
          heightfixed: true,
          opacity: 1,
          targetColor: "rbga(255,255,255, 0)",
        });
      scene.addLayer(wallLayer);

      const labelLayer = new PointLayer({
        zIndex: 5,
      })
        .source(geoData)
        .color("#fff")
        .shape("name", "text")
        .size(15)
        .style({
          opacity: 1,
          stroke: "#fff",
          strokeWidth: 0,
          fontFamily: "Times New Roman",
          fontWeight: 700,
          raisingHeight: 10,
        });
      scene.addLayer(labelLayer);
      filllayer.on("click", (e) => console.log(e));

      //   filllayer.on("click", console.log("123456"));

      // const wallLayer = new LineLayer()
      //     .source(geoData)
      //     .shape('wall')
      //     .size(50)
      //     .style({
      //         heightfixed: true,
      //         opacity: 1,
      //         sourceColor: '#0DCCFF',
      //         targetColor: 'rbga(255,255,255, 0)',
      //     })

      // scene.addLayer(wallLayer)

      // 画图
      // const chinaPolygonLayer = new PolygonLayer({
      //     autoFit: true,
      // })
      //     .source(geoData)
      //     .color('name', [
      //         'rgb(239,243,255)',
      //         'rgb(189,215,231)',
      //         'rgb(107,174,214)',
      //         'rgb(49,130,189)',
      //         'rgb(8,81,156)',
      //     ])
      //     .shape('fill')
      //     .style({
      //         opacity: 1,
      //     })
      // scene.addLayer(chinaPolygonLayer)
      // //  图层边界
      // const layer2 = new LineLayer({
      //     zIndex: 2,
      // })
      //     .source(geoData)
      //     .color('rgb(93,112,146)')
      //     .size(0.6)
      //     .style({
      //         opacity: 1,
      //     })

      // scene.addLayer(chinaPolygonLayer)
      // scene.addLayer(layer2)

      // // 画文字
      // const labelLayer = new PointLayer({
      //     zIndex: 5,
      // })
      //     .source(geoData)
      //     .color('#fff')
      //     .shape('name', 'text')
      //     .size(12)
      //     .style({
      //         opacity: 1,
      //         stroke: '#fff',
      //         strokeWidth: 0,
      //         padding: [5, 5],
      //         textAllowOverlap: false,
      //     })

      // scene.addLayer(labelLayer)
      // let lineDown, lineUp, textLayer

      // const texts = []

      // geoData.features.map((option) => {
      //     const { name, center } = option.properties
      //     const [lng, lat] = center
      //     texts.push({ name, lng, lat })
      //     return ''
      // })

      // textLayer = new PointLayer({ zIndex: 2 })
      //     .source(texts, {
      //         parser: {
      //             type: 'json',
      //             x: 'lng',
      //             y: 'lat',
      //         },
      //     })
      //     .shape('name', 'text')
      //     .size(14)
      //     .color('#0ff')
      //     .style({
      //         textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
      //         spacing: 2, // 字符间距
      //         padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
      //         stroke: '#0ff', // 描边颜色
      //         strokeWidth: 0.2, // 描边宽度
      //         raisingHeight: 20000 + 15000 + 1000,
      //         textAllowOverlap: true,
      //     })
      // // scene.addLayer(textLayer)

      // // 画了2个线面
      // lineDown = new LineLayer()
      //     .source(geoData)
      //     .shape('line')
      //     .color('#0DCCFF')
      //     .size(1)
      //     .style({
      //         raisingHeight: 20000,
      //     })

      // lineUp = new LineLayer({ zIndex: 1 })
      //     .source(geoData)
      //     .shape('line')
      //     .color('#0DCCFF')
      //     .size(1)
      //     .style({
      //         raisingHeight: 20000 + 15000,
      //     })

      // const begin = { red: 255, green: 242, blue: 0 }
      // const end = { red: 237, green: 66, blue: 100 }
      // function getColor(value) {
      //     const percentage = value / 100

      //     const red =
      //         begin.red + Math.floor(percentage * (end.red - begin.red))
      //     const green =
      //         begin.green +
      //         Math.floor(percentage * (end.green - begin.green))
      //     const blue =
      //         begin.blue +
      //         Math.floor(percentage * (end.blue - begin.blue))

      //     return `rgb(${red},${green},${blue})`
      // }
      // let index = 0
      // const filllayer = new PolygonLayer({
      //     name: 'fill',
      //     zIndex: 3,
      // })
      //     .source(geoData)
      //     .shape('extrude')
      //     .color('adcode', (adcode, index) => {
      //         console.log(111, adcode, index)
      //         return getColor(parseInt(Math.random() * 100))
      //     })
      //     .size('unit_price', () => parseInt(30000 - index++ * 1000))
      //     .style({
      //         opacity: 1,
      //         pickLight: true,
      //     })
      //     .active(true)
      // scene.addLayer(filllayer)

      // filllayer.on('mousemove', console.log)
    });
  },
};
</script>

<style lang="less" scoped>
#map {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

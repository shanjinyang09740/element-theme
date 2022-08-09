<template>
  <div>
    <div id="handTable"></div>
  </div>
</template>

<script>
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.css";
import "./table.less";
export default {
  name: "handSonTable",
  components: {},
  props: {},
  data() {
    return {
      //表格实例
      handInstance: null,
      hotSettings: {
        data: [
          {
            title:
              "<a href='http://www.amazon.com/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691'>Professional JavaScript for Web Developers</a>",
            description:
              "This <a href='http://bit.ly/sM1bDf'>book</a> provides a developer-level introduction along with more advanced and useful features of <b>JavaScript</b>.",
            comments:
              "I would rate it &#x2605;&#x2605;&#x2605;&#x2605;&#x2606;",
            cover:
              "https://handsontable.com/docs/images/examples/professional-javascript-developers-nicholas-zakas.jpg",
          },
          {
            title:
              "<a href='http://shop.oreilly.com/product/9780596517748.do'>JavaScript: The Good Parts</a>",
            description:
              "This book provides a developer-level introduction along with <b>more advanced</b> and useful features of JavaScript.",
            comments: "This is the book about JavaScript",
            cover:
              "https://handsontable.com/docs/images/examples/javascript-the-good-parts.jpg",
          },
          {
            title:
              "<a href='http://shop.oreilly.com/product/9780596805531.do'>JavaScript: The Definitive Guide</a>",
            description:
              "<em>JavaScript: The Definitive Guide</em> provides a thorough description of the core <b>JavaScript</b> language and both the legacy and standard DOMs implemented in web browsers.",
            comments:
              "I've never actually read it, but the <a href='http://shop.oreilly.com/product/9780596805531.do'>comments</a> are highly <strong>positive</strong>.",
            cover:
              "https://handsontable.com/docs/images/examples/javascript-the-definitive-guide.jpg",
          },
        ],
        rowHeaders: false,
        width: "100%",
        height: "auto",
        colHeaders: ["标题", "描述", "评论", "封面"],
        colWidths: [200, 200, 200, 200],
        columns: [
          { data: "title", renderer: "html" },
          { data: "description", renderer: "html" },
          { data: "comments", renderer: this.safeHtmlRenderer },
          { data: "cover", renderer: this.coverRenderer },
        ],
        selectionMode: "multiple",
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
            },
            mergeCells: {
              name: "合并单元格",
            },
          },
        },
      },
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    //初始化handSonTable表格实例
    this.initHandInstance();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    initHandInstance() {
      const container = document.getElementById("handTable");
      this.handInstance = new Handsontable(container, this.hotSettings);
      console.log("handInstance", this.handInstance);
    },
    safeHtmlRenderer(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.dom.empty(td);
      let divDom = document.createElement("div");
      divDom.classList.add("contain");
      divDom.style.cssText =
        "width:100%;height:100%;background-color:skyblue;cursor:pointer";
      Handsontable.dom.addEvent(divDom, "ondrop", function(ev) {
        var data = ev.dataTransfer.getData("Text");
        ev.target.appendChild(document.getElementById(data));
        ev.preventDefault();
      });
      Handsontable.dom.addEvent(divDom, "ondragover", function(ev) {
        ev.preventDefault();
      });
      let childDom = document.createElement("div");
      childDom.draggable = true;
      childDom.innerHTML = value;
      Handsontable.dom.addEvent(childDom, "drag", function(e) {
        e.preventDefault(); // prevent selection quirk
        console.log("拖拽触发了", e.target);
      });
      divDom.appendChild(childDom);
      td.appendChild(divDom);
      //   Handsontable.dom.addEvent(divDom, "click", function(e) {
      //     e.preventDefault(); // prevent selection quirk
      //     console.log("容器触发了", e.target);
      //   });
      return td;
    },
    coverRenderer(instance, td, row, col, prop, value, cellProperties) {
      var escaped = Handsontable.helper.stringify(value),
        img;

      if (escaped.indexOf("http") === 0) {
        img = document.createElement("IMG");
        img.src = value;

        Handsontable.dom.addEvent(img, "mousedown", function(e) {
          e.preventDefault(); // prevent selection quirk
        });

        Handsontable.dom.empty(td);
        td.appendChild(img);
      } else {
        // render as text
        Handsontable.renderers.TextRenderer.apply(this, arguments);
      }

      return td;
    },
  },
};
</script>

<style lang="less" scoped>
#handTable {
  width: 100%;
}
.contain {
  width: 100%;
  height: 500px;
  background-color: pink;
}
</style>

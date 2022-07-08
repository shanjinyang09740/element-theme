<template>
  <div id="reportView"></div>
</template>

<script>
import { TopicReport } from "./js/easy-report-viewer-class";
export default {
  name: "reportView",
  components: {},
  props: {
    reportData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {},
  watch: {
    reportData: {
      handler: function() {
        this.queryData();
      },
      deep: true,
    },
  },
  data() {
    return {};
  },
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    this.queryData();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    //初始化报表数据
    queryData() {
      let reportDom = document.querySelector("#reportView");
      if (!reportDom) return;
      //创建报表对象
      let reportViewShow = new TopicReport(this.reportData);
      //先清空报表子元素
      reportDom.innerHTML = "";
      reportViewShow.renderTo(reportDom);
    },
  },
};
</script>

<style>
@import "./css/sheet.css";
</style>

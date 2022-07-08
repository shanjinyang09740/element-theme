<template>
  <div class="content">
    <div class="pagination">
      <fu-button :disabled="isPreDisabled" @click="prePageClick"
        >上一页</fu-button
      >
      <div>{{ currentPage }} / {{ pageTotal }}</div>
      <div>
        跳转至<fu-input v-model.number="runPage" @change="trggerRunPage"></fu-input>页
      </div>
      <fu-button :disabled="isNextDisabled" @click="nextPageClick"
        >下一页</fu-button
      >
    </div>
    <vue-pdf
      :src="src"
      :page="currentPage"
      @num-pages="pageTotal = $event"
      @page-loaded="currentPage = $event"
      @loaded="loadPdfHandler"
    >
    </vue-pdf>
  </div>
</template>

<script>
import VuePdf from "vue-pdf";
import { Button, Input } from "fusion-ui";
export default {
  components: {
    FuButton: Button,
    FuInput: Input,
    VuePdf,
  },
  data() {
    return {
      //当前页
      currentPage: 0,
      //总页数
      pageTotal: 0,
      //上一页
      isPreDisabled: false,
      //下一页
      isNextDisabled: false,
      //跳转页面
      runPage: 0,
      //pdf文件地址
      src: VuePdf.createLoadingTask(
        "./static/1129工业和信息化部政务数据共享管理办法（印发稿）.pdf"
      ),
    };
  },
  mounted() {
    // this.src.promise.then((pdf) => {
    //   this.pageTotal = pdf.numPages;
    //   this.currentPage = 3;
    // });
  },
  watch: {
    currentPage(val) {
      this.runPage = val;
      if (val <= 1) {
        this.isPreDisabled = true;
        this.isNextDisabled = false;
      } else if (val >= this.pageTotal) {
        this.isPreDisabled = false;
        this.isNextDisabled = true;
      } else {
        this.isPreDisabled = false;
        this.isNextDisabled = false;
      }
    },
  },
  methods: {
    /**
     * @description pdf加载完成事件
     */
    loadPdfHandler() {
      // 加载的时候先加载第一页
      this.currentPage = 1;
    },
    /**
     * @description 分页输入框失去焦点或回车时触发跳转
     */
    trggerRunPage() {
      if(this.runPage < 1){
          this.currentPage = 1;
      }else if(this.runPage > this.pageTotal){
          this.currentPage = this.pageTotal;
      }else{
          this.currentPage = this.runPage;
      }
    },
    /**
     * @description 上一页
     */
    prePageClick() {
      this.currentPage > 1 ? this.currentPage-- : (this.currentPage = 1);
    },
    /**
     * @description 下一页
     */
    nextPageClick() {
      this.currentPage < this.pageTotal
        ? this.currentPage++
        : (this.currentPage = this.pageTotal);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 1000px;
  height: auto;
  margin: 0 auto;
  overflow: auto;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  min-width: 300px;
  margin: 0 auto;
  padding: 10px 0;
  .el-input {
    width: 60px;
  }
  > div {
    white-space: nowrap;
  }
}
</style>

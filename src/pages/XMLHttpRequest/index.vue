<template>
  <div class="content">
    <h2>XMLHttpRequest原生请求</h2>
    <fu-button type="primary" @click="passGetAjax">发送get请求</fu-button>
    <fu-button type="primary" @click="passPostAjax">发送post请求</fu-button>
  </div>
</template>

<script>
import { Button } from "fusion-ui";
import { getAjax, postAjax } from "./module/xmlHttpRequest";
export default {
  name: "XMLHttpRequest",
  components: {
    FuButton: Button,
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    /**
     * @description 发送get请求事件
     */
    passGetAjax() {
      getAjax("/api/auth/v1/unifiedauth/getLoginName.do").then((res) => {
        console.log("huoqu", res.data);
      });
    },
    /**
     * @description 发送post请求事件
     */
    passPostAjax() {
      let postData = `{"data":[{"vtype":"attr","name":"dicId","data":"Stat_Tab_Survey_Freq"}]}`;
      postAjax("/api/core/v1/dictionary/queryData.do?dicId=Stat_Tab_Survey_Freq", {
        postData: postData
      }).then((res) => {
        console.log("post...", res.data);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
}
</style>

<template>
  <div>
    <h3>axios应用</h3>
  </div>
</template>

<script>
import qs from "qs";
import http from "@/api";
import API from "@/api/dealToken";
export default {
  name: "axioxExtend",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    //发送请求方法
    this.passRequest();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    /**
     * @description 发送请求方法
     */
    passRequest() {
      this.postAjax();
    },
    /**
     * @description 封装请求一----post
     * @param {}
     * @returns {}
     */
    postAjax() {
      let postData = `{"data":[{"vtype":"attr","name":"datasource","data":[{"name":"num","source":"","ddiUrn":"urn:ddi:A50010:e0dd0f10-19c7-4924-957b-50dcbb999dc3:1","sjgsd":"50"}]}]}`;
      http
        .ajaxData("/macrodata/v1/macroDataQueryCounts/queryDataCounts.do", {postData: postData})
        .then((res) => {
          console.log("dsafmaksldfj", res);
        });
    },
    /**
     * @description 使用qs进行参数序列化
     */
    qsParams() {
      let params = {
        postData:
          '{"data":[{"vtype":"attr","name":"dicId","data":"Stat_Tab_Survey_Freq"}]}',
      };
      this.$axios({
        url: "/api/core/v1/dictionary/queryData.do?dicId=Stat_Tab_Survey_Freq",
        method: "post",
        //请求头
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        //允许携带cookie, 默认允许
        withCredentials: true,
        //post请求参数
        data: qs.stringify(params),
      })
        .then((res) => {
          console.log("请求成功了...", res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    /**
     * @description 使用URLSearchParams进行参数序列化
     * @param {}
     * @returns {}
     */
    URLSearchParams() {
      const params = new URLSearchParams();
      params.append(
        "postData",
        '{"data":[{"vtype":"attr","name":"dicId","data":"Stat_Tab_Survey_Freq"}]}'
      );
      this.$axios({
        url: "/api/core/v1/dictionary/queryData.do?dicId=Stat_Tab_Survey_Freq",
        method: "post",
        data: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      })
        .then((res) => {
          console.log("请求成功了...", res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    /**
     * @description 多个并发请求
     */
    concurrentRequest() {
      this.$axios.all([this.getLoginName(), this.queryData()]).then(
        this.$axios.spread((res1, res2) => {
          console.log("res1", res1.data);
          console.log("res2", res2.data);
        })
      );
    },
    /**
     * @description 创建请求实例
     */
    creatAxiosInstance() {
      const instance = this.$axios.create({
        baseURL: "/api/auth/v1/unifiedauth",
        timeout: 1000,
      });
      instance
        .post("/getLoginName.do")
        .then((res) => {
          console.log("resssssss", res);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    /**
     * @description 用户名信息
     */
    getLoginName() {
      return this.$axios.post("/api/auth/v1/unifiedauth/getLoginName.do");
    },
    /**
     * @description 获取列表信息
     */
    queryData() {
      let postData = `{"data":[{"vtype":"attr","name":"dicId","data":"Stat_Tab_Survey_Freq"}]}`;
      return this.$axios.post(
        "/api/core/v1/dictionary/queryData.do?dicId=Stat_Tab_Survey_Freq",
        { postData: postData }
      );
    },
  },
};
</script>

<style lang="less" scoped></style>

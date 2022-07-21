<template>
  <div class="wrapper">
    <vue-excel-table
      ref="excelTable"
      :columns="columns"
      v-model="data"
      maxHeight="800"
    />
  </div>
</template>

<script>
import vueExcelTable from "vue-excel-table";
import "vue-excel-table/dist/vue-excel-table.min.css";
export default {
  name: "",
  components: { vueExcelTable },
  props: {},
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 40,
          fixed: true,
        },
        {
          title: "序号",
          key: "sid",
          fixed: true,
          type: "number",
          width: 100,
        },
        {
          title: "姓名",
          key: "name",
          fixed: true,
          width: 120,
        },
        {
          title: "日期",
          key: "date",
          type: "date",
          width: 100,
        },
        {
          title: "工作岗位",
          key: "email",
          width: 300,
          type: "select",
          options: [
            {
              value: "Web前端开发",
              label: "Web前端开发",
            },
            {
              value: "Java开发",
              label: "Java开发",
            },
            {
              value: "Python开发",
              label: "Python开发",
            },
            {
              value: "Php开发",
              label: "Php开发",
            },
          ],
        },
        {
          title: "月份",
          key: "month",
          type: "month",
          width: 100,
        },
        {
          title: "地址",
          key: "address",
          width: 200,
        },
        {
          title: "标题",
          key: "title",
          width: 300,
        },
        {
          title: "内容",
          key: "paragraph",
          width: 300,
        },
        {
          title: "链接",
          key: "url",
          width: 200,
        },
        {
          title: "ip",
          key: "ip",
          width: 200,
          validate: (value) => {
            const pattern =
              /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g;
            return pattern.test(value);
          },
        },
        {
          title: "总金额",
          key: "sum",
          width: 200,
        },
        {
          title: "ID",
          key: "id",
          width: 200,
        },
        {
          title: "色值",
          key: "color",
          width: 200,
        },
      ],
      data: [],
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const data = [];
      this.$refs.excelTable.setData(data);
    },
  },
};
</script>
<style lang="less" scoped></style>

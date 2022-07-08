<template>
  <table class="table" cellpadding="0" cellspacing="0">
    <tr v-for="trItem in tableData" :key="trItem.id">
      <td v-for="tdItem in trItem.children" :key="tdItem.id">
        <div class="contain">
            <template v-if="tdItem.children">
                <table-child :tableData="tdItem.children"></table-child>
            </template>
        </div>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  name: "tableChild",
  components: {},
  // extends: null,
  // minxins: [],
  props: {
      tableData: {
          type: Array,
          default: () => []
      }
  },
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
  methods: {},
};
</script>

<style lang="less" scoped>
.table {
  width: 100%;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  td {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    .contain {
      min-height: 30px;
    }
  }
}
</style>

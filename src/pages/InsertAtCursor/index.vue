<template>
  <div class="main">
    <fu-form :fu-data="formData">
      <fu-form-item label="参数：" prop="message">
        <fu-select v-for="item in formItems" :key="item.value" :fu-request="item.fuRequest" :fu-id="item.fuId"
          v-model="formData[item.value]" @change="selectChange(formData[item.value], item.value)">
          <fu-option v-for="(i, index) in codeListOption(item.fuId)" :key="i.value" :label="i.text" :value="i.value">
          </fu-option>
        </fu-select>
      </fu-form-item>
      <fu-form-item prop="message">
        <fu-input type="textarea" id="configInput" ref="configInput" maxlength="300" show-word-limit
          :autosize="{ minRows: 4, maxRows: 8 }" v-model="formData.message" placeholder="请输入..."></fu-input>
      </fu-form-item>
    </fu-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Select, Option } from 'fusion-ui';
export default {
  name: 'InsertAtCursor',
  components: {
    FuForm: Form,
    FuFormItem: FormItem,
    FuInput: Input,
    FuSelect: Select,
    FuOption: Option,
  },
  props: {},
  data () {
    return {
      formItems: [
        {
          text: "下拉一",
          value: "colums",
          fuId: "select01",
          fuRequest: {
            url: '/api/core/v1/dictionary/queryData.do?dicId=IndustryCode',
            params: [],
          }
        },
        {
          text: "下拉二",
          value: "params",
          fuId: "select02",
          fuRequest: {
            url: '/api/core/v1/dictionary/queryData.do?dicId=EnterpriseSize',
            params: [],
          }
        },
      ],
      formData: {
        columns: '',
        params: '',
        message: '',
      },
      columsOption: [
        {
          text: '列1',
          value: 'column1',
        },
        {
          text: '列2',
          value: 'column2',
        },
        {
          text: '列3',
          value: 'column3',
        },
      ],
      paramsOption: [
        {
          text: '参数1',
          value: 'params1',
        },
        {
          text: "参数2",
          value: 'params2',
        },
        {
          text: '参数3',
          value: 'params3',
        },
      ],
    };
  },
  computed: {
    codeListOption () {
      return function (id) {
        return this.$store.state.reqData[id] || [];
      };
    },
  },
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  methods: {
    selectChange (val, type) {
      let newVal = (type == 'colums' ? 'and-' : '@-') + val;
      this.insertAtCursor(newVal);
    },
    /**
     *插入模板说明的变量
     */
    async insertAtCursor (myValue) {
      const myField = document.querySelector('#configInput');
      console.log('myField1111111', myField);
      if (myField.selectionStart || myField.selectionStart === 0) {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        this.formData.message =
          myField.value.substring(0, startPos) +
          myValue +
          myField.value.substring(endPos, myField.value.length);
        await this.$nextTick(); // 这句是重点, 圈起来
        myField.focus();
        // 检测函数是否下一次插入点位置 设置光标位置
        myField.setSelectionRange(
          endPos + myValue.length,
          endPos + myValue.length,
        );
      } else {
        this.formData.message += myValue;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  padding: 10px;

  .el-select {
    margin-right: 10px;
  }
}
</style>

<template>
  <div class="main">
    <fu-form :fu-data="formData">
      <fu-form-item label="参数：" prop="message">
        <fu-select
          v-model="formData.colums"
          @change="selectChange(formData.colums)"
        >
          <fu-option
            v-for="(i, index) in columsOption"
            :key="i.value"
            :label="i.text"
            :value="i.value"
          ></fu-option>
        </fu-select>
        <fu-select
          v-model="formData.params"
          @change="selectChange(formData.params)"
        >
          <fu-option
            v-for="(i, index) in paramsOption"
            :key="i.value"
            :label="i.text"
            :value="i.value"
          ></fu-option>
        </fu-select>
      </fu-form-item>
      <fu-form-item prop="message">
        <fu-input
          type="textarea"
          id="configInput"
          ref="configInput"
          maxlength="300"
          show-word-limit
          :autosize="{ minRows: 4, maxRows: 8 }"
          v-model="formData.message"
          placeholder="请输入..."
        ></fu-input>
      </fu-form-item>
    </fu-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Select, Option } from 'fusion-ui'
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
  data() {
    return {
      formData: {
        params: '',
        message: '',
      },
      paramsOption: [
        {
          text: '参数1',
          value: 'params1',
        },
        {
          text: '参数2',
          value: 'params2',
        },
        {
          text: '参数3',
          value: 'params3',
        },
      ],
    }
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
    selectChange(val) {
      this.insertAtCursor(val)
    },
    /**
     *插入模板说明的变量
     */
    // 获取光标位置
    async insertAtCursor(myValue) {
      const myField = document.querySelector('#configInput')
      console.log('myField1111111', myField)
      if (myField.selectionStart || myField.selectionStart === 0) {
        var startPos = myField.selectionStart
        var endPos = myField.selectionEnd
        this.formData.message =
          myField.value.substring(0, startPos) +
          myValue +
          myField.value.substring(endPos, myField.value.length)
        await this.$nextTick() // 这句是重点, 圈起来
        myField.focus()
        // 检测函数是否下一次插入点位置 设置光标位置
        myField.setSelectionRange(
          endPos + myValue.length,
          endPos + myValue.length,
        )

        // if (myValue.indexOf('(') !== -1) {
        //   let arr = myValue.split('')
        //   let index = arr.findIndex((o) => {
        //     return o == '('
        //   })
        //   myField.setSelectionRange(endPos + index + 1, endPos + index + 1)
        // } else {
        //   myField.setSelectionRange(
        //     endPos + myValue.length,
        //     endPos + myValue.length,
        //   )
        // }
      } else {
        this.formData.message += myValue
      }
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  padding: 10px;
}
</style>

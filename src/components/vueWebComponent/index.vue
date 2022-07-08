<template>
  <div>
      <h1>自定义web-component组件</h1>
      <div class="custom">
          <p>{{msg}}</p>
      </div>
  </div>
</template>

<script>
export default {
    name: "webComponent",
    props: {
        msg: {
            type: String,
            default: "自定义..."
        }
    }
}
</script>

<style lang="less" scoped>
.custom {
    padding: 50px;
    background-color: skyblue;
    color: #fff;
}
</style>
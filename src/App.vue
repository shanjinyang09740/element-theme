<template>
  <div id="app">
    <layout-comp></layout-comp>
  </div>
</template>

<script>
import LayoutComp from "@/pages/Layout";
export default {
  name: "app",
  components: {
    LayoutComp,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less">
html,
body {
  overflow: auto;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
</style>

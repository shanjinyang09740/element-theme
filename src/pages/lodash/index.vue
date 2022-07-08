<template>
  <div></div>
</template>

<script>
// Load the full build.
var _ = require("lodash");

export default {
  name: "lodash",
  components: {},
  data() {
    return {};
  },
  mounted() {
    // var array = [1];
    // var other = _.concat(array, 2, [3], [[4]]);
    // console.log(11111111, other);
    // console.log('____', _);

    let newArr = _.difference([3,2,1], [4,2]);
    console.log('newArr', newArr);

  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

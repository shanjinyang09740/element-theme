<script>
//父组件
import Item from "./module/item.vue"
export default {
  name: "list",
  data() {
    return {
      data: "我是函数式组件",
      id: 1,
      tests: {
        1: (
          <div>
            <span>第一道题</span>
          </div>
        ),
        2: (
          <div>
            <section>第二道题</section>
          </div>
        ),
        3: (
          <div>
            <p>第三道题</p>
          </div>
        ),
      },
    };
  },
  methods: {
    next() {
      ++this.id;
    },
  },
  render() {
    return (
      <div>
        <Item data={this.tests[this.id]} class="large" />
        <button onClick={this.next}>下一题</button>
      </div>
    );
  },
};
</script>

<style lang="less" scoped>
    .large {
        background-color: red;
        color: #fff;
    }
</style>

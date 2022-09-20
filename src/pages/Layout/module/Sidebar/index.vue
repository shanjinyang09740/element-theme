<template>
  <div>
    <fu-menu background-color="#21304D" active-text-color="#ffd04b" text-color="#fff" style="width: 100%"
      :unique-opened="true" :default-active="defaultActiveMenue" :default-openeds="['1']" @select="select">
      <aside-child :menuList="menuList"></aside-child>
    </fu-menu>
  </div>
</template>

<script>
import AsideChild from "./AsideChild";
import { Menu } from "fusion-ui";

export default {
  components: {
    FuMenu: Menu,
    AsideChild,
  },
  data () {
    return {
      //默认激活高亮菜单
      defaultActiveMenue: "",
      //侧边栏菜单
      menuList: [
        {
          id: "1",
          text: "多级筛选",
          src: "/multiLevelFilter.html",
        },
        {
          id: "2",
          text: "VuePdf",
          src: "/pdf.html",
        },
        {
          id: "3",
          text: "捕捉光标位置",
          src: "/insertAtCursor.html",
        },
        {
          id: "4",
          text: "设置表格滚动位置",
          src: "/setTableScroll.html",
        },
      ],
    };
  },
  mounted () {
    //初始化菜单
    this.initMenuActive();
  },
  methods: {
    /**
     * @description 初始化菜单
     */
    initMenuActive () {
      //默认显示第一个父节点下第一个子节点
      this.menuList.some((item, index) => {
        if (index == 0) {
          let src = item.children ? item.children[0]["src"] : item["src"];
          this.defaultActiveMenue = item.children
            ? item.children[0]["id"]
            : item["id"];
          this.$emit("changeMenue", src);
          return true;
        }
      });
    },
    /**
     * @description 菜单切换事件
     * @param {String} $index
     */
    select ($index) {
      this.findMenu($index, this.menuList, (data) => {
        this.$emit("changeMenue", data);
      });
    },
    /**
     * @description 递归获取当前菜单路径
     * @param {String} $index 当前菜单的索引id
     * @returns {Array} arr 菜单列
     */
    findMenu ($index, arr, callback) {
      if (!arr.length) return;
      arr.some((item) => {
        let $src = item.src;
        if (item.children) {
          this.findMenu($index, item.children, callback);
        } else {
          if (item.id === $index && $src) {
            callback($src);
            return true;
          }
        }
      });
    },
  },
};
</script>

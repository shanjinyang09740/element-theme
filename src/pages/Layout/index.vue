<template>
  <div class="content">
    <fu-container class="contain">
      <fu-header class="header"></fu-header>
      <fu-container class="container">
        <fu-aside
         class="aside"
        >
          <side-bar @changeMenue="changeMenue"></side-bar>
        </fu-aside>
        <fu-main class="main">
          <iframe
            class="iframeMain"
            :src="iframSrc"
          ></iframe>
        </fu-main>
      </fu-container>
    </fu-container>
  </div>
</template>

<script>
import {
  Container,
  Header,
  Aside,
  Main,
} from "fusion-ui";
import SideBar from './module/Sidebar'
export default {
  name: "Layout",
  components: {
    FuContainer: Container,
    FuHeader: Header,
    FuAside: Aside,
    FuMain: Main,
    SideBar
  },
  data() {
    return {
      iframSrc: "",
    };
  },
  methods: {
    /**
     * @description 菜单切换iframe事件
     * @param {val} iframe路径
    */
   changeMenue(val) {
       this.iframSrc = val;
   }
  },
};
</script>

<style lang="less">
.content {
    height: 100vh;
    .contain {
      height: 100%; 
      flex-direction: column;
      .header {
        background: #121931;
      }
      .container {
        flex-direction: row;
        .aside {
          width: 200px;
          border-right: 1px solid #666666;
          overflow-x: hidden;
          background-color: #21304d;
        }
        .main {
          padding: 0; overflow: hidden
        }
        .iframeMain {
          width: 100%; 
          height: 100%; 
          border: none;
        }
      }
    }
}
</style>

<template>
  <div>
    <template v-for="item in menuList">
      <template v-if="item.children && item.children.length">
        <fu-submenu :index="item.id" :key="item.id">
          <template slot="title">
            <i :class="item.icon ? item.icon : 'el-icon-document'"></i>
            <span>{{ item.text }}</span>
          </template>
          <aside-child :menuList="item.children"></aside-child>
        </fu-submenu>
      </template>
      <template v-if="!item.children">
        <fu-menu-item :key="item.id" :index="item.id">
          <i :class="item.icon ? item.icon : 'el-icon-document'"></i>
          <span slot="title">{{ item.text }}</span>
        </fu-menu-item>
      </template>
    </template>
  </div>
</template>
<script>
import { Submenu, MenuItem } from "fusion-ui";
export default {
  name: "AsideChild",
  components: {
    FuSubmenu: Submenu,
    FuMenuItem: MenuItem
  },
  props: {
    menuList: {
      type: Array,
      require: true
    }
  }
};
</script>
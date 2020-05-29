<template>
  <div class="menu-wrapper">
    <template v-for="item in menu" v-if="!item.hidden">
      <!-- 最后一级菜单 -->
      <el-menu-item
        v-if="!item.children && !item.hidden"
        :key="item.path"
        :index="item.path"
      >
        <icon-svg v-if='item.icon' :icon-class="item.icon" /> 
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu
        v-if="item.children && !item.hidden"
        :key="item.path"
        :index="item.path"
      >
        <template slot="title">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> 
          <span> {{ item.meta.title }}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :menu="item.children"/>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: ["menu"],
  data() {
    return {};
  }
};
</script>

<style></style>

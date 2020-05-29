<template>
  <div style="height:100%;">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    <!-- <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view> -->
  </div>
</template>
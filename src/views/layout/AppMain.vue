<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" :key="key"></router-view>
    </transition>
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive> -->
    <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="key"></router-view> -->

    <!-- <keep-alive :include="cachedViews">
        <router-view></router-view>
    </keep-alive> -->
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
        // cachedViews() {
        //     console.log(' this.$store.state.tagsView.cachedViews', this.$store.state.tagsView.cachedViews)
        //     return this.$store.state.tagsView.cachedViews
        // },
        key() {
            // 暂时缓存这个
            return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
        }
    },
  }
</script>

<template>
    <div class="dashboard-container">
        <!-- <div class='dashboard-text'>用户名:{{name}}</div>
        <div class='dashboard-text'>权限组:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
        <!-- <div class="lsit-tab">
            <div class="list-tab-title clearfix">
                <h4>数据总览</h4>
                <span :class="{'active': component === item.name}" @click="component = item.name" v-for="(item,index) in tabs" :key="index">{{item.title}}</span>
            </div>
            <div class="list-tab-content">
                <keep-alive>
                    <component :key="component" :listtype="component"  v-bind:is="component"></component>
                </keep-alive>
            </div>
        </div>
        <div class="dashboard-content clearfix">
            <div class="echartsLine fl">
                <echartsLine></echartsLine>
            </div>
            <div class="echartsPie fl">

            </div>
        </div> -->
        <!-- <zanshi></zanshi> -->
        <!-- <router-view></router-view> -->
        <UIecharts/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import now from './compnents/data'
// import jinqi from './compnents/data'
// import echartsLine from './compnents/echarts'
// import zanshi from './components/zanshi'
import UIecharts from './components/UIecharts'
export default {
  name: 'dashboard',
  components: {
        // echartsLine,
        // now,
        // jinqi,
    // zanshi
    UIecharts
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      tabs: [
        {
          title: '今天',
          name: 'now',
          type: 'AF03701',
          num: 0
        }, {
          title: '近期',
          name: 'jinqi',
          type: 'AF03702',
          num: 0
        }
      ],
      component: 'now'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dashboard {
        &-container {
            // padding: 24px 20px;
            // background: #f2f2f2;
        }
        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
    .lsit-tab{
        .list-tab-title{
            background: #fff;
        }
    }

    .dashboard-container{
        height: 100%;
    }
</style>

<template>
  <div class="sidebar-container">
    <!--     <div class="sidebar-userinfo clearfix">
        <img :src="avatar" alt="">
        <span>{{ name }}</span><br><span>{{ company }}</span>
      </div> -->
      <SidebarMenuSearch :searchItem="sidebarRouters" />
      <!-- <el-menu
        class="sidebar-menu" 
        :default-active="$route.path"
        router
        ref="sidebarmenu"
        @open="setLastPath"
        @select="getCurrentPath"
        unique-opened
        text-color="#fff">
        <template v-if="!item.hidden" v-for="(item,index) in sidebarRouters" ref="sidebaritem">
          <el-menu-item :key="index" v-if="!item.children" :index="item.path">
            <icon-svg v-if='item.icon' :icon-class="item.icon" /> 
            <span class="sidebar-nav-title" slot="title">{{!sidebar.opened ? item.meta.stitle :item.meta.title}}</span>
          </el-menu-item>
          <el-submenu v-else :key="index" :index="item.path">
            <template slot="title" >
              <icon-svg v-if='item.icon' :icon-class="item.icon" /> 
              <span class="sidebar-nav-title">{{!sidebar.opened ? item.meta.stitle :item.meta.title}}</span>
            </template>
            <template v-if="!item2.hidden" v-for="(item2,index2) in item.children">
              <el-menu-item :key="index2" v-if="!item2.children" :index="item2.path">
                <icon-svg v-if='item2.icon' :icon-class="item2.icon" /> 
                <span class="sidebar-nav-title" slot="title">{{!sidebar.opened ? item2.meta.stitle :item2.meta.title}}</span>
              </el-menu-item>
              <el-submenu v-else :key="index2" :index="item2.path">
                <template slot="title">{{!sidebar.opened ? item2.meta.stitle :item2.meta.title}}</template>
                <el-menu-item v-if="!item3.hidden" v-for="(item3,index3) in item2.children" :key="index3" :index="item3.path"><span class="sidebar-nav-title" slot="title">{{item3.meta.title}}</span></el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
        </template>
      </el-menu> -->

        <!-- <el-menu
            :default-active="$route.path"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            mode="vertical"
            unique-opened
            router
            >
            <NavMenu :menu="sidebarRouters" />
        </el-menu> -->
      <sidebar-item ref="sidebaritem" :routes='sidebarRouters'></sidebar-item>
      <div @mouseover="showSubnav" @mouseout="hideSubnav" class="subNavWrapper"></div>
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <!-- <div class="nologin"> -->
        <!-- <el-button size="large" type="primary"><a href="http://192.168.1.157:9528/?nologin=1">TMS系统</a></el-button><br>
        <el-button size="large" type="success"><a href="http://192.168.1.24:9526/?nologin=1">会员中心</a></el-button><br> -->
        <!-- <el-button size="large" type="primary"><a href="http://www.56lines.cn/anfa/?nologin=1" target=_blank>官网后台</a></el-button> -->
      <!-- </div> -->
      <!-- <iframe src="http://www.56lines.cn/member/autologin2.php" frameborder="0" style="width:0;height:0;"></iframe> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import SidebarMenuSearch from './SidebarMenuSearch'
import Hamburger from '@/components/Hamburger'
// import NavMenu from './item'

export default {
  components: { SidebarItem, Hamburger, SidebarMenuSearch },
  computed: {
    ...mapGetters([
      'sidebar',
      'sidebarRouters',
      'permission_routers'
    ])
  },
  methods: {
    setLastPath(index) {
        console.log('setLastPath:', index)
    },
    getCurrentPath(index, path) {
        if (this.lastindex) {
            // 关闭前一个展开的
            this.$refs['sidebarmenu'].close(this.lastindex)
        }
        this.lastindex = path[0]
        // console.log('getCurrentPath:', index, path)
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar');
      // let ifOpen = document.getElementsByClassName('app-wrapper');
      // let nologin = document.getElementsByClassName('nologin')[0];
      //   if(ifOpen[0].className.match(/hideSidebar/)){
      //       nologin.style.display = 'block';
      //   }else{
      //       nologin.style.display = 'none';
      //   }
    },
    showSubnav () {
      this.$refs.sidebaritem.clearTimer()
    },
    hideSubnav () {
      this.$refs.sidebaritem.hideSubNav()
    },
    hideSubNav (event) {
      this.clearTimer()
      this.subMenuTimer = setTimeout(() => {
        this.setSubNav('hide')   
      }, 200);
    },
  }
}
</script>


<style rel="stylesheet/scss" lang="scss">
// @import "src/styles/variate.scss";
// @import "src/styles/mixin.scss";
// @import './memu.scss';

// #app .sidebar-menu{
//     padding-top: 10px;
//   min-height: 100%;
//   .router-link-exact-active{
//     .el-menu-item{
//       color: #20a0ff;
//     }
//   }
// }
.sidebar-container{
    min-height: 100%;
    padding-top: 30px;
    background: #42485B;
    border-radius: 0;

    .el-menu{
        border-right: 0;
        background: #333744;
    }

  .sidebar-userinfo{
    margin-top: -40px;
    margin-bottom: 15px;
    img{
      float: left;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      margin-left: 5px;
      
    }
    span{
      display: inline-block;
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #eee;
      line-height: 20px;
    }
  }

  .hamburger-container{
    position: absolute;
    top: 5px;
    right: 4px;
  }

  .subNavWrapper{
    display: none;
    position: absolute;
    left: 100%;
    max-height: 100%;
    overflow: auto;
  }
}
.nologin{
    position: absolute;
    width: 100%;
    // height: 150px;
    background: rgb(0,32,57);
    left: 0;
    bottom: 0;
    margin-top: 10px;
    text-align: center;
  .el-button{
    width: 100%;
    height: 50px;
    background-color: rgb(0,32,56);
    border: 4px solid #000;
    border-top-color: rgb(5,55,93);
    border-right-color: rgb(5,55,93);
    border-left-color: rgb(5,21,39);
    border-bottom-color: rgb(5,21,39);
    opacity: 0.65;
    border-radius: 0;
    font-size: 16px;
    color: rgba(255,255,255,.65);

    &:hover{
      opacity: 1;
    }
  }
}


</style>

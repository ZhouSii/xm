<template>
  <div class="navbar">
    <div class="logo-panel">
      <router-link to="/"><img src="../../../assets/biglogo.png" alt=""></router-link>
    </div>
    <TopNavMenu />  
<!--     <router-link tag="div" class="pickClip" to="/order/pickClip"><icon-svg icon-class="tiaodanjia" />挑单夹</router-link> -->
    <TopNavUser />
    <!-- <TopNavCreateOrder /> -->   
    <!-- <TopNavSearch /> -->
  </div> 
  
</template>

<script>
import TopNavMenu from './TopNavMenu'
import TopNavUser from './TopNavUser'
import TopNavSearch from './TopNavSearch'
import TopNavCreateOrder from './TopNavCreateOrder'

export default {
  components: {
    TopNavMenu,
    TopNavUser,
    TopNavSearch,
    TopNavCreateOrder
  },
  data() {
    return {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variate.scss";
    .navbar {
    background: #373d41;
      border-radius: 0;
      float: left;
      min-width: 100%;
      position: relative;
      display: flex;

        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .page-top-nav{
          // height: $topNavHeight;
          // float: left;
          // margin-left: 5px;
          height: 50px;
          /* margin-left: 5px; */
          flex: 12 !important;
          /* min-width: 1156px; */
          display: flex;
        }
    }

    .logo-panel{
      // padding-left: 32px;
      // padding-right: 53px;
      // height: auto;
      // float: left;
      // height: $topNavHeight;


    //   padding-left: 32px;
    //   padding-right: 53px;
        padding:0 24px 0 32px;
      height: auto;
      height: 50px;

      a{
        line-height: $topNavHeight;
        display: block;
      }
      
      img{
        height: 37px;
        width: 112px;
        vertical-align: middle;
      }
    }
    

    .pickClip{
      width: 110px;
      position: absolute;
      top: 0;
      right: 344px;
      height: $topNavHeight;
      color: #fff;
      text-align: center;
      cursor: pointer;
      &:hover{
        background-color: rgba(0, 0, 0, .2);
      }
      .svg-icon{
        margin-right: 0px;
        font-size: 1.5em;
        vertical-align: middle;
      }
    }
</style>


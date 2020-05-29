<template>
  <div class="page-top-nav">
      <div class="page-top-nav-arrow">
        <div class="arrowBox_mark" v-show="showArrow">
            <i class="el-icon-arrow-left arrowStyle" v-if="showRight" @click="arrowClick('right')"></i>
        </div>
        <div id="memuBox">
            <el-menu 
                mode="horizontal" 
                :default-active="current"
                :router="true">
                <el-menu-item key="/dashboard" v-if="showDash" index="/">
                    <icon-svg icon-class="shouye" /> 首页
                </el-menu-item>
                <template v-for="(menu, index) in permission_routers">
                    <el-menu-item :key="index" :index="menu.path" v-if="!menu.hidden">
                    <icon-svg v-if="menu.icon" :icon-class="menu.icon" /> {{menu.name}}
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <div class="arrowBox_mark" v-show="showArrow">
            <i class="el-icon-arrow-right arrowStyle" v-if="showLeft" @click="arrowClick('left')"></i>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfo } from '@/utils/auth'

export default {
  name: 'TopNavMenu',
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  },
  data() {
    return {
        showDash:true,
        current: '',
        prevPath: '',
        showArrow:false,
        showLeft:true,
        showRight:false,
        screenWidth:document.body.clientWidth
    }
  },
  watch: {
    $route() {
      this.setNavHightlight()
    },
    // screenWidth (newVal,oldVal) {
    //     console.log('newVal,oldVal',newVal,oldVal)
    //     this.screenWidth = newVal;
    //     this.screenShow(this.screenWidth)
    // }
  },
  mounted() {
    this.setNavHightlight();
    // console.log('window.screenWidth',document.body.clientWidth)
    this.screenShow(document.body.clientWidth)
    // console.log('permissionpermission',this.$store,this.$store.commit('changeStatus'),this.$store.state.dashboardShow.dashShow)
    this.showDash = getUserInfo().username == 'pingan' ?  false : true;
    window.addEventListener('resize',function(){
		// return (() => {
            window.screenWidth = document.body.clientWidth;
            this.screenWidth = window.screenWidth;
            console.log('window.screenWidth',window.screenWidth)
        	this.screenShow(this.screenWidth)
        // })()
    }.bind(this))
    // window.onresize = () => {
    //     return (() => {
    //         window.screenWidth = document.body.clientWidth;
    //         this.screenWidth = window.screenWidth;
    //         // console.log('window.screenWidth',window.screenWidth)
    //     })()
    // }
  },
  methods: {
    screenShow(width){
        if(width < 1600){
            this.showArrow = true; 
            this.setStyle(true)
        }else{
            this.showArrow = false;
            this.setStyle(false)
        }
    },
    setStyle(isSet){
        let memuBox = document.querySelector('#memuBox');
        // console.log('memuBox',memuBox)
        if(isSet){
            memuBox.style.width = 860 + "px";
        }else{
            memuBox.style.width = 1580 + "px";
            let elMenu  = document.querySelector('.el-menu');
            elMenu.style.marginLeft = 0 + 'px';
        }
    },
    arrowClick(type){
        let elMenu  = document.querySelector('.el-menu');
        let memuBox = document.querySelector('#memuBox');

        // console.log('elMenu',elMenu.offsetWidth,getComputedStyle(elMenu).marginLeft)
        // console.log('memuBox',memuBox.offsetWidth)
        switch(type){
            case 'left':
                if(getComputedStyle(elMenu).marginLeft == '0px'){
                    // elMenu.style.marginLeft = -(elMenu.offsetWidth - memuBox.offsetWidth) + 'px';
                    elMenu.style.marginLeft = -860 + 'px';
                    this.showRight = true;
                    this.showLeft = false;
                    // elMenu.style.transition="-webkit-transform 500ms ease-out";
                    // elMenu.style.webkitTransform="translate(0px,"+sum+"px) scale(1) translateZ(0px)";
                }else{
                    return false;
                }
                break;
            case 'right':
                if(getComputedStyle(elMenu).marginLeft == '0px'){
                    return false;
                }else{
                    elMenu.style.marginLeft = 0 + 'px';
                    this.showLeft = true;
                    this.showRight = false;
                    // elMenu.style.transition="-webkit-transform 500ms ease-out";
                }
                break;
        }
    },
    /**
     * 设置与当前页匹配的菜单高亮
     */
    setNavHightlight() {
        // 只过滤第一层，判断二级大菜单路径去匹配
        const find = this.permission_routers.filter(route => {
            // 针对首页子链接特殊处理
            if (route.name === 'dashboard') {
            return this.$route.meta.proute === route.name
            } else {
            return route.path !== '/' && this.$route.path.indexOf(route.path) === 0
            }
        })
        const current = find[0] || this.$route
        this.current = current.path
        if (this.prevPath !== this.current) {
            this.prevPath = this.current
            this.$store.dispatch('GenerateSidebarRoutes', current.name)
        }
    }
  }
}
</script>


<style lang="scss">
@import "src/styles/variate.scss";
  #app .page-top-nav{
      .page-top-nav-arrow{
          width:100%;
          display: flex;
          .arrowBox_mark{
              width:16px;
              height:50px;
          }
          .arrowStyle{
            color:#fff;
            cursor: pointer;
            display: inline-block;
            line-height: 50px;
            &:hover{
                transition: scale(1.5)
            }
          }
          #memuBox{
              overflow: hidden;
              width: 1580px;
          }
      }
    .el-menu--horizontal{
      border-bottom: none;
    }
    .el-menu{
      background: #373d41;
      width:1600px;
      transition:all .5s;
    }
  }
  #app .page-top-nav .el-menu-item{
    height: $topNavHeight;
    line-height: $topNavHeight;
    color: #fff;
    font-size: $topNavFontSize;

    &.is-active{
    //  background: #2a2f32;
      border-bottom: none;
      background: #00c1de;
    }

    .svg-icon{
      margin-right: 0;
      vertical-align: -4px;
      font-size: 1.2em;
    }

    &:hover{
     // background: #2a2f32;
        // background: hsl(188, 52%, 33%);
          background: #00c1de;
    }
  }
  #app .page-top-nav .el-submenu>.el-menu{
    top: $topNavHeight + 2px;
  }
</style>

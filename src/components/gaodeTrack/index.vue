<template>
  <div class="driverTrack" v-loading="loading" >
    <div id="track"></div>
    <div class="input-card">
        <h4>轨迹回放控制</h4>
        <div class="input-item">
            <input type="button" class="btn" value="开始动画" id="start" @click="startAnimation()"/>
            <input type="button" class="btn" value="暂停动画" id="pause" @click="pauseAnimation()"/>
        </div>
        <div class="input-item">
            <input type="button" class="btn" value="继续动画" id="resume" @click="resumeAnimation()"/>
            <input type="button" class="btn" value="停止动画" id="stop" @click="stopAnimation()"/>
        </div>
    </div>
  </div>
</template>
<script>
// 请求接口
import { loadJs,loadAmap } from '@/utils/'

export default {
  name: 'driverTrack',
  props: {
    orderid: [String, Number],
    trackInfo:{
        type:Array,
        default:[]
    }
  },
  data() {
    return {
      loading: false,
      marker:[],
      lineArr:[],
    }
  },
  watch: {
      trackInfo:{
          handler(newValue, oldValue){
            //   console.log('newValuenewValuenewValue',newValue)
              if(newValue){
                  this.init();
              }else{
                  this.exit()
              }
          }
      }
  },
  mounted() {
      this.init()
  },
    // 关闭时清空地图数据
  destoryed() {
    this.exit()
  },
  methods: {
    exit() {
      if (this.map && this.map.destroy) {
        this.map.destroy()
        // console.log('destroy,destroy',this.map)
      }
    },
    initMap() {
        this.lineArr = [];
        this.marker = [];
        const _this = this;
        const AMap = window.AMap;
        if (AMap) {
            // 地图加载
            this.map = new AMap.Map('track', {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom: 15, //初始地图级别
            })
            // this.logMapinfo();
        } else {
            console.error('=========加载地图失败=======')
        }
        
        const map = _this.map;

        // 创建一个 Icon
        var startIcon = new AMap.Icon({
            // 图标尺寸
            size: new AMap.Size(25, 34),
            // 图标的取图地址
            image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
            // 图标所用图片大小
            imageSize: new AMap.Size(135, 40),
            // 图标取图偏移量
            imageOffset: new AMap.Pixel(-9, -3)
        });

        // 将 icon 传入 marker
        var startMarker = new AMap.Marker({
            position: new AMap.LngLat(this.trackInfo[0].longitude,this.trackInfo[0].latitude),
            icon: startIcon,
            offset: new AMap.Pixel(-13, -30)
        });


        // 创建一个 icon
        var endIcon = new AMap.Icon({
            size: new AMap.Size(25, 34),
            image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
            imageSize: new AMap.Size(135, 40),
            imageOffset: new AMap.Pixel(-95, -3)
        });

        // 将 icon 传入 marker
        var endMarker = new AMap.Marker({
            position: new AMap.LngLat(this.trackInfo[this.trackInfo.length-1].longitude,this.trackInfo[this.trackInfo.length-1].latitude),
            icon: endIcon,
            offset: new AMap.Pixel(-13, -30)
        });

        // 将 markers 添加到地图
        map.add([startMarker, endMarker]);
        //车辆图标
        this.marker = new AMap.Marker({
            map: this.map,
            // position: [116.397428, 39.90923],
            position: [this.trackInfo[0].longitude,this.trackInfo[0].latitude],
            icon: "https://webapi.amap.com/images/car.png",
            offset: new AMap.Pixel(-26, -13),
            autoRotation: true
        });
        // console.log(map,_this.map)

        this.trackInfo.forEach(el => {
            this.lineArr.push(new AMap.LngLat(el.longitude, el.latitude,true))
            // this.lineArr.push([el.longitude, el.latitude])
        })

        // 绘制轨迹
        var polyline = new AMap.Polyline({
            map: map,
            path: this.lineArr,
            strokeColor: "#28F",  //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 3,      //线宽
            // strokeStyle: "solid"  //线样式
        });

        var passedPolyline = new AMap.Polyline({
            map: map,
            // path: lineArr,
            strokeColor: "#AF5",  //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 3,      //线宽
            // strokeStyle: "solid"  //线样式
        });
        this.marker.on('moving', function (e) {
            passedPolyline.setPath(e.passedPath);
        });
        map.setFitView();
    },
    startAnimation () {
        // console.log('123223')
        this.marker.moveAlong(this.lineArr, 2E3);
    },

    pauseAnimation () {
        this.marker.pauseMove();
    },

    resumeAnimation () {
       this.marker.resumeMove();
    },

    stopAnimation () {
        this.marker.stopMove();
    },
    loadMap() {
      if (window.AMap) {
        return Promise.resolve('')
      } else {
        return new Promise((resolve, reject) => {
          loadAmap().then(() => {
            this.initMap()
          }).catch(() => {
            reject()
          })
        })
      }
    },
    init() {
      return Promise.all([this.loadMap()]).then(() => {
        this.initMap()
      })
    }
  }
}
</script>
<style lang="scss">
.driverTrack{
    height: 100%;

    #track{
        height:100%;
        width:100%;
    }
    .input-card .btn{
        margin-right: 1.2rem;
        width: 9rem;
    }

    .input-card .btn:last-child{
        margin-right: 0;
    }

    .input-card {
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border-radius: .25rem;
        width: 22rem;
        border-width: 0;
        border-radius: 0.4rem;
        box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        padding: 0.75rem 1.25rem;
    }
    h4 {
        font-family: inherit;
        line-height: 1.8;
        font-weight: 300;
        color: inherit;
        font-size: 1.1rem;
        margin-top: 0;
        margin-bottom: .5rem;
    }
    .input-item {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        height: 3rem;
    }
    .btn {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        background-color: transparent;
        background-image: none;
        color: #25A5F7;
        border-color: #25A5F7;
        padding: .25rem .5rem;
        line-height: 1.5;
        border-radius: 1rem;
        -webkit-appearance: button;
        cursor: pointer;
    }
    .btn:hover {
        color: #fff;
        background-color: #25A5F7;
        border-color: #25A5F7;
        text-decoration: none;
    }
}
</style>

<template>
  <div class="driverTrack" v-loading="loading" >
    <div id="track"></div>
  </div>
</template>
<script>
// 请求接口
import { loadJs } from '@/utils/'

window.initBaiduMap = false
window.initialize = function() {
  window.initBaiduMap = true
}
export default {
  name: 'driverTrack',
  props: {
    orderid: [String, Number]
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {

  },
  mounted() {
    this.init()
  },
  methods: {
    initMap() {
      const BMap = window.BMap

      if (BMap) {
        var map = new BMap.Map('track')

        map.centerAndZoom(new BMap.Point(116.404, 39.915), 12)  // 初始化地图,设置中心点坐标和地图级别
        // 添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
          mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
          ] }))
        map.setCurrentCity('广州市')          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true)     // 开启鼠标滚轮缩放
        this.initLocation(map)                // 根据浏览器定位确定地图位置
      } else {
        console.error('=========加载地图失败=======')
      }
    },
     /**
     * 根据浏览器定位确定地图位置
     *
     */
    initLocation: function(el) {
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function(r) {
        // console.log(r)
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                // var mk = new BMap.Marker(r.point);
                // el.addOverlay(mk);
          el.panTo(r.point)
        } else {

        }
      },
        {
          enableHighAccuracy: true
        })
    },
    loadMap() {
    //   console.log('111', window.BMap, window.initialize)
      if (window.BMap) {
        return Promise.resolve('')
      } else {
        return new Promise((resolve, reject) => {
          loadJs('http://api.map.baidu.com/api?v=2.0&ak=TdCgPC0hfvH6e0U4RoL81dF8VF4vWYrA&callback=initialize').then(() => {
            const fn = () => {
              if (!window.initBaiduMap) {
                setTimeout(() => {
                  fn()
                }, 200)
              } else {
                resolve()
              }
            }
            fn()
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
}
</style>

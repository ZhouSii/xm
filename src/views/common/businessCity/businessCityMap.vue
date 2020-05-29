<template>
<div class="commoncss businessCityMap">
 <div id="CityMap"></div>
</div>
</template>
<script>
import {data_CityCode } from '@/api/company/businessCity.js'
import { loadJs,loadAmap } from '@/utils/'
 var map={}
 var polygon;
export default {
  props: {},
  watch: {
  },
  created() {

  },
  // 关闭时清空地图数据
  destoryed() {
    this.exit()
  },
  data() {
    return {
      dialogTableVisible: false,
      MapAraay:[]
    }
  },
  mounted(){
         data_CityCode(this.$route.query.code).then(res=>{
           if(res.data){
           this.MapAraay = JSON.parse(res.data);
           }
           else{
           this.MapAraay = []
           }
          })
          this.loadMap();
  },
  methods: {
    loadMap:function(){
            this.$nextTick(()=>{
                loadAmap().then(() => {
                this.init();
                })
    })},
    init:function(){
        var _this = this
        var center = []
        var City = null
      // 地图加载
        map = new AMap.Map('CityMap', {
        resizeEnable: true,
        zoom:10
          })
        map.plugin(["AMap.ToolBar"], function() {
            map.addControl(new AMap.ToolBar());
        });
        map.on("complete", function(){
            var geocoder = new AMap.Geocoder({
            });

                var center = []
                if(_this.MapAraay.length>0){
                    center = _this.MapAraay[0][0]
                }
                else{
                  if(_this.$route.query.city=='北京城区')
                  {
                  City = '北京'
                  }
                  else if(_this.$route.query.city=='天津城区'){
                  City = '天津'
                  }
                  else if(_this.$route.query.city=='天津城区'){
                  City = '天津'
                  }
                  else if(_this.$route.query.city=='上海城区'){
                  City = '上海'
                  }
                  else if(_this.$route.query.city=='重庆城区'){
                  City = '天津'
                  }
                  else if(_this.$route.query.city=='台湾省'){
                  City = '台湾'
                  }
                  else if(_this.$route.query.city=='香港特别行政区'){
                  City = '香港'
                  }
                  else if(_this.$route.query.city=='澳门特别行政区'){
                  City = '澳门'
                  }
                  else{
                  City = _this.$route.query.city
                  }
                  geocoder.getLocation(City, function(status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                  center=[result.geocodes[0].location.lng,result.geocodes[0].location.lat]
                  map.setCenter(center);
                  }
                  })
                }
                polygon = new AMap.Polygon({
                path: _this.MapAraay,
                isOutline: true,
                strokeOpacity:1,
                lineJoin: 'round',
                strokeWeight:2,
                strokeStyle:"solid",
                strokeColor: "#3366FF", 
                strokeDasharray:[10,5],
                fillOpacity: 0.2,
                fillColor: '#1791fc',
            })
            
                map.setCenter(center);
                polygon.setMap((map))    
                });  
        }
  }
}
</script>
<style lang="scss">
.businessCityMap{
  height: 100%;
  #CityMap{
    width: 100%;
    height: 100%;
  }

}

</style>

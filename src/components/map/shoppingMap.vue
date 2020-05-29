<template>
<div class="shoppingMapBox">
     <div id="clear" @click="clear">清除所有地理围栏</div>
 <div id="shoppingMap"></div>
</div>
</template>
<script>
import { loadJs,loadAmap } from '@/utils/'
 var map={}
 var polygon;
 var marker;
 var contextMenuPositon = {}
export default {
      props:{
      fromData:{
        type:[Object,String,Array,Number],
      },
      editstatusMap:{
        type:[String],
        default:''
      }
    },
     data(){
         return{
             dataAraay:[],
             path:[],
             totalAraay:[],
             Mapstatus:this.editstatusMap
         }
     },
     watch:{
         editstatusMap(val){
            this.Mapstatus = val
         }
     },
     methods:{
		loadMap:function(){
            this.$nextTick(()=>{
                loadAmap().then(() => {
                this.init();
                })
        })},
        // 地图加载
    	init:function(){
        var _this = this
		map = new AMap.Map('shoppingMap', {
			resizeEnable: true,
			zoom:12
        })
        map.plugin(["AMap.ToolBar"], function() {
            map.addControl(new AMap.ToolBar());
        });
        map.setCenter([113.257416,23.149586]);
            var mouseTool = new AMap.MouseTool(map)
            mouseTool.polygon({
            strokeColor: "#FF33FF", 
            strokeOpacity: 1,
            strokeWeight: 2,
            strokeOpacity: 0.2,
            fillColor: '#1791fc',
            fillOpacity: 0.4,
            strokeStyle: "solid",
        })
        var mouseTool = new AMap.MouseTool(map); 
        var drawPolygon = mouseTool.polygon(); //用鼠标工具画多边形
        AMap.event.addListener( mouseTool,'draw',function(e){
        console.log(e.obj);//获取路径/范围
               if(_this.Mapstatus=='1'){
                _this.$message({
                    message: '修改围栏需要清除之前的围栏~',
                    type: 'warning'
                })
                map.clearMap();
                polygon.setMap((map)) 
               }
               else if(_this.Mapstatus=='2'){
                _this.$message({
                    message: '详情不能进行修改~',
                    type: 'warning'
                })
                map.clearMap();
                polygon.setMap((map)) 
               }
               else{
             _this.dataAraay.push(e.obj.getPath())
             _this.$emit('returnStr', _this.dataAraay)
            }
        });
        map.on("complete", function(){
                var center = []
                if(_this.fromData.points.length>0){
                    center = _this.fromData.points[0][0]
                }
                else{
                    center = [113.257416,23.149586]
                }
                _this.path = _this.fromData.points
                polygon = new AMap.Polygon({
                path: _this.path,
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


        },
        // 画围栏折线
        ToolBar:function(){
        var _this = this
         polygon = new AMap.Polygon({
                path: _this.totalAraay,
                isOutline: true,
                strokeOpacity:1,
                lineJoin: 'round',
                strokeWeight:3,
                strokeStyle:"solid",
                strokeColor: "#3366FF", 
                strokeDasharray:[10,5],
                fillOpacity: 0.2,
                fillColor: '#1791fc',
            })
        polygon.setMap((map))          
        },
        // 清除所有的围栏
        clear:function(){
            var _this = this
              if(_this.Mapstatus=='2'){
                _this.$message({
                    message: '详情不能进行修改~',
                    type: 'warning'
                })
               }
               else{
                map.clearMap();
                this.path = [];
                this.dataAraay = [];
                this.Mapstatus='0'
                this.$emit('EditStr', [])
               }
        },
        editFlag(){
        this.$emit('EditStr', this.Mapstatus)
        },
        // 关闭地图
        exit:function(){
        this.path = [];
        this.dataAraay = [];
        map.destroy();
        },
        // 定位城市
        setCity:function(){
            var _this = this
            let getLocationMap = [];
            var geocoder
             geocoder = new AMap.Geocoder({
            });
             geocoder.getLocation(_this.fromData.city+_this.fromData.area, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
             map.setCenter([result.geocodes[0].location.lng,result.geocodes[0].location.lat]); 
            }
        })
        }

     },
     mounted(){
         this.loadMap();
     },
}
</script>
<style lang="scss">
.shoppingMapBox{
    position: relative;
#shoppingMap{
    width: 100%;
    height: 500px;
}
#clear{
   position: absolute;
   right:10px;
   top:10px;
   z-index: 2;
   border: 2px solid red;
   color: red;
   font-weight: bold;
   padding: 0px 5px;
   cursor: pointer;
   line-height:30px;
}
#backBtn{
   position: absolute;
   right:10px;
   top:50px;
   z-index: 2;
   border: 2px solid red;
   color: red;
   font-weight: bold;
   padding: 0px 10px;
   cursor: pointer;    
   line-height:30px;
}
#add{
   position: absolute;
   right:10px;
   top:90px;
   z-index: 2;
   border: 2px solid red;
   color: red;
   font-weight: bold;
   padding: 0px 10px;
   cursor: pointer;    
   line-height:30px;    
}
}
</style>

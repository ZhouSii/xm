<template>
    <div class="StyleNewinfo commoncss">
        <div id="carMap"></div>
  </div>
</template>
<script>
 var map={}
import { loadJs,loadAmap } from '@/utils/'
import {data_pullTrack} from '@/api/users/carowner/all_car.js'
import { parseTime } from '@/utils/index.js'
import {initMap} from '@/views/carmonitor/common.js'
export default {
  name:'carMap',
  data(){
    return{
        driverTemplateDialogFlag:false,
        CarFrom:[],
    }
  },
  mounted(){
        var _this = this
        this.loadMap()
        new Promise(function(resolve){
        data_pullTrack(_this.$route.query.driverId).then(res=>{
                    _this.CarFrom = res.data
                    setTimeout(() => _this.init(), 10);
                }).catch(err=>{
                    _this.$message.error('获取数据失败')
                })
        resolve();
        }).then(function(){
            console.log('help')
        })
    },
    watch:{
        driverTemplateDialogFlag:{
        handler: function(val, oldVal) {
            if(!val){

            }
            else{

            }
        }
        }
        },
  methods:{
       //关闭
       change(){
       this.driverTemplateDialogFlag = false    
       },
        loadMap(){
        initMap(() => {
        let originalAddress = []
        if(this.CarFrom.length>0){
         originalAddress = [this.CarFrom[0].latitude,this.CarFrom[0].longitude]
        }
        else{
         originalAddress =[113.257416,23.149586]
        }
        map = new AMap.Map('carMap', {
                    resizeEnable: true,
                    center: originalAddress,
                    zoom:16
        })
        map.plugin(["AMap.ToolBar"], function() {
            map.addControl(new AMap.ToolBar());
        });
        })
        },
        // 地图加载
    	init(i,val){
            map = new AMap.Map('carMap', {
                    resizeEnable: true,
                    center: [this.CarFrom[0].longitude,this.CarFrom[0].latitude],
                    zoom:16
            })
            map.plugin(["AMap.ToolBar"],function () {
            map.addControl(new AMap.ToolBar()); // 工具条控件
                });
            map.plugin(["AMap.Scale"],function(){    //加载比例尺插件      
            var scale = new AMap.Scale();  
            map.addControl(scale);  
            scale.show();
            });  

            var iconImages = ''
            this.CarFrom.forEach((item,i)=>{
            if(this.CarFrom.length-1==i){
                iconImages ='http://aflc.oss-cn-shenzhen.aliyuncs.com/tms/20190426/IMG_WEB_2019_4_26_175858_36625.png'
            }
            else if(this.CarFrom.length-2==i){
                iconImages ='http://aflc.oss-cn-shenzhen.aliyuncs.com/tms/20190429/IMG_WEB_2019_4_29_094840_77066.png'
            }
            else if(this.CarFrom.length-3==i){
                iconImages ='http://aflc.oss-cn-shenzhen.aliyuncs.com/tms/20190426/IMG_WEB_2019_4_26_180005_26381.png'
            }
            else if(this.CarFrom.length-4==i){
                iconImages ='http://aflc.oss-cn-shenzhen.aliyuncs.com/tms/20190426/IMG_WEB_2019_4_26_180026_57544.png'
            }
            else if(this.CarFrom.length-5==i){
                iconImages ='http://aflc.oss-cn-shenzhen.aliyuncs.com/tms/20190426/IMG_WEB_2019_4_26_180048_80889.png'
            }
            else{
                iconImages ='http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
            }
            item.uploadTime = parseTime(item.uploadTime,"{y}-{m}-{d} {h}:{i}:{s}")
            var marker  = new AMap.Marker({
                        map: map,
                        icon:new AMap.Icon({
                        image: iconImages,
                        size: new AMap.Size(20, 26),  //图标大小
                        imageSize: new AMap.Size(20,26)}),
                        position: [item.longitude,item.latitude],
                        offset: new AMap.Pixel(-13, -30),
                    });
            marker.setMap(map)
            marker.content = `
            <div class="contentDiv"><span class="contentTip">车主姓名：</span><span class="contentcolor">${item.driverName}</span></div>
            <div class="contentDiv"><span class="contentTip">车主电话：</span><span class="contentcolor">${item.driverMobile}</span></div>
            <div class="contentDiv"><span class="contentTip">上传时间：</span><span class="contentcolor">${item.uploadTime}</span></div>
            <div class="contentDiv"><span class="contentTip">当前位置：</span><span class="contentcolor">${item.driverAddress}</span></div>
            `;
            marker.on('click', function(e){
                var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            })
            })
        },
  }
}
</script>

<style lang="scss">
.StyleNewinfo{
    height: 100%;
    #carMap{
    width: 100%;
    height: 100%;
    .contentDiv{
        color:red;
        display:flex;
        .contentcolor{
        color:#333;
        float:left;
        flex:1;
        }
        .contentTip{
        display:inline-block;
        width:80px;
        flex-basis:80px;
    }
    }
    .amap-logo{
        opacity:0;
    }
    .amap-copyright{
        opacity:0;
    }
}
}
</style>


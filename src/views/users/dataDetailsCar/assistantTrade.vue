<template>
    <div class="detailsInfo detailsArrange">
        <!-- 辅助信息 -->
        <div class="fzInfo-collapse collapseInfo">
            <h2>辅助信息</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">每日订单目标</el-col>
                    <el-col :span="3">{{assistObject.dailyGoalsOrder}}</el-col>
                    <el-col :span="3">每日收入目标：</el-col>
                    <el-col :span="3">{{assistObject.dailyGoalsImcome}}</el-col>
                    <el-col :span="3">是否开启接单：</el-col>
                    <el-col :span="3">{{assistObject.isFree=='1'?'空闲接单':'繁忙不接单'}}</el-col>
                    <el-col :span="3">最近交易成功时间：</el-col>
                    <el-col :span="3">{{assistObject.currentTradeTime}}</el-col>
                    <!-- 第二行 -->
                    <el-col :span="3">行为分：</el-col>
                    <el-col :span="3">{{assistObject.behaviorScore}}</el-col>
                    <el-col :span="3">抢单率：</el-col>
                    <el-col :span="3">{{assistObject.robbingRate}}</el-col>
                    <el-col :span="3">取消率：</el-col>
                    <el-col :span="3">{{assistObject.cancelRate}}</el-col>
                    <el-col :span="3">评分：</el-col>
                    <el-col :span="3">{{assistObject.evaluateScore}}</el-col>
                </el-row>
            </div>
        </div>
        <!-- 订单概况 -->
        <!-- <div class="logInfo-collapse collapseInfo">
            <h2>订单概况</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%">
                    <el-table-column prop="" label="统计项" ></el-table-column>
                    <el-table-column prop="" label="1日" ></el-table-column>
                    <el-table-column prop="" label="2日" ></el-table-column>
                    <el-table-column prop="" label="3日" ></el-table-column>
                    <el-table-column prop="" label="5日" ></el-table-column>
                    <el-table-column prop="" label="6日" ></el-table-column>
                    <el-table-column prop="" label="7日" ></el-table-column>
                    <el-table-column prop="" label="8日" ></el-table-column>
                    <el-table-column prop="" label="9日" ></el-table-column>
                    <el-table-column prop="" label="10日" ></el-table-column>
                    <el-table-column prop="" label="11日" ></el-table-column>
                    <el-table-column prop="" label="12日" ></el-table-column>
                    <el-table-column prop="" label="13日" ></el-table-column>
                    <el-table-column prop="" label="14日" ></el-table-column>
                    <el-table-column prop="" label="15日" ></el-table-column>
                    <el-table-column prop="" label="16日" ></el-table-column>
                    <el-table-column prop="" label="17日" ></el-table-column>
                    <el-table-column prop="" label="18日" ></el-table-column>
                    <el-table-column prop="" label="19日" ></el-table-column>
                    <el-table-column prop="" label="21日" ></el-table-column>
                    <el-table-column prop="" label="22日" ></el-table-column>
                    <el-table-column prop="" label="23日" ></el-table-column>
                    <el-table-column prop="" label="24日" ></el-table-column>
                    <el-table-column prop="" label="25日" ></el-table-column>
                    <el-table-column prop="" label="26日" ></el-table-column>
                    <el-table-column prop="" label="27日" ></el-table-column>
                    <el-table-column prop="" label="28日" ></el-table-column>
                    <el-table-column prop="" label="29日" ></el-table-column>
                    <el-table-column prop="" label="30日" ></el-table-column>
                    <el-table-column prop="" label="31日" ></el-table-column>
                </el-table>
            </div>
        </div> -->

        <!-- 司机行为 -->
        <!-- <div class="logInfo-collapse collapseInfo">
            <h2>司机行为</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%">
                    <el-table-column prop="" label="车型" ></el-table-column>
                    <el-table-column prop="" label="抢单数" ></el-table-column>
                    <el-table-column prop="" label="00：00至5：59" ></el-table-column>
                    <el-table-column prop="" label="6：00~8：59" ></el-table-column>
                    <el-table-column prop="" label="9：00~11：59" ></el-table-column>
                    <el-table-column prop="" label="12：00~14：59" ></el-table-column>
                    <el-table-column prop="" label="15：00~17：59" ></el-table-column>
                    <el-table-column prop="" label="18：00~20：59" ></el-table-column>
                    <el-table-column prop="" label="21：00~23：59" ></el-table-column>
                </el-table>
            </div>
        </div> -->

        <!-- 被货主收藏 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>被货主收藏</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data="CollectDriverData">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="shipperType" label="货主类型" ></el-table-column>
                    <el-table-column prop="belongCityName" label="认证所在地" ></el-table-column>
                    <el-table-column label="货主信息" >
                        <template slot-scope="scope">
                            {{scope.row.shipperName}} - {{scope.row.shipperPhone}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderNum" label="成功订单数" ></el-table-column>
                </el-table>
            </div>
        </div>

        <!--  历史交易货主 -->
        <div class="logInfo-collapse collapseInfo" v-loading="loading">
            <h2>历史交易货主</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data="HistoryShipperData">
                    <el-table-column label="序号"  width="60">
                    <template slot-scope="scope">
                            {{ (HistoryShipper.currentPage - 1) * HistoryShipper.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="shipperType" label="货主类型" ></el-table-column>
                    <el-table-column prop="belongCityName" label="认证所在地" ></el-table-column>
                    <el-table-column prop="" label="货主信息" >
                        <template slot-scope="scope">
                            {{scope.row.shipperName}} - {{scope.row.shipperPhone}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="belongSalesmanName" label="所属业务员" ></el-table-column>
                    <el-table-column prop="orderNum" label="交易单数" ></el-table-column>
                    <el-table-column prop="totalAmount" label="交易金额" ></el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangHistoryShipper"
                    layout="total,prev, pager, next, jumper"
                    :total="HistoryShipperTotalCount">
                </el-pagination>
            </div>
        </div>
        
        <!--  历史活跃地区 -->
        <!-- <div class="logInfo-collapse collapseInfo">
            <h2> 历史活跃地区</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%">
                    <el-table-column prop="" label="序号" ></el-table-column>
                    <el-table-column prop="" label="活跃地区（抢单）" ></el-table-column>
                    <el-table-column prop="" label="推单次数" ></el-table-column>
                    <el-table-column prop="" label="抢单次数" ></el-table-column>
                    <el-table-column prop="" label="中单次数" ></el-table-column>
                    <el-table-column prop="" label="交易金额" ></el-table-column>
                </el-table>
            </div>
        </div> -->

        <!--  司机轨迹-->
        <div class="logInfo-collapse collapseInfo">
            <h2> 司机轨迹</h2>
            <div class="essentialInformation">
             <div id="carMap"></div>
            </div>
        </div>

    </div>
</template>

<script>
var map={}
import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import {data_pullTrack} from '@/api/users/carowner/all_car.js'
import { auxiliary,shipperCollectDriver,historyTradeShipper} from '@/api/users/carDetails/index.js'
import { loadJs } from '@/utils/'
import {initMap} from '@/views/carmonitor/common.js'

export default {
  name: 'detailsInfo',
  components: {
      Pager
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false,
      }

  }, 
  data() {
    return {
        loading: true,     //历史交易货主Load
        assistObject:{},    //辅助信息
        CollectDriverData:[],   //被货主收藏数据
        HistoryShipperTotalCount:null, //历史交易货主总数
        HistoryShipperData:[],       //历史教育货主数据
        HistoryShipper:{
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "driverId": this.$route.query.driverId,
            }
        },
        CarFrom:[],
    }
  },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    var _this = this 
                    this.init()
                    this.loadMap()
                    new Promise(function(resolve){
                    data_pullTrack(_this.$route.query.driverId).then(res=>{
                                _this.CarFrom = res.data
                                setTimeout(() => _this.initMap(), 10);
                            }).catch(err=>{
                                _this.$message.error('获取数据失败')
                            })
                    resolve();
                    }).then(function(){
                        console.log('help')
                    })
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        },
    },
    methods: {
        init() {
        this.assistMethods()
        this.CollectDriverMethods()
        this.HistoryShipperMethods()
        },
        // 辅助信息
        assistMethods(){
        auxiliary(this.$route.query.driverId).then(res=>{
            this.assistObject = res.data
            this.assistObject.currentTradeTime = parseTime(this.assistObject.currentTradeTime,"{y}-{m}-{d} {h}:{i}:{s}");
        })
        },
        //被货主收藏
        CollectDriverMethods(){
            shipperCollectDriver(this.$route.query.driverId).then(res=>{
                this.CollectDriverData = res.data
            })
        },
        //历史交易货主
        HistoryShipperMethods(){
            this.loading = true
            historyTradeShipper(this.HistoryShipper).then(res=>{
                this.HistoryShipperTotalCount = res.data.totalCount
                this.HistoryShipperData = res.data.list
                this.loading = false
            })
        },
        //历史交易货主分页
        handleCurrentChangHistoryShipper(i){
            this.HistoryShipper.currentPage = i
            this.HistoryShipperMethods();
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
    	initMap(i,val){
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
<style type="text/css" lang="scss">
    .detailsInfo{
        #carMap{
            width:100%;
            height:800px; 
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
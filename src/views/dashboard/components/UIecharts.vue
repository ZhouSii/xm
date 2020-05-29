<template>
    <div class="UIecharts">
        <h1 class="UItitle">运营数据中心</h1>
        <div class="UIorderTotal">
            <h2>订单量</h2>
            <div class="orderTotal_change">
                <ul>
                    <li class="orderTotalNumber">2</li>
                    <li>,</li>
                    <li class="orderTotalNumber">5</li>
                    <li class="orderTotalNumber">3</li>
                    <li class="orderTotalNumber">5</li>
                    <li>,</li>
                    <li class="orderTotalNumber">1</li>
                    <li class="orderTotalNumber">5</li>
                    <li class="orderTotalNumber">7</li>
                </ul>
                <div class="orderTotalTime">
                    <span>{{newTime}}</span>
                    <ul>
                        <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,item.label)">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="orderType">
            <div class="orderTypeNum orderTypeCommon">
                <h4>订单类型概览</h4>
                <div class="orderTypeTab">
                    <h6>小货车订单数</h6>
                    <p><span>12000单</span><span class="fr">占比80.00%</span></p>
                </div>
                <div class="orderTypeTab">
                    <h6>发物流订单数</h6>
                    <p><span>12000单</span><span class="fr">占比80.00%</span></p>
                </div>
                <div class="orderTypeTab" style="margin-bottom:0;">
                    <h6>大货车订单数</h6>
                    <p><span>12000单</span><span class="fr">占比80.00%</span></p>
                </div>
            </div>
            <!-- 全国散点图 -->
            <Point/>
            <div class="orderTypeXHC orderTypeCommon">
               <h4>小货车待指派订单</h4>
               <ul>
                   <li>
                       <span>平台定向</span>
                       <p class="fr">
                            <span>18</span><span> >> </span>
                       </p>
                   </li>
                    <li>
                       <span>超时无人接单</span>
                       <p class="fr">
                            <span>18</span><span> >> </span> 
                       </p>
                   </li>
                    <li>
                       <span>提货地无司机</span>
                       <p class="fr">
                        <span>18</span><span> >> </span>
                       </p>
                   </li>
                    <li>
                       <span>车主改派</span>
                       <p class="fr">
                            <span>18</span><span> >> </span>
                       </p>
                   </li>
                    <li>
                       <span>中单后联系货主超时</span>
                       <p class="fr">
                            <span>18</span><span> >> </span>
                       </p>
                   </li>
                </ul> 
            </div>
        </div>

        <div class="orderType_Area">
            <div class="orderType_AreaTop">
                <h4>区域订单TOP5</h4>
                <ul class="orderType_AreaTop_time">
                    <li v-for="(item,index) in dataType2" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur2(index,item.label)">{{item.name}}</li>
                </ul>
                <ul class="orderType_AreaTop_List">
                    <li>
                    <span>广州市天河区</span>
                        <span>120000单</span>
                    </li>
                    <li>
                        <span>广州市天河区</span>
                        <span>120000单</span>
                    </li>
                    <li>
                        <span>广州市天河区</span>
                        <span>120000单</span>
                    </li>
                        <li>
                        <span>广州市天河区</span>
                        <span>120000单</span>
                    </li>
                    <li>
                        <span>广州市天河区</span>
                        <span>120000单</span>
                    </li>
                </ul>
            </div>
            <!-- 单量变化折现图 -->
            <TypeLine/>
            <!-- 待审核 -->
            <div class="orderType_AreaTop main_waitInfo">
                <h4>待审核</h4>
                <ul>
                   <li>
                       <span>货主</span>
                       <p class="fr">
                            <span>18</span><span> >> </span>
                       </p>
                   </li>
                    <li>
                       <span>车主</span>
                       <p class="fr">
                            <span>18</span><span> >> </span> 
                       </p>
                   </li>
                    <li>
                       <span>物流公司</span>
                       <p class="fr">
                        <span>18</span><span> >> </span>
                       </p>
                   </li>
                </ul> 
            </div>
        </div>

        <div class="orderType_carType">
            <!-- 用车时间折线图 -->
            <useCarTime/>
            <!-- 车型需求饼图 -->
            <carType/>
            <!-- 订单状态饼图 -->
            <orderStatus/>
        </div>
        <!-- 用户数据柱状图 -->
        <userTypeCount/>
    </div>
</template>

<script>

import axios from 'axios'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import './uiEcharts.scss'
import  Point from './point/point'
import TypeLine from './line/typtCount'
import useCarTime from './line/useCarTime'
import carType from './pie/carType'
import orderStatus from './pie/orderStatus'
import userTypeCount from './bar/usersCount'

export default {
    components:{
        Point,
        TypeLine,
        useCarTime,
        carType,
        orderStatus,
        userTypeCount
    },
    watch: {
        
    },
    data() {
        return {
            newTime:'',
            timeOutComplate:null,
            dataType:[
                {name:'今天',iscur:true},
                {name:'昨天',iscur:false},
                {name:'本周',iscur:false},
                {name:'本月',iscur:false},
                {name:'今年',iscur:false},
                {name:'全部',iscur:false},
            ],
            dataType2:[
                {name:'今天',iscur:true},
                {name:'昨天',iscur:false},
                {name:'本周',iscur:false},
                {name:'本月',iscur:false},
                {name:'今年',iscur:false},
                {name:'全部',iscur:false},
            ],
        }
    },
    methods: {
        getNowFormatDate(){
           	var now = new Date();
			// 获取年份:0~11
			var year = now.getFullYear();
			// 获取月份
			var month = now.getMonth()+1;
			// 获取日
			var date = now.getDate();
			// 获取星期：0-6（星期日-星期6）
			// var week = now.getDay();
			// 获取时分秒
			var h = now.getHours();
			var m = now.getMinutes();
			var s = now.getSeconds();
			// 补0操作
			h = h<10 ? '0'+h : h;
			m = m<10 ? '0'+m : m;
			s = s<10 ? '0'+s : s;
            // var arr = '日一二三四五六'
            
            // this.newTime = year + '年' + month + '月' + date + '日 '+ h + ':' + m + ':' + s + ' 星期' + arr[week];
			this.newTime = year + '年' + month + '月' + date + '日 '+ h + ':' + m + ':' + s;
        },
        setCur(index,label){
            console.log(index,label)
            this.dataType.forEach((el,idx)=>{
                idx == index ? el.iscur = true : el.iscur = false;
            })
        },
        setCur2(index,label){
            console.log(index,label)
            this.dataType2.forEach((el,idx)=>{
                idx == index ? el.iscur = true : el.iscur = false;
            })
        },
      
    },
    beforeDestroy(){
        clearInterval(this.timeOutComplate);
    },
    mounted() {
        this.getNowFormatDate();
        this.timeOutComplate = setInterval(this.getNowFormatDate,1000);
    }

}
</script>

<template>
    <div class="transacitonMap">
        <div class="transacitonMap_left">
            <div id="finacialHot"></div>
            <div class="typeLineTime_data">
                <dataSearch @getValue = "valueChange" countType = "jyfbPoint"/>
            </div>
            <div class="transacitonMap_left_total">
                <el-row>
                    <el-col :span="8">TOP5省份</el-col>
                    <el-col :span="8" class="financial_stream_title">下单数量</el-col>
                    <el-col :span="8" class="financial_stream_title">付款金额</el-col>
                </el-row> 
                <el-row v-for="(item,idx) in  tradePaymentPlaceObj" :key="idx"> 
                    <el-col :span="8" class="financial_stream_title">{{item.area ? item.area : ''}}</el-col>
                    <el-col :span="8">{{item.orderCount}}</el-col>
                    <el-col :span="8">{{item.payTotal}}</el-col>
                </el-row>
            </div>
        </div>
        <div class="transacitonMap_right financialCommon">
            <h4>
                充值概况
                <el-select v-model="currentkey" placeholder="请选择" >
                    <el-option
                    v-for="item in dataBtns"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </h4>
            <dataSearch :isChoose = "chooseType" :keyVal = "currentkey"  @getValue = "valueChange" countType = "czgk"/>
            <ul>
                <li>
                    <span>充值人数</span>
                    <p class="fr">
                        <span>{{rechargeCountObj.personCount ? rechargeCountObj.personCount : 0}}</span>
                    </p>
                </li>
                <li>
                    <span>充值金额</span>
                    <p class="fr">
                        <span>{{rechargeCountObj.rechargeSum ? rechargeCountObj.rechargeSum : 0}}</span>
                    </p>
                </li>
                <li>
                    <span>赠送金额</span>
                    <p class="fr">
                        <span>{{rechargeCountObj.giveSum ? rechargeCountObj.giveSum : 0}}</span>
                    </p>
                </li>
                <li>
                    <span>微信收款</span>
                    <p class="fr">
                        <span>{{rechargeCountObj.wxRechargeSum ? rechargeCountObj.wxRechargeSum : 0}}</span>
                    </p>
                </li>
                 <li>
                    <span>支付宝收款</span>
                    <p class="fr">
                        <span>{{rechargeCountObj.aliRechargeSum ? rechargeCountObj.aliRechargeSum : 0}}</span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import dataSearch from '../components/dataSearch'
import { tradePaymentPlace,rechargeCount } from '@/api/transaction.js'

export default {
    name:'transacitonMap',
    created() {
        this._getCityData()
    },
    watch: {
        
    },
    components:{
        dataSearch
    },
    data() {
        return {
            // legendArr: [],
            myChart: {},
            geoCoordMap: {},
            name: '热力图',
            tradePaymentPlaceTime:{
                "endTime": "",
                "startTime": "",
            },//交易分布时间
            tradePaymentPlaceObj:[],//交易分布
            rechargeCountTime:{
                "endTime": "",
                "startTime": "",
            },//充值概况时间
            rechargeCountObj:{},//充值概况
            myData:[
                {name: '海门', value: [121.15, 31.89, 90]},
                {name: '鄂尔多斯', value: [109.781327, 39.608266, 120]},
                {name: '招远', value: [120.38, 37.35, 142]},
                {name: '舟山', value: [122.207216, 29.985295, 123]},
            ],
            chooseType:false,
            currentkey:0,
            dataBtns: [{
                label: '今天',
                value: 0
            }, {
                label: '昨天',
                value: 1
            }, {
                label: '本周',
                value: 2
            }, {
                label: '本月',
                value: 3
            }, {
                label: '本年',
                value: 4
            },{
                label: '全部',
                value: 5
            }],
        }
    },
    methods: {
        init(){
            this.PaymentPlace()
            this.aflcRechargeCount();
        },
        //交易分步
        PaymentPlace(){
            tradePaymentPlace(this.tradePaymentPlaceTime).then(res => {
                this.tradePaymentPlaceObj = res.data;
                this.mapCount();
            })
        },
        aflcRechargeCount(){
            rechargeCount(this.rechargeCountTime).then(res => {
                this.rechargeCountObj = res.data;
            })
        },
        mapInit(options) {
            this.myChart.hideLoading();
            this.myChart.setOption(options)
        },
        _getCityData() {
            axios.get('static/data/cityData.json').then((res) => {
                this.geoCoordMap = res.data
            })
        },
        convertData(data) {
            let res = [];
            for (let i = 0; i < data.length; i++) {
                let geoCoord = this.geoCoordMap[data[i].area];
                // console.log('geoCoord',geoCoord)
                if (geoCoord) {
                    res.push(geoCoord.concat(data[i].payTotal));
                }
            }
            // console.log('resres',res)
            return res;
        },
        mapCount(){
            this.myChart = echarts.init(document.querySelector('#finacialHot'));
            this.myChart.showLoading();

            let options = {
                title: {
                    text: '交易分布',
                    x:'17',
                    y:'15',
                    textStyle:{
                        color:'#fff',
                        fontSize:'18',
                        fontWeight:'normal',
                    }
                },
                backgroundColor: '',//背景颜色
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: false,
                    // zoom:'1.2',
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(0,40,127,1)',
                            borderWidth: 1,//设置外层边框
                            borderColor:'rgba(27,120,207, 1)',
                            shadowColor: 'rgba(0,133,217, 1)',
                            shadowBlur: 150
                        }
                    }
                },
                series: [
                   {
                        type: 'map',
                        map: 'china',
                        geoIndex: 1,
                        aspectScale: 0.75, //长宽比
                        // zoom:'1.2',
                        showLegendSymbol: false, // 存在legend时显示
                        label: {
                            normal: {
                                show: false,   
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: 'rgba(0,40,127,1)',
                                borderColor: 'rgba(27,120,207, 1)',
                                borderWidth: 1
                            },
                            emphasis: {
                                areaColor: 'rgba(0,40,127,1)'
                            }
                        },
                    },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        // coordinateSystem: 'bmap',
                        coordinateSystem: 'geo',
                        data:this.convertData(this.tradePaymentPlaceObj),
                        symbol:'circle',//标记的图形
                        symbolSize: function (val) {
                            // return val[2] / 10;
                            // return val[2];
                            return 30;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position:[10,-20],
                                show: true,
                                color: '#fff',
                                fontSize:'14',
                            }
                        },
                        itemStyle: {
                            normal: {
                                // color: 'rgba(0,255,255,0)',
                                color:{
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(0,255,255,1)' // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.25, color: 'rgba(0,255,255,0)' // 25% 处的颜色
                                    },
                                    {
                                        offset: 0.5, color: 'rgba(0,255,255,0)' // 50% 处的颜色
                                    },
                                    {
                                        offset: 0.75, color: 'rgba(0,255,255,0)' // 75% 处的颜色
                                    },
                                     {
                                        offset: 1, color: 'rgba(0,255,255,1)' // 100% 处的颜色
                                    }],
                                    globalCoord: false, // 缺省为 false
                                },
                                shadowBlur: 10,
                                shadowColor: 'rgba(0,255,255,1)'
                            }
                        },
                        zlevel: 1
                    }
                ]
            };
            //散点全国地图
            this.mapInit(options);
            window.onresize = () => {
                this.myChart.resize({
                    width: 'auto',
                    height: 'auto'
                })
            }
        },
        valueChange(val,type){
            // console.log('val,type',val,type)
            switch(type){
                case 'jyfbPoint' :
                    this.tradePaymentPlaceTime.startTime = val[0];
                    this.tradePaymentPlaceTime.endTime = val[1];
                    this.PaymentPlace();
                    break;
                case 'czgk' :
                    this.rechargeCountTime.startTime = val[0];
                    this.rechargeCountTime.endTime = val[1];
                    this.aflcRechargeCount();
                    break;
            }
        },
        valueChange1(val,type){
            this.rechargeCountTime.startTime = val[0];
            this.rechargeCountTime.endTime = val[1];
            // this.aflcRechargeCount();
        }
        
    },
    beforeDestroy(){
        
    },
    mounted() {
        // this.init()
     
    }

}
</script>

<template>
    <div class="financial_bottom1">
        <div id="transaction_AreaLine"></div>
        <div class="typeLineTime_data">
            <dataSearch @getValue = "valueChange" countType = "jybhline"/>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import dataSearch from '../components/dataSearch'
import { dateOrderPayment } from '@/api/transaction.js'
import { getBetweenDateStr, parseTime,checkData } from '@/utils/'

export default {
    watch: {
        
    },
    components:{
        dataSearch
    },
    data() {
        return {
            myChartLine:{},
            dateOrderPaymentTime:{
                "endTime": "",
                "startTime": "",
                "type": "",
            },//交易流水时间
            dateOrderPaymentObj:{},//交易流水
            xAxisStartTime:'',
            xAxisEndTime:'',
            xAxisArr:[],//x轴坐标
        }
    },
    methods: {
        init(){
            this.OrderPayment();
        },
        //交易变化曲线图
        OrderPayment(){
            dateOrderPayment(this.dateOrderPaymentTime).then(res => {
                // console.log('dateOrderPayment',res.data)
                this.dateOrderPaymentObj = res.data;
                let smallData = checkData(this.xAxisArr,this.dateOrderPaymentObj.smallCar);
                let companyData = checkData(this.xAxisArr,this.dateOrderPaymentObj.company);
                let bigData = checkData(this.xAxisArr,this.dateOrderPaymentObj.bigCar);

                // console.log('smallDatasmallData',smallData,companyData,bigData)
                this.lineCharts(this.xAxisArr,smallData,companyData,bigData)
            })
        },
        LineInit(options) {
            this.myChartLine.hideLoading();
            this.myChartLine.setOption(options)

        },
        lineCharts(xAxisData,smallData,companyData,bigData){
            this.myChartLine = echarts.init(document.querySelector('#transaction_AreaLine'));
            this.myChartLine.showLoading();
            let options = {
                title: {
                    text: '交易变化曲线图',
                    x:'17',
                    y:'15',
                    textStyle:{
                        color:'#fff',
                        fontSize:'18',
                        fontWeight:'normal',
                    }
                },
                //提示框，鼠标悬浮交互时的信息提示
                tooltip: {
                    trigger: 'axis',
                },
                grid:{
                        x:100,
    //                     y:45,
                        x2:50,
    //                     y2:20,
    //                     borderWidth:1
                  },
                legend: {
                    data: [
                        {
                            name:'小货车',
                            textStyle:{
                                color:'#00ccff'
                            },
                            icon:'roundRect'
                        },
                        {
                            name:'发物流',
                            textStyle:{
                                color:'#03f71a'
                            },
                            icon:'roundRect'
                        },
                        {
                            name:'大货车',
                            textStyle:{
                                color:'#e9d000'
                            },
                            icon:'roundRect'
                        }
                    ],
                    show:true,
                    left:'15%',
                    top:'5%',
                    itemGap:20,
                    textStyle:{
                        fontSize:'16',
                        fontWeight:'bold'
                    }
                },
                toolbox: {
                    show: false,
                    feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap : false,
                        data: xAxisData,
                        splitLine:{show: false},//去除网格线
                        splitArea : {show : false},//保留网格区域
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        nameTextStyle: {
                            color: 'rgba(255, 255, 255, 0.69)'
                        },
                        // boundaryGap: ['5%', '5%'],//坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
                        axisLabel: {
                            textStyle: {
                                color: 'white'
                            },
                            padding:[10,0,0,0]

                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        min:function(value) {
                            return value.min - 20;
                        },
                        // splitLine:{show: true},//去除网格线
                        splitArea : {show : false},//保留网格区域
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color:'#00ffff',
                                width:'0'
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        nameLocation: 'end',
                        nameGap: 20,
                        nameRotate: 0,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['rgba(0, 255, 255, 0.2)']
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'white',
                                fontSize: 14
                            },
                            padding:[0,20,0,0]
                        },
                    }
                ],
                series: [
                    {
                        name: '小货车',
                        type: 'line',
                        symbolSize:[8,8],
                        data: smallData,
                        itemStyle: {
                            normal: {
                                color:'#00ccff'
                            }
                        },
                        lineStyle:{//线条颜色
                            normal:{
                                color: '#00ccff',
                                width:'1'
                            }
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(0,204,255,0.7)' // 0% 处的颜色
                                }, {
                                    offset: 0.6, color: 'rgba(0,204,255,0)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                    {
                        name: '大货车',
                        type: 'line',
                        // smooth: true,
                        symbolSize:[8,8],
                        data: bigData,
                        itemStyle: {
                            normal: {
                                color:'#e9d000'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: ' #e9d000',
                                width:'1'
                            }
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(233,208,0,0.7)' // 0% 处的颜色
                                }, {
                                    offset: 0.6, color: 'rgba(233,208,0,0)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                    {
                        name: '发物流',
                        type: 'line',
                        // smooth: true,
                        symbolSize:[8,8],
                        data: companyData,
                        // markPoint: {
                        //     data: [
                        //         { type: 'max', name: '最大值' },
                        //         { type: 'min', name: '最小值' }
                        //     ]
                        // },
                        itemStyle: {
                            normal: {
                                color:'#03f71a'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#03f71a',
                                width:'1'
                            }
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(3,247,26,0.7)' // 0% 处的颜色
                                }, {
                                    offset: 0.6, color: 'rgba(3,247,26,0)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    }
                ]
            }
            this.LineInit(options);

            window.onresize = () => {
                this.myChartLine.resize({
                    width: 'auto',
                    height: 'auto'
                })
            }
        },
        valueChange(val,type,timeType){
            console.log('val,type',val,type,timeType)
            if(type == 'jybhline'){
                this.dateOrderPaymentTime.startTime = val[0];
                this.dateOrderPaymentTime.endTime = val[1];
                this.dateOrderPaymentTime.type = timeType;
                this.xAxisStartTime = parseTime(val[0],'{y}-{m}-{d}')
                this.xAxisEndTime = parseTime(val[1],'{y}-{m}-{d}')
                this.xAxisArr = getBetweenDateStr(this.xAxisStartTime,this.xAxisEndTime,timeType) ? getBetweenDateStr(this.xAxisStartTime,this.xAxisEndTime,timeType) : [];
                this.OrderPayment();
            }
               
        }
    },
    beforeDestroy(){
        
    },
    mounted() {
        this.init();
    }

}
</script>

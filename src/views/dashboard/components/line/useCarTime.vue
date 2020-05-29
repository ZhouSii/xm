<template>
    <div class="typeLineTime">
        <div id="orderType_useCarTime">
        </div>
        <div class="typeLineTime_data">
            <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,item.label)">{{item.name}}</li>
        </div>
    </div>
</template>

<script>

import echarts from 'echarts'
export default {
    watch: {
        
    },
    data() {
        return {
            myChartTimeLine:{},
            dataType:[
                {name:'今天',iscur:true},
                {name:'昨天',iscur:false},
                {name:'本周',iscur:false},
                {name:'本月',iscur:false},
                {name:'今年',iscur:false},
                {name:'全部',iscur:false},
            ],
            xTime:[],
        }
    },
    methods: {
        LineInit(options) {
            this.myChartTimeLine = echarts.init(document.querySelector('#orderType_useCarTime'));
            this.myChartTimeLine.setOption(options)
        },
        setCur(index,label){
            this.dataType.forEach((el,idx)=>{
                idx == index ? el.iscur = true : el.iscur = false;
            })
        },
    },
    beforeDestroy(){
        
    },
    mounted() {
          let options = {
            title: {
                text: '用车时间段曲线图',
                x:'17',
                y:'20',
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
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true
            },
            legend: {
                data: [
                    {
                        name:'小货车',
                        textStyle:{
                            color:'#00ccff'
                        },
                        icon:'none'
                    },
                ],
                show:false,
                right:'5%',
                top:'5%',
                itemGap:50,
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
                    data: ['0', '1', '2', '3', '4', '5', '6'],
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
                    min:"dataMin",
                    splitNumber:3,
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
                    data: [3002, 2800, 3850, 2256, 3366, 2389, 3005],
                    itemStyle: {
                        normal: {
                            color:'#00ccff'
                        }
                    },
                    lineStyle:{//线条颜色
                        normal:{
                            width:'1',
                            color: '#00ccff',
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
            ]
        }
        this.LineInit(options);

        window.onresize = () => {
            this.myChartTimeLine.resize({
                width: 'auto',
                height: 'auto'
            })
        }
    }

}
</script>

<template>
    <div class="typeLine">
        <div id="orderType_AreaLine"></div>
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
            myChartLine:{},
            dataType:[
                {name:'近7天',iscur:true},
                {name:'近30天',iscur:false},
                {name:'近半年',iscur:false},
                {name:'近一年',iscur:false},
            ],
        }
    },
    methods: {
        LineInit(options) {
            this.myChartLine = echarts.init(document.querySelector('#orderType_AreaLine'));
            this.myChartLine.setOption(options)
        },
        setCur(index,label){
            console.log(index,label)
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
                text: '单量变化曲线图',
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
//                     x:50,
//                     y:45,
                    x2:25,
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
                        icon:'none'
                    },
                    {
                        name:'发物流',
                        textStyle:{
                            color:'#03f71a'
                        },
                        icon:'none'
                    },
                    {
                        name:'大货车',
                        textStyle:{
                            color:'#e9d000'
                        },
                        icon:'none'
                    }
                ],
                show:true,
                left:'20%',
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
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
                    data: [30054, 46666, 13333, 45656, 32314, 46665, 48998],
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
                    data: [20323, 35465, 22345, 28945, 24545, 31456, 35456],
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
                    data: [14012, 16666, 31999, 14444, 11555, 21165, 17884],
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
    }

}
</script>

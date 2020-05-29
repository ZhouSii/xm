<template>
    <div class="orderType_usersCount">
        <div class="orderType_usersCount_left">
            <div id="orderType_usersCount_bar">
                
            </div>
            <div class="typeLineTime_data">
                <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,item.label)">{{item.name}}</li>
            </div>
        </div>
        <div class="orderType_usersCount_right">
            <div class="orderType_usersCount_right_info">
                新增用户：300人
            </div>
            <div class="orderType_usersCount_right_info">
                新增用户转化率：50%
            </div>
            <div class="orderType_usersCount_right_info">
                新增用户认证率：50%
            </div>
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
            myChartbar:{},
            dataType:[
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
        barInit(options) {
            this.myChartbar = echarts.init(document.querySelector('.orderType_usersCount #orderType_usersCount_bar'));
            this.myChartbar.setOption(options)
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
                text: '用户数据总览',
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
            calculable: true,
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    // boundaryGap : false,
                    data: ['货主', '物流公司', '车主'],
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
                            color: 'white',
                            fontSize:'14'
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
                    type: 'bar',
                    // symbolSize:[8,8],
                    data: [390, 330, 220],
                    itemStyle: {
                        normal: {
                            color:'#7364ff'
                        }
                    },
                    barGap:'0%',
                    barWidth: '10%'//设置柱子宽度，单位为px
                },
                {
                    name: '大货车',
                    type: 'bar',
                    // symbolSize:[8,8],
                    data: [320, 300, 200],
                    itemStyle: {
                        normal: {
                            color:'#00d6ff'
                        }
                    },
                    barGap:'0%',
                    barWidth: '10%'//设置柱子宽度，单位为px
                },
                {
                    name: '发物流',
                    type: 'bar',
                    // symbolSize:[8,8],
                    data: [350, 380, 290],
                    itemStyle: {
                        normal: {
                            color:'#00a4ff'
                        }
                    },
                    barGap:'0%',

                    barWidth: '10%'//设置柱子宽度，单位为px
                }
            ]
        }
        this.barInit(options);

        window.onresize = () => {
            this.myChartbar.resize({
                width: 'auto',
                height: 'auto'
            })
        }
    }

}
</script>

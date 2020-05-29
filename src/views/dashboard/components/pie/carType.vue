<template>
    <div id="orderType_carType">
    </div>
</template>

<script>

import echarts from 'echarts'
export default {
    watch: {
        
    },
    data() {
        return {
            myChartpie:{},
        }
    },
    methods: {
        LineInit(options) {
            this.myChartpie = echarts.init(document.querySelector('#orderType_carType'));
            this.myChartpie.setOption(options)
        },
    },
    beforeDestroy(){
        
    },
    mounted() {
          let options = {
            title: {
                text: '车型需求分布图',
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
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'用车类型',
                    type:'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: '{b}:{c} ({d}%)',
                            color:'#fff',
                            fontWeight:'normal'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                // fontSize: '30',
                                // fontWeight: 'bold'
                            }
                        }
                    },
                    data:[
                        {
                            value:335, 
                            name:'小货车',
                            itemStyle: { color: 'rgba(205,202,92,0.8)' }
                        },
                        {value:310, name:'小面包',itemStyle: { color: 'rgba(216,119,71,0.8)' }},
                        {value:234, name:'金杯',itemStyle: { color: 'rgba(73,187,137,0.8)' }},
                        {value:135, name:'小面包',itemStyle: { color: 'rgba(0,126,236,0.8)' }},
                    ]
                }
                     
            ]
        }
        this.LineInit(options);

        window.onresize = () => {
            this.myChartpie.resize({
                width: 'auto',
                height: 'auto'
            })
        }
    }

}
</script>

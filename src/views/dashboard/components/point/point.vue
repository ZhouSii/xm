<template>
    <div id="orderTypeHot">
                
    </div>
</template>

<script>

import axios from 'axios'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
export default {
    created() {
        this._getCityData()
    },
    watch: {
        
    },
    data() {
        return {
            // legendArr: [],
            myChart: {},
            geoCoordMap: {},
            name: '热力图',
            myData:[
                {name: '海门', value: [121.15, 31.89, 90]},
                {name: '鄂尔多斯', value: [109.781327, 39.608266, 120]},
                {name: '招远', value: [120.38, 37.35, 142]},
                {name: '舟山', value: [122.207216, 29.985295, 123]},
            ],
        }
    },
    methods: {
        mapInit(options) {
            this.myChart = echarts.init(document.querySelector('#orderTypeHot'));
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
                let geoCoord = this.geoCoordMap[data[i].name];
                if (geoCoord) {
                res.push(geoCoord.concat(data[i].value));
                }
            }
            return res;
        }
    },
    beforeDestroy(){
        
    },
    mounted() {
        // axios.get('static/data/heat/testData.json').then((res) => {
            let options = {
                title: {
                    text: '',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
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
                    zoom:'1.2',
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(0,40,127,1)',
                            borderWidth: 1,//设置外层边框
                            borderColor:'rgba(27,120,207, 1)',
                            shadowColor: 'rgba(0,133,217, 1)',
                            shadowBlur: 150
                        }
                    }
                    //  itemStyle: {
                    //     normal: {
                    //         areaColor: '#01215c',
                    //         borderWidth: 5,//设置外层边框
                    //         borderColor:'#9ffcff',
                    //         shadowColor: 'rgba(0,54,255, 1)',
                    //         shadowBlur: 150
                    //     }
                    // }
                },
                series: [
                   {
                        type: 'map',
                        map: 'china',
                        geoIndex: 1,
                        aspectScale: 0.75, //长宽比
                        zoom:'1.2',
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
                        data: this.myData,
                        symbol:'circle',//标记的图形
                        symbolSize: function (val) {
                            return val[2] / 10;
                            // return 30;
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
            // window.onresize = this.myChart.resize;
            //散点全国地图
            this.mapInit(options);
        // });
        window.onresize = () => {
            this.myChart.resize({
                width: 'auto',
                height: 'auto'
            })
        }
    }

}
</script>

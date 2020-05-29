<template>
    <div class="identicalStyle RankingTotal" v-loading="loading">
        <el-form inline  class="demo-ruleForm classify_searchinfo">
        <el-form-item style="margin-right:10px;">
            <ul class="timeLine">
                <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,item.value)"><span>{{item.name}}</span> </li>
            </ul>
        </el-form-item>
        <el-form-item v-if="formAllData.timeQueryType == '5'">
            <el-date-picker
                v-model="chooseTime"
                @change="timeVal"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :clearable="false"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
        </el-form-item>
        </el-form>
        <div class="classify_info">
        <div class="info_news">
        <div id="dataCenter_bar"></div>
        </div> 
        </div>
        </div>
</template>
<script type="text/javascript">
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import { dateTrendTableShipper } from '@/api/dataCenter/DayTrend'
import {getDictionary} from '@/api/common.js'
import echarts from 'echarts'
    export default{
        data(){
            return{
              loading: true,
              myChartbar:{},
              dataType:[
                {name:'本月',value:'4',iscur:true},
                {name:'上月',value:'6',iscur:false},
                {name:'指定时间段',value:'5',iscur:false},
              ],
              chooseTime:[],
              pickerOptions2: {
                shortcuts: pickerOptions2
              },
              formAllData:{
                  startDate:null,
                  endDate:null,
                  timeQueryType:'4',
              },
              category:[],
              barData:[],
              lineData:[],
            }
        },
        components: {

        },
        methods:{
          firstblood(){
          this.loading = true
          dateTrendTableShipper(this.formAllData).then(res=>{
          this.category = res.data.dateList
          this.barData = res.data.authTotalList
          this.lineData = res.data.registerTotalList
          this.barInit()
          this.loading = false
          })
          },
          timeVal(i){
                if(i){
                    this.formAllData.startDate = i[0];
                    this.formAllData.endDate = i[1];
                }else{
                    this.formAllData.startDate = '';
                    this.formAllData.endDate = '';
                }
                this.firstblood()
          },
          setCur(index,value){
                this.dataType.forEach((el,idx)=>{
                            idx == index ? el.iscur = true : el.iscur = false;
                        })
                        this.formAllData.timeQueryType = value;
                        if(value != '5'){
                            this.chooseTime = []
                            this.formAllData.startDate = '';
                            this.formAllData.endDate = '';
                            this.firstblood()
                        }
        },
        barInit() {
        let option = {
            backgroundColor: '#0f375f',
            tooltip: {
                trigger: 'axis',
            formatter:function(params){
            let relVal = "";
            let Markers1 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c23531;"></span>'
            let Markers2 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#43eec6;"></span>'
             relVal +=params[0].name + '<br/>' + Markers1 +  params[0].seriesName+ ' : ' + params[0].value + '<br/>'
                     + Markers2 +  params[1].seriesName+ ' : ' + params[1].value
             return relVal;
            },
            },
            legend: {
                data: ['注册数', '认证数'],
                textStyle: {
                    color: '#ccc'
                }
            },
            xAxis: {
                data: this.category,
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                }
            },
            yAxis: {
                splitLine: {show: false},
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                }
            },
            series: [{
                name: '注册数',
                type: 'line',
                smooth: true,
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 10,
                data: this.lineData
            }, {
                name: '认证数',
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#14c8d4'},
                                {offset: 1, color: '#43eec6'}
                            ]
                        )
                    }
                },
                data: this.barData
            }, {
                name: '认证数',
                type: 'line',
                smooth: true,
                barWidth: 10,
                symbolSize: 10,
                showAllSymbol: true,
                symbol: 'emptyCircle',
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient( 
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#14c8d4'},
                                {offset: 1, color: '#43eec6'}
                            ]
                        )
                    }
                },
                data: this.barData
            }, {
                name: 'line',
                type: 'bar',
                barGap: '-100%',
                barWidth: 10,
                alwaysShowContent:true,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: 'rgba(20,200,212,0.5)'},
                                {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                                {offset: 1, color: 'rgba(20,200,212,0)'}
                            ]
                        )
                    }
                },
                z: -12,
                data: this.lineData
            }, {
                name: 'dotted',
                type: 'pictorialBar',
                symbol: 'rect',
                itemStyle: {
                    normal: {
                        color: '#0f375f'
                    }
                },
                symbolRepeat: true,
                symbolSize: [12, 4],
                symbolMargin: 1,
                z: -10,
                data: this.lineData
            }]
        };
            this.myChartbar = echarts.init(document.querySelector('#dataCenter_bar'));
            this.myChartbar.setOption(option)
        },

        },
        mounted(){
            this.firstblood();
        }
    }
</script>

<style type="text/css" lang="scss">
.RankingTotal{
    .classify_searchinfo{
        .el-input__icon{
            line-height: 30px;
        }
        .timeLine{
            overflow: hidden;
            padding-top: 2px;
            .currentClick{
                color:#1890ff;
            }
            li{
                float: left;
                font-size: 16px;
                cursor: pointer;
                span{
                    border-right: 1px solid #000 ;
                    padding:0 10px;
                };
            }
            li:last-child span{
                border-right: 0 none;
            }
        }
    }
            #dataCenter_bar{
            height: 100%;
        }
}
</style>
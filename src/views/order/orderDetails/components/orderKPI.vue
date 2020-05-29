<template>
 <div class="TCorderInfo clearfix orderKPI" >
        <!-- KPI雷达 -->
        <div class="orderInfo-collapse collapseInfo">
            <div class="essentialInformation">
         <div class="orderEchart">
          <div class="orderKPI_fl">
              综合评分：<span class="orderColor" v-if="params.length>0">{{params[0].comprehensiveRating}}</span>分
          </div>
          <div class="orderKPI_fr">
              <div id="KPI_echarts"></div>
          </div>
         </div>
        </div>
        </div>
        <div class="address-collapse collapseInfo">
            <h2>时效考核</h2>
        <div class="essentialInformation">
         <table class="tree-table">
            <tbody>
                <tr>
                    <th  width="12%">考核项目</th>
                    <th  width="7%">达标时效</th>
                    <th  width="7%">实际时效</th>
                    <th  width="8%">差异值</th>
                    <th  width="8%">考核项权限配分</th>
                    <th  width="10%">评估值</th>
                    <th  width="8%">评分</th>
                    <th  width="48%">考核项说明</th>
                </tr>
                <tr>
                    <td>撮合时效（秒）</td>
                    <td>{{params.length>0?params[0].standards:''}}</td>
                    <td>{{params.length>0?params[0].actual:''}}</td>
                    <td>{{params.length>0?params[0].differenceValue:''}}</td>
                    <td>{{params.length>0?params[0].assessItemPoints:''}}</td>
                    <td><span class="orderColor">{{params.length>0?params[0].evaluateValues:''}}</span></td>
                    <td><span class="orderColor">{{params.length>0?params[0].indiviReting:''}}</span></td>
                    <td>从客户下单时间开始计算，到首次确认中单司机所用时间<br>单位：<span class="orderColor">秒</span></td>
                </tr>
                <tr>
                    <td>中单后联系货主时效（秒）</td>
                    <td>{{params.length>0?params[1].standards:''}}</td>
                    <td>{{params.length>0?params[1].actual:''}}</td>
                    <td>{{params.length>0?params[1].differenceValue:''}}</td>
                    <td>{{params.length>0?params[1].assessItemPoints:''}}</td>
                    <td><span class="orderColor">{{params.length>0?params[1].evaluateValues:''}}</span></td>
                    <td><span class="orderColor">{{params.length>0?params[1].indiviReting:''}}</span></td>
                    <td>从确认中单司机开始计算，到车主联系货主或前往提货地所用时间<br>单位：<span class="orderColor">秒</span></td>
                </tr>        
                <tr>
                    <td>到车时效（分钟）</td>
                    <td>{{params.length>0?params[2].standards:''}}</td>
                    <td>{{params.length>0?params[2].actual:''}}</td>
                    <td>{{params.length>0?params[2].differenceValue:''}}</td>
                    <td>{{params.length>0?params[2].assessItemPoints:''}}</td>
                    <td><span class="orderColor">{{params.length>0?params[2].evaluateValues:''}}</span></td>
                    <td><span class="orderColor">{{params.length>0?params[2].indiviReting:''}}</span></td>
                    <td>实际到达提货地时间与预计到达提货地时间（即时订单：车主中单时间加上地图预估用时；预约订单：预约用车时间）差异值<br>单位：<span class="orderColor">分钟</span></td>
                </tr>
                <tr>
                    <td>到货时效（分钟）</td>
                    <td>{{params.length>0?params[3].standards:''}}</td>
                    <td>{{params.length>0?params[3].actual:''}}</td>
                    <td>{{params.length>0?params[3].differenceValue:''}}</td>
                    <td>{{params.length>0?params[3].assessItemPoints:''}}</td>
                    <td><span class="orderColor">{{params.length>0?params[3].evaluateValues:''}}</span></td>
                    <td><span class="orderColor">{{params.length>0?params[3].indiviReting:''}}</span></td>
                    <td>实际到达目的地时间与预计到达目的地时间差异值<br>单位：<span class="orderColor">分钟</span></td>
                </tr>    
                <tr>
                    <td>回单时效（小时）</td>
                    <td>{{params.length>0?params[4].standards:''}}</td>
                    <td>{{params.length>0?params[4].actual:''}}</td>
                    <td>{{params.length>0?params[4].differenceValue:''}}</td>
                    <td>{{params.length>0?params[4].assessItemPoints:''}}</td>
                    <td><span class="orderColor">{{params.length>0?params[4].evaluateValues:''}}</span></td>
                    <td><span class="orderColor">{{params.length>0?params[4].indiviReting:''}}</span></td>
                    <td>从完成卸货时间开始计算，到车主回单所用时间<br>单位：<span class="orderColor">小时</span></td>
                </tr>
                <tr>
                    <td>回款时效（小时）</td>
                    <td>{{params.length>0?params[5].standards:''}}</td>
                    <td>{{params.length>0?params[5].actual:''}}</td>
                    <td>{{params.length>0?params[5].differenceValue:''}}</td>
                    <td>{{params.length>0?params[5].assessItemPoints:''}}</td>
                    <td><span class="orderColor">{{params.length>0?params[5].evaluateValues:''}}</span></td>
                    <td><span class="orderColor">{{params.length>0?params[5].indiviReting:''}}</span></td>
                    <td>从完成卸货时间开始计算，到车主回款所用时间<br>单位：<span class="orderColor">小时</span></td>
                </tr>                                                                  
            </tbody>
         </table>
        </div>
        </div>

        <div class="address-collapse collapseInfo">
            <h2>交付考核</h2>
        <div class="essentialInformation">            
         <table class="tree-table">
            <tbody>
                <tr>
                    <th  width="12%">考核项目</th>
                    <th  width="7%">达标时效</th>
                    <th  width="7%">实际时效</th>
                    <th  width="8%">差异值</th>
                    <th  width="8%">考核项权限配分</th>
                    <th  width="10%">评估值</th>
                    <th  width="8%">评分</th>
                    <th  width="48%">考核项说明</th>
                </tr>
                <tr>
                    <td>货损货差（次）</td>
                    <td>{{params.length>0?params[6].standards:''}}</td>
                    <td>{{params.length>0?params[6].actual:''}}</td>
                    <td>{{params.length>0?params[6].differenceValue:''}}</td>
                    <td>{{params.length>0?params[6].assessItemPoints:''}}</td>
                    <td><span class="orderColor">{{params.length>0?params[6].evaluateValues:''}}</span></td>
                    <td><span class="orderColor">{{params.length>0?params[6].indiviReting:''}}</span></td>
                    <td>订单货损货差次数<br>单位：<span class="orderColor">次</span></td>
                </tr>
            </tbody>
         </table>
        </div>
        </div>

        <div class="address-collapse collapseInfo">
            <h2>管理考核</h2>
        <div class="essentialInformation">
         <table class="tree-table">
            <tbody>
                <tr>
                    <th  width="12%">考核项目</th>
                    <th  width="7%">达标时效</th>
                    <th  width="7%">实际时效</th>
                    <th  width="8%">差异值</th>
                    <th  width="8%">考核项权限配分</th>
                    <th  width="10%">评估值</th>
                    <th  width="8%">评分</th>
                    <th  width="48%">考核项说明</th>
                </tr>
                <tr>
                    <td>投诉（次）</td>
                    <td>{{params.length>0?params[7].standards:''}}</td>
                    <td>{{params.length>0?params[7].actual:''}}</td>
                    <td>{{params.length>0?params[7].differenceValue:''}}</td>
                    <td>{{params.length>0?params[7].assessItemPoints:''}}</td>
                    <td><span class="orderColor">{{params.length>0?params[7].evaluateValues:''}}</span></td>
                    <td><span class="orderColor">{{params.length>0?params[7].indiviReting:''}}</span></td>
                    <td>订单货主投诉次数<br>单位：<span class="orderColor">次</span></td>
                </tr>
                <tr>
                    <td>到车距离异常（次）</td>
                    <td>{{params.length>0?params[8].standards:''}}</td>
                    <td>{{params.length>0?params[8].actual:''}}</td>
                    <td>{{params.length>0?params[8].differenceValue:''}}</td>
                    <td>{{params.length>0?params[8].assessItemPoints:''}}</td>
                    <td><span class="orderColor">{{params.length>0?params[8].evaluateValues:''}}</span></td>
                    <td><span class="orderColor">{{params.length>0?params[8].indiviReting:''}}</span></td>
                    <td>车主点击到达提货地或目的地时，距离客户下单地址异常次数<br>单位：<span class="orderColor">次</span></td>
                </tr>                
            </tbody>
         </table>
        </div>
        </div>

 </div>
</template>

<script>
import { findAssessmentByOrderSerial } from '@/api/dispatch/evaluation.js'
import echarts from 'echarts'
export default {
    data(){
        return{
        formData:{
            orderSerial:null,
        },
        params:[],         
        option:{
            polar : [
            {
                indicator : []
                },  
            ],
          tooltip:{
          show:true,
          position:function(p){
            return [p[0] + 10, p[1] - 10];
          }
          },
           series : [
                {
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                    label: {
                    normal: {
                        show: true,
                        color: '#328ff5',
                        formatter: (params) => {
                            return params.value
                        },
                    },
                },
                type: 'radar',
                    data : [
                        {
                            value : [10, 20, 30, 40, 50, 60,70,80,10],
                            name: '评分',
                    itemStyle: {
                    normal: {
                            color: '#a9d3ff',
                            lineStyle: {
                            color: '#a9d3ff',}}},
                }]
                }
            ]
        }
        }
    },
    methods:{
        firstBlood(){
        findAssessmentByOrderSerial(1,100,this.formData).then(res => {
            let MaxArray = []
            console.log('data:',res)
            if(res.data.length>0){
            for(let maxI = 0;maxI<9;maxI++)
            {
                MaxArray.push(res.data[maxI].assessItemPoints)
            }
            if(res.data.length>0){
            var maxNum = MaxArray.reduce(function(a , b){ 
            return b > a ? b : a; 
            });
            this.option.polar[0].indicator = [
                    { text: '撮合时效', max: maxNum},
                    { text: '中单后联系货主时效', max: maxNum},
                    { text: '到车时效', max: maxNum},
                    { text: '到货时效', max: maxNum},
                    { text: '回单时效', max: maxNum},
                    { text: '回款时效', max: maxNum},
                    { text: '货损货差', max: maxNum},
                    { text: '投诉', max: maxNum},
                    { text: '到车距离异常', max: maxNum},]
            this.option.series[0].data[0].value = [res.data[0].indiviReting,res.data[1].indiviReting,res.data[2].indiviReting,res.data[3].indiviReting,res.data[4].indiviReting,res.data[5].indiviReting,res.data[6].indiviReting,res.data[7].indiviReting,res.data[8].indiviReting]
            this.option.series[0].data[0].value.forEach((item,i)=>{
            if(item<0){
                 this.option.series[0].data[0].value[i] = 0
            }
            })
            this.params = res.data
            }
            else{
            this.option.series[0].data[0].value = []
            this.params = []
            }
            var myChart = echarts.init(document.getElementById('KPI_echarts')); 
            myChart.setOption(this.option);             
        }
        })
        }
    },
    mounted(){
        this.formData.orderSerial = this.$route.query.orderSerial
        this.firstBlood()
    }
}
</script>

<style lang="scss" scoped>
.orderKPI{
    .orderEchart{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .orderKPI_fl{
        flex: 1;
        text-align: center;
        font-size:35px;
    }
    .orderKPI_fr{
        flex: 1
    }
    #KPI_echarts{
        width: 500px;
        height: 300px;
    }
    .orderColor{
        color: red;
    }
    .tree-table{
                width: 100%;
                border-left: 1px solid #d0d7e5;
                border-top: 1px solid #d0d7e5;
                font-size: 14px;
                color: #333;
                tr{
                    th{
                    border-right: 1px solid #d0d7e5;
                    border-bottom: 1px solid #d0d7e5; 
                    padding: 10px 10px;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                    background: #eaf0ff;
                    }
                    td{
                    border-right: 1px solid #d0d7e5;
                    border-bottom: 1px solid #d0d7e5; 
                    padding: 10px;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                    }
                }
            }
}        
</style>


<template>
        <div class="wzlmain_content">
            <div class="head_title clearfix">
              <h4 class="fl">数据总览</h4>
              <ul class="head_list">
                <li v-for="(item, index) in dataset" :class="{'active':item.keyval === currentkey} " :key="index" @click="currentkey = item.keyval">{{item.text}}</li>
                <li>
                  <el-date-picker
                    v-model="pickerDate"
                    type="daterange"
                    align="right"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="getDateChange"
                    :picker-options="pickerOptions3">
                  </el-date-picker>
                </li>
              </ul>
            </div>
            <el-row class="main_forthUl">
                <ul>
                    <li>需求资源池 <span class="title_span">({{title}})</span>
                    </li>
                    <li>求货需求订单:<span>34755</span>单</li>
                    <li>求车需求订单:<span>5568</span>单</li>
                    <li>零担订单:<span>23888</span>单</li>
                    <li>小货车订单:<span>12352</span>单</li>
                </ul>
                <ul>
                    <li>
                        用户注册
                        <span class="title_span">({{title}})</span>
                        <!-- <i class="el-icon-check"></i> -->
                    </li>
                    <li>货主:<span>7989</span>人</li>
                    <li>车主:<span>32456</span>人</li>
                    <li>物流公司:<span>3455</span>家</li>
                    <li>区代:<span>32</span>家</li>
                </ul>
                <ul>
                    <li>
                        用户认证
                        <span class="title_span">({{title}})</span>
                        <!-- <i class="el-icon-check"></i> -->
                    </li>
                    <li>货主:<span>9986</span>人</li>
                    <li>车主:<span>32514</span>人</li>
                    <li>物流公司:<span>3422</span>家</li>
                    <li>区代:<span>30</span>家</li>
                </ul>
                <ul>
                    <li>
                        货主下单
                        <span class="title_span">({{title}})</span>
                        <!-- <i class="el-icon-check"></i> -->
                    </li>
                    <div id="xiadan" style="width:100%;height:150px;">

                    </div>
                </ul>
                <ul>
                    <li>
                        交易成功
                        <span class="title_span">({{title}})</span>
                        <!-- <i class="el-icon-check"></i> -->
                    </li>
                    <div id="jiaoyi" style="width:100%;height:150px;">

                    </div>
                </ul>
            </el-row>
            <div class="main_left clearfix">
                <div class="ul_left" id="main"></div>
                <div class="ul_right">
                    <div id="main_lefttop"></div>
                </div>
            </div>
        </div>
</template>

<script>
import echarts from 'echarts'
import { pickerOptions4 } from '@/utils/index'
export default {
  watch: {
    currentkey(newVal) {
      if (newVal !== '') {
        this.doAction(newVal)
      }
    }
  },
  data() {
    return {
      dataset: [],
      title: '昨天',
      currentkey: '',
      tab: [],
      pickerDate: [],
      searchQuery: {
        vo: {
          'nowStartTime': '',
          'nowEndTime': '',
          'pastStartTime': '',
          'pastEndTime': '',
          'buttonKey': 0
        }
      },
      pickerOptions3: {
        shortcuts: [{
          text: '今天',
          keyval: 0,
          onClick(picker) {
            // 今天
            const Today = pickerOptions4.today()
            // 昨天
            const yesterDay = pickerOptions4.yesterDay()
            // console.log(pickerOptions4.today())
            picker.$emit('pick', Today)
          }
        }, {
          text: '昨天',
          keyval: 1,
          onClick(picker) {
            // 昨天
            const yesterDay = pickerOptions4.yesterDay()
            // 前天
            const beforeDady = pickerOptions4.beforeDady()
            console.log(pickerOptions4.yesterDay())
            picker.$emit('pick', YesterDay)
          }
        }, {
          text: '本周',
          keyval: 2,
          onClick(picker) {
            // 最近的星期天的日期，到今天的日期
            const CurrentWeek = pickerOptions4.currentWeek()
           // 上上周星期天的日前，到上周六的日期
            const lastWeek = pickerOptions4.lastWeek()
            // console.log(pickerOptions4.currentWeek())
            picker.$emit('pick', CurrentWeek)
          }
        }, {
          text: '本月',
          keyval: 3,
          onClick(picker) {
            // 本月1日到今天的日前
            const CurrentMonth = pickerOptions4.currentMonth()
            // 上月1日到上月的结束时间
            const LastMonth = pickerOptions4.lastMonth()
            // console.log(pickerOptions4.lastMonth())
            picker.$emit('pick', CurrentMonth)
          }
        }, {
          text: '本年',
          keyval: 4,
          onClick(picker) {
            const CurrentYear = pickerOptions4.currentYear()
            const LastYear = pickerOptions4.lastYear()
            picker.$emit('pick', CurrentYear)
          }
        }]

      },
      value6: '',
      value7: ''
    }
  },
  methods: {
    getDateChange(val) {
      this.searchQuery.vo.buttonKey = 5
      this.searchQuery.vo.nowStartTime = val[0].getTime()
      this.searchQuery.vo.nowEndTime = val[0].getTime()
      this.currentkey = 5
    },
    doAction(type) {
      switch (type) {
        case 0:
          const Today = pickerOptions4.today()
          // console.log(this.dataset)
          // picker.$emit('pick', Today)
          this.pickerDate = Today
          this.searchQuery.vo.buttonKey = 0
          this.currentkey = 0
          this.title = '今天'
          console.log('今天')
          break
        case 1:
          const YesterDay = pickerOptions4.yesterDay()
          this.pickerDate = YesterDay
          this.title = '昨天'
          console.log('昨天')
          this.searchQuery.vo.buttonKey = 1
          this.currentkey = 1
          break
        case 2:
          // 最近的星期天的日期，到今天的日期
          const CurrentWeek = pickerOptions4.currentWeek()
          // 上上周星期天的日前，到上周六的日期
          const lastWeek = pickerOptions4.lastWeek()
          this.pickerDate = CurrentWeek
          this.searchQuery.vo.buttonKey = 2
          this.currentkey = 2
          this.title = '本周'
          console.log('本周')
          break
        case 3:
          // 本月1日到今天的日前
          const CurrentMonth = pickerOptions4.currentMonth()
          // 上月1日到上月的结束时间
          const LastMonth = pickerOptions4.lastMonth()
          this.pickerDate = CurrentMonth
          this.searchQuery.vo.buttonKey = 3
          this.currentkey = 3
          this.title = '本月'
          console.log('本月')
          break
        case 4:
          const CurrentYear = pickerOptions4.currentYear()
          const LastYear = pickerOptions4.lastYear()
          this.pickerDate = CurrentYear
          this.searchQuery.vo.buttonKey = 4
          this.currentkey = 4
          this.title = '本年'
          break
      }
      // this.getData()
    }
  },
  mounted() {
    this.dataset = this.pickerOptions3.shortcuts
    // 默认展示今天的数据
    this.currentkey = 0
    var myChart = echarts.init(document.getElementById('main_lefttop'))
        // var myChart2 = echarts.init(document.getElementById('main_leftdown'))
    var myChart3 = echarts.init(document.getElementById('main'))
    var myChart4 = echarts.init(document.getElementById('xiadan'))
    var myChart5 = echarts.init(document.getElementById('jiaoyi'))

    const option = {
      // backgroundColor: '#2c343c',
      // textStyle: {
      //     color: 'rgba(255, 255, 255, 0.3)'
      // },
      label: {
        textStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      // labelLine: {
      //   lineStyle: {
      //       color: 'rgba(255, 255, 255, 0.3)'
      //   }
      // },
      title: {
        text: '用户转化比例',
        subtext: '测试数据',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['小货车', '大货车', '零担']
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                x: '25%',
                width: '50%',
                funnelAlign: 'left',
                max: 1548
              }
            }
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      color: ['#35c966', '#1b9aff', '#13c9c9'],
      calculable: true,

      series: [
        {
          name: '收入来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '小货车', itemStyle: { color: '#c23531' }},
            { value: 310, name: '大货车', itemStyle: { color: '#4682B4' }},
            { value: 234, name: '零担', itemStyle: { color: '	#20B2AA' }}
          ]
        }
      ]
    }

    const option2 = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['收入', '支出']
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                x: '25%',
                width: '50%',
                funnelAlign: 'center',
                max: 1548
              }
            }
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      series: [
        {
          name: '2018收入支出比',
          type: 'pie',
          radius: ['50%', '70%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              label: {
                show: true,
                position: 'center',
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            }
          },
          data: [
            { value: 500, name: '收入' },
            { value: 310, name: '支出' }
          ]
        }
      ]
    }

    const option3 = {
      title: {
        text: '交易走势图',
        subtext: '测试数据'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['小货车', '大货车', '零担']
      },
      toolbox: {
        show: true,
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '小货车',
          type: 'bar',
          data: [30054, 46666, 33333, 45656, 32314, 46665, 48998],
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          itemStyle: {
            normal: {
              color: '#c23531'
            }
          }
        },
        {
          name: '大货车',
          type: 'bar',
          data: [20323, 35465, 22345, 28945, 24545, 31456, 35456],
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          itemStyle: {
            normal: {
              color: '#4682B4'
            }
          }
        },
        {
          name: '零担',
          type: 'bar',
          data: [14012, 16666, 11999, 14444, 11555, 21165, 17884],
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          itemStyle: {
            normal: {
              color: '#20B2AA'
            }
          }
        }
      ]
    }

    const option4 = {
      title: {
                // text: '获取的ID分布情况',
                // subtext: '饼图：左：各层总ID数；右：各层净ID数'
      },
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        show: false,
        feature: {
                    // dataView: {show: true, readOnly: false},
                    // restore: {show: true},
          saveAsImage: { show: false }
        }
      },
      legend: {
        data: ['订单数', '订单金额'],
        orient: 'horizontal', // 'vertical'
        x: 'center', // 'center' | 'left' | {number},
        y: '-5px', // 'center' | 'bottom' | {number}
        backgroundColor: '#fff',
        padding: 5,    // [5, 10, 15, 20]
        itemGap: 5,
        textStyle: { color: 'ccc' }
      },
      grid: {
        left: '18%',
        right: '8%',
        top: '15%',
        bottom:'20%',
        shadowColor: 'red',               // 阴影颜色
        shadowOffsetX: 0,                 // 阴影水平方向上的偏移距离
        shadowOffsetY: 0,                 // 阴影垂直方向上的偏移距离
        shadowBlur: 10                    // 阴影的模糊大小
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ['小货车', '大货车', '零担', '总计']
      },
      series: [
        {
          name: '订单数',
          type: 'bar',
          data: [7999, 7601, 9366, 21762],
          itemStyle: {
            normal: {
              color: '#F56C6C'
            }
          }
        },
        {
          name: '订单金额',
          type: 'bar',
          data: [7999, 5325, 11246, 26393],
          itemStyle: {
            normal: {
              color: '#409EFF'

            }
          }
        }
      ]
    }
    const option5 = {
      title: {
                // text: '获取的ID分布情况',
                // subtext: '饼图：左：各层总ID数；右：各层净ID数'
      },
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        show: false,
        feature: {
                    // dataView: {show: true, readOnly: false},
                    // restore: {show: true},
          saveAsImage: { show: false }
        }
      },
      legend: {
        data: ['订单数', '订单金额'],
        orient: 'horizontal', // 'vertical'
        x: 'center', // 'center' | 'left' | {number},
        y: '-5px', // 'center' | 'bottom' | {number}
        backgroundColor: '#fff',
        padding: 5,    // [5, 10, 15, 20]
        itemGap: 5,
        textStyle: { color: 'ccc' }
      },
      grid: {
        left: '18%',
        right: '8%',
        top: '15%',
        bottom:'20%',
        shadowColor: 'red',               // 阴影颜色
        shadowOffsetX: 0,                 // 阴影水平方向上的偏移距离
        shadowOffsetY: 0,                 // 阴影垂直方向上的偏移距离
        shadowBlur: 10                    // 阴影的模糊大小
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ['小货车', '大货车', '零担', '总计']
      },
      series: [
        {
          name: '订单数',
          type: 'bar',
          data: [12234, 17601, 19366, 31762],
          itemStyle: {
            normal: {
              color: '#F56C6C'
            }
          }
        },
        {
          name: '订单金额',
          type: 'bar',
          data: [5999, 15325, 21246, 36393],
          itemStyle: {
            normal: {
              color: '#409EFF'

            }
          }
        }
      ]
    }
        // 为echarts对象加载数据
    myChart.setOption(option)
        // myChart2.setOption(option2)
    myChart3.setOption(option3)
    myChart4.setOption(option4)
    myChart5.setOption(option5)
    window.onresize = () => {
      myChart.resize({
        width: 'auto',
        height: 'auto'
      })
      myChart3.resize({
        width: 'auto',
        height: 'auto'
      })
      myChart4.resize({
        width: 'auto',
        height: 'auto'
      })
      myChart5.resize({
        width: 'auto',
        height: 'auto'
      })
    }
  }

}
</script>
<style lang="scss">
.wzlmain_content{
  padding: 15px 20px;
  height: 100%;
  // min-width: 1100px;
  // height: 100%;
  min-height: 666px;
  // background:rgb(235,235,235);
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow:hidden;
  .head_title{
    height: 40px ;
    line-height: 40px ;
    // overflow: hidden;
    border-radius: 5px;
    background: #ffff;
    box-sizing: border-box;
    // margin-bottom: 5px;
    // margin-bottom: 0.6%;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.10);
    h4{
      font-size: 16px;
      display: inline-block;
      margin-left:20px;
    }
    .head_list{
      position: relative;
      width: 100%;
      // width: 45%;
      height: 100%;
      text-align: right;
      // background:yellow;
      li{
        display: inline-block;
        min-width: 45px;
        text-align: center;
        
        white-space: nowrap;
        font-size: 14px;
        color:#333; /* 初始颜色 */
        cursor: pointer;
         box-sizing: border-box;
        // .el-range-editor.el-input__inner{
        //   // margin-left:10px !important;
        //   height:4%;
        //   line-height: 30px;
        //   // border:none;
        //   // position:relative;
        //   // position:absolute;
        // }
        // .el-date-editor .el-range__close-icon{
        //   // margin-top:-2%;
        //   position:absolute;
        //   right:10%;
        //   top:0%;
        // }
        // .el-date-editor .el-range__icon {
        //   display:none;
        // }
        // .el-date-editor .el-range-separator{
        //   line-height: 25px;
        // }
        .el-range-editor .el-range-input{
          margin-left:10px !important;
        }
      }
      // li:nth-child(6){
      //   width:40%;
      //   height: 100%;
      //   background: red;
      // }
      li:hover,li.active{
        color:#3e9ff1;
        transform: scale(1.4);
        
        // font-weight: bold;
      }
      li:nth-child(6):hover {
        transform: none;
      }
    }
  }
  .main_forthUl{
    margin-top:10px;
    background: #fff;
    padding: 15px 20px;
    margin-bottom: 10px;
    display: flex;
    width: 100%;
    min-height:215px;
    justify-content:space-between;
      overflow: hidden;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    // border-top-left-radius: 5px;
    // border-top-right-radius: 5px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.10);
    ul{
      flex: 1;
      box-sizing: border-box;
      // border: solid 1px #1790ff;
      // float: left;
      height: 185px;
      margin-right: 20px;
      box-shadow: 2px 2px 2px 2px rgba(0,0,0,.1);
      transition: color 4s ease;
      border-radius: 5px;
      flex-direction: column;
      display:flex;
      li{
        // line-height: 20px;
        // font-size: 13px;
        // // padding: 0 20px;
        // margin: 5px 0 ;
        // color:#fff;
        
        // flex:1;
        display: inline-block;
        // min-width: 318.41px;
        // text-align: center;
        // color:#Ffff;/* 初始颜色 */
        white-space: nowrap;
        font-size: 14px;
        cursor: pointer;
        box-sizing: border-box;
        padding-left: 15px;
        span{
          // color:#333;
          padding:0 10px;
          height:30px;
          line-height: 30px;
          color:red;
        }
        span:first-child{                                         
          // color: #333;
          // color:#c23531;
          width: 10%;
          text-align: right;
        }
        em{
            float:right;
        }
      }
      li:nth-child(1){
        position: relative;
        // padding: 20px 20px;
        padding-left:15px;
        font-size: 16px;
        font-weight: bold;
        margin: 0px;
        background-color: #6bc9eb;
        margin-bottom: 10px;
        height:40px;
        line-height:40px;
        border-radius: 5px 5px 0 0;
        color:#fff;
        span{
            color:red;
            font-size: 14px;
            padding:none;
            height:0px;
            line-height: 0px;
        }
      }
    }
    
    ul:last-child{
      margin-right: 0;
    }
    ul:hover{
      margin-top: -2px;
      cursor: pointer;
      box-sizing: border-box;
      transition: all 0.2s ease-out; 
      box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.40); 
      overflow: hidden;
      // color: red;
       color:#6bc9eb;
       font-weight: bold;
    }
  }
  .main_forthUl ul:hover {
    // border:1px solid #3e9ff1;
    cursor: pointer;
  }
  .main_forthUl ul:hover li span{
    font-weight: bold;
    color:#6bc9eb;
  }
  .main_forthUl ul:hover li:nth-child(1) span{
    font-weight: bold;
    color:#fff;
  }
  .main_forthUl ul:hover .el-icon-check{
      display: block;
      font-weight: bold;
  }
  .main_forthUl ul:hover .triangle_border_down{
      display: block;
  }
  .main_left{
      flex: 1;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.10);
        .ul_left{
            float: left;
            width: 74.6%;
            background:#fff;
            height:100%;
            box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.10);
        }
        .ul_right{
            width: 24.8%;
            float:right;
            height:100%;
            background: #fff;
            #main_lefttop{
                height: 100%;
                width: 100%;
            }
            #main_leftdown,#xiadan{
                height: 100%;
                width: 100%;

            }
            #main{
                height: 100%;
                // width: 100%;

            }

            #xiadan{
            }
        }
    }
  }
</style>

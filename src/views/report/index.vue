<template>
        <div class="report_content">
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
                <li>
                  <!-- <SelectTree multiple :multiple-limit="10"  v-model="orgId" :orgid="otherinfo.orgid" :filterable="false"></SelectTree> -->
                  <SelectTree multiple :multiple-limit="10" :filterable="false"></SelectTree>
                </li>
                
              </ul>
              
            </div>
            <el-row class="main_forthUl">
                <ul>
                    <li>总账 <span class="title_span">({{title}})</span>
                    </li>
                    <li>收入:<span>{{ thedata.amountCollect }}</span>元</li>
                    <li>支出:<span>{{ thedata.amountPay}}</span>元</li>
                </ul>
                <ul>
                    <li>
                        收入分布
                        <span class="title_span">({{title}})</span>
                        <!-- <i class="el-icon-check"></i> -->
                    </li>
                    <li>收入小计:<span>{{ totalIncome }}</span>元</li>
                    <li>已<i class="marginem"></i>收:<span>{{ thedata.amountReceivableFee }}</span>元</li>
                    <li>未<i class="marginem"></i>收:<span>{{ thedata.amountUnreceivableFee }}</span>元</li>
                </ul>
                <ul>
                    <li>
                        支出分布
                        <span class="title_span">({{title}})</span>
                        <!-- <i class="el-icon-check"></i> -->
                    </li>
                    <li>支出小计: <span class="marginleft">{{ totalpay }}</span>元</li>
                    <li>车<i class="marginem"></i>费: 已付<span>{{ thedata.hadPayCarFee }}</span>元，未付<span>{{thedata.unPayCarFee}}</span>元</li>
                    <li>中<i class="marginem"></i>转: 已付<span>{{ thedata.hadPayTransferFee }}</span>元，未付<span>{{thedata.unPayTransferFee}}</span>元</li>
                    <li>其<i class="marginem"></i>它: 已付<span>{{ thedata.hadPayOtherFee }}</span>元，未付<span>{{thedata.unPayOtherFee}}</span>元</li>
                </ul>
                <ul>
                    <li>
                        利润情况
                        <span class="title_span">({{title}})</span>
                        <!-- <i class="el-icon-check"></i> -->
                    </li>
                    <li class="profit-num"><i class="xdata"><span>{{ thedata.profit }}</span>元</i><i class="xline"></i><i class="xtip">毛利润</i></li>
                </ul>
            </el-row>
            <div class="main_left clearfix">
                <div class="ul_left" id="main"></div>
                <div class="ul_right">
                    <div class="databox datared">
                      <span class="dataico"><icon-svg icon-class="caiwugl1_yingshou" /></span>
                      <span class="databox-value">{{thedata.amountReceivableFee}}元</span>
                      <span class="databox-label">现金流入</span>
                    </div>
                    <div class="databox-line"></div>
                    <div class="databox datablue">
                      <span class="dataico"><icon-svg icon-class="caiwugl2_yingfu" /></span>
                      <span class="databox-value">{{thedata.amountPayableFee}}元</span>
                      <span class="databox-label">现金流出</span>
                    </div>
                    <div class="databox-line"></div>
                    <div class="databox datagreen">
                      <span class="dataico"><icon-svg icon-class="caiwu" /></span>
                      <span class="databox-value">{{ thedata.amountReceivableFee - thedata.amountPayableFee }}元</span>
                      <span class="databox-label">流水差</span>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import echarts from 'echarts'
// import { pickerOptions4 } from '@/utils/index'
import { pickerOptions4, tmsMath, pickerOptions } from '@/utils/index'
import SelectTree from '@/components/selectTree/index'
import { postHomedetail, getHomeYearDetail, getConsoleData, getConsoleChartData } from '@/api/index'
export default {
  components: {
    SelectTree
  },
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
      thedata: {
        'abnormalAddCent': '0.00%',
        'abnormalAddFee': 0, // 异动增款
        'abnormalSubFee': 0, // 异动减款
        'addComCent': '0.00%',
        'amountCollect': 0, // 运单总数
        'amountCent': '0.00%',
        'amountCollectCent': '0.00%',
        'amountPayCent': '0.00%',
        'amountVolume': 0, // 总体积
        'amountPay': 0, // 总重量
        'arriveComCent': '0.00%',
        'arrivePayCent': '0.00%',
        'hadPayCarFee': 0, // 到付
        'brokerageComCent': '0.00%',
        'brokerageFee': 0, // 回扣
        'collectFee': 0, // 总收入
        'creatTime': null, // 开单时间
        'lineArrive': 0, // 干线到车总数
        'lineArriveCent': '0.00%',
        'lineComCent': '0.00%',
        'lineFee': 0, // 干线费
        'amountUnreceivableFee': 0, // 干线发车总数
        'amountUnreceivableFeeCent': '0.00%',
        'monthComCent': '0.00%',
        'monthPayCent': '0.00%',
        'hadPayOtherFee': 0, // 月结
        'nowComCent': '0.00%',
        'nowPayCent': '0.00%',
        'nowPayFee': 0, // 现付
        'orgid': 0, // 归属网点
        'otherComCent': '0.00%',
        'otherFee': 0, // 其他费
        'payFee': 0, // 总支出
        'receiptComCent': '0.00%',
        'receiptPayCent': '0.00%',
        'hadPayTransferFee': 0, // 回单付
        'sendComCent': '0.00%',
        'sendFee': 0, // 送货费
        'amountReceivableFee': 0, // 短驳到车总数
        'amountReceivableFeeCent': '0.00%',
        'shortComCent': '0.00%',
        'shortFee': 0, // 短驳费
        'shortSend': 0, // 短驳发车总数
        'shortSendCent': '0.00%',
        'subComCent': '0.00%',
        'type': null, // 数据类型：0,短驳发车；1，短驳到车；2，干线发车；3，干线到车
        'volume': 0, // 体积
        'volumeCent': '0.00%',
        'week': 0, // 星期几
        'weight': 0, // 重量
        'weightCent': '0.00%',
        profit: '0',
        'id': null,
        amountPayableFee: '0',
        unPayTransferFee: 0,
        unPayOtherFee: 0,
        unPayCarFee: 0
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
  computed: {
    totalIncome() {
      return tmsMath.add(this.thedata.amountReceivableFee, this.thedata.amountUnreceivableFee).result()
    },
    totalpay() {
      const data = this.thedata
      return tmsMath.add(data.hadPayCarFee, data.unPayCarFee, data.hadPayTransferFee, data.unPayTransferFee, data.hadPayOtherFee, data.unPayOtherFee).result()
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
      this.getData()
    },
    getData() {
      /**
       *
      *选择的日期周期(0:今天；1：昨天；2：本周；3：本月； 4：本年；5：自定义；
      private Integer buttonKey;
        */
      const data = Object.assign({}, this.searchQuery.vo)
      data.orgAllId = this.orgId.join(',')
      // 临时测试数据
      data.orgAllId = this.orgId.map((res, index) => {
        return (index + 1)
      }).join(',')
      data.buttonKey = this.currentkey
      getConsoleData(data).then(res => {
        const data = res.data
        if (data) {
          for (const i in data) {
            if (data[i] === null || data[i] === '') {
              data[i] = 0
            }
          }
          this.thedata = data
          // this.setInChart()
          // this.setCompareChart()
        }
      }).catch(err => {
        this.currentkey = ''
        this.$message.warning('查不到相关数据。')
      })
    },
    initYearChart(echart, shipArr, volumeArr) {
      const option3 = {
        title: {
          text: '收支走势',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // selectedMode: 'single',
          selected: {
            '收入': true,
            '支出': true
          },
          data: ['收入', '支出']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: false, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            // '2018年\n\r1月'
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '收入',
            type: 'line',
            smooth: true,
            itemStyle: { normal: { color: '#FF7F50', areaStyle: { type: 'macarons', color: '#FF7F50' }}},
            // data: [2.0, 4.9, 7.0, 0, 25.6, 76.7, 135.6, 162.2, '', '', '', ''],
            data: shipArr,
            markPoint: {
              data: [
                      { type: 'max', name: '最大值' },
                      { type: 'min', name: '最小值' }
              ]
            }
          },
          {
            name: '支出',
            type: 'line',
            smooth: true,
            itemStyle: { normal: { color: '#5AB1EF', areaStyle: { type: 'macarons', color: '#5AB1EF' }}},
            // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 0, 0, 0, 0],
            data: volumeArr,
            markPoint: {
              data: [
                      { type: 'max', name: '最大值' },
                      { type: 'min', name: '最小值' }
              ]
            }
          }
        ]
      }
      echart.hideLoading()
      echart.setOption(option3)
    }
  },
  mounted() {
    this.dataset = this.pickerOptions3.shortcuts
    // 默认展示今天的数据
    this.currentkey = 0
    // this.orgId = [this.otherinfo.orgid]

   //  this.searchForm = this.
    var myChart3 = echarts.init(document.getElementById('main'))
    window.onresize = () => {
      myChart3.resize({
        width: 'auto',
        height: 'auto'
      })
    }
   // 获取年度运力数据
    myChart3.showLoading()
    getHomeYearDetail().then(data => {
      data = data || []
      const monthArr = []
      const shipArr = []
      const weightArr = []
      const volumeArr = []
      data.map(el => {
        shipArr.push(el.amountCollect)
        weightArr.push(el.amountPay)
      })
      this.initYearChart(myChart3, shipArr, weightArr)
    }).catch(err => {
      console.log('fetch err info:', err)
      const shipArr = [2.0, 4.9, 7.0, 10, 25.6, 76.7, 135.6, 162.2, '', '', '', '']
      const weightArr = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 0, 0, 0, 0]
      const volumeArr = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 0, 0, 0, 0]
      this.initYearChart(myChart3, shipArr, weightArr, volumeArr)
    })
    // 为echarts对象加载数据
    // myChart.setOption(option)
    // myChart2.setOption(option2)
  }
}
</script>
<style lang="scss">
.report_content{
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
      // width: 100%;
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
        //   height:6%;
        //   line-height: 40px;
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
      li:nth-child(7):hover {
        transform: none;
      }
    }
  }
  .databox{
    position: relative;
    // height: 31%;
    color: #fff;
    padding-right: 20px;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all .2s ease;
    height:31.3%;
    flex:1;
    border-radius: 8px;
    &:hover{
      box-shadow: 0 3px 10px rgba(0,0,0,.3);
    }
    .dataico{
      position: absolute;
      left:20px;
      top: 50%;
      margin-top: -35px;
      font-size: 70px;
      opacity: 0.2;
    }

    .databox-value{
      font-size: 48px;
      margin-bottom: 10px;
      display: block;
    }
    .databox-label{
      font-size: 16px;
      color: #fff;
      color: rgba(255,255,255,.6);
    }
  }
  .datablue{
    background: #409EFF;
  }
  .datared{
    background: #F56C6C;
  }
  .datagreen{
    background: #67C23A;
  }
  .databox-line{
    height: 3.1%;
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
      li.profit-num{
        text-align: center;
        line-height: 1.5;
        

        .xdata{
          span{
            font-size: 36px;
            max-width: 7em;
            white-space: nowrap;
            display: inline-block;
            line-height: 130px;
          }
        }
        .xline{
          height: 60px;
          width: 1px;
          background: #999;
          display: inline-block;
          margin: 0 5px;
          transform: rotate(15deg) translate(7px,15px);
          display: none;
        }
        .xtip{
          position: absolute;
          bottom: 12%;
          right: 3%;
          color: #ef0000;
        }
        i{
          font-style: normal;
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
            // #main_lefttop{
            //     height: 100%;
            //     width: 100%;
            // }
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

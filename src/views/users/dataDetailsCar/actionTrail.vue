<template>
    <div class="actionTrail detailsArrange" v-loading="loading">
        <!-- 交易行为 -->
        <div class="zizhiInfo-collapse collapseInfo">
            <h2>交易行为</h2>
            <div class="topFive">
                <div class="topFive_route">
                    <div class="topFive_route_title clearfix">
                        <h6 class="fl">TOP5交易线路</h6>
                        <ul class="fl clearfix classfyTitle">
                            <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index)">{{item.name}}</li>
                        </ul>
                    </div>
                    <div class="essentialInformation_table">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="date"
                            label="序号"
                            width="60">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="始发片区"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="次数">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="目的片区">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="次数">
                            </el-table-column>
                        </el-table>
                    </div> 
                </div>
                <div class="topFive_shipper">
                    <div class="topFive_route_title clearfix">
                        <h6 class="fl">TOP5交易货主</h6>
                        <ul class="fl clearfix classfyTitle">
                            <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index)">{{item.name}}</li>
                        </ul>
                    </div>
                    <div class="essentialInformation_table">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="date"
                            label="序号"
                            width="60">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="交易次数">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="付款方式">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>

        <!-- 交易概况 -->
        <div class="detailsInfo-collapse collapseInfo">
            <h2>交易概况</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="付款方式"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="抢单次数"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="中单次数（转化率）">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="线上交易次数">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="线下交易次数">
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 事实轨迹 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>事实轨迹</h2>
            <div class="Amap">
                <DriverTrack></DriverTrack>
            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import { closest } from '@/utils/index'
import DriverTrack from '@/components/baiduTrack/index'

export default {
  name: 'actionTrail',
  components: {
      Pager,
      DriverTrack
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }

  }, 
  data() {
    return {
        size:[20,30,50],
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        defaultImg45:'/static/45du.png',
        defaultImgCarCard:'/static/carcard.png',
        defaultImgDriverCard:'/static/drivercard.png',
        defaultImgIdCard:'/static/idcard.png',
        defaultImgGeRen:'/static/geren.png',
        listInformation: [],
        dataType:[
            {name:'全部',iscur:true},
            {name:'近7天',iscur:false},
            {name:'近30天',iscur:false},
            {name:'近90天',iscur:false},
        ],
        page:1,
        pagesize:20,
        totalCount:100,
        loading: false,
        dialogVisible: false,
        currentOrderSerial: '',
           tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
  },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.init()
                }
            },
            immediate: true
        },
    },
     mounted() {
        // console.log(this.$route)
    },
    methods: {
        init() {
        
        },
        shuaxin() {
            this.init()
        },
        handlerClick() {
            this.currentOrderSerial = this.$route.query.orderSerial
            this.dialogVisible = true
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        setCur(index){
            console.log(index)
            this.dataType.forEach((el,idx)=>{
                console.log(idx)
                idx == index ? el.iscur = true : el.iscur = false;
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .actionTrail{
        .collapseInfo{
            .topFive{
                display: flex;
                .topFive_route,.topFive_shipper{
                    flex: 1;
                    .topFive_route_title{
                        h6{
                            margin-right: 80px;
                            font-size: 14px;
                            line-height: 40px;
                        }
                    }
                }
                .topFive_route{
                    margin-right: 20px;
                }
            }
            .Amap{
                width: 100%;
                height:  852px;
                padding: 10px 0 20px;
            }
           
        }
    }
</style>

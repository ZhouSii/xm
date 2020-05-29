<template>
    <div class="ordersInfo detailsArrange" v-loading="loading">
        <!-- 业务关系 -->
        <div class="xxgy-collapse collapseInfo">
            <h2>业务关系</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">注册渠道：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">注册时间：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">所属片区：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">组长名称：</el-col>
                    <el-col :span="3">1</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">所属客服人员：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">客服归属时间：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">客服所属业务组别：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">所属商圈：</el-col>
                    <el-col :span="3">1</el-col>

                    <!-- 第三行 -->
                    <el-col :span="3">所属业务人员：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">业务归属事件：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">注册地：</el-col>
                    <el-col :span="9">1</el-col>

                    <!-- 第四行 -->
                    <el-col :span="3">业务所属组别：</el-col>
                    <el-col :span="3">1</el-col>
                    <el-col :span="3">组长名称：</el-col>
                    <el-col :span="15">1</el-col>
                </el-row>
            </div>
        </div>
        <!-- 关系变更记录 -->
        <div class="qd-collapse collapseInfo">
            <h2>关系变更记录</h2>
            <div class="essentialInformation_table" >
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="变更时间">
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="变更类型"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="原纪录"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="现记录">
                    </el-table-column>
                </el-table>
                <!-- <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination> -->
            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'

export default {
  name: 'ordersInfo',
  components: {
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
    .ordersInfo{
        .collapseInfo{
            .qd-collapse_title{
                padding: 20px 0;
            }
        }
    }
</style>

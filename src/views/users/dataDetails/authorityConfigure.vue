<template>
    <div class="authority detailsArrange" v-loading="loading">
        <!-- 基础权益 -->
        <div class="authorityBasic-collapse collapseInfo">
            <h2>基础权益</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="4">发单功能：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">可用车型：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">发单数量限制：</el-col>
                    <el-col :span="4">1</el-col>

                    <!-- 第二行 -->
                    <el-col :span="4">月结权益：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">可月结金额上限：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">拦截结束时间：</el-col>
                    <el-col :span="4">1</el-col>

                    <!-- 第三行 -->
                    <el-col :span="4">推单拦截：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">拦截开始时间：</el-col>
                    <el-col :span="4">1</el-col>
                    <el-col :span="4">操作人员：</el-col>
                    <el-col :span="4">1</el-col>
                </el-row>
            </div>
        </div>
        <!-- 绑定车主 -->
        <div class="bindCar-collapse collapseInfo">
            <h2>绑定车主</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="driverShipperData"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (driverObj.currentPage - 1) * driverObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    prop="date"
                    label="车主账号"
                    >     
                        <template slot-scope="scope">
                            {{scope.row.driverPhone ? scope.row.driverPhone :''}}{{scope.row.driverName ? '/'+scope.row.driverName :''}}{{scope.row.carTypeName ? '/'+scope.row.carTypeName :''}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="bindingStartDate"
                    label="绑定开始时间"
                    >
                        <!-- <template slot-scope="scope">
                            {{ scope.row }}
                        </template> -->
                    </el-table-column>
                    <el-table-column
                    prop="bindingEndDate"
                    label="绑定结束时间">
                        <!-- <template slot-scope="scope">
                            {{ scope.row }}
                        </template> -->
                    </el-table-column>
                    <el-table-column
                    width="180"
                    prop="usingStatus"
                    label="状态">
                        <template slot-scope="scope">
                            {{ scope.row.usingStatus == 1 ? '启用': '禁用' }}
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeDriver"
                    :page-sizes="size"
                    layout="total,prev, pager, next, jumper"
                    :total="driverTotalCount">
                </el-pagination>
            </div>
        </div>
        <!-- 营销权益 -->
        <!-- <div class="legalInfo-collapse collapseInfo">
            <h2>营销权益</h2>
            <div class="authority_legal">
                <ul class="lengandInfo">
                    <li>货主优惠等级：<span>{{equityConfigDto.discountLevel}}</span></li>
                    <li>剩余优惠金：<span>{{equityConfigDto.rewardBalance}}</span></li>
                    <li>优惠券：<span>{{equityConfigDto.coupon}}</span></li>
                    <li>优惠金：<span>{{equityConfigDto.reward}}</span></li>
                </ul>
            </div>
            <div class="essentialInformation_table_title">
                <ul>
                   <li v-for="(item,index) in serviceType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index)">{{item.name}}</li>
                </ul>
            </div>
            <div class="essentialInformation_table" style="padding-top:1px;">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="车辆类型"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="订单金额范围"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    width="180"
                    label="一天限量">
                    </el-table-column>
                </el-table>
            </div>
        </div> -->
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import { closest } from '@/utils/index'
import { aflcDriverShipperList,aflcEquityConfigDto } from '@/api/users/shipperDetails/index.js'

export default {
  name: 'authority',
  components: {
      Pager
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
        serviceType:[
            {name:'小货车',iscur:true},
            {name:'发物流',iscur:false},
            {name:'大货车',iscur:false},
        ],
        driverObj:{//绑定车主列表条件
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "shipperId": "",
            }
        },
        driverShipperData:[],//绑定车主列表
        driverTotalCount:0,//默认绑定车主列表数量
        equityConfigDto:{},//营销权益等级说明
        page:1,
        pagesize:20,
        totalCount:100,
        loading: false,
        dialogVisible: false,
        currentOrderSerial: '',
      }
  },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.init()
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        },
    },
     mounted() {
        // console.log(this.$route)
    },
    methods: {
        init() {
            let userId = this.$route.query.userId;
            this.driverObj.vo.shipperId = userId;
            this.DriverShipperList();
            this.EquityConfigDto(userId);
        },
        //绑定车主列表
        DriverShipperList(){
            aflcDriverShipperList(this.driverObj).then(res => {
                this.driverShipperData = res.data.list;
                this.driverTotalCount = res.data.totalCount;
            })
        },
        //绑定车主列表分页
        handleCurrentChangeDriver(val){
            this.driverObj.currentPage = val;
            this.DriverShipperList();
        },
        EquityConfigDto(userId){
            aflcEquityConfigDto(userId).then(res => {
                this.equityConfigDto = res.data;
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        setCur(index){
            console.log(index)
            this.serviceType.forEach((el,idx)=>{
                console.log(idx)
                idx == index ? el.iscur = true : el.iscur = false;
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .authority{
        .collapseInfo{
            .essentialInformation_table_title{
                ul{
                    overflow: hidden;
                    li{
                        float: left;
                        font-size: 16px;
                        line-height: 44px;
                        background: #d9d9d9;
                        color: #ffffff;
                        width: 120px;
                        text-align: center;
                        margin-right: 1px;
                        cursor: pointer;
                    }
                    .currentClick{
                        background: #1890ff;
                    }
                }
            }
           
        }
    }
</style>

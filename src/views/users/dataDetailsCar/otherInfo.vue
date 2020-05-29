<template>
    <div class="ordersInfo detailsArrange" v-loading="loading">
        <!-- 绑定货主 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>绑定货主</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data="DriverShipperData">
                    <el-table-column label="序号"  width="60">
                    <template slot-scope="scope">
                            {{ (DriverShipperObj.currentPage - 1) * DriverShipperObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="货主账号" >
                        <template slot-scope="scope">
                            {{scope.row.shipperName}} - {{scope.row.shipperPhone}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="bindingStartDate" label="绑定开始时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bindingEndDate" label="绑定结束时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="状态" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.usingStatus=='1'?'启用':'禁用'}}
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeGrap"
                    layout="total, prev, pager, next, jumper"
                    :total="DriverShipperTotalCount">
                </el-pagination>
            </div>
        </div>

        <!-- 设备号管理 -->
        <!-- <div class="logInfo-collapse collapseInfo">
            <h2>设备号管理</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" >
                    <el-table-column prop="" label="序号" ></el-table-column>
                    <el-table-column prop="" label="设备号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="客户端" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="手机型号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="最后一次登陆时间" show-overflow-tooltip></el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeGrap"
                    layout="total, prev, pager, next, jumper"
                    :total="grapListTotalCount">
                </el-pagination>
            </div>
        </div> -->

        <!-- 登陆记录 -->
        <!-- <div class="logInfo-collapse collapseInfo">
            <h2>登陆记录</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" >
                    <el-table-column prop="" label="序号" ></el-table-column>
                    <el-table-column prop="" label="登陆地点" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="设备号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="客户端" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="手机型号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="最后一次登陆时间" show-overflow-tooltip></el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeGrap"
                    layout="total, prev, pager, next, jumper"
                    :total="grapListTotalCount">
                </el-pagination>
            </div>
        </div> -->

        <!-- 登陆记录 -->
        <!-- <div class="logInfo-collapse collapseInfo">
            <h2>登陆记录</h2>
            <div class="essentialInformation_table">
                
            </div>
        </div> -->

    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import {  aflcDriverShipperList } from '@/api/users/carDetails/index.js'
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
        loading: true,
        DriverShipperData:[],//绑定货主列表
        DriverShipperTotalCount:0,//绑定货主总数
        DriverShipperObj:{
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "driverId": this.$route.query.driverId,
            }
        }
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
         
    },
    methods: {
        init() {
            this.DriverShipper()
        },
        DriverShipper(){
            this.loading = true
            aflcDriverShipperList(this.DriverShipperObj).then(res=>{
                this.DriverShipperTotalCount = res.data.totalCount
                this.DriverShipperData = res.data.list
                this.DriverShipperData.forEach(item => {
                    item.bindingStartDate = parseTime(item.bindingStartDate,"{y}-{m}-{d} {h}:{i}:{s}");
                    item.bindingEndDate = parseTime(item.bindingEndDate,"{y}-{m}-{d} {h}:{i}:{s}");
                })
                this.loading = false
            })
        },
        handleCurrentChangeGrap(val){
        this.DriverShipperObj.currentPage = val
        this.DriverShipper()
        }
    }
}
</script>


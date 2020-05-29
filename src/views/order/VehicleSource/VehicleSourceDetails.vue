<template>
    <div class="vehiclSourceDetails clearfix" v-loading="loading">
        <!-- 基本信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>基础信息</h2>
            <el-row class="essentialInformation">
                <!-- <p>
                    <span>车源编号:</span>
                    <span>1</span>
                </p>
                <p>
                    <span>所属区域:</span>
                    <span>1</span>
                </p>
                 <p>
                    <span>车主账号:</span>
                    <span>1</span>
                </p>
                <p>
                    <span>车主名字:</span>
                    <span>1</span>
                </p> -->
                <el-col :span="2">车源编号：</el-col>
                <el-col :span="4">{{listInformation.carSourceNo ? listInformation.carSourceNo : '/'}}</el-col>
                <el-col :span="2">所属区域：</el-col>
                <el-col :span="4">{{listInformation.driverBelongCityName ? listInformation.driverBelongCityName : '/'}}</el-col>
                <el-col :span="2">车主账号：</el-col>
                <el-col :span="4">{{listInformation.phone ? listInformation.phone : '/'}}</el-col>
                <el-col :span="2">车主名字：</el-col>
                <el-col :span="4">{{listInformation.belongDriver ? listInformation.belongDriver : '/'}}</el-col>
            </el-row>
            <el-row class="essentialInformation">
                <!-- <p>
                    <span>车牌号:</span>
                    <span>1</span>
                </p>
                <p>
                    <span>车型:</span>
                    <span>1</span>
                </p>
                 <p>
                    <span>最大载重:</span>
                    <span>1</span>
                </p>
                <p>
                    <span>最大容量:</span>
                    <span>1</span>
                </p> -->
                <el-col :span="2">车牌号：</el-col>
                <el-col :span="4">{{listInformation.carNum ? listInformation.carNum : '/'}}</el-col>
                <el-col :span="2">车型：</el-col>
                <el-col :span="4">{{listInformation.carTypeName ? listInformation.carTypeName : '/'}}</el-col>
                <el-col :span="2">最大载重：</el-col>
                <el-col :span="4">{{listInformation.maxCapacityTon ? listInformation.maxCapacityTon : '/'}} 吨</el-col>
                <el-col :span="2">最大容量：</el-col>
                <el-col :span="4">{{listInformation.maxCapacitySquare ? listInformation.maxCapacitySquare : '/'}} 方</el-col>
            </el-row>
             <el-row class="essentialInformation">
                <el-col :span="2">常驻地：</el-col>
                <el-col :span="4">{{listInformation.usualPlace ? listInformation.usualPlace : '/'}}</el-col>
            </el-row>
        </div>
        <!--  车源信息 -->
        <div class="mark-collapse collapseInfo">
            <h2>车源信息</h2>
            <el-row class="essentialInformation">
                <!-- <p>
                    <span>出发地:</span>
                    <span>1</span>
                </p>
                <p>
                    <span>目的地:</span>
                    <span>1</span>
                </p>
                 <p>
                    <span>发布时间:</span>
                    <span>1</span>
                </p>
                <p>
                    <span>车源状态:</span>
                    <span>1</span>
                </p> -->
                <el-col :span="2">出发地：</el-col>
                <el-col :span="4">{{listInformation.strartAddress ? listInformation.strartAddress : '/'}}</el-col>
                <el-col :span="2">目的地：</el-col>
                <el-col :span="4">{{listInformation.endAddress ? listInformation.endAddress : '/'}}</el-col>
                <el-col :span="2">发布时间：</el-col>
                <el-col :span="4">{{listInformation.createTime | parseTime}}</el-col>
                <el-col :span="2">车源状态：</el-col>
                <el-col :span="4">{{listInformation.carInfoStateName ? listInformation.carInfoStateName : '/'}}</el-col>
            </el-row>
            <el-row class="essentialInformation">
                <!-- <p>
                    <span>车源来源:</span>
                    <span>1</span>
                </p>
                <p>
                    <span>车源类型:</span>
                    <span>1</span>
                </p>
                 <p>
                    <span>车源有效期:</span>
                    <span>1</span>
                </p>
                <p>
                    <span>发车时间:</span>
                    <span>1</span>
                </p> -->
                <el-col :span="2">车源来源：</el-col>
                <el-col :span="4">{{listInformation.carInfoFromName ? listInformation.carInfoFromName : '/'}}</el-col>
                <el-col :span="2">车源类型：</el-col>
                <el-col :span="4">{{listInformation.carSourceTypeName ? listInformation.carSourceTypeName : '/'}}</el-col>
                <el-col :span="2">车源有效期：</el-col>
                <el-col :span="4">{{listInformation.isLongCarName ? listInformation.isLongCarName : '/'}}</el-col>
                <el-col :span="2">发车时间：</el-col>
                <el-col :span="4">
                    <span v-if= "listInformation.startTime">{{listInformation.startTime | parseTime}}</span>
                    <span v-else>随时</span>
                </el-col>
            </el-row>
            <el-row class="essentialInformation">
                <!-- <p>
                    <span>车辆规格:</span>
                    <span>1</span>
                </p>
                <p>
                    <span>可载重:</span>
                    <span>1</span>
                </p> -->
                <el-col :span="2">车辆规格：</el-col>
                <el-col :span="4">{{listInformation.carSpecName ? listInformation.carSpecName : '/'}}</el-col>
                <el-col :span="2">可载重：</el-col>
                <el-col :span="4">{{listInformation.carLoad ? listInformation.carLoad : '/'}} 吨</el-col>
                <el-col :span="2">期望运价：</el-col>
                <el-col :span="4">{{listInformation.expectPrice ? '￥'+listInformation.expectPrice : '价格面议'}}</el-col>
            </el-row>
            <el-row class="essentialInformation">
                <!-- <p style="width:100%;">
                    <span>备注说明:</span>
                    <span>1</span>
                </p> -->
                <el-col :span="2">备注说明：</el-col>
                <el-col :span="22">{{listInformation.remark}}</el-col>
            </el-row>
        </div>
        <div class="mark-collapse collapseInfo">
            <h2> 
                客服备注
                <el-button icon="el-icon-circle-plus" @click="handlerClick('remark')"  type="primary" size="mini" plain>添加备注</el-button>
            </h2>
            <div v-if="listInformation.carInfoCustsvcList.length != 0">
                <div class="essentialInformation_remake" v-for="(item,key) in listInformation.carInfoCustsvcList" :key="key">
                    <p>由 <span>{{item.operateUserName}}</span> 更新于 <span>{{item.createTime | parseTime}}</span></p>
                    <div>{{item.remark}}</div>
                </div>
            </div>
            <div class="essentialInformationNull" v-else>
                <img src="../../../assets/icom/25xinxi.png" alt="">
                <span>客服未备注!</span>
            </div>
        </div>
        <remarkerInfo :dialogVisible.sync="dialogVisible" :carInfoId = "currentCarInfoId"   @close = "shuaxin"/>
    </div>
</template>

<script>

import { vehicleSourceDetails,vehicleSourceRemarks } from '@/api/order/vehicleSource.js'
import remarkerInfo from './remakInfo'

export default {
  name: 'vehiclSourceDetails',
  components: {
    remarkerInfo,
  },
  props: {
   
  },
  data() {
    return {
        listInformation: {
            carInfoCustsvcList:[]
        },
        // remakrArr:[],
        loading: false,
        dialogVisible: false,
        currentCarInfoId: '',
      }
  },
  watch: {
      
  },
  mounted() {
      this.init();
  },
  methods: {
    init() {
        this.loading = true;
        const sourceId = this.$route.query.sourceID;
        // Promise.all([vehicleSourceDetails(sourceId),vehicleSourceRemarks(sourceId)]).then( resArr => {
        Promise.all([vehicleSourceDetails(sourceId)]).then( resArr => {
            this.listInformation = resArr[0].data;
            // this.remakrArr = resArr[1].data;
            this.loading = false;
        }).catch(err => {
            this.$message({
                type: 'info',
                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
            })
            this.loading = false
        })
      },
    shuaxin() {
        this.init()
      },
    handlerClick(type) {
        switch(type){
            case 'remark':
                this.currentCarInfoId = this.listInformation.id;
                this.dialogVisible = true;
                break;
        }
      },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .vehiclSourceDetails{
        padding-top:12px; 
        background: #fafeff;
        height: 100%;
        .collapseInfo{
            border: 1px solid #e2e2e2;
            box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
            background: #ffffff;
            color: #333;
            padding: 0 24px;
            padding-bottom: 10px;
            margin-bottom: 12px;
            h2{
                font-size: 16px;
                line-height: 20px;
                padding: 19px 0 10px 0;
                // border-bottom: 1px solid #e2e2e2; 
            }
            .essentialInformation{
                font-size: 14px;
                margin: 5px;
                .el-col{
                    line-height: 30px;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                    overflow:hidden;
                }
                .el-col:nth-child(2n){
                    text-align: left;
                    padding-left: 10px;
                }
                .el-col:nth-child(2n-1){
                    text-align: right;
                    // min-width: 70px;
                }
            }
            .essentialInformation_remake{
                padding: 20px 0 20px 20px;
                border-bottom:1px solid  #ccc;
                p,div{
                    line-height: 30px;
                }
                p{
                    font-size: 16px;
                    span{
                        color:#169BD5;
                    }
                }
                div{
                    margin-left: 50px;
                    font-size: 14px;
                }
            }
            .essentialInformationNull{
                font-size: 14px;
                font-weight: bold;
                margin: 20px;
                padding-left: 40%;
                img{
                    vertical-align: middle;
                }
                span{
                    margin-left: 10px;
                    vertical-align: middle;
                }
            }
        }
        .mark-collapse{
            h2{
                position: relative;
                .el-button{
                    position: absolute;
                    right: 0;
                    bottom:8px;
                }
            }
        }
    }
</style>

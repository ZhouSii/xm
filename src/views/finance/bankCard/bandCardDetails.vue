<template>
    <div class="bandCardDetails clearfix" v-loading="loading">
        <!-- 用户信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>用户信息</h2>
            <el-row class="essentialInformation">
                <el-col :span="2">账户类型：</el-col>
                <el-col :span="4">{{listInformation.userType=='0'?'车主':'货主'}}</el-col>
                <el-col :span="2">账号：</el-col>
                <el-col :span="4">{{listInformation.mobile}}</el-col>
                <el-col :span="2">名字：</el-col>
                <el-col :span="4">{{listInformation.name}}</el-col>
            </el-row>
        </div>
        <!--  银行卡信息 -->
        <div class="mark-collapse collapseInfo">
            <h2>银行卡信息</h2>
            <el-row class="essentialInformation">
                <el-col :span="2">绑定时间：</el-col>
                <el-col :span="4">{{listInformation.bindTime | parseTime}}</el-col>
                <el-col :span="2">绑定状态：</el-col>
                <el-col :span="4">{{listInformation.bindStatusName}}</el-col>
                <el-col :span="2">开户人：</el-col>
                <el-col :span="4">{{listInformation.openAccountName}}</el-col>
                <el-col :span="2">预留电话：</el-col>
                <el-col :span="4">{{listInformation.reservedTelephone}}</el-col>
            </el-row>
            <el-row class="essentialInformation">
                <el-col :span="2">开户城市：</el-col>
                <el-col :span="4">{{listInformation.openAccountCity}}</el-col>
                <el-col :span="2">开户银行：</el-col>
                <el-col :span="4">{{listInformation.openAccountBank}}</el-col>
                <el-col :span="2">银行卡号：</el-col>
                <el-col :span="4">{{listInformation.cardNumView}}</el-col>
                <el-col :span="2">银行卡真实性：</el-col>
                <el-col :span="4">
                     <el-select v-model="listInformation.validateStatus" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in validateStatusList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled"
                            >
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row class="essentialInformation">
                <el-col :span="2">银行卡持有人：</el-col>
                <el-col :span="4">
                    <el-select v-model="listInformation.isCardHolder" placeholder="请选择" clearable >
                        <el-option
                            v-for="item in isCardHolderList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled"
                            >
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row class="essentialInformation">
                <el-col :span="2">银行卡图片：</el-col>
                <el-col :span="22">
                     <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                    <img :src="listInformation.cardPhoto" class="CardImg" v-viewer>
                     </el-tooltip>
                </el-col>
            </el-row>
            <el-row class="essentialInformation">
                <el-col :span="24" style="text-align:center">
                    <el-button icon="el-icon-success"  type="primary" size="mini" plain @click="formUpdata">确定</el-button>
                    <el-button icon="el-icon-error"  type="primary" size="mini" plain @click="shuaxin" style="margin-left:20px">取消</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="mark-collapse collapseInfo">
            <h2>
                客服备注
                <el-button icon="el-icon-circle-plus" @click="handlerClick()"  type="primary" size="mini" plain>添加备注</el-button>
            </h2>
            <div v-if="listInformation.bankCardCustsvcs">
            <div v-if="listInformation.bankCardCustsvcs.length > 0">
                <div class="essentialInformation_remake" v-for="(item,key) in listInformation.bankCardCustsvcs" :key="key">
                    <p>由 <span>{{item.creater}}</span> 更新于 <span>{{item.createTime | parseTime}}</span></p>
                    <div>{{item.remark}}</div>
                </div>
            </div>
            <div class="essentialInformationNull" v-else>
                <img src="../../../assets/icom/25xinxi.png" alt="">
                <span>客服未备注!</span>
            </div>
            </div>
        </div>
        <bandCardRemark :dialogVisible.sync="dialogVisible" :MarkObject = "MarkObject"   @close = "shuaxin"/>
    </div>
</template>

<script>

import  { aflcBankCard, aflcBankCardCustsvcAdd,aflcBankCardUpdate } from '@/api/finance/bankCard.js'
import  { getDictionary } from '@/api/common.js'
import bandCardRemark from './bandCardRemark'
import { parseTime } from '@/utils/'
export default {
  name: 'vehiclSourceDetails',
  components: {
      bandCardRemark,
  },
  props: {
   
  },
  data() {
    return {
        validateStatusList:[],
        isCardHolderList:[],
        listInformation: {},
        loading: false,
        dialogVisible: false,
        MarkObject:{
            bankCardId:'',
            accountId: '',
        }
      }
  },
  mounted() {
      this.init()
      this.getDataList()
  },
  methods: {
    init() {
     aflcBankCard(this.$route.query.Id).then(res=>{
         this.listInformation = res.data
         this.MarkObject={
            bankCardId:this.$route.query.Id,
            accountId: res.data.accountId
        }
     })
    },
    getDataList(){
    getDictionary('AF01306').then(res=>{
      this.isCardHolderList = res.data
    })
    getDictionary('AF01305').then(res=>{
      this.validateStatusList = res.data
    })
    },
    shuaxin() {
        this.init()
    },
    handlerClick() {
        this.dialogVisible = true;
    },
    formUpdata(){
        aflcBankCardUpdate({validateStatus:this.listInformation.validateStatus,isCardHolder:this.listInformation.isCardHolder,id:this.$route.query.Id}).then(res=>{
           this.$message.success('修改成功')
        }).catch(err=>{
           this.$message.error('修改失败')
        })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .bandCardDetails{
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
            }
            .essentialInformation{
                font-size: 14px;
                margin: 5px;
                .el-col{
                    line-height: 30px;
                    min-height: 30px;
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
                }
                .el-input__inner{
                height: 30px;
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
            .CardImg{
                width: 300px;
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

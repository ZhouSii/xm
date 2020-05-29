<template>
    <div class="detailsInfo detailsArrange" v-loading="loading">
        <!-- 基本信息 -->
        <div class="detailsInfo-collapse collapseInfo">
            <h2>概要信息</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">注册日期：</el-col>
                    <el-col :span="3">{{shipperInformation.registerTime | parseTime}}</el-col>
                    <el-col :span="3">注册渠道：</el-col>
                    <el-col :span="3">{{shipperInformation.registerOriginName}}</el-col>
                    <el-col :span="3">已加入天数：</el-col>
                    <el-col :span="3">{{shipperInformation.existTime ? shipperInformation.existTime : 1}}</el-col>
                    <el-col :span="3">最后在线时间：</el-col>
                    <el-col :span="3">{{shipperInformation.lastLoginTime | parseTime}}</el-col>

                    <!-- 第二行 -->
                    <el-col :span="3">注册所在地：</el-col>
                    <el-col :span="3">{{shipperInformation.regisAddress}}</el-col>
                    <!-- <el-col :span="3">注册所属商圈：</el-col>
                    <el-col :span="3">{{shipperInformation.tradeAreaName}}</el-col> -->
                    <!-- <el-col :span="3">注册所属场区：</el-col>
                    <el-col :span="3">暂无</el-col> -->
                    <el-col :span="3">账户登录状态：</el-col>
                    <el-col :span="3">{{shipperInformation.usingStatus == '1' ? '启用' : '禁用'}}</el-col>

                    <!-- 第三行 -->
                    <el-col :span="3">用户姓名：</el-col>
                    <el-col :span="3">{{shipperInformation.shipperName}}</el-col>
                    <el-col :span="3">手机号码：</el-col>
                    <el-col :span="3">{{shipperInformation.mobile}}</el-col>
                    <el-col :span="3">年龄：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">性别：</el-col>
                    <el-col :span="3">{{shipperInformation.sex}}</el-col>

                    <!-- 第四行 -->
                    <el-col :span="3">身份证号码：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">生日：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">微信号：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">账户发货状态：</el-col>
                    <el-col :span="3">{{shipperInformation.accountStatusName}}</el-col>
                    
                    <!-- 第四行 -->
                    <!-- <el-col :span="3">微信号：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">支付宝：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">账号启用状态：</el-col>
                    <el-col :span="9">暂无</el-col> -->
                </el-row>
            </div>
        </div>
        <!-- 企业认证信息 -->
        <div class="zizhiInfo-collapse collapseInfo">
            <h2>企业认证信息</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">货主审核状态：</el-col>
                    <el-col :span="3">{{shipperInformation.shipperStatusName}}</el-col>  
                    <el-col :span="3">货主类型：</el-col>
                    <el-col :span="3">{{shipperInformation.shipperTypeName}}</el-col>
                    <el-col :span="3">提交认证时间：</el-col>
                    <el-col :span="3">{{shipperInformation.authenticationTime | parseTime}}</el-col>
                    <el-col :span="3">审核通过时间：</el-col>
                    <el-col :span="3">{{shipperInformation.authPassTime | parseTime}}</el-col>
                    <!-- 第二行 -->
                    <el-col :span="3">企业名称：</el-col>
                    <el-col :span="3">{{shipperInformation.companyName}}</el-col>
                    <el-col :span="3">统一社会信用代码：</el-col>
                    <el-col :span="3">{{shipperInformation.creditCode}}</el-col>
                    <el-col :span="3">联系人：</el-col>
                    <el-col :span="3">{{shipperInformation.contacts}}</el-col>
                    <el-col :span="3">法人/负责人：</el-col>
                    <el-col :span="3">{{shipperInformation.legalPerson}}</el-col>
                    <!-- <el-col :span="3">企业地址：</el-col>
                    <el-col :span="9">{{shipperInformation.belongCityName}}</el-col>  -->

                     <!-- 第三行 -->
                    <el-col :span="3">成立时间：</el-col>
                    <el-col :span="3">{{shipperInformation.companyEstablishDate | parseTime}}</el-col>
                    <el-col :span="3">认证所在地：</el-col>
                    <el-col :span="3">{{shipperInformation.belongCityName}}</el-col>
                    <el-col :span="3">企业地址：</el-col>
                    <el-col :span="9">{{shipperInformation.companyAddress}}</el-col>

                    <!-- 第四行 -->
                    <el-col :span="3">认证所属商圈：</el-col>
                    <el-col :span="3">{{shipperInformation.tradeAreaName}}</el-col>
                    <el-col :span="3">同城潜力等级：</el-col>
                    <el-col :span="3">{{shipperInformation.potentialGradeName}}</el-col>
                    <!-- <el-col :span="3">业务覆盖：</el-col>                                        
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">常用车型：</el-col>
                    <el-col :span="3">暂无</el-col> -->

                    <!-- 第五行 -->
                    <!-- <el-col :span="3">业务联系人：</el-col>
                    <el-col :span="3">暂无</el-col>
                    <el-col :span="3">联系电话：</el-col>
                    <el-col :span="3">{{shipperInformation.mobile}}</el-col> -->
                </el-row>
            </div>
            <div class="essentialInformation_img" v-viewer>
                <el-row class="basicInfo_img" :gutter="20">
                    <el-col :span="8">
                        <h6>营业执照：<span class="basicInfo_red">({{shipperInformation.businessLicenceFileNoPass ? shipperInformation.businessLicenceFileNoPass :'上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='shipperInformation.businessLicenceFile  ? shipperInformation.businessLicenceFile : defaultImg45' alt="">
                        </el-tooltip>   
                    </el-col>
                    <el-col :span="8">
                        <h6>门头照：<span class="basicInfo_red">({{shipperInformation.companyFacadeFileNoPass ? shipperInformation.companyFacadeFileNoPass :'上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='shipperInformation.companyFacadeFile ? shipperInformation.companyFacadeFile : defaultImgCarCard' alt="">
                        </el-tooltip>   
                    </el-col>
                    <el-col :span="8">
                        <h6>名片照：<span class="basicInfo_red">({{shipperInformation.shipperCardFileNoPass ? shipperInformation.shipperCardFileNoPass :'上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='shipperInformation.shipperCardFile ? shipperInformation.shipperCardFile : defaultImgDriverCard' alt="">
                        </el-tooltip>   
                    </el-col>
                </el-row>
                <!-- <el-row class="basicInfo_img" :span='24'>
                    <el-col :span="12">
                        <h6>其他照片：</h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='defaultImgIdCard' alt="">
                        </el-tooltip>   
                    </el-col>
                </el-row> -->
            </div>
        </div>

        <!-- 内部权益管理 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>内部权益管理</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="shipperInformation.aflcBusinessInformationList"
                    border
                    style="width: 100%">
                    <el-table-column prop="userStatusName" label="权益类型" ></el-table-column>
                    <el-table-column prop="groupName" label="所属组" ></el-table-column>
                    <el-table-column prop="belongSalesmanName" label="所属人"></el-table-column>
                    <el-table-column prop="updateTime" label="操作时间" ><template  slot-scope="scope">{{scope.row.createTime | parseTime}}</template></el-table-column>
                    <el-table-column prop="updater" label="操作人" ></el-table-column>
                </el-table>
            </div>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">需要后续跟进状态：</el-col>
                    <el-col :span="3">{{shipperInformation.shipperFollowUp == '1' ? '是' : '否'}}</el-col>
                    <el-col :span="3">审核备注：</el-col>
                    <el-col :span="15">{{shipperInformation.remark}}</el-col>
                </el-row>
            </div>
        </div>

        <!-- 货主权益信息 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>货主权益信息</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo basicInfo_btn">
                    <!-- 第一行 -->
                    <el-col :span="3">货主优惠等级：</el-col>
                    <el-col :span="3">{{shipperInformation.discountLevelName}}</el-col>
                    <div class="btn">
                        <el-button type="primary" plain v-showPicture :imgurl="shipperInformation.qrUrl ? shipperInformation.qrUrl : defaultImg">查看货主下单码</el-button>
                        <el-button type="primary" plain v-showPicture :imgurl="shipperInformation.shipperQrUrl ? shipperInformation.shipperQrUrl : defaultImg">查看货主邀请码</el-button>
                        <el-button type="primary" plain v-showPicture :imgurl="shipperInformation.driverQrUrl ? shipperInformation.driverQrUrl : defaultImg">查看车主邀请码</el-button>
                    </div>
                </el-row>
            </div>
        </div>

        <!-- 冻结信息 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>冻结信息</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="shipperInformation.aflcFreezeUserList"
                    border
                    style="width: 100%">
                    <el-table-column prop="freezeTypeName" label="操作" ></el-table-column>
                    <el-table-column prop="freezeCause" label="原因"></el-table-column>
                    <el-table-column prop="unfreezeTime" label="解冻日期"><template  slot-scope="scope">{{scope.row.unfreezeTime | parseTime}}</template></el-table-column>
                    <el-table-column prop="freezeCauseRemark" label="说明" ><template  slot-scope="scope">{{scope.row.freezeType == 0 ? scope.row.freezeCauseRemark : scope.row.unfreezeCauseRemark}}</template></el-table-column>
                    <el-table-column prop="updateTime" label="操作时间" ><template  slot-scope="scope">{{scope.row.createTime | parseTime}}</template></el-table-column>
                    <el-table-column prop="updater" label="操作人" ></el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 黑名单信息 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>黑名单信息</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="shipperInformation.aflcBlackUserList"
                    border
                    style="width: 100%">
                    <el-table-column prop="blackTypeName" label="操作" ></el-table-column>
                    <el-table-column prop="putBlackCause" label="原因"></el-table-column>
                    <el-table-column prop="putBlackCauseRemark" label="说明" ><template  slot-scope="scope">{{scope.row.blackType == 0 ? scope.row.putBlackCauseRemark : scope.row.outPutBlackCauseRemark}}</template></el-table-column>
                    <el-table-column prop="updateTime" label="操作时间" ><template  slot-scope="scope">{{scope.row.createTime | parseTime}}</template></el-table-column>
                    <el-table-column prop="updater" label="操作人" ></el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 审核/修改日志 -->
        <!-- <div class="logInfo-collapse collapseInfo">
            <h2>审核/修改日志</h2>
        </div> -->
    </div>
</template>
<script>

// import { parseTime } from '@/utils/index.js'
import { aflcShipperInfo  } from "@/api/users/shipperDetails/index.js";

export default {
  name: 'detailsInfo',
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
        shipperInformation: {},
        loading: false,
        spanArr: [],
        pos: 0 ,
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
            this.ShipperInfo(userId);
        },
        ShipperInfo(userId){
            aflcShipperInfo(userId).then(res => {
                this.shipperInformation = res.data;
                // this.getSpanArr(this.shipperInformation.aflcBusinessInformationList);
            })
        },
        handlerClick() {
            
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        getSpanArr(data) {　
            this.spanArr = [];
            this.pos = 0 ;
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArr.push(1);
                    this.pos = 0
                } else {
                // 判断当前元素与上一个元素是否相同
                if (data[i].userStatus === data[i - 1].userStatus) {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                 }
             }
            // console.log('this.spanArr',this.spanArr)
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            // console.log('row, column, rowIndex, columnIndex',row, column, rowIndex, columnIndex)
            // console.log('rowIndex',rowIndex)
        //    if(this.isMerge){
                if (columnIndex === 0) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                //    console.log('_row,_col',_row,_col,this.spanArr,this.spanArr[rowIndex])
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
        //    }
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .detailsInfo{
        .collapseInfo{
            .essentialInformation{
                .basicInfo_btn{
                    border-top: 0 none;
                    .el-col{
                        border-top:1px solid #e6e6e6; 
                    }
                    .btn{
                        display: inline-block;
                        padding-top: 2px;
                        margin-left: 10px;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="detailsInfo detailsArrange" v-loading="loading">
        <!-- 基本信息 -->
        <div class="detailsInfo-collapse collapseInfo">
            <h2>身份信息</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">用户姓名：</el-col>
                    <el-col :span="3" :title="driverInformation.driverName">{{driverInformation.driverName}}</el-col>
                    <el-col :span="3">手机号码：</el-col>
                    <el-col :span="3" :title="driverInformation.driverMobile">{{driverInformation.driverMobile}}</el-col>
                    <el-col :span="3">性别：</el-col>
                    <el-col :span="3">{{driverInformation.sex==1?'男':'女'}}</el-col>
                    <el-col :span="3">年龄：</el-col>
                    <el-col :span="3">{{driverInformation.age}}</el-col>
                    <!-- 第二行 -->
                    <el-col :span="3">注册所在地：</el-col>
                    <el-col :span="3" :title="driverInformation.regisAddress">{{driverInformation.regisAddress}}</el-col>
                    <el-col :span="3">认证状态：</el-col>
                    <el-col :span="3">{{driverInformation.driverStatusName}}</el-col>
                    <el-col :span="3">注册日期：</el-col>
                    <el-col :span="3" :title="driverInformation.registerTime|parseTime">{{driverInformation.registerTime|parseTime}}</el-col>
                    <el-col :span="3">注册渠道：</el-col>
                    <el-col :span="3" :title="driverInformation.registerOriginName">{{driverInformation.registerOriginName}}</el-col>
                    <!-- 第三行 -->
                    <el-col :span="3">认证所在地：</el-col>
                    <el-col :span="3" :title="driverInformation.belongCityName">{{driverInformation.belongCityName}}</el-col>
                    <el-col :span="3">账户登录状态：</el-col>
                    <el-col :span="3" >{{driverInformation.isOnLine==1?'是':'否'}}</el-col>
                    <el-col :span="3">是否临时认证：</el-col>
                    <el-col :span="3">{{driverInformation.isTempCertificate==1?'是':'否'}}</el-col>
                    <el-col :span="3">是否业务员：</el-col>
                    <el-col :span="3">{{driverInformation.isCompanySale==1?'是':'否'}}</el-col>
                    <!-- 第四行 -->
                    <el-col :span="3">活跃值：</el-col>
                    <el-col :span="3" :title="activeValue?activeValue.name:''">{{activeValue?activeValue.name:''}}</el-col>
                    <el-col :span="3">提交认证时间：</el-col>
                    <el-col :span="3" :title="driverInformation.authenticationTime|parseTime">{{driverInformation.authenticationTime|parseTime}}</el-col>
                    <el-col :span="3">等待时长：</el-col>
                    <el-col :span="3" :title="driverInformation.authenticationTime|remainData">{{driverInformation.authenticationTime|remainData}}</el-col>
                    <el-col :span="3">微信呢称：</el-col>
                    <el-col :span="3" :title="driverInformation.nickname">{{driverInformation.nickname}}</el-col>
                    <!-- 第五行 -->
                    <el-col :span="3">最后登录时间：</el-col>
                    <el-col :span="3" :title="driverInformation.loginTime|parseTime">{{driverInformation.loginTime|parseTime}}</el-col>
                    <el-col :span="3">生日：</el-col>
                    <el-col :span="3" :title="driverInformation.birthday">{{driverInformation.birthday}}</el-col>
                    <el-col :span="3">身份证号码：</el-col>
                    <el-col :span="9" :title="driverInformation.cardid">{{driverInformation.cardid}}</el-col>
                    <el-col :span="3">身份证住址：</el-col>
                    <el-col :span="9" :title="driverInformation.address">{{driverInformation.address}}</el-col>
                </el-row>
            </div>
            <div class="essentialInformation_img" v-viewer>
                <el-row class="basicInfo_img" :gutter="24">
                    <el-col :span="8">
                        <h6>车主身份证照片：<span class="basicInfo_red">({{driverInformation.authNoPassCauseIdCard ? driverInformation.authNoPassCauseIdCard :'上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.idCardFile ? driverInformation.idCardFile :defaultImg' alt="">
                        </el-tooltip>
                    </el-col>
                    <el-col :span="8">
                        <h6>车主个人形象照：<span class="basicInfo_red">({{driverInformation.authNoPassCauseOfPersonal ? driverInformation.authNoPassCauseOfPersonal : '上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.personalImageFile ? driverInformation.personalImageFile : defaultImg' alt="">
                        </el-tooltip>   
                    </el-col>
            </el-row>
            </div>
        </div>
        <!-- 驾驶证信息 -->
        <div class="zizhiInfo-collapse collapseInfo">
            <h2>驾驶证信息</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">档案编号：</el-col>
                    <el-col :span="3" :title="driverInformation.fileNumberLicense">{{driverInformation.fileNumberLicense}}</el-col>  
                    <el-col :span="3">国籍：</el-col>
                    <el-col :span="3" :title="driverInformation.nationality">{{driverInformation.nationality}}</el-col>
                    <el-col :span="3">准驾车型：</el-col>
                    <el-col :span="3" :title="driverInformation.classType">{{driverInformation.classType}}</el-col>  
                    <el-col :span="3">驾驶证签发机关：</el-col>
                    <el-col :span="3" :title="driverInformation.signOrgLicense">{{driverInformation.signOrgLicense}}</el-col>    
                    <!-- 第二行 -->
                    <el-col :span="3">驾驶证有效期起：</el-col>
                    <el-col :span="3" :title="driverInformation.vldStartLicence">{{driverInformation.vldStartLicence}}</el-col>  
                    <el-col :span="3">驾驶证有效期止：</el-col>
                    <el-col :span="3" :title="driverInformation.vldEndLicence">{{driverInformation.vldEndLicence}}</el-col>
                    <el-col :span="3">是否过期：</el-col>
                    <el-col :span="3" :title="driverInformation.vldEndLicenceExpire">{{driverInformation.vldEndLicenceExpire}}</el-col>  
                    <el-col :span="3">初次领证日期：</el-col>
                    <el-col :span="3" :title="driverInformation.firstTimeLicense">{{driverInformation.firstTimeLicense}}</el-col>    
                </el-row>
            </div>
            <div class="essentialInformation_img" v-viewer>
                <el-row class="basicInfo_img" :gutter='24'>
                    <el-col :span="8">
                        <h6>驾驶证正页：<span class="basicInfo_red">({{driverInformation.authNoPassCauseOfDrivingLicence ? driverInformation.authNoPassCauseOfDrivingLicence :'上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.drivingLicenceFile ? driverInformation.drivingLicenceFile :defaultImg' alt="">
                        </el-tooltip>   
                    </el-col>
                    <el-col :span="8">
                        <h6>驾驶证副本：<span class="basicInfo_red">({{driverInformation.authNoPassCauseDrivingLicenceOpposite ? driverInformation.authNoPassCauseDrivingLicenceOpposite : '上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.drivingLicenceFileOpposite ? driverInformation.drivingLicenceFileOpposite : defaultImg' alt="">
                        </el-tooltip>   
                    </el-col>
                </el-row>
            </div>
        </div>

        <!-- 行驶证信息 -->
        <div class="zizhiInfo-collapse collapseInfo">
            <h2>行驶证信息</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">车牌号：</el-col>
                    <el-col :span="3" :title="driverInformation.carNumber">{{driverInformation.carNumber}}</el-col>  
                    <el-col :span="3">所有人：</el-col>
                    <el-col :span="3" :title="driverInformation.owner">{{driverInformation.owner}}</el-col>
                    <el-col :span="3">使用性质：</el-col>
                    <el-col :span="3" :title="driverInformation.useType">{{driverInformation.useType}}</el-col>  
                    <el-col :span="3">品牌型号：</el-col>
                    <el-col :span="3" :title="driverInformation.brandType">{{driverInformation.brandType}}</el-col>    
                    <!-- 第二行 -->
                    <el-col :span="3">车辆识别代号：</el-col>
                    <el-col :span="3" :title="driverInformation.vin">{{driverInformation.vin}}</el-col>  
                    <el-col :span="3">发动机号：</el-col>
                    <el-col :span="3" :title="driverInformation.engineNo">{{driverInformation.engineNo}}</el-col>
                    <el-col :span="3">行驶证注册日期：</el-col>
                    <el-col :span="3" :title="driverInformation.registerDate">{{driverInformation.registerDate}}</el-col>  
                    <el-col :span="3">行驶证发证日期：</el-col>
                    <el-col :span="3" :title="driverInformation.issueDate">{{driverInformation.issueDate}}</el-col>    
                    <!-- 第三行 -->
                    <el-col :span="3">档案编号行驶证：</el-col>
                    <el-col :span="3" :title="driverInformation.fileNumber">{{driverInformation.fileNumber}}</el-col>
                    <el-col :span="3">车辆类型：</el-col>
                    <el-col :span="3" :title="carType?carType.name:''">{{carType?carType.name:''}}</el-col>
                    <el-col :span="3">车辆规格：</el-col>
                    <el-col :span="3" :title="carSpec?carSpec.name:''">{{carSpec?carSpec.name:''}}</el-col>
                    <el-col :span="3">车长(米)：</el-col>
                    <el-col :span="3" :title="driverInformation.carLength+','+driverInformation.carWidth+','+driverInformation.carHeight">{{driverInformation.carLength}}<i v-if="driverInformation.carWidth">,</i>{{driverInformation.carWidth}}<i v-if="driverInformation.carHeight">,</i>{{driverInformation.carHeight}}</el-col>    
                </el-row>
            </div>
            <div class="essentialInformation_img" v-viewer>
                <el-row class="basicInfo_img" :gutter='24'>
                    <el-col :span="8">
                        <h6>车辆行驶证：<span class="basicInfo_red">({{driverInformation.authNoPassCauseDrivingPermit ? driverInformation.authNoPassCauseDrivingPermit :'上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.drivingPermitFile ? driverInformation.drivingPermitFile :defaultImg' alt="">
                        </el-tooltip>
                    </el-col>
                    <el-col :span="8">
                        <h6>车辆行驶证副本：<span class="basicInfo_red">({{driverInformation.authNoPassCauseDrivingPermitOpposite ? driverInformation.authNoPassCauseDrivingPermitOpposite : '上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.drivingPermitFileOpposite ? driverInformation.drivingPermitFileOpposite : defaultImg' alt="">
                        </el-tooltip>   
                    </el-col>
                    <el-col :span="8">
                        <h6>车辆45°照片：<span class="basicInfo_red">({{driverInformation.authNoPassCauseOfCar ? driverInformation.authNoPassCauseOfCar :'上传合格'}})</span></h6>
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src='driverInformation.carFile ? driverInformation.carFile :defaultImg' alt="">
                        </el-tooltip>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!-- 内部权益管理 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>内部权益管理</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="driverInformation.aflcBusinessInformationList"
                    border
                    style="width: 100%">
                    <el-table-column prop="userStatusName" label="权益类型" ></el-table-column>
                    <el-table-column prop="groupName" label="所属组" ></el-table-column>
                    <el-table-column prop="belongSalesmanName" label="所属人"></el-table-column>
                    <el-table-column prop="updateTime" label="操作时间" ></el-table-column>
                    <el-table-column prop="updater" label="操作人" ></el-table-column>
                </el-table>
            </div>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">车主奖励等级：</el-col>
                    <el-col :span="3" :title="rewardgrade?rewardgrade.name:''">{{rewardgrade?rewardgrade.name:''}}</el-col>  
                    <el-col :span="3">推荐人：</el-col>
                    <el-col :span="3" :title="driverInformation.recommenderName">{{driverInformation.recommenderName}}<span v-if="driverInformation.recommenderName&&driverInformation.recommenderPhone">-</span>{{driverInformation.recommenderPhone}}</el-col>
                    <el-col :span="3">推荐人用户类型：</el-col>
                    <el-col :span="3" :title="driverInformation.recommenderUserTypeCode">{{driverInformation.recommenderUserTypeCode}}</el-col>  
                    <el-col :span="3">推荐渠道：</el-col>
                    <el-col :span="3" :title="driverInformation.recommendedChannelName">{{driverInformation.recommendedChannelName}}</el-col>   
                    <!-- 第二行 --> 
                    <el-col :span="3">推荐人所属业务员：</el-col>
                    <el-col :span="3" :title="driverInformation.recommenderSalesmanName">{{driverInformation.recommenderSalesmanName}}</el-col>  
                    <el-col :span="3">被推荐人注册时间：</el-col>
                    <el-col :span="3" :title="driverInformation.recommendederRegisterTime|parseTime">{{driverInformation.recommendederRegisterTime|parseTime}}</el-col>
                    <el-col :span="3">是否特权车：</el-col>
                    <el-col :span="3">{{driverInformation.isVipCar==1?'是':'否'}}</el-col>  
                    <el-col :span="3">需要后续跟进状态：</el-col>
                    <el-col :span="3">{{driverInformation.driverFollowUp==1?'是':'否'}}</el-col>    
                    <!-- 第三行 -->
                    <el-col :span="3">是否广告车：</el-col>
                    <el-col :span="3">{{driverInformation.isAd==1?'是':'否'}}</el-col>    
                    <el-col :span="3">广告车有效期：</el-col>
                    <el-col :span="3">{{driverInformation.adVaild}}</el-col>
                </el-row>
                <el-row class="basicInfo" :span='24'>
                    <el-col :span="3">审核备注：</el-col>
                    <el-col :span="21" :title="driverInformation.businessGroupRemark">{{driverInformation.businessGroupRemark}}</el-col> 
                </el-row>
            </div>
        </div>
        <!-- 权益信息 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>权益信息</h2>
            <div class="essentialInformation">
            <el-button type="primary" plain v-showPicture :imgurl="driverInformation.qrUrl ? driverInformation.qrUrl : defaultImg">二维码接单地址</el-button>
            <el-button type="primary" plain v-showPicture :imgurl="driverInformation.shipperQrUrl ? driverInformation.shipperQrUrl : defaultImg">查看货主邀请码</el-button>
            <el-button type="primary" plain v-showPicture :imgurl="driverInformation.driverQrUrl ? driverInformation.driverQrUrl : defaultImg">查看车主邀请码</el-button>     
            </div>
            <div class="essentialInformation">
            <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">会员等级：</el-col>
                    <el-col :span="3">{{driverInformation.memberGrade}}</el-col>  
                    <el-col :span="3">会员等级有效期：</el-col>
                    <el-col :span="15">{{driverInformation.memberExpireDateTime|parseTime}}</el-col>
            </el-row>
            </div>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data="formAllList">
                    <el-table-column prop="d1" label="中单等级" ></el-table-column>
                    <el-table-column prop="d2" label="奖励等级" ></el-table-column>
                    <el-table-column prop="d3" label="抽佣等级"></el-table-column>
                    <el-table-column prop="d4" label="提现等级" ></el-table-column>
                </el-table>
            </div>
        </div>
        
        <!-- 冻结信息 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>冻结信息</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data="driverInformation.aflcFreezeUserList">
                    <el-table-column prop="freezeTypeName" label="操作" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="freezeCause" label="原因" show-overflow-tooltip>
                        <template slot-scope="scoped">
                            {{scoped.row.freezeType=="2"?scoped.row.unfreezeCauseRemark:scoped.row.freezeCauseRemark}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="unfreezeTime" label="解冻日期" show-overflow-tooltip>
                        <template slot-scope="scoped">
                            {{scoped.row.unfreezeTime|parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="freezeCause" label="说明" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="操作时间" show-overflow-tooltip>
                        <template slot-scope="scoped">
                            {{scoped.row.createTime|parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="updater" label="操作人" show-overflow-tooltip></el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 黑名单信息 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>黑名单信息</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data="driverInformation.aflcBlackUserList">
                    <el-table-column prop="blackTypeName" label="操作" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="putBlackCause" label="原因" show-overflow-tooltip>
                        <template slot-scope="scoped">
                            {{scoped.row.blackType=="1"?scoped.row.outPutBlackCauseRemark:scoped.row.putBlackCauseRemark}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="putBlackCause" label="说明" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="操作时间" show-overflow-tooltip>
                        <template slot-scope="scoped">
                            {{scoped.row.createTime|parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="updater" label="操作人" show-overflow-tooltip></el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 手机号修改信息 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>手机号修改信息</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data = "MobileBindHistoryList">
                    <el-table-column prop="mobile" label="新手机号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="prevMobile" label="原手机号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bindTime" label="修改时间" show-overflow-tooltip>
                         <template slot-scope="scoped">
                            {{scoped.row.bindTime|parseTime}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 微信绑定/解绑信息 -->
        <div class="logInfo-collapse collapseInfo">
            <h2>微信绑定/解绑信息</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data = "aflcBindWxLogList">
                    <el-table-column prop="" label="操作内容" show-overflow-tooltip>
                        <template slot-scope="scoped">
                            {{scoped.row.nickname}}({{scoped.row.operType==1?'解绑微信':'绑定微信'}})
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="操作时间" show-overflow-tooltip>
                        <template slot-scope="scoped">
                            {{scoped.row.createTime|parseTime}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import {  aflcDriverInfo } from '@/api/users/carDetails/index.js'
import {  detailByManageDriver,aflcMobileBindHistoryApi,aflcBindWxLog } from '@/api/users/carDetails/index.js'
import {data_get_driverName_id} from "@/api/users/carowner/all_car.js";
import { getDictionary } from '@/api/common.js'
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
        driverInformation: {},
        activeValueList:[],   // 活跃值数据列表
        carTypeList:[],                //车辆类型
        carSpecList:[],                //车辆规格
        MidList:[],                    //中单等级
        carOwnerType:[],               //奖励金等级
        CommissionList:[],             //抽佣等级
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        loading: true,
        MobileBindHistoryObj:{   
            "currentPage": 1,
            "pageSize": 100,
            "vo": {
                "userId": this.$route.query.driverId,
            }
        },
        aflcBindWxLogObj:{
            "currentPage": 1,
            "pageSize": 100,
            "vo": {
                "userId": this.$route.query.driverId,
            }
        },
        MobileBindHistoryList:[], //手机号列表
        aflcBindWxLogList:[], //绑定微信号列表
        formAllList:[
        {d1:null,d2:null,d3:null,d4:null}   
        ]
      }
  },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.init()
                    this.getMoreInformation();
                }
            },
            immediate: true
        },
    },
    mounted() {
    },
    methods: {
        init() {
            let driverId = this.$route.query.driverId;
            this.DriverInfo(driverId);
            this.MobileBindHistory();
            this.aflcBindWxLog()
        },
        DriverInfo(driverId){
            this.loading = true;
            data_get_driverName_id(driverId).then(res => {
                this.driverInformation = res.data
                this.driverInformation.birthday = parseTime(this.driverInformation.birthday,"{y}-{m}-{d}")
                this.driverInformation.vldStartLicence = parseTime(this.driverInformation.vldStartLicence,"{y}-{m}-{d}")
                this.driverInformation.vldEndLicence = parseTime(this.driverInformation.vldEndLicence,"{y}-{m}-{d}")
                this.driverInformation.firstTimeLicense = parseTime(this.driverInformation.firstTimeLicense,"{y}-{m}-{d}")
                this.driverInformation.registerDate = parseTime(this.driverInformation.registerDate,"{y}-{m}-{d}")
                this.driverInformation.issueDate = parseTime(this.driverInformation.issueDate,"{y}-{m}-{d}")
                this.driverInformation.adVaild = parseTime(this.driverInformation.adVaild,"{y}-{m}-{d}")
                if(res.data.rewardgrade){
                this.formAllList[0].d1 = this.MidList.filter(e=>{
                return e.code == res.data.obtainGrade
                })[0].name
                }
                if(res.data.rewardgrade){
                this.formAllList[0].d2 = this.carOwnerType.filter(e=>{
                return e.code == res.data.rewardgrade
                })[0].name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                }
                if( res.data.commisionLevel){
                this.formAllList[0].d3 = this.CommissionList.filter(e=>{
                return e.code == res.data.commisionLevel
                })[0].name
                }
                this.loading = false;
            }).catch(err => {
                this.$message.error('获取数据失败')
                this.loading = false;
            })
        },
        MobileBindHistory(){
            aflcMobileBindHistoryApi(this.MobileBindHistoryObj).then(res => {
                this.MobileBindHistoryList = res.data.list
            })
        },
        aflcBindWxLog(){
            aflcBindWxLog(this.aflcBindWxLogObj).then(res=>{
                this.aflcBindWxLogList = res.data.list
            })
        },
    // 获取数据字典信息
       getMoreInformation(){
        //活跃值  
        getDictionary('AF00204').then(res=>{
          this.activeValueList = res.data
        })
        // 车辆类型
        getDictionary('AF018').then(res=>{
            this.carTypeList = res.data
        })
        // 车辆规格
        getDictionary('AF009').then(res=>{
            this.carSpecList = res.data
        })
        // 中单等级
        getDictionary('AF00503').then(res=>{
            this.MidList = res.data
        })
        // 车主奖励等级
        getDictionary('AF00207').then(res=>{
            this.carOwnerType = res.data
            })
        // 抽佣等级
        getDictionary('AF00206').then(res=>{
            this.CommissionList = res.data
        })
        },
       },
      filters:{
        remainData:(val=>{
            if(!val){
            return ''
            }
            else{
            let timeData = new Date() - val
            let timeD = timeData/1000 / 60 / 60 / 24
            let timeH = (timeData/ 1000 / 60 / 60 % 24);
            return  parseInt(timeD)+ '天'+ parseInt(timeH)+ '小时'
           }
        }),
    },
    computed:{
        activeValue:function(){
            let NewactiveValue = this.activeValueList.filter(e=>{
               return e.code == this.driverInformation.activeValue
            })
            return NewactiveValue[0]
        },
        carType:function(){
            let NewcarType = this.carTypeList.filter(e=>{
               return e.code == this.driverInformation.carType
            })
            return NewcarType[0]
        },
        carSpec:function(){
            let NewcarSpec = this.carSpecList.filter(e=>{
               return e.code == this.driverInformation.carSpec 
            })
            return NewcarSpec[0]
        },
        rewardgrade:function(){
            let Newrewardgrade= this.carOwnerType.filter(e=>{
               return e.code == this.driverInformation.rewardgrade 
            })
            return Newrewardgrade[0]
        }
    }
}
</script>

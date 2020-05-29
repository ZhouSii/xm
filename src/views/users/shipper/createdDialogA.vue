<template>
    <div class="shippercreatDialog commoncss StyleNewinfoComponent">
        <el-dialog :title="typetitle" :visible="dialogFormVisible_add" :modal-append-to-body = 'false' :modal = 'false' :before-close="closeMe" top="5vh" :close-on-click-modal="false" ref="dialog">
           <el-form :model="xinzengform" ref="xinzengform" :rules="rulesForm" :label-width="formLabelWidth">
               <el-row>
                   <h2 class="carNewinfoH2">个人信息</h2>
                   <el-col :span="8">
                       <el-form-item label="手机号码：" prop="mobile">
                           <el-input auto-complete="off" v-model="xinzengform.mobile" :maxlength="20" :disabled="editType=='view' || editType=='edit' || editType == 'CertificationAudit' || editType == 'identification'"></el-input>
                       </el-form-item>
                   </el-col>
                   <el-col :span="8">
                       <el-form-item label="注册所在地："  prop="regisAddress">
                           <el-input v-model="xinzengform.regisAddress" auto-complete="off" v-if="editType=='view'" disabled></el-input>
                           <vregion :ui="true"  @values="regionChangeA" class="form-control" ref = "regionChangeA" v-else>
                               <el-input v-model="xinzengform.regisAddress" placeholder="请选择" ></el-input>
                           </vregion>
                       </el-form-item>
                   </el-col>
                    <el-col :span="8">
                       <el-form-item label="货主类型：" prop="shipperType">
                           <el-input v-model="xinzengform.shipperTypeName" auto-complete="off" v-if="editType=='view'"  disabled></el-input>
                           <el-select v-model="xinzengform.shipperType" placeholder="请选择" v-else>
                               <el-option
                               v-for="item in options"
                               :key="item.id"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                               </el-option>
                           </el-select>
                       </el-form-item>
                   </el-col>
               </el-row>
               <el-row>
                   <el-col :span="8">
                       <el-form-item label="注册日期：" prop="registerTime">
                           <el-input :value="xinzengform.registerTime | parseTime"  auto-complete="off" disabled></el-input>
                       </el-form-item>
                   </el-col>
                    <el-col :span="8">
                       <el-form-item label="注册渠道："  prop="registerOriginName">
                           <el-input v-model="xinzengform.registerOriginName" auto-complete="off" disabled></el-input>
                       </el-form-item>
                   </el-col>
                    <el-col :span="8">
                       <el-form-item label="潜力等级："  prop="potentialGrade">
                            <el-input v-model="xinzengform.potentialGradeName" auto-complete="off" v-if="editType=='view'"  disabled></el-input>
                            <el-select v-model="xinzengform.potentialGrade" @change="doName" clearable placeholder="请选择" v-else>
                                <el-option
                                v-for="item in optionsGradeType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code"
                                :disabled="item.disabled">
                                </el-option>
                            </el-select>
                       </el-form-item>
                   </el-col>
               </el-row>
               <el-row>
                   <h2 class="carNewinfoH2">资质信息</h2>
                   <el-col :span="8">
                       <el-form-item label="企业名称：" prop="companyName" :class="{'is-required': xinzengform.shipperType == 'AF0010101' ? false : true}">
                           <el-input v-model="xinzengform.companyName" auto-complete="off" :disabled="editType=='view'"></el-input>
                       </el-form-item>
                   </el-col>
                   <el-col :span="8">
                       <el-form-item label="认证所在地："  prop="belongCityName" :class="{'is-required': xinzengform.shipperType == 'AF0010101' ? false : true}">
                           <el-input v-model="xinzengform.belongCityName" auto-complete="off" v-if="editType=='view'"  disabled></el-input>
                           <vregion :ui="true"  @values="regionChange" class="form-control" ref = "regionChange" v-else>
                               <el-input v-model="xinzengform.belongCityName" placeholder="请选择" ></el-input>
                           </vregion>
                       </el-form-item>
                   </el-col>
                 
                   <el-col :span="8">
                       <el-form-item label="联系人：" prop="contacts" :class="{'is-required': xinzengform.shipperType == 'AF0010101' ? false : true}">
                           <el-input v-model="xinzengform.contacts" auto-complete="off" :disabled="editType=='view'"></el-input>
                       </el-form-item>
                   </el-col>
               </el-row>
               <el-row> 
                   <el-col :span="8">
                       <el-form-item label="法人/负责人：" prop="legalPerson">
                           <el-input v-model="xinzengform.legalPerson" auto-complete="off" :disabled="editType=='view'"></el-input>
                       </el-form-item>
                   </el-col>
                   <el-col :span="8">
                       <!-- <el-form-item label="社会统一信用代码："  prop="creditCode" :class="{'is-required': ifShipperType}"> -->
                       <el-form-item label="社会统一信用代码："  prop="creditCode">
                           <el-input v-model="xinzengform.creditCode" auto-complete="off" :disabled="editType=='view'"></el-input>
                       </el-form-item>
                   </el-col>
                   <el-col :span="8">
                       <el-form-item label="成立时间："  prop="companyEstablishDate">
                           <el-date-picker
                           v-model="xinzengform.companyEstablishDate"
                           type="date"
                           :disabled="editType=='view'"
                           placeholder="选择日期"
                           format="yyyy-MM-dd"
                           value-format="timestamp">
                           </el-date-picker>
                       </el-form-item>
                   </el-col>   
               </el-row>
               <el-row> 
                   <el-col :span="16">
                       <el-form-item label="企业地址：" prop="companyAddress">
                           <el-input :maxlength="40" v-model="xinzengform.companyAddress" auto-complete="off"  :disabled="editType=='view'"></el-input>
                       </el-form-item>
                   </el-col>
                    <el-col :span="8">
                        <el-form-item label="认证所属商圈："  prop="tradeAreaId">
                            <el-input v-model="xinzengform.tradeAreaName" auto-complete="off" v-if="disableArea"  disabled></el-input>
                            <!-- <el-select v-model="xinzengform.tradeAreaId" placeholder="请选择" v-else>
                               <el-option
                               v-for="item in optionsTradeArea"
                               :key="item.id"
                               :label="item.professionTradeName"
                               :value="item.id"
                               :disabled="item.disabled">
                               </el-option>
                           </el-select> -->
                            <!-- <el-cascader v-else :options="optionsTradeArea" @change="getTradeArea" :props="defaultprops" change-on-select></el-cascader> -->
                            <tradeAreaList @inputObject = "getVal" v-else  v-model="xinzengform.tradeAreaId" ref ='tradeArea'/>
                        </el-form-item>
                    </el-col>
               </el-row>
               <el-row> 
                    <el-col :span="8">
                       <el-form-item label="提交认证时间：" prop="authenticationTime">
                           <el-input :value="xinzengform.authenticationTime | parseTime" auto-complete="off" disabled></el-input>
                       </el-form-item>
                   </el-col>
                   <el-col :span="8">
                       <el-form-item label="等待时长："  prop="waitTime">
                           <el-input v-model="xinzengform.waitTime" auto-complete="off" disabled></el-input>
                       </el-form-item>
                   </el-col>
                   <el-col :span="8">
                       <el-form-item label="审核通过时间："  prop="authPassTime">
                           <el-input :value="xinzengform.authPassTime | parseTime" auto-complete="off" disabled></el-input>
                       </el-form-item>
                   </el-col>
               </el-row>
               <el-row :gutter="20" v-viewer> 
                   <el-col :span="8" class="CheckPass">
                       <el-form-item prop="businessLicenceFile" label-width="0">
                           <div class="uploadPicture">
                                <h3 class="uploadH3">营业执照  
                                   <el-button type="primary" class="showPictureBtn" plain v-if="editType != 'view' && xinzengform.businessLicenceFile" @click="showCurrenPic('businessLicenceFile')">查看</el-button>
                                </h3>
                               <div class="uploadImgBox" v-if="editType == 'view'">
                                   <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                       <img :src='xinzengform.businessLicenceFile ? xinzengform.businessLicenceFile : defaultImg'  alt="" >
                                   </el-tooltip>
                               </div>
                               <div class="upload_True" v-else >
                                   <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="xinzengform.businessLicenceFile" uploadType="businessLicenceFile" @getInformation = "assignmentVal"/>
                               </div>
                           </div>
                       </el-form-item>
                       <el-form-item prop="businessLicenceFileNoPass" label="图片审核状态：" >
                           <el-input v-model="xinzengform.businessLicenceFileNoPass" auto-complete="off" v-if="editType=='view'"  disabled></el-input>
                           <el-select v-model="xinzengform.businessLicenceFileNoPass"  placeholder="请选择" v-else>
                               <el-option
                               v-for="item in optionsCheckPass"
                               :key="item.label"
                               :label="item.name"
                               :value="item.label">
                               </el-option>
                           </el-select>
                       </el-form-item>
                   </el-col>
                   <el-col :span="8" class="CheckPass">
                       <el-form-item prop="companyFacadeFile" label-width="0">
                           <div class="uploadPicture">
                               <h3 class="uploadH3">门头照
                                    <el-button type="primary" class="showPictureBtn" plain v-if="editType != 'view' && xinzengform.companyFacadeFile"  @click="showCurrenPic('companyFacadeFile')">查看</el-button>
                               </h3>
                               <div class="uploadImgBox" v-if="editType == 'view'">
                                   <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                       <img :src='xinzengform.companyFacadeFile ? xinzengform.companyFacadeFile : defaultImg'  alt="" >
                                   </el-tooltip>
                               </div>
                               <div class="upload_True" v-else>
                                   <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="xinzengform.companyFacadeFile" />
                               </div>
                           </div>
                       </el-form-item>  
                       <el-form-item prop="companyFacadeFileNoPass" label="图片审核状态：" >
                           <el-input v-model="xinzengform.companyFacadeFileNoPass" auto-complete="off" v-if="editType=='view'"  disabled></el-input>
                           <el-select v-model="xinzengform.companyFacadeFileNoPass" placeholder="请选择" v-else>
                               <el-option
                               v-for="item in optionsCheckPass"
                               :key="item.label"
                               :label="item.name"
                               :value="item.label">
                               </el-option>
                           </el-select>
                       </el-form-item>
                   </el-col>
                   <el-col :span="8" class="CheckPass">
                       <el-form-item prop="shipperCardFile" label-width="0">
                           <div class="uploadPicture">
                               <h3 class="uploadH3">名片照
                                    <el-button type="primary" class="showPictureBtn" plain v-if="editType != 'view' && xinzengform.shipperCardFile" @click="showCurrenPic('shipperCardFile')">查看</el-button>
                               </h3>
                               <div class="uploadImgBox" v-if="editType == 'view'">
                                   <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                       <img :src='xinzengform.shipperCardFile ? xinzengform.shipperCardFile : defaultImg'  alt="" >
                                   </el-tooltip>
                               </div>
                               <div class="upload_True" v-else>
                                   <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="xinzengform.shipperCardFile" />
                               </div>
                           </div>
                       </el-form-item>
                       <el-form-item prop="shipperCardFileNoPass" label="图片审核状态：" >
                           <el-input v-model="xinzengform.shipperCardFileNoPass" auto-complete="off" v-if="editType=='view'"  disabled></el-input>
                           <el-select v-model="xinzengform.shipperCardFileNoPass" placeholder="请选择" v-else>
                               <el-option
                               v-for="item in optionsCheckPass"
                               :key="item.label"
                               :label="item.name"
                               :value="item.label">
                               </el-option>
                           </el-select>
                       </el-form-item>
                   </el-col>
               </el-row>
               
               <el-row style="margin-bottom:22px;">
                   <h2 class="carNewinfoH2">
                       内部权益管理
                       <p class="aflcBusinessBtn">
                            <el-button type="primary" size="medium" plain v-if="editType != 'view' && !chooseType" @click="handleClick('addItem')">新增权益</el-button>
                            <el-button type="primary" size="medium" plain v-if="editType != 'view' && chooseType" @click="handleClick('conserve')">保存</el-button>
                            <el-button type="primary" size="medium" plain v-if="editType != 'view' && chooseType" @click="handleClick('cancel')">取消</el-button>
                       </p>
                    </h2>
                   <el-table
                   :data="xinzengform.aflcBusinessInformationList"
                   border
                   ref="multipleTable"
                   stripe
                   align = "center"
                   tooltip-effect="dark"
                   style="width: 100%"
                   >
                       <el-table-column
                           prop="userStatusName"
                           label="权益类型"
                           >
                            <template  slot-scope="scope"> 
                               <span v-if="!scope.row.flag" >{{ scope.row.userStatusName }}</span>
                               <div v-else>
                                   <!-- <span v-if="scope.$index==2||scope.$index==4">/</span> -->
                                    <!-- <el-input v-model="scope.row.optionsBusinessInterests" auto-complete="off"></el-input> -->
                                    <el-select v-model="scope.row.userStatus" placeholder="请选择" @change = "complateName(scope.row.userStatus,scope.$index)">
                                        <el-option
                                        v-for="item in optionsBusinessInterests"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                               </div>
                           </template>
                       </el-table-column>
                       <el-table-column label="所属组">
                           <template  slot-scope="scope"> 
                               <span v-if="!scope.row.flag" >{{ scope.row.groupName }}</span>
                               <div v-else>
                                   <!-- <span v-if="scope.$index==2||scope.$index==4">/</span> -->
                                   <businessGroup  @inputObject = "getObject(scope.$index,$event)" v-model="scope.row.groupName" ref="businessGroup"/>
                               </div>
                           </template>
                       </el-table-column>
                       <el-table-column label="所属人">
                           <template  slot-scope="scope">
                               <!-- <span v-if="editType=='view'" >{{ scope.$index==2 || scope.$index==4 ? scope.row.belongCustomerService : scope.row.belongSalesmanName }}</span> -->
                               <span v-if="!scope.row.flag" >{{ scope.row.belongSalesmanName }}</span>
                               <div v-else>
                                   <!-- <Custom erSearch @returnCustomer = '(value)=>{getCustomer1(value,scope.$index)}' :customerName = "scope.row.belongCustomerService" ref="SalesmanName" v-if="scope.$index==2||scope.$index==4"/> -->
                                   <selectBelong :groupCode = "scope.row.groupCode" :belongSalesman = 'scope.row.belongSalesmanMobile' @returnBelong = '(value)=>{getReturnBelong(value,scope.$index)}'/>
                               </div>
                           </template>
                       </el-table-column>
                       <el-table-column
                           prop="createTime"
                           label="操作时间"
                           >
                           <template  slot-scope="scope"> 
                              {{scope.row.createTime | parseTime}}
                           </template>
                       </el-table-column>
                       <el-table-column
                           prop="creater"
                           label="操作人"
                           > 
                       </el-table-column>
                       <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button
                                size="medium"
                                type="warning"
                                :disabled="scope.row.id ? true : false"
                                plain
                                @click="handleClick('delet',scope.$index)">删除</el-button>
                            </template>
                       </el-table-column>
                   </el-table>
               </el-row>
               <el-row>
                   <el-col :span="8">
                       <el-form-item label="需要后续跟进：" prop="shipperFollowUpType"> 
                           <!-- <el-checkbox v-model="shipperFollowUpType" label="是" border :disabled="editType=='view'"></el-checkbox> -->
                           <el-button 
                           v-if = "editType !='view'"
                           :type="xinzengform.shipperFollowUp == '0' ? 'primary' : 'info'"
                           plain
                           @click="ifFollowUpType"><i :class="xinzengform.shipperFollowUp == '0' ? 'el-icon-success' : 'el-icon-error'" style="margin-right:10px;"></i>{{xinzengform.shipperFollowUp == '0' ? '是' : '否'}}</el-button>
                           <el-input :value="xinzengform.shipperFollowUp == '0' ? '否' : '是'"  auto-complete="off" disabled v-else></el-input>
                       </el-form-item>
                   </el-col>
               </el-row>
                 
               <el-row>
                   <el-col :span="24">
                       <el-form-item label="审核备注：" prop="remark"> 
                           <el-input
                               placeholder="少于100字符"
                               type="textarea"
                               :autosize="{ minRows: 2, maxRows: 4}"
                               clearable
                               maxlength="100"
                               :disabled="editType=='view'"
                               v-model="xinzengform.remark">
                           </el-input>
                       </el-form-item>
                   </el-col>
               </el-row>
               <el-row>
                   <h2 class="carNewinfoH2">权益信息</h2>
                   <el-col :span="8">
                       <el-form-item label="货主优惠等级：" prop="discountLevel">
                           <el-input v-model="xinzengform.discountLevelName" auto-complete="off" v-if="editType=='view'"  disabled></el-input>
                           <el-select v-model="xinzengform.discountLevel" placeholder="请选择" v-else>
                               <el-option
                               v-for="item in optionsLevel"
                               :key="item.id"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                               </el-option>
                           </el-select>
                       </el-form-item>
                   </el-col>
                   <el-col :span="16" v-if="editType !='add'">
                       <el-form-item label-width = "20px">
                           <el-button type="primary" plain v-showPicture :imgurl="xinzengform.qrUrl ? xinzengform.qrUrl : defaultImg">查看货主下单码</el-button>
                           <el-button type="primary" plain v-showPicture :imgurl="xinzengform.shipperQrUrl ? xinzengform.shipperQrUrl : defaultImg">查看货主邀请码</el-button>
                           <el-button type="primary" plain v-showPicture :imgurl="xinzengform.driverQrUrl ? xinzengform.driverQrUrl : defaultImg">查看车主邀请码</el-button>
                       </el-form-item>
                   </el-col>
               </el-row>
               <el-row v-if="editType=='view'">
                   <el-col :span="8">
                       <el-form-item label="推荐人：" prop="recommenderName">
                           <el-input :value="(xinzengform.recommenderName ? xinzengform.recommenderName :'') + (xinzengform.recommenderPhone ? xinzengform.recommenderPhone : '')" auto-complete="off" disabled></el-input>
                       </el-form-item>
                   </el-col>
                   <el-col :span="8">
                        <el-form-item label="推荐人用户类型：" prop="recommenderUserTypeCode">
                           <el-input v-model="xinzengform.recommenderUserTypeCode" auto-complete="off" disabled></el-input>
                       </el-form-item>
                   </el-col>
                    <el-col :span="8">
                       <el-form-item label="推荐渠道：" prop="recommendedChannelName">
                           <el-input v-model="xinzengform.recommendedChannelName" auto-complete="off" disabled></el-input>
                       </el-form-item>
                   </el-col>
                </el-row>
                <el-row v-if="editType=='view'">
                    <el-col :span="8">
                        <el-form-item label="推荐人所属业务员：" prop="recommenderSalesmanName">
                            <el-input v-model="xinzengform.recommenderSalesmanName" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                            <el-form-item label="被推荐人注册时间：" prop="recommendederRegisterTime">
                            <el-input :value="xinzengform.recommendederRegisterTime | parseTime" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="editType=='view'">
                   <h2 class="carNewinfoH2">冻结信息</h2>
                    <el-table
                        :data="xinzengform.aflcFreezeUserList"
                        border
                        style="width: 100%">
                        <el-table-column prop="freezeTypeName" label="操作" ></el-table-column>
                        <el-table-column prop="freezeCause" label="原因" ></el-table-column>
                        <el-table-column prop="unfreezeTime" label="解冻日期"><template  slot-scope="scope">{{scope.row.unfreezeTime | parseTime}}</template></el-table-column>
                        <el-table-column prop="freezeCauseRemark" label="说明" ><template  slot-scope="scope">{{scope.row.freezeType == 0 ? scope.row.freezeCauseRemark : scope.row.unfreezeCauseRemark}}</template></el-table-column>
                        <el-table-column prop="updateTime" label="操作时间" ><template  slot-scope="scope">{{scope.row.createTime | parseTime}}</template></el-table-column>
                        <el-table-column prop="updater" label="操作人" ></el-table-column>
                    </el-table>
               </el-row>
                <el-row v-if="editType=='view'">
                   <h2 class="carNewinfoH2">黑名单信息</h2>
                    <el-table
                        :data="xinzengform.aflcBlackUserList"
                        border
                        style="width: 100%">
                        <el-table-column prop="blackTypeName" label="操作" ></el-table-column>
                        <el-table-column prop="putBlackCause" label="原因" ></el-table-column>
                        <el-table-column prop="putBlackCauseRemark" label="说明" ><template  slot-scope="scope">{{scope.row.blackType == 0 ? scope.row.putBlackCauseRemark : scope.row.outPutBlackCauseRemark}}</template></el-table-column>
                        <el-table-column prop="updateTime" label="操作时间" ><template  slot-scope="scope">{{scope.row.createTime | parseTime}}</template></el-table-column>
                        <el-table-column prop="updater" label="操作人" ></el-table-column>
                    </el-table>
               </el-row>
           </el-form>
           <div slot="footer" class="dialog-footer">
               <el-button type="primary" plain  icon="el-icon-success" @click.stop="onSubmit" v-show="editType!='view'"  :disabled="ifDisable" v-if="editType != 'CertificationAudit'">{{editType == 'edit' ? '保 存' : '确 定'}}</el-button>
               <el-button type="primary" plain  icon="el-icon-success" @click.stop="handlerPass" :disabled="ifDisable" v-if="editType == 'CertificationAudit'">确认审核通过</el-button>
               <el-button type="primary" plain  icon="el-icon-warning" @click.stop="handlerOut" :disabled="ifDisable" v-if="editType == 'CertificationAudit'">审核不通过</el-button>
               <el-button type="primary" plain icon="el-icon-error" @click="closeMe" v-show="editType!='view'">取 消</el-button>
           </div>
   
           <transition name="el-zoom-in-top">
               <div class="PopupPic" v-el-drag-dialog v-show="showPopupPic">
                   <div class="el-dialog">
                       <div style="height:700px;">
                           <div class="el-dialog__header"><i class="el-icon-close" @click="closePopPic"></i></div>
                           <div class="showPictureBox">
                               <div class="PopupPicImg" v-viewer="{fullscreen: false,inline:true,navbar:false}">
                                   <img  :src='signImages ? signImages : defaultImg'>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </transition>
        </el-dialog>
    </div>
</template>
   <script>
   import Upload from '@/components/Upload/CarSinglemage'
   import { newShipperConfig, ShipperConfigDetails, data_get_shipper_view, reviseShipperConfig, identificateShipperConfig, auditShipperPassNew, auditShipperNoPassNew, treeAllList } from '@/api/users/shipper/all_shipper.js'
   import { DicShippertype, DicShipperLevel, DicBusinessInterests, DicGradeType } from '@/api/common.js'
   import vregion from '@/components/vregion/Region'
   import CustomerSearch from '@/components/CustomerSearch/select'
   import { REGEX } from '@/utils/validate'
   import { objectMerge2, parseTime } from '@/utils/'
   import businessGroup from '@/components/selectTree/businessGroup'
   import selectBelong from '../shipper/selectBelong'
   import tradeAreaList from '@/components/selectTree/tradeArea'
   export default {
     components: {
       Upload,
       vregion,
       CustomerSearch,
       businessGroup,
       selectBelong,
       tradeAreaList
     },
     props: {
       paramsView: {
         type: Object
       },
       typetitle: {
         type: String,
         default: ''
       },
       // originFrom:{
       //     type:String,
       // },
       /* add新增，edit编辑，view查看*/
       editType: {
         type: String
       },
       dialogFormVisible_add: {
         type: Boolean,
         default: false
       }
     },
     data() {
       // 手机号校验
       const validateMobile = (rule, value, callback) => {
               // console.log('value',value)
         if (!value) {
           callback(new Error('手机号码不能为空'))
         } else if (!REGEX.MOBILE.test(value)) {
           callback('请输入正确的联系号码~')
         } else if (this.editType === 'add') {
           data_get_shipper_view(value).then(res => {
             if (res.data) {
               callback(new Error('该手机号已经被注册~'))
             } else {
               callback()
             }
           }).catch(err => {
             callback(new Error('该手机号已经被注册~'))
           })
         } else {
           callback()
         }
       }
       var checkLocation = (rule, value, callback) => {
               // console.log('this.xinzengform.cityCode',this.xinzengform.provinceCode,this.xinzengform.cityCode)
         if (value == '') {
           callback(new Error('请输入出发地'))
         } else if (this.xinzengform.cityCode == '' && this.xinzengform.provinceCode != '北京市' && this.xinzengform.provinceCode != '天津市' && this.xinzengform.provinceCode != '重庆市' && this.xinzengform.provinceCode != '上海市') {
           callback(new Error('至少选择到市级范围'))
         } else {
           callback()
         }
       }

       var validateCompanyNamePass = (rule, value, callback) => {
               // console.log('this.xinzengform.shipperType',this.xinzengform.shipperType,value)
         if (this.xinzengform.shipperType == 'AF0010101') {
           callback()
         } else {
           if (value == '' || !value) {
             callback(new Error('请输入企业名称'))
           } else {
             callback()
           }
         }
       }

       var validateContactsPass = (rule, value, callback) => {
               // console.log('this.xinzengform.shipperType',this.xinzengform.shipperType)
         if (this.xinzengform.shipperType == 'AF0010101') {
           callback()
         } else {
           if (value == '' || !value) {
             callback(new Error('请输入联系人'))
           } else {
             callback()
           }
         }
       }

       var validateCreditCode = (rule, value, callback) => {
               // console.log('this.xinzengform.shipperType',this.xinzengform.shipperType)
         if (this.xinzengform.shipperType == 'AF0010101') {
           callback()
         } else {
           if (value == '' || !value) {
             callback(new Error('请输入社会统一信用代码'))
           } else {
             callback()
           }
         }
       }

       var validateBelongCityName = (rule, value, callback) => {
               // console.log('this.xinzengform.shipperType',this.xinzengform.shipperType)
         if (this.xinzengform.shipperType == 'AF0010101') {
           callback()
         } else {
           if (value == '' || !value) {
             callback(new Error('请输入认证所在地'))
           } else {
             callback()
           }
         }
       }

       var companyFacadeFilePass = (rule, value, callback) => {
               // console.log('this.xinzengform.businessLicenceFile',this.xinzengform.businessLicenceFile)
         if ((this.xinzengform.businessLicenceFile == '' || !this.xinzengform.businessLicenceFile) && this.xinzengform.shipperType != 'AF0010101') {
           if (value == '' || !value) {
             callback(new Error('请上传门头照'))
           } else {
             callback()
           }
         } else {
           callback()
         }
       }

       var shipperCardFilePass = (rule, value, callback) => {
         if ((this.xinzengform.businessLicenceFile == '' || !this.xinzengform.businessLicenceFile) && this.xinzengform.shipperType != 'AF0010101') {
           if (value == '' || !value) {
             callback(new Error('请上传名片照'))
           } else {
             callback()
           }
         } else {
           callback()
         }
       }

       return {
         defaultImg: '/static/test.jpg', // 默认第一张图片的url
         identifiy: '企业货主',
         ifDisable: false,
        //    ifShipperType:false,
         options: [],
         optionsLevel: [],
         optionsTradeArea: [], // 认证所属商圈
         formLabelWidth: '150px',
         shipperFollowUpType: false,
         signImages: '',
         showPopupPic: false,
         xinzengform: {
           mobile: '', // 手机号码
           areaCode: '', // 所在地区（传入汉字）
           cityCode: '', // 所在城市（传入汉字）
           provinceCode: '', // 所在省份（传入汉字）
           belongCity: '', // 所在地
           belongCityName: '', // 所在地名称
           regisAddress: '', // 注册地址
           regisAddressCode: '', // 注册地址码
           regisTrade: '', // 认证所属商圈(暂时不用,数据库未添加字段)
           regisTradeId: '', // 认证所属商圈Id(暂时不用,数据库未添加字段)
           regisFactoryArea: '', // 注册所场区(暂时不用,数据库未添加字段)
           shipperType: 'AF0010101', // 货主类型code
           shipperTypeName: '普通货主', // 货主类型名称
           potentialGrade: '', // 潜力等级code
           potentialGradeName: '', // 潜力等级nAME
           tradeAreaId: '', // 认证所属商圈ID
           tradeAreaName: '', // 认证所属商圈名字
           registerTime: '', // 注册时间
           registerOrigin: 'AF0030107', // 注册渠道Code
           registerOriginName: '云平台', // 注册渠道
           companyName: '', // 公司名称
           creditCode: '', // 统一社会代码
           contacts: '', // 联系人
           legalPerson: '', // 法人/负责人
           companyEstablishDate: '', // 公司成立时间
           companyAddress: '',
           authenticationTime: '', // 提交认证时间
           waitTime: '', // 等待时长
           authPassTime: '', // 认证通过时间
           businessLicenceFile: '', // 营业执照
           companyFacadeFile: '', // 上传公司或者档口照片
           shipperCardFile: '', // 上传发货人名片照片
           businessLicenceFileNoPass: '上传合格', // 营业执照审核
           companyFacadeFileNoPass: '上传合格', // 上传公司或者档口照片审核
           shipperCardFileNoPass: '上传合格', // 上传发货人名片照片审核
           shipperFollowUp: '0', // 需要后续跟进
           remark: '', //  备注
           discountLevel: '', // 优惠等级
           qrUrl: '', // 货主二维码
           aflcBusinessInformationList: []
         },
         businessType: {
           groupType: '', // 分组类型（0：业务部1：客服部）
           groupTypeName: '', //
           userStatus: '', // 用户服务类型（0：注册 1：认证 2：后续跟进）
           userStatusName: '',
           groupName: '', // 分组名称
           groupCode: '', // 分组代码
           belongCustomerService: '', // 所属客服人员
           belongCustomerServiceId: '', // 所属客服人员Id
           belongSalesmanName: '', // 所属业务员名称
           belongSalesmanMobile: '', // 所属业务员手机号码
           belongSalesman: '', // 所属业务员Id
           updateTime: '', // 更新时间
           updater: '' // 修改人
         },
         rulesForm: {
           mobile: { required: true, validator: validateMobile, trigger: 'change' },
           regisAddress: { required: true, message: '请选择注册所在地', trigger: 'change' },
           shipperType: { required: true, message: '请选择用户类型', trigger: 'change' },
           companyName: { validator: validateCompanyNamePass, trigger: 'blur' },
           contacts: { validator: validateContactsPass, trigger: 'blur' },
                // creditCode:{ validator: validateCreditCode, trigger:'blur' },
           companyFacadeFile: { validator: companyFacadeFilePass, trigger: 'blur' },
           shipperCardFile: { validator: shipperCardFilePass, trigger: 'blur' },
           belongCityName: { validator: validateBelongCityName, trigger: 'blur' }
               // belongCityName:{required:true, validator:checkLocation, trigger:['blur','change']},
               // companyFacadeFile:{required:true, message:'请上传公司或者档口照片', trigger:'blur'},
               // shipperCardFile:{required:true, message:'请上传发货人名片照片', trigger:'blur'}
         },
         optionsCheckPass: [{
           name: '上传合格',
           label: '上传合格'
         }, {
           name: '不清晰',
           label: '不清晰'
         }, {
           name: '内容不符',
           label: '内容不符'
         }],
         optionsBusinessInterests: [], // 业务权益类型
         spanArr: [],
         pos: 0,
         chooseType: false,
         optionsGradeType: [], // 潜力等级
         defaultprops: {
           label: 'tradeName',
           value: 'id',
           children: 'childrenList'
         }
       }
     },
     computed: {
        /**
         * 认证所属商圈禁用规则：
         * 查看详情时禁用、货主未认证点击修改时禁用
         */
       disableArea() {
         return (this.editType === 'view' || (this.$options.parent.tabType === 'unauthorized' && this.editType === 'edit'))
       }
     },
     watch: {
       dialogFormVisible_add: {
         handler: function(val, oldVal) {
           this.openDialog()
           this.getMoreInformation()
           console.warn('弹出框', this)
           console.log('editType:', this.editType)
           console.log('tabType:', this.$options.parent.tabType)
           console.log('flag:', this.disableArea)
         },
         deep: true
       },
       shipperFollowUpType(val, oldVal) {
         if (val) {
           this.xinzengform.shipperFollowUp = '1'
         } else {
           this.xinzengform.shipperFollowUp = '0'
         }
       }
        //    'xinzengform.tradeAreaId'(val, oldVal){
        //         if(val){
        //             this.xinzengform.tradeAreaName = this.optionsTradeArea.find(item => item.id ==  this.xinzengform.tradeAreaId)['professionTradeName'];
        //         }
        //    },
     },
     created() {
   
     },
     mounted() {
     },
     methods: {
       doName(val) {
         this.xinzengform.potentialGradeName = this.optionsGradeType.find(item => item.code == this.xinzengform.potentialGrade)['name']
         console.log('this.xinzengform.potentialGradeName', this.xinzengform.potentialGradeName)
       },
       getVal(val) {
         console.log('getVal', val)
                // this.standForm.parentId = val;
         this.xinzengform.tradeAreaId = val.id// 认证所属商圈ID
         this.xinzengform.tradeAreaName = val.tradeName// 认证所属商圈名字
       },
       showCurrenPic(type) {
         const vier = document.querySelector('.viewer-container')
         vier.style.width = '100%'
         vier.style.height = '100%'
         switch (type) {
           case 'businessLicenceFile':
             this.signImages = this.xinzengform.businessLicenceFile
             break
           case 'companyFacadeFile':
             this.signImages = this.xinzengform.companyFacadeFile
             break
           case 'shipperCardFile':
             this.signImages = this.xinzengform.shipperCardFile
             break
         }
         this.showPopupPic = true
       },
       closePopPic() {
         this.showPopupPic = false
       },
       ifFollowUpType() {
         this.xinzengform.shipperFollowUp = this.xinzengform.shipperFollowUp == '1' ? '0' : '1'
       },
       assignmentVal(val) {
         console.log('assignmentVal', val)
         this.xinzengform.companyAddress = val.address ? val.address : this.xinzengform.companyAddress
         this.xinzengform.companyName = val.companyName ? val.companyName : this.xinzengform.companyName
         this.xinzengform.legalPerson = val.legalPerson ? val.legalPerson : this.xinzengform.legalPerson
         this.xinzengform.creditCode = val.socialCreditCode ? val.socialCreditCode : this.xinzengform.creditCode
         this.$forceUpdate()
               // socialCreditCode社会信用代码
               // idNumber证件编号
               // setupDate成立日期
               // validityDate有效期
       },
        //    doActons(){
        //        for(var i = 0; i< 5;i++){
        //            let form = objectMerge2(this.businessType);
        //            switch(i){
        //                case 0:
        //                    form.groupType = '0';
        //                    form.groupTypeName = '业务部';
        //                    form.userStatus = '0';
        //                    form.userStatusName = '注册';
        //                    break;
        //                case 1:
        //                    form.groupType = '0';
        //                    form.groupTypeName = '业务部';
        //                    form.userStatus = '1';
        //                    form.userStatusName = '认证';
        //                    break;
        //                case 2:
        //                    form.groupType = '1';
        //                    form.groupTypeName = '客服部';
        //                    form.userStatus = '1';
        //                    form.userStatusName = '认证';
        //                    break;
        //                case 3:
        //                    form.groupType = '0';
        //                    form.groupTypeName = '业务部';
        //                    form.userStatus = '2';
        //                    form.userStatusName = '后续跟进';
        //                    break;
        //                case 4:
        //                    form.groupType = '1';
        //                    form.groupTypeName = '客服部';
        //                    form.userStatus = '2';
        //                    form.userStatusName = '后续跟进';
        //                    break;
        //            }
        //            this.xinzengform.aflcBusinessInformationList.push(form);
        //        }
        //    },
       handleClick(type, index) {
         switch (type) {
           case 'addItem':
             this.chooseType = true
                     // this.spanArr.push(1)
             this.xinzengform.aflcBusinessInformationList.push({
               flag: true,
                            // groupType:'',//分组类型（0：业务部1：客服部）
                            // groupTypeName:'',//
               userStatus: '', // 用户服务类型（0：注册 1：认证 2：后续跟进）
               userStatusName: '',
               groupName: '', // 分组名称
               groupCode: '', // 分组代码
                            // belongCustomerService:'',//所属客服人员
                            // belongCustomerServiceId:'',//所属客服人员Id
               belongSalesmanName: '', // 所属业务员名称
               belongSalesmanMobile: '', // 所属业务员手机号码
               belongSalesman: '', // 所属业务员Id
               updateTime: '', // 更新时间
               updater: '' // 修改人
             })
             break
           case 'conserve':
             let pass = false
                     // console.log(this.xinzengform.aflcBusinessInformationList,this.xinzengform.aflcBusinessInformationList[this.xinzengform.aflcBusinessInformationList.length - 1])
             const newForm = this.xinzengform.aflcBusinessInformationList[this.xinzengform.aflcBusinessInformationList.length - 1]
             if (newForm.userStatus == '' || newForm.groupCode == '' || newForm.belongSalesman == '') {
               pass = true
             }
   
             if (!pass) {
               this.chooseType = false
               this.xinzengform.aflcBusinessInformationList[this.xinzengform.aflcBusinessInformationList.length - 1].flag = false
               sessionStorage.setItem('once', false)
                            // this.xinzengform.aflcBusinessInformationList.sort(function(a,b){
                            //     return b.userStatusName.localeCompare(a.userStatusName, 'zh')
                            // })
                            // this.xinzengform.aflcBusinessInformationList.userStatusName =  this.optionsLevel.find(item => item.code ==  this.xinzengform.discountLevel)['name'];
                            // this.getSpanArr(this.xinzengform.aflcBusinessInformationList);
             } else {
               return this.$message({
                 type: 'warning',
                 message: '当前信息存在空值，不可保存!'
               })
             }
             break
           case 'cancel':
             this.chooseType = false
             this.xinzengform.aflcBusinessInformationList.pop()
             break
           case 'delet':
             if (this.chooseType) {
               return this.$message({
                 type: 'warning',
                 message: '请先保存或取消当前编辑内容!'
               })
             } else {
               this.xinzengform.aflcBusinessInformationList.splice(index, 1)
             }
             break
         }
       },
       getSpanArr(data) {
         this.spanArr = []
         this.pos = 0
         for (var i = 0; i < data.length; i++) {
           if (i === 0) {
             this.spanArr.push(1)
             this.pos = 0
           } else {
                   // 判断当前元素与上一个元素是否相同
             if (data[i].userStatus === data[i - 1].userStatus) {
               this.spanArr[this.pos] += 1
               this.spanArr.push(0)
             } else {
               this.spanArr.push(1)
               this.pos = i
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
           const _row = this.spanArr[rowIndex]
           const _col = _row > 0 ? 1 : 0
                 //    console.log('_row,_col',_row,_col,this.spanArr,this.spanArr[rowIndex])
           return {
             rowspan: _row,
             colspan: _col
           }
         }
            //    }
       },
       getCustomer1(val, key) {
            //    console.log('belongSalesman',val,key)
         this.xinzengform.aflcBusinessInformationList[key].belongCustomerService = val.name
         this.xinzengform.aflcBusinessInformationList[key].belongCustomerServiceId = val.userId
         //    console.log('this.xinzengform.aflcBusinessInformationList',this.xinzengform.aflcBusinessInformationList)
       },
       getReturnBelong(val, key) {
            //    console.log('val,key',val,key)
         this.xinzengform.aflcBusinessInformationList[key].belongSalesmanName = val.name
         this.xinzengform.aflcBusinessInformationList[key].belongSalesman = val.userId
         this.xinzengform.aflcBusinessInformationList[key].belongSalesmanMobile = val.mobile
         //    console.log(this.xinzengform.aflcBusinessInformationList)
       },
       getObject(i, e) {
         console.log('i,e', i, e)
         this.xinzengform.aflcBusinessInformationList[i].groupName = e.groupName
         this.xinzengform.aflcBusinessInformationList[i].groupCode = e.groupCode
       },
       complateName(val, key) {
                // console.log('val,key',val,key)
         this.xinzengform.aflcBusinessInformationList[key].userStatusName = this.optionsBusinessInterests.find(item => item.code == val)['name']
             // console.log(this.xinzengform.aflcBusinessInformationList)
       },
       regionChange(d) {
               // console.log('data:',d)
         this.xinzengform.belongCityName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
         if (d.area) {
           this.xinzengform.areaCode = d.area.name
           this.xinzengform.belongCity = d.area.code
         } else if (d.city) {
           this.xinzengform.belongCity = d.city.code
           this.xinzengform.cityCode = d.city.name
         } else {
           this.xinzengform.belongCity = d.province ? d.province.code : ''
           this.xinzengform.provinceCode = d.province ? d.province.name : ''
         }
       },
       regionChangeA(d) {
         this.xinzengform.regisAddress = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
         if (d.area) {
           this.xinzengform.regisAddressCode = d.area.code
         } else if (d.city) {
           this.xinzengform.regisAddressCode = d.city.code
         } else {
           this.xinzengform.regisAddressCode = d.province ? d.province.code : ''
         }
       },
       getValue(obj) {
         return obj ? obj.value : ''
       },
       openDialog() {
            //    console.log('xxxxx',this.editType,this.paramsView)
         this.chooseType = false
            // this.clearForm()
         if (this.editType !== 'add') {
                    // this.isMerge = true;
           ShipperConfigDetails(this.paramsView.shipperId).then(res => {
             this.clearForm()
             this.xinzengform = objectMerge2(this.xinzengform, res.data)
                     // console.log('ShipperConfigDetails',this.xinzengform)
                     // this.ifShipperType = false;
             this.xinzengform.businessLicenceFileNoPass = this.xinzengform.businessLicenceFileNoPass ? this.xinzengform.businessLicenceFileNoPass : '上传合格'// 营业执照审核
             this.xinzengform.companyFacadeFileNoPass = this.xinzengform.companyFacadeFileNoPass ? this.xinzengform.companyFacadeFileNoPass : '上传合格'// 上传公司或者档口照片审核
             this.xinzengform.shipperCardFileNoPass = this.xinzengform.shipperCardFileNoPass ? this.xinzengform.shipperCardFileNoPass : '上传合格'// 上传发货人名片照片审核
   
             if (!this.xinzengform.aflcBusinessInformationList) {
               this.xinzengform.aflcBusinessInformationList = []
             } else if (this.xinzengform.aflcBusinessInformationList.length == 0) {
                            //    this.doActons();
                            //    this.getSpanArr(this.xinzengform.aflcBusinessInformationList);
             } else {
                            // this.getSpanArr(this.xinzengform.aflcBusinessInformationList);
             }

                        // 监听客户上报跳转展示编辑
             const isOnece = sessionStorage.getItem('once')
             if (isOnece && isOnece === 'true') {
               const data = JSON.parse(sessionStorage.getItem('checkData'))
               if (!!data && JSON.stringify(data) != '{}') {
                 this.xinzengform.aflcBusinessInformationList.push({
                   flag: false,
                   belongSalesman: data.salesmanId,
                   belongSalesmanMobile: data.mobile,
                   belongSalesmanName: data.name,
                   groupCode: data.groupCode,
                   groupName: data.groupName,
                   updateTime: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
                   updater: '',
                   userStatus: data.code,
                   userStatusName: data.codeName
                 })
               }
             }
   
             if (this.editType == 'identification' || this.editType == 'CertificationAudit') {
               this.xinzengform.shipperType = this.xinzengform.shipperType === 'AF0010101' ? 'AF0010102' : this.xinzengform.shipperType
               this.xinzengform.shipperTypeName = this.xinzengform.shipperTypeName === '普通货主' ? '企业货主' : this.xinzengform.shipperTypeName
             }
           })
                //    console.log('this.xinzengformxinzengform',this.xinzengform)
         } else {
           this.clearForm()
             //    this.doActons();
             //    this.getSpanArr(this.xinzengform.aflcBusinessInformationList);
         }
       },
       clearForm() {
         for (const i in this.xinzengform) {
                   // console.log(i,this.xinzengform[i])
           if (i === 'shipperType') {
             this.xinzengform[i] = 'AF0010101'
           } else if (i === 'shipperTypeName') {
             this.xinzengform[i] = '普通货主'
           } else if (i === 'registerOrigin') {
             this.xinzengform[i] = 'AF0030107'
           } else if (i === 'registerOriginName') {
             this.xinzengform[i] = '云平台'
           } else if (i === 'businessLicenceFileNoPass') {
             this.xinzengform[i] = '上传合格'
           } else if (i === 'companyFacadeFileNoPass') {
             this.xinzengform[i] = '上传合格'
           } else if (i === 'shipperCardFileNoPass') {
             this.xinzengform[i] = '上传合格'
           } else if (i === 'aflcBusinessInformationList') {
             this.xinzengform[i] = []
           } else if (i === 'aflcBlackUserList') {
             this.xinzengform[i] = []
           } else if (i === 'aflcFreezeUserList') {
             this.xinzengform[i] = []
           } else if (i === 'shipperFollowUp') {
             this.xinzengform[i] = '0'
           } else {
             this.xinzengform[i] = ''
           }
         }
               // console.log('this.xinzengform',this.xinzengform)
       },
       closeMe(done) {
               // console.log(this.$refs.regionChangeA)
         if (this.editType == 'add') {
           this.$refs.regionChangeA.clear()
         }
         if (this.editType != 'view') {
           this.$refs.regionChange.clear()
         }
         this.$refs.xinzengform.resetFields()
         this.ifDisable = false
         this.clearForm()
         if (typeof done === 'function') {
           done()
         }
   
         this.$emit('update:dialogFormVisible_add', false)
         this.$emit('getData')
       },
           // 获取货主类型
       getMoreInformation() {
               // if(this.originFrom != 'ShipperUnauthorized'){
        this.$store.dispatch("GetInfoDic", "AF00101").then(res => {
            this.options = res;
            if (this.editType == 'identification' || this.editType == 'CertificationAudit') {
             this.options = this.options.filter(el => {
               return el.code != 'AF0010101'
             })
           }
        });
        this.$store.dispatch("GetInfoDic", "AF00208").then(res => {
            this.optionsLevel = res;
        });
        this.$store.dispatch("GetInfoDic", "AF00210").then(res => {
            this.optionsBusinessInterests = res.filter(el => {
                return el.name != '注册'
           })
        });
        this.$store.dispatch("GetInfoDic", "AF00211").then(res => {
            this.optionsGradeType = res;
        });
        //  DicShippertype().then(res => {
        //                // console.log('货主类型',res)
        //    this.options = res.data
        //    if (this.editType == 'identification' || this.editType == 'CertificationAudit') {
        //      this.options = this.options.filter(el => {
        //        return el.code != 'AF0010101'
        //      })
        //    }
        //  })
            // }
        //  DicShipperLevel().then(res => {
        //    this.optionsLevel = res.data
        //  })

        //  DicBusinessInterests().then(res => {
        //         //    this.optionsBusinessInterests = res.data;
        //    this.optionsBusinessInterests = res.data.filter(el => {
        //      return el.name != '注册'
        //    })
        //  })
 
        //  DicGradeType().then(res => {
        //    this.optionsGradeType = res.data
        //  })

                // treeAllList().then(res => {
                //     this.optionsTradeArea = this.getTreeData(res.data) ;
                // })
       },
           // 保存
       onSubmit() {
            //    console.log('this.rulesForm',this.xinzengform)
                // 去除客户上报存储信息
         if (this.editType == 'edit') {
           if (this.xinzengform.potentialGrade) {
             this.xinzengform.potentialGradeName = this.optionsGradeType.find(item => item.code == this.xinzengform.potentialGrade)['name']
           }
           var forms = objectMerge2(this.xinzengform)
           this.ifDisable = true
           reviseShipperConfig(forms).then(res => {
             this.$message({
               type: 'success',
               message: '操作成功~'
             })
             sessionStorage.setItem('once', false)
             this.closeMe()
           }).catch(err => {
             this.$message({
               type: 'warning',
               message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
             })
             this.ifDisable = false
           })
         } else {
           this.$refs['xinzengform'].validate((valid) => {
             if (valid) {
                           // this.xinzengform.discountLevelName =  this.optionsLevel.find(item => item.code ==  this.xinzengform.discountLevel)['name'];
               if (this.xinzengform.potentialGrade) {
                 this.xinzengform.potentialGradeName = this.optionsGradeType.find(item => item.code == this.xinzengform.potentialGrade)['name']
               }
               var forms = objectMerge2(this.xinzengform)
               switch (this.editType) {
                 case 'add':
                   this.ifDisable = true
                                // console.log('this.rulesForm',forms)
                   newShipperConfig(forms).then(res => {
                     this.closeMe()
                     this.$message({
                       type: 'success',
                       message: '操作成功~'
                     })
                   }).catch(err => {
                     this.$message({
                       type: 'warning',
                       message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                     })
                     this.ifDisable = false
                   })
                   break
                 case 'identification':
                   if (this.chooseType) {
                     this.$message({
                       type: 'error',
                       message: '检测到新增权益类型未保存!请先保存!'
                     })
                   } else {
                     const item = forms.mobile
                     this.$confirm('确定要认证通过' + item + ' 该货主吗？', '提示', {
                       confirmButtonText: '确定',
                       cancelButtonText: '取消',
                       type: 'warning'
                     }).then(() => {
                       identificateShipperConfig(forms).then(res => {
                         this.$message({
                           type: 'success',
                           message: '该货主已认证成功'
                         })
                         this.closeMe()
                       }).catch(err => {
                         this.$message({
                           type: 'warning',
                           message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                         })
                       })
                     }).catch(() => {
                       this.$message({
                         type: 'info',
                         message: '已取消'
                       })
                     })
                   }
                   break
               }
             } else {
               return this.$message({
                 type: 'warning',
                 message: '请填写完整数据'
               })
             }
           })
         }
       },
             // 审核不通过
       handlerOut() {
         let ifQualified
         if (this.xinzengform.shipperCardFileNoPass == '上传合格' && this.xinzengform.companyFacadeFileNoPass == '上传合格' && this.xinzengform.businessLicenceFileNoPass == '上传合格') {
           ifQualified = true
         } else {
           ifQualified = false
         }
         if (this.chooseType) {
           this.$message({
             type: 'error',
             message: '检测到新增权益类型未保存!请先保存!'
           })
         } else {
           if (ifQualified) {
             this.$message({
               type: 'error',
               message: '请确认用户提交认证图片信息，如都上传合格，则不能操作审核不通过，货主基本信息可根据上传图片进行修改!'
             })
           } else {
             const item = this.xinzengform.mobile
             this.$confirm('确定要不通过' + item + ' 货主吗？', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               this.ifDisable = true
               if (this.xinzengform.potentialGrade) {
                 this.xinzengform.potentialGradeName = this.optionsGradeType.find(item => item.code == this.xinzengform.potentialGrade)['name']
               }
               var forms = objectMerge2(this.xinzengform)
               auditShipperNoPassNew(forms).then(res => {
                 this.$message({
                   type: 'success',
                   message: '该货主未通过审核!'
                 })
                 this.closeMe()
               }).catch(err => {
                 this.$message({
                   type: 'info',
                   message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                 })
                 this.ifDisable = false
               })
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消'
               })
             })
           }
         }
       },
   
           // 审核通过
       handlerPass() {
         let ifQualified = true
         if (this.xinzengform.shipperCardFileNoPass == '上传合格' && this.xinzengform.companyFacadeFileNoPass == '上传合格' && this.xinzengform.businessLicenceFileNoPass == '上传合格') {
           ifQualified = true
         } else {
           ifQualified = false
         }
         this.$refs['xinzengform'].validate((valid) => {
           if (valid && ifQualified) {
             if (this.chooseType) {
               this.$message({
                 type: 'error',
                 message: '检测到新增权益类型未保存!请先保存!'
               })
             } else {
               this.ifDisable = true
               if (this.xinzengform.potentialGrade) {
                 this.xinzengform.potentialGradeName = this.optionsGradeType.find(item => item.code == this.xinzengform.potentialGrade)['name']
               }
               var forms = objectMerge2(this.xinzengform)
               auditShipperPassNew(forms).then(res => {
                 this.closeMe()
                 this.$message({
                   type: 'success',
                   message: '该货主认证通过!'
                 })
                 sessionStorage.setItem('once', false)
               }).catch(err => {
                 this.$message({
                   type: 'info',
                   message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                 })
                 this.ifDisable = false
               })
             }
           } else {
             return this.$message({
               type: 'error',
               message: '审核未满足通过要求，图片必须全部满足上传合格!!'
             })
           }
         })
       }
     }
   }
   </script>
   <style lang="scss">
       .shippercreatDialog{
           /* .el-dialog__footer{
               border-top:1px solid #ccc;   
               margin: 0 10px;
           }
           .upload{
               width: 300px;
               line-height: 20px;
               img{
                   display: block;
                   width: 100%;
                   height: 300px;
               }
           } */
            img{
                cursor: pointer;
                width:100%;
            }
           .PopupPic{
               width: 0;
               height: 0;
               position: fixed;
               left: 15%;
               top: 20%;
               /* transform: translate(-50%, -50%); */
               .el-dialog{
                   /* width: auto; */
                   /* min-width: 100px; */
                   /* max-width: 80%; */
                   /* max-height: 95%; */
                   /* overflow: auto; */
                   /* padding:0 20px 30px; */
                   .el-dialog__header{
                       background-color: #fff;
                       position: relative;
                       border: 0 none;
                       padding:20px 0;
                       background-color: #42485b;
                       .el-icon-close{
                           color: #999;
                           position:absolute;
                           right:20px;
                           top:12px;
                           font-size: 20px;
                           cursor: pointer;
                           &:hover{
                               color: #409eff;
                           }
                       }
                   }
                   .showPictureBox{
                       min-height: 700px;
                       .PopupPicImg{
                           width: 100%;
                           height:700px;
                           img{
                               display: none;
                               width: 100%;
                               height:700px;
                           }
                        //    .viewer-container{
                        //        width: 100% !important;
                        //        height: 700px !important;
                        //    }
                        //    .viewer-backdrop {
                        //        width: 100% !important;
                        //        height: 700px !important;
                        //    }
                       }
                       /* max-height: 100%; */
                       /* img {
                           max-width: 100%;
                           max-height: 100%;
                       } */
                   }
               }
           }
       }
   </style>

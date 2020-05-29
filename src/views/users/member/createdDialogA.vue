<template>
     <div class="logisticsDialog commoncss StyleNewinfoComponent">
      <el-dialog :title="typetitle" :visible="dialogFormVisible_add" :before-close="close" top="5vh" :close-on-click-modal="false" >
        <el-form :model="xinzengform" ref="xinzengform" :rules="rulesForm" :label-width="formLabelWidth">
            <el-row>
                <el-row>
                    <h2 class="carNewinfoH2">个人信息</h2>
                    <el-col :span="8">
                        <el-form-item label="手机号码：" prop="mobile">
                            <el-input v-model="xinzengform.mobile" :disabled="editType != 'add'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="注册所在地："  prop="belongCityName">
                            <!-- <el-input v-model="xinzengform.belongCityName" auto-complete="off"  disabled></el-input> -->
                            <el-input v-model="xinzengform.belongCityName" auto-complete="off" v-if="editType=='view'" disabled></el-input>
                            <vregion :ui="true"  @values="regionChangeA" class="form-control" ref = "regionChangeA" v-else>
                                <el-input v-model="xinzengform.belongCityName" placeholder="请选择" ></el-input>
                            </vregion>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="认证状态："  prop="authStatusName">
                            <el-input v-model="xinzengform.authStatusName"  disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="账户状态："  prop="accountStatusName">
                        <el-input v-model="xinzengform.accountStatusName"   disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="editType!='add'">
                    <el-form-item label="注册日期：" prop="registerTime">
                        <el-input :value="xinzengform.registerTime | parseTime" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="editType!='add'">
                    <el-form-item label="注册渠道："  prop="registerOriginName">
                        <el-input v-model="xinzengform.registerOriginName"  disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否开通会员："  prop="isVip">
                        <el-button 
                        v-if = "editType !='view'"
                        :type="xinzengform.isVip == '1' ? 'primary' : 'info'"
                        plain
                        @click="xinzengform.isVip = xinzengform.isVip == '0' ? '1' : '0'"><i :class="xinzengform.isVip == '1' ? 'el-icon-success' : 'el-icon-error'" style="margin-right:10px;"></i>{{xinzengform.isVip == '1' ? '是' : '否'}}</el-button>
                        <el-input :value="xinzengform.isVip == '0' ? '否' : '是'"  auto-complete="off" disabled v-else></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否开通TMS：" prop="isOpenTms">
                        <el-button 
                        v-if = "editType !='view'"
                        :type="xinzengform.isOpenTms == '1' ? 'primary' : 'info'"
                        plain
                        @click="xinzengform.isOpenTms = xinzengform.isOpenTms == '0' ? '1' : '0'"><i :class="xinzengform.isOpenTms == '1' ? 'el-icon-success' : 'el-icon-error'" style="margin-right:10px;"></i>{{xinzengform.isOpenTms == '1' ? '是' : '否'}}</el-button>
                        <el-input :value="xinzengform.isOpenTms == '0' ? '否' : '是'"  auto-complete="off" disabled v-else></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <h2 class="carNewinfoH2">资质信息</h2>
                <el-col :span="8">
                    <el-form-item label="公司名称："  prop="licenceCompany.companyName">
                        <el-input maxlength="20" v-model="xinzengform.licenceCompany.companyName"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="社会统一信用代码：" prop="licenceCompany.socialCreditCode">
                        <el-input v-model="xinzengform.licenceCompany.socialCreditCode"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系人："  prop="contactsName">
                        <el-input v-model="xinzengform.licenceCompany.contactsName"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="经营年限："  prop="licenceCompany.businessLife">
                        <el-input :maxlength="5" v-model="xinzengform.licenceCompany.businessLife"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="法人/负责人：" prop="licenceCompany.legalPerson">
                        <el-input :maxlength="20" v-model="xinzengform.licenceCompany.legalPerson"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="所属品牌："  prop="belongBrandCode">
                            <el-input  v-model="xinzengform.licenceCompany.belongBrand"  disabled v-if="editType=='view'"></el-input>
                            <el-select v-model="xinzengform.licenceCompany.belongBrandCode" placeholder="请选择" v-else>
                                <el-option
                                v-for="item in optionsBelongBrand"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="公司成立时间："  prop="setupDate">
                        <el-input  v-model="xinzengform.licenceCompany.setupDate" disabled v-if="editType=='view'"></el-input>
                        <el-date-picker
                        v-else
                        v-model="xinzengform.licenceCompany.setupDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="认证所在地："  prop="licenceCompany.provinceCityArea">
                        <vregion :ui="true" @values="regionChange" class="form-control">
                            <el-input v-model="xinzengform.licenceCompany.provinceCityArea" placeholder="请选择"></el-input>
                        </vregion>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="保证金（元）：" prop="collateral">
                        <el-input :maxlength="20" v-model="xinzengform.collateral"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="公司地址："  prop="address">
                        <el-input :maxlength="40" v-model="xinzengform.licenceCompany.address" auto-complete="off"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-viewer> 
                <el-col :span="8" class="CheckPass">
                    <el-form-item prop="businessLicenceFile" label-width="0">
                        <div class="uploadPicture">
                            <h3 class="uploadH3">营业执照  
                                <el-button type="primary" class="showPictureBtn" plain v-if="editType != 'view' && xinzengform.licenceCompany.businessLicenceFile" @click="showCurrenPic('businessLicenceFile')">查看</el-button>
                            </h3>
                            <div class="uploadImgBox" v-if="editType == 'view'">
                                <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                    <img :src='xinzengform.licenceCompany.businessLicenceFile ? xinzengform.licenceCompany.businessLicenceFile : defaultImg'  alt="" >
                                </el-tooltip>
                            </div>
                            <div class="upload_True" v-else >
                                <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="xinzengform.licenceCompany.businessLicenceFile" uploadType="businessLicenceFile" @getInformation = "assignmentVal"/>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="businessLicenceFileNoPass" label="图片审核状态：" >
                        <el-input v-model="xinzengform.businessLicenceFileNoPass" auto-complete="off" v-if="editType=='view' || editType=='add'"  disabled></el-input>
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
                        <el-input v-model="xinzengform.companyFacadeFileNoPass" auto-complete="off" v-if="editType=='view' || editType=='add'"  disabled></el-input>
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
                    <el-form-item prop="takeIdCardFile" label-width="0">
                        <div class="uploadPicture">
                            <h3 class="uploadH3">名片照
                                <el-button type="primary" class="showPictureBtn" plain v-if="editType != 'view' && xinzengform.takeIdCardFile" @click="showCurrenPic('takeIdCardFile')">查看</el-button>
                            </h3>
                            <div class="uploadImgBox" v-if="editType == 'view'">
                                <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                    <img :src='xinzengform.takeIdCardFile ? xinzengform.takeIdCardFile : defaultImg'  alt="" >
                                </el-tooltip>
                            </div>
                            <div class="upload_True" v-else>
                                <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="xinzengform.takeIdCardFile" />
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="takeIdCardFileNoPass" label="图片审核状态：" >
                        <el-input v-model="xinzengform.takeIdCardFileNoPass" auto-complete="off" v-if="editType=='view' || editType=='add'"  disabled></el-input>
                        <el-select v-model="xinzengform.takeIdCardFileNoPass" placeholder="请选择" v-else>
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
            <el-row>        
                <el-col :span="24" class="moreLength">
                    <el-form-item label="产品与服务：" :label-width="formLabelWidth">
                        <p v-if="editType == 'view'">
                            <span class="serviceChoose" v-if="productServiceName.length == 0 ">暂未选择</span>
                            <span v-else v-for="(item,key) in productServiceName" :key="key" class="serviceChoose">
                                {{item}}
                            </span>
                        </p>
                        <el-checkbox-group v-model="optionsProductArr" v-else>
                            <el-checkbox v-for="obj in optionsProductService" :label="obj.code" :key="obj.id" >{{obj.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>        
                <el-col :span="24" class="moreLength">
                    <el-form-item label="会员服务承诺：" :label-width="formLabelWidth">
                        <p v-if="editType == 'view'">
                            <span v-if="otherServiceName.length == 0 " class="serviceChoose">暂未选择</span>
                            <span v-else v-for="(item,key) in otherServiceName" :key="key" class="serviceChoose" >
                                {{item}}
                            </span>
                        </p>
                        <el-checkbox-group v-model="otherServiceCodeArr" v-else>
                            <el-checkbox v-for="obj in optionsLogisticsCompany" :label="obj.code" :key="obj.id" >{{obj.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row v-if="editType !== 'add'">
                <el-col :span="8">
                    <el-form-item label="提交认证时间："  prop="submitAuditTime">
                        <el-input :value="xinzengform.auditCompany.submitAuditTime | parseTime" disabled></el-input>                        
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="等待时长："  prop="waitAuditTime">
                        <el-input v-model="xinzengform.waitAuditTime" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="审核通过时间：" prop="passAuditTime">
                        <el-input :value="xinzengform.auditCompany.passAuditTime | parseTime" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- <el-row style="margin-bottom:22px;">
                <h2 class="carNewinfoH2">业务信息</h2>
                <el-table
                :data="xinzengform.businessInformationList"
                :span-method="objectSpanMethod"
                border
                ref="multipleTable"
                stripe
                align = "center"
                tooltip-effect="dark"
                style="width: 100%"
                >
                    <el-table-column
                        prop="userStatusName"
                        label="服务类型"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="groupTypeName"
                        label="归属"
                        >
                    </el-table-column>
                    <el-table-column label="所属组">
                        <template  slot-scope="scope"> 
                            <span v-if="editType=='view'" >{{ scope.$index == 1 || scope.$index==3 ? '/' : scope.row.groupTypeName }}</span>
                            <div v-else>
                                <span v-if="scope.$index==1||scope.$index==3">/</span>
                                <businessGroup  @inputObject = "getObject(scope.$index,$event)" v-model="scope.row.groupName" ref="businessGroup" v-else/>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="所属人">
                        <template  slot-scope="scope">
                            <span v-if="editType=='view'" >{{ scope.$index==1 || scope.$index==3 ? scope.row.belongCustomerService : scope.row.belongSalesmanName }}</span>
                            <div v-else>
                                <CustomerSearch @returnCustomer = '(value)=>{getCustomer1(value,scope.$index)}' :customerName = "scope.row.belongCustomerService" ref="SalesmanName" v-if="scope.$index==1||scope.$index==3"/>
                                <selectBelong :groupCode = "scope.row.groupCode" :belongSalesman = 'scope.row.belongSalesmanMobile' @returnBelong = '(value)=>{getReturnBelong(value,scope.$index)}' v-else/>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="更新时间"
                        >
                        <template  slot-scope="scope"> 
                            {{scope.row.updateTime | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="updater"
                        label="操作人"
                        >
                    </el-table-column>
                </el-table>
            </el-row> -->
            
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
                   :data="xinzengform.businessInformationList"
                   :span-method="objectSpanMethod"
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
                                   <businessGroup  @inputObject = "getObject(scope.$index,$event)" v-model="scope.row.groupName" ref="businessGroup"/>
                               </div>
                           </template>
                       </el-table-column>
                       <el-table-column label="所属人">
                           <template  slot-scope="scope">
                               <span v-if="!scope.row.flag" >{{ scope.row.belongSalesmanName }}</span>
                               <div v-else>
                                   <selectBelong :groupCode = "scope.row.groupCode" :belongSalesman = 'scope.row.belongSalesmanMobile' @returnBelong = '(value)=>{getReturnBelong(value,scope.$index)}'/>
                               </div>
                           </template>
                       </el-table-column>
                       <el-table-column
                           prop="updateTime"
                           label="操作时间"
                           >
                           <template  slot-scope="scope"> 
                              {{scope.row.updateTime | parseTime}}
                           </template>
                       </el-table-column>
                       <el-table-column
                           prop="updater"
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
                    <el-form-item label="需要后续跟进状态："  prop="isFollow">
                        <el-button 
                        v-if = "editType !='view'"
                        :type="xinzengform.isFollow == '0' ? 'primary' : 'info'"
                        plain
                        @click="xinzengform.isFollow = xinzengform.isFollow == '1' ? '0' : '1'"><i :class="xinzengform.isFollow == '0' ? 'el-icon-success' : 'el-icon-error'" style="margin-right:10px;"></i>{{xinzengform.isFollow == '0' ? '是' : '否'}}</el-button>
                        <el-input :value="xinzengform.isFollow == '0' ? '否' : '是'"  auto-complete="off" disabled v-else></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row v-if="editType!='add'">
                <el-col :span="24">
                    <el-form-item label="审核备注：" prop="auditRemark">
                        <el-input
                            placeholder="少于100字符"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            clearable
                            maxlength="100"
                            :disabled="editType=='view'"
                            v-model="xinzengform.auditCompany.auditRemark">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain  icon="el-icon-success" @click.stop="handlerPass" v-if="editType == 'CertificationAudit' || editType == 'identification'">{{ editType == 'CertificationAudit' ? '确认审核通过' : '代客认证'}}</el-button>
            <el-button type="primary" icon="el-icon-success" plain @click.stop="onSubmit" v-show="editType!='view'" :disabled="btnStatus" v-if="editType != 'CertificationAudit'">{{editType == 'edit' || editType == 'add' ? '确 定' : '仅保存'}}</el-button>
            <el-button type="primary" plain  icon="el-icon-warning" @click.stop="handlerOut" v-if="editType == 'CertificationAudit'">审核不通过</el-button>
            <el-button type="primary" icon="el-icon-error" plain @click="close" v-show="editType!='view'">取 消</el-button>
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
import { data_ChangeLogisticsCompany,authAflcLogisticsCompany,newLogisticsCompany,getaflcLogisticsCompanyFreezeReason } from '@/api/users/logistics/LogisticsCompany.js'
import vregion from '@/components/vregion/Region.vue'
import { pickerOptions3 } from '@/utils/index.js'
import { data_LogisticsCompany,getDictionary,DicBusinessInterests } from '@/api/common.js'
import { objectMerge2, parseTime } from '@/utils/'
import CustomerSearch from '@/components/CustomerSearch/select'
import businessGroup from '@/components/selectTree/businessGroup'  
import selectBelong from '../shipper/selectBelong'
import '../components/commonStyle.scss'
import {REGEX} from '@/utils/validate'

export default {
    components:{
        Upload,
        vregion,
        CustomerSearch,
        businessGroup,
        selectBelong
    },
    props:{
        paramsView:{
            type:Object,
        },
        params:{
            type:Object,
        },
        value:{
            type: String,
            default:''
        },
        typetitle: {
           type: String,
           default: ''
        },
        /*add新增，edit编辑，view查看*/
        editType: {
            type: String,
        },
        dialogFormVisible_add:{
            type:Boolean,
            required:true
        },
    },
    data(){
        const validateMobile = (rule, value, callback) => {
            // console.log('value',value)
            if(!value){
                callback(new Error('手机号码不能为空'));
            }
            else if (!REGEX.MOBILE.test(value)) {
                callback('请输入正确的联系号码~')
            }else{
                callback()
            }
        }
        return{
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
                shortcuts: pickerOptions3
            },
            btnStatus:false,
            belongBrand:'AF029',//品牌code
            productServiceCode:'AF027',//产品与服务code
            signImages:'',
            defaultImg:'/static/test.jpg',//默认第一张图片的url
            otherServiceName:[],//会员承诺服务Name
            productServiceName:[],//产品与服务Name
            optionsLogisticsCompany:[],//会员服务承诺
            optionsBelongBrand:[],//品牌类型
            optionsProductService:[],//产品与服务
            optionsProductArr:[],
            optionsServer:[],//服务类型
            otherServiceCodeArr:[],//选择增值服务
            formLabelWidth:'150px',
            showPopupPic: false,
            xinzengform:{
                account:'',//物流公司账号
                mobile:'',//手机号码
                belongCityName:'',//注册所在地
                provinceCode:'',//
                cityCode:'',//
                areaCode:'',//
                belongCity:'',//code
                authStatus:'',//认证状态Code
                authStatusName:'',//认证状态
                accountStatusName:'',//账户状态      
                accountStatus:'',//账户状态Code	
                registerTime:'',//注册日期
                registerOriginName:'',//注册来源Name
                registerOrigin:'',//注册来源
                isVip:'0',//是否开通会员（0 否 1 是）
                isOpenTms:'0',//是否开通TMS（0 否 1 是）
                businessInformationList:[],
                //公司信息
                licenceCompany:{
                    companyName:'',//公司名称
                    socialCreditCode:'',//社会信用代码
                    contactsName:'',//联系人
                    businessLife:'',//经营年限
                    legalPerson:'',//法人/负责人
                    belongBrand:'',//所属品牌
                    belongBrandCode:'',//所属品牌Code
                    setupDate:'',//公司成立时间
                    address:'',//公司地址
                    businessLicenceFile:'',//营业执照照片
                    belongAreaCode:'',
                    belongAreaName:'',
                    belongCityName:'',
                    belongProvinceName:'',
                    provinceCityArea:'',
                },
                collateral:'',//保证金（元）
                businessLicenceFileNoPass:'上传合格',//营业执照照片不通过原因
                companyFacadeFile:'',//公司或者档口照片
                companyFacadeFileNoPass:'上传合格',//公司或者档口照片不通过原因
                takeIdCardFile:'',//手持身份证正面照片
                takeIdCardFileNoPass:'上传合格',//手持身份证正面照片不通过原因
                productService:'',//产品与服务
                productServiceCode:'',//产品与服务Code
                otherService:'',//增值服务
                otherServiceCode:'',//增值服务code
                //认证信息
                auditCompany:{
                    submitAuditTime:'',//提交认证时间
                    waitAuditTime:'',//认证等待时长
                    passAuditTime:'',//审核通过时间
                    auditRemark:'',//审核备注
                }
            },
            // businessType:{
            //     groupType:'',//分组类型（0：业务部1：客服部）
            //     groupTypeName:'',//
            //     userStatus:'',//用户服务类型（0：注册 1：认证 2：后续跟进）
            //     userStatusName:'',
            //     groupName:'',//分组名称
            //     groupCode:'',//分组代码
            //     belongCustomerService:'',//所属客服人员
            //     belongCustomerServiceId:'',//所属客服人员Id
            //     belongSalesmanName:'',//所属业务员名称
            //     belongSalesmanMobile:'',//所属业务员手机号码
            //     belongSalesman:'',//所属业务员Id
            //     updateTime:'',//更新时间
            //     updater	:'',//修改人
            // },
            optionsCheckPass:[{
                name:'上传合格',
                label:'上传合格'
            },{
                name:'不清晰',
                label:'不清晰'
            },{
                name:'内容不符',
                label:'内容不符'
            }],
            optionsBusinessInterests:[],//业务权益类型
            spanArr: [],
            pos: 0 ,
            chooseType:false,
            rulesForm:{
                // mobile:{required: true, message:'请输入手机号码', trigger:'change'},
                mobile:{required: true,validator:validateMobile, trigger:'change'},
                'licenceCompany.companyName':{required: true, message:'请输入公司名称', trigger:'change'},
                'licenceCompany.socialCreditCode':{required: true, message:'请输入社会统一信用代码', trigger:'change'},
                'licenceCompany.businessLife':{required: false, message:'请输入经营年限', trigger:'change'},
                'licenceCompany.legalPerson':{required: true, message:'请输入法人/负责人', trigger:'change'},
                'licenceCompany.provinceCityArea':{required: true, message:'请输入认证所在地', trigger:'change'}
            },
        }
    },
    watch:{
        dialogFormVisible_add:{
            handler: function(val, oldVal) {
                if(val){
                    this.openDialog();
                    this.getMoreInformation();
                }
            },
        },
    },
    mounted(){
    },
    methods:{
        showCurrenPic(type){
            let vier = document.querySelector('.viewer-container');
            vier.style.width = '100%';
            vier.style.height = '100%'; 
            switch(type){
                case 'businessLicenceFile':
                    this.signImages = this.xinzengform.licenceCompany.businessLicenceFile;
                    break;
                case 'companyFacadeFile':
                    this.signImages = this.xinzengform.companyFacadeFile;
                    break;
                case 'takeIdCardFile':
                    this.signImages = this.xinzengform.takeIdCardFile;
                    break;
            }
            
            this.showPopupPic = true;
        },
        closePopPic(){
            this.showPopupPic = false;
        },
        // doActons(){
        //     for(var i = 0; i< 4;i++){
        //         let form = objectMerge2(this.businessType);
        //         switch(i){
        //             case 0:
        //                 form.groupType = '0';
        //                 form.groupTypeName = '业务部';
        //                 form.userStatus = '1';
        //                 form.userStatusName = '认证';
        //                 break;
        //             case 1:
        //                 form.groupType = '1';
        //                 form.groupTypeName = '客服部';
        //                 form.userStatus = '1';
        //                 form.userStatusName = '认证';
        //                 break;
        //             case 2:
        //                 form.groupType = '0';
        //                 form.groupTypeName = '业务部';
        //                 form.userStatus = '2';
        //                 form.userStatusName = '后续跟进';
        //                 break;
        //             case 3:
        //                 form.groupType = '1';
        //                 form.groupTypeName = '客服部';
        //                 form.userStatus = '2';
        //                 form.userStatusName = '后续跟进';
        //                 break;
        //         }
        //         this.xinzengform.businessInformationList.push(form);
        //     }
        // },
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
            if (columnIndex === 0) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                // console.log('_row,_col',_row,_col,this.spanArr[rowIndex])
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        getCustomer1(val,key){
            // console.log('belongSalesman',val,key)
            this.xinzengform.businessInformationList[key].belongCustomerService = val.name;
            this.xinzengform.businessInformationList[key].belongCustomerServiceId = val.userId;
            // console.log('this.xinzengform.businessInformationList',this.xinzengform.businessInformationList)
        },
        getReturnBelong(val,key){
            this.xinzengform.businessInformationList[key].belongSalesmanName = val.name;
            this.xinzengform.businessInformationList[key].belongSalesman = val.userId;
            this.xinzengform.businessInformationList[key].belongSalesmanMobile = val.mobile;
        },
        getObject(i,e){
            // console.log('i,e',i,e)
            this.xinzengform.businessInformationList[i].groupName = e.groupName
            this.xinzengform.businessInformationList[i].groupCode = e.groupCode
        },
        assignmentVal(val){
            // console.log('assignmentVal',val)
            this.xinzengform.licenceCompany.address = val.address ? val.address : this.xinzengform.licenceCompany.address;
            this.xinzengform.licenceCompany.companyName = val.companyName ? val.companyName :  this.xinzengform.licenceCompany.companyName;
            this.xinzengform.licenceCompany.legalPerson = val.legalPerson ? val.legalPerson : this.xinzengform.licenceCompany.legalPerson;
            this.xinzengform.licenceCompany.setupDate = val.setupDate ? val.setupDate : this.xinzengform.licenceCompany.setupDate;
            this.xinzengform.licenceCompany.socialCreditCode = val.socialCreditCode ? val.socialCreditCode :this.xinzengform.licenceCompany.socialCreditCode;
            //socialCreditCode社会信用代码
            //idNumber证件编号
            //setupDate成立日期
            //validityDate有效期
        },
        complateName(val,key){
            // console.log('val,key',val,key)
            this.xinzengform.businessInformationList[key].userStatusName =  this.optionsBusinessInterests.find(item => item.code ==  val)['name'];
            // console.log(this.xinzengform.businessInformationList)
        },
        regionChangeA(d){
            // console.log('data:',d)
            this.xinzengform.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            this.xinzengform.provinceCode = d.province ? d.province.name : '';
            this.xinzengform.cityCode = d.city ? d.city.name : '';
            this.xinzengform.areaCode = d.area ? d.area.name : '';
            if(d.area){
                this.xinzengform.belongCity = d.area.code;
            }else if(d.city){
                this.xinzengform.belongCity = d.city.code;
            }else{
                this.xinzengform.belongCity = d.province ? d.province.code : '';
            }
        },
        regionChange(d) {
            // console.log('data:',d)
            this.xinzengform.licenceCompany.provinceCityArea = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            this.xinzengform.licenceCompany.belongProvinceName = d.province ? d.province.name : '';
            this.xinzengform.licenceCompany.belongCityName = d.city ? d.city.name : '';
            this.xinzengform.licenceCompany.belongAreaName = d.area ? d.area.name : '';
            if(d.area){
                this.xinzengform.licenceCompany.belongAreaCode = d.area.code;
            }else if(d.city){
                this.xinzengform.licenceCompany.belongAreaCode = d.city.code;
            }else{
                this.xinzengform.licenceCompany.belongAreaCode = d.province ? d.province.code : '';
            }
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        openDialog(){
            // console.log('this.editType',this.editType)
            this.chooseType = false;
            this.btnStatus = false;
            if(this.editType !== 'add'){
                getaflcLogisticsCompanyFreezeReason(this.paramsView.id).then(res => {
                    this.xinzengform = objectMerge2(res.data);

                    if(!this.xinzengform.businessInformationList || this.xinzengform.businessInformationList.length == 0){
                        this.xinzengform.businessInformationList = [];
                        // this.doActons();
                        // this.getSpanArr(this.xinzengform.businessInformationList);
                    }else{
                        this.getSpanArr(this.xinzengform.businessInformationList);
                    }
                    this.xinzengform.businessLicenceFileNoPass = this.xinzengform.businessLicenceFileNoPass ? this.xinzengform.businessLicenceFileNoPass : '上传合格';//营业执照审核
                    this.xinzengform.companyFacadeFileNoPass = this.xinzengform.companyFacadeFileNoPass ? this.xinzengform.companyFacadeFileNoPass : '上传合格';//上传公司或者档口照片审核
                    this.xinzengform.takeIdCardFileNoPass = this.xinzengform.takeIdCardFileNoPass ? this.xinzengform.takeIdCardFileNoPass : '上传合格';//上传发货人名片照片审核
        
                    if(!this.xinzengform.auditCompany){
                        this.xinzengform.auditCompany = {
                            submitAuditTime:'',//提交认证时间
                            waitAuditTime:'',//认证等待时长
                            passAuditTime:'',//审核通过时间
                            auditRemark:'',//审核备注
                        }
                    }
        
                    if(!this.xinzengform.licenceCompany){
                        this.xinzengform.licenceCompany = {
                            companyName:'',//公司名称
                            socialCreditCode:'',//社会信用代码
                            contactsName:'',//联系人
                            businessLife:'',//经营年限
                            legalPerson:'',//法人/负责人
                            belongBrand:'',//所属品牌
                            belongBrandCode:'',//所属品牌Code
                            setupDate:'',//公司成立时间
                            address:'',//公司地址
                            businessLicenceFile:'',//营业执照照片
                            belongAreaCode:'',
                            belongAreaName:'',
                            belongCityName:'',
                            belongProvinceName:'',
                            provinceCityArea:'',
                        }
                    }
        
                    // console.log('this.xinzengform',this.xinzengform)
        
                    if(this.xinzengform.productServiceCode){
                        this.optionsProductArr = JSON.parse(this.xinzengform.productServiceCode) 
                    }
                    if(this.xinzengform.otherServiceCode){
                        this.otherServiceCodeArr = JSON.parse(this.xinzengform.otherServiceCode) 
                    }
        
                    if(this.editType == 'view'){
                        this.productServiceName = this.xinzengform.productService ? JSON.parse(this.xinzengform.productService)  : [];
                        this.otherServiceName = this.xinzengform.otherService ? JSON.parse(this.xinzengform.otherService)  : [];
                        // console.log('this.otherServiceName',this.otherServiceName,this.otherServiceName.length)
                    }
                })
    
            }else{
                this.clearForm();
            }
        },
        clearForm(){
            this. xinzengform = {
                account:'',//物流公司账号
                mobile:'',//手机号码
                belongCityName:'',//注册所在地
                authStatus:'AF0010403',//认证状态Code
                authStatusName:'已认证',//认证状态
                accountStatusName:"正常",//账户状态      
                accountStatus:'AF0010501',//账户状态Code	
                registerTime:'',//注册日期
                registerOrigin:'AF0030107',//注册渠道Code
                registerOriginName:'云平台',//注册渠道
                isVip:'0',//是否开通会员（0 否 1 是）
                isOpenTms:'0',//是否开通TMS（0 否 1 是）
                businessInformationList:[],
                //公司信息
                licenceCompany:{
                    companyName:'',//公司名称
                    socialCreditCode:'',//社会信用代码
                    contactsName:'',//联系人
                    businessLife:'',//经营年限
                    legalPerson:'',//法人/负责人
                    belongBrand:'',//所属品牌
                    belongBrandCode:'',//所属品牌Code
                    setupDate:'',//公司成立时间
                    address:'',//公司地址
                    businessLicenceFile:'',//营业执照照片
                    belongAreaCode:'',
                    belongAreaName:'',
                    belongCityName:'',
                    belongProvinceName:'',
                    provinceCityArea:'',
                },
                collateral:'',//保证金（元）
                businessLicenceFileNoPass:'上传合格',//营业执照照片不通过原因
                companyFacadeFile:'',//公司或者档口照片
                companyFacadeFileNoPass:'上传合格',//公司或者档口照片不通过原因
                takeIdCardFile:'',//手持身份证正面照片
                takeIdCardFileNoPass:'上传合格',//手持身份证正面照片不通过原因
                productService:'',//产品与服务
                productServiceCode:'',//产品与服务Code
                otherService:'',//增值服务
                otherServiceCode:'',//增值服务code
                //认证信息
                auditCompany:{
                    submitAuditTime:'',//提交认证时间
                    waitAuditTime:'',//认证等待时长
                    passAuditTime:'',//审核通过时间
                    auditRemark:'',//审核备注
                }
            }
        },
        handleClick(type,index){
            switch(type){
                case 'addItem':
                    this.chooseType = true;
                    this.spanArr.push(1)
                    this.xinzengform.businessInformationList.push({
                        flag:true,
                        // groupType:'',//分组类型（0：业务部1：客服部）
                        // groupTypeName:'',//
                        userStatus:'',//用户服务类型（0：注册 1：认证 2：后续跟进）
                        userStatusName:'',
                        groupName:'',//分组名称
                        groupCode:'',//分组代码
                        // belongCustomerService:'',//所属客服人员
                        // belongCustomerServiceId:'',//所属客服人员Id
                        belongSalesmanName:'',//所属业务员名称
                        belongSalesmanMobile:'',//所属业务员手机号码
                        belongSalesman:'',//所属业务员Id
                        updateTime:'',//更新时间
                        updater	:'',//修改人
                    });
                    break;
                case 'conserve':
                    let pass = false;
                    // console.log(this.xinzengform.businessInformationList,this.xinzengform.businessInformationList[this.xinzengform.businessInformationList.length - 1])
                    let newForm = this.xinzengform.businessInformationList[this.xinzengform.businessInformationList.length - 1];
                    // this.xinzengform.businessInformationList.forEach(el => {
                        if(newForm.userStatus == '' || newForm.groupCode == '' || newForm.belongSalesman == ''){
                            pass = true;
                        }
                    // })
                    
                    if(!pass){
                        this.chooseType = false;
                        this.xinzengform.businessInformationList[this.xinzengform.businessInformationList.length - 1].flag = false;
                        // this.xinzengform.businessInformationList.sort(function(a,b){  
                        //     return b.userStatusName.localeCompare(a.userStatusName, 'zh')
                        // })  
                        // console.log(this.xinzengform.businessInformationList)
                        // this.xinzengform.businessInformationList.userStatusName =  this.optionsLevel.find(item => item.code ==  this.xinzengform.discountLevel)['name'];
                        // this.getSpanArr(this.xinzengform.businessInformationList);
                    }else{
                        return this.$message({
                            type: 'warning',
                            message: '当前信息存在空值，不可保存!'
                        })
                    }
                    break;
                case 'cancel':
                    this.chooseType = false;
                    this.xinzengform.businessInformationList.pop()
                    break;
                case 'delet':
                    if(this.chooseType){
                        return this.$message({
                            type: 'warning',
                            message: '请先保存或取消当前编辑内容!'
                        })
                    }else{
                        this.xinzengform.businessInformationList.splice(index,1);
                    }
                    break;
            }
        },
        //获取货主类型
        getMoreInformation(){
            Promise.all([getDictionary(this.belongBrand),getDictionary(this.productServiceCode),data_LogisticsCompany(),DicBusinessInterests()]).then(resArr => {
                // console.log('Promise.all',resArr)
                this.optionsBelongBrand = resArr[0].data;
                this.optionsProductService = resArr[1].data;
                this.optionsLogisticsCompany = resArr[2].data;
                this.optionsBusinessInterests = resArr[3].data.filter(el => {
                    return el.name != '注册';
                })
            })
        },
        close(done) {
            this.$refs.xinzengform.resetFields();
            this.$emit('update:dialogFormVisible_add', false);
            this.$emit('getData');
            if (typeof done === 'function') {
                done()
            }
        },
        completeInfo(){
            if(this.xinzengform.licenceCompany.belongBrandCode){
                this.xinzengform.licenceCompany.belongBrand = this.optionsBelongBrand.find(item => item.code === this.xinzengform.licenceCompany.belongBrandCode)['name'];
            }

            let productServiceName = [];
            let otherServiceName =  [];

            this.optionsProductArr.forEach(el=>{
                this.optionsProductService.forEach(item => {
                    if(el == item.code){
                        productServiceName.push(item.name)
                    }
                })
            })

            this.otherServiceCodeArr.forEach(el=>{
                this.optionsLogisticsCompany.forEach(item => {
                    if(el == item.code){
                        otherServiceName.push(item.name)
                    }
                })
            })

            //产品与服务
            this.xinzengform.productServiceCode = JSON.stringify(this.optionsProductArr);                         
            this.xinzengform.productService = JSON.stringify(productServiceName);
            //增值服务
            this.xinzengform.otherServiceCode = JSON.stringify(this.otherServiceCodeArr);                         
            this.xinzengform.otherService = JSON.stringify(otherServiceName);
        },
        // 保存
        onSubmit(){
            if(this.editType == 'edit'){
                this.btnStatus = true;
                this.completeInfo();
                var forms = objectMerge2(this.xinzengform);
                // console.log('revise',forms)
                data_ChangeLogisticsCompany(forms).then(res=>{
                    this.close();
                    this.$message({
                        type: 'success',
                        message: '操作成功~'
                    })
                    this.btnStatus = false;
                }).catch(err=>{
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                    this.btnStatus = false;
                })
            }else{
                this.$refs['xinzengform'].validate((valid)=>{
                    if(valid){
                        this.btnStatus = true;
                        this.completeInfo();
                        this.xinzengform.account = this.xinzengform.mobile;
                        var forms = objectMerge2(this.xinzengform);
                        // console.log('revise',forms)
                        newLogisticsCompany(forms).then(res=>{
                            this.close();
                            this.$message({
                                type: 'success',
                                message: '操作成功~'
                            })
                            this.btnStatus = false;
                        }).catch(err=>{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                            this.btnStatus = false;
                        })
                    }else{
                        return  this.$message({
                            type: 'warning',
                            message: '请填写完整数据'
                        })
                    }
                })
            }
            // this.$refs['xinzengform'].validate((valid)=>{
            //     if(valid){
                   
                // }else{
                //     this.$message({
                //         type: 'info',
                //         message: '请填写完整信息' 
                //     })
                //     return false
                // }
            // })
        },
        // 审核不通过
        handlerOut() {
        //   this.$refs['xinzengform'].validate((valid) => {
        //         if (valid) {
                    if( this.xinzengform.takeIdCardFileNoPass =="上传合格" && this.xinzengform.companyFacadeFileNoPass == "上传合格" && this.xinzengform.businessLicenceFileNoPass =="上传合格"){
                        return  this.$message({
                            type: 'error',
                            message: '请确认物流公司提交认证图片信息，如都上传合格，则不能操作审核不通过，货主基本信息可根据上传图片进行修改。',
                        })
                    }else{
                        if(this.chooseType){
                            this.$message({
                                type: 'error',
                                message: '检测到新增权益类型未保存!请先保存!'
                            });
                        }else{
                            const item = this.xinzengform.mobile;
                            this.$confirm('确定要不通过' + item + '该用户吗？', '提示', {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                            }).then(() => {
                                this.completeInfo()
                                var forms = Object.assign({}, this.xinzengform, { authStatus: 'AF0010404', authStatusName: '认证不通过',operateType:'1'})
                                // console.log('authAflcLogisticsCompany',forms)
                                authAflcLogisticsCompany(forms).then(res => {
                                    this.$message({
                                        type: 'success',
                                        message: '审核不通过成功!',
                                        duration: 2000
                                    })
                                    this.close();
                                }).catch(err => {
                                    this.$message({
                                        type: 'error',
                                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text),
                                    })
                                    this.btnStatus = false;
                                })
                            }).catch(() => {
                              this.$message({
                                  type: 'info',
                                  message: '已取消'
                                })
                            })
                        }
                    }
            //     } else {
            //       this.$message.error('请输入完整数据！')
            //       return false
            //     }
            // })
        },
        // 审核通过
        handlerPass() {
            let ifQualified = true
            if(this.xinzengform.takeIdCardFileNoPass =="上传合格" && this.xinzengform.companyFacadeFileNoPass == "上传合格" &&this.xinzengform.businessLicenceFileNoPass =="上传合格"){
                ifQualified = true ;
            }else{
                ifQualified = false ;
            }
            this.$refs['xinzengform'].validate((valid) => {
                if (valid && ifQualified) {
                    if(this.chooseType){
                        this.$message({
                            type: 'error',
                            message: '检测到新增权益类型未保存!请先保存!'
                        });
                    }else{
                        this.completeInfo()
                        var forms = Object.assign({}, this.xinzengform, { authStatus: 'AF0010403', authStatusName: '已认证',operateType:'0' })
                        authAflcLogisticsCompany(forms).then(res => {
                            this.$message({
                                type: 'success',
                                message: '审核通过成功！'
                            })
                            this.close();
                        }).catch(err => {
                            this.dialogFormVisible = true
                            this.$message({
                              type: 'info',
                              message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                            this.btnStatus = false;
                        })
                    }
                }else {
                    if(!ifQualified){
                        this.$message.error('审核未满足通过要求,资料图片未合格！')
                    }else{
                        this.$message.error('审核未满足通过要求,请输入完整数据！')
                    }
                    return false
                }
            })
        },
    }
    }
</script>
<style lang="scss">
    .logisticsDialog{
        .serviceChoose{
            display: inline-block;
            padding: 0px 10px;
            margin-right: 10px;
            margin-bottom: 10px;
            color: #fff;
            background: rgb(44, 193, 219);
            -webkit-box-shadow:3px 3px 30px #888888;
            -moz-box-shadow:3px 3px 30px #888888;
        }
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
            .el-dialog{
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
                        .viewer-container{
                            width: 100% !important;
                            height: 700px !important;
                        }
                        .viewer-backdrop {
                            width: 100% !important;
                            height: 700px !important;
                        }
                    }
                }
            }
        }
    }
</style>

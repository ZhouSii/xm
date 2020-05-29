<template>
    <div class="carStickerDetails commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" width="85%" :visible="dialogFormVisible" @close="close">
            <el-tabs v-model="carStickerDetailsName" type="card" @tab-click="handleClick" >
                <!-- 申请资料 -->
                <el-tab-pane label="申请资料" name="applyInfo">
                    <h2 class="carNewinfoH2">车主信息</h2>
                    <div class="essentialInformation">
                        <el-row class="basicInfo" :span='24'>
                            <!-- 第一行 -->
                            <el-col :span="2">车主姓名:</el-col>
                            <el-col :span="4">{{applyInfoDetails.driverName || ''}}</el-col>
                            <el-col :span="2">手机号码:</el-col>
                            <el-col :span="4">{{applyInfoDetails.driverMobile || ''}}</el-col>
                            <el-col :span="2">车牌号:</el-col>
                            <el-col :span="4">{{applyInfoDetails.carNumber || ''}}</el-col>
                            <el-col :span="2">品牌型号:</el-col>
                            <el-col :span="4">{{applyInfoDetails.carBrand || ''}}</el-col>
                            <!-- 第二行 -->
                            <el-col :span="2">车辆类型:</el-col>
                            <el-col :span="4">{{applyInfoDetails.carTypeName || ''}}</el-col>
                            <el-col :span="2">车辆规格:</el-col>
                            <el-col :span="4">{{applyInfoDetails.carSpecName || ''}}</el-col>
                            <el-col :span="2">车长:</el-col>
                            <el-col :span="4">{{applyInfoDetails.lengthWidthHeight || ''}}</el-col>
                        </el-row>
                    </div>
                    <div class="essentialInformation">
                        <el-row :gutter="20" v-viewer>
                            <el-col :span="8" class="CheckPass">
                                <div class="uploadPicture">
                                    <h3 class="uploadH3">认证时车辆45°照片</h3>
                                    <div class="uploadImgBox">
                                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                            <img :src='applyInfoDetails.carFile || defaultImg'  alt="" >
                                        </el-tooltip>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="8" class="CheckPass">
                                <div class="uploadPicture">
                                    <h3 class="uploadH3">上报图片</h3>
                                    <div class="uploadImgBox">
                                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                            <img :src='applyInfoDetails.reportPicture || defaultImg'  alt="" >
                                        </el-tooltip>
                                    </div>
                                </div>
                            </el-col>
                        </el-row> 
                    </div>
                    <h2 class="carNewinfoH2">申请信息</h2>
                    <div class="essentialInformation">
                        <el-row class="basicInfo" :span='24'>
                            <!-- 第一行 -->
                            <el-col :span="2">申请单号:</el-col>
                            <el-col :span="4">{{applyInfoDetails.carStickerOrderSerial || ''}}</el-col>
                            <el-col :span="2">产品所属区域:</el-col>
                            <el-col :span="4">{{applyInfoDetails.productAreaCodeName || ''}}</el-col>
                            <el-col :span="2">产品名称:</el-col>
                            <el-col :span="4">{{applyInfoDetails.productName || ''}}</el-col>
                            <el-col :span="2">申请/上报类型:</el-col>
                            <el-col :span="4">{{applyInfoDetails.operTypeName || ''}}</el-col>
                            <!-- 第二行 -->
                            <el-col :span="2">车贴类型:</el-col>
                            <el-col :span="4">{{applyInfoDetails.productTypeName || ''}}</el-col>
                            <el-col :span="2">车贴时效(月):</el-col>
                            <el-col :span="4">{{applyInfoDetails.productDuration || ''}}</el-col>
                            <el-col :span="2">申请时间:</el-col>
                            <el-col :span="4">{{applyInfoDetails.submitTime | parseTime}}</el-col>
                            <el-col :span="2">每月补贴费用:</el-col>
                            <el-col :span="4">{{applyInfoDetails.subsidyMoney}}</el-col>
                            <!-- 第三行 -->
                            <el-col :span="2">本次申请费用:</el-col>
                            <el-col :span="4">{{applyInfoDetails.applyMoney}}</el-col>
                            <el-col :span="2">是否需要缴费:</el-col>
                            <el-col :span="4" :class="(!isView && showType =='applyInfo') ? 'selectClass' : ''">
                                <div v-if="!isView && showType =='applyInfo'"> 
                                    <span v-if="applyInfoDetails.applyMoney === 0">不需要</span>
                                    <el-select v-model="applyInfoDetails.isNeedPay"  clearable placeholder="请选择" v-else>
                                        <el-option
                                        v-for="item in optionseIsNeedPay"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <span v-else>{{applyInfoDetails.isNeedPay === "1" ? "需要" : "不需要"}}</span>
                            </el-col>
                            <el-col :span="2">申请结果:</el-col>
                            <el-col :span="4" :class="(!isView && showType =='applyInfo') ? 'selectClass' : ''">
                                <el-select v-model="applyInfoDetails.status" v-if="!isView && showType =='applyInfo'" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in optionsCarStickerStatus"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                    </el-option>
                                </el-select>
                                <span v-else>{{applyInfoDetails.statusName}}</span>
                            </el-col>
                            <el-col :span="2">不通过原因：</el-col> 
                            <el-col :span="4" :class="(!isView && showType =='applyInfo') ? 'selectClass' : ''">
                                <div v-if="!isView && showType =='applyInfo'">
                                    <span v-if="applyInfoDetails.status === 'AF0880402'">无</span>
                                    <el-select v-model="applyInfoDetails.unpassReason"  clearable placeholder="请选择" v-else>
                                        <el-option
                                        v-for="item in optionsApplyUnpassReason"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <span v-else>{{applyInfoDetails.unpassReasonName}}</span>
                            </el-col>
                            <!-- <el-col :span="2">车贴跟进分组:</el-col>
                            <el-col :span="4" class="selectClass">
                                <businessGroup  @inputObject = "getVal" v-if="!isView && showType =='applyInfo'" v-model="applyInfoDetails.businessGroupId" ref ='businessGroup'/>
                                <span v-else>{{applyInfoDetails.businessGroupName}}</span>
                            </el-col>
                            <el-col :span="2">车贴跟进人:</el-col>
                            <el-col :span="4" class="selectClass">
                                <el-select v-model="applyInfoDetails.followUpId" v-if="!isView && showType =='applyInfo'" @focus="getfollowUp" @change="getfollowUpName" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in optionseFollowUp"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                                <span v-else>{{applyInfoDetails.followUpName}}</span>
                            </el-col> -->
                            <div v-if="isView || showType !=='applyInfo'">
                                <el-col :span="2">操作时间:</el-col>
                                <el-col :span="4">{{applyInfoDetails.operTime | parseTime}}</el-col>
                                <el-col :span="2">操作人:</el-col>
                                <el-col :span="4">{{applyInfoDetails.operator || ''}}</el-col>
                            </div>
                        </el-row>
                    </div>
                    <el-row style="margin-bottom:22px;">
                        <h2 class="carNewinfoH2">
                            内部权益管理
                            <p class="aflcBusinessBtn">
                                <el-button type="primary" size="medium" plain v-if="(!isView || isModify) && showType =='applyInfo' && !chooseType" @click="handleClickApply('addItem')">新增权益</el-button>
                                <el-button type="primary" size="medium" plain v-if="(!isView || isModify) && showType =='applyInfo' && chooseType" @click="handleClickApply('conserve')">保存</el-button>
                                <el-button type="primary" size="medium" plain v-if="(!isView || isModify) && showType =='applyInfo' && chooseType" @click="handleClickApply('cancel')">取消</el-button>
                            </p>
                        </h2>
                        <el-table
                            :data="applyInfoDetails.responsibleList"
                            border
                            ref="multipleTable"
                            stripe
                            align = "center"
                            tooltip-effect="dark"
                            style="width: 100%"
                            >
                            <el-table-column label="跟进类型">
                                <template  slot-scope="scope"> 
                                    <span v-if="!scope.row.flag" >{{ scope.row.typeName }}</span>
                                    <div v-else>
                                        <el-select v-model="scope.row.type" placeholder="请选择" @change = "complateName(scope.row.type,scope.$index)">
                                            <el-option
                                            v-for="item in optionsFollowUp"
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
                                    <span v-if="!scope.row.flag" >{{ scope.row.businessGroupName }}</span>
                                    <div v-else>
                                        <businessGroup  @inputObject = "getObject(scope.$index,$event)" v-model="scope.row.businessGroupName" ref="businessGroup"/>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="所属人">
                                <template  slot-scope="scope">
                                    <span v-if="!scope.row.flag" >{{ scope.row.followUpName }}</span>
                                    <div v-else>
                                        <selectBelong :groupCode = "scope.row.businessGroupId" :belongSalesman = 'scope.row.followUpMobile' @returnBelong = '(value)=>{getReturnBelong(value,scope.$index)}'/>
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
                                    @click="handleClickApply('delet',scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <h2 class="carNewinfoH2">
                        跟进备注 
                        <p class="aflcBusinessBtn">
                            <el-button icon="el-icon-circle-plus" @click="handlerClick('remark')"  type="primary" size="medium" plain>添加备注</el-button>
                        </p>
                    </h2>
                    <div v-if="carStickerRemakeData.length != 0">
                        <div class="essentialInformation essentialInformation_remake"  v-for="item in carStickerRemakeData" :key="item.id">
                            <el-row :span='24'>
                                <el-col :span="3">操作人：</el-col>
                                <el-col :span="3">{{item.operator}}</el-col>
                                <el-col :span="3">添加时间：</el-col>
                                <el-col :span="3">{{item.operTime | parseTime}}</el-col>
                            </el-row>
                            <el-row :span='24'>
                                <el-col :span="3">备注信息：</el-col>
                                <el-col :span="3">
                                    <el-tooltip placement="top-start" effect="light">
                                        <div slot="content">{{item.remark}}</div>
                                        <span>{{item.remark}}</span>    
                                    </el-tooltip>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="essentialInformationNull" v-else>
                        <img src="../../../../assets/icom/25xinxi.png" alt="">
                        <span>客服未备注!</span>
                    </div>
                    <div class="dialog-footer" v-if="(!isView || isModify) && showType =='applyInfo'">
                        <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" v-if="!isModify">确 定</el-button>
                        <el-button type="primary" plain  icon="el-icon-success" @click="conserveFollowUp" v-else>确 定</el-button>
                        <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
                    </div> 
                </el-tab-pane>

                <!-- 初审资料 -->
                <el-tab-pane label="初审资料" name="firstTrial" v-if="showType!='applyInfo'">
                    <div class="essentialInformation">
                        <el-row class="basicInfo" :span='24'>
                            <!-- 第一行 -->
                            <el-col :span="2">本次申请费用:</el-col>
                            <el-col :span="4">{{firstTrialDetailsObj.applyMoney}}</el-col>
                            <el-col :span="2">缴费流水号:</el-col>
                            <el-col :span="4">{{firstTrialDetailsObj.paySerial || ''}}</el-col>
                            <el-col :span="2">付款时间:</el-col>
                            <el-col :span="4">{{firstTrialDetailsObj.payTime | parseTime}}</el-col>
                            <el-col :span="2">实际支付费用:</el-col>
                            <el-col :span="4">{{firstTrialDetailsObj.realPayMoney || 0}}</el-col>

                            <!-- 第二行 -->
                            <el-col :span="2">支付渠道:</el-col>
                            <el-col :span="4">{{firstTrialDetailsObj.payChannelName || ''}}</el-col>
                            <el-col :span="2"><i style="color:red;">*</i>是否需要贴车贴:</el-col>
                            <el-col :span="4" :class="(!isView && showType === 'firstTrial') ? 'selectClass' : ''" v-if="!isView && showType === 'firstTrial'">
                                <el-select v-model="firstTrialDetailsObj.isNeedSticke" placeholder="请选择">
                                    <el-option
                                    v-for="item in optionseIsNeedPay"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4" v-else>{{firstTrialDetailsObj.isNeedSticke === "1" ? "需要" : "不需要"}}</el-col>
                        </el-row>
                    </div>
                    <div class="essentialInformation">
                        <el-table
                            :data="firstTrialHistoryList"
                            border
                            row-key="id" 
                            :expand-row-keys="expands"
                            @expand-change="changeExpand"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="right" class="demo-table-expand" >
                                        <!-- <el-form-item label="" label-width="0px" v-if="!isView"> -->
                                            <el-row :span='24' class="colInfo" v-if="!isView && showType =='firstTrial' && props.$index == 0 && isEx">
                                                <el-col :span="4">初审状态：</el-col>
                                                <el-col :span="4">
                                                    <el-select v-model="props.row.status" placeholder="请选择">
                                                        <el-option
                                                        v-for="item in optionsfirstTrialStatus"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.code">
                                                        </el-option>
                                                    </el-select>
                                                    <!-- <span v-else>{{props.row.statusName}}</span> -->
                                                </el-col>
                                                <el-col :span="4">初审不通过/驳回原因：</el-col> 
                                                <el-col :span="4">
                                                    <span v-if="props.row.status === 'AF0880602'">无</span>
                                                    <el-select v-model="props.row.unpassReason" placeholder="请选择" v-else>
                                                        <el-option
                                                        v-for="item in optionsFirstTrialUnpassReason"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.code">
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-row>
                                            <el-row :span='24' class="colInfo" v-else>
                                                <el-col :span="4">初审状态：</el-col>
                                                <el-col :span="4">
                                                    <span>{{props.row.statusName}}</span>
                                                </el-col>
                                                <el-col :span="4">初审不通过/驳回原因：</el-col> 
                                                <el-col :span="4">
                                                    <span>{{props.row.unpassReasonName ? props.row.unpassReasonName : '无'}}</span>
                                                </el-col>
                                            </el-row>
                                        <!-- </el-form-item> -->
                                        <div class="essentialInformation">
                                            <el-row v-viewer>
                                                <el-col :span="8" class="CheckPass">
                                                    <div class="uploadPicture">
                                                        <h3 class="uploadH3">左后方45°角的全车照片（车牌无遮挡）</h3>
                                                        <div class="uploadImgBox">
                                                            <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                                                <img :src='props.row.leftRearPhoto || defaultImg'  alt="" >
                                                            </el-tooltip>
                                                        </div>
                                                    </div>
                                                    <el-form-item prop="shipperCardFileNoPass" label="图片审核状态：" label-width="150px">
                                                        <el-select v-model="props.row.leftRearPhotoStatus" placeholder="请选择" v-if="!isView && showType =='firstTrial' && props.$index == 0 && isEx">
                                                            <el-option
                                                            v-for="item in optionsCarStickerImg"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.code">
                                                            </el-option>
                                                        </el-select>
                                                        <el-input v-model="props.row.leftRearPhotoStatusName" auto-complete="off" v-else disabled></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" class="CheckPass" style="margin-left:20px;">
                                                    <div class="uploadPicture">
                                                        <h3 class="uploadH3">右后方45°角的全车照片（车牌无遮挡）</h3>
                                                        <div class="uploadImgBox">
                                                            <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                                                <img :src='props.row.rightRearPhoto || defaultImg'  alt="" >
                                                            </el-tooltip>
                                                        </div>
                                                    </div>
                                                    <el-form-item prop="shipperCardFileNoPass" label="图片审核状态：" label-width="150px">
                                                        <el-select v-model="props.row.rightRearPhotoStatus" v-if="!isView && showType =='firstTrial' && props.$index == 0 && isEx" placeholder="请选择" >
                                                            <el-option
                                                            v-for="item in optionsCarStickerImg"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.code">
                                                            </el-option>
                                                        </el-select>
                                                        <el-input v-model="props.row.rightRearPhotoStatusName" auto-complete="off" v-else  disabled></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row> 
                                        </div>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="审核单号"
                            prop="firstTrialSerial">
                            </el-table-column>
                            <el-table-column
                            label="初审提交时间"
                            prop="submitTime">
                                <template slot-scope="scope">
                                    {{ scope.row.submitTime | parseTime }}
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="初审结果"
                            prop="statusName">
                            </el-table-column>
                            <el-table-column
                            label="初审不通过/驳回原因"
                            prop="unpassReasonName">
                            </el-table-column>
                            <el-table-column
                            label="操作时间"
                            prop="operTime">
                                <template slot-scope="scope">
                                    {{ scope.row.operTime | parseTime }}
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="操作人"
                            prop="operator">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="dialog-footer" v-if="!isView && showType =='firstTrial'" >
                        <el-button type="primary" plain  icon="el-icon-success" @click="submitForm2('ruleForm')">确 定</el-button>
                        <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
                    </div> 
                </el-tab-pane>
                <!-- 月审资料 -->
                <el-tab-pane label="月审资料" name="monthTrial" v-if="showType!='applyInfo' && showType!='firstTrial'">
                    <div class="essentialInformation">
                        <el-row class="basicInfo" :span='24'>
                            <!-- 第一行 -->
                            <el-col :span="2">车辆类型:</el-col>
                            <el-col :span="4">{{monthTrialDetailsObj.carTypeName || ''}}</el-col>
                            <el-col :span="2">产品所属区域:</el-col>
                            <el-col :span="4">{{monthTrialDetailsObj.productAreaCodeName || ''}}</el-col>
                            <el-col :span="2">产品名称:</el-col>
                            <el-col :span="4">{{monthTrialDetailsObj.productName || ''}}</el-col>
                            <el-col :span="2">申请/上报类型:</el-col>
                            <el-col :span="4">{{monthTrialDetailsObj.applyOperTypeName || ''}}</el-col>
                            <!-- 第二行 -->
                            <el-col :span="2">车贴类型:</el-col>
                            <el-col :span="4">{{monthTrialDetailsObj.carStickerTypeName || ''}}</el-col>
                            <el-col :span="2">车贴时效(月):</el-col>
                            <el-col :span="4">{{monthTrialDetailsObj.totalPeriods}}</el-col>
                            <el-col :span="2">初审通过时间:</el-col>
                            <el-col :span="4">{{monthTrialDetailsObj.firstTrialPassTime | parseTime}}</el-col>
                        </el-row>
                    </div>
                    <div class="essentialInformation">
                        <el-table
                            :data="monthTrialHistoryList"
                            border
                            row-key="id" 
                            @row-click="rowClick"
                            @expand-change="changeExpandMonth"
                            :expand-row-keys="expands2"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="right" class="demo-table-expand" >
                                        <!-- <el-form-item label="" label-width="0px" v-if="!isView"> -->
                                            <el-row :span='24' class="colInfo">
                                                <el-col :span="4" v-if="!isView && props.$index == 0">月审状态：</el-col>
                                                <el-col :span="4" v-if="!isView && props.$index == 0">
                                                    <el-select v-model="props.row.status" placeholder="请选择" >
                                                        <el-option
                                                        v-for="item in optionsMonthTrialStatus"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.code">
                                                        </el-option>
                                                    </el-select>
                                                    <!-- <span v-else>{{props.row.statusName}}</span> -->
                                                </el-col>
                                                <el-col :span="4">实际有效天数：</el-col>
                                                <el-col :span="4">
                                                    <el-input placeholder="请输入内容" v-model="props.row.validDays" :disabled="isView" clearable v-numberOnly>
                                                        <template slot="append">/{{props.row.correspondingMonthMaxDays}}</template>
                                                    </el-input>
                                                </el-col>
                                                <el-col :span="4">补贴金额：</el-col> 
                                                <el-col :span="4">
                                                    <span v-if="!isView && props.$index == 0">{{((props.row.subsidyMoney / props.row.correspondingMonthMaxDays)* props.row.validDays).toFixed(2) }}</span>
                                                    <span v-else>{{props.row.actualSubsidyMoney}}</span>
                                                </el-col>
                                                <el-col :span="4">月审不通过/驳回原因：</el-col> 
                                                <el-col :span="4">
                                                    <div v-if="!isView">
                                                        <span v-if="props.row.status === 'AF0880704'">无</span>
                                                        <el-select v-model="props.row.unpassReason" placeholder="请选择" v-else>
                                                            <el-option
                                                            v-for="item in optionsUnpassReason"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.code">
                                                            </el-option>
                                                        </el-select>
                                                    </div>
                                                    <span v-else>{{props.row.unpassReasonName}}</span>
                                                </el-col>
                                                <div v-if="(props.row.applyOperType == 'AF088030303' || props.row.applyOperType == 'AF088030304') && props.row.periods == 1">
                                                    <el-col :span="4">补偿金额：</el-col>
                                                    <el-col :span="4">
                                                        <el-select v-model="props.row.compensateMoney" placeholder="请选择" v-if="!isView">
                                                            <el-option
                                                            v-for="item in optionsCompensateMoney"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.value">
                                                            </el-option>
                                                        </el-select>
                                                        <span v-else>{{props.row.compensateMoney}}</span>
                                                    </el-col>
                                                </div>
                                            </el-row>
                                        <!-- </el-form-item> -->
                                        <div class="essentialInformation">
                                            <el-row :gutter="20" v-viewer>
                                                <el-col :span="8" class="CheckPass">
                                                    <div class="uploadPicture">
                                                        <h3 class="uploadH3">左后方45°角的全车照片（车牌无遮挡）</h3>
                                                        <div class="uploadImgBox">
                                                            <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                                                <img :src='props.row.leftRearPhoto || defaultImg'  alt="" >
                                                            </el-tooltip>
                                                        </div>
                                                    </div>
                                                    <el-form-item prop="shipperCardFileNoPass" label="图片审核状态：" label-width="150px">
                                                        <el-select v-model="props.row.leftRearPhotoStatus" placeholder="请选择" v-if="!isView && props.$index == 0">
                                                            <el-option
                                                            v-for="item in optionsCarStickerImg"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.code">
                                                            </el-option>
                                                        </el-select>
                                                        <el-input v-model="props.row.leftRearPhotoStatusName" auto-complete="off" v-else disabled></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" class="CheckPass">
                                                    <div class="uploadPicture">
                                                        <h3 class="uploadH3">右后方45°角的全车照片（车牌无遮挡）</h3>
                                                        <div class="uploadImgBox">
                                                            <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                                                <img :src='props.row.rightRearPhoto || defaultImg'  alt="" >
                                                            </el-tooltip>
                                                        </div>
                                                    </div>
                                                    <el-form-item prop="shipperCardFileNoPass" label="图片审核状态：" label-width="150px">
                                                        <el-select v-model="props.row.rightRearPhotoStatus" placeholder="请选择" v-if="!isView && props.$index == 0">
                                                            <el-option
                                                            v-for="item in optionsCarStickerImg"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.code">
                                                            </el-option>
                                                        </el-select>
                                                        <el-input v-model="props.row.rightRearPhotoStatusName" auto-complete="off" v-else disabled></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8" class="CheckPass">
                                                    <div class="uploadPicture">
                                                        <h3 class="uploadH3">每月指定手势</h3>
                                                        <div class="uploadImgBox">
                                                            <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                                                <img :src='props.row.gesturePhoto || defaultImg'  alt="" >
                                                            </el-tooltip>
                                                        </div>
                                                    </div>
                                                    <el-form-item prop="shipperCardFileNoPass" label="图片审核状态：" label-width="150px">
                                                        <el-select v-model="props.row.gesturePhotoStatus" placeholder="请选择" v-if="!isView && props.$index == 0">
                                                            <el-option
                                                            v-for="item in optionsCarStickerImg"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.code">
                                                            </el-option>
                                                        </el-select>
                                                        <el-input v-model="props.row.gesturePhotoStatusName" auto-complete="off" v-else disabled></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row> 
                                        </div>
                                        <div class="essentialInformation" v-if="props.row.logList && props.row.logList.length != 0">
                                            <el-row class="basicInfo" :span='24'>
                                                <!-- 第一行 -->
                                                <div  v-for="(item,idx) in props.row.logList" :key="idx">
                                                    <el-col :span="4">操作人：</el-col>
                                                    <el-col :span="4">{{item.operator}}</el-col>
                                                    <el-col :span="4">添加时间：</el-col>
                                                    <el-col :span="4">{{item.submitTime | parseTime}}</el-col>
                                                    <el-col :span="4">复审驳回原因：</el-col>
                                                    <el-col :span="4">{{item.remarks}}</el-col>
                                                </div>
                                            </el-row>
                                        </div>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="期数"
                            prop="periods">
                                <template slot-scope="scope">
                                    {{ scope.row.periods+'/'+scope.row.totalPeriods}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="审核单号"
                            prop="monthTrialSerial">
                            </el-table-column>
                            <el-table-column
                            label="月审提交时间"
                            prop="submitTime">
                                <template slot-scope="scope">
                                    {{ scope.row.submitTime | parseTime }}
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="月审结果"
                            prop="statusName">
                            </el-table-column>
                            <el-table-column
                                prop="operator"
                                label="审核操作人"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="operTime"
                                label="审核操作时间">
                                <template slot-scope="scope">
                                    {{ scope.row.operTime | parseTime }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="repeatOperator"
                                label="复审操作人"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="repeatOperTime"
                                label="复审操作时间">
                                <template slot-scope="scope">
                                    {{ scope.row.repeatOperTime | parseTime }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="dialog-footer" v-if="!isView">
                        <el-button type="primary" plain  icon="el-icon-success" @click="submitForm3('ruleForm')">确 定</el-button>
                        <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
                    </div> 
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

        <remarkerInfo :dialogVisible.sync="dialogVisible" :orderSerial='detailsObj.carStickerOrderSerial' @close = "applyInfoInitRemake"/>
    </div>
</template>

<script>

import { objectMerge2 } from '@/utils/'
import { carStickerApplyDetails,carStickerRemakeList,carStickerCheck,firstTrialDetails,firstTrialList,firstTrialCheck,monthTrialList,monthTrialCheck,monthTrialDetails,carStickerConserveFollowUp,firstTrialRevise } from '@/api/marketing/carSticker'
import { CarStickerStatusType,CarStickerImgType,CompensateMoneyType,MonthUnpassReason,FirstUnpassReason,ApplyUnpassReason } from '@/api/common.js'
import businessGroup from '@/components/selectTree/businessGroup'  
import selectBelong from '@/views/users/shipper/selectBelong'
// import { aflcBusinessGroupUserList } from '@/api/company/businessGroup'
import remarkerInfo from './remakInfo'
export default {
    name: 'carStickerDetails',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'审批'
        },
        showType:{
            type:String,
        },
        isView:{
            type:Boolean,
            required:false
        },
        detailsObj:{
            type:Object,
        },
        tabName:{
            type:String,
            default:'applyInfo'
        },
        isReject:{
            type:Boolean,
            required:false
        },
        isModify:{
            type:Boolean,
            required:false,
            default:false
        },
        isEx:{
            type:Boolean,
            required:false,
            default:false
        }
    },
    components:{
        businessGroup,
        remarkerInfo,
        selectBelong
    },
    data() {
        return {
            carStickerDetailsName:'applyInfo',
            // dataKeys:'',
            dialogVisible:false,
            expands:[],
            expands2:[],
            defaultImg:'/static/test.jpg',//默认第一张图片的url
            chooseType:false,
            applyInfoDetails:{
                driverName:'',//车主姓名
                driverMobile:'',//车主手机号
                carNumber:'',//车牌号码
                carBrand:'',//品牌型号
                carType:'',//车辆类型
                carTypeName:'',//车辆类型
                carSpec:'',//车辆规格
                carFile:'',//车辆45度照片
                reportPicture:'',//上报图片
                carStickerOrderSerial:'',//车贴订单号
                productAreaCodeName:'',//产品所属区域
                productName:'',//产品名称
                operType:'',//申请/上报类型
                operTypeName:'',//申请/上报类型
                productType:'',//车贴类型
                productTypeName:'',//车贴类型
                productDuration:'',//车贴时效(月)
                submitTime:'',//申请时间
                applyMoney:'',//申请金额
                subsidyMoney:'',//每月补贴费用
                status:'',//申请结果
                statusName:'',//申请结果名称
                businessGroupId:'',//车贴跟进分组id
                businessGroupName:'',//车贴跟进分组
                followUpId:'',//车贴跟进人ID
                followUpName:'',//车贴跟进人名字
                followUpMobile:'',//车贴跟进人号码
                isNeedPay:"0",//是否需要缴费(1:是，0:否)
                unpassReason:'',//申请驳回/不通过原因
            },
            firstTrialDetailsObj:{
                applyMoney:'',//申请金额
                paySerial:'',//缴费流水号
                payTime:'',//付款时间
                realPayMoney:'',//实际支付费用
                payChannel:'',//支付渠道
                payChannelName:'',//支付渠道名称
                isNeedSticke:'',
            },
            optionsCarStickerStatus:[],//车贴申请
            // optionseFollowUp:[],
            optionseIsNeedPay:[{
                name:'需要',
                code:"1"
            },{
                name:'不需要',
                code:"0"
            }],
            optionsFollowUp:[{
                name:'第一责任人',
                code:"AF0881301"
            },{
                name:'第二责任人',
                code:"AF0881302"
            }],
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 100000,
                "vo": {
                    groupCode:'',
                }
            },
            carStickerRemake:{
                "currentPage": 1,
                "pageSize": 100000,
                "vo": {
                    carStickerOrderSerial:'',
                }
            },
            firstTrialListObj:{
                "currentPage": 1,
                "pageSize": 100000,
                "vo": {
                    carStickerOrderSerial:'',
                    forDetails:'1'
                }
            },
            monthTrialListObj:{
                "currentPage": 1,
                "pageSize": 100000,
                "vo": {
                    carStickerOrderSerial:'',
                }
            },
            firstTrialHistoryList:[],
            monthTrialHistoryList:[],
            monthTrialDetailsObj:{},
            carStickerRemakeData:[],//备注列表
            optionsCarStickerImg:[],//图片
            optionsUnpassReason:[],//月审
            optionsApplyUnpassReason:[],
            optionsFirstTrialUnpassReason:[],//初审
            optionsfirstTrialStatus:[{
                name:'待审核',
                code:"AF0880601"
            },{
                name:'初审通过',
                code:"AF0880602"
            },{
                name:'初审驳回',
                code:"AF0880603"
            },{
                name:'初审不通过',
                code:"AF0880604"
            }],
            optionsMonthTrialStatus:[{
                name:'待月审审核',
                code:"AF0880701"
            },{
                name:'月审驳回',
                code:"AF0880702"
            },{
                name:'月审不通过',
                code:"AF0880703"
            },{
                name:'已通过',//实际是待月审复审
                code:"AF0880704"
            }],
            optionsCompensateMoney:[],
        };
    },
    watch:{
        dialogFormVisible:{
            handler(newVal,oldVal){
                if(newVal){
                    this.init()
                }
            },
            deep:true
        }
    },
    mounted(){
        this.initDic();
    },
    // created() {
    //     this.carStickerDetailsName = sessionStorage.getItem('carStickerDetailsName') || 'applyInfo';
    // },
    // beforeUpdate () {
    //     sessionStorage.setItem('carStickerDetailsName', this.carStickerDetailsName);
    // },
    // beforeDestroy () {
    //     sessionStorage.setItem('carStickerDetailsName', this.carStickerDetailsName);
    // },
    methods: {
        rowClick(row, event, column){
            // this.selected = row;
            // console.log('rowClick',row)
        },
        changeExpand(i,j){
            console.log('')
            // this.getMonthDetaisl(i[id],0)
        },
        changeExpandMonth(i,j){
            // console.log('i,j',i.id,this.monthTrialHistoryList.length,i.periods)
            var index = this.monthTrialHistoryList.findIndex(function (x) {
                return x.id == i.id
            })
            this.getMonthDetaisl(i.id,index)
        },
        handlerClick(){
            this.dialogVisible = true;
        },
        // getfollowUp(val){
        //     this.optionseFollowUp = [];
        //     if(!this.applyInfoDetails.businessGroupId){
        //         return  this.$message({
        //             type: 'warning',
        //             message: '请先选择车贴跟进分组!'
        //         })
        //     }else{
        //         aflcBusinessGroupUserList(this.listSystemObj).then(res => {
        //             this.optionseFollowUp = res.data.list;
        //             if(this.optionseFollowUp.length == 0 && this.applyInfoDetails.businessGroupId){
        //                 this.applyInfoDetails.followUpId = '';
        //                 this.applyInfoDetails.followUpName = '';
        //                 this.applyInfoDetails.followUpMobile = '';
        //             }
        //         }).catch(err => {
        //             this.applyInfoDetails.followUpId = '';
        //             this.applyInfoDetails.followUpName = '';
        //             this.applyInfoDetails.followUpMobile = '';
        //         })
        //     }
        // },
        // getfollowUpName(val){
        //     this.optionseFollowUp.forEach(el => {
        //         if(el.id == this.applyInfoDetails.followUpId){
        //             this.applyInfoDetails.followUpName = el.name;
        //             this.applyInfoDetails.followUpMobile = el.mobile;
        //         }
        //     })
        // },
        // getVal(val){
        //     this.applyInfoDetails.businessGroupId = val.id;
        //     this.applyInfoDetails.businessGroupName = val.groupName;
        //     this.listSystemObj.vo.groupCode = val.groupCode;
        // },
        initDic(){
            Promise.all([CarStickerStatusType(),CarStickerImgType(),CompensateMoneyType(),MonthUnpassReason(),FirstUnpassReason(),ApplyUnpassReason()]).then(resArr => {
                this.optionsCarStickerStatus = resArr[0].data;
                this.optionsCarStickerImg = resArr[1].data;
                this.optionsCompensateMoney = resArr[2].data;
                this.optionsUnpassReason = resArr[3].data;
                this.optionsFirstTrialUnpassReason = resArr[4].data;
                this.optionsApplyUnpassReason = resArr[5].data;
            })
            if(this.isReject){
                // this.optionsMonthTrialStatus.push({
                //     name:'复审驳回',
                //     code:"AF0880706"
                // })
                this.optionsMonthTrialStatus = [{
                    name:'复审驳回',
                    code:"AF0880706"
                },{
                    name:'月审驳回',
                    code:"AF0880702"
                },{
                    name:'月审不通过',
                    code:"AF0880703"
                },{
                    name:'已通过',
                    code:"AF0880704"
                }]
                // this.optionsMonthTrialStatus = Array.from(new Set(this.optionsMonthTrialStatus));
            }
        },
        init() {
            this.carStickerDetailsName =  this.tabName;
            switch(this.showType){
                case 'details':
                    this.applyInfoInit();
                    break;
                case 'applyInfo':
                    this.applyInfoInit();
                    break;
                case 'firstTrial':
                    this.firstTrialInfo();
                    break;
                case 'monthTrial':
                    this.monthTrialInfo();
                    break;
            }
        },
        firstTrialInfo(){
            let originId = this.showType ==='monthTrial' ? this.monthTrialDetailsObj.firstTrialId : this.detailsObj.id;
            firstTrialDetails(originId).then(res => {
                if(res.data){
                    this.firstTrialDetailsObj = res.data;
                }else{
                    this.firstTrialDetailsObj = {
                        applyMoney:'',//申请金额
                        paySerial:'',//缴费流水号
                        payTime:'',//付款时间
                        realPayMoney:'',//实际支付费用
                        payChannel:'',//支付渠道
                        payChannelName:'',//支付渠道名称
                        isNeedSticke:'',
                    }
                }
            })
            this.firstTrialListObj.vo.carStickerOrderSerial = this.detailsObj.carStickerOrderSerial;
            firstTrialList(this.firstTrialListObj).then(res => {
                this.firstTrialHistoryList = res.data.list;
                this.expands.push(this.firstTrialHistoryList[0].id);
            })
        },
        monthTrialInfo(){
            this.monthTrialListObj.vo.carStickerOrderSerial = this.detailsObj.carStickerOrderSerial;
            monthTrialList(this.monthTrialListObj).then(res => {
                this.monthTrialHistoryList = res.data.list;
                if(this.monthTrialHistoryList.length != 0){
                    this.expands2.push(this.monthTrialHistoryList[0].id);
                    this.getMonthDetaisl(this.monthTrialHistoryList[0].id,0)
                }
            })
        },
        getMonthDetaisl(id,i){
            monthTrialDetails(id).then(res => {
                this.monthTrialDetailsObj = res.data;
                this.monthTrialHistoryList[i].logList = res.data.logList;
            })
        },
        applyInfoInit(){
            carStickerApplyDetails(this.detailsObj.carStickerOrderSerial).then(res => {
                this.applyInfoDetails = res.data;
                this.applyInfoDetails.isNeedPay = this.applyInfoDetails.isNeedPay ? this.applyInfoDetails.isNeedPay : '0';
            });

           this.applyInfoInitRemake();
        },
        applyInfoInitRemake(){
            this.carStickerRemake.vo.carStickerOrderSerial = this.detailsObj.carStickerOrderSerial;
            carStickerRemakeList(this.carStickerRemake).then(res => {
                this.carStickerRemakeData = res.data.list;
            })
        },
        handleClick(tab, event) {
            // this.dataKeys = Math.random();
            this.carStickerDetailsName = tab.name;
            switch(tab.name){
                case 'applyInfo':
                    this.applyInfoInit();
                    break;
                case 'firstTrial':
                    this.firstTrialInfo();
                    break;
                case 'monthTrial':
                    this.monthTrialInfo();
                    break;
            }
        },
        handleClickApply(type,index){
            switch(type){
                case 'addItem':
                    this.chooseType = true;
                    // this.spanArr.push(1)
                    this.applyInfoDetails.responsibleList.push({
                        flag:true,
                        "businessGroupId": "",//所属业务组id
                        "businessGroupName": "",//所属业务组名称
                        "carStickerOrderSerial": this.applyInfoDetails.carStickerOrderSerial,//订单流水号
                        // "creater": "",
                        "followUpId": "",//跟进人id
                        "followUpMobile": "",//跟进人手机
                        "followUpName": "",//跟进人名字
                        // "id": "",
                        "mobile": this.applyInfoDetails.driverMobile,//手机号码
                        "name": this.applyInfoDetails.driverName,//姓名
                        // "status": this.applyInfoDetails.carStickerOrderSerial,//状态
                        "type": "",//责任人类型
                        typeName:''//显示作用
                    });
                    break;
                case 'conserve':
                    let pass = false;
                    // console.log(this.applyInfoDetails.responsibleList,this.applyInfoDetails.responsibleList[this.applyInfoDetails.responsibleList.length - 1])
                    let newForm = this.applyInfoDetails.responsibleList[this.applyInfoDetails.responsibleList.length - 1];
                    if(newForm.userStatus == '' || newForm.groupCode == '' || newForm.belongSalesman == ''){
                        pass = true;
                    }
                    
                    if(!pass){
                        this.chooseType = false;
                        this.applyInfoDetails.responsibleList[this.applyInfoDetails.responsibleList.length - 1].flag = false;
                        // sessionStorage.setItem('once',false)
                        // this.applyInfoDetails.responsibleList.sort(function(a,b){  
                        //     return b.userStatusName.localeCompare(a.userStatusName, 'zh')
                        // })  
                        // this.applyInfoDetails.responsibleList.userStatusName =  this.optionsLevel.find(item => item.code ==  this.xinzengform.discountLevel)['name'];
                        // this.getSpanArr(this.applyInfoDetails.responsibleList);
                    }else{
                        return this.$message({
                            type: 'warning',
                            message: '当前信息存在空值，不可保存!'
                        })
                    }
                    break;
                case 'cancel':
                    this.chooseType = false;
                    this.applyInfoDetails.responsibleList.pop()
                    break;
                case 'delet':
                    if(this.chooseType){
                        return this.$message({
                            type: 'warning',
                            message: '请先保存或取消当前编辑内容!'
                        })
                    }else{
                        this.applyInfoDetails.responsibleList.splice(index,1);
                    }
                    break;
            }
        },
        complateName(val,key){
            //不传中文
            // console.log('val,key',val,key)
            this.applyInfoDetails.responsibleList[key].typeName =  this.optionsFollowUp.find(item => item.code ==  val)['name'];
            // console.log(this.applyInfoDetails.responsibleList)
        },
        getObject(i,e){
            console.log('i,e',i,e)
            this.applyInfoDetails.responsibleList[i].businessGroupName = e.groupName
            this.applyInfoDetails.responsibleList[i].businessGroupId = e.groupCode
        },
        getReturnBelong(val,key){
        //    console.log('val,key',val,key)
            this.applyInfoDetails.responsibleList[key].followUpName = val.name;
            this.applyInfoDetails.responsibleList[key].followUpId = val.userId;
            this.applyInfoDetails.responsibleList[key].followUpMobile = val.mobile;
        //    console.log(this.applyInfoDetails.responsibleList)
        },
        close(){
            this.$emit('update:dialogFormVisible',false);
            this.expands = [];
            this.expands2 = []
        },
        // mGetDate(){
        //     var date = new Date();
        //     var year = date.getFullYear();
        //     var month = date.getMonth()+1;
        //     var d = new Date(year, month, 0);
        //     return d.getDate();
        // },
        conserveFollowUp(){
            let conserveArr = this.applyInfoDetails.responsibleList;
            carStickerConserveFollowUp(conserveArr).then(res => {
                // console.log('666')
                this.close();
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                })
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: '跟进信息操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
                // this.btnShow1 = false;
            })
        },
        submitForm(){
            // console.log('this.applyInfoDetails',this.applyInfoDetails)
            // this.btnShow1 = true;
            // if(!this.applyInfoDetails.status || !this.applyInfoDetails.businessGroupId || !this.applyInfoDetails.followUpId){
            //     this.$message({
            //         type: 'warning',
            //         message: '您未选择的车贴跟进分组或者车贴跟进人!'
            //     })
            // }else{
                this.$set(this.applyInfoDetails, 'applyId', this.applyInfoDetails.id)
                carStickerCheck(this.applyInfoDetails).then(res => {
                    this.conserveFollowUp();
                    this.close();
                    this.$emit('renovate');
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    })
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                    // this.btnShow1 = false;
                })
            // }
        },
        submitForm2(){
            if(!this.firstTrialDetailsObj.isNeedSticke){
                this.$message.warning('请选择是否需要贴车贴!')
            }else{
                if(!this.isEx){
                    let form = {
                        id:this.firstTrialDetailsObj.id,
                        isNeedSticke:this.firstTrialDetailsObj.isNeedSticke
                    }
                    firstTrialRevise(form).then(res => {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
                        this.close();
                        this.$emit('renovateF');
                    }).catch(err => {
                        this.$message({
                            type: 'error',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                        // this.btnShow1 = false;
                    })
                }else{
                    let checkObj = {
                        firstTrialID:this.firstTrialHistoryList[0].id,
                        leftRearPhotoStatus:this.firstTrialHistoryList[0].leftRearPhotoStatus,
                        rightRearPhotoStatus:this.firstTrialHistoryList[0].rightRearPhotoStatus,
                        status:this.firstTrialHistoryList[0].status,
                        unpassReason:this.firstTrialHistoryList[0].unpassReason,
                        isNeedSticke:this.firstTrialDetailsObj.isNeedSticke
                    }
                    firstTrialCheck(checkObj).then(res => {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
                        this.close();
                        this.$emit('renovateF');
                    }).catch(err => {
                        this.$message({
                            type: 'error',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                        // this.btnShow1 = false;
                    })
                }
            }
        },
        submitForm3(){
            if((this.monthTrialHistoryList[0].status === "AF0880702" || this.monthTrialHistoryList[0].status === "AF0880703") && !this.monthTrialHistoryList[0].unpassReason){
                return  this.$message({
                    type: 'warning',
                    message: '【月审不通过/驳回原因】需要必选!'
                })
            }else{
                let checkObj = {
                    monthTrialId:this.monthTrialHistoryList[0].id,
                    leftRearPhotoStatus:this.monthTrialHistoryList[0].leftRearPhotoStatus,
                    rightRearPhotoStatus:this.monthTrialHistoryList[0].rightRearPhotoStatus,
                    status:this.monthTrialHistoryList[0].status,
                    actualSubsidyMoney:((this.monthTrialHistoryList[0].subsidyMoney / this.monthTrialHistoryList[0].correspondingMonthMaxDays)* this.monthTrialHistoryList[0].validDays).toFixed(2),
                    // actualSubsidyMoney:22222,
                    validDays:this.monthTrialHistoryList[0].validDays,
                    compensateMoney:this.monthTrialHistoryList[0].compensateMoney,
                    gesturePhotoStatus:this.monthTrialHistoryList[0].gesturePhotoStatus,
                    unpassReason:this.monthTrialHistoryList[0].unpassReason
                }
                monthTrialCheck(checkObj).then(res => {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    })
                    this.close();
                    this.$emit('renovateM');
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                    // this.btnShow1 = false;
                })
            }
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .carStickerDetails{
        .carNewinfoH2{
            color:#f4f4f5;
            background:#909399;
            padding:10px 0px;
            text-indent: 20px;
            margin:10px 0px 20px;
            position: relative;
            .aflcBusinessBtn{
                position: absolute;
                right: 10px;
                top: 4px;
            }
        }    
        .el-tabs__content{
            overflow: auto;
            padding: 0 10px;
            .dialog-footer{
                margin:20px 0;
            }
        }
        .el-dialog .el-dialog__body {
            padding:10px 0px;
        }
        .essentialInformation{
            padding:10px 0;
            .basicInfo{
                border-top: 1px solid #e6e6e6;
                border-left: 1px solid #e6e6e6;
                .el-col{
                    font-size: 14px;
                    line-height: 45px;
                    height: 45px;
                    padding: 0px 10px;
                    border-right: 1px solid #e6e6e6;
                    border-bottom: 1px solid #e6e6e6;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:nth-child(odd){
                        background: #fafafa;
                        text-align: right;
                    }
                    &:nth-child(even){
                        text-align: left;
                    }
                }
                .selectClass{
                    padding: 0px 2px;
                    .el-select{
                        width: 100%;
                    }
                }
            }
            .el-table{
                .el-form-item{
                    margin-bottom: 0px;
                    // .el-form-item__content .
                }
                .CheckPass .el-form-item {
                    border: 1px solid #eee;
                    border-top: 0 none;
                    padding: 5px 10px 5px 0;
                }
                .colInfo{
                    .el-col{
                        font-size: 14px;
                        line-height: 45px;
                        height: 45px;
                        padding: 0px 10px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        border: 1px solid #e6e6e6;
                        padding: 0px 10px;
                        &:nth-child(odd){
                            background: #fafafa;
                            text-align: right;
                        }
                        &:nth-child(even){
                            text-align: left;
                            border-left: 0 none;
                            // padding: 0px 2px;
                        }
                    }
                }
            }
        }
        .essentialInformation_remake{
            // padding: 20px 0 20px 20px;
            border-bottom: 1px solid #ccc;
            .el-col {
                font-size: 14px;
                line-height: 30px;
                height: 30px;
                // padding: 12px 10px;
                &:nth-child(odd){
                    background: #fafafa;
                    text-align: right;
                }
                &:nth-child(even){
                    text-align: left;
                }
            }
        }
        .uploadPicture{
            width: 100%;
            border:1px solid #eee;
            margin:0px auto;
            .uploadH3{
                line-height: 40px;
                text-align: center;
                border-bottom: 1px solid #eee;
                background: #eee;
                position: relative;
            }
            .uploadImgBox{
                width:100%;
                height: 240px;
                line-height:15px;
                text-align:center;
                img{
                    width: 100%;
                    height: 100%;
                }
                .picURL{
                    width: 385px;
                    height: 215px;
                    cursor: pointer;
                }
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
</style>

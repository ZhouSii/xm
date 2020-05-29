<template>
  <div class="StyleNewinfoComponent shippercreatDialog commoncss driverDialog">
    <el-button
      :type="btntype"
      :value="value"
      :plain="plain"
      :icon="icon"
      @click="openDialog()"
      size="mini"
      :class="editType=='view'?'BtnInfo':''"
    >
      <span>{{btntext}}</span>
    </el-button>
    <el-dialog
      :title="btntitle"
      :visible="driverTemplateDialogFlag"
      top="5vh"
      :before-close="change"
      modal-append-to-body
      v-dialogDrag
      :closeOnClickModal="false"
    >
      <div>
        <el-form ref="templateModel" :model="templateModel" :rules="rulesForm">
          <!-- 身份信息 -->
          <el-row>
            <h2 class="carNewinfoH2">身份信息</h2>
            <el-col :span="8">
              <el-form-item
                label="用户姓名："
                :label-width="formLabelWidth"
                prop
                v-if="editType=='edit2'"
              >
                <el-input
                  v-model="templateModel.driverName"
                  :maxlength="20"
                  :disabled="editType=='view'"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户姓名：" :label-width="formLabelWidth" prop="driverName" v-else>
                <el-input
                  v-model="templateModel.driverName"
                  :maxlength="20"
                  :disabled="editType=='view'"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="手机号码："
                :label-width="formLabelWidth"
                prop
                v-if="editType=='edit2'"
              >
                <el-input
                  v-model="templateModel.driverMobile"
                  :maxlength="11"
                  :disabled="editType=='view'||editType=='valetAuth'||editType=='edit'"
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="driverMobile" v-else>
                <el-input
                  v-model="templateModel.driverMobile"
                  :maxlength="11"
                  :disabled="editType=='view'||editType=='valetAuth'||editType=='edit'"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="身份证号码："
                :label-width="formLabelWidth"
                prop
                v-if="editType=='edit2'"
              >
                <el-input
                  v-model="templateModel.cardid"
                  :maxlength="18"
                  :disabled="editType=='view'"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份证号码：" :label-width="formLabelWidth" prop="cardid" v-else>
                <el-input
                  v-model="templateModel.cardid"
                  :maxlength="18"
                  :disabled="editType=='view'"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="性别：" :label-width="formLabelWidth" prop>
                <el-select
                  v-model="templateModel.sex"
                  placeholder="请选择"
                  :disabled="editType=='view'"
                >
                  <el-option
                    v-for="item in sexList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄：" :label-width="formLabelWidth" prop>
                <el-input v-model="templateModel.age" :maxlength="3" :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生日：" :label-width="formLabelWidth" prop>
                <el-date-picker
                  v-model="templateModel.birthday"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span v-if="editType !=='add'&&!selectFlag_one">
                <el-form-item
                  label="认证所在地："
                  :label-width="formLabelWidth"
                  prop
                  v-if="editType=='edit2'"
                >
                  <el-input
                    v-model="templateModel.belongCityName"
                    @focus="changeSelect_one"
                    :disabled="editType=='view'"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="认证所在地："
                  :label-width="formLabelWidth"
                  prop="belongCityName"
                  v-else
                >
                  <el-input
                    v-model="templateModel.belongCityName"
                    @focus="changeSelect_one"
                    :disabled="editType=='view'"
                  ></el-input>
                </el-form-item>
              </span>
              <span v-else>
                <el-form-item
                  label="认证所在地："
                  :label-width="formLabelWidth"
                  prop
                  v-if="editType=='edit2'"
                >
                  <vregion :ui="true" @values="regionChange" class="form-control" ref="belongCity">
                    <el-input
                      v-model="templateModel.belongCityName"
                      placeholder="请选择"
                      :disabled="editType=='view'"
                    ></el-input>
                  </vregion>
                </el-form-item>

                <el-form-item
                  label="认证所在地："
                  :label-width="formLabelWidth"
                  prop="belongCityName"
                  v-else
                >
                  <vregion :ui="true" @values="regionChange" class="form-control" ref="belongCity">
                    <el-input
                      v-model="templateModel.belongCityName"
                      placeholder="请选择"
                      :disabled="editType=='view'"
                    ></el-input>
                  </vregion>
                </el-form-item>
              </span>
            </el-col>
            <el-col :span="8">
              <el-form-item label="民族：" :label-width="formLabelWidth">
                <el-input
                  v-model="templateModel.nation"
                  :maxlength="10"
                  :disabled="editType=='view'"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活跃值：" :label-width="formLabelWidth">
                <el-select
                  v-model="templateModel.activeValue"
                  placeholder="请选择"
                  :disabled="editType=='view'"
                >
                  <el-option
                    v-for="item in activeValueList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span v-if="editType !=='add'&&!selectFlag_two">
                <el-form-item
                  label="注册所在地："
                  :label-width="formLabelWidth"
                  prop
                  v-if="editType=='edit2'"
                >
                  <el-input
                    v-model="templateModel.regisAddress"
                    @focus="changeSelect_two"
                    :disabled="editType=='view'"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="注册所在地："
                  :label-width="formLabelWidth"
                  prop="regisAddress"
                  v-else
                >
                  <el-input
                    v-model="templateModel.regisAddress"
                    @focus="changeSelect_two"
                    :disabled="editType=='view'"
                  ></el-input>
                </el-form-item>
              </span>
              <span v-else>
                <el-form-item
                  label="注册所在地："
                  :label-width="formLabelWidth"
                  prop
                  v-if="editType=='edit2'"
                >
                  <vregion
                    :ui="true"
                    @values="regisaddressChange"
                    class="form-control"
                    ref="regisAddress"
                  >
                    <el-input v-model="templateModel.regisAddress" placeholder="请选择"></el-input>
                  </vregion>
                </el-form-item>

                <el-form-item
                  label="注册所在地："
                  :label-width="formLabelWidth"
                  prop="regisAddress"
                  v-else
                >
                  <vregion
                    :ui="true"
                    @values="regisaddressChange"
                    class="form-control"
                    ref="regisAddress"
                  >
                    <el-input v-model="templateModel.regisAddress" placeholder="请选择"></el-input>
                  </vregion>
                </el-form-item>
              </span>
            </el-col>
            <el-col :span="8">
              <el-form-item label="住址：" :label-width="formLabelWidth">
                <el-input v-model="templateModel.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="账户登录状态：" :label-width="formLabelWidth">
                <el-button
                  type="primary"
                  icon="el-icon-circle-check-outline"
                  :size="UseBtntype"
                  @click="isOnLine(0)"
                  v-if="templateModel.isOnLine=='1'"
                  :disabled="editType=='view'"
                >是</el-button>
                <el-button
                  type="info"
                  icon="el-icon-circle-close-outline"
                  :size="UseBtntype"
                  @click="isOnLine(1)"
                  v-else
                  :disabled="editType=='view'"
                >否</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否临时认证：" :label-width="formLabelWidth">
                <el-button
                  type="primary"
                  icon="el-icon-circle-check-outline"
                  :size="UseBtntype"
                  @click="isTempCertificate(0)"
                  v-if="templateModel.isTempCertificate=='1'"
                  :disabled="editType=='view'"
                >是</el-button>
                <el-button
                  type="info"
                  icon="el-icon-circle-close-outline"
                  :size="UseBtntype"
                  @click="isTempCertificate(1)"
                  v-else
                  :disabled="editType=='view'"
                >否</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否业务员：" :label-width="formLabelWidth">
                <el-button
                  type="primary"
                  icon="el-icon-circle-check-outline"
                  :size="UseBtntype"
                  @click="isCompanySale(0)"
                  v-if="templateModel.isCompanySale=='1'"
                  :disabled="editType=='view'"
                >是</el-button>
                <el-button
                  type="info"
                  icon="el-icon-circle-close-outline"
                  :size="UseBtntype"
                  @click="isCompanySale(1)"
                  v-else
                  :disabled="editType=='view'"
                >否</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" v-if="editType!== 'add'">
              <el-form-item
                label="认证状态："
                :label-width="formLabelWidth"
              >{{templateModel.driverStatusName}}</el-form-item>
            </el-col>
            <el-col :span="8" v-if="editType!== 'add'">
              <el-form-item
                label="注册日期："
                :label-width="formLabelWidth"
              >{{templateModel.registerTime|parseTime}}</el-form-item>
            </el-col>
            <el-col :span="8" v-if="editType!== 'add'">
              <el-form-item
                label="注册渠道："
                :label-width="formLabelWidth"
              >{{templateModel.registerOriginName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" v-if="editType!== 'add'">
              <el-form-item
                label="提交认证时间："
                :label-width="formLabelWidth"
              >{{templateModel.authenticationTime|parseTime}}</el-form-item>
            </el-col>
            <el-col :span="8" v-if="editType!== 'add'">
              <el-form-item
                label="等待时长："
                :label-width="formLabelWidth"
              >{{templateModel.authenticationTime|remainData}}</el-form-item>
            </el-col>
            <el-col :span="8" v-if="editType!== 'add'">
              <el-form-item
                label="最后登录时间："
                :label-width="formLabelWidth"
              >{{templateModel.loginTime}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="CheckPass">
              <el-form-item prop="idCardFile" label-width="0">
                <div class="uploadPicture">
                  <h3 class="uploadH3">
                    车主身份证照片
                    <el-button
                      type="primary"
                      class="showPictureBtn"
                      plain
                      v-if="editType != 'view' && templateModel.idCardFile"
                      @click="showCurrenPic('idCardFile')"
                    >查看</el-button>
                  </h3>
                  <span v-if="editType == 'view'">
                    <div class="uploadImgBox" v-viewer>
                      <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img
                          :src="templateModel.idCardFile ? templateModel.idCardFile : defaultImg"
                        />
                      </el-tooltip>
                    </div>
                  </span>
                  <div class="upload_True" v-else>
                    <upload
                      class="licensePicture"
                      tip="（必须为jpg/png并且小于5M）"
                      v-model="templateModel.idCardFile"
                      uploadType="idCardFile"
                      @getInformation="IdCardInmation"
                    />
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="CheckPass">
              <el-form-item prop="personalImageFile" label-width="0">
                <div class="uploadPicture">
                  <h3 class="uploadH3">
                    车主个人形象照
                    <el-button
                      type="primary"
                      class="showPictureBtn"
                      plain
                      v-if="editType != 'view' && templateModel.personalImageFile"
                      @click="showCurrenPic('personalImageFile')"
                    >查看</el-button>
                  </h3>
                  <span v-if="editType == 'view'">
                    <div class="uploadImgBox" v-viewer>
                      <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img
                          :src="templateModel.personalImageFile ? templateModel.personalImageFile : defaultImg"
                        />
                      </el-tooltip>
                    </div>
                  </span>
                  <div class="upload_True" v-else>
                    <upload
                      class="licensePicture"
                      tip="（必须为jpg/png并且小于5M）"
                      v-model="templateModel.personalImageFile"
                      pictureStatus="true"
                    />
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 驾驶证信息 -->
          <el-row>
            <h2 class="carNewinfoH2">驾驶证信息</h2>
            <el-col :span="8">
              <el-form-item
                label="档案编号："
                :label-width="formLabelWidth"
                prop
                v-if="editType=='edit2'"
              >
                <el-input v-model="templateModel.fileNumberLicense" :disabled="editType=='view'"></el-input>
              </el-form-item>
              <el-form-item
                label="档案编号："
                :label-width="formLabelWidth"
                prop="fileNumberLicense"
                v-else
              >
                <el-input v-model="templateModel.fileNumberLicense" :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="国籍：" :label-width="formLabelWidth">
                <el-input v-model="templateModel.nationality" :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="准驾车型：" :label-width="formLabelWidth">
                <el-input v-model="templateModel.classType" :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="驾驶证有效期起：" :label-width="formLabelWidth">
                <el-date-picker
                  :disabled="editType=='view'"
                  v-model="templateModel.vldStartLicence"
                  value-format="timestamp"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="驾驶证有效期止：" :label-width="formLabelWidth">
                <el-date-picker
                  :disabled="editType=='view'"
                  v-model="templateModel.vldEndLicence"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="是否过期："
                :label-width="formLabelWidth"
              >{{templateModel.vldEndLicenceExpire}}</el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="初次领证日期：" :label-width="formLabelWidth">
                <el-date-picker
                  :disabled="editType=='view'"
                  v-model="templateModel.firstTimeLicense"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="驾驶证签发机关：" :label-width="formLabelWidth">
                <el-input v-model="templateModel.signOrgLicense" :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="CheckPass">
              <el-form-item prop="drivingLicenceFile">
                <div class="uploadPicture">
                  <h3 class="uploadH3">
                    驾驶证正页
                    <el-button
                      type="primary"
                      class="showPictureBtn"
                      plain
                      v-if="editType != 'view' && templateModel.drivingLicenceFile"
                      @click="showCurrenPic('drivingLicenceFile')"
                    >查看</el-button>
                  </h3>
                  <span v-if="editType == 'view'">
                    <div class="uploadImgBox" v-viewer>
                      <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img
                          :src="templateModel.drivingLicenceFile ? templateModel.drivingLicenceFile : defaultImg"
                        />
                      </el-tooltip>
                    </div>
                  </span>
                  <div class="upload_True" v-else>
                    <upload
                      class="licensePicture"
                      tip="（必须为jpg/png并且小于5M）"
                      v-model="templateModel.drivingLicenceFile"
                      uploadType="drivingLicenceFile"
                      @getInformation="drivingLicenceFileInmation"
                    />
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="CheckPass">
              <el-form-item prop="drivingLicenceFileOpposite">
                <div class="uploadPicture">
                  <h3 class="uploadH3">
                    驾驶证副本
                    <el-button
                      type="primary"
                      class="showPictureBtn"
                      plain
                      v-if="editType != 'view' && templateModel.drivingLicenceFileOpposite"
                      @click="showCurrenPic('drivingLicenceFileOpposite')"
                    >查看</el-button>
                  </h3>
                  <span v-if="editType == 'view'">
                    <div class="uploadImgBox" v-viewer>
                      <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img
                          :src="templateModel.drivingLicenceFileOpposite ? templateModel.drivingLicenceFileOpposite : defaultImg"
                        />
                      </el-tooltip>
                    </div>
                  </span>
                  <div class="upload_True" v-else>
                    <upload
                      class="licensePicture"
                      tip="（必须为jpg/png并且小于5M）"
                      v-model="templateModel.drivingLicenceFileOpposite"
                    />
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 行驶证信息 -->
          <el-row>
            <h2 class="carNewinfoH2">行驶证信息</h2>
            <el-col :span="8">
              <el-form-item
                label="车牌号："
                :label-width="formLabelWidth"
                prop
                v-if="editType=='edit2'"
              >
                <el-input
                  v-model="templateModel.carNumber"
                  :maxlength="8"
                  :disabled="editType=='view'"
                ></el-input>
              </el-form-item>
              <el-form-item label="车牌号：" :label-width="formLabelWidth" prop="carNumber" v-else>
                <el-input
                  v-model="templateModel.carNumber"
                  :maxlength="8"
                  :disabled="editType=='view'"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="所有人："
                :label-width="formLabelWidth"
                prop
                v-if="editType=='edit2'"
              >
                <el-input v-model="templateModel.owner" :disabled="editType=='view'"></el-input>
              </el-form-item>
              <el-form-item label="所有人：" :label-width="formLabelWidth" prop="owner" v-else>
                <el-input v-model="templateModel.owner" :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="使用性质：" :label-width="formLabelWidth">
                <el-input v-model="templateModel.useType" :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="品牌型号：" :label-width="formLabelWidth">
                <el-input v-model="templateModel.brandType" :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车辆识别代号：" :label-width="formLabelWidth">
                <el-input v-model="templateModel.vin" :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发动机号：" :label-width="formLabelWidth">
                <el-input v-model="templateModel.engineNo" :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="行驶证注册日期：" :label-width="formLabelWidth">
                <el-date-picker
                  :disabled="editType=='view'"
                  v-model="templateModel.registerDate"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行驶证发证日期：" :label-width="formLabelWidth">
                <el-date-picker
                  :disabled="editType=='view'"
                  v-model="templateModel.issueDate"
                  value-format="timestamp"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="档案编号行驶证：" :label-width="formLabelWidth">
                <el-input v-model="templateModel.fileNumber" :disabled="editType=='view'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="车辆类型：" :label-width="formLabelWidth" v-if="editType=='edit2'">
                <el-select
                  v-model="templateModel.carType"
                  placeholder="请选择"
                  :disabled="editType=='view'"
                >
                  <el-option
                    v-for="item in carTypeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车辆类型：" :label-width="formLabelWidth" prop="carType" v-else>
                <el-select
                  v-model="templateModel.carType"
                  placeholder="请选择"
                  :disabled="editType=='view'"
                  :class="editType=='valetAuth_un'?'carTypeFlag':''"
                >
                  <el-option
                    v-for="item in carTypeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <el-checkbox
                  v-model="carTypeChecked"
                  class="carTypeStyle"
                  v-if="editType=='valetAuth_un'"
                ></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车辆规格：" :label-width="formLabelWidth" prop="carSpec">
                <el-select
                  v-model="templateModel.carSpec"
                  placeholder="请选择"
                  :disabled="editType=='view'"
                >
                  <el-option
                    v-for="item in carSpecList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="lessWidth_col">
              <el-form-item
                label="车长(米)："
                prop
                :label-width="formLabelWidth"
                v-if="editType=='edit2'"
              >
                <el-input
                  :disabled="editType=='view'"
                  class="lessWidth"
                  placeholder="长"
                  v-model="templateModel.carLength"
                  clearable
                  ref="lengths"
                  :maxlength="5"
                ></el-input>
              </el-form-item>

              <el-form-item label="车长(米)：" prop="carLength" :label-width="formLabelWidth" v-else>
                <el-input
                  :disabled="editType=='view'"
                  class="lessWidth"
                  placeholder="长"
                  v-model="templateModel.carLength"
                  clearable
                  ref="lengths"
                  :maxlength="5"
                ></el-input>
              </el-form-item>

              <el-form-item prop="carWidth">
                <el-input
                  :disabled="editType=='view'"
                  class="lessWidth"
                  placeholder="宽"
                  v-model="templateModel.carWidth"
                  clearable
                  ref="widths"
                  :maxlength="5"
                ></el-input>
              </el-form-item>
              <el-form-item prop="carHeight">
                <el-input
                  :disabled="editType=='view'"
                  class="lessWidth"
                  placeholder="高"
                  v-model="templateModel.carHeight"
                  clearable
                  ref="heights"
                  :maxlength="5"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="CheckPass">
              <el-form-item prop="drivingPermitFile">
                <div class="uploadPicture">
                  <h3 class="uploadH3">
                    车辆行驶证
                    <el-button
                      type="primary"
                      class="showPictureBtn"
                      plain
                      v-if="editType != 'view' && templateModel.drivingPermitFile"
                      @click="showCurrenPic('drivingPermitFile')"
                    >查看</el-button>
                  </h3>
                  <span v-if="editType == 'view'">
                    <div class="uploadImgBox" v-viewer>
                      <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img
                          :src="templateModel.drivingPermitFile ? templateModel.drivingPermitFile : defaultImg"
                        />
                      </el-tooltip>
                    </div>
                  </span>
                  <div class="upload_True" v-else>
                    <upload
                      class="licensePicture"
                      tip="（必须为jpg/png并且小于5M）"
                      v-model="templateModel.drivingPermitFile"
                      uploadType="drivingPermitFile"
                      @getInformation="drivingPermitFileInmation"
                    />
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="CheckPass">
              <el-form-item prop="drivingPermitFileOpposite">
                <div class="uploadPicture">
                  <h3 class="uploadH3">
                    车辆行驶证副本
                    <el-button
                      type="primary"
                      class="showPictureBtn"
                      plain
                      v-if="editType != 'view' && templateModel.drivingPermitFileOpposite"
                      @click="showCurrenPic('drivingPermitFileOpposite')"
                    >查看</el-button>
                  </h3>
                  <span v-if="editType == 'view'">
                    <div class="uploadImgBox" v-viewer>
                      <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img
                          :src="templateModel.drivingPermitFileOpposite ? templateModel.drivingPermitFileOpposite : defaultImg"
                        />
                      </el-tooltip>
                    </div>
                  </span>
                  <div class="upload_True" v-else>
                    <upload
                      class="licensePicture"
                      tip="（必须为jpg/png并且小于5M）"
                      v-model="templateModel.drivingPermitFileOpposite"
                    />
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="CheckPass">
              <el-form-item prop="carFile">
                <div class="uploadPicture">
                  <h3 class="uploadH3">
                    车辆45°照片
                    <el-button
                      type="primary"
                      class="showPictureBtn"
                      plain
                      v-if="editType != 'view' && templateModel.carFile"
                      @click="showCurrenPic('carFile')"
                    >查看</el-button>
                  </h3>
                  <span v-if="editType == 'view'">
                    <div class="uploadImgBox" v-viewer>
                      <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img :src="templateModel.carFile ? templateModel.carFile : defaultImg" />
                      </el-tooltip>
                    </div>
                  </span>
                  <div class="upload_True" v-else>
                    <upload
                      class="licensePicture"
                      tip="（必须为jpg/png并且小于5M）"
                      v-model="templateModel.carFile"
                    />
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 业务信息 -->
          <el-row style="margin-bottom:22px;">
            <h2 class="carNewinfoH2">
              内部权益管理
              <p class="aflcBusinessBtn">
                <el-button
                  type="primary"
                  size="medium"
                  plain
                  v-if="editType != 'view' && !chooseType"
                  @click="handleClick('addItem')"
                >新增权益</el-button>
                <el-button
                  type="primary"
                  size="medium"
                  plain
                  v-if="editType != 'view' && chooseType"
                  @click="handleClick('conserve')"
                >保存</el-button>
                <el-button
                  type="primary"
                  size="medium"
                  plain
                  v-if="editType != 'view' && chooseType"
                  @click="handleClick('cancel')"
                >取消</el-button>
              </p>
            </h2>
            <el-table
              :data="templateModel.aflcBusinessInformationList"
              border
              ref="multipleTable"
              stripe
              align="center"
              tooltip-effect="dark"
              style="width: 100%;min-height:0px"
            >
              <el-table-column prop="userStatusName" label="权益类型">
                <template slot-scope="scope">
                  <span v-if="!scope.row.flag">{{ scope.row.userStatusName }}</span>
                  <div v-else>
                    <el-select
                      v-model="scope.row.userStatus"
                      placeholder="请选择"
                      @change="complateName(scope.row.userStatus,scope.$index)"
                    >
                      <el-option
                        v-for="item in optionsBusinessInterests"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="所属组">
                <template slot-scope="scope">
                  <span v-if="!scope.row.flag">{{ scope.row.groupName }}</span>
                  <div v-else>
                    <businessGroup
                      @inputObject="getObject(scope.$index,$event)"
                      v-model="scope.row.groupName"
                      ref="businessGroup"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="所属人">
                <template slot-scope="scope">
                  <span v-if="!scope.row.flag">{{ scope.row.belongSalesmanName }}</span>
                  <div v-else>
                    <selectBelong
                      :groupCode="scope.row.groupCode"
                      :belongSalesman="scope.row.belongSalesmanMobile"
                      @returnBelong="(value)=>{getReturnBelong(value,scope.$index)}"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" label="操作时间">
                <template slot-scope="scope">{{scope.row.updateTime}}</template>
              </el-table-column>
              <el-table-column prop="updater" label="操作人"></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    size="medium"
                    type="warning"
                    :disabled="scope.row.id ? true : false"
                    plain
                    @click="handleClick('delet',scope.$index)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="车主奖励等级：" prop="rewardgrade" :label-width="formLabelWidth">
                <el-select
                  v-model="templateModel.rewardgrade"
                  placeholder="请选择"
                  :disabled="editType=='view'"
                >
                  <el-option
                    v-for="item in carOwnerType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="中单等级：" :label-width="formLabelWidth">
                <el-select
                  v-model="templateModel.obtainGrade"
                  placeholder="请选择"
                  :disabled="editType=='view'"
                >
                  <el-option
                    v-for="item in optionsLevel"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="中单等级有效期至：" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="templateModel.obtainGradeTime"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  :disabled="editType=='view'"
                  :default-value="timeDefaultShow"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="推荐人：" :label-width="formLabelWidth">
                {{templateModel.recommenderName}}
                <span
                  v-if="templateModel.recommenderName&&templateModel.recommenderPhone"
                >-</span>
                {{templateModel.recommenderPhone}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="推荐人用户类型："
                :label-width="formLabelWidth"
              >{{templateModel.recommenderUserTypeCode}}</el-form-item>
            </el-col>
          </el-row>
          <el-col :span="8">
            <el-form-item
              label="推荐渠道："
              :label-width="formLabelWidth"
            >{{templateModel.recommendedChannelName}}</el-form-item>
          </el-col>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="推荐人所属业务员："
                :label-width="formLabelWidth"
              >{{templateModel.recommenderSalesmanName}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="被推荐人注册时间："
                :label-width="formLabelWidth"
              >{{templateModel.recommendederRegisterTime|parseTime}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否特权车：" :label-width="formLabelWidth">
                <el-button
                  type="primary"
                  icon="el-icon-circle-check-outline"
                  :size="UseBtntype"
                  @click="isVipCar(0)"
                  v-if="templateModel.isVipCar=='1'"
                  :disabled="editType=='view'"
                >是</el-button>
                <el-button
                  type="info"
                  icon="el-icon-circle-close-outline"
                  :size="UseBtntype"
                  @click="isVipCar(1)"
                  v-else
                  :disabled="editType=='view'"
                >否</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="需要后续跟进状态：" :label-width="formLabelWidth">
                <el-button
                  type="primary"
                  icon="el-icon-circle-check-outline"
                  :size="UseBtntype"
                  @click="driverFollowUp(0)"
                  v-if="templateModel.driverFollowUp=='1'"
                  :disabled="editType=='view'"
                >是</el-button>
                <el-button
                  type="info"
                  icon="el-icon-circle-close-outline"
                  :size="UseBtntype"
                  @click="driverFollowUp(1)"
                  v-else
                  :disabled="editType=='view'"
                >否</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否广告车：" :label-width="formLabelWidth">
                <el-button
                  type="primary"
                  icon="el-icon-circle-check-outline"
                  :size="UseBtntype"
                  @click="isAd(0)"
                  v-if="templateModel.isAd=='1'"
                  :disabled="editType=='view' || editType=='edit' || editType=='edit2' || editType=='valetAuth_un' || editType=='valetAuth_up'"
                >是</el-button>
                <el-button
                  type="info"
                  icon="el-icon-circle-close-outline"
                  :size="UseBtntype"
                  @click="isAd(1)"
                  v-else
                  :disabled="editType=='view' || editType=='edit' || editType=='edit2' || editType=='valetAuth_un' || editType=='valetAuth_up'"
                >否</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="广告车有效期：" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="templateModel.adVaild"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期"
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="审核备注：" :label-width="formLabelWidth" class="remarkformlabel">
                <el-input
                  :disabled="editType=='view'"
                  type="textarea"
                  placeholder="少于100字符"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  clearable
                  maxlength="100"
                  v-model="templateModel.businessGroupRemark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 权益信息 -->
          <el-row>
            <h2 class="carNewinfoH2">权益信息</h2>
            <el-col :span="24" v-if="editType !='add'">
              <el-form-item>
                <el-button
                  type="primary"
                  plain
                  v-showPicture
                  :imgurl="templateModel.qrUrl ? templateModel.qrUrl : defaultImg"
                >二维码接单地址</el-button>
                <el-button
                  type="primary"
                  plain
                  v-showPicture
                  :imgurl="templateModel.shipperQrUrl ? templateModel.shipperQrUrl : defaultImg"
                >查看货主邀请码</el-button>
                <el-button
                  type="primary"
                  plain
                  v-showPicture
                  :imgurl="templateModel.driverQrUrl ? templateModel.driverQrUrl : defaultImg"
                >查看车主邀请码</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="会员等级：" :label-width="formLabelWidth">
                <span>无</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会员等级有效期：" :label-width="formLabelWidth">
                <span>无</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table style="width: 100%;min-height:0px">
              <el-table-column prop label="中单等级">
                <template slot-scope="scope">
                  <span>无</span>
                </template>
              </el-table-column>
              <el-table-column prop label="奖励等级">
                <template slot-scope="scope">
                  <span>无</span>
                </template>
              </el-table-column>
              <el-table-column prop label="抽佣等级">
                <template slot-scope="scope">
                  <span>无</span>
                </template>
              </el-table-column>
              <el-table-column prop label="提现等级">
                <template slot-scope="scope">
                  <span>无</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <!-- 冻结信息 -->
          <el-row v-if="editType=='view'">
            <h2 class="carNewinfoH2">冻结信息</h2>
            <el-table style="width: 100%;min-height:0px" :data="templateModel.aflcFreezeUserList">
              <el-table-column prop="freezeTypeName" label="操作" show-overflow-tooltip></el-table-column>
              <el-table-column prop="freezeCause" label="原因" show-overflow-tooltip></el-table-column>
              <el-table-column prop label="解冻日期" show-overflow-tooltip>
                <template slot-scope="scoped">{{scoped.row.unfreezeTime|parseTime}}</template>
              </el-table-column>
              <el-table-column prop label="说明" show-overflow-tooltip>
                <template
                  slot-scope="scoped"
                >{{scoped.row.freezeType=="2"?scoped.row.unfreezeCauseRemark:scoped.row.freezeCauseRemark}}</template>
              </el-table-column>
              <el-table-column prop label="操作时间" show-overflow-tooltip>
                <template slot-scope="scoped">{{scoped.row.createTime|parseTime}}</template>
              </el-table-column>
              <el-table-column prop="updater" label="操作人" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-row>
          <!-- 黑名单信息 -->
          <el-row v-if="editType=='view'">
            <h2 class="carNewinfoH2">黑名单信息</h2>
            <el-table style="width: 100%;min-height:0px" :data="templateModel.aflcBlackUserList">
              <el-table-column prop="blackTypeName" label="操作" show-overflow-tooltip></el-table-column>
              <el-table-column prop label="原因" show-overflow-tooltip>
                <template
                  slot-scope="scoped"
                >{{scoped.row.blackType=="1"?scoped.row.outPutBlackCauseRemark:scoped.row.putBlackCauseRemark}}</template>
              </el-table-column>
              <el-table-column prop="putBlackCause" label="说明" show-overflow-tooltip></el-table-column>
              <el-table-column prop label="操作时间" show-overflow-tooltip>
                <template slot-scope="scoped">{{scoped.row.createTime|parseTime}}</template>
              </el-table-column>
              <el-table-column prop="updater" label="操作人" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          plain
          icon="el-icon-success"
          @click="ChangeData(editType)"
          v-if="editType!=='view'"
        >确 定</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-error"
          @click="driverTemplateDialogFlag=false"
        >取 消</el-button>
      </div>
    </el-dialog>

    <transition name="el-zoom-in-top">
      <div class="PopupPic" v-el-drag-dialog v-show="showPopupPic">
        <div class="el-dialog">
          <div style="height:700px;">
            <div class="el-dialog__header">
              <i class="el-icon-close" @click="closePopPic"></i>
            </div>
            <div class="showPictureBox">
              <div class="PopupPicImg" v-viewer="{fullscreen: false,inline:true,navbar:false}">
                <img :src="signImages ? signImages : defaultImg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  data_get_driverName_id,
  data_post_checkDriverCarNumber,
  data_get_shipper_carOwner,
  data_post_createDriver,
  data_post_mobileGetDriver,
  data_post_driverAudit,
  data_put_changeDriver,
  data_post_audit
} from "@/api/users/carowner/all_car.js";
import vregion from "@/components/vregion/Region";
import { getDictionary } from "@/api/common.js";
import Upload from "@/components/Upload/CarSinglemage";
import businessGroup from "@/components/selectTree/businessGroup";
import { parseTime, pickerOptions2 } from "@/utils/index.js";
import { DicBusinessInterests } from "@/api/common.js";
import { validateNumber } from "@/utils/validate";
import selectBelong from "../shipper/selectBelong";
export default {
  name: "template-create-view-change",
  props: {
    paramsView: {
      type: Object
    },
    params: {
      type: [Object, Array]
    },
    value: {
      type: String,
      default: ""
    },
    btntype: {
      type: String,
      default: ""
    },
    btntext: {
      type: String,
      default: ""
    },
    btntitle: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    plain: {
      type: Boolean,
      default: false
    },
    /*add新增，edit编辑，view查看,edit2修改不校验*/
    editType: {
      type: String,
      default: ""
    },
    count: {
      //数组长度
      type: Number
    },
    isclick: {
      type: Boolean,
      default: false
    }
  },
  components: {
    vregion,
    businessGroup,
    Upload,
    selectBelong
  },
  data() {
    // 手机号校验
    const mobileValidator = (rule, val, cb) => {
      let phoneTest = /(^1[1|2|3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      !val && cb(new Error("手机号码不能为空"));
      if (!phoneTest.test(val)) {
        cb(new Error("请输入正确的手机号码格式"));
      } else {
        if (this.editType == "add") {
          data_post_mobileGetDriver(val)
            .then(res => {
              cb();
            })
            .catch(err => {
              if (err) {
                cb(new Error("该手机号已经被注册~"));
              }
            });
        } else {
          cb();
        }
      }
    };

    // 认证所在地
    const belongCityNameValidator = (rule, val, cb) => {
      if (this.editType == "view") {
        cb();
      } else {
        if (!val) {
          cb(new Error("认证所在地不能为空"));
        } else {
          cb();
        }
      }
    };

    // 注册所在地
    const regisAddressValidator = (rule, val, cb) => {
      if (this.editType == "view") {
        cb();
      } else {
        if (!val) {
          cb(new Error("注册所在地不能为空"));
        } else {
          cb();
        }
      }
    };

    //    身份证信息校验
    const cardidValidator = (rule, val, cb) => {
      var _this = this;
      !val && cb(new Error("身份证不能为空"));
      let IdTest = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!IdTest.test(val)) {
        cb(new Error("请输入正确的身份证"));
      } else {
        cb();
      }
    };

    const fileNumberLicenseValidator = (rule, val, cb) => {
      if (this.editType == "view") {
        cb();
      } else {
        if (!val) {
          cb(new Error("档案编号不能为空"));
        } else {
          cb();
        }
      }
    };
    //    车牌号信息校验
    const carNumberValidator = (rule, val, cb) => {
      var _this = this;
      this.DriverCarNumFrom.carNumber = val;
      if (!val) {
        cb(new Error("车牌号不能为空"));
      } else {
        data_post_checkDriverCarNumber(_this.DriverCarNumFrom)
          .then(res => {
            cb();
          })
          .catch(err => {
            cb(new Error("该车牌号已经注册~"));
          });
      }
    };

    // 车长宽高校验
    const carBreadth = (rule, val, cb) => {
      var reg = /^[0-9]+(.[0-9]{1,2})?$/;
      if (!val) {
        cb(new Error("不能为空"));
      } else if (!reg.test(val)) {
        cb(new Error("保留2位小数"));
      } else {
        cb();
      }
    };

    return {
      btnStatus: true,
      pickerOptions: {
        shortcuts: pickerOptions2
      },
      selectFlag_one: false,
      selectFlag_two: false,
      formLabelWidth: "135px",
      UseBtntype: "medium",
      driverTemplateDialogFlag: false,
      defaultImg: "/static/test.jpg", //默认第一张图片的url
      caroptions: [
        { value: "上传合格", label: "上传合格" },
        { value: "不清晰", label: "不清晰" },
        { value: "内容不符", label: "内容不符" }
      ], //图片审核状态
      sexList: [
        { value: "1", name: "男" },
        { value: "0", name: "女" }
      ], //性别
      optionsStatus: [
        { value: "1", name: "是" },
        { value: "0", name: "否" }
      ], //在线状态
      activeValueList: [], //活跃度
      carTypeList: [], //车辆类型
      carSpecList: [], //车辆规格
      carOwnerType: [], //奖励金等级
      optionsLevel: [], //中单等级
      timeDefaultShow: new Date().setFullYear(new Date().getFullYear() + 1),
      templateModel: {
        driverName: null,
        isOnLine: "0",
        driverMobile: null,
        sex: null,
        age: null,
        cardid: null,
        isVipCar: "0",
        driverFollowUp: "0",
        isTempCertificate: "0",
        isCompanySale: "0",
        isAd: "0",
        regisaddress: null,
        birthday: null,
        carNumber: null,
        owner: null,
        carType: null,
        belongCityName: null,
        regisAddress: null,
        carSpec: null,
        carLength: null,
        carWidth: null,
        carHeight: null,
        activeValue: "AF0020405",
        idCardFile: null,
        personalImageFile: null,
        drivingLicenceFile: null,
        drivingLicenceFileOpposite: null,
        drivingPermitFile: null,
        drivingPermitFileOpposite: null,
        carFile: null,
        aflcBusinessInformationList: [],
        rewardgrade: null,
        fileNumber: null,
        aflcBlackUserList: [],
        aflcFreezeUserList: []
      },
      rulesForm: {
        driverName: {
          required: true,
          message: "用户姓名不能为空",
          trigger: "change"
        },
        driverMobile: {
          validator: mobileValidator,
          trigger: "change",
          required: true
        },
        sex: { required: true, message: "请选择性别", trigger: "change" },
        age: { required: true, message: "年龄不能为空", trigger: "change" },
        cardid: {
          validator: cardidValidator,
          trigger: "change",
          required: true
        },
        birthday: { required: true, message: "请选择生日", trigger: "change" },
        fileNumberLicense: {
          validator: fileNumberLicenseValidator,
          trigger: "change",
          required: true
        },
        carNumber: {
          validator: carNumberValidator,
          trigger: "change",
          required: true
        },
        owner: { required: true, message: "所用人不能为空", trigger: "change" },
        carType: {
          required: true,
          message: "车辆类型不能为空",
          trigger: "change"
        },
        belongCityName: {
          validator: belongCityNameValidator,
          trigger: "change",
          required: true
        },
        regisAddress: {
          validator: regisAddressValidator,
          trigger: "change",
          required: true
        },
        carLength: { validator: carBreadth, trigger: "change", required: true },
        carWidth: { validator: carBreadth, trigger: "change", required: true },
        carHeight: { validator: carBreadth, trigger: "change", required: true },
        personalImageFile: {
          required: true,
          message: "车主个人形象照需要上传",
          trigger: "change"
        },
        idCardFile: {
          required: true,
          message: "车主身份证照片需要上传",
          trigger: "change"
        },
        drivingLicenceFile: {
          required: true,
          message: "驾驶证正页需要上传",
          trigger: "change"
        },
        drivingLicenceFileOpposite: {
          required: true,
          message: "驾驶证副本需要上传",
          trigger: "change"
        },
        drivingPermitFile: {
          required: true,
          message: "车辆行驶证需要上传",
          trigger: "change"
        },
        drivingPermitFileOpposite: {
          required: true,
          message: "车辆行驶证需要上传",
          trigger: "change"
        },
        carFile: {
          required: true,
          message: "车辆45°照片需要上传",
          trigger: "change"
        }
      },
      DriverCarNumFrom: {
        carNumber: "",
        driverId: ""
      },
      radio1: null,
      radio2: null,
      radio3: null,
      radio4: null,
      radio5: null,
      radio6: null,
      optionsBusinessInterests: [], //业务权益类型
      spanArr: [],
      pos: 0,
      groupCode: null,
      showPopupPic: false,
      signImages: "",
      chooseType: false,
      carTypeChecked: false //车辆类型选框
    };
  },
  watch: {
    driverTemplateDialogFlag: {
      handler: function(val, oldVal) {
        if (!val) {
          for (var key in this.templateModel) {
            this.templateModel[key] = null;
          }
          this.templateModel.aflcBusinessInformationList = [];
          this.selectFlag_one = false;
          this.selectFlag_two = false;
          (this.chooseType = false),
            (this.templateModel.activeValue = "AF0020405");
          this.radio1 = null;
          this.radio2 = null;
          this.radio3 = null;
          this.radio4 = null;
          this.radio5 = null;
          this.$refs.templateModel.resetFields();
          this.carTypeChecked = false;
          if (this.$refs.belongCity) {
            this.$refs.belongCity.clear();
            this.$refs.regisAddress.clear();
          }
        } else {
          this.btnStatus = true;
          this.getMoreInformation();
        }
      }
    },
    isclick(newVal) {
      if (newVal) {
        this.$parent.isclick = false;
        this.openDialog();
      }
    }
  },
  filters: {
    remainData: val => {
      if (!val) {
        return "";
      } else {
        let timeData = new Date() - val;
        let timeD = timeData / 1000 / 60 / 60 / 24;
        let timeH = (timeData / 1000 / 60 / 60) % 24;
        return parseInt(timeD) + "天" + parseInt(timeH) + "小时";
      }
    }
  },
  methods: {
    //打开
    openDialog() {
      this.chooseType = false;
      if (this.editType == "view") {
        data_get_driverName_id(this.paramsView.driverId)
          .then(res => {
            this.templateModel = res.data;
            this.DriverCarNumFrom.driverId = res.data.driverId;
            this.DriverCarNumFrom.carNumber = res.data.carNumber;
            if (!this.templateModel.aflcBusinessInformationList) {
              this.templateModel.aflcBusinessInformationList = [];
            }
            if (this.templateModel.aflcBusinessInformationList.length > 0) {
              this.templateModel.aflcBusinessInformationList.forEach(item => {
                item.updateTime = parseTime(
                  item.updateTime,
                  "{y}-{m}-{d} {h}:{i}:{s}"
                );
              });
            }
          })
          .catch(err => {
            this.$message.error("获取数据失败");
          });
        this.driverTemplateDialogFlag = true;
      } else {
        if (this.editType === "add") {
          this.driverTemplateDialogFlag = true;
        } else {
          if (!this.params) {
            this.$message.warning("请选择您要操作的用户");
            return false;
          } else if (this.params.length == 0) {
            this.$message.warning("请选择您要操作的用户");
            return;
          } else if (this.params.length > 1) {
            this.$message({
              message: "每次只能操作单条数据~",
              type: "warning"
            });
            this.$emit("getData");
            return;
          } else {
            data_get_driverName_id(this.params[0].driverId)
              .then(res => {
                this.templateModel = res.data;
                this.DriverCarNumFrom.driverId = res.data.driverId;
                this.DriverCarNumFrom.carNumber = res.data.carNumber;
                delete this.templateModel.driverPermit;
                delete this.templateModel.driverPermitList;
                console.log(this.templateModel);
                if (!this.templateModel.aflcBusinessInformationList) {
                  this.templateModel.aflcBusinessInformationList = [];
                }
                if (this.templateModel.aflcBusinessInformationList.length > 0) {
                  this.templateModel.aflcBusinessInformationList.forEach(
                    item => {
                      item.updateTime = parseTime(
                        item.updateTime,
                        "{y}-{m}-{d} {h}:{i}:{s}"
                      );
                    }
                  );
                }

                // 监听客户上报跳转展示编辑
                let isOnece = sessionStorage.getItem("once");
                if (isOnece && isOnece === "true") {
                  let data = JSON.parse(sessionStorage.getItem("checkData"));
                  if (!!data && JSON.stringify(data) != "{}") {
                    this.templateModel.aflcBusinessInformationList.push({
                      flag: false,
                      belongSalesman: data.salesmanId,
                      belongSalesmanMobile: data.mobile,
                      belongSalesmanName: data.name,
                      groupCode: data.groupCode,
                      groupName: data.groupName,
                      updateTime: parseTime(
                        new Date(),
                        "{y}-{m}-{d} {h}:{i}:{s}"
                      ),
                      updater: "",
                      userStatus: data.code,
                      userStatusName: data.codeName
                    });
                  }
                }
              })
              .catch(err => {
                this.$message.error("获取数据失败");
              });
            this.driverTemplateDialogFlag = true;
          }
        }
      }
    },
    showCurrenPic(type) {
      let vier = document.querySelector(".viewer-container");
      vier.style.width = "100%";
      vier.style.height = "100%";
      switch (type) {
        case "idCardFile":
          this.signImages = this.templateModel.idCardFile;
          break;
        case "personalImageFile":
          this.signImages = this.templateModel.personalImageFile;
          break;
        case "drivingLicenceFile":
          this.signImages = this.templateModel.drivingLicenceFile;
          break;
        case "drivingLicenceFileOpposite":
          this.signImages = this.templateModel.drivingLicenceFileOpposite;
          break;
        case "drivingPermitFile":
          this.signImages = this.templateModel.drivingPermitFile;
          break;
        case "drivingPermitFileOpposite":
          this.signImages = this.templateModel.drivingPermitFileOpposite;
          break;
        case "carFile":
          this.signImages = this.templateModel.carFile;
          break;
      }

      this.showPopupPic = true;
    },
    closePopPic() {
      this.showPopupPic = false;
    },
    // 账户登录状态
    isOnLine(val) {
      this.templateModel.isOnLine = val;
    },
    //  临时认证状态
    isTempCertificate(val) {
      this.templateModel.isTempCertificate = val;
    },
    //  公司业务员状态
    isCompanySale(val) {
      this.templateModel.isCompanySale = val;
    },
    // 需要后续跟进状态
    driverFollowUp(val) {
      this.templateModel.driverFollowUp = val;
    },
    // 特权车状态
    isVipCar(val) {
      this.templateModel.isVipCar = val;
    },
    // 广告车状态
    isAd(val) {
      this.templateModel.isAd = val;
    },
    // 获取信息
    getMoreInformation() {
      getDictionary("AF00204").then(res => {
        this.activeValueList = res.data;
      });
      getDictionary("AF018").then(res => {
        this.carTypeList = res.data;
      });
      getDictionary("AF009").then(res => {
        this.carSpecList = res.data;
      });
      // 车主奖励等级
      getDictionary("AF00207").then(res => {
        this.carOwnerType = res.data;
      });
      // 中单等级的获取
      getDictionary("AF00503").then(res => {
        this.optionsLevel = res.data;
      });
      DicBusinessInterests().then(res => {
        this.optionsBusinessInterests = res.data.filter(el => {
          return el.name != "注册";
        });
      });
    },
    //关闭
    change() {
      this.driverTemplateDialogFlag = false;
      sessionStorage.setItem("once", false);
    },
    //所属地显示
    changeSelect_one() {
      if (this.editType === "add") {
        this.selectFlag_one = false;
      } else {
        this.selectFlag_one = true;
      }
    },
    //所属地显示
    changeSelect_two() {
      if (this.editType === "add") {
        this.selectFlag_two = false;
      } else {
        this.selectFlag_two = true;
      }
    },
    // 所在地
    regionChange(d) {
      this.templateModel.belongCityName =
        !d.province && !d.city && !d.area && !d.town
          ? ""
          : `${this.getValue(d.province)}${this.getValue(
              d.city
            )}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
      if (d.area) {
        this.templateModel.areaCode = d.area.name;
        this.templateModel.belongCity = d.area.code;
      } else if (d.city) {
        this.templateModel.belongCity = d.city.code;
        this.templateModel.cityCode = d.city.name;
      } else if (d.province) {
        this.templateModel.belongCity = d.province.code;
        this.templateModel.provinceCode = d.province.name;
      }
      this.$forceUpdate();
    },
    // 注册所在地
    regisaddressChange(d) {
      this.templateModel.regisAddress =
        !d.province && !d.city && !d.area && !d.town
          ? ""
          : `${this.getValue(d.province)}${this.getValue(
              d.city
            )}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
      if (d.area) {
        this.templateModel.regisAddressCode = d.area.name;
      } else if (d.city) {
        this.templateModel.regisAddressCode = d.city.code;
      } else if (d.province) {
        this.templateModel.regisAddressCode = d.province.code;
      }
      this.$forceUpdate();
    },
    getValue(obj) {
      return obj ? obj.value : "";
    },
    // 年龄计算
    getAge(birth) {
      if (birth) {
        var year = 1000 * 60 * 60 * 24 * 365;
        var now = new Date();
        var birthday = new Date(birth);
        var age = parseInt((now - birthday) / year);
      }
      return age;
    },
    // 获取是身份证信息
    IdCardInmation(val) {
      this.templateModel.driverName = val.name;
      this.templateModel.cardid = val.cardid;
      this.templateModel.address = val.address;
      this.templateModel.birthday = val.birthday;
      this.templateModel.sex = val.sex;
      this.$set(this.templateModel, "age", this.getAge(val.birthday));
      this.templateModel.nation = val.nation;
      this.$forceUpdate();
    },
    // 获取驾驶证信息
    drivingLicenceFileInmation(val) {
      this.$set(this.templateModel, "vldStartLicence", val.vldStart);
      if (val.vldEnd.toString().indexOf("年") !== -1) {
        val.vldEnd = parseTime(val.vldStart, "{y}-{m}-{d}");
        let newVldEnd = val.vldEnd.split("-");
        newVldEnd[0] = parseInt(newVldEnd[0]) + 6;
        let newVldEndArarry =
          newVldEnd[0] + "-" + newVldEnd[1] + "-" + newVldEnd[2];
        this.$set(
          this.templateModel,
          "vldEndLicence",
          new Date(newVldEndArarry).getTime()
        );
      } else {
        this.$set(this.templateModel, "vldEndLicence", val.vldEnd);
      }
      if (new Date().getTime() > this.templateModel.vldEndLicence) {
        this.templateModel.vldEndLicenceExpire = "是";
      } else {
        this.templateModel.vldEndLicenceExpire = "否";
      }
      this.templateModel.nationality = val.nationality;
      this.templateModel.classType = val.classType;
      this.$set(this.templateModel, "firstTimeLicense", val.firstTimeLicense);
      this.$forceUpdate();
    },
    // 获取行驶证信息
    drivingPermitFileInmation(val) {
      this.templateModel.carNumber = val.carNumber;
      this.templateModel.owner = val.owner;
      this.templateModel.useType = val.useType;
      this.templateModel.brandType = val.brandType;
      this.templateModel.vin = val.vin;
      this.templateModel.engineNo = val.engineNo;
      this.templateModel.fileNumber = val.fileNumber;
      this.$set(this.templateModel, "registerDate", val.registerDate);
      this.$set(this.templateModel, "issueDate", val.issueDate);
      this.$forceUpdate();
    },

    // 内部权益按钮
    handleClick(type, index) {
      switch (type) {
        case "addItem":
          this.chooseType = true;
          this.spanArr.push(1);
          this.templateModel.aflcBusinessInformationList.push({
            flag: true,
            userStatus: "", //用户服务类型（0：注册 1：认证 2：后续跟进）
            userStatusName: "",
            groupName: "", //分组名称
            groupCode: "", //分组代码
            belongSalesmanName: "", //所属业务员名称
            belongSalesmanMobile: "", //所属业务员手机号码
            belongSalesman: "", //所属业务员Id
            updateTime: "", //更新时间
            updater: "" //修改人
          });
          break;
        case "conserve":
          let pass = false;
          let newForm = this.templateModel.aflcBusinessInformationList[
            this.templateModel.aflcBusinessInformationList.length - 1
          ];
          if (
            newForm.userStatus == "" ||
            newForm.groupCode == "" ||
            newForm.belongSalesman == ""
          ) {
            pass = true;
          }

          if (!pass) {
            this.chooseType = false;
            this.templateModel.aflcBusinessInformationList[
              this.templateModel.aflcBusinessInformationList.length - 1
            ].flag = false;
            sessionStorage.setItem("once", false);
          } else {
            return this.$message({
              type: "warning",
              message: "当前信息存在空值，不可保存!"
            });
          }
          break;
        case "cancel":
          this.chooseType = false;
          this.templateModel.aflcBusinessInformationList.pop();
          break;
        case "delet":
          if (this.chooseType) {
            return this.$message({
              type: "warning",
              message: "请先保存或取消当前编辑内容!"
            });
          } else {
            this.templateModel.aflcBusinessInformationList.splice(index, 1);
          }
          break;
      }
    },

    // 合并表格
    getSpanArr(data) {
      this.spanArr = [];
      this.pos = 0;
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
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
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },

    getCustomer1(val, key) {
      this.templateModel.aflcBusinessInformationList[
        key
      ].belongCustomerService = val.name;
      this.templateModel.aflcBusinessInformationList[
        key
      ].belongCustomerServiceId = val.userId;
    },
    getReturnBelong(val, key) {
      this.templateModel.aflcBusinessInformationList[key].belongSalesmanName =
        val.name;
      this.templateModel.aflcBusinessInformationList[key].belongSalesman =
        val.userId;
      this.templateModel.aflcBusinessInformationList[key].belongSalesmanMobile =
        val.mobile;
    },
    getObject(i, e) {
      this.templateModel.aflcBusinessInformationList[i].groupName = e.groupName;
      this.templateModel.aflcBusinessInformationList[i].groupCode = e.groupCode;
      this.templateModel.aflcBusinessInformationList[
        i
      ].belongSalesmanName = null;
      this.templateModel.aflcBusinessInformationList[i].belongSalesman = null;
      this.templateModel.aflcBusinessInformationList[
        i
      ].belongSalesmanMobile = null;
    },
    complateName(val, key) {
      this.templateModel.aflcBusinessInformationList[
        key
      ].userStatusName = this.optionsBusinessInterests.find(
        item => item.code == val
      )["name"];
    },

    // 新增车主
    ChangeData() {
      if (this.editType == "edit2") {
        this.$message.info("正在修改中...");
        data_post_audit(this.templateModel)
          .then(res => {
            this.$message.success("修改成功");
            this.$emit("getData");
            this.driverTemplateDialogFlag = false;
            sessionStorage.setItem("once", false);
          })
          .catch(err => {
            this.$message.error("修改失败");
            this.$emit("getData");
            this.driverTemplateDialogFlag = false;
          });
      } else {
        if (this.editType == "valetAuth_un" && !this.carTypeChecked) {
          this.$message.error("车辆类型选框需要勾选才能提交！");
        } else {
          this.$refs["templateModel"].validate(valid => {
            if (valid) {
              if (this.chooseType) {
                this.$message({
                  type: "error",
                  message: "检测到新增权益类型未保存!请先保存!"
                });
              } else {
                if (this.btnStatus) {
                  this.btnStatus = false;
                  if (this.editType === "add") {
                    this.$message.info("新增中...");
                    data_post_createDriver(this.templateModel)
                      .then(res => {
                        this.$message.success("新增成功");
                        this.$emit("getData");
                        this.driverTemplateDialogFlag = false;
                      })
                      .catch(err => {
                        this.$message.error("新增失败");
                        this.$emit("getData");
                        this.driverTemplateDialogFlag = false;
                      });
                  } else if (
                    this.editType === "valetAuth_up" ||
                    this.editType === "valetAuth_un"
                  ) {
                    this.templateModel.driverStatus = "AF0010403";
                    this.templateModel.isValetCertificate = "1";
                    this.$message.info("正在代客认证中...");
                    data_post_audit(this.templateModel)
                      .then(res => {
                        this.$message.success("代客认证成功");
                        this.$emit("getData");
                        this.driverTemplateDialogFlag = false;
                      })
                      .catch(err => {
                        this.$message.error("代客认证失败");
                        this.$emit("getData");
                        this.driverTemplateDialogFlag = false;
                      });
                  } else if (this.editType === "edit") {
                    this.$message.info("正在修改中...");
                    data_post_audit(this.templateModel)
                      .then(res => {
                        this.$message.success("修改成功");
                        this.$emit("getData");
                        this.driverTemplateDialogFlag = false;
                      })
                      .catch(err => {
                        this.$message.error("修改失败");
                        this.$emit("getData");
                        this.driverTemplateDialogFlag = false;
                      });
                  }
                }
              }
            } else {
              this.$message.error("内容未填写完整");
            }
          });
        }
      }
    }
  },
  computed: {},
  mounted() {}
};
</script>
            
<style lang="scss">
</style>
            

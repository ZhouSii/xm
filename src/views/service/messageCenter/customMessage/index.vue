<template>
  <div class="identicalStyle clearfix plantService" v-loading="loading">
    <el-form
      :inline="true"
      :model="searchInfo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="消息类型">
        <el-select v-model="searchInfo.messageType" clearable placeholder="请选择">
          <el-option
            v-for="item in messageTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推送用户类型">
        <el-select v-model="searchInfo.pushUserType" clearable placeholder="请选择">
          <el-option
            v-for="item in pushUserTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息标题" prop="workSerial">
        <el-input v-model="searchInfo.title" clearable></el-input>
      </el-form-item>
      <!--      <el-form-item label="短信模板" prop="workSerial">-->
      <!--        <el-input v-model="searchInfo." clearable>-->
      <!--        </el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="推送渠道">
        <el-select v-model="searchInfo.pushChannel" clearable placeholder="请选择">
          <el-option
            v-for="item in pushChannelList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推送状态">
        <el-select v-model="searchInfo.pushStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in pushStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="btnChoose fr" style="margin-left:0;">
        <el-button
          type="primary"
          icon="el-icon-search"
          plain
          :size="btnsize"
          @click="handleSearch('search')"
        >搜索</el-button>
        <el-button
          type="info"
          icon="fontFamily aflc-icon-qingkong"
          :size="btnsize"
          plain
          @click="handleSearch('clear')"
        >清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box clearfix">
        <el-button
          type="primary"
          size="mini"
          plain
          icon="el-icon-circle-plus"
          @click="handleClick('add')"
          v-has:CUSTOM_LINEDISTRICTCHANGE_CUSTOMMESSAGE_ADD
        >新增</el-button>
        <!--        <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleClick('edit')">修改</el-button>-->
        <el-button
          type="primary"
          size="mini"
          plain
          @click="toMessage()"
          v-has:CUSTOM_LINEDISTRICTCHANGE_CUSTOMMESSAGE_VIEWPUSHRECORDS
        >查看推送记录</el-button>
        <!--        <el-button type="primary" size="mini" plain @click="handleClick('del')">删除</el-button>-->
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          align="center"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" sortable width="80">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="messageTypeName"
            label="消息类型"
            min-width="150"
            sortable
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button type="text" @click="showDetail(scope.row)">{{ scope.row.messageTypeName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="pushUserTypeName"
            label="推送用户类型"
            min-width="150"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="pushChannelName"
            label="推送渠道"
            min-width="150"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="title" label="消息标题" min-width="200" sortable show-overflow-tooltip></el-table-column>
          <!--          <el-table-column prop="phone" label="短信模板" min-width="150" sortable>-->
          <!--          </el-table-column>-->
          <el-table-column
            prop="pushUserCount"
            label="推送人数"
            min-width="150"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="pushStatusName"
            label="推送状态"
            min-width="150"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="pushTime"
            label="推送时间"
            min-width="160"
            sortable
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{ scope.row.pushTime | parseTime}}</template>
          </el-table-column>
          <el-table-column
            prop="updater"
            label="最新操作人"
            min-width="150"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="updateTime"
            label="最新操作时间"
            min-width="160"
            sortable
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{ scope.row.updateTime | parseTime}}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" />
      </div>
    </div>

    <div class="commoncss">
      <el-dialog
        :close-on-click-modal="false"
        v-el-drag-dialog
        :visible.sync="dialogFormVisible"
        @close="closeDetail"
        @open="open"
        :title="btntitle"
        width="700px"
      >
        <el-form
          ref="ruleFormDataDialog"
          :model="formDataDialog"
          label-position="right"
          label-width="140px"
        >
          <el-form-item
            label="消息类型"
            prop="messageType"
            :rules="{required: true, message: '请选择消息类型', trigger: 'change'}"
          >
            <el-select
              v-model="formDataDialog.messageType"
              clearable
              placeholder="请选择"
              :disabled="formDataDialog._showDetail"
            >
              <el-option
                v-for="item in messageTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="推送用户类型"
            prop="pushUserType"
            :rules="{required: true, message: '请选择推送用户类型', trigger: 'change'}"
          >
            <el-select
              v-model="formDataDialog.pushUserType"
              @change="changePushUserType"
              clearable
              placeholder="请选择"
              :disabled="formDataDialog._showDetail"
            >
              <el-option
                v-for="item in pushUserTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="推送渠道"
            prop="_pushChannel"
            :rules="{type: 'array', required: true, message: '请选择推送渠道', trigger: 'change'}"
          >
            <el-checkbox-group v-model="formDataDialog._pushChannel" disabled>
              <el-checkbox
                :label="item.code"
                v-for="(item,index) in pushChannelList"
                :key="index"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            label="消息标题"
            prop="title"
            :rules="{required: true, message: '请输入消息标题', trigger: 'blur'}"
          >
            <el-input
              v-model="formDataDialog.title"
              placeholder="请输入"
              maxlength="30"
              clearable
              :disabled="formDataDialog._showDetail"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="消息内容"
            prop="content"
            :rules="{required: true, message: '请输入消息内容', trigger: 'blur'}"
          >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入"
              maxlength="500"
              v-model="formDataDialog.content"
              clearable
              :disabled="formDataDialog._showDetail"
            ></el-input>
          </el-form-item>
          <!--          <el-form-item label="消息链接">-->
          <!--            <el-radio v-model="formDataDialog._url" :label="item.id" @change="changeRadio"-->
          <!--                      v-for="(item,index) in urlList" :key="index">{{item.name}}</el-radio>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item v-if="formDataDialog._url === 1" label="系统功能页面" prop="system" :rules="{required: true, message: '请选择系统功能页面', trigger: 'blur'}">-->
          <!--            <el-select v-model="formDataDialog.system" clearable placeholder="请选择">-->
          <!--              <el-option-->
          <!--                v-for="item in optionsPlantService"-->
          <!--                :key="item.id"-->
          <!--                :label="item.name"-->
          <!--                :value="item.code">-->
          <!--              </el-option>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <el-form-item label="外部链接URL">
            <el-input
              v-model="formDataDialog.externalLink"
              placeholder="请输入"
              maxlength="100"
              clearable
              :disabled="formDataDialog._showDetail"
            ></el-input>
          </el-form-item>
          <el-form-item label="站内消息附件" v-if="!formDataDialog._showDetail">
            <upload
              @getFileList="getFileList"
              :title="'本地上传'"
              tip
              :multiple="true"
              :showFileList="true"
              :limit="5"
            />
          </el-form-item>
          <!--          <el-form-item label="短信模板" prop="sms" :rules="{required: true, message: '请输入短信模板', trigger: 'blur'}">-->
          <!--            <el-button type="primary" size="mini" plain @click="smsClick()">选择短信模板</el-button>-->
          <!--            <el-input type="textarea" :rows="2" placeholder="请输入" maxlength="100" v-model="formDataDialog.sms" clearable></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="短信内容填入字段值">-->
          <!--            <el-input v-model="formDataDialog.smsField" placeholder="请输入" maxlength="20" clearable></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item
            label="推送时间"
            prop="pushTimeOption"
            :rules="{required: true, message: '请选择推送时间', trigger: 'change'}"
          >
            <el-row>
              <el-radio
                v-model="formDataDialog.pushTimeOption"
                :label="1"
                :disabled="btntitle=='详情'"
              >立即推送</el-radio>
              <el-radio
                v-model="formDataDialog.pushTimeOption"
                :label="2"
                :disabled="btntitle=='详情'"
              >定时推送</el-radio>
            </el-row>
          </el-form-item>

          <div
            v-for="(item,index) in formDataDialog.pushTimeList"
            :key="index"
            v-if="formDataDialog.pushTimeOption=='2'"
          >
            <el-form-item
              v-if="btntitle=='新增'"
              :prop="'pushTimeList['+index+']'"
              :rules="{required:true,validator: (rule, value, callback) => {
                                    if (!value) {
                                    callback('请选择定时推送时间');
                                    } else if(value<Date.now()){
                                    callback('定时推送时间需晚于当前时间，请重新设置');
                                    }else{
                                      callback();
                                    }
                                }, trigger: 'blur'}"
            >
              <el-row :gutter="20">
                <el-col :span="15">
                  <el-date-picker
                    v-model="formDataDialog.pushTimeList[index]"
                    type="datetime"
                    placeholder="请选择定时推送时间"
                    value-format="timestamp"
                  ></el-date-picker>
                </el-col>
                <el-col :span="9">
                  <el-button
                    @click="addItem(index)"
                    v-if="index == 0"
                    type="primary"
                    size="medium"
                    class="el-icon-plus"
                  ></el-button>
                  <el-button
                    @click="reduceItem(index)"
                    v-else
                    type="danger"
                    size="medium"
                    class="el-icon-minus"
                  ></el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item v-if="btntitle=='详情'">
              <el-input v-model="formDataDialog.pushTimeList[index]" disabled></el-input>
            </el-form-item>
          </div>
          <el-form-item
            label="推送用户"
            prop="pushUsers"
            :rules="{required: true, message: '请输入或上传推送用户', trigger: 'change'}"
          >
            <div class="tabsWrap">
              <el-tabs
                v-model="formDataDialog._activeName"
                type="border-card"
                @tab-click="handleClick"
              >
                <el-tab-pane
                  label="填写手机号"
                  name="first"
                  :disabled="formDataDialog._showPhone || formDataDialog._showDetail"
                >
                  <p class>请填写用户手机号，一行一个手机号</p>
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="formDataDialog.pushUsers"
                    :disabled="formDataDialog._showPhone || formDataDialog._showDetail"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-tab-pane>
                <el-tab-pane
                  label="模板批量推送"
                  name="second"
                  :disabled="formDataDialog._showPhone || formDataDialog._showDetail"
                >
                  <p>请上传模板批量推送</p>
                  <p>格式：txt文档，一行一个手机号</p>
                  <div>
                    <el-upload
                      class="image-uploader"
                      :data="upload"
                      :before-upload="beforeUpload"
                      :on-success="handleImageScucess"
                      :action="uploadUrl"
                      multiple
                      :show-file-list="false"
                      :limit="3"
                      v-show="!fileName"
                      :disabled="formDataDialog._showPhone"
                      ref="upload"
                    >
                      <slot name="content">
                        <el-button size="mini" type="primary">点击上传</el-button>
                      </slot>
                    </el-upload>
                    <div class="image-preview" v-show="fileName">
                      <div class="image-preview-wrapper">
                        <a class="fileName" target="_blank" :href="fileName">{{fileName}}</a>
                        <i @click="rmImage" class="el-icon-delete"></i>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-form-item>
          <el-form-item label v-if="!formDataDialog._showDetail">
            <el-checkbox
              :label="'推送给全部' + allName"
              v-model="formDataDialog.isPushAll"
              :true-label="1"
              :false-label="0"
              @change="changePushAll"
            ></el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            plain
            icon="el-icon-success"
            @click="submit()"
            :disabled="showClick"
            v-if="!formDataDialog._showDetail"
          >确 定</el-button>
          <el-button
            @click="dialogFormVisible = false"
            type="primary"
            plain
            icon="el-icon-error"
          >关 闭</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="commoncss">
      <el-dialog
        :close-on-click-modal="false"
        v-el-drag-dialog
        :visible.sync="dialogFormVisible1"
        title="短信模板"
        width="600px"
      >
        <el-row type="flex" justify="space-between" align="middle" style="margin-bottom: 10px">
          <el-row type="flex" align="middle">
            <div style="width: 80px">短信内家</div>
            <el-input v-model="smsContent" clearable :size="btnsize"></el-input>
          </el-row>
          <div>
            <el-button
              type="primary"
              icon="el-icon-search"
              plain
              :size="btnsize"
              @click="handleSearchSms('search')"
            >搜索</el-button>
            <el-button
              type="info"
              icon="fontFamily aflc-icon-qingkong"
              :size="btnsize"
              plain
              @click="handleSearchSms('clear')"
            >清空</el-button>
          </div>
        </el-row>
        <el-table
          ref="multipleTable1"
          :data="tableDataSms"
          stripe
          border
          align="center"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="序号" sortable width="80">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="complainTypeName" label="短信内容" min-width="250" sortable></el-table-column>
          <el-table-column label="操作" width="100" sortable>
            <template slot-scope="scope">
              <el-button type="text" size="mini" plain @click="selectSms(scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import { getDictionary, getUploadPolicy } from "@/api/common.js";
import { getCustomMessage, addCustomMessage } from "@/api/service/message.js";
import { parseTime } from "@/utils/index.js";
import Pager from "@/components/Pagination/index";
import Upload from "@/components/Upload/multFile";

export default {
  components: { Pager, Upload },
  data() {
    return {
      multipleSelection: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      optionsPlantService: [],
      messageTypeList: [],
      pushChannelList: [],
      pushUserTypeList: [],
      pushStatusList: [
        { id: 0, name: "待推送", code: "0" },
        { id: 1, name: "已推送", code: "1" }
      ],
      urlList: [
        { id: 1, name: "系统功能页面" },
        { id: 2, name: "外部链接URL" }
      ],
      btnsize: "mini",
      loading: true, // 加载
      sizes: [20, 50, 100],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      searchInfo: {
        messageId: "", // 消息id
        messageType: "", // 消息类型(字典AF0711801)
        pushChannel: "", // 推送渠道(字典AF0711802)
        pushStatus: "", // 推送状态(0: 待推送，1: 已推送)
        pushUserType: "", // 推送用户类型(字典AF001)
        title: "" // 消息标题
      },
      tableData: [],
      tableDataSms: [],
      btntitle: "",
      showClick: false,
      smsContent: "",
      formDataDialog: {
        _activeName: "first",
        _showDetail: false,
        _showPhone: false,
        // _url: '', // 消息链接
        // system: '', // 系统功能页面
        externalLink: "", // 外部链接URL
        // sms: '', // 短信模板
        // smsField: '', // 短信内容填入字段值
        isPushAll: 0, // 推送给全部
        messageType: "", // 消息类型
        pushUserType: "", // 推送用户类型
        pushChannel: "", // 推送渠道
        _pushChannel: ["AF071180201"],
        title: "", // 消息标题
        content: "", // 消息内容
        annexList: [], // 站内消息附件
        pushTimeOption: 1, // 推送时间
        pushTimeList: [""], // 定时推送时间
        pushUsers: "" // 推送用户 单个手机号或文件链接
      },
      upload: {
        key: "", // 文件名称
        policy: "",
        OSSAccessKeyId: "",
        success_action_status: "201", // 让服务端返回200,不然，默认会返回204;201会返回xml格式
        signature: ""
      },
      uploadUrl: "",
      fileName: "",
      allName: "",
      dir: ""
    };
  },
  watch: {},
  created() {
    this.fetchData();
    getDictionary("AF0711801").then(res => {
      this.messageTypeList = res.data;
    });
    getDictionary("AF0711802").then(res => {
      this.pushChannelList = res.data;
    });
    getDictionary("AF001").then(res => {
      this.pushUserTypeList = res.data.filter(item => {
        return (
          item.code === "AF00112" ||
          item.code === "AF00113" ||
          item.code === "AF00101" ||
          item.code === "AF00102"
        );
      });
    });
  },
  mounted() {
    this.getPolicy();
  },
  beforeDestroy() {},
  methods: {
    submit() {
      this.$refs["ruleFormDataDialog"].validate(valid => {
        if (valid) {
          this.showClick = true;
          if (this.showClick) {
            if (this.btntitle === "新增") {
              this.formDataDialog.pushChannel = this.formDataDialog._pushChannel.join(
                ","
              );
              addCustomMessage(this.formDataDialog)
                .then(res => {
                  if (res.status === 200) {
                    this.$message.success("新增成功");
                    this.page = 1;
                    this.fetchData();
                    this.dialogFormVisible = false;
                  } else {
                    this.$message.warning(res.errorInfo || res.text);
                  }
                  this.showClick = false;
                })
                .catch(err => {
                  this.$message.warning(err.errorInfo || err.text);
                  this.showClick = false;
                });
            } else {
              // updateData(formData)
              //   .then(res => {
              //     if (res.status === 200) {
              //       this.$message.success('修改成功')
              //       this.fetchData()
              //       this.dialogFormVisible = false
              //     } else {
              //       this.$message.warning(res.errorInfo || res.text)
              //     }
              //     this.showClick = false
              //   })
              //   .catch(err => {
              //     this.$message.warning(err.errorInfo || err.text)
              //     this.showClick = false
              //   })
            }
          }
        } else {
          return false;
        }
      });
    },
    selectSms() {},
    smsClick() {
      this.dialogFormVisible1 = true;
    },
    closeDetail() {
      this.fileName = "";
      this.formDataDialog = this.$options.data().formDataDialog;
      this.$refs["ruleFormDataDialog"].resetFields();
    },
    open() {
      this.$nextTick(() => {
        if (this.btntitle === "新增") {
          //
        }
        if (this.btntitle === "修改") {
          // getOneData(this.selectedList[0])
          //   .then(res => {
          //     if (res.status === 200) {
          //       res.data.customize = res.data.customize ? JSON.parse(res.data.customize) : [
          //         { name: '', value: '' },
          //         { name: '', value: '' },
          //         { name: '', value: '' },
          //         { name: '', value: '' }
          //       ]
          //       this.formDataDialog = res.data
          //       this.getCenter(this.formDataDialog.centerPoint.length === 0 ? '' : this.formDataDialog.centerPoint.split(','))
          //     }
          //   })
          //   .catch(err => {
          //     this.$message.warning(err.errorInfo || err.text)
          //   })
        }
      });
    },
    addItem(i) {
      if (!this.formDataDialog.pushTimeList[i]) {
        this.$message.warning("请先选择定时推送时间");
        return;
      } else {
        this.formDataDialog.pushTimeList.push("");
      }
    },
    reduceItem(i) {
      this.formDataDialog.pushTimeList.splice(i, 1);
    },
    handleClick(name) {
      switch (name) {
        case "add":
          this.btntitle = "新增";
          this.dialogFormVisible = true;
          break;
        case "edit":
          this.btntitle = "修改";
          break;
        case "detail":
          //
          break;
        case "del":
          //
          break;
      }
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.fetchData();
    },

    fetchData() {
      this.loading = true;
      getCustomMessage(this.page, this.pagesize, this.searchInfo)
        .then(res => {
          this.tableData = res.data.list;
          this.dataTotal = res.data.total;
          this.loading = false;
        })
        .catch(err => {
          this.$message({
            type: "info",
            message:
              "操作失败，原因：" + (err.errorInfo ? err.errorInfo : err.text)
          });
          this.loading = false;
        });
    },
    handleSearch(type) {
      this.page = 1;
      switch (type) {
        case "search":
          this.fetchData();
          break;
        case "clear":
          this.searchInfo = this.$options.data().searchInfo;
          this.fetchData();
          break;
      }
    },
    handleSearchSms(type) {
      switch (type) {
        case "search":
          break;
        case "clear":
          break;
      }
    },
    getPolicy() {
      return getUploadPolicy("aflc")
        .then(data => {
          this.upload.OSSAccessKeyId = data.accessid;
          this.upload.policy = data.policy;
          this.upload.signature = data.signature;
          this.uploadUrl = data.host;
          this.dir = data.dir;
        })
        .catch(err => {
          console.log("get Policy ERror:", err);
        });
    },
    // txt文件上传前
    beforeUpload(file) {
      const isJPG = file.type.indexOf("text");
      return new Promise((resolve, reject) => {
        if (isJPG === -1) {
          this.$message.error("上传图片只能是txt格式!");
          reject(false);
        } else {
          // 上传前统一获取下凭证
          this.getPolicy()
            .then(res => {
              // 设置文件名
              this.upload.key =
                this.dir +
                parseTime(new Date(), "{y}{m}{d}") +
                "/" +
                parseInt(Math.random() * 100000) +
                "_" +
                file.name;
              resolve(true);
            })
            .catch(err => {
              this.$message.error("未知错误：" + JSON.stringify(err));
              resolve(false);
            });
        }
      });
    },
    // txt文件上传成功
    handleImageScucess(xml) {
      const reg = /<Location>(.*)<\/Location>/;
      if (reg.test(xml)) {
        this.fileName = RegExp.$1;
        this.formDataDialog.pushUsers = RegExp.$1;
      }
    },
    // 删除txt文件
    rmImage() {
      this.fileName = "";
      this.formDataDialog.pushUsers = "";
    },
    toMessage() {
      if (this.multipleSelection.length === 0) {
        this.$message.info("请选择一条操作数据。");
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.info("请勿选择多条数据进行操作。");
        return;
      }
      this.$router.push(
        `/service/messageCenter/messagePushRecord/index?id=${this.multipleSelection[0].id}`
      );
    },
    showDetail(item) {
      this.btntitle = "详情";
      this.dialogFormVisible = true;
      this.formDataDialog = {
        _activeName: "first",
        _showDetail: true,
        // _url: '', // 消息链接
        // system: '', // 系统功能页面
        externalLink: item.externalLink, // 外部链接URL
        // sms: '', // 短信模板
        // smsField: '', // 短信内容填入字段值
        isPushAll: 0, // 推送给全部
        messageType: item.messageType, // 消息类型
        pushUserType: item.pushUserType, // 推送用户类型
        pushChannel: "", // 推送渠道
        _pushChannel: ["AF071180201"],
        title: item.title, // 消息标题
        content: item.content, // 消息内容
        annexList: [], // 站内消息附件
        pushTimeOption: +item.pushTimeOption, // 推送时间
        pushTimeList: item.pushTime.split("，"), // 定时推送时间
        pushUsers: item.pushMobiles // 推送用户 单个手机号或文件链接
      };
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getFileList(list) {
      const _list = [];
      const reg = /<Location>(.*)<\/Location>/;
      list.forEach(item => {
        if (item.response && reg.test(item.response)) {
          _list.push({ fileName: item.name, fileUrl: RegExp.$1 });
        }
      });
      this.formDataDialog.annexList = _list;
    },
    changePushUserType(e) {
      if (e) {
        this.pushUserTypeList.forEach(item => {
          if (item.code === e) {
            this.allName = item.name;
          }
        });
      } else {
        this.allName = "";
      }
    },
    changePushAll(e) {
      if (e) {
        this.formDataDialog._showPhone = true;
        this.fileName = "";
        this.formDataDialog.pushUsers = " ";
      } else {
        this.formDataDialog._showPhone = false;
        this.formDataDialog.pushUsers = "";
      }
    },
    changeRadio(e) {
      if (e === 1) {
        this.$refs["ruleFormDataDialog"].clearValidate("system");
      }
      if (e === 2) {
        this.$refs["ruleFormDataDialog"].clearValidate("outUrl");
      }
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.plantService {
  height: 100%;
  .reMark {
    padding: 5px 15px;
    border-radius: 20% / 50%;
    background: #eca438;
    color: #fff;
  }
  .sussces {
    padding: 5px 15px;
    border-radius: 20% / 50%;
    background: skyblue;
    color: #fff;
  }
}
</style>

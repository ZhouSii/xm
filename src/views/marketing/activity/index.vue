<template>
  <div class="TwoColumns clearfix" v-loading="loading">
    <div class="columnsContainer">
      <div class="side_right">
        <el-form :inline="true" ref="ruleForm" class="divide" size="mini">
          <el-form-item label="业务">
            <el-select
              v-model="formData.serviceType"
              @change="changeServiceType"
              clearable
              placeholder="请选择业务类型"
            >
              <el-option
                v-for="(item,index) in serviceClassificationList"
                :key="index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参与用户">
            <el-select v-model="formData.userType" clearable placeholder="请选择投放角色">
              <el-option
                v-for="(item,index) in userList0"
                :key="index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键词">
            <el-input v-model="formData.keyword" clearable placeholder="请输入活动/商品名称"></el-input>
          </el-form-item>
          <el-form-item label="活动日期">
            <el-date-picker
              popper-class="activity-picker"
              @change="changeTime"
              v-model="formData.time"
              value-format="yyyyMMdd"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item class="fr">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              plain
              @click="searchClick()"
            >查询</el-button>
            <el-button
              type="info"
              size="mini"
              icon="fontFamily aflc-icon-qingkong"
              plain
              @click="clearClick()"
            >清空</el-button>
          </el-form-item>
        </el-form>

        <div class="side_right_bottom clearfix">
          <div class="btns_box clearfix">
            <el-button
              type="primary"
              size="mini"
              plain
              icon="el-icon-circle-plus"
              @click="handleClick('add')"
              v-has:MARKETING_PANICBUYINGACTIVITIES_ADD
            >新增</el-button>
            <el-button
              type="primary"
              size="mini"
              plain
              icon="el-icon-edit"
              @click="handleClick('edit')"
              v-has:MARKETING_PANICBUYINGACTIVITIES_MODIFY
            >修改</el-button>

            <el-button
              type="primary"
              size="mini"
              plain
              icon="el-icon-bell"
              @click="sTClick()"
              v-has:MARKETING_PANICBUYINGACTIVITIES_ENABLEDISABLE
            >启用/停用</el-button>
            <el-button
              type="primary"
              size="mini"
              plain
              @click="activityClick()"
              v-has:MARKETING_PANICBUYINGACTIVITIES_PANICBUYINGACTIVITIES_ACTIVELINK
            >活动链接</el-button>
          </div>
          <div class="info_news">
            <el-table
              ref="multipleTable"
              :data="tableData"
              stripe
              border
              height="100%"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="序号" width="60">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column prop="activityName" sortable min-width="176" label="活动名称"></el-table-column>
              <el-table-column prop="serviceType" sortable min-width="176" label="业务"></el-table-column>
              <el-table-column prop="userType" sortable min-width="176" label="参与用户"></el-table-column>
              <el-table-column prop="startTime" sortable min-width="176" label="开始时间"></el-table-column>
              <el-table-column prop="endTime" sortable min-width="176" label="结束时间"></el-table-column>
              <el-table-column prop="activityStatus" min-width="176" sortable label="活动状态"></el-table-column>
              <el-table-column min-width="176" prop="isEnable" sortable label="启用状态">
                <template slot-scope="scope">{{ scope.row.isEnable === '1' ? '启用': '停用' }}</template>
              </el-table-column>
              <el-table-column min-width="176" prop="goodName" sortable label="商品名称"></el-table-column>
              <el-table-column min-width="176" prop="marketPrice" sortable label="商品原价（元）"></el-table-column>
              <el-table-column min-width="176" prop="price" sortable label="抢购价（元）"></el-table-column>
              <el-table-column min-width="176" prop="goodNumber" sortable label="商品数量"></el-table-column>
              <el-table-column min-width="176" prop="salesNumber" sortable label="销售量"></el-table-column>
              <el-table-column min-width="176" prop="stockNumber" sortable label="剩余数量"></el-table-column>
              <el-table-column min-width="176" prop="clickCount" sortable label="点击量"></el-table-column>
              <el-table-column min-width="176" prop="totalSharedCount" sortable label="模板分享量"></el-table-column>
              <el-table-column min-width="176" prop="wechatSharedCount" sortable label="微信端分享量"></el-table-column>
              <el-table-column min-width="176" prop="passCount" sortable label="开启量"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager" />
      </div>
    </div>
    <div class="commoncss">
      <el-dialog
        :close-on-click-modal="false"
        v-el-drag-dialog
        :visible.sync="dialogFormVisible"
        @close="closeClick"
        :title="btntitle"
        width="750px"
      >
        <el-form ref="formData" :model="formDataDialog" label-position="right" label-width="130px">
          <el-row>
            <el-col :span="18">
              <el-form-item
                label="业务类型："
                prop="serviceType"
                :rules="{required: true, message: '请选择业务类型', trigger: 'change'}"
              >
                <el-radio-group
                  v-model="formDataDialog.serviceType"
                  @change="changeServiceTypeDialog"
                  :disabled="btntitle === '修改'"
                >
                  <el-radio
                    :label="item.code"
                    v-for="(item,index) in serviceClassificationList"
                    :key="index"
                  >{{ item.name }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item
                label="参与用户："
                prop="userType"
                :rules="{required: true, message: '请选择投放角色', trigger: 'change'}"
              >
                <el-radio-group v-model="formDataDialog.userType" :disabled="btntitle === '修改'">
                  <el-radio
                    :label="item.code"
                    v-for="(item,index) in userList"
                    :key="index"
                  >{{ item.name }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item
                label="活动名称："
                prop="activityName"
                :rules="{required: true, message: '请输入活动名称', trigger: 'change'}"
              >
                <el-input
                  v-model="formDataDialog.activityName"
                  placeholder="请输入活动名称"
                  maxlength="30"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item
                label="活动日期："
                prop="activityDay"
                :rules="{required: true, message: '请输入活动名称', trigger: 'change'}"
              >
                <el-date-picker
                  v-model="formDataDialog.activityDay"
                  @change="changeActivityDay"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item
                label="商品名称："
                prop="goodName"
                :rules="{required: true, message: '请输入商品名称', trigger: 'change'}"
              >
                <el-input v-model="formDataDialog.goodName" placeholder="请输入商品名称" maxlength="30"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item
                label="商品数量："
                prop="goodNumber"
                :rules="{required: true, validator: (rule, value, callback)=>{
                  return checkNember(rule, value, callback,'请输入商品数量','请输入0或正整数')
                }, trigger: 'change'}"
              >
                <el-input
                  v-model="formDataDialog.goodNumber"
                  placeholder="请输入商品数量"
                  :disabled="btntitle === '修改'"
                  maxlength="6"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item
                label="商品原价："
                prop="marketPrice"
                :rules="{required: true, validator: (rule, value, callback)=>{
                  return checkPrice(rule, value, callback,'请输入商品原价','支持输入两位小数')
                }, trigger: 'change'}"
              >
                <el-input v-model="formDataDialog.marketPrice" placeholder="请输入商品原价" maxlength="7"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item
                label="抢购价："
                prop="price"
                :rules="{required: true, validator: (rule, value, callback)=>{
                  return checkPrice(rule, value, callback,'请输入抢购价','支持输入两位小数')
                }, trigger: 'change'}"
              >
                <el-input
                  v-model="formDataDialog.price"
                  placeholder="请输入抢购价"
                  :disabled="btntitle === '修改'"
                  maxlength="7"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label>
                <el-row type="flex">
                  <el-checkbox
                    v-model="formDataDialog.isShare"
                    true-label="1"
                    false-label="0"
                    :disabled="btntitle === '修改'"
                    @change="changeShare"
                  >需分享</el-checkbox>
                  <el-form-item
                    label
                    prop="shareCount"
                    :rules="formDataDialog.isShare === '1' ?{required: true, validator: (rule, value, callback)=>{
                  return checkNember1(rule, value, callback,'请输入分享次数','请输入正整数')
                }, trigger: 'change'}:{}"
                  >
                    <el-input
                      style="width: 125px"
                      :disabled="formDataDialog.isShare === '0' || btntitle === '修改'"
                      v-model="formDataDialog.shareCount"
                      placeholder="请输入分享次数"
                      maxlength="3"
                    ></el-input>次获得抢购资格
                  </el-form-item>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item
                label="分享标题："
                prop="shareTitle"
                :rules="{required: true, message: '请输入分享标题', trigger: 'change'}"
              >
                <el-input v-model="formDataDialog.shareTitle" placeholder="请输入分享标题" maxlength="30"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="分享内容："
                prop="shareContent"
                :rules="{required: true, message: '请输入分享内容', trigger: 'change'}"
              >
                <el-input
                  v-model="formDataDialog.shareContent"
                  placeholder="请输入分享内容"
                  maxlength="100"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="分享小图："
                prop="shareSmallImage"
                :rules="{required: true, message: '请上传分享图片', trigger: 'blur'}"
              >
                <upload
                  class="licensePicture"
                  tip="（必须为jpg/png并且小于5M）"
                  v-model="formDataDialog.shareSmallImage"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="分享模板图："
                prop="shareTemplateImage"
                :rules="{required: true, message: '请上传分享图片', trigger: 'blur'}"
              >
                <upload
                  class="licensePicture"
                  tip="（必须为jpg/png并且小于5M）"
                  v-model="formDataDialog.shareTemplateImage"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="活动说明："
                class="textArea"
                prop="intro"
                :rules="{required: true, message: '请输入活动说明', trigger: 'blur'}"
              >
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入活动说明"
                  maxlength="200"
                  v-model="formDataDialog.intro"
                  clearable
                ></el-input>
                <p class="countNum">
                  <span class>{{formDataDialog.intro.length}}</span>
                  <span>/ 200</span>
                </p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label>
                <el-checkbox
                  v-model="formDataDialog.isShowAd"
                  true-label="1"
                  false-label="0"
                >展示广告在【我的】页面</el-checkbox>
                <upload
                  class="licensePicture"
                  tip="（必须为jpg/png并且小于5M）"
                  v-model="formDataDialog.adImage"
                  :disabled="formDataDialog.isShowAd === '0' ? true: false"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" plain icon="el-icon-success" @click="submit()">确 定</el-button>
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
        title="活动链接"
        width="850px"
      >
        <el-row type="flex" justify="center">
          <div>
            活动URL:{{url}}
            <el-button
              type="primary"
              class="margin_l_10"
              size="mini"
              plain
              v-clipboard:copy="url"
              v-clipboard:success="clipboardSuccess"
            >复制</el-button>
          </div>
        </el-row>
        <el-row type="flex" justify="center">
          <div class="margin_10">
            <vue-qr :logoSrc="imagePath" :text="url" :size="200" :margin="0"></vue-qr>
          </div>
        </el-row>
        <el-row type="flex" justify="center">
          <div class="margin_10">使用微信扫一扫</div>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="primary" size="mini" plain @click="dialogFormVisible1 = false">关闭</el-button>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import { DicServiceType } from "@/api/common.js";
import upload from "@/components/Upload/singleImage";
import Pager from "@/components/Pagination/index";
import {
  getListData,
  addData,
  updateData,
  getOneData,
  isEnable,
  getUrl
} from "@/api/marketing/activity/activity";
import vueQr from "vue-qr";
export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      imagePath: require("../../../assets/checkImg/icon2.png"),
      url: "", // 活动链接
      btntitle: "",
      selectedList: [], // 选择
      dataTotal: 0,
      tableData: [],
      serviceClassificationList: [],
      userList1: [
        { code: "AF00102", name: "车主" },
        { code: "AF00101", name: "货主" }
      ],
      userList2: [
        { code: "AF00102", name: "车主" },
        { code: "AF00101", name: "货主" },
        { code: "AF00107", name: "物流公司" }
      ],
      formData: {
        pageNum: 1,
        pageSize: 20,
        serviceType: "", // 业务
        keyword: "", // 关键词
        userType: "", // 参与用户
        startTime: "",
        endTime: "",
        time: ""
      },
      formDataDialog: {
        serviceType: "", // 业务类型
        userType: "", // 参与用户
        activityName: "", // 活动名称
        activityDay: "", // 活动日期
        endTime: "", // 结束时间
        startTime: "", // 开始时间
        goodName: "", // 商品名称
        goodNumber: "", // 商品数量
        marketPrice: "", // 商品原价
        price: "", // 抢购价
        isShare: "0", // 需分享
        shareCount: "", // 分享次数
        shareTitle: "", // 分享标题
        shareContent: "", // 分享内容
        shareSmallImage: "", // 分享小图
        shareTemplateImage: "", // 分享模板图
        intro: "", // 课程说明
        isShowAd: "0", // 展示广告
        adImage: "" // 广告图片
      }
    };
  },
  computed: {
    userList: function() {
      if (this.formDataDialog.serviceType === "AF01701") {
        return this.userList1;
      } else {
        return this.userList2;
      }
    },
    userList0: function() {
      if (this.formData.serviceType === "AF01701") {
        return this.userList1;
      } else {
        return this.userList2;
      }
    }
  },
  components: { Pager, upload, vueQr },
  watch: {},
  created() {
    DicServiceType().then(res => {
      if (res.status === 200) {
        this.serviceClassificationList = res.data;
      }
    });
    this.getList();
  },
  mounted() {},

  methods: {
    changeServiceType(e) {
      if (e === "AF01701" && this.formData.userType === "AF00107") {
        this.formData.userType = "";
      }
    },
    changeServiceTypeDialog(e) {
      if (e === "AF01701" && this.formDataDialog.userType === "AF00107") {
        this.formDataDialog.userType = "";
      }
    },
    searchClick() {
      this.resetPage();
      this.getList();
    },
    clearClick() {
      this.formData = this.$options.data().formData;
      this.resetPage();
      this.getList();
    },
    getList() {
      this.loading = true;
      getListData(this.formData)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.dataTotal = res.data.total;
            this.loading = false;
          }
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
    handlePageChange(obj) {
      this.formData.pageNum = obj.pageNum;
      this.formData.pageSize = obj.pageSize;
      this.getList();
    },
    handleClick(type) {
      if (type === "add") {
        this.btntitle = "新增";
      }
      if (type === "edit") {
        this.btntitle = "修改";
        if (this.selectedList.length === 0 || this.selectedList.length > 1) {
          this.$message.warning("请选择一条数据");
          return;
        }
        getOneData(this.selectedList[0])
          .then(res => {
            if (res.status === 200) {
              this.formDataDialog = res.data;
              this.$set(this.formDataDialog, "activityDay", [
                res.data.startTime,
                res.data.endTime
              ]);
            }
          })
          .catch(err => {
            this.$message.warning(err.text || err.errorInfo);
          });
      }
      this.dialogFormVisible = true;
    },
    sTClick() {
      let enable = "";
      if (this.selectedList.length === 0 || this.selectedList.length > 1) {
        this.$message.warning("请选择一条数据");
        return;
      }
      this.tableData.forEach(item => {
        if (item.id === this.selectedList[0]) {
          enable = item.isEnable;
        }
      });
      isEnable(this.selectedList[0], enable)
        .then(res => {
          if (res.status === 200) {
            this.$message.success("操作成功");
            this.getList();
          } else {
            this.$message.warning(res.errorInfo || res.text);
          }
        })
        .catch(err => {
          this.$message.warning(err.errorInfo || err.text);
        });
    },
    activityClick() {
      if (this.selectedList.length === 0 || this.selectedList.length > 1) {
        this.$message.warning("请选择一条数据");
        return;
      }
      getUrl(this.selectedList[0])
        .then(res => {
          if (res.status === 200) {
            this.url = res.data;
            this.dialogFormVisible1 = true;
          } else {
            this.$message.warning(res.errorInfo || res.text);
          }
        })
        .catch(err => {
          this.$message.warning(err.errorInfo || err.text);
        });
    },
    handleSelectionChange(val) {
      this.selectedList = val.map(item => {
        return item.id;
      });
    },
    closeClick() {
      this.formDataDialog = {
        serviceType: "", // 业务类型
        userType: "", // 参与用户
        activityName: "", // 活动名称
        activityDay: "", // 活动日期
        endTime: "", // 结束时间
        startTime: "", // 开始时间
        goodName: "", // 商品名称
        goodNumber: "", // 商品数量
        marketPrice: "", // 商品原价
        price: "", // 抢购价
        isShare: "0", // 需分享
        shareCount: "", // 分享次数
        shareTitle: "", // 分享标题
        shareContent: "", // 分享内容
        shareSmallImage: "", // 分享小图
        shareTemplateImage: "", // 分享模板图
        intro: "", // 课程说明
        isShowAd: "0", // 展示广告
        adImage: ""
      };
      this.$refs["formData"].resetFields();
    },
    submit() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          if (this.btntitle === "新增") {
            addData(this.formDataDialog)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("新增成功");
                  this.resetPage();
                  this.getList();
                  this.dialogFormVisible = false;
                } else {
                  this.$message.warning(res.errorInfo || res.text);
                }
              })
              .catch(err => {
                this.$message.warning(err.errorInfo || err.text);
              });
          } else {
            updateData(this.formDataDialog)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("修改成功");
                  this.getList();
                  this.dialogFormVisible = false;
                } else {
                  this.$message.warning(res.errorInfo || res.text);
                }
              })
              .catch(err => {
                this.$message.warning(err.errorInfo || err.text);
              });
          }
        } else {
          return false;
        }
      });
    },
    checkPrice(rule, value, callback, name, name2) {
      const re = /^([1-9]\d*|0)(\.\d{1,2})?$/;
      if (value === "") {
        callback(new Error(name));
      } else {
        if (re.test(value)) {
          callback();
        } else {
          callback(new Error(name2));
        }
      }
    },
    checkNember(rule, value, callback, name, name2) {
      const re = /^(0|\+?[1-9][0-9]*)$/;
      if (value === "") {
        callback(new Error(name));
      } else {
        if (re.test(value)) {
          callback();
        } else {
          callback(new Error(name2));
        }
      }
    },
    checkNember1(rule, value, callback, name, name2) {
      const re = /^[1-9][0-9]*$/g;
      if (value === "") {
        callback(new Error(name));
      } else {
        if (re.test(value)) {
          callback();
        } else {
          callback(new Error(name2));
        }
      }
    },
    checkLength(rule, value, callback, name) {
      if (value === "") {
        callback(new Error(name));
      } else {
        if (value.length < 5 || value.length > 200) {
          callback(new Error(name));
        } else {
          callback();
        }
      }
    },
    changeTime(e) {
      if (e) {
        this.formData.startTime = e[0];
        this.formData.endTime = e[1];
      } else {
        this.formData.startTime = "";
        this.formData.endTime = "";
        this.formData.time = "";
      }
    },
    changeShare(e) {
      if (e === "0") {
        this.formDataDialog.shareCount = " ";
        this.$nextTick(() => {
          this.formDataDialog.shareCount = "";
        });
      } else {
        this.formDataDialog.shareCount = "";
      }
    },
    changeActivityDay(e) {
      if (e) {
        this.formDataDialog.startTime = e[0];
        this.formDataDialog.endTime = e[1];
      } else {
        this.formDataDialog.startTime = "";
        this.formDataDialog.endTime = "";
        this.formDataDialog.activityDay = "";
      }
    },
    clipboardSuccess() {
      this.$message.success("复制成功");
    },
    resetPage() {
      this.formData.pageNum = 1;
      this.$refs.pager.inputval = 1;
      this.$refs.pager.pageNum = 1;
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.divide {
  border-bottom: 1px dashed #999;
  margin-bottom: 10px;
}
.margin_10 {
  margin: 10px;
}
.margin_l_10 {
  margin-left: 10px;
}
</style>
<style>
.activity-picker .el-button + .el-button {
  margin-left: 10px;
}
</style>

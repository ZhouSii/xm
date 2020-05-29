<template>
  <!-- 指派司机 -->
  <div class="appointDriverStyle commoncss">
    <div id="appointDriverMap"></div>
    <div id="searchList">
      <h3 class="searchList_header">
        指派司机
        <span class="fr searchList_span">
          <i
            class="el-icon-arrow-up"
            :class="DropdownFlag ? 'Dropup' : 'Dropdown'"
            @click="Dropdown"
          ></i>
        </span>
      </h3>
      <div
        class="searchForm"
        :class="
          DropdownFlag ? 'searchList_content' : 'searchList_content_ative'
        "
      >
        <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
          <el-form-item>
            <el-select placeholder="全部" v-model="distance" clearable>
              <el-option
                v-for="item in distanceList"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              placeholder="全部"
              v-model="formdata.carTypeCode"
              clearable
            >
              <el-option
                v-for="item in cartypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              @click="isOnLine(0)"
              v-if="formdata.isVipCar == '1'"
              >特权车</el-button
            >
            <el-button size="mini" @click="isOnLine(1)" v-else
              >特权车</el-button
            >
          </el-form-item>
          <el-form-item class="searchForm_input">
            <el-input
              placeholder="车牌号/车主姓名/手机号"
              v-model="formdata.keyword"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="searchForm_search">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              @click="searchMap"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
        <div class="info_search">
          <el-table
            :data="searchFormTotal"
            style="height:100%"
            border
            @row-click="clickDetails"
          >
            <el-table-column
              label="姓名"
              prop="driverName"
              show-overflow-tooltip
              width="90"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.userObj">{{
                  scope.row.userObj.driverName
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="手机"
              prop="driverMobile"
              show-overflow-tooltip
              width="110"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.userObj">{{
                  scope.row.userObj.driverMobile
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="车牌"
              prop="carNumber"
              show-overflow-tooltip
              width="100"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.userObj">{{
                  scope.row.userObj.carNumber
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="距离(M)"
              prop="carType"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.distance }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChangsearchForm"
          layout="total,jumper,prev, pager, next"
          :pager-count="5"
          :total="searchFormTotalCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
let map = {};
var infoWindow;
var vue_this;
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { initMap, state } from "@/views/carmonitor/common.js";
import fetch from "@/utils/fetch.js";
import { parseTime, loadJs, loadAmap } from "@/utils/index.js";
import {
  orderDetailsList,
  nearbyDriver,
  orderNumAndRank,
  appointDriver
} from "@/api/order/ordermange.js";
export default {
  name: "appointDriverMap",
  props: {},
  components: {
    Pager
  },
  data() {
    return {
      orderSerial: this.$route.query.orderSerial,
      btnsize: "mini",
      DropdownFlag: true,
      btnShow: false,
      defaultImg: "/static/test.jpg", //默认第一张图片的url
      formLabelWidth: "135px",
      searchFormTotalCount: null, //车主分页总数
      searchFormTotal: [], //车主总数
      distanceList: [], //半径
      cartypeList: [], //车辆类型
      distance: 6000,
      formdata: {
        longitude: "",
        latitude: "",
        carTypeCode: "",
        distance: 0,
        keyword: "",
        isVipCar: "0",
        currentPage: 1,
        pageSize: 1000
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {
    vue_this = this;
    new Promise(resolve => {
      orderDetailsList(vue_this.orderSerial)
        .then(res => {
          let longlatiPoint = res.data.aflcOrderAddresses[0].coordinate.split(
            ","
          );
          vue_this.formdata.longitude = longlatiPoint[0];
          vue_this.formdata.latitude = longlatiPoint[1];
          resolve();
        })
        .then(res => {
          vue_this.getMoreInformation();
          vue_this.firstblood();
        });
    });
  },
  methods: {
    //搜索
    searchMap() {
      this.firstblood();
    },
    //初始化选择项数据
    init() {
      loadAmap().then(() => {
        map = new AMap.Map("appointDriverMap", {
          resizeEnable: true,
          center: [this.formdata.longitude, this.formdata.latitude],
          zoom: 12
        });
        this.circleDraw();
        this.searchFormTotal.forEach((item, i) => {
          if (item.longitude) {
            let marker = new AMap.Marker({
              map: map,
              icon: new AMap.Icon({
                image:
                  "http://aflc.oss-cn-shenzhen.aliyuncs.com/aflc_dev/20190624/IMG_WEB_2019_6_24_101233_83485.png",
                size: new AMap.Size(30, 30), //图标大小
                imageSize: new AMap.Size(30, 30)
              }),
              position: [item.longitude, item.latitude],
              offset: new AMap.Pixel(-15, -30)
            });
            marker.setMap(map);
            marker.on("click", function(e) {
              let CarClickObject = {};
              let defaultImg = "/static/test.jpg";
              let orderSerial = vue_this.orderSerial;
              let longitude = vue_this.formdata.longitude;
              let latitude = vue_this.formdata.latitude;
              let NewcarType = vue_this.cartypeList.filter(e => {
                return e.code == item.userObj.carType;
              })[0].name;
              orderNumAndRank(1, 10, {
                timeQueryType: 4,
                username: item.userObj.driverMobile
              }).then(res => {
                CarClickObject = res.data.list[0];
                item.userObj.updateTime = parseTime(
                  item.userObj.updateTime,
                  "{y}-{m}-{d} {h}:{i}:{s}"
                );
                marker.content = `
                <div class="amap_info_header"><span class="CarNumber">${
                  item.userObj.carNumber ? item.userObj.carNumber : ""
                }</span><span class="CarType">${NewcarType}</span><span class="Isvip">${
                  item.userObj.isVipCar ? "是特权车" : "不是特权车"
                }</span></div>
                <div class="amap_info_content">
                <div class="amap_info_left">
                <img src="${
                  CarClickObject.memberIcon
                    ? CarClickObject.memberIcon
                    : defaultImg
                }" class="amap_info_img">
                <p>${
                  CarClickObject.memberGrade ? CarClickObject.memberGrade : ""
                }</p>
                </div>
                <div class="amap_info_right">
                <div class="amap_infoLog">
                <span class="amap_carName">${
                  CarClickObject.realName ? CarClickObject.realName : ""
                }</span><span class="amap_mobile">${
                  CarClickObject.driverMobile ? CarClickObject.driverMobile : ""
                }</span><span class="collect">收藏</span>
                </div>
                <div class="amap_infoLog">
                <span>最新定位时间：</span><span class="breakWord">${
                  item.userObj.updateTime ? item.userObj.updateTime : ""
                }</span>
                </div>
                <div class="amap_infoLog">
                <span>最新定位地址：</span><span class="breakWord">${
                  item.address ? item.address : ""
                }</span>
                </div>
                </div>
                </div>
                <div class="amap_info_footer">
                <div class="amap_footerLog">
                <span>距离提货地(M)：</span><span>${
                  item.distance ? item.distance : "0"
                }</span>
                </div>
                <div class="amap_footerLog">
                <span>本月累计交易次数：</span><span>${
                  CarClickObject.transactionNum
                    ? CarClickObject.transactionNum
                    : "0"
                }</span>
                </div>
                <div class="amap_footerLog">
                <span>本月交易成功订单数：</span><span>${
                  CarClickObject.orderFinishCount
                    ? CarClickObject.orderFinishCount
                    : "0"
                }</span>
                </div>
                <div class="amap_footerBtn">
                <button type="button" class="amap_Btn" data-Id = ${
                  CarClickObject.driverId
                } data-distance = ${
                  item.distance
                } data-orderSerial = ${orderSerial} data-longitude = ${longitude} data-latitude = ${latitude}>确认指派</button>
                </div>
                </div>
                `;
                infoWindow = new AMap.InfoWindow({
                  offset: new AMap.Pixel(0, -30)
                });
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
              });
            });
          }
        });
      });
    },
    //是否特权车
    isOnLine(i) {
      this.formdata.isVipCar = i;
    },
    // 列表刷新页面
    firstblood() {
      this.formdata.distance = this.distance / 1000;
      new Promise(function(resolve) {
        nearbyDriver(vue_this.formdata).then(res => {
          if (res.data.list) {
            vue_this.searchFormTotalCount = res.data.totalCount;
            vue_this.searchFormTotal = res.data.list;
            if (vue_this.searchFormTotal.length > 0) {
              vue_this.searchFormTotal.forEach(item => {
                item.updateTime = parseTime(
                  item.updateTime,
                  "{y}-{m}-{d} {h}:{i}:{s}"
                );
                item.distance = Math.round(item.distance * 1000);
              });
            }
          }
          resolve();
          setTimeout(() => vue_this.init(), 10);
        });
      }).then(function() {
        console.log("help");
      });
    },
    //车主分页
    handleCurrentChangsearchForm(i) {
      this.formdata.currentPage = i;
      this.firstblood();
    },
    Dropdown() {
      this.DropdownFlag = !this.DropdownFlag;
    },
    // 列表点击获得车主信息
    clickDetails(i) {
      let CarClickObject = {};
      let defaultImg = "/static/test.jpg";
      let orderSerial = this.orderSerial;
      let longitude = this.formdata.longitude;
      let latitude = this.formdata.latitude;
      let NewcarType = vue_this.cartypeList.filter(e => {
        return e.code == i.userObj.carType;
      })[0].name;
      orderNumAndRank(1, 10, {
        timeQueryType: 4,
        username: i.userObj.driverMobile
      }).then(res => {
        CarClickObject = res.data.list[0];
        i.userObj.updateTime = parseTime(
          i.userObj.updateTime,
          "{y}-{m}-{d} {h}:{i}:{s}"
        );
        let info = `
                <div class="amap_info_header"><span class="CarNumber">${
                  i.userObj.carNumber ? i.userObj.carNumber : ""
                }</span><span class="CarType">${NewcarType}</span><span class="Isvip">${
          i.userObj.isVipCar ? "是特权车" : "不是特权车"
        }</span></div>
                <div class="amap_info_content">
                <div class="amap_info_left">
                <img src="${
                  CarClickObject.memberIcon
                    ? CarClickObject.memberIcon
                    : defaultImg
                }" class="amap_info_img">
                <p>${
                  CarClickObject.memberGrade ? CarClickObject.memberGrade : ""
                }</p>
                </div>
                <div class="amap_info_right">
                <div class="amap_infoLog">
                <span class="amap_carName">${
                  CarClickObject.realName ? CarClickObject.realName : ""
                }</span><span class="amap_mobile">${
          CarClickObject.driverMobile ? CarClickObject.driverMobile : ""
        }</span><span class="collect">收藏</span>
                </div>
                <div class="amap_infoLog">
                <span>最新定位时间：</span><span class="breakWord">${
                  i.userObj.updateTime ? i.userObj.updateTime : ""
                }</span>
                </div>
                <div class="amap_infoLog">
                <span>最新定位地址：</span><span class="breakWord">${
                  i.address ? i.address : ""
                }</span>
                </div>
                </div>
                </div>
                <div class="amap_info_footer">
                <div class="amap_footerLog">
                <span>距离提货地(M)：</span><span>${
                  i.distance ? i.distance : "0"
                }</span>
                </div>
                <div class="amap_footerLog">
                <span>本月累计交易次数：</span><span>${
                  CarClickObject.transactionNum
                    ? CarClickObject.transactionNum
                    : "0"
                }</span>
                </div>
                <div class="amap_footerLog">
                <span>本月交易成功订单数：</span><span>${
                  CarClickObject.orderFinishCount
                    ? CarClickObject.orderFinishCount
                    : "0"
                }</span>
                </div>
                <div class="amap_footerBtn">
                <button type="button" class="amap_Btn" data-Id = ${
                  CarClickObject.driverId
                } data-distance = ${
          i.distance
        } data-orderSerial = ${orderSerial} data-longitude = ${longitude} data-latitude = ${latitude}>确认指派</button>
                </div>
                </div>
                `;
        infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
        infoWindow.setContent(info);
        infoWindow.open(map, [i.longitude, i.latitude]);
      });
    },
    // 获取信息
    getMoreInformation() {
      this.$store.dispatch("GetInfoDic", "AF00530").then(res => {
        this.distanceList = res;
      });
      this.$store.dispatch("GetInfoDic", "AF018").then(res => {
        this.cartypeList = res;
      });
    //   getDictionary("AF00530").then(res => {
    //     this.distanceList = res.data;
    //   });
    //   getDictionary("AF018").then(res => {
    //     this.cartypeList = res.data;
    //   });
    },
    // 中心点原型范围
    circleDraw() {
      map.clearMap(circle);
      let marker = new AMap.Marker({
        map: map,
        icon: new AMap.Icon({
          image:
            "http://aflc.oss-cn-shenzhen.aliyuncs.com/aflc_dev/20190620/IMG_WEB_2019_6_20_181828_44315.png",
          size: new AMap.Size(30, 30), //图标大小
          imageSize: new AMap.Size(30, 30)
        }),
        position: [this.formdata.longitude, this.formdata.latitude],
        offset: new AMap.Pixel(-15, -30),
        zIndex: 101
      });
      // marker.setAnimation('AMAP_ANIMATION_BOUNCE');
      var circle = new AMap.Circle({
        center: [this.formdata.longitude, this.formdata.latitude], //中心坐标
        radius: this.distance, //半径
        borderWeight: 3,
        strokeColor: "#1791fc",
        strokeOpacity: 1,
        strokeWeight: 2,
        strokeOpacity: 0.8,
        fillOpacity: 0.1,
        strokeStyle: "dashed",
        strokeDasharray: [3, 3],
        fillColor: "#FF33FF",
        zIndex: 50
      });
      circle.setMap(map);
    }
  }
};

document.addEventListener("click", function(event) {
  let target = event.target;
  // 指派司机
  if (target.className == "amap_Btn") {
    let carForm = {
      coordinate:
        target.dataset.latitude.substring(
          0,
          target.dataset.latitude.indexOf(".") + 7
        ) +
        "," +
        target.dataset.longitude.substring(
          0,
          target.dataset.longitude.indexOf(".") + 7
        ),
      distance: target.dataset.distance,
      driverId: target.dataset.id,
      orderSerial: target.dataset.orderserial,
      dispatchWay: "AF0051502"
    };
    appointDriver(carForm)
      .then(res => {
        vue_this.$message.success("指派成功");
      })
      .catch(err => {
        vue_this.$message.error(err.text);
      });
  }
});
</script>

<style rel="stylesheet/scss" lang="scss">
.appointDriverStyle {
  .amap-logo {
    display: none !important;
  }
  .amap-copyright {
    display: none !important;
  }
  height: 100%;
  position: relative;
  #appointDriverMap {
    width: 100%;
    height: 100%;
  }
  #searchList {
    width: 382px;
    background: #fff;
    position: absolute;
    top: 10px;
    left: 10px;
    .searchList_header {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: #0a8cff;
      text-align: center;
      font-size: 16px;
      color: #fff;
      .searchList_span {
        margin-right: 5px;
        cursor: pointer;
      }
      .Dropup {
        transition: all 0.3s;
        transform: rotate(0deg);
      }
      .Dropdown {
        transition: all 0.3s;
        transform: rotate(180deg);
      }
    }
    .searchForm {
      transition: all 0.3s;
      overflow: hidden;
    }
    .searchList_content {
      height: 535px;
    }
    .searchList_content_ative {
      height: 0px;
    }
    .classify_searchinfo .el-form-item {
      width: 100px;
      margin: 10px 2px;
      .el-form-item__content {
        width: 100%;
      }
      .el-input__icon {
        line-height: 30px;
      }
    }
    .searchForm_input {
      width: 285px !important;
      margin-top: 0px !important;
    }
    .searchForm_search {
      width: 73px !important;
      margin-top: 0px !important;
    }
    .info_search {
      height: 340px;
      overflow: auto;
      .el-table--fit {
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
    .el-pagination {
      margin-top: 10px;
      text-align: center;
      white-space: normal;
      line-height: 40px;
      .el-pagination__total {
        margin-left: 100px;
        margin-right: 0px;
      }
      .el-pagination__jump {
        margin-left: 10px;
        margin-right: 90px;
      }
    }
  }
  .amap-info-close {
    top: 10px !important;
    font-size: 18px;
  }
  .amap-info-content {
    padding: 0px;
    width: 400px;
    .amap_info_header {
      background-color: rgb(10, 140, 255);
      text-align: center;
      padding: 7px 0px;
      color: #fff;
      span {
        display: inline-block;
        padding: 0px 10px;
      }
    }
    .amap_info_content {
      padding: 10px;
      overflow: hidden;
      margin: 10px 0px;
      border-bottom: 1px dashed rgb(238, 238, 238);
      .amap_info_left {
        float: left;
        width: 100px;
        text-align: center;
        .amap_info_img {
          width: 50px;
          height: 50px;
        }
      }
      .amap_info_right {
        float: left;
        width: 270px;
        .amap_carName {
          color: #3e9ff1;
        }
        .amap_mobile {
          padding: 0px 20px;
        }
        .collect {
          padding: 0px 20px;
          background: #3e9ff1;
          color: #fff;
          border-radius: 3px;
          display: none;
        }
        .amap_infoLog {
          margin-bottom: 5px;
          display: flex;
          .breakWord {
            width: 150px;
            word-wrap: break-word;
          }
        }
      }
    }
    .amap_info_footer {
      .amap_footerLog {
        span {
          display: inline-block;
          text-align: right;
          padding: 5px 0px;
          &:nth-of-type(1) {
            margin-left: 42px;
            width: 180px;
          }
        }
      }
    }
    .amap_footerBtn {
      text-align: center;
      padding: 20px;
      button {
        background-color: rgb(10, 140, 255);
        border: 1px solid transparent; //自定义边框
        outline: none;
        font-size: 14px;
        color: #fff;
        display: inline-block;
        border-radius: 3px;
        padding: 5px 7px;
        cursor: pointer;
      }
    }
  }
}
</style>


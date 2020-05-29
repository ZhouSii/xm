<template>
  <div class="detailsInfo detailsArrange" v-loading="loading">
    <!-- 基本信息 -->
    <div class="detailsInfo-collapse collapseInfo">
      <h2>基本信息</h2>
      <div class="essentialInformation">
        <el-row class="basicInfo" :span="24">
          <el-col :span="5">商圈名称：</el-col>
          <el-col :span="7">{{ formAll.tradeName }}</el-col>
          <el-col :span="5">负责人：</el-col>
          <el-col :span="7">{{ formAll.tradeOwnerName }}</el-col>
        </el-row>
        <el-row class="basicInfo" :span="24">
          <el-col :span="5">联系号码：</el-col>
          <el-col :span="7">{{ formAll.tradeOwnerPhone }}</el-col>
          <el-col :span="5">商圈类型：</el-col>
          <el-col :span="7">{{ formAll.tradeTypeName }}</el-col>
        </el-row>
        <el-row class="basicInfo" :span="24">
          <el-col :span="5">所在地：</el-col>
          <el-col :span="7">{{ formAll.areaName }}</el-col>
          <el-col :span="5">上级商圈：</el-col>
          <el-col :span="7">{{ formAll.parentName }}</el-col>
        </el-row>
        <el-row class="basicInfo" :span="24">
          <el-col :span="5">商圈同城潜力等级下单量最小值(单/天)：</el-col>
          <el-col :span="7">{{ formAll.predictOrderMin }}</el-col>
          <el-col :span="5">商圈同城潜力等级下单量最大值(单/天)：</el-col>
          <el-col :span="7">{{ formAll.predictOrderMax }}</el-col>
        </el-row>
        <el-row class="basicInfo" :span="24">
          <el-col :span="5">行业：</el-col>
          <el-col :span="7">{{ formAll.tradeIndustryName }}</el-col>
          <el-col :span="5">所属业务组</el-col>
          <el-col :span="7">{{ formAll.businessGroupName }}</el-col>
        </el-row>
        <el-row class="basicInfo" :span="24">
          <el-col :span="5">同城潜力等级：</el-col>
          <el-col :span="7">{{ formAll.potentialGradeName }}</el-col>
        </el-row>
        <el-row class="basicInfo" :span="24">
          <el-col :span="5">商圈划分方式：</el-col>
          <el-col :span="7">{{
            formAll.tradeWay == 1 ? "自定义" : "圆心"
          }}</el-col>
          <el-col :span="5">商圈中心地址：</el-col>
          <el-tooltip
            class="item"
            effect="dark"
            :content="formAll.centerAddress"
            placement="top-start"
            :disabled="!formAll.centerAddress"
          >
            <el-col :span="7">
              {{ formAll.centerAddress }}
            </el-col>
          </el-tooltip>
        </el-row>
        <el-row class="basicInfo" :span="24">
          <el-col :span="5">围栏半径范围（米）：</el-col>
          <el-col :span="7">{{ formAll.centerPointRadius }}</el-col>
          <el-col :span="5">打卡半径范围：</el-col>
          <el-col :span="7">{{ formAll.clockRadius }}</el-col>
        </el-row>
      </div>
      <!-- 商圈地图 -->
      <div class="detailsInfo-collapse collapseInfo">
        <h2>商圈地图</h2>
        <div class="essentialInformation">
          <div id="shoppingManagemapDetail"></div>
        </div>
      </div>

      <!-- 商圈照片 -->
      <div class="detailsInfo-collapse collapseInfo">
        <h2>商圈照片</h2>
        <div class="essentialInformation_img" v-viewer>
          <el-row class="basicInfo_img" :gutter="20">
            <el-col :span="12">
              <h6>商圈地标1：</h6>
              <el-tooltip
                class="item"
                effect="dark"
                content="双击图片查看原图"
                placement="top"
              >
                <img
                  :src="
                    formAll.landmark1Url ? formAll.landmark1Url : defaultImg
                  "
                  alt=""
                />
              </el-tooltip>
            </el-col>
            <el-col :span="12">
              <h6>商圈地标2：</h6>
              <el-tooltip
                class="item"
                effect="dark"
                content="双击图片查看原图"
                placement="top"
              >
                <img
                  :src="
                    formAll.landmark2Url ? formAll.landmark2Url : defaultImg
                  "
                  alt=""
                />
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var map = {};
var polygon;
import { loadJs,loadAmap } from "@/utils/";
import { initMap } from "@/views/carmonitor/common.js";
import {
  data_get_aflcTradeAreaDetail,
  getAllTradeArea
} from "@/api/users/district/shoppingManage.js";
export default {
  name: "DetailData",
  components: {},
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      formAll: {},
      defaultImg: "/static/test.jpg", //默认第一张图片的url
      centerPoint: [],
    //   allTradeAreaList: []
    };
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          var _this = this;
        //   this.init();
          new Promise(function(resolve) {
            data_get_aflcTradeAreaDetail(_this.$route.query.Id)
              .then(res => {
                  loadAmap().then(()=>{
                    _this.loadMap();
                    _this.formAll = res.data;
                    _this.centerPoint = _this.formAll.centerPoint.split(",");
                    _this.setCity();
                    console.log('_this.formAll.tradeWay',_this.formAll.tradeWay)
                    if (_this.formAll.tradeWay === "0") {
                    _this.geocoder_CallBack(_this.centerPoint, _this);
                    } else {
                    _this.polygonDraw();
                    }
                  })
              })
              .catch(err => {
                _this.$message.error("获取数据失败");
              });
            resolve();
          }).then(function() {
            console.log("help");
          });
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
    //   getAllTradeArea()
    //     .then(res => {
    //       this.allTradeAreaList = res.data;
    //     })
    //     .catch(err => {
    //       this.$message.warning(err.errorInfo || err.text);
    //     });
    },
    loadMap: function() {
      map = new AMap.Map("shoppingManagemapDetail", {
        resizeEnable: true,
        zoom: 12
      });
    },
    geocoder_CallBack(pos, _this) {
      this.circleDraw(pos, _this);
      this.circleDraw2(pos, _this);
      this.marker = new AMap.Marker({
        map: map,
        position: pos // 基点位置
      });
    },
    // 中心点原型范围
    circleDraw(pos, _this) {
      map.clearMap(circle);
      var circle = new AMap.Circle({
        center: pos,
        radius: _this.formAll.centerPointRadius, //半径
        borderWeight: 3,
        strokeColor: "#FF33FF",
        strokeOpacity: 1,
        strokeWeight: 2,
        strokeOpacity: 0.8,
        fillOpacity: 0.1,
        strokeStyle: "dashed",
        strokeDasharray: [3, 3],
        fillColor: "#1791fc",
        zIndex: 50
      });
      circle.setMap(map);
    },
    circleDraw2(pos, _this) {
      var circle = new AMap.Circle({
        center: pos,
        radius: this.formAll.clockRadius, //半径
        borderWeight: 3,
        strokeColor: "#0588c3",
        strokeOpacity: 1,
        strokeWeight: 2,
        strokeOpacity: 0.8,
        fillOpacity: 0.1,
        strokeStyle: "dashed",
        strokeDasharray: [3, 3],
        fillColor: "#FF0000",
        zIndex: 50
      });
      circle.setMap(map);
    },
    // 多边形
    polygonDraw() {
      var _this = this;
      if (_this.formAll.centerPoint) {
        var polygonArray = JSON.parse(_this.formAll.centerPoint);
        polygon = new AMap.Polygon({
          path: polygonArray,
          isOutline: true,
          strokeOpacity: 1,
          lineJoin: "round",
          strokeWeight: 3,
          strokeStyle: "solid",
          strokeColor: "#3366FF",
          strokeDasharray: [10, 5],
          fillOpacity: 0.2,
          fillColor: "#1791fc"
        });
        polygon.setMap(map);
      }
    },
    // 定位城市
    setCity: function() {
      var _this = this;
      let getLocationMap = [];
      var geocoder = new AMap.Geocoder({});
      geocoder.getLocation(_this.formAll.city + _this.formAll.area, function(
        status,
        result
      ) {
        if (status === "complete" && result.info === "OK") {
          map.setCenter([
            result.geocodes[0].location.lng,
            result.geocodes[0].location.lat
          ]);
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.detailsInfo {
  .collapseInfo {
    .essentialInformation {
      .basicInfo_btn {
        border-top: 0 none;
        .el-col {
          border-top: 1px solid #e6e6e6;
        }
        .btn {
          display: inline-block;
          padding-top: 2px;
          margin-left: 10px;
        }
      }
    }
  }
}
#shoppingManagemapDetail {
  width: 100%;
  height: 500px;
}
</style>

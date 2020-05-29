<template>
  <div class="transaction detailsArrange" v-loading="loading">
    <!--  下单概况 -->
    <!-- <div class="authorityBasic-collapse collapseInfo">
            <h2> 下单概况</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="driverShipperData"
                    border
                    style="width: 100%">
                    <el-table-column label="统计项" class="totalClass">
                        <el-table-column prop="" label="统计项" ></el-table-column>
                        <el-table-column prop="" label="统计项" ></el-table-column>
                    </el-table-column>
                    <el-table-column prop="" label="1日" ></el-table-column>
                    <el-table-column prop="" label="2日" ></el-table-column>
                    <el-table-column prop="" label="3日" ></el-table-column>
                    <el-table-column prop="" label="5日" ></el-table-column>
                    <el-table-column prop="" label="6日" ></el-table-column>
                    <el-table-column prop="" label="7日" ></el-table-column>
                    <el-table-column prop="" label="8日" ></el-table-column>
                    <el-table-column prop="" label="9日" ></el-table-column>
                    <el-table-column prop="" label="10日" ></el-table-column>
                    <el-table-column prop="" label="11日" ></el-table-column>
                    <el-table-column prop="" label="12日" ></el-table-column>
                    <el-table-column prop="" label="13日" ></el-table-column>
                    <el-table-column prop="" label="14日" ></el-table-column>
                    <el-table-column prop="" label="15日" ></el-table-column>
                    <el-table-column prop="" label="16日" ></el-table-column>
                    <el-table-column prop="" label="17日" ></el-table-column>
                    <el-table-column prop="" label="18日" ></el-table-column>
                    <el-table-column prop="" label="19日" ></el-table-column>
                    <el-table-column prop="" label="21日" ></el-table-column>
                    <el-table-column prop="" label="22日" ></el-table-column>
                    <el-table-column prop="" label="23日" ></el-table-column>
                    <el-table-column prop="" label="24日" ></el-table-column>
                    <el-table-column prop="" label="25日" ></el-table-column>
                    <el-table-column prop="" label="26日" ></el-table-column>
                    <el-table-column prop="" label="27日" ></el-table-column>
                    <el-table-column prop="" label="28日" ></el-table-column>
                    <el-table-column prop="" label="29日" ></el-table-column>
                    <el-table-column prop="" label="30日" ></el-table-column>
                    <el-table-column prop="" label="31日" ></el-table-column>
                </el-table>
            </div>
        </div> -->
    <!-- 绑定车主 -->
    <!-- <div class="bindCar-collapse collapseInfo">
            <h2>绑定车主</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="driverShipperData"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (driverObj.currentPage - 1) * driverObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    prop="date"
                    label="车主账号"
                    >     
                        <template slot-scope="scope">
                            {{scope.row.driverPhone ? scope.row.driverPhone :''}}{{scope.row.driverName ? '/'+scope.row.driverName :''}}{{scope.row.carTypeName ? '/'+scope.row.carTypeName :''}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="bindingStartDate"
                    label="绑定开始时间"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="bindingEndDate"
                    label="绑定结束时间">
                    </el-table-column>
                    <el-table-column
                    width="150"
                    prop="usingStatus"
                    label="状态">
                        <template slot-scope="scope">
                            {{ scope.row.usingStatus == 1 ? '启用': '禁用' }}
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeDriver"
                    :page-sizes="size"
                    layout="total,prev, pager, next, jumper"
                    :total="driverTotalCount">
                </el-pagination>
            </div>
        </div> -->
    <!-- 历史交易车主 -->
    <div class="bindCar-collapse collapseInfo">
      <h2>历史交易车主</h2>
      <div class="essentialInformation_table">
        <el-table :data="historyTradeDriversList" border style="width: 100%">
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              {{
                (historyTradeDriversObj.currentPage - 1) *
                  historyTradeDriversObj.pageSize +
                  scope.$index +
                  1
              }}
            </template>
          </el-table-column>
          <el-table-column prop="belongCityName" label="认证所在地">
          </el-table-column>
          <el-table-column prop="driverId" label="车主信息">
            <template slot-scope="scope">
              {{ scope.row.driverName ? scope.row.driverName : ""
              }}{{ scope.row.driverMobile ? "-" + scope.row.driverMobile : ""
              }}{{ scope.row.carNumber ? "-" + scope.row.carNumber : "" }}
            </template>
          </el-table-column>
          <el-table-column prop="belongSalesmanName" label="所属业务员">
          </el-table-column>
          <el-table-column prop="orderNum" label="交易单数"> </el-table-column>
          <el-table-column prop="totalAmount" label="交易金额">
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="
            val => {
              return handleClick(val, 'historyTradeDrivers');
            }
          "
          :page-size="10"
          layout="total,prev, pager, next, jumper"
          :total="driverTotalCount"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 收藏司机 -->
    <div class="bindCar-collapse collapseInfo">
      <h2>收藏司机</h2>
      <div class="essentialInformation_table">
        <el-table :data="collectionDriversList" border style="width: 100%">
          <el-table-column label="序号" type="index" width="60">
          </el-table-column>
          <el-table-column prop="driverId" label="司机信息">
            <template slot-scope="scope">
              {{ scope.row.driverName ? scope.row.driverName : ""
              }}{{ scope.row.driverMobile ? "-" + scope.row.driverMobile : ""
              }}{{ scope.row.carNumber ? "-" + scope.row.carNumber : "" }}
            </template>
          </el-table-column>
          <el-table-column prop="carType" label="车型"> </el-table-column>
          <el-table-column prop="belongCityName" label="认证所属区域">
          </el-table-column>
          <el-table-column prop="belongSalesmanName" label="所属业务员">
          </el-table-column>
          <el-table-column prop="belongCustomerService" label="所属客服">
          </el-table-column>
          <el-table-column width="150" prop="orderNum" label="交易单数">
          </el-table-column>
        </el-table>
        <!-- <el-pagination
                    background
                    @current-change="(val)=>{return handleClick(val,'historyTradeDrivers')}"
                    :page-sizes="size"
                    layout="total,prev, pager, next, jumper"
                    :total="driverTotalCount">
                </el-pagination> -->
      </div>
    </div>
    <!-- 黑名单 -->
    <div class="bindCar-collapse collapseInfo">
      <h2>黑名单</h2>
      <div class="essentialInformation_table">
        <el-table :data="driverBlackData" border style="width: 100%">
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              {{
                (driverBlackObj.currentPage - 1) * driverBlackObj.pageSize +
                  scope.$index +
                  1
              }}
            </template>
          </el-table-column>
          <el-table-column prop="driverName" label="车主账号">
            <template slot-scope="scope">
              {{ scope.row.driverName ? scope.row.driverName : ""
              }}{{ scope.row.driverPhone ? "-" + scope.row.driverPhone : ""
              }}{{ scope.row.carNumber ? "-" + scope.row.carNumber : "" }}
            </template>
          </el-table-column>
          <el-table-column prop="carType" label="车型"> </el-table-column>
          <el-table-column prop="createTime" label="添加时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="
            val => {
              return handleClick(val, 'driverBlack');
            }
          "
          :page-size="10"
          layout="total,prev, pager, next, jumper"
          :total="driverBlackCount"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 发货人历史记录 -->
    <div class="bindCar-collapse collapseInfo">
      <h2>发货人历史记录</h2>
      <div class="essentialInformation_table">
        <el-table :data="deliverGoodsData" border style="width: 100%">
          <el-table-column
            label="序号"
            width="60"
            type="index"
          ></el-table-column>
           <el-table-column
            prop="originName"
            label="地点名称"
          ></el-table-column>
          <el-table-column prop="origin" label="地址"></el-table-column>
          <el-table-column
            prop="addressDetail"
            label="详细地址"
          ></el-table-column>
          <el-table-column prop="consigneeMobile" label="联系人信息">
            <template slot-scope="scope">
              {{ scope.row.consignee ? scope.row.consignee + "-" : ""
              }}{{ scope.row.consigneeMobile }}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间">
            <template slot-scope="scope">
              {{ scope.row.updateTime ? parseTimeFunc(scope.row.updateTime) : parseTimeFunc(scope.row.createTime) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 收货人历史记录 -->
    <div class="bindCar-collapse collapseInfo">
      <h2>收货人历史记录</h2>
      <div class="essentialInformation_table">
        <el-table :data="takeDeliveryData" border style="width: 100%">
          <el-table-column
            label="序号"
            width="60"
            type="index"
          ></el-table-column>
         <el-table-column
            prop="originName"
            label="地点名称"
          ></el-table-column>
          <el-table-column prop="origin" label="地址"></el-table-column>
          <el-table-column
            prop="addressDetail"
            label="详细地址"
          ></el-table-column>
          <el-table-column prop="consigneeMobile" label="联系人信息">
            <template slot-scope="scope">
              {{ scope.row.consignee ? scope.row.consignee + "-" : ""
              }}{{ scope.row.consigneeMobile }}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间">
            <template slot-scope="scope">
                {{ scope.row.updateTime ? parseTimeFunc(scope.row.updateTime) : parseTimeFunc(scope.row.createTime) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Pager from "@/components/Pagination/index";
import { closest,parseTime } from "@/utils/index";
import {
  aflcDriverShipperList,
  aflcEquityConfigDto,
  aflcHistoryTradeDrivers,
  aflcCollectionDrivers,
  shipperBlackDriverList,
  shipperOrderSiteInfo
  //   listReceiptOrDelivery
} from "@/api/users/shipperDetails/index.js";

export default {
  name: "transaction",
  components: {
    Pager
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      size: [20, 30, 50],
      serviceType: [
        { name: "小货车", iscur: true },
        { name: "发物流", iscur: false },
        { name: "大货车", iscur: false }
      ],
      parseTimeFunc:null,
      driverObj: {
        //绑定车主列表条件
        currentPage: 1,
        pageSize: 10,
        vo: {
          shipperId: ""
        }
      },
      historyTradeDriversObj: {
        currentPage: 1,
        pageSize: 10,
        vo: {
          shipperId: ""
        }
      },
      driverBlackObj: {
        currentPage: 1,
        pageSize: 10,
        vo: {
          shipperId: ""
        }
      },
      //   deliverGoodsObj: {
      //     addressType: "0", //地址类型(0 发货 1 收货)
      //     shipperId: ""
      //   },
      deliverGoodsObj: {
        currentPage: 1,
        pageSize: 10,
        vo: {
          shipperId: "string",
          type: "0"
        }
      },
      //   takeDeliveryObj: {
      //     addressType: "1", //地址类型(0 发货 1 收货)
      //     shipperId: ""
      //   },
      takeDeliveryObj: {
        currentPage: 1,
        pageSize: 10,
        vo: {
          shipperId: "string",
          type: "1"
        }
      },
      historyTradeDriversList: [], //历史交易车主列表
      collectionDriversList: [], //收藏司机列表
      driverShipperData: [], //绑定车主列表
      driverBlackData: [], //黑名单列表
      deliverGoodsData: [],
      takeDeliveryData: [],
      driverTotalCount: 0, //默认绑定车主列表数量
      driverBlackCount: 0, //黑名单
      equityConfigDto: {}, //营销权益等级说明
      loading: false
    };
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.init();
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  mounted() {
    // console.log(this.$route)
    this.parseTimeFunc = parseTime;
  },
  methods: {
    init() {
      let userId = this.$route.query.userId;
      this.driverObj.vo.shipperId = userId;
      this.historyTradeDriversObj.vo.shipperId = userId;
      this.driverBlackObj.vo.shipperId = userId;
      this.deliverGoodsObj.vo.shipperId = userId;
      this.takeDeliveryObj.vo.shipperId = userId;

      // this.DriverShipperList();
      // this.EquityConfigDto(userId);
      this.historyTradeDriversFuctiosn();
      this.CollectionDriversFunctions(userId);
      this.driverBlackFunctions();
      this.deliverGoodsFunction();
      this.takeDeliveryFunction();
    },
    //绑定车主列表
    DriverShipperList() {
      aflcDriverShipperList(this.driverObj).then(res => {
        this.driverShipperData = res.data.list;
        this.driverTotalCount = res.data.totalCount;
      });
    },
    //绑定车主列表分页
    handleCurrentChangeDriver(val) {
      this.driverObj.currentPage = val;
      this.DriverShipperList();
    },
    //历史交易车主
    historyTradeDriversFuctiosn() {
      aflcHistoryTradeDrivers(this.historyTradeDriversObj).then(res => {
        this.historyTradeDriversList = res.data.list;
      });
    },
    //收藏司机
    CollectionDriversFunctions(userId) {
      aflcCollectionDrivers(userId).then(res => {
        this.collectionDriversList = res.data;
      });
    },
    //黑名单
    driverBlackFunctions(userId) {
      shipperBlackDriverList(this.driverBlackObj).then(res => {
        this.driverBlackData = res.data.list;
        this.driverBlackCount = res.data.totalCount;
      });
    },
    //发货
    deliverGoodsFunction() {
      shipperOrderSiteInfo(this.deliverGoodsObj).then(res => {
        this.deliverGoodsData = res.data.list;
      });
    },
    //收货
    takeDeliveryFunction() {
      shipperOrderSiteInfo(this.takeDeliveryObj).then(res => {
        this.takeDeliveryData = res.data.list;
      });
      //   listReceiptOrDelivery(this.takeDeliveryObj).then(res => {
      //     this.takeDeliveryData = res.data;
      //   });
    },
    handleClick(val, type) {
      // console.log('val,type',val,type)
      switch (type) {
        case "historyTradeDrivers":
          this.historyTradeDriversObj.currentPage = val;
          this.historyTradeDriversFuctiosn();
          break;
        case "driverBlack":
          this.driverBlackObj.currentPage = val;
          this.driverBlackFunctions();
          break;
      }
    },
    EquityConfigDto(userId) {
      aflcEquityConfigDto(userId).then(res => {
        this.equityConfigDto = res.data;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    setCur(index) {
      console.log(index);
      this.serviceType.forEach((el, idx) => {
        console.log(idx);
        idx == index ? (el.iscur = true) : (el.iscur = false);
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.transaction {
  .el-table__header .is-group {
    tr:last-child {
      display: none;
    }
  }
}
</style>

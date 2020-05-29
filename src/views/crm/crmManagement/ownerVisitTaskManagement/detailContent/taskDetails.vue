<template>
  <div class="TCorderInfo clearfix" v-loading="loading">
    <div class="orderInfo-collapse collapseInfo">
      <h2>基本信息</h2>
      <div class="essentialInformation">
        <p>
          <span>任务名称:</span>
          <span>{{taskDetailsData.taskName}}</span>
        </p>
        <p>
          <span>发起部门:</span>
          <span>{{taskDetailsData.createDept}}</span>
        </p>
        <p>
          <span>发起人:</span>
          <span>{{taskDetailsData.creator}}</span>
        </p>
      </div>
      <div class="essentialInformation">
        <p>
          <span>发起时间:</span>
          <span>{{taskDetailsData.startTime}}</span>
        </p>
        <p>
          <span>结束时间:</span>
          <span>{{taskDetailsData.endTime}}</span>
        </p>
        <p>
          <span>执行部门:</span>
          <span>{{taskDetailsData.groupName}}</span>
        </p>
      </div>
      <div class="essentialInformation">
        <p>
          <span>执行人:</span>
          <span>{{taskDetailsData.salesmanName}}</span>
        </p>
        <p>
          <span>预计成本:</span>
          <span>{{taskDetailsData.preCost}}</span>
        </p>
        <p>
          <span>任务类型:</span>
          <span>{{taskDetailsData.taskTypeName}}</span>
        </p>
      </div>
      <div class="essentialInformation">
        <p style="width:100%">
          <span>是否需要上门拜访:</span>
          <span>{{taskDetailsData.isNeedVisit === '1' ? '是' : '否'}}</span>
        </p>
      </div>

      <div class="essentialInformation">
        <p style="width:100%">
          <span>任务说明:</span>
          <span>{{taskDetailsData.intro}}</span>
        </p>
      </div>
    </div>
    <div class="address-collapse collapseInfo">
      <h2>优惠券活动详情</h2>
      <div class="essentialInformation">
        <p>
          <span>优惠券活动名称:</span>
          <span>{{taskDetailsData.couponActivityName}}</span>
        </p>
        <p v-for="item in taskDetailsData.couponList" :key="item.id">
          <span>
            {{item.couponName}}
            <br />
            ({{item.startTime}}-{{item.endTime}}):
          </span>
          <span class="hightHeight">{{item.couponNum ? item.couponNum : 0}}张</span>
        </p>
      </div>
      <div class="essentialInformation">
        <p>
          <span>优惠券发放方式:</span>
          <span>{{taskDetailsData.provideWay === '1' ? '活动开始自动发放' : '活动开始手动发放' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { platformId } from "@/api/crm/ownerVisitTaskManagement.js";
export default {
  name: "taskDetails",
  data() {
    return {
      loading: false,
      rulesForm: {},
      formLabelWidth: "150px",
      // 详情内容
      taskDetailsData: {
        taskName: "", //任务名称
        createDept: "", // 发起部门
        creator: "", // 发起人
        startTime: "", //发起时间
        endTime: "", //结束时间
        groupName: "", //执行部门
        salesmanName: "", //执行人
        preCost: "", //预计成本
        taskType: "", //任务类型
        isNeedVisit: "", //是否需要上门拜访
        intro: "", //任务说明
        couponActivityName: "", // 优惠券活动名称
        couponList: [], //优惠券列表
        provideWay: "" //优惠券发放方式
      }
    };
  },
  methods: {
    query() {
      this.loading = true
      const id = this.$route.query.id;
      platformId(id)
        .then(res => {
          this.loading = false
          if (res.status === 200) {
            console.log(res.data);
            this.taskDetailsData = res.data;
            sessionStorage.setItem("activityName", res.data.taskName);
          } else {
            this.$message.info(res.errorInfo);
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error(err.errorInfo);
        });
    }
  },
  created() {
    this.query();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.TCorderInfo {
  .collapseInfo .essentialInformation .ifzhipai span {
    overflow: inherit;
    height: auto;
    color: #0588c3;
  }
  .collapseInfo .essentialInformation .ifzhipai:hover {
    background: #0588c3;
    border-color: #0588c3;
    color: #fff;
    span {
      color: #fff;
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.TCorderInfo {
  .mark-collapse {
    h2 {
      position: relative;
      .el-button {
        position: absolute;
        right: 0;
        bottom: 8px;
      }
      .el-button + .el-button {
        right: 105px;
      }
    }
  }
  .remakInfo {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>

<template>
  <div class="ownerVisitTaskManagement tabsWrap dingdanxiangqing">
    <el-tabs v-model="detailContentDetailName" type="card" @tab-click="handleClick">
      <!-- 全部 -->
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabList" :key="item.name">
          <template v-if="detailContentDetailName === item.name">
            <component :is="item.name" :detailContentDetailName="detailContentDetailName"></component>
          </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/javascript">
import "@/styles/tab.scss";
import taskDetails from "./detailContent/taskDetails.vue";
import clientList from "./detailContent/clientList.vue";
import visitDetails from "./detailContent/visitDetails.vue";
import couponDetails from "./detailContent/couponDetails.vue";
import taskPerformanceResults from "./detailContent/taskPerformanceResults.vue";
import { platformId } from "@/api/crm/ownerVisitTaskManagement.js";


export default {
  name: "ownerVisitTaskManagementIndex",
  components: {
    taskDetails,
    clientList,
    visitDetails,
    couponDetails,
    taskPerformanceResults
  },
  data() {
    return {
      detailContentDetailName: "taskDetails",
      tabList: [],
      activityName: '', //活动名称
    };
  },
  created() {
    this.query()
  },
  methods: {
    handleClick(tab, event) {
      this.detailContentDetailName = tab.name;
    },
    query() {
      const id = this.$route.query.id;
      this.tabList = []
      platformId(id)
        .then(res => {
          if (res.status === 200) {
            let taskDetailsData = res.data;
            this.tabList = [{
              label: "任务详情",
              name:"taskDetails"
            },
            {
              label: "客户列表",
              name: "clientList"
            }]
            // console.log(taskDetailsData,'taskDetailsData')
            // 任务在进行中和已完成状态，拜访任务需要上门拜访才能进入拜访详情界面。
            // 任务在进行中，已完成状态，拜访任务选择了优惠券活的情况才能进入优惠券发放详情界面。
            // 任务在已完成状态，才能进入任务执行结果页面。
            if ( taskDetailsData.taskStatus === '进行中' || taskDetailsData.taskStatus === '已结束') {
              // 已完成或进行中
              if ( taskDetailsData.isNeedVisit ) {
                // 需要拜访
                this.tabList.push( {
                  label: "拜访详情",
                  name: "visitDetails"
                })
              }
              if ( !!taskDetailsData.couponId ) {
                // 选择优惠券活动
                this.tabList.push( {
                  label: "优惠券发放详情",
                  name: "couponDetails"
                })
              }

              if ( taskDetailsData.taskStatus === '已结束' ) {
                // 已完成
                this.tabList.push( {
                  label: "任务执行结果",
                  name: "taskPerformanceResults"
                })
              }
            }            
          } else {
            this.$message.info(res.errorInfo);
          }
        })
        .catch(err => {
          this.$message.error(err.errorInfo);
        });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
    .dingdanxiangqing{
        height: 100%;
        background-color: #fafeff;
        padding-right: 16px;
        .el-tabs--card>.el-tabs__header {
            border-bottom: 1px solid #03a9f4;
            padding-left: 10px;
            padding-top: 12px;
        }
        .el-tabs__content {
            overflow: auto;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__nav{
            border: 0 none;
        }

        .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
            border-left: 1px solid #d2d2d2;
        }

        .el-tabs__item{
            border: 1px solid #d2d2d2;
            border-top-width:2px; 
            border-radius: 4px 4px 0px 0px;
            border-bottom: 0 none;
            height: 30px;
            line-height: 30px;
        }

        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
            border-top-width: 2px;
            border-color: #03a9f4;
            background: #ffffff;
            border-bottom-color: #fafeff;
        }

        .el-tabs__content{
            padding-left: 10px;
            padding-top: 12px;
        }

        .collapseInfo{
            border: 1px solid #e2e2e2;
            box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
            background: #ffffff;
            color: #333;
            padding: 0 24px;
            padding-bottom: 10px;
            margin-bottom: 12px;
            h2{
                font-size: 16px;
                line-height: 20px;
                padding: 19px 0 10px 0;
                // border-bottom: 1px solid #e2e2e2; 
            }
            .essentialInformation{
                font-size: 14px;
                margin: 5px;
                p{
                    display: inline-block;
                    color:#333333;
                    line-height: 30px;
                    vertical-align: top;
                    width: 24%;
                    font-size: 14px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-right: 10px;
                    .spanDiv{
                        display: block;
                    }
                    span{
                        color:#333;
                        display: inline-block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow:ellipsis;
                        height: 30px;
                        .el-rate__icon,.el-rate__decimal,.el-icon-star-on{
                            line-height: 30px;
                        }
                    }
                    span:first-child{
                        text-align: center;
                    }
                    span + span{
                        // font-weight: bold;
                        
                    }
                    .fontRed{
                        color: red;
                    }
                    .routerJump{
                        cursor: pointer;
                    }
                }
                .minwidth{
                    width: 200px;
                }
                .morewidth{
                    width: 48.8%;
                }
                .lesswidth{
                    width: 521px;
                }

                .markInfo{
                    width: 50%;
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
    }
</style>
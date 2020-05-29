<template>
    <div class="member tabsWrap">
        <el-tabs v-model="memberName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
            <el-tab-pane label="全部" name="first" v-if="$_has_permission('COMPANY_MANAGE_LIST_ALL')">
                <LogisticsAll :key = 'dataKeys' :isvisible="memberName === 'first'"></LogisticsAll>
            </el-tab-pane>

        <!-- 未认证 -->
            <el-tab-pane label="未认证" name="second" v-if="$_has_permission('COMPANY_MANAGE_LIST_UNVALIDAT')">
                <LogisticsUnauthorized :key = 'dataKeys' :isvisible="memberName === 'second'"></LogisticsUnauthorized>
            </el-tab-pane>

        <!-- 待认证 -->
            <el-tab-pane label="待认证" name="third" v-if="$_has_permission('COMPANY_MANAGE_LIST_VALIDATING')">
                <LogisticsCertified :key = 'dataKeys' :isvisible="memberName === 'third'"></LogisticsCertified>
            </el-tab-pane>
            
        <!-- 已认证部分 -->
            <el-tab-pane label="已认证" name="fourth" v-if="$_has_permission('COMPANY_MANAGE_LIST_VALIDATED')">
                <LogisticsHasCertified :key = 'dataKeys' :isvisible="memberName === 'fourth'"></LogisticsHasCertified>
            </el-tab-pane>

        <!-- 认证不通过 -->
            <el-tab-pane label="认证不通过" name="fifth" v-if="$_has_permission('COMPANY_MANAGE_LIST_VALIDATFAIL')">
                <LogisticsDisqualification :key = 'dataKeys' :isvisible="memberName === 'fifth'"></LogisticsDisqualification>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/javascript">
    import '@/styles/tab.scss'
    import LogisticsAll from './LogisticsAll.vue'
    import LogisticsUnauthorized from './LogisticsUnauthorized.vue'
    import LogisticsCertified from './LogisticsCertified.vue'
    import LogisticsHasCertified from './LogisticsHasCertified.vue'
    import LogisticsDisqualification from './LogisticsDisqualification.vue'

    export default {
      name: 'logistics',
      components: {
        LogisticsAll,
        LogisticsUnauthorized,
        LogisticsCertified,
        LogisticsHasCertified,
        LogisticsDisqualification
      },
      data() {
        return {
          memberName: 'first',
          dataKeys:'',
        }
      },
      watch: {
        memberName(newVal, oldVal) {
                // console.log('newVal,oldVal',newVal,oldVal)
          if (newVal) {
            this.memberName = newVal
          } else {
            this.memberName = oldVal
          }
        }
      },
      created() {
        this.memberName = sessionStorage.getItem('memberName') || 'first'
      },
      beforeUpdate() {
        sessionStorage.setItem('memberName', this.memberName)
      },
      beforeDestroy() {
        sessionStorage.setItem('memberName', 'first')
      },
       mounted(){
        // this.dataKeys = Math.random();
      },
      methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
            this.dataKeys = Math.random();
            this.memberName = tab.name
        }
      }
    }
</script>

<style type="text/css" lang="scss">
    .member{
        .identicalStyle{
            padding-right: 0;
        }
        .el-tabs__content{
            .el-tab-pane{
                .classify_searchinfo{
                    padding: 0;
                }
            }
        }

        .el-table{
            th,td{
                text-align: center;
            }
            .el-radio__input{
                margin-left: 10px;
            }
            // td .cell {
            //     white-space: initial;
            //     overflow: hidden;
            // }
            .otherServiceTD{
                text-align: left;
              
            }
            .otherService{
                text-align: center;
                display: inline-block;
                margin: 2px 5px;
                padding: 5px 15px;
                background: #d0d7e5;
                width: 90px;
                color: #333333;
            }
            .isTMS{
                color: #0da0e4;
                font-weight: bold;
            }

            .noTMS{
                color: red;
                font-weight: bold;
            }
        }
        // .wuliucreatDialog,.freezeDialog,.shipperBlackDialog,.shenghedialog{
        //     display: inline-block;
        //     .el-dialog{
        //         width: 1100px;
        //         .el-dialog__body{
        //             .el-form{
        //                 .shipper_information{
        //                     h2{ 
        //                         margin:10px 20px;
        //                         padding-bottom: 10px;
        //                         border-bottom: 2px solid #ccc;
        //                     }
        //                 }
        //                 .el-textarea{
        //                     // width: 650px;
        //                     vertical-align: top;
        //                     font-size: 12px;
        //                     padding-top: 5px;
        //                 }
        //             }
        //         }
        //     }
        // }
    }
</style>

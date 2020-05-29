<template>
  <div class="tabsWrap clearfix">
    <el-tabs v-model="cashAuditingName" type="card"  @tab-click='handleClick'>
        <!-- 全部提现 -->
            <el-tab-pane label="全部提现" name="first" v-if="$_has_permission('FINANCE_WITHDRAW_MANAGE_WITHDRAW_AUDIT_ALL_LIST')">
                <cashAuditing ref="one"></cashAuditing>
            </el-tab-pane>

        <!-- 待处理/审核中 -->
            <el-tab-pane label='待处理' name="second" v-if="$_has_permission('FINANCE_WITHDRAW_MANAGE_WITHDRAW_AUDIT_WAIT_LIST')">
                <cashAuditingStatus ref="two"></cashAuditingStatus>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cashAuditing from './cashAuditing.vue'
import cashAuditingStatus from './cashAuditingStatus.vue'
export default {
    data(){
        return{
            cashAuditingName:'second',
        }
    },
    components:{
            cashAuditing,
            cashAuditingStatus,
    },
    watch: {
        cashAuditingName(newVal, oldVal) {
          if (newVal) {
            this.cashAuditingName = newVal
          } else {
            this.cashAuditingName = oldVal
          }
        }
      },
      created() {
        this.cashAuditingName = sessionStorage.getItem('cashAuditingName') || 'second'
      },

      beforeUpdate() {
        sessionStorage.setItem('cashAuditingName', this.cashAuditingName)
      },

      beforeDestroy() {
        sessionStorage.setItem('cashAuditingName', 'second')
      },
     methods: {
     handleClick(tab, event) {
      this.cashAuditingName = tab.name;
         if(tab.name == 'first'){
           this.$refs.one.firstblood()
         }
         else{ 
           this.$refs.two.firstblood()
         }
     }
     }
}
</script>
<style lang="scss" >
</style>

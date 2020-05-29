<template>
  <div class="member tabsWrap">
    <el-tabs v-model="shipperName" type="card" @tab-click="handleClick" >
        <!-- KPI考核设置 -->
            <el-tab-pane label="KPI考核设置" name="kpiSetup" v-if="$_has_permission('DISPATCH_CHECK_MANEGE_SMALL_CAR_KPI_SETTING')">
                <kpiSetup :isvisible="shipperName === 'kpiSetup'"></kpiSetup>
            </el-tab-pane>

        <!-- 考核汇总表 -->
            <el-tab-pane label="考核汇总表" name="evaluationTotal" v-if="$_has_permission('DISPATCH_CHECK_MANEGE_SMALL_CAR_CHECK_ALL')">
                <evaluationTotal :isvisible="shipperName === 'evaluationTotal'"></evaluationTotal>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import kpiSetup from './kpiSetup.vue'
import evaluationTotal from './evaluationTotal.vue'
import '@/styles/dialog.scss'
import '@/styles/tab.scss'
export default {
  data() {
    return {
      shipperName: 'kpiSetup'
    }
  },
  components: {
    kpiSetup,
    evaluationTotal,
  },
  watch: {
    shipperName(newVal, oldVal) {
      if (newVal) {
        this.shipperName = newVal
      } else {
        this.shipperName = oldVal
      }
    }
  },
  created() {
  },
  methods: {
    handleClick(tab, event) {
      this.shipperName = tab.name
    }
  }
}
</script>

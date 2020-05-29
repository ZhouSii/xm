<template>
  <div class="member tabsWrap">
    <el-tabs v-model="shipperName" type="card" @tab-click="handleClick" >
        <!-- 同城 -->
            <el-tab-pane label="同城" name="SameCity">
                <SameCity :isvisible="shipperName === 'SameCity'"></SameCity>
            </el-tab-pane>

        <!-- 城际 -->
            <el-tab-pane label="城际" name="InterCity">
                <InterCity :isvisible="shipperName === 'InterCity'"></InterCity>
            </el-tab-pane>

        <!-- 零担 -->
            <el-tab-pane label="零担" name="IoadCity">
                <IoadCity :isvisible="shipperName === 'IoadCity'"></IoadCity>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import SameCity from './sameCity.vue'
import InterCity from './interCity.vue'
import IoadCity from './loadCity.vue'
import '@/styles/dialog.scss'
import '@/styles/tab.scss'
export default {
  data() {
    return {
      shipperName: 'SameCity'
    }
  },
  components: {
    SameCity,
    InterCity,
    IoadCity
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

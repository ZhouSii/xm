<template>
  <div style="height:100%;">
    <div class="pointLinePrice tabsWrap">
      <el-tabs v-model="tabData" type="card" @tab-click="handleClick" >
        <el-tab-pane label="专线超时未揽货" name="timeOut">
          <out :tabData="tabData" ref="all"/>
        </el-tab-pane>
        <el-tab-pane label="区代中转失败" name="fail">
          <fail :tabData="tabData" ref="all"/>
        </el-tab-pane>
        <el-tab-pane label="全部" name="all">
          <all :tabData="tabData" ref="all"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
    import out from './out'
    import fail from './fail'
    import all from './all'
    export default {
      name: 'timeOut',
      components: {
        out,
        fail,
        all
      },
      data() {
        return {
          tabData: 'timeOut'
        }
      },
      computed: {

      },
      created() {
      },
      beforeUpdate() {
      },
      beforeDestroy() {
      },
      mounted() {
      },
      methods: {
        init() {
        },
        handleClick(tab, event) {
          this.tabData = tab.name
          // this.$refs['all'].getList()
        }
      }

    }
</script>

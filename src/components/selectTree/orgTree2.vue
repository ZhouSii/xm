<template>
  <el-select ref="myautocomplete" v-model="aid" class="select-tree" clearable @clear="clearHandle">
    <el-option
      v-for="item in openGroups"
      :key="item.groupId"
      :label="item.groupName"
      :value="item.groupId">
      <div :class="'indent indent'+item.index" @click="selectData(item)">{{ item.groupName }}</div>
    </el-option>
  </el-select>
</template>
<script>
  import { getOrgTree2 } from '@/api/dataCenter/trendAnalysis/trendAnalysis'
  /**
   * 将多层级树结构展开未扁平数组，并对每个元素添加层级值index
   */
  function expandGroups(data, i) {
    let res = []
    data.map(el => {
      el.index = i
      res.push(el)
      if (el.children) {
        res = res.concat(expandGroups(el.children, i + 1))
      }
    })
    return res
  }
  export default {
    props: {},
    mounted() {
      this.init()
    },
    computed: {
      openGroups() {
        // 用来标记是第几层
        const index = 1
        return expandGroups(this.groups, index)
      }
    },
    data() {
      return {
        groups: [],
        aid: ''
      }
    },
    methods: {
      clearHandle() {
        this.$emit('clearAnalysisOrderData')
      },
      init() {
        getOrgTree2({}).then(res => {
          this.groups = res.data.list
        }).catch(e => {})
      },
      selectData(i) {
        this.$emit('inputObject', i)
      }
    }
  }
</script>

<style lang="scss">
  .indent{
    border-left: 1px dashed #aaa;
    padding-left: 5px;
    border-bottom: 1px dashed #aaa;
    line-height: 33px;
    height: 33px;
  }
  .indent1{

  }
  .indent2{
    margin-left: 1em;
  }
  .indent3{
    margin-left: 2em;
  }
  .indent4{
    margin-left: 3em;
  }
  .indent5{
    margin-left: 4em;
  }

</style>

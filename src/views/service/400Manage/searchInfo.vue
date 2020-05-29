<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo" >
        <!-- <el-form-item label="通话分类" prop="pointName">
            <el-select v-model="searchInfo.complainType" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsPlantService"
                :key="item.id"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="通话类型" prop="status">
            <el-select v-model="searchInfo.status" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsPlantService"
                :key="item.id"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="callerNo">
            <el-input v-model="searchInfo.callerNo" clearable>
            </el-input>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" icon="el-icon-search" plain :size = "btnsize" @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size = "btnsize" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { parseTime, pickerOptions2 } from '@/utils/index.js'
import { getDictionary } from '@/api/common.js'

export default{
  props: {
      
  },
  components: {
  },
  data() {
    return {
      btnsize: 'mini',
      chooseTime: [],
      dataType: 'AF041',
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      searchInfo: {
        // complainType: '', // 类型
        status:null,
        callerNo:'',//主叫号码
      },
      optionsCouseService: [
        {
          id: '3',
          name: '全部',
          code: ''
        }
      ],
      optionsPlantService: [
        {
          id:'-1',
          name: '全部',
          code: null
        },
        {
          id: '0',
          name: '未接来电',
          code: 0
        },
        {
          id: '1',
          name: '已接来电',
          code: 1
        },
        {
          id: '2',
          name: '留言电话',
          code: 2
        }
      ]

    }
  },
  mounted() {
    this.getInformation()
  },
  methods: {
    getInformation() {
      if (this.serviceType !== 'plant') {
        getDictionary(this.dataType).then(res => {
          res.data.forEach(el => {
            this.optionsCouseService.push(el)
          })
        })
      }
    },
    // 模糊查询 分类名称或者code
    handleSearch(type) {
      switch (type) {
        case 'search':
          const searchObj = Object.assign({}, this.searchInfo)
          this.$emit('change', searchObj)
          break
        case 'clear':
          this.searchInfo = {
            status:null,
            callerNo:'',//主叫号码
          }
          this.$emit('change', this.searchInfo)
          break
      }
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
    
</style>

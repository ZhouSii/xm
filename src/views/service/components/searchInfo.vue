<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo" >
        <el-form-item label="类型" prop="pointName">
            <el-select v-model="searchInfo.complainType" clearable placeholder="请选择" v-if="serviceType == 'plant'">
                <el-option
                v-for="item in optionsPlantService"
                :key="item.id"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
            <el-select v-model="searchInfo.complainType" clearable placeholder="请选择" v-else>
                <el-option
                v-for="item in optionsCouseService"
                :key="item.id"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="工单编号" prop="workSerial">
            <el-input v-model="searchInfo.workSerial" clearable>
            </el-input>
        </el-form-item>
        <!-- <el-form-item label="货主" maxlength="18"  prop="shipperName">
            <el-input v-model="searchInfo.shipperName" clearable placeholder="账户/姓名">
            </el-input>
        </el-form-item>
        <el-form-item label="车主" maxlength="18"  prop="shipperName">
            <el-input v-model="searchInfo.driverName" clearable placeholder="账户/姓名/车牌号">
            </el-input>
        </el-form-item>
        <el-form-item label="下单时间" prop="mobile">
            <el-date-picker
                v-model="chooseTime"
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :default-time="['00:00:00', '23:59:59']"
                value-format="timestamp">
            </el-date-picker>
        </el-form-item> -->
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" icon="el-icon-search" plain :size = "btnsize" @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size = "btnsize" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { parseTime, pickerOptions2 } from '@/utils/index.js'
import { getDictionary } from '@/api/common.js'
// import vregion from '@/components/vregion/Region'

export default{
  props: {
    serviceType: {
      type: String,
      required: true
    }
  },
  components: {
            // vregion
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
        complainType: '', // 类型
        workSerial: '' // 工单号
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
          id: '0',
          name: '全部',
          code: ''
        },
        {
          id: '1',
          name: '投诉',
          code: '投诉'
        },
        {
          id: '2',
          name: '建议',
          code: '建议'
        }
      ]

    }
  },
  mounted() {
    this.getInformation()

    console.log(this.optionsCouseService)
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
            complainType: '', // 类型
            workSerial: '' // 工单号
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

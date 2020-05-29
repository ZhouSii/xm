<template>
    <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px"      class="demo-ruleForm classify_searchinfo">
      <el-form-item label="所属区域" prop="pointName">
        <vregion :ui="true" @values="regionChange" class="form-control">
          <el-input v-model="searchForm.belongCityName" placeholder="请选择所属区域" clearable></el-input>
        </vregion>
      </el-form-item>
      <el-form-item label="处理状态" prop="pointName">
        <el-select clearable placeholder="请选择处理状态">
          <el-option
          v-for="item in optionsPlantService"
          :key="item.id"
          :label="item.name"
          :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="货主">
        <el-input :maxlength="20" placeholder="账户/姓名" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
      </el-form-item>
      <el-form-item label="车主">
        <el-input :maxlength="20" placeholder="账户/姓名/车号牌" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input :maxlength="20" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
      </el-form-item>
      <el-form-item class="btnChoose fr">
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
    </el-form>
     
</template>

<script>
import { parseTime } from '@/utils/index'
import vregion from '@/components/vregion/Region'
export default {
  components: {
    vregion
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: Number
    },
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
  },
  data() {
    // const _this = this
    const validateFormNumber = function(rule, value, callback) {
      callback()
    }

    return {
      searchObjs: {},
      searchForm: {
        belongCityName:''
      },
      optionsPlantService: [
        {
          id: '0',
          name: '待处理',
          code: ''
        },
        {
          id: '1',
          name: '处理中',
          code: ''
        },
        {
          id: '2',
          name: '已处理',
          code: ''
        }
      ],
      rules: {
        mobile: [{
          validator: validateFormNumber, trigger: 'change'
        }]
      }
    }
  },
  watch: {
    searchCreatTime (newVal) {
      if (newVal) {
          this.$set(this.searchObjs, 'createTimeStart', parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'createTimeEnd', parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
    },
    orgid(newVal) {
      this.searchForm.shipFromOrgid = newVal
    }
  },
  mounted() {
    // 默认进来的网点
    this.onSubmit()
  },
  methods: {
    regionChange(d) {
      console.log('data:', d)
      this.searchInfo.belongCityName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      if (d.area) {
        this.searchInfo.belongCity = d.area.code
      } else if (d.city) {
        this.searchInfo.belongCity = d.city.code
      } else {
        this.searchInfo.belongCity = d.province.code
      }
    },
     getDataObj(obj) {
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    getOrgid(id) {
    },
    onSubmit() {
      // this.searchForm.createTimeStart = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      // this.searchForm.createTimeEnd = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
      const data = Object.assign({}, this.searchForm)
      this.$emit('change', data)
    },
    clearForm() {
      this.searchForm.shipFromOrgid = this.orgid
      this.searchForm.shipSn = ''
      this.searchForm.statusName = ''
      this.searchForm.shipFromCityName = ''
      this.searchForm.shipToCityName = ''
      this.searchCreatTime = this.defaultTime
    }
  }
}
</script> 

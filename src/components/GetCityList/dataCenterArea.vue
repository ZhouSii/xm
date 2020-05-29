
<template>
  <div class="chooseCityList">
        <el-cascader
        v-model="selectedOptions"
        :options="cityTree"
        ref="cityTree"
        change-on-select
        @change="handleItemMore"
        :disabled="disabled"
        :props="props">
        </el-cascader>
  </div>
</template>
<script>

import { aflcAreaCode } from '@/api/common.js'

export default {
  name: 'getCityList',
  props: {
    disabled: {
      type: Boolean
    },
    value: [String, Array]
  },
  data() {
    return {
		selectedOptions: [],
		cityTree:[{
            code: "",
            name: "全国",
            pname: null,
			children: []
        }],
		props: {
			label: 'name',
			value: 'code',
			children: 'children'
		},
		nowData:{
			province:null,
			city:null,
			area:null,
		}
    }
  },
  methods: {
	handleItemMore(val){
		// console.log(this.$refs.cityTree)
		// console.log(this.$refs.cityTree.currentLabels)
		// console.log('val',val)
		this.nowData = {
			province:null,
			city:null,
			area:null,
		}
		if(val[1]){
			this.nowData.province = {
				code:val[1],
				key:val[1],
				name:this.$refs.cityTree.currentLabels[1],
				value:this.$refs.cityTree.currentLabels[1],
				parentCode:null,
			}
		}
		if(val[2]){
			this.nowData.city = {
				code:val[2],
				key:val[2],
				name:this.$refs.cityTree.currentLabels[2],
				value:this.$refs.cityTree.currentLabels[2],
				parentCode:val[1],
			}
		}
		if(val[3]){
			this.nowData.area = {
				code:val[3],
				key:val[3],
				name:this.$refs.cityTree.currentLabels[3],
				value:this.$refs.cityTree.currentLabels[3],
				parentCode:val[2],
			}
		}
		// console.log('this.nowData',this.nowData)
		this.returnArr(this.nowData);
	},
	init(){
		aflcAreaCode().then(res=>{
			this.cityTree[0].children = res.data;
		})
	},
	returnArr(val){
		// this.$emit('returnStr',val.length > 0 ? val.join(',') : val,this.$refs.cityTree.currentLabels.join('-'))
		this.$emit('returnStr',val)
	},
	clearData(){
		this.selectedOptions = [];
	}
  },
  mounted() {
    this.init()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    
</style>


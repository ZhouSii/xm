
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
    name: 'getAreaList',
    props: {
        disabled:{
            type: Boolean
        },
        value: [String, Array],

    },
    data() {
        return {
            selectedOptions: [],
            cityTree:[],
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
        };
    },
    methods: {
        handleItemMore(val){
            if(val[0]){
                this.nowData.province = {
                    code:val[0],
                    key:val[0],
                    name:this.$refs.cityTree.currentLabels[0],
                    value:this.$refs.cityTree.currentLabels[0],
                    parentCode:null,
                }
            }
            if(val[1]){
                this.nowData.city = {
                    code:val[1],
                    key:val[1],
                    name:this.$refs.cityTree.currentLabels[1],
                    value:this.$refs.cityTree.currentLabels[1],
                    parentCode:val[0],
                }
            }
            if(val[2]){
                this.nowData.area = {
                    code:val[2],
                    key:val[2],
                    name:this.$refs.cityTree.currentLabels[2],
                    value:this.$refs.cityTree.currentLabels[2],
                    parentCode:val[1],
                }
            }
            // console.log('this.nowData',this.nowData)
            this.returnArr(this.nowData);
        },
        init(){
            aflcAreaCode().then(res=>{
                this.cityTree = res.data;
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
    mounted(){
        this.init();
    },
    beforeDestroy(){
        this.selectedOptions = [];
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" >

    .chooseCityList{
        .el-cascader{   
            .el-cascader__label{
                // top: 5px;
                height: 100%;
                font-size: 14px;
                // color: #3e9ff1;
                padding: 0 25px 0 6px;
                span{
                    color: #3e9ff1;
                }
            }

        }
    }
    
</style>



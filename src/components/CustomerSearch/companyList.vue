
<template>
      <el-autocomplete
        class="inline-input companyList"
        v-model="company"
        :fetch-suggestions="querySearch"
        placeholder=""
        @select="handleSelect"
        :disabled="disabled"
        @blur="chekcblank"
        clearable
        @clear="()=>{return clearCompany()}"
        >
        <template slot-scope="{ item }">
            <span style="float: left;overflow: hidden;width: 70%;text-overflow: ellipsis;white-space: nowrap;">{{ item.companyName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px;overflow: hidden;width: 30%;text-overflow: ellipsis;white-space: nowrap;">{{ item.mobile }}</span>
        </template>  
        </el-autocomplete>
</template>
<script>

import { aflcLogisticsCompany } from '@/api/common.js'

export default {
    name: 'companyList',
    props: {
        disabled:{
            type: Boolean
        },
        companyName:{
            type: String
        },
        value: [String, Array],
        clearableStatus:{
            type: Boolean,
            default:true
        },
        timeoutSearch:null
    },
    data() {
        return {
            restaurants: [],
            company:'',
        };
    }, 
    watch:{
        companyName(newVal,oldVal){
            // console.log('companyName',newVal,oldVal)
            if(newVal){
                this.company = newVal;
            }else{
                this.company = '';
            }
        }
    },
    methods: {
        clearCompany(){
            this.$emit('returnCompany',{companyName:'',id:'',mobile:'',contactsName:'',province:'',city:'',area:'',areaCode:'',address:''})
        },
        chekcblank(){
            if(this.restaurants.length == 0){
                this.company = '';
                this.$emit('returnCompany',{companyName:'',id:'',mobile:'',contactsName:'',province:'',city:'',area:'',areaCode:'',address:''})
            }
        },
        querySearch(queryString, cb) {
            // console.log('queryString',queryString,this.restaurants)
            var results = [];
            this.company = queryString;
            aflcLogisticsCompany(this.company).then(res=>{
                results = res.data;
                this.restaurants = res.data;
                cb(results);
            }).catch(err =>{
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        handleSelect(item) {
            // this.company = item.name + (item.mobilephone ? '/' + item.mobilephone :'');
            this.company = item.companyName;
            // console.log(item,this.company);
            this.$emit('returnCompany',item)
        },
        clear(){
            this.company = '';
        }
    },
    mounted(){
        this.company = this.companyName ? this.companyName : '';
    },
    beforeDestroy(){
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .companyList{
        width: 100%;
    }
    
</style>



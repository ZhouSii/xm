
<template>
      <el-autocomplete
        class="inline-input CustomerSearch"
        v-model="customer"
        :fetch-suggestions="querySearch"
        placeholder=""
        @select="handleSelect"
        :disabled="disabled"
        >
        </el-autocomplete>
</template>
<script>

import {data_get_aflcPartner_findAuthCompany} from '@/api/users/district/manageDistrict.js'
export default {
    name: 'CustomerSearch',
    props: {
        disabled:{
            type: Boolean
        },
        customerName:{
            type:String
        },
        value: [String, Array],
        timeoutSearch:null
    },
    data() {
        return {
            restaurants: [],
            customer:'',
            filterOptionsSystemUsers:{
                companyName:null
            },//筛选平台人员
        };
    }, 
    watch:{
        customerName(newVal,oldVal){
            if(newVal){
                this.customer = newVal;
            }else{
                this.customer = '';
            }
        }
    },
    methods: {
        init(){
            data_get_aflcPartner_findAuthCompany(1, 10000, this.filterOptionsSystemUsers).then(res=>{
                let restaurantsData = res.data;
                this.restaurants= []
                restaurantsData.map(res=>{
                    this.restaurants.push({
                        value:res.companyName})
                })
            }).catch(err =>{
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
        },
        createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString) === 0);
        };
        },
        handleSelect(item) {
        this.customer = item.value;
        this.filterOptionsSystemUsers.companyName = item.value
        data_get_aflcPartner_findAuthCompany(1, 10, this.filterOptionsSystemUsers).then(res=>{
        this.$emit('returnCustomer',res.data[0])
        })
        },
    },
    mounted(){
        this.init();
        // this.restaurants = this.init();
    },
    beforeDestroy(){
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" >

    
</style>



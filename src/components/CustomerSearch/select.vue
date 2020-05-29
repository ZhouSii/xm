
<template>
    <el-select v-model="customer" @change="handleSelect" filterable placeholder="请选择">
        <el-option
        v-for="item in restaurants"
        :key="item.userId"
        :label="item.name"
        :value="item.name">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.mobilephone }}</span>
        </el-option>
    </el-select>
</template>
<script>

import { data_findAflcSystemUserList } from '@/api/dispatch/PlatForm.js'
import { businessSystemUserList } from '@/api/common.js'

export default {
    name: 'CustomerSearch',  
    props: {
        disabled:{
            type: Boolean
        },
        customerName:{
            type:String
        },
        // customerId:{
        //     type:String
        // },
        apiType:{
            type:String
        },
        value: [String, Array],
        timeoutSearch:null
    },
    data() {
        return {
            restaurants: [],
            customer:null,
            filterOptionsSystemUsers:{
                search:''
            },//筛选平台人员
        };
    }, 
    watch:{
        customerName(newVal,oldVal){
            // console.log('customerName',newVal,oldVal)
            if(newVal){
                this.customer = newVal;
            }else{
                this.customer = '';
            }
        },
        // customerId: {
        //     handler(newVal,oldVal){
        //         console.log('customerId',newVal,oldVal)
        //         if(newVal){
        //             this.customer = newVal;
        //         }else{
        //             this.customer = '';
        //         }
        //     },
        //     // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        //     immediate: true
        // },
    },
    methods: {
        init(){
            let UsersFun = this.apiType == 'business' ? businessSystemUserList(this.filterOptionsSystemUsers) : data_findAflcSystemUserList(this.filterOptionsSystemUsers);
            UsersFun.then(res=>{
                // console.log(res)
                this.restaurants = res.data;
            }).catch(err =>{
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        handleSelect(value){
            console.log('this.customer',this.customer)
            let item =this.restaurants.filter(el => {
                return el.name == value
            })
            this.$emit('returnCustomer',item[0])
        }
    },
    mounted(){
        // console.log('customerNamecustomerNamecustomerName',this.customerName)
        this.customer = this.customerName ? this.customerName : '';
        this.init();
        // this.restaurants = this.init();
    },
    beforeDestroy(){
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" >

    
</style>



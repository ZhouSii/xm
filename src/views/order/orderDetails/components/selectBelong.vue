
<template>
    <el-select v-model="belongSalesmanName" @change="handleSelect" filterable placeholder="请选择" @focus="handfocus">
        <el-option
        v-for="item in restaurants"
        :key="item.id"
        :label="item.name"
        :value="item.mobile">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.mobile }}</span>
        </el-option>
    </el-select>
</template>
<script>

import {aflcBusinessGroupUserList } from '@/api/company/businessGroup'

export default {
    name: 'selectBelong',  
    props: {
        disabled:{
            type: Boolean
        },
        groupCode:{
            type:String
        },
        value: [String, Array],
        belongSalesman:{
            type:String
        }
    },
    data() {
        return {
            restaurants: [],
            belongSalesmanName:'',
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 1000,
                "vo": {
                    groupCode:'',
                }
            },
        }
    }, 
    watch:{
        groupCode: {
            handler(newVal,oldVal){
                this.listSystemObj.vo.groupCode = newVal ? newVal : '';
                this.init();
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        },
        belongSalesman: {
            handler(newVal,oldVal){
            // console.log('groupCode',newVal,oldVal)
                if(newVal){
                    this.belongSalesmanName = newVal;
                }else{
                    this.belongSalesmanName = '';
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    methods: {
        init(){
            aflcBusinessGroupUserList(this.listSystemObj).then(res=>{
                this.restaurants = res.data.list;
                this.$forceUpdate()
            }).catch(err =>{
                // this.$message({
                //     type: 'warning',
                //     message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                // })
            })
        },
        handleSelect(value){
            let item = this.restaurants.filter(el => {
                return el.mobile == value
            })
            this.$emit('returnBelong',item[0])
        },
        handfocus(){
        if(this.restaurants.length<1){
            this.$message.warning('请先选择责任区域~') 
        }
        }
    },
    mounted(){
        this.init();
    },
    beforeDestroy(){
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" >

    
</style>



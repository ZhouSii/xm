<template>
    <div class="ProcessedSource tabsWrap">
        <el-tabs type="card" @tab-click="handleClick" v-model="orderTabName">
        <el-tab-pane label="货源详情" name="sourceDetail">
            <sourceDetail></sourceDetail> 
        </el-tab-pane>
        <el-tab-pane label="推送记录" name="pushDetail">
            <pushDetail></pushDetail> 
        </el-tab-pane>
        <el-tab-pane label="联系记录" name="RobberyDetail">
            <RobberyDetail></RobberyDetail> 
        </el-tab-pane>        
        </el-tabs>
            </div>
</template>

<script>
  import sourceDetail from './sourceDetail.vue'
  import pushDetail from './pushDetail.vue'
  import RobberyDetail from './RobberyDetail.vue'
export default {
    data(){
        return{
            orderTabName:'sourceDetail',
        }
    },
    components:{
        sourceDetail,
        pushDetail,
        RobberyDetail
    },
    methods:{
     handleClick(tab, event) {
        this.orderTabName = tab.name;
    }
    },
    mounted(){
       this.orderTabName = this.$route.query.type
    }
}
</script>

<style lang="scss">
.ProcessedSource{
    .el-tabs__content{
        padding-left: 10px;
        padding-top: 12px;
        overflow: auto;
    }
}

</style>


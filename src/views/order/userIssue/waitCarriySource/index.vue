<template>
    <div class="ProcessedSource tabsWrap">
        <el-tabs type="card" @tab-click="handleClick" v-model="orderTabName">
            <el-tab-pane
            v-for="item in visibleTabs"
            :key="item.name"
            :name="item.name"
            v-if="$_has_permission(item.code)"
            >
            <waitCarriySource :status = "item" :isshow="orderTabName === item.name" @Ochange = 'Ochange'></waitCarriySource> 
            <span slot="label">{{item.label}} ( <span style="color:red;">{{item.num > 99 ? '99+' : item.num}}</span> ) </span>
            </el-tab-pane>
        </el-tabs>
            </div>
</template>

<script>
import waitCarriySource from './waitCarriySource.vue'
import {findFCLSoldInfoCount} from '@/api/order/userIssue/userIssue.js'
export default {
    data(){
        return{
            orderTabName:'shangjia',
            visibleTabs:[
                {label:"上架中",name:"shangjia",type:'AF0491401',num:'0',code:'ORDER_ORDER_GOODS_MANAGE_PROCESS_IN_SHELF'},
                {label:"已下架",name:"xiajia",type:'AF0491402',num:'0',code:'ORDER_ORDER_GOODS_MANAGE_PROCESS_OFF_SHELVES'},
            ]
        }
    },
    components:{
        waitCarriySource
    },
    methods:{
    handleClick(tab, event) {
        this.orderTabName = tab.name;
        this.InfoCout()
    },
    InfoCout(){
            findFCLSoldInfoCount({dealState:'0'}).then(res=>{
                if(res.data){
                this.visibleTabs[0].num = res.data.soldInCount
                this.visibleTabs[1].num = res.data.soldOutCount
                }
            })
    },
    Ochange(){
        this.InfoCout()
    }
    },
    mounted(){
        this.InfoCout()
    }
}
</script>

<style lang="sass" scoped>

</style>


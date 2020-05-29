<template>
    <div class="onlineService">
        <div class="onlineService_top onlineCommon">
            <workInfo ref="workInfo"/>
            <workOrder ref="workOrder"/>
        </div>
        <div class="onlineService_bottom onlineCommon">
            <accountAudit ref="accountAudit"/>
            <orderManage ref="orderManage"/>
        </div>
    </div>
</template>

<script>
    import './onlineCommonStyle.scss'
    import workInfo from './component/workInfo.vue'
    import workOrder from './component/workOrder.vue'
    import accountAudit from './component/accountAudit.vue'
    import orderManage from './component/orderManage.vue'
    
    export default {
        name:'onlineService',
        components:{
            workInfo,
            workOrder,
            accountAudit,
            orderManage
        },
        data(){
            return {
                timeOutAss:null,
            }
        },
        methods:{
            setIntervalFunction(){
                this.$refs.workOrder.WorkOrderDealController();
                this.$refs.accountAudit.AccountAuditController();
                this.$refs.orderManage.OrderDealController();
                this.$refs.workInfo.init();
            }
        },
        mounted(){
            this.timeOutAss = setInterval(this.setIntervalFunction,10*1000);
        },
        beforeDestroy() {
          clearInterval(this.timeOutAss)
        },
    }
</script>


<style lang="scss" scoped>

</style>

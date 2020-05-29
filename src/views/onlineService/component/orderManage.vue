<template>
    <div class="workOrder onlineCommonStyle">
        <div class="onlineTitle">
            <div class="onlineTitle_left">订 单 处 理</div>
        </div>
        <div class="onlineService_content">
            <div class="onlineService_content_right workOrder_right">
                <div class="workOrder_right_type workOrder_right_typeBottom" v-for="(item,index) in OrderStatusType" :key="index" :class="{currentClick:item.iscur}"   @click="setCur(index,item.routeName,item.statusName)">
                    <span>{{item.count}}</span>
                    <span>{{item.class}}</span>
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { aflcOrderDealController } from '@/api/onlineService.js'

export default {
    name:'workOrder',
    data(){
        return {
            OrderStatusType:[{
                name:'公海无司机抢单',
                class:'小货车',
                label:'smallNoDriverCounts',
                routeName:'小货车待指派',
                statusName:'noDriver',
                count:0,
                iscur:false
            },{
                name:'公海无司机抢单',
                class:'发物流',
                label:'companyNoDriverCounts',
                routeName:'货主管理',
                statusName:'third',
                count:10,
                iscur:false
            },{
                name:'公海无司机抢单',
                class:'大货车',
                label:'bigNoDriverCounts',
                routeName:'货主管理',
                statusName:'third',
                count:250,
                iscur:false
            },{
                name:'已抢单未联系货主',
                class:'小货车',
                label:'smallOutTimeCounts',
                routeName:'小货车待指派',
                statusName:'passOverTime',
                count:0,
                iscur:false
            },{
                name:'已抢单未联系货主',
                class:'发物流',
                label:'companyOutTimeCounts',
                routeName:'货主管理',
                statusName:'third',
                count:10,
                iscur:false
            },{
                name:'已抢单未联系货主',
                class:'大货车',
                label:'bigOutTimeCounts',
                routeName:'货主管理',
                statusName:'third',
                count:620,
                iscur:false
            }]
        }
    },
    methods:{
        setCur(index,routeName,statusName){
            this.OrderStatusType.forEach((el,idx)=>{
                idx == index ? el.iscur = true : el.iscur = false;
            })

            // let { href } = this.$router.resolve({name:routeName}) ;
                   
            switch(routeName){
                case '小货车待指派':
                    sessionStorage.setItem('waitPointName', statusName);
                    // window.open(href, '_blank')
                    this.$router.push({ name: routeName})
                    break;
                case '':
                    break;
                case "":
                    break;
            }


        },
        OrderDealController(){
            aflcOrderDealController().then(res => {
                for (const item in res.data) {
                    this.OrderStatusType.forEach(el =>{
                        if(el.label == item){
                            el.count = res.data[item];
                        }
                    })
                }
            })
        }
    },
    mounted(){
        this.OrderDealController();
    }
}
</script>

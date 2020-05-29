<template>
    <div class="workOrder onlineCommonStyle">
        <div class="onlineTitle">
            <div class="onlineTitle_left">账 号 审 核</div>
        </div>
        <div class="onlineService_content">
            <div class="onlineService_content_right workOrder_right">
                <div class="workOrder_right_typeBottom workOrder_right_type" v-for="(item,index) in accountAuditType" :key="index" :class="{currentClick:item.iscur}"   @click="setCur(index,item.routeName,item.statusName)">
                    <span>{{item.count}}</span>   
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { aflcAccountAuditController } from '@/api/onlineService.js'

export default {
    name:'workOrder',
    data(){
        return {
            accountAuditType:[{
                name:'货主待认证',
                label:"pending",
                parentName:'shipper',
                routeName:'货主管理',
                statusName:'third',
                count:0,
                iscur:false
            },{
                name:'车主待认证',
                label:"pending",
                parentName:'driver',
                routeName:'车主管理',
                statusName:'third',
                count:0,
                iscur:false
            },{
                name:'物流公司待认证',
                label:"pending",
                parentName:'company',
                routeName:'物流公司',
                statusName:'third',
                count:0,
                iscur:false
            },{
                name:'货主认证不通过',
                label:"failure",
                parentName:'shipper',
                routeName:'货主管理',
                statusName:'fifth',
                count:0,
                iscur:false
            },{
                name:'车主认证不通过',
                label:"failure",
                parentName:'driver',
                routeName:'车主管理',
                statusName:'fifth',
                count:0,
                iscur:false
            },{
                name:'物流公司认证不通过',
                label:"failure",
                parentName:'company',
                routeName:'物流公司',
                statusName:'fifth',
                count:0,
                iscur:false
            }]
        }
    },
    methods:{
        setCur(index,routeName,statusName){
            this.accountAuditType.forEach((el,idx)=>{
                idx == index ? el.iscur = true : el.iscur = false;
            })

            // let { href } = this.$router.resolve({name:routeName}) ;
                   
            switch(routeName){
                case '货主管理':
                    sessionStorage.setItem('UseshipperName', statusName);
                    break;
                case '车主管理':
                    sessionStorage.setItem('CarActiveName', statusName);
                    break;
                case "物流公司":
                    sessionStorage.setItem('memberName', statusName);
                    break;
            }
            // window.open(href, '_blank')
            this.$router.push({ name: routeName})
        },
        AccountAuditController(){
            aflcAccountAuditController().then(res => {
                for (const item in res.data) {
                    this.accountAuditType.forEach(el =>{
                        if(el.parentName == item){
                            if(el.label == 'failure'){
                                el.count = res.data[item].failure;
                            }else{
                                el.count = res.data[item].pending;
                            }
                        }
                    })
                }
            })
        }
    },
    mounted(){
        this.AccountAuditController();
    }
}
</script>

<template>
    <div class="implement tabsWrap">
        <el-tabs v-model="orderTabName" type="card" @tab-click="handleClick" >
            <el-tab-pane  
            v-for="item in visibleTabs"
            :key="item.name"
            :label="item.label"
            :name="item.name">
                <implementComponent :key = 'dataKeys' v-if="$_has_permission(item.vHas)" :isvisible="orderTabName === item.name" :status = "item.type"></implementComponent>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/javascript">

    import implementComponent from './implementOrder.vue'

    export default {
      name:'orderTrack',
      components:{
          implementComponent
        },
        data() {
          return {
            orderTabName:'tihuo',
            visibleTabs:[
                {label:"待提货",name:"tihuo",type:'AF0080601PT',vHas:'ORDER_CITY_WIDE_ORDER_ING_WIAT_PICK_GOODS'},
                {label:"待到车",name:"daoche",type:'AF0080602PT',vHas:'ORDER_CITY_WIDE_ORDER_ING_WIAT_CAR'},
                {label:"待装货",name:"zhuanghuo",type:'AF0080603PT',vHas:'ORDER_CITY_WIDE_ORDER_ING_WIAT_LOAD_GOODS'},
                {label:"完成装货",name:"wczhuanghuo",type:'AF0080604PT',vHas:'ORDER_CITY_WIDE_ORDER_ING_FINISH_LOAD_GOODS'},
                {label:"运输中",name:"yunshu",type:'AF0080605PT',vHas:'ORDER_CITY_WIDE_ORDER_ING_TRANSPORT_ING'},
                {label:"待卸货",name:"xiehuo",type:'AF0080606PT',vHas:'ORDER_CITY_WIDE_ORDER_ING_WIAT_UNLOAD_GOODS'},
                {label:"完成卸货",name:"wcxiehuo",type:'AF0080607PT',vHas:'ORDER_CITY_WIDE_ORDER_ING_FINISH_UNLOAD_GOODS'},
            ],
            dataKeys:''
          };
        },
        watch:{
            orderTabName(newVal,oldVal){
                console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.orderTabName = newVal;
                }else{
                    this.orderTabName = oldVal;
                }
            }
        },
        created() {
            this.orderTabName = localStorage.getItem('orderTabName') || 'tihuo';
        },
        beforeUpdate () {
            localStorage.setItem('orderTabName', this.orderTabName);
        },
        beforeDestroy () {
            localStorage.setItem('orderTabName', this.orderTabName ||'tihuo');
        },
        methods: {

            handleClick(tab, event) {
                // console.log(tab, event);
                this.dataKeys = Math.random();
                this.orderTabName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .implement{
        height:100%;    
    }
</style>
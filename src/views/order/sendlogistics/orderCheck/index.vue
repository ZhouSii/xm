<template>
  <div class="tabsWrap">
        <el-tabs type="card" @tab-click="handleClick" v-model="orderCheckName">
            <el-tab-pane v-for="item in visibleTabs" :key="item.name" :name="item.name">
                <span slot="label">{{item.label}}</span>
                <total :ref="item.name" :key = 'dataKeys' :status = "item" :isvisible="orderCheckName === item.name" />
            </el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import total from './total'
export default {
    data(){
        return{
            orderCheckName: 'one',
            visibleTabs:[
                {label:"全部",name:"one",type:''},
                {label:"待审核",name:"two",type:''},
                {label:"待复审",name:"three",type:''},
                {label:"已复审",name:"four",type:''},
                {label:"复审不通过",name:"five",type:''},
            ],
            dataKeys:''
        }
    },
    components:{
        total,
    },
    created() {
        this.orderCheckName = sessionStorage.getItem('orderCheckName') || 'one';
    },
    // beforeUpdate () {
    //     sessionStorage.setItem('orderCheckName', this.orderCheckName);
    // },
    beforeDestroy () {
        sessionStorage.setItem('orderCheckName', this.orderCheckName);
    },
    methods: {
        handleClick(tab, event) {
            // this.$nextTick(()=>{
            //     this.$refs[tab.name][0].doLayoutTable();
            //     console.log('this.$refs',this.$refs)
            // })
            this.dataKeys = Math.random();
            this.orderCheckName = tab.name;
        }
     },
}
</script>

<style lang="scss" >
</style>


<template>
  <div class="toExamine tabsWrap">
    <el-tabs v-model="examineName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
            <el-tab-pane  name="examineAll">
                <span slot="label">全部</span>
                <examineAllComponent :key="dataKeys" :isvisible="examineName === 'examineAll'"/>
            </el-tab-pane>
        <!-- 待审核 -->
            <el-tab-pane  name="toBeAudited">
                <span slot="label">待审核</span>
                <toBeAuditedComponent :key="dataKeys" :isvisible="examineName === 'toBeAudited'"/>
            </el-tab-pane>
        <!-- 待复审 -->
            <el-tab-pane  name="toBeReviewed">
                <span slot="label">待复审</span>
                <toBeReviewedComponent :key="dataKeys" :isvisible="examineName === 'toBeReviewed'"/>
            </el-tab-pane>
        <!-- 已复审 -->
            <el-tab-pane  name="reviewed">
                <span slot="label">已复审</span>
                <reviewedComponent :key="dataKeys" :isvisible="examineName === 'reviewed'"/>
            </el-tab-pane>
        <!-- 复审不通过 -->
            <el-tab-pane  name="disReviewed">
                <span slot="label">复审不通过</span>
                <disReviewedComponent :key="dataKeys" :isvisible="examineName === 'disReviewed'"/>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import examineAllComponent from './examineAll'
import toBeAuditedComponent from './toBeAudited'
import toBeReviewedComponent from './toBeReviewed'
import reviewedComponent from './reviewed'
import disReviewedComponent from './disReviewed'

    export default {
      name:'toExamine',
      components:{
            examineAllComponent,
            toBeAuditedComponent,
            toBeReviewedComponent,
            reviewedComponent,
            disReviewedComponent
        },
        data() {
          return {
            examineName:'examineAll',
            dataKeys: ""
          };
        },
        watch:{
            examineName(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.examineName = newVal;
                }else{
                    this.examineName = oldVal;
                }
            }
        },
        created() {
            this.examineName = sessionStorage.getItem('examineName') || 'examineAll';
            // this.getCount();
        },
        beforeUpdate () {
            sessionStorage.setItem('examineName', this.examineName);
        },
        // beforeDestroy () {
        //     sessionStorage.setItem('examineName', 'examineAll');
        // },
        methods: {
            handleClick(tab, event) {
                this.dataKeys = Math.random();
                this.examineName = tab.name;
            },
        },
        mounted(){
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .toExamine{
        height: 100%;
    }
</style>
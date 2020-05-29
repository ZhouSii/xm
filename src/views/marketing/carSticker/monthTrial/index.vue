<template>
    <div class="monthTrial tabsWrap">
       <el-tabs v-model="monthTrialName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
            <el-tab-pane label="全部" name="monthTrialAll">
                <allComponent :key = 'dataKeys' :isvisible="monthTrialName === 'monthTrialAll'" v-if="$_has_permission('MARKETING_CARSTICKER_MONTHLYREVIEW_ALL')"/>
            </el-tab-pane>
        <!-- 未提交月审 -->
            <el-tab-pane label="未提交月审" name="monthTrialNotSubmitted">
                <notSubmittedComponent :key = 'dataKeys' :isvisible="monthTrialName === 'monthTrialNotSubmitted'"/>
            </el-tab-pane>
        <!-- 月审已提交待审核 -->
            <el-tab-pane label="月审已提交待审核" name="monthTrialPending">
                <pendingComponent :key = 'dataKeys' :isvisible="monthTrialName === 'monthTrialPending'" v-if="$_has_permission('MARKETING_CARSTICKER_MONTHLYREVIEW_MONTHLYREVIEWED')"/>
            </el-tab-pane>
         <!-- 月审待复审 -->
            <el-tab-pane label="月审待复审" name="monthTrialTorRview">
                <toReviewComponent :key = 'dataKeys' :isvisible="monthTrialName === 'monthTrialTorRview'" v-if="$_has_permission('MARKETING_CARSTICKER_MONTHLYREVIEW_PENDINGREVIEW')"/>
            </el-tab-pane>
        <!-- 已复审 -->
            <el-tab-pane label="已复审" name="monthTrialReviewed">
                <reviewedComponent :key = 'dataKeys' :isvisible="monthTrialName === 'monthTrialReviewed'" v-if="$_has_permission('MARKETING_CARSTICKER_MONTHLYREVIEW_REVIEWED')"/>
            </el-tab-pane>
        <!-- 复审驳回 -->
            <el-tab-pane label="复审驳回" name="monthTrialReject">
                <rejectComponent :key = 'dataKeys' :isvisible="monthTrialName === 'monthTrialReject'" v-if="$_has_permission('MARKETING_CARSTICKER_MONTHLYREVIEW_REJECTIONOFREVIEW')"/>
            </el-tab-pane>
        <!-- 月审不通过/驳回 -->
            <el-tab-pane label="月审不通过/驳回" name="overruleCompomemt">
                <overruleCompomemt :key = 'dataKeys' :isvisible="monthTrialName === 'overruleCompomemt'" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import allComponent from './all'
import notSubmittedComponent from './notSubmitted'
import pendingComponent from './pending'
import toReviewComponent from './toReview'
import reviewedComponent from './reviewed'
import rejectComponent from './reject'
import overruleCompomemt from './overrule'
export default {
    name: 'monthTrial',
    components: {
        allComponent,
        notSubmittedComponent,
        pendingComponent,
        toReviewComponent,
        reviewedComponent,
        rejectComponent,
        overruleCompomemt
    },
    data() {
        return {
            monthTrialName: 'monthTrialAll',
            dataKeys:''
        }
    },
    
    computed: {

    },
    created() {
        this.monthTrialName = sessionStorage.getItem('monthTrialName') || 'monthTrialAll';
    },
    beforeUpdate () {
        sessionStorage.setItem('monthTrialName', this.monthTrialName);
    },
    beforeDestroy () {
        sessionStorage.setItem('monthTrialName', this.monthTrialName);
    },
    mounted() {
        // if (this.$route.query.currentTab) {
        // this.monthTrialName = this.$route.query.currentTab
        // }
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.monthTrialName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .monthTrial{
    }
</style>


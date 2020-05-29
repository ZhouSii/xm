<template>
    <div class="firstTrial tabsWrap">
       <el-tabs v-model="firstTrialName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
            <el-tab-pane label="全部" name="all">
                <allComponent :key = 'dataKeys' :isvisible="firstTrialName === 'all'" />
            </el-tab-pane>
        <!-- 初审待审核 -->
            <el-tab-pane label="初审待审核" name="pending">
                <pendingComponent :key = 'dataKeys' :isvisible="firstTrialName === 'pending'" v-if="$_has_permission('MARKETING_CARSTICKER_FIRSTINSTANCE_FIRSTAUDITED')"/>
            </el-tab-pane>
        <!-- 已通过 -->
            <el-tab-pane label="已通过" name="getPast">
                <getPastComponent :key = 'dataKeys' :isvisible="firstTrialName === 'getPast'" v-if="$_has_permission('MARKETING_CARSTICKER_FIRSTINSTANCE_AUDITED')"/>
            </el-tab-pane>
        <!-- 不通过/驳回 -->
            <el-tab-pane label="不通过/驳回" name="reject">
                <rejectComponent :key = 'dataKeys' :isvisible="firstTrialName === 'reject'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import allComponent from './all'
import pendingComponent from './pending'
import getPastComponent from './getPast'
import rejectComponent from './reject'
export default {
    name: 'firstTrial',
    components: {
        allComponent,
        pendingComponent,
        getPastComponent,
        rejectComponent
    },
    data() {
        return {
            firstTrialName: 'all',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.firstTrialName = sessionStorage.getItem('firstTrialName') || 'all';
    },
    beforeUpdate () {
        sessionStorage.setItem('firstTrialName', this.firstTrialName);
    },
    beforeDestroy () {
        sessionStorage.setItem('firstTrialName', this.firstTrialName);
    },
    mounted() {
        // if (this.$route.query.currentTab) {
        // this.firstTrialName = this.$route.query.currentTab
        // }
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.firstTrialName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .firstTrial{
    }
</style>


<template>
    <div class="applyCarSticker tabsWrap">
       <el-tabs v-model="applyCarStickerName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
            <el-tab-pane label="全部" name="all">
                <allComponent :key = 'dataKeys' :isvisible="applyCarStickerName === 'all'" />
            </el-tab-pane> 

        <!-- 待处理 -->
            <el-tab-pane label="待处理" name="pending">
                <pendingComponent :key = 'dataKeys' :isvisible="applyCarStickerName === 'pending'" v-if="$_has_permission('MARKETING_CARSTICKER_CARSTICKERREPORT_PENDINGDISPOSAL')"/>
            </el-tab-pane>

        <!-- 已通过 -->
            <el-tab-pane label="已通过" name="getPast">
                <getPastComponent :key = 'dataKeys' :isvisible="applyCarStickerName === 'getPast'" v-if="$_has_permission('MARKETING_CARSTICKER_CARSTICKERREPORT_PASSED')"/>
            </el-tab-pane>

        <!-- 不通过 -->
            <el-tab-pane label="不通过" name="noPass">
                <noPassComponent :key = 'dataKeys' :isvisible="applyCarStickerName === 'noPass'" v-if="$_has_permission('MARKETING_CARSTICKER_CARSTICKERREPORT_NOTPASS')"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import allComponent from './all';
import pendingComponent from './pending'
import getPastComponent from './getPast'
import noPassComponent from './noPass'
// import applyCarStickerHistoryAreaPrice from './applyCarStickerHistoryAreaPrice'
export default {
    name: 'applyCarSticker',
    components: {
        allComponent,
        pendingComponent,
        getPastComponent,
        noPassComponent,
        // applyCarStickerHistoryAreaPrice
    },
    data() {
        return {
            applyCarStickerName: 'all',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.applyCarStickerName = sessionStorage.getItem('applyCarStickerName') || 'all';
    },
    beforeUpdate () {
        sessionStorage.setItem('applyCarStickerName', this.applyCarStickerName);
    },
    beforeDestroy () {
        sessionStorage.setItem('applyCarStickerName', this.applyCarStickerName);
    },
    mounted() {
        // if (this.$route.query.currentTab) {
        // this.applyCarStickerName = this.$route.query.currentTab
        // }
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.applyCarStickerName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .applyCarSticker{
    }
</style>


<template>
    <div class="carStickerEX tabsWrap">
       <el-tabs v-model="carStickerEXName" type="card" @tab-click="handleClick" >
            <!-- 车贴待审查订单 -->
                <el-tab-pane label="车贴待审查订单" name="toExamine">
                    <toExamineComponent :key = 'dataKeys' :isvisible="carStickerEXName === 'toExamine'"/>
                </el-tab-pane>

            <!-- 车贴已审查订单 -->
                <el-tab-pane label="车贴已审查订单" name="hasExamine">
                    <hasExamineComponent :key = 'dataKeys' :isvisible="carStickerEXName === 'hasExamine'"/> 
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import toExamineComponent from './toExamine'
import hasExamineComponent from './hasExamine'
export default {
    name: 'valueAddedServices',
    components: {
        toExamineComponent,
        hasExamineComponent
    },
    data() {
        return {
            carStickerEXName: 'toExamine',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.carStickerEXName = sessionStorage.getItem('carStickerEXName') || 'toExamine';
    },
    beforeUpdate () {
        sessionStorage.setItem('carStickerEXName', this.carStickerEXName);
    },
    beforeDestroy () {
        sessionStorage.setItem('carStickerEXName', this.carStickerEXName);
    },
    mounted() {
        // if (this.$route.query.currentTab) {
        // this.carStickerEXName = this.$route.query.currentTab
        // }
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.carStickerEXName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .carStickerEX{
    }
</style>


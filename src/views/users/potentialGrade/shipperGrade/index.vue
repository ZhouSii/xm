<template>
    <div class="shipperGrade tabsWrap">
       <el-tabs v-model="gradeName" type="card" @tab-click="handleClick" >
            <!-- 同城 -->
                <el-tab-pane label="同城" name="tongcheng">
                    <tongcheng :isvisible="gradeName === 'tongcheng'"/>
                </el-tab-pane>

            <!-- 城际 -->
                <!-- <el-tab-pane label="城际" name="channel">
                    <channelTotal :isvisible="gradeName === 'channel'"/>
                </el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
import tongcheng from './tongcheng.vue'
export default {
    name: 'shipperGrade',
    components: {
        tongcheng,
    },
    data() {
        return {
            gradeName: 'tongcheng',
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.gradeName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .shipperGrade{

    }
</style>


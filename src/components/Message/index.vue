<template>
    <!-- 提示内容 -->
    <div class="cue">
        <el-dialog
        :visible.sync="centerDialogVisible"
        center>
        <span>{{information}}</span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'getCityList',
    props: {
        config: {
            type: Array
        }

    },
    data() {
      return {
       
      };
    },
    methods: {
    },
    mounted(){
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    
</style>

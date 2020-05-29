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
    name: 'cue',
    props: {

    },
    data() {
      return {
            information:null,
            centerDialogVisible:false,
      };
    },
    methods: {
        hint(val){
            this.information = val;
            console.log("val:",val)
            this.centerDialogVisible = true;
            let timer = setTimeout(()=>{
                this.centerDialogVisible = false;
                clearTimeout(timer)
            },2000)
        }
    },
    mounted(){
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    
</style>

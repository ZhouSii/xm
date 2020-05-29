<template>
    <div class="rate clearfix">
        <h2>照片信息</h2>
        <div class="essentialInformation">
            <h6>
                <span>车主账号：</span>
            </h6>
            <h6>
                <span>车主姓名：</span>
            </h6>
            <h6>
                <span>车牌号：</span>
            </h6>
            <h6>
                <span>车型：</span>
            </h6>
        </div>
        <h2>照片信息</h2>
        <div class="essentialInformation">
            <h6>
                <span>车主账号：</span>
            </h6>
            <h6>
                <span>车主姓名：</span>
            </h6>
            <h6>
                <span>车牌号：</span>
            </h6>
            <h6>
                <span>车型：</span>
            </h6>
        </div>
        <h2>照片信息</h2>
        <div class="essentialInformation">
            <h6>
                <span>车主账号：</span>
            </h6>
            <h6>
                <span>车主姓名：</span>
            </h6>
            <h6>
                <span>车牌号：</span>
            </h6>
            <h6>
                <span>车型：</span>
            </h6>
        </div>
    </div>
</template>

<script>

export default {
    name: 'rate',
    components:{
    },
    props: {
       isvisible: {
            type: Boolean,
            default: false
        },
        rateData:{
            type: Array,
            required:true,
        }
    },
    data() {
        return {
            
        };
    },
    watch:{
       
    },
    mounted(){
        // this.init();
        console.log('this.rateData',this.rateData)
    },
    methods: {
        init(){
            
        },
      
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .rate{

    }
    
</style>

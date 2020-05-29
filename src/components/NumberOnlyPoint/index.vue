
<template>
    <div>
        <!-- <el-input v-model="currentVal" ref="einpu" @keyup.native="(e)=>{handlerChoose(e.target.value)}" :placeholder = "placeholderTxt" :maxlength="length" @blur="showTypeFunction">
            <template slot="append" v-if="slotTxt">{{slotTxt}}</template>
        </el-input> -->

         <el-input v-model="currentVal" ref="einpu" :placeholder = "placeholderTxt" :disabled="disabledType" clearable :maxlength="length" @blur="showTypeFunction" >
            <template slot="append" v-if="slotTxt">{{slotTxt}}</template>
        </el-input>

        <!-- {{currentVal + '- currentVal'}} -->
    </div>
</template>
<script>

export default {
    name: 'NumberOnlyPoint',
    props: {
        value: [String, Array,Number],
        length:{
            type:String,
            default:'20'
        },
        slotTxt:{
            type:String,
            default:''
        },
        placeholderTxt:{
            type:String,
            default:''
        },
        disabledType:{
            type:Boolean,
            default:false
        },
        showType:{
            type:String,
            default:''
        },
        ifZero:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {
            currentVal:'',
        };
    }, 
    watch:{
        value:{
            handler(newVal,oldVal){
                // console.log('newVal',newVal,oldVal)
                this.currentVal = newVal + '';
            },
            deep:true,
            immediate: true
        },
        currentVal(newVal,oldVal){
            if(newVal){
                this.handlerChoose(newVal)
            }else if(newVal == ''){
                this.$emit('input','')
            }
        }
    },
    // mounted(){
    //     // debugger
    //     this.currentVal = this.value
    //     console.log('created',this.currentVal)
    // },
    // computed:{
    //     currentVal(){
    //         return 
    //     }
    // },
    methods: {
        handlerChoose(val){
            // console.log(val)
            var transportAging = typeof(val) == 'String' ? val : val + '';
            transportAging = transportAging.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
            transportAging = transportAging.replace(/^\./,"0."); //验证第一个字符是数字
            transportAging = transportAging.replace(/^0{2,}/,"0"); //验证第一个字符是数字
            transportAging = transportAging.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
            transportAging = transportAging.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            transportAging = transportAging.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入er位小数
            this.$emit('input',transportAging)
            this.$nextTick(t=>{
                this.currentVal = transportAging;
                // console.log('this.$refs.einpu',this.$refs.einpu)
                this.$refs.einpu.$el.children[0].value = transportAging;
            })
        },
        reg(newVal){
            this.$nextTick(()=>{
                var transportAging = typeof(newVal) == 'String' ? newVal : newVal + '';
                transportAging = transportAging.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
                transportAging = transportAging.replace(/^\./,"0."); //验证第一个字符是数字
                transportAging = transportAging.replace(/^0{2,}/,"0."); //验证第一个字符是数字
                transportAging = transportAging.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
                transportAging = transportAging.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                transportAging = transportAging.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入er位小数
                this.currentVal = transportAging;
                this.$emit('input',transportAging);
            })
        },
        showTypeFunction(){
            // console.log('this.ifZero',this.ifZero)
            if(this.showType !== ''){
                switch(this.showType){
                    case 'permill':
                        this.currentVal = parseInt(this.currentVal) > 1000 ? '1000' : this.currentVal;
                        break;
                    case 'percent':
                        this.currentVal = parseInt(this.currentVal) > 100 ? '100' : this.currentVal;
                        break;
                }
                return this.$emit('input',this.currentVal);
            }
            if(!this.ifZero){
                // console.log('this.ifZero',this.ifZero)
                if(parseFloat(this.currentVal) <= 0){
                    this.currentVal = '';
                    this.$message({
                        type: 'warning',
                        message: '所填内容必须大于0!'
                    })
                    return this.$emit('input',this.currentVal);
                }
            }
            this.$emit('input',this.currentVal);
        }
    },
    beforeDestroy(){
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" >

    
</style>



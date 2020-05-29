<template>
    <div>
        <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm qdSearch fr" v-if="searchFrom == 'userTradeSurvey'">
            <el-form-item label="" prop="startTime" v-if="searchType != '0'">
                <el-date-picker
                    v-if="searchType == '2'"
                    v-model="searchInfo.startTime"
                    type="month"
                    value-format="timestamp"
                    @change ="cashTimeChange"
                    placeholder="选择月">
                </el-date-picker>
                <el-date-picker
                    v-if="searchType == '1'"
                    v-model="searchInfo.startTime"
                    type="date"
                    value-format="timestamp"
                    @change ="cashTimeChange"
                    format="yyyy 年 MM 月 dd 日"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm qdSearch fr" v-if="searchFrom == 'financial'">
            <el-form-item label="" prop="searchTime" v-if="searchType != '0'">
                <el-date-picker
                    v-if="searchType == '2'"
                    v-model="searchTime"
                    value-format="yyyy-MM"
                    type="month"
                    @change ="cashTimeChange2"
                    placeholder="选择月">
                </el-date-picker>
                <el-date-picker
                    v-if="searchType == '1'"
                    v-model="searchTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    @change ="cashTimeChange2"
                    format="yyyy 年 MM 月 dd 日"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/javascript">

// import { parseTime,pickerOptions2 } from '@/utils/index.js'

    export default{
        components:{

        },
        props:{
            searchType:{
                type:String,
            },
            searchFrom:{
                type:String,
            }
        },
        data(){
            return{
                btnsize:'mini',
                searchInfo:{
                   startTime:''
                },
                searchTime:'',
            }
        },
        watch: {
            searchType: {
                handler(newVal, oldVal) {
                    console.log(newVal,oldVal)
                    if(newVal == '0' && this.searchFrom == 'userTradeSurvey'){
                        this.searchInfo.startTime = '';
                    }else if(newVal == '0' && this.searchFrom == 'financial'){
                        this.searchTime = '';
                    }
                },
            },
        },
        methods: {
            cashTimeChange(){
                console.log(this.searchInfo.startTime)
                this.searchInfo.startTime = this.searchInfo.startTime == null ? '' : this.searchInfo.startTime ;
                let searchObj = Object.assign({}, this.searchInfo);
                this.$emit('change', searchObj,this.searchFrom)
            },
            cashTimeChange2(){
                this.searchTime = this.searchTime == null ? '' : this.searchTime ;
                this.$emit('change', this.searchTime,this.searchFrom)
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .qdSearch{
        .el-form-item {
            margin-bottom: 0;
        }
    }
</style>
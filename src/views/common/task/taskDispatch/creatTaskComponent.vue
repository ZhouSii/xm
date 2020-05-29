<template>
    <div>
        <!-- 新增分类信息 -->
            <div class="creatTask commoncss">
                <el-dialog :title='formtitle' :close-on-click-modal="false"  :visible="dialogFormVisible" @close="close">
                    <el-form :model="taskForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="执行器" prop="name">
                            <el-select v-model="taskForm.jobGroup" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in newTaskOptions"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="任务描述" prop="name">
                            <el-input v-model="taskForm.jobDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="路由策略" prop="name">
                            <el-select v-model="taskForm.executorRouteStrategy" placeholder="请选择">
                                <el-option value="FIRST" >第一个</el-option>
                                <el-option value="LAST" >最后一个</el-option>
                                <el-option value="ROUND" >轮询</el-option>
                                <el-option value="RANDOM" >随机</el-option>
                                <el-option value="CONSISTENT_HASH" >一致性HASH</el-option>
                                <el-option value="LEAST_FREQUENTLY_USED" >最不经常使用</el-option>
                                <el-option value="LEAST_RECENTLY_USED" >最近最久未使用</el-option>
                                <el-option value="FAILOVER" >故障转移</el-option>
                                <el-option value="BUSYOVER" >忙碌转移</el-option>
                                <el-option value="SHARDING_BROADCAST" >分片广播</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Cron" prop="name">
                            <el-input v-model="taskForm.jobCron"></el-input>
                        </el-form-item>
                        <el-form-item label="运行模式" prop="name">
                            <el-select v-model="taskForm.glueType" placeholder="请选择">
                                <el-option value="BEAN" >BEAN模式</el-option>
                                <el-option value="GLUE_GROOVY" >GLUE模式(Java)</el-option>
                                <el-option value="GLUE_SHELL" >GLUE模式(Shell)</el-option>
                                <el-option value="GLUE_PYTHON" >GLUE模式(Python)</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="JobHandler" prop="name">
                            <el-input v-model="taskForm.executorHandler"></el-input>
                        </el-form-item>
                        <el-form-item label="执行参数" prop="name">
                            <el-input v-model="taskForm.executorParam"></el-input>
                        </el-form-item>
                        <el-form-item label="子任务Key" prop="name">
                            <el-input v-model="taskForm.childJobKey"></el-input>
                        </el-form-item>
                        <el-form-item label="阻塞处理策略" prop="name">
                            <el-select v-model="taskForm.executorBlockStrategy" placeholder="请选择">
                                <el-option value="SERIAL_EXECUTION" >单机串行</el-option>
                                <el-option value="DISCARD_LATER" >丢弃后续调度</el-option>
                                <el-option value="COVER_EARLY" >覆盖之前调度</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="失败处理策略" prop="name">
                            <el-select v-model="taskForm.executorFailStrategy" placeholder="请选择">
                                <el-option value="FAIL_ALARM" >失败告警</el-option>
								<el-option value="FAIL_RETRY" >失败重试</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="负责人" prop="name">
                            <el-input v-model="taskForm.author"></el-input>
                        </el-form-item>
                        <el-form-item label="报警邮件" prop="name">
                            <el-input v-model="taskForm.alarmEmail"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="newInfoSave('ruleForm')">保 存</el-button>
                    <el-button @click="closeAddNewInfo('ruleForm')">取 消</el-button>
                    </div> 
                </el-dialog>
            </div>

    </div>
</template>

<script>


import { data_taskList,data_newTaskList } from '@/api/task/taskContral.js'


export default {
    name: 'addClassfy',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        }
    },
    components:{
        
    },
    computed: {
     
    },
    watch:{
        dialogFormVisible:{
             handler(newVal, oldVal) {
                if(newVal){
                    this.getTaskChoose();
                }
            },
        }
    },
    data() {
      return {
            taskForm:{
                jobGroup:null,
                jobDesc:null,
                executorRouteStrategy:null,
                jobCron:null,
                glueType:null,
                executorHandler:null,
                executorParam:null,
                childJobKey:null,
                executorBlockStrategy:null,
                executorFailStrategy:null,
                author:null,
                alarmEmail:null,
            },
            ExecutorRouteStrategyEnum:[],
            newTaskOptions:[],//执行器下拉列表
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
      };
    },
    mounted(){
        this.init();
    },
    methods: {
       
        close(){
            this.$emit('update:dialogFormVisible',false)
        },
        getTaskChoose(){
            let params = 1 ;
            data_taskList(params).then(res => {
                console.log(res)
            }).catch( err => {
                console.log(err )
                this.newTaskOptions = err.content.JobGroupList;
            })
        },
        //初始化选择项数据
        init(){
             
        },
        newInfoSave(){
            console.log(this.taskForm)
            data_newTaskList(this.taskForm).then( res => {

            }).catch( err => {
                console.log('err',err)
            })
        },
        closeAddNewInfo(){
            this.close();
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .creatTask{
        .el-dialog{
            width: 780px;
            .el-dialog__body{
                border-bottom:1px solid #ccc;   
                margin-bottom: 0; 
                overflow: hidden;
                margin: 0 20px;
                .el-form {
                    // .el-form-item:nth-child(2n-1){
                    //     margin-left: 20px;
                    // }
                    .el-form-item{  
                        margin-left: 10px;
                        .el-form-item__label{
                            font-weight: bold;
                            font-size: 14px;
                            color: #333;
                        }

                        .el-form-item__content>.el-input{
                            width: 230px;
                            margin-left: 20px;
                        }
                    }
                }
                .el-select{
                    margin-left: 20px;
                    &>.el-input{
                        width: 230px;
                    }
                }
            }
        }
    }

</style>

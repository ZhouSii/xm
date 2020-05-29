<template>
    <div class="shipperBlackDialog commoncss">
      <el-dialog :title="blacktitle" :visible="BlackDialogFlag" :before-close="close" v-el-drag-dialog :close-on-click-modal="false" >
        <el-form :model="formBlack" ref="formBlack" :rules="formBlackRules">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号码：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow">{{formBlack.mobile}}</span> -->
                        <el-input v-model="formBlack.mobile" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司名称：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow">{{formBlack.companyName}}</span> -->
                        <el-input v-model="formBlack.companyName" disabled></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                
                <el-row>
                <el-col :span="12">
                    <el-form-item label="联系人：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow">{{formBlack.contacts}}</span> -->
                        <el-input v-model="formBlack.contacts" disabled></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所在地：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow">{{formBlack.belongCityName}}</span> -->
                        <el-input v-model="formBlack.belongCityName" disabled></el-input>

                    </el-form-item>
                </el-col>
                </el-row>
                 <el-row>
                    <el-col :span="24">
                        <el-form-item label="详细地址：" :label-width="formLabelWidth">
                            <!-- <span class="onlyShow">{{formBlack.address}}</span> -->
                            <el-input v-model="formBlack.address" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="货主类型：" :label-width="formLabelWidth">
                            <!-- <span class="onlyShow">{{formBlack.shipperTypeName}}</span> -->
                            <el-input v-model="formBlack.shipperTypeName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册来源：" :label-width="formLabelWidth">
                            <!-- <span class="onlyShow">{{formBlack.registerOriginName}}</span> -->
                            <el-input v-model="formBlack.registerOriginName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="shipper_information">
                <h2>移入黑名单信息</h2>
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="移入原因：" :label-width="formLabelWidth" prop="putBlackCause">
                        <span class="onlyShow" v-if="editType != 'add'">{{formBlack.putBlackCauseName}}</span>
                        <el-select v-model="formBlack.putBlackCause" placeholder="请选择" v-else>
                            <el-option
                                v-for="item in optionsFormBlack"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="移入原因说明：" :label-width="formLabelWidth">
                        <el-input v-model="formBlack.putBlackCauseRemark" :rows="5" maxlength="100" :disabled="editType != 'add'" placeholder="请输入内容" type="textarea"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <div class="shipper_information" v-show="editType == 'edit'">
					<h2>移出黑名单信息</h2>
					<el-form-item label="移出原因说明：" :label-width="formLabelWidth">
					    <el-input v-model="formBlack.popBlackRemark" maxlength="100" :rows="5" placeholder="请输入内容" type="textarea"></el-input>
					</el-form-item>
				</div>
            </div>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain  icon="el-icon-success" @click="onSubmit">确 定</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
// import {data_get_shipper_change} from '@/api/users/shipper/all_shipper.js'
import {  DicBlackType } from '@/api/common.js'
import { BlackShipperConfig,ShipperConfigDetails } from '@/api/users/shipper/all_shipper.js'

export default {
    name:'shipper_blackList-diaolog',
    components:{

    },
    props:{
        blacktitle:{
            type:String,
            default:"移入黑名单"
        },
        paramsView:{
            type:Object,
        },
        editType: {
            type: String,
        },
        BlackDialogFlag:{
            type:Boolean,
            required:true,
        }
    },
    data(){
        return{
            optionsFormBlack:[],
            formLabelWidth:'120px',
            formBlack:{},
            formBlackRules:{
                putBlackCause:{required:true,message:'请选择移入原因',trigger:"change"}
            }
        }
    },
    watch:{
        BlackDialogFlag:{
            handler: function(val, oldVal) {
                if(val){
                    this.openDialog();
                    // if(this.editType == 'add'){
                    //     this.getMoreInformation()
                    // }
                }
            },
        },
    },
    mounted(){
        this.getMoreInformation()
    },
    methods:{
        close(done) {
            this.$emit('update:BlackDialogFlag', false);
            this.$emit('getData');
            this.$refs.formBlack.resetFields();
            if (typeof done === 'function') {
                done()
            }
        },
        openDialog(){
            // console.log('freezeType',this.editType)
            ShipperConfigDetails(this.paramsView.shipperId).then(res => {
                this.formBlack =Object.assign({},res.data);
                this.formBlack.putBlackCauseName = this.optionsFormBlack.find(item => item.code === this.formBlack.putBlackCause)['name'];
                if(this.editType == 'edit'){
                    this.formBlack.popBlackRemark = '';
                }
            })
            // console.log('this.formBlack',this.formBlack)
        },
        getMoreInformation(){
            // 移入原因列表
            // DicBlackType().then(res=>{
            //     this.optionsFormBlack = res.data;
            // })
            this.$store.dispatch("GetInfoDic", "AF02004").then(res => {
                this.optionsFormBlack = res;
            });
        },
        // 提交数据
        onSubmit(){
        this.$refs['formBlack'].validate((valid)=>{
            if(valid){
                switch (this.editType){
                    case 'add' :
                        var forms= Object.assign({}, this.formBlack,{accountStatus:"AF0010503"})
                        let item =  forms.mobile;
                        this.$confirm('确定要将'+ item +' 货主移入黑名单吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                             BlackShipperConfig(forms).then(res=>{
                                this.$message({
                                    type: 'success',
                                    message: '该货主已被移入黑名单!',
                                })
                                this.close();
                            }).catch(err => {
                                this.$message.error('操作失败，失败原因：',err.text)
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                    case 'edit' :
                        var forms= Object.assign({}, this.formBlack,{accountStatus:"AF0010501"})
                        let itemMove =  forms.mobile;
                        this.$confirm('确定要将'+ itemMove +' 货主移出黑名单吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                             BlackShipperConfig(forms).then(res=>{
                                this.$message({
                                    type: 'success',
                                    message: '该货主已被移出黑名单!',
                                })
                                this.close();
                            }).catch(err => {
                                this.$message.error('操作失败，失败原因：',err.text)
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                }
            }
        })
    }
  }
}
</script>
<style lang="scss">
    .shipperBlackDialog{
    }
</style>



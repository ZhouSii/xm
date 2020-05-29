<template> 
    <div class="modifyCarMolib commoncss">
        <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini"><span >{{btntext}}</span ></el-button>
        <el-dialog :title="btntitle" :visible="driverTemplateDialogFlag" top=5vh :before-close="change" modal-append-to-body v-dialogDrag :closeOnClickModal='false'>
        <div>
        <el-form ref="templateModel" :model="templateModel" inline>
          <el-table
            :data="templateModel.aflcBusinessInformations"
            border
            ref="multipleTable"
            stripe
            align = "center"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="userStatusName" label="权益类型">
                            <template  slot-scope="scope">
                                    <el-select v-model="scope.row.userStatus" placeholder="请选择" @change = "complateName(scope.row.userStatus,scope.$index)">
                                        <el-option
                                        v-for="item in optionsBusinessInterests"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                           </template>
            </el-table-column>
            <el-table-column label="所属组">
                           <template  slot-scope="scope"> 
                                   <businessGroup  @inputObject = "getObject(scope.$index,$event)" v-model="scope.row.groupName" ref="businessGroup"/>
                           </template>
            </el-table-column>
            <el-table-column label="所属人">
                           <template  slot-scope="scope">
                                   <selectBelong :groupCode = "scope.row.groupCode" :belongSalesman = 'scope.row.belongSalesmanMobile' @returnBelong = '(value)=>{getReturnBelong(value,scope.$index)}'/>
                           </template>
            </el-table-column>
            </el-table>
        </el-form>
        </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="updata">增 加</el-button>
            <el-button type="primary" plain @click="driverTemplateDialogFlag = false">取 消</el-button>
          </div>
    </el-dialog>
    </div>
</template>

<script>
import { data_get_driverName_id,data_batchUpdateBusiness } from '@/api/users/carowner/all_car.js'
import { DicBusinessInterests } from '@/api/common.js'
import businessGroup from '@/components/selectTree/businessGroup'  
import selectBelong from '../shipper/selectBelong'
export default {
  name:'template-create-view-change',
    props:{
        params:{
        type:[Object,Array],
        },    
        value:{
            type: String,
            default:''
        },
        btntype: {
            type: String,
            default: ''
        },
        btntext: {
            type: String,
            default: ''
        },
        btntitle: {
            type: String,
            default: ''
        },
        icon:{
            type: String,
            default: ''
        },
        plain:{
            type: Boolean,
            default: false
        },
        /*add新增，edit编辑，view查看*/
        editType: {
            type: String,
            default: ''
        },
    },
    components:{
    businessGroup,
    selectBelong
    },
    data(){
       return{
       btnStatus:true,
       driverTemplateDialogFlag:false,    
       formLabelWidth:'150px',
       optionsBusinessInterests:[],//业务权益类型
       templateModel:{
           aflcBusinessInformations:[{
               userStatus:null,
               userStatusName:null,
               groupName:null,
               groupCode:null,
               belongSalesmanName:null,
               belongSalesman:null,
               belongSalesmanMobile:null,
           }
           ],
           driverId:[],
       }
       }
    },
    watch:{
        driverTemplateDialogFlag:{
        handler: function(val, oldVal) {
            if(!val){
            this.templateModel.aflcBusinessInformations = [{
               userStatus:null,
               userStatusName:null,
               groupName:null,
               groupCode:null,
               belongSalesmanName:null,
               belongSalesman:null,
               belongSalesmanMobile:null,
            }
            ],
            this.templateModel.driverId = []
            }
            else{
                this.getMoreInformation()
                this.btnStatus = true
            }
        }
        }
        },
    
   methods:{
        //打开
       openDialog(){
        if(!this.params)
        {
               this.$message.warning('请选择您要操作的用户');
               return false
        }
        else if(this.params.length == 0 ){
               this.$message.warning('请选择您要操作的用户');
               return
        }
        else{
            this.driverTemplateDialogFlag = true;
        }
        },
       getMoreInformation(){
        DicBusinessInterests().then(res => {
            this.optionsBusinessInterests = res.data.filter(el => {
            return el.name != '注册';
            })
            })
       },
        // 权益类型
        complateName(val,key){
                this.templateModel.aflcBusinessInformations[key].userStatusName =  this.optionsBusinessInterests.find(item => item.code ==  val)['name'];
        },
        // 所属组
        getObject(i,e){
               this.templateModel.aflcBusinessInformations[i].groupName = e.groupName
               this.templateModel.aflcBusinessInformations[i].groupCode = e.groupCode
        },
        // 所属人
        getReturnBelong(val,key){
               this.templateModel.aflcBusinessInformations[key].belongSalesmanName = val.name;
               this.templateModel.aflcBusinessInformations[key].belongSalesman = val.userId;
               this.templateModel.aflcBusinessInformations[key].belongSalesmanMobile = val.mobile;
        },
       //弹框控制
       change() {
            this.driverTemplateDialogFlag = false;
       },
       //确定
       updata(){
        if(this.btnStatus){
        this.btnStatus = false
        this.params.forEach(e=>{
            this.templateModel.driverId.push(e.driverId)
        })
        this.$message.info('增加中...')
        data_batchUpdateBusiness(this.templateModel).then(res=>{
            this.$message.success('增加成功')
            this.driverTemplateDialogFlag = false
            this.$emit('getData')
        }).catch(err=>{
            this.$message.error('增加失败')
            this.driverTemplateDialogFlag = false
        })
        }
       },
   },
   mounted(){

   }
}
</script>
            
<style lang="scss">
.modifyCarMolib{
        display: inline-block;
        .el-dialog{
        overflow: unset!important;
        width: 800px;
        max-height: inherit;
        }
}
</style>
            

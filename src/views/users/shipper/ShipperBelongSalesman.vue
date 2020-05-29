<template> 
    <div class="modifyCarMolib commoncss">
        <el-dialog  :title="ShipperBelongSalesmantitle" :visible="ShipperBelongSalesmanDialogFlag" :modal-append-to-body = 'false' :modal = 'false' :before-close="change" top="5vh" :close-on-click-modal="false" ref="dialog">
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
            <el-button type="primary" plain @click="change">取 消</el-button>
          </div>
    </el-dialog>
    </div>
</template>

<script>
import { data_batchUpdateBusinessShipper } from '@/api/users/shipper/all_shipper.js'
import { DicBusinessInterests } from '@/api/common.js'
import businessGroup from '@/components/selectTree/businessGroup'  
import selectBelong from '../shipper/selectBelong'
export default {
  name:'template-create-view-change',
    props:{
        params:{
        type:[Object,Array],
        },    
        ShipperBelongSalesmanDialogFlag:{
            type:Boolean,
            default:false
        },
        ShipperBelongSalesmantitle: {
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
           shipperId:[],
           
       }
       }
    },
    watch:{
        ShipperBelongSalesmanDialogFlag:{
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
            this.templateModel.shipperId = []
            }
            else{
                this.getMoreInformation()
                this.btnStatus = true
            }
        }
        }
        },
    
   methods:{
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
            this.$emit('update:ShipperBelongSalesmanDialogFlag', false);
       },
       //确定
       updata(){
        if(this.btnStatus){
        this.btnStatus = false
        this.params.forEach(e=>{
            this.templateModel.shipperId.push(e.shipperId)
        })
        this.$message.info('增加中...')
        data_batchUpdateBusinessShipper(this.templateModel).then(res=>{
            this.$message.success('增加成功')
            this.$emit('update:ShipperBelongSalesmanDialogFlag', false);
            this.$emit('getData')
        }).catch(err=>{
            this.$message.error('增加失败')
            this.$emit('update:ShipperBelongSalesmanDialogFlag', false);
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
            

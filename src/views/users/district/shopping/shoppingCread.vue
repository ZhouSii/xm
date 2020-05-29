<template>
     <div class="shoppingDialog commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini">{{btntext}}</el-button>
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle" top=5vh v-dialogDrag :closeOnClickModal='false'>
        <el-form ref="formAll" inline>
          <el-row>
          <el-col>
         <el-form-item label="商圈名称 ：">
                    <el-input disabled v-model="formAll[0].tradeName"></el-input>
          </el-form-item>     
          </el-col>      
          </el-row>          
          <el-row>
            <el-col :span="24">
                <div class="manageShopping_table" v-for="(form,keys) in formAll" :key='keys'>
                 <div v-if="keys == 0" class="manageShopping_tr">
                     <div class="manageShopping_th table_w1">序号</div>
                     <div class="manageShopping_th table_w2">分类名称</div>
                     <div class="manageShopping_th table_w3">分类简要说明</div>
                     <div class="manageShopping_th table_w4">货物名称</div>
                     <div class="manageShopping_th table_w5">分类单位</div>
                     <div class="manageShopping_th table_w6">体积（方）</div>
                     <div class="manageShopping_th table_w7">重量(KG)</div>
                     <div class="manageShopping_th table_w8">上传分类简图</div>
                     <div class="manageShopping_th table_w9">与标准分类比例</div>
                     <div class="manageShopping_th table_w10">操作</div>
                 </div>
                 <div class="manageShopping_tr">
                     <div class="manageShopping_td table_w1" @click="changeInput(keys)">
                         {{keys+1}}
                      </div>
                     <div class="manageShopping_td table_w2">
                         <el-input v-model="formAll[keys].categoryName" maxlength="20"> </el-input>
                     </div>
                     <div class="manageShopping_td table_w3">
                         <el-input v-model="formAll[keys].categoryDesc" maxlength="50"> </el-input>
                     </div>
                     <div class="manageShopping_td table_w4">
                         <el-input v-model="formAll[keys].goodsName" maxlength="20"> </el-input>
                     </div>
                     <div class="manageShopping_td table_w5">
                    <el-select v-model="formAll[keys].categoryUnit" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in unitList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled"
                            >
                        </el-option>
                    </el-select>
                     </div>
                     <div class="manageShopping_td table_w6">
                         <el-input v-model="formAll[keys].volume"> </el-input>
                     </div>
                     <div class="manageShopping_td table_w7">
                         <el-input v-model="formAll[keys].weight"> </el-input>
                     </div>
                     <div class="manageShopping_td table_w8">
                   <span >
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="formAll[keys].uploadCategoryDiagrams"/>
                    <!-- <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="formAll[keys].uploadCategoryDiagrams"  @fileNmeChange = 'fileNmeChange' /> -->
                   </span>
                     </div>
                     <div class="manageShopping_td table_w9">
                         <span v-if="keys == 0">标准分类</span>
                         <span v-else><el-input v-model="formAll[keys].standardProportion"></el-input></span>
                     </div>
                     <div class="manageShopping_td Item_position table_w10">
                         <span  class="addItem" @click="addItem()" v-if="keys==0"> </span><span  class="reduceItem" @click="reduceItem(keys)" v-else> </span>
                     </div>
                 </div>
                </div>
            </el-col>   
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add_data">确 定</el-button>
          <el-button type="primary" @click="close()">取 消</el-button>
        </div>
      </el-dialog>
      </div>
</template>
<script>
import {data_get_aflcTradeArea_Id,data_get_unitList,aflcGoodscategorySetting,aflcGoodscategorySettingTrade} from '@/api/users/district/shoppingDistrict.js'
import GetCityList from '@/components/GetCityList/city'
import ShoppingMap from '@/components/map/shoppingMap'
import { eventBus } from '@/eventBus'
import Upload from '@/components/Upload/singleImage4'
export default {
  props:{
    params:{
      type:[Object,String,Array,Number],
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
  },
  data(){
        return{
        btnStatus: true,
        selectFlag:null,
        dialogFormVisible_add: false,
        formLabelWidth:'200px',
        selectIndex:null,
        formAll:[{
            categoryName:null,
            categoryDesc:null,
            goodsName:null,
            categoryUnit:null,
            volume:null,
            weight:null,
            uploadCategoryDiagrams:null,
            standardProportion:'标准分类',
            tradeId:null,
            tradeName:null,
            }],
       unitList:[],
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
                
            }
            else{
            this.btnStatus = true
            }
        },
    },
  },
  mounted(){
   this.getInformation()
  },
  components:{
    Upload
  },
  methods:{
   openDialog:function(){
          if(!this.params.length){
               this.$message.warning('请选择您要操作的商圈');
               return
          }
          else if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的商圈');
               return false
          }else if (this.params.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
                return false
          }
          else{
          this.formAll[0].tradeId = this.params[0].id
          this.formAll[0].tradeName = this.params[0].tradeName
          aflcGoodscategorySettingTrade(this.params[0].id).then(res=>{
            if(res.data.length>0){
                this.formAll = res.data
            }
            else{
            this.formAll = [{
            categoryName:null,
            categoryDesc:null,
            goodsName:null,
            categoryUnit:null,
            volume:null,
            weight:null,
            uploadCategoryDiagrams:null,
            standardProportion:'标准分类',
            tradeId:this.params[0].id,
            tradeName:this.params[0].tradeName,
            }]
            }
        })
          this.dialogFormVisible_add = true;
          }
   },
   change:function(){
      this.dialogFormVisible_add = false;
   },
   close:function(){
      this.dialogFormVisible_add = false;
       },
   changeList(){
            eventBus.$emit('pushListtwo')
    },
    // 增加分类
    addItem(){
            if(this.editType=='view'){
            return false
            }else{        
           this.formAll.push({
            categoryName:null,
            categoryDesc:null,
            goodsName:null,
            categoryUnit:null,
            volume:null,
            weight:null,
            uploadCategoryDiagrams:null,
            standardProportion:null,
            tradeId:this.params[0].id,
            tradeName:this.params[0].tradeName,
            })
            }
        },    
    // 减少分类
    reduceItem(i){
            if(this.formAll.length>1){
            this.formAll.splice(i,1);
            }
            else{
                return
        }
    },  
    // 获取分类列表
    getInformation(){
        data_get_unitList().then(res=>{
            this.unitList = res.data
        }) 
    },
   completeData(){
    for(var i=0;i<this.formAll.length;i++){
        let reg= /^[+]?(0|([1-9]\d*))(\.\d+)?$/  //输入正则
    if(!this.formAll[i].categoryName){
     this.$message.warning('第'+(i+1)+'条分类名称都不能为空');
     return false
    }
    if(!this.formAll[i].goodsName){
     this.$message.warning('第'+(i+1)+'条货物名称都不能为空');
     return false
    }
    if(!this.formAll[i].categoryUnit){
     this.$message.warning('第'+(i+1)+'条分类单位都不能为空');
     return false
    }
    if(!this.formAll[i].volume){
     this.$message.warning('第'+(i+1)+'条体积都不能为空');
     return false
    }
    if(!this.formAll[i].weight){
     this.$message.warning('第'+(i+1)+'条重量都不能为空');
     return false
    }    
    if(!reg.test(this.formAll[i].volume)){
     this.$message.warning('第'+(i+1)+'条体积必须数字');
     return false
    }
    if(!reg.test(this.formAll[i].weight)){
     this.$message.warning('第'+(i+1)+'条重量必须数字');
     return false
    }
    if(parseFloat(this.formAll[i].volume)<=0){
     this.$message.warning('第'+(i+1)+'条体积必须大于0');
     return false
    }
    if(parseFloat(this.formAll[i].weight)<=0){
     this.$message.warning('第'+(i+1)+'条重量必须大于0');
     return false
    }
    if(!this.formAll[i].uploadCategoryDiagrams){
     this.$message.warning('第'+(i+1)+'条上传分类简图都不能为空');
     return false
    }
    if(!this.formAll[i].standardProportion){
     this.$message.warning('第'+(i+1)+'条与标准分类比例都不能为空');
     return false
    }
    if(parseFloat(this.formAll[i].standardProportion)<=0&&i>0){
     this.$message.warning('第'+(i+1)+'条与标准分类比例必须大于0');
     return false
    }
    if(!reg.test(this.formAll[i].standardProportion)&&i>0){
     this.$message.warning('第'+(i+1)+'条与标准分类比例必须数字');
     return false
    }

    }
   },
   add_data(){
    if(this.completeData()==false)
    {
    return
    }  
    else{
    if(this.btnStatus){
    this.btnStatus = false
    this.$message.info('新增中...')
    aflcGoodscategorySetting(this.formAll).then(res=>{
           this.$message.success('新增成功');
           this.changeList();
           this.dialogFormVisible_add = false;     
    }).catch(err=>{
           this.$message.error('新增失败')
           this.driverTemplateDialogFlag = false;
    })
    }    
    }    
   }
  }
}
</script>


<style lang="scss">
.shoppingDialog{
     display: inline-block;
        .el-dialog{
         width: 1200px!important;
     }
        .manageShopping_table{
            width: 100%;
            border-left: 1px solid #d0d7e5;
            &:nth-of-type(1){
            border-top: 1px solid #d0d7e5;
            }
            .Item_position{
                position: relative;
                .addItem{
                    top: 7px;
                    left:40%;
                }                
                .reduceItem{
                    top: 7px;
                    left:40%;
                }
            }
            .manageShopping_tr{
             height: 40px;
             line-height: 40px;
             overflow: hidden;
             border-bottom: 1px solid #d0d7e5;
            }
            .manageShopping_th{
            float: left;
            display: inline-block;
            background: #EAF0FF;
            text-align: center;
            border-right: 1px solid #d0d7e5;
           }
            .manageShopping_td{
            float: left;
            display: inline-block;
            text-align: center;
            border-right: 1px solid #d0d7e5;   
            box-sizing: border-box;
            .el-cascader{
                width: 100%;
            }
            .el-input{
                width:100%;
            }
            .el-input__inner{
                text-align: center;
                height: 35px;
                line-height: 35px;
            }
           }
            .viewWidth{width: 100%;display: inline-block;
                    a{
                        color: #409EFF
                    }
           }
           .table_w1{width: 5%}
           .table_w2{width: 12%}
           .table_w3{width: 10%}
           .table_w4{width: 12%}
           .table_w5{width: 10%}
           .table_w6{width: 10%}
           .table_w7{width: 10%}
           .table_w8{width: 11%;height: 40px;
           img{width: 60%;height: 100%}
           }
           .table_w9{width: 10%}
           .table_w10{width: 10%;height: 40px;}
           .table_w11{width: 20%;}
        }
}
.info_news .shoppingDialog .el-button{
        padding: 0px 15px 0px;
}
</style>

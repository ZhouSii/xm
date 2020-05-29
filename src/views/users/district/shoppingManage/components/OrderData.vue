<template>
    <div class="detailsInfo detailsArrange" v-loading="loading">
    <!-- 订单数据量 -->
    <div class="detailsInfo-collapse collapseInfo" style="padding-top: 18px">
            <h2 >订单数据量</h2>
            <div class="essentialInformation_table">
            <el-form inline  class="demo-ruleForm classify_searchinfo">
                <el-form-item >
                    <el-date-picker
                        v-model="chooseTime"
                        @change="timeVal"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        unlink-panels
                        align="right"
                        :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-form-item>
                </el-form>
                <el-table border style="width: 100%">
                    <el-table-column prop="" label="统计项" ></el-table-column>
                    <el-table-column prop="" label="1" ></el-table-column>
                    <el-table-column prop="" label="2" ></el-table-column>
                    <el-table-column prop="" label="3"></el-table-column>
                    <el-table-column prop="" label="4" ></el-table-column>
                    <el-table-column prop="" label="5" ></el-table-column>
                    <el-table-column prop="" label="6" ></el-table-column>
                    <el-table-column prop="" label="7" ></el-table-column>
                    <el-table-column prop="" label="8" ></el-table-column>
                    <el-table-column prop="" label="9" ></el-table-column>
                    <el-table-column prop="" label="10" ></el-table-column>
                    <el-table-column prop="" label="11" ></el-table-column>
                    <el-table-column prop="" label="12" ></el-table-column>
                    <el-table-column prop="" label="13" ></el-table-column>
                    <el-table-column prop="" label="14" ></el-table-column>
                    <el-table-column prop="" label="15" ></el-table-column>
                    <el-table-column prop="" label="16" ></el-table-column>
                    <el-table-column prop="" label="17" ></el-table-column>
                    <el-table-column prop="" label="18" ></el-table-column>
                    <el-table-column prop="" label="19" ></el-table-column>
                    <el-table-column prop="" label="20" ></el-table-column>
                    <el-table-column prop="" label="21" ></el-table-column>
                    <el-table-column prop="" label="22" ></el-table-column>
                    <el-table-column prop="" label="23" ></el-table-column>
                    <el-table-column prop="" label="24" ></el-table-column>
                    <el-table-column prop="" label="25" ></el-table-column>
                    <el-table-column prop="" label="26" ></el-table-column>
                    <el-table-column prop="" label="27" ></el-table-column>
                    <el-table-column prop="" label="28" ></el-table-column>
                    <el-table-column prop="" label="29" ></el-table-column>
                    <el-table-column prop="" label="30" ></el-table-column>
                    <el-table-column prop="" label="31" ></el-table-column>
                </el-table>
            </div>
    </div>    
        <!-- 订单数据量 -->
    <div class="logInfo-collapse collapseInfo">
            <h2>订单数据量</h2>
            <div class="essentialInformation_table">
                <el-form inline  class="demo-ruleForm classify_searchinfo">
                <el-form-item style="margin-right:10px;">
                <ul class="timeLine">
                    <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,item.value)"><span>{{item.name}}</span> </li>
                </ul>
                </el-form-item>
                <el-form-item v-if="formAll.timeQueryType == '3'">
                    <el-date-picker
                        v-model="chooseTime"
                        @change="timeVal"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        unlink-panels
                        align="right"
                        :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-form-item>
                </el-form>
                <el-table border style="width: 100%">
                    <el-table-column prop="" label="下单总数" ></el-table-column>
                    <el-table-column prop="" label="下单总金额（元）" ></el-table-column>
                    <el-table-column prop="" label="完成单数" ></el-table-column>
                    <el-table-column prop="" label="完成单金额（元）"></el-table-column>
                    <el-table-column prop="" label="取消单数" ></el-table-column>
                    <el-table-column prop="" label="取消单金额（元）" ></el-table-column>
                    <el-table-column prop="" label="成交量" ></el-table-column>
                </el-table>
            </div>
    </div> 
    </div>
</template>
<script>
var map = {}
import { data_get_aflcTradeAreaDetail } from '@/api/users/district/shoppingManage.js'
import { parseTime, pickerOptions2 } from '@/utils/index.js'
export default {
  name: 'OrderData',
  components: {
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }
  }, 
  data() {
    return {
        loading:false,
        formAll:{
            timeQueryType:'1'
        },
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        chooseTime:[],
        pickerOptions2: {
                shortcuts: pickerOptions2
        },
        dataType:[
                {name:'本月',value:'1',iscur:true},
                {name:'上月',value:'2',iscur:false},
                {name:'指定时间段',value:'3',iscur:false},
        ],
    }
  },
  watch:{
      isvisible:{
          handler(newVal,oldVal){
          },
          immediate: true
      }
  },
  methods:{
    shipperDetail(){
        this.$router.push({ name: '货主数据管理'})
    },
    firstblood(){

    },
    setCur(index,value){
        this.dataType.forEach((el,idx)=>{
            idx == index ? el.iscur = true : el.iscur = false;
            })
            console.log('d',value)
            this.formAll.timeQueryType = value;
            this.firstblood()
    },
    timeVal(i){

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
        .timeLine{
            overflow: hidden;
            padding-top: 2px;
            .currentClick{
                color:#1890ff;
            }
            li{
                float: left;
                font-size: 16px;
                cursor: pointer;
                span{
                    border-right: 1px solid #000 ;
                    padding:0 10px;
                };
            }
            li:last-child span{
                border-right: 0 none;
            }
        }
</style>

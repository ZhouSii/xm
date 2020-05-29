<template>
 <div class="identicalStyle totalSource" style="height:100%" >
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label='出发地'>
            <vregion :ui="true"  @values="regionChange1" class="form-control" ref="vregionStart">
                <el-input v-model="areaName1" placeholder="请选择" ></el-input>
            </vregion>
            </el-form-item>
            <el-form-item label='到达地'>
            <vregion :ui="true"  @values="regionChange2" class="form-control" ref="vregionEnd">
                <el-input v-model="areaName2" placeholder="请选择" ></el-input>
            </vregion>
            </el-form-item>
            <el-form-item label='货物名称'>
             <el-input v-model="formAllData.goodsTypeName" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" prop="createTime">
                    <el-date-picker
                        is-range
                        unlink-panels
                        :picker-options="pickerOptions2"
                        type="daterange"
                        align="right"
                        v-model="createTime"
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="timestamp"
                        :default-time="['00:00:00', '23:59:59']"
                        @change='cTime'
                        >
                    </el-date-picker>
            </el-form-item>
            <el-form-item  label="订单类型：">
                   <el-select v-model="formAllData.orderType" clearable placeholder="请选择">
                        <el-option
                          v-for="item in orderTypeList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                          >
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label='货源单号'>
             <el-input v-model="formAllData.orderSerial"></el-input>
            </el-form-item>
         <el-form-item class="fr">
         <el-button type="primary"  plain  @click="getdata_search()" :size="btnsize" icon="el-icon-search">查询</el-button>
         <el-button type="primary"  plain  @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
         </el-form-item> 
          </el-form>
            <div class="classify_info">
            <div class="info_news">
            <el-table ref="multipleTable" style="width: 100%" stripe border height="99%" highlight-current-row :data="tableDataTree" id="out-table" @selection-change="getSelection" @row-click="clickDetails">
              <el-table-column
                            label="选择"
                            type="selection"
                            width="50">
              </el-table-column>
              <el-table-column label="序号"  width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column>
            <el-table-column  label="货源单号" prop="orderSerial" sortable show-overflow-tooltip width="250">
            <template  slot-scope="scope">
             <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span>
            </template>
            </el-table-column>    
            <el-table-column  label="出发地" prop="" sortable show-overflow-tooltip width="170">
             <template  slot-scope="scope">
             <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.viaAddressName1}}</span>
            </template>
            </el-table-column>
            <el-table-column  label="到达地" prop="viaAddressName2" sortable show-overflow-tooltip width="170"></el-table-column>      
            <el-table-column  label="订单类型" prop="orderTypeName" sortable show-overflow-tooltip width="100"></el-table-column>           
            <el-table-column  label="货物名称" prop="goodsTypeName" sortable show-overflow-tooltip></el-table-column>
            <el-table-column  label="总数量" prop="goodsNum" sortable show-overflow-tooltip width="80"></el-table-column>
            <el-table-column  label="预估总重量（公斤）" prop="goodsWeight" sortable show-overflow-tooltip width="160"></el-table-column>
            <el-table-column  label="预估总体积（方）" prop="goodsVolume" sortable show-overflow-tooltip width="160"></el-table-column>
            <el-table-column  label="浏览次数" prop="browseNumber" sortable show-overflow-tooltip width="90"></el-table-column>     
            <el-table-column  label="查看抢单人" sortable width="110">
             <template  slot-scope="scope">
             <span class="BtnInfo" @click="pushOrderSerial3(scope.row)">查看抢单人<span class="RedCss">({{scope.row.interestedCount}})</span></span>
            </template>
            </el-table-column>
            <el-table-column  label="货源状态" prop="operateStateName" sortable width="90"></el-table-column>
            <el-table-column  label="处理状态" prop="dealStateName" sortable width="90"></el-table-column>
            <el-table-column  label="发布时间" prop="useTime" sortable width="160"></el-table-column>
            <el-table-column  label="来源" prop="orderFromName" sortable width="100"></el-table-column>  
            </el-table>
    <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>
             </div>
    </div>
 </div> 

</template>

<script>
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import {getDictionary} from '@/api/common.js'
import {findFCLOrderInfoList} from '@/api/order/logistics/logistics.js'
import {OrderSoldIn,OrderSoldOut,deletePointNetwork} from '@/api/order/userIssue/userIssue.js'
import vregion from '@/components/vregion/Region'
export default {
    props:{
    status:{
        type:Object,
    },
    isshow:{
        type:Boolean,
    }

    },
    data(){
        return{
            loading:true,
            btnsize: 'mini',
            pickerOptions2:{shortcuts:pickerOptions2},
            tableDataTree:[],
            dataTotal:null,
            sizes:[20,50,100],
            pagesize:20,//每页显示数
            page:1,//当前页
            areaName1:null,
            areaName2:null,
            createTime:null,
            formAllData:{
                orderDataType:'1',
                startProvinceCityArea:null,
                endProvinceCityArea:null,
                goodsTypeName:null,
                startUseTime : null,
                endUseTime : null,
                orderType:null,

            },
            selectRowData:[],
            orderTypeList:[{code: null,name: '全部'}],
            }
    },
    components:{
        Pager,
        vregion
    },
    watch:{
    isshow: {
             handler(newVal, oldVal) {
                    if(newVal){
                        this.firstblood();
                    }
                },
            },
    },
    methods:{
            // 出发地
            regionChange1(d){
                this.areaName1 = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                if(d.area){
                    this.formAllData.startProvinceCityArea = d.area.name;
                }else if(d.city){
                    this.formAllData.startProvinceCityArea = d.city.name;
                }else{
                    this.formAllData.startProvinceCityArea = d.province ? d.province.name :'';
                }
                },
            // 到达地
            regionChange2(d){
                this.areaName2 = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                if(d.area){
                    this.formAllData.endProvinceCityArea = d.area.name;
                }else if(d.city){
                    this.formAllData.endProvinceCityArea = d.city.name;
                }else{
                    this.formAllData.endProvinceCityArea = d.province ? d.province.name :'';
                }
            },
            getValue(obj){
                return obj ? obj.value:'';
            },
            // 列表
            firstblood(){
              findFCLOrderInfoList(this.page,this.pagesize,this.formAllData).then(res=>{   
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
                     this.tableDataTree.forEach(item => {
                        item.useTime = parseTime(item.useTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        if(item.orderAddressList.length>0){
                        item.viaAddressName1= item.orderAddressList[0].provinceCityArea
                        item.viaAddressName2= item.orderAddressList[1].provinceCityArea     
                        }
                        else{
                        item.viaAddressName1 = null
                        item.viaAddressName2 = null
                        } 
                    })
              })
            },
            // 获取对应的字典列表
            getMoreInformation(){
             getDictionary('AF017').then(res=>{
                res.data.forEach((item,i)=>{
                 if(i>0){
                 this.orderTypeList.push(item)
                 }
                })      
             })
            },
            // 页码改变
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            cTime(i){
                if(i!==null){
                this.formAllData.startUseTime = i[0]/1000
                this.formAllData.endUseTime = i[1]/1000
                }
                else{
                this.formAllData.startUseTime = null
                this.formAllData.endUseTime = null
                }                   
            },
            ArrayData(){
            let selectArray = [];
            this.selectRowData.forEach(i=>{
                selectArray.push(i.orderSerial)
            })
            return selectArray
            },  
            // 查询
            getdata_search(){
            this.page = 1;
            this.$refs.pager.inputval = this.page;
            this.$refs.pager.pageNum = this.page;
            this.firstblood();
            },
            // 清空
            clearSearch(){
                this.formAllData = {
                orderDataType:'1',
                startProvinceCityArea:null,
                endProvinceCityArea:null,
                goodsTypeName:null,
                startUseTime : null,
                endUseTime : null,
                orderType:null,
                orderSerial:null,
                }
                this.areaName1 = null
                this.areaName2 = null
                this.createTime = null
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.firstblood();
                this.$refs.vregionStart.clear()
                this.$refs.vregionEnd.clear()
            },
            // 判断选中与否
            getSelection(val) { 
            console.log('选中内容', val)
            this.selectRowData = val
            },
            // 点击选中当前行
            clickDetails(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection(row)
            },
            pushOrderSerial(val){
            this.$router.push({name: '货源详情',query:{ orderSerial:val.orderSerial,type:'sourceDetail'}});
            },
            pushOrderSerial3(val){
            this.$router.push({name: '货源详情',query:{ orderSerial:val.orderSerial,type:'RobberyDetail'}});
            }
    },
    mounted(){
        this.getMoreInformation()
        this.firstblood()
    }
}
</script>

<style lang="scss">
.totalSource{
    .BtnInfo{
    font-weight: bold;
    font-size: 14px;
    color: #3e9ff1;
    cursor: pointer;
    }  
    .el-form-item{
    &:nth-of-type(1){
        label{
            text-indent: 13px;
        }
    }
    }
}
</style>


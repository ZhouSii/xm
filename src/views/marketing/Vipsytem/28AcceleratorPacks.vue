<template>
    <div class="TwoColumns AcceleratorPacks clearfix">
        <div class="columnsContainer">
            <div class="side_left">
                <div class="side_left_top">
                        <el-tree
                        ref="treeForm"
                        show-checkbox
                        :data="cityTree"
                        node-key="code"
                        :default-expanded-keys="[440000]"
                        :default-checked-keys="[formAll.cityCode]"
                        :props="defaultProps"
                        :check-strictly="treestatus"
                        :default-expand-all='treestatus'
                        :highlight-current = "true"
                        @check="nodeClick"
                        v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_BUY_PACKAGE_LIST
                        >
                        </el-tree>
                </div>
            </div>
            <div class="side_right">
                <div class="side_right_bottom clearfix">
                    <div class="info_news">
                    <div class="btns_box">
                    <addAcceleratorPacks
                    btntext="新增"
                    :CityCode = 'formAll.cityCode'
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-circle-plus"
                    editType="add"
                    @getData="getDataList"
                    v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_BUY_PACKAGE_ADD
                    btntitle="创建">
                    </addAcceleratorPacks>
                    <addAcceleratorPacks
                    :CityCode = 'formAll.cityCode'
                    btntext="修改"
                    :plain="true"
                    :params = 'selectRowData'
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-edit"
                    @getData="getDataList"
                    editType="edit"
                    v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_BUY_PACKAGE_UPDATE
                    btntitle="修改">
                    </addAcceleratorPacks>
                     </div>
                         <el-table
                            ref="multipleTable"
                            :data='tableDataTree'
                            @selection-change="getSelection"
                            @row-click="clickDetails"
                            highlight-current-row
                            stripe
                            border
                            height="94%"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column label="选择" type="selection" width="50"></el-table-column>
                            <el-table-column label="序号" width="80px">
                                <template slot-scope="scope">
                                    {{ (page - 1)*pagesize + scope.$index + 1 }}
                                </template>
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="quilckpackageName"
                            label="加速包名称"
                            show-overflow-tooltip
                            >
                            </el-table-column> 
                            <el-table-column
                            sortable
                            prop="quilckpackageMultiple"
                            label="加速倍数">
                            </el-table-column> 
                            <el-table-column
                            sortable
                            prop="purchasingPrice"
                            label="购买金额">
                            </el-table-column> 
                            <el-table-column
                            sortable
                            prop="quickDay"
                            label="加速天数">
                            </el-table-column> 
                            <el-table-column
                            sortable
                            prop="purchasePeriod"
                            label="购买期限">
                            </el-table-column>  
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 页码 -->
         <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>
    </div>
</template>

<script type="text/javascript">
import { aflcProvinceCode } from '@/api/common.js'
import {parseTime} from '@/utils/'
import Pager from '@/components/Pagination/index'
import addAcceleratorPacks from './components/addAcceleratorPacks.vue'
import  { aflcQuickpackageSettings } from '@/api/marketing/AcceleratorPacks.js'
export default{
      data() {
          return {
            cityTree:[],
            treestatus:false,
            defaultProps: {
                    children: 'children',
                    label: 'name'
            },
            btnsize: 'mini',
            sizes: [20, 50, 100, 400],
            cityName: '', // 省级列表
            pagesize:20,//每页显示数
            page:1,//当前页
            dataTotal:null,
            tableDataTree:[],
            selectRowData:{},
            formAll:{
                cityCode:440100,
            }
            }
        },
      components: {
          Pager,
          addAcceleratorPacks
        },
        mounted() {
            this.firstblood()
            this.getMoreInformation()
        },
      methods: {
            // 刷新页面
            firstblood() {      
            aflcQuickpackageSettings(this.page,this.pagesize,this.formAll).then(res=>{
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
            })
            },
            getMoreInformation(){
                aflcProvinceCode().then(res=>{
                    this.cityTree = res.data;
            })
            },
            nodeClick(data){
            if(this.formAll.cityCode==data.code){
            this.$refs.treeForm.setCheckedNodes([])
            this.formAll.cityCode = null
            }
            else{
            this.formAll.cityCode = data.code
            this.$refs.treeForm.setCheckedNodes([data])
            }
            this.firstblood();
            },
            getDataList(){
                this.firstblood()
                this.$refs.multipleTable.clearSelection();
            },
            // 判断选中与否
            getSelection(val){
            console.log('选中内容',val)
            this.selectRowData = val;
           },
            //点击选中当前行
            clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
            },
            // 每页显示数据量变更
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
        }
    }
</script>

<style type="text/css" lang="scss">
    .AcceleratorPacks{
        height:100%;    
        position: relative;
        margin-left:7px;
        padding-bottom: 40px;
        .side_left{
        height: 100%;
        position: relative;
            .side_left_top{
             height:99%;
             overflow-y: auto;
             overflow-x: hidden;
             }
        }
        .el-tree-node__content{
        .el-checkbox{
            display: none;
        }
        }
        .el-tree-node__children{
            .el-checkbox{
                display: block
            }
        }
        .BtnInfo{
        font-weight: bold;
        font-size: 14px;
        color: #3e9ff1;
        cursor: pointer;
        }   
        }
</style>

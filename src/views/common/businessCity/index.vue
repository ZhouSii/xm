<template>
    <div class="TwoColumns businessCity clearfix">
        <div class="columnsContainer">
            <div class="side_left">
                <div class="side_left_top">
                 <el-tree
                 ref="treeForm"
                 show-checkbox
                :data="cityTree"
                 node-key="code"
                :props="defaultProps"
                :check-strictly="treestatus"
                :default-expand-all='treestatus'
                :highlight-current = "true"
                @check="nodeClick"
                >
                </el-tree>
                </div>
                <div class="side_left_bottom">
                    <el-button type="primary" plain @click="Add_getData" :size="btnsize" icon="el-icon-circle-plus">新增</el-button>
                </div>
            </div>
            <div class="side_right">
                <div class="side_right_bottom clearfix">
                    <div class="info_news">
                        <el-table
                            ref="multipleTable"
                            :data="tableDataTree"
                            stripe
                            border
                            height="100%"
                            :default-sort = "{prop: 'areaName', order: 'descending'}"
                            tooltip-effect="dark"
                            style="width: 100%"> 
                            <el-table-column label="序号" width="80px">
                                <template slot-scope="scope">
                                    {{ (page - 1)*pagesize + scope.$index + 1 }}
                                </template>
                            </el-table-column>  
                            <el-table-column
                            sortable
                            prop="name"
                            label="开通城市">
                            <template  slot-scope="scope">
                            <span class="BtnInfo" @click="showMap(scope.row)">{{scope.row.name}}</span >
                            </template>
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="code"
                            label="城市Code">
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="createTime"
                            label="开通时间">
                            </el-table-column>    
                            <el-table-column
                            sortable
                            prop="updater"
                            label="上次检查结果">
                            </el-table-column>    
                            <el-table-column
                            sortable
                            prop="updateTime"
                            label="上次检查时间">
                            </el-table-column>              
                            <el-table-column label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button
                                    :size="btnsize"
                                    plain
                                    type="primary"
                                    @click="handleClick(scope.row)">初始化检查</el-button>
                                </template>
                            </el-table-column>        
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 页码 -->
         <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>     
   <!-- <citymap :popVisible.sync="popVisible"  :fromData = 'MapAraay'/> -->

        <CheckOut  :dialogFormVisible.sync = 'dialogFormVisible'  :cityId = 'checkCityId'/>
    </div>
</template>

<script type="text/javascript">
import { data_getProvinceList,data_GetCityList } from '@/api/common.js'
import { data_CityList,data_AddCity,data_CityCode } from '@/api/company/businessCity.js'
import Pager from '@/components/Pagination/index'
import CheckOut from './checkOut'
import { parseTime } from '@/utils/'
import '@/styles/dialog.scss'
import '@/styles/side.scss'

export default{
      data() {
          return {
              dialogFormVisible:false,//初始化检查
              checkCityId:'',
              MapAraay:[],
              popVisible:false,
              treestatus:false,
              cityTree:[],
              btnsize: 'mini',
              sizes: [20, 50, 100, 400],
              cityName: '', // 省级列表
              pagesize:20,//每页显示数
              page:1,//当前页
              totalCount:null,
              dataTotal:null,
              tableDataTree: [],
              defaultProps: {
                  children: 'children',
                  label: 'name'
              },
              fromData:{
              cityCode:null,
              cityName:null,
              provinceCode:null,
              provinceName:null,
              },
              citystName:null,
            }
        },
      components: {
          Pager,
          CheckOut
        },
        mounted() {
            this.firstblood()
            this.getMoreInformation()
        },
        updated(){
            this.cityTree.forEach(item=>{
                if(item.name=='北京市'){
                    item.children = [{
                        name:'北京市',
                        code:'110100',
                    }]
                }
                if(item.name=='天津市'){
                    item.children = [{
                        name:'天津市',
                        code:'120100',
                    }]
                }
                if(item.name=='上海市'){
                    item.children = [{
                        name:'上海市',
                        code:'310100',
                    }]
                }
                if(item.name=='重庆市'){
                    item.children = [{
                        name:'重庆市',
                        code:'500100',
                    }]
                }
                if(item.name=='台湾省'){
                    item.children = [{
                        name:'台湾',
                        code:'710000',
                    }]
                }
                if(item.name=='香港特别行政区'){
                    item.children = [{
                        name:'香港特别行政区',
                        code:'810000',
                    }]
                }
                if(item.name=='澳门特别行政区'){
                    item.children = [{
                        name:'澳门特别行政区',
                        code:'820000',
                    }]
                }                                
                else{
                    data_GetCityList(item.code).then(res=>{
                        if(res.data)
                        {
                            item.children = res.data.list;
                        }
                    })
                }
     
            })
       },
      methods: {
            showMap(e) {
            //   data_CityCode(e.code).then(res=>{
            //       this.MapAraay=[]
            //     res.data.map(data=>{
            //         this.MapAraay.push(JSON.parse(data))
            //     })
            //   })
            //   this.popVisible = true;
            this.$router.push({name: '业务城市围栏',query:{code:e.code,city:e.name}});

            },
            // 刷新页面
            firstblood() {
                data_CityList(this.page,this.pagesize,{}).then(res=>{
                    this.dataTotal = res.data.length
                    this.tableDataTree = res.data;
                    this.loading = false;
                    this.tableDataTree.forEach(item => {
                        item.createTime = parseTime(item.createTime);
                        item.updateTime = parseTime(item.updateTime);
                    })
                })                
            },
            getMoreInformation(){
                data_getProvinceList().then(res=>{
                    if(res.text == '请求成功' && res.data.list.length >0 ){
                        this.cityTree = res.data.list.map(el => {
                            el.children = []
                            return el
                        });
                    }else{
                        this.cityTree = null;
                    }
                })
            },
            nodeClick(data,checked,node,gg){
                if(this.citystName==data.name){
                    this.citystName=null
                    this.fromData={
                        cityCode:null,
                        cityName:null,
                        provinceCode:null,
                        provinceName:null,
                    }
                    this.$refs.treeForm.setCheckedNodes([])
                }
                else{
                this.citystName=data.name
                this.fromData={
                    cityCode:this.$refs.treeForm.getNode(data.code).data.code,
                    cityName:this.$refs.treeForm.getNode(data.code).data.name,
                    provinceCode:this.$refs.treeForm.getNode(data.code).parent.data.code,
                    provinceName:this.$refs.treeForm.getNode(data.code).parent.data.name,
                }
                this.$refs.treeForm.setCheckedNodes([data])
                }
            },
            // 新增
            Add_getData(){
                var _this = this
                if(!this.fromData.cityName){
                    this.$message.info('请选中要添加的业务城市')
                }
                else{
                   this.$confirm('确定新增业务城市"'+this.fromData.cityName+'"?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                data_AddCity(_this.fromData).then(res=>{
                       this.$message.success('新增成功')
                            this.firstblood()
                        }).catch(res=>{
                            this.$message.error(res.data)
                            this.firstblood()
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })  
                }
            },
            // 每页显示数据量变更
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            handleClick(row){
                this.dialogFormVisible = true;
                this.checkCityId = row.code;
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .businessCity{
        height:100%;    
        position: relative;
        margin-left:7px;
        padding-bottom: 40px;
        .side_left{
        height: 100%;
        position: relative;
            .side_left_top{
             height:90%;
             overflow-y: auto;
             overflow-x: hidden;
             }
            .side_left_bottom{
             position: absolute;
             bottom: 10px;
             right: 10px;
             vertical-align: bottom
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

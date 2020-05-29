<template>
    <div class="PointNetwork identicalStyle"  v-loading="loading">
        <el-form :inline="true" :model="logisticsForm" ref="ruleForm"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="网点名称" prop="pointName">
                <el-input v-model="logisticsForm.pointName">
                </el-input>
            </el-form-item>
            <el-form-item label="网点地址：" prop="address">
                <el-input v-model="logisticsForm.address">
                </el-input>
            </el-form-item>
            <el-form-item label="联系人：" maxlength="18"  prop="name">
                <el-input v-model="logisticsForm.name">
                </el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="mobile">
                <el-input v-model="logisticsForm.mobile" maxlength="11">
                </el-input>   
            </el-form-item>
            <el-form-item class="btnChoose fr">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" plain :size="btnsize" @click="clearSearch">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <!-- <div class="created">
                <el-button type="primary" @click="handleNew">发布网点</el-button>  
            </div> -->
            <div class="info_news" style="height:92%">
                <el-table
                :data="tableData"
                ref="multipleTable"
                stripe
                height="100%"
                border
                style="width: 100%">
                    <el-table-column
                        label="序号"
                        type="index"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="pointName"
                        label="网点名称"
                        width="250">
                            <template slot-scope="scope">
                            <span class="moreInfo" @click="handleInfo(scope.row)">{{scope.row.pointName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="address"
                        label="网点地址">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="name"
                        label="联系人"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="mobile"
                        label="手机"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="telNum"
                        label="固话" 
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="pointFile"
                        label="网点图片"
                        width="150">
                            <template  slot-scope="scope"> 
                                <!-- <img v-showPicture :src="scope.row.pointFile ? scope.row.pointFile : defaultImg" /> -->
                                <el-button type="primary" plain  v-showPicture :imgurl="scope.row.pointFile ? scope.row.pointFile : defaultImg" :size="btnsize">点击预览</el-button>
                            </template>
                    </el-table-column>
                    <!-- <el-table-column 
                        fixed="right"
                        prop="address"
                        label="操作"
                        width="150"
                        >
                            <template slot-scope="scope"> -->
                                <!-- <el-button-group> -->
                                    <!-- <el-button @click="handleEdit(scope.row)" type="primary" size="mini">修改</el-button> -->
                                    <!-- <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button> -->
                                    <!-- <el-button @click="handleStatus(scope.row)" :type="scope.row.pointStatus == 0 ? 'primary' : 'info'" size="mini">{{scope.row.pointStatus == 0 ? '启用' : '禁用'}}</el-button> -->
                                <!-- </el-button-group> -->
                            <!-- </template>
                    </el-table-column> -->
                </el-table>
            </div>
        </div>  
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>    
    </div>
</template>

<script>

import { getPointNetwork,PointNetworkStatus,deletePointNetwork } from '@/api/order/xuqiuku/wuliuPoint.js'
import Pager from '@/components/Pagination/index'

export default {
    components:{
        Pager
    },
    data() {
        return {
            btnsize:'mini',
            defaultImg:'/static/test.jpg',//默认加载失败图片
            loading:true,
            totalCount:0,
            page:1,
            pagesize:20,
            logisticsForm: {
                pointName: '',//网点名称
                address: '',//网点详细地址
                name: '',//联系人
                mobile: '',//手机号
                telNum: '',//固定电话
            },
            tableData: [],
        };
    },
    watch:{

    },
    mounted(){
        this.firstblood();
    },  
    methods: {
        handlePageChange(obj) {
            this.page = obj.pageNum;
            this.pagesize = obj.pageSize;
            this.firstblood();
        },
        firstblood(){
            this.loading = true;
            getPointNetwork(this.page,this.pagesize,this.logisticsForm).then(res=>{
                // console.log(res)
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
                this.loading = false;
            }).catch(err=>{
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                })
                this.loading = false;
            })
        },
        clearSearch(){
            this.$refs.ruleForm.resetFields();
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
            }
            this.firstblood();
        },
        //搜索
        handleSearch(){
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
            }
            this.firstblood();
        },
        //新增网点
        handleNew(){
            this.$router.push({name: '发布我的网点'});
        },
        //修改
        handleEdit(row) {   
            console.log(row);
            this.$router.push({name: '发布我的网点',query:{ data:row}});
        },
        handleInfo(row){
            // this.$router.push({name: '发布我的网点',query:{ data:row , type:'check'}});
        },
        //删除网点
        handleDelete(row) {
            this.$confirm('确定要删除'+ row.pointName +' 该网点名吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                deletePointNetwork(row.id).then(res => {
                    this.firstblood();
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + errorInfo ? errorInfo : err.text
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        //更改状态
        handleStatus(row) {
            console.log(row);
            PointNetworkStatus(row.id).then(res => {
                console.log(res)
                this.firstblood();
            }).catch(err=>{
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + err.text ? err.text : err
                })
            })
        },
        handleClickMore(){
            this.$refs['topSearch'].$el.classList.add('longSearchBox')
        },
        setShort(){
            this.$refs['topSearch'].$el.classList.remove('longSearchBox')

        }

    },
  
}
</script>

<style type="text/css" lang="scss">
    .PointNetwork{
            .el-table{
                .cell{
                    img{
                        cursor: pointer;
                        display: inline-block;
                        width: 128px;
                        height: 60px;
                    }
                }
            }
            .information{
                .click_and_search{
                    >.el-input-group{
                        float: right;
                        width: 300px;
                    }
                    .el-input-group__append:hover{
                        background: #3a8ee6;
                        color: #fff
                    }
                }
            }
            .moreInfo{
                cursor: pointer;
                display: inline-block;
                color: #169BD5;
            }
        }
</style>

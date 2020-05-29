<template>
    <div class="identicalStyle applyOrderCode" v-loading="loading">
            <el-form  :inline="true" :model="listSystemObj" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                <el-form-item label="申请时所在地" prop="applyAreaName">
                    <el-input v-model="listSystemObj.vo.applyAreaName" clearable>
                    </el-input>            
                </el-form-item>
                <el-form-item label="处理状态" prop="processStatusCode">
                    <el-select v-model="listSystemObj.vo.processStatusCode" clearable placeholder="请选择">
                        <el-option
                        v-for="item in optionsHandletype"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名"   prop="shipperName">
                    <el-input v-model="listSystemObj.vo.shipperName" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号"   prop="shipperPhone">
                    <el-input v-model="listSystemObj.vo.shipperPhone" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item class="btnChoose fr"  style="margin-left:0;">
                    <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                    <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
                </el-form-item>
            </el-form>
            <div class="classify_info">
                <!-- <div class="btns_box">
                    <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize">跟进登记</el-button>
                </div> -->
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        border
                        align = "center"
                        height="100%"
                        tooltip-effect="dark"
                        style="width: 100%"> 
                        <template v-for="(column,key) in tableColumn">
                            <el-table-column :key="key" :fixed="column.fixed" :label="column.label" :show-overflow-tooltip="column.overflow" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column>
                            <el-table-column :key="key" :fixed="column.fixed" :label="column.label" :show-overflow-tooltip="column.overflow" v-else :width="column.width || ''">
                                <template slot-scope="scope">
                                    <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope.row)"></span>
                                    <span v-else v-html="column.slot(scope)"></span>
                                </template>
                            </el-table-column>
                        </template>
                        <el-table-column label="用户下单码二维码" prop="userOrderCodeQrcode">
                            <template slot-scope="scope">
                                <el-button
                                :size="btnsize"
                                type="primary"
                                plain
                                :disabled = "!scope.row.userOrderCodeQrcode" 
                                v-showPicture :imgurl="scope.row.userOrderCodeQrcode ? scope.row.userOrderCodeQrcode : ''"
                                >查看</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                :size="btnsize"
                                type="primary"
                                plain
                                @click="handleClick(scope.row,'follow')">跟进登记</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>   
            <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
            <FollowUp :dialogFormVisible.sync = "dialogFormVisible" :applyId ='followFormId'  @renovate="firstblood" />
    </div>
</template>

<script type="text/javascript">

import { applyOrderCodeList } from '@/api/service/applyOrderCode'
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import FollowUp from './FollowUpRegistration'
import { ClaimStatusType } from '@/api/common.js'


export default{
    components: {
        Pager,
        FollowUp,
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dataTotal: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    applyAreaName:'',//申请时所在地名称
                    processStatusCode:'',//处理状态编码（待处理：AF04801，处理中：AF04802，已处理：AF04803）
                    shipperName:'',//货主姓名
                    shipperPhone:'',//货主手机号
                }
            },
            followFormId:'',
            tableData: [],
            dialogFormVisible: false,
            optionsHandletype:[{
                  name:'全部',
                  code:""
            }],
            tableColumn:[{
                label: '序号',
                prop: 'id',
                width: '60',
                fixed: false,
                slot: (scope) => {
                    return (this.listSystemObj.currentPage - 1)*this.listSystemObj.pageSize + scope.$index + 1;
                }
            },{
                'label': '货主手机号',
                'prop': 'shipperPhone',
                fixed: false,
                overflow:true,
            },{
                'label': '货主姓名',
                'prop': 'shipperName',
                fixed: false,
                overflow:true,
            },{
                'label': '货主所属业务员',
                'prop': 'shipperOwnerSalesmanName',
                fixed: false,
                overflow:true,
            },{
                'label': '申请时所在地',
                'prop': 'applyAreaName',
                fixed: false,
                overflow:true,
            },{
                'label': '申请时定位地址',
                'prop': 'applyLocateAddress',
                fixed: false,
                overflow:true,
            },{
                'label': '申请人注册所在地',
                'prop': 'applicantRegisterAreaName',
                fixed: false,
                overflow:true,
            },{
                'label': '申请人注册详细地址',
                'prop': 'applicantRegisterAddress',
                fixed: false,
                overflow:true,
            },{
                'label': '申请时间',
                'prop': 'applyTime',
                fixed: false,
                overflow:true,
                slot: (scope) => {
                    return parseTime(scope.row.applyTime, '{y}-{m}-{d} {h}:{i}:{s}')
                }
            },{
                'label': '累计申请次数',
                'prop': 'applyNum',
                fixed: false,
                overflow:true,
                slot: (scope) => {
                    return  scope.row.applyNum > 1 ? '<span style="color:red;">'+scope.row.applyNum+'</span>' : scope.row.applyNum;
                }
            },{
                'label': '处理状态',
                'prop': 'processStatusName',
                fixed: false,
                overflow:true,
            },
            // {
            //     'label': '用户下单码二维码',
            //     'prop': 'userOrderCodeQrcode',
            //     fixed: false,
            //     overflow:true,
            //      click:function(row){
            //         // console.log('row',row)
            //         this.$router.push({name: '订单详情',query:{ orderSerial:row.orderNum }});
            //     }.bind(this),
            //     slot: (scope) => {
            //         return  '<h4 class="moreInfo">'+scope.row.orderNum+'</h4>';
            //     }
            // }
            ],
        }
    },
    mounted() {
        this.firstblood();
        this.doActions();
    },
    methods: {
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        doActions(){
            ClaimStatusType().then(res => {
                this.optionsHandletype = this.optionsHandletype.concat(res.data);
            })
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            applyOrderCodeList(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.dataTotal = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
        handleSearch(type) {
            if(type == 'clear'){
                this.listSystemObj.vo = {
                    applyAreaName:'',//申请时所在地名称
                    processStatusCode:'',//处理状态编码（待处理：AF04801，处理中：AF04802，已处理：AF04803）
                    shipperName:'',//货主姓名
                    shipperPhone:'',//货主手机号
                };
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }
            this.firstblood();
        },
        handleClick(row,type){
            this.dialogFormVisible = true;
            this.followFormId = row.id;
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .applyOrderCode{
        height: 100%;
    }
</style>

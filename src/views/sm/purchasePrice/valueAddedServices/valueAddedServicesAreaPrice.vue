<template>
    <div class="identicalStyle valueAddedServicesAreaPrice" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="专线承运商" prop="agencyName">
                <el-input v-model="listSystemObj.vo.agencyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态"   prop="flag">
                <el-select v-model="listSystemObj.vo.flag" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsStatusType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize" v-has:SERVICE_SPECIALLINEPURCHASEPRICING_VALUEADDEDSERVICEPRICING_VALUEADDEDSERVICEPRICING_ADD>新增</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:SERVICE_SPECIALLINEPURCHASEPRICING_VALUEADDEDSERVICEPRICING_VALUEADDEDSERVICEPRICING_MODIFY>修改</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')" v-has:SERVICE_SPECIALLINEPURCHASEPRICING_VALUEADDEDSERVICEPRICING_VALUEADDEDSERVICEPRICING_ENABLEDISABLE>启用/禁用</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    border
                    align = "center"
                    height="100%"
                    tooltip-effect="dark"
                    @row-click="clickDetails"
                    style="width: 100%">
                    <el-table-column label="选择" width="60" align="center">
                        <template slot-scope="scope">
                            <el-radio class="radio"  v-model="radio"  :label="scope.row.id">&nbsp;</el-radio>
                        </template>
                    </el-table-column>  
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        sortable
                        label="专线承运商"
                        prop="agencyName"
                        :show-overflow-tooltip="true"
                        width="150">
                    </el-table-column>
                    <el-table-column label="代收货款服务费">
                        <el-table-column
                            prop="agencyRate"
                            sortable
                            label="费率(‰)"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="agencySingleLowestCost"
                            sortable
                            label="最低一票收费(元)"
                            width="150"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="agencySingleHighestCost"
                            sortable
                            width="150"
                            label="最高一票收费(元)"
                            >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="货物保价服务费">
                        <el-table-column
                            prop="keepRate"
                            sortable
                            label="费率(‰)"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="keepSingleLowestCost"
                            sortable
                            width="150"
                            label="最低一票收费(元)"
                            >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="签收单服务费">
                        <el-table-column
                            prop="faxReceiptCost"
                            sortable
                            label="传真返回(元)"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="orginReturn"
                            sortable
                            width="150"
                            label="原件返回(元)"
                            >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column
                        prop="flag"
                        sortable
                        label="状态"
                        width="150">
                        <template slot-scope="scope">
                            {{ scope.row.flag == '0' ? '禁用' : '启用' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="creater"
                        sortable
                        label="最新操作人"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        sortable
                        label="最新操作时间"
                        width="160">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | parseTime }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
        <add :dialogFormVisible.sync = "dialogFormVisible" :isModify="isModify" :changeForm="changeForm" :formtitle = "formtitle"  @renovate="firstblood"/>
    </div>
</template>

<script type="text/javascript">
import { otherServiceAreaPriceList2,OtherServiceAreaPriceStatus2 } from '@/api/server/lingdan/otherService.js'
// import { DicTradeCarrier } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import add from './add'

export default{
    name:'valueAddedServicesAreaPrice',
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Pager,
        add,
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dialogFormVisible:false,
            isModify:false,
            formtitle:'',
            dataTotal: 0,
            changeForm:{},
            selected:{},
            radio:'',
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    agencyName:'',//区代名称
                    useOrHistory:'0',//现在或历史列表(0:现在,1:历史)
                    platformType:'1',//平台类型(2：区代，3：平台，1：承运商)
                }
            },
            tableData: [],
            checkedinformation: [],
            optionsStatusType:[{
                name:'全部',
                code:""
            },{
                name:'启用',
                code:"1"
            },{
                name:'禁用',
                code:"0"
            }],
        }
    },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.firstblood()
                } 
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted() {
    },
    methods: {
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            otherServiceAreaPriceList2(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.dataTotal = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        // 模糊查询 分类名称或者code
        handleSearch(type) {
            if(type == 'clear'){
                this.listSystemObj.vo ={
                    agencyName:'',//区代名称
                    useOrHistory:'0',//现在或历史列表(0:现在,1:历史)
                    platformType:'1',//平台类型(2：区代，3：平台，1：承运商)
                }
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }
            this.firstblood();
        },
        handleClick(type,row){
            if(this.selected.id || type =='new'){
                switch (type) {
                    case 'new':
                        this.dialogFormVisible = true;
                        this.formtitle = '新增专线承运商增值服务定价';
                        this.isModify = false;
                        break;
                    case 'revise':
                        this.dialogFormVisible = true;
                        this.formtitle = '修改专线承运商增值服务定价';
                        this.isModify = true;
                        this.changeForm = this.selected;
                        break;
                    case 'status':
                        let message = this.selected.flag == '0' ? '确认启用当前专线承运商增值服务定价？' :'确认禁用当前专线承运商增值服务定价？';
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let statusObj = {
                                banOrUse:'',
                                id:''
                            }
                            statusObj.id = this.selected.id;
                            statusObj.banOrUse = this.selected.flag == '0' ? '1' : '0';
                            OtherServiceAreaPriceStatus2(statusObj).then(res => {
                                this.firstblood()
                                this.$message({
                                    type: 'success',
                                    message: this.selected.flag == '0' ? '启用成功!' : '禁用成功!'
                                })
                            }).catch(err => {
                                this.$message({
                                    type: 'info',
                                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                })
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                }
            }else{
                this.$message({
                    type: 'warning',
                    message: '请选择一条列表数据!'
                });
            }
        },
      
        // 点击选中当前行
        clickDetails(row, event, column) {
            // this.$refs.multipleTable.toggleRowSelection(row)
            this.radio = row.id;
            this.selected = row;
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .valueAddedServicesAreaPrice{
    }
</style>

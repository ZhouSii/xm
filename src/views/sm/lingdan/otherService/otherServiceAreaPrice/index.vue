<template>
    <div class="identicalStyle otherServiceAreaPrice" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="区代" prop="agencyName">
                <el-input v-model="listSystemObj.vo.agencyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代物流公司" prop="companyName">
                <el-input v-model="listSystemObj.vo.companyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代所在地" prop="agencyArea">
                <el-input v-model="listSystemObj.vo.agencyArea" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="状态"   prop="banOrUse">
                <el-select v-model="listSystemObj.vo.banOrUse" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsStatusType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize" v-has:SERVICE_DISTRICTSALESPRICING_INCREMENT_INCREMENT_ADD>新增</el-button>
                <!-- <el-button type="primary" icon="el-icon-document" plain @click="handleClick('batch')" :size="btnsize">批量修改定价</el-button> -->
                <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:SERVICE_DISTRICTSALESPRICING_INCREMENT_INCREMENT_MODIFY>修改</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')" v-has:SERVICE_DISTRICTSALESPRICING_INCREMENT_INCREMENT_ENABLEDISABLE >启用/禁用</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    border
                    align = "center"
                    height="100%"
                    @selection-change = "getinfomation"
                    tooltip-effect="dark"
                    @row-click="clickDetails"
                    style="width: 100%">
                    <!-- <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>  -->
                    <el-table-column label="选择" width="60" align="center">
                        <template slot-scope="scope">
                            <el-radio class="radio" v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <!-- <el-table-column
                        prop="area"
                        sortable
                        label="区域"
                        width="150">
                         <template slot-scope="scope">
                            {{ scope.row.province }}{{ scope.row.area }} 
                        </template>
                    </el-table-column>  -->
                    <el-table-column
                        sortable
                        label="区代"
                        prop="agencyName"
                        :show-overflow-tooltip="true"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        label="区代物流公司"
                        prop="companyName"
                        :show-overflow-tooltip="true"
                        min-width="200">
                    </el-table-column>
                    <el-table-column
                        sortable
                        label="区代所在地"
                        prop="agencyArea"
                        :show-overflow-tooltip="true"
                        min-width="200">
                    </el-table-column>
                    <el-table-column label="代收货款服务费">
                        <el-table-column
                            prop="agencyRate"
                            sortable
                            label="费率(‰)"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="agencySingleLowestCost"
                            sortable
                            label="单票最低收费"
                            min-width="150"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="agencySingleHighestCost"
                            sortable
                            min-width="150"
                            label="单票最高收费"
                            >
                        </el-table-column>
                        <!-- <el-table-column
                            prop="agencyBiggestCost"
                            sortable
                            width="150"
                            label="代收货款最大金额"
                            >
                        </el-table-column> -->
                    </el-table-column>
                    <el-table-column label="货物保价服务费">
                        <el-table-column
                            prop="keepRate"
                            sortable
                            label="费率(‰)"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="keepSingleLowestCost"
                            sortable
                            min-width="150"
                            label="单票最低收费"
                            >
                        </el-table-column>
                        <!-- <el-table-column
                            prop="keepSingleHighestCost"
                            sortable
                            width="150"
                            label="保价最大金额"
                            >
                        </el-table-column> -->
                    </el-table-column>
                    <el-table-column label="签收单服务费">
                        <el-table-column
                            prop="faxReceiptCost"
                            sortable
                            label="传真返回"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="orginReturn"
                            sortable
                            min-width="150"
                            label="原件返回"
                            >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column
                        prop="flag"
                        sortable
                        label="状态"
                        min-width="150">
                        <template slot-scope="scope">
                            {{ scope.row.flag == '0' ? '禁用' : '启用' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="creater"
                        sortable
                        label="创建人"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        sortable
                        label="创建时间"
                        min-width="160">
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
    name:'otherServiceAreaPrice',
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
            selected: {},
            radio:'',
            btnsize: 'mini',
            loading: false, // 加载
            dialogFormVisible:false,
            isModify:false,
            isBatch:false,
            formtitle:'',
            dataTotal: 0,
            changeForm:{},
            ids:[],
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    agencyName:'',//区代名称
                    agencyArea:'',//区代所在地
                    companyName:'',//区代公司名称
                    useOrHistory:'0',//现在或历史列表(0:现在,1:历史)
                }
            },
            tableData: [],
            checkedinformation: [],
            // optionsStatusType:[{
            //     name:'全部',
            //     code:""
            // },{
            //     name:'启用',
            //     code:"1"
            // },{
            //     name:'禁用',
            //     code:"0"
            // }],
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
                    agencyArea:'',//区代所在地
                    companyName:'',//区代公司名称
                    useOrHistory:'0',//现在或历史列表(0:现在,1:历史)
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
            if (this.selected.id || type === 'new'){
                switch (type) {
                    case 'new':
                        this.dialogFormVisible = true;
                        this.formtitle = '新增区代增值服务定价';
                        this.isModify = false;
                        this.isBatch = false;
                        break;
                    case 'revise':
                        this.dialogFormVisible = true;
                        this.formtitle = '修改区代增值服务定价';
                        this.isModify = true;
                        this.isBatch = false;
                        this.changeForm = this.selected;
                        break;
                    // case 'batch':
                    //     // console.log('this.checkedinformation',this.checkedinformation)
                    //     if(this.checkedinformation.length == 0){
                    //         return this.$message.warning('请选择要进行批量修改的数据!');
                    //     }else{
                    //         this.checkedinformation.forEach(el => {
                    //             this.ids.push(el.id)
                    //         })
                    //         this.dialogFormVisible = true;
                    //         this.isModify = false;
                    //         this.isBatch = true;
                    //         this.formtitle = '批量修改区代增值服务定价';
                    //     }
                    //     break;
                    case 'status':
                        let message = this.selected.flag == '0' ? '确认启用当前区代增值服务定价？' :'确认禁用当前区代增值服务定价？';
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
            } else {
                this.$message({
                type: "warning",
                message: "请选择一条列表数据!"
                });
            }
              //清除选中状态，避免影响下个操作
            // this.$refs.multipleTable.clearSelection();
        },
        // 判断是否选中
        getinfomation(selection) {
            this.checkedinformation = selection
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
    .otherServiceAreaPrice{
        height: 100%;
    }
</style>

<template>
    <div class="identicalStyle otherServiceStandPrice" v-loading="loading">
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
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize" v-has:SERVICE_DISTRICTSALESPRICING_ADDEDSERVICES_LIST_ADD>新增标准定价区代</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')" v-has:SERVICE_DISTRICTSALESPRICING_ADDEDSERVICES_LIST_ENABLEDISABLE>启用/禁用</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    border
                    align = "center"
                    height="100%"
                    @row-click="clickDetails"
                    tooltip-effect="dark"
                    style="width: 100%"> 
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
                    <el-table-column
                        sortable
                        prop="flag"
                        label="状态"
                        >
                        <template slot-scope="scope">
                            {{ scope.row.flag == '1' ? '启用' : '禁用' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="creater"
                        label="操作人">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="createTime"
                        label="操作时间"
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
        <add :dialogFormVisible.sync = "dialogFormVisible" @renovate="firstblood"/>
    </div>
</template>

<script type="text/javascript">
import { agencyAreaList,agencyAreaStatus } from '@/api/server/lingdan/otherService.js'
import Pager from '@/components/Pagination/index'
import add from './addAgencyArea'

export default{
    name:'otherServiceStandPrice',
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Pager,
        add
    },
    data() {
        return {
            selected: {},
            radio:'',
            btnsize: 'mini',
            loading: false, // 加载
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    "agencyArea": "",
                    "agencyName": "",
                    "companyName": ""
                }
            },
            dataTotal: 0,
            dialogFormVisible:false,
            tableData: [],
            isModify:false,
            changeForm:{},
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
    created() {

    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
        // 模糊查询 分类名称或者code
		handleSearch(type) {
			if(type == 'clear'){
				this.listSystemObj.vo ={
					"agencyArea": "",
                    "agencyName": "",
                    "companyName": ""
				}
			}
			if(this.listSystemObj.currentPage!= 1){
				this.listSystemObj.currentPage = 1;
				this.$refs.pager.inputval = this.listSystemObj.currentPage;
				this.$refs.pager.pageNum = this.listSystemObj.currentPage;
			}
			this.firstblood();
		},
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        clickDetails(row, event, column) {
            // this.$refs.multipleTable.toggleRowSelection(row);
            this.radio = row.id;
            this.selected = row;
		},
        // 刷新页面
        firstblood() {
            this.loading = true
            agencyAreaList(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.dataTotal = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
        handleClick(type,row){
            if (this.selected.id || type === 'new'){
                switch(type){
                    case 'new':
                        this.dialogFormVisible = true;
                        break;
                    case 'status':
                        let message = this.selected.flag == '0' ? '确认启用当前增值服务标准定价区代吗?' :'确认禁用吗？禁用后可能出现区代订单价格计算错误。';
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
                            agencyAreaStatus(statusObj).then(res => {
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
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .otherServiceStandPrice{
        height: 100%;
    }
</style>

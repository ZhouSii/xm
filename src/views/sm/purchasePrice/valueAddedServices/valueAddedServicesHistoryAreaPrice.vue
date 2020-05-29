<template>
    <div class="identicalStyle valueAddedServicesHistoryAreaPrice" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="专线承运商" prop="agencyName">
                <el-input v-model="listSystemObj.vo.agencyName" clearable></el-input>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
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
                        sortable
                        prop="creater"
                        label="生效操作人"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="createTime"
                        label="生效操作时间"
                        width="160">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | parseTime }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="inefficienter"
                        label="失效操作人"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="inefficientTime"
                        label="失效操作时间"
                        width="160">
                        <template slot-scope="scope">
                            {{ scope.row.inefficientTime | parseTime }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">
import { otherServiceAreaPriceList2,OtherServiceAreaPriceStatus2 } from '@/api/server/lingdan/otherService.js'
import Pager from '@/components/Pagination/index'

export default{
    name:'valueAddedServicesHistoryAreaPrice',
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Pager,
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
                    agencyName:'',//区代名称
                    useOrHistory:'1',//现在或历史列表(0:现在,1:历史)
                    platformType:'1',//平台类型(2：区代，3：平台，1：承运商)
                }
            },
            tableData: [],
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
                    useOrHistory:'1',//现在或历史列表(0:现在,1:历史)
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
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .valueAddedServicesHistoryAreaPrice{
    }
</style>

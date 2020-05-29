<template>
    <div class="identicalStyle otherServiceStandPrice" v-loading="loading">
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-edit-outline" plain @click="handleClick('maintain')" :size="btnsize">维护标准定价</el-button>
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
                    style="width: 100%"> 
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column label="代收货款服务费">
                        <el-table-column
                            prop="agencyRate"
                            label="费率"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="agencySingleLowestCost"
                            :show-overflow-tooltip="true"
                            label="单票最低收费"
                            width="150"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="agencySingleHighestCost"
                            :show-overflow-tooltip="true"
                            width="150"
                            label="单票最高收费"
                            >
                        </el-table-column>
                        <!-- <el-table-column
                            prop="agencyBiggestCost"
                            :show-overflow-tooltip="true"
                            width="150"
                            label="代收货款最大金额"
                            >
                        </el-table-column> -->
                    </el-table-column>
                    <el-table-column label="货物保价服务费">
                        <el-table-column
                            prop="keepRate"
                            label="费率"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="keepSingleLowestCost"
                            :show-overflow-tooltip="true"
                            width="150"
                            label="单票最低收费"
                            >
                        </el-table-column>
                        <!-- <el-table-column
                            prop="keepSingleHighestCost"
                            :show-overflow-tooltip="true"
                            width="150"
                            label="保价最大金额"
                            >
                        </el-table-column> -->
                    </el-table-column>
                    <el-table-column label="签收单服务费">
                        <el-table-column
                            prop="orginReturn"
                            label="传真返回"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="faxReceiptCost"
                            :show-overflow-tooltip="true"
                            width="150"
                            label="原件返回"
                            >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="creater"
                        label="生效操作人"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="createTime"
                        label="生效时间"
                        width="160">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="inefficienter"
                        label="失效操作人"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="inefficientTime"
                        label="失效时间"
                        width="160">
                        <template slot-scope="scope">
                            {{ scope.row.inefficientTime | parseTime('{y}-{m}-{d}') }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button
                            :size="btnsize"
                            type="primary"
                            plain
                            @click="handleClick('revise',scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
        <add :dialogFormVisible.sync = "dialogFormVisible" @renovate="firstblood" :changeForm="changeForm" :isModify = 'isModify'/>
    </div>
</template>

<script type="text/javascript">
import { otherServiceStandPriceList } from '@/api/server/lingdan/otherService.js'
import Pager from '@/components/Pagination/index'
import add from './add'

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
            btnsize: 'mini',
            loading: false, // 加载
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {}
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
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            otherServiceStandPriceList(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.dataTotal = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
        handleClick(type,row){
            this.dialogFormVisible = true;
            if(type == 'revise'){
                this.isModify = true;
                this.changeForm = row;
            }else{
                this.isModify = false;
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

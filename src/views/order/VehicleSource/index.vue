<template>
    <div class="identicalStyle vehicleSource" v-loading="loading">
        <searchInfo @change="getSearchParam" searchType="exchange"></searchInfo>
        <div class="classify_info">
            <div class="info_news">
                <el-table
                :data="tableData"
                border
                ref="multipleTable"
                stripe
                align = "center"
                height="100%"   
                tooltip-effect="dark"
                style="width: 100%"
                >
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column 
                        :show-overflow-tooltip="true"
                        prop="id"
                        label="出发地->目的地"
                        width="300"
                        >
                        <template slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleInfo(scope.row)">{{scope.row.strartAddress}}{{scope.row.endAddress ? '->'+scope.row.endAddress : ''}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="belongDriver"
                        :show-overflow-tooltip="true"
                        label="车主"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号码"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="carTypeName"
                        label="车辆类型"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="carSpecName"
                        :show-overflow-tooltip="true"
                        label="车辆规格"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="isLongCarName"
                        label="车源有效期"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="carSourceTypeName"
                        label="车源类型"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="expectPrice"
                        label="期望运价"
                        >
                        <template slot-scope="scope">
                            {{scope.row.expectPrice ? scope.row.expectPrice : '价格面议'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="usualPlace"
                        label="常驻地"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="carInfoStateName"
                        label="车源状态"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="carInfoFromName"
                        label="车源来源"
                        >
                        <template slot-scope="scope">
                            {{scope.row.carInfoFromName ? scope.row.carInfoFromName : '/'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="isEnable"
                        label="显示状态"
                        >
                        <template slot-scope="scope">
                            {{scope.row.isEnable == '0' ? '屏蔽' : '显示'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="发布时间"
                        width="160"
                        >
                        <template slot-scope="scope">
                            {{scope.row.createTime | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button
                            :size="btnsize"
                            :type="scope.row.isEnable == '0' ? 'primary' : 'info'"
                            :disabled="scope.row.id ? false : true"
                            plain
                            @click="handleClick('status',scope.row)">{{scope.row.isEnable == 0 ? '显示' : '屏蔽'}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">
import { getCarInfolist,setEnableType } from '@/api/order/vehicleSource.js'
import { objectMerge2 } from '@/utils/'
import Pager from '@/components/Pagination/index'
import searchInfo from './vehicleSourceSearch'

export default{
    name:'vehicleSource',
    components: {
        Pager,
        searchInfo
    },
    data() {
        return {
            btnsize: 'mini',
            loading: true, // 加载
            totalCount: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                }
            },
            tableData: [],
        }
    },
    watch: {
    },
    created() {

    },
    mounted() {
        this.firstblood();
    },
    beforeDestroy() {
    },
    methods: {
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        getSearchParam(obj) {
            // console.log(obj)
            this.listSystemObj.vo = Object.assign(this.listSystemObj.vo, obj);
            if(this.listSystemObj.currentPage != 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true;
            getCarInfolist(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
        //按钮功能
        handleClick(type,row) {
            // console.log('type,row',type,row)
            let vehilceID = row.id;
            let status = row.isEnable == '0' ? '1' : '0';
            setEnableType(vehilceID,status).then(res => {
                this.$message({
                    type: 'success',
                    message: '操作成功！'
                })
                this.firstblood();
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.text ? err.text : err.errorInfo)
                })
            })
        },
        handleInfo(row) {
            this.$router.push({ name: '车源详情', query: { sourceID: row.id }})
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .vehicleSource{
        height: 100%;
    }
</style>

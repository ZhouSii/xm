<template>
    <div class="identicalStyle exchangeRecord" v-loading="loading">
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
                        sortable
                        :show-overflow-tooltip="true"
                        width="200"
                        prop="driverId"
                        label="车主账号"
                        >
                        <template slot-scope="scope">
                            {{scope.row.driverMobile}}{{scope.row.driverName ? '-'+scope.row.driverName : ''}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        width="150"
                        prop="carNumber"
                        :show-overflow-tooltip="true"
                        label="车牌号"
                        >
                    </el-table-column>
                    <el-table-column
                        sortable
                        width="150"
                        prop="carTypeName"
                        label="车型"
                        >
                    </el-table-column>
                    <el-table-column
                        sortable
                        width="150"
                        prop="memberGrade"
                        label="兑换会员等级"
                        >
                    </el-table-column>
                    <el-table-column
                        sortable
                        width="150"
                        prop="platformCoinPrice"
                        label="兑换扣回28币"
                        >
                    </el-table-column>
                    <el-table-column
                        sortable
                        width="150"
                        prop="memberExpireDate"
                        label="会员有效期"
                        >
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="memberExpireDateTime"
                        label="会员有效期至"
                        width="160"
                        >
                        <template slot-scope="scope">
                            {{scope.row.memberExpireDateTime | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        width="150"
                        prop="minBehaviorScore"
                        label="兑换时行为分"
                        >
                    </el-table-column>
                    <el-table-column
                        sortable
                        width="150"
                        prop="primaryMemberGrade"
                        label="原会员等级"
                        >
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="primaryMemberExpireTime"
                        label="原会员等级有效期至"
                        width="160"
                        >
                        <template slot-scope="scope">
                            {{scope.row.primaryMemberExpireTime | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        width="150"
                        prop="location"
                        label="兑换城市"
                        >
                    </el-table-column>
                    <el-table-column
                        sortable
                        width="160"
                        prop="createTime"
                        label="兑换时间"
                        >
                        <template slot-scope="scope">
                            {{scope.row.createTime | parseTime}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">
import { DriverExchangeMemberList } from '@/api/marketing/MembershipSys.js'
import { objectMerge2 } from '@/utils/'
import Pager from '@/components/Pagination/index'
import searchInfo from '../components/MemberSearch'

export default{
    name:'exchangeRecord',
    components: {
        Pager,
        searchInfo
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            totalCount: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    detailType:'exchange',
                    driverName:'',
                    startTime:'',
                    endTime:'',
                    location:'',
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
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
            }
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true;
            DriverExchangeMemberList(this.listSystemObj).then(res => {
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
            switch(type){   
            }
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .exchangeRecord{
        height: 100%;
    }
</style>

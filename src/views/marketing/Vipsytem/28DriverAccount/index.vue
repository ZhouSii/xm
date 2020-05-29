<template>
    <div class="identicalStyle driverAccount" v-loading="loading">
        <el-form :inline="true" :model="listSystemObj" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="车主" prop="driver">
                <el-input v-model="listSystemObj.vo.driver" placeholder="账户/姓名/车牌号" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属区域" prop="belongCityName">
                <el-input v-model="listSystemObj.vo.belongCityName" clearable></el-input>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" :size="btnsize" icon="el-icon-search" plain @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" :size="btnsize" icon="fontFamily aflc-icon-qingkong" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
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
                v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_ACCOUNT_LIST
                >
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column 
                        :show-overflow-tooltip="true"
                        prop="driver"
                        label="车主账号"
                        >
                        <template slot-scope="scope">
                            <h4 class="moreInfo" @click="handleInfo(scope.row)">{{scope.row.driver}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="carNumber"
                        :show-overflow-tooltip="true"
                        label="车牌号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="carType"
                        label="车型"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="belongCityName"
                        label="所属区域"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="coins"
                        label="28币数量"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="memberLever"
                        label="当前会员等级"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="validityPeriodTime"
                        label="会员有效期至"
                        >
                        <template slot-scope="scope">
                            {{scope.row.validityPeriodTime}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
        <div class="info_tab_footer" v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_ACCOUNT_LIST>共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">
import { DriverAccountList } from '@/api/marketing/MembershipSys.js'
import Pager from '@/components/Pagination/index'

export default{
    name:'driverAccount',
    components: {
        Pager,
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
                    belongCityName:'',
                    driver:'',
                }
            },
            tableData: [],
        }
    },
    watch: {
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
        handleSearch(type) {
            if(type == 'clear'){
                this.listSystemObj.vo = {
                    belongCityName:'',
                    driver:'',
                };
            }
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
            DriverAccountList(this.listSystemObj).then(res => {
                console.log('data',res)
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
        handleInfo(row){
            this.$router.push({ name: '28币车主账户明细',query: {userId: row.userId}})
        }
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .driverAccount{
        height: 100%;
    }
</style>

<template>
    <div class="identicalStyle DriverAccountDetails" v-loading="loading">
        <el-form :inline="true" :model="listSystemObj" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="科目" prop="subjectArr">
            <div class="chooseCityList">
                 <el-cascader
                    v-model="subjectArr"
                    :options="optionsMaidLevelList"
                    :show-all-levels="false"
                    @change="subjectWay"
                    :props="props"
                    >
                </el-cascader>
            </div>
            </el-form-item>
            <el-form-item label="发放城市" prop="grantPlace">
                <el-input v-model="listSystemObj.vo.grantPlace" clearable></el-input>
            </el-form-item>
            <el-form-item label="发放日期" prop="timeArr">
                <el-date-picker
                    v-model="timeArr"
                    type="daterange"
                    unlink-panels
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
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
                        prop="grantDiscount"
                        label="发放/扣回"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="subject"
                        label="科目"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="coins"
                        label="28币"
                        >
                        <template slot-scope="scope">
                            <span v-if="scope.row.grantDiscount == '发放'" style="color:red;">{{scope.row.coins}}</span>
                            <span v-else style="color:#00e500;">{{scope.row.coins}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="releaseMultiple"
                        label="发放加速倍数"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="grantPlace"
                        label="发放城市"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="grantPlaceTime"
                        label="会员有效期至"
                        >
                        <template slot-scope="scope">
                            {{scope.row.grantPlaceTime | parseTime}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">
import { DriverAccountDetailsList } from '@/api/marketing/MembershipSys.js'
import Pager from '@/components/Pagination/index'
import { getDictionary } from '@/api/common.js'

export default{
    name:'DriverAccountDetails',
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
                    subject:'',
                    userId:'',
                    grantPlace:'',
                    grantPlaceStartTime:'',
                    grantPlaceEndTime:'',
                }
            },
            subjectArr:[],
            timeArr:[],
            tableData: [],
            optionsMaidLevelList:[],
            maidLevel:'AF006',
            props: {
                label: 'name',
                value: 'code',
                children: 'children'
            },
        }
    },
    watch: {
    },
    mounted() {
        this.firstblood();
        this.getMoreInformation();
    },
    beforeDestroy() {
    },
    methods: {
        getMoreInformation(){
            getDictionary(this.maidLevel).then(res=>{
                this.optionsMaidLevelList = res.data
                this.optionsMaidLevelList.forEach((item,i)=>{
                    getDictionary(item.code).then(res_two=>{
                        this.optionsMaidLevelList[i].children = res_two.data
                    })
                })
            })
        },
        subjectWay(item){
            if(item!==null){
                this.listSystemObj.vo.subject = item[1];
            }
            else{
                this.listSystemObj.vo.subject = '';
            }
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        handleSearch(type) {
            switch(type){
                case 'search':
                    if(this.timeArr){
                        this.listSystemObj.vo.grantPlaceStartTime = this.timeArr[0];
                        this.listSystemObj.vo.grantPlaceEndTime = this.timeArr[1];
                    }
                    break;
                case 'clear':
                    this.listSystemObj.vo = {
                        subject:'',
                        userId:this.$route.query.userId,
                        grantPlace:'',
                        grantPlaceStartTime:'',
                        grantPlaceEndTime:'',
                    };
                    this.timeArr = null;
                    this.subjectArr = [];
                    break;
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
            let userId = this.$route.query.userId;
            this.listSystemObj.vo.userId = userId;
            this.loading = true;
            DriverAccountDetailsList(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .DriverAccountDetails{
        height: 100%;
    }
</style>

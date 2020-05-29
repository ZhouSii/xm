<template>
    <div class="identicalStyle OrderTakeRewordConfig" v-loading="loading">
        <el-form :inline="true" :model="listSystemObj" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="奖励区域" prop="rewardCity">
                <el-input v-model="listSystemObj.vo.rewardCity" clearable></el-input>
            </el-form-item>
            <el-form-item label="服务分类" prop="serviceClassifyCode">
                <el-select v-model="listSystemObj.vo.serviceClassifyCode" clearable placeholder="请选择" >
                    <el-option
                    v-for="item in optionsServicetype"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                    :disabled="item.disabled">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动状态" prop="status">
                <el-select v-model="listSystemObj.vo.status" clearable placeholder="请选择" >
                    <el-option
                    v-for="item in optionsStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                    :disabled="item.disabled">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" :size="btnsize" icon="el-icon-search" plain @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" :size="btnsize" icon="fontFamily aflc-icon-qingkong" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" plain :size="btnsize" @click="handleClick('new')" v-has:MARKETING_DISTRIBUTION_REWARD_ORDER_REWARD_ADD>新增</el-button>
			</div>
            <div class="info_news">
                <el-table
                :data="tableData" 
                border
                ref="multipleTable"
                stripe
                align = "center"
                height="100%"   
                tooltip-effect="dark"
                v-has:MARKETING_DISTRIBUTION_REWARD_ORDER_REWARD_LIST
                style="width: 100%"
                >
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column 
                        prop="rewardCity"
                        label="奖励区域"
                        width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="serviceClassify"
                        label="服务分类"
                        width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        label="奖励方案"
                        width="200"
                        >
                        <template slot-scope="scope">
                            <!-- <p v-if="scope.row.lightcargoDotted.length == 0">
                                    <span class="interview">面谈</span>
                            </p> -->
                            <p class="cargo" v-for="(item,idx) in scope.row.aflcRecommendAwardList" :key="item.id">
                                <span v-if="idx == 0">{{item.recomAuthEnd ? '前' + item.recomAuthEnd + '单：' : ''}}</span>
                                <span v-else-if="idx == scope.row.aflcRecommendAwardList.length-1 &&  !item.recomAuthEnd">{{item.recomAuthStart}}单后：</span>
                                <span v-else>第{{item.recomAuthStart}}~{{item.recomAuthEnd}}单：</span>
                                <span>{{item.awardStart}}~{{item.awardEnd}}元/单</span>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="rewardTotalLimit"
                        label="活动奖励总上限"
                        width="150"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="rewardedTotal"
                        label="已奖励金额"
                        width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="perOrderRewardLimit"
                        label="每个接单码奖励上限"
                        width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="perOrderDayRewardTimeLimit"
                        label="每个接单码每天奖励次数上限"
                        width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="perUserDayRewardTimeLimit"
                        label="同一货主每天扫接单码奖励单数上限"
                        width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="perUserOrderRewardTimeLimit"
                        label="同一货主扫同一接单码奖励单数上限"
                        width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="rewardStartDate"
                        label="奖励开始日期"
                        width="160"
                        >
                        <template slot-scope="scope">
                            {{scope.row.rewardStartDate | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="rewardEndDate"
                        label="奖励结束日期"
                        width="160"
                        >
                        <template slot-scope="scope">
                            {{scope.row.rewardEndDate | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="活动状态"
                        width="150"
                        >
                        <template slot-scope="scope">
                            {{scope.row.status == '1' ? '未开始':(scope.row.status == '2' ? '进行中':(scope.row.status == '3' ? '已结束':''))}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="flag"
                        label="状态"
                        width="150"
                        >
                        <template slot-scope="scope">
                            {{scope.row.flag == '1' ? '启用' : '禁用'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="updater"
                        label="操作人"
                        width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="操作时间"
                        width="160"
                        >
                        <template slot-scope="scope">
                            {{scope.row.updateTime | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="150">
                        <template slot-scope="scope">
                            <el-button
                            :size="btnsize"
                            type="primary"
                            plain
                            @click="handleClick('revise',scope.row)" v-has:MARKETING_DISTRIBUTION_REWARD_ORDER_REWARD_UPDATE>修改</el-button>
                            <el-button
                            :size="btnsize"
                            :type="scope.row.flag == '0' ? 'primary' : 'info'"
                            :disabled="scope.row.id ? false : true"
                            plain
                            @click="handleClick('status',scope.row)" v-has:MARKETING_DISTRIBUTION_REWARD_ORDER_REWARD_USE>{{scope.row.flag == 0 ? '启用' : '禁用'}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
        <div class="info_tab_footer" v-has:MARKETING_DISTRIBUTION_REWARD_ORDER_REWARD_LIST>共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    

        <add :dialogFormVisible.sync = "dialogFormVisible" @renovate="Onrenovate" :isModify="isModify" :changeForm="changeForm" :formtitle = "formtitle"/>
    </div>
</template>

<script type="text/javascript">
import { OrderCodeRewordConfigList,OrderCodeRewordConfigStatus } from '@/api/marketing/distribution'
import Pager from '@/components/Pagination/index'
import { DicServiceType } from '@/api/common.js'
import add from './add'

export default{
    name:'OrderTakeRewordConfig',
    components: {
        Pager,
        add
    },
    data() {
        return {
            dialogFormVisible:false,
            isModify:false,
            formtitle:'',
            btnsize: 'mini',
            loading: false, // 加载
            totalCount: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    "rewardCity": "",
                    "rewardType": "2",
                    "serviceClassifyCode": "",
                    status:''
                }
            },
            optionsServicetype:[],
            tableData: [],
            changeForm:{},
            optionsStatus:[{
                name:'全部',
                code:''
            },{
                name:'未开始',
                code:'1'
            },{
                name:'进行中',
                code:'2'
            },{
                name:'已结束',
                code:'3'
            }]
        }
    },
    watch: {
    },
    mounted() {
        this.firstblood();
        this.doActions();
    },
    beforeDestroy() {
    },
    methods: {
        doActions(){
            DicServiceType().then(res => {
                this.optionsServicetype = res.data;
            })
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        handleSearch(type) {
            if(type == 'clear'){
                this.listSystemObj.vo = {
                    "rewardCity": "",
                    "rewardType": "2",
                    "serviceClassifyCode": "",
                    status:''
                };
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }  
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true;
            OrderCodeRewordConfigList(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
        handleInfo(row){
            this.$router.push({ name: '28币车主账户明细',query: {userId: row.userId}})
        },
        handleClick(type,row){
            switch(type){
                case 'new':
                    this.dialogFormVisible = true;
                    this.isModify = false;
                    this.formtitle = '新增接单码奖励配置'
                    break;
                case 'revise':
                    this.dialogFormVisible = true;
                    this.isModify = true;
                    this.formtitle = '修改接单码奖励配置';
                    this.changeForm = row;
                    break;
                case 'status':
                    let message = row.flag == '0' ? '确认启用当前奖励活动吗？' :'确认禁用当前奖励活动吗？';
                    this.$confirm(message, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let ids = [];
                        ids.push(row.id);
                        OrderCodeRewordConfigStatus(ids).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功！',
                            })
                            this.firstblood();
                        }).catch(err => {
                            this.$message({
                                type: 'warning',
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
        },
        Onrenovate(){
            this.firstblood();
        }
    }
}
</script>

<style type="text/css" lang="scss">
    .OrderTakeRewordConfig{
        height: 100%;
        .el-table thead tr th .cell {
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        /* .el-table .cell {
            .cargo{
                span{
                    text-align: left;
                }
            }
        } */

    }
</style>

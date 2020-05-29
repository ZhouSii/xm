<template>
    <div class="identicalStyle RecommendReword" v-loading="loading">
        <el-form :inline="true" :model="listSystemObj" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="奖励区域" prop="rewardCity">
                <el-input v-model="listSystemObj.vo.rewardCity" clearable></el-input>
            </el-form-item>
            <el-form-item label="成功推荐用户类型" prop="userTypeCode">
                <el-select v-model="listSystemObj.vo.userTypeCode" clearable placeholder="请选择" >
                    <el-option
                    v-for="item in optionsRecommendtype"
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
                <el-button type="primary" icon="el-icon-circle-plus" plain :size="btnsize" @click="handleClick('new')" v-has:MARKETING_DISTRIBUTION_REWARD_RECOMMENDED_REWARD_ADD>新增</el-button>
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
                style="width: 100%"
                >
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column 
                        :show-overflow-tooltip="true"
                        prop="rewardCity"
                        label="奖励区域"
                        width="150"
                        >
                    </el-table-column>  
                    <el-table-column 
                        :show-overflow-tooltip="true"
                        prop="userTypeName"
                        width="150"
                        label="成功推荐用户类型"
                        >
                    </el-table-column>
                    <el-table-column label="新用户注册奖励" >
                        <el-table-column label="奖励方案" width="200">
                            <template slot-scope="scope">
                                <p class="cargo" v-for="(item,idx) in scope.row.registerAwardList" :key="item.id">
                                    <span v-if="idx == 0">{{item.recomAuthEnd ? '前' + item.recomAuthEnd + '人：' : ''}}</span>
                                    <span v-else-if="idx == scope.row.registerAwardList.length-1 &&  !item.recomAuthEnd">{{item.recomAuthStart}}人后：</span>
                                    <span v-else>第{{item.recomAuthStart}}~{{item.recomAuthEnd}}人：</span>
                                    <span v-if="item.awardStart && item.awardEnd">{{item.awardStart}}~{{item.awardEnd}}元/人</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="单个用户活动奖励上限">
                            <template slot-scope="scope">
                               {{scope.row.registerAwardList.length == 0 ? '' : scope.row.registerAwardList[0].awardUserLimit}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="单个用户每天奖励次数上限">
                             <template slot-scope="scope">
                               {{scope.row.registerAwardList.length == 0 ? '' : scope.row.registerAwardList[0].awardDayLimit}}
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="新用户认证奖励" >
                        <el-table-column  label="奖励方案" width="200">
                            <template slot-scope="scope">
                                <p class="cargo" v-for="(item,idx) in scope.row.authAwardList" :key="item.id">
                                    <span v-if="idx == 0">{{item.recomAuthEnd ? '前' + item.recomAuthEnd + '人：' : ''}}</span>
                                    <span v-else-if="idx == scope.row.authAwardList.length-1 &&  !item.recomAuthEnd">{{item.recomAuthStart}}人后：</span>
                                    <span v-else>第{{item.recomAuthStart}}~{{item.recomAuthEnd}}人：</span>
                                    <span v-if="item.awardStart && item.awardEnd">{{item.awardStart}}~{{item.awardEnd}}元/人</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="单个用户活动奖励上限">
                            <template slot-scope="scope">
                               {{scope.row.authAwardList.length == 0 ? '' : scope.row.authAwardList[0].awardUserLimit}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="单个用户每天奖励次数上限">
                            <template slot-scope="scope">
                               {{scope.row.authAwardList.length == 0 ? '' : scope.row.authAwardList[0].awardDayLimit}}
                            </template>
                        </el-table-column>
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
                        prop="rewardStartDate"
                        label="奖励开始日期"
                        width="150"
                        >
                        <template slot-scope="scope">
                            {{scope.row.rewardStartDate | parseTime('{y}-{m}-{d}')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="rewardEndDate"
                        label="奖励结束日期"
                        width="150"
                        >
                        <template slot-scope="scope">
                            {{scope.row.rewardEndDate | parseTime('{y}-{m}-{d}')}}
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
                            @click="handleClick('revise',scope.row)" v-has:MARKETING_DISTRIBUTION_REWARD_RECOMMENDED_REWARD_UPDATE>修改</el-button>
                            <el-button
                            :size="btnsize"
                            :type="scope.row.flag == '0' ? 'primary' : 'info'"
                            :disabled="scope.row.id ? false : true"
                            plain
                            @click="handleClick('status',scope.row)" v-has:MARKETING_DISTRIBUTION_REWARD_RECOMMENDED_REWARD_USE>{{scope.row.flag == 0 ? '启用' : '禁用'}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
        <div class="info_tab_footer" v-has:MARKETING_DISTRIBUTION_REWARD_RECOMMENDED_REWARD_LIST>共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>  
        <add :dialogFormVisible.sync = "dialogFormVisible" @renovate="firstblood" :changeForm="changeForm" :isModify="isModify" :formtitle = "formtitle"/>
    </div>
</template>

<script type="text/javascript">
import { RecommendRewordConfigList,RecommendRewordConfigStatus } from '@/api/marketing/distribution'
import Pager from '@/components/Pagination/index'
import { DicRecommendType } from '@/api/common.js'
import add from './add'

export default{
    name:'RecommendReword',
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
                    rewardCity:'',//区域code
                    userTypeCode:'',//推荐用户类型
                    status:''

                }
            },
            tableData: [],
            optionsRecommendtype:[],
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
            DicRecommendType().then(res => {
                this.optionsRecommendtype = res.data;
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
                    rewardCity:'',
                    userTypeCode:'',
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
            RecommendRewordConfigList(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        handleClick(type,row){
            console.log(type,row)
            switch(type){
                case 'new':
                    this.dialogFormVisible = true;
                    this.isModify = false;
                    this.formtitle = '新增推荐码奖励配置'
                    break;
                case 'revise':
                    this.dialogFormVisible = true;
                    this.isModify = true;
                    this.formtitle = '修改推荐码奖励配置';
                    this.changeForm = row;
                    break;
                case 'status':
                    let message = row.flag == '0' ? '确认启用当前奖励活动吗？' :'确认禁用当前奖励活动吗？';
                    this.$confirm(message, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // let doAction = row.flag == '0' ? RecommendRewordConfigStart(row.id) :RecommendRewordConfigBan(row.id);
                        let ids = [];
                        ids.push(row.id)
                        RecommendRewordConfigStatus(ids).then(res => {
                            this.$message({
                                type: 'success',
                                message: row.flag == '0' ? '启用成功!' :'禁用成功!',
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
                            message: '已取消!'
                        })
                    })
                    break;
            }
        },
    }
}
</script>

<style type="text/css" lang="scss">
    .RecommendReword{
        height: 100%;
        .el-table thead tr th .cell {
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>

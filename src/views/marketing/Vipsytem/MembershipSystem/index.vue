<template>
    <div class="identicalStyle memberShipSystem" v-loading="loading">
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize" v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_EQUITY_ADD>新增</el-button>
                    <!-- <el-button type="primary" icon="el-icon-delete" plain @click="handleSearch('cancel')" :size="btnsize">删除</el-button> -->
                </div>
                <div class="info_news">
                    <el-table
                    :data="tableData"
                    :span-method="objectSpanMethod"
                    border
                    ref="multipleTable"
                    stripe
                    align = "center"
                    height="100%"   
                    @selection-change = "getinfomation"
                    tooltip-effect="dark"
                    @row-click="clickDetails"
                    style="width: 100%"
                    v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_EQUITY_LIST
                    >
                        <el-table-column label="序号" width="60">
                            <template slot-scope="scope">
                                {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            prop="firstMemberGrade"
                            label="一级会员等级"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="firstMemberSort"
                            :show-overflow-tooltip="true"
                            label="前端显示排序序号"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="secondMemberIcon"
                            label="前端显示图标"
                            >
                            <template  slot-scope="scope"> 
                                <img  :src="scope.row.secondMemberIcon" />
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="secondMemberGrade"
                            :show-overflow-tooltip="true"
                            label="二级会员等级"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="winOrderGradeName"
                            label="中单等级"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="rewardGradeName"
                            label="奖励等级"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="commissionGradeName"
                            label="抽佣等级"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="extractCashGradeName"
                            label="提现等级"
                            >
                        </el-table-column>
                       <el-table-column label="操作" width="120">
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
            <!-- <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  ref="pager"/></div> </div>     -->

            <newMemberSystem :dialogFormVisible.sync = "dialogFormVisible" @renovate="Onrenovate" :isModify="isModify" :changeforms="changeforms" :formtitle = "formtitle"/>
    </div>
</template>

<script type="text/javascript">
// import Pager from '@/components/Pagination/index'
import newMemberSystem from './newMemberSystem'
import { listSystemMemberConfig } from '@/api/marketing/MembershipSys.js'

export default{
    components: {
        // Pager,
        newMemberSystem
    },
    data() {
        return {
            btnsize: 'mini',
            dialogFormVisible:false,
            tableArr:[],
            spanArr:[],
            pos:0,
            isModify:false,
            loading: false, // 加载
            changeforms:{},
            formtitle:'新增会员等级',
            sizes: [20, 50, 100, 400],
            // dataTotal: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 100000,
                "vo": {}
            },
            tableData: [],
            checkedinformation: [],
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
        // 刷新页面
        firstblood() {
            this.loading = true;
            listSystemMemberConfig(this.listSystemObj).then(res => {
                let rowData = [];
                this.tableArr = res.data;
                res.data.forEach(el => {
                    el.configs.forEach(item => {
                        rowData.push(item)
                    })
                })
                this.tableData = rowData;
                // this.tableData = rowData.sort(function(a, b) {
                //     return a.firstMemberSort - b.firstMemberSort
                // })       
                this.getSpanArr(this.tableData)
                this.loading = false;
            })
        },
        getSpanArr(data) {　
            this.spanArr = [];
            this.pos = 0 ;
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArr.push(1);
                    this.pos = 0
                } else {
                // 判断当前元素与上一个元素是否相同
                if (data[i].firstMemberGrade === data[i - 1].firstMemberGrade) {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                 }
             }
            // console.log('this.spanArr',this.spanArr)
        },
        // 判断是否选中
        getinfomation(selection) {
            this.checkedinformation = selection;
        },
        // 点击选中当前行
        clickDetails(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            // console.log('row, column, rowIndex, columnIndex',row, column, rowIndex, columnIndex)
            // console.log('rowIndex',rowIndex)
            if (columnIndex === 1 || columnIndex === 2 || columnIndex === 9) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                // console.log('_row,_col',_row,_col,this.spanArr[rowIndex])
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        //按钮功能
        handleClick(type,row) {
            // console.log('type,row',type,row)
            switch(type){
                case 'revise':
                    this.tableArr.forEach(el => {
                        if(el.firstMemberGrade == row.firstMemberGrade){
                            this.changeforms = el;
                        }
                    })     
                    this.formtitle = '修改会员等级';
                    this.isModify = true;   
                    this.dialogFormVisible = true;
                    break;
                case 'new':
                    this.formtitle = '新增会员等级';
                    this.dialogFormVisible = true;
                    this.isModify = false;
                    break
            }
        },
        Onrenovate(){
            this.$nextTick(function () {
                this.firstblood();
            })
            this.$forceUpdate();
        }
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .memberShipSystem{
        height: 100%;
        .classify_info .el-table .cell img {
            display: inline-block;
            width: 100px;
            height: 50px;
        }
        .classify_info{
            padding-bottom:10px; 
        }
    }
</style>

<template>
    <div class="identicalStyle exchangeMember" v-loading="loading">
            <div class="classify_info">
                <div class="info_news">
                    <el-table
                    :data="tableData"
                    :span-method="objectSpanMethod"
                    border
                    ref="multipleTable"
                    stripe
                    align = "center"
                    height="100%"   
                    tooltip-effect="dark"
                    style="width: 100%"
                    v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_EXCHANGE_LIST
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
                        <el-table-column
                            prop="minBehaviorScore"
                            label="兑换时最低行为分"
                            >
                            <template slot-scope="{row,$index}">
                                 <el-input v-model="row.minBehaviorScore" v-numberOnly @blur="checkbehaviorScore(row,$index)"  :size="inputSize" clearable></el-input>            
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="platformCoin"
                            label="兑换所需28币"
                            >
                            <template slot-scope="{row,$index}">
                                 <el-input v-model="row.platformCoin" v-numberOnly @blur="checkCoin(row,$index)" :size="inputSize" clearable></el-input> 
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="memberExpireDate"
                            label="会员有效期（天）"
                            >
                            <template slot-scope="scope">
                                 <el-input v-model="scope.row.memberExpireDate" v-numberOnly :size="inputSize" clearable></el-input>            
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="120"
                            prop="usingStatus"
                            label="状态"
                            >
                            <template slot-scope="scope">
                                {{scope.row.usingStatus == '0' ? '禁用' : '启用'}}
                            </template>
                        </el-table-column>
                       <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button
                                :size="btnsize"
                                :type="scope.row.usingStatus == '0' ? 'primary' : 'info'"
                                :disabled="scope.row.id ? false : true"
                                plain
                                @click="handleClick('status',scope.row)">{{scope.row.usingStatus == 0 ? '启用' : '禁用'}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>   
            <div class="member_footer">
                <el-button type="primary" icon="el-icon-success" plain @click="handleClick('new')" size="middle" :disabled="btnShow">保  存</el-button>
            </div>
    </div>
</template>

<script type="text/javascript">
import { listExchangeMemberConfig,updateExchangeMemberConfigUsingStatus,addExchangeMemberConfig } from '@/api/marketing/MembershipSys.js'
import { objectMerge2 } from '@/utils/'
import { DicBehaviorScore } from '@/api/common.js'

export default{
    components: {
    },
    data() {
        return {
            btnsize: 'mini',
            tableArr:[],
            spanArr:[],
            pos:0,
            btnShow:false,
            inputSize:'small',
            loading: false, // 加载
            // dataTotal: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 100000,
                "vo": {}
            },
            tableData: [],
            behaviorScore:[]
        }
    },
    watch: {
    },
    created() {

    },
    mounted() {
        this.firstblood();
        this.doActions();
    },
    beforeDestroy() {
    },
    methods: {
        checkCoin(row,$index){
            if(row.platformCoin){
                // console.log('row.platformCoin',row.platformCoin)
                if($index == 0){
                    return false
                }else if($index == (this.tableData.length-1)){
                    if(parseInt(row.platformCoin) <= parseInt(this.tableData[$index-1].platformCoin)){
                        row.platformCoin = ''
                        return this.$message({
                            type: 'warning',
                            message: '当前兑换所需28币数量应大于前一条兑换所需28币数量设置！'
                        })
                    }else{
                        return false
                    }
                }else{
                    if(this.tableData[$index-1].platformCoin && !this.tableData[$index+1].platformCoin){
                        if(parseInt(row.platformCoin) <= parseInt(this.tableData[$index-1].platformCoin) ){
                            row.platformCoin = ''
                            return this.$message({
                                type: 'warning',
                                message: '当前兑换所需28币数量应大于前一条兑换所需28币数量设置！'
                            })
                        }else{
                            return false
                        }
                    }else if(!this.tableData[$index-1].platformCoin && this.tableData[$index+1].platformCoin){
                        if(parseInt(row.platformCoin) >= parseInt(this.tableData[$index+1].platformCoin) ){
                            row.platformCoin = ''
                            return this.$message({
                                type: 'warning',
                                message: '当前兑换所需28币数量应小于后一条兑换所需28币数量设置！'
                            })
                        }else{
                            return false
                        }
                    }else if(this.tableData[$index-1].platformCoin && this.tableData[$index+1].platformCoin){
                        if( parseInt(row.platformCoin) <= parseInt(this.tableData[$index-1].platformCoin)  || parseInt(row.platformCoin)  >= parseInt(this.tableData[$index+1].platformCoin)){
                            row.platformCoin = ''
                            return this.$message({
                                type: 'warning',
                                message: '当前兑换所需28币数量应介于前后两条兑换所需28币数量设置！'
                            })
                        }else{
                            return false
                        }
                    }
                }
            }else{
                return false
            }
        },
        checkbehaviorScore(row,$index){
            let score = this.behaviorScore[0].value;
            // console.log('dsa',score,row,$index)
            if(row.minBehaviorScore == ''){
                return this.$message({
                    type: 'warning',
                    message: '请输入兑换时最低行为分'
                })
            }else{          
                if(parseInt(row.minBehaviorScore) < 1 ){
                    row.minBehaviorScore = '1'
                    return this.$message({
                        type: 'warning',
                        message: '兑换时最低行为分最低为1分！'
                    })
                }else if(parseInt(row.minBehaviorScore) > parseInt(score)){
                    row.minBehaviorScore = '12'
                    return this.$message({
                        type: 'warning',
                        message: '兑换时最低行为分不可超过12分！'
                    })
                }
            }
        },
        // 刷新页面
        firstblood() {
            this.loading = true;
            listExchangeMemberConfig(this.listSystemObj).then(res => {
                let rowData = [];
                this.tableArr = res.data;
                res.data.forEach(el => {
                    el.configs.forEach(item => {
                        rowData.push(item)
                    })
                }) 
                this.tableData = rowData;
                this.getSpanArr(this.tableData)
                this.loading = false;
            }).catch(err => {
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
                this.loading = false;
            })
        },
        doActions(){
            DicBehaviorScore().then(res => {
                this.behaviorScore = res.data;
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
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            // console.log('row, column, rowIndex, columnIndex',row, column, rowIndex, columnIndex)
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
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
                case 'status':
                    updateExchangeMemberConfigUsingStatus(row.id).then(res => {
                        this.firstblood();
                    }).catch(err => {
                        this.$message({
                            type: 'warning',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                    })
                    break;
                case 'new':
                    // console.log(this.tableData)
                    let config = [];
                    let isOk = false;
                    let message;
                    config = objectMerge2(this.tableData);
                    config.forEach(el => {
                        if(!el.minBehaviorScore ){
                            isOk = true;
                            message = '兑换时最低行为分设置不可为空！'
                        }else if(!el.platformCoin){
                            isOk = true;
                            message = '兑换所需28币设置不可为空！'
                        }else if(!el.memberExpireDate){
                            isOk = true;
                            message = '会员有效期设置不可为空！'
                        }
                    })
                    if(!isOk){
                        this.btnShow = true;
                        addExchangeMemberConfig(config).then(res => {
                            this.$message({
                                type: 'success',
                                message: '保存成功！'
                            })
                            this.btnShow = false;
                            this.firstblood();
                        }).catch(err => {
                            this.$message({
                                type: 'warning',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                            this.btnShow = false;
                        })
                    }else{
                        this.$message({
                            type: 'info',
                            message: message
                        })
                    }
                    break
            }
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .exchangeMember{
        height: 100%;
        .classify_info .el-table .cell img {
            display: inline-block;
            width: 100px;
            height: 50px;
        }
        .classify_info{
            padding-bottom:60px; 
        }
        .member_footer{
            width: 100%;
            text-align: center;
            position: absolute;
            left: 0;
            bottom: 0;
            padding: 10px 0;
        }
    }
</style>

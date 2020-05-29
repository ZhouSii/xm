<template>
    <div class="TwoColumns purchaseMember clearfix" v-loading ="loading">
        <div class="columnsContainer">
            <div class="side_left">
                 <el-tree
                 ref="purchanseTree"
                :data="cityTree"
                node-key="code"
                :props="defaultProps"
                show-checkbox
                default-expand-all
                :highlight-current = "true"
                 @node-click="handleNodeClick"
                 @check="nodeClick"
                >
                </el-tree>
            </div>
            <div class="side_right">
                <div class="side_right_bottom clearfix">
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
                        v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_BUY_LIST
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
                                label="购买时最低行为分"
                                >
                                <template slot-scope="{row,$index}">
                                    <el-input v-model="row.minBehaviorScore" v-numberOnly @blur="checkInput($index,'minBehaviorScore','购买时最低行为分')" :size="inputSize" clearable></el-input> 
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="buyPrice"
                                label="购买金额"
                                >
                                <template slot-scope="{row,$index}">
                                    <el-input v-model="row.buyPrice" v-numberOnly @blur="checkInput($index,'buyPrice','购买金额')"  :size="inputSize"  clearable></el-input>            
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="primaryBuyPrice"
                                label="页面提示购买原价"
                                >
                                <template slot-scope="{row,$index}">
                                    <el-input v-model="row.primaryBuyPrice" v-numberOnly @blur="checkInput($index,'primaryBuyPrice','页面提示购买原价')"  :size="inputSize" clearable></el-input>            
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="memberExpireDate"
                                label="会员有效期（天）"
                                >
                                <template slot-scope="{row,$index}">
                                    <el-input v-model="row.memberExpireDate" v-numberOnly @blur="checkInput($index,'memberExpireDate','会员有效期')"  :size="inputSize" clearable></el-input>            
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
                    <div class="member_footer">
                        <el-button type="primary" icon="el-icon-success" plain @click="handleClick('new')" size="middle" :disabled="btnShow">保  存</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">

import { aflcProvinceCode } from '@/api/common.js'
// import { objectMerge2, parseTime } from '@/utils/'
import { listBuyMemberConfig,updateBuyMemberConfigUsingStatus,addBuyMemberConfig } from '@/api/marketing/MembershipSys.js'
import { objectMerge2 } from '@/utils/'

export default{
    data() {
        return {
            loading:true,
            btnShow:false,
            inputSize:'small',
            cityTree:[],
            btnsize: 'mini',
            tableData: [],
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 100000,
                "vo": {
                    belongCity:'',
                    city:'',
                    province:''
                }
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    components: {
    //   Pager,
    },
    // directives: {
    //     numberNum: {
    //         bind: function(el,bind) {
    //             console.log('el,bind',el,bind)
    //             el.handler = function() {
    //                 var formatVal = /^\+?[1-9][0-9]*$/;
    //                 var val = el.value;
    //                 if(!formatVal.test(val)){
    //                     var reg = new RegExp(val,'g');
    //                     el.value = val.replace(reg, 1);
    //                 }
    //             }
    //             el.addEventListener('input', el.handler)
    //         },
    //         unbind: function(el) {
    //         }
    //     }
    // },
    mounted() {
        this.firstblood()
    },
    methods: {
        checkInput(key,label,classfy){
            console.log('key,label',key,label,this.tableData[key][label])
            if(!this.tableData[key][label]){
                this.$message({
                    type: 'info',
                    message: '第'+(key+1)+"行"+classfy+'不可为空！'
                })
            }else if(parseInt(this.tableData[key][label]) == 0){
                this.$message({
                    type: 'info',
                    message: '第'+(key+1)+"行"+classfy+'不可为0！'
                })
                this.tableData[key][label] = '';
            }
        },
        // 刷新页面
        firstblood() {
            aflcProvinceCode().then(res => {
                // console.log('aflcProvinceCode',res)
                this.cityTree = res.data;
                this.listSystemObj.vo.belongCity = this.cityTree[0].children[0].code;
                this.listSystemObj.vo.province = this.cityTree[0].children[0].pname;
                this.listSystemObj.vo.city = this.cityTree[0].children[0].name;
                this.$refs.purchanseTree.setCheckedKeys([this.cityTree[0].children[0].code])
                this.getCommonFunction();
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
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        handleClick(type,row){
            switch(type){
                case 'status':
                    updateBuyMemberConfigUsingStatus(row.id).then(res => {
                        this.getCommonFunction();
                    }).catch(err => {
                        this.$message({
                            type: 'warning',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                    })
                    break;
                case 'new':
                    let config = [];
                    let isOk = false;
                    let message;
                    config = objectMerge2(this.tableData);
                    config.forEach(el => {
                        if(!el.minBehaviorScore ){
                            isOk = true;
                            message = '购买时最低行为分设置不可为空！'
                        }else if(!el.buyPrice){
                            isOk = true;
                            message = '购买金额设置不可为空！'
                        }else if(!el.primaryBuyPrice){
                            isOk = true;
                            message = '页面提示购买原价设置不可为空！'
                        }else if(!el.memberExpireDate){
                            isOk = true;
                            message = '会员有效期设置不可为空！'
                        }
                        el.belongCity =this.listSystemObj.vo.belongCity;
                        el.province =this.listSystemObj.vo.province;
                        el.city =this.listSystemObj.vo.city;
                    })
                    if(!isOk){
                        this.btnShow = true;
                        addBuyMemberConfig(config).then(res => {
                            this.$message({
                                type: 'success',
                                message: '保存成功！'
                            })
                            this.btnShow = false;
                            this.getCommonFunction();
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
        // 查询和获取对应区域的数据
        getCommonFunction() {
            this.loading = true;
            listBuyMemberConfig(this.listSystemObj).then(res => {
                let rowData = [];
                this.tableArr = res.data;
                res.data.forEach(el => {
                    el.configs.forEach(item => {
                        rowData.push(item)
                    })
                })
                this.tableData = rowData;
                this.getSpanArr(this.tableData);
                this.loading = false;
            })
        },
        handleNodeClick(data, checked) {
            // console.log('1231',data)
            // this.listSystemObj.vo.belongCity = data.code;
            // this.listSystemObj.vo.province = data.pname;
            // this.listSystemObj.vo.city = data.name;
            // this.getCommonFunction()
        },
        nodeClick(data){
            console.log('nodeClick',data)
            this.listSystemObj.vo.belongCity = data.code;
            this.listSystemObj.vo.province = data.pname;
            this.listSystemObj.vo.city = data.name;
            this.$refs.purchanseTree.setCheckedKeys([data.code])
            this.getCommonFunction()
        }
    }
    }
</script>

<style type="text/css" lang="scss">
    .purchaseMember{
        height:100%;    
        position: relative;
        margin-left:7px;
        padding-bottom: 0px;
        .el-checkbox{
            display: none;
        }
        .el-tree-node__children{
            .el-checkbox{
                display: block
            }
        }
        .side_right_bottom{
            padding-bottom:60px; 
            .member_footer{
                width: 100%;
                text-align: center;
                position: absolute;
                left: 0;
                bottom: 0;
                padding: 10px 0;
            }
        }
    }
</style>

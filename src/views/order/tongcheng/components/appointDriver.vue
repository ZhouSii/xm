<template>
<!-- 指派司机 -->
    <div class="appoint commoncss">
        <el-dialog title='指派司机' :close-on-click-modal="false"  :visible="dialogFormVisible" @close="close" v-el-drag-dialog>
            <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                <el-form-item label="车主" prop="search">
                    <el-input v-model="searchInfo.search" clearable placeholder="车主姓名/手机账号/车牌号码">
                    </el-input>
                </el-form-item>
                <el-form-item label="车型" prop="carType">
                    <el-select v-model="searchInfo.carType" clearable placeholder="请选择">
                        <el-option
                        v-for="item in optionsCarType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="iftequan">
                    <el-checkbox v-model="iftequan" @change = "ifTequan">特权车</el-checkbox>
                </el-form-item>
                <el-form-item class="btnChoose fr"  style="margin-left:0;">
                    <el-button type="primary" :size="btnsize" plain @click="pointSearch('search','point')">搜索</el-button>
                    <el-button type="info" :size="btnsize" plain @click="pointSearch('clear','point')">清空</el-button>
                </el-form-item>
            </el-form>
            <div class="pointInfo">
                <div class="pointChoose">
                    <el-button type="primary" :size="btnsize" class="el-icon-edit" plain :disabled="btnShow"  @click="pointXX">指派给选中车主</el-button>
                    <el-table
                    ref="multipleTable"
                    :data="tableData_point"
                    stripe
                    border
                    @selection-change = "getinfomation"
                    tooltip-effect="dark"
                    @row-click="clickDetails"
                    style="width: 100%"> 
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column label="序号"  width="80">
                            <template slot-scope="scope">
                                {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="driverMobile"
                            label="车主账号">
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="driverName"
                            label="车主姓名">
                        </el-table-column>
                        <el-table-column
                        prop="carNumber"
                        label="车牌号码">
                        </el-table-column>
                        <el-table-column
                        prop="carType"
                        label="车型">
                        </el-table-column>
                        <el-table-column
                        prop="distance"
                        label="距离提货地(M)">
                            <template slot-scope="scope">
                                <span class="pointStance">{{scope.row.distance}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="obtainGrade"
                        label="中单等级">
                        </el-table-column>
                        <el-table-column
                        prop="isVipCar"
                        label="是否特权车">
                            <template slot-scope="scope">
                                <span>{{scope.row.isVipCar == 1 ? '是' : '否'}}</span>
                            </template>
                        </el-table-column>
                            <el-table-column
                        prop=""
                        label="是否货主收藏司机">
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="本日与该货主交易次数">
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="本月与该货主交易次数">
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="本月累计交易次数">
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="本月交易成功订单量">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" /></div> </div>    
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { getDictionary } from '@/api/common.js'
import { appointDriverList,nearDriverList } from '@/api/order/ordermange.js'
import Pager from '@/components/Pagination/index'

export default {
    name: 'appointDriver',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true,
        },
        orderSerial:{
            type:String,
            required:true,
        }
    },
    components:{
        Pager
    },
    data() {
        return {
            btnsize:'mini',
            btnShow:false,
            page:1,
            pagesize:20,
            dataTotal:0,
            carType:'AF018',//车型
            iftequan:false,
            searchInfo:{
                orderSerial:'',
                carType:'',//车辆类型
                isVipCar:'',//是否vip司机(1为是，0为否)(可选)
                search:'',//车主账号(可选)，姓名，车牌号
            },
            optionsCarType:[
              
            ],
            tableData_point:[],//车主列表
            selectRowData:{},
            checkedinformation:[],
        };
    },
    computed: {
    　
    },
    watch:{
        dialogFormVisible(newValue,oldValue){
            if(newValue){
                this.init()
            }
        }
    },
    mounted(){
    },
    methods: {
        getCurrentRow(index,row){       
            this.selectRowData = Object.assign({},row);
            // console.log('选中内容',row)
        },
        handlePageChange(obj) {
            this.page = obj.pageNum;
            this.pagesize = obj.pageSize;
            this.init();
        },
        //初始化选择项数据
        init(point){
            this.searchInfo.orderSerial = this.orderSerial;
            
            getDictionary(this.carType).then(res => {
                this.optionsCarType = res.data;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            });

           this.DriverList();
        },
        DriverList(){
            nearDriverList(this.searchInfo).then(res => {
                this.dataTotal = res.data.length;
                if(this.dataTotal != 0){
                    let pageStart =  (this.page - 1) * this.pagesize;
                    let pageEnd = this.page * this.pagesize;
                    this.tableData_point = res.data.slice(pageStart,pageEnd);
                }else{
                    this.$message({
                        type: 'info',
                        message: '无符合条件的司机'
                    })
                    this.dataTotal = 0 ;
                    this.tableData_point = []
                }
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '无符合条件的司机'
                })
                this.dataTotal = 0 ;
                this.tableData_point = [];
            })
        },
        //判断是否选中
        getinfomation(selection){
            this.checkedinformation = selection;
            this.selectRowData = Object.assign({},this.checkedinformation[0]);
        },
         //点击选中当前行
        clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
        },
        pointSearch(type,point){
            switch(type){
                case 'search':
                    this.DriverList();
                    break;
                case 'clear':
                    this.iftequan = false;
                    this.ifTequan(false)
                    this.$refs.ruleForm.resetFields();
                    this.DriverList();
                    break;
            }
        },
        pointXX(){
            if(this.checkedinformation.length == 0){
                this.$message({
                    type: 'warning',
                    message: '请选择要指派的司机~'
                })
            }else if(this.checkedinformation.length > 1){
                this.$message({
                    type: 'warning',
                    message: '不可同时指派给多个司机~'
                })
            }else{
                this.btnShow = true;
                let coordinate = [];
                coordinate.push(this.selectRowData.latitude,this.selectRowData.longitude)
                let pointData = Object.assign({},{orderSerial:this.orderSerial,driverId:this.selectRowData.driverId,distance:this.selectRowData.distance,coordinate:coordinate.join(',')});
                appointDriverList(pointData).then(res => {
                    this.close()
                }).catch(err => {
                    this.btnShow = false;
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                })
            }
        },
        close(){
            this.$emit('update:dialogFormVisible',false)
            this.$refs.ruleForm.resetFields();
            this.iftequan = false;
            this.btnShow = false;
            this.$emit('close');
            if (typeof done === 'function') {
                done()
            }
        },
        ifTequan(value){
            this.searchInfo.isVipCar = value == true ? '1' : '';
        }
        
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .appoint{
        .el-dialog__body{
            position: relative;
            .pointInfo{
                padding: 0 10px;
                .pointChoose{
                    .el-button{
                        span{
                            margin-left: 5px;
                        }
                    }
                    .el-table{
                        margin-top: 10px;
                       
                    }
                }
            }
           
        }

    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .appoint{
         .el-dialog{
            width: 1380px;
            .el-dialog__body{
                padding:20px 2px;
                border-bottom:0 none;
                position: relative;
                .el-form-item__content{
                    width:200px;
                    .el-select{
                        width: 100%;
                    }
                }
                .el-form-item__content:last-child{
                 }
                .pointInfo{
                    .pointChoose{
                        margin-bottom:14px;
                        .el-button{
                            span{
                                margin-left: 5px;
                            }
                        }
                        .el-table{
                            th,td{
                                padding: 2px 0;
                            }
                            th{
                                color:#333;
                            }
                            th .cell {
                                white-space: normal;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                min-height: 26px;
                                line-height: 26px;
                            }
                            .pointStance{
                                color:red;
                                font-weight:bold;
                            }
                        }
                    }
                    .info_tab_footer{
                        position: relative;
                    }
                }
               
            }
        }
        .el-dialog .el-dialog__body .el-form .el-form-item .el-form-item__content .el-input .el-input__inner{
            height: 30px;
            line-height:30px;
        }

    }
</style>


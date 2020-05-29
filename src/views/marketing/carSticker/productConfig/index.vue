<template>
    <div class="identicalStyle productConfig" v-loading="loading">
        <el-form :inline="true" :model="listSystemObj" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="所属区域" prop="orderAreaName">
                <getCityList class="chooseItem" @returnStr="getStr" v-model="listSystemObj.vo.orderAreaName" ref="area"></getCityList>
            </el-form-item>
            <el-form-item label="产品名称" prop="produceName">
                <el-input v-model="listSystemObj.vo.produceName" clearable></el-input>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" :size="btnsize" icon="el-icon-search" plain @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" :size="btnsize" icon="fontFamily aflc-icon-qingkong" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <!-- <el-button type="primary" icon="el-icon-download" plain :size="btnsize" @click="handleClick('copy')" v-has:MARKETING_DISTRIBUTION_STATISTICAL_ORDER_SUM_EXPORT_EXCEL>导出EXCEL</el-button> -->
                <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="handleClick('new')" v-has:MARKETING_CARSTICKER_CARSTICKERCONFIGURE_ADD>新增</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:MARKETING_CARSTICKER_CARSTICKERCONFIGURE_MODIFY>修改</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleClick('delet')" v-has:MARKETING_CARSTICKER_CARSTICKERCONFIGURE_DELETE>删除</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')" v-has:MARKETING_CARSTICKER_CARSTICKERCONFIGURE_DISPLAY>显示/屏蔽</el-button>
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
                @row-click="clickDetails"
                style="width: 100%"
                >
                    <el-table-column label="选择" width="60" align="center">
                        <template slot-scope="scope">
                            <el-radio class="radio"  v-model="radio"  :label="scope.row.id">&nbsp;</el-radio>
                        </template>
                    </el-table-column>  
                    <template v-for="(column,key) in tableColumn">
                        <el-table-column sortable :key="key" :fixed="column.fixed" :label="column.label" :show-overflow-tooltip="column.overflow" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column>
                        <el-table-column sortable :key="key" :fixed="column.fixed" :label="column.label" :show-overflow-tooltip="column.overflow" v-else :width="column.width || ''">
                            <template slot-scope="scope">
                                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope.row)"></span>
                                <span v-else v-html="column.slot(scope)"></span>
                            </template>
                        </el-table-column>
                    </template>
                </el-table>
            </div>
        </div>   
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    
        <add :dialogFormVisible.sync = "dialogFormVisible" @renovate="firstblood" :isView='isView' :formtitle = "formtitle" :changeForm="changeForm" :isModify = 'isModify'/>

    </div>
</template>

<script type="text/javascript">
import { carStickerList,deleteCarSticker,carStickerStatus } from '@/api/marketing/carSticker'
import Pager from '@/components/Pagination/index'
import { objectMerge2,parseTime } from '@/utils/'
import { SaveAsFile } from '@/utils/lodopFuncs'
import getCityList from '@/components/GetCityList/index'
import add from './add'

export default{
    name:'productConfig',
    components: {
        Pager,
        getCityList,
        add
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dialogFormVisible:false,
            isModify:false,
            isView:false,
            formtitle:'',
            changeForm:{},
            totalCount: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    produceName:'',//产品名称
                    fullCityName:'',//所属区域
                    cityCode:'',//所属区域编码
                }
            },
            chooseTime:[],
            tableData: [],
            radio:'',
            selected:{},
            tableColumn:[{
                label: '序号',
                prop: 'id',
                width: '80',
                fixed: false,
                slot: (scope) => {
                    return (this.listSystemObj.currentPage - 1)*this.listSystemObj.pageSize + scope.$index + 1;
                }
            },{
                'label': '所属区域',
                'prop': 'fullCityName',
                fixed: false,
                // width:'150',
                overflow:true,
            },{
                'label': '产品名称',
                'prop': 'produceName',
                // width:'150',
                fixed: false,
                overflow:true,
                click:function(row){
                    // console.log('row',row)
                    // this.$router.push({name: '订单详情',query:{ produceName:row.produceName }});
                    this.dialogFormVisible = true;
                    this.formtitle = '车贴产品配置详情';
                    this.isView = true;
                    this.isModify = false;
                    this.changeForm = row;
                }.bind(this),
                slot: (scope) => {
                    return  '<h4 class="moreInfo">'+scope.row.produceName+'</h4>';
                }
            },{
                'label': '车贴类型',
                'prop': 'carStickerTypeName',
                width:'150',
                fixed: false,
                overflow:true,
            },{
                'label': '车辆类型',
                'prop': 'carTypeName',
                width:'150',
                fixed: false,
                overflow:true,
            },{
                'label': '车贴时效(月)',
                'prop': 'carVaild',
                width:'150',
                fixed: false,
                overflow:true,
            },{
                'label': '奖励(元/月)',
                'prop': 'reward',
                width:'150',
                fixed: false,
                overflow:true,
            },{
                'label': '首次申请费用(元)',
                'prop': 'firstApplyFee',
                width:'150',
                fixed: false,
                overflow:true,
                slot: (scope) => {
                    return  scope.row.firstApplyFee == 0 ? '免费' : scope.row.firstApplyFee+'元/次'
                }
            },{
                'label': '再次申请费用(元/次)',
                'prop': 'againApplyFee',
                width:'150',
                fixed: false,
                overflow:true,
                slot: (scope) => {
                    return  scope.row.againApplyFee == 0 ? '免费' : scope.row.againApplyFee+'元/次'
                }
            },{
                'label': '创建时间',
                'prop': 'createTime',
                width:'160',
                fixed: false,
                overflow:true,
                slot: (scope) => {
                    return  parseTime(scope.row.createTime)
                }
            },{
                'label': '显示状态',
                'prop': 'usingStatus',
                width:'150',
                fixed: false,
                overflow:true,
                slot: (scope) => {
                    return  scope.row.usingStatus == '1' ? '显示' : '屏蔽'
                }
            }],
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
        // 点击选中当前行
		clickDetails(row, event, column) {
            // this.$refs.multipleTable.toggleRowSelection(row)
            this.radio = row.id;
            this.selected = row;
		},
        getStr(d){
            this.listSystemObj.vo.fullCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
            this.listSystemObj.vo.cityCode = d.city.code;
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        handleSearch(type) {
            if(type == 'clear'){
                this.listSystemObj.vo = {
                    produceName:'',//产品名称
                    fullCityName:'',//所属区域
                    cityCode:'',//所属区域编码
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
            carStickerList(this.listSystemObj).then(res => {
                this.totalCount = res.data.totalCount;
                // let currentData = objectMerge2(res.data.list);
                // currentData.forEach(el => {
                //     el.useTimeNow = parseTime(el.useTime);
                // })
                this.tableData = res.data.list;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
        handleClick(type){
            // SaveAsFile({
            //     data: this.tableData ? this.tableData : [],
            //     columns: this.tableColumn,
            //     name: '接单码接单汇总-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
            // })
            if(this.selected.id || type =='new'){
                switch(type){
                    case 'new':
                        this.dialogFormVisible = true;
                        this.formtitle = '新增车贴产品配置';
                        this.isModify = false;
                        this.isView = false;
                        break;
                    case 'revise':
                        this.dialogFormVisible = true;
                        this.formtitle = '修改车贴产品配置';
                        this.isView = false;
                        this.isModify = true;
                        this.changeForm = this.selected;
                        break;
                    case 'delet':
                        deleteCarSticker(this.selected.id).then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.firstblood();
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                        })
                        break;
                    case 'status':
                        let status = [];
                        status.push(this.selected.id);
                        carStickerStatus(status).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            this.selected = {};
                            this.radio = '';
                            this.firstblood();
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                        })
                        break;
                    
                }
            }else{
                this.$message({
                    type: 'warning',
                    message: '请选择一条列表数据!'
                });
            }
        }
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .productConfig{
    }
</style>

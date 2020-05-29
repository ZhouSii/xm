<template>
    <div class="identicalStyle carrierPointNetwork" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="网点名称" prop="pointName">
                <el-input v-model="listSystemObj.vo.pointName" clearable></el-input>
            </el-form-item>
            <el-form-item label="专线承运商" prop="carrierName">
                <el-input v-model="listSystemObj.vo.carrierName" clearable></el-input>
            </el-form-item>
            <el-form-item label="网点所在地" prop="totalArea">
                <el-input v-model="listSystemObj.vo.totalArea" clearable></el-input>
            </el-form-item>
            <el-form-item label="网点所在物流园" prop="parkName">
                <el-input v-model="listSystemObj.vo.parkName" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态"   prop="flag">
                <el-select v-model="listSystemObj.vo.flag" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsStatusType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize" v-has:DISPATCH_HAIRLOGISTICS_DOTMANAGEMENT_ADD>新增</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:DISPATCH_HAIRLOGISTICS_DOTMANAGEMENT_MODIFY>修改</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')" v-has:DISPATCH_HAIRLOGISTICS_DOTMANAGEMENT_ENABLEDISABLE>启用/禁用</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    border
                    align = "center"
                    height="100%"
                    @selection-change = "getinfomation"
                    tooltip-effect="dark"
                    @row-click="clickDetails"
                    style="width: 100%"> 
                    <el-table-column label="选择" width="60" align="center">
                        <template slot-scope="scope">
                            <el-radio class="radio"  v-model="radio"  :label="scope.row.id">&nbsp;</el-radio>
                        </template>
                    </el-table-column>  
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                        label="专线承运商网点名称"
                        sortable
                        :show-overflow-tooltip="true"
                        prop="pointName"
                        min-width="250">
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{ scope.row.pointName}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="carrierName"
                        :show-overflow-tooltip="true"
                        sortable
                        label="专线承运商"
                        min-width="250">
                    </el-table-column>
                    <el-table-column
                        prop="totalArea"
                        :show-overflow-tooltip="true"
                        sortable
                        label="网点所在地"
                        min-width="200">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="parkName"
						min-width="150"
                        label="网点所在物流园"
                        >
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="contactName"
                        label="网点联系人"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="contactMobile"
                        label="网点联系人电话"
                        min-width="150">
                    </el-table-column>
                     <el-table-column
                        sortable
                        prop="serviceMobile"
                        label="网点客服电话"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="flag"
                        label="状态"
                        min-width="150">
                        <template  slot-scope="scope">
                            {{scope.row.flag == '1' ? '启用':'禁用'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="updater"
                        label="最新操作人"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="updateTime"
                        label="最新操作时间"
                        min-width="150">
                        <template slot-scope="scope">
                            {{ scope.row.updateTime | parseTime}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
        <add :dialogFormVisible.sync = "dialogFormVisible" :isModify="isModify" :isView="isView" :changeForm="changeForm" :formtitle = "formtitle"  @renovate="firstblood"/>
    </div>
</template>

<script type="text/javascript">
import { carrierPointNetworkList,carrierPointNetworkStatus } from '@/api/dispatch/carrierPointNetwork.js'
import Pager from '@/components/Pagination/index'
import add from './add'

export default{
    name:'carrierPointNetwork',
	components: {
		Pager,
        add,
	},
	data(){
		return {
			btnsize: 'mini',
			loading: false, // 加载
            dialogFormVisible:false,
            isModify:false,
            isView:false,
            changeForm:{},
            formtitle:'',
			dataTotal: 0,
			ids:[],
			tableData: [],
			listSystemObj:{
				"currentPage": 1,
				"pageSize": 20,
				"vo": {
				    "carrierName": "",//承运商名称
                    "flag": "",//数据状态（0：禁用 1：启用）
                    "parkName": "",//物流园名称
                    "pointName": "",//网点名称
                    "totalArea": "",//所在地
				}
            },
            optionsStatusType:[{
				name:'全部',
				code:""
			},{
				name:'启用',
				code:"1"
			},{
				name:'禁用',
				code:"0"
            }],
            radio:'',
            selected:{}
		}
	},
	mounted() {
        this.firstblood()
	},
	methods: {
		handlePageChange(obj) {
			this.listSystemObj.currentPage = obj.pageNum;
			this.listSystemObj.pageSize = obj.pageSize;
			this.firstblood();
		},
		// 刷新页面
		firstblood() {
			this.loading = true
			carrierPointNetworkList(this.listSystemObj).then(res => {
				this.tableData = res.data.list;
				this.dataTotal = res.data.totalCount;
                this.loading = false;
			}).catch(err => {
				this.loading = false;
			})
		},
		// 模糊查询 分类名称或者code
		handleSearch(type) {
			if(type == 'clear'){
				this.listSystemObj.vo ={
				    "carrierName": "",//承运商名称
                    "flag": "",//数据状态（0：禁用 1：启用）
                    "parkName": "",//物流园名称
                    "pointName": "",//网点名称
                    "totalArea": "",//所在地
				}
			}
			if(this.listSystemObj.currentPage!= 1){
				this.listSystemObj.currentPage = 1;
				this.$refs.pager.inputval = this.listSystemObj.currentPage;
				this.$refs.pager.pageNum = this.listSystemObj.currentPage;
			}
			this.firstblood();
		},
		handleClick(type,row){
            if(this.selected.id || type =='new' || type =='details'){
                switch (type) {
                    case 'new':
                        this.dialogFormVisible = true;
                        this.formtitle = '新增专线承运商网点';
                        this.isModify = false;
                        this.isView = false;
                        break;
                    case 'revise':
                        this.dialogFormVisible = true;
                        this.formtitle = '修改专线承运商网点';
                        this.isModify = true;
                        this.isView = false;
                        this.changeForm = this.selected;
                        break;
                    case 'details':
                        this.formtitle = '专线承运商网点详情';
                        this.dialogFormVisible = true;
                        this.changeForm = row;
                        this.isModify = false;
                        this.isView = true;
                        break;
                    case 'status':
                        let message = this.selected.flag == '0' ? '确认启用当前配置吗?' :'确认禁用当前配置吗？禁用后该配置将无效。';
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let statusObj = {
                                banOrUse:'',
                                id:''
                            }
                            statusObj.id = this.selected.id;
                            statusObj.banOrUse = this.selected.flag == '0' ? '1' : '0';
                            carrierPointNetworkStatus(statusObj).then(res => {
                                this.firstblood()
                                this.$message({
                                    type: 'success',
                                    message: this.selected.flag == '0' ? '启用成功!' : '禁用成功!'
                                });
                                this.selected = {};
                                this.radio = '';
                            }).catch(err => {
                                this.$message({
                                    type: 'info',
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
            }else{
                this.$message({
                    type: 'warning',
                    message: '请选择一条列表数据!'
                });
            }
        },
		// 判断是否选中
		getinfomation(selection) {
			this.checkedinformation = selection
		},
		// 点击选中当前行
		clickDetails(row, event, column) {
            // this.$refs.multipleTable.toggleRowSelection(row)
            this.radio = row.id;
            this.selected = row;
		},
	}
}
</script>

<style type="text/css" lang="scss" scoped>
    .carrierPointNetwork{
        height: 100%;
    }
</style>

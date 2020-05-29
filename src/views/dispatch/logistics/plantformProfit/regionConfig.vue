<template>
    <div class="identicalStyle regionConfig" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="区域" prop="totalArea">
                <el-input v-model="listSystemObj.vo.totalArea" clearable></el-input>
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
                <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="handleClick('new')" v-has:DISPATCH_HAIRLOGISTICS_DISTRIBUTIONCONFIGURATION_REGION_ADD>新增</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:DISPATCH_HAIRLOGISTICS_DISTRIBUTIONCONFIGURATION_REGION_MODIFY>修改</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')" v-has:DISPATCH_HAIRLOGISTICS_DISTRIBUTIONCONFIGURATION_REGION_ENABLEDISABLE>启用/禁用</el-button>
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
                    <!-- <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column> -->
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
                        sortable
                        label="区域"
                        prop="areatCode"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{scope.row.province+scope.row.city+scope.row.area}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        sortable
                        prop="turnoverRatio"
                        label="按营业额分润比例">
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        sortable
                        prop="transferRatio"
                        label="按中转差价分润比例">
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        sortable
                        prop="singleLowestCost"
                        label="最低一票分润金额（元）">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="flag"
                        label="状态">
						 <template slot-scope="scope">
                            {{ scope.row.flag == '0' ? '禁用' : '启用' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="creater"
                        label="最新操作人">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="createTime"
                        label="最新操作时间">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | parseTime }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
        <addR :dialogFormVisible.sync = "dialogFormVisible" :isModify="isModify" :changeForm="changeForm" :formtitle = "formtitle"  @renovate="firstblood"/>
    </div>
</template>

<script type="text/javascript">
import { regionConfigList,regionConfigStatus } from '@/api/dispatch/plantformProfit'
import Pager from '@/components/Pagination/index'
import addR from './component/addR'
export default{
    name:'regionConfig',
	props: {
		isvisible: {
			type: Boolean,
			default: false
		}
	},
	components: {
		Pager,
        addR,
	},
	data() {
		return {
			btnsize: 'mini',
			loading: false, // 加载
            dialogFormVisible:false,
            isModify:false,
			changeForm:{},
			formtitle:'',
			dataTotal: 0,
			tableData: [],
			listSystemObj:{
				"currentPage": 1,
				"pageSize": 20,
				"vo": {
                   totalArea:'',//区域名称
                   flag:'',
				}
			},
            checkedinformation:[],
            selected:{},
            radio:'',
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
		}
	},
	watch: {
		isvisible: {
			handler(newVal, oldVal) {
				if (newVal) {
					this.firstblood()
				} 
			},
			// 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
			immediate: true
		}
	},
	mounted() {
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
			regionConfigList(this.listSystemObj).then(res => {
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
                for (const i in this.listSystemObj.vo) {
                    this.listSystemObj.vo[i] = ''
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
            // console.log('type,row',type,row)
            if(this.selected.id || type =='new'){
                switch (type) {
                    case 'new':
                        this.dialogFormVisible = true;
                        this.formtitle = '新增按区域配置平台分润规则';
                        this.isModify = false;
                        break;
                    case 'revise':
                        this.dialogFormVisible = true;
                        this.formtitle = '修改按区域配置平台分润规则';
                        this.isModify = true;
                        this.changeForm = this.selected;
                        break;
                    case 'status':
                        let message = this.selected.flag == '0' ? '确认启用当前区域配置吗?' :'确认禁用当前区域配置吗？禁用后区域配置将无效。';
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
                            regionConfigStatus(statusObj).then(res => {
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
    .regionConfig{
        height: 100%;
    }
</style>

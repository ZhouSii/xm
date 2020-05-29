<template>
    <div class="identicalStyle trunkLinePriceHistoryList" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="区代" prop="agencyName">
                <el-input v-model="listSystemObj.vo.agencyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代物流公司" prop="companyName">
                <el-input v-model="listSystemObj.vo.companyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="提货街道所属行政区" prop="commonArea">
                <el-input v-model="listSystemObj.vo.commonArea" clearable></el-input>
            </el-form-item>
            <el-form-item label="提货街道" prop="street">
                <el-input v-model="listSystemObj.vo.street" clearable></el-input>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    border
                    align = "center"
                    height="100%"
                    tooltip-effect="dark"
                    style="width: 100%"> 
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                        sortable
                        label="区代"
                        prop="agencyName"
                        :show-overflow-tooltip="true"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        label="区代物流公司"
                        prop="companyName"
                        :show-overflow-tooltip="true"
                        min-width="200">
                    </el-table-column>
                    <el-table-column
                        sortable
                        label="区代所在地"
                        prop="agencyArea"
                        :show-overflow-tooltip="true"
                        min-width="200">
                    </el-table-column>
                    <el-table-column
                        sortable
                        label="提货街道"
                        prop="street"
                        :show-overflow-tooltip="true"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        sortable
                        prop="province"
                        label="提货街道所属行政区"
                        min-width="200">
						<template slot-scope="scope">
                            {{ scope.row.province }}{{ scope.row.city }}{{ scope.row.area }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        :show-overflow-tooltip="true"
                        label="轻货(元/票)"
						min-width="250"
                        >
						<template slot-scope="scope">
                            <div v-html="scope.row.smallGoods" class="vHtml"></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
						min-width="250"
                        label="重货(元/票)"
                        >
						<template slot-scope="scope">
                            <div v-html="scope.row.biggerGoods" class="vHtml"></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="creater"
                        min-width="150"
                        label="生效操作人">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="createTime"
                        label="生效时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | parseTime }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="inefficienter"
                        min-width="150"
                        label="失效操作人">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="inefficientTime"
                        label="失效时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.inefficientTime | parseTime }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
            <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">
import { collectFeesList2 } from '@/api/server/lingdan/otherService.js'
import Pager from '@/components/Pagination/index'
export default{
	props: {
		isvisible: {
			type: Boolean,
			default: false
		}
	},
	components: {
		Pager,
	},
	data() {
		return {
			btnsize: 'mini',
			loading: false, // 加载
			dataTotal: 0,
			tableData: [],
			listSystemObj:{
				"currentPage": 1,
				"pageSize": 20,
				"vo": {
                    "agencyName": "",//区代名称
                    "commonArea": "",//区域
                    "companyName": "",//companyName
                    "flag": "",//数据状态(1:启用,0:禁用,2:历史)
                    "street": "",//街道
                    "useOrHistory": "1",//现在或历史列表(0:现在,1:历史)
                    "useType": "1",//定价类型(0:送货,1:提货)
                    "platformType": "2",//平台类型(2：区代，3：平台)

				}
			},
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
			this.loading = true;
			collectFeesList2(this.listSystemObj).then(res => {
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
                    "agencyName": "",//区代名称
                    "commonArea": "",//区域
                    "companyName": "",//companyName
                    "flag": "",//数据状态(1:启用,0:禁用,2:历史)
                    "street": "",//街道
                    "useOrHistory": "1",//现在或历史列表(0:现在,1:历史)
                    "useType": "1",//定价类型(0:送货,1:提货)
                    "platformType": "2",//平台类型(2：区代，3：平台)

				}
			}
			if(this.listSystemObj.currentPage!= 1){
				this.listSystemObj.currentPage = 1;
				this.$refs.pager.inputval = this.listSystemObj.currentPage;
				this.$refs.pager.pageNum = this.listSystemObj.currentPage;
			}
			this.firstblood();
		},
	}
}
</script>

<style type="text/css" lang="scss" scoped>
    .trunkLinePriceHistoryList{
        height: 100%;
    }
</style>

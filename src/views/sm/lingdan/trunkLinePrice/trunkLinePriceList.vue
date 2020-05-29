<template>
    <div class="identicalStyle trunkLinePriceList" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="区代" prop="agencyName">
                <el-input v-model="listSystemObj.vo.agencyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代物流公司" prop="companyName">
                <el-input v-model="listSystemObj.vo.companyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代所在地" prop="agencyArea">
                <el-input v-model="listSystemObj.vo.agencyArea" clearable></el-input>
            </el-form-item>
            <el-form-item label="到达地" prop="totalEndArea">
                <el-input v-model="listSystemObj.vo.totalEndArea" clearable></el-input>
            </el-form-item>
            <el-form-item label="平台推荐路线"   prop=" platformRecommend">
                <el-select v-model="listSystemObj.vo.platformRecommend" clearable placeholder="请选择">
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
                <el-button type="primary" icon="el-icon-upload2" plain @click="handleClick('batchImport')" :size="btnsize" v-has:SERVICE_DISTRICTSALESPRICING_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_BATCHIMPORT>批量导入</el-button>
                <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize" v-has:SERVICE_DISTRICTSALESPRICING_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_ADD>新增</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:SERVICE_DISTRICTSALESPRICING_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_MODIFY>修改</el-button>
                <!-- <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status_ban')" v-has:SERVICE_DISTRICTSALESPRICING_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_ENABLEDISABLE>启用</el-button> -->
                <el-button type="primary" :size="btnsize" plain icon="el-icon-open" @click="handleClick('status_use')">启用</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-turn-off" @click="handleClick('status_ban')">禁用</el-button>
                <el-button type="primary" icon="el-icon-upload" plain @click="handleClick('export')" :size="btnsize" v-has:SERVICE_DISTRICTSALESPRICING_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_EXPORT>导出</el-button>
                <el-button type="primary" icon="el-icon-download" plain @click="handleClick('download')" :size="btnsize" v-has:SERVICE_DISTRICTSALESPRICING_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_DOWNLOAD>下载导入模板</el-button>
                <!-- <el-button type="primary" icon="el-icon-document" plain @click="handleClick('batch')" :size="btnsize">批量修改定价</el-button> -->
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
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <!-- <el-table-column label="选择" width="60" align="center">
                        <template slot-scope="scope">
                            <el-radio class="radio" v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
                        </template>
                    </el-table-column> -->
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
                    <!-- <el-table-column
                        label="出发地"
                        sortable
                        :show-overflow-tooltip="true"
                        width="200">
						<template slot-scope="scope">
                            {{ scope.row.startProvince }}{{ scope.row.startCity }}{{ scope.row.startArea }}
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="totalEndArea"
                        sortable
                        label="到达地"
                        min-width="200">
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="轻货(元/立方)"
						min-width="250"
                        >
						<template slot-scope="scope">
                            <div v-html="scope.row.smallGoods"></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
						min-width="250"
                        label="重货(元/公斤)"
                        >
						<template slot-scope="scope">
                            <div v-html="scope.row.biggerGoods"></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        sortable
                        prop="singleLowestCost"
                        label="最低一票收费(元)"
                        min-width="150">
                        <!-- <template slot-scope="scope">
                            <div v-html="scope.row.lightGoods" class="vHtml"></div>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        sortable
                        prop="startTranAging"
                        label="运输时效(天)"
                        min-width="150">
						 <template slot-scope="scope">
                            <!-- {{ scope.row.tranAging | dataParams }} -->
                            <!-- <div v-if="scope.row.startTranAging !== scope.row.startTranAging"> -->
                                <span>{{scope.row.startTranAging}}</span>
                                <span>~</span>
                                <span>{{scope.row.endTranAging}}</span>
                            <!-- </div>
                            <div v-else>
                                {{scope.row.startTranAging}} 天
                            </div> -->
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="platformRecommendZhCn"
                        label="平台推荐路线"
                        min-width="150">
                        <!-- <template slot-scope="scope">
                            <div v-html="scope.row.lightGoods" class="vHtml"></div>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="flag"
                        label="状态"
                        min-width="150">
						 <template slot-scope="scope">
                            {{ scope.row.flag == '0' ? '禁用' : '启用' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="creater"
                        label="创建人"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="createTime"
                        label="创建时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | parseTime }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
        <add :dialogFormVisible.sync = "dialogFormVisible" :batchIds = "ids" :isBatch = "isBatch" :isModify="isModify" :changeForm="changeForm" :formtitle = "formtitle"  @renovate="firstblood"/>
        <batchImport :dialogVisible.sync="dialogVisible" @downloading="handleClick('download')" :exportType = "typeClass" :currentTitle = "titleTxt" @close = "firstblood"/>
    </div>
</template>

<script type="text/javascript">
// import { trunkLinePriceList,trunkLinePriceStatus2 } from '@/api/server/lingdan/otherService.js'
import { trunkLinePriceList2,trunkLinePriceStatus2,exportAgency } from '@/api/server/lingdan/otherService.js'
// import { DicTradeCarrier } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import add from './newTrunkLinePrice'
import batchImport from './batchImport';
export default{
	props: {
		isvisible: {
			type: Boolean,
			default: false
		}
	},
	components: {
		Pager,
        add,
        batchImport
	},
	data() {
		return {
            radio:'',
			btnsize: 'mini',
			loading: false, // 加载
            dialogFormVisible:false,
            dialogVisible:false,
			isBatch:false,
            isModify:false,
            titleTxt:'',
            typeClass:'',
            changeForm:{},
            selected:{},
			formtitle:'',
			dataTotal: 0,
			ids:[],
			tableData: [],
			listSystemObj:{
				"currentPage": 1,
				"pageSize": 20,
				"vo": {
                    "agencyArea": "",//区代所在地
                    "agencyName": "",//区代名称
                    "companyName": "",//区代公司名称
                    "platformType": "2",//平台类型(2：区代，3：平台)
                    "totalEndArea": "",//到达地
                    "useOrHistory": "0",//现在或历史列表(0:现在,1:历史)
                     platformRecommend:'',//平台推荐路线
				}
			},
			optionsStatusType:[{
				name:'全部',
				code:""
			},{
				name:'是',
				code:"1"
			},{
				name:'否',
				code:"0"
            }],
            checkedinformation:[],
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
			trunkLinePriceList2(this.listSystemObj).then(res => {
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
					"agencyArea": "",//区代所在地
                    "agencyName": "",//区代名称
                    "companyName": "",//区代公司名称
                    "platformType": "2",//平台类型(2：区代，3：平台)
                    "totalEndArea": "",//到达地
                    "useOrHistory": "0",//现在或历史列表(0:现在,1:历史)
                    platformRecommend:''
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
            if (this.checkedinformation.length> 0 ||
                type == "new" ||
                type == "batchImport" ||
                type == "download" ||
                type == "export"){
                switch (type) {
                    case 'new':
                        this.dialogFormVisible = true;
                        this.formtitle = '新增区代运作路线及定价';
                        this.isModify = false;
                        this.isBatch = false;
                        break;
                    case 'revise':
                        this.dialogFormVisible = true;
                        this.formtitle = '修改区代运作路线及定价';
                        this.isModify = true;
                        this.isBatch = false;
                        this.changeForm = this.checkedinformation[0];
                        break;
                    case 'batchImport':
                        this.titleTxt = '请选择导入定价的出发区/县';
                        this.typeClass = 'batchImport';
                        this.dialogVisible = true;
                        break;
                    case 'export':
                        this.titleTxt = '请选择导出定价的出发区/县';
                        this.typeClass = 'export';
                        this.dialogVisible = true;
                        break;
                    case 'download':
                        this.$message.info('正在导出中...');    
                        exportAgency().then(res => {
                            var blob = new Blob([res]);
                            let href =  window.URL.createObjectURL(blob);
                            var NewDom = document.createElement("a");
                            NewDom.setAttribute('href',href);
                            NewDom.setAttribute('target', '_blank');
                            NewDom.setAttribute('download', '区代运作路线及定价导入模板.xlsx');
                            document.body.appendChild(NewDom);
                            NewDom.click();
                            document.body.removeChild(NewDom)
                        })
                        break;
                    // case 'batch':
                    //     console.log('this.checkedinformation',this.checkedinformation)
                    //     if(this.checkedinformation.length == 0){
                    //         return this.$message.warning('请选择要进行批量修改的数据!');
                    //     }else{
                    //         this.ids = [];
                    //         this.checkedinformation.forEach(el => {
                    //             this.ids.push(el.id)
                    //         })
                    //         this.dialogFormVisible = true;
                    //         this.isModify = false;
                    //         this.isBatch = true;
                    //         this.formtitle = '批量修改干线费定价';
                    //     }
                    //     break;
                    case 'status_use':
                        let userArr = this.checkedinformation.filter(el => {
                            return el.flag === "1"
                        })
                        // console.log('userArr ',userArr,userArr.length)

                        if(userArr.length > 0){
                            return this.$message.warning('请选择禁用的数据进行操作')
                        }else{
                            let statusArr = [];
                            
                            this.checkedinformation.forEach(el =>{
                                let statusObj = {
                                    banOrUse:'',
                                    id:''
                                }
                                statusObj.banOrUse = '1';
                                statusObj.id = el.id;
                                statusArr.push(statusObj)
                                // console.log('foreach',statusArr)
                            })
                            // console.log('statusArr',statusArr)
                            trunkLinePriceStatus2(statusArr).then(res => {
                                this.firstblood();
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                })
                            }).catch(err => {
                                this.$message({
                                    type: 'info',
                                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                })
                            })
                        }
                        break;
                    case 'status_ban':
                        let userArrB = this.checkedinformation.filter(el => {
                            return el.flag === "0"
                        })
                        // console.log('userArrB ',userArrB,userArrB.length)

                        if(userArrB.length > 0){
                            return this.$message.warning('请选择启用的数据进行操作')
                        }else{
                            let statusArr = [];
                            
                            this.checkedinformation.forEach(el =>{
                                let statusObj = {
                                    banOrUse:'',
                                    id:''
                                }
                                statusObj.banOrUse = '0';
                                statusObj.id = el.id;
                                statusArr.push(statusObj)
                                // console.log('foreach',statusArr)
                            })
                            // console.log('statusArr',statusArr)
                            trunkLinePriceStatus2(statusArr).then(res => {
                                this.firstblood();
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                })
                            }).catch(err => {
                                this.$message({
                                    type: 'info',
                                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                })
                            })
                        }
                        break;
                    // case 'status':
                    //     let message = this.checkedinformation.length > 0 ? `确认修改${this.checkedinformation.length}条区代路线状态吗？` :'确认修改当前区代路线状态吗？';
                    //     this.$confirm(message, '提示', {
                    //         confirmButtonText: '确定',
                    //         cancelButtonText: '取消',
                    //         type: 'warning'
                    //     }).then(() => {
                    //         let statusArr = [];
                    //         this.checkedinformation.forEach(el =>{
                    //             el.banOrUse = el.flag === '0' ? '1' : '0';
                    //             statusArr.push(el)
                    //             // console.log('foreach',statusArr)
                    //         })
                    //         // {
                    //         //     banOrUse:'',
                    //         //     id:''
                    //         // }
                    //         // statusObj.id = this.selected.id;
                    //         // statusObj.banOrUse = this.selected.flag == '0' ? '1' : '0';
                    //         console.log(statusArr,this.checkedinformation)
                    //         trunkLinePriceStatus2(statusArr).then(res => {
                    //             console.log('res',statusArr)
                                
                    //             this.firstblood();
                    //             this.$message({
                    //                 type: 'success',
                    //                 message: '操作成功!'
                    //             })
                    //         }).catch(err => {
                    //             this.$message({
                    //                 type: 'info',
                    //                 message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    //             })
                    //         })
                    //     }).catch(() => {
                    //         this.$message({
                    //             type: 'info',
                    //             message: '已取消'
                    //         })
                    //     })
                    //     break;
                }
            } else {
                this.$message({
                type: "warning",
                message: "请选择一条列表数据!"
                });
            }
			//清除选中状态，避免影响下个操作
            // this.$refs.multipleTable.clearSelection();
        },
		// 判断是否选中
		getinfomation(selection) {
			this.checkedinformation = selection
		},
		// 点击选中当前行
		clickDetails(row, event, column) {
            // this.$refs.multipleTable.toggleRowSelection(row)
            // this.radio = row.id;
            // this.selected = row;
		},
	}
}
</script>

<style type="text/css" lang="scss" scoped>
    .trunkLinePriceList{
        height: 100%;
    }
</style>

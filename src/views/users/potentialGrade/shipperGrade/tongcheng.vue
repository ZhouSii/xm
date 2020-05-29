<template>
    <div class="identicalStyle" v-loading="loading">
        <searchInfo @change="getSearchParam" :showType = 'tabType'></searchInfo>
		<div class="classify_info">
			<div class="btns_box">
                <el-button type="primary" icon="el-icon-edit-outline" plain :size="btnsize" @click="handleClick('adjust')">等级调整</el-button>
                <el-button type="primary" icon="el-icon-notebook-2" plain :size="btnsize" @click="handleClick('view')">查看详情</el-button>
			</div>
			<div class="info_news">     
				<el-table
              	ref="multipleTable"
				:data="tableDataAll"
				stripe
				border
                height="100%"
				tooltip-effect="dark"
                @selection-change="getSelection" 
				style="width: 100%">
                <el-table-column
                    label="选择"
                    type="selection"
                    width="50">
                </el-table-column>
				<el-table-column label="序号" width="60">
                    <template slot-scope="scope">
                        {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                    </template>
				</el-table-column>  
				<el-table-column label="手机号" prop="mobile" sortable width="150">
                    <template slot-scope="scope">
                        <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
                    </template>
				</el-table-column>
				<el-table-column prop="companyName"
                    :show-overflow-tooltip="true" sortable
                    label="公司名称" width="150">
				</el-table-column>
				<el-table-column prop="contacts" :show-overflow-tooltip="true" width="150" sortable label="联系人">
				</el-table-column>
				<el-table-column prop="shipperType" sortable label="货主类型" width="150">
				</el-table-column>
				<el-table-column prop="potentialGradeName" sortable label="同城潜力等级" width="150">
				</el-table-column>
				<el-table-column prop="belongCityName" sortable label="所在地" width="150">
				</el-table-column>
                <el-table-column prop="tradeAreaId" sortable label="所属商圈" width="150">
				</el-table-column>
                <el-table-column prop="regisAddress" 
                    :show-overflow-tooltip="true" sortable
                    label="所属业务组" width="150">
                </el-table-column>  
                <el-table-column prop="belongSalesmanName" 
                    :show-overflow-tooltip="true" sortable
                    label="所属业务员" width="150">
                </el-table-column>
                <!-- <el-table-column prop="belongIndustryName" sortable width="150" label="所属行业"  :show-overflow-tooltip="true"> -->
				<!-- </el-table-column> -->
                <el-table-column prop="orderVolumeLastMonth" sortable width="150" label="上月订单量">
				</el-table-column>
                <el-table-column prop="levelAdjustment" sortable width="150" label="调整等级">
				</el-table-column> 
				</el-table>
			</div>
		</div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    
        <grade :dialogVisible.sync="dialogVisible" :initForm="currentArr"  @close = "firstblood"/>
    </div>
</template>

<script>
import { shipperLevelList } from '@/api/users/potentialGrade/shipperGrade.js'
import Pager from '@/components/Pagination/index'
import searchInfo from './component/searchInfo'
import grade from './component/garde'
import { objectMerge2, parseTime } from '@/utils/'

export default {
  components: {
    Pager,
    searchInfo,
    grade
  },
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
    return {
        loading:false,
        tabType:'All',
        btnsize: 'mini',
        dialogVisible:false,
        searchInfo: {
            belongCity: '',
            shipperStatus: '',
            accountStatus: '',
            companyName: '',
            mobile: '',
            usingStatus:'',
        },
        listSystemObj:{
            "currentPage": 1,
            "pageSize": 20,
            "vo": {}
        },
        totalCount: 0,
        tableDataAll: [],
        selected:[],//暂存的数据
        currentArr:[]
    }
  },
  created() {

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
        //点击选中当前行
        clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
        },
        // 判断选中与否
        getSelection(val){
            // console.log('选中内容',val)
            this.selected = val;
        },
        getSearchParam(obj) {
            this.listSystemObj.vo = objectMerge2(obj);
            if(this.listSystemObj.currentPage != 1){
                this.listSystemObj.currentPage = obj.pageNum;
                this.listSystemObj.pageSize = obj.pageSize;
            }
            this.firstblood();
        },
        pushOrderSerial(row){
            // this.type = 'view';
            // this.typetitle = '货主详情';
            // this.paramsView = objectMerge2({},row);;
            // this.dialogFormVisible_add =true;
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        handleClick(type){
            switch(type){
                case 'adjust' :
                    if(this.selected.length == 0){
                        return this.$message.warning('请选择一项列表数据');
                    }else{
                        console.log('this.selected',this.selected)
                        this.currentArr = this.selected;
                        this.dialogVisible = true;
                    }
                    break;
                case 'view':
                    if(this.selected.length != 1){
                        return this.$message.warning('请选择一项列表数据');
                    }else{
                        this.$router.push({name: '货主详情',query:{ userId:this.selected[0].id }});
                    }
                    // console.log('this.selected',this.selected)
                    break;
            }
            //清除选中状态，避免影响下个操作
            this.$refs.multipleTable.clearSelection();
        },
        // 刷新页面
        firstblood() {
            this.loading = true;
            shipperLevelList(this.listSystemObj).then(res => {
                // console.log('shipperAll',res)
                this.totalCount = res.data.totalCount
                this.tableDataAll = res.data.list
                // this.inited = false;
                this.loading = false;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
                this.loading = false;
            })
        },
        getDataList() {
            this.$nextTick(()=>{
                this.firstblood();
            })
        }
    }
    }
</script>
<style lang="scss" scoped>
   
</style>

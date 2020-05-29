<template>
  <div class="identicalStyle netWork" v-loading="loading">
    <el-form
      :inline="true"
      :model="listSystemObj.vo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo" 
    >
      <el-form-item label="区代公司" prop="agencyName">
        <el-input v-model="listSystemObj.vo.agencyName" clearable></el-input>
      </el-form-item>
      <el-form-item label="区代网点" prop="pointName">
        <el-input v-model="listSystemObj.vo.pointName" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="到货服务区域" prop="arriveService">
                <el-input v-model="listSystemObj.vo.arriveService" clearable></el-input>
            </el-form-item> -->
      <el-form-item label="网点地址" prop="pointAddress">
        <el-input v-model="listSystemObj.vo.pointAddress" clearable></el-input>
      </el-form-item>
      <el-form-item label="所在园区" prop="parkName">
        <el-input v-model="listSystemObj.vo.parkName" clearable></el-input>
      </el-form-item>
      <el-form-item class="btnChoose fr" style="margin-left:0;">
        <el-button
          type="primary"
          icon="el-icon-search"
          plain
          :size="btnsize"
          @click="handleSearch('search')"
          >搜索</el-button
        >
        <el-button
          type="info"
          icon="fontFamily aflc-icon-qingkong"
          :size="btnsize"
          plain
          @click="handleSearch('clear')"
          >清空</el-button
        >
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-circle-plus"
          @click="handleClick('new')"
          >新增</el-button
        >
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-edit"
          @click="handleClick('revise')"
          >修改</el-button
        >
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-delete"
          @click="handleClick('delete')"
          >删除</el-button
        >
        <!-- <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-bell"
          @click="handleClick('status')"
          >导出</el-button
        >
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-bell"
          @click="handleClick('status')"
          >导入</el-button
        >
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-bell"
          @click="handleClick('status')"
          >下载导入模版</el-button 
        >-->
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          align="center"
          height="100%"
          @selection-change="getinfomation"
          tooltip-effect="dark"
          @row-click="clickDetails"
          style="width: 100%"
        >
          <el-table-column label="选择" width="60" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.row.id"
                >&nbsp;</el-radio
              >
            </template>
          </el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              {{
                (listSystemObj.currentPage - 1) * listSystemObj.pageSize +
                  scope.$index +
                  1
              }}
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="区代公司"
            prop="agencyName"
            :show-overflow-tooltip="true"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            sortable
            label="区代网点"
            prop="pointName"
            :show-overflow-tooltip="true"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            sortable
            label="到货服务区域"
            prop="agencyArea"
            min-width="150"
          >
            <template slot-scope="scope">
                <el-button
                :size="btnsize"
                type="primary"
                plain
                @click="showText(scope.row.arriveService)"
                >点击查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            sortable
            prop="pointAddress"
            label="网点地址"
            min-width="250"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            sortable
            prop="parkName"
            label="所在园区"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            sortable
            prop="creater"
            label="维护人"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            sortable
            prop="createTime"
            label="维护时间"
            min-width="160"
          >
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager" />
      </div>
    </div>
    <add
      :dialogFormVisible.sync="dialogFormVisible"
      :isModify="isModify"
      :changeForm="changeForm"
      :formtitle="formtitle"
      @renovate="firstblood"
    />
  </div>
</template>

<script type="text/javascript">
import { agentNetWorkList,agentNetWorkDelete } from '@/api/dispatch/agentNetWork'
import Pager from '@/components/Pagination/index'
import add from './add'
export default{
    name:'agentNetWork',
	props: {
	},
	components: {
		Pager,
        add,
    },
    // directives: {
    //     showText: {
    //         bind: function(el,binding) {
    //             console.log('el',el,binding)
    //             el.addEventListener('click', function(e) {
    //                 e.preventDefault()
    //                 e.stopPropagation()
    //                 MessageBox.alert('<div class="showTextBox">'+binding.value+'<span/></div>', {
    //                     dangerouslyUseHTMLString: true,
    //                     showConfirmButton: false,
    //                     closeOnClickModal: true,
    //                     center: true,
    //                     customClass: 'showTextWrapper'
    //                 })
    //             })
    //         },
    //         unbind: function(el) {

    //         }
    //     }
    // },
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
                    "address": "",//详细地址
                    "agencyName": "",//区代名称
                    "arriveService": "",//到达服务区域
                    "parkName": "",//物流园名称
                    "pointAddress": "",//网点地址
                    "pointName": ""//网点名称
				}
			},
            checkedinformation:[],
            selected:{},
            radio:'',
		}
	},
	mounted() {
        this.firstblood();
	},
	methods: {
        showText(v){
            if(v){
                let vv = v.split(',')
                let showTextDiv = "";
                showTextDiv= vv.map((el,idx)=>{
                    return `<span class="showTextspan">${el}</span>`
                }).join('')
                this.$alert('<div class="showTextBox" style="max-height:800px;overflow:auto;">'+showTextDiv+'</div>','到货服务区域', {
                    dangerouslyUseHTMLString: true,
                    showConfirmButton: false,
                    closeOnClickModal: true,
                    center: true,
                    customClass: 'showTextWrapper'
                })
            }
        },
		handlePageChange(obj) {
			this.listSystemObj.currentPage = obj.pageNum;
			this.listSystemObj.pageSize = obj.pageSize;
			this.firstblood();
		},
		// 刷新页面
		firstblood() {
			this.loading = true
			agentNetWorkList(this.listSystemObj).then(res => {
                // this.$set(res.data.list,'serviceArea',res.data.list.split(','))
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
                        this.formtitle = '新增区代网点';
                        this.isModify = false;
                        break;
                    case 'revise':
                        this.dialogFormVisible = true;
                        this.formtitle = '修改区代网点';
                        this.isModify = true;
                        this.changeForm = this.selected;
                        break;
                    case 'delete':
                        this.$confirm('是否删除'+ this.selected.agencyName+'公司'+this.selected.pointName+'网点', '删除网点', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            agentNetWorkDelete(this.selected.id).then(res=>{
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                })
                                this.firstblood();
                            }).catch(err=>{
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

<style type="text/css" lang="scss">
.netWork {

}
.showTextspan{
    display: inline-block;
    min-width: 250px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    text-indent: 10px;
    color: #3e9ff1;
    // border: 1px solid #cccccc;
    background: rgba(227, 233, 235, 0.479);
    margin: 5px 0;
}
</style>

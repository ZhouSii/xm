<template>
    <div class="identicalStyle" v-loading="loading">
        <searchInfo @change="getSearchParam" :showType = 'tabType'></searchInfo>
		<div class="classify_info">
			<div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" plain :size="btnsize" @click="handleClick('add')" v-has:SHIPPER_MANAGE_ADD>新增</el-button>
                <el-button type="primary" icon="fontFamily aflc-icon-dongjie1" plain :size="btnsize" @click="handleClick('pushFreeze')" v-has:SHIPPER_MANAGE_FREEZE>冻结发货</el-button>
                <el-button type="primary" icon="el-icon-edit" plain :size="btnsize" @click="handleClick('editFreeze')" v-has:SHIPPER_MANAGE_FREEZE_UPDATE>冻结发货修改</el-button>
                <el-button type="primary" icon="fontFamily aflc-icon-jiedong1" plain :size="btnsize" @click="handleClick('removeFreeze')" v-has:SHIPPER_MANAGE_UNFREEZE>发货解冻</el-button>
                <el-button type="primary" icon="fontFamily aflc-icon-heimingdan" plain :size="btnsize" @click="handleClick('pushBlack')" v-has:SHIPPER_MANAGE_PUT_BLACK>移入发货黑名单</el-button>
                <el-button type="primary" icon="fontFamily aflc-icon-yichuheimingdan" plain :size="btnsize" @click="handleClick('removeBlack')" v-has:SHIPPER_MANAGE_OUT_BLACK>移出发货黑名单</el-button>
                <el-button type="primary" icon="el-icon-bell" plain :size="btnsize" @click="handleClick('statusd')" >启用/禁用</el-button>
                <el-button type="primary" icon="el-icon-message" plain :size="btnsize" @click="handleClick('coupon')" >补发注册优惠卷</el-button>
                <el-button type="primary" icon="el-icon-user-solid" plain :size="btnsize" @click="handleClick('ShipperBelongSalesman')" v-has:SHIPPER_MANAGE_BATCH_ADD_SALESMAN>批量增加业务员</el-button>
                <el-button type="primary" icon="el-icon-edit-outline" plain :size="btnsize" @click="handleClick('adjust')" v-has:SHIPPER_MANAGE_GRADEADJUSTMENT>等级调整</el-button>
			</div>
			<div class="info_news">     
				<el-table
              	ref="multipleTable"
				:data="tableDataAll"
				stripe
				border
                height="100%"
                @selection-change="getSelection" 
                @row-click="clickDetails"
				tooltip-effect="dark"
				style="width: 100%">
                <el-table-column
                    label="选择"
                    type="selection"
                    width="50">
                </el-table-column>
				<el-table-column label="序号" width="60">
                    <template slot-scope="scope">
                        {{ (page - 1)*pagesize + scope.$index + 1 }}
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
				<el-table-column prop="registerOriginName" sortable label="注册来源" width="150">
				</el-table-column>
                <el-table-column prop="shipperTypeName" sortable label="货主类型" width="150">
				</el-table-column>
				<el-table-column prop="shipperStatusName" sortable label="认证状态" width="150">
				</el-table-column>
				<el-table-column prop="accountStatusName" sortable label="账户发货状态" width="150">
                    <template slot-scope="scope">
                        <span :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}">{{scope.row.accountStatusName}}</span>
                    </template>
				</el-table-column>
                <el-table-column prop="usingStatus" sortable label="账户登录状态" width="150">
                    <template  slot-scope="scope">
                        {{scope.row.usingStatus == '1' ? '启用' : '禁用'}}
                    </template>
				</el-table-column>
                <el-table-column prop="potentialGradeName" sortable label="潜力等级" width="150">
				</el-table-column>
                <el-table-column prop="orderVolumeLastMonth" sortable width="150" label="上月订单量">
				</el-table-column>
                <el-table-column prop="levelAdjustment" sortable width="150" label="调整等级">
				</el-table-column> 
                <el-table-column prop="regisAddress" 
                    :show-overflow-tooltip="true" sortable
                    label="注册所在地" width="150">
                </el-table-column>  
                <el-table-column prop="belongCity" 
                    :show-overflow-tooltip="true" sortable
                    label="认证所在地" width="150">
                    <template slot-scope="scope">
                        {{scope.row.belongCityName ? scope.row.belongCityName:scope.row.belongCity}}
                    </template>
                </el-table-column>
                <el-table-column prop="companyAddress" sortable width="150" label="企业地址"  :show-overflow-tooltip="true">
				</el-table-column>
                <el-table-column prop="belongSalesmanName" sortable width="150" label="所属业务员">
				</el-table-column>
                <el-table-column prop="belongCustomerService" sortable width="150" label="所属客服">
				</el-table-column> 
                <el-table-column prop="tradeAreaName" sortable width="150" label="认证所属商圈">
				</el-table-column> 
                <el-table-column prop="shipperFollowUp" sortable label="需要后续跟进" width="150">
                    <template  slot-scope="scope">
                        {{scope.row.shipperFollowUp == '1' ? '是' : '否'}}
                    </template>
				</el-table-column>
				<el-table-column  label="注册日期" sortable prop="registerTime" width="160">
                    <template  slot-scope="scope">
                        <span v-if="scope.row.registerTime">{{ scope.row.registerTime | parseTime}}</span>
                    </template>
				</el-table-column>
                <el-table-column prop="authenticationTime" sortable label="提交认证时间" width="160">
                    <template slot-scope="scope">
                        {{scope.row.authenticationTime | parseTime}}
                    </template>
                </el-table-column>
				</el-table>
			</div>
		</div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    
        <createdDialog :paramsView="paramsView" :editType="type"  :typetitle="typetitle" :dialogFormVisible_add.sync = "dialogFormVisible_add" @getData="getDataList"/>
        <FreezeDialog :paramsView="selectRowData" :editType="freezetype" :freezetitle="freezetitle"  :freezeDialogFlag.sync = "freezeDialogFlag" @getData="getDataList"/>
        <shipperBlackDialog :paramsView="selectRowData" :editType="blacktype" :blacktitle="blacktitle" :BlackDialogFlag.sync = "BlackDialogFlag" @getData="getDataList"/>
        <ShipperBelongSalesman :params="selectShiperId" :ShipperBelongSalesmantitle="ShipperBelongSalesmantitle" :ShipperBelongSalesmanDialogFlag.sync = "ShipperBelongSalesmanDialogFlag" @getData="getDataList"/>
        <grade :dialogVisible.sync="dialogVisible" :initForm="currentArr"  @close = "firstblood"/>
    </div>
</template>

<script>
import { enableOrDisableShipper,reissueCoupon,shipperListInfo} from '@/api/users/shipper/all_shipper.js'
import createdDialog from './createdDialogA'
import FreezeDialog from '../components/FreezeDialog'
import shipperBlackDialog from '../components/shipperBlackDialog'
import Pager from '@/components/Pagination/index'
import searchInfo from './searchInfo'
import ShipperBelongSalesman from './ShipperBelongSalesman'
import { objectMerge2, parseTime } from '@/utils/'
import grade from './garde'

export default {
  components: {
    createdDialog,
    FreezeDialog,
    shipperBlackDialog,
    Pager,
    searchInfo,
    ShipperBelongSalesman,
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
        loading:true,
        tabType:'All',
        btnsize: 'mini',
        dialogVisible:false,
        dialogFormVisible_add: false,
        freezeDialogFlag: false,
        BlackDialogFlag: false,
        ShipperBelongSalesmanDialogFlag:false,
        freezetype: '',//冻结类型
        blacktype: '',//黑名单类型
        type: '',//新增或者修改或者详情
        typetitle:'',//新增或者详情title
        freezetitle:'',//冻结title
        blacktitle:"",//黑名单titl
        ShipperBelongSalesmantitle:'',//批量业务员title
        paramsView: {},
        selectShiperId:{},
        searchInfo: {
            belongCity: '',
            shipperStatus: '',
            accountStatus: '',
            companyName: '',
            mobile: '',
            usingStatus:'',
        },
        selectRowData: {},//传递的数据
        page: 1,
        pagesize: 20,
        totalCount: 0,
        tableDataAll: [],
        selected:[],//暂存的数据
        currentArr:[],
    }
  },
  created() {

  },
  watch: {
    isvisible: {
        handler(newVal, oldVal) {
            if (newVal) {
                // this.firstblood()
            }
        },
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
    }
  },
  mounted() {
    this.firstblood()

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
            // console.log(obj)
            this.searchInfo = objectMerge2(this.searchInfo, obj);
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
            }
            this.firstblood();
        },
        pushOrderSerial(row){
            this.type = 'view';
            this.typetitle = '货主详情';
            this.paramsView = objectMerge2({},row);;
            this.dialogFormVisible_add =true;
            this.clearTableSelection();
        },
        handlePageChange(obj) {
            this.page = obj.pageNum;
            this.pagesize = obj.pageSize;
            this.firstblood();
        },
        clearTableSelection(){
            //清除选中状态，避免影响下个操作
            this.$refs.multipleTable.clearSelection();
        },
        handleClick(type){
            if(this.selected.length == 0 && type != 'add'){
                return this.$message.warning('请选择您要操作的用户');
            }
            else if (this.selected.length > 1 && type != 'add' && type != 'statusd' && type != 'ShipperBelongSalesman' && type != 'adjust') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.clearTableSelection();
            }
            else{
                this.selectRowData = this.selected[0];
                this.selectShiperId = this.selected
                switch(type){
                    case 'adjust' :
                        console.log('this.selected',this.selected)
                        this.currentArr = this.selected;
                        this.dialogVisible = true;
                        break;
                    case 'add' :
                        this.type = "add";
                        this.typetitle = '新增货主';
                        this.paramsView = {};
                        this.dialogFormVisible_add = true;
                        break;
                    case 'pushFreeze':
                        this.freezetype = 'add';
                        if(this.selectRowData.accountStatusName == '冻结中' && this.freezetype == 'add'){
                            return this.$message.warning('您选中的货主已被冻结，不需多次冻结！');
                        }else{
                            this.freezetitle = '冻结';
                            this.freezeDialogFlag = true;
                        }
                        break;
                    case 'editFreeze':
                        this.freezetype = 'edit';
                        if(this.selectRowData.accountStatusName != '冻结中' && this.freezetype == 'edit'){
                            return this.$message.warning('您选中的货主未被冻结，不可做此操作！');
                        }else{
                            this.freezetitle = '冻结修改';
                            this.freezeDialogFlag = true;
                        }
                        break;
                    case 'removeFreeze':
                        this.freezetype = 'remove';
                        if(this.selectRowData.accountStatusName != '冻结中' && this.freezetype == 'remove'){
                            return this.$message.warning('您选中的货主未被冻结，无需移除！');
                        }else{
                            this.freezetitle = '移除冻结';
                            this.freezeDialogFlag = true;
                        }
                        break;
                    case 'pushBlack':
                        this.blacktype = 'add';
                        if(this.selectRowData.accountStatusName == '黑名单' && this.blacktype == 'add'){
                            return this.$message.warning('您选中的货主已被移入黑名单，不需多次拉黑！');
                        }else{
                            this.blacktitle = "移入黑名单";
                            this.BlackDialogFlag = true;
                        }
                        break;
                    case 'removeBlack':
                        this.blacktype = 'edit' ;
                        if(this.selectRowData.accountStatusName != '黑名单' && this.blacktype == 'edit'){
                            return this.$message.warning('您选中的货主未被移入黑名单，不可做此操作！');
                        }else{
                            this.blacktitle = "移出黑名单";
                            this.BlackDialogFlag = true;
                        }
                        break;
                    case 'statusd':
                        let ids = [];
                        this.selected.forEach(el => {
                            ids.push(el.shipperId)
                        })
                        enableOrDisableShipper(ids).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功！'
                            })
                            this.firstblood();
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                        })
                        break;
                    case 'coupon':
                        let CouponObject = {
                        areaCode:this.selected[0].regisAddressCode,
                        mobile:this.selected[0].mobile,
                        userId:this.selected[0].shipperId,
                        }
                        reissueCoupon(CouponObject).then(res => {
                            this.$message.success('补发注册优惠卷成功')
                            this.firstblood();
                        }).catch(err => {
                            if(err.text){
                                this.$message.error(err.text)
                            }
                            else{
                                this.$message.error(err.errorInfo)
                            }
                        })
                        break;
                    case 'ShipperBelongSalesman':
                        this.ShipperBelongSalesmantitle = "批量增加业务员";
                        this.ShipperBelongSalesmanDialogFlag = true;
                }
                this.clearTableSelection();
            }
        },
        // 刷新页面
        firstblood() {
            this.loading = true;
            shipperListInfo(this.page, this.pagesize, this.searchInfo).then(res => {
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
            this.$forceUpdate()
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

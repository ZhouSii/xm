<template>
    <div class="TwoColumns riskManageMent clearfix" v-loading ="loading">
        <div class="columnsContainer">
            <div class="side_left">
                 <el-tree
                :data="cityTree"
                :props="defaultProps"
                show-checkbox
                ref="riskManageTree"
                node-key="code"
                default-expand-all
                @check="nodeClick"
                :highlight-current = "true"
                @node-click="handleNodeClick"
                >
                </el-tree>
            </div>
            <div class="side_right">
                <div class="side_right_bottom clearfix">
                    <div class="btns_box">
                        <el-button type="primary" icon="el-icon-tickets" plain :size="btnsize" @click="handleClick('copy')" v-has:DISPATCH_CONTROL_MANAGE_SETTING_COPY_OTHER_CITY>复制到其它城市</el-button>
                    </div>
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
                        :cell-style = 'cellStyle'
                        style="width: 100%"
                        v-has:DISPATCH_CONTROL_MANAGE_SETTING_LIST
                        >
                            <el-table-column label="序号" prop="code" min-width="60">
                            </el-table-column>  
                            <el-table-column
                                prop="belongCity"
                                label="所属区域"
                                min-width="150"
                                >
                                <template slot-scope="scope">
                                    {{ scope.row.province }} {{scope.row.city}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="serviceCodeName"
                                label="服务分类"
                                min-width="150"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="category"
                                label="分类"
                                min-width="150"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="ruleDescSetting"
                                label="规则描述及设置"
                                align="left"
                                min-width="250"
                                >
                                <template slot-scope="{row,$index}">
                                    <el-input class="ruleDescSettingInput" v-model="row.ruleDescSetting"  :size="inputSize" clearable></el-input>  
                                    <span  @click="addItem(row,$index)" class="addItem" v-if="($index == riskCount[0] || $index == riskCount[1] || $index == riskCount[2] || $index == (tableData.length - 1)) && ((riskCount[0] < 100) || ((riskCount[1] - riskCount[0]) < 100) || ((riskCount[2] - riskCount[1]) < 100)) "></span>
                                    <span  @click="reduceItem(row,$index)" class="reduceItem" v-if="(($index == riskCount[0] && riskCount[0] != 0) || ($index == riskCount[1] && riskCount[1] != riskCount[0]+1) || ($index == riskCount[2] && riskCount[2] != riskCount[1]+1) || ($index == (tableData.length - 1) && tableData.length != riskCount[2]+2 ))"></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="ruleDescSettingValue"
                                label="规则值"
                                min-width="120"
                                > 
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.ruleDescSettingValue" :size="inputSize" clearable></el-input>  
                                    <!-- <span v-if="!scope.row.showEdit">{{scope.row.ruleDescSettingValue ? scope.row.ruleDescSettingValue :'/'}}</span> -->
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="usingStatus"
                                label="状态"
                                min-width="120"
                                >
                                <template slot-scope="scope">
                                    <!-- <span v-if="!scope.row.showEdit">{{scope.row.usingStatus == '0' ? '禁用' : '启用' }}</span> -->
                                    <el-select :size="inputSize"  v-model="scope.row.usingStatus" clearable placeholder="请选择" >
                                        <el-option
                                        v-for="item in defaultStatus"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="unusual"
                                label="异常分值"
                                min-width="120"
                                >
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.unusual" :size="inputSize" clearable></el-input>  
                                    <!-- <span v-if="!scope.row.showEdit">{{scope.row.unusual ? scope.row.unusual : '/'}}</span> -->
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="subBehaviorScore"
                                label="减行为分"
                                min-width="120"
                                >
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.subBehaviorScore" :size="inputSize" clearable></el-input>  
                                    <!-- <span v-if="!scope.row.showEdit">{{scope.row.subBehaviorScore ? scope.row.subBehaviorScore : '/'}}</span> -->
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="buckleBonus"
                                label="是否扣奖励金"
                                min-width="150"
                                >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.category == '智能调度'"></span>
                                    <el-select :size="inputSize"  v-model="scope.row.buckleBonus" clearable placeholder="请选择" v-else>
                                        <el-option
                                        v-for="item in optionsChoose"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="buckleDiscount"
                                label="是否扣除优惠"
                                min-width="150"
                                >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.category == '智能调度'"></span>
                                    <el-select :size="inputSize"  v-model="scope.row.buckleDiscount" clearable placeholder="请选择" v-else>
                                        <el-option
                                        v-for="item in optionsChoose"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="buckleDistribution"
                                label="是否扣除车主分销奖励"
                                min-width="150"
                                >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.category == '智能调度'"></span>
                                    <el-select :size="inputSize"  v-model="scope.row.buckleDistribution" clearable placeholder="请选择" v-else>
                                        <el-option
                                        v-for="item in optionsChoose"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="driverFrozen"
                                label="冻结车主账号"
                                min-width="150"
                                >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.category == '智能调度'"></span>
                                    <el-select :size="inputSize"  v-model="scope.row.driverFrozen" clearable placeholder="请选择" v-else>
                                        <el-option
                                        v-for="item in optionsFrozen"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column
                                prop="remark"
                                label="备注"
                                >
                                <template slot-scope="scope">
                                    <span v-html="scope.row.remark"></span>
                                </template>
                            </el-table-column> -->
                            <!-- <el-table-column label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button v-if="!scope.row.showEdit" :size="btnsize" type="primary" plain @click="handleClick('revise',scope.row)">修改</el-button>
                                    <el-button v-if="scope.row.showEdit" :size="btnsize" type="primary" plain @click="handleClick('sure',scope.row)">保存</el-button>
                                    <el-button v-if="scope.row.showEdit" :size="btnsize" type="info" plain @click="handleClick('cancel',scope.row)">取消</el-button>
                                </template>
                            </el-table-column> -->
                        </el-table>
                    </div>
                    <div class="member_footer">
                        <el-button type="primary" icon="el-icon-success" plain @click="handleClick('new')" size="middle" :disabled="btnShow" v-has:DISPATCH_CONTROL_MANAGE_SETTING_ADD>保  存</el-button>
                    </div>
                </div>
            </div>
        </div>
        <CopyCity :dialogVisible.sync="dialogVisible" :currentTableData = "currentData"   @close = "refresh"/>
    </div>
</template>

<script type="text/javascript">

    import { aflcProvinceCode,driverFrozenType } from '@/api/common.js'
    // import { objectMerge2, parseTime } from '@/utils/'
    import { newRiskManageSetting,RiskManageList } from '@/api/company/riskManagement.js'
    import { objectMerge2 } from '@/utils/'
    import { RISK_RULEDES_SMALL,RISK_RULEDES_SMALL_category } from '@/utils/constant.js'
    import CopyCity from './copyCity.vue'
    export default{
        data() {
            return {
                loading:false,
                btnShow:false,
                inputSize:'small',
                cityTree:[],
                btnsize: 'small',
                tableData: [],
                dialogVisible:false,
                currentData:[],
                listSystemObj:{
                    "currentPage": 1,
                    "pageSize": 100000,
                    "vo": {
                        belongCity:'',
                        city:'',
                        province:''
                    }
                },
                ACode:'A0',
                SCode:'S0',
                YCode:'Y0',
                RCode:'R0',
                defaultProps: {
                    children: 'children',
                    label: 'name',
                },
                defaultStatus:[{
                    id:'02',
                    code:'1',
                    name:'启用',
                },{
                    id:'03',
                    code:'0',
                    name:'禁用',
                }],
                riskCount:[2,7,10],
                belongCitySpanArr:[],
                searviceSpanArr:[],
                categorySpanArr:[],
                cityPos:0,
                searvicePos:0,
                categoryPos:0,
                optionsFrozen:[],
                optionsChoose:[{
                    name:'扣除',
                    code:'1'
                },{
                    name:'不扣除',
                    code:'0'
                }]
            }
        },
        components: {
              CopyCity,
        },
        mounted() {
            this.firstblood();
            this.init();
        },
        methods: {
            init(){
                driverFrozenType().then(res => {
                    this.optionsFrozen = res.data;
                })
            },
            addItem(row,index){
                console.log('index',row,index)
                let key = this.codeNum(row.code);
                let newItem =  this.newItemObj(row);
                switch(index){
                    case this.riskCount[0]:
                        newItem.code = key < 10 ? this.ACode +'0'+ key : this.ACode +key;
                        this.riskCount[0] = this.riskCount[0]+ 1;
                        this.riskCount[1] = this.riskCount[1]+ 1;
                        break;
                    case this.riskCount[1]:
                        newItem.code = key < 10 ? this.SCode +'0'+ key : this.SCode +key;
                        this.riskCount[1] = this.riskCount[1]+ 1;
                        break;
                    case this.riskCount[2]:
                        newItem.code = key < 10 ? this.YCode +'0'+ key : this.YCode +key;
                        this.riskCount[2] = this.riskCount[2]+ 1;
                        break;
                    case this.tableData.length - 1 :
                        newItem.code = key < 10 ? this.RCode +'0'+ key : this.RCode +key;
                        break;
                }
                this.tableData.splice((index+1),0,newItem);
                this.getSpanArr(this.tableData);
            },
            reduceItem(row,index){
                switch(index){
                    case this.riskCount[0]:
                        this.riskCount[0] = this.riskCount[0] - 1 < 0 ? 0 : this.riskCount[0] - 1;
                        this.riskCount[1] = this.riskCount[1] - 1  < 1 ? 1 : this.riskCount[1] - 1;
                        // console.log(this.riskCount[0],this.riskCount[1])
                        break;
                    case this.riskCount[1]:
                        this.riskCount[1] = this.riskCount[1] - 1  < 1 ? 1 : this.riskCount[1] - 1;
                        // console.log(this.riskCount[1])
                        break;
                    case this.riskCount[2]:
                        this.riskCount[2] = this.riskCount[2] - 1  < 2 ? 2 : this.riskCount[2] - 1;
                        // console.log(this.riskCount[1])
                        break;
                }
                // console.log(this.riskCount)
                // if(this.riskCount[0] == 0 ||  this.riskCount[1] == 1 || this.tableData.length == 3 ){
                //     return false
                // }else{
                    this.tableData.splice(index,1);
                    this.getSpanArr(this.tableData);
                // }
            },
            codeNum(code){
                let newCode = code ? code.slice(1) : '';
                newCode = newCode ?  parseInt(newCode) + 1  : '';
                return newCode
            },
            newItemObj(row){
                let newItem =  {
                    belongCity:row.belongCity,
                    city:row.city,
                    province:row.province,
                    category:row.category,
                    ruleDescSetting:'',
                    ruleDescSettingValue:'0',
                    serviceCode:row.serviceCode,
                    serviceCodeName:row.serviceCodeName,
                    subBehaviorScore:'0',
                    unusual:'0',
                    usingStatus:'1',
                    code:'',
                    buckleBonus:'0',//是否扣奖励金：0：是；1：否；
                    buckleDiscount:'0',//是否扣除优惠：0：是；1：否；
                    buckleDistribution:'0',//是否扣除车主分销奖励：0：是；1：否；
                    driverFrozen:'AF0200501',//是否扣奖励金：0：是；1：否；
                }
                return newItem;
            },
            doAction(belongCity,city,province){
                // console.log('RISK_RULEDES_SMALL',RISK_RULEDES_SMALL,RISK_RULEDES_SMALL_category,RISK_RULEDES_SMALL_category[0])
                let defaultTable = [];
                
                // Object.keys(RISK_RULEDES_SMALL).forEach(function(key){
                //     defaultTable.push(
                //         {
                //             belongCity:belongCity,
                //             city:city,
                //             province:province,
                //             ruleDescSetting:RISK_RULEDES_SMALL[key],
                //             ruleDescSettingValue:'',
                //             serviceCode:'AF01701',
                //             serviceCodeName:'小货车',
                //             subBehaviorScore:'',
                //             unusual:'',
                //             usingStatus:'1',
                //             showEdit:false,
                //         }
                //     )
                // });

                for(var i= 0;i <48 ;i++){
                    defaultTable.push(
                        {
                            belongCity:belongCity,
                            city:city,
                            province:province,
                            ruleDescSetting:'',
                            ruleDescSettingValue:'0',
                            serviceCode:'AF01701',
                            serviceCodeName:'小货车',
                            subBehaviorScore:'0',
                            unusual:'0',
                            usingStatus:'1',
                            code:'',
                            buckleBonus:'0',//是否扣奖励金：0：是；1：否；
                            buckleDiscount:'0',//是否扣除优惠：0：是；1：否；
                            buckleDistribution:'0',//是否扣除车主分销奖励：0：是；1：否；
                            driverFrozen:'AF0200501',//是否扣奖励金：0：是；1：否；
                            // showEdit:false,
                        }
                    )
                }

                let aNum = 1;
                let sNum = 1;
                let yNum = 1;
                let rNum = 1;

                defaultTable.forEach((el,key) => {
                    if(key <= this.riskCount[0]){
                        el.category = RISK_RULEDES_SMALL_category[0];
                        el.code = parseInt(aNum) < 10 ? this.ACode+'0'+ (aNum) : this.ACode + (aNum);
                        aNum++;
                    }else if(key <= this.riskCount[1] && key > this.riskCount[0]){
                        el.category = RISK_RULEDES_SMALL_category[1];
                        el.code = parseInt(sNum) < 10 ? this.SCode+'0'+ (sNum) : this.SCode + (sNum);
                        sNum++;
                    }else if(key <= this.riskCount[2] && key > this.riskCount[1]){
                        el.category = RISK_RULEDES_SMALL_category[2];
                        el.code = parseInt(yNum) < 10 ? this.YCode+'0'+ (yNum) : this.YCode + (yNum);
                        yNum++;
                    }else{
                        el.category = RISK_RULEDES_SMALL_category[3];
                        el.code = parseInt(rNum) < 10 ? this.RCode+'0'+ (rNum) : this.RCode + (rNum);
                        rNum++;
                    }
                })
                // console.log('defaultTabledefaultTable',defaultTable)
                this.tableData = defaultTable;
                this.getSpanArr(this.tableData);
            },
            // 刷新页面
            firstblood() {
                aflcProvinceCode().then(res => {
                    // console.log('aflcProvinceCode',res)
                    this.cityTree = res.data;
                    this.listSystemObj.vo.belongCity = this.cityTree[0].children[0].code;
                    this.listSystemObj.vo.province = this.cityTree[0].children[0].pname;
                    this.listSystemObj.vo.city = this.cityTree[0].children[0].name;
                    this.$refs.riskManageTree.setCheckedKeys([this.cityTree[0].children[0].code])
                    // console.log('this.listSystemObj',this.listSystemObj)
                    // console.log(this.cityTree)
                    this.getCommonFunction();
                })
            },
            getSpanArr(data) {　
                this.belongCitySpanArr = [];
                this.searviceSpanArr = [];
                this.categorySpanArr = [];
                this.cityPos = 0 ;
                this.searvicePos = 0;
                this.categoryPos = 0;
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.belongCitySpanArr.push(1);
                        this.searviceSpanArr.push(1);
                        this.categorySpanArr.push(1);
                        this.cityPos = 0;
                        this.searvicePos = 0;
                        this.categoryPos = 0;
                    } else {
                        // 判断当前元素与上一个元素是否相同
                        if (data[i].belongCity === data[i - 1].belongCity) {
                            this.belongCitySpanArr[this.cityPos] += 1;
                            this.belongCitySpanArr.push(0);
                        } else {
                            this.belongCitySpanArr.push(1);
                            this.cityPos = i;
                        }

                        if (data[i].serviceCode === data[i - 1].serviceCode) {
                            this.searviceSpanArr[this.searvicePos] += 1;
                            this.searviceSpanArr.push(0);
                        } else {
                            this.searviceSpanArr.push(1);
                            this.searvicePos = i;
                        }
                
                        if(data[i].category === data[i - 1].category){
                            this.categorySpanArr[this.categoryPos] += 1;
                            this.categorySpanArr.push(0);
                        }else {
                            this.categorySpanArr.push(1);
                            this.categoryPos = i;
                        }
                     }
                 }
                // console.log(this.belongCitySpanArr)
                // console.log(this.searviceSpanArr)
                // console.log(this.categorySpanArr)
            },   
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 1) {
                    const _row = this.belongCitySpanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }else if(columnIndex === 2){
                    const _row = this.searviceSpanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }else if(columnIndex === 3){
                    const _row = this.categorySpanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            },
            handleClick(type,row){
                switch(type){
                    case 'new':
                        newRiskManageSetting(this.tableData).then(res=>{
                            this.$message({
                                type: 'success',
                                message: '操作成功！'
                            })
                            this.getCommonFunction();
                        })
                        // console.log('this.tableData',this.tableData)
                        break;
                    case 'copy':
                        this.dialogVisible = true;
                        this.currentData = this.tableData;
                        break;
                }
            },
            // 查询和获取对应区域的数据
            getCommonFunction() {
                this.loading = true;
                RiskManageList(this.listSystemObj).then(res => {
                    if(res.data.list.length > 0){
                        this.tableData = res.data.list;
                        this.riskCountNum(this.tableData);
                        this.getSpanArr(this.tableData);
                    }else{
                        this.doAction(this.listSystemObj.vo.belongCity,this.listSystemObj.vo.city,this.listSystemObj.vo.province);
                    }
                    this.loading = false;
                })
            },
            riskCountNum(data){
                let account = [];
                for (var i = 1; i < data.length; i++) {
                    //判断当前元素与上一个元素是否相同
                    if (data[i].category != data[i - 1].category) {
                        account.push(i - 1)
                    }
                }
                this.riskCount = account;
            },
            handleNodeClick(data, checked) {
                // if(data.pid != '-1'){
                //     // console.log('data.pid',data.pid)
                //     this.listSystemObj.vo.belongCity = data.code;
                //     this.listSystemObj.vo.province = data.pname;
                //     this.listSystemObj.vo.city = data.name;
                //     this.getCommonFunction()
                // }else{
                //     return false;
                // }
            },
            nodeClick(data){
                // console.log('nodeClick',data)
                this.listSystemObj.vo.belongCity = data.code;
                this.listSystemObj.vo.province = data.pname;
                this.listSystemObj.vo.city = data.name;
                this.$refs.riskManageTree.setCheckedKeys([data.code])
                this.getCommonFunction()
            },
            refresh(){
            },
            cellStyle({row, column, rowIndex, columnIndex}){
                // console.log('row, column, rowIndex, columnIndex',row, column, rowIndex, columnIndex)
                if((row.category == RISK_RULEDES_SMALL_category[0]) && columnIndex == 3 ){
                    return 'background:#e9f1f6'
                }
                else if((row.category == RISK_RULEDES_SMALL_category[1]) && columnIndex == 3){
                    return 'background:#d6ecf0'
                }
                else if((row.category == RISK_RULEDES_SMALL_category[2]) && columnIndex == 3){
                    return 'background:#e3f9fd'
                }
                else if((row.category == RISK_RULEDES_SMALL_category[3]) && columnIndex == 3){
                    return 'background:#e0f0e9'
                }
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .riskManageMent{
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
            .el-table{
                .ruleDescSettingInput{
                    width: 80%;
                }
                .addItem{
                    display:inline-block;
                    height: 26px;
                    width:26px;
                    line-height: 26px;
                    vertical-align: middle;
                    cursor: pointer;
                    background:url('../../../assets/icom/23zengjia.png') no-repeat center;
                    // position: absolute;
                    // top:15px;
                    // right: 80px;
                    &:hover{
                        background:url('../../../assets/icom/24zengjia-b.png') no-repeat center;
                    }
                }
                .reduceItem{
                    display:inline-block;
                    height: 26px;
                    width:26px;
                    line-height: 26px;
                    vertical-align: middle;
                    cursor: pointer;
                    background:url('../../../assets/icom/21shanchu.png') no-repeat center;
                    // position: absolute;
                    // top:15px;
                    // right:40px;
                    &:hover{
                        background:url('../../../assets/icom/22shanchu-b.png') no-repeat center;
                    }
                }
            }
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

<template>
    <div class="carData identicalStyle" v-loading="loading">
        <!-- <searchInfo @change="getSearchParam"></searchInfo> -->
        <div class="classify_info">
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
                    <el-table-column label="序号" width="80px">
                        <template slot-scope="scope">
                            {{ (page - 1)*pagesize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column prop="driverMobile" width="120" sortable label="手机号码">
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                <p>手机号码</p>
                                <div class="search_control">
                                <el-input clearable v-model.trim="searchInfo.driverMobile" @click.stop.prevent.native placeholder="搜索关键字" @change="changeEnter('input')"></el-input>
                                </div>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.driverMobile}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column label="车主姓名" :show-overflow-tooltip="true" width="120" prop="driverName" sortable>
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>车主姓名</p>
                                    <div class="search_control">
                                    <el-input clearable v-model.trim="searchInfo.driverName" @click.stop.prevent.native placeholder="搜索关键字" @change="changeEnter('input')"></el-input>
                                    </div>
                                </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="registerOriginName" sortable label="注册渠道" width="120">
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>注册渠道</p>
                                    <div class="search_control">
                                        <el-select v-model="searchInfo.registerOrigin" placeholder="请选择" @change="changeEnter('select')" clearable>
                                            <el-option
                                                v-for="item in registerOriginArray"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="accountStatusName" sortable width="120" label="账户状态">
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>账户状态</p>
                                    <div class="search_control">
                                        <el-select v-model="searchInfo.accountStatus" placeholder="请选择" @change="changeEnter('select')" clearable>
                                            <el-option
                                                v-for="item in accountStatusArray"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                        </template>
                    </el-table-column>  
                    <el-table-column prop="" sortable label="登陆状态" width="120">
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>登陆状态</p>
                                    <div class="search_control">
                                        <el-select v-model="searchInfo.isOnLine" placeholder="请选择" @change="changeEnter('select')" clearable>
                                            <el-option
                                                v-for="item in isOnLineArray"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                        </template>
                      <template slot-scope="scope">
                        <span class="blackName" v-if="scope.row.isOnLine=='0'">不在线</span>
                        <span class="normalName" v-else>在线</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="activeValue" sortable width="120" label="活跃值">
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>活跃值</p>
                                    <div class="search_control">
                                        <el-select v-model="searchInfo.activeValue" placeholder="请选择" @change="changeEnter('select')" clearable>
                                            <el-option
                                                v-for="item in activeValueArray"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="driverStatusName" sortable width="120" label="认证状态">
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>认证状态</p>
                                    <div class="search_control">
                                        <el-select v-model="searchInfo.driverStatus" placeholder="请选择" @change="changeEnter('select')" clearable>
                                            <el-option
                                                v-for="item in driverStatusArray"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isVipCar" sortable width="120" label="是否特权车">
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>是否特权车</p>
                                    <div class="search_control">
                                        <el-select v-model="searchInfo.isVipCar" placeholder="请选择" @change="changeEnter('select')" clearable>
                                            <el-option
                                                v-for="item in isVipCarArray"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                        </template>
                        <template slot-scope="scope">
                        <span class="normalName" v-if="scope.row.isVipCar=='1'">是</span>
                        <span class="blackName" v-else>不是</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="regisAddress" sortable width="150" label="注册所在地" show-overflow-tooltip>
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>注册所在地</p>
                                    <div class="search_control">
                                    <el-input clearable v-model.trim="searchInfo.regisAddress" @click.stop.prevent.native placeholder="搜索关键字" @change="changeEnter('input')"></el-input>
                                    </div>
                                </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="belongCityName" sortable width="150" label="认证所在地" show-overflow-tooltip>
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>认证所在地</p>
                                    <div class="search_control">
                                    <el-input clearable v-model.trim="searchInfo.belongCityName" @click.stop.prevent.native placeholder="搜索关键字" @change="changeEnter('input')"></el-input>
                                    </div>
                                </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="belongSalesmanName" :show-overflow-tooltip="true" sortable label="所属业务员" width="150">
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>所属业务员</p>
                                    <div class="search_control">
                                    <el-input clearable v-model.trim="searchInfo.belongSalesmanName" @click.stop.prevent.native placeholder="搜索关键字" @change="changeEnter('input')"></el-input>
                                    </div>
                                </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="belongCustomerService" :show-overflow-tooltip="true" sortable label="所属客服" width="150">
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>所属客服</p>
                                    <div class="search_control">
                                    <el-input clearable v-model.trim="searchInfo.belongCustomerService" @click.stop.prevent.native placeholder="搜索关键字" @change="changeEnter('input')"></el-input>
                                    </div>
                                </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="driverFollowUp" sortable width="150" label="后续跟进">
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>后续跟进</p>
                                    <div class="search_control">
                                        <el-select v-model="searchInfo.driverFollowUp" placeholder="请选择" @change="changeEnter('select')" clearable>
                                            <el-option
                                                v-for="item in driverFollowUpArray"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                        </template>
                        <template slot-scope="scope">
                        <span class="blackName" v-if="scope.row.driverFollowUp=='0'">不需要</span>
                        <span class="normalName" v-else>需要</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" :show-overflow-tooltip="true" sortable width="230"  label="注册时间">
                        <template slot="header" slot-scope="scope">
                            <div class="searchTable-header">
                                    <p>注册时间</p>
                                    <div class="search_control">
                                        <el-date-picker
                                        @click.stop.prevent.native
                                        is-range
                                        unlink-panels
                                        type="daterange"
                                        clearable
                                        :picker-options="pickerOptions2"
                                        v-model="createTime"
                                        range-separator="-"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围"
                                        :default-time="['00:00:00', '23:59:59']"
                                         @change="event=>changeEnter('createTime',event)">
                                    </el-date-picker>
                                    </div>
                                </div>
                        </template>
                        <template  slot-scope="scope">
                            <span v-if="scope.row.createTime">{{ scope.row.createTime | parseTime}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="" :show-overflow-tooltip="true" sortable label="最后登录时间" width="150">
                    </el-table-column> -->
				</el-table>
			</div>
        </div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" ref="pager" @change="handlePageChange" /></div> </div>  
    </div>
</template>


<script type="text/javascript">
import searchInfo from './searchInfo'
import Pager from '@/components/Pagination/index'
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import { getDictionary } from "@/api/common.js";
import { data_get_driver_list} from '@/api/users/carowner/total_carowner.js'
    export default{
        components:{
            searchInfo,
            Pager
        },
        data(){
            return{
                loading:true,
                searchInfo:{
                 driverMobile:null,
                 driverName:null,
                },
                registerOriginArray:[],    //来源渠道 
                accountStatusArray:[],    //账户状态 
                isOnLineArray:[{code:'0',name:'不在线'},{code:'1',name:'在线'}],        //登陆状态
                activeValueArray:[],    //活跃值
                driverStatusArray:[],   //认证状态
                isVipCarArray:[{code:'0',name:'不是'},{code:'1',name:'是'}],      //是否特权车
                driverFollowUpArray:[{code:'0',name:'不需要'},{code:'1',name:'需要'}],      //是否后续跟进
                pickerOptions2: {
                shortcuts: pickerOptions2
                },
                page:1,
                pagesize:20,
                totalCount:0,
                tableDataAll:[],
                selected:[],
                createTime:[],
            }
        },
        created(){

        },
        mounted(){
           this.firstblood();
           this.getMoreInformation();
        },  
        beforeDestroy(){
           
        },
        methods: {
            firstblood(){
                this.loading = true;
                data_get_driver_list(this.page, this.pagesize, this.searchInfo).then(res => {
                    this.totalCount = res.data.totalCount
                    this.tableDataAll = res.data.list
                    this.inited = false;
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                    this.loading = false;
                })
            },
            // 获取信息
            getMoreInformation() {
            getDictionary("AF00301").then(res => {
                this.registerOriginArray = res.data;
            });
            getDictionary("AF00204").then(res => {
                this.activeValueArray = res.data;
            });
            getDictionary("AF00105").then(res => {
                this.accountStatusArray = res.data;
            });
            getDictionary("AF00104").then(res => {
                this.driverStatusArray = res.data;
            });
            },
            //搜索
            changeEnter(type,event){
                console.log('666')
                switch(type){
                case 'createTime':
                if(event!==null){
                this.searchInfo.registerStartTime = event[0]
                this.searchInfo.registerEndTime = event[1]
                }
                else{
                this.searchInfo.registerStartTime = null
                this.searchInfo.registerEndTime = null
                }
                break;
                }
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
                this.firstblood()
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            // 判断选中与否
            getSelection(val){
                console.log('选中内容',val)
                this.selected = val;
            },
            pushOrderSerial(item){
                this.$router.push({name: '车主详情',query:{ driverId:item.driverId }});
            },
            getSearchParam(obj) {
                this.searchInfo = Object.assign(this.searchInfo, obj)
                this.loading = false;
                this.firstblood()
            },
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
        }
    }
</script>

<style lang="scss">
.carData{
    .el-table th 
    {
        div{
            line-height: 30px;
            padding: 0;
        }
        .cell{
            padding: 0;
            position: relative;
            }
    }
    .el-table .caret-wrapper{
        position: absolute!important;
        right: 0!important;
        top:0;
    }
    .el-table th:hover {
        background-color: #dae0ef;
    }
    .searchTable-header{
        display: flex !important;
        flex-direction: column;
        width: 100%;
        margin: 0!important;
        padding: 0!important;
        margin-top: 5px;
        position: relative;
        clear: both;
        p{
            line-height: 22px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: calc(100% - 18px);
            margin-bottom: 5px;
        }
        .search_control{
            border-top: 1px solid #d0d7e5;
            width: 100%;
            padding: 5px 5px 0;
            line-height: 30px;
            height:38px;
            .table-header-input {
                width: 100%;
                line-height: 30px!important;
                vertical-align: middle;
                margin: 0!important;
                padding: 0!important;
            }
            .el-input__inner{
                line-height: 30px!important;
                padding:0;
                height: 30px;
                text-indent: 3px;
            }
            .el-input{
                padding:0px;
            }
            .el-date-editor {
                line-height:30px;
                .el-range-separator{
                    padding:0px;
                }
          }
          .el-input__icon{
              line-height:30px;
          }
        }
    }
}
</style>
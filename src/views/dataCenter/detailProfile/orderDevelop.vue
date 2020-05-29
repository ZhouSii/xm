<template>
    <div class="identicalStyle clearfix detailProfile" v-loading="loading">
        <el-form inline  class="demo-ruleForm classify_searchinfo">
        <el-form-item  label="时间：">
            <ul class="timeLine">
                <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,item.value)"><span>{{item.name}}</span> </li>
            </ul>
        </el-form-item>
        <el-form-item label="业务组">
              <businessGroup  @inputObject = "getObject" v-model="formAllData.groupName" ref="businessGroup"/>
        </el-form-item>
        <el-form-item label="业务员">
             <selectBelong :groupCode = "formAllData.groupCode" :belongSalesman = 'formAllData.belongSalesmanMobile' @returnBelong = '(value)=>{getReturnBelong(value)}' ref="selectBelong"/>
        </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" plain @click="getdata_search"  :size="btnsize" icon="el-icon-search">搜索</el-button>
                    <el-button type="info" plain  @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
                </el-form-item>
        </el-form>
        <div class="classify_info">
      <div class="TotalH2">{{getYear}}-{{getMonth < 10?'0'+getMonth:getMonth}}-1 至 {{getYear}}-{{getMonth < 10?'0'+getMonth:getMonth}}-{{daycount}}订单发展概况
           <el-button type="primary" :size="btnsize" plain @click="importExcel" icon="el-icon-download" class="fixedExcel" v-has:DATA_CENTER_DEVELOPMENT_OVERVIEW_ORDER_DEVELOP_GENERAL_EXCEL>导出Excel</el-button>
      </div>
      <div class="info_news">
            <el-table ref="multipleTable" style="width: 100%" stripe border height="98%" highlight-current-row :data="tableDataAll"  tooltip-effect="dark" :span-method="objectSpanMethod">
            <el-table-column  label="所属业务组" prop="groupName"  width="160" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="业务员" prop="userName"  width="160" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="统计项" prop="covarianceItem"  width="160" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="汇总" prop="monthCount"  width="160" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="1日" prop="day1Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="2日" prop="day2Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="3日" prop="day3Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="4日" prop="day4Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="5日" prop="day5Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="6日" prop="day6Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="7日" prop="day7Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="8日" prop="day8Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="9日" prop="day9Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="10日" prop="day10Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="11日" prop="day11Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="12日" prop="day12Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="13日" prop="day13Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="14日" prop="day14Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="15日" prop="day15Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="16日" prop="day16Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="17日" prop="day17Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="18日" prop="day18Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="19日" prop="day19Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="20日" prop="day20Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="21日" prop="day21Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="22日" prop="day22Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="23日" prop="day23Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="24日" prop="day24Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="25日" prop="day25Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="26日" prop="day26Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="27日" prop="day27Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="28日" prop="day28Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="29日" prop="day29Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="30日" prop="day30Count" width="70" :render-header="renderHeader">
            </el-table-column>
            <el-table-column  label="31日" prop="day31Count" width="70" :render-header="renderHeader">
            </el-table-column>
            </el-table> 
        	</div> 
         <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
        </div>
        </div>
</template>
<script type="text/javascript">
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import GetCityList from '@/components/GetCityList/city'
import { data_post_findSalesmanOrderDevelSurveyList,data_post_exportSalesmanOrderDevelSurveyExcel } from '@/api/dataCenter/detailProfile'
import Pager from '@/components/Pagination/index'
import selectBelong from '@/views/users/shipper/selectBelong'
import businessGroup from '@/components/selectTree/businessGroup'  
import { DicBusinessInterests } from '@/api/common.js'
    export default{
        data(){
            return{
              loading:true,
              btnsize:'mini',
              pickerOptions2: {
                shortcuts: pickerOptions2
              },
              groupNameClassNameArr:[],
              userNameNameArr:[],
              groupName:0,
              userName:0,
              sizes: [20, 50, 100, 400],
              pagesize: 20, // 初始化加载数量
              page: 1, // 初始化页码
              dataTotal: 0,
              tableDataAll: [],
              dataType:[
                {name:'上月',value:'6',iscur:false},
                {name:'本月',value:'4',iscur:true},
              ],
              formAllData:{
                  groupName:null,
                  groupCode:null,
                  belongSalesmanMobile:null,
                  belongSalesmanName:null,
                  belongSalesman:null,
                  userStatus:null,
                  timeQueryType:'4'
              },
              href:'',
              getYear:null,//获取当前年份
              getMonth:null,//获取月份 
              daycount:null,//获取当月天数
              getdata:[]
            }
        },
        components: {
            GetCityList,
            Pager,
            selectBelong,
            businessGroup
        },
        methods:{
            firstblood(){
            this.loading = true;
            data_post_findSalesmanOrderDevelSurveyList(this.page, this.pagesize,this.formAllData).then(res=>{
                this.dataTotal = res.data.totalCount
                this.tableDataAll = res.data.queue
                this.rowspan(this.tableDataAll)
                this.changeData(this.formAllData.timeQueryType);
                this.loading = false;
            }).catch(err=>{
                this.$message.error('获取数据失败')
                this.loading = false;
            })
            },
            getObject(e){
               this.formAllData.groupName = e.groupName
               this.formAllData.groupCode = e.groupCode
           },
           getReturnBelong(val){
               this.formAllData.belongSalesmanName = val.name;
               this.formAllData.belongSalesman = val.userId;
               this.formAllData.belongSalesmanMobile = val.mobile;
           },
            // 获取信息
            getMoreInformation(){
            },
          //   查询
          getdata_search(){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
                this.firstblood()
          },
          // 清空查询
          clearSearch(){
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
            }
            this.dataType.forEach((el,idx)=>{
                if(idx==1){
                    el.iscur = true
                }
                else{
                    el.iscur = false
                }
            })
            this.formAllData = {
                  groupName:null,
                  groupCode:null,
                  belongSalesmanMobile:null,
                  belongSalesmanName:null,
                  belongSalesman:null,
                  userStatus:null,
                  timeQueryType:'4'
              }
            this.$refs.selectBelong.restaurants = []
            this.firstblood()
          },
          handlePageChange(obj){
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
          },
          setCur(index,value){
                        this.dataType.forEach((el,idx)=>{
                            idx == index ? el.iscur = true : el.iscur = false;
                        })
                        this.formAllData.timeQueryType = value;
           },
         //详情弹窗
          pushOrderSerial(item){
            this.$router.push({name: '订单详情',query:{ orderSerial:item.orderSerial }});
        },
        renderHeader(h, { column, _self }) {
            var basicColor = ''
            var labelAraay = column.label.split('日')
            if(new Date().getDate()==Number(labelAraay[0])&&this.formAllData.timeQueryType==4){
                basicColor = 'redColor'
            }
            else if(this.getdata.indexOf(Number(labelAraay[0]))!==-1){
                basicColor = 'blueColor'
            }
            return h('div',{'class':'basicColor '+ basicColor},column.label)
        },
        importExcel(){
        this.$message.info('正在导出中...')    
        data_post_exportSalesmanOrderDevelSurveyExcel(0, 0,this.formAllData).then(res=>{
                var blob = new Blob([res]);
                this.href =  window.URL.createObjectURL(blob);
                var NewDom = document.createElement("a");
                NewDom.setAttribute('href', this.href);
                NewDom.setAttribute('target', '_blank');
                NewDom.setAttribute('download', '订单发展概况'+ this.getYear + '年' + this.getMonth +'月.xls');
                document.body.appendChild(NewDom);
                NewDom.click();
                document.body.removeChild(NewDom)
            })
        },
        changeData(i){
        this.getdata = []
        var dateNew
        if(i==4){
        dateNew = new Date();
        }
        else{
        dateNew = new Date();
        if(dateNew.getMonth()==0){
            dateNew = new Date(dateNew.getFullYear()-1,12,0);
        }
        else{
            dateNew = new Date(dateNew.getFullYear(),dateNew.getMonth(),0);
        }
        }
        this.getYear = dateNew.getFullYear();//获取当前年份
        this.getMonth = parseInt(dateNew.getMonth() + 1);//获取月份 
        var Newdate = new Date(this.getYear, this.getMonth, 0)
        this.daycount = Newdate.getDate();//获取当月天数
        var weekDay
        for (var i = 1; i < this.daycount + 1; i++) {
        var dateDay = new Date(this.getYear + '/' + this.getMonth + '/' + i);
         weekDay = dateDay.getDay();
            if (weekDay == 6||weekDay == 0) {
                this.getdata.push(i)
            }
        }
        this.$forceUpdate()
        },

        // 合并表格
        rowspan(data) {
                this.groupNameClassNameArr = []
                this.userNameNameArr = []
                this.groupName = 0
                this.userName = 0
                for (var i = 0; i < this.tableDataAll.length; i++) {
                    if (i === 0) {
                        this.groupNameClassNameArr.push(1);
                        this.userNameNameArr.push(1);
                        this.groupName = 0;
                        this.userName = 0;
                    } else {
                        // 判断当前元素与上一个元素是否相同
                        if (this.tableDataAll[i].groupName === this.tableDataAll[i - 1].groupName) {
                            this.groupNameClassNameArr[this.groupName] += 1;
                            this.groupNameClassNameArr.push(0);
                        } else {
                            this.groupNameClassNameArr.push(1);
                            this.groupName = i;
                        }

                        if (this.tableDataAll[i].userName === this.tableDataAll[i - 1].userName) {
                            this.userNameNameArr[this.userName] += 1;
                            this.userNameNameArr.push(0);
                        } else {
                            this.userNameNameArr.push(1);
                            this.userName = i;
                        }
                     }
                 }
            },
        // 合并表格
        objectSpanMethod({ row, column, rowIndex, columnIndex }){
                if (columnIndex === 0) {
                    const _row = this.groupNameClassNameArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
                if (columnIndex === 1) {
                    const _row = this.userNameNameArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
        },

        },
        mounted(){
        this.firstblood();
        this.changeData('4');
        }
    }
</script>

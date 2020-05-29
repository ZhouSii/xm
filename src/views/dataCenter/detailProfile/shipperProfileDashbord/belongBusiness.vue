<template>
    <div class="identicalStyle belongBusiness" v-loading="loading">
       <el-form inline  class="demo-ruleForm classify_searchinfo">
        <el-form-item >
        <searchInfo @change="getSearchParam"></searchInfo>
        </el-form-item>
        <el-form-item class="fr">
        <el-button type="primary" icon="el-icon-download" plain :size = "btnsize" @click="exportExcel" v-has:DATA_CENTER_DEVELOPMENT_OVERVIEW_SAHIPPER_GENERAL_MEMBER_EXCEL>导出Excel</el-button>
        </el-form-item>
        </el-form>
          
        <div class="classify_info">
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    id="out-table"
                    :data="tableData"
                    stripe
                    border
                    align = "center"
                    tooltip-effect="dark"
                    height="100%"
                    style="width: 100%"> 
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                        {{ (page - 1)*pagesize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        prop="salesman"
                        label="业务员姓名/手机号码">
                    </el-table-column>
                    <el-table-column
                        prop="channelName"
                        label="所属区域"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="regisShipper"
                        label="所属业务组"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="regisShipper"
                        label="统计时间范围"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="regisShipper"
                        label="发展货主总数"
                        >
                    </el-table-column>
                    <el-table-column label="当前时间所在周完成情况" >
                        <el-table-column
                            prop="shipperOrdernum"
                            label="周目标">
                        </el-table-column>
                        <el-table-column
                            prop="regisDriver"
                            label="周完成率">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="当前时间所在月完成情况" >
                        <el-table-column
                            prop="shipperOrdernum"
                            label="月目标">
                        </el-table-column>
                        <el-table-column
                            prop="regisDriver"
                            label="月完成率">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="认证状态" >
                        <el-table-column
                            prop="shipperOrdernum"
                            label="未提交认证资料">
                        </el-table-column>
                        <el-table-column
                            prop="regisDriver"
                            label="待认证">
                        </el-table-column>
                        <el-table-column
                            prop="cartificationeDriver"
                            label="已认证">
                        </el-table-column>
                        <el-table-column
                            prop="regisLogisticsCompany"
                            label="认证未通过">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
        </div>   
        <!-- 页码 -->
       <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>  
    </div>
</template>

<script type="text/javascript">

import { aflcChannelStatistics } from '@/api/server/QRCode.js'
import searchInfo from '../../component/dataCenterSearch'
import Pager from '@/components/Pagination/index'
import { SaveAsFile } from '@/utils/lodopFuncs'
import { parseTime } from '@/utils/index.js'

// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
export default{
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        searchInfo,
        Pager
    },
    data() {
        return {
            btnsize: 'mini',
            loading: true, // 加载
            sizes: [20, 50, 100, 400],
            pagesize: 20, // 初始化加载数量
            page: 1, // 初始化页码
            dataTotal: 0,
            searchInfo: {
                channal:'',//渠道名称
                salesman:'',//业务员
            },
            tableData: [],
            tableColumn:[{
                'label': '序号',
                'prop': '',
            },{
                'label': '业务员姓名/手机号码',
                'prop': 'salesman',
            },{
                'label': '所属区域',
                'prop': 'channelName',
            },{
                'label': '所属业务组',
                'prop': 'regisShipper',
            },{
                'label': '统计时间范围',
                'prop': 'shipperOrdernum',
            },{
                'label': '发展货主总数',
                'prop': 'regisDriver',
            },{
                'label': '周目标',
                'prop': 'cartificationeDriver',
            },{
                'label': '周完成率',
                'prop': 'regisLogisticsCompany',
            },{
                'label': '月目标',
                'prop': 'cartificationeDriver',
            },{
                'label': '月完成率',
                'prop': 'regisLogisticsCompany',
            },{
                'label': '未提交认证资料',
                'prop': 'cartificationeDriver',
            },{
                'label': '待认证',
                'prop': 'regisLogisticsCompany',
            },{
                'label': '已认证',
                'prop': 'cartificationeDriver',
            },{
                'label': '认证未通过',
                'prop': 'regisLogisticsCompany',
            }],
            tableColumnMerge:{
               '6': {
                    label:'当前时间所在周完成情况',
                    mergeNum:1
                },
                '8':{
                    label:'当前时间所在月完成情况',
                    mergeNum:1
                },
                '10':{
                    label:'认证状态',
                    mergeNum:3
                }
            }
        }
    },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.firstblood()
                } else{
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    created() {

    },
    mounted() {
        // this.firstblood();
    },
    beforeDestroy() {
    },
    methods: {
        //每页显示数据量变更
        handlePageChange(obj) {
            // this.page = obj.pageNum
            // this.pagesize = obj.pageSize
            // this.firstblood();
        },
        // exportExcel() {
        //     /* generate workbook object from table */
        //     var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        //     /* get binary string as output */
        //     var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        //     console.log(wb)
        //     console.log(wbout)
        //     try {
        //         FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
        //     } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        //     return wbout
        // },
        getSearchParam(obj) {
        },
        // 刷新页面
        firstblood() {
            this.loading = true;
            aflcChannelStatistics(this.page, this.pagesize, this.searchInfo).then(res => {
                this.tableData = res.data.list;
                this.dataTotal = res.data.totalCount;
                this.loading = false;
            })
        },
            // 点击选中当前行
        clickDetails(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        exportExcel(){
            SaveAsFile({
                data: this.tableData ? this.tableData : [],
                columns: this.tableColumn,
                name: '400管理-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
            },this.tableColumnMerge)
        }
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .belongBusiness{
        height: 100%;
    }
</style>

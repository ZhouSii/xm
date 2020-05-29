<template>
    <div class="identicalStyle gestureConfig" v-loading="loading">
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="handleClick('new')" v-has:MARKETING_CARSTICKER_MONTHLYGESTURECONFIGURE_ADD>新增</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:MARKETING_CARSTICKER_MONTHLYGESTURECONFIGURE_MODIFY>修改</el-button>
			</div>
            <div class="info_news" v-viewer>
                <el-table
                :data="tableData" 
                border
                ref="multipleTable"
                stripe
                align = "center"
                height="100%"   
                tooltip-effect="dark"
                @row-click="clickDetails"
                style="width: 100%"
                >
                    <el-table-column label="选择" width="60" align="center">
                        <template slot-scope="scope">
                            <el-radio class="radio"  v-model="radio"  :label="scope.row.id">&nbsp;</el-radio>
                        </template>
                    </el-table-column>  
                    <template v-for="(column,key) in tableColumn">
                        <el-table-column :sortable="column.label === '序号' ? false :true " :key="key" :fixed="column.fixed" :label="column.label" :show-overflow-tooltip="column.overflow" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column>
                        <el-table-column :sortable="column.label === '序号' ? false :true " :key="key" :fixed="column.fixed" :label="column.label" :show-overflow-tooltip="column.overflow" v-else :width="column.width || ''">
                            <template slot-scope="scope">
                                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope.row)"></span>
                                <span v-else v-html="column.slot(scope)"></span>
                            </template>
                        </el-table-column>
                    </template>
                </el-table>
            </div>
        </div>   
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" ref="pager"/></div> </div>    
        <add :dialogFormVisible.sync = "dialogFormVisible" @renovate="firstblood" :formtitle = "formtitle" :changeForm="changeForm" :isModify = 'isModify'/>

    </div>
</template>

<script type="text/javascript">
import { gestureConfigList,deleteCarSticker,carStickerStatus } from '@/api/marketing/carSticker'
import Pager from '@/components/Pagination/index'
import { objectMerge2,parseTime } from '@/utils/'
import add from './add'

export default{
    name:'gestureConfig',
    components: {
        Pager,
        add
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dialogFormVisible:false,
            isModify:false,
            formtitle:'',
            changeForm:{},
            totalCount: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {}
            },
            chooseTime:[],
            tableData: [],
            radio:'',
            selected:{},
            tableColumn:[{
                label: '序号',
                prop: 'id',
                width: '60',
                fixed: false,
                slot: (scope) => {
                    return (this.listSystemObj.currentPage - 1)*this.listSystemObj.pageSize + scope.$index + 1;
                }
            },{
                'label': '年月',
                'prop': 'belongMouth',
                fixed: false,
                // width:'150',
                overflow:true,
                slot: (scope) => {
                    return  parseTime(scope.row.belongMouth,'{y}-{m}')
                }
            },{
                'label': '月审手势图片',
                'prop': 'gestureUrl',
                // width:'150',
                fixed: false,
                overflow:true,
                slot: (scope) => {
                    return   "<img src='"+scope.row.gestureUrl+"'/>";
                }
            },{
                'label': '操作时间',
                'prop': 'updateTime',
                // width:'160',
                fixed: false,
                overflow:false,
                slot: (scope) => {
                    return  parseTime(scope.row.updateTime)
                }
            },{
                'label': '操作人',
                'prop': 'updater',
                // width:'150',
                fixed: false,
                overflow:false,
                // slot: (scope) => {
                //     return  scope.row.usingStatus == '1' ? '显示' : '屏蔽'
                // }
            }],
        }
    },
    watch: {
    },
    mounted() {
        this.firstblood();
    },
    beforeDestroy() {
    },
    methods: {
        // 点击选中当前行
		clickDetails(row, event, column) {
            // this.$refs.multipleTable.toggleRowSelection(row)
            this.radio = row.id;
            this.selected = row;
		},
        getStr(d){
            this.listSystemObj.vo.fullCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
            this.listSystemObj.vo.cityCode = d.city.code;
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        handleSearch(type) {
            if(type == 'clear'){
                this.listSystemObj.vo = {
                    produceName:'',//产品名称
                    fullCityName:'',//所属区域
                    cityCode:'',//所属区域编码
                };
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }  
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true;
            gestureConfigList(this.listSystemObj).then(res => {
                this.totalCount = res.data.totalCount;
                this.tableData = res.data.list;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
        handleClick(type){
            if(this.selected.id || type =='new'){
                switch(type){
                    case 'new':
                        this.dialogFormVisible = true;
                        this.formtitle = '新增每月手势配置';
                        this.isModify = false;
                        break;
                    case 'revise':
                        this.dialogFormVisible = true;
                        this.formtitle = '修改每月手势配置';
                        this.isModify = true;
                        this.changeForm = this.selected;
                        break;
                }
            }else{
                this.$message({
                    type: 'warning',
                    message: '请选择一条列表数据!'
                });
            }
        }
    }
}
</script>

<style type="text/css" lang="scss">
    .gestureConfig{
        .cell{
            img{
                display: inline-block;
                width: 100px;
                height: 100%;
                vertical-align: middle;
                cursor: pointer;
            }
        }
    }
</style>

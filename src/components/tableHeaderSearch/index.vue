<template>
    <div class="searchTable-header-wrapper">
        <p class="table-header-label">{{scope.column.label}}</p>
        <div class="componentStyle">
            <!-- 时间搜索 -->
            <el-date-picker
            v-model.lazy.trim="queryString"
            v-if="isTime"
            type="date"
            placeholder="选择日期时间"
            :size="inputSize"
            value-format="timestamp"
            @click.stop.prevent.native
            @change="(value) => changeKey(scope.column, scope.$index, value)"
            @keyup.enter.native="event => changeEnter(scope.column, scope.$index, event)"
            ></el-date-picker>
            <!-- 下拉选择搜索 -自定义 -->
            <el-select
            v-model.lazy="queryString"
            v-else-if="isSelect && !isTrade"
            placeholder="请选择"
            clearable
            :size="inputSize"
            @click.stop.prevent.native
            @keyup.enter.native="event => changeEnter(scope.column, scope.$index, event)"
            @change="val => changeKey(scope.column, scope.$index, val)"
            >
            <el-option
                v-for="(item, index) in SetCur"
                :key="index"
                :label="item.name"
                :value="item.code"
            ></el-option>
            </el-select>
            <el-select 
            v-else-if="isSelect && isTrade"
            clearable 
            :size="inputSize"
            v-model.lazy="queryString" 
            @click.stop.prevent.native
            @keyup.enter.native="event => changeEnter(scope.column, scope.$index, event)"
            @change="val => changeKey(scope.column, scope.$index, val)">
                <el-option
                v-for="item in SetCur"
                :key="item.id"
                :label="item.tradeName"
                :value="item.id">
                <div :class="'indent indent'+item.index" @click="selectData(item)">{{ item.tradeName }}</div>
                </el-option>
            </el-select>
            <!-- 普通输入框 -->
            <el-input
                v-else
                @click.stop.prevent.native
                :size="inputSize"
                :placeholder = "placeholderTxt"
                @change="value => changeKey(scope.column, scope.$index, value)"
                v-model.lazy.trim="queryString"
                class="table-header-input"
                :maxlength="length"
                clearable
                @keyup.enter.native="event => changeEnter(scope.column, scope.$index, event)"
            ></el-input>
        </div>
    </div>
</template>
<script>
import { objectMerge2, parseTime } from '@/utils/'
import { getDictionary } from '@/api/common.js'
import { treeAllList } from '@/api/users/shipper/all_shipper.js'

function expandGroups (data, i) {
  let res = []
  data.map(el => {
    el.index = i
    res.push(el)
    if(el.childrenList){
      res = res.concat(expandGroups(el.childrenList, i+1))
    }
  })
  return res
}
export default {
    name: 'tableHeaderSearch',
    props: {
        query: {
            type: Object,
            default: () => {}
        },
        scope:{
            type:Object,
        },
        length:{
            type:String,
            default:'20'
        },
        placeholderTxt:{
            type:String,
            default:'搜索关键字'
        },
        disabledType:{
            type:Boolean,
            default:false
        },
        showType:{
            type:String,
            default:''
        },
        ifZero:{
             type:Boolean,
            default:true
        }
    },
    data() {
        return {
            queryString: '',
            inputSize:'mini',
            SetCur:[],
            groups: [],
            isTrade:false,
            selectOptions:[
                {
                    property: 'shipperType',
                    label: 'AF00101',
                    options:[],
                },
                {
                    property: 'registerOrigin',
                    label: 'AF00301',
                    options:[],
                },
                {
                    property: 'usingStatus',
                    label: '',
                    options:[{
                        code:'1',
                        name:'启用'
                    },{
                        code:'0',
                        name:'禁用'
                    }],
                },
                {
                    property: 'accountStatus',
                    label: 'AF00105',
                    options:[],
                },
                {
                    property: 'potentialGrade',
                    label: 'AF00211',
                    options:[],
                },
                {
                    property: 'shipperStatus',
                    label: 'AF00104',
                    options:[],
                },
                {
                    property: 'tradeAreaId',
                    label: '',
                    options:[],
                },
            ]
        };
    }, 
    watch:{
        // scope(newVal,oldVal){
        //     console.log('scope',newVal)
        //     // if(newVal){
        //     //     this.reg(newVal)
        //     // }else if(newVal == ''){
        //     //     this.$emit('input','')
        //     // }
        // }
    },
    mounted(){
    
    },
    computed: {
        isTime() {
            // 判断当前字段是否是时间格式
            const reg = /(time)/
            const property = this.scope.column.property.toLowerCase()
            // console.log('isTime',reg.test(property),property !== 'timeliness')
            if (reg.test(property) && property !== 'timeliness') {
                return reg.test(property)
            } else {
                // 其他时间格式的字段集合 property
                const arr = [
                'validityDate',
                'validityStartdate',
                'truckRegisterDate',
                'truckScrapDate'
                ]
                const find = arr.filter(el => el.toLowerCase() === property)
                return !!find.length
            }
        },
        isSelect() {
            // console.log('isSelect')
            let selectStatus = false;
            const find = this.selectOptions.filter(
                el => {
                    if (el.property === this.scope.column.property) {
                        selectStatus = true;
                        if(el.property == 'tradeAreaId'){
                            this.isTrade = true;
                            treeAllList().then(res => {
                                let groups = [];
                                groups.push(res.data[0]);
                                this.SetCur = this.openGroups(groups)
                            })
                        }else{
                            this.isTrade = false;
                            if(el.options.length == 0){
                                getDictionary(el.label).then(res => {
                                    el.options = res.data;
                                    this.SetCur = [];
                                    this.SetCur = el.options;
                                })
                            }else{
                                this.SetCur = [];
                                this.SetCur = el.options;
                            }
                        }
                    }
                }
            )
            return selectStatus
        }
    },
    methods: {
        openGroups (groups) {
            // 用来标记是第几层
            let index = 1
            let res
            res = expandGroups(groups, index)
            //   console.log('openGroupsexpandGroups',res)
            return res
        },
        changeKey(column, index, value, obj) {
            this.$nextTick(() => {
                const query = this.query
                if (!query.vo) {
                this.$set(query, 'vo', {})
                }
                console.log(value)
                // this.isChange = true
                if (this.isTime) {
                    // 处理时间格式
                    // value = parseTime(value, '{y}-{m}-{d} {h}:{i}:{s}')
                    // value = parseTime(value, '{y}-{m}-{d}')
                    value = value+'';
                }
                query.vo[column.property] = value ? value.replace(' ', '') : '';// 删掉空格
                query.currentPage = 1 // 搜索时 默认为第一页

                console.log('this.query',this.query,query)
                this.$emit('change', query)
            })
        },
        changeEnter(column, index, event) {
            this.changeKey(column, index, event.target.value)
        },
    },
    beforeDestroy(){
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .searchTable-header-wrapper{
    }
    .indent{
        border-left: 1px dashed #aaa;
        padding-left: 5px;
        border-bottom: 1px dashed #aaa;
        line-height: 33px;
        height: 33px;
    }
    .indent1{

    }
    .indent2{
        margin-left: 1em;
    }
    .indent3{
        margin-left: 2em;
    }
    .indent4{
        margin-left: 3em;
    }
    .indent5{
        margin-left: 4em;
    }
</style>



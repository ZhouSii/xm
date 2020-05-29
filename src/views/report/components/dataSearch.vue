<template>
    <div class="dataChoose">
        <!-- {{countType}} {{currentkey2}} -->
        <el-select v-model="currentkey" placeholder="请选择" v-show="isChoose" v-if="countType != 'jybhline'">
            <el-option
            v-for="item in dataBtns"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="currentkey2" placeholder="请选择" v-show="isChoose" v-else>
            <el-option
            v-for="item in dataBtns2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <p v-if="pickerDate[0] && pickerDate[1]">{{pickerDate[0] | parseTime('{y}-{m}-{d}')}} <span>至</span> {{pickerDate[1] | parseTime('{y}-{m}-{d}')}}</p>
        <el-date-picker
            v-model="pickerDate"
            type="daterange"
            align="right"
            value-format="timestamp"
            >                                                                                                                                                
        </el-date-picker>
    </div>
</template>

<script>

import { pickerOptions4, parseTime } from '@/utils/index'

export default {
    name:'dataChoose',
    components:{
    },
    props:{
        isChoose:{
            type:Boolean,
            default:true
        },
        keyVal:{
            type:Number,
            default:0
        },
        countType:{
            type:String
        }
    },
    watch: {
        currentkey(newVal) {
            if (newVal !== '') {
                this.doAction(newVal)
            }
        },
        currentkey2(newVal) {
            if (newVal !== '') {
                this.doAction2(newVal)
            }
        },
        keyVal(newVal){
            if(newVal){
                this.currentkey = newVal;
            }
        }
    },
    data() {
        return {
            newTime:'',
            timeType:'',
            value:'',
            currentkey:'',
            currentkey2:'',
            pickerDate:[],
            dataBtns: [{
                label: '今天',
                type:'day',
                value: 0
            }, {
                label: '昨天',
                type:'day',
                value: 1
            }, {
                label: '本周',
                type:'day',
                value: 2
            }, {
                label: '本月',
                type:'day',
                value: 3
            }, {
                label: '本年',
                type:'month',
                value: 4
            },{
                label: '全部',
                value: 5
            }],
            dataBtns2:[{
                label: '近7天',
                type:'day',
                value: 0
            }, {
                label: '近30天',
                type:'day',
                value: 1
            }, {
                label: '近半年',
                type:'month',
                value: 2
            }, {
                label: '近一年',
                type:'month',
                value: 3
            }]
        }
    },
    methods: {
        doAction(type) {
            switch (type) {
                case 0:
                const Today = pickerOptions4.today()
                // picker.$emit('pick', Today)
                this.pickerDate = Today
                // this.searchQuery.vo.buttonKey = 0
                this.currentkey = 0
                // this.title = '今天'
                console.log('今天')
                break
                case 1:
                const YesterDay = pickerOptions4.yesterDay()
                this.pickerDate = YesterDay
                // this.title = '昨天'
                console.log('昨天')
                // this.searchQuery.vo.buttonKey = 1
                this.currentkey = 1
                break
                case 2:
                // 最近的星期天的日期，到今天的日期
                const CurrentWeek = pickerOptions4.currentWeek()
                // 上上周星期天的日前，到上周六的日期
                const lastWeek = pickerOptions4.lastWeek()
                this.pickerDate = CurrentWeek
                // this.searchQuery.vo.buttonKey = 2
                this.currentkey = 2
                // this.title = '本周'
                console.log('本周',CurrentWeek,this.pickerDate)
                break
                case 3:
                // 本月1日到今天的日前
                const CurrentMonth = pickerOptions4.currentMonth()
                // 上月1日到上月的结束时间
                const LastMonth = pickerOptions4.lastMonth()
                this.pickerDate = CurrentMonth
                // this.searchQuery.vo.buttonKey = 3
                this.currentkey = 3
                // this.title = '本月'
                console.log('本月',CurrentMonth,this.pickerDate)
                break
                case 4:
                const CurrentYear = pickerOptions4.currentYear()
                const LastYear = pickerOptions4.lastYear()
                this.pickerDate = CurrentYear
                // this.searchQuery.vo.buttonKey = 4
                this.currentkey = 4
                // this.title = '本年'
                break
                case 5:
                this.pickerDate = [null,null];
                this.currentkey = 5
                // this.title = '全部'
                break
            }
            this.getData()
        },
        doAction2(type){
            switch (type) {
                case 0:
                const last7Dat = pickerOptions4.last7Day()
                // console.log(this.dataset)
                // picker.$emit('pick', Today)
                this.pickerDate = last7Dat
                // this.searchQuery.vo.buttonKey = 0
                this.currentkey2 = 0
                this.timeType = 'day'
                // this.title = '近7天'
                console.log('近7天')
                break
                case 1:
                const last30Day = pickerOptions4.last30Day()
                this.pickerDate = last30Day
                // this.title = '近30天'
                console.log('近30天')
                this.timeType = 'day'
                // this.searchQuery.vo.buttonKey = 1
                this.currentkey2 = 1
                break
                case 2:
                // 最近的星期天的日期，到今天的日期
                const last6Month = pickerOptions4.last6Month()
                // 上上周星期天的日前，到上周六的日期
                const lastWeek = pickerOptions4.lastWeek()
                this.pickerDate = last6Month
                this.timeType = 'month'
                // this.searchQuery.vo.buttonKey = 2
                this.currentkey2 = 2
                // this.title = '近半年'
                console.log('近半年')
                break
                case 3:
                // 本月1日到今天的日前
                const CurrentMonth = pickerOptions4.last12Month()
                // 上月1日到上月的结束时间
                const LastMonth = pickerOptions4.lastMonth()
                this.pickerDate = CurrentMonth
                this.timeType = 'month'
                // this.searchQuery.vo.buttonKey = 3
                this.currentkey2 = 3
                // this.title = '本月'
                console.log('近一年')
                break
            }
            this.getData()
        },
        getData(){
            this.$emit('getValue',this.pickerDate,this.countType,this.timeType)
        }
    },
    beforeDestroy(){
    },
    mounted() {
        if(this.countType != 'jybhline'){
            this.currentkey = 0
        }else{
            this.currentkey2 = 0
        }
    }

}
</script>

<style lang="scss" scoped>
    .dataChoose{
        height: 30px;
        line-height: 30px;
        p{
            display: inline-block;
            font-size: 16px;
        }
        .el-date-editor{
            display: none;
        }
        .el-select{
            width: 100px;
            margin-right: 10px;
             .el-input__inner{
                height: 30px;
                line-height: 30px;
            }
        }
    }
</style>

<style lang="scss">
    .dataChoose{
        .el-select .el-input .el-input__inner{
            height: 30px;
            line-height: 30px;
            // background:rgba(255,255,255,.5)
        }
    }
</style>
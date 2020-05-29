<template>
    <div class="TCorderInfo clearfix" v-loading="loading">
        <!-- 基本信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>基础信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>中转单号：</span>
                    <span>{{formData.outsourceId || ''}}</span>
                </p>
                <p>
                    <span>中转单状态：</span>
                    <span class="fontRed">{{formData.outsourceStatus || ''}}</span>
                </p>
                <p>
                    <span>中转时间：</span>
                    <span>{{formData.outsourceTime}}</span>
                </p>
                <p>
                    <span>专线揽收时间：</span>
                    <span class="fontRed">{{formData.receiveTime}}</span>
                </p>
            </div>       
        </div>
        <!-- 专线承运商信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>专线承运商信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>专线承运商：</span>
                    <span class="fontRed">{{formData.carriersCompanyName || ''}}</span>
                </p>
                <p>
                    <span>联系人：</span>
                    <span>{{formData.carriersContact || ''}}</span>
                </p>
                <p>
                    <span>联系人电话：</span>
                    <span class="fontRed">{{formData.carriersContactMobile || ''}}</span>
                </p>
                <p>
                    <span>客服电话：</span>
                    <span>{{formData.carriersServiceMobile || ''}}</span>
                </p>
            </div>       
        </div>
        <!-- 预估中转费 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>预估中转费</h2>
            <div class="essentialInformation">
                <p>
                    <span>预估中转费总额：</span>
                    <span class="fontRed">{{formData.expense?'￥'+formData.expense : ''}}</span>
                </p>
                <p>
                    <span>付款方式：</span>
                    <span>{{formData.payTimeType == '1' ? '现付' :'到付'}}</span>
                </p>
            </div>
            <div class="essentialInformation" >
            <el-table style="width: 100%" :data="formData.expensesCourseList" ref="multipleTable" stripe border highlight-current-row >
            <el-table-column  label="费用科目" prop="expensesCourseName" show-overflow-tooltip></el-table-column>
            <el-table-column  label="预估费用金额(元)" prop="coursePrice" show-overflow-tooltip></el-table-column>
           </el-table>
            </div>
        </div>
</div>
</template>
<script>
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import { logisticsOutsourceDetails } from '@/api/order/logistics/logistics1.js'
export default {
    props:{
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
        loading: false,    
        formData: {
            // "carriersCompanyName": "",
            // "carriersContact": "",
            // "carriersContactMobile": null,
            // "carriersServiceMobile":'' ,
            // "expense":null,
            // "expensesCourseList": [
            // // {
            // //     "courseBalance": 10,
            // //     "coursePrice": 20,
            // //     "expensesCourse": "AF0710902",
            // //     "expensesCourseName": "提货费",
            // //     "id": "string"
            // // }
            // ],
            // "id": "",
            // "orderSerial": "",
            // "outsourceId": "",
            // "outsourceStatus": "",
            // "outsourceTime": "",
            // "payTimeType": null,
            // "receiveTime":'' 
        },
        }
    },
    methods:{
        firstblood(){
            this.loading = true;
            logisticsOutsourceDetails(this.$route.query.orderSerial).then(res=>{
                this.formData = res.data ? res.data : {} ;
                this.loading = false;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                })
                this.loading = false
            })
        },
    },
    watch:{
        isvisible:{
          handler(newVal,oldVal){
            if (newVal) {
            this.firstblood()
            }   
          },
          immediate: true
      }
    },
}
</script>


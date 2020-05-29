<template>
 <div class="TCorderInfo clearfix" v-if="formData.length != 0">
        <!-- 照片信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>照片信息</h2>
            <div class="essentialInformationPhoto">
                <p>
                    <span>回单照片：</span>
                    <span v-if="formData.receiptUrls">
                        <i v-for="(form,keys) in formData.receiptUrls" :key='keys'>
                       <div class="upload" v-viewer >
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img :src="formData.receiptUrls[keys]">
                        </el-tooltip> 
                      </div>
                      </i>     
                    </span>
                    <span v-else></span>
                 </p>
            </div>
        </div>
 
         <!-- 评价信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>评价信息</h2>
            <div class="essentialInformation rateformation">
                <p>
                    <span>货主评价物流公司：</span>
                    <span>
                        <el-rate
                                v-model="EvaluationData.tranEvaluationLeve"
                                disabled
                                text-color="#ff9900"
                                >
                         </el-rate>
                    </span>
                 </p>
                 <p>
                    <span>评价内容：</span>
                    <el-tooltip class="item" effect="dark" :content="EvaluationData.transportDes" placement="top-start" v-if="EvaluationData.transportDes">
                    <span>{{EvaluationData.transportDes}}</span>
                    </el-tooltip>
                 </p>  
                 <p>
                    <span>评价标签：</span>
                    <span>{{EvaluationData.transportLabel}}</span>
                 </p>        
            </div>
            <div class="essentialInformation rateformation">
                <p>
                    <span>物流公司评价货主：</span>
                    <span>
                        <el-rate
                                    
                                v-model="EvaluationData.shipEvaluationLevel"
                                disabled
                                score-template="{value}"
                                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                >
                         </el-rate>                        
                    </span>
                 </p>
                <p>
                    <span>评价内容：</span>
                    <el-tooltip class="item" effect="dark" :content="EvaluationData.shipDes" placement="top-start" v-if="EvaluationData.shipDes">
                    <span>{{EvaluationData.shipDes}}</span>
                    </el-tooltip>
                 </p>    
                 <p>
                    <span>评价标签：</span>
                    <span>{{EvaluationData.shipLabel}}</span>
                 </p>                
            </div>
        </div>
 
        <!-- 回单信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>回单信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>物流公司回单时间：</span>
                    <span>{{formData.companyConfirmReceiptTime}}</span>
                 </p>
                <p>
                    <span>货主收到回单时间：</span>
                    <span>{{formData.shipperConfirmReceiptTime}}</span>
                </p>                 
            </div>
        </div>

        <!-- 回款信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>回款信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>物流公司回款时间：</span>
                    <span>{{formData.companyConfirmReceivableTime}}</span>
                 </p>
                <p>
                    <span>货主收到回款时间：</span>
                    <span>{{formData.shipperConfirmReceivableTime}}</span>
                </p>
            </div>
        </div>
 </div>
</template>

<script>
import {getOrderByOrderSerial,shipAndTransport} from '@/api/order/logistics/logistics.js'
export default {
    data(){
        return{
        formData:[],
        EvaluationData:{
            serverStarLevel:null
        },
        }
    },
    props: {
    isvisible: {
        type: Boolean,
        default: false
        }
    },    
    methods:{
    firstblood(){   
       getOrderByOrderSerial(this.$route.query.orderSerial).then(res=>{
            this.formData = res.data
        })
        shipAndTransport(this.$route.query.orderSerial).then(res=>{
            this.EvaluationData = res.data
        })
    }
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
    mounted(){
     this.firstblood()
    }    
}
</script>

<style lang="scss">
.orderExtraStyle{
        font-style: normal;
        color: red
    }
.essentialInformationPhoto{
    p{
    display: inline-block;
    color: #333333;
    line-height: 30px;
    vertical-align: top;
    width: 49%;
    font-size: 14px;
    margin-right: 10px;
    span{
        display: inline-block;
        vertical-align:top;
        &:nth-of-type(2){
        width: 70%
        }        
        img{
            width: 208px;
        }
    }
    }
    }
    .rateformation{
        .el-rate__decimal{
            line-height: 30px;
        }
    }

</style>

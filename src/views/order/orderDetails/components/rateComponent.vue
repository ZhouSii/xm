<template>
    <div class="rate clearfix" v-loading = "loading">
        <div class="ratePicture collapseInfo">
            <h2>照片信息</h2>   
            <div class="essentialInformation" v-viewer>
                <p>
                    <span>装货照片：</span>
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top"  v-if="listInformation.loadingFile">
                        <img class="showPicture" :src="loadingFile.filePath ? loadingFile.filePath: ''" alt="" >
                    </el-tooltip><br>
                    <span class="shangchuan" v-if="loadingFile.createTime">上传时间：</span><span v-if="loadingFile.createTime">{{loadingFile.createTime | parseTime}}</span><br>
                    <span class="shangchuan" v-if="loadingFile.address" :title="loadingFile.address ? loadingFile.address :''">上传位置：{{loadingFile.address ? loadingFile.address :''}}</span>
                </p>
                <p>
                    <span>回单照片：</span>
                    <el-tooltip class="item" v-for="(item,key) in filePathArr" :key="key" effect="dark" content="双击图片查看原图" placement="top" >
                        <img  :src="item ? item: ''" alt="">
                    </el-tooltip>
                    <br>
                    <span class="shangchuan" v-if="filePathArr[0]">上传时间：</span><span v-if="filePathArr[0]">{{listInformation.returnList.createTime | parseTime}}</span><br>
                    <span class="shangchuan" v-if="filePathArr.length != 0">上传位置：{{listInformation.returnList.address}}</span>
                </p>
                <p v-if="carStickerPicture.carFile">
                    <span>车辆45°照片：</span>
                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top" >
                        <img  :src="carStickerPicture.carFile ? carStickerPicture.carFile: defaultImg" alt="">
                    </el-tooltip>
                    <br>
                    <span class="shangchuan">审核结果：</span><span>{{carStickerPicture.status}}</span><span style="margin-left:10px;" class="shangchuan">操作人：</span><span>{{carStickerPicture.updater}}</span><br>
                    <span class="shangchuan">操作时间：{{carStickerPicture.updateTime | parseTime}}</span>
                </p>
            </div>
        </div>
        <div class="rateInfo collapseInfo">
            <h2>评价信息</h2>   
            <div class="essentialInformation" >
                <div  class="rateTabs">
                    <p>
                        <span>货主评价车主：</span>
                        <span>
                            <el-rate
                                v-if="listInformation.shipperEvaluation"
                                v-model="listInformation.shipperEvaluation.starLevel"
                                disabled
                                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                >
                            </el-rate>
                        </span>
                    </p>
                    <p>
                        <span>评价内容：</span>
                        <span v-if="listInformation.shipperEvaluation">{{listInformation.shipperEvaluation.evaluationDes ? listInformation.shipperEvaluation.evaluationDes :'暂未评价'}}</span>
                        <span v-else>暂未评价</span>
                    </p>
                    <p>
                        <span>评价标签：</span>
                        <span class="evaluationType" v-for="(el,key) in shipperEvaluationTypeName"  :key="key">{{el}}</span>
                    </p>
                </div>
                <div  class="rateTabs">
                    <p>
                        <span>车主评价货主：</span>
                        <span>
                            <el-rate
                                v-if="listInformation.driverEvaluation"
                                v-model="listInformation.driverEvaluation.starLevel"
                                disabled
                                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                >
                            </el-rate>
                        </span>
                    </p>
                    <p>
                        <span>评价内容：</span>
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">{{listInformation.driverEvaluation ? listInformation.driverEvaluation.evaluationDes : ''}}</div>
                            <span v-if="listInformation.driverEvaluation">{{listInformation.driverEvaluation.evaluationDes ? listInformation.driverEvaluation.evaluationDes : '暂未评价'}}</span>
                            <span v-else>暂未评价</span>
                        </el-tooltip>
                    </p>
                    <p>
                        <span>评价标签：</span>
                        <span class="evaluationType" v-for="el in driverEvaluationTypeName"  :key="el">{{el}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="rateHuidan collapseInfo">
            <h2>回单信息</h2>   
            <div class="essentialInformation">
                <p>
                    <span>车主回单时间：</span>
                    <span v-if="listInformation.returnList">{{listInformation.returnList.createTime | parseTime}}</span>
                </p>
                <!-- <p>
                    <span>快递公司：</span>
                </p>
                <p>
                    <span>快递单号：</span>
                </p>  -->
                <p>
                    <span>货主收到回单时间：</span>
                    <span v-if="listInformation.confirmReturnList">{{listInformation.confirmReturnList.createTime | parseTime}}</span>
                </p>
            </div>
        </div>
        <div class="rateHuikuan collapseInfo">
            <h2>回款信息</h2>   
            <div class="essentialInformation">
                <p>
                    <span>车主回款时间：</span>
                    <span v-if="listInformation.returnMoney">{{listInformation.returnMoney.createTime | parseTime}}</span>
                </p>
                <p>
                    <span>货主收到回款时间：</span>
                    <span v-if="listInformation.confirmReturnMoney">{{listInformation.confirmReturnMoney.createTime | parseTime}}</span>

                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { orderDetailsList,getReturnListAndEvaluation,getCarStickerPictureOrderByOrderSerial } from '@/api/order/ordermange'
import { parseTime,pickerOptions2 } from '@/utils/index.js'

export default {
    name: 'rate',
    components:{

    },
    props: {
       isvisible: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            evaluationType: "服务态度好,认路准确活地图,准时送达,收费合理",
            defaultImg:'/static/test.jpg',//默认加载失败图片
            loading:true,
            listInformation:{
                confirmReturnList: [],
                confirmReturnMoney: [],
                driverEvaluation: [],
                loadingFile: [],
                returnList: [],
                returnMoney: [],
                shipperEvaluation: [],
            },
            parseTimeF:null,
            driverEvaluationTypeName:[],
            shipperEvaluationTypeName:[],
            filePathArr:[],
            driverEvaluation: [],
            loadingFile: {},//装货照片
            carStickerPicture:{
                carFile:'',
                status:'',
                updater:'',
                updateTime:null
            }
        };
    },
    watch:{
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal){
                    this.init();
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted(){
        // this.init();
    }, 
    methods: {
        init(){
            this.parseTimeF = parseTime;
            this.loading = true;
            getReturnListAndEvaluation(this.$route.query.orderSerial).then(res => {
                this.listInformation = res.data;

                this.loadingFile = this.listInformation.loadingFile ?  this.listInformation.loadingFile : {};

                if(this.listInformation.returnList){
                    this.filePathArr = this.listInformation.returnList.filePath ?  this.listInformation.returnList.filePath.split(',') : [];
                }else{
                    this.filePathArr = []
                }

                let item = this.listInformation.shipperEvaluation;

                if(item){
                    this.shipperEvaluationTypeName = item.evaluationType ? item.evaluationType.split(",") : [];
                    item.starLevel = Number(item.starLevel);
                }else{
                    this.shipperEvaluationTypeName = [];
                }

                let el = this.listInformation.driverEvaluation;

                if(el){
                    this.driverEvaluationTypeName = el.evaluationType ? el.evaluationType.split(",") : [];
                    el.starLevel = Number(el.starLevel);
                }else{
                    this.driverEvaluationTypeName = [];
                }

                this.loading = false;
            }).catch(err => {
                console.log('err',err)
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
                this.loading = false;
            })

            getCarStickerPictureOrderByOrderSerial(this.$route.query.orderSerial).then(res => {
                if(res.data){
                    this.carStickerPicture.carFile = res.data.carFile;
                    this.carStickerPicture.status = res.data.status;
                    this.carStickerPicture.updater = res.data.updater;
                    this.carStickerPicture.updateTime = res.data.updateTime;
                }
            })
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .rate{
        .ratePicture{
            .essentialInformation{
                img{
                    vertical-align: top;
                    display: inline-block;
                    width: 208px;
                    height: 118px;
                    margin-top: 10px;
                    cursor: pointer;
                }
                // p:nth-child(3){
                //     width: 70%;
                // }
                .shangchuan{
                    // margin-left: 70px;
                    margin-right: 5px;
                }
            }
        }
        .rateInfo{
            .essentialInformation .rateTabs p:nth-child(2){
                width: 30%;
            }
            .essentialInformation .rateTabs p:last-child{
                width: 40%;
            }
            .essentialInformation .rateTabs p .evaluationType{
                padding: 0px 10px;
                margin:0 5px ;
                background: rgba(227, 233, 235, 0.479);
                color: #3e9ff1;
                font-weight: bold;
                box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
            }
        }
    }
</style>

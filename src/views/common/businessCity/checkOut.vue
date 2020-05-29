<template>
    <!-- 初始化检查 -->
    <div class="checkout commoncss">
        <el-dialog title='初始化检查' :close-on-click-modal="false" top="5vh"  :visible="dialogFormVisible" @close="close">
            <div class="box_top"  v-if="type == 1" :key="viewKey">
                <div class="checkout_top">
                    <i class="wzlicon"></i>
                    <h6 v-if="!ischecked">初始化检查中<el-button type="primary"  plain @click="doAction('check')" class="btn_qx">{{ cancelAni ? '继续检查' : '取消'}}</el-button></h6>
                    <h6 v-if="ischecked">初始化检查已完成，有<span class="top_num">{{dataset.totals}}</span>项基础功能没维护<el-button type="primary"   plain @click="doAction('agane')" class="btn_qx">重新检查</el-button></h6>
                </div>
                <progressbar :cancelAni="cancelAni" :isani="showani" />
            </div>
            <div class="main_checker2" v-if="type == 1">
                <div class="company_content" :key="viewKey">
                    <ul :class="{'showani': showani, 'cancelAni': cancelAni}" @animationend="ischecked = true">
                        <li v-for="(obj,idx) in countList" :key="idx">
                            <div>
                                <i :class="obj.configNum > 0 ? 'el-icon-success ' : 'el-icon-warning'"></i>
                                <p v-html="obj.configStatistics"></p> 
                                <el-button type="primary" plain @click="doActions(obj.label,obj)" class="btn_qx1" v-if="obj.noConfigNum == 0" disabled>{{obj.button3}}</el-button>
                                <el-button type="primary" plain @click="doActions(obj.label,obj)" class="btn_qx" v-else-if="obj.configNum == 0">{{obj.button1}}</el-button>
                                <el-button type="primary" plain @click="doActions(obj.label,obj)" class="btn_qx1" v-else>{{obj.button2}}</el-button>
                                <!-- <el-button type="primary" plain @click="doActions(obj.label,obj)" class="btn_qx1">{{obj.button2}}</el-button> -->
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import progressbar from './progressbar'
import { aflcCityCheckout } from '@/api/common.js'

export default {
    name: 'appointDriver',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true,
        },
        cityId:{
            type:String,
            required:true,
        }
    },
    components:{
        progressbar
    },
    data() {
        return {
            btnsize:'mini',
            ischecked: false,
            showAni: false,
            cancelAni: false,
            showani:false,
            viewKey:0,
            dataset: {
                totals:0,
            },
            type:1,
            countInfo:[],
            countList: [{
                label: 'areaService',
                title: '区域服务定价',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加',
                button3: '已配置',
            }, {
                label: 'waitService',
                title: '等候费定价',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加',
                button3: '已配置',

            }, {
                label: 'publicPush',
                title: '公海推单规则',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加',
                button3: '已配置',

            }, {
                label: 'orderObtain',
                title: '中单规则',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加',
                button3: '已配置',

            }, {
                label: 'favourablePrice',
                title: '优惠金',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加',
                button3: '已配置',

            }, {
                label: 'favourableQuan',
                title: '优惠券',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加',
                button3: '已配置',

            }, {
                label: 'brokerage',
                title: '抽佣',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加',
                button3: '已配置',

            }, {
                label: 'bonus',
                title: '奖励金',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加',
                button3: '已配置',

            }, {
                label: 'daliang',
                title: '达量',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加',
                button3: '已配置',

            }, {
                label: 'sockpuppetSetting',
                title: '马甲单',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加'
            }, {
                label: 'shipperAnnouncement',
                title: '货主公告',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加'
            }, {
                label: 'driverAnnouncement',
                title: '车主公告',
                configStatistics: '',
                button1: '去配置',
                button2: '继续添加'
            }],
        };
    },
    computed: {
    　
    },
    watch:{
        dialogFormVisible(newValue,oldValue){
            if(newValue){
                this.init()
            }
        }
    },
    mounted(){
    },
    methods: {
        //初始化选择项数据
        init(){
            this.viewKey = new Date().getTime()
            this.type = 1;
            this.dataset.totals = 0;
            aflcCityCheckout(this.cityId).then(res => {
                this.showani = true;
                this.countList.forEach(el => {
                    res.data.forEach(item => {
                        if(el.label == item.label){
                            el.configStatistics = item.configStatistics;
                            el.configNum = item.configNum;
                            el.determineConfig = item.determineConfig;
                            el.noConfigNum = item.noConfigNum;
                        }
                    })
                })

                for(var i in this.countList){
                    if(this.countList[i].configNum == 0){
                        this.dataset.totals += 1 ;
                    }
                }
            }).catch(err => {
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        doAction(type) {
            // console.log(type)
            switch (type) {
                case 'init':
                    this.init()
                    break;
                case 'check':
                    this.cancelAni = !this.cancelAni;
                    break;
                case 'agane':
                    this.ischecked = false;
                    this.type = 3
                    this.init()
                    break;
            }
        },
        doActions(type,obj){
            let routerHref = {} ;
            switch(type){
                case 'areaService':
                    routerHref = this.$router.resolve({name:'区域服务及定价'})
                    break;
                case 'waitService':
                    // console.log(obj)
                    if(obj.determineConfig == 0 && obj.configNum){
                        routerHref = this.$router.resolve({name:'区域服务及定价'})
                    }else{
                        routerHref = this.$router.resolve({name:'等候费用定价'})
                    }
                    break;
                case 'publicPush':
                    if(obj.determineConfig == 0 && obj.configNum){
                        routerHref = this.$router.resolve({name:'区域服务及定价'})
                    }else{
                        routerHref = this.$router.resolve({name:'公海推单'})
                    }
                    break;
                case 'orderObtain':
                    if(obj.determineConfig == 0 && obj.configNum){
                        routerHref = this.$router.resolve({name:'区域服务及定价'})
                    }else{
                        routerHref = this.$router.resolve({name:'中单设置'})
                    }
                    break;
                case 'favourablePrice':
                    routerHref = this.$router.resolve({name:'优惠金'})                    
                    break;
                case 'favourableQuan':
                    routerHref = this.$router.resolve({name:'优惠券'})
                    break;
                case 'brokerage':
                    routerHref = this.$router.resolve({name:'抽佣管理'})
                    break;
                case 'bonus':
                    routerHref = this.$router.resolve({name:'车主奖励'})
                    break;
                case 'daliang':
                    routerHref = this.$router.resolve({name:'订单达量'})
                    break;
                case 'sockpuppetSetting':
                    routerHref = this.$router.resolve({name:'推送设置'})
                    break;
                case 'shipperAnnouncement':
                    routerHref = this.$router.resolve({name:'发布公告'})
                    break;
                case 'driverAnnouncement':
                    routerHref = this.$router.resolve({name:'发布公告'})
                    break;
            }
            if(routerHref.href){
                window.open(routerHref.href, '_blank')
            }
        },
        close(){
            this.$emit('update:dialogFormVisible',false)
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @keyframes showUlAni{
    0%,10%{
        height: 0;
    }
    11%, 21%{
        height: 30px;
    }
    22%, 32%{
        height: 60px;
    }
    33%, 43%{
        height: 90px;
    }
    44%, 54%{
        height: 120px;
    }
    55%, 65%{
        height: 150px;
    }
    66%, 76%{
        height: 180px;
    }
    77%, 87%{
        height: 210px;
    }
    88%, 99%{
        height: 240px;
    }
    100%{
        height: 100%;
    }
    }

    .checkout{
        .el-dialog__body{
            position: relative;
            .box_top{
                .checkout_top{
                    height: 140px;
                    line-height: 24px;
                    padding: 45px 126px;
                    border: 1px solid #bcbcbc;
                    background-image: url('../../../assets/checkImg/bgo1.png');
                    background-repeat:no-repeat;
                    background-size:cover;
                    position: relative;
                    h6{
                        font-size: 30px;
                        color: #fff;
                        font-weight: 400;
                        .btn_qx{
                            padding: 4px 12px;
                            border:1px solid #fff;
                            background:#409EFF;
                            color:#fff;
                            margin-left:12px;
                        }
                        .btn_qx:hover{
                            background:#fff;
                            color:#409EFF;
                        }
                        .top_num{
                            color: red;
                            margin: 0 5px;
                        }
                    }
                    .wzlicon{
                        width: 40px;
                        height:45px;
                        background-image: url(../../../assets/checkImg/anquan.png);
                        font-size: 45px;
                        color: #fff;
                        position: absolute;
                        left: 62px;
                        top: 35px;
                    }
                }
            }
            .top_content{
                border:1px solid rgba(188, 188, 188, 1);
                height: 143px;
                background-image: url(../../../assets/checkImg/bgo1.png);
                background-repeat:no-repeat;
                background-position: center;
                background-size:cover;
                // background-size: 100%;
                padding: 45px 54px;
                box-sizing: border-box;
                h6{
                font-size: 22px;
                font-weight: normal;
                color: #ffffff;
                }
                .top_ts{
                margin-top:8px;
                font-size: 16px;
                font-weight: normal;
                color: #ffffff;
                .top_num{
                    color:#ff0000;
                    margin:0 5px;
                    font-weight: bold
                }
                }
            }

            .main_checker2{
                border:1px solid rgba(188, 188, 188, 1);
                // padding:10px 40px;
                h6{
                    height: 46px;
                    line-height: 46px;
                    font-size: 16px;
                    font-weight: normal;
                    border-bottom: 1px solid  rgba(188, 188, 188, 1);
                }
                p{
                    font-size:14px;
                    display: inline-block;
                }
                .el-icon-success{
                    color: rgb(0,204,0);
                    margin-right: 10px;
                }
                .el-icon-warning{
                    color:rgb(255,0,0); 
                    margin-right: 10px;
                }
                .company_content{
                    min-height: 320px;
                    margin-top:-11px;
                    .countNum{
                        color: red;
                    }
                    ul{
                    height: 0;
                    margin-top:25px;
                    overflow: hidden;
                    animation: showUlAni 1.2s linear  forwards;
                    animation-play-state: paused;
                    &.showani{
                        animation-play-state: running;
                    }
                    &.cancelAni{
                        animation-play-state: paused;
                    }

                    li{
                        // height: 50px;
                            line-height: 50px;
                            border-bottom:1px solid #ccc;
                            padding:0 60px;
                            .btn_qx{
                                padding: 3px 10px;
                                margin:14px 0;
                                font-size:14px;
                                width:75px;
                                float:right;
                            }
                            .btn_qx1{
                                width:75px;
                                padding: 3px 10px;
                                margin:14px 0;
                                font-size:14px;
                                float:right;
                                border:1px solid rgba(188, 188, 188, 1);
                                color:rgba(188, 188, 188, 1);
                                display: block;
                            }
                            :hover.btn_qx1{
                                border:1px solid #3e9ff1;   
                                background:#fff;
                                color:#3e9ff1;
                            }

                            :hover .is-disabled{
                                border:1px solid rgba(188, 188, 188, 1);
                                color:rgba(188, 188, 188, 1);
                                background-color: #ecf5ff;
                            }

                        }
                    }
                }
                .btn_content{
                    text-align: center;
                    margin: 20px 0;
                    .btn_kd{
                    width:110px;
                    font-size: 16px;
                    }
                    .btn_h{
                    width:110px;
                    font-size: 16px;
                    background-color:#ccc;
                    border:1px solid #ccc;
                    }
                }
            }
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss">

    .checkout .el-dialog__body .main_checker2 .company_content ul li p .countNum{
        color:red;
    }
    .checkout .el-dialog{
        min-width: 1300px;
    }

    .checkout .el-dialog .el-dialog__body {
        padding: 5px;
    }
</style>

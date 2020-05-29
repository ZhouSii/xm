<template>
    <div class="workInfo onlineCommonStyle">
        <div class="onlineTitle">
            <div class="onlineTitle_left">
                工 作 概 况
                <span class="fr" @click="checkTime('month')">{{newTime.month}} 月</span>
                <span class="fr" @click="checkTime('day')">{{newTime.day}} 日</span>
            </div>
        </div>
        <div class="onlineService_content">
            <div class="onlineService_content_left">
                <!-- <div class="onlineService_content_left_top onlineService_icon">
                    <img src="../../../assets/onlineService/dianhua_out.png" alt="">
                    <span>外呼总时长</span>
                    <span>00:00:00</span>
                </div> -->
                <div class="onlineService_content_left_bottom onlineService_icon">
                    <img src="../../../assets/onlineService/dianhua_in.png" alt="">
                    <span>呼入总时长</span>
                    <span>{{CallLogObj.time}}</span>
                </div>
            </div>
            <div class="onlineService_content_right">
                <ul>
                    <li>
                        呼入接通率 | {{CallLogObj.percentages}}
                        <div>
                            <span>接听（{{CallLogObj.call}}）</span>
                            <span>未接（{{CallLogObj.uncall}}）</span>
                        </div>
                    </li>
                    <!-- <li>
                        呼入接通率 | 90%
                        <div>
                            <span>接听（9）</span>
                            <span>未接（9）</span>
                        </div>
                    </li> -->
                    <li>
                        APP响应率 | {{appRes.percentages}}
                        <div>
                            <span>及时处理（{{appRes.dealCount}}）</span>
                            <span>60秒内未处理（{{appRes.unDealCount}}）</span>
                        </div>
                    </li>
                    <li>
                        公众号响应率 | 0%
                        <div>
                            <span>及时处理（0）</span>
                            <span>60秒内未处理（0）</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import { aflcCallLog,aflcAppRes } from '@/api/onlineService.js'

export default {
    name:'workInfo',
    data(){
        return {
            newTime:{},
            timeType:'day',
            CallLogObj:{},
            appRes:{},
        }
    },
    mounted(){
        this.getNowFormatDate();
        this.init();
    },
    methods:{
        init(){
            this.CallLog();
            this.WorkOrderDealController();
        },
         getNowFormatDate(){
           	var now = new Date();
			// 获取年份:0~11
			var year = now.getFullYear();
			// 获取月份
			var month = now.getMonth()+1;
			// 获取日
			var date = now.getDate();

			this.newTime = {
                day:date,
                month:month
            };

            console.log('this.newTime',this.newTime)
        },
        CallLog(){
            aflcCallLog(this.timeType).then(res => {
                this.CallLogObj = res.data;
            })
        },
        WorkOrderDealController(){
            aflcAppRes(this.timeType).then(res => {
                console.log('res',res)
                this.appRes = res.data;
            })
        },  
        checkTime(val){
            this.timeType = val;
            this.init();
        }
    },
}
</script>

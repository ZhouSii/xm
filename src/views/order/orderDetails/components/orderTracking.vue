<template>
    <div class="ordertrack clearfix">
        <!-- <div class="orderTrackTitle orderTrackStyle">
            <h2>时间</h2>
            <h2>操作人</h2>
            <h2>用户类型</h2>
            <h2>操作内容</h2>
            <h2>备注</h2>
            <h2>定位</h2>
        </div>
        <div class="orderTrackInfo orderTrackStyle" v-for="(item,key) in listInformation" :key="key">
            <p :class="{current: key == 0 ,cancel:key ==  (listInformation.length-1)}"><i></i><span>{{item.createTime | parseTime}}</span></p>
                <p>{{item.remark}}</p>
            <el-tooltip placement="top" effect="light">
                <div slot="content">{{item.address}}</div>
                <p>{{item.address}}</p>
            </el-tooltip>
            <el-tooltip placement="top" effect="light">
                <div slot="content">{{item.remark}}</div>
                <p>{{item.remark}}</p>
            </el-tooltip>
                <p>{{item.runException}}</p>
                <p>{{item.loadAndUnloadException}}</p>
        </div> -->
            <el-table
            :data="listInformation"
            height="100%"
            border
            style="width: 100%">
            <el-table-column
                prop="createTime"
                label="时间"
                width="200"
                >
                <template slot-scope="scope">
                    {{scope.row.createTime | parseTime}}
                </template>
            </el-table-column>
            <el-table-column
                prop="userName"
                label="操作人"
                width="200"
                :show-overflow-tooltip="true"
                >
            </el-table-column>
            <el-table-column
                prop="userTypeName"
                label="用户类型"
                width="200"
                :show-overflow-tooltip="true"
                >
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作内容"
                :show-overflow-tooltip="true"
                width="300">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="remark"
                label="备注">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="address"
                label="定位">
            </el-table-column>
        </el-table>
         <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>    
    </div>
</template>

<script>

import { orderDetailsList,getOrderFollowingFiles } from '@/api/order/ordermange'
import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'

export default {
    name: 'ordertrack',
    components:{
        Pager
    },
    props: {
       isvisible: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            totalCount:0,
            sizes:[30,50,100,200],
            OrderFollowingObj:{
                "currentPage": 1,
                "pageSize": 30,
                "vo": {
                    orderSerial:'',
                }
            },
            listInformation: []
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
            this.OrderFollowingObj.vo.orderSerial = this.$route.query.orderSerial;
            
            getOrderFollowingFiles(this.OrderFollowingObj).then(res => {
                this.listInformation = res.data.list.reverse();
                this.totalCount = res.data.totalCount;
                this.loading = false;
                this.listInformation.forEach(el => {
                    switch(el.userType){
                        case '0':
                            el.userTypeName = '货主';
                            break;
                        case '1':
                            el.userTypeName = '车主';
                            break;
                        case '2':
                            el.userTypeName = '系统';
                            break;
                        case '3':
                            el.userTypeName = '车主（特权车主）';
                            break;
                    }
                })
            })
        },
        handlePageChange(obj) {
            this.OrderFollowingObj.currentPage = obj.pageNum;
            this.OrderFollowingObj.pageSize = obj.pageSize;
            this.init();
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ordertrack{
        height: 100%;
        padding-bottom: 40px;
        // padding: 10px 20px;
        // .orderTrackStyle{
        //     p,h2{
        //         width: 200px;
        //         margin: 0;
        //         vertical-align: middle;
        //     }
        //     p:nth-child(6),p:nth-child(5),h2:nth-child(6),h2:nth-child(5){
        //         width: 300px;
        //         // margin: 0;
        //     }
        //     h2{
        //         display: inline-block;
        //         font-size: 16px;
        //         color: #666666;
        //         line-height: 20px;
        //     }
        //     p{
        //         display: inline-block;
        //         font-size: 14px;
        //         color: #333;
        //         line-height: 24px;
        //     }
        //     h2:first-child{
        //         padding-left:50px; 
        //     }
        //     .current{
        //         i{
        //             background: url("../../../../assets/zhishi2.png") no-repeat center !important;
        //         }
        //         span{
        //             background: url("../../../../assets/jiantou1.png") no-repeat !important;
        //             color: #ffffff !important;
        //         }
        //         &::before{
        //             background-color: #3e9ff1 !important;
        //         }
        //     }
        //     p:first-child{
        //         padding-left:26px; 
        //         position: relative;
        //         i{
        //             display: block;
        //             width: 18px;
        //             height: 18px;
        //             position: absolute;
        //             left: 0;
        //             top: 4px;
        //             background: url("../../../../assets/zhishi1.png") no-repeat center;
        //             background-size:100% 100%;
        //         }
        //         span{
        //             display: inline-block;
        //             line-height: 24px;
        //             vertical-align: middle;
        //             background:  #3e9ff1;
        //             color: #333;
        //             padding: 0 20px;
        //             background: url("../../../../assets/jiantou2.png") no-repeat;
        //             background-size:100% 100%;
        //         }
        //         &::before{
        //             content: '';
        //             position: absolute;
        //             top: 22px;
        //             left: 8px;
        //             width: 2px;
        //             height: 40px;
        //             background-color: #e2e2e2;
        //         }
        //     }
        //     .cancel{
        //         &::before{
        //             width: 0 !important;
        //         }
        //     }
          
        // }
        // .orderTrackInfo{
        //     margin: 15px 0;
        //     p+p{
        //         white-space:nowrap;
        //         text-overflow:ellipsis;
        //         overflow:hidden;
        //     }
        // }
    }
    
</style>

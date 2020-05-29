<template>
 <div class="identicalStyle sendlogistics" style="height:100%" >
<div class="classify_info">
<div class="info_news">
<el-table :data="tableDataTree" border height="100%" style="width: 100%">
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
             <el-table-column prop="" label="实际操作时间"></el-table-column>
             <el-table-column prop="" label="操作人"></el-table-column>
             <el-table-column prop="" label="操作人类型"></el-table-column>
             <el-table-column prop="" label="操作内容"></el-table-column>
             <el-table-column prop="" label="反馈给货主的操作时间"></el-table-column>
             <el-table-column prop="" label="货主前端显示提示内容"></el-table-column>
             <el-table-column prop="" label="物流公司端显示提示内容"></el-table-column>
</el-table>
  <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>    
</div>
</div>
</div>
</template>

<script>
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'
import {orderStatusFollow} from '@/api/order/logistics/logistics.js'
export default {
    data(){
        return{
            totalCount:0,
            page:1,
            pagesize:20,
            sizes:[20,30,50],
            tableData: [],
            tableDataTree:[],
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
        orderStatusFollow(this.$route.query.orderSerial).then(res=>{
            console.log(res)
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data;
                     this.tableDataTree.forEach(item => {
                        item.createTime = parseTime(item.createTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    })                    
        })
        },
        // 页码改变
        handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
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
    components:{
        Pager
    },
}
</script>

<style lang="scss">

</style>

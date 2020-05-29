<template>
        <div class="classify_info">
        <div class="btns_box">
        <el-button type="primary" size="mini" @click="handleEdit('register')" id="bigBtn">投诉登记</el-button>
        </div>
        <div class="info_news">
        <el-table :data="tableData" border row-key="id" :expand-row-keys="expands" @row-click="rowClick" style="width: 100%" @expand-change="changeExpand">
            <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table class="animated fadeInRight" :data="tableData1" border style="width: 100%">
                      <el-table-column prop="followName" label="跟进人" width="180">
                      </el-table-column>
                      <el-table-column prop="" label="跟进时间" width="180" show-overflow-tooltip>
                          <template  slot-scope="scope">
                            <span class="orderSerial">
                              {{ scope.row.followupTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
                            </span>
                          </template>
                      </el-table-column>
                      <el-table-column prop="goodsclaimDes" label="投诉跟进" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="name" label="是否处理完毕" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="fileAddress" label="附件" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <img :src='item.url' alt="" v-showPicture v-for="item in scope.row.imgArr" :key="item.name" style="width:100px" />
                            <el-button type="text" v-for="txtitem in scope.row.txtArr" :key="txtitem.name" @click="openTxt(txtitem.url)">{{txtitem.name}}</el-button>
                        </template>
                      </el-table-column>
                  </el-table>
                </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
             <el-table-column prop="complainStatusName" label="处理状态" width="150">
            </el-table-column>
            <el-table-column prop="complainTypeName" label="投诉分类" width="180" >
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="complainDes" label="投诉内容">
            </el-table-column>
            <el-table-column prop="" label="投诉发起人" width="200">
                <template slot-scope="scope">
                  {{scope.row.complainName ? scope.row.complainName + '-' : ''}}{{ scope.row.phone ? scope.row.phone : ''}}
                </template>
            </el-table-column>
             <el-table-column prop="reporterTypeName" label="发起人类型" width="120">
            </el-table-column>
            <el-table-column prop="complainTime" label="投诉时间" width="160">
               <template  slot-scope="scope">
                  <span class="orderSerial">
                    {{ scope.row.complainTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
                  </span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="300">
                 <template slot-scope="scope">
                    <el-button plain :type="scope.row.complainStatusName === '处理中' ? 'warning': 'primary'" v-if="scope.row.complainStatusName ==='待处理' || scope.row.complainStatusName === '处理中'"
                    size="mini"
                    @click="handleEdit1(scope.$index, scope.row)">{{scope.row.complainStatusName==='待处理' ? '确认受理': (scope.row.complainStatusName === '处理中' ? '记录投诉跟进': '')}}</el-button>
                    <el-button type="primary" size="mini" @click="registerEdit(scope.row)" id="bigBtn" v-if="scope.row.complainStatusName === '处理中'">修改投诉</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
        </div>
          <creaseRegister :paramsId = "paramsId" typetitle="投诉登记" :editType="type" :creaseRegister_add.sync = "creaseRegister_add" @getData="getSuccess"/>
          <followUpRegister :paramsId="paramsId" typetitle="记录投诉跟进" :followUpRegister_add.sync = "followUpRegister_add" @getData="getSuccess"/>
    </div>
</template>

<script>
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'
import { orderDetailsList } from '@/api/order/ordermange'
import { getGoodsfollowupAll } from '@/api/service/claim.js'
import { getListAppShipperComplainByOrderSerial, getUpdateDealStatus } from '@/api/service/dispose.js'
import creaseRegister from './creaseRegister'
import followUpRegister from './followUpRegister'
export default {
  name: 'pushOrderList',
  components: {
    Pager,
    creaseRegister,
    followUpRegister
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      creaseRegister_add:false,
      followUpRegister_add:false,
      totalCount: 0,
      page: 1,
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      expands: [],
      tableData: [],
      tableData1: [],
      belongCity: '',
      buttonText: '',
      selectRowData:[],
      paramsId:null,
      type:'add',
    }
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.firstblood()
        }
      },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  mounted() {
    this.getListSmall();
    // this.scrollFix()
  },
  methods: {
    init() {
      orderDetailsList(this.$route.query.orderSerial).then(res => {
        this.tableData = res.data.aflcOrderPushes
        this.expands.push(this.tableData[0].id)
        this.loading = false
      })
    },
    getSuccess() {
      this.firstblood()
      this.getListSmall()
    },
    firstblood() {
      // this.loading = false
      const orderSerial = this.$route.query.orderSerial
      getListAppShipperComplainByOrderSerial(orderSerial).then(res => {
        this.tableData = res.data
        this.totalCount = res.data.totalCount
      })
    },
    // 滚动条
    scrollFix() {
      window.onscroll = function() {
        // console.log(document.getElementsByClassName('el-tabs__content'), document.getElementById('bigBtn'))
        const topscroll = document.body.scrollTop
        const bigBtn = document.getElementById('bigBtn')
        if (topscroll > 800) {
          bigBtn.style.position = 'fixed'
          bigBtn.style.right = '0'
          bigBtn.style.zIndex = '9999'
        } else {
          bigBtn.style.position = 'static'
        }
      }
    },
    getListSmall() {
    this.tableData1 = []
    if(this.rowid){
        getGoodsfollowupAll(this.rowid).then(res => {
          this.tableData1 = res.data
          this.tableData1.forEach((e, index) => {
            let arr = []
            let imgArr = []
            let txtArr = []
            if(e.fileAddress){
            arr = e.fileAddress.split(',')
            arr.forEach((el, elindex) => {
              const name = el.lastIndexOf('/')
              let nameExtension = ''
              if (name > -1) {
                nameExtension = el.substring(name + 1)
              }
              const i = nameExtension.lastIndexOf('.')
              let extension = ''
              if (i > -1) {
                extension = nameExtension.substring(i + 1)
              }
              if (extension === 'txt') {
                txtArr.push({
                  url: el,
                  name: nameExtension
                })
              } else {
                imgArr.push({
                  url: el,
                  name: nameExtension
                })
              }
            })
            this.$set(e, 'txtArr', txtArr)
            this.$set(e, 'imgArr', imgArr)
            arr = []
            imgArr = []
            txtArr = []
            }
          })
        })
    }
    },
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.init()
    },
    handleEdit(type){
    switch(type){
      case 'register':
      this.creaseRegister_add = true
      this.type = 'add'
      break;
    }
    },
    handleEdit1(index, row) {
      if (row.complainStatusName === '待处理') {
        getUpdateDealStatus(row.id).then(res => {
          this.firstblood()
          this.$message({
            message: '受理成功~',
            type: 'success'
          })
        })
      } else {
        this.paramsId = row.id
        this.followUpRegister_add = true;
      }
    },
    registerEdit(i){
      this.paramsId = i.id
      this.type = 'edit'
      this.creaseRegister_add = true;
    },
    openTxt(url) {
      window.open(url)
    },
    changeExpand(i,j){
        if (i.id === this.rowid && this.expands.length > 0) {
          this.expands = []
        } else if (i.id !== this.rowid && this.expands.length > 0 || this.expands.length === 0) {
          this.rowid = i.id
          this.getListSmall()
          this.$nextTick(() => {
            this.expands = []
            this.expands.push(i.id)
          })
        }
    },
    rowClick(row, event, column) {
      if (row.id === this.rowid && this.expands.length > 0) {
        this.expands = []
      } else if (row.id !== this.rowid && this.expands.length > 0 || this.expands.length === 0) {
        this.rowid = row.id
        this.getListSmall()
        this.$nextTick(() => {
          this.expands = []
          this.expands.push(row.id)
        })
      }
      // else {
      //   this.rowid = row.id
      //   this.getListSmall()
      //   console.log('expands', this.expands)
      //   this.$nextTick(() => {
      //     this.expands.push(row.id)
      //   })
      // }

      // Array.prototype.remove = function(val) {
      //   const index = this.indexOf(val)
      //   if (index > -1) {
      //     this.splice(index, 1)
      //   }
      // }
      // if (this.expands.indexOf(row.id) < 0) {
      //   this.expands.push(row.id)
      // } else {
      //   this.expands.remove(row.id)
      // }
    }

  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
  .physicalDamage{
    img{
      display:block;
      width:100px;
      float:left;
      margin-right:5px;
    }
    .el-table{
        .el-table__expanded-cell{
            .el-table__header-wrapper{
                th{
                    background-color: #fff;
                }
            }
        }
    }
  }
.animated {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}

</style>

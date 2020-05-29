<template>
  <div class="identicalStyle Marketing" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="推荐栏目">
        <!--<el-input clearable v-model="searchQuery.recommendColumn"></el-input>-->
        <el-select v-model="searchQuery.recommendColumn">
          <el-option v-for="item in recommendColumnFn"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">

          </el-option>
          <!--<el-option label="物流专线栏目" :value="物流专线栏目"></el-option>-->
          <!--<el-option label="专线详情页" :value="专线详情页"></el-option>-->
          <!--<el-option label="全部" value=""></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item class="btnChoose fr">
        <el-button type="primary" size="mini" plain @click="handleSearch('searchForm')" icon="el-icon-search">搜索
        </el-button>
        <el-button type="info" size="mini" plain @click="handleSearch('clearForm1')"
                   icon="fontFamily aflc-icon-qingkong">清空
        </el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button
          type="info" plain icon=""
          size="small"
          @click="handleSearch('set')">
          <span>设置</span>
        </el-button>
      </div>
      <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection"
                @row-click="clickDetails" highlight-current-row :data="dataset" tooltip-effect="dark">
        <el-table-column fixed sortable type="selection" width="50"></el-table-column>
        <el-table-column fixed label="序号" sortable width="80">
          <template slot-scope="scope">
            {{ (page - 1)*pagesize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column sortable prop="recommendColumn" label="推荐栏目" width="">
        </el-table-column>
        <el-table-column sortable prop="recommendPosition" label="推荐位置" width="">
        </el-table-column>
        <el-table-column sortable prop="" label="推荐条数限制" width="">
          <template slot-scope="scope">
            {{scope.row.recommendLimitType===1?scope.row.recommendLimit:'无限制'}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="updateTime" label="更新时间" width="">
        </el-table-column>
      </el-table>
    </div>
    <RecSetting :isVisibleDialog.sync="isVisibleDialog" :info="selectedInfo" @success='fetchInfo'
                @close="closeVisibleDialog"></RecSetting>
    <div class="info_tab_footer">共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes"/>
      </div>
    </div>
  </div>
</template>
<script>
  // recFetch
  import {postList} from '@/api/web/recFetch'
  import Pager from '@/components/Pagination/index'
  import RecSetting from './recSetting'

  export default {
    components: {
      Pager,
      RecSetting
    },
    data() {
      return {
        recommendColumnFn: [
          {
            value: '首页',
            label: '首页'
          },
          {
            value: '物流专线栏目',
            label: '物流专线栏目'
          },
          {
            value: '专线详情页',
            label: '专线详情页'
          },
          {
            value: '',
            label: '全部'
          }],
        isVisibleDialog: false,
        loading: true,
        searchQuery: {
          recommendColumn: ''
        },
        selected: [],
        dataset: [],
        selectedInfo: {},
        sizes: [20, 50, 100, 400],
        pagesize: 20, // 初始化加载数量
        page: 1, // 初始化页码
        totalCount: null,
        dataTotal: 0,
      }
    },
    mounted() {
      this.fetchInfo()

    },
    methods: {
      fetchList() {
        this.loading = true
        postList(this.page, this.pagesize, this.searchQuery).then(res => {
          this.dataset = res.data.list
          this.dataTotal = res.data.total;
          this.loading = false
        }).catch(err => {
          this.$message.warning(err.text ? err.text : err.errorInfo)
          this.loading = true
        })
      },
      fetchInfo() {
        this.fetchList()
      },
      handleDeatail() {

      },

      handleSearch(type) {
        if (!this.selected.length && type !== 'searchForm' && type !== 'clearForm1') {
          this.$message.info('请选择要操作的项~')
          return false
        }
        switch (type) {
          case 'searchForm':
            this.fetchInfo()
            break
          case 'clearForm1':
            this.searchQuery.recommendColumn = ''
            this.fetchList()
            break
          case 'set':
            if (this.selected.length > 1) {
              this.$message.info('每次只能操作单条数据~')
              this.$refs.multipleTable.clearSelection()
              return false
            }
            this.isVisibleDialog = true
            this.selectedInfo = this.selected[0]
            break
        }
        this.$refs.multipleTable.clearSelection()
      },
      getSelection(selected) {
        this.selected = selected
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      handlePageChange(obj) {
        this.page = obj.pageNum
        this.pagesize = obj.pageSize
        // this.firstblood()
      },
      closeVisibleDialog() {
        this.isVisibleDialog = false
      }
    }
  }
</script>
<style lang="scss">
  .lll-rec {

  }
</style>

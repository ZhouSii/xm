<template>
  <div>
    <div class="shipper_searchinfo">
      <label>所在地：
        <el-cascader
          :options="options"
          v-model="formAll.selectedOptions6"
          @change="handleChange">
        </el-cascader>
      </label>
      <label>状态：
        <el-select v-model="formAll.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </label>
      <label>公司名称:
        <el-input v-model="formAll.companyName"></el-input>
      </label>
      <label>手机号码：
        <el-input v-model="formAll.phone"></el-input>
      </label>
      <el-button type="primary" plain>查询</el-button>
      <el-button type="info" plain>清空</el-button>
    </div>
    <div class="export">
      <el-button type="primary" @click="addClassfy">新增</el-button>
    </div>
    <div class="info_news">
      <el-table
      ref="mutipleTable"
      :data="tableDataAll"
      stripe
      border
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column prop='id' label="序号">
      </el-table-column>  
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column prop="company" label="公司名称">
      </el-table-column>
      <el-table-column prop="name" label="联系人">
      </el-table-column>
      <el-table-column prop="phone" label="注册来源">
      </el-table-column>
      <el-table-column prop="status" label="状态">
      </el-table-column>
      <el-table-column prop="home" label="所在地">
      </el-table-column>
      <el-table-column prop="type" label="货主类型">
      </el-table-column>
      <el-table-column prop="date" label="注册日期">
      </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            options:[],
             fileList1: [
                {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
             ],
            formAll:{
              selectedOptions6: '',
              value:'',
              companyname:'',
              phone:''
            },
            page:1,
            pagesize:20,
            total:null,
            currentPage4:1,
            tableDataAll:[],
        }
    },
    methods:{
         handleSizeChange(val) {
           console.log(`每页 ${val} 条`);
         },
         handleCurrentChange(val) {
           console.log(`当前页: ${val}`);
         },
    }
}
</script>


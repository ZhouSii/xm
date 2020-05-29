<template>
  <div class="boutiqueLineAdd commoncss">
    <el-dialog
      :title="formtitle"
      :close-on-click-modal="false"
      @open="reviseForms"
      v-el-drag-dialog
      width="90%"
      top="5vh"
      :visible="dialogFormVisible"
      @close="close"
    >
      <el-row>
        <el-col :span="11">
          <h2>待选池</h2>
          <el-form
            :inline="true"
            :model="listSystemObj1"
            ref="ruleForm"
            class="demo-ruleForm"
            size="mini"
          >
            <el-form-item label="公司名称" prop="companyName">
              <el-input
                v-model="listSystemObj1.companyName"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="始发地" prop="startAreaCode">
              <getCityList
                @returnStr="
                  val => {
                    getStr('start', val);
                  }
                "
                :isArea="true"
                v-model="listSystemObj1.startAreaCode"
                ref="startCity"
              ></getCityList>
            </el-form-item>
            <el-form-item label="目的地" prop="endAreaCode">
              <getCityList
                @returnStr="
                  val => {
                    getStr('end', val);
                  }
                "
                :isArea="true"
                v-model="listSystemObj1.endAreaCode"
                ref="endCityea"
              ></getCityList>
            </el-form-item>
            <el-form-item class="fr">
              <el-button
                type="primary"
                :size="btnsize"
                plain
                @click="handleSearch('searchLeft')"
                >查询</el-button
              >
              <el-button
                type="info"
                :size="btnsize"
                plain
                @click="handleSearch('clearLeft')"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
          <el-table
            ref="multipleTableLeft"
            :data="waitTableData"
            stripe
            border
            align="center"
            height="600px"
            @selection-change="getinfomationLeft"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column
              sortable
              label="公司名称"
              prop="companyName"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              sortable
              label="始发地"
              prop="agencyArea"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              sortable
              label="目的地"
              :show-overflow-tooltip="true"
              prop="totalEndArea"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="biggerGoods"
              :show-overflow-tooltip="true"
              label="重货报价"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="smallGoods"
              :show-overflow-tooltip="true"
              label="轻货报价"
            >
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="2">
          <div class="arrowIconDiv clearfix">
            <i
              class="el-icon-arrow-right arrowIcon"
              title="添加"
              @click="arrowClick('right')"
            ></i>
            <i
              class="el-icon-arrow-left arrowIcon"
              title="移除"
              @click="arrowClick('left')"
            ></i>
          </div>
        </el-col>
        <el-col :span="11">
          <h2>精品线路池</h2>
          <el-form
            :inline="true"
            :model="listSystemObj2"
            ref="ruleForm"
            class="demo-ruleForm"
            size="mini"
          >
            <div style="height:29px"></div>
            <!-- <el-form-item label="公司名称" prop="rewardCity">
                    <el-input v-model="listSystemObj2.rewardCity" clearable></el-input>
                </el-form-item>
                <el-form-item label="始发地" prop="serviceClassifyCode">
                    <el-input v-model="listSystemObj2.rewardCity" clearable></el-input>
                </el-form-item>
                <el-form-item label="目的地" prop="rewardTypeCode">
                    <el-input v-model="listSystemObj2.rewardCity" clearable></el-input>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')">查询</el-button>
                    <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')">重置</el-button>
                </el-form-item> -->
          </el-form>
          <el-table
            ref="multipleTableRight"
            :data="boutiqueTableData"
            stripe
            border
            align="center"
            height="600px"
            @selection-change="getinfomationRight"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column
              sortable
              label="公司名称"
              prop="companyName"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              sortable
              label="始发地"
              prop="agencyArea"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              sortable
              label="目的地"
              :show-overflow-tooltip="true"
              prop="totalEndArea"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="biggerGoods"
              :show-overflow-tooltip="true"
              label="重货报价"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="smallGoods"
              :show-overflow-tooltip="true"
              label="轻货报价"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          plain
          icon="el-icon-success"
          @click="submitForm('ruleForm')"
          :disabled="btnShow"
          >保 存</el-button
        >
        <el-button type="primary" plain icon="el-icon-error" @click="close"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { objectMerge2 } from '@/utils/'
import { REGEX } from '@/utils/validate'
import {
  boutiqueLineList,
  submitBoutiqueLine
} from '@/api/marketing/boutiqueLine'
import getCityList from '@/components/GetCityList/chinaMap1'

export default {
  name: 'boutiqueLineAdd',
  props: {
    dialogFormVisible: {
      type: Boolean,
      required: true
    },
    formtitle: {
      type: String,
      required: false,
      default: '新增精品线路'
    },
    isModify: {
      type: Boolean,
      default: false
    },
    changeForm: {
      type: Object
    }
  },
  components: {
    getCityList
  },
  data() {
    return {
      btnShow: false,
      dialogVisible: false,
      btnsize: 'mini',
      //   waitForm: {},
      //   boutiqueForm: {},
      waitTableData: [],
      boutiqueTableData: [],
      currentPage: 1,
      pageSize: 9999,
      listSystemObj1: {
        companyName: '', // 公司名称
        endAreaCode: '', // 目的地编码
        excellentFlag: '0', // 是否精品线路(1:是，0:否)
        startAreaCode: '' // startAreaCode
      },
      listSystemObj2: {
        companyName: '', // 公司名称
        endAreaCode: '', // 目的地编码
        excellentFlag: '1', // 是否精品线路(1:是，0:否)
        startAreaCode: '' // startAreaCode
      },
      cacheLeft: [],
      cacheLeftData: [],
      cacheRight: [],
      cacheRightData: []
    }
  },
  mounted() {},
  methods: {
    reviseForms() {
      this.$nextTick(() => {
        Promise.all([
          //   this.candidateFunc(),
          this.boutiqueFunc()
        ]).then(resArr => {
          this.waitTableData = []
        })
      })
    },
    candidateFunc() {
      boutiqueLineList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        vo: this.listSystemObj1
      }).then(res => {
        this.waitTableData =
          this.cacheLeftData.length > 0
            ? res.data.list.concat(this.cacheLeftData)
            : res.data.list
            this.waitTableData.forEach(el => {
            if (!!el.bigList) {
              let biggerGoodsText = [];
              el.bigList.forEach(element => {
                biggerGoodsText.push(element.goods);
              });
              this.$set(el, "biggerGoods", biggerGoodsText.join(","));
            }
            if (!!el.smallList) {
              let smallGoodsText = [];
              el.smallList.forEach(element => {
                smallGoodsText.push(element.goods);
              });
              this.$set(el, "smallGoods", smallGoodsText.join(","));
            }
          });
      })
    },
    boutiqueFunc() {
      boutiqueLineList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        vo: this.listSystemObj2
      }).then(res => {
        this.boutiqueTableData = res.data.list;
           this.boutiqueTableData.forEach(el => {
            if (!!el.bigList) {
              let biggerGoodsText = [];
              el.bigList.forEach(element => {
                biggerGoodsText.push(element.goods);
              });
              this.$set(el, "biggerGoods", biggerGoodsText.join(","));
            }
            if (!!el.smallList) {
              let smallGoodsText = [];
              el.smallList.forEach(element => {
                smallGoodsText.push(element.goods);
              });
              this.$set(el, "smallGoods", smallGoodsText.join(","));
            }
          });
      })
    },
    getStr(type, d) {
      //   console.log(d);
      if (type === 'start') {
        this.listSystemObj1.startAreaCode = d.area.code
      } else {
        this.listSystemObj1.endAreaCode = d.area.code
      }
    },
    handleSearch(type) {
      switch (type) {
        case 'searchLeft':
          this.candidateFunc()
          break
        case 'clearLeft':
          // console.log(this.$options.data())
          this.listSystemObj1 = this.$options.data().listSystemObj1
          this.$refs.startCity.clearData()
          this.$refs.endCityea.clearData()
          break
      }
    },
    getinfomationLeft(selection) {
      this.cacheLeft = selection
    },
    getinfomationRight(selection) {
      this.cacheRight = selection
    },
    getCacheArr(baseArr, Arr) {
      //   console.log("111", baseArr);
      //   console.log("222", Arr);
      //   let cesheArr = JSON.parse(JSON.stringify(baseArr));
      //   let aa = JSON.parse(JSON.stringify(Arr));
      //   for (let i = 0; i < cesheArr.length; i++) {
      //     for (let j = 0; j < aa.length; j++) {
      //       if (cesheArr[i] && cesheArr[i].id && aa[j].id) {
      //         if (cesheArr[i].id == aa[j].id) {
      //           cesheArr.splice(i, 1);
      //           aa.splice(j, 1);
      //           i--;
      //         } else {
      //           break;
      //         }
      //       }
      //     }
      //   }
      const arr2Id = [] // 标记选中项的id
      Arr.map(item => {
        arr2Id.push(item.id)
      })
      const result = baseArr.filter(item => {
        return arr2Id.indexOf(item.id) === -1
      })

      //   console.log("cesheArr", cesheArr,result);
      return result
    },
    getArr(ifSatisfy = true, mes) {
      return new Promise((reslove, reject) => {
        for (let i = 0; i < this.cacheLeft.length; i++) {
          if (mes) {
            break
          } else {
            for (let j = 0; j < this.boutiqueTableData.length; j++) {
              if (
                this.cacheLeft[i].agencyId ===
                  this.boutiqueTableData[j].agencyId &&
                this.cacheLeft[i].endCity === this.boutiqueTableData[j].endCity
              ) {
                // console.log(
                //   "el.agencyId === item.agencyId",
                //   this.cacheLeft[i].agencyId ===
                //     this.boutiqueTableData[j].agencyId
                // );
                // console.log(
                //   "el.endCity === item.endCity",
                //   this.cacheLeft[i].endCity ===
                //     this.boutiqueTableData[j].endCity
                // );
                // console.log("el.endCity", this.cacheLeft[i].endCity);
                // console.log("item.endCity", this.boutiqueTableData[j].endCity);
                ifSatisfy = false
                mes = `${this.boutiqueTableData[j].companyName}专线、${this.boutiqueTableData[j].endCity}存在一条线路、不能再次添加`
                break
              } else {
                ifSatisfy = true
              }
            }
          }
        }
        reslove({ status: ifSatisfy || '', message: mes || '' })
      })
    },
    arrowClick(type) {
      // console.log('type:',type)
      switch (type) {
        case 'right':
          if (this.cacheLeft.length > 0) {
            let ifSatisfy
            this.getArr().then(res => {
              //   console.log(res);
              if (res.status) {
                this.boutiqueTableData = this.boutiqueTableData.concat(
                  this.cacheLeft
                )
                this.waitTableData = this.getCacheArr(
                  this.waitTableData,
                  this.cacheLeft
                )
              } else {
                if (res.message) {
                  this.$message.warning(res.message)
                }
              }
            })
          }
          break
        case 'left':
          if (this.cacheRight.length > 0) {
            this.waitTableData = this.waitTableData.concat(this.cacheRight)
            this.cacheLeftData = this.cacheRight
            this.boutiqueTableData = this.getCacheArr(
              this.boutiqueTableData,
              this.cacheRight
            )
          }
          break
      }
    },
    close() {
      if (this.dialogFormVisible) {
        this.$emit('update:dialogFormVisible', false)
        this.listSystemObj1 = this.$options.data().listSystemObj1
        this.$refs.startCity.clearData()
        this.$refs.endCityea.clearData()
        this.$emit('renovate')
      }
    },
    // 初始化选择项数据
    init() {},
    submitForm(formName) {
      submitBoutiqueLine(this.boutiqueTableData)
        .then(res => {
          this.$message({
            type: 'success',
            message: this.formtitle + '成功！'
          })
          this.close()
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message:
              '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
          })
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.boutiqueLineAdd {
  .el-dialog .el-dialog__body .el-table {
    margin-bottom: 0;
  }
  h2 {
    border-bottom: solid 1px #e0e0e0;
    line-height: 25px;
    font-size: 18px;
    padding: 0px 0 5px 0;
    color: #333333;
    font-weight: 300;
    font-stretch: normal;
    margin-bottom: 5px;
    text-align: center;
  }
  .el-form-item--mini {
    margin: 0;
  }
  .arrowIconDiv {
    width: 100%;
    position: relative;
    height: 1px;
    .arrowIcon {
      position: absolute;
      font-size: 65px;
      left: 50%;
      transform: translate(-50%);
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: #5cb6ff;
      }
    }
    .el-icon-arrow-right {
      top: 200px;
    }
    .el-icon-arrow-left {
      top: 400px;
    }
  }
}
</style>

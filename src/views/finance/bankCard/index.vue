<template>
  <div class="dingdanxiangqing tabsWrap">
    <el-tabs v-model="orderTabName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in TabStatus"
        :key="item.name"
        :label="item.type"
        :name="item.name"
        v-if="$_has_permission(item.code)"
      >
        <CardList :isvisible="orderTabName==item.name" :TabName="item.name" :key="dataKeys"></CardList>
        <span slot="label" v-if="item.name=='peddingCard'">
          待验证卡号(
          <span style="color:red;">{{peddingNum}}</span> )
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CardList from "./CardList";
import { aflcBankCardList } from "@/api/finance/bankCard.js";
export default {
  name: "bankCard",
  components: {
    CardList
  },
  data() {
    return {
      orderTabName: "totalCard",
      orderType: "",
      peddingNum: 0,
      dataKeys: "",
      TabStatus: [
        {
          type: "全部",
          name: "totalCard",
          code: "FINANCE_BANKCARD_MANAGE_ALL"
        },
        {
          type: "待验证卡号",
          name: "peddingCard",
          code: "FINANCE_BANKCARD_MANAGE_PROCESS_CARD"
        }
      ]
    };
  },
  computed: {},
  mounted() {
    this.peddingPage();
  },
  methods: {
    handleClick(tab, event) {
      this.orderTabName = tab.name;
      this.dataKeys = Math.random();
    },
    peddingPage() {
      aflcBankCardList(1, 20, { isCardHolder: "AF0130601" }).then(res => {
        this.peddingNum = res.data.totalCount;
      });
    }
  },
  activated() {
    this.orderTabName = sessionStorage.getItem("bankCardTypeName");
  },
  beforeUpdate() {
    sessionStorage.setItem("bankCardTypeName", this.orderTabName);
  },
  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("bankCardTypeName", "totalCard");
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>
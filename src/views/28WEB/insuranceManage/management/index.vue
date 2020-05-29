<template>
  <div class="insurance-lll">
    <div class="inul">
      <ul>
        <li v-for="(tab,index) in tabs" @click="toggle(index,tab.view)" :class="{active:active==index}" :key="index">
          {{tab.label+'('+tab.num+')'}}
        </li>
      </ul>
    </div>
    <component :is="currentView" :listtype="currentView"></component>
  </div>
</template>

<script>
  import all from './administration'
  import payFor from './administration'
  import isPayfor from './administration'
  import * as apiInst from '@/api/web/insurance'
  export default {
    data() {
      return {
        active: 0,
        currentView: 'all',
        tabs: [
          {
            label: '全部投保单',
            num: '0',
            type: 'all',
            view: 'all'
          },
          {
            label: '待支付投保单',
            num: '0',
            type: 'payFor',
            view: 'payFor'
          },
          {
            label: '已支付投保单',
            num: '0',
            type: 'isPayfor',
            view: 'isPayfor'
          }
        ]
      }
    },
    components: {
      all,
      payFor,
      isPayfor,
    },
    watch: {},
    mounted() {
      this.eventBus.$on('updateListCount', () => {
        // this.getCount()
      })
    },
    created() {
      this.getCount()
    },

    methods: {
      toggle(i, v) {
        this.active = i;
        this.currentView = v;
      },
      getCount() {
        apiInst.postInsuranceNum().then((data,index) => {
          this.tabs[0].num = data.data.totalCount > 99 ? '99+' : data.data.totalCount
          this.tabs[1].num = data.data.notPaymentCount > 99 ? '99+' : data.data.notPaymentCount
          this.tabs[2].num = data.data.paymentCount > 99 ? '99+' : data.data.paymentCount

        })
      }
    }
  }
</script>
<style lang="scss">
  .insurance-lll {
    padding-top: 12px;
    /*height: 100%;*/
    /*position: relative;*/
    /*padding-right: 10px;*/
    .inul {
      display: flex;
      border-bottom: 1px solid #03a9f4;
      padding-left: 10px;
      ul {
        overflow: hidden;
        margin-bottom: -1px;
        position: relative;

      }
      ul li {
        padding: 0 20px;
        height: 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        position: relative;
        border: 1px solid #d2d2d2;
        border-top-width: 2px;
        border-radius: 4px 4px 0px 0px;
        border-bottom: 0 none;
        height: 30px;
        line-height: 30px;
      }
      ul li.active {
        font-weight: bold;
        border-color: #03a9f4;
        background: #ffffff;
        border-bottom-color: #ffffff;
        color: #409EFF;
      }
    }

  }
</style>


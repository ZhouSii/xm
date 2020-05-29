<template>
  <div class="detail-lll" v-loading="loading">
    <div class="detail">
      <div class="classul">
        <ul>
          <li>
            <span>{{form.insuranceName}}</span>
            <span>保险单</span>
            <span>投保日期：{{form.createTime}}</span>
          </li>
          <br>
          <li>
            <span>投保单号：{{form.insuranceNum}}</span>
            <span>保险金额：<i style="color:red;font-style: normal">{{form.insuranceFee}}</i> 元</span>
            <span>{{form.paymentState===0?'待支付':'已支付'}}</span>
            <span v-if="form.paymentState===1">支付时间：{{form.paymentTime}}</span>
          </li>
        </ul>
      </div>
      <div class="title-class">
        <h4>投保人信息</h4>
      </div>
      <table class="detail-top">
        <tr>
          <th style="width: 33%">类型</th>
          <th style="width: 33%">投保人</th>
          <th style="width: 33%">证件号</th>
        </tr>
        <tr>
          <td>{{form.policyHolderType}}</td>
          <td>{{form.policyHolderName}}</td>
          <td>{{form.policyHolderNum}}</td>
        </tr>
      </table>
      <div class="title-class" style="margin-top: 15px;">
        <h4>被保人信息</h4>
      </div>
      <table class="detail-top">
        <tr>
          <th style="width: 33%">类型</th>
          <th style="width: 33%">投保人</th>
          <th style="width: 33%">证件号</th>
        </tr>
        <tr>
          <td>{{form.theInsuredType}}</td>
          <td>{{form.theInsuredName}}</td>
          <td>{{form.theInsuredNum}}</td>
        </tr>
      </table>
      <div class="title-class" style="margin-top: 15px;">
        <h4>货物信息</h4>
      </div>
      <table class="detail-botton">
        <tr>
          <th width="16%" style="background-color: rgb(249,249,249);text-align: right;font-weight: normal">货物类型</th>
          <th style="font-weight: normal;text-align: left">{{form.goodsType}}</th>
          <!--<th>证件号</th>-->
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">货物名称</td>
          <td style="text-align: left">{{form.goodsName}}</td>
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">货物包装</td>
          <td style="text-align: left">{{form.goodsPack}}</td>
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">货物数量</td>
          <td style="text-align: left">{{form.goodsNumber}}</td>
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">货物价值</td>
          <td style="text-align: left">{{form.goodsValue}}元</td>
        </tr>
      </table>

      <div class="title-class" style="margin-top: 15px;">
        <h4>运输信息</h4>
      </div>
      <table class="detail-top">
        <tr>
          <th width="16%" style="background-color: rgb(249,249,249);text-align: right;font-weight: normal">起运地</th>
          <th width="34%" style="background-color: white;text-align: left;font-weight: normal">
            {{form.startProvince+form.startCity}}
          </th>
          <th width="16%" style="background-color: rgb(249,249,249);text-align: right;font-weight: normal">起运日期</th>
          <th width="34%" style="background-color: white;text-align: left;font-weight: normal">{{form.startTime}}</th>
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">目的地</td>
          <td style="background-color: white;text-align: left;font-weight: normal">{{form.endProvince+form.endCity}}
          </td>
          <td style="background-color: rgb(249,249,249);text-align: right">车牌号</td>
          <td style="background-color: white;text-align: left;font-weight: normal">{{form.carNum}}</td>
        </tr>
        <tr>
          <td style="background-color: rgb(249,249,249);text-align: right">中转地</td>
          <td style="background-color: white;text-align: left;font-weight: normal"> {{form.transferCitys}}</td>
          <td style="background-color: rgb(249,249,249);text-align: right">运单号</td>
          <td style="background-color: white;text-align: left;font-weight: normal">{{form.orderNum}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import * as apiInsu from '@/api/web/insurance'

  export default {
    name: "detail",
    data() {
      return {
        loading:false,
        form: {}
      }
    },
    mounted() {
      this.fetchDetail()
    },
    methods: {
      fetchDetail() {
        this.loading = true
        apiInsu.getInsuranceDetail(this.$route.query.id).then(data => {
          this.comData(data.data)
          this.loading = false
        })
      },
      comData(data) {
        this.$set(this.form, 'insuranceName', data.insuranceName)
        this.$set(this.form, 'createTime', data.createTime)
        this.$set(this.form, 'insuranceNum', data.insuranceNum)
        this.$set(this.form, 'insuranceFee', data.insuranceFee ? data.insuranceFee : '0.00')
        this.$set(this.form, 'paymentState', data.paymentState)
        this.$set(this.form, 'paymentTime', data.paymentTime)
        this.$set(this.form, 'policyHolderType', data.policyHolderType === 0 ? '个人' : '团队')
        this.$set(this.form, 'policyHolderName', data.policyHolderName)
        this.$set(this.form, 'policyHolderNum', data.policyHolderNum)
        this.$set(this.form, 'theInsuredType', data.theInsuredType === 0 ? '个人' : '团队')
        this.$set(this.form, 'theInsuredName', data.theInsuredName)
        this.$set(this.form, 'theInsuredNum', data.theInsuredNum)
        this.$set(this.form, 'goodsType', data.goodsType)
        this.$set(this.form, 'goodsName', data.goodsName)
        this.$set(this.form, 'goodsPack', data.goodsPack)
        this.$set(this.form, 'goodsNumber', data.goodsNumber)
        this.$set(this.form, 'goodsValue', data.goodsValue ? data.goodsValue : '0.00')
        this.$set(this.form, 'startProvince', data.startProvince)
        this.$set(this.form, 'startCity', data.startCity)
        this.$set(this.form, 'startTime', data.startTime)
        this.$set(this.form, 'endProvince', data.endProvince)
        this.$set(this.form, 'endCity', data.endCity)
        this.$set(this.form, 'carNum', data.carNum)
        this.$set(this.form, 'orderNum', data.orderNum)
        this.$set(this.form, 'transferCitys', data.transferCitys ? data.transferCitys : '无')
      }
    }
  }
</script>



<style lang="scss">
  .detail-lll {
    /*height: 100%;*/
    /*padding: 10px;*/
    .detail {
      padding: 20px 50px 0px 50px;
      padding-bottom: 0;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      /*border: 2px solid #ccc;*/
      height: 100%;
      width: 100%;
      .classul {
        margin-bottom: 20px;
        ul {
          border: 1px solid #ccc;
          li:first-of-type {
            background: rgb(254, 254, 250);
            border-bottom: 1px solid #ccc;
            padding: 10px;
            span:first-of-type {
              font-weight: 600;
              font-size: 16px;
              padding-left: 10px;
            }
            span:nth-of-type(2) {
              padding-left: 10px;
            }
            span:last-of-type {
              float: right;
            }
            /*float: left;*/
          }
          li:last-of-type {
            padding: 0 0 10px 10px;
            font-size: 15px;
            margin-top: -8px;
            span:first-of-type {
              padding-left: 10px;
            }
            span:nth-of-type(2) {
              padding-left: 30px;
            }
            span:nth-of-type(3) {
              padding-left: 20px;
              color: #409eff;
            }
            span:last-of-type {
              padding-left: 30px;
              /*float: right;*/
            }
            /*float: left;*/
          }
        }
      }

      .title-class {
        border-bottom: 1px solid rgb(22, 155, 213);
        padding-bottom: 10px;
        padding-left: 15px;
      }
      table th, table td {
        font-size: 14px;
        padding: 8px;
        border: 1px solid #ccc;
      }
      /* gridtable */
      table.detail-top {
        margin-top: 15px;
        font-family: verdana, arial, sans-serif;
        color: #333333;
        border-collapse: collapse;
      }
      table.detail-top th {
        background-color: rgb(232, 235, 238);
      }
      table.detail-top td {
        background-color: #ffffff;
      }
      table.detail-botton {
        margin-top: 15px;
        font-family: verdana, arial, sans-serif;
        color: #333333;
        border-collapse: collapse;
      }
      table.detail-botton th {

        /*background-color: rgb(232, 235, 238) ;*/
      }
      table.detail-botton td {
        padding: 12px;
        background-color: #ffffff;
      }
    }
  }

</style>

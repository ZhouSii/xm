<template>
  <el-select class="apiurlchange" @visible-change="detectUrl" @change="setApiurl" size="mini" v-model="apiurl" placeholder="请选择" v-if="showapi">
    <el-option
      v-for="item in options"
      :key="item.value"
      :disabled="!item.online"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      apiurl: 'api',
      showapi: false,
      options: [
        {
          value: 'api',
          label: '测试服（157）',
          online: true
        },
        {
          value: 'ceshi',
          label: '开发服（78）',
          online: true
        },
        {
          value: 'lxd',
          label: 'lxd（176）',
          online: true
        },
        // {
        //   value: 'wtc',
        //   label: 'wtc',
        //   online: true
        // },
        // {
        //   value: '180service',
        //   label: '预发布服（180）',
        //   online: true
        // },
      ]
    }
  },
  mounted() {
    // 方便测试
    // if (process.env.NODE_ENV !== 'production') {
    //   this.showapi = true
    //   this.apiurl = localStorage.tms_testapiurl || 'api'
    //   window.tms_testapiurl = this.apiurl
    // }
        // 方便测试
        if (process.env.NODE_ENV !== 'production' || window.location.href.indexOf('192.168.1') !== -1) {
            this.showapi = true
            this.apiurl = localStorage.tms_testapiurl || 'api'
            window.tms_testapiurl = this.apiurl
        }
  },
  methods: {
    // 优化检测机制，不点开就不开始检测
    detectUrl() {
      if (!this.ischecked) {
        this.ischecked = true
        this.checkUrl()
      }
    },
    setApiurl(url) {
      window.tms_testapiurl = url
      localStorage.tms_testapiurl = url
    },
    // 检测在线的服务器
    // 超过3秒没有返回的就当不在线
    checkUrl() {
      this.options.map((el, index) => {
        // 调整监测逻辑，改为每秒检测一个，避免全部同时请求造成浏览器的请求堵塞影响准确性~
        setTimeout(() => {
          // axios.get('/' + el.value + '/api-order/order/v1/orderCreateDate/', {
          axios.get('/' + el.value + '/anfacommonservice/common/oss/v1/policy', {
            timeout: 10000
          }).catch((err) => {
            const status = err.response ? err.response.status : 'unconnect'
            if (status === 504 || status === 500 || status === 'unconnect') {
              el.online = false
            }
          })
        }, 1000 * index)
      })
    }
  }
}
</script>
<style lang="scss">
.apiurlchange{
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
}
</style>


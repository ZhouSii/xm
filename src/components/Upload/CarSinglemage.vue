<template>
    <div class="upload-container" :class="{'uploadlist': showFileList}">
        <el-upload 
            class="image-uploader" 
            v-if="uploadUrl" 
            :data="upload" 
            :action="uploadUrl"
            :multiple="false" 
            :drag="!showFileList" 
            :show-file-list="showFileList" 
            :file-list="filelist"
            :limit="limit"
            :before-upload="beforeUpload" 
            :list-type="listtype"
            :on-exceed="onexceed"
            :disabled="disabled"
            :on-remove="handleRemove"
            :on-error="handleError"
            :on-success="handleImageScucess">
            <slot name="content">
                <div v-if="title && !showFileList" class="upload__title">{{ title }}</div>
                <el-button :size="size" type="primary">点击上传</el-button>
                <div class="el-upload__text" v-if="!showFileList">将文件拖拽到此区域</div>
                <div v-if="tip" class="upload__tip">{{ tip }}</div>
            </slot>
        </el-upload>
        <div class="image-preview" v-if="imageUrl && !showFileList">
            <div class="image-preview-wrapper">
                <img :src="imageUrl">
                <div class="image-preview-action">
                    <i @click="rmImage" class="el-icon-delete"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 上传接口
import { getUploadPolicy,generatePreSignedUrl } from '@/api/common'
import { parseTime } from '@/utils/'
import {aflcUserIdcard,aflcDriverPermit,aflcDriverLicence} from '@/api/users/carowner/all_car.js'
import { identificationShipperBusiness } from '@/api/users/shipper/all_shipper.js'
export default {
  name: 'singleImageUpload',
  props: {
    value: [String, Array],
    title: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: '（jpg/png。小于5M）'
    },
    size: {
      type: String,
      default: 'mini'
    },
    'showFileList': {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    listtype: {
      type: String,
      default: 'picture',
      enum: ['text', 'picture', 'picture-card']
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 图片获值类型
    uploadType:{
      type: String,
      default: ''
    },
    pictureStatus:{
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    imageUrl() {
      // console.log('singleImage',this.value)
      return this.value
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' },
      // 上传参数文档
      // https://help.aliyun.com/document_detail/31988.html
      upload: {
        'key': '', // 文件名称
        'policy': '',
        'OSSAccessKeyId': '',
        'success_action_status': '201', // 让服务端返回200,不然，默认会返回204;201会返回xml格式
        // 'callback': 'callbackbody',
        'signature': ''
      },
      uploadUrl: '',
      dir: '',
      filelist: [],
      bucket:null,
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.showFileList) {
          let arr = Array.isArray(newVal) ? newVal : newVal ? newVal.split(',') : []
          arr = arr.filter(el => el)
          this.filelist = arr.map(el => {
            const obj = {}
            obj.url = el
            return obj
          })
        } else {
          this.filelist = [{
            url: newVal
          }]
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if(this.pictureStatus){
      this.bucket = 'aflc'
      this.uploadUrl = 'http://aflc.oss-cn-shenzhen.aliyuncs.com'
      }
      else{
      this.bucket = 'aflcprivate'
      this.uploadUrl = 'http://aflcprivate.oss-cn-shenzhen.aliyuncs.com'
      }
        // 从后台获取policy
      return getUploadPolicy(this.bucket).then(data => {
        this.upload.OSSAccessKeyId = data.accessid
        this.upload.policy = data.policy
        this.upload.signature = data.signature
        this.dir = data.dir
        // this.upload.key = data.dir + this.random_string() + type
      }).catch(err => {
        console.log('get Policy ERror:', err)
      })
    },
    rmImage() {
      this.emitInput('')
      this.$message.success('图片删除成功')
    },
    // 超出上传数量
    onexceed(file, filelist) {
      this.$message.error(`最多上传 ${this.limit} 张!`)
    },
    // 删除列表
    handleRemove(file, fileList) {
      console.log('handleRemove:', file, fileList)
      this.filelist = fileList
      this.emitInput()
	},
	getNowFormatDate(){
      var now = new Date();
      // 获取年份:0~11
      var year = now.getFullYear();
      // 获取月份
      var month = now.getMonth()+1;
      // 获取日
      var date = now.getDate();
      // 获取星期：0-6（星期日-星期6）
      // var week = now.getDay();
      // 获取时分秒
      var h = now.getHours();
      var m = now.getMinutes();
      var s = now.getSeconds();
      // 补0操作
      h = h<10 ? '0'+h : h;
      m = m<10 ? '0'+m : m;
      s = s<10 ? '0'+s : s;
            // var arr = '日一二三四五六'
            
            // this.newTime = year + '年' + month + '月' + date + '日 '+ h + ':' + m + ':' + s + ' 星期' + arr[week];
      let newTime = year + '_' + month + '_' + date + '_'+ h + m + s;
      return newTime;
    },
     // 设置随机的文件名
    random_string(len) {
      　　var pwd = 'IMG_WEB_';
          // var timestamp = parseTime((new Date()).getTime(),"{y}-{m}-{d} {h}:{i}:{s}");
          var timestamp = this.getNowFormatDate();
          console.log('timestamp',timestamp)
          var random = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,5-1));
      // 　　for (var i = 0; i < len; i++) {
        // pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        pwd += timestamp +'_'+ random;
      // }
      return pwd
    },
    emitInput(val) {
      if (val) {
        this.filelist = []
        this.filelist.push({
          url: val
        })
      }
      if(this.filelist.length>0&&val){
       this.pictureTransfer(this.filelist[0].url)
      }
      this.$emit('input', this.showFileList ? this.filelist.map(el => {
        return el.url       
      }).join(',') : val)
    },
    handleImageScucess(xml) {
      let url = ''
      if(this.pictureStatus){
        if (xml.indexOf('Location') !== -1) {
        url = xml.match(/<Location>([^<]+)<\/Location>/m)
        // console.log('this.dir',this.dir,url)
        // url.replace('//'+this.dir,'/'+this.dir)
        url = url ? url[1].replace('//'+this.dir,'/'+this.dir) : ''
        this.emitInput(url)
      }
      }
      else{
      generatePreSignedUrl(xml.match(/<Key>([^<]+)<\/Key>/m)[1]).then(res=>{
        url = res.data
        this.emitInput(url)
      })
      }
      // this.imageUrl = url
    },
    handleError(err) {
      console.log('upload err:', err)
      this.$emit('error', err)
    },
    beforeUpload(file) {
      const _self = this
      const isJPG = /image\/\w+/.test(file.type) && /(jpe?g|png)/i.test(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      let type = file.name.match(/([^\.]+)$/)
      type = type ? '.' + type[1] : ''
      return new Promise((resolve, reject) => {
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!')
          reject(false)
        } else if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!')
          reject(false)
        } else {
          // 上传前统一获取下凭证
          this.init().then(res => {
            // 设置文件名
            this.upload.key = this.dir + parseTime(new Date(), '{y}{m}{d}') + '/' + this.random_string() + type
            resolve(true)
          }).catch(err => {
            this.$message.error('未知错误：' + JSON.stringify(err))
            resolve(false)
          })
        }
      })
    },
    // 图片AI传值请求
    pictureTransfer(val){
        switch (this.uploadType){
			case 'idCardFile':
				aflcUserIdcard(val).then(res=>{
				this.$emit('getInformation',res.data)
				this.$message.success('身份证识别成功')
				}).catch(err=>{
				this.$message.error(err.text)
				})
				break;
			case 'drivingLicenceFile':
				aflcDriverLicence(val).then(res=>{
				this.$emit('getInformation',res.data)
				this.$message.success('驾驶证识别成功')
				}).catch(err=>{
				this.$message.error(err.text)
				})
				break;
			case 'drivingPermitFile':
				aflcDriverPermit(val).then(res=>{
				this.$emit('getInformation',res.data)
				this.$message.success('行驶证识别成功')
				}).catch(err=>{
				this.$message.error(err.text)
				})
				break;
			case 'businessLicenceFile':
				identificationShipperBusiness(val).then(res=>{
					this.$emit('getInformation',res.data)
					this.$message.success('营业执照识别成功')
				}).catch(err=>{
					this.$message({
						type: 'error',
						message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
					})
				})
				break;
        }

    }
  }
}
</script>
<style lang="scss">
.uploadlist{
    display: inline-block;
    width: auto !important;
    height: auto;

    .el-upload {
        width: auto;

        .el-button{
            margin-top: 0;
        }
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    
    .upload-container {
        width: 100%;
        position: relative;
        height:218px;
        @include clearfix;

        .el-upload .el-upload-dragger{
            height: 116px;
        }
        .image-uploader {
            width: 100%;
            height: 100%;
        }
        .image-preview {
            width: 100%;
            height: 100%;
            position: absolute;
            background-color:#fff;
            top:0;
            left:0;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;
                cursor: pointer;
                text-align: center;
                line-height: 200px;
                .el-icon-delete {
                    font-size: 36px;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
        .el-button{
            margin-top: 24px;
        }
        .el-upload__text{
            margin-top: 10px;
            margin-bottom: 5px;
            font-size: 12px;
        }
        .upload__tip{
            font-size:12px;
            color:#999;
        }
        .upload__title{
            font-size:13px;
            color:#666;
            margin-top:14px;
        }
    }

</style>

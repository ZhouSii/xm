<template>
    <div class="box_container multimg" :class="{'hideuploadbtn': (filelist.length >= limit) || disabled}">
      <el-upload
        drag
        v-if="uploadUrl"
        :data="upload"
        :action="uploadUrl"
        :multiple="false"
        :show-file-list="showFileList"
        :file-list="filelist"
        list-type="picture"
        :limit="limit"
        :disabled="disabled"
        :before-upload="beforeUpload"
        :on-preview="handlePictureCardPreview"
        :on-error="handleError"
        :on-exceed="onexceed"
        :on-success="handleImageScucess"
        :on-remove="handleRemove">

        <!-- <i class="el-icon-upload"></i> -->
        <!-- <el-button :size="size" type="primary" style="">点击上传</el-button> -->
        <!-- <div class="el-upload__text clearfix"><span class="fl">将文件拖拽至此区域上传</span><em class="fl">点击上传</em></div> -->
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        <!-- <div class="el-upload__text" style="font-size:4px">将文本拖拽到此区域或,<em>点击上传</em></div> -->
        <!-- <i class="el-icon-plus"></i> -->
        <slot name="content">
          <el-button :size="size" type="primary" class="button" :disabled="disabled">点击上传</el-button>
          <!-- <div class="el-upload__text">将文件拖拽到此区域</div> -->
          <div v-if="tip" class="upload__tip">{{ tip }}</div>
        </slot>
      </el-upload>
      <el-dialog custom-class="singleimage2" :visible.sync="dialogVisible" :append-to-body="true">
        <img width="100%" :src="dialogImageUrl" alt="">
        <!-- <a target="_blank" href="dialogImageUrl" v-else></a> -->
      </el-dialog>
    </div>
</template>
<script>
// 上传接口
import { getUploadPolicy } from '@/api/common'
import { parseTime } from '@/utils/'

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
      default: '（必须为jpg/png并且小于5M）'
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
      enum: ['text', 'picture', 'picture-card', 'application']
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 隐藏文字
    hidBut: {
      type: Boolean,
      default: false
    },
    showBut: {
      type: Boolean
      // default: false
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  data() {
    return {
      dialogTxt: null,
      dialogImageUrl: '',
      dialogVisible: false,
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
      filelist: []
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.showFileList) {
          let arr = Array.isArray(newVal) ? newVal : newVal ? newVal.split(',') : []
          arr = arr.filter(el => el)
          // console.log('sjdfisidfj1111111111', arr)
          this.filelist = arr.map(el => {
            const obj = {}
            let name = ''
            name = el.split('/')
            name = name[name.length - 1]
            obj.url = el
            obj.name = name
            // console.log('sjdfisidfj', el)
            return obj
          })
          // console.log(this.filelist, '==================')
        }
        this.$emit('filelist', this.filelist)
      },
      immediate: true
    },
    hidBut() {

    },
    disabled() {

    }
  },
  mounted() {
    this.init()
    // console.log(this.disabled, this.filelist)
  },
  methods: {
    init() {
        // 从后台获取policy
      return getUploadPolicy('aflc').then(data => {
        this.upload.OSSAccessKeyId = data.accessid
        this.upload.policy = data.policy
        this.upload.signature = data.signature
        this.uploadUrl = data.host
        this.dir = data.dir
        // this.upload.key = data.dir + this.random_string() + type
      }).catch(err => {
        console.log('get Policy ERror:', err)
      })
    },
    rmImage() {
      this.emitInput('')
    },
    // 超出上传数量
    onexceed(file, filelist) {
      this.$message.error(`最多上传 ${this.limit} 张!`)
    },
    // 删除列表
    handleRemove(file, fileList) {
      // console.log('handleRemove:', file, fileList)
      this.filelist = fileList
      this.emitInput()
    },
    // 设置随机的文件名
    random_string(len) {
      len = len || 32
      　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      　var maxPos = chars.length
      　var pwd = ''
      　for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    emitInput(val) {
      // console.log('val', val)
      if (val) {
        this.filelist.push({
          url: val.url,
          name: val.name
        })
      }

      this.$emit('input', this.showFileList ? this.filelist.map(el => {
        // console.log('mapel:', el)
        return el.url
      }).join(',') : val)
    },
    handleImageScucess(xml) {
      let url = ''
      let name = ''
      if (xml.indexOf('Location') !== -1) {
        url = xml.match(/<Location>([^<]+)<\/Location>/m)
        url = url ? url[1] : ''
        name = url.split('/')
        name = name[name.length - 1]
      }

      // console.log('xml', xml, name)
      this.emitInput({ url: url, name: name })
      // this.imageUrl = url
    },
    handleError(err) {
      this.$emit('error', err)
    },
    beforeUpload(file) {
      this.fileInfo = {}
      this.fileInfo = file
      // console.log('upfile:', this.fileInfo, file)
      this.$emit('fileInfo', this.fileInfo)
      const _self = this
      const isJPG = /(image|text|application)\/\w+/.test(file.type) && /(jpe?g|png|plain|msword|vnd.ms-excel)/i.test(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      let type = file.name.match(/([^\.]+)$/)
      type = type ? '.' + type[1] : ''

      // let textFileList = ''
      // if (file.type === 'text/plain') {
      //   this.textFileList = file.uid
      // }

      return new Promise((resolve, reject) => {
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
        //   reject(false)
        // } else if (!isLt5M) {
        //   this.$message.error('上传头像图片大小不能超过 5MB!')
        //   reject(false)
        // } else {
            // 设置文件名
          // this.upload.key = this.dir + parseTime(new Date(), '{y}{m}{d}') + '/' + this.random_string() + type
        //   this.upload.key = this.dir + parseTime(new Date(), '{y}{m}{d}') + '/' + this.random_string() + '/' + file.name
        //   resolve(true)

            this.init().then(res => {
                // 设置文件名
                this.upload.key = this.dir + parseTime(new Date(), '{y}{m}{d}') + '/' + this.random_string() + '/' + file.name
                resolve(true)
            }).catch(err => {
                this.$message.error('未知错误：' + JSON.stringify(err))
                resolve(false)
            })
        //  this.$nextTick(() => {
        //     this.$set(this.filelist[0], 'name', file.name)
        //   console.log(this.filelist, this.upload.key)
        //  })
          //  this.filelist = Object.assign([], this.filelist).filter(e => {
          //   return e.uid
          // })
        // }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url

      let fileType = ''
      fileType = file.url.split('/')
      fileType = fileType[fileType.length - 1].split('.')
      fileType = fileType[fileType.length - 1]
      if (fileType === 'txt' || fileType === 'doc' || fileType === 'xls' || fileType === 'zip'|| fileType === 'rar') {
        this.dialogTxt = true
        window.open(file.url)
        console.log(file)
        // var NewDom = document.createElement("a");
        // NewDom.setAttribute('href', file.url);
        // NewDom.setAttribute('target', '_blank');
        // NewDom.setAttribute('download', '货主发展概况.xls');
        // document.body.appendChild(NewDom);
        // NewDom.click();
        // document.body.removeChild(NewDom)
      // let reader =  new FileReader()
      // reader.readAsText(file.url)
      // reader.onload = function (e) {
      //    this.dialogTxt = e.target.result

      // }
      } else {
        this.dialogVisible = true
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
            margin-top: 20px;
        }
    }
}
.hideuploadbtn{
  .el-upload.el-upload--picture-card{
    // display: none;
  }
}
</style>

<style lang="scss">
    @import "src/styles/mixin.scss";
    .singleimage2{
      margin-top: 10vh !important;
      width: 40% !important;
    }
    .multimg {
        width: 100%;
        position: relative;
        @include clearfix;
        .el-upload-list--picture-card .el-upload-list__item{
          width:200px;
          height:180px;
        }
        .el-message-box .showPictureWrapper .el-message-box--center{
          overflow: hidden !important;
        }
        .el-upload .el-upload-dragger{
            width: 230px;
            height:100px;
        }
        .image-uploader {
            width: 100%;
            height: 100%;
        }
        .showPictureWrapper{
          width:800px !important;
              max-height: 0 !important;
        }
        .el-list-enter, .el-list-leave-active{
            transition: none;
        }
        .el-message-box{
          width:800px;
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
            // float:left;
        }
        .el-upload__text{
            margin-top: -41px;
            margin-bottom: 5px;
            font-size: 12px;
            line-height:30px;
        }
        .upload__tip{
            font-size:12px;
            line-height:30px;
            color:#999;
        }
        .upload__title{
            font-size:13px;
            color:#666;
            margin-top:14px;
        }
        .el-upload--picture-card{
          // line-height:43px;
          width:0px;
          height:0px;
        }
        // .upload__tip{
        //   line-height:43px;
        // }
    }

</style>

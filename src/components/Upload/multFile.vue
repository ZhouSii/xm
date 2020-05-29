<!--客服管理 消息中心 自定义消息 新增 上传文件-->
<template>
    <div class="box_container multimg" :class="{'hideuploadbtn': (filelist.length >= limit) || disabled}">
      <el-upload
        drag
        v-if="uploadUrl"
        :data="upload"
        :action="uploadUrl"
        :multiple="multiple"
        :show-file-list="showFileList"
        :file-list="filelist"
        list-type="text"
        :limit="limit"
        :disabled="disabled"
        :before-upload="beforeUpload"
        :on-error="handleError"
        :on-exceed="onexceed"
        :on-success="handleImageScucess"
        :on-remove="handleRemove">
        <slot name="content">
          <el-button :size="size" type="primary" class="button" :disabled="disabled">点击上传</el-button>
          <!-- <div class="el-upload__text">将文件拖拽到此区域</div> -->
          <div v-if="tip" class="upload__tip">{{ tip }}</div>
        </slot>
      </el-upload>
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
    multiple: {
      type: Boolean,
      default: false
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
    hidBut() {

    },
    disabled() {

    }
  },
  mounted() {
    this.init()
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
    // 超出上传数量
    onexceed(file, filelist) {
      this.$message.error(`最多上传 ${this.limit} 个文件!`)
    },
    // 删除列表
    handleRemove(file, fileList) {
      this.$emit('getFileList', fileList)
    },
    // 设置随机的文件名
    random_string(len) {
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      const maxPos = chars.length
      let pwd = ''
      len = len || 32
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    handleImageScucess(xml, file, fileList) {
      this.$emit('getFileList', fileList)
    },
    handleError(err) {
      this.$emit('error', err)
    },
    beforeUpload(file) {
      // 设置文件名
      this.upload.key = this.dir + parseTime(new Date(), '{y}{m}{d}') + '/' + this.random_string() + '/' + file.name
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

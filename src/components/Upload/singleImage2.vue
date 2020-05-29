<template>
  <div :class="{ hideUploadBtn: (currentLength >= limit ||  imageUrlLength >= limit) }">
    <el-upload
      drag
      v-if="uploadUrl"
      :data="upload"
      :action="uploadUrl"
      :multiple="false"
      list-type="picture-card"
      :show-file-list="showFileList"
      :file-list="filelist"
      :limit="limit"
      :before-upload="beforeUpload"
      :on-preview="handlePictureCardPreview"
      :on-error="handleError"
      :on-exceed="onexceed"
      :on-success="handleImageScucess"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog
      lock-scroll
      custom-class="pop-show-img-wrapper"
      :visible.sync="dialogVisible"
      :modal="false"
    >
      <img class="pop-show-img" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// 上传接口
import { getUploadPolicy } from "@/api/common";
import { parseTime } from "@/utils/";

export default {
  name: "singleImageUpload",
  props: {
    value: [String, Array],
    title: {
      type: String,
      default: ""
    },
    tip: {
      type: String,
      default: "（jpg/png。小于5M）"
    },
    size: {
      type: String,
      default: "mini"
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    listtype: {
      type: String,
      default: "picture",
      enum: ["text", "picture", "picture-card"]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // imageUrl() {
    //   return this.value;
    // }
    imageUrlLength() {
      return this.value ? this.value.split(',').length : 0;
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      tempUrl: "",
      dataObj: { token: "", key: "" },
      // 上传参数文档
      // https://help.aliyun.com/document_detail/31988.html
      upload: {
        key: "", // 文件名称
        policy: "",
        OSSAccessKeyId: "",
        success_action_status: "201", // 让服务端返回200,不然，默认会返回204;201会返回xml格式
        // 'callback': 'callbackbody',
        signature: ""
      },
      uploadUrl: "",
      dir: "",
      filelist: [],
      firstTime: true,
      currentLength: null
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.showFileList) {
          let arr = Array.isArray(newVal)
            ? newVal
            : newVal
            ? newVal.split(",")
            : [];
          arr = arr.filter(el => el);
          //   console.log('newVal && this.firstTime',newVal,this.firstTime)
          if (newVal && this.firstTime) {
            this.filelist = arr.map(el => {
              const obj = {};
              obj.url = el;
              return obj;
            });
            this.firstTime = false;
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 从后台获取policy
      return getUploadPolicy("aflc")
        .then(data => {
          this.upload.OSSAccessKeyId = data.accessid;
          this.upload.policy = data.policy;
          this.upload.signature = data.signature;
          this.uploadUrl = data.host;
          this.dir = data.dir;
          // this.upload.key = data.dir + this.random_string() + type
        })
        .catch(err => {
          console.log("get Policy ERror:", err);
        });
    },
    // rmImage() {
    //   this.emitInput('')
    // },
    // 超出上传数量
    onexceed(file, filelist) {
      this.$message.error(`最多上传 ${this.limit} 张!`);
    },
    // 删除列表
    handleRemove(file, fileList) {
      //   console.log("handleRemove:", file, fileList);
      //   this.filelist = fileList;
      this.emitInput(fileList);
    },
    // 设置随机的文件名
    random_string(len) {
      // 　　len = len || 32
      // 　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      // 　　var maxPos = chars.length
      var pwd = "IMG_WEB_";
      // var timestamp = parseTime((new Date()).getTime(),"{y}-{m}-{d} {h}:{i}:{s}");
      var timestamp = this.getNowFormatDate();
      //   console.log("timestamp", timestamp);
      var random = Math.floor(
        (Math.random() + Math.floor(Math.random() * 9 + 1)) *
          Math.pow(10, 5 - 1)
      );
      // 　　for (var i = 0; i < len; i++) {
      // pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      pwd += timestamp + "_" + random;
      // }
      return pwd;
    },
    toArray(arr) {
      let fileListArr = [];
      arr.forEach(el => {
        let url = "";
        url = el.response
          ? el.response.match(/<Location>([^<]+)<\/Location>/m)[1]
          : el.url;
        fileListArr.push(url);
      });
      // console.log(fileListArr)
      return fileListArr;
    },
    emitInput(fileList, val) {
      // console.log('fileListfileList',fileList)
      if (val) {
        /* this.filelist.push({
          url: val
        }) */
      }
      //   let fileListArr =
      //     fileList.length > 0
      //       ? fileList.map(el => {
      //           return el.response.match(/<Location>([^<]+)<\/Location>/m)
      //             ? el.response.match(/<Location>([^<]+)<\/Location>/m)[1]
      //             : "";
      //         })
      //       : [];
      this.currentLength = this.toArray(fileList).length;
      let fileListStr = this.toArray(fileList).join(",");
      this.$emit("input", fileListStr);
    },
    handleImageScucess(xml, file, fileList) {
      // console.log('xml',xml)
      // console.log('file',file)
      // console.log('fileList',fileList)
      //   let url = ''
      //   if (xml.indexOf('Location') !== -1) {
      //     url = xml.match(/<Location>([^<]+)<\/Location>/m)
      //     url = url ? url[1] : ''
      //   }
      this.emitInput(fileList);
      // this.imageUrl = url
    },
    handleError(err) {
      this.$emit("error", err);
    },
    beforeUpload(file) {
      //   console.log("beforeUpload:", file);
      const _self = this;
      const isJPG =
        /image\/\w+/.test(file.type) && /(jpe?g|png)/i.test(file.type);
      const isLt5M = file.size / 1024 / 1024 < 5;
      let type = file.name.match(/([^\.]+)$/);
      type = type ? "." + type[1] : "";
      return new Promise((resolve, reject) => {
        if (!isJPG) {
          _self.$message.error("上传图片只能是 JPG/PNG 格式!");
          reject(false);
        } else if (!isLt5M) {
          _self.$message.error("上传图片大小不能超过 5MB!");
          reject(false);
        } else {
          //   console.log("loooo1");
          // 上传前统一获取下凭证
          _self
            .init()
            .then(res => {
              //   console.log("loooo2");
              // 设置文件名
              _self.upload.key =
                _self.dir +
                parseTime(new Date(), "{y}{m}{d}") +
                "/" +
                _self.random_string() +
                type;
              resolve(true);
            })
            .catch(err => {
              //   console.log("loooo3", err);
              _self.$message.error("未知错误：" + JSON.stringify(err));
              resolve(false);
            });
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getNowFormatDate() {
      var now = new Date();
      // 获取年份:0~11
      var year = now.getFullYear();
      // 获取月份
      var month = now.getMonth() + 1;
      // 获取日
      var date = now.getDate();
      // 获取星期：0-6（星期日-星期6）
      // var week = now.getDay();
      // 获取时分秒
      var h = now.getHours();
      var m = now.getMinutes();
      var s = now.getSeconds();
      // 补0操作
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      // var arr = '日一二三四五六'

      // this.newTime = year + '年' + month + '月' + date + '日 '+ h + ':' + m + ':' + s + ' 星期' + arr[week];
      let newTime = year + "_" + month + "_" + date + "_" + h + m + s;
      return newTime;
    }
  }
};
</script>
<style lang="scss">
.hideUploadBtn {
  div.el-upload.el-upload--picture-card {
    display: none;
  }
}
.pop-show-img-wrapper {
  .el-dialog__body {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.pop-show-img {
  max-width: 100%;
  max-height: 100%;
}

.el-upload-dragger {
  width: 148px;
  height: 148px;
}

.el-list-enter,
.el-list-leave-active {
  transition: none;
}
</style>

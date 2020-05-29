<template>
    <div class="commoncss addExcel">
        <el-dialog :title="formtitle" :close-on-click-modal="false" :visible="dialogVisibleExcel" @close="close">
          <div>
        <el-upload
        ref="upload"
        class="upload-demo"
        :data="upload" 
        :action="uploadUrl"
        :file-list="fileList"
        :on-change="beforeUpload"
        :on-exceed="onexceed"
        :limit="1" 
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">请上传excel文件</div>
        </el-upload>
        <div class="uploadExcelBox">
            <el-button type="primary" plain @click="uploadExcel">上传</el-button>
        </div>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import { data_importDictExcel} from '@/api/company/data_dic.js'
import { getUploadPolicy } from '@/api/common'
import { parseTime } from '@/utils/'
export default {
    name:'addExcel',
    props:{
        dialogVisibleExcel:{
            type:Boolean,
        },
        formtitle:{
            type:String,
        }
    },
    components:{

    },
    data(){
        return {
            uploadUrl:'',
            upload: {
            'key': '', // 文件名称
            'policy': '',
            'OSSAccessKeyId': '',
            'success_action_status': '201', // 让服务端返回200,不然，默认会返回204;201会返回xml格式
            // 'callback': 'callbackbody',
            'signature': ''
        },
         fileList: [],
         formObject:{}
        }
    },
    watch:{
            dialogVisibleExcel:function(val, oldVal) {
            if(!val){
            this.$refs.upload.clearFiles();
            this.formObject = {}
            }
            else{
            }
        },
    },
    mounted(){
        this.init()
    },
    methods:{
        close(){
            this.$emit('update:dialogVisibleExcel', false);
            this.$emit('close');
            if (typeof done === 'function') {
                done()
            }
        },
        init(){
        // 从后台获取policy
        getUploadPolicy('aflc').then(data => {
            this.upload.OSSAccessKeyId = data.accessid
            this.upload.policy = data.policy
            this.upload.signature = data.signature
            this.uploadUrl = data.host
            this.dir = data.dir
            this.upload.key = data.dir + this.random_string() + type
        }).catch(err => {
        })
        },
        beforeUpload(file, fileList){
        this.formObject=file
        },
        uploadExcel(){
        var formdata = new FormData()
        formdata.append('multipartFile',this.formObject.raw);
        this.$message({
          message: '正在上传，请等等...',
          center: true,
          duration:3000
        });
        data_importDictExcel(formdata).then(res=>{
             this.$message.success('上传成功')
             this.$emit('update:dialogVisibleExcel', false);
        }).catch(res=>{
             this.$message.error(res.text)
        })
        },
        onexceed(){
        this.$message.error(`最多上传1份!`)
        }
    },
   }
</script>

<style lang="scss" rel="stylesheet/scss">
.addExcel{
    .el-dialog__body{
        min-height: 500px;
    }
    .uploadExcelBox{
        margin: 10px;
        text-align: right
    }
}
</style>

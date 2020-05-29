<template>
  <div class="commoncss lll-addGarden">
    <el-dialog :title="formtitle" :close-on-click-modal="false" :visible="isVisibleDialog" @close="close"
               v-loading="loading" width="40%">
      <el-form :model="form" :rules="newrules" ref="ruleForm" class="clearfix" label-width="100px">
        <div class="message-left clearfix">
          <el-form-item label="园区名称" prop='parkName'>
            <el-input v-model="form.parkName" clearable :maxlength="25"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="parkMobile" class="tooltip">
            <el-tooltip class="item" effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip"
                        tabindex="-1">
              <div slot="content">多个手机号用"；"隔开</div>
              <el-input v-model="form.parkMobile" clearable auto-complete="off" @focus="tooltip = true"
                        @blur="tooltip = false" class=""></el-input>
              <!--<input :value="form.parkMobile" auto-complete="off" @focus="tooltip = true" @blur="tooltip = false"  class="nativeinput" >-->
            </el-tooltip>
          </el-form-item>

          <el-form-item label="所在地" prop="locationFn">
            <!--<el-input v-model="form.locationFn" clearable></el-input>-->
            <el-input v-model="form.locationFn" @focus="()=>{showMap('selectdistrictAddress')}"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="form.contactQq" clearable :maxlength="15" v-number-only></el-input>
          </el-form-item>
        </div>
        <div class="message-right clearfix">
          <el-form-item label="联系人" prop="parkContact">
            <el-input v-model="form.parkContact" clearable :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="固话" prop=''>
            <el-tooltip class="item" effect="dark" placement="top" :enterable="false" :manual="true" :value="istooltip"
                        tabindex="-1" clearable>
              <div slot="content">多个固话用"；"隔开</div>
              <el-input v-model="form.parkNum" auto-complete="off" @focus="istooltip = true"
                        @blur="istooltip = false" class=""></el-input>

            </el-tooltip>

            <!--<el-input v-model="form.parkNum" clearable :maxlength="12" v-number-only></el-input>-->
          </el-form-item>


          <el-form-item label="详细地址" prop="addressFn">
            <!--<el-input v-model="form.parkAddress" clearable></el-input>-->
            <el-input v-model="form.addressFn" @focus="()=>{showMap('selectdistrictAddress')}"></el-input>
          </el-form-item>
        </div>
        <div class="message-text clearfix">
          <el-form-item label="园区介绍">
            <!--<el-input type="textarea" v-model="form.parkIntroduce" clearable></el-input>-->
            <div>
              <editor
                class="editor"
                :value="form.parkIntroduce"
                :setting="editorSetting"
                @show="editors"
                :url="Url"
                :max-size="MaxSize"
                :accept="Accept"
                :with-credentials="withCredentials"
                @on-upload-fail="onEditorReady"
                @on-upload-success="onEditorUploadComplete"></editor>
            </div>
          </el-form-item>
        </div>
        <div class="message-center">
          <el-form-item label="名片图像">
            <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="form.businessCardPicture"/>
          </el-form-item>
          <el-form-item label="园区招牌图像" prop='parkSignPicture'>
            <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="form.parkSignPicture"/>
          </el-form-item>
        </div>
        <div class="message-bottom">
          <el-form-item label="园区内景图像" prop='parkInsidePicture'>
            <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="form.parkInsidePicture"/>
          </el-form-item>
        </div>
        <el-form-item class="message-checked">
          <el-checkbox v-model="checked">开放至客户管理应用</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="submitForm('ruleForm')">确定</el-button>
        <el-button type="primary" plain @click="close">取 消</el-button>
      </div>

    </el-dialog>
    <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible"/>
  </div>
</template>

<script>
  import editor from '@/components/tinymac/index'
  import Upload from '@/components/Upload/singleImage'
  import {REGEX} from '@/utils/validate.js'
  import tmsmap from '@/components/map/index'
  import {objectMerge2, parseTime} from '@/utils/'
  import {postAddLogisticspark, putTextedLogisticspark} from '@/api/web/garden'

  export default {
    name: "add-garden",
    components: {
      Upload,
      tmsmap,
      editor,
    },
    props: {
      isVisibleDialog: {
        type: Boolean,
        default: false
      },
      isModify: {
        type: Boolean,
        default: false
      },
      info: {
        type: [Object, Array],
        // default: () => {
        // }
      },
    },
    watch: {
      isVisibleDialog: {
        handler(n) {

        }
      },
      isModify: {
        handler(n) {

        }
      },
      info: {
        handler(n) {
          if (this.$refs['ruleForm']) {
            this.$refs['ruleForm'].resetFields()
          }
          if (this.isModify) {
            this.formtitle = '查看物流园区信息'
            this.comWatch(this.info)
            // console.log(this.info, 'info')
          } else {
            this.formtitle = '新增物流园区信息'
            this.form = {}
          }

        }
      },

    },
    data() {
      //^1[3578][0-9]{9}(,1[3578][0-9]{9})*$
      ///[^\r\n0-9\,]/g,''
      // const validnum = (rule, value, callback) => {
      //   if (/((((\d{3,4}-)?\d{7,8})|(1[73584]\d{9}))\,){0,}(((\d{3,4}-)?\d{7,8})|(1[73584]\d{9}))$/.test(value)) {
      //     console.log(value,'value')
      //     callback(new Error('错误的'))
      //   } else {
      //     callback()
      //    // console.log(value,'valueddddd')
      //   }
      // }
      const valuedaata = (value, callback) => {
        if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
          // callback()
          callback(new Error('请输入正确号码~'))
        } else {
          callback()
        }
      }
      return {
        tooltip: false,
        istooltip: false,
        Url: '', // 图片对应的上传地址,不传!
        MaxSize: 2097152, // 文件大小
        Accept: 'image/jpeg, image/png', // 文件格式
        editorSetting: { // 配置富文本编辑器高

          height: 300
        },
        withCredentials: true,
        formLabelWidth: '120px',
        checked: true,
        loading: false,
        popVisible: false,
        formtitle: '新增物流园区信息',
        form: {
          parkName: '',
          parkContact: '',
          parkMobile: '',
          parkAddress: '',
          parkIntroduce: '',
          businessCardPicture: '',
          parkSignPicture: '',
          parkInsidePicture: '',
          openStatus: 0,
          disableStatus: 0,
          contactQq: '',
          parkNum: '',
          locationProvince: '',
          locationCity: '',
          locationArea: '',
          locationFn: '',
          addressFn: '',
        },
        newrules: {
          parkName: [
            // REGEX
            {required: true, message: '请输入园区名称~'},
            {message: '只能输入中文和字母~', trigger: 'blur', pattern: REGEX.CHINESE_AND_ENGLISH}
            // {message: '只能输入中文加字母~', pattern: REGEX.CHINESE_AND_ENGLISH}
          ],
          parkContact: [
            {required: true, message: '请输入联系人~'},
            {message: '只能输入中文和字母~', pattern: REGEX.CHINESE_AND_ENGLISH}
          ],
          //   { required: true, message: '请输入手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
          parkMobile: [
            // {required: true, message: '请输入手机号码'},
            // {validator:validnum}


            // {required: true, message: '请输入手机号码', pattern: REGEX.MOBILE}
            {required: true, message: '请输入手机号码~'}
          ],
          //
          parkNum: [

            {validator: valuedaata}
          ],
          parkSignPicture: [
            {required: true, message: '请上传园区招牌图像~'}
          ],
          parkInsidePicture: [
            {required: true, message: '请上传园区内景图像~'}
          ],

          addressFn: [
            {required: true, message: '请输入详细地址~'}
          ],
          locationFn: [
            {required: true, message: '请输入所在地~'}
          ],
        }
      }
    },
    methods: {
      onEditorReady(ins, ina) {

        // console.log(ins, ina)
      },
      onEditorUploadComplete(json) {
        // console.log(json,'jsonjson')
        this.form.parkIntroduce = this.form.parkIntroduce + '<img src=' + json[0].data.filePath + '>';
      },
      editors(content) { // editor组件传过来的值赋给content
        // console.log(content,'parkIntroduceparkIntroduce')
        this.form.parkIntroduce = content;
      },
      showMap(name) {
        this.popVisible = true;
        // console.log(name, 'name')
        // this.current = name;
      },
      getInfo(pos, name, info) {
        let posfn = pos.split(',')
        this.$set(this.form, 'longitude', posfn[0])
        this.$set(this.form, 'latitude', posfn[1])
        // console.log(this.form,'info.addressComponent')
        this.form.locationFn = info.addressComponent.province + info.addressComponent.city + info.addressComponent.district

        this.form.addressFn = info.addressComponent.township + info.addressComponent.street + info.addressComponent.streetNumber
        this.form.locationProvince = info.addressComponent.province
        this.form.locationCity = info.addressComponent.city
        this.form.locationArea = info.addressComponent.district
        this.form.parkAddress = this.form.addressFn
      },
      comWatch(item) {
        this.form.parkName = item.parkName
        this.form.parkContact = item.parkContact
        this.form.parkMobile = item.parkMobile
        this.form.parkAddress = item.parkAddress
        this.form.addressFn = this.form.parkAddress
        this.form.parkIntroduce = item.parkIntroduce
        this.form.businessCardPicture = item.businessCardPicture
        this.form.parkSignPicture = item.parkSignPicture
        this.form.parkInsidePicture = item.parkInsidePicture
        this.form.openStatus = item.openStatus
        this.form.contactQq = item.contactQq
        this.form.parkNum = item.parkNum
        this.form.locationProvince = item.locationProvince
        this.form.locationCity = item.locationCity
        this.form.locationArea = item.locationArea
        this.form.disableStatus = item.disableStatus
        this.form.locationFn = this.form.locationProvince + this.form.locationCity + this.form.locationArea
        if (this.form.openStatus === 1) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let promiseObj
            let data
            data = objectMerge2(this.form)

            delete data.locationFn
            delete data.addressFn
            if (this.checked === true) {
              data.openStatus = 1
            } else {
              data.openStatus = 0
            }

            const str = data.parkMobile.replace(/；/g, ';').split(';')
            str.map((el, index) => {
              if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(el)) {
                this.$message.info('请输入正确手机号~')
                return false
              } else {
                data.parkMobile = str.join(',')
              }
            })
            console.log(data.parkNum,'data.parkNum');
            if (data.parkNum !== undefined ) {
              const arr = data.parkNum.replace(/；/g, ';').split(';')
              arr.forEach((el, index) => {
                // const call = /(^\d{3}-\d{8}$)|(^\d{4}-\d{7,8}$)/
                // const nums = /^[0-9]+$/
                if (!/(^\d{3}-\d{8}$)|(^\d{4}-\d{7,8}$)/.test(el)) {
                  // console.log(el,'llll');
                  this.$message.info('请输入正确固话~')
                  return false
                } else {
                  data.parkNum = arr.join(',')
                }

              })
            }

            //
            if (this.isModify) {
              promiseObj = putTextedLogisticspark(this.info.id, data)
            } else {
              this.form.disableStatus = 0
              data.disableStatus = this.form.disableStatus
              promiseObj = postAddLogisticspark(data)
            }
            promiseObj.then(res => {
              this.$emit('success')
              this.$message.success('保存成功')
              this.close()
            }).catch(err => {
              this.$message.warning(err.text || err.errorInfo || '无法获取服务端数据~')
            })
          } else {
            return false
          }
        })
      },
      reset() {
        this.$refs['ruleForm'].resetFields()
        // this.form = {}
      },
      close(done) {
        this.reset()
        // this.$refs.ruleForm.resetFields();
        // for (const i in this.standForm) {
        //   this.standForm[i] = ''
        // }
        // this.specList = [];
        this.$emit('update:isVisibleDialog', false);
        this.$emit('close');
        // this.btnShow = false;
        if (typeof done === 'function') {
          done()
        }
      }
    },
  }
</script>

<style lang="scss">
  .lll-addGarden {
    .el-dialog__wrapper {
      .el-dialog {
        margin-top: 5vh !important;
      }
      .el-dialog__header {

      }
      .el-dialog__body {
        padding: 20px 40px 0;
        .el-form {
          .message-left {
            float: left;
          }
          .message-right {
            float: left;
            /*margin-bottom: 70px;*/
          }
          .message-center {
            display: inline-flex;
            /*margin-left: 35px;*/
            .el-form-item {
              display: grid;

            }
            .el-form-item:nth-of-type(1) {
              .el-form-item__content {
                padding-left: 40px;
              }
            }
            .el-form-item:nth-of-type(2) {
              margin-left: 120px;
            }
          }
          .message-text {
            float: left;
            width: 100%;
            .el-form-item {
              width: 100%;
              margin-bottom: 0;
              .el-form-item__content {
                width: 70%;
                .el-textarea__inner {
                  color: #3e9ff1;
                }
              }
            }

          }
          .message-bottom {
            .el-form-item {
              display: grid;
              width: 100%;
              margin-left: 30px;
              .el-form-item__content {
                width: 25%;
              }
            }
          }
          .message-checked {
            margin-bottom: 0;
          }
          .el-form-item {

            .el-form-item__content {
              display: inline-block;
              margin-left: 0 !important;
            }
          }

        }
      }
      .el-dialog__header {

      }
      .el-dialog__footer {
        padding: 10px 20px 0px;
      }
    }
  }
</style>

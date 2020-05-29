<template>
    <div>
        <textarea :id='id' :value='value'></textarea>
    </div>
</template>

<script>
    // Import TinyMCE
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/modern/theme'
    import 'tinymce/plugins/advlist' // 这几条引入是因为我的导入不了，不知道为啥
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/textcolor'
    import 'tinymce/plugins/paste'
    import 'tinymce/plugins/textcolor'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/media'
    import { getUploadPolicy } from '@/api/common'
    import axios from 'axios'
    import { parseTime } from '@/utils/'

    const INIT = 0
    const CHANGED = 2
    // var EDITOR = null
  export default {
    props: {
      value: {
        type: String,
        editor: null,
        required: true
      },
      setting: {},
      url: { // 接口
        default: '',
        type: String
      },
      accept: { // 文件类型
        default: 'image/jpeg, image/png',
        type: String
      },
      maxSize: { // 大小
        default: 2097152,
        type: Number
      },
      withCredentials: {
        default: false,
        type: Boolean
      },
    //   uploadAli:{
    //       type:Object,
    //       default:{},
    //   }
    },
    watch: {
      value: function(val) {
        console.log('init ' + val)
        if(this.flag){
            if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
              tinymce.activeEditor.setContent(val)
            }
            this.status = CHANGED
        }
        this.flag=true;
      }
    },
    data() {
        return {
            flag:true,
            status: INIT,
            id: 'editor-' + new Date().getMilliseconds(),
            uploadAli:{
                'key': '', // 文件名称
                'policy': '',
                'OSSAccessKeyId': '',
                'success_action_status': '201', // 让服务端返回200,不然，默认会返回204;201会返回xml格式
                // 'callback': 'callbackbody',
                'signature': '',
                'dir':''
            },
            dir:'',
            uploadUrl: '',
        }
    },
    methods: {
        init() {
            // 从后台获取policy
            getUploadPolicy('aflc').then(data => {
                this.uploadAli.OSSAccessKeyId = data.accessid
                this.uploadAli.policy = data.policy
                this.uploadAli.signature = data.signature
                this.uploadUrl = data.host
                this.dir = data.dir
                this.uploadAli.key = data.dir + this.random_string() + type
            }).catch(err => {
            })
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
    },
    mounted() {
        const _this = this
        _this .init();
      const setting =
      {
        menubar: true,
        branding: false,//是否显示POWERED BY TINYMCE
        visualblocks_default_state: true,
        end_container_on_empty_block: true,
        selector: '#' + _this.id,
        images_upload_url: _this.uploadUrl,
        language_url: '../../../static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '../../../static/tinymce/skins/lightgray',
        init_instance_callback: function(editor) {
          // EDITOR = editor
          console.log('Editor: ' + editor.id + ' is now initialized.',editor)
          editor.on('input undo redo execCommand', () => {
            _this.flag=false;
            var content = editor.getContent()
            _this.$emit('show', content)
          })

        // if (_this.value) {
        //     editor.setContent(_this.value)
        //   }
        //   _this.hasInit = true;
        //   editor.on('NodeChange Change KeyUp', () => {
        //     this.hasChange = true;
        //     this.$emit('input', editor.getContent({ format: 'raw' }));
        //   });
        },
        // content_style: `
        //     // *                         { padding:0; margin:0; }
        //     html, body                { height:100%; }
        //     img                       { max-width:100%; display:block;height:auto; }
        //     a                         { text-decoration: none; }
        //     iframe                    { width: 100%; }
        //     p                         { line-height:1.6; margin: 0px; }
        //     table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
        //     .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
        //     ul,ol                     { list-style-position:inside; }
        // `,
        insert_button_items: 'image link | inserttable',
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]', // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: true, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: true,
        paste_auto_cleanup_on_paste: true,
        'plugins': [
          'advlist link image',
          'code',
          'media',
          'table textcolor paste textcolor colorpicker'
        ], // 配置
        'toolbar_items_size': 'small',
        'block_formats': 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
        // 'toolbar1': 'table |insertfile undo redo | formatselect | link unlink | uploadimg media', // 工具栏1
        // 'toolbar2': ' fontsizeselect | forecolor backcolor | fontselect bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat', // 工具栏2
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat media',
        fontsize_formats: '12px 14px 16px 18px 20px 24px 26px 28px 30px 32px 34px 36px 40px 50px',
        font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,
        setup: function (editor) {
            editor.addButton('mybutton', {
                text: '上传图片',
                icon: false,
                onclick: function () {
                    console.log('ifClick!!!!!!!!!')
                    tinymceEditor = editor;
                    $("#uploadofedit").dialog({
                        modal: false,
                        resizable: false,
                        width: 400,
                        height: 200,
                        dialogClass: "mceuploadify"
                    });
                }
            });
        },
         //TinyMCE 会将所有的 font 元素转换成 span 元素
        convert_fonts_to_spans: true,
        //换行符会被转换成 br 元素
        convert_newlines_to_brs: false,
        //在换行处 TinyMCE 会用 BR 元素而不是插入段落
        force_br_newlines: false,
        //当返回或进入 Mozilla/Firefox 时，这个选项可以打开/关闭段落的建立
        force_p_newlines: false,
        //这个选项控制是否将换行符从输出的 HTML 中去除。选项默认打开，因为许多服务端系统将换行转换成 <br />，因为文本是在无格式的 textarea 中输入的。使用这个选项可以让所有内容在同一行。
        remove_linebreaks: false,
        //不能把这个设置去掉，不然图片路径会出错
        relative_urls: false,
        //不允许拖动大小
        resize: false,
        //想要哪一个图标提供本地文件选择功能，参数可为media(媒体)、image(图片)、file(文件),多个参数用空格分隔
        file_picker_types: 'media', 
         //be used to add custom file picker to those dialogs that have it.
        file_picker_callback: function(cb, value, meta) {
            //当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
            console.log('cb, value, meta',cb, value, meta)
            _this.init();
            if (meta.filetype == 'media'){
                //创建一个隐藏的type=file的文件选择input
                let input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.onchange = function(){
                    let file = this.files[0];
                    let xhr, formData;
                    xhr = new XMLHttpRequest();
                    xhr.open('POST', _this.uploadUrl);
                    xhr.withCredentials = self.credentials;
                    xhr.upload.onprogress = function (e) {
                        // 进度(e.loaded / e.total * 100)
                        let percent=e.loaded / e.total * 100;
                        if(percent<100){
                            tinymce.activeEditor.setProgressState(true);//是否显示loading状态：1（显示）0（隐藏）
                        }else{
                            tinymce.activeEditor.setProgressState(false);
                        }
                    };
                    xhr.onerror = function () {
                        console.log(xhr.status);
                        tinymce.activeEditor.setProgressState(false);
                        return;
                    };
                    xhr.onload = function () {
                        let json;
                        if (xhr.status < 200 || xhr.status >= 300) {
                            console.log('HTTP 错误: ' + xhr.status);
                            return;
                        }
                        json = xhr.responseText;
                         //假设接口返回JSON数据为{status: 0, msg: "上传成功", data: {location: "/localImgs/1546434503854.mp4"}}
                        if(json){
                            //接口返回的文件保存地址
                            let mediaLocation = ''
                            if (json.indexOf('Location') !== -1) {
                                mediaLocation = json.match(/<Location>([^<]+)<\/Location>/m)
                                mediaLocation = mediaLocation ? mediaLocation[1] : ''
                            }
                            //cb()回调函数，将mediaLocation显示在弹框输入框中
                            cb(mediaLocation, { title: file.name });
                        }else{
                            console.log('上传失败！');
                            return;
                        }
                    };
                    formData = new FormData();
                    formData.append('key',  _this.dir + parseTime(new Date(), '{y}{m}{d}') + '/' + _this.random_string() + file.name);
                    formData.append('OSSAccessKeyId',  _this.uploadAli.OSSAccessKeyId);
                    formData.append('policy', _this.uploadAli.policy);
                    formData.append('signature',  _this.uploadAli.signature);
                    formData.append('success_action_status',  _this.uploadAli.success_action_status);
                    formData.append('file', file,file.name);
                    // console.log(file,this.files,formData)
                    // console.log(file,this.files,formData,_this.dir,_this.uploadAli)
                    //假设接口接收参数为file,值为选中的文件
                    // formData.append('file', file);
                    //正式使用将下面被注释的内容恢复
                    xhr.send(formData);
                }
                //触发点击
                input.click();
            }
        },
        // 图片上传
        images_upload_handler: function(blobInfo, success, failure) {
          // failure(blobInfo)
          // _this.$emit('on-ready', blobInfo.blob().size, blobInfo.blob())
          console.log('blobInfo',blobInfo,)
            _this.init();
          if (blobInfo.blob().size > _this.maxSize) {
            failure('文件体积过大')
          }
          if (_this.accept.indexOf(blobInfo.blob().type) >= 0) {
            uploadPic()
          } else {
            failure('图片格式错误')
          }
            let type = blobInfo.filename().match(/([^\.]+)$/)
            type = type ? '.' + type[1] : ''
            // console.log('_this.uploadAli',_this.uploadAli)
        function uploadPic() { // 发送请求
        //   console.log('blobInfo',blobInfo.filename(),blobInfo.blob())
            let formData = new FormData();
            // 服务端接收文件的参数名，文件数据，文件名
            formData.append('key',  _this.dir + parseTime(new Date(), '{y}{m}{d}') + '/' + _this.random_string() + blobInfo.filename());
            formData.append('OSSAccessKeyId',  _this.uploadAli.OSSAccessKeyId);
            formData.append('policy', _this.uploadAli.policy);
            formData.append('signature',  _this.uploadAli.signature);
            formData.append('success_action_status',  _this.uploadAli.success_action_status);
            formData.append('file', blobInfo.blob(),blobInfo.filename());

            // console.log('formData',formData)
            axios({
                method: 'POST',
                // 这里是你的上传地址
                url: _this.uploadUrl ,
                data: formData,
            })
            .then((res) => {
            // 这里返回的是你图片的地址
                // console.log('上传成功的回调',res.data)
                let url = ''
                if (res.data.indexOf('Location') !== -1) {
                    url = res.data.match(/<Location>([^<]+)<\/Location>/m)
                    url = url ? url[1] : ''
                }
                console.log('上传成功的链接',url)
                    // 抛出 'on-upload-success' 钩子
                _this.$emit('on-upload-success', url)
                success(url);
            })
            .catch((err) => {
                failure('上传失败',err)
            })
            // const xhr = new XMLHttpRequest()
            // const formData = new FormData()
            // xhr.withCredentials = _this.withCredentials
            // xhr.open('POST', _this.url)
            // xhr.onload = function() {
            //   failure('上传---' + xhr.status)
            //   if (xhr.status !== 200) {
            //     // 抛出 'on-upload-fail' 钩子
            //     _this.$emit('on-upload-fail')
            //     failure('上传失败: ' + xhr.status)
            //     return
            //   }
            //   const json = JSON.parse(xhr.responseText)
            //   // 抛出 'on-upload-success' 钩子
            //   _this.$emit('on-upload-success', [
            //     json, success, failure
            //   ])
            // }
            // xhr.onerror = function() {
            //   _this.$emit('on-ready', '上传失败')
            // }
            // formData.append('file', blobInfo.blob())
            // xhr.send(formData)
          }
        }
      }
        Object.assign(setting, _this.setting)
        tinymce.init(setting);
    },
    beforeDestroy: function() {
      tinymce.get(this.id).destroy()
    }
  }
</script>

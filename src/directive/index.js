import Vue from 'vue'
import { MessageBox } from 'element-ui'
import Clipboard from './clipboard'
import DragDialog from './el-dragDialog'
import Waves from './waves'
import vueSticky from './sticky'
// import install from './fangda'
import { getUserInfo } from '@/utils/auth'

Clipboard.install()
DragDialog.install()
Waves.install()
vueSticky.install()
// install()

let hasPoint = false
let pointNum = 2
const VueDirectiveObject = {
  findInput: function(el) {
    return el.classList.contains('el-input') ? el.querySelector('input') : el
  },
  keepNumber: function(event) {
    var hasPoint = this.hasPoint 
    var pointNum = this.pointNum
    // console.log(this.value, 'this.value', event.type)
    // 如果第一位为小数点，则补0
    // this.value = hasPoint ? parseFloat(this.value.replace(/[^0-9.]/g, '').replace(/\./, '*').replace(/\./g, '').replace(/\*/, '.').replace(/^\./, '0.').replace(new RegExp('^(\\d+)\\.(\\d{' + Math.abs(pointNum) + '}).*$'), '$1.$2')) || '' : parseFloat(this.value.replace(/\D/g, '').replace(/\./g, '')) || ''
    this.value = hasPoint ? this.value.replace(/[^0-9.]/g, '').replace(/\./, '*').replace(/\./g, '').replace(/\*/, '.').replace(/^\./, '0.').replace(new RegExp('^(\\d+)\\.(\\d{' + Math.abs(pointNum) + '}).*$'), '$1.$2') : this.value.replace(/\D/g, '').replace(/\./g, '')
  },
  keepNumberAndLetter() {
    // this.value = this.value.replace(/[\u4E00-\u9FA5]/g, '')
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '')
  },
  onkeydown: function(event) {
    // console.log('event.keyCode:',event.keyCode,String.fromCharCode(event.keyCode),event.key,event.code, /[\d]/.test(String.fromCharCode(event.keyCode)))
    // enter ctrl+c ctrl+v ctrl+a ctrl+x 应该仍然可以使用
    // 左右、删除、tab键
    if (!(event.keyCode === 46) && !(event.keyCode === 8) && !(event.keyCode === 37) && !(event.keyCode === 39) && !(event.keyCode === 9) && !(event.key === '.' && this.hasPoint) && !(event.keyCode === 13) &&
    !((event.keyCode === 67 || event.keyCode === 86 || event.keyCode === 65 || event.keyCode === 88) && event.ctrlKey && !event.altKey && !event.shiftKey)
  ) {
      // 数字 小键盘数字
      if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
        VueDirectiveObject.keepNumber.apply(this, event)
        event.stopPropagation()
        event.preventDefault()
      }
    }
  }
}
// 限制只能输入数字
Vue.directive('numberOnly', {
    bind: function(el, binding, vnode) {
      // console.log('vnode:', vnode)
      // 判断是否需要小数点
      const arg = binding.arg || ''
      const el2 = VueDirectiveObject.findInput(el)
      // v-numberOnly:point2
      hasPoint = arg.indexOf('point') !== -1
      // 判断需要小数点后几位，默认为 俩位
      pointNum = parseInt(arg.replace('point', ''), 10) || 2
      if (el2) {
        el2.hasPoint = hasPoint
        el2.pointNum = pointNum
        el2.style.imeMode = 'disabled'
        el2.addEventListener('input', VueDirectiveObject.keepNumber)
        el2.addEventListener('keydown', VueDirectiveObject.onkeydown)
        el2.addEventListener('keyup', VueDirectiveObject.keepNumber)
        // el2.addEventListener('change', VueDirectiveObject.keepNumber)
        el2.addEventListener('blur', VueDirectiveObject.keepNumber)
        // el2.addEventListener('onkeyup', VueDirectiveObject.keepNumber) // 20180809 lyy add
        // ...... 没毛病 ......
        /*       el2.addEventListener('blur', function(event) {
                // 隔100毫秒后再处理
                // 因为需要等elementUI回填数据后再处理
                setTimeout(() => {
                  VueDirectiveObject.keepNumber.call(this, event)
                }, 100)
              }) */
        // 输入法关闭事件
        // el2.addEventListener('compositionstart', VueDirectiveObject.keepNumber)
        // el2.addEventListener('compositionend', VueDirectiveObject.keepNumber)
      }
    },
    unbind: function(el) {
      let fel = VueDirectiveObject.findInput(el)
      fel.removeEventListener('input', VueDirectiveObject.keepNumber)
      fel.removeEventListener('keydown', VueDirectiveObject.onkeydown)
      fel.removeEventListener('keyup', VueDirectiveObject.keepNumber)
      fel.removeEventListener('blur', VueDirectiveObject.keepNumber)
    }
  })
  // 限制只能输入数字
  Vue.directive('onlyNumberAndLetter', {
    bind: function(el, binding) {
      // 判断是否需要小数点
      const el2 = VueDirectiveObject.findInput(el)
  
      if (el2) {
        el2.style.imeMode = 'disabled'
        el2.addEventListener('input', VueDirectiveObject.keepNumberAndLetter)
        el2.addEventListener('keyup', VueDirectiveObject.keepNumberAndLetter)
        el2.addEventListener('change', VueDirectiveObject.keepNumberAndLetter)
        el2.addEventListener('blur', VueDirectiveObject.keepNumberAndLetter)
        /*       el2.addEventListener('blur', function(event) {
                // 隔100毫秒后再处理
                // 因为需要等elementUI回填数据后再处理
                setTimeout(() => {
                  VueDirectiveObject.keepNumber.call(this, event)
                }, 100)
              }) */
        // 输入法关闭事件
        // el2.addEventListener('compositionstart', VueDirectiveObject.keepNumberAndLetter)
        // el2.addEventListener('compositionend', VueDirectiveObject.keepNumberAndLetter)
      }
    },
    unbind: function(el) {
      let fel = VueDirectiveObject.findInput(el)
  
      fel.removeEventListener('input', VueDirectiveObject.keepNumberAndLetter)
      fel.removeEventListener('keyup', VueDirectiveObject.keepNumberAndLetter)
      fel.removeEventListener('change', VueDirectiveObject.keepNumberAndLetter)
      fel.removeEventListener('blur', VueDirectiveObject.keepNumberAndLetter)
    }
  })

Vue.directive('showPicture', {
  bind: function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault()
      e.stopPropagation()
      MessageBox.alert('<div class="showPictureBox"><img src="' + (this.getAttribute('imgurl') || el.src || el.href) + '" /></div>', {
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        closeOnClickModal: true,
        center: true,
        customClass: 'showPictureWrapper'
      })
    })
  },
  unbind: function(el) {

  }
})

/*
 *  定义公共js里，在入口文件main.js中import；
 *  给elementUI的dialog上加上 v-dialogDrag 指令就可以实现弹窗的全屏和拉伸了。
 */
// v-dialogDrag: 弹窗拖拽+水平方向伸缩
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
      //弹框可拉伸最小宽高
      let minWidth = 400;
      let minHeight = 300;
      //初始非全屏
      let isFullScreen = false;
      //当前宽高
      let nowWidth = 0;
      let nowHight = 0;
      //当前顶部高度
      let nowMarginTop = 0;
      //获取弹框头部（这部分可双击全屏）
      const dialogHeaderEl = el.querySelector('.el-dialog__header');
      //弹窗
      const dragDom = el.querySelector('.el-dialog');
      //给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
      dragDom.style.overflow = "auto";
      //清除选择头部文字效果
      dialogHeaderEl.onselectstart = new Function("return false");  
      //头部加上可拖动cursor
      dialogHeaderEl.style.cursor = 'move';
  
      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
  
      let moveDown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft;
        const disY = e.clientY - dialogHeaderEl.offsetTop;
  
        // 获取到的值带px 正则匹配替换
        let styL, styT;
  
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (sty.left.includes('%')) {
          styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
          styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
        } else {
          styL = +sty.left.replace(/\px/g, '');
          styT = +sty.top.replace(/\px/g, '');
        };
  
        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离 
          const l = e.clientX - disX;
          const t = e.clientY - disY;
  
          // 移动当前元素  
          dragDom.style.left = `${l + styL}px`;
          dragDom.style.top = `${t + styT}px`;
  
          //将此时的位置传出去
          //binding.value({x:e.pageX,y:e.pageY})
        };
  
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
      dialogHeaderEl.onmousedown = moveDown;
      //双击头部效果
      dialogHeaderEl.ondblclick = (e) => {
        if (isFullScreen == false) {
          nowHight = dragDom.clientHeight;
          nowWidth = dragDom.clientWidth;
          nowMarginTop = dragDom.style.marginTop;
          dragDom.style.left = 0;
          dragDom.style.top = 0;
          dragDom.style.height = "100VH";
          dragDom.style.width = "100VW";
          dragDom.style.marginTop = 0;
          isFullScreen = true;
          dialogHeaderEl.style.cursor = 'initial';
          dialogHeaderEl.onmousedown = null;
        } else {
          dragDom.style.height = "auto";
          dragDom.style.width = nowWidth + 'px';
          dragDom.style.marginTop = nowMarginTop;
          isFullScreen = false;
          dialogHeaderEl.style.cursor = 'move';
          dialogHeaderEl.onmousedown = moveDown;
        }
      }
      
  
      //拉伸
      let resizeEl=document.createElement("div");
      dragDom.appendChild(resizeEl); 
      //在弹窗右下角加上一个10-10px的控制块
      resizeEl.style.cursor = 'se-resize';
      resizeEl.style.position = 'absolute';
      resizeEl.style.height = '10px';
      resizeEl.style.width = '10px';
      resizeEl.style.right = '0px';
      resizeEl.style.bottom = '0px';
      //鼠标拉伸弹窗
      resizeEl.onmousedown = (e) => {
  
        // 记录初始x位置
        const clientX = e.clientX;
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - resizeEl.offsetLeft;
        const disY = e.clientY - resizeEl.offsetTop;
  
        document.onmousemove = function (e) {
          e.preventDefault(); // 移动时禁用默认事件
  
          // 通过事件委托，计算移动的距离 
          const x = e.clientX - disX + (e.clientX - clientX);//这里 由于elementUI的dialog控制居中的，所以水平拉伸效果是双倍
          const y = e.clientY - disY;
          //比较是否小于最小宽高
          dragDom.style.width = x > minWidth ? `${x}px` : minWidth + 'px';
          dragDom.style.height = y > minHeight ? `${y}px` : minHeight + 'px';
        };
        //拉伸结束
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    }
  })
  /**
   *  注意：如果是el-dialog弹出的表单el-form，最好不要把提交按钮当做el-form-item（elementUI文档是这么用的），放在el-dialog里。
   *  不然按钮会同el-dialog中标签一样被overflow；
  */


    /** 权限指令**/
    Vue.directive('has', {
        inserted: function(el, binding) {
        // 判断是用value还是arg
        // 优先使用arg
        const val = binding.arg || binding.value
        // console.log('v-has:', val)
        if (val && !Vue.prototype.$_has_permission(val)) {
            el.parentNode.removeChild(el)
        }   
        }
    })
  // 权限检查方法
  Vue.prototype.$_has_permission = function(value) {
    let isExist = false
    const buttonperms = getUserInfo()
    // console.log('buttonperms',buttonperms)
    if (buttonperms == undefined || buttonperms == null) {
      return false
    }
    if (!buttonperms.permissionTrees || buttonperms.permissionTrees.length == 0) {
        
      return isExist = true
    }
    const ptree = buttonperms.permissionTrees
    for (let i = 0; i < ptree.length; i++) {
      if (ptree[i].code === value) {
        isExist = true
        break
      }
    }
    return isExist
  }
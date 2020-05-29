import 'babel-polyfill'
window.Promise = Promise
import Vue from 'vue'
import ElementUI from 'element-ui'
//地图插件
// import vRegion from 'v-region';
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import './errorLog'// error
import '@/permission' // permission
import './assets/iconfont/iconfont.css'
import * as filters from './filters'

//viewer
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})

import './directive'
//引入MD5
import md5 from 'js-md5';
import './mixins'
//引入el-cascader-multi
import elCascaderMulti from "el-cascader-multi";
Vue.use(elCascaderMulti);
// mock
// import './mock/'

// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
//
// Vue.use(vRegion);
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false

// CMS管理 学院 考试 接口
const cmsDev = 'aflcusercenterservice-deng' // 78地址
const cmsUc = 'aflc-uc' // 157 地址
Vue.prototype.$cms = cmsUc
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

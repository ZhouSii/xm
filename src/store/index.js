import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import tagsView from './modules/tagsView'
import errorLog from './modules/errorLog'
import rules from './modules/rulers'
// import dashboardShow from './modules/dashboard'
import order from './modules/order'
import marketing from './modules/marketing'
import dataCenter from './modules/dataCenter'
import dataDic from './modules/datadic'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    tagsView,
    errorLog,
    rules,
    // dashboardShow,
    order,
    marketing,
    dataCenter,
    dataDic
  },
  getters
})

export default store

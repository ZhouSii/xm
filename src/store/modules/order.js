
export default {
  state: {
    cashAuditingPage: 1,
    cashAuditingStatusPage: 1
  },
  mutations: {
    // 提现审核全部页码
    SET_CASHAUDITINGPAGE(state, val) {
      state.cashAuditingPage = val.page
    },
    // 审核待处理页码
    SET_CASHAUDITINGSTATUSPAGE(state, val) {
      state.cashAuditingStatusPage = val.page
    }
  },
  actions: {
    CASHAUDITINGPAGE(context, val) {
      context.state.cashAuditingStatusPage = val.page
      context.commit('SET_CASHAUDITINGSTATUSPAGE')
    } 
  }
}

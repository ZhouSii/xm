
export default {
  state: {
    couponStatus: 'one', // 优惠劵设置类型
    mobilePhone: null, //跳转携带的手机号
  },
  mutations: {
    // 优惠劵设置类型
    SET_COUPONSTATUS(state, val) {
      state.couponStatus = val.couponStatus
    }
  },
  actions: {
    COUPONSTATUS(context, val) {
      context.state.couponStatus = val.couponStatus
      context.commit('SET_COUPONSTATUS')
    }
  }
}

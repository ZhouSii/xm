import { getUserInfo } from '@/utils/auth'

const dashboardShow = {
    state: {
        dashShow:false,
    },
    mutations: {
        changeStatus: (state) => {

            if(getUserInfo().username == 'pingan'){
                state.dashShow = true
            }else{
                state.dashShow = false
            }
            // console.log('changeStatuschangeStatuschangeStatus',state.dashShow)
        }   
    },
    actions: {
       
    }
}

export default dashboardShow
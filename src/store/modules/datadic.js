import { getDictionary } from '@/api/common'

let resolveData = {}

const dataDic = {
    state:{
        dic:{}
    },
    mutations:{
        SET_DIC:(state,data) => {
            // console.log('state,code,data',data)
            state.dic[data[0]] = data[1]
        },
        GET_DIC:() => {

        }
    },
    actions:{
        GetInfoDic({commit,state},code){
            return new Promise((resolve,reject) => {
                if(state.dic[code]){
                    resolve(state.dic[code])
                }else{
                    if(resolveData[code]){
                        resolveData[code].push(resolve)
                        return 
                    } else {
                        resolveData[code] = [resolve]
                        // console.log('resolveDataXXX',resolveData)
                    }
                    getDictionary(code).then(res => {
                        let setData = [code,res.data]
                        commit('SET_DIC', setData)
                        resolveData[code].forEach(resolve => {
                            resolve(res.data)
                        });
                        // console.log('resolveData',resolveData)
                        resolveData[code] = null
                    }).catch(e=>{
                        resolveData[code] = null
                    })
                }
            })
        }
    }
}

export default dataDic
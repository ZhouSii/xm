var state={
};
const getters = {
   
};
var mutations ={
    
    //验证数据值
    valuerules(event){
       // console.log(event)
       if(!event.target.value){
           return 
       }else{
           if(!/^[0-9]+$/.test(event.target.value)){
               let information = "请输入数字类型内容";
               this.hint(information);
               event.target.focus()
           }
       }
    },
};

var actions = {
    valuerules(context, n){
        context.commit('valuerules', n)
    }
};

export default {
    state,
    mutations,
    actions
}
<template>
  <div class="same_shipper tabsWrap">
    <el-tabs v-model="shipperName" type="card"  >
        <!-- 同城 -->
            <el-tab-pane label="同城" name="first">
                <SameOrder></SameOrder>
            </el-tab-pane>

        <!-- 城际 -->
            <el-tab-pane label="城际" name="second">
                <InterOrder ></InterOrder>
            </el-tab-pane>

        <!-- 零担 -->
            <el-tab-pane label="零担" name="third">
                <IoadOrder ></IoadOrder>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SameOrder from './sameOrder.vue'
import InterOrder from './interOrder.vue'
import IoadOrder from './loadOrder.vue'
export default {
    data(){
        return{
            shipperName:'first',
        }
    },
    components:{    
            SameOrder,
            InterOrder,
            IoadOrder
    },
    watch:{
     shipperName(newVal,oldVal){
        if(newVal){
            this.shipperName = newVal;
          }else{
        this.shipperName = oldVal;
          }
        }
        },
     methods: {
     handleClick(tab, event) {
      this.shipperName = tab.name;
       }
     }
}
</script>

<style lang="scss" >
    @import "../../../../styles/tab.scss";
    .completeinfo{
      .detailinfo{
        margin-left: 26px;
        p{
            width:160px;
            height: 40px;
            line-height: 40px;
            text-align: left;
            display: inline-block;
            vertical-align: top;
            span{
                color:red;
            }
        }
        .upload-demo{
          display: inline-block ;
        }
      }
    }
    .same_shipper{
        height:100%;    
        position: relative;
       .el-tabs__content{
           padding:0px 0px;
       }
        
    }
</style>

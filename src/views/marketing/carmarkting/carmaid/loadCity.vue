<template>
    <div>
        <div class="shipper_searchinfo">
              零担
      </div>
    </div>
</template>
<script>
import GetCityList from '@/components/GetCityList'
import { eventBus } from '@/eventBus'
import {parseTime} from '@/utils/'
export default {
    components:{
        GetCityList
    },
}
</script>
<style lang="scss">
.export{
  .el-button{
    margin-right:20px;
    padding:10px 20px;
  }
}
.frozeclassify{
  margin-top: 10px;
  .info{
    span{
      margin-left: 60px;
      font-size: 16px;
    }
    .mc-line{
      width: 100%;
      border-bottom: 1px solid #000;
    }
    .frozerol{
      margin: 10px  0 10px 50px;
    }
  }
}
</style>



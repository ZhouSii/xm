<template>
    <div class="tabs">
        <!-- <ul class="tabs_content clearfix">
            <li class="fl" v-for="(item,idx) in from" :key="idx">
                <h2>需求资源池（昨天）</h2>
                <p>{{item.aa}}</p>
            </li>
        </ul>    -->
    </div>
</template>

<script>

    export default {
      props: {
        listtype: {
          type: String,
          default: 'now'
        }
      },
      components: {

      },
      data() {
        return {
          from: [
            {
              aa: '123',
              aa: '123',
              aa: '123',
              aa: '123',
              aa: '123'
            },
            {
              aa: '123',
              aa: '123',
              aa: '123',
              aa: '123',
              aa: '123'
            },
            {
              aa: '123',
              aa: '123',
              aa: '123',
              aa: '123',
              aa: '123'
            },
            {
              aa: '123',
              aa: '123',
              aa: '123',
              aa: '123',
              aa: '123'
            }
          ]
        }
      },
      mounted() {
        switch (this.listtype) {
          case 'now':

            break
          case 'chengyun':

            break
                // case 'tihuo':
                //     this.searchQuery.vo.orderStatus = 'AF03703'
                //     break
                // case 'fahuo':
                //     this.searchQuery.vo.orderStatus = 'AF03704'
                //     break
                // case 'shouhuo':
                //     this.searchQuery.vo.orderStatus = 'AF03705'
                //     break
                // case 'pingjia':
                //     this.searchQuery.vo.orderStatus = 'AF03706'
                //     break
                // case 'wancheng':
                //     this.searchQuery.vo.orderStatus = 'AF03707'
                //     break
                // case 'quxiao':
                //     this.searchQuery.vo.orderStatus = 'AF03708'
                //     break
        }
      }
    }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    .tabs{
        .tabs_content{

        }
    }
</style>

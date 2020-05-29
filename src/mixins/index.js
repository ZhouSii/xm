import Vue from 'vue'
import { mapGetters } from 'vuex'
import { eventBus } from '@/eventBus'
import { keepNumber, keepNumberAndPoint } from '@/utils/'
import { getToken } from '@/utils/auth'

Vue.mixin({
  data() {
    return {
      access_token: getToken()
    }
  },

  computed: {
    // 用户信息
    ...mapGetters([
      'otherinfo',
      'allRouters'
    ]),
    // 全局的事件分发器
    eventBus() {
      return eventBus
    }
  },
  methods: {
    keepNumber(event) {
      return keepNumber.call(event.target, event)
    },
    keepNumberAndPoint(event) {
      return keepNumberAndPoint.call(event.target, event)
    },

    // 超出显示省略号
    cutString(str, len) {
        //length属性读出来的汉字长度为1
        if (str.length * 2 <= len) {
            return str;
        }
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
            s = s + str.charAt(i);
            if (str.charCodeAt(i) > 128) {
                strlen = strlen + 2;
                if (strlen >= len) {
                    return s.substring(0, s.length - 1) + "...";
                }
            } else {
                strlen = strlen + 1;
                if (strlen >= len) {
                    return s.substring(0, s.length - 2) + "...";
                }
            }
        }
        return s;
    },
    
    // $_has_permission(value) {
    //     let isExist = false
    //     const buttonperms = getUserInfo();
    //     // console.log('buttonperms',buttonperms)
    //     const ptree = buttonperms.permissionTrees
    //     for (let i = 0; i < ptree.length; i++) {
    //       if (ptree[i].code === value) {
    //         isExist = true
    //         break
    //       }
    //     }
    //     return isExist
    //   }
  }/* ,

  methods: {
    ...mapActions([
      '$getUserInfo',
      '$setMenuList'
    ])
  } */
})

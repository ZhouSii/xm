/**
 * Created by jiachenpan on 16/11/18.
 */

const shouldCalcProperty = ['_index|1|条', 'nowPayFee', 'finishNowPayFee', 'notNowPayFee', 'arrivepayFee', 'finishArrivepayFee', 'notArrivepayFee', 'receiptpayFee', 'finishReceiptpayFee', 'notReceiptpayFee', 'monthpayFee', 'finishMonthpayFee', 'notMonthpayFee', 'changeFee', 'notChangeFee', 'finishChangeFee', 'inputChangeFee', 'inputMonthpayFee', 'inputNowPayFee', 'inputArrivepayFee', 'inputReceiptpayFee']
/**
 * 根据列表数据计算合计值
 * @param {*} param 列表数据
 * 计算的语法
 * 属性名 单位为元
 * 属性名|单位
 * _index|索引（|单位）
 */
export function getSummaries(param, propsArr) {
  const { columns, data } = param
  const sums = []
  // 获取需要计算的属性值列表
  propsArr = propsArr || shouldCalcProperty

  // console.log(columns, data)
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '总计'
      return
    }
    let prop = ''

    let unit = '元'
    const find = propsArr.filter(el => {
      // 完全等于属性名
      if (el === column.property || el === column.prop) {
        prop = el
        return true
      }

      const propArr = el.split('|')
      // console.log('propArr',propArr)
      if (propArr.length > 1) {
        // 前缀等于属性名
        if (propArr[0] === column.property || propArr[0] === column.prop) {
          prop = column.property || column.prop
          unit = propArr[1] || ''
          return true
        }
        // 索引位置相等
        if (propArr[0] === '_index' && parseInt(propArr[1], 10) === index) {
          prop = '_index'
          unit = propArr[2] || ''
          return true
        }
      } else {
        // 没有匹配
        return false
      }
    })

    // if (!values.every(value => isNaN(value))) {
    if (find.length) {
      if (prop === '_index') {
        sums[index] = data.length + unit
      } else {
        const values = data.map(item => Number(item[prop]))
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            // return prev + curr
            return tmsMath._add(prev, curr)
          } else {
            return prev
          }
        }, 0)
        sums[index] += ' ' + unit
      }
    } else {
      sums[index] = ' - '
    }
  })
  return sums
}

// export function parseTime(time, cFormat) {
//   if (arguments.length === 0) {
//     return null
//   }
//   if (!time) {
//     return ''
//   }
//   const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
//   let date
//   if (typeof time === 'object') {
//     date = time
//   } else {
//     // 判断时毫秒还是字符串
//     time = typeof time === 'number' ? time : ('' + time).trim()
//     // 如果是秒级单位则转成毫秒
//     if (/^\d{10}$/.test(time)) {
//       time = parseInt(time) * 1000
//     } else if (/(\d){4}-(\d){2}-(\d){2}\s+(\d){2}:(\d){2}:(\d){2}/.test(time)) {
//       // IE需要标准格式
//       // time = time.replace(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/, '$1-$2-$3T$4:$5:$6Z')
//       time = time.replace(/-/g, '/')
//     }

//     date = new Date(time)
//   }
//   // 如果不能正确转换，则返回原有的数据
//   if (date.toString().indexOf('Invalid') !== -1) {
//     return time
//   }
//   const formatObj = {
//     y: date.getFullYear(),
//     m: date.getMonth() + 1,
//     d: date.getDate(),
//     h: date.getHours(),
//     i: date.getMinutes(),
//     s: date.getSeconds(),
//     a: date.getDay()
//   }
//   const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
//     let value = formatObj[key]
//     if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
//     if (result.length > 0 && value < 10) {
//       value = '0' + value
//     }
//     return value || 0
//   })
//   return time_str
// }
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (!time) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    // 判断时毫秒还是字符串
    time = typeof time === 'number' ? time : ('' + time).trim()
    // 如果是秒级单位则转成毫秒
    if (/^\d{10}$/.test(time)) {
      time = parseInt(time) * 1000
    } else if (/(\d){4}-(\d){2}-(\d){2}\s+(\d){2}:(\d){2}:(\d){2}/.test(time)) {
      // IE需要标准格式
      // time = time.replace(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/, '$1-$2-$3T$4:$5:$6Z')
      time = time.replace(/-/g, '/')
    }

    date = new Date(time)
  }
  // 如果不能正确转换，则返回原有的数据
  if (date.toString().indexOf('Invalid') !== -1) {
    return time
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 获取链接参数对象
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function uniqArray(array) {
  return Array.from(new Set(array))
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function objectMerge2() {
  var options
  var name
  var src
  var copy
  var copyIsArray
  var clone
  var target = arguments[ 0 ] || {}
  var i = 1
  var	length = arguments.length
  var	deep = true
  var obj = {}

	// 是否深层拷贝可以通过第一个参数控制
  if (typeof target === 'boolean') {
    deep = target

		// 往前移，去获取要合并的对象信息
    target = arguments[ i ] || {}
    i++
  }

	// 当合并对象为其它类型的值时，则忽略
  if (typeof target !== 'object' && !(typeof target === 'function')) {
    target = {}
  }

	// 当只传了一个参数过来时
  if (i === length) {
    // 当仅传一个参数时
    target = Array.isArray(target) ? [] : {}
    i--
  }

  for (; i < length; i++) {
		// 合并对象必须为非null或者undefined值
    if ((options = arguments[ i ]) != null) {
			// Extend the base object
      for (name in options) {
        src = target[ name ]
        copy = options[ name ]

        // 避免循环引用的copy情况
        if (target === copy) {
          continue
        }

          // 当为数组或者对象时处理深层拷贝
        if (deep && copy && (obj.toString.call(copy) === '[object Object]' ||
              (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && obj.toString.call(src) ? src : {}
          }

                // 不要修改原有的数据
          target[ name ] = objectMerge2(deep, clone, copy)

            // undefined值不用传递过去
        } else if (copy !== undefined) {
          target[ name ] = copy
        }
      }
    }
  }

	// Return the modified object
  return target
}

export function objectMerge3() {
  let i = 1,
    target = arguments[0] || {},
    deep = true, // 默认为深层拷贝
    length = arguments.length,
    name, options, src, copy,
    copyIsArray, clone

  // 如果第一个参数的数据类型是Boolean类型
  // target往后取第二个参数
  if (typeof target === 'boolean') {
    deep = target
    // 使用||运算符，排除隐式强制类型转换为false的数据类型
    // 如'', 0, undefined, null, false等
    // 如果target为以上的值，则设置target = {}
    target = arguments[1] || {}
    i++
  }

  // 如果target不是一个对象或数组或函数
  if (typeof target !== 'object' && !(typeof target === 'function')) {
    target = {}
  }

  // 如果arguments.length === 1 或
  // typeof arguments[0] === 'boolean',
  // 且存在arguments[1]，则直接返回target对象
  if (i === length) {
    return target
  }

  // 循环每个源对象
  for (; i < length; i++) {
    // 如果传入的源对象是null或undefined
    // 则循环下一个源对象
    if (typeof (options = arguments[i]) != null) {
      // 遍历所有[[emuerable]] === true的源对象
      // 包括Object, Array, String
      // 如果遇到源对象的数据类型为Boolean, Number
      // for in循环会被跳过，不执行for in循环
      for (name in options) {
          // src用于判断target对象是否存在name属性
        src = target[name]
        // copy用于复制
        copy = options[name]
        // 判断copy是否是数组
        copyIsArray = Array.isArray(copy)
        if (deep && copy && (typeof copy === 'object' || copyIsArray)) {
          if (copyIsArray) {
            copyIsArray = false
            // 如果目标对象存在name属性且是一个数组
            // 则使用目标对象的name属性，否则重新创建一个数组，用于复制
            clone = src && Array.isArray(src) ? src : []
          } else {
            // 如果目标对象存在name属性且是一个对象
            // 则使用目标对象的name属性，否则重新创建一个对象，用于复制
            clone = src && typeof src === 'object' ? src : {}
          }
          // 深复制，所以递归调用copyObject函数
          // 返回值为target对象，即clone对象
          // copy是一个源对象
          target[name] = objectMerge3(deep, clone, copy)
        } else if (copy !== undefined) {
          // 浅复制，直接复制到target对象上
          target[name] = copy
        }
      }
    }
  }
  // 返回目标对象
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions4 = {
    //近七天
    last7Day(dateobj) {
        const _end = dateobj || new Date()
        const end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
        const start = new Date(end.getFullYear(), _end.getMonth(), _end.getDate() - 7)
        return [start, end]
      }, 
    // 近30天
    last30Day(dateobj) {
        const _end = dateobj || new Date()
        const end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
        const start = new Date(end.getFullYear(), _end.getMonth(), _end.getDate() - 30)
        return [start, end]
      },  
    // 近半年
    last6Month(dateobj) {
        const _end = dateobj || new Date()
        const end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
        const start = new Date(end.getFullYear(), _end.getMonth() - 6, 1)
        return [start, end]
      },
    // 近一年
    last12Month(dateobj) {
        const _end = dateobj || new Date()
        const end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
        const start = new Date(end.getFullYear(), _end.getMonth() - 12, 1)
        return [start, end]
      },
  currentMonth(dateobj) {
    const end = dateobj || new Date()
    const start = new Date(end.getFullYear(), end.getMonth(), 1)
    return [start, end]
  },
  currentAllMonth(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), 1)
    _end = new Date(_end.getFullYear(), _end.getMonth() + 1, 1)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  lastMonth(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth() - 1, 1)
    _end = new Date(_end.getFullYear(), _end.getMonth(), 1)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  lastDay(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
    _end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate())
    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  today(dateobj) {
    const _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate())

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  yesterDay(dateobj) {
    const _end = dateobj || new Date()
    const start1 = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
    const start2 = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
    const end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate())
    return [start1, start2]
  },
  beforeDady(dateobj) {
    const _end = dateobj || new Date()
    const end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 1)
    const start = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - 2)
    return [start, end]
  },
  currentWeek(dateobj) {
      var new_Date = new Date()
      var timesStamp = new_Date.getTime();
      var currenDay = new_Date.getDay();
      var dates = [];
      for(var i = 0; i < 7; i++) {
          dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)));
        }
    const _end = dates[dates.length - 1];
    const start = new Date(new Date(dates[0].toLocaleDateString()).getTime());
    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  lastWeek(dateobj) {
    const _end = dateobj || new Date()
    const end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - _end.getDay())
    const start = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - _end.getDay() - 7)
    return [start, end]
  },
  currentAllWeek(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - _end.getDay())
    _end = new Date(_end.getFullYear(), _end.getMonth(), _end.getDate() - _end.getDay() + 7)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  currentYear(dateobj) {
    const _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), 0, 1)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  currentAllYear(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear(), 0, 1)
    _end = new Date(_end.getFullYear() + 1, 0, 1)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  },
  lastYear(dateobj) {
    let _end = dateobj || new Date()
    const start = new Date(_end.getFullYear() - 1, 0, 1)
    _end = new Date(_end.getFullYear(), 0, 1)

    // const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    return [start, _end]
  }
}

export const pickerOptions3 = [{
  text: '一天',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 1)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '一周',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '一个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '三个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '半年',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 180)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '一年',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 365)
    picker.$emit('pick', [start, end])
  }
}]

export const pickerOptions2 = [{
  text: '今天',
  onClick(picker) {
    const end = new Date()
    const start = new Date(end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' 00:00:00')
    const endDay = new Date(end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' 23:59:59')
    picker.$emit('pick', [start, endDay])
  }
}, {
  text: '昨天',
  onClick(picker) {
    const day = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    const end = new Date(day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' 23:59:59')
    const start = new Date(day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' 00:00:00')
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一周',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '本月',
  onClick(picker) {
    let _end = new Date()
    const start = new Date(_end.getFullYear(), _end.getMonth(), 1)
    _end = new Date(_end.getFullYear(), _end.getMonth() + 1, 1)

    const end = new Date(_end.getTime() - 3600 * 1000 * 24)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '上个月',
  onClick(picker) {
    let day = new Date()
    day = new Date(day.getFullYear(), day.getMonth(), 1)
    const start = new Date(day.getFullYear(), day.getMonth() - 1, 1)
    const end = new Date(day.getFullYear(), day.getMonth() - 1, (day.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
    console.log(picker)
  }
}]

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
/** ***
 *
 * DOM相关操作
 *
 */
// ===========事件处理===========
/**
 * 只能输入数字
 * @param {*} event 事件对象
 */
export function keepNumber(event) {
  keepNumberAndPoint(event, 0)
}
export function keepNumberAndPoint(event, pointNum = 2) {
  var hasPoint = !!pointNum
  // enter ctrl+c ctrl+v ctrl+a ctrl+x 应该仍然可以使用
  // 左右、删除、tab键
  if (!(event.keyCode === 46) && !(event.keyCode === 8) && !(event.keyCode === 37) && !(event.keyCode === 39) && !(event.keyCode === 9) && !(event.key === '.' && hasPoint) && !(event.keyCode === 13) &&
    !((event.keyCode === 67 || event.keyCode === 86 || event.keyCode === 65 || event.keyCode === 88) && event.ctrlKey && !event.altKey && !event.shiftKey)
  ) {
    // 数字 小键盘数字
    if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  var el = event.target
  // 如果第一位为小数点，则补0
  el.value = hasPoint ? el.value.replace(/[^0-9.]/g, '').replace(/\./, '*').replace(/\./g, '').replace(/\*/, '.').replace(/^\./, '0.').replace(new RegExp('^(\\d+)\\.(\\d{' + Math.abs(pointNum) + '}).*$'), '$1.$2') : el.value.replace(/\D/g, '').replace(/\./g, '')
}
// element-closest | CC0-1.0 | github.com/jonathantneal/closest
/**
 * 判断dom元素是否匹配某个选择器
 * @param {dom元素} element
 * @param {选择器} selector
 */
export function matches(element, selector) {
  var elements = (element.document || element.ownerDocument).querySelectorAll(selector)
  var index = 0
  while (elements[index] && elements[index] !== element) {
    ++index
  }
  return Boolean(elements[index])
}
/**
 * 获取指定元素最近的匹配选择器的元素
 * @param {dom元素} element
 * @param {选择器} selector
 */
export function closest(element, selector) {
  while (element && element.nodeType === 1) {
    if (matches(element, selector)) {
      return element
    }

    element = element.parentNode
  }

  return null
}
/**
 * 用隐藏iframe的方式下载文件
 * @param {*} url 要导出的链接
 */
export function exportWithIframe(url) {
  let ifr = document.getElementById('downloadiframe')
  if (!ifr) {
    ifr = document.createElement('iframe')
    ifr.id = 'downloadiframe'
    document.body.appendChild(ifr)
  }
  ifr.src = url
}

// 计算总数
// 只计算小数点后两位
export function getTotal() {
  const args = Array.from(arguments)
  return tmsMath._calc('_add', args).result()
  /* let total = 0
  // 先处理成俩位
  // 然后乘以10000
  // 再计算
  // 最后再除以10000返回
  args.map(el => {
    // 保留俩位小数
    el = el || 0
    el = el.toString().replace(/([^.]*)(\.?)(\d)?(\d)?(.*)/, '$1$2$3$4')
    el = ((parseFloat(el, 10) || 0) * 10000).toString().replace('\..*$', '')
    total += parseInt(el, 10)
  })
  console.log('total args:', args, total, 'final:', (total / 10000))
  return (total / 10000) */
}

/**
 * 加载js
 * 返回promise对象
 */
export function loadJs(src, callback) {
  return new Promise((resolve, reject) => {
    var doc = document
    var script = doc.createElement('script')
    var head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement
    script.async = 'async'

    script.onload = script.onreadystatechange = function() {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
      // Handle memory leak in IE
        script.onload = script.onreadystatechange = null

      // Remove the script
        if (head && script.parentNode) {
          head.removeChild(script)
        }

      // Dereference the script
        script = undefined

      // Callback if not abort
        if (callback) {
          callback()
        }
        resolve()
      }
    }

    script.onerror = function(err) {
      reject('加载失败:' + JSON.stringify(err))
    }

    script.src = src
    head.insertBefore(script, head.firstChild)
  })
}

// 数学计算
export const tmsMath = {
  _result: 0,
  _isCalc: false,
  _add(a, b) {
    var c, d, e
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    return e = Math.pow(10, Math.max(c, d)), (this._mul(a, e) + this._mul(b, e)) / e
  },
  _sub(a, b) {
    var c, d, e
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    return e = Math.pow(10, Math.max(c, d)), (this._mul(a, e) - this._mul(b, e)) / e
  },
  _mul(a, b) {
    // console.log(a, b)
    var c = 0,
      d = a.toString(),
      e = b.toString()

    try {
      c += d.split('.')[1].length
    } catch (f) {}
    try {
      c += e.split('.')[1].length
    } catch (f) {}
    return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
  },
  _div(a, b) {
    var c, d, e = 0,
      f = 0
    try {
      e = a.toString().split('.')[1].length
    } catch (g) {}
    try {
      f = b.toString().split('.')[1].length
    } catch (g) {}
    return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), this._mul(c / d, Math.pow(10, f - e))
  },
  _calc(type, arg) {
    const len = arg.length
    var i = 0
    if (!this._isCalc) {
      this._result = 0
    }

    // 如果第一个是除法或者减法计算，则将第一个参数当做除数/减数
    if ((type === '_div' || type === '_sub') && !this._isCalc) {
      this._result = arg[0]
      i = 1
    }

    this._isCalc = true

    let total = this._result

    for (; i < len; i++) {
      // console.log('before calc:' + type, total, arg[i])
      // 当为非数值对象时，则将其转为0
      total = this[type](total, Number(arg[i]) || 0)
      // console.log('calc result:' + type, total)
    }

    this._result = total
    return this
  },
  clear() {
    this._result = 0
    this._isCalc = false
    return this
  },
  result(num = 2) {
    const res = parseFloat(this._result, 10).toFixed(num) || 0
    this._result = 0
    this._isCalc = false
    return parseFloat(res, 10)
  },
  add() {
    this._calc('_add', arguments)
    return this
  },
  sub() {
    this._calc('_sub', arguments)
    return this
  },
  mul() {
    this._calc('_mul', arguments)
    return this
  },
  div() {
    this._calc('_div', arguments)
    return this
  }
}
/**
 * json 数组去重 合计fee
 * @param  {[type]} array [description]
 * @param  {[type]} key   [description]
 */
export const uniqueArray = (array, key) => {
  const result = [array[0]]
  for (let i = 1; i < array.length; i++) {
    const item = array[i]
    let repeat = false
    for (let j = 0; j < result.length; j++) {
      if (item[key] === result[j][key]) {
        repeat = true
        break
      }
    }
    if (!repeat) {
      result.push(item)
    }
  }
  return result
}

export function NumFormat(value){
    if(!value) return '0.00';

    var intPart = Number(value).toFixed(0); //获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断

    var floatPart = ".00"; //预定义小数部分
    var value2Array = value.split(".");

    //=2表示数据有小数位
    if(value2Array.length == 2) {
        floatPart = value2Array[1].toString(); //拿到小数部分

        if(floatPart.length == 1) { //补0,实际上用不着
            return intPartFormat + "." + floatPart + '0';
        } else {
            return intPartFormat + "." + floatPart;
        }

    } else {
        return intPartFormat + floatPart;
    }
}

export function getBetweenDateStr(start,end,type){
    var result = [];
    if(type == 'day'){
        var beginDay = start.split("-");
        var endDay = end.split("-");
        var diffDay = new Date();
        var dateList = new Array;
        var i = 0;
        diffDay.setDate(beginDay[2]);
        diffDay.setMonth(beginDay[1]-1);
        diffDay.setFullYear(beginDay[0]);
        result.push(start);
        while(i == 0){
            var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
            diffDay.setTime(countDay);
            dateList[2] = diffDay.getDate();
            dateList[1] = diffDay.getMonth() + 1;
            dateList[0] = diffDay.getFullYear();
            if(String(dateList[1]).length == 1){dateList[1] = "0"+dateList[1]};
            if(String(dateList[2]).length == 1){dateList[2] = "0"+dateList[2]};
            result.push(dateList[0]+"-"+dateList[1]+"-"+dateList[2]);
            if(dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]){ i = 1;
            }
        };
    }else{
        var start = start.split('-');
        var end = end.split('-');
        var staYear = parseInt(start[0]);
        var staMon = parseInt(start[1]);
        var endYear = parseInt(end[0]);
        var endMon = parseInt(end[1]);
        while (staYear <= endYear) {
            if (staYear === endYear) {
                while (staMon < endMon) {
                    staMon++;
                    result.push(staYear+'-'+staMon);
                }
                staYear++;
            } else {
                staMon++;
                if (staMon > 12) {
                    staMon = 1;
                    staYear++;
                }
                result.push(staYear+'-'+staMon);
            }
        }
    }
    // console.log('所有时间',result);
    return result;
}

export function checkData(day,dayList){ 
    // console.log('tetststststs',day,dayList)
    let result = Array(day.length).fill(0) ;
    day.forEach((item1,i)=>{
        dayList.forEach((item2)=>{
            if(item1 === item2.createTime){
                item2.index = i
            }
        })
    })

    // console.log(dayList);
    // console.log('result',result)
    dayList.forEach((item,i)=>{
        result.fill(dayList[i].payTotal,dayList[i].index,dayList[i].index + 1)
    })
    console.log('result',result)
    return result
}

window.loadedGaodeMapYY = () => {
    window.hadLoaded = true
  }
  /**
   * 加载高德地图
   * @param {boolean} needLoadUI 是否要加载UI库
   */
  export function loadAmap(needLoadUI) {
    return new Promise(resolve => {
    // AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder
    // AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder&callback=loadedGaodeMap
    // =AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder&callback=loadedGaodeMap
    // AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder&callback=loadedGaodeMap
    // 加载ui库的函数
      let loadui = () => {
        if (window.AMapUI) {
          resolve()
        } else {
          loadJs('//webapi.amap.com/ui/1.0/main.js').then(r => {
            resolve()
          })
        }
      }
      if (window.AMap) {
        if (needLoadUI) {
          loadui()
        } else {
          resolve()
        }
      } else {
      // 判断是否有加载好
        let detectFn = () => {
          if (window.hadLoaded) {
            if (needLoadUI) {
              loadui()
            } else {
              resolve()
            }
          } else {
            setTimeout(() => {
              detectFn()
            }, 200)
          }
        }
        // AMap.CitySearch,AMap.Autocomplete,AMap.DistrictSearch,AMap.Geocoder,AMap.OverView,AMap.TruckDriving,AMap.Scale
        // AMap.CitySearch,AMap.Autocomplete,AMap.DistrictSearch,AMap.Geocoder,AMap.OverView,AMap.TruckDriving,AMap.Scale
        loadJs( "https://webapi.amap.com/maps?v=1.4.15&key=73bdb8428fbfe511ed6c5f3328b5734b&plugin=AMap.CitySearch,AMap.Autocomplete,AMap.DistrictSearch,AMap.Geocoder,AMap.OverView,AMap.TruckDriving,AMap.Scale,AMap.MouseTool&callback=loadedGaodeMapYY").then(r => {
          detectFn()
        })
    }
})
}
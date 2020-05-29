const DICT_OBJECT = {
    'fee_status': [],
    'ship_shipIdentifying': {
        '异': '<i title="订单有异常" class="ship-yi"></i>',
        '损': '<i title="订单损坏" class="ship-sun"></i>',
        '诉': '<i title="订单已被投诉" class="ship-su"></i>',
        '违': '<i title="订单存在违规" class="ship-wei"></i>',
        '草': '<i title="订单为草稿单" class="ship-cao"></i>',
    }
  }

// for (const i in $const) {
//     if (typeof $const[i] === 'object') {
//       DICT_OBJECT[(i + '').toLocaleLowerCase()] = Object.entries($const[i]).sort((a, b) => {
//         // 空值一般是"全部"，需要排到最前面
//         return b[0] === '' ? 1 : 0
//       }).map(el => {
//         let obj = {}
//         obj = {
//           id: /\d+/.test(el[0]) ? (parseInt(el[0], 10) || el[0]) : el[0],
//           dictName: el[1]
//         }
//         return obj
//       })
//     }
//   }
//   console.log('DICT_OBJECT:', DICT_OBJECT)
  
//   export default DICT_OBJECT
  
export function parseDict(type, name) {
    if (name === '') {
        return ''
    }
    const find = DICT_OBJECT[type] ? DICT_OBJECT[type].filter(el => {
        return el.id === name
    }) : []
    return find[0] ? find[0].dictName : name
}

export function parseShipStatus(status = '') {
    status = !status ? '' : status
    const arr = status.trim().split(',')
    let res = ''
    arr.map(el => {
        res += DICT_OBJECT['ship_shipIdentifying'][el.trim()] || el.trim()
    })
    return res
}
  
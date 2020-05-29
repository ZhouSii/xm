import { loadJs,loadAmap } from '@/utils/index.js'

export const state = {
  initMap: false,
  citySearch: null,
  geocoder: null,
  overView: null,
  scale: null,
  districtSearch: null,
  truckDriving: null,
  polyline: null,
  redball: null,
  redballUrl: require('@/assets/orderMonitor/redball.png'),
  markerOffset: null,
  infoWindow: null,
  districtRegEx: /\.*城区$|\.*郊县$/,
  getDriverMonitorCountUrl: '/aflc-order/order/AflcDriverMonitor/v1/getDriverMonitorCount',
  queryDriverListUrl: '/aflc-order/order/AflcDriverMonitor/v1/getDriverMonitorList',
  getDriverInfoById: '/aflc-order/order/AflcDriverMonitor/v1/getDriverInfoById',
  getDriverOrderMonitorList: '/aflc-order/order/AflcDriverMonitor/v1/getDriverOrderMonitorList',
  getAflcDriverOrdeTrailrMonitorList: '/aflc-order/order/AflcDriverMonitor/v1/getAflcDriverOrdeTrailrMonitorList',
  expandSize: 100,
  pageSize: 10,
  defaultTx: require('@/assets/orderMonitor/default_tx.png')
}

export const initMap = function(callback) {
  if (state.initMap) {
    callback()
    return
  }
  loadAmap(true).then(() => {
    state.initMap = true
    if (AMap.InfoWindow) {
      state.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        offset: new AMap.Pixel(275, 466)
      })
    }
    if (AMap.Pixel) {
      state.markerOffset = new AMap.Pixel(-60, -75)
    }
    if (AMap.Geocoder) {
      state.geocoder = new AMap.Geocoder()
    }
    if (AMap.OverView) {
      state.overView = new AMap.OverView({
        visible: true
      })
    }
    if (AMap.DistrictSearch) {
      state.districtSearch = new AMap.DistrictSearch({ level: 'city', showbiz: false, subdistrict: 0 })
    }
    if (AMap.CitySearch) {
      state.citySearch = new AMap.CitySearch()
    }
    if (AMap.Scale) {
      state.scale = new AMap.Scale()
    }
    callback()
  })
}

export const dateToString = function(date, isTime) {
  if (!date) {
    return ''
  }
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (isTime == null || isTime === 'date') {
    return (year + '-' + month + '-' + day)
  }

  var hour = date.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  var minute = date.getMinutes()
  if (minute < 10) {
    minute = '0' + minute
  }
  var second = date.getSeconds()
  if (second < 10) {
    second = '0' + second
  }
  return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second)
}

export const escapeHtml = function(text) {
  if (text === null) {
    return ''
  }
  return text.replace(/[<>"&']/g, function(match, pos, originalText) {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case '"':
        return '&quot;'
      case '\'':
        return '&apos;'
    }
  })
}

export const ellipsis = function(text, maxLength) {
  if (text == null) {
    return null
  }
  if (text.length < maxLength) {
    return null
  }
  return (text.substr(0, maxLength) + '...')
}

export const limitNumberInput = function(domId) {
  if (domId == null) {
    return null
  }
  var dom = document.getElementById(domId)
  if (dom == null) {
    return null
  }
  var val = dom.value
  if (val == null) {
    return null
  }
  val = val.replace(/\D+/g, '')
  dom.value = val
  return val
}

export const parseRouteToPath = function(route) {
  var path = []
  var step = null
  var j = 0
  var n = 0
  for (var i = 0, l = route.steps.length; i < l; i++) {
    step = route.steps[i]
    for (j = 0, n = step.path.length; j < n; j++) {
      path.push(step.path[j])
    }
  }
  return path
}

export const computeTime = function(t) {
  if (t == null) {
    return null
  }
  var d = new Date()
  d.setTime(t)
  return (((d.getHours()) * 60 + (d.getMinutes())) * 696 / 1440)
}

export const convertTime = function(p) {
  if (p < 0) {
    return null
  }
  var d = p * 24 / 696
  var h = Math.floor(d)
  var m = Math.round((d - h) * 60)
  if (h < 10) {
    h = '0' + h
  }
  if (m < 10) {
    m = '0' + m
  }
  return (h + ':' + m + ':00')
}

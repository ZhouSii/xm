<template>
    <div id="myChart" :style="{width: '800px', height: '600px'}"></div>
</template>

<script>
    // 引入基本模板
    const echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/line')
    require('echarts/lib/chart/bar')

    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/toolbox')
    require('echarts/lib/component/dataZoom')
    require('echarts/lib/component/legend')

    export default {
      name: 'echarts',
      data() {
        return {
          msg: 'Welcome to Your Vue.js App'
        }
      },
      mounted() {
        this.drawLine()
      },
      methods: {
        drawLine() {
                // 基于准备好的dom，初始化echarts实例
          const myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
          const option = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              orient: 'horizontal', // 'vertical'
              x: 'center', // 'center' | 'left' | {number},
              y: 'top', // 'center' | 'bottom' | {number}
              backgroundColor: '#fff',
              padding: 10,    // [5, 10, 15, 20]
              itemGap: 20,
              textStyle: { color: 'red' },
              data: ['最高', '最低']
            },
            toolbox: {
              show: true,
              orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                                                // 'horizontal' ¦ 'vertical'
              x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
                                                // 'center' ¦ 'left' ¦ 'right'
                                                // ¦ {number}（x坐标，单位px）
              y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                                // 'top' ¦ 'bottom' ¦ 'center'
                                                // ¦ {number}（y坐标，单位px）
              color: ['red', 'blue', 'origin', 'green'],
              backgroundColor: '#fff', // 工具箱背景颜色
              borderColor: '#ccc',       // 工具箱边框颜色
              borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
              padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
              showTitle: true,
              itemGap: 15,
              feature: {
                mark: {
                  show: false,
                  title: {
                    mark: '辅助线-开关',
                    markUndo: '辅助线-删除',
                    markClear: '辅助线-清空'
                  },
                  lineStyle: {
                    width: 1,
                    color: '#1e90ff',
                    type: 'dashed'
                  }
                },
                dataZoom: {
                  show: false,
                  title: {
                    dataZoom: '区域缩放',
                    dataZoomReset: '区域缩放-后退'
                  }
                },
                dataView: {
                  show: true,
                  title: '数据视图',
                  readOnly: true,
                  lang: ['数据视图', '关闭', '刷新'],
                  optionToContent: function(opt) {
                    var axisData = opt.xAxis[0].data
                    var series = opt.series
                    var table = '<table style="width:100%;text-align:center"><tbody><tr>' +
                                            '<td>时间</td>' +
                                            '<td>' + series[0].name + '</td>' +
                                            '<td>' + series[1].name + '</td>' +
                                            '</tr>'
                    for (var i = 0, l = axisData.length; i < l; i++) {
                      table += '<tr>' +
                                            '<td>' + axisData[i] + '</td>' +
                                            '<td>' + series[0].data[i] + '</td>' +
                                            '<td>' + series[1].data[i] + '</td>' +
                                            '</tr>'
                    }
                    table += '</tbody></table>'
                    return table
                  }
                },
                magicType: {
                  show: true,
                  title: {
                    line: '动态类型切换-折线图',
                    bar: '动态类型切换-柱形图'
                                    // stack : '动态类型切换-堆积',
                                    // tiled : '动态类型切换-平铺'stack', 'tiled''
                  },
                  type: ['line', 'bar']
                },
                restore: {
                  show: true,
                  title: '还原',
                  color: 'black'
                },
                saveAsImage: {
                  show: true,
                  title: '保存为图片',
                  type: 'jpeg',
                  lang: ['点击本地保存']
                },
                myTool: {
                  show: false,
                  title: '自定义扩展方法',
                  icon: 'image://../asset/ico/favicon.png',
                  onclick: function() {
                    alert('myToolHandler')
                  }
                }
              }
            },
            calculable: false,
            dataZoom: {
              show: false,
              realtime: true,
              start: 20,
              end: 80
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: (function() {
                  var list = []
                  for (var i = 1; i <= 30; i++) {
                    list.push('2013-03-' + i)
                  }
                  return list
                }())
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '最高',
                type: 'line',
                data: (function() {
                  var list = []
                  for (var i = 1; i <= 30; i++) {
                    list.push(Math.round(Math.random() * 300))
                  }
                  return list
                }())
              },
              {
                name: '最低',
                type: 'line',
                data: (function() {
                  var list = []
                  for (var i = 1; i <= 30; i++) {
                    list.push(Math.round(Math.random() * 100))
                  }
                  return list
                }())
              }
            ]
          }
          myChart.setOption(option)
        }
      }
    }

</script>

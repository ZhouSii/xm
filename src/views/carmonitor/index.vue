<!--suppress ALL -->
<template>
  <div ref="rootDiv" style="position: relative;width: 100%;height: 100%;overflow: auto">
    <div style="position: relative;min-width: 1000px;min-height: 800px;width: 100%;height: 100%">
      <div id="map"></div>
      <div class="ctlPanel">
        <el-collapse v-model="activePanels">
          <el-collapse-item title="28快运车辆跟踪" name="1">
            <div style="height: 505px;">
              <div style="display: flex;height: 40px;border-bottom: 1px solid #ccc;background-color: #2398ff">
                <div :class="{tab:true,tabCanClick:(activeTab!==1)}" @click="clickTab(1)">
                  <div
                    style="position: absolute;left:53px;top:11px;height: 18px;line-height: 18px">
                    <img src="../../assets/orderMonitor/monitor.png" style="width: 14px">
                  </div>
                  <div
                    style="position: absolute;left:81px;bottom: -1px;height: 9px;line-height: 9px"
                    v-show="(activeTab===1)">
                    <img src="../../assets/orderMonitor/pointer.png">
                  </div>
                  实时跟踪
                </div>
                <div :class="{tab:true,tabCanClick:(activeTab!==2)}" @click="clickTab(2)">
                  <div
                    style="position: absolute;left:53px;top:11px;height: 18px;line-height: 18px">
                    <img src="../../assets/orderMonitor/track.png" style="width: 14px">
                  </div>
                  <div
                    style="position: absolute;left:81px;bottom: -1px;height: 9px;line-height: 9px"
                    v-show="(activeTab===2)">
                    <img src="../../assets/orderMonitor/pointer.png">
                  </div>
                  轨迹查询
                </div>
              </div>

              <div v-show="(activeTab===1)">
                <div style="padding: 5px 20px;">
                  <el-input placeholder="车牌号/车主姓名/手机号" v-model.trim="searchTxt" size="small"
                            clearable @keyup.enter.native="searchMonitor(1)">
                    <el-button slot="append" icon="el-icon-search" class="searchIcon"
                               @click="searchMonitor(1)"></el-button>
                  </el-input>
                </div>

                <div style="display: flex;padding: 5px 5px 0;border-bottom: 1px solid #eee;margin-top: 4px">
                  <div
                    :class="{onlineTab:true,onlineTabActive:(onlineTabFocus===index),tabCanClick:(onlineTabFocus!==index)}"
                    v-for="(item, index) in onlineTabs" @click="clickOnlineTab(index)" :key="index">
                    <el-badge :value="item.count" :max="9999999">
                      {{item.label}}
                    </el-badge>
                  </div>
                </div>

                <div style="height: 340px;margin-top: 2px">
                  <div
                    :class="{searchList:true,tabCanClick:(searchResultFocus!==index),isActive:(searchResultFocus===index)}"
                    v-for="(item,index) in searchList" @click="clickSearchResult(index)" v-show="searchList.length>0"
                    :key="index">
                    <div class="carIcon"><img :src="('./static/cartype/'+item.icon)"
                                              style="height: 23px;position: absolute"></div>
                    <div class="carNum" :title="item.carNumber">{{item.carNumber}}</div>
                    <div class="driverName" :title="item.driverName" >{{item.driverName}}</div>
                    <div class="mobile" :title="item.driverMobile">{{item.driverMobile}}</div>
                    <div class="status" :title="item.driverOnLineStateName">{{item.driverOnLineStateName}}</div>
                  </div>
                  <div v-show="searchList.length<1" style="padding: 30px">{{tip}}</div>
                </div>

                <div style="display: flex;justify-content: center;align-items: center" v-show="searchList.length>0">
                  <el-pagination
                    :page-size="10" :pager-count="5"
                    layout="prev, pager, next"
                    :total="monitorTotal" :current-page.sync="monitorCurrentPage" @current-change="monitorPageChange">
                  </el-pagination>
                </div>

                <div class="pager" v-show="searchList.length>0">
                  <el-pagination
                    :page-size="10" :pager-count="5"
                    layout="total,jumper"
                    :total="monitorTotal" :current-page.sync="monitorCurrentPage" @current-change="monitorPageChange">
                  </el-pagination>
                </div>
              </div>

              <div v-show="(activeTab===2)">
                <div style="padding: 5px 20px 0;cursor: pointer">
                  <!-- <el-date-picker style="width: 100%"
                                  v-model="chooseDate"
                                  type="date" :picker-options="pickerOptions1"
                                  placeholder="选择日期" size="small" :editable="false">
                  </el-date-picker> -->
                </div>

                <div style="padding: 5px 20px;" v-if="showSearchBox">
                  <el-input placeholder="车牌号/车主姓名/手机号" v-model.trim="searchTxt" size="small"
                            clearable @keyup.enter.native="searchTrack(1)">
                    <el-button slot="append" icon="el-icon-search" class="searchIcon"
                               @click="searchTrack(1)"></el-button>
                  </el-input>
                </div>

                <div style="height: 340px">
                  <div
                    :class="{searchList:true,tabCanClick:(searchResultFocus!==index),isActive:(searchResultFocus===index)}"
                    v-for="(item,index) in searchList" @click="clickSearchResult(index)" v-show="searchList.length>0"
                    :key="index">
                    <div class="carIcon"><img :src="('./static/cartype/'+item.icon)"
                                              style="height: 23px;position: absolute;left: 0;top:0"></div>
                    <div class="carNum" :title="item.carNumber">{{item.carNumber}}</div>
                    <div class="driverName" :title="item.driverName">{{item.driverName}}</div>
                    <div class="mobile" :title="item.driverMobile">{{item.driverMobile}}</div>
                    <div class="status" :title="item.driverOnLineStateName">{{item.driverOnLineStateName}}</div>
                  </div>
                  <div v-show="searchList.length<1" style="padding: 30px">{{tip}}</div>
                </div>

                <div style="display: flex;justify-content: center;align-items: center" v-show="searchList.length>0">
                  <el-pagination
                    :page-size="10" :pager-count="5"
                    layout="prev, pager, next"
                    :total="monitorTotal" :current-page.sync="monitorCurrentPage" @current-change="trackPageChange">
                  </el-pagination>
                </div>

                <div class="pager" style="" v-show="searchList.length>0">
                  <el-pagination
                    :page-size="10" :pager-count="5"
                    layout="total,jumper"
                    :total="monitorTotal" :current-page.sync="monitorCurrentPage" @current-change="trackPageChange">
                  </el-pagination>
                </div>

              </div>

            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div ref="timeLineBar" class="timeLineBar" v-show="(activeTab===2)">
        <div style="width: 130px">
          <div class="playBtn" @click="playTrack" v-show="!playTrackStatus"></div>
          <div class="stopBtn" @click="stopPlayTrack" v-show="playTrackStatus"></div>
        </div>
        <!--div class="slow"></div>
        <div class="faster"></div-->
        <div style="position: relative;cursor: pointer" @mousemove="showTimeTip" @mouseout="hideTimeTip"
             @click="chooseTime">
          <div ref="timeTipDiv" style="position: absolute;top:-30px;left:-25px;display: none">
            <div ref="timeTip" class="timeTip"></div>
            <div class="timeTipPointer"></div>
          </div>
          <template v-for="n in 24">
            <div :class="['hour',n===1?'hourStart':'',n===24?'hourEnd':'']"></div>
          </template>
          <div style="position: absolute;left: -3px;top:30px;display: flex;font-size: 13px">
            <template v-for="n in 24">
              <div class="hourNumber">{{n-1}}</div>
            </template>
            <div>24</div>
          </div>
          <div class="startLine">
            <div class="startFlag"></div>
          </div>
          <div class="endLine">
            <div class="endFlag"></div>
          </div>
          <div class="timePointer" :style="{left:timePointerPos,'transition-duration':timePointerDur}"></div>
        </div>
      </div>

      <div class="cityList" @click="showSearchCity=!showSearchCity">
        {{city}}<i :class="[showSearchCity?'el-icon-caret-top':'el-icon-caret-bottom', 'el-icon--right']"></i>
      </div>
      <div class="searchCity" v-show="showSearchCity">
        <div style="position: absolute;right: 2px;top:2px">
          <div class="el-icon-close" style="cursor: pointer;font-size: 18px" @click="showSearchCity=false"></div>
        </div>
        <div style="position: relative;">

          <div style="display: flex">
            当前城市:
            <div class="cityName" :title="city">{{city}}</div>
            <span class="relocateBtn" @click="relocateCity">重新定位</span>
          </div>
          <div style="position: relative;margin-top: 10px;width: 100%">
            <el-autocomplete v-model.trim="cityKeyword" :fetch-suggestions="searchCity"
                             placeholder="请输入内容搜索城市名" :trigger-on-focus="false" size="small"
                             @select="selectCity"><i class="el-icon-circle-close" slot="suffix"
                                                     style="line-height: 32px;cursor: pointer"
                                                     @click="cityKeyword=''"
                                                     v-show="cityKeyword!=null&&cityKeyword!==''"></i></el-autocomplete>
          </div>
        </div>
      </div>

      <div id="custInfoWindow" style="display: none">
        <div style="box-shadow: 2px 2px 4px 0 rgba(153, 153, 153, 0.5);">
          <div class="el-icon-close"
               style="position: absolute;right: 5px;top: 9px;font-size: 23px;cursor: pointer;color: white"
               onclick="closeInfoWindow()"></div>

          <div
            style="background-color:#0a8cff;color: white;font-size: 14px;">
            <div style="display: flex;justify-content: center">
              <div style="display: flex;padding: 14px;cursor: pointer" onclick="viewDriver()">
                <div id="carNumber" style="max-width: 120px" class="ellipsis"></div>
                <div id="carTypeName"
                     style="margin-left: 10px;max-width: 100px" class="ellipsis"></div>
                <div id="carSpecName" style="margin-left: 10px;max-width: 100px" class="ellipsis"></div>
                <div id="driverOnLineStateName"
                     style="margin-left: 10px;max-width: 100px" class="ellipsis"></div>
              </div>
            </div>
          </div>

          <div class="infoWindowTopDiv">
            <div style="display: flex;padding:15px 10px 20px;border-bottom: 1px solid rgb(238, 238, 238)">
              <div style="width: 120px;margin-right: 20px">
                <div style="width: 120px;height:60px;display: flex;justify-content: center;justify-items: center"><img
                  id="personalImageFile"
                  style="width: 60px;max-height: 60px;overflow: hidden">
                </div>
                <div style="width: 90px;margin: 10px auto 0;cursor: pointer" onclick="sendMessage()">
                  <img src="/static/monitor/message.png">
                </div>
                <div style="width: 90px;margin: 0 auto;cursor: pointer" onclick="callPhone()">
                  <img src="/static/monitor/phonecall.png">
                </div>
              </div>

              <div>
                <div style="display: flex;margin-top: 10px">
                  <div id="driverName" style="max-width: 100px;color: #0a8cff;cursor: pointer" class="ellipsis"
                       onclick="viewDriver()"></div>
                  <div id="driverMobile"
                       style="max-width: 100px;margin-left: 20px;color:rgb(10, 140, 255);cursor: pointer;" class="ellipsis" onclick="CarLine()"></div>
                  <div id="driverStatusName"
                       style="max-width: 85px;margin-left: 20px;color: #f56c6c" class="ellipsis"></div>
                </div>

                <div style="display: flex;margin-top: 20px">
                  <div style="width: 95px">最新定位时间:</div>
                  <div id="uploadTimeName" style="max-width: 150px" class="ellipsis"></div>
                </div>

                <div style="display: flex;margin-top: 20px">
                  <div style="width: 95px">最新定位地址:</div>
                  <div id="lastPosition"
                       style="width: 230px;height: 30px;overflow: hidden;text-overflow: ellipsis"></div>
                </div>

              </div>
            </div>

            <div style="padding: 25px 10px 10px" id="orderDetail">
              <div style="display: flex">
                <div class="orderLabel">订单号:</div>
                <div id="orderSerial" style="margin-left: 5px;max-width: 220px;color: #0a8cff;cursor: pointer"
                     class="ellipsis"
                     onclick="viewOrder()">
                </div>
                <div id="serviceTypeName" style="max-width: 70px;margin-left: 5px"
                     class="ellipsis"></div>
                <div id="orderStatusName" style="margin-left: 20px;color: #f56c6c;max-width: 110px"
                     class="ellipsis"></div>
              </div>

              <div style="display: flex;margin-top: 20px">
                <div class="orderLabel">客户:</div>
                <div id="shipperMobile" style="margin-left: 5px;max-width: 100px;margin-right: 20px"
                     class="ellipsis"></div>
                <div id="shipperName" style="max-width: 60px;margin-right: 20px" class="ellipsis"></div>
                <div id="companyName" style="max-width: 200px" class="ellipsis"></div>
              </div>

              <div style="display: flex;margin-top: 20px">
                <div class="orderLabel">用车时间:</div>
                <div id="useCarTimeStr" style="margin-left: 5px;max-width: 200px" class="ellipsis"></div>
              </div>

              <div style="display: flex;margin-top: 20px">
                <div class="orderLabel">提货地:</div>
                <div id="addressFrom" style="margin-left: 5px;max-width: 390px" class="ellipsis"></div>
              </div>

              <div id="addressBy2" style="display: flex;margin-top: 20px">
                <div class="orderLabel">途经地:</div>
                <div id="addressBy" style="margin-left: 5px;max-width: 390px" class="ellipsis"></div>
              </div>

              <div style="display: flex;margin-top: 20px">
                <div class="orderLabel">目的地:</div>
                <div id="addressTo" style="margin-left: 5px;max-width: 390px" class="ellipsis"></div>
              </div>

              <div style="display: flex;margin-top: 20px">
                <div class="viewTrack" onclick="viewOrderTrail()">点击查看订单轨迹</div>
              </div>

              <div id="addressBy3" style="display: flex;margin-top: 20px;height: 16px">
              </div>

            </div>

            <div style="padding: 100px;display: none;text-align: center" id="noOrderDetail">无订单数据</div>

            <div id="orderPager" style="display: none">
              <div style="display: flex;margin-top: 20px">
                <div style="display: flex;margin: 0 auto">
                  共
                  <div id="orderTotalCount"></div>
                  条
                  <div class="el-icon-arrow-left pager" onclick="preOrderPage()"></div>
                  <div style="margin-left: 10px">前往</div>
                  <input id="orderCurrentPage" class="el-input__inner orderCurrentPage" type="number"
                         onblur="toOrderPage()" onkeyup="toOrderPage2()">
                  页
                  <div class="el-icon-arrow-right pager" onclick="nextOrderPage()"></div>
                </div>
              </div>
            </div>

          </div>
        </div>


      </div>

    </div>
  </div>
</template>

<script>
  import {
    computeTime,
    convertTime,
    dateToString,
    ellipsis,
    escapeHtml,
    initMap,
    limitNumberInput,
    parseRouteToPath,
    state
  } from '@/views/carmonitor/common.js'
  import fetch from '@/utils/fetch.js'

  export default {
    name: 'carmonitor',
    data() {
      return {
        mp: null,
        city: '定位中...',
        adcode: null,
        adcodeList: null,
        citySearch: null,
        districtSearch: null,
        truckDriving: null,
        redballMove: 0,
        redballMoveOld: -1,
        routes: null,
        routesIdx: 0,
        showSearchCity: false,
        timePointerPos: '-20px',
        timePointerPos2: 0,
        timePointerDur: '0s',
        timePointerObj: null,
        timePointerCounter: 0,
        playTrackStatus: false,
        stopPlayTrackStatus: false,
        cityKeyword: '',
        tip: '加载中,请稍候...',
        activePanels: ['1'],
        activeTab: 1,
        monitorOnlineState: '1',
        monitorTotal: 0,
        onlineTabs: [{ label: '全部', count: 0 }, {
          label: '在线',
          count: 0
        }, { label: '离线', count: 0 }],
        onlineTabFocus: 1,
        showSearchBox: false,
        searchTxt: '',
        searchResultFocus: -1,
        searchList: [],
        searchExpandList: [],
        driverId: null,
        orderSerial: null,
        orderCurrentPage: 1,
        allMarkers: [],
        marker: null,
        infoWindow: null,
        searchListCounter: 1,
        markerOffset: null,
        monitorCurrentPage: 1,
        chooseDate: new Date(),
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 86400000)
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    computed: {
      chooseDateStr() {
        return dateToString(this.chooseDate, 'date')
      },
      chooseDateTimeStr() {
        return this.chooseDateStr + ' 00:00:00'
      }
    },
    watch: {
      city: function(val) {
        if (val !== '定位中...') {
          this.search()
        }
      }
    },
    methods: {
      loadMap() {
        initMap(() => {
          var mp = this.mp = new AMap.Map('map', {
            resizeEnable: true
          })
          this.initCitySearch()
          if (state.infoWindow) {
            this.infoWindow = state.infoWindow
            var dom = document.getElementById('custInfoWindow')
            this.infoWindow.setContent(dom.innerHTML)
            dom.innerHTML = ''
          }
          if (state.scale) {
            mp.addControl(state.scale)
          } else {
            setTimeout(() => {
              if (AMap.Scale) {
                state.scale = new AMap.Scale()
              }
              this.mp.addControl(state.scale)
            }, 5000)
          }
          if (state.overView) {
            mp.addControl(state.overView)
          } else {
            setTimeout(() => {
              if (AMap.OverView) {
                state.overView = new AMap.OverView({
                  visible: true
                })
                this.mp.addControl(state.overView)
              }
            }, 5000)
          }

          // mp.on('moveend', evt => {
          //   this.locate2()
          // })
        })
      },
      initCitySearch() {
        if (state.citySearch) {
          this.citySearch = state.citySearch
          this.locate(() => {
            //this.searchDriver('1', this.monitorOnlineState, this.searchTxt, null, 1, state.pageSize, state.expandSize, 1)
          })
        } else {
          if (AMap.CitySearch) {
            state.citySearch = new AMap.CitySearch()
            this.initCitySearch()
          } else {
            if (this.searchListCounter !== 1) {
              return
            }

            setTimeout(() => {
              this.initCitySearch()
            }, 1000)
          }
        }
      },
      markTimePointerCounter() {
        if (this.timePointerCounter >= Number.MAX_VALUE) {
          this.timePointerCounter = 0
        }
        ++this.timePointerCounter
      },
      search() {
        if (this.activeTab === 2) {
          this.searchTrack(1)
        } else {
          this.searchMonitor(1)
        }
      },
      searchTrack(curPage) {
        this.tip = '加载中,请稍候...'
        this.playTrackStatus = false
        if (!curPage) {
          curPage = 1
        }
        this.monitorCurrentPage = curPage
        this.searchList = []
        this.searchExpandList = []
        this.marker = null
        this.routes = null
        this.removeMarkers()
        this.closeInfoWindow()

        this.markTimePointerCounter()
        this.timePointerDur = '0s'
        this.chooseTime2(0)

        this.searchResultFocus = -1
        this.monitorTotal = 0
        if (this.searchListCounter >= Number.MAX_VALUE) {
          this.searchListCounter = 0
        }
        var counter = ++this.searchListCounter
        this.searchDriver('2', null, this.searchTxt, null, this.monitorCurrentPage, state.pageSize, state.expandSize, counter)
      },
      searchMonitor(curPage) {
        this.tip = '加载中,请稍候...'
        if (!curPage) {
          curPage = 1
        }
        this.monitorCurrentPage = curPage
        this.searchList = []
        this.searchExpandList = []
        this.marker = null
        this.routes = null
        this.removeMarkers()
        this.closeInfoWindow()
        this.searchResultFocus = -1
        this.monitorTotal = 0
        this.onlineTabs[0].count = 0
        this.onlineTabs[1].count = 0
        this.onlineTabs[2].count = 0
        if (this.searchListCounter >= Number.MAX_VALUE) {
          this.searchListCounter = 0
        }
        var counter = ++this.searchListCounter
        this.searchDriver('1', this.monitorOnlineState, this.searchTxt, null, this.monitorCurrentPage, state.pageSize, state.expandSize, counter)
      },
      searchDriver(queryType, onlineState, keyword, coordinateDate, currentPage, pageSize, expandSize, counter) {
        //'1':实时监控；'2':轨迹查询
        //在线状态('0':离线；'1':在线；不传，查全部)
        if (counter === null) {
          counter = 1
        }
        if (this.adcode) {
          if (queryType === null) {
            queryType = '1'
          }

          if (keyword === '') {
            keyword = null
          }

          //查数量
          if (queryType === '1') {
            setTimeout(() => {
              var vo = {
                belongCity: this.adcode,
                queryType: queryType
              }
              if (keyword) {
                vo.keywordQuery = keyword
              }
              fetch.post(state.getDriverMonitorCountUrl, vo).then(res => {
                try {
                  if (counter !== this.searchListCounter) {
                    return
                  }

                  if (res.data) {
                    this.onlineTabs[0].count = res.data.allCount
                    this.onlineTabs[1].count = res.data.onLineCount
                    this.onlineTabs[2].count = res.data.unLineCount
                  } else {
                    this.onlineTabs[0].count = 0
                    this.onlineTabs[1].count = 0
                    this.onlineTabs[2].count = 0
                  }
                } catch (e) {
                  this.$message.warning('从服务器端获取数据失败，请稍后再试.')
                }
              }).catch(res => {
                if (counter !== this.searchListCounter) {
                  return
                }

                this.onlineTabs[0].count = 0
                this.onlineTabs[1].count = 0
                this.onlineTabs[2].count = 0
              })
            }, 0)
          }

          //查列表
          setTimeout(() => {
            if (!currentPage) {
              currentPage = 1
            }
            if (!pageSize) {
              pageSize = 10
            }
            var vo = {
              belongCity: this.adcode,
              queryType: queryType
            }
            if (keyword) {
              vo.keywordQuery = keyword
            }
            if (queryType === '2') {
              if (coordinateDate == null) {
                vo.coordinateDate = this.chooseDateStr
              } else {
                vo.coordinateDate = dateToString(coordinateDate)
              }
            }
            if (onlineState) {
              vo.onlineState = onlineState
            }
            if (expandSize) {
              vo.expandSize = expandSize
            }
            fetch.post(state.queryDriverListUrl, {
              currentPage: currentPage,
              pageSize: pageSize,
              vo: vo
            }).then(res => {
              if (counter !== this.searchListCounter) {
                return
              }
              try {
                var data = res.data
                if (data && data.list !== null) {
                  this.monitorTotal = data.totalCount
                  this.monitorCurrentPage = data.currentPage
                  this.searchExpandList = data.list.filter(item => {
                    var icon = null
                    if (item.carType === 'AF01801') {
                      icon = 'xmb_'
                    } else if (item.carType === 'AF01802') {
                      icon = 'zmb_'
                    } else if (item.carType === 'AF01803') {
                      icon = 'xhc_'
                    } else if (item.carType === 'AF01804') {
                      icon = 'dhc_'
                    } else {
                      icon = 'xmb_'
                    }
                    if (item.driverOnLineState === '0') {
                      //离线
                      item.icon = icon + 'lost.svg'
                    } else if (item.driverOnLineState === '1') {
                      //等待接单
                      item.icon = icon + 'idle.svg'
                    } else if (item.driverOnLineState === '2') {
                      //忙碌中
                      item.icon = icon + 'busy.svg'
                    } else {
                      item.icon = icon + 'lost.svg'
                    }
                    return true
                  })
                  if (this.searchExpandList.length <= 10) {
                    this.searchList = this.searchExpandList
                  } else {
                    this.searchList = this.searchExpandList.slice(0, 10)
                  }
                  if (data.totalCount < 1) {
                    this.tip = '查询无数据'
                  }
                  this.displayMarkers()
                } else {
                  this.tip = '从服务器端获取数据失败，请稍后重试.'
                }
              } catch (e) {
                this.tip = '从服务器端获取数据失败，请稍后重试.'
              }
            }).catch(res => {
              if (counter !== this.searchListCounter) {
                return
              }
              this.tip = '从服务器端获取数据失败，请稍后重试.'
            })
          }, 0)
        } else {
          if (counter !== this.searchListCounter) {
            return
          }
          this.tip = '获取城市名失败，请稍后重试.'
        }
      },
      displayMarkers() {
        if (!this.mp) {
          return
        }
        if (!this.markerOffset) {
          if (state.markerOffset) {
            this.markerOffset = state.markerOffset
          } else {
            if (AMap.Pixel) {
              state.markerOffset = new AMap.Pixel(-60, -75)
              this.markerOffset = state.markerOffset
            } else {
              this.$message.warning('有错误产生，无法在地图上显示车辆，请稍后重试.')
              return
            }
          }
        }
        var list = this.searchExpandList
        if (list === null) {
          return
        }
        var len = list.length
        var marker = null
        var obj = null
        var carNumber = null
        var allMarkers = []
        for (var i = 0; i < len; ++i) {
          try {
            obj = list[i]
            carNumber = escapeHtml(obj.carNumber)
            obj.idx = i
            if (obj.longitude == null || obj.latitude == null) {
              marker = new AMap.Marker({
                position: null,
                extData: obj
              })
            } else {
              marker = new AMap.Marker({
                content: '<div class=\'carIcon2\' title=\'' + carNumber + '\'><div class=\'carNum2\'>' + carNumber + '</div><img src="./static/cartype/' + obj.icon + '"></div>',
                offset: this.markerOffset,
                position: new AMap.LngLat(obj.longitude, obj.latitude),
                map: this.mp,
                extData: obj
              })
              marker.on('click', this.markerClick)
              allMarkers.push(marker)
            }
            obj.marker = marker
          } catch (e) {
          }
        }
        this.allMarkers = allMarkers
        this.mp.setFitView(allMarkers)
      },
      markerClick(e) {
        this.clear()
        this.marker = null
        this.routes = null
        var marker = e.target
        if (!marker || !this.mp) {
          return
        }
        var pos = marker.getPosition()
        if (pos == null) {
          this.$message.warning('该车主没有行驶轨迹.')
          var pixel = new AMap.Pixel(450, 200)
          pos = this.mp.containerToLngLat(pixel)
        } else {
          var pixel = this.mp.lngLatToContainer(pos)
          var x = 450 - (pixel.getX())
          var y = 200 - (pixel.getY())
          if (x < 0) {
            x = 0
          }
          if (y < 0) {
            y = 0
          }
          if (x > 0 || y > 0) {
            this.mp.panBy(x, y)
          }
        }
        if (pos) {
          this.infoWindow.open(this.mp, pos)
        }
        var obj = marker.getExtData()
        if (obj && obj.idx !== null) {
          this.marker = obj
          if (obj.idx < state.pageSize) {
            this.searchResultFocus = obj.idx
          } else {
            this.searchResultFocus = -1
          }
        }
        this.initInfoWindow()
      },
      initInfoWindow() {
        var domList = ['carNumber', 'carTypeName', 'carSpecName',
          'driverOnLineStateName', 'driverName', 'driverMobile', 'driverStatusName',
          'uploadTimeName', 'lastPosition', 'orderDetail', 'noOrderDetail', 'orderSerial',
          'serviceTypeName', 'orderStatusName', 'shipperName', 'shipperMobile',
          'companyName', 'useCarTimeStr', 'addressFrom', 'addressBy', 'addressTo', 'orderTotalCount'
          , 'orderPager', 'orderCurrentPage']
        var dom = null
        var len = domList.length
        for (var i = 0; i < len; ++i) {
          dom = document.getElementById(domList[i])
          if (dom == null) {
            setTimeout(() => {
              this.initInfoWindow()
            }, 100)
            return
          }
        }
        var obj = this.marker
        if (!obj) {
          obj = {}
        }
        this.resetValueObj(['orderSerial', 'serviceTypeName', 'orderStatusName', 'shipperName',
          'shipperMobile', 'companyName', 'useCarTimeStr', 'addressFrom', 'addressBy', 'addressTo'
          , 'orderTotalCount', 'orderCurrentPage'], obj)
        var uploadTime = obj.uploadTime
        if (uploadTime != null && uploadTime > 0) {
          var date = new Date()
          date.setTime(uploadTime)
          obj.uploadTimeName = dateToString(date, 'time')
        }
        obj.lastPosition = ''
        if (obj.longitude !== null && obj.latitude !== null) {
          var lnglat = [obj.longitude, obj.latitude]
          this.geocoder(lnglat, (status, result, address) => {
            if (!address) {
              return
            }
            var temp = ellipsis(address, 30)
            if (temp != null) {
              obj.lastPosition_disp = temp
            }
            obj.lastPosition = address
            var domList2 = ['lastPosition']
            this.initInfoWindow4Val(domList2, obj, 'char')
          })
        }
        var driverId = obj.driverId
        if (driverId != null) {
          this.driverId = driverId
          fetch.get(state.getDriverInfoById, {
              params:
                {
                  driverId: driverId
                }
            }
          ).then(res => {
            try {
              var data = res.data
              if (data) {
                obj.driverStatusName = data.driverStatusName
                obj.carSpecName = data.carSpecName
                var domList2 = ['driverStatusName', 'carSpecName']
                this.initInfoWindow4Val(domList2, obj, 'char')

                if (data.personalImageFile) {
                  obj.personalImageFile = data.personalImageFile
                } else {
                  obj.personalImageFile = state.defaultTx
                }
                domList2 = ['personalImageFile']
                this.initInfoWindow4Val(domList2, obj, 'pic')
              } else {
                this.$message.warning('从服务器端获取数据失败，请稍后再试.')
              }
            } catch (e) {
            }
          }).catch(res => {
            this.$message.warning('从服务器端获取数据失败，请稍后再试.')
          })

          this.fetchOrder(1, 1, driverId)
          this.orderCurrentPage = 1
        }
        domList = ['carNumber', 'carTypeName', 'carSpecName', 'driverOnLineStateName', 'driverName',
          'driverMobile', 'uploadTimeName', 'lastPosition', 'orderSerial', 'serviceTypeName',
          'orderStatusName', 'shipperName', 'shipperMobile', 'companyName', 'useCarTimeStr'
          , 'addressFrom', 'addressBy', 'addressTo', 'orderTotalCount', 'orderCurrentPage']
        this.initInfoWindow4Val(domList, obj, 'char')
      },
      fetchOrder(currentPage, pageSize, driverId) {
        if (driverId == null) {
          return
        }
        if (currentPage < 1) {
          currentPage = 1
        }
        fetch.post(state.getDriverOrderMonitorList, {
          currentPage: currentPage,
          pageSize: pageSize,
          vo: { driverId: driverId }
        }).then(res => {
            try {
              var data = res.data
              if (data) {
                var totalCount = data.totalCount
                if (totalCount < 1) {
                  document.getElementById('orderDetail').style.display = 'none'
                  document.getElementById('orderPager').style.display = 'none'
                  document.getElementById('noOrderDetail').style.display = 'block'
                  return
                } else {
                  document.getElementById('orderDetail').style.display = 'block'
                  document.getElementById('orderPager').style.display = 'block'
                  document.getElementById('noOrderDetail').style.display = 'none'
                }
                var list = data.list
                if (list.length < 1) {
                  // this.$message.warning('服务器端未返回数据，请稍后再试.')
                  this.processOrderCurrentPage()
                  return
                } else {
                  var domList2 = ['orderSerial', 'serviceTypeName', 'orderStatusName', 'shipperName',
                    'shipperMobile', 'companyName', 'useCarTimeStr', 'addressFrom', 'addressBy',
                    'addressTo', 'orderTotalCount']
                  var obj2 = list[0]
                  if (obj2 == null) {
                    return
                  }
                  obj2.orderTotalCount = totalCount
                  obj2.orderCurrentPage = data.currentPage
                  this.orderCurrentPage = data.currentPage
                  this.orderSerial = obj2.orderSerial
                  var v = obj2.serviceTypeName
                  if (v != null) {
                    obj2.serviceTypeName = '(' + v + ')'
                  }

                  v = obj2.useCarTime
                  if (v != null) {
                    var d = new Date()
                    d.setTime(v)
                    obj2.useCarTimeStr = dateToString(d, 'time')
                  }

                  //提货地、途经地、目的地数组
                  v = obj2.aflcOrderAddressList
                  if (v != null) {
                    try {
                      var len = v.length
                      if (len > 0) {
                        obj2.addressFrom = v[0].viaAddressName
                      }
                      if (len > 1) {
                        obj2.addressTo = v[len - 1].viaAddressName
                      }
                      if (len > 2) {
                        document.getElementById('addressBy2').style.display = 'flex'
                        document.getElementById('addressBy3').style.display = 'none'
                        len -= 1
                        for (var i = 1; i < len; ++i) {
                          if (i === 1) {
                            obj2.addressBy = v[i].viaAddressName
                          } else {
                            obj2.addressBy += ' >> ' + v[i].viaAddressName
                          }
                        }
                      } else {
                        obj2.addressBy = '无'
                        document.getElementById('addressBy2').style.display = 'none'
                        document.getElementById('addressBy3').style.display = 'flex'
                      }
                    } catch (e) {
                    }
                  }

                  this.initInfoWindow4Val(domList2, obj2, 'char')
                  domList2 = ['orderCurrentPage']
                  this.initInfoWindow4Val(domList2, obj2, 'input')
                }
              } else {
                this.$message.warning('从服务器端获取数据失败，请稍后再试.')
                this.processOrderCurrentPage()
              }
            } catch (e) {
            }
          }
        ).catch(res => {
          this.$message.warning('从服务器端获取数据失败，请稍后再试.')
        })
      },
      processOrderCurrentPage() {
        var obj = { orderCurrentPage: ((this.orderCurrentPage == null) ? 1 : (this.orderCurrentPage)) }
        var domList = ['orderCurrentPage']
        this.initInfoWindow4Val(domList, obj, 'input')
      },
      initInfoWindow4Val(domList, valueObj, cate) {
        //cate  'char':文字  'pic':图片  'input':文本框
        if (domList == null || domList.length < 1) {
          return
        }
        var v = null
        var v_disp = null
        var k = null
        var len = domList.length
        var dom = null
        if (!valueObj) {
          valueObj = {}
        }
        for (var i = 0; i < len; ++i) {
          k = domList[i]
          dom = document.getElementById(k)
          if (!dom) {
            continue
          }
          v = valueObj[k]
          if (v == null) {
            v = ''
          }
          if (cate === 'char') {
            v_disp = valueObj[k + '_disp']
            if (v_disp == null) {
              dom.innerText = v
            } else {
              dom.innerText = v_disp
            }
            dom.title = v
          } else if (cate === 'pic') {
            dom.src = v
          } else if (cate === 'input') {
            dom.value = v
          }
        }
      },
      // 车主轨迹
      CarLine(){
        this.$router.push({ name: '获取车主轨迹', query: { driverId: this.driverId } })
      },
      viewDriver() {
        if (this.driverId == null) {
          this.$message.warning('无法获取车主信息，请稍后再试.')
          return
        }
        this.$router.push({ name: '车主详情', query: { driverId: this.driverId } })
      },
      viewOrder() {
        if (this.orderSerial == null) {
          this.$message.warning('无法获取订单号，请稍后再试.')
          return
        }
        this.$router.push({ name: '订单详情', query: { orderSerial: this.orderSerial } })
      },
      viewOrderTrail() {
        if (this.orderSerial == null) {
          this.$message.warning('无法获取订单号，请稍后再试.')
          return
        }
        fetch.post(state.getAflcDriverOrdeTrailrMonitorList, { orderSerial: this.orderSerial }).then(
          res => {
            if (res == null || res.data == null || res.data.length < 1) {
              this.$message.warning('从服务器端获取数据失败，请稍后再试.')
              return
            }
            var list = res.data[0].orderCarTrailList
            if (list.length < 2) {
              this.$message.info('该订单无轨迹数据，请稍后再试.')
              return
            }
            var pois = []
            var len = list.length
            for (var i = 0; i < len; ++i) {
              if (list[i] == null || list[i].longitude == null || list[i].latitude == null) {
                continue
              }
              pois.push({ lnglat: [list[i].longitude, list[i].latitude] })
            }
            if (pois.length < 2) {
              this.$message.info('该订单无轨迹数据，请稍后再试.')
              return
            }
            this.routes = null
            var res2 = this.viewTrail(pois)
            if (res2 === -2 || res2 === -3) {
              this.$message.warning('无法查看该订单轨迹数据，请稍后再试.')
              return
            }
          }
        ).catch(res => {
          this.$message.warning('从服务器端获取数据失败，请稍后再试.')
        })
      },
      checkTrack() {
        if (this.stopPlayTrackStatus) {
          this.clear()
          return
        }
        var redball = state.redball
        if (redball == null) {
          this.viewTrail2()
          return
        }
        if (this.redballMove === this.redballMoveOld) {
          redball.setMap(null)
          this.viewTrail2()
          return
        }
        this.redballMoveOld = this.redballMove
        setTimeout(() => {
          this.checkTrack()
        }, 1000)
      },
      resetValueObj(keyList, valueObj) {
        if (keyList == null || keyList.length < 1 || valueObj == null || valueObj.length < 1) {
          return
        }
        var k = null
        var len = keyList.length
        for (var i = 0; i < len; ++i) {
          k = keyList[i]
          valueObj[k] = null
        }
      },
      closeInfoWindow() {
        if (this.infoWindow != null) {
          this.infoWindow.close()
        }
      },
      toOrderPage() {
        var p = limitNumberInput('orderCurrentPage')
        if (p == null || p === '') {
          return
        }
        if (p < 1) {
          p = 1
        }
        this.fetchOrder(p, 1, this.driverId)
      },
      toOrderPage2() {
        if (event.key === 'Enter') {
          this.toOrderPage()
        }
      },
      nextOrderPage() {
        var p = 1
        if (this.orderCurrentPage != null) {
          p = 1 + this.orderCurrentPage
        }
        this.fetchOrder(p, 1, this.driverId)
      },
      preOrderPage() {
        var p = 1
        if (this.orderCurrentPage != null) {
          p = this.orderCurrentPage - 1
          if (p < 1) {
            p = 1
          }
        }
        this.fetchOrder(p, 1, this.driverId)
      },
      sendMessage() {
        this.$message.info('此功能未开放.')
      },
      callPhone() {
        this.$message.info('此功能未开放.')
      },
      removeMarkers() {
        if (this.mp) {
          this.mp.clearMap()
        }
      },
      clickTab(idx) {
        this.activeTab = idx
        if (idx === 1) {
          this.clickOnlineTab(0)
        } else if (idx === 2) {
          this.showSearchBox = true
          this.searchTrack(1)
        }
      },
      clickOnlineTab(idx) {
        this.onlineTabFocus = idx
        switch (idx) {
          case 0:
            this.monitorOnlineState = null
            break
          case 1:
            this.monitorOnlineState = '1'
            break
          case 2:
            this.monitorOnlineState = '0'
            break
        }

        this.searchMonitor(1)
      },
      clickSearchResult(idx) {
        this.searchResultFocus = idx
        this.playTrackStatus = false
        if (!this.mp || !this.searchExpandList || this.searchExpandList.length < 1) {
          return
        }
        var obj = this.searchExpandList[idx]
        if (obj.marker) {
          this.markerClick({ target: obj.marker })
        }
      },
      monitorPageChange(curPage) {
        this.monitorCurrentPage = curPage
        this.searchMonitor(curPage)
      },
      trackPageChange(curPage) {
        this.monitorCurrentPage = curPage
        this.searchTrack(curPage)
      },
      locate(callback) {
        if (this.citySearch !== null) {
          // this.city = '定位中...'
          this.citySearch.getLocalCity((status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              this.city = result.city
              this.adcode = result.adcode
              if (callback) {
                callback()
              }
            }
          })
        }
      },
      locate2() {
        if (this.mp) {
          var c = this.mp.getCenter()
          if (c == null) {
            return
          }
          this.geocoder(c, (status, result) => {
            var c2 = this.mp.getCenter()
            if (!c2.equals(c)) {
              return
            }
            if (status === 'complete') {
              try {
                var ci = result.regeocode.addressComponent.city
                if (ci) {
                  this.city = ci
                  return
                }
                ci = result.regeocode.addressComponent.province
                if (ci) {
                  this.city = ci
                  return
                }
                this.city = '定位失败'
              } catch (e) {
                this.city = '定位失败'
              }
            } else {
              this.city = '定位失败'
            }
          })
        }
      },
      relocateCity() {
        this.cityKeyword = ''
        if (!this.mp) {
          this.$message.warning('定位失败，请稍后再试.')
          return
        }
        if (!this.citySearch) {
          if (AMap.CitySearch) {
            state.citySearch = new AMap.CitySearch()
            this.citySearch = state.citySearch
          } else {
            this.$message.warning('定位失败，请稍后再试.')
            return
          }
        }
        this.locate(() => {
          var c = this.city
          if (!c || c === '定位中...') {
            this.$message.warning('定位失败，请稍后再试.')
            return
          }
          this.mp.setCity(c)
        })
      },
      searchCity(keyword, cb) {
        if (!this.districtSearch) {
          if (AMap.DistrictSearch) {
            state.districtSearch = new AMap.DistrictSearch({ level: 'city', showbiz: false, subdistrict: 0 })
            this.districtSearch = state.districtSearch
          } else {
            this.$message.warning('出现错误，请稍后再试.')
            cb([])
            return
          }
        }
        if (!keyword) {
          cb([])
          return
        }
        this.districtSearch.search(keyword, (status, result) => {
          try {
            if (status === 'complete') {
              var ctyList = result.districtList
              if (ctyList == null || ctyList.length < 1) {
                cb([])
                return
              }
              this.adcodeList = {}
              ctyList = ctyList.filter(e => {
                if (e.level !== 'province' && e.level !== 'city') {
                  return false
                }
                if (state.districtRegEx.test(e.name)) {
                  return false
                }
                if (typeof e.citycode === 'string') {
                  e.value = e.name
                  this.adcodeList[e.name] = e.adcode
                  return true
                }
                return false
              })
              cb(ctyList)
            } else {
              cb([])
            }
          } catch (e) {
            cb([])
          }
        })
      },
      selectCity() {
        if (this.mp && this.cityKeyword) {
          this.city = this.cityKeyword
          if (this.adcodeList) {
            this.adcode = this.adcodeList[this.city]
          } else {
            this.adcode = null
          }
          if (!this.adcode) {
            this.$message.warning('出现错误，请稍后再试.')
          }
          this.mp.setCity(this.cityKeyword)
        }
      },
      stopPlayTrack() {
        this.stopPlayTrackStatus = true
        this.clear()
      },
      playTrack() {
        this.playTrackStatus = true
        this.stopPlayTrackStatus = false
        this.routes = null
        var truckDriving = this.truckDriving
        if (truckDriving != null) {
          truckDriving.clear()
        }
        var redball = state.redball
        if (redball != null) {
          redball.setMap(null)
        }
        var polyline = state.polyline
        if (polyline != null) {
          polyline.setPath(null)
        }
        this.closeInfoWindow()
        var obj = null
        if (this.searchResultFocus < 0 || this.searchResultFocus >= state.pageSize) {
          obj = this.marker
        } else {
          obj = this.searchList[this.searchResultFocus]
        }
        if (obj == null) {
          this.$message.info('请先选中一辆车.')
          this.playTrackStatus = false
          return
        }
        if (obj.driverId == null || this.chooseDateTimeStr == null) {
          this.$message.warning('发生了错误，请稍后再试.')
          this.playTrackStatus = false
          return
        }
        var t = convertTime(this.timePointerPos2)
        if (t != null) {
          t = this.chooseDateStr + ' ' + t
        } else {
          t = this.chooseDateTimeStr
        }
        if (t == null) {
          this.$message.warning('发生了错误，请稍后再试.')
          this.playTrackStatus = false
          return
        }
        fetch.post(state.getAflcDriverOrdeTrailrMonitorList, {
          driverId: obj.driverId,
          coordinateStartTime: t
        }).then(
          res => {
            var routes = res.data
            if (routes == null || routes.length < 1) {
              this.$message.warning('未获取到轨迹数据.')
              this.playTrackStatus = false
              return
            }
            this.routes = routes
            this.routesIdx = 0
            this.viewTrail2()
          }
        ).catch(res => {
          this.$message.warning('从服务器端获取数据失败，请稍后再试.')
          this.playTrackStatus = false
        })
      },
      viewTrail2() {
        if (this.routes != null) {
          this.playTrackStatus = true
          var len = this.routes.length
          if (this.routesIdx >= 0 && this.routesIdx < len) {
            var r = this.routes[this.routesIdx++]
            if (r == null || r.orderCarTrailList == null || r.orderCarTrailList.length < 2) {
              this.$message.warning('部分轨迹无法获取，请稍后再试.')
              this.viewTrail2()
              return
            }
            var points = r.orderCarTrailList
            len = points.length
            var tFrom = points[0].coordinateTime
            if (tFrom != null) {
              tFrom = computeTime(tFrom)
            }
            if (tFrom == null) {
              tFrom = 0
            }
            this.markTimePointerCounter()
            this.timePointerDur = '0s'
            this.timePointerPos2 = tFrom
            this.timePointerPos = (tFrom - 20) + 'px'

            this.markTimePointerCounter()
            var p = this.timePointerCounter
            var tEnd = points[len - 1].coordinateTime
            if (tEnd != null) {
              tEnd = computeTime(tEnd)
            }
            if (tEnd != null) {
              this.timePointerObj = { counter: p, pos: tEnd }
              setTimeout(() => {
                this.moveTimePointer()
              }, 1000)
            }

            r = []
            for (var i = 0; i < len; ++i) {
              r.push({ lnglat: [points[i].longitude, points[i].latitude] })
            }
            this.viewTrail(r)
          } else {
            this.playTrackStatus = false
            this.clear()
          }
        } else {
          this.playTrackStatus = false
          this.clear()
        }
      },
      moveTimePointer() {
        if (this.timePointerObj == null || this.timePointerCounter != this.timePointerObj.counter) {
          return
        }
        var pos = this.timePointerObj.pos
        this.timePointerDur = '10s'
        this.timePointerPos2 = pos
        this.timePointerPos = (pos - 20) + 'px'
      },
      viewTrail(points) {
        if (points == null || points.length < 2) {
          this.$message.warning('部分轨迹无法获取，请稍后再试.')
          this.viewTrail2()
          return -1
        }
        var truckDriving = this.truckDriving
        if (truckDriving == null) {
          if (AMap.TruckDriving) {
            this.truckDriving = new AMap.TruckDriving({
              map: this.mp,
              size: 1,
              showTraffic: true,
              autoFitView: true
            })
            truckDriving = this.truckDriving
          } else {
            return -2
          }
        }
        truckDriving.clear()
        var polyline = state.polyline
        if (polyline == null) {
          if (AMap.Polyline) {
            state.polyline = new AMap.Polyline({
              map: this.mp,
              strokeWeight: 1,
              showDir: true
            })
            polyline = state.polyline
          } else {
            return -2
          }
        }

        var redball = state.redball
        if (redball == null) {
          if (AMap.Marker) {
            state.redball = new AMap.Marker({
              icon: state.redballUrl,
              offset: new AMap.Pixel(-11, -26),
              animation: 'AMAP_ANIMATION_DROP',
              autoRotation: false
            })
            redball = state.redball
          } else {
            return -2
          }
        }
        this.closeInfoWindow()
        truckDriving.search(points, (status, result) => {
          if (status === 'complete') {
            if (result.routes && result.routes.length) {
              var pois = parseRouteToPath(result.routes[0])
              var d = AMap.GeometryUtil.distanceOfLine(pois)
              var s = (d * 3.6) / 5
              polyline.setPath(pois)
              redball.setPosition(pois[0])
              this.redballMove = 0
              this.redballMoveOld = -1
              redball.setMap(this.mp)
              this.mp.setFitView([polyline, redball])
              redball.moveAlong(pois, s)
              redball.on('moving', () => {
                if (this.redballMove >= Number.MAX_VALUE) {
                  this.redballMove = 0
                }
                ++this.redballMove
              })
              this.checkTrack()
              return 0
            } else {
              this.viewTrail2()
              return -3
            }
          } else {
            this.$message.warning('部分轨迹无法获取，请稍后再试.')
            this.viewTrail2()
            return -3
          }
        })
      },
      chooseTime() {
        this.markTimePointerCounter()
        this.timePointerDur = '0s'
        var p = (document.documentElement.scrollLeft + this.$refs.rootDiv.scrollLeft + event.clientX - this.$refs.timeLineBar.offsetLeft - 298)
        this.chooseTime2(p)
      },
      chooseTime2(p) {
        if (p < 0) {
          p = 0
        } else if (p > 696) {
          p = 696
        }
        this.timePointerPos2 = p
        this.timePointerPos = (p - 20) + 'px'
      },
      hideTimeTip() {
        this.$refs.timeTipDiv.style.display = 'none'
      },
      showTimeTip() {
        var p = (document.documentElement.scrollLeft + this.$refs.rootDiv.scrollLeft + event.clientX - this.$refs.timeLineBar.offsetLeft - 298)
        if (p < 0) {
          p = 0
        } else if (p > 696) {
          p = 696
        }
        var d = p * 24 / 696
        var h = Math.floor(d)
        var m = Math.round((d - h) * 60)
        var timeTipDiv = this.$refs.timeTipDiv
        if (timeTipDiv != null) {
          timeTipDiv.style.left = (p - 25) + 'px'
          timeTipDiv.style.display = 'unset'
        }
        if (h < 10) {
          h = '0' + h
        }
        if (m < 10) {
          m = '0' + m
        }
        this.$refs.timeTip.innerText = (h + ':' + m)
      },
      geocoder(lnglat, callback) {
        if (!state.geocoder) {
          if (AMap.Geocoder) {
            state.geocoder = new AMap.Geocoder()
          }
        }
        if (!state.geocoder) {
          return
        }
        state.geocoder.getAddress(lnglat, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            if (callback) {
              callback(status, result, result.regeocode.formattedAddress)
            }
          }
        })
      },
      clear() {
        this.routes = null
        if (state.redball != null) {
          state.redball.setMap(null)
        }
        if (state.polyline != null) {
          state.polyline.setPath(null)
        }
        if (this.truckDriving != null) {
          this.truckDriving.clear()
        }
        this.timePointerDur = '0s'
        this.chooseTime2(0)
        this.playTrackStatus = false
      },

    },
    mounted() {
      this.loadMap()
      window.closeInfoWindow = this.closeInfoWindow
      window.sendMessage = this.sendMessage
      window.callPhone = this.callPhone
      window.nextOrderPage = this.nextOrderPage
      window.preOrderPage = this.preOrderPage
      window.toOrderPage = this.toOrderPage
      window.toOrderPage2 = this.toOrderPage2
      window.viewDriver = this.viewDriver
      window.viewOrder = this.viewOrder
      window.viewOrderTrail = this.viewOrderTrail
      window.CarLine = this.CarLine
    }
  }
</script>

<style lang="scss">
  #map {
    .carIcon2 {
      text-align: center;
      font-size: 12px;
    }

    .carNum2 {
      color: #0a8cff;
      text-align: center;
      width: 120px;
      height: 12px;
      overflow: hidden;
    }
  }

  .ctlPanel {
    .el-collapse-item__header {
      border-bottom: unset;
    }

    .el-collapse-item__header.focusing.is-active {
      color: white;
    }
    .el-collapse-item__header {
      background: #0a8cff;
      color: white;
      text-align: center;
      text-indent: unset;
      font-size: 15px;
      padding: 5px;
      height: unset;
      margin-bottom: unset;

      .el-collapse-item__arrow {
        left: unset;
        right: 10px;
        line-height: 41px;
      }

      .el-collapse-item__arrow.el-icon-arrow-right {
        transform: rotate(90deg);
      }

      .el-collapse-item__arrow.el-icon-arrow-right.is-active {
        transform: rotate(-90deg);
      }
    }

    .el-collapse-item__header:hover {
      color: #eeeeee;
    }

    .el-input-group__append {
      .searchIcon {
        color: #0a8cff;
        .el-icon-search {
          font-weight: bolder !important;
        }
      }
      .searchIcon:hover {
        color: royalblue;
      }
    }

    .pager {
      display: flex;
      justify-content: center;
      margin-top: -6px;
      .el-input {
        input {
          height: 20px;
        }
      }
      .el-pagination {
        padding-top: unset;
        .el-pagination__editor.el-input .el-input__inner {
          height: 18px;
          line-height: 18px;
        }
        .el-pagination__jump {
          margin-left: unset;
        }
      }
    }
  }

  .timeLineBar {

  }
</style>

<style scoped lang="scss">
  #map {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .ctlPanel {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 390px;
    z-index: 150;
    box-shadow: 2px 2px 4px 0 rgba(153, 153, 153, 0.5);

    .tab {
      position: relative;
      width: 50%;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
      color: white;
    }

    .tab:hover {
      color: #eeeeee;
    }

    .tabCanClick {
      cursor: pointer;
    }

    .onlineTab {
      width: 33%;
      text-align: center;
    }

    .onlineTab:hover {
      color: black;
    }

    .onlineTabActive {
      border-bottom: 1px solid #0a84ff;
    }

    .isActive {
      background-color: #eeeeee;
    }

    .searchList {
      display: flex;
      z-index: 150;
      padding: 5px;
      border-bottom: 1px dashed #eee;
      white-space: nowrap;

      .carIcon {
        position: relative;
        width: 25px;
        text-align: unset;
      }
      .carNum {
        color: #303133;
        width: 100px;
        height: unset;
        line-height: 23px;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
        padding-right: 10px;
      }
      .driverName {
        width: 110px;
        line-height: 23px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10px;
      }
      .mobile {
        width: 100px;
        line-height: 23px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10px;
      }
      .status {
        width: 59px;
        line-height: 23px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .timeLineBar {
    position: absolute;
    width: 890px;
    height: 50px;
    display: flex;
    z-index: 150;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, .8);
    right: 20px;
    bottom: 50px;
    box-shadow: 1px 1px 3px 1px #cbcbcb;
    .playBtn {
      margin-left: 45px;
      margin-top: 5px;
      width: 40px;
      height: 40px;
      background-image: url('/static/monitor/play.png');
      background-size: 40px 40px;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .playBtn:hover {
      background-image: url('/static/monitor/play_hover.png');
    }
    .stopBtn {
      margin-left: 45px;
      margin-top: 5px;
      width: 40px;
      height: 40px;
      background-image: url('/static/monitor/stop.png');
      background-size: 40px 40px;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .stopBtn:hover {
      background-image: url('/static/monitor/stop_hover.png');
    }
    .slow {
      width: 35px;
      background-image: url('/static/monitor/slow.png');
      background-size: 28px 28px;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .slow:hover {
      background-image: url('/static/monitor/slow_hover.png');
    }
    .faster {
      width: 35px;
      margin-right: 35px;
      background-image: url('/static/monitor/faster.png');
      background-size: 28px 28px;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .faster:hover {
      background-image: url('/static/monitor/faster_hover.png');
    }
    .timeTip {
      padding: 0 10px;
      height: 25px;
      background-color: rgba(0, 0, 0, .7);
      border-radius: 2px;
      color: #efefef;
      line-height: 25px;
      text-align: center;
      font-size: 12px;
    }
    .timeTipPointer {
      height: 0;
      width: 0;
      border: 6px solid rgba(0, 0, 0, .7);
      border-right-color: transparent;
      border-bottom-color: transparent;
      border-left-color: transparent;
      margin-left: 19px;
    }
    .hour {
      height: 6px;
      border-bottom: 1px solid #c2c2c4;
      border-top: 1px solid #c2c2c4;
      border-left: 1px solid #a3a3a4;
      width: 29px;
      margin-top: 22px;
      float: left;
      background-color: #c2c2c4;
    }
    .hourStart {
      border-bottom-left-radius: 3px;
      border-top-left-radius: 3px;
    }
    .hourEnd {
      border-bottom-right-radius: 3px;
      border-top-right-radius: 3px;
      border-right: 1px solid #a3a3a4;
    }
    .hourNumber {
      width: 29px;
    }
    .timePointer {
      background-image: url('/static/monitor/pointer.png');
      height: 40px;
      width: 40px;
      position: absolute;
      cursor: pointer;
      top: 4px;
      left: -20px;
      background-position: center;
      background-repeat: no-repeat;
      transition: all 0 linear;
    }
    .startLine {
      position: absolute;
      left: -1px;
      background-color: #0a8cff;
      width: 2px;
      height: 60px;
      cursor: pointer;
    }
    .startFlag {
      position: absolute;
      top: 50px;
      left: -18px;
      height: 0;
      width: 0;
      border: 10px solid #0a8cff;
      border-bottom-color: transparent;
      border-left-color: transparent;
      cursor: pointer;
    }
    .endLine {
      position: absolute;
      right: -1px;
      background-color: #0a8cff;
      width: 2px;
      height: 60px;
      cursor: pointer;
    }
    .endFlag {
      position: absolute;
      top: 50px;
      height: 0;
      width: 0;
      border: 10px solid #0a8cff;
      border-bottom-color: transparent;
      border-right-color: transparent;
      cursor: pointer;
    }
  }

  .cityList {
    position: absolute;
    z-index: 150;
    left: 430px;
    top: 20px;
    padding: 10px;
    background-color: white;
    border: 1px solid #c4c7cc;
    font-size: 12px;
    cursor: pointer;
  }

  .cityList:hover {
    color: #0a8cff;
  }

  .searchCity {
    z-index: 150;
    position: absolute;
    left: 430px;
    top: 55px;
    padding: 18px;
    background-color: white;
    border: 1px solid #c4c7cc;
    font-size: 12px;
    .cityName {
      max-width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .relocateBtn {
    cursor: pointer;
    margin-left: 20px;
  }

  .relocateBtn:hover {
    color: #0a8cff;
  }

  .infoWindowTopDiv {
    width: 500px;
    height: 510px;
    padding: 10px;
    color: #303133;
    font-size: 14px;
    background-color: white;
    border: 1px solid #eee;
    .orderLabel {
      white-space: nowrap;
      width: 60px;
      text-align: right;
    }
    .viewTrack {
      cursor: pointer;
      margin-left: 15px;
      color: #0a8cff;
    }
    .viewTrack:hover {
      color: #f56c6c;
    }
    .pager {
      margin-left: 10px;
      cursor: pointer
    }
    .pager:hover {
      color: #409EFF;
    }
    .orderCurrentPage {
      width: 46px;
      height: 18px;
      line-height: 18px;
      margin-left: 3px;
      margin-right: 3px;
    }
  }

  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
</style>

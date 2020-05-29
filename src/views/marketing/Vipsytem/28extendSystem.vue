<template>
    <div class="TwoColumns extendSystem clearfix">
        <div class="columnsContainer">
            <div class="side_left">
                <div class="side_left_top">
                    <el-tree
                        ref="treeForm"
                        show-checkbox
                        :data="cityTree"
                        node-key="code"
                        :default-expanded-keys="[440000]"
                        :default-checked-keys="[formAll.cityCode]"
                        :props="defaultProps"
                        :check-strictly="treestatus"
                        :default-expand-all='treestatus'
                        :highlight-current = "true"
                        v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_GRANT_LIST
                        @check="nodeClick">
                    </el-tree>
                </div>
            </div>
            <div class="side_right">
           <el-form :model="formdata" ref="formdata" :rules="rulesForm" :inline="true">
            <table class="tree-table" v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_GRANT_LIST>
            <tbody>
                <tr>
                    <th  width="5%">序号</th>
                    <th  width="10%">发放分类</th>
                    <th  width="35%" colspan="2">发放28币项</th>
                    <th  width="20%">28币数量</th>
                    <th  width="15%">每天发放上限</th>
                    <th  width="15%">单项发放上限</th>
                </tr>
                <tr>
                    <td rowspan="1">1</td>
                    <td rowspan="5">完善账户</td>
                    <td rowspan="1" colspan="2">实名认证</td>
                    <td rowspan="1"><el-form-item prop="coinsNum1"><el-input type="text"  v-model.number  ="formdata.coinsNum1"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">2</td>
                    <td rowspan="1" colspan="2">绑定微信</td>
                    <td rowspan="1"><el-form-item prop="coinsNum2"><el-input type="text"   v-model.number  ="formdata.coinsNum2"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">3</td>
                    <td rowspan="1" colspan="2">关注公众号</td>
                    <td rowspan="1"><el-form-item prop="coinsNum3"><el-input type="text"  v-model.number ="formdata.coinsNum3"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">4</td>
                    <td rowspan="1" colspan="2">保证金</td>
                    <td rowspan="1"><el-form-item prop="coinsNum4"><el-input type="text"  v-model.number ="formdata.coinsNum4"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">5</td>
                    <td rowspan="1" colspan="2">绑定银行卡</td>
                    <td rowspan="1"><el-form-item prop="coinsNum5"><el-input type="text"  v-model.number ="formdata.coinsNum5"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">6</td>
                    <td rowspan="37">接单服务（小货车）</td>
                    <td rowspan="1" colspan="2">抢单</td>
                    <td rowspan="1"><el-form-item prop="coinsNum6"><el-input type="text"  v-model.number ="formdata.coinsNum6"></el-input></el-form-item></td>
                    <td rowspan="1"><el-form-item prop="dailyLimit1"><el-input type="text"  v-model.number ="formdata.dailyLimit1"></el-input></el-form-item></td>
                    <td rowspan="1"><el-form-item prop="singleReleaseLimit1"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit1"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">7</td>
                    <td rowspan="3">中单后按时联系货主</td>
                    <td rowspan="1">达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum7"><el-input type="text"  v-model.number ="formdata.coinsNum7"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="dailyLimit2"><el-input type="text"  v-model.number ="formdata.dailyLimit2"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="singleReleaseLimit2"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit2"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">8</td>
                    <td rowspan="1">不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum8"><el-input type="text"  v-model.number ="formdata.coinsNum8"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">9</td>
                    <td rowspan="1">严重不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum9"><el-input type="text"  v-model.number ="formdata.coinsNum9"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">10</td>
                    <td rowspan="3">及时到车</td>
                    <td rowspan="1">达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum10"><el-input type="text"  v-model.number ="formdata.coinsNum10"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="dailyLimit3"><el-input type="text"  v-model.number ="formdata.dailyLimit3"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="singleReleaseLimit3"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit3"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">11</td>
                    <td rowspan="1">不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum11"><el-input type="text"  v-model.number ="formdata.coinsNum11"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">12</td>
                    <td rowspan="1">严重不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum12"><el-input type="text"  v-model.number ="formdata.coinsNum12"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">13</td>
                    <td rowspan="3">及时到货</td>
                    <td rowspan="1">达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum13"><el-input type="text"  v-model.number ="formdata.coinsNum13"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="dailyLimit4"><el-input type="text"  v-model.number ="formdata.dailyLimit4"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="singleReleaseLimit4"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit4"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">14</td>
                    <td rowspan="1">不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum14"><el-input type="text"  v-model.number ="formdata.coinsNum14"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">15</td>
                    <td rowspan="1">严重不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum15"><el-input type="text"  v-model.number ="formdata.coinsNum15"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">16</td>
                    <td rowspan="3">按时回单</td>
                    <td rowspan="1">达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum16"><el-input type="text"  v-model.number ="formdata.coinsNum16"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="dailyLimit5"><el-input type="text"  v-model.number ="formdata.dailyLimit5"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="singleReleaseLimit5"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit5"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">17</td>
                    <td rowspan="1">不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum17"><el-input type="text"  v-model.number ="formdata.coinsNum17"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">18</td>
                    <td rowspan="1">严重不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum18"><el-input type="text"  v-model.number ="formdata.coinsNum18"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">19</td>
                    <td rowspan="3">按时回款</td>
                    <td rowspan="1">达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum19"><el-input type="text"  v-model.number ="formdata.coinsNum19"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="dailyLimit6"><el-input type="text"  v-model.number ="formdata.dailyLimit6"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="singleReleaseLimit6"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit6"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">20</td>
                    <td rowspan="1">不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum20"><el-input type="text"  v-model.number ="formdata.coinsNum20"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">21</td>
                    <td rowspan="1">严重不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum21"><el-input type="text"  v-model.number ="formdata.coinsNum21"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">22</td>
                    <td rowspan="3">到车到货距离正常</td>
                    <td rowspan="1">达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum22"><el-input type="text"  v-model.number ="formdata.coinsNum22"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="dailyLimit7"><el-input type="text"  v-model.number ="formdata.dailyLimit7"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="singleReleaseLimit7"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit7"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">23</td>
                    <td rowspan="1">不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum23"><el-input type="text"  v-model.number ="formdata.coinsNum23"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">24</td>
                    <td rowspan="1">严重不达标</td>
                    <td rowspan="1"><el-form-item prop="coinsNum24"><el-input type="text"  v-model.number ="formdata.coinsNum24"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">25</td>
                    <td rowspan="1" colspan="2">完成订单（确认收货）</td>
                    <td rowspan="1"><el-form-item prop="coinsNum25"><el-input type="text"  v-model.number ="formdata.coinsNum25"></el-input></el-form-item></td>
                    <td rowspan="1"><el-form-item prop="dailyLimit8"><el-input type="text"  v-model.number ="formdata.dailyLimit8"></el-input></el-form-item></td>
                    <td rowspan="1"><el-form-item prop="singleReleaseLimit8"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit8"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">26</td>
                    <td rowspan="1" colspan="2">货主线上支付运费</td>
                    <td rowspan="1"><el-form-item prop="coinsNum26"><el-input type="text"  v-model.number ="formdata.coinsNum26"></el-input></el-form-item></td>
                    <td rowspan="1"><el-form-item prop="dailyLimit9"><el-input type="text"  v-model.number ="formdata.dailyLimit9"></el-input></el-form-item></td>
                    <td rowspan="1"><el-form-item prop="singleReleaseLimit9"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit9"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">27</td>
                    <td rowspan="6">货主评价</td>
                    <td rowspan="1">5星</td>
                    <td rowspan="1"><el-form-item prop="coinsNum27"><el-input type="text"  v-model.number ="formdata.coinsNum27"></el-input></el-form-item></td>
                    <td rowspan="6"><el-form-item prop="dailyLimit10"><el-input type="text"  v-model.number ="formdata.dailyLimit10"></el-input></el-form-item></td>
                    <td rowspan="6"><el-form-item prop="singleReleaseLimit10"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit10"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">28</td>
                    <td rowspan="1">4星</td>
                    <td rowspan="1"><el-form-item prop="coinsNum28"><el-input type="text"  v-model.number ="formdata.coinsNum28"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">29</td>
                    <td rowspan="1">3星</td>
                    <td rowspan="1"><el-form-item prop="coinsNum29"><el-input type="text"  v-model.number ="formdata.coinsNum29"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">30</td>
                    <td rowspan="1">2星</td>
                    <td rowspan="1"><el-form-item prop="coinsNum30"><el-input type="text"  v-model.number ="formdata.coinsNum30"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">31</td>
                    <td rowspan="1">1星</td>
                    <td rowspan="1"><el-form-item prop="coinsNum31"><el-input type="text"  v-model.number ="formdata.coinsNum31"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">32</td>
                    <td rowspan="1">0星</td>
                    <td rowspan="1"><el-form-item prop="coinsNum32"><el-input type="text"  v-model.number ="formdata.coinsNum32"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">33</td>
                    <td rowspan="1" colspan="2">被投诉（有责）</td>
                    <td rowspan="1"><el-form-item prop="coinsNum33"><el-input type="text"  v-model.number ="formdata.coinsNum33"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">34</td>
                    <td rowspan="1" colspan="2">有货损（有责）</td>
                    <td rowspan="1"><el-form-item prop="coinsNum34"><el-input type="text"  v-model.number ="formdata.coinsNum34"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">35</td>
                    <td rowspan="1" colspan="2">订单改派</td>
                    <td rowspan="1"><el-form-item prop="coinsNum35"><el-input type="text"  v-model.number ="formdata.coinsNum35"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="1">/</td>
                </tr>                
                <tr>
                    <td rowspan="1">36</td>
                    <td rowspan="3">每天累计完成订单</td>
                    <td rowspan="1" class="sizeInput"><span>完成</span><el-form-item prop="coinsNumS1"><el-input type="text"  v-model.number ="formdata.coinsNumS1"></el-input></el-form-item><span>单</span></td>
                    <td rowspan="1"><el-form-item prop="coinsNum36"><el-input type="text"  v-model.number ="formdata.coinsNum36"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="3"><el-form-item prop="singleReleaseLimit11"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit11"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">37</td>
                    <td rowspan="1" class="sizeInput"><span>完成</span><el-form-item prop="coinsNumS2"><el-input type="text"  v-model.number ="formdata.coinsNumS2"></el-input></el-form-item><span>单</span></td>
                    <td rowspan="1"><el-form-item prop="coinsNum37"><el-input type="text"  v-model.number ="formdata.coinsNum37"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">38</td>
                    <td rowspan="1" class="sizeInput"><span>完成</span><el-form-item prop="coinsNumS3"><el-input type="text"  v-model.number ="formdata.coinsNumS3"></el-input></el-form-item><span>单</span></td>
                    <td rowspan="1"><el-form-item prop="coinsNum38"><el-input type="text"  v-model.number ="formdata.coinsNum38"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">39</td>
                    <td rowspan="3">每月累计完成订单</td>
                    <td rowspan="1" class="sizeInput"><span>完成</span><el-form-item prop="coinsNumS4"><el-input type="text"  v-model.number ="formdata.coinsNumS4"></el-input></el-form-item><span>单</span></td>
                    <td rowspan="1"><el-form-item prop="coinsNum39"><el-input type="text"  v-model.number ="formdata.coinsNum39"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="3"><el-form-item prop="singleReleaseLimit12"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit12"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">40</td>
                    <td rowspan="1" class="sizeInput"><span>完成</span><el-form-item prop="coinsNumS5"><el-input type="text"  v-model.number ="formdata.coinsNumS5"></el-input></el-form-item><span>单</span></td>
                    <td rowspan="1"><el-form-item prop="coinsNum40"><el-input type="text"   v-model.number ="formdata.coinsNum40"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">41</td>
                    <td rowspan="1" class="sizeInput"><span>完成</span><el-form-item prop="coinsNumS6"><el-input type="text"  v-model.number ="formdata.coinsNumS6"></el-input></el-form-item><span>单</span></td>
                    <td rowspan="1"><el-form-item prop="coinsNum41"><el-input type="text"   v-model.number ="formdata.coinsNum41"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">42</td>
                    <td rowspan="1" colspan="2">接单年限</td>
                    <td rowspan="1"><el-form-item prop="coinsNum42"><el-input type="text"  v-model.number ="formdata.coinsNum42"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="1"><el-form-item prop="singleReleaseLimit13"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit13"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">43</td>
                    <td rowspan="10">更多互动</td>
                    <td rowspan="2">在线时长</td>
                    <td rowspan="1" class="sizeInput"><span>在线</span><el-form-item prop="numTime1"><el-input type="text"  v-model.number ="formdata.numTime1"></el-input></el-form-item><span>小时</span></td>
                    <td rowspan="1"><el-form-item prop="coinsNum43"><el-input type="text"  v-model.number ="formdata.coinsNum43"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="2"><el-form-item prop="singleReleaseLimit14"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit14"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">44</td>
                    <td rowspan="1" class="sizeInput"><span>在线</span><el-form-item prop="numTime2"><el-input type="text"  v-model.number ="formdata.numTime2"></el-input></el-form-item><span>小时</span></td>
                    <td rowspan="1"><el-form-item prop="coinsNum44"><el-input type="text"  v-model.number ="formdata.coinsNum44"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                </tr>
                <tr>
                    <td rowspan="1">45</td>
                    <td rowspan="4">分享</td>
                    <td rowspan="1">邀请</td>
                    <td rowspan="1"><el-form-item prop="coinsNum45"><el-input type="text"  v-model.number ="formdata.coinsNum45"></el-input></el-form-item></td>
                    <td rowspan="4"><el-form-item prop="dailyLimit11"><el-input type="text"  v-model.number ="formdata.dailyLimit11"></el-input></el-form-item></td>
                    <td rowspan="4"><el-form-item prop="singleReleaseLimit15"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit15"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">46</td>
                    <td rowspan="1">货源</td>
                    <td rowspan="1"><el-form-item prop="coinsNum46"><el-input type="text"  v-model.number ="formdata.coinsNum46"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">47</td>
                    <td rowspan="1">车源</td>
                    <td rowspan="1"><el-form-item prop="coinsNum47"><el-input type="text"  v-model.number ="formdata.coinsNum47"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">48</td>
                    <td rowspan="1">物流专线</td>
                    <td rowspan="1"><el-form-item prop="coinsNum48"><el-input type="text"  v-model.number ="formdata.coinsNum48"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">49</td>
                    <td rowspan="3">成功邀请</td>
                    <td rowspan="1">货主</td>
                    <td rowspan="1"><el-form-item prop="coinsNum49"><el-input type="text"  v-model.number ="formdata.coinsNum49"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="dailyLimit12"><el-input type="text"  v-model.number ="formdata.dailyLimit12"></el-input></el-form-item></td>
                    <td rowspan="3"><el-form-item prop="singleReleaseLimit16"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit16"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">50</td>
                    <td rowspan="1">车主</td>
                    <td rowspan="1"><el-form-item prop="coinsNum50"><el-input type="text"  v-model.number ="formdata.coinsNum50"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">51</td>
                    <td rowspan="1">物流公司</td>
                    <td rowspan="1"><el-form-item prop="coinsNum51"><el-input type="text"  v-model.number ="formdata.coinsNum51"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">52</td>
                    <td rowspan="1" colspan="2">每天签到</td>
                    <td rowspan="1"><el-form-item prop="coinsNum52"><el-input type="text"  v-model.number ="formdata.coinsNum52"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="1"><el-form-item prop="singleReleaseLimit17"><el-input type="text"  v-model.number ="formdata.singleReleaseLimit17"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td rowspan="1">53</td>
                    <td rowspan="1">车身广告</td>
                    <td rowspan="1" colspan="2">车身广告</td>
                    <td rowspan="1"><el-form-item prop="coinsNum53"><el-input type="text"  v-model.number ="formdata.coinsNum53"></el-input></el-form-item></td>
                    <td rowspan="1">/</td>
                    <td rowspan="1">/</td>
                </tr>
            </tbody>   
            </table>
           </el-form>
            <div class="btn_footer">
                <el-button type="primary" plain @click="Addsave" icon="el-icon-check">保存</el-button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { aflcProvinceCode } from '@/api/common.js'
import  { aflcCoinsSettings, aflcCoinsSettingsAdd } from '@/api/marketing/28extendSystem.js'
export default {
    name:'extendSystem',
    data(){ 
    //   参数校验
        const coinsNum =  (rule, val, cb) => {
            var reg= /^-?\d+$/g
            if(!reg.test(val)){
            cb(new Error('请输入整数'))
            }
            else{
                cb()
            }
        } 
        const dailyLimit = (rule, val, cb) => {
            var reg=  /^[1-9]\d*$/
            if(!reg.test(val)){
            cb(new Error('请输入大于零的正整数'))
            }
            else{
                cb()
            }
        } 

        const singleReleaseLimit = (rule, val, cb) => {
            var reg=  /^[1-9]\d*$/
            if(!reg.test(val)){
            cb(new Error('请输入大于零的正整数'))
            }
            else{
                cb()
            }
        } 

        const coinsNumS = (rule, val, cb) => {
            var reg=  /^[1-9]\d*$/
            if(!reg.test(val)){
            cb(new Error('请输入大于零的正整数'))
            }
            else if(parseInt(val)<=parseInt(this.formdata['coinsNumS'+ (Number(rule.field.split('coinsNumS')[1])-1)])&&!(Number(rule.field.split('coinsNumS')[1])%3==1)){
            cb(new Error('请输入大于上一行数值'))
            }
            else{
                cb()
            }
        } 

        const numTime = (rule, val, cb) => {
            var reg=  /^[1-9]\d*$/
            if(!reg.test(val)){
            cb(new Error('请输入大于零的正整数'))
            }
            else if(parseInt(val)<=parseInt(this.formdata['numTime'+ (Number(rule.field.split('numTime')[1])-1)])){
            cb(new Error('请输入大于上一行数值'))
            }
            else{
                cb()
            }
        } 

        return{
        cityTree:[],
        treestatus:false,
        defaultProps: {
            children: 'children',
            label: 'name'
        },
        formAll:{
            cityCode:'440100',
        },
        formdata:{
            coinsNum1:null,coinsNum2:null,coinsNum3:null,coinsNum4:null,coinsNum5:null,coinsNum6:null,coinsNum7:null,coinsNum8:null,coinsNum9:null,coinsNum10:null,
            coinsNum11:null,coinsNum12:null,coinsNum13:null,coinsNum14:null,coinsNum15:null,coinsNum16:null,coinsNum17:null,coinsNum18:null,coinsNum19:null,coinsNum20:null,
            coinsNum21:null,coinsNum22:null,coinsNum23:null,coinsNum24:null,coinsNum25:null,coinsNum26:null,coinsNum27:null,coinsNum28:null,coinsNum29:null,coinsNum30:null,
            coinsNum31:null,coinsNum32:null,coinsNum33:null,coinsNum34:null,coinsNum35:null,coinsNum36:null,coinsNum37:null,coinsNum38:null,coinsNum39:null,coinsNum40:null,
            coinsNum41:null,coinsNum42:null,coinsNum43:null,coinsNum44:null,coinsNum45:null,coinsNum46:null,coinsNum47:null,coinsNum48:null,coinsNum49:null,coinsNum50:null,
            coinsNum51:null,coinsNum52:null,coinsNum53:null,
            dailyLimit1:null,dailyLimit2:null,dailyLimit3:null,dailyLimit4:null,dailyLimit5:null,dailyLimit6:null,dailyLimit7:null,dailyLimit8:null,dailyLimit9:null,dailyLimit10:null,
            dailyLimit11:null,dailyLimit12:null,
            coinsNumS1:null,coinsNumS2:null,coinsNumS3:null,coinsNumS4:null,coinsNumS5:null,coinsNumS6:null,numTime1:null,numTime2:null,
            singleReleaseLimit1:null,singleReleaseLimit2:null,singleReleaseLimit3:null,singleReleaseLimit4:null,singleReleaseLimit5:null,singleReleaseLimit6:null,singleReleaseLimit7:null,singleReleaseLimit8:null,singleReleaseLimit9:null,singleReleaseLimit10:null,
            singleReleaseLimit11:null,singleReleaseLimit12:null,singleReleaseLimit13:null,singleReleaseLimit14:null,singleReleaseLimit15:null,singleReleaseLimit16:null,singleReleaseLimit17:null,
            numTime1:null,numTime2:null,
        },
        rulesForm:{
            coinsNum1:{trigger:'change',required:true,validator: coinsNum},coinsNum2:{trigger:'change',required:true,validator: coinsNum},coinsNum3:{trigger:'change',required:true,validator: coinsNum},coinsNum4:{trigger:'change',required:true,validator: coinsNum},coinsNum5:{trigger:'change',required:true,validator: coinsNum},coinsNum6:{trigger:'change',required:true,validator: coinsNum},
            coinsNum7:{trigger:'change',required:true,validator: coinsNum},coinsNum8:{trigger:'change',required:true,validator: coinsNum},coinsNum9:{trigger:'change',required:true,validator: coinsNum},coinsNum10:{trigger:'change',required:true,validator: coinsNum},coinsNum11:{trigger:'change',required:true,validator: coinsNum},coinsNum12:{trigger:'change',required:true,validator: coinsNum},
            coinsNum13:{trigger:'change',required:true,validator: coinsNum},coinsNum14:{trigger:'change',required:true,validator: coinsNum},coinsNum15:{trigger:'change',required:true,validator: coinsNum},coinsNum16:{trigger:'change',required:true,validator: coinsNum},coinsNum17:{trigger:'change',required:true,validator: coinsNum},coinsNum18:{trigger:'change',required:true,validator: coinsNum},
            coinsNum19:{trigger:'change',required:true,validator: coinsNum},coinsNum20:{trigger:'change',required:true,validator: coinsNum},coinsNum21:{trigger:'change',required:true,validator: coinsNum},coinsNum22:{trigger:'change',required:true,validator: coinsNum},coinsNum23:{trigger:'change',required:true,validator: coinsNum},coinsNum24:{trigger:'change',required:true,validator: coinsNum},
            coinsNum25:{trigger:'change',required:true,validator: coinsNum},coinsNum26:{trigger:'change',required:true,validator: coinsNum},coinsNum27:{trigger:'change',required:true,validator: coinsNum},coinsNum28:{trigger:'change',required:true,validator: coinsNum},coinsNum29:{trigger:'change',required:true,validator: coinsNum},coinsNum30:{trigger:'change',required:true,validator: coinsNum},
            coinsNum31:{trigger:'change',required:true,validator: coinsNum},coinsNum32:{trigger:'change',required:true,validator: coinsNum},coinsNum33:{trigger:'change',required:true,validator: coinsNum},coinsNum34:{trigger:'change',required:true,validator: coinsNum},coinsNum35:{trigger:'change',required:true,validator: coinsNum},coinsNum36:{trigger:'change',required:true,validator: coinsNum},
            coinsNum37:{trigger:'change',required:true,validator: coinsNum},coinsNum38:{trigger:'change',required:true,validator: coinsNum},coinsNum39:{trigger:'change',required:true,validator: coinsNum},coinsNum40:{trigger:'change',required:true,validator: coinsNum},coinsNum41:{trigger:'change',required:true,validator: coinsNum},coinsNum42:{trigger:'change',required:true,validator: coinsNum},
            coinsNum43:{trigger:'change',required:true,validator: coinsNum},coinsNum44:{trigger:'change',required:true,validator: coinsNum},coinsNum45:{trigger:'change',required:true,validator: coinsNum},coinsNum46:{trigger:'change',required:true,validator: coinsNum},coinsNum47:{trigger:'change',required:true,validator: coinsNum},coinsNum48:{trigger:'change',required:true,validator: coinsNum},
            coinsNum49:{trigger:'change',required:true,validator: coinsNum},coinsNum50:{trigger:'change',required:true,validator: coinsNum},coinsNum51:{trigger:'change',required:true,validator: coinsNum},coinsNum52:{trigger:'change',required:true,validator: coinsNum},coinsNum53:{trigger:'change',required:true,validator: coinsNum},
            dailyLimit1:{trigger:'change',required:true,validator: dailyLimit},dailyLimit2:{trigger:'change',required:true,validator: dailyLimit},dailyLimit3:{trigger:'change',required:true,validator: dailyLimit},dailyLimit4:{trigger:'change',required:true,validator: dailyLimit},
            dailyLimit5:{trigger:'change',required:true,validator: dailyLimit},dailyLimit6:{trigger:'change',required:true,validator: dailyLimit},dailyLimit7:{trigger:'change',required:true,validator: dailyLimit},dailyLimit8:{trigger:'change',required:true,validator: dailyLimit},
            dailyLimit9:{trigger:'change',required:true,validator: dailyLimit},dailyLimit10:{trigger:'change',required:true,validator: dailyLimit},dailyLimit11:{trigger:'change',required:true,validator: dailyLimit},dailyLimit12:{trigger:'change',required:true,validator: dailyLimit},
            singleReleaseLimit1:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit2:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit3:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit4:{trigger:'change',required:true,validator: singleReleaseLimit},
            singleReleaseLimit5:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit6:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit7:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit8:{trigger:'change',required:true,validator: singleReleaseLimit},
            singleReleaseLimit9:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit10:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit11:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit12:{trigger:'change',required:true,validator: singleReleaseLimit},
            singleReleaseLimit13:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit14:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit15:{trigger:'change',required:true,validator: singleReleaseLimit},singleReleaseLimit16:{trigger:'change',required:true,validator: singleReleaseLimit},
            singleReleaseLimit17:{trigger:'change',required:true,validator: singleReleaseLimit},
            coinsNumS1:{trigger:'change',required:true,validator: coinsNumS},coinsNumS2:{trigger:'change',required:true,validator: coinsNumS},coinsNumS3:{trigger:'change',required:true,validator: coinsNumS},
            coinsNumS4:{trigger:'change',required:true,validator: coinsNumS},coinsNumS5:{trigger:'change',required:true,validator: coinsNumS},coinsNumS6:{trigger:'change',required:true,validator: coinsNumS},        
            numTime1:{trigger:'change',required:true,validator: numTime},numTime2:{trigger:'change',required:true,validator: numTime}
        },
        }
    },
    mounted() {
            this.getMoreInformation()
            this.firstblood()
        },
    computed:{
    },
    methods:{
        firstblood(){
            aflcCoinsSettings(1,53,this.formAll).then(res=>{
            if(res.data.list&&res.data.list.length>0){
                res.data.list.forEach((item, i) => {
                    this.formdata['coinsNum'+(i+1)] = item.coinsNum;
                });
            this.formdata.dailyLimit1 = res.data.list[5].dailyLimit;this.formdata.dailyLimit2 = res.data.list[6].dailyLimit;this.formdata.dailyLimit3 = res.data.list[9].dailyLimit
            this.formdata.dailyLimit4 = res.data.list[12].dailyLimit;this.formdata.dailyLimit5 = res.data.list[15].dailyLimit;this.formdata.dailyLimit6 = res.data.list[18].dailyLimit
            this.formdata.dailyLimit7 = res.data.list[21].dailyLimit;this.formdata.dailyLimit8 = res.data.list[24].dailyLimit;this.formdata.dailyLimit9 = res.data.list[25].dailyLimit
            this.formdata.dailyLimit10 = res.data.list[26].dailyLimit;this.formdata.dailyLimit11 = res.data.list[44].dailyLimit;this.formdata.dailyLimit12 = res.data.list[48].dailyLimit
            this.formdata.singleReleaseLimit1 = res.data.list[5].singleReleaseLimit;this.formdata.singleReleaseLimit2 = res.data.list[6].singleReleaseLimit;this.formdata.singleReleaseLimit3 = res.data.list[9].singleReleaseLimit;
            this.formdata.singleReleaseLimit4 = res.data.list[12].singleReleaseLimit;this.formdata.singleReleaseLimit5 = res.data.list[15].singleReleaseLimit;this.formdata.singleReleaseLimit6 = res.data.list[18].singleReleaseLimit;
            this.formdata.singleReleaseLimit7 = res.data.list[21].singleReleaseLimit;this.formdata.singleReleaseLimit8 = res.data.list[24].singleReleaseLimit;this.formdata.singleReleaseLimit9 = res.data.list[25].singleReleaseLimit;
            this.formdata.singleReleaseLimit10 = res.data.list[26].singleReleaseLimit;this.formdata.singleReleaseLimit11 = res.data.list[35].singleReleaseLimit;this.formdata.singleReleaseLimit12 = res.data.list[38].singleReleaseLimit;
            this.formdata.singleReleaseLimit13 = res.data.list[41].singleReleaseLimit;this.formdata.singleReleaseLimit14 = res.data.list[42].singleReleaseLimit;this.formdata.singleReleaseLimit15 = res.data.list[44].singleReleaseLimit;
            this.formdata.singleReleaseLimit16 = res.data.list[48].singleReleaseLimit;this.formdata.singleReleaseLimit17 = res.data.list[51].singleReleaseLimit;
            this.formdata.coinsNumS1 = res.data.list[35].numTime;this.formdata.coinsNumS2 = res.data.list[36].numTime;this.formdata.coinsNumS3 = res.data.list[37].numTime;
            this.formdata.coinsNumS4 = res.data.list[38].numTime;this.formdata.coinsNumS5 = res.data.list[39].numTime;this.formdata.coinsNumS6 = res.data.list[40].numTime;
            this.formdata.numTime1 = res.data.list[42].numTime;this.formdata.numTime2 = res.data.list[43].numTime;
            }
            else{
            for(let z1 = 1;z1<54;z1++){
                this.formdata['coinsNum'+z1]=null
            }
            for(let z2 = 1;z2<13;z2++){
                this.formdata['dailyLimit'+z2]=null
            }
            for(let z3 = 1;z3<18;z3++){
                this.formdata['singleReleaseLimit'+z3]=null
            }
            for(let z4 = 1;z4<7;z4++){
                this.formdata['coinsNumS'+z4]=null
            }    
            for(let z5 = 1;z5<3;z5++){
                this.formdata['numTime'+z5]=null
            }
            this.$refs['formdata'].resetFields();
            }
            this.$forceUpdate()
        })
        },
        getMoreInformation(){
            aflcProvinceCode().then(res=>{
                this.cityTree = res.data;
           })
        },
        nodeClick(data){
        if(this.formAll.cityCode==data.code){
        this.$refs.treeForm.setCheckedNodes([])
        this.formAll.cityCode = null
        }
        else{
        this.formAll.cityCode = data.code
        this.$refs.treeForm.setCheckedNodes([data])
        }
        this.firstblood();
        },
        Addsave(){
            let form = [
            {cityCode:this.formAll.cityCode,grantClass:'AF00601',grantClassName:'完善账户',grantCoinsItem:'AF0060101',grantCoinsItemName:'实名认证',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum1,dailyLimit:0,singleReleaseLimit:0},
            {cityCode:this.formAll.cityCode,grantClass:'AF00601',grantClassName:'完善账户',grantCoinsItem:'AF0060102',grantCoinsItemName:'绑定微信',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum2,dailyLimit:0,singleReleaseLimit:0},
            {cityCode:this.formAll.cityCode,grantClass:'AF00601',grantClassName:'完善账户',grantCoinsItem:'AF0060103',grantCoinsItemName:'关注公众号',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum3,dailyLimit:0,singleReleaseLimit:0},
            {cityCode:this.formAll.cityCode,grantClass:'AF00601',grantClassName:'完善账户',grantCoinsItem:'AF0060104',grantCoinsItemName:'缴纳保证金',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum4,dailyLimit:0,singleReleaseLimit:0},
            {cityCode:this.formAll.cityCode,grantClass:'AF00601',grantClassName:'完善账户',grantCoinsItem:'AF0060105',grantCoinsItemName:'绑定银行卡',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum5,dailyLimit:0,singleReleaseLimit:0},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF0060201',grantCoinsItemName:'抢单',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum6,dailyLimit:this.formdata.dailyLimit1,singleReleaseLimit:this.formdata.singleReleaseLimit1},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020201',grantCoinsItemName:'达标',grantCoinsItemParent:'AF0060202',grantCoinsItemParentName:'中单后及时联系货主',numTime:0,coinsNum:this.formdata.coinsNum7,dailyLimit:this.formdata.dailyLimit2,singleReleaseLimit:this.formdata.singleReleaseLimit2},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020202',grantCoinsItemName:'不达标',grantCoinsItemParent:'AF0060202',grantCoinsItemParentName:'中单后及时联系货主',numTime:0,coinsNum:this.formdata.coinsNum8,dailyLimit:this.formdata.dailyLimit2,singleReleaseLimit:this.formdata.singleReleaseLimit2},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020203',grantCoinsItemName:'严重不达标',grantCoinsItemParent:'AF0060202',grantCoinsItemParentName:'中单后及时联系货主',numTime:0,coinsNum:this.formdata.coinsNum9,dailyLimit:this.formdata.dailyLimit2,singleReleaseLimit:this.formdata.singleReleaseLimit2},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020301',grantCoinsItemName:'达标',grantCoinsItemParent:'AF0060203',grantCoinsItemParentName:'及时到车',numTime:0,coinsNum:this.formdata.coinsNum10,dailyLimit:this.formdata.dailyLimit3,singleReleaseLimit:this.formdata.singleReleaseLimit3},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020302',grantCoinsItemName:'不达标',grantCoinsItemParent:'AF0060203',grantCoinsItemParentName:'及时到车',numTime:0,coinsNum:this.formdata.coinsNum11,dailyLimit:this.formdata.dailyLimit3,singleReleaseLimit:this.formdata.singleReleaseLimit3},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020303',grantCoinsItemName:'严重不达标',grantCoinsItemParent:'AF0060203',grantCoinsItemParentName:'及时到车',numTime:0,coinsNum:this.formdata.coinsNum12,dailyLimit:this.formdata.dailyLimit3,singleReleaseLimit:this.formdata.singleReleaseLimit3},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020401',grantCoinsItemName:'达标',grantCoinsItemParent:'AF0060204',grantCoinsItemParentName:'及时到货',numTime:0,coinsNum:this.formdata.coinsNum13,dailyLimit:this.formdata.dailyLimit4,singleReleaseLimit:this.formdata.singleReleaseLimit4},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020402',grantCoinsItemName:'不达标',grantCoinsItemParent:'AF0060204',grantCoinsItemParentName:'及时到货',numTime:0,coinsNum:this.formdata.coinsNum14,dailyLimit:this.formdata.dailyLimit4,singleReleaseLimit:this.formdata.singleReleaseLimit4},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020403',grantCoinsItemName:'严重不达标',grantCoinsItemParent:'AF0060204',grantCoinsItemParentName:'及时到货',numTime:0,coinsNum:this.formdata.coinsNum15,dailyLimit:this.formdata.dailyLimit4,singleReleaseLimit:this.formdata.singleReleaseLimit4},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020501',grantCoinsItemName:'达标',grantCoinsItemParent:'AF0060205',grantCoinsItemParentName:'按时回单',numTime:0,coinsNum:this.formdata.coinsNum16,dailyLimit:this.formdata.dailyLimit5,singleReleaseLimit:this.formdata.singleReleaseLimit5},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020502',grantCoinsItemName:'不达标',grantCoinsItemParent:'AF0060205',grantCoinsItemParentName:'按时回单',numTime:0,coinsNum:this.formdata.coinsNum17,dailyLimit:this.formdata.dailyLimit5,singleReleaseLimit:this.formdata.singleReleaseLimit5},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020503',grantCoinsItemName:'严重不达标',grantCoinsItemParent:'AF0060205',grantCoinsItemParentName:'按时回单',numTime:0,coinsNum:this.formdata.coinsNum18,dailyLimit:this.formdata.dailyLimit5,singleReleaseLimit:this.formdata.singleReleaseLimit5},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020601',grantCoinsItemName:'达标',grantCoinsItemParent:'AF0060206',grantCoinsItemParentName:'按时回款',numTime:0,coinsNum:this.formdata.coinsNum19,dailyLimit:this.formdata.dailyLimit6,singleReleaseLimit:this.formdata.singleReleaseLimit6},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020602',grantCoinsItemName:'不达标',grantCoinsItemParent:'AF0060206',grantCoinsItemParentName:'按时回款',numTime:0,coinsNum:this.formdata.coinsNum20,dailyLimit:this.formdata.dailyLimit6,singleReleaseLimit:this.formdata.singleReleaseLimit6},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020603',grantCoinsItemName:'严重不达标',grantCoinsItemParent:'AF0060206',grantCoinsItemParentName:'按时回款',numTime:0,coinsNum:this.formdata.coinsNum21,dailyLimit:this.formdata.dailyLimit6,singleReleaseLimit:this.formdata.singleReleaseLimit6},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020701',grantCoinsItemName:'达标',grantCoinsItemParent:'AF0060207',grantCoinsItemParentName:'到车到货距离正常',numTime:0,coinsNum:this.formdata.coinsNum22,dailyLimit:this.formdata.dailyLimit7,singleReleaseLimit:this.formdata.singleReleaseLimit7},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020702',grantCoinsItemName:'不达标',grantCoinsItemParent:'AF0060207',grantCoinsItemParentName:'到车到货距离正常',numTime:0,coinsNum:this.formdata.coinsNum23,dailyLimit:this.formdata.dailyLimit7,singleReleaseLimit:this.formdata.singleReleaseLimit7},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006020703',grantCoinsItemName:'严重不达标',grantCoinsItemParent:'AF0060207',grantCoinsItemParentName:'到车到货距离正常',numTime:0,coinsNum:this.formdata.coinsNum24,dailyLimit:this.formdata.dailyLimit7,singleReleaseLimit:this.formdata.singleReleaseLimit7},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF0060208',grantCoinsItemName:'完成订单（确认收货）',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum25,dailyLimit:this.formdata.dailyLimit8,singleReleaseLimit:this.formdata.singleReleaseLimit8},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF0060209',grantCoinsItemName:'货主线上支付运费',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum26,dailyLimit:this.formdata.dailyLimit9,singleReleaseLimit:this.formdata.singleReleaseLimit9},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021001',grantCoinsItemName:'五星',grantCoinsItemParent:'AF0060210',grantCoinsItemParentName:'货主评价',numTime:0,coinsNum:this.formdata.coinsNum27,dailyLimit:this.formdata.dailyLimit10,singleReleaseLimit:this.formdata.singleReleaseLimit10},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021002',grantCoinsItemName:'四星',grantCoinsItemParent:'AF0060210',grantCoinsItemParentName:'货主评价',numTime:0,coinsNum:this.formdata.coinsNum28,dailyLimit:this.formdata.dailyLimit10,singleReleaseLimit:this.formdata.singleReleaseLimit10},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021003',grantCoinsItemName:'三星',grantCoinsItemParent:'AF0060210',grantCoinsItemParentName:'货主评价',numTime:0,coinsNum:this.formdata.coinsNum29,dailyLimit:this.formdata.dailyLimit10,singleReleaseLimit:this.formdata.singleReleaseLimit10},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021004',grantCoinsItemName:'二星',grantCoinsItemParent:'AF0060210',grantCoinsItemParentName:'货主评价',numTime:0,coinsNum:this.formdata.coinsNum30,dailyLimit:this.formdata.dailyLimit10,singleReleaseLimit:this.formdata.singleReleaseLimit10},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021005',grantCoinsItemName:'一星',grantCoinsItemParent:'AF0060210',grantCoinsItemParentName:'货主评价',numTime:0,coinsNum:this.formdata.coinsNum31,dailyLimit:this.formdata.dailyLimit10,singleReleaseLimit:this.formdata.singleReleaseLimit10},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021006',grantCoinsItemName:'零星',grantCoinsItemParent:'AF0060210',grantCoinsItemParentName:'货主评价',numTime:0,coinsNum:this.formdata.coinsNum32,dailyLimit:this.formdata.dailyLimit10,singleReleaseLimit:this.formdata.singleReleaseLimit10},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF0060211',grantCoinsItemName:'被投诉（有责 ）',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum33,dailyLimit:0,singleReleaseLimit:0},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF0060212',grantCoinsItemName:'有货损（有责）',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum34,dailyLimit:0,singleReleaseLimit:0},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF0060213',grantCoinsItemName:'订单改派',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum35,dailyLimit:0,singleReleaseLimit:0},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021401',grantCoinsItemName:'完成X单',grantCoinsItemParent:'AF0060214',grantCoinsItemParentName:'每天累计完成订单',numTime:this.formdata.coinsNumS1,coinsNum:this.formdata.coinsNum36,dailyLimit:0,singleReleaseLimit:this.formdata.singleReleaseLimit11},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021402',grantCoinsItemName:'完成Y单',grantCoinsItemParent:'AF0060214',grantCoinsItemParentName:'每天累计完成订单',numTime:this.formdata.coinsNumS2,coinsNum:this.formdata.coinsNum37,dailyLimit:0,singleReleaseLimit:this.formdata.singleReleaseLimit11},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021403',grantCoinsItemName:'完成Z单',grantCoinsItemParent:'AF0060214',grantCoinsItemParentName:'每天累计完成订单',numTime:this.formdata.coinsNumS3,coinsNum:this.formdata.coinsNum38,dailyLimit:0,singleReleaseLimit:this.formdata.singleReleaseLimit11},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021501',grantCoinsItemName:'完成X单',grantCoinsItemParent:'AF0060215',grantCoinsItemParentName:'每月累计完成订单',numTime:this.formdata.coinsNumS4,coinsNum:this.formdata.coinsNum39,dailyLimit:0,singleReleaseLimit:this.formdata.singleReleaseLimit12},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021502',grantCoinsItemName:'完成Y单',grantCoinsItemParent:'AF0060215',grantCoinsItemParentName:'每月累计完成订单',numTime:this.formdata.coinsNumS5,coinsNum:this.formdata.coinsNum40,dailyLimit:0,singleReleaseLimit:this.formdata.singleReleaseLimit12},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF006021503',grantCoinsItemName:'完成Z单',grantCoinsItemParent:'AF0060215',grantCoinsItemParentName:'每月累计完成订单',numTime:this.formdata.coinsNumS6,coinsNum:this.formdata.coinsNum41,dailyLimit:0,singleReleaseLimit:this.formdata.singleReleaseLimit12},
            {cityCode:this.formAll.cityCode,grantClass:'AF00602',grantClassName:'小货车接单服务',grantCoinsItem:'AF0060216',grantCoinsItemName:'接单年限',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum42,dailyLimit:0,singleReleaseLimit:this.formdata.singleReleaseLimit13},
            
            {cityCode:this.formAll.cityCode,grantClass:'AF00603',grantClassName:'更多互动',grantCoinsItem:'AF006030101',grantCoinsItemName:'在线X小时',grantCoinsItemParent:'AF0060301',grantCoinsItemParentName:'每天在线时长',numTime:this.formdata.numTime1,coinsNum:this.formdata.coinsNum43,dailyLimit:0,singleReleaseLimit:this.formdata.singleReleaseLimit14},
            {cityCode:this.formAll.cityCode,grantClass:'AF00603',grantClassName:'更多互动',grantCoinsItem:'AF006030102',grantCoinsItemName:'在线Y小时',grantCoinsItemParent:'AF0060301',grantCoinsItemParentName:'每天在线时长',numTime:this.formdata.numTime2,coinsNum:this.formdata.coinsNum44,dailyLimit:0,singleReleaseLimit:this.formdata.singleReleaseLimit14},
            {cityCode:this.formAll.cityCode,grantClass:'AF00603',grantClassName:'更多互动',grantCoinsItem:'AF006030201',grantCoinsItemName:'分享邀请链接',grantCoinsItemParent:'AF0060302',grantCoinsItemParentName:'分享',numTime:0,coinsNum:this.formdata.coinsNum45,dailyLimit:this.formdata.dailyLimit11,singleReleaseLimit:this.formdata.singleReleaseLimit15},
            {cityCode:this.formAll.cityCode,grantClass:'AF00603',grantClassName:'更多互动',grantCoinsItem:'AF006030202',grantCoinsItemName:'分享货源链接',grantCoinsItemParent:'AF0060302',grantCoinsItemParentName:'分享',numTime:0,coinsNum:this.formdata.coinsNum46,dailyLimit:this.formdata.dailyLimit11,singleReleaseLimit:this.formdata.singleReleaseLimit15},
            {cityCode:this.formAll.cityCode,grantClass:'AF00603',grantClassName:'更多互动',grantCoinsItem:'AF006030203',grantCoinsItemName:'分享车源链接',grantCoinsItemParent:'AF0060302',grantCoinsItemParentName:'分享',numTime:0,coinsNum:this.formdata.coinsNum47,dailyLimit:this.formdata.dailyLimit11,singleReleaseLimit:this.formdata.singleReleaseLimit15},
            {cityCode:this.formAll.cityCode,grantClass:'AF00603',grantClassName:'更多互动',grantCoinsItem:'AF006030204',grantCoinsItemName:'分享车源链接',grantCoinsItemParent:'AF0060302',grantCoinsItemParentName:'分享',numTime:0,coinsNum:this.formdata.coinsNum48,dailyLimit:this.formdata.dailyLimit11,singleReleaseLimit:this.formdata.singleReleaseLimit15},
            {cityCode:this.formAll.cityCode,grantClass:'AF00603',grantClassName:'更多互动',grantCoinsItem:'AF006030301',grantCoinsItemName:'货主',grantCoinsItemParent:'AF0060303',grantCoinsItemParentName:'成功邀请',numTime:0,coinsNum:this.formdata.coinsNum49,dailyLimit:this.formdata.dailyLimit12,singleReleaseLimit:this.formdata.singleReleaseLimit16},
            {cityCode:this.formAll.cityCode,grantClass:'AF00603',grantClassName:'更多互动',grantCoinsItem:'AF006030302',grantCoinsItemName:'车主',grantCoinsItemParent:'AF0060303',grantCoinsItemParentName:'成功邀请',numTime:0,coinsNum:this.formdata.coinsNum50,dailyLimit:this.formdata.dailyLimit12,singleReleaseLimit:this.formdata.singleReleaseLimit16},
            {cityCode:this.formAll.cityCode,grantClass:'AF00603',grantClassName:'更多互动',grantCoinsItem:'AF006030303',grantCoinsItemName:'物流公司',grantCoinsItemParent:'AF0060303',grantCoinsItemParentName:'成功邀请',numTime:0,coinsNum:this.formdata.coinsNum51,dailyLimit:this.formdata.dailyLimit12,singleReleaseLimit:this.formdata.singleReleaseLimit16},
            {cityCode:this.formAll.cityCode,grantClass:'AF00603',grantClassName:'更多互动',grantCoinsItem:'AF0060304',grantCoinsItemName:'每天签到',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum52,dailyLimit:0,singleReleaseLimit:this.formdata.singleReleaseLimit17},
            {cityCode:this.formAll.cityCode,grantClass:'AF00604',grantClassName:'车身广告',grantCoinsItem:'AF00604',grantCoinsItemName:'车身广告',grantCoinsItemParent:'',grantCoinsItemParentName:'',numTime:0,coinsNum:this.formdata.coinsNum53,dailyLimit:0,singleReleaseLimit:0},
        ]
        
        this.$refs['formdata'].validate(valid=>{
        if(valid){
        if(this.formAll.cityCode){    
        aflcCoinsSettingsAdd(form).then(res=>{
          this.$message.success('保存成功')
        }).catch(err=>{
          this.$message.error('保存失败')
        })
        }else{
        this.$message.error('请在左边选择KPI考核城市');
        }
        }
        else{
          this.$message.error('请填写完整的内容')
        }
       })
       }
    }    
}
</script>

<style lang="scss">
    .extendSystem{
        height:100%;    
        position: relative;
        margin-left:7px;
        padding-bottom: 0px;
        .side_left{
        height: 100%;
        position: relative;
            .side_left_top{
             height:99%;
             overflow-y: auto;
             overflow-x: hidden;
             }
        }
        .btn_footer{
                 text-align: center;
                 margin:20px 0px;
        }
        .el-tree-node__content{
        .el-checkbox{
            display: none;
        }
        }
        .el-tree-node__children{
            .el-checkbox{
                display: block
            }
        }
        .tree-table{
            width: 100%;
            border-left: 1px solid #d0d7e5;
            border-top: 1px solid #d0d7e5;
            font-size: 14px;
            color: #333;
            tr{
                th{
                border-right: 1px solid #d0d7e5;
                border-bottom: 1px solid #d0d7e5; 
                padding: 10px 10px;
                box-sizing: border-box;
                text-overflow: ellipsis;
                vertical-align: middle;
                background: #eaf0ff;
                }
                td{
                border-right: 1px solid #d0d7e5;
                border-bottom: 1px solid #d0d7e5; 
                padding: 0px 10px;
                box-sizing: border-box;
                text-overflow: ellipsis;
                vertical-align: middle;
                .td_red{
                    color:red
                }
                .el-input__inner{
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                }
                .el-form-item{
                    margin-bottom: 0px;
                    margin-right: 0px;
                }
                .el-form-item__error{
                    z-index: 2;
                }
                }
                .sizeInput{
                    span{
                        height: 41px;
                        line-height: 41px;
                        padding: 0px 5px;
                    }
                    .el-form-item{
                    width: 80px;
                    }
                }
            }
        }
        
        }
</style>


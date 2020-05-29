<template>
    <div class="commoncss">
        <el-dialog
                :close-on-click-modal="false"
                v-el-drag-dialog
                :visible.sync="dialogFormVisible"
                @close="closeClick"
                title=""
                width="1400px"
        >
            <el-tabs type="border-card">
                <el-tab-pane label="货主订单">
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100">
                        <tr>
                            <th colspan ="6">基础信息</th>
                        </tr>
                        <tr>
                            <td class="key">订单号</td>
                            <td class="value">AFWL2018070511190465522</td>
                            <td class="key">订单类型</td>
                            <td class="value">发物流</td>
                            <td class="key">订单状态</td>
                            <td class="value c_r">已揽收</td>
                        </tr>
                        <tr>
                            <td class="key">货主账号</td>
                            <td class="value">13812345678</td>
                            <td class="key">货主姓名</td>
                            <td class="value">刘晓丽</td>
                            <td class="key">货主所属业务员</td>
                            <td class="value">李思丽</td>
                        </tr>
                        <tr>
                            <td class="key">订单来源</td>
                            <td class="value">IOS</td>
                            <td class="key">下单时间</td>
                            <td class="value">2019-04-24 14:48:38</td>
                            <td class="key">区代响应时间</td>
                            <td class="value c_r">2019-04-24 15:28:52（响应速度40分钟）</td>
                        </tr>
                        <tr>
                            <td class="key">揽收时间</td>
                            <td class="value c_r">2019-04-26 13:00:00</td>
                            <td class="key"></td>
                            <td class="value"></td>
                            <td class="key"></td>
                            <td class="value"></td>
                        </tr>
                        <tr>
                            <th colspan ="6">区代信息</th>
                        </tr>
                        <tr>
                            <td class="key">区代</td>
                            <td class="value c_r">天河南区代</td>
                            <td class="key">区代物流公司</td>
                            <td class="value c_r">广州福泉物流有限公司</td>
                            <td class="key">联系人</td>
                            <td class="value">张立成</td>
                        </tr>
                        <tr>
                            <td class="key">联系电话</td>
                            <td class="value">13888888888</td>
                            <td class="key">区代客服电话</td>
                            <td class="value">020-88888888</td>
                            <td class="key"></td>
                            <td class="value"></td>
                        </tr>
                        <tr>
                            <th colspan ="6">地址信息</th>
                        </tr>
                        <tr>
                            <td class="key">发货地</td>
                            <td class="value c_r">广州市天河区</td>
                            <td class="key">发货街道</td>
                            <td class="value">天河南街道</td>
                            <td class="key">发货详细地址</td>
                            <td class="value">丰兴广场（天河南路242号丰兴广场B1804）</td>
                        </tr>
                        <tr>
                            <td class="key">发货人</td>
                            <td class="value">李鑫</td>
                            <td class="key">联系方式</td>
                            <td class="value">18822222222</td>
                            <td class="key">是否上门接货</td>
                            <td class="value c_r">需要（2019-04-24 上午6:00-12:00）</td>
                        </tr>
                        <tr>
                            <td class="key">收货地</td>
                            <td class="value c_r">北京市朝阳区</td>
                            <td class="key">收货街道</td>
                            <td class="value">南磨房地区</td>
                            <td class="key">收货详细地址</td>
                            <td class="value">XXXXX（XX路XX号）</td>
                        </tr>
                        <tr>
                            <td class="key">收货人</td>
                            <td class="value">李欣才</td>
                            <td class="key">联系方式</td>
                            <td class="value">13612345685</td>
                            <td class="key">是否需要送货</td>
                            <td class="value c_r">不需要</td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 t_fix b_t">
                        <tr>
                            <th colspan ="4">货物信息</th>
                        </tr>
                        <tr>
                            <td class="c_3">货物名称</td>
                            <td class="c_3">重量（公斤）</td>
                            <td class="c_3">体积（立方）</td>
                            <td class="c_3">件数</td>
                        </tr>
                        <tr>
                            <td class="c_9">油漆</td>
                            <td class="c_9">1000</td>
                            <td class="c_9">1.1</td>
                            <td class="c_9">100</td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 b_t">
                        <tr>
                            <th colspan ="6">增值服务</th>
                        </tr>
                        <tr>
                            <td class="key">货物保价</td>
                            <td class="value">50000元</td>
                            <td class="key">代收货款</td>
                            <td class="value">50000元</td>
                            <td class="key">签收单</td>
                            <td class="value">原单返回</td>
                        </tr>
                        <tr>
                            <td class="key">发货备注</td>
                            <td class="value" colspan ="5">XXXXXXXXX</td>
                        </tr>
                        <tr>
                            <th colspan ="6">  预估运费</th>
                        </tr>
                        <tr>
                            <td class="key">预估运费总额</td>
                            <td class="value c_r">￥2000</td>
                            <td class="key">付款方式</td>
                            <td class="value">到付</td>
                            <td class="key">预估优惠金减免</td>
                            <td class="value c_r">¥-10</td>
                        </tr>
                        <tr>
                            <td class="key">预估优惠券减免</td>
                            <td class="value c_r">¥-10</td>
                            <td class="key">预估货主应付款金额</td>
                            <td class="value c_r">￥1980</td>
                            <td class="key"></td>
                            <td class="value"></td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 t_fix b_t">
                        <tr>
                            <td class="c_3">费用科目</td>
                            <td class="c_3">预估金额</td>
                        </tr>
                        <tr>
                            <td class="c_9">运费</td>
                            <td class="c_9">¥1500</td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="区代运单">
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100">
                        <tr>
                            <th colspan ="6">基础信息</th>
                        </tr>
                        <tr>
                            <td class="key">区代运单号</td>
                            <td class="value">AFWL2018070511190465522</td>
                            <td class="key">运单状态</td>
                            <td class="value c_r">货主已确认收货</td>
                            <td class="key">揽收时间</td>
                            <td class="value">2019-04-26 13:00:00</td>
                        </tr>
                        <tr>
                            <td class="key">预计到达日期</td>
                            <td class="value">2019-04-27</td>
                            <td class="key">发车时间</td>
                            <td class="value">2019-04-26  16:52:32</td>
                            <td class="key">实际到达时间</td>
                            <td class="value">2019-04-28  16:52:32（超出预计1天）</td>
                        </tr>
                        <tr>
                            <td class="key">签收时间</td>
                            <td class="value">2019-04-27  16:52:32（超出预计1天4小时）</td>
                            <td class="key">货主确认收货时间</td>
                            <td class="value c_r">2019-04-29  18:00:01（平台自动确认收货）</td>
                            <td class="key"></td>
                            <td class="value"></td>
                        </tr>
                        <tr>
                            <th colspan ="6">地址信息</th>
                        </tr>
                        <tr>
                            <td class="key">发货地</td>
                            <td class="value c_r">广州市天河区</td>
                            <td class="key">发货街道</td>
                            <td class="value">天河南街道</td>
                            <td class="key">发货详细地址</td>
                            <td class="value">丰兴广场（天河南路242号丰兴广场B1804）</td>
                        </tr>
                        <tr>
                            <td class="key">发货人</td>
                            <td class="value">李鑫</td>
                            <td class="key">联系方式</td>
                            <td class="value">18822222222</td>
                            <td class="key">是否上门接货</td>
                            <td class="value c_r">需要（2019-04-24 上午6:00-12:00）</td>
                        </tr>
                        <tr>
                            <td class="key">收货地</td>
                            <td class="value c_r">北京市朝阳区</td>
                            <td class="key">收货街道</td>
                            <td class="value">南磨房地区</td>
                            <td class="key">收货详细地址</td>
                            <td class="value">XXXXX（XX路XX号）</td>
                        </tr>
                        <tr>
                            <td class="key">收货人</td>
                            <td class="value">李欣才</td>
                            <td class="key">联系方式</td>
                            <td class="value">13612345685</td>
                            <td class="key">是否需要送货</td>
                            <td class="value c_r">不需要</td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 t_fix b_t">
                        <tr>
                            <th colspan ="4">货物信息</th>
                        </tr>
                        <tr>
                            <td class="c_3">货物名称</td>
                            <td class="c_3">重量（公斤）</td>
                            <td class="c_3">体积（立方）</td>
                            <td class="c_3">件数</td>
                        </tr>
                        <tr>
                            <td class="c_9">油漆</td>
                            <td class="c_9">1000</td>
                            <td class="c_9">1.1</td>
                            <td class="c_9">100</td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 b_t">
                        <tr>
                            <th colspan ="6">增值服务</th>
                        </tr>
                        <tr>
                            <td class="key">货物保价</td>
                            <td class="value">50000元</td>
                            <td class="key">代收货款</td>
                            <td class="value">50000元</td>
                            <td class="key">签收单</td>
                            <td class="value">原单返回</td>
                        </tr>
                        <tr>
                            <td class="key">发货备注</td>
                            <td class="value" colspan ="5">XXXXXXXXX</td>
                        </tr>
                        <tr>
                            <th colspan ="6">运费信息</th>
                        </tr>
                        <tr>
                            <td class="key">实际运费总金额</td>
                            <td class="value c_r">￥2000</td>
                            <td class="key">开单运费总金额</td>
                            <td class="value">￥2000</td>
                            <td class="key">货主选择付款方式</td>
                            <td class="value">现付</td>
                        </tr>
                        <tr>
                            <td class="key">优惠金</td>
                            <td class="value c_r">¥-10</td>
                            <td class="key">优惠券</td>
                            <td class="value c_r">￥1980</td>
                            <td class="key">货主应付运费金额</td>
                            <td class="value c_r">￥2030</td>
                        </tr>
                        <tr>
                            <td class="key">付款状态</td>
                            <td class="value c_r">¥-10</td>
                            <td class="key"></td>
                            <td class="value c_r"></td>
                            <td class="key"></td>
                            <td class="value c_r"></td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 t_fix b_t">
                        <tr>
                            <td class="c_3">费用科目</td>
                            <td class="c_3">实际费用金额</td>
                            <td class="c_3">开单费用金额</td>
                        </tr>
                        <tr>
                            <td class="c_9">运费</td>
                            <td class="c_9">¥1450</td>
                            <td class="c_9">¥1450</td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 t_fix b_t">
                        <tr>
                            <th colspan ="8">费用变更</th>
                        </tr>
                        <tr>
                            <td class="c_3">申请人</td>
                            <td class="c_3">申请人类型</td>
                            <td class="c_3">申请时间</td>
                            <td class="c_3">总金额</td>
                            <td class="c_3">明细</td>
                            <td class="c_3">状态</td>
                            <td class="c_3">审核时间</td>
                            <td class="c_3">备注</td>
                        </tr>
                        <tr>
                            <td class="c_9">18565382929-张立新</td>
                            <td class="c_9">货主</td>
                            <td class="c_9">2019-07-01 12:12:25</td>
                            <td class="c_r">-50</td>
                            <td class="c_9">运费-50</td>
                            <td class="c_9">已退款</td>
                            <td class="c_9">2019-07-01 12:12:26</td>
                            <td class="c_9">退运费</td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="区代中转单">
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100">
                        <tr>
                            <th colspan ="6">基础信息</th>
                        </tr>
                        <tr>
                            <td class="key">中转单号</td>
                            <td class="value">AFWL2018070511190465522</td>
                            <td class="key">中转单状态</td>
                            <td class="value c_r">已揽收</td>
                            <td class="key">中转时间</td>
                            <td class="value ">2019-04-26 13:00:00</td>
                        </tr>
                        <tr>
                            <td class="key">专线揽收时间</td>
                            <td class="value c_r">2019-04-26 13:00:00</td>
                            <td class="key"></td>
                            <td class="value"></td>
                            <td class="key"></td>
                            <td class="value"></td>
                        </tr>
                        <tr>
                            <th colspan ="6">专线承运商信息</th>
                        </tr>
                        <tr>
                            <td class="key">专线承运商</td>
                            <td class="value c_r">广州青春物流有限公司</td>
                            <td class="key">联系人</td>
                            <td class="value">李鑫</td>
                            <td class="key">联系人电话</td>
                            <td class="value c_r">18538556666</td>
                        </tr>
                        <tr>
                            <td class="key">客服电话</td>
                            <td class="value">020-8888888</td>
                            <td class="key"></td>
                            <td class="value"></td>
                            <td class="key"></td>
                            <td class="value"></td>
                        </tr>
                        <tr>
                            <th colspan ="6">  预估中转费</th>
                        </tr>
                        <tr>
                            <td class="key">预估中转费总额</td>
                            <td class="value c_r">￥1500</td>
                            <td class="key">付款方式</td>
                            <td class="value c_r">到付</td>
                            <td class="key"></td>
                            <td class="value c_r"></td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 t_fix b_t">
                        <tr>
                            <td class="c_3">费用科目</td>
                            <td class="c_3">预估费用金额</td>
                        </tr>
                        <tr>
                            <td class="c_9">运费</td>
                            <td class="c_9">¥1300</td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="专线运单">
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100">
                        <tr>
                            <th colspan ="6">基础信息</th>
                        </tr>
                        <tr>
                            <td class="key">专线运单号</td>
                            <td class="value">AFWL2018070511190465522</td>
                            <td class="key">运单状态</td>
                            <td class="value c_r">货主已确认收货</td>
                            <td class="key">揽收时间</td>
                            <td class="value">2019-04-26 13:00:00</td>
                        </tr>
                        <tr>
                            <td class="key">预计到达日期</td>
                            <td class="value">2019-04-27</td>
                            <td class="key">发车时间</td>
                            <td class="value">2019-04-26  16:52:32</td>
                            <td class="key">实际到达时间</td>
                            <td class="value">2019-04-28  16:52:32（超出预计1天）</td>
                        </tr>
                        <tr>
                            <td class="key">签收时间</td>
                            <td class="value">2019-04-27  16:52:32（超出预计1天4小时）</td>
                            <td class="key">货主确认收货时间</td>
                            <td class="value c_r">2019-04-29  18:00:01（平台自动确认收货）</td>
                            <td class="key"></td>
                            <td class="value"></td>
                        </tr>
                        <tr>
                            <th colspan ="6">地址信息</th>
                        </tr>
                        <tr>
                            <td class="key">发货地</td>
                            <td class="value c_r">广州市天河区</td>
                            <td class="key">发货街道</td>
                            <td class="value">天河南街道</td>
                            <td class="key">发货详细地址</td>
                            <td class="value">丰兴广场（天河南路242号丰兴广场B1804）</td>
                        </tr>
                        <tr>
                            <td class="key">发货人</td>
                            <td class="value">李鑫</td>
                            <td class="key">联系方式</td>
                            <td class="value">18822222222</td>
                            <td class="key">是否上门接货</td>
                            <td class="value c_r">需要（2019-04-24 上午6:00-12:00）</td>
                        </tr>
                        <tr>
                            <td class="key">收货地</td>
                            <td class="value c_r">北京市朝阳区</td>
                            <td class="key">收货街道</td>
                            <td class="value">南磨房地区</td>
                            <td class="key">收货详细地址</td>
                            <td class="value">XXXXX（XX路XX号）</td>
                        </tr>
                        <tr>
                            <td class="key">收货人</td>
                            <td class="value">李欣才</td>
                            <td class="key">联系方式</td>
                            <td class="value">13612345685</td>
                            <td class="key">是否需要送货</td>
                            <td class="value c_r">不需要</td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 t_fix b_t">
                        <tr>
                            <th colspan ="4">货物信息</th>
                        </tr>
                        <tr>
                            <td class="c_3">货物名称</td>
                            <td class="c_3">重量（公斤）</td>
                            <td class="c_3">体积（立方）</td>
                            <td class="c_3">件数</td>
                        </tr>
                        <tr>
                            <td class="c_9">油漆</td>
                            <td class="c_9">1000</td>
                            <td class="c_9">1.1</td>
                            <td class="c_9">100</td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 b_t">
                        <tr>
                            <th colspan ="6">增值服务</th>
                        </tr>
                        <tr>
                            <td class="key">货物保价</td>
                            <td class="value">50000元</td>
                            <td class="key">代收货款</td>
                            <td class="value">50000元</td>
                            <td class="key">签收单</td>
                            <td class="value">原单返回</td>
                        </tr>
                        <tr>
                            <td class="key">发货备注</td>
                            <td class="value" colspan ="5">XXXXXXXXX</td>
                        </tr>
                        <tr>
                            <th colspan ="6">运费信息</th>
                        </tr>
                        <tr>
                            <td class="key">实际运费总金额</td>
                            <td class="value c_r">￥2000</td>
                            <td class="key">开单运费总金额</td>
                            <td class="value">￥2000</td>
                            <td class="key">货主选择付款方式</td>
                            <td class="value">现付</td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 t_fix b_t">
                        <tr>
                            <td class="c_3">费用科目</td>
                            <td class="c_3">实际费用金额</td>
                            <td class="c_3">开单费用金额</td>
                        </tr>
                        <tr>
                            <td class="c_9">运费</td>
                            <td class="c_9">¥1450</td>
                            <td class="c_9">¥1450</td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 t_fix b_t">
                        <tr>
                            <th colspan ="8">费用变更</th>
                        </tr>
                        <tr>
                            <td class="c_3">申请人</td>
                            <td class="c_3">申请人类型</td>
                            <td class="c_3">申请时间</td>
                            <td class="c_3">总金额</td>
                            <td class="c_3">申请费用明细</td>
                            <td class="c_3">状态</td>
                            <td class="c_3">审核时间</td>
                            <td class="c_3">备注</td>
                        </tr>
                        <tr>
                            <td class="c_9">18565382929-张立新</td>
                            <td class="c_9">货主</td>
                            <td class="c_9">2019-07-01 12:12:25</td>
                            <td class="c_r">-50</td>
                            <td class="c_9">运费-50</td>
                            <td class="c_9">已同意</td>
                            <td class="c_9">2019-07-01 12:12:26</td>
                            <td class="c_9">退运费</td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="订单跟踪">
                    <el-button type="primary" size="mini" class="margin_b_10">增加跟踪记录</el-button>
                    <el-table
                            :data="tableData1"
                            style="width: 100%" border class="margin_b_10">
                        <el-table-column prop="date" label="实际操作时间" width="180"></el-table-column>
                        <el-table-column prop="name" label="操作人" width="180"></el-table-column>
                        <el-table-column prop="address" label="操作人类型"></el-table-column>
                        <el-table-column prop="address" label="货主是否可见"></el-table-column>
                        <el-table-column prop="address" label="反馈给货主的操作时间"></el-table-column>
                        <el-table-column prop="address" label="操作信息"></el-table-column>
                        <el-table-column prop="address" label="操作内容"></el-table-column>
                    </el-table>
                    <el-row type="flex" justify="space-between" align="middle">
                        共计:{{ dataTotal }}
                        <div class="show_pager">
                            <Pager :total="dataTotal" @change="handlePageChange1" ref="pager1"/>
                        </div>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="收支明细">
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100">
                        <tr>
                            <th colspan ="6">分账信息</th>
                        </tr>
                        <tr>
                            <td class="key">货主支付运费</td>
                            <td class="value c_r">￥2000</td>
                            <td class="key">区代入账金额</td>
                            <td class="value c_r">￥160</td>
                            <td class="key">专线承运商入账金额</td>
                            <td class="value c_r">￥1800</td>
                        </tr>
                        <tr>
                            <td class="key">平台分润金额</td>
                            <td class="value c_r">￥2000</td>
                            <td class="key">入账状态</td>
                            <td class="value c_r">待入账</td>
                            <td class="key"></td>
                            <td class="value c_r"></td>
                        </tr>
                    </table>
                    <table border="1" cellspacing="0" cellpadding="0" class="width_100 t_fix b_t">
                        <tr>
                            <th colspan ="9">收支明细</th>
                        </tr>
                        <tr>
                            <td class="c_3">交易流水号</td>
                            <td class="c_3">账户</td>
                            <td class="c_3">账户类型</td>
                            <td class="c_3">交易类型</td>
                            <td class="c_3">收支类型</td>
                            <td class="c_3">交易金额</td>
                            <td class="c_3">交易方式</td>
                            <td class="c_3">交易时间</td>
                            <td class="c_3">备注</td>
                        </tr>
                        <tr>
                            <td class="c_9">00000000000000001</td>
                            <td class="c_9">18568538568-张立新</td>
                            <td class="c_9">货主</td>
                            <td class="c_9">支付运费</td>
                            <td class="c_9">支出</td>
                            <td class="c_9">-50</td>
                            <td class="c_9">微信</td>
                            <td class="c_9">2019-04-01 12:35:25</td>
                            <td class="c_9">退送货费</td>
                        </tr>
                    </table>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
  import Pager from '@/components/Pagination/index'
  export default {
    name: 'myDialog',
    data() {
      return {
        dialogFormVisible: false,
        tableData1: [],
        dataTotal: 0
      }
    },
    components: { Pager },
    methods: {
      closeClick() {},
      handlePageChange1(obj) {
        // this.formData.pageNum = obj.pageNum
        // this.formData.pageSize = obj.pageSize
        // this.getList()
      }
    }
  }
</script>

<style scoped>
    .margin_b_10 {
        margin-bottom: 10px;
    }
    .width_100 {
        width: 100%;
    }
    .t_fix {
        table-layout: fixed;
    }
    table {
        border-color: #CBCBCB;
        border-width:0 0 0 0;
    }
    th {
        text-align: left;
        padding: 5px 10px;
        background-color: #F4F6F9;
    }
    td {
        padding: 5px 10px;
    }
    .key {
        width: 145px;
        color: #999999;
    }
    .value {
        width: 305px;
        color: #333333;
    }
    .c_3 {
        color: #333333;
    }
    .c_9 {
        color: #999999;
    }
    .c_r {
        color: red;
    }
    .b_t {
        border-top: 0;
    }
</style>

<template>
    <div class="partner">
        <div class="classify_searchinfo">
            <label>合伙人：
                <el-input
                  placeholder="请输入内容"
                  v-model="partnerform.name"
                  clearable>
                </el-input>
            </label>
            <label>所在地：
                <el-select v-model="partnerform.address" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </label>
            <label>所属组织：
                <el-select v-model="partnerform.org" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </label>
            <el-button type="info" plain>查询</el-button>
            <el-button type="info" plain>清空</el-button>
        </div>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" plain @click="dialogFormVisible_addparnter = true">新增</el-button>
                <el-button type="primary" plain @click="dialogFormVisible_break_off = true">查看已解约</el-button>
                <el-button type="primary" plain @click="dialogFormVisible = true">导出</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="parnterinfo"
                    stripe
                    border
                    tooltip-effect="dark"
                    style="width: 100%"> 
                     <el-table-column
                      prop="id"
                      label="序号">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="合伙人">
                    </el-table-column>
                    <el-table-column
                      prop="linkman"
                      label="联系人">
                    </el-table-column>
                    <el-table-column
                      prop="phonenumber"
                      label="手机号码">
                    </el-table-column>
                    <el-table-column
                      prop="propsaddress"
                      label="所在地">
                    </el-table-column>
                    <el-table-column
                      prop="statu"
                      label="所属组织">
                    </el-table-column>
                    <el-table-column
                      prop="describtion"
                      label="是否为平台合伙人">
                    </el-table-column>
                    <el-table-column
                      prop="isInit"
                      label="是否为平台承运商">
                    </el-table-column>
                    <el-table-column
                      prop="phone"
                      label="合伙人绑定货主数量">
                    </el-table-column>
                    <el-table-column
                      prop="phone"
                      label="合伙人绑定车主数量">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="400">
                        <template slot-scope="scope">
                            <el-button
                                round
                                @click="dialogFormVisible_details=true">详情</el-button>
                            <el-button
                                round
                                type="danger"
                                @click="dialogFormVisible_addparnter = true">修改</el-button>
                            <el-button type="primary" 
                                round
                                @click="dialogFormVisible_remove = true">解约</el-button>
                            <el-button type="primary" 
                                round
                                @click="dialogFormVisible_appendix = true">附件</el-button>
                            </template>
                    </el-table-column>
                  </el-table>
            </div>
            
            <!-- 页码 -->
            <div class="Pagination ">
                <div class="block">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage4"
                      :page-sizes="[100, 200, 300, 400]"
                      :page-size="100"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="400">
                    </el-pagination>
                  </div>
            </div>
        </div>
        <!-- 新增合伙人 -->
        <div class="addpartner commoncss">
            <el-dialog title="新增合伙人" :visible.sync="dialogFormVisible_addparnter">
              <el-form :model="newPartner" :rules="newpartnerrules">
                <el-form-item label="合伙人：" :label-width="formLabelWidth" prop="linkman">
                  <el-input v-model="newPartner.companyname" auto-complete="off" placeholder="请填写公司名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" :label-width="formLabelWidth">
                  <el-input v-model="newPartner.linkman" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="phone">
                  <el-input v-model="newPartner.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在地：" :label-width="formLabelWidth" prop="address">
                  <el-select v-model="newPartner.address" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属组织：" :label-width="formLabelWidth" prop="address">
                  <el-select v-model="newPartner.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="签约日期" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同开始日期：" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同结束日期：" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是平台合伙人" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="是" value="yse"></el-option>
                    <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是平台承运商" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="是" value="yse"></el-option>
                    <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-form-item>
                <div class="shipper_information">
                    <h2>合作片区</h2>
                    <el-form-item label="所属组织" :label-width="formLabelWidth">
                      <el-input v-model="newPartner.companyname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="归属片区" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="绑定合伙人" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="业务员" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible_addparnter = false">确定增加</el-button>
                <el-button @click="dialogFormVisible_addparnter = false">关 闭</el-button>
              </div>
            </el-dialog>
        </div> 
        <!-- 查看已解约 -->
        <div class="break_off commoncss">
            <el-dialog title="解约列表" :visible.sync="dialogFormVisible_break_off">
                <div class="classify_searchinfo">
                    <label>合伙人：
                        <el-input
                          placeholder="请输入内容"
                          v-model="partnerform.name"
                          clearable>
                        </el-input>
                    </label>
                    <label>所在地：
                        <el-select v-model="partnerform.address" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </label>
                    <label>所属组织：
                        <el-select v-model="partnerform.org" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </label>
                    <el-button type="info" plain>查询</el-button>
                    <el-button type="info" plain>清空</el-button>
                </div>
                <div class="classify_info">
                    <div class="btns_box">
                        <el-button type="primary" plain @click="dialogFormVisible = true">导出</el-button>
                    </div>
                    <div class="info_news">
                        <el-table
                            ref="multipleTable"
                            :data="break_offinfo"
                            stripe
                            border
                            tooltip-effect="dark"
                            style="width: 100%"> 
                            <el-table-column
                              prop="id"
                              label="附件">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="changedata()">附件</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                              prop="id"
                              label="序号">
                            </el-table-column>
                            <el-table-column
                              prop="name"
                              label="合伙人">
                            </el-table-column>
                            <el-table-column
                              prop="linkman"
                              label="公司名称">
                            </el-table-column>
                            <el-table-column
                              prop="phonenumber"
                              label="手机号码">
                            </el-table-column>
                            <el-table-column
                              prop="propsaddress"
                              label="所在地">
                            </el-table-column>
                            <el-table-column
                              prop="statu"
                              label="所属组织">
                            </el-table-column>
                            <el-table-column
                              prop="describtion"
                              label="合同开始日期">
                            </el-table-column>
                            <el-table-column
                              prop="isInit"
                              label="合同结束日期">
                            </el-table-column>
                            <el-table-column
                              prop="phone"
                              label="解约时间">
                            </el-table-column>
                            <el-table-column
                              prop="phone"
                              label="解约原因">
                            </el-table-column>
                          </el-table>
                    </div>
                    
                    <!-- 页码 -->
                    <div class="Pagination ">
                        <div class="block">
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page="currentPage4"
                              :page-sizes="[100, 200, 300, 400]"
                              :page-size="100"
                              layout="total, sizes, prev, pager, next, jumper"
                              :total="400">
                            </el-pagination>
                          </div>
                    </div>
                </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible_break_off = false">关 闭</el-button>
              </div>
            </el-dialog>
        </div> 
        <!-- 合伙人详情 -->
        <div class="details commoncss">
            <el-dialog title="合伙人详细资料" :visible.sync="dialogFormVisible_details">
                <el-tabs  type="card">
                    <!-- 基本信息 -->
                    <el-tab-pane label="基本信息">
                          <el-form :model="newPartner" :rules="newpartnerrules">
                            <el-form-item label="合伙人：" :label-width="formLabelWidth" prop="linkman">
                              <el-input v-model="newPartner.companyname" auto-complete="off" placeholder="请填写公司名称"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人：" :label-width="formLabelWidth">
                              <el-input v-model="newPartner.linkman" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="phone">
                              <el-input v-model="newPartner.phone" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="所在地：" :label-width="formLabelWidth" prop="address">
                              <el-select v-model="newPartner.address" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="所属组织：" :label-width="formLabelWidth" prop="address">
                              <el-select v-model="newPartner.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="签约日期" :label-width="formLabelWidth" prop="hzclassify">
                              <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="合同开始日期：" :label-width="formLabelWidth" prop="hzclassify">
                              <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="合同结束日期：" :label-width="formLabelWidth" prop="hzclassify">
                              <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="是平台合伙人" :label-width="formLabelWidth" prop="hzclassify">
                              <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                                <el-option label="是" value="yse"></el-option>
                                <el-option label="否" value="no"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="是平台承运商" :label-width="formLabelWidth" prop="hzclassify">
                              <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                                <el-option label="是" value="yse"></el-option>
                                <el-option label="否" value="no"></el-option>
                              </el-select>
                            </el-form-item>
                            <div class="shipper_information">
                                <h2>合作片区</h2>
                                <el-form-item label="所属组织" :label-width="formLabelWidth">
                                  <el-input v-model="newPartner.companyname" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="归属片区" :label-width="formLabelWidth" prop="hzclassify">
                                  <el-select v-model="newPartner.region" placeholder="请选择">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                  </el-select>
                                </el-form-item>
                                <el-form-item label="绑定合伙人" :label-width="formLabelWidth" prop="hzclassify">
                                  <el-select v-model="newPartner.region" placeholder="请选择">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                  </el-select>
                                </el-form-item>
                                <el-form-item label="业务员" :label-width="formLabelWidth" prop="hzclassify">
                                  <el-select v-model="newPartner.region" placeholder="请选择">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                  </el-select>
                                </el-form-item>
                            </div>
                            </el-form>
                            <div class="btn_close">
                                <el-button @click="dialogFormVisible_addparnter = false">关 闭</el-button>    
                            </div>
                    </el-tab-pane>
                    <!-- 合伙人货主 -->
                    <el-tab-pane label="合伙人货主">
                        <div class="details_search details_search_common">
                            <label>手机号码：
                                <el-input
                                placeholder="请输入内容"
                                v-model="partnerform.name"
                                clearable>
                                </el-input>
                            </label>
                            <label>公司名称：
                                <el-input
                                placeholder="请输入内容"
                                v-model="partnerform.name"
                                clearable>
                                </el-input>
                            </label>
                            <label>联系人姓名：
                                <el-input
                                placeholder="请输入内容"
                                v-model="partnerform.name"
                                clearable>
                                </el-input>
                            </label>
                            <el-button type="info" plain>查询</el-button>
                            <el-button type="info" plain>清空</el-button>
                        </div>
                        <el-table
                            ref="multipleTable"
                            :data="parnterinfo"
                            stripe
                            border
                            tooltip-effect="dark"
                            style="width: 100%"> 
                             <el-table-column
                              prop="id"
                              label="序号">
                            </el-table-column>
                            <el-table-column
                              prop="name"
                              label="手机号">
                            </el-table-column>
                            <el-table-column
                              prop="linkman"
                              label="公司名称">
                            </el-table-column>
                            <el-table-column
                              prop="phonenumber"
                              label="联系人姓名">
                            </el-table-column>
                            <el-table-column
                              prop="propsaddress"
                              label="所在片区">
                            </el-table-column>
                            <el-table-column
                              prop="propsaddress"
                              label="所在地">
                            </el-table-column>
                            <el-table-column
                              prop="propsaddress"
                              label="货主类型">
                            </el-table-column>
                        </el-table>
                        <!-- 页码 -->
                        <div class="Pagination ">
                            <div class="block">
                                <el-pagination
                                  @size-change="handleSizeChange"
                                  @current-change="handleCurrentChange"
                                  :current-page="currentPage4"
                                  :page-sizes="[100, 200, 300, 400]"
                                  :page-size="100"
                                  layout="total, sizes, prev, pager, next, jumper"
                                  :total="400">
                                </el-pagination>
                              </div>
                        </div>
                    </el-tab-pane>
                    <!-- 合伙人车主 -->
                    <el-tab-pane label="合伙人车主">
                        <div class="details_search details_search_common">
                            <label>手机号码：
                                <el-input
                                placeholder="请输入内容"
                                v-model="partnerform.name"
                                clearable>
                                </el-input>
                            </label>
                            <label>公司名称：
                                <el-input
                                placeholder="请输入内容"
                                v-model="partnerform.name"
                                clearable>
                                </el-input>
                            </label>
                            <label>车牌号：
                                <el-input
                                placeholder="请输入内容"
                                v-model="partnerform.name"
                                clearable>
                                </el-input>
                            </label>
                            <el-button type="info" plain>查询</el-button>
                            <el-button type="info" plain>清空</el-button>
                        </div>
                        <el-table
                            ref="multipleTable"
                            :data="parnterinfo"
                            stripe
                            border
                            tooltip-effect="dark"
                            style="width: 100%"> 
                             <el-table-column
                              prop="id"
                              label="序号">
                            </el-table-column>
                            <el-table-column
                              prop="name"
                              label="手机号">
                            </el-table-column>
                            <el-table-column
                              prop="linkman"
                              label="姓名">
                            </el-table-column>
                            <el-table-column
                              prop="phonenumber"
                              label="所在片区">
                            </el-table-column>
                            <el-table-column
                              prop="propsaddress"
                              label="所在城市">
                            </el-table-column>
                            <el-table-column
                              prop="propsaddress"
                              label="车牌号">
                            </el-table-column>
                            <el-table-column
                              prop="propsaddress"
                              label="车型">
                            </el-table-column>
                            <el-table-column
                              prop="propsaddress"
                              label="车长">
                            </el-table-column>
                        </el-table>
                        <!-- 页码 -->
                        <div class="Pagination ">
                            <div class="block">
                                <el-pagination
                                  @size-change="handleSizeChange"
                                  @current-change="handleCurrentChange"
                                  :current-page="currentPage4"
                                  :page-sizes="[100, 200, 300, 400]"
                                  :page-size="100"
                                  layout="total, sizes, prev, pager, next, jumper"
                                  :total="400">
                                </el-pagination>
                              </div>
                        </div>
                    </el-tab-pane>
                    <!-- 操作日志 -->
                    <el-tab-pane label="操作日志">
                        <el-table
                            ref="multipleTable"
                            :data="parnterinfo"
                            stripe
                            border
                            tooltip-effect="dark"
                            style="width: 100%"> 
                             <el-table-column
                              prop="id"
                              label="时间">
                            </el-table-column>
                            <el-table-column
                              prop="name"
                              label="操作人">
                            </el-table-column>
                            <el-table-column
                              prop="linkman"
                              label="操作日志">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>
        </div> 
        <!-- 修改合伙人 -->
        <div class="revise commoncss">
            <el-dialog title="修改合伙人" :visible.sync="dialogFormVisible_revise">
              <el-form :model="newPartner" :rules="newpartnerrules">
                <el-form-item label="合伙人：" :label-width="formLabelWidth" prop="linkman">
                  <el-input v-model="newPartner.companyname" auto-complete="off" placeholder="请填写公司名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" :label-width="formLabelWidth">
                  <el-input v-model="newPartner.linkman" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="phone">
                  <el-input v-model="newPartner.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在地：" :label-width="formLabelWidth" prop="address">
                  <el-select v-model="newPartner.address" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属组织：" :label-width="formLabelWidth" prop="address">
                  <el-select v-model="newPartner.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="签约日期" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同开始日期：" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同结束日期：" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是平台合伙人" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="是" value="yse"></el-option>
                    <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是平台承运商" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="是" value="yse"></el-option>
                    <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-form-item>
                <div class="shipper_information">
                    <h2>合作片区</h2>
                    <el-form-item label="所属组织" :label-width="formLabelWidth">
                      <el-input v-model="newPartner.companyname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="归属片区" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="绑定合伙人" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="业务员" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible_revise = false">确定修改</el-button>
                <el-button @click="dialogFormVisible_revise = false">关 闭</el-button>
              </div>
            </el-dialog>
        </div> 
        <!-- 合伙人解约 -->
        <div class="remove commoncss">
            <el-dialog title="合伙人解约" :visible.sync="dialogFormVisible_remove">
              <el-form :model="newPartner" :rules="newpartnerrules">
                <el-form-item label="合伙人：" :label-width="formLabelWidth" prop="linkman">
                  <el-input v-model="newPartner.companyname" auto-complete="off" placeholder="请填写公司名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" :label-width="formLabelWidth">
                  <el-input v-model="newPartner.linkman" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="phone">
                  <el-input v-model="newPartner.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在地：" :label-width="formLabelWidth" prop="address">
                  <el-select v-model="newPartner.address" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属组织：" :label-width="formLabelWidth" prop="address">
                  <el-select v-model="newPartner.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="签约日期：" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同开始日期：" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同结束日期：" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是平台合伙人：" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="是" value="yse"></el-option>
                    <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是平台承运商：" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="是" value="yse"></el-option>
                    <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-form-item>
                <div class="shipper_information">
                    <h2>合作片区</h2>
                    <el-form-item label="所属组织：" :label-width="formLabelWidth">
                      <el-input v-model="newPartner.companyname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="归属片区：" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="绑定合伙人：" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="业务员：" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                </div>
                <el-form-item class="textarea_info" label="解约原因：" :label-width="formLabelWidth" prop="hzclassify">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="remove_textarea">
                  </el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible_remove = false">确定解约</el-button>
                <el-button @click="dialogFormVisible_remove = false">关 闭</el-button>
              </div>
            </el-dialog>
        </div> 
        <!-- 合伙人附件管理 -->
        <div class="appendix commoncss">
            <el-dialog title="合伙人附件管理" :visible.sync="dialogFormVisible_appendix">
              <el-form :model="newPartner" :rules="newpartnerrules">
                <el-form-item label="合伙人：" :label-width="formLabelWidth" prop="linkman">
                  <el-input v-model="newPartner.companyname" auto-complete="off" placeholder="请填写公司名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" :label-width="formLabelWidth">
                  <el-input v-model="newPartner.linkman" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="phone">
                  <el-input v-model="newPartner.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在地：" :label-width="formLabelWidth" prop="address">
                  <el-select v-model="newPartner.address" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属组织：" :label-width="formLabelWidth" prop="address">
                  <el-select v-model="newPartner.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="签约日期" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同开始日期：" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同结束日期：" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是平台合伙人" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="是" value="yse"></el-option>
                    <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是平台承运商" :label-width="formLabelWidth" prop="hzclassify">
                  <el-select v-model="newPartner.data" placeholder="请选择活动区域">
                    <el-option label="是" value="yse"></el-option>
                    <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-form-item>
                <div class="shipper_information">
                    <h2>合作片区</h2>
                    <el-form-item label="所属组织" :label-width="formLabelWidth">
                      <el-input v-model="newPartner.companyname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="归属片区" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="绑定合伙人" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="业务员" :label-width="formLabelWidth" prop="hzclassify">
                      <el-select v-model="newPartner.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible_appendix = false">关 闭</el-button>
              </div>
            </el-dialog>
        </div> 
    </div>
</template>

<script type="text/javascript">
    export default{
        data(){
            return{
                partnerform:{
                    name:'',
                    address:'',
                    org:''
                },
                newPartner: {
                    phone: '',
                    companyname: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                newpartnerrules: {
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'change' },
                      ],
                    linkman: [
                        { required: true, message: '联系人不可为空', trigger: 'change' }
                      ],
                    address: [
                        { required: true, message: '地址不可为空', trigger: 'change' }
                      ],
                    xsaddress: [
                        {  required: true, message: '请选择时间', trigger: 'change' }
                      ],
                    hzclassify: [
                        {  required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                      ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                      ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'change' }
                      ]
                },
                currentPage4: 100,
                dialogFormVisible_addparnter: false,
                dialogFormVisible_break_off:false,
                dialogFormVisible_details:false,
                dialogFormVisible_appendix:false,
                dialogFormVisible_revise:false,
                dialogFormVisible_remove:false,
                remove_textarea:'',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    textarea: ''
                },
                formLabelWidth: '150px',
                options: [{
                  value: '选项1',
                  label: '广州网点'
                }, {
                  value: '选项2',
                  label: '广州网点'
                }, {
                  value: '选项3',
                  label: '广州网点'
                }, {
                  value: '选项4',
                  label: '广州网点'
                }, {
                  value: '选项5',
                  label: '广州网点'
                }],
                value8: '',
                input9: '',
                input10: '',
                parnterinfo:[
                {
                    id:1,name:'隔壁老王',higherLevel:'广州广东',coding:'财务部',dataValue:'财务经理',statu:'李四',describtion:'财务管理',isInit:'是',phone:'13000000000',date:'2017-9-12',operation:''
                }
                ],
                break_offinfo:[
                {
                    id:1,name:'隔壁老王',higherLevel:'广州广东',coding:'财务部',dataValue:'财务经理',statu:'李四',describtion:'财务管理',isInit:'是',phone:'13000000000',date:'2017-9-12',operation:''
                }
                ],
            }
        },
        methods: {
            //点击选中当前行
            // clickDetails(row, event, column){
            //     this.$refs.multipleTable.toggleRowSelection(row)
            // }
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleUse(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            changedata(){
                this.dialogFormVisible_break_off = false;

                this.dialogFormVisible_appendix = true;
            }
        }

    }
</script>


<style type="text/css" lang="scss">
    .partner{
        &>.classify_searchinfo{
            padding:10px 30px;
            border-bottom:1px solid #ccc;
            label{
                .el-input{
                    width:300px;
                }
            }
        }
        .commoncss{
            .el-dialog{
                margin-top: 10vh !important;
                max-height:80%;
                overflow:auto;
                .el-dialog__header{
                    border-bottom:1px solid #ccc;
                    text-align:center;
                    background:#ddd;
                    font-weight:bold;
                }
                .el-input{
                    width:300px;
                }
                .el-dialog__body{
                    padding: 30px 0;
                    .el-form{
                        .el-form-item{
                            display:inline-block;
                            .el-input{

                            }
                            
                        }
                    }
                }
                .dialog-footer{
                    text-align:center;
                }
            }
            .data_pic{
                padding-left:20px;
                text-align:center;
                .data_pic_c{
                    display:inline-block;
                    width:300px;
                    .el-radio-group{
                        text-align:left;
                        .el-radio{
                            margin:10px 0;
                        }
                    }
                }
            }
            .shipper_information{
                h2{
                    margin:20px 50px;
                    padding:10px 0; 
                    border-bottom:1px solid #ccc;
                }
            }
        }
        .classify_info{
            padding:20px 30px;
            .btns_box{
                margin-bottom:20px;
                .el-button{
                    margin-right:20px;
                }
            }
            .info_news{
                .el-table{
                    table{
                        width: 100% !important;
                        th,td{
                            text-align:center;
                        }
                    }
                }
            }
            .Pagination{
                margin-top:20px;
                text-align:right;
            }
        }
        .break_off{
            .el-dialog{
                width:71%;
                .el-dialog__body{
                    padding:10px 0;
                }
                &>.classify_searchinfo{
                    padding:10px;
                    label{
                        display:inline-block;
                        margin-right:20px;
                        
                    }
                }
                .Pagination {
                    text-align:right;
                    .el-input{
                        width:100px;
                    }
                    .el-pagination__editor{
                        width:50px;
                    }
                }
            }
        }
        .details{
            .el-dialog{
                .el-dialog__body{
                    .el-tabs{
                        padding:0 10px;
                        .btn_close{
                            text-align:center;
                        }
                    }
                    .details_search_common{
                        label{
                            margin-right:10px;
                            .el-input{
                                width:169px;
                            }
                        }
                    }
                    .el-table{
                        margin:20px 0;
                        tr,th{
                            text-align:center;
                        }
                    }
                    .Pagination {
                        text-align:right;
                        .el-input{
                            width:100px;
                        }
                        .el-pagination__editor{
                            width:50px;
                        }
                    }
                }
            }

        }
        .remove{
            .textarea_info{
                display:block !important;
                margin-right:50px;
            }
            
        }
    }
</style>
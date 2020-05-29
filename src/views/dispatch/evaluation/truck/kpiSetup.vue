<template>
    <div class="TwoColumns kpiSetup clearfix">
        <div class="columnsContainer">
            <div class="side_left">
                 <el-tree
                 ref="treeForm"
                 show-checkbox
                :data="cityTree"
                 node-key="code"
                :props="defaultProps"
                :check-strictly="treestatus"
                :default-expand-all='treestatus'
                :highlight-current = "true"
                @check="nodeClick"
                >
                </el-tree>
            </div>
            <div class="side_right">
           <el-form :model="formdata" ref="formdata" :rules="rulesForm" :inline="true">
            <table class="tree-table" v-has:DISPATCH_CHECK_MANEGE_SMALL_CAR_KPI_SETTING_LIST>
            <tbody>
                <tr>
                    <th width="5%">序号</th>
                    <th  width="10%">考核项分类</th>
                    <th  width="10%">考核项</th>
                    <th  width="10%">考核权重配分</th>
                    <th  width="10%">评估值</th>
                    <th  width="15%" colspan="2">评估区间</th>
                    <th  width="8%">得分</th>
                    <th  width="32%">考核项说明</th>
                </tr>
                <tr>
                    <td rowspan="3">1</td>
                    <td rowspan="18">时效考核</td>
                    <td rowspan="3">撮合时效</td>
                    <td rowspan="3"><el-form-item prop="assessWeightPoint1"><el-input type="text" placeholder="权重配分" v-model="formdata.assessWeightPoint1"></el-input></el-form-item></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-form-item prop="evaluaInterval1"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval1" @keyup.native='inputChange(1)' ref="evaluaInterval1"></el-input></el-form-item></td>
                    <td><el-form-item prop="score1"><el-input type="text" placeholder="计分" v-model="formdata.score1"></el-input></el-form-item></td>
                    <td rowspan="3">{{formdata.assessDescrip1}}<br>单位：<span class="td_red">秒</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-form-item prop="evaluaInterval2"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval2" @keyup.native='inputChange(2)' ref="evaluaInterval2"></el-input></el-form-item></td>
                    <td><el-form-item prop="evaluaInterval3"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval3" @keyup.native='inputChange(3)' ref="evaluaInterval3"></el-input></el-form-item></td>
                    <td><el-form-item prop="score2"><el-input type="text" placeholder="计分" v-model="formdata.score2"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-form-item prop="evaluaInterval4"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval4" @keyup.native='inputChange(4)' ref="evaluaInterval4"></el-input></el-form-item></td>
                    <td>∞</td>
                    <td><el-form-item prop="score3"><el-input type="text" placeholder="计分" v-model="formdata.score3"></el-input></el-form-item></td>
                </tr>       

                <tr>
                    <td rowspan="3">2</td>
                    <td rowspan="3">中单后联系货主时效</td>
                    <td rowspan="3"><el-form-item prop="assessWeightPoint2"><el-input type="text" placeholder="权重配分" v-model="formdata.assessWeightPoint2"></el-input></el-form-item></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-form-item prop="evaluaInterval5"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval5" @keyup.native='inputChange(5)' ref="evaluaInterval5"></el-input></el-form-item></td>
                    <td><el-form-item prop="score4"><el-input type="text" placeholder="计分" v-model="formdata.score4"></el-input></el-form-item></td>
                    <td rowspan="3">{{formdata.assessDescrip2}}<br>单位：<span class="td_red">秒</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-form-item prop="evaluaInterval6"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval6" @keyup.native='inputChange(6)' ref="evaluaInterval6"></el-input></el-form-item></td>
                    <td><el-form-item prop="evaluaInterval7"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval7" @keyup.native='inputChange(7)' ref="evaluaInterval7"></el-input></el-form-item></td>
                    <td><el-form-item prop="score5"><el-input type="text" placeholder="计分" v-model="formdata.score5"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-form-item prop="evaluaInterval8"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval8" @keyup.native='inputChange(8)' ref="evaluaInterval8"></el-input></el-form-item></td>
                    <td>∞</td>
                    <td><el-form-item prop="score6"><el-input type="text" placeholder="计分" v-model="formdata.score6"></el-input></el-form-item></td>
                </tr>  
                <tr>
                    <td rowspan="3">3</td>
                    <td rowspan="3">到车时效</td>
                    <td rowspan="3"><el-form-item prop="assessWeightPoint3"><el-input type="text" placeholder="权重配分" v-model="formdata.assessWeightPoint3"></el-input></el-form-item></td>
                    <td>达标</td>
                    <td>-1000</td>
                    <td><el-form-item prop="evaluaInterval9"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval9" @keyup.native='inputChange(9)' ref="evaluaInterval9"></el-input></el-form-item></td>
                    <td><el-form-item prop="score7"><el-input type="text" placeholder="计分" v-model="formdata.score7"></el-input></el-form-item></td>
                    <td rowspan="3">{{formdata.assessDescrip3}}<br>单位：<span class="td_red">分钟</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-form-item prop="evaluaInterval10"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval10" @keyup.native='inputChange(10)' ref="evaluaInterval10"></el-input></el-form-item></td>
                    <td><el-form-item prop="evaluaInterval11"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval11" @keyup.native='inputChange(11)' ref="evaluaInterval11"></el-input></el-form-item></td>
                    <td><el-form-item prop="score8"><el-input type="text" placeholder="计分" v-model="formdata.score8"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-form-item prop="evaluaInterval12"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval12" @keyup.native='inputChange(12)' ref="evaluaInterval12"></el-input></el-form-item></td>
                    <td>∞</td>
                    <td><el-form-item prop="score9"><el-input type="text" placeholder="计分" v-model="formdata.score9"></el-input></el-form-item></td>
                </tr>                     

                <tr>
                    <td rowspan="3">4</td>
                    <td rowspan="3">到货时效</td>
                    <td rowspan="3"><el-form-item prop="assessWeightPoint4"><el-input type="text" placeholder="权重配分" v-model="formdata.assessWeightPoint4"></el-input></el-form-item></td>
                    <td>达标</td>
                    <td>-1000</td>
                    <td><el-form-item prop="evaluaInterval13"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval13" @keyup.native='inputChange(13)' ref="evaluaInterval13"></el-input></el-form-item></td>
                    <td><el-form-item prop="score10"><el-input type="text" placeholder="计分" v-model="formdata.score10"></el-input></el-form-item></td>
                    <td rowspan="3">{{formdata.assessDescrip4}}<br>单位：<span class="td_red">分钟</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-form-item prop="evaluaInterval14"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval14" @keyup.native='inputChange(14)' ref="evaluaInterval14"></el-input></el-form-item></td>
                    <td><el-form-item prop="evaluaInterval15"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval15" @keyup.native='inputChange(15)' ref="evaluaInterval15"></el-input></el-form-item></td>
                    <td><el-form-item prop="score11"><el-input type="text" placeholder="计分" v-model="formdata.score11"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-form-item prop="evaluaInterval16"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval16" @keyup.native='inputChange(16)' ref="evaluaInterval16"></el-input></el-form-item></td>
                    <td>∞</td>
                    <td><el-form-item prop="score12"><el-input type="text" placeholder="计分" v-model="formdata.score12"></el-input></el-form-item></td>
                </tr>     

                <tr>
                    <td rowspan="3">5</td>
                    <td rowspan="3">回单时效</td>
                    <td rowspan="3"><el-form-item prop="assessWeightPoint5"><el-input type="text" placeholder="权重配分" v-model="formdata.assessWeightPoint5"></el-input></el-form-item></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-form-item prop="evaluaInterval17"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval17" @keyup.native='inputChange(17)' ref="evaluaInterval17"></el-input></el-form-item></td>
                    <td><el-form-item prop="score13"><el-input type="text" placeholder="计分" v-model="formdata.score13"></el-input></el-form-item></td>
                    <td rowspan="3">{{formdata.assessDescrip5}}<br>单位：<span class="td_red">小时</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-form-item prop="evaluaInterval18"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval18" @keyup.native='inputChange(18)' ref="evaluaInterval18"></el-input></el-form-item></td>
                    <td><el-form-item prop="evaluaInterval19"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval19" @keyup.native='inputChange(19)' ref="evaluaInterval19"></el-input></el-form-item></td>
                    <td><el-form-item prop="score14"><el-input type="text" placeholder="计分" v-model="formdata.score14"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-form-item prop="evaluaInterval20"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval20" @keyup.native='inputChange(20)' ref="evaluaInterval20"></el-input></el-form-item></td>
                    <td>∞</td>
                    <td><el-form-item prop="score15"><el-input type="text" placeholder="计分" v-model="formdata.score15"></el-input></el-form-item></td>
                </tr>     

                <tr>
                    <td rowspan="3">6</td>
                    <td rowspan="3">回款时效</td>
                    <td rowspan="3"><el-form-item prop="assessWeightPoint6"><el-input type="text" placeholder="权重配分" v-model="formdata.assessWeightPoint6"></el-input></el-form-item></td>
                    <td>达标</td>
                    <td>0</td>
                    <td><el-form-item prop="evaluaInterval21"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval21" @keyup.native='inputChange(21)' ref="evaluaInterval21"></el-input></el-form-item></td>
                    <td><el-form-item prop="score16"><el-input type="text" placeholder="计分" v-model="formdata.score16"></el-input></el-form-item></td>
                    <td rowspan="3">{{formdata.assessDescrip6}}<br>单位：<span class="td_red">小时</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-form-item prop="evaluaInterval22"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval22" @keyup.native='inputChange(22)' ref="evaluaInterval22"></el-input></el-form-item></td>
                    <td><el-form-item prop="evaluaInterval23"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval23" @keyup.native='inputChange(23)' ref="evaluaInterval23"></el-input></el-form-item></td>
                    <td><el-form-item prop="score17"><el-input type="text" placeholder="计分" v-model="formdata.score17"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-form-item prop="evaluaInterval24"><el-input type="text" placeholder="时效区间" v-model="formdata.evaluaInterval24" @keyup.native='inputChange(24)' ref="evaluaInterval24"></el-input></el-form-item></td>
                    <td>∞</td>
                    <td><el-form-item prop="score18"><el-input type="text" placeholder="计分" v-model="formdata.score18"></el-input></el-form-item></td>
                </tr>    

                <tr>
                    <td rowspan="3">7</td>
                    <td rowspan="3">交付考核</td>
                    <td rowspan="3">货损货差</td>
                    <td rowspan="3"><el-form-item prop="assessWeightPoint7"><el-input type="text" placeholder="权重配分" v-model="formdata.assessWeightPoint7"></el-input></el-form-item></td>
                    <td>达标</td>
                    <td>-1</td>
                    <td><el-form-item prop="evaluaInterval25"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval25" @keyup.native='inputChange(25)' ref="evaluaInterval25"></el-input></el-form-item></td>
                    <td><el-form-item prop="score19"><el-input type="text" placeholder="计分" v-model="formdata.score19"></el-input></el-form-item></td>
                    <td rowspan="3">{{formdata.assessDescrip7}}<br>单位：<span class="td_red">次</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-form-item prop="evaluaInterval26"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval26" @keyup.native='inputChange(26)' ref="evaluaInterval26"></el-input></el-form-item></td>
                    <td><el-form-item prop="evaluaInterval27"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval27" @keyup.native='inputChange(27)' ref="evaluaInterval27"></el-input></el-form-item></td>
                    <td><el-form-item prop="score20"><el-input type="text" placeholder="计分" v-model="formdata.score20"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-form-item prop="evaluaInterval28"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval28" @keyup.native='inputChange(28)' ref="evaluaInterval28"></el-input></el-form-item></td>
                    <td>∞</td>
                    <td><el-form-item prop="score21"><el-input type="text" placeholder="计分" v-model="formdata.score21"></el-input></el-form-item></td>
                </tr>     

                <tr>
                    <td rowspan="3">8</td>
                    <td rowspan="6">管理考核</td>
                    <td rowspan="3">投诉</td>
                    <td rowspan="3"><el-form-item prop="assessWeightPoint8"><el-input type="text" placeholder="权重配分" v-model="formdata.assessWeightPoint8"></el-input></el-form-item></td>
                    <td>达标</td>
                    <td>-1</td>
                    <td><el-form-item prop="evaluaInterval29"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval29" @keyup.native='inputChange(29)' ref="evaluaInterval29"></el-input></el-form-item></td>
                    <td><el-form-item prop="score22"><el-input type="text" placeholder="计分" v-model="formdata.score22"></el-input></el-form-item></td>
                    <td rowspan="3">{{formdata.assessDescrip8}}<br>单位：<span class="td_red">次</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-form-item prop="evaluaInterval30"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval30" @keyup.native='inputChange(30)' ref="evaluaInterval30"></el-input></el-form-item></td>
                    <td><el-form-item prop="evaluaInterval31"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval31" @keyup.native='inputChange(31)' ref="evaluaInterval31"></el-input></el-form-item></td>
                    <td><el-form-item prop="score23"><el-input type="text" placeholder="计分" v-model="formdata.score23"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-form-item prop="evaluaInterval32"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval32" @keyup.native='inputChange(32)' ref="evaluaInterval32"></el-input></el-form-item></td>
                    <td>∞</td>
                    <td><el-form-item prop="score24"><el-input type="text" placeholder="计分" v-model="formdata.score24"></el-input></el-form-item></td>
                </tr>                     

                <tr>
                    <td rowspan="3">9</td>
                    <td rowspan="3">到车距离异常</td>
                    <td rowspan="3"><el-form-item prop="assessWeightPoint9"><el-input type="text" placeholder="权重配分" v-model="formdata.assessWeightPoint9"></el-input></el-form-item></td>
                    <td>达标</td>
                    <td>-1</td>
                    <td><el-form-item prop="evaluaInterval33"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval33" @keyup.native='inputChange(33)' ref="evaluaInterval33"></el-input></el-form-item></td>
                    <td><el-form-item prop="score25"><el-input type="text" placeholder="计分" v-model="formdata.score25"></el-input></el-form-item></td>
                    <td rowspan="3">{{formdata.assessDescrip9}}<br>单位：<span class="td_red">次</span></td>
                </tr>
                <tr>
                    <td>不达标</td>
                    <td><el-form-item prop="evaluaInterval34"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval34" @keyup.native='inputChange(34)' ref="evaluaInterval34"></el-input></el-form-item></td>
                    <td><el-form-item prop="evaluaInterval35"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval35" @keyup.native='inputChange(35)' ref="evaluaInterval35"></el-input></el-form-item></td>
                    <td><el-form-item prop="score26"><el-input type="text" placeholder="计分" v-model="formdata.score26"></el-input></el-form-item></td>
                </tr>
                <tr>
                    <td>严重不达标</td>
                    <td><el-form-item prop="evaluaInterval36"><el-input type="text" placeholder="次数区间" v-model="formdata.evaluaInterval36" @keyup.native='inputChange(36)' ref="evaluaInterval36"></el-input></el-form-item></td>
                    <td>∞</td>
                    <td><el-form-item prop="score27"><el-input type="text" placeholder="计分" v-model="formdata.score27"></el-input></el-form-item></td>
                </tr>     
            </tbody>    
            </table>
           </el-form>
            <div class="btn_footer">
                <el-button type="primary" plain @click="Addsave" v-has:DISPATCH_CHECK_MANEGE_SMALL_CAR_KPI_SETTING_LIST>保存</el-button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { aflcProvinceCode } from '@/api/common.js'
import { aflcAssessmentSettings,aflcAssessmentSettings_list } from '@/api/dispatch/evaluation.js'
export default {
    name:'kpiSetup',
    data(){ 
    //   参数校验
        const rewardValidator = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else{
                cb()
            }
        }
        const evaluaInterval_negative1_1 =  (rule, val, cb) => {
            var reg= /[^-?\d]/g
            if(reg.test(val)){
            cb(new Error('请输入整数'))
            }
            else if(val<-1000){
            cb(new Error('必须大于评估区间开始值'))
            }
            else{
                cb()
            }
        }       
        
        const evaluaInterval_negative1_2 =  (rule, val, cb) => {
            var reg= /[^-?\d]/g
            if(reg.test(val)){
            cb(new Error('请输入整数'))
            }
            else if(val<-1){
            cb(new Error('必须大于评估区间开始值'))
            }
            else{
                cb()
            }
        }

        const evaluaInterval_negative2 =  (rule, val, cb) => {
            var reg= /[^-?\d]/g
            if(reg.test(val)){
            cb(new Error('请输入整数'))
            }
            else{
                cb()
            }
        }    

        const evaluaInterval_negative3 =  (rule, val, cb) => {
            var reg=/[^-?\d]/g
            if(reg.test(val)){
            cb(new Error('请输入整数'))
            }
            else if(parseInt(val)<=parseInt(this.formdata['evaluaInterval'+ (Number(rule.field.split('evaluaInterval')[1])-1)])){
            cb(new Error('必须大于评估区间开始值'))
            }
            else{
                cb()
            }   
        }    

        const evaluaInterval_negative4 = (rule, val, cb) =>{
            var reg= /[^-?\d]/g
            if(reg.test(val)){
            cb(new Error('请输入整数'))
            }
            else{
                cb()
            }            
        }

        const evaluaInterval_one =  (rule, val, cb) => {
            var reg= /[^\d]/g
            if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else if(val<0){
            cb(new Error('必须大于评估区间开始值'))
            }
            else{
                cb()
            }
        }
        const evaluaInterval_two = (rule, val, cb) =>{
            var reg= /[^\d]/g
            if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else{
                cb()
            }            
        }      
        const evaluaInterval_three = (rule, val, cb) =>{
            var reg= /[^\d]/g
            if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else if(parseInt(val)<=parseInt(this.formdata['evaluaInterval'+ (Number(rule.field.split('evaluaInterval')[1])-1)])){
            cb(new Error('必须大于评估区间开始值'))
            }
            else{
                cb()
            }            
        }   
        const evaluaInterval_four = (rule, val, cb) =>{
            var reg= /[^\d]/g
            if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else{
                cb()
            }            
        }
        const score1Validator = (rule, val, cb) =>{
            let stringValidator = (Math.floor(Number(rule.field.split('score')[1])/3)+1)
            var reg= /[^-?\d]/g
            if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else if(parseInt(this.formdata['assessWeightPoint'+stringValidator])<parseInt(val)){
            cb(new Error('不能大于'+this.formdata['appraItems'+stringValidator]+'权重配分'))
            }
            else if(val<-100){
            cb(new Error('输入大于-100的数'))
            }
            else{
                cb()
            }            
        }
        const score2Validator = (rule, val, cb) =>{
            let string2Validator = (Math.floor(Number(rule.field.split('score')[1])/3)+1)
            var reg= /[^-?\d]/g
            if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else if(val<-100){
            cb(new Error('输入大于-100的数'))
            }
            else if(parseInt(val)>=parseInt(this.formdata['score'+ (Number(rule.field.split('score')[1])-1)])){
            cb(new Error('不能大于'+this.formdata['appraItems'+string2Validator]+'达标的得分值'))
            }
            else{
                cb()
            }            
        }
        const score3Validator = (rule, val, cb) =>{
            let string3Validator = (Math.floor(Number(rule.field.split('score')[1])/3))
            var reg= /[^-?\d]/g
            if(reg.test(val)){
                console.log()
            cb(new Error('请输入正整数'))
            }
            else if(val<-100){
            cb(new Error('输入大于-100的数'))
            }
            else if(parseInt(val)>=parseInt(this.formdata['score'+ (Number(rule.field.split('score')[1])-1)])){
            cb(new Error('不能大于'+this.formdata['appraItems'+string3Validator]+'不达标的得分值'))
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
        formdata:{
            cityCode:null,
            appraItems1:'撮合时效',appraItems2:'中单后联系货主时效',appraItems3:'到车时效',appraItems4:'到货时效',appraItems5:'回单时效',appraItems6:'回款时效',
            appraItems7:'货损货差',appraItems8:'投诉',appraItems9:'到车距离异常',
            assessDescrip1:'从客户下单时间开始计算，到首次确认中单司机所用时间；',
            assessDescrip2:'从确认中单司机开始计算，到车主联系货主或前往提货地所用时间；',
            assessDescrip3:'实际到达提货地时间与预计到达提货地时间（即时订单：车主中单时间加上地图预估用时；预约订单：预约用车时间）差异值；',
            assessDescrip4:'实际到达目的地时间与预计到达目的地时间差异值；',
            assessDescrip5:'从完成卸货时间开始计算，到车主回单所用时间；',
            assessDescrip6:'从完成卸货时间开始计算，到车主回款所用时间；',
            assessDescrip7:'订单货损货差次数',
            assessDescrip8:'订单货主投诉次数；',
            assessDescrip9:'车主点击到达提货地或目的地时，距离客户下单地址异常次数；',
            assessWeightPoint1:null,assessWeightPoint2:null,assessWeightPoint3:null,assessWeightPoint4:null,assessWeightPoint5:null,assessWeightPoint6:null,assessWeightPoint7:null,assessWeightPoint8:null,assessWeightPoint9:null,
            evaluaInterval1:null, evaluaInterval2:null, evaluaInterval3:null, evaluaInterval4:null,
            evaluaInterval5:null, evaluaInterval6:null, evaluaInterval7:null, evaluaInterval8:null,
            evaluaInterval9:null, evaluaInterval10:null, evaluaInterval11:null, evaluaInterval12:null,
            evaluaInterval13:null, evaluaInterval14:null, evaluaInterval15:null, evaluaInterval16:null,
            evaluaInterval17:null, evaluaInterval18:null, evaluaInterval19:null, evaluaInterval20:null,
            evaluaInterval21:null, evaluaInterval22:null, evaluaInterval23:null, evaluaInterval24:null,
            evaluaInterval25:null, evaluaInterval26:null, evaluaInterval27:null, evaluaInterval28:null,
            evaluaInterval29:null, evaluaInterval30:null, evaluaInterval31:null, evaluaInterval32:null,
            evaluaInterval33:null, evaluaInterval34:null, evaluaInterval35:null, evaluaInterval36:null,
            score1:null, score2:null, score3:null, score4:null, score5:null, score6:null, score7:null, score8:null, score9:null,
            score10:null, score11:null, score12:null, score13:null, score14:null, score15:null, score16:null, score17:null, score18:null,
            score19:null, score20:null, score21:null, score22:null, score23:null, score24:null, score25:null, score26:null, score27:null,
        },
        rulesForm:{
            assessWeightPoint1:{trigger:'change',required:true,validator: rewardValidator},assessWeightPoint2:{trigger:'change',required:true,validator: rewardValidator},
            assessWeightPoint3:{trigger:'change',required:true,validator: rewardValidator},assessWeightPoint4:{trigger:'change',required:true,validator: rewardValidator},
            assessWeightPoint5:{trigger:'change',required:true,validator: rewardValidator},assessWeightPoint6:{trigger:'change',required:true,validator: rewardValidator},
            assessWeightPoint7:{trigger:'change',required:true,validator: rewardValidator},assessWeightPoint8:{trigger:'change',required:true,validator: rewardValidator},
            assessWeightPoint9:{trigger:'change',required:true,validator: rewardValidator},
            evaluaInterval1:{trigger:'change',required:true,validator: evaluaInterval_one},evaluaInterval5:{trigger:'change',required:true,validator: evaluaInterval_one},
            evaluaInterval9:{trigger:'change',required:true,validator: evaluaInterval_negative1_1},evaluaInterval13:{trigger:'change',required:true,validator: evaluaInterval_negative1_1},
            evaluaInterval17:{trigger:'change',required:true,validator: evaluaInterval_one},evaluaInterval21:{trigger:'change',required:true,validator: evaluaInterval_one},
            evaluaInterval25:{trigger:'change',required:true,validator: evaluaInterval_negative1_2},evaluaInterval29:{trigger:'change',required:true,validator: evaluaInterval_negative1_2},
            evaluaInterval33:{trigger:'change',required:true,validator: evaluaInterval_negative1_2},  
            evaluaInterval2:{trigger:'change',required:true,validator: evaluaInterval_two},evaluaInterval6:{trigger:'change',required:true,validator: evaluaInterval_two},
            evaluaInterval10:{trigger:'change',required:true,validator: evaluaInterval_negative2},evaluaInterval14:{trigger:'change',required:true,validator: evaluaInterval_negative2},
            evaluaInterval18:{trigger:'change',required:true,validator: evaluaInterval_two},evaluaInterval22:{trigger:'change',required:true,validator: evaluaInterval_two},
            evaluaInterval26:{trigger:'change',required:true,validator: evaluaInterval_negative2},evaluaInterval30:{trigger:'change',required:true,validator: evaluaInterval_negative2},
            evaluaInterval34:{trigger:'change',required:true,validator: evaluaInterval_negative2},
            evaluaInterval3:{trigger:'change',required:true,validator: evaluaInterval_three},evaluaInterval7:{trigger:'change',required:true,validator: evaluaInterval_three},
            evaluaInterval11:{trigger:'change',required:true,validator: evaluaInterval_negative3},evaluaInterval15:{trigger:'change',required:true,validator: evaluaInterval_negative3},
            evaluaInterval19:{trigger:'change',required:true,validator: evaluaInterval_three},evaluaInterval23:{trigger:'change',required:true,validator: evaluaInterval_three},
            evaluaInterval27:{trigger:'change',required:true,validator: evaluaInterval_negative3},evaluaInterval31:{trigger:'change',required:true,validator: evaluaInterval_negative3},
            evaluaInterval35:{trigger:'change',required:true,validator: evaluaInterval_negative3},
            evaluaInterval4:{trigger:'change',required:true,validator: evaluaInterval_four},evaluaInterval8:{trigger:'change',required:true,validator: evaluaInterval_four},
            evaluaInterval12:{trigger:'change',required:true,validator: evaluaInterval_negative4},evaluaInterval16:{trigger:'change',required:true,validator: evaluaInterval_negative4},
            evaluaInterval20:{trigger:'change',required:true,validator: evaluaInterval_four},evaluaInterval24:{trigger:'change',required:true,validator: evaluaInterval_four},
            evaluaInterval28:{trigger:'change',required:true,validator: evaluaInterval_negative4},evaluaInterval32:{trigger:'change',required:true,validator: evaluaInterval_negative4},
            evaluaInterval36:{trigger:'change',required:true,validator: evaluaInterval_negative4},
            score1:{trigger:'change',required:true,validator: score1Validator},score2:{trigger:'change',required:true,validator: score2Validator},score3:{trigger:'change',required:true,validator: score3Validator},
            score4:{trigger:'change',required:true,validator: score1Validator},score5:{trigger:'change',required:true,validator: score2Validator},score6:{trigger:'change',required:true,validator: score3Validator},
            score7:{trigger:'change',required:true,validator: score1Validator},score8:{trigger:'change',required:true,validator: score2Validator},score9:{trigger:'change',required:true,validator: score3Validator},
            score10:{trigger:'change',required:true,validator: score1Validator},score11:{trigger:'change',required:true,validator: score2Validator},score12:{trigger:'change',required:true,validator: score3Validator},
            score13:{trigger:'change',required:true,validator: score1Validator},score14:{trigger:'change',required:true,validator: score2Validator},score15:{trigger:'change',required:true,validator: score3Validator},
            score16:{trigger:'change',required:true,validator: score1Validator},score17:{trigger:'change',required:true,validator: score2Validator},score18:{trigger:'change',required:true,validator: score3Validator},
            score19:{trigger:'change',required:true,validator: score1Validator},score20:{trigger:'change',required:true,validator: score2Validator},score21:{trigger:'change',required:true,validator: score3Validator},
            score22:{trigger:'change',required:true,validator: score1Validator},score23:{trigger:'change',required:true,validator: score2Validator},score24:{trigger:'change',required:true,validator: score3Validator},
            score25:{trigger:'change',required:true,validator: score1Validator},score26:{trigger:'change',required:true,validator: score2Validator},score27:{trigger:'change',required:true,validator: score3Validator},
        },
        }
    },
    mounted() {
            this.getMoreInformation()
        },
    methods:{
        firstblood(){
        aflcAssessmentSettings_list(1, 100, {citycode:this.cityCode}).then(res => {
        if(res.data.list&&res.data.list.length>0){    
        this.formdata.assessWeightPoint1 = res.data.list[0].assessWeightPoint;this.formdata.assessWeightPoint2 = res.data.list[4].assessWeightPoint;this.formdata.assessWeightPoint3 = res.data.list[7].assessWeightPoint
        this.formdata.assessWeightPoint4 = res.data.list[10].assessWeightPoint;this.formdata.assessWeightPoint5 = res.data.list[13].assessWeightPoint;this.formdata.assessWeightPoint6 = res.data.list[16].assessWeightPoint
        this.formdata.assessWeightPoint7 = res.data.list[19].assessWeightPoint;this.formdata.assessWeightPoint8 = res.data.list[22].assessWeightPoint;this.formdata.assessWeightPoint9 = res.data.list[25].assessWeightPoint
        for(let lists = 0;lists<res.data.list.length;lists++)
        {
        let Listmath = Math.floor(lists / 3)
        let reminder = lists % 3
        if(reminder==0){
        this.formdata['evaluaInterval'+(Listmath*4+1)] =  res.data.list[lists].evaluaIntervalEnd; this.formdata['score'+(lists+1)] = res.data.list[lists].score
        }
        else if(reminder==1){
        this.formdata['evaluaInterval'+Number(Listmath*4+2)] =  res.data.list[lists].evaluaIntervalStart;this.formdata['evaluaInterval'+Number(Listmath*4+3)] =  res.data.list[lists].evaluaIntervalEnd; this.formdata['score'+(lists+1)] = res.data.list[lists].score
        }
        else if(reminder==2){
        this.formdata['evaluaInterval'+((Listmath+1)*4)] =  res.data.list[lists].evaluaIntervalStart; this.formdata['score'+(lists+1)] = res.data.list[lists].score
        }
        }            
        }
        else{
         for(let z1 = 1;z1<10;z1++){
             this.formdata['assessWeightPoint'+z1]=null
         }
         for(let z2 = 1;z2<37;z2++){
             this.formdata['evaluaInterval'+z2]=null
         }
         for(let z3 = 1;z3<28;z3++){
             this.formdata['score'+z3]=null
         }     
         this.$refs['formdata'].resetFields();    
        }
        })
        },
        getMoreInformation(){
            aflcProvinceCode().then(res=>{
                this.cityTree = res.data;
           })
        },
        nodeClick(data){
        if(this.cityCode==data.code){
        this.$refs.treeForm.setCheckedNodes([])
        this.cityCode = null
        }
        else{
        this.cityCode = data.code
        this.$refs.treeForm.setCheckedNodes([data])
        }
        this.firstblood();
        },
        inputChange(i){
        let ii = i%4;
        switch (ii) {
        case 1:
        this.formdata['evaluaInterval'+(i+1)] =  this.formdata['evaluaInterval'+(i)]
        break;
        case 2:
        this.formdata['evaluaInterval'+(i-1)] =  this.formdata['evaluaInterval'+(i)]
        break;
        case 3:
        this.formdata['evaluaInterval'+(i+1)] =  this.formdata['evaluaInterval'+(i)]
        break;
        case 0:
        this.formdata['evaluaInterval'+(i-1)] =  this.formdata['evaluaInterval'+(i)]
        break;                 
        }
        },

        calibrate(){
            let suntotle = 0;
            for(let assI = 1;assI<=9;assI++){
            suntotle += Number(this.formdata['assessWeightPoint'+assI])
            }
            if(suntotle==100){
            return
            }
            else{
            this.$message.error('所有考核项配分总数为100分,否则不能保存成功~');
            return false
            }
        },
        Addsave(){
        let form = [
        {classAssessItem:'AF0051801',appraItems:'AF005180101',assessWeightPoint:this.formdata.assessWeightPoint1,evakuaValue:'达标',evaluaIntervalStart:'0',evaluaIntervalEnd:this.formdata.evaluaInterval1,score:this.formdata.score1,assessDescrip:this.formdata.assessDescrip1,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180101',assessWeightPoint:this.formdata.assessWeightPoint1,evakuaValue:'不达标',evaluaIntervalStart:this.formdata.evaluaInterval2,evaluaIntervalEnd:this.formdata.evaluaInterval3,score:this.formdata.score2,assessDescrip:this.formdata.assessDescrip1,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180101',assessWeightPoint:this.formdata.assessWeightPoint1,evakuaValue:'严重不达标',evaluaIntervalStart:this.formdata.evaluaInterval4,evaluaIntervalEnd:'9999',score:this.formdata.score3,assessDescrip:this.formdata.assessDescrip1,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180102',assessWeightPoint:this.formdata.assessWeightPoint2,evakuaValue:'达标',evaluaIntervalStart:'0',evaluaIntervalEnd:this.formdata.evaluaInterval5,score:this.formdata.score4,assessDescrip:this.formdata.assessDescrip2,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180102',assessWeightPoint:this.formdata.assessWeightPoint2,evakuaValue:'不达标',evaluaIntervalStart:this.formdata.evaluaInterval6,evaluaIntervalEnd:this.formdata.evaluaInterval7,score:this.formdata.score5,assessDescrip:this.formdata.assessDescrip2,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180102',assessWeightPoint:this.formdata.assessWeightPoint2,evakuaValue:'严重不达标',evaluaIntervalStart:this.formdata.evaluaInterval8,evaluaIntervalEnd:'9999',score:this.formdata.score6,assessDescrip:this.formdata.assessDescrip2,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180103',assessWeightPoint:this.formdata.assessWeightPoint3,evakuaValue:'达标',evaluaIntervalStart:'-1000',evaluaIntervalEnd:this.formdata.evaluaInterval9,score:this.formdata.score7,assessDescrip:this.formdata.assessDescrip3,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180103',assessWeightPoint:this.formdata.assessWeightPoint3,evakuaValue:'不达标',evaluaIntervalStart:this.formdata.evaluaInterval10,evaluaIntervalEnd:this.formdata.evaluaInterval11,score:this.formdata.score8,assessDescrip:this.formdata.assessDescrip3,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180103',assessWeightPoint:this.formdata.assessWeightPoint3,evakuaValue:'严重不达标',evaluaIntervalStart:this.formdata.evaluaInterval12,evaluaIntervalEnd:'9999',score:this.formdata.score9,assessDescrip:this.formdata.assessDescrip3,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180104',assessWeightPoint:this.formdata.assessWeightPoint4,evakuaValue:'达标',evaluaIntervalStart:'-1000',evaluaIntervalEnd:this.formdata.evaluaInterval13,score:this.formdata.score10,assessDescrip:this.formdata.assessDescrip4,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180104',assessWeightPoint:this.formdata.assessWeightPoint4,evakuaValue:'不达标',evaluaIntervalStart:this.formdata.evaluaInterval14,evaluaIntervalEnd:this.formdata.evaluaInterval15,score:this.formdata.score11,assessDescrip:this.formdata.assessDescrip4,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180104',assessWeightPoint:this.formdata.assessWeightPoint4,evakuaValue:'严重不达标',evaluaIntervalStart:this.formdata.evaluaInterval16,evaluaIntervalEnd:'9999',score:this.formdata.score12,assessDescrip:this.formdata.assessDescrip4,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180105',assessWeightPoint:this.formdata.assessWeightPoint5,evakuaValue:'达标',evaluaIntervalStart:'0',evaluaIntervalEnd:this.formdata.evaluaInterval17,score:this.formdata.score13,assessDescrip:this.formdata.assessDescrip5,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180105',assessWeightPoint:this.formdata.assessWeightPoint5,evakuaValue:'不达标',evaluaIntervalStart:this.formdata.evaluaInterval18,evaluaIntervalEnd:this.formdata.evaluaInterval19,score:this.formdata.score14,assessDescrip:this.formdata.assessDescrip5,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180105',assessWeightPoint:this.formdata.assessWeightPoint5,evakuaValue:'严重不达标',evaluaIntervalStart:this.formdata.evaluaInterval20,evaluaIntervalEnd:'9999',score:this.formdata.score15,assessDescrip:this.formdata.assessDescrip5,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180106',assessWeightPoint:this.formdata.assessWeightPoint6,evakuaValue:'达标',evaluaIntervalStart:'0',evaluaIntervalEnd:this.formdata.evaluaInterval21,score:this.formdata.score16,assessDescrip:this.formdata.assessDescrip6,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180106',assessWeightPoint:this.formdata.assessWeightPoint6,evakuaValue:'不达标',evaluaIntervalStart:this.formdata.evaluaInterval22,evaluaIntervalEnd:this.formdata.evaluaInterval23,score:this.formdata.score17,assessDescrip:this.formdata.assessDescrip6,citycode:this.cityCode},
        {classAssessItem:'AF0051801',appraItems:'AF005180106',assessWeightPoint:this.formdata.assessWeightPoint6,evakuaValue:'严重不达标',evaluaIntervalStart:this.formdata.evaluaInterval24,evaluaIntervalEnd:'9999',score:this.formdata.score18,assessDescrip:this.formdata.assessDescrip6,citycode:this.cityCode},

        {classAssessItem:'AF0051802',appraItems:'AF005180201',assessWeightPoint:this.formdata.assessWeightPoint7,evakuaValue:'达标',evaluaIntervalStart:'-1',evaluaIntervalEnd:this.formdata.evaluaInterval25,score:this.formdata.score19,assessDescrip:this.formdata.assessDescrip7,citycode:this.cityCode},
        {classAssessItem:'AF0051802',appraItems:'AF005180201',assessWeightPoint:this.formdata.assessWeightPoint7,evakuaValue:'不达标',evaluaIntervalStart:this.formdata.evaluaInterval26,evaluaIntervalEnd:this.formdata.evaluaInterval27,score:this.formdata.score20,assessDescrip:this.formdata.assessDescrip7,citycode:this.cityCode},
        {classAssessItem:'AF0051802',appraItems:'AF005180201',assessWeightPoint:this.formdata.assessWeightPoint7,evakuaValue:'严重不达标',evaluaIntervalStart:this.formdata.evaluaInterval28,evaluaIntervalEnd:'9999',score:this.formdata.score21,assessDescrip:this.formdata.assessDescrip7,citycode:this.cityCode},

        {classAssessItem:'AF0051803',appraItems:'AF005180301',assessWeightPoint:this.formdata.assessWeightPoint8,evakuaValue:'达标',evaluaIntervalStart:'-1',evaluaIntervalEnd:this.formdata.evaluaInterval29,score:this.formdata.score22,assessDescrip:this.formdata.assessDescrip8,citycode:this.cityCode},
        {classAssessItem:'AF0051803',appraItems:'AF005180301',assessWeightPoint:this.formdata.assessWeightPoint8,evakuaValue:'不达标',evaluaIntervalStart:this.formdata.evaluaInterval30,evaluaIntervalEnd:this.formdata.evaluaInterval31,score:this.formdata.score23,assessDescrip:this.formdata.assessDescrip8,citycode:this.cityCode},
        {classAssessItem:'AF0051803',appraItems:'AF005180301',assessWeightPoint:this.formdata.assessWeightPoint8,evakuaValue:'严重不达标',evaluaIntervalStart:this.formdata.evaluaInterval32,evaluaIntervalEnd:'9999',score:this.formdata.score24,assessDescrip:this.formdata.assessDescrip8,citycode:this.cityCode},
        {classAssessItem:'AF0051803',appraItems:'AF005180302',assessWeightPoint:this.formdata.assessWeightPoint9,evakuaValue:'达标',evaluaIntervalStart:'-1',evaluaIntervalEnd:this.formdata.evaluaInterval33,score:this.formdata.score25,assessDescrip:this.formdata.assessDescrip9,citycode:this.cityCode},
        {classAssessItem:'AF0051803',appraItems:'AF005180302',assessWeightPoint:this.formdata.assessWeightPoint9,evakuaValue:'不达标',evaluaIntervalStart:this.formdata.evaluaInterval34,evaluaIntervalEnd:this.formdata.evaluaInterval35,score:this.formdata.score26,assessDescrip:this.formdata.assessDescrip9,citycode:this.cityCode},
        {classAssessItem:'AF0051803',appraItems:'AF005180302',assessWeightPoint:this.formdata.assessWeightPoint9,evakuaValue:'严重不达标',evaluaIntervalStart:this.formdata.evaluaInterval36,evaluaIntervalEnd:'9999',score:this.formdata.score27,assessDescrip:this.formdata.assessDescrip9,citycode:this.cityCode},
        ]

      this.calibrate();
      if(this.calibrate()==false)
        {
        return
        }
        else{
       this.$refs['formdata'].validate(valid=>{
        if(valid){
        if(this.cityCode){
            aflcAssessmentSettings(form).then(res=>{
                this.$message.success('保存成功')
                // this.$refs['formdata'].resetFields();
                // this.$refs.treeForm.setCheckedNodes([])
                // this.cityCode = null
            }).catch(res=>{
                this.$message.error('保存失败')
            })
        }
        else{
        this.$message.error('请在左边选择KPI考核城市');
        }
        }
       })
    }
       }
    }    
}
</script>

<style lang="scss">
    .kpiSetup{
        height:100%;    
        position: relative;
        margin-left:7px;
        padding-bottom: 0px;
        .side_left{
        height: 100%;
        position: relative;
            .side_left_top{
             height:100%;
             overflow-y: auto;
             overflow-x: hidden;
             }
            .side_left_bottom{
             position: absolute;
             bottom: 10px;
             right: 10px;
             vertical-align: bottom
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
            }
        }
        
        }
</style>


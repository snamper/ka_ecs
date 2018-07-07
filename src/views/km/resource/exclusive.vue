<style scoped>
.form-c.o-no-bgc{padding: .3rem .1rem;}
p.detailsEleP{margin-bottom: 10px;}
.numberInfo{width:98%;background-color:#fff;padding:12px 8px;border-radius:6px}
.numberInfo>b{padding-right: 20px;}
</style>
<template>
    <section>
        <div class="g-search-menu" id="search">
            <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
            <div class="g-search-form">
                <div class="m-tag"><b></b>条件查询</div>
                <section class="form-c o-no-bgc">
                    <div class="row3" :class="{active:form.select==1}">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="1" @click="isChe" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">号码/号段：</span>
                            </label>
                        </span>
                        <div class="input-box"><input v-model="form.context1" :readonly="form.select!=1" maxlength="14" type="tel" placeholder="请输入查询的号码或号段"></div>
                    </div>
                    <div class="row3" :class="{active:form.select==2}">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="2" @click="isChe" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">设备号：</span>
                            </label>
                        </span>
                        <div class="input-box"><input v-model="form.context2" :readonly="form.select!=2" maxlength="14" type="tel" placeholder="请输入查询的设备号码"></div>
                    </div>
                    <div class="row3" :class="{active:form.select==3}">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="3" @click="isChe" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">ICCID：</span>
                            </label>
                        </span>
                        <div class="input-box"><input v-model="form.context3" :readonly="form.select!=3" maxlength="25" type="tel" placeholder="请输入查询的ICCID"></div>
                    </div>
                    <button class="f-btn f-btn-line" @click="searchList(1)">查询</button>
                </section>
            </div>
            <!-- 流转信息 -->
            <div v-if="search.flowList">
                <div class="g-box">
                    <p class="detailsEleP"><a class="f-t-d-u">{{translateData('formatPhone',15684765)}}***</a></p>
                    <p class="numberInfo">
                        <b><label class="f-c-grey">归属地 ：</label>{{'北京'||'--'}}</b>
                        <b><label class="f-c-grey">预存 ：</label>{{translateData('money',100)}}元</b>
                        <b><label class="f-c-grey">产品名称 ：</label>{{'111111'||'--'}}<span class="f-c-grey">( {{'--'}} )</span></b>
                    </p>
                </div>
                <div class="m-total-table">
                    <div class="total-head">
                        流转信息
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>流转时间</th>
                                <th>订单号码</th>
                                <th>已激活（个）</th>
                                <th>成卡（个）</th>
                                <th>未激活（个）</th>
                                <th>白卡（张）</th>
                                <th>所属商户</th>
                                <th>设备号</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(todo,index) in search.flowList">
                                
                            </tr>
                        </tbody>
                    </table>
                    <my-page :page="pageNow1" :maxpage="maxpage1" :callback="callback1"></my-page>
                </div>
            </div>
            <!-- 成卡 -->
            <div v-if="search.chengkaList">
                <div class="m-total-table">
                    <div class="total-head">
                        流转信息
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>流转时间</th>
                                <th>订单号码</th>
                                <th>已激活（个）</th>
                                <th>成卡（个）</th>
                                <th>未激活（个）</th>
                                <th>白卡（张）</th>
                                <th>所属商户</th>
                                <th>设备号</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(todo,index) in search.chengkaList">
                                
                            </tr>
                        </tbody>
                    </table>
                    <my-page :page="pageNow" :maxpage="maxpage" :callback="callback"></my-page>
                </div>
            </div>
            <!-- 已激活 -->
            <div v-if="search.activatedList">
                <div class="m-total-table">
                    <div class="total-head">
                        流转信息
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>流转时间</th>
                                <th>订单号码</th>
                                <th>已激活（个）</th>
                                <th>成卡（个）</th>
                                <th>未激活（个）</th>
                                <th>白卡（张）</th>
                                <th>所属商户</th>
                                <th>设备号</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(todo,index) in search.activatedList">
                                
                            </tr>
                        </tbody>
                    </table>
                    <my-page :page="pageNow" :maxpage="maxpage" :callback="callback"></my-page>
                </div>
            </div>
            <!-- 未激活 -->
            <div v-if="search.notActiveList">
                <div class="m-total-table">
                    <div class="total-head">
                        流转信息
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>流转时间</th>
                                <th>订单号码</th>
                                <th>已激活（个）</th>
                                <th>成卡（个）</th>
                                <th>未激活（个）</th>
                                <th>白卡（张）</th>
                                <th>所属商户</th>
                                <th>设备号</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(todo,index) in search.notActiveList">
                                
                            </tr>
                        </tbody>
                    </table>
                    <my-page :page="pageNow" :maxpage="maxpage" :callback="callback"></my-page>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import "../../../assets/km/css/search.css";
import { translateData,getDateTime, errorDeal } from '../../../config/utils.js';
import { requestGetExclusiveNumber,requestGetExclusiveWhite,requestGetExclusiveCheng,requestGetExclusiveActive,requestGetExclusiveNotActive } from "../../../config/service.js";
export default {
    data() {
        return{
            off:{
                isLoad:false,
            },
            form:{
                select:1,
                context1:"",//号码/号段
                context2:"",//设备号
                context3:"",//iccid
            },
            search:{
                flowList:"",
                flowListTotal:0,
                whiteList:"",
                whiteListTotal:0,
                chengkaList:"",
                chengkaListTotal:0,
                activatedList:"",
                activatedListTotal:0,
                notActiveList:"",
                notActiveListTotal:0,
            },
            pagesize1:10,
            pageNow1:1,
            maxpage1:1,
            callback1:Function,

            pagesize2:10,
            pageNow2:1,
            maxpage2:1,
            callback2:Function,

            pagesize3:10,
            pageNow3:1,
            maxpage3:1,
            callback3:Function,

            pagesize4:10,
            pageNow4:1,
            maxpage4:1,
            callback4:Function,

            pagesize5:10,
            pageNow5:1,
            maxpage5:1,
            callback5:Function,
        }
    },
    methods:{
        searchList(v){
            let vm=this,json={};
                vm.search={
                whiteList:"",
                whiteListTotal:0,
                chengkaList:"",
                chengkaListTotal:0,
                activatedList:"",
                activatedListTotal:0,
                notActiveList:"",
                notActiveListTotal:0}
            if(v==1){
                if(vm.form.select==""||vm.form.select!=""&&vm.form["context"+vm.form.select]==""){
                    layer.open({
                        content: "请选择并输入查询条件",
                        skin: "msg",
                        time: 2,
                        msgSkin: "error"
                    });
                    return false;
                }
                console.log(vm.form.select)
                if(vm.form.select==1){
                    json.phoneNum=vm.form.context1;
                }else if(vm.form.select==2){
                    json.deviceId=vm.form.context2;
                }else if(vm.form.select==3){
                    json.iccid=vm.form.context3;
                }else{
                    alert('类型错误！！')
                    return false;
                }
                requestGetExclusiveNumber(json,()=>{vm.off.isLoad=false})
                .then((data)=>{
                    vm.search.flowList=data.data.datas;
                    vm.search.flowListTotal=data.data.total;
                    vm.maxpage1=Math.ceil(parseInt(vm.search.flowListTotal)/vm.pagesize1);
                    vm.pageNow1=i||1;
                    vm.callback1=(i)=>{vm.searchList(v,i)};
                }).catch(e=>errorDeal(e))
            }else if(v==2){//白卡列表
                requestGetExclusiveWhite(json,()=>{vm.off.isLoad=false})
                .then((data)=>{
                    vm.search.whiteList=data.data.datas;
                    vm.search.whiteListTotal=data.data.total;
                    vm.maxpage2=Math.ceil(parseInt(vm.search.whiteListTotal)/vm.pagesize2);
                    vm.pageNow2=i||1;
                    vm.callback2=(i)=>{vm.searchList(v,i)};
                }).catch(e=>errorDeal(e))
            }else if(v==3){
                requestGetExclusiveCheng(json,()=>{vm.off.isLoad=false})
                .then((data)=>{
                    vm.search.chengkaList=data.data.datas;
                    vm.search.chengkaListTotal=data.data.total;
                    vm.maxpage3=Math.ceil(parseInt(vm.search.chengkaListTotal)/vm.pagesize3);
                    vm.pageNow3=i||1;
                    vm.callback3=(i)=>{vm.searchList(v,i)};
                }).catch(e=>errorDeal(e))
            }else if(v==4){
                requestGetExclusiveActive(json,()=>{vm.off.isLoad=false})
                .then((data)=>{
                    vm.search.activatedList=data.data.datas;
                    vm.search.activatedListTotal=data.data.total;
                    vm.maxpage4=Math.ceil(parseInt(vm.search.activatedListTotal)/vm.pagesize4);
                    vm.pageNow4=i||1;
                    vm.callback4=(i)=>{vm.searchList(v,i)};
                }).catch(e=>errorDeal(e))
            }else if(v==5){
                requestGetExclusiveNotActive(json,()=>{vm.off.isLoad=false})
                .then((data)=>{
                    vm.search.notActiveList=data.data.datas;
                    vm.search.notActiveListTotal=data.data.total;
                    vm.maxpage5=Math.ceil(parseInt(vm.search.notActiveListTotal)/vm.pagesize5);
                    vm.pageNow5=i||1;
                    vm.callback5=(i)=>{vm.searchList(v,i)};
                }).catch(e=>errorDeal(e))
            }else{
                alert('类型错误！！');
                return false;
            }
        },
        isChe(){
            this.form.select = "";
        },
        translateData(v,i){
            return translateData(v,i);
        },
        getDateTime(v){
            return getDateTime(v);
        }
    }
}
</script>



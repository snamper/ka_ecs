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
                        <div class="input-box"><input v-model="phoneNum" :readonly="form.select!=1" maxlength="14" type="tel" placeholder="请输入查询的号码或号段"></div>
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
                        <div class="input-box"><input v-model="deviceId" :readonly="form.select!=2" maxlength="14" type="tel" placeholder="请输入查询的设备号码"></div>
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
                        <div class="input-box"><input v-model="ICCID" :readonly="form.select!=3" maxlength="25" type="tel" placeholder="请输入查询的ICCID"></div>
                    </div>
                    <button class="f-btn f-btn-line" @click="searchList()">查询</button>
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
                            <tr v-for="(todo,index) in search.list">
                                
                            </tr>
                        </tbody>
                    </table>
                    <my-page :page="pageNow" :maxpage="maxpage" :callback="callback"></my-page>
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
                            <tr v-for="(todo,index) in search.list">
                                
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
                            <tr v-for="(todo,index) in search.list">
                                
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
                            <tr v-for="(todo,index) in search.list">
                                
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
import { translateData,getDateTime } from '../../../config/utils.js';
export default {
    data() {
        return{
            off:{
                isLoad:false,
            },
            form:{
                select:"",
            },
            search:{
                flowList:"",
                chengkaList:"",
                activatedList:"",
                notActiveList:"",
            },
            phoneNum:"",
            deviceId:"",
            ICCID:"",
            pageNow:1,
            maxpage:1,
            callback:Function,
        }
    },
    methods:{
        searchList(){

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



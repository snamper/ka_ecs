<!--**
  *@info 专营号
* *-->
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
                        <div class="input-box"><input v-model="form.context1" :readonly="form.select!=1" maxlength="8" type="tel" placeholder="请输入查询的号码或号段"></div>
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
            <div v-if="search.numberList">
                <div class="g-box" v-if="search.number1">
                    <p class="detailsEleP">查询结果</p>
                    <p class="numberInfo">
                        <b><label v-if="search.number1.cityName" class="f-c-grey"></label><a style="color:#20a0ff">{{translateData('formatPhone',search.number1.phoneTitle)}}***</a></b>
                        <b><label v-if="search.number1.cityName" class="f-c-grey">归属地 ：</label>{{search.number1.cityName||'--'}}</b>
                        <b><label v-if="search.number1.preStore" class="f-c-grey">预存 ：</label>{{translateData('money',search.number1.preStore)}}元</b>
                        <b><label v-if="search.number1.pkgName" class="f-c-grey">产品名称 ：</label>{{search.number1.pkgName||'--'}}<span class="f-c-grey">( 资费:{{search.number1.feeVoice||'--'}} ,可选包:{{search.numberList[0].optPkgInfo||'--'}})</span></b>
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
                            <tr v-for="(todo,index) in search.numberList" :key="index">
                                <td>{{ ((pageNum-1)*10+(index+1)) }}</td>
                                <td>{{getDateTime(todo.createTime)[6]}}</td>
                                <td>{{todo.sysOrderId||'--'}}</td>
                                <td>
                                    <a class="f-a-td" v-if="!isNaN(todo.actived)&&todo.actived!=0" @click="getNumberInfo({s:3,newCompanyName:todo.newCompanyName,dealerId:todo.newDealerId,size:todo.actived})">{{todo.actived}}</a>
                                    <a v-else-if="todo.actived==0">{{todo.actived}}</a>
                                    <a v-else>--</a>
                                </td>
                                <td>
                                    <a class="f-a-td" v-if="!isNaN(todo.adulted)&&todo.adulted!=0" @click="getNumberInfo({s:2,newCompanyName:todo.newCompanyName,dealerId:todo.newDealerId,size:todo.adulted})">{{todo.adulted}}</a>
                                    <a v-else-if="todo.adulted==0">{{todo.adulted}}</a>
                                    <a v-else>{{todo.adulted}}</a>
                                </td>
                                <td>
                                    <a class="f-a-td" v-if="!isNaN(todo.unactived)&&todo.unactived!=0" @click="getNumberInfo({s:4,newCompanyName:todo.newCompanyName,dealerId:todo.newDealerId,size:todo.unactived})">{{todo.unactived}}</a>
                                    <a v-else-if="todo.unactived==0">{{todo.unactived}}</a>
                                    <a v-else>{{todo.unactived}}</a>
                                </td>
                                <td>
                                    <a class="f-a-td" v-if="!isNaN(todo.whited)&&todo.whited!=0" @click="getNumberInfo({s:1,newCompanyName:todo.newCompanyName,dealerId:todo.newDealerId,size:todo.whited})">{{todo.whited}}</a>
                                    <a v-else-if="todo.whited==0">{{todo.whited}}</a>
                                    <a v-else>{{todo.whited}}</a>
                                </td>
                                <td><a class="f-a-td" :href="'#/homek/resource/merchant/'+todo.newDealerId">{{todo.newCompanyName||'--'}}({{todo.newDealerId}})</a></td>
                                <td>{{todo.useDeviceId||'--'}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
                <div class="m-total-table" v-if="search.numberInfo">
                    <div class="total-head">
                        号码信息【<label class="f-c-yellow">{{phoneDealerName}}({{phoneDealerId}})</label>——{{translateCardType(phoneStatus)}}({{phoneTotal}})】
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>专营号码</th>
                                <th>ICCID</th>
                                <th>IMSI</th>
                                <th>当前预存</th>
                                <th>当前产品</th>
                                <th>制卡订单号</th>
                                <th>开卡订单号</th>
                                <th>短信验证</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(todo,index) in search.numberInfo" :key="index">
                                <td>{{((pageNum1-1)*10+(index+1))}}</td>
                                <td>{{todo.phone||'--'}}</td>
                                <td>{{todo.iccid||'--'}}</td>
                                <td>{{todo.imsi||'--'}}</td>
                                <td>{{todo.preStore||'--'}}</td>
                                <td>{{todo.pkgName||'--'}}</td>
                                <td>
                                    <a v-if="todo.makeCardId!='--'" :href="'#/homek/orderSearch/makeCard/'+todo.makeCardId" class="f-a-td">{{todo.makeCardId}}</a>
                                    <a v-if="todo.makeCardId=='--'">{{todo.makeCardId}}</a>
                                </td>
                                <td>
                                    <a v-if="todo.openCardId!='--'" :href="'#/homek/orderSearch/card/audited/'+todo.openCardId" class="f-a-td">{{todo.openCardId||'--'}}</a>
                                    <a>{{todo.openCardId||'--'}}</a>
                                </td>
                                <td>{{translateData(16,todo.safeType)}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <my-page :page="pageNum1" :maxpage="maxpage1" :callback="callback1"></my-page>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import "../../../assets/km/css/search.css";
import { translateData,getDateTime, errorDeal } from '../../../config/utils.js';
import { requestGetExclusiveNumberList,requestGetExclusiveNumberDesc } from "../../../config/service.js";
import pagination from "../../../componentskm/page.vue";
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
                numberList:"",
                numberInfo:"",
                number1:""
            },
            total:0,//总查询条数
			pageNum:1,//当前页数
			pageSize:10,//显示条数
			maxpage:1,//最大页数
            callback:Function,//page组件点击回调
            
            total1:0,//总查询条数
			pageNum1:1,//当前页数
			pageSize1:10,//显示条数
			maxpage1:1,//最大页数
            callback1:Function//page组件点击回调
            ,phoneNum:""
            ,phoneDealerId:""
            ,phoneDealerName:""
            ,phoneStatus:""
            ,phoneTotal:""
        }
    },
    components:{
		'my-page':pagination
    },
    created:function(){
        let vm=this;
        setTimeout(function(){
            let val=vm.$route.params.val,v={};
            v.sys_order_id=val;
            if(val!='null'){
                vm.form.context1=val;
                vm.searchList()
            }
        },300);
    },
    methods:{
        searchList(p){
            let vm=this,
            json={
                "pageSize": "10",
                "pageNow": p||1,
                "searchType": vm.form.select,//1:码号段前8位，2：设备号,3:iccid
                "context": vm.form['context'+vm.form.select],//搜索文本
            };
            vm.search.numberInfo="";
            requestGetExclusiveNumberList(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.search.number1=data.data.datas[0];
                vm.search.numberList=data.data.datas;
                vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
                vm.total=data.data.total;
                vm.pageNum=p||1;
                vm.callback=function(v){vm.searchList(v)};     
            }).catch(e=>errorDeal(e))
        },  
        getNumberInfo(v,p){
            let vm=this,
            json={
                "pageSize": "10",
                "pageNow": p||1,
                "searchType": v.s,//1白卡2成卡3已激活4未激活
                "phoneSg":vm.search.number1.phoneTitle,//8位码号段
                "dealerId":vm.search.number1.newDealerId//商户id
            };
            requestGetExclusiveNumberDesc(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.search.numberInfo=data.data;
                vm.maxpage1=Math.ceil(parseInt(data.data.length)/10);
                vm.total1=data.data.length;
                vm.pageNum1=p||1;
                vm.phoneNum=vm.search.number1.phoneTitle;
                vm.phoneDealerId=v.dealerId;
                vm.phoneDealerName=v.newCompanyName;
                vm.phoneStatus=v.s;
                vm.phoneTotal=v.size;
                vm.callback1=function(v){vm.searchList(v)};
                setTimeout(()=>{
                    this.funScrollTop()
                },50)     
            }).catch(e=>errorDeal(e))
        },
        funScrollTop(){
            let ch=this.$parent.$parent.$refs.psec.clientHeight;
            let sh=this.$parent.$parent.$refs.psec.scrollHeight;
            let sch = sh-ch;
            this.$parent.$parent.$refs.psec.scrollTop=sch;
        },
        isChe(){
            this.form.select = "";
        },
        translateData(v,i){
            return translateData(v,i);
        },
        getDateTime(v){
            return getDateTime(v);
        },
        translateCardType(v){
             //1白卡2成卡3已激活4未激活5预占
            return v==1?'白卡':v==2?"成卡":v==3?'已激活':v==4?'未激活':v==5?'预占':'';
        }
    }
}
</script>
<style scoped>
    p.detailsEleP{margin: 10px;}
    .form-c.o-no-bgc{padding: .15rem .3rem;}
    .numberInfo{background-color:#fff;padding:12px 8px;border-radius:6px}
    .numberInfo>b{padding-right: 20px;}
</style>



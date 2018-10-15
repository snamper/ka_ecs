<!--**
  *@info 专营号查询
* *-->
<template>
    <section>
        <div class="g-search-menu" id="search" :class="{active:off.details}">
            <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
            <section class="m-occlusion" :class="{active:off.isLoad}"></section>
            <!--查询-->
            <section v-if="!off.numberFlow">
                <div class="g-search-form">
                    <div class="m-tag"><b></b>条件查询</div>
                    <section class="form-c o-no-bgc">
                        <div class="row" :class="{active:form.select==1}">
                            <span class="m-form-radio">
                                <label style="width:0.7rem;margin-right:0">
                                    <span class="radio"><input type="radio" value="1" v-model="form.select">
                                        <span></span>
                                    </span>
                                    <span>号码/段：</span>
                                </label>
                            </span>
                            <div class="input-box"><input v-model="numberSection" :readonly="form.select!=1" maxlength="11" type="tel" placeholder="请输入查询的号码/段"></div>
                        </div>
                        <div class="row" :class="{active:form.select==2}">
                            <span class="m-form-radio">
                                <label style="width:0.7rem;margin-right:0">
                                    <span class="radio"><input type="radio" value="2" v-model="form.select">
                                        <span></span>
                                    </span>
                                    <span>设备号：</span>
                                </label>
                            </span>
                            <div class="input-box"><input v-model="deviceId" :readonly="form.select!=2" maxlength="20" type="tel" placeholder="请输入查询的设备号"></div>
                        </div>
                        <div class="row" style="margin-top:10px;">
                            <span class="text m-title">面额：</span>
                            <div class="m-form-checkbox">
                                <label><span class="checkbox"><input type="checkbox" value="true" v-model="context5All" checked="checked" @change="BtnCheckAll"><span></span></span><span class="f-checkText">全部</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="100" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">100卡</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="50" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">50卡</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="20" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">20卡</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="10" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">10卡</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="0" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">0卡</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="-1" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">无预存</span></label>
                            </div>
                        </div>
                        <div class="row" style="margin-top:10px;">
                            <span class="text m-title">归属地：</span>
                            <div style="width:80%;display:inline-block">
                                <input type="text" v-on:input="filterData()" v-model="searchKey" @blur="msHide" @focus="msShow">
                                <p v-if="isShowCitySearch" class="m-searchCity" style="width:400px;height:400px">
                                    <span v-for="(v,i) in ret" @mousedown="checkCity(v)">{{v.cityName}}</span>
                                </p>
                                <p v-if="isShowCityAll" class="m-allCity" style="width:400px;height:400px">
                                    <span>
                                        <span class="m-mapCityBox" v-for="(v,i) in letterList.a" @mousedown="checkCity(v)">{{v.cityName}}</span> 
                                    </span>
                                    <span v-for="(item,key,index) in letterList"  v-if="key!='a'" >
                                        <h2 style="color:red" >{{key}}</h2>
                                        <span class="m-mapCityBox" v-for="(v,i) in item" @mousedown="checkCity(v)">{{v.cityName}}</span> 
                                    </span>
                                </p>
                            </div>
                        </div>  
                        <div class="row" style="margin-top:10px;">
                            <span class="text m-title">流转次数：</span>
                            <div class="m-form-checkbox">
                                <label><span class="checkbox"><input type="checkbox" value="true" v-model="flowAll" checked="checked" @change="BtnFlowAll"><span></span></span><span class="f-checkText">全部</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="=1" v-model="flow" checked="checked"><span></span></span><span class="f-checkText">1次</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="=2" v-model="flow" checked="checked"><span></span></span><span class="f-checkText">2次</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="=3" v-model="flow" checked="checked"><span></span></span><span class="f-checkText">3次</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="=4" v-model="flow" checked="checked"><span></span></span><span class="f-checkText">4次</span></label>
                                <label><span class="checkbox"><input type="checkbox" value=">5" v-model="flow" checked="checked"><span></span></span><span class="f-checkText">5次及以上</span></label>
                            </div>
                        </div>            
                        <button class="f-btn f-btn-line" @click="searchList()">查询</button>
                    </section>
                </div>
                <div class="m-total-table" v-if="dataList">
                    <div class="total-head">查询结果<b>{{total}}</b></div>
                    <table class="exclusiveNumberTab" v-if="listShow==1">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>号码</th>
                                <th>归属地</th>
                                <th>面额(元)</th>
                                <th>产品名称</th>
                                <th>当前状态</th>
                                <th>短信校验</th>
                                <th>制卡订单号码</th>
                                <th>制卡商户</th>
                                <th>开卡订单号码</th>
                                <th>开卡商户</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="JSON.stringify(dataList)!='{}'">
                                <td>1</td>
                                <td>{{dataList.phone}}</td>
                                <td>{{dataList.home||'--'}}</td>
                                <td>{{translateData('money',dataList.preStore)}}</td>
                                <td>{{dataList.pkgName||'--'}}</td>
                                <td>{{translateData(17,dataList.status)}}</td>
                                <td>{{translateData(16,dataList.safeType)}}</td>
                                <td>
                                    <a :href="dataList.makeCardId!=''?'#/homek/orderSearch/makeCard/'+dataList.makeCardId:`javascript:void(0)`" class="details">{{dataList.makeCardId||'--'}}</a>
                                </td>
                                <td>
                                    <a :href="dataList.makeDealer!=''?'#/homek/resource/merchant/'+dataList.makeDealer:`javascript:void(0)`" class="details">{{dataList.makeDealerName||'--'}}({{dataList.makeDealer||'--'}})</a>
                                </td>
                                <td>
                                    <a :href="dataList.openCardId!=''?'#/homek/orderSearch/card/audited/null/'+dataList.openCardId:`javascript:void(0)`" class="details">{{dataList.openCardId||'--'}}</a>
                                </td>
                                <td>
                                    <a :href="dataList.openDealer?'#/homek/resource/merchant/'+dataList.openDealer:`javascript:void(0)`" class="details">{{dataList.openDealerName||'--'}}({{dataList.openDealer||'--'}})</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="exclusiveNumberTab" v-if="listShow==2">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>号码</th>
                                <th>流转次数</th>
                                <th>归属地</th>
                                <th>面额(元)</th>
                                <th>产品名称</th>
                                <th>所属商户</th>
                                <th>设备号</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v,i) in dataList" :key="i">
                                <td>{{((pageNum-1)*10+(i+1))}}</td>
                                <td><a @click="getFlowDetails(v)" style="cursor:pointer" class="details ">{{translateData('formatPhone',v.title)}}****</a></td>
                                <td>{{v.flowCount}}</td>
                                <td>{{v.home||'--'}}</td>
                                <td>{{translateData('money',v.preStore)}}</td>
                                <td>{{v.prodName||'--'}}</td>
                                <td><a :href="v.dealerId!='--'?'#/homek/resource/merchant/'+v.dealerId:`javascript:void(0)`" :class="{'details':v.dealerId!='--'}">{{v.dealerName}}({{v.dealerId}})</a></td>
                                <td>{{v.deviceId||'--'}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <my-page v-if="total&&listShow==2" :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
                </div>
            </section>
            <numberFlow v-if="off.numberFlow" :numberInfo="numberInfo" :flowlist="flowlist" :pageNumf="pageNumf" :maxPagef="maxPagef" :callbackf="callbackf"></numberFlow>
        </div>
    </section>
</template>
<script>
import "../../../assets/km/css/search.css";
import { translateData,getDateTime, errorDeal } from '../../../config/utils.js';
import { requestGetExclusiveNumberList,requestGetExclusiveNumberFlow,getCitys,requestGetGeneralNumberList1 } from "../../../config/service.js";
import pagination from "../../../componentskm/page.vue";
import numberFlow from './exclusiveFlow.vue';
export default {
    data() {
        return{
            off:{
                details:"",
                isLoad:"",
                numberFlow:""
            },
            form:{
                select:1
            },
            numberSection:"",//号码
            deviceId:"",//设备号
            context5:[100,50,20,10,0,-1],//面额
            context5All:"true",
            flow:['=1','=2','=3','=4','>5'],//面额
            flowAll:true,
            dataList:"",
            total:"",
            numberInfo:"",
            searchKey:"全国",
            searchCityCode:100,
            letterList:"",
            selectedNode:"100",
            isShowCitySearch:false,
            isShowCityAll:false,
            findCitylist:[],
            ret:[],
            /*流转详情页数据*/
            flowlist:"",
            pageNumf:"",
            maxPagef:"",
            listshow:""
        }
    },
    components:{
        'my-page':pagination,
        numberFlow,
    },
    created:function(){
        let vm=this;
        setTimeout(function(){
            let val=vm.$route.params.val,v={};
            v.sys_order_id=val;
            if(val!='null'){
                vm.numberSection=val;
                vm.searchList()
            }
        },300);
        getCitys({"monoType":1},()=>{vm.off.isLoad=false})
        .then((data)=>{
            vm.letterList=data.data.list;
            vm.letterList.a=[{ "cityName": "全国","cityCode":100}]
        }).catch(e=>errorDeal(e))
    },watch:{
        context5(){
            if(this.context5.length==6){
                this.context5All=true;
            }else{
                this.context5All=false;
            }
        },
        flow(){
            if(this.flow.length==5){
                this.flowAll=true;
            }else{
                this.flowAll=false;
            }
        }
    },
    methods:{
        searchList(page){
            let vm=this,data,url;
            let json={
                pageNow:page||1,
                pageSize:10,
                phone:vm.numberSection,
                deviceId:vm.deviceId,
                prestoreMoney:vm.context5,
                cityCode:vm.searchCityCode,
                flowCount:vm.flow.join(',')
            };
            if(vm.flow.length==5){
                json.flowCount='';
            }
            vm.numberInfo="";
            if(vm.context5.length==0){
                layer.open({
                    content:"请选择面额",
                    skin:"msg",
                    time: 2,
                    msgSkin: "error"
                });
                return false;
            }
            if(vm.flow.length==0){
                layer.open({
                    content:"请选择流转次数",
                    skin:"msg",
                    time: 2,
                    msgSkin: "error"
                });
                return false;
            }
            if(vm.form.select==1){
                if(vm.numberSection!=""){
                    if(isNaN(vm.numberSection)||vm.numberSection.length<8){
                        layer.open({
                            content:"请输入正确的号码或号段",
                            skin:"msg",
                            time: 2,
                            msgSkin: "error"
                        });
                        return false;
                    }
                    json.deviceId="";
                }
            }
            if(vm.form.select==2){
                json.phone="";
            }
            vm.off.isLoad=true;
            if(vm.numberSection.length==11){
                requestGetGeneralNumberList1(json,()=>{vm.off.isLoad=false})
                .then((data)=>{
                    vm.dataList=data.data
                    vm.maxpage=1;
                    vm.total=1;
                    vm.pageNum=1;
                    vm.listShow=1;
                }).catch(e=>errorDeal(e)) 
            }else{
                requestGetExclusiveNumberList(json,()=>{vm.off.isLoad=false})
                .then((data)=>{
                    if(data.data.hasOwnProperty('datas')){
                        vm.dataList=data.data.datas;
                        vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
                        vm.total=data.data.total;
                        vm.pageNum=page||1;
                        vm.callback=function(v){vm.searchList(v)}; 
                        vm.listShow=2;    
                    }else{
                        vm.dataList={}
                    }
                }).catch(e=>errorDeal(e))
            }
        },
        getFlowDetails(v){
            let vm=this,json={
                pageSize:10,
                pageNow:1,
                phoneTitle:v.title
            };
            vm.getFlowlist(json)
        },
        getFlowlist(json,p){
            let vm=this;
            json.pageNow=p||1;
            vm.off.isLoad=true;
            requestGetExclusiveNumberFlow(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.numberInfo=data.privInfo;
                vm.flowlist=data.data.datas;
                vm.flowTotal=data.data.total;
                vm.pageNumf=p||1;
                vm.maxPagef=Math.ceil(parseInt(data.data.total)/10);
                vm.callbackf=function(p){vm.getFlowlist(json,p)}; 
                vm.off.numberFlow=true;
            }).catch(e=>errorDeal(e))
        },
        filterData(v){
            let vm = this;
            var sKey = vm.searchKey && vm.searchKey.toLowerCase();
            var data =  vm.letterList;vm.ret=[];
            if (sKey) {
                Object.entries(data).forEach(
                    (row,index)=>{
                        if(row[0].toLowerCase().indexOf(sKey)>-1){//首字母匹配
                            vm.ret=row[1];
                            return;
                        }else{
                            let todo = row[1].filter((value)=>
                                Object.keys(value).some((key)=>
                                    String(value[key]).indexOf(sKey) > -1
                                )
                            );
                            if(todo.length)vm.ret=vm.ret.concat(todo);
                        }
                    }
                );
                vm.isShowCityAll=false;
                vm.isShowCitySearch=true;
            }else{
                vm.isShowCitySearch=false;
                vm.isShowCityAll=true;
            }
        },
        checkCity(v){
            let vm=this;
            vm.searchKey="";
            vm.searchKey=v.cityName;
            vm.searchCityCode=v.cityCode;
        },
        msHide(){
            this.isShowCitySearch=false;
            this.isShowCityAll=false;
            let vm=this;
            if(vm.searchKey==''){
                vm.searchKey="全国";
            }
        },msShow(){
            let vm=this;
            vm.isShowCitySearch=false;
            vm.isShowCityAll=true;
        },
        funScrollTop(){
            let ch=this.$parent.$parent.$refs.psec.clientHeight;
            let sh=this.$parent.$parent.$refs.psec.scrollHeight;
            let sch = sh-ch;
            this.$parent.$parent.$refs.psec.scrollTop=sch;
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
        },BtnCheckAll(){
            if(this.context5All==true){
                this.context5=[100,50,20,10,0,-1]
            }else if(this.context5All==false){
                this.context5=[]
            }
        },BtnFlowAll(){
            if(this.flowAll==true){
                this.flow=['=1','=2','=3','=4','>5']
            }else if(this.flowAll==false){
                this.flow=[]
            }
        },
    }
}
</script>
<style>
.form-c.o-no-bgc{padding: .3rem}
.m-total-table table.exclusiveNumberTab tbody tr>td.dealerInfo{padding: 0;text-align: center}
.m-total-table table.exclusiveNumberTab tbody tr>td.dealerInfo table{border: none;}
.m-total-table table.exclusiveNumberTab tbody tr>td  table tr:nth-child(1){border-top: none}
.selectStyle{width: 60%;border-color:#eee;border-radius: 7px;height: .35rem;padding-left: 10px;outline: none}
.underLine{text-decoration: underline;color:#3D6FDC;}
.g-search-menu{position: static}
.m-total-table{background: transparent}
.m-title{text-align: justify;text-align-last: justify}
.f-checkText{display: inline-block;margin-left: 5px;margin-right: 5px;}
.details{text-decoration: underline}
.m-searchCity, .m-allCity{position: absolute;z-index: 999;background: #fff;border: 1px solid #eee;margin-top: 5px;border-radius: 6px;padding: 10px;overflow-y: auto}
.m-allCity>span{display: block;}
.m-allCity .m-mapCityBox{cursor: pointer;display: inline-block;margin-right:5px;line-height: 25px;overflow: auto;width: 80px;height: 25px;}
.m-searchCity>span{cursor: pointer;display: inline-block;margin-right:5px;width: 70px;height: 25px;line-height: 25px;overflow: auto}
</style>


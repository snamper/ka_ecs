<!--**
  *@info 专营号查询
* *-->
<template>
    <section>
        <div class="g-search-menu" id="search" :class="{active:off.details}">
            <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
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
                            <select name="citysSelect" id="city" class="selectStyle" v-model="selectedNode">
                                <option v-for="(v,i) in citys" :key="i" :value="v.cityCode">{{v.cityName}}</option>
                            </select>
                        </div>              
                        <button class="f-btn f-btn-line" @click="searchList()">查询</button>
                    </section>
                </div>
                <div class="m-total-table" v-if="dataList">
                    <div class="total-head">查询结果<b>{{total}}</b></div>
                    <table class="exclusiveNumberTab">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>号码</th>
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
                                <td>{{v.home||'--'}}</td>
                                <td>{{translateData('money',v.preStore)}}</td>
                                <td>{{v.prodName||'--'}}</td>
                                <td><a :href="v.dealerId!='--'?'#/homek/resource/merchant/'+v.dealerId:`javascript:void(0)`" :class="{'details':v.dealerId!='--'}">{{v.dealerName}}({{v.dealerId}})</a></td>
                                <td>{{v.deviceId||'--'}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <my-page v-if="total" :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
                </div>
            </section>
            <numberFlow v-if="off.numberFlow" :numberInfo="numberInfo" :flowlist="flowlist" :pageNumf="pageNumf" :maxPagef="maxPagef" :callbackf="callbackf"></numberFlow>
        </div>
    </section>
</template>
<script>
import "../../../assets/km/css/search.css";
import { translateData,getDateTime, errorDeal } from '../../../config/utils.js';
import { requestGetExclusiveNumberList,requestGetExclusiveNumberFlow } from "../../../config/service.js";
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
            dataList:"",
            total:"",
            numberInfo:"",
            citys:[{"cityName":"全国","cityCode":"100"},{"cityName":"北京","cityCode":"110"},{"cityName":"长春","cityCode":"901"},{"cityName":"长沙","cityCode":"741"},{"cityName":"沧州","cityCode":"180"},{"cityName":"常州","cityCode":"440"},{"cityName":"成都","cityCode":"810"},{"cityName":"重庆","cityCode":"831"},{"cityName":"大连","cityCode":"940"},{"cityName":"大庆","cityCode":"981"},{"cityName":"东莞","cityCode":"580"},{"cityName":"佛山","cityCode":"530"},{"cityName":"福州","cityCode":"380"},{"cityName":"广州","cityCode":"510"},{"cityName":"贵阳","cityCode":"850"},{"cityName":"哈尔滨","cityCode":"971"},{"cityName":"海口","cityCode":"501"},{"cityName":"杭州","cityCode":"360"},{"cityName":"合肥","cityCode":"305"},{"cityName":"呼和浩特","cityCode":"101"},{"cityName":"湖州","cityCode":"362"},{"cityName":"惠州","cityCode":"570"},{"cityName":"济南","cityCode":"170"},{"cityName":"嘉兴","cityCode":"363"},{"cityName":"江门","cityCode":"550"},{"cityName":"金华","cityCode":"367"},{"cityName":"开封","cityCode":"762"},{"cityName":"昆明","cityCode":"860"},{"cityName":"丽水","cityCode":"469"},{"cityName":"南昌","cityCode":"750"},{"cityName":"南京","cityCode":"340"},{"cityName":"南宁","cityCode":"591"},{"cityName":"南通","cityCode":"358"},{"cityName":"宁波","cityCode":"370"},{"cityName":"平顶山","cityCode":"769"},{"cityName":"青岛","cityCode":"166"},{"cityName":"衢州","cityCode":"468"},{"cityName":"泉州","cityCode":"480"},{"cityName":"汕头","cityCode":"560"},{"cityName":"上海","cityCode":"310"},{"cityName":"绍兴","cityCode":"365"},{"cityName":"深圳","cityCode":"540"},{"cityName":"沈阳","cityCode":"910"},{"cityName":"石家庄","cityCode":"188"},{"cityName":"苏州","cityCode":"450"},{"cityName":"台州","cityCode":"476"},{"cityName":"泰州","cityCode":"445"},{"cityName":"天津","cityCode":"130"},{"cityName":"潍坊","cityCode":"155"},{"cityName":"温州","cityCode":"470"},{"cityName":"乌鲁木齐","cityCode":"890"},{"cityName":"无锡","cityCode":"330"},{"cityName":"芜湖","cityCode":"303"},{"cityName":"武汉","cityCode":"710"},{"cityName":"西安","cityCode":"841"},{"cityName":"厦门","cityCode":"390"},{"cityName":"徐州","cityCode":"350"},{"cityName":"烟台","cityCode":"161"},{"cityName":"盐城","cityCode":"348"},{"cityName":"银川","cityCode":"880"},{"cityName":"珠海","cityCode":"620"},{"cityName":"镇江","cityCode":"343"},{"cityName":"中山","cityCode":"556"},{"cityName":"舟山","cityCode":"364"},{"cityName":"郑州","cityCode":"760"},{"cityName":"安顺","cityCode":"789"},{"cityName":"白银","cityCode":"879"},{"cityName":"北海","cityCode":"599"},
            {"cityName": "潮州", cityCode: "531"},{"cityName": "德阳", cityCode: "825"},{"cityName": "大理", cityCode: "862"},{"cityName": "桂林", cityCode: "592"},{"cityName": "赣州", cityCode: "752"},{"cityName": "固原", cityCode: "885"},{"cityName": "淮安", cityCode: "354"},{"cityName": "黄石", cityCode: "715"},{"cityName": "酒泉", cityCode: "931"},{"cityName": "荆州", cityCode: "712"},{"cityName": "荆门", cityCode: "724"},{"cityName": "泸州", cityCode: "815"},{"cityName": "兰州", cityCode: "870"},{"cityName": "柳州", cityCode: "593"},{"cityName": "乐山", cityCode: "814"},{"cityName": "南充", cityCode: "822"},{"cityName": "梅州", cityCode: "528"},{"cityName": "绵阳", cityCode: "824"},{"cityName": "清远", cityCode: "535"},{"cityName": "韶关", cityCode: "558"},{"cityName": "石嘴山", cityCode: "884"},{"cityName": "吴忠", cityCode: "883"},{"cityName": "孝感", cityCode: "717"},{"cityName": "咸宁", cityCode: "719"},{"cityName": "宜昌", cityCode: "711"},{"cityName": "宜宾", cityCode: "817"},{"cityName": "扬州", cityCode: "430"},{"cityName": "湛江", cityCode: "520"},{"cityName": "肇庆", cityCode: "536"},{"cityName": "中卫", cityCode: "886"},{"cityName": "资阳", cityCode: "830"},{"cityName": "天水", cityCode: "877"}]
            ,selectedNode:"100",
            /*流转详情页数据*/
            flowlist:"",
            pageNumf:"",
            maxPagef:""
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
                vm.form.context1=val;
                vm.searchList()
            }
        },300);
    },watch:{
        context5(){
            if(this.context5.length==6){
                this.context5All=true;
            }else{
                this.context5All=false;
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
                cityCode:vm.selectedNode,
            };
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
            if(vm.form.select==1){
                if(vm.numberSection!=""){
                    if(isNaN(vm.numberSection)||vm.numberSection.length<7){
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
            vm.pageNum=page||1;
            requestGetExclusiveNumberList(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.dataList=data.data.datas;
                vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
                vm.total=data.data.total;
                vm.pageNum=page||1;
                vm.callback=function(v){vm.searchList(v)};     
            }).catch(e=>errorDeal(e))
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
</style>


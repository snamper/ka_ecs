<template>
    <section>
        <div  class="m-total-table g-list-box" >
            <header class="g-lis-head">
                <a  class="m-details-back u-icon-back" style="width:20px;height:20px;" @click="close"></a>
                <div class="m-footD-btn">
                </div>
            </header>
            <!-- 流转信息 -->
            <div class="g-box">
                <p class="numberInfo">
                    <b><label><a style="text-decoration: none" class="details">{{translateData('formatPhone',numberInfo.phoneTitle)}}***</a></label></b>
                    <b><label class="f-c-grey">归属地 ：</label>{{numberInfo.cityName||'--'}}</b>
                    <b><label class="f-c-grey">预存 ：</label>{{translateData('money',numberInfo.preStore)}}元</b>
                    <b><label class="f-c-grey">产品名称 ：</label>{{numberInfo.pkgName||'--'}}<span class="f-c-grey">( 资费：{{numberInfo.faceVoice}} ; 可选包：{{numberInfo.optPkgInfo}} )</span></b>
                </p>
            </div>
            <div class="m-total-table" style="width:98%">
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
                        <tr v-for="(todo,index) in flowlist" :key="index">
                            <td>{{ ((pageNumf-1)*10+(index+1)) }}</td>
                            <td>{{getDateTime(todo.createTime)[6]}}</td>
                            <td><a class="f-a-td" :href="'#/homek/orderSearch/flowCard/'+todo.sysOrderId">{{todo.sysOrderId||'--'}}</a></td>
                            <td>
                                <a class="f-a-td" v-if="!isNaN(todo.actived)&&todo.actived!=0" @click="getNumberInfo({s:3,info:todo})">{{todo.actived}}</a>
                                <a v-else-if="todo.actived==0">{{todo.actived}}</a>
                                <a v-else>--</a>
                            </td>
                            <td>
                                <a class="f-a-td" v-if="!isNaN(todo.adulted)&&todo.adulted!=0" @click="getNumberInfo({s:2,info:todo})">{{todo.adulted}}</a>
                                <a v-else-if="todo.adulted==0">{{todo.adulted}}</a>
                                <a v-else>{{todo.adulted}}</a>
                            </td>
                            <td>
                                <a class="f-a-td" v-if="!isNaN(todo.unactived)&&todo.unactived!=0" @click="getNumberInfo({s:4,info:todo})">{{todo.unactived}}</a>
                                <a v-else-if="todo.unactived==0">{{todo.unactived}}</a>
                                <a v-else>{{todo.unactived}}</a>
                            </td>
                            <td>
                                <a class="f-a-td" v-if="!isNaN(todo.whited)&&todo.whited!=0" @click="getNumberInfo({s:1,info:todo})">{{todo.whited}}</a>
                                <a v-else-if="todo.whited==0">{{todo.whited}}</a>
                                <a v-else>{{todo.whited}}</a>
                            </td>
                            <td><a class="f-a-td" :href="'#/homek/resource/merchant/'+todo.newDealerId">{{todo.newCompanyName||'--'}}({{todo.newDealerId}})</a></td>
                            <td>{{todo.useDeviceId||'--'}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <my-page :page="pageNumf" :maxpage="maxPagef" :callback="callbackf"></my-page>
            <div class="m-total-table" v-if="numberList">
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
                        <tr v-for="(todo,index) in numberList" :key="index">
                            <td>{{((pageNum1-1)*10+(index+1))}}</td>
                            <td>{{todo.phone||'--'}}</td>
                            <td>{{todo.iccid||'--'}}</td>
                            <td>{{todo.imsi||'--'}}</td>
                            <td>{{todo.preStore/100||'--'}}</td>
                            <td>{{todo.pkgName||'--'}}</td>
                            <td>
                                <a :href="todo.makeCardId!='--'?'#/homek/orderSearch/makeCard/'+todo.makeCardId:`javascript:void(0)`" :class="todo.makeCardId!='--'?'f-a-td':''">{{todo.makeCardId||'--'}}</a>
                                <!-- <a v-if="todo.makeCardId=='--'">{{todo.makeCardId}}</a> -->
                            </td>
                            <td>
                                <a :href="todo.openCardId!='--'?'#/homek/orderSearch/card/audited/null/'+todo.openCardId:`javascript:void(0)`" :class="todo.openCardId!='--'?'f-a-td':''">{{todo.openCardId||'--'}}</a>
                                <!-- <a v-if="todo.openCardId=='--'">{{todo.openCardId||'--'}}</a> -->
                            </td>
                            <td>{{translateData(16,todo.safeType)}}</td>
                        </tr>
                    </tbody>
                </table>
                <my-page :page="pageNum1" :maxpage="maxpage1" :callback="callback1"></my-page>
            </div>
        </div>
    </section>
</template>
<script>
import "../../../assets/km/css/cardOrderDetails.css";
import {getDateTime, errorDeal,translateData} from "../../../../src/config/utils.js"
import { requestGetExclusiveNumberDesc } from "../../../config/service.js";
import pagination from '../../../componentskm/page';
export default{
    name:"numberFlowDetails",
    props:['numberInfo','flowlist','flowTotal','callbackf','maxPagef','pageNumf'],
    data (){
        return {
            off:{
                isLoad:false
            },
            pageNum1:"",
            maxpage1:"",
            callback1:"",
            numberList:""
        }
    },
    components:{
        'my-page':pagination
    },
    methods:{
        close(){
            let vm=this;
            vm.$parent.off.numberFlow=false;
        }, 
        getNumberInfo(v,p){
            let vm=this,
            json={
                "pageSize": "10",
                "pageNow": p||1,
                "searchType": v.s,//1白卡2成卡3已激活4未激活
                "dealerId":v.info.newDealerId,//商户id
                "createTime":v.info.createTime,
                "outTime":v.info.outTime,
                "phoneSg":vm.numberInfo.phoneTitle,//8位码号段
            };
            vm.off.isLoad=true;            
            requestGetExclusiveNumberDesc(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                if(v.s==1){
                    vm.phoneTotal=v.info.whited;
                }else if(v.s==2){
                    vm.phoneTotal=v.info.adulted;
                }else if(v.s==3){
                    vm.phoneTotal=v.info.actived
                }else if(v.s==4){
                    vm.phoneTotal=v.info.unactived
                }else{
                    return false
                }
                vm.numberList=data.data;
                vm.maxpage1=Math.ceil(parseInt(vm.phoneTotal)/10);
                vm.total1=vm.phoneTotal;
                vm.pageNum1=p||1;
                vm.phoneDealerId=v.info.newDealerId;
                vm.phoneDealerName=v.info.newCompanyName;
                vm.phoneStatus=v.s;
                let v1 = json;
                vm.callback1=function(p){vm.getNumberInfo(v,p)};
            }).catch(e=>errorDeal(e))
        },
        funScrollTop(){
            let ch=this.$parent.$parent.$refs.psec.clientHeight;
            let sh=this.$parent.$parent.$refs.psec.scrollHeight;
            let sch = sh-ch;
            this.$parent.$parent.$refs.psec.scrollTop=sch;
        }
        ,translateData(v,i){
            return translateData(v,i)
        },
        translateCardType(v){
             //1白卡2成卡3已激活4未激活5预占
            return v==1?'白卡':v==2?"成卡":v==3?'已激活':v==4?'未激活':v==5?'预占':'';
        }
        ,getDateTime(v){
            return getDateTime(v)
        }
    }
}
</script>
<style scoped>
    .numberInfo{width:98%;background-color:#fff;padding:12px 8px;border-radius:6px}
    .numberInfo>b{padding-right: 20px;}
    .g-list-box, #details, .g-list-table, .g-inner-table, .g-box{width: 100%; height: auto;}
    .m-total-table{background: transparent}
</style>


<!--**
  *@info sim卡查询
* *-->
<template>
    <section>
        <div class="g-search-menu" id="search">
            <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
            <section class="m-occlusion" :class="{active:off.isLoad}"></section>
            <div class="g-search-form">
                <div class="m-tag"><b></b>精确查询</div>
                <section class="form-c">
                    <div class="row clr m-col-2">
                        <span class="dp col-l">ICCID：</span>
                        <div class="col-r m-input-button"><input v-model="iccid" maxlength="20" type="tel" placeholder="请输入查询的ICCID"><button @click="searchList()">查询</button>
                        </div>
                    </div>
                </section>
            </div>
            <!-- 查询结果 -->
            <div v-if="listSwitch" class="m-total-table">
                <div class="total-head">查询结果</div>
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>ICCID</th>
                            <th>当前状态</th>
                            <th>所属号段/号码</th>
                            <th>地区</th>
                            <th>预存（元）</th>
                            <th>产品名称</th>
                            <th>制卡订单号码</th>
                            <th>制卡商户名称</th>
                            <th>开卡订单号码</th>
                            <th>开卡商户名称</th>
                        </tr>
                    </thead>
                    <tbody  v-if="list">
                        <tr>
                            <td>1</td>
                            <td>{{list.iccid}}</td>
                            <td>{{translateFlag(list.flag)}}</td>
                            <td>{{list.phoneField}}</td>
                            <td>{{list.home}}</td>
                            <td>{{translateData('money',list.preStore)}}</td>
                            <td>{{list.prdName}}</td>
                            <td><a :href="tomakeCardNo(list.makeCardNo)" :class="{'details':list.makeCardNo!='--'}">{{list.makeCardNo||'--'}}</a></td>
                            <td><a :href="list.makeCardDealerId!='--'?'#/homek/resource/merchant/'+list.makeCardDealerId:`javascript:void(0)`" :class="{'details':list.makeCardDealerName!='--'}">{{list.makeCardDealerName||'--'}}</br> ({{list.makeCardDealerId||'--'}})</a></td>
                            <td><a :href="list.openCardNo!='--'?'#/homek/orderSearch/card/audited/'+list.deviceType+'/'+list.openCardNo:`javascript:void(0)`" :class="{'details':list.openCardNo!='--'}">{{list.openCardNo||'--'}}</a></td>
                            <td><a :href="list.openCardDealerId!='--'?'#/homek/resource/merchant/'+list.openCardDealerId:`javascript:void(0)`" :class="{'details':list.openCardDealerId!='--'}">{{list.openCardDealerName||'--'}}</br>({{list.openCardDealerId||'--'}})</a></td>
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
import { requestGetSimCardList } from "../../../config/service.js";
import pagination from "../../../componentskm/page.vue";
export default { 
    data() {
        return{
            off:{
                isLoad:false,
            },
            form:{
                select:"",
                cardType:-1,
            },
            listSwitch:"",
            list:"",
            iccid:"",
            pageNow:1,
            pageSize:10,
            maxpage:1,
            callback:Function,
            total:"",
        }
    },
    components:{
        'my-page':pagination
    },
    methods:{
        searchList(p){
            let vm=this,
            json={
                iccid:vm.iccid,
                pageSize:10,
                pageNow:p||1
            };
            if(vm.iccid.length!=19&&vm.iccid.length!=20){
                layer.open({
                    content:"请输入正确的iccid",
                    skin: "msg",
                    time: 2,
                    msgSkin: "error"
                });
                return false;
            }
            vm.off.isLoad=true;
            requestGetSimCardList(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.list=data.data;
                vm.listSwitch=true;
                vm.maxpage=1;
                vm.pageNow=1;
                if(JSON.stringify(data.data)=="null"){
                    vm.maxpage=0
                }
                vm.callback=(p)=>{vm.searchList(p)};
            }).catch(e=>errorDeal(e,()=>{vm.list=""}))
        },
        translateFlag(v){
            return v==0?"初始状态":v==1?"已用":v==2?"开卡成功":v==3?"成卡":v==4?"白卡":"--";
        },
        tomakeCardNo(v){
          return v!='--'?'#/homek/orderSearch/makeCard/'+v:`javascript:void(0)`;
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
<style scoped>

</style>



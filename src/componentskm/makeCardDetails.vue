
<template>
    <section class="g-list-box" id="details">
        <!--商户ID详情-->
        <div  class="m-total-table g-list-box" >
            <header class="g-lis-head">
                <a  class="m-details-back u-icon-back" style="width:20px;height:20px;" @click="close"></a>
                <div class="m-footD-btn">
                </div>
            </header>
            <div class="g-box">
                <p class="whiteDetailsTitle"><span></span> 订单信息 </p>
                <table class="merchant-total g-list-table table-numberDetails">
                    <table class="g-in-table col-l orderInfo">
                        <!-- 成卡 -->
                        <tbody v-if="cardType==1">
                            <tr>
                                <td>订单号码：</td>
                                <td>{{detailsEmpty.sys_order_id||'--'}}</td>
                                <td>操 作 人：</td> 
                                <td>{{detailsEmpty.username||'--'}}({{detailsEmpty.user_id||'--'}})<a href="javascript:;" class="f-c-blue" @click="getDetails(1,detailsEmpty.user_id)">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>创建时间：</td>
                                <td>{{getDateTime(detailsEmpty.create_time)[6]}}</td>
                                <td>操作人IP：</td>
                                <td>{{detailsEmpty.user_token_info.host||'--'}}</td>
                            </tr>
                            <tr>
                                <td>状态修改时间：</td>
                                <td>{{getDateTime(detailsEmpty.modify_time)[6]}} <a href="javascript:;" class="f-c-blue" @click="getDetails(2,detailsEmpty.sys_order_id)">查看详情</a></td>
                                <td>操作人位置信息：</td>
                                <td>N{{detailsEmpty.user_token_info.latitude||'--'}},E{{detailsEmpty.user_token_info.longitude||'--'}}<a class="f-t-d-u linka" @click="getDetails(3,detailsEmpty.user_token_info)">查看地图</a>{{detailsEmpty.street}}</td>
                            </tr>
                            <tr>
                                <td>当前状态：</td>
                                <td>
                                    {{translateData(11,detailsEmpty.latest_phase)}}
                                </td>
                                <td>商户名称：</td>
                                <td>{{detailsEmpty.company_name||'--'}}【信用等级：{{detailsEmpty.merchantLevel||'--'}}】</td>
                            </tr>
                            <tr>
                                <td>制卡结果：</td>
                                <td>{{translateData(13,detailsEmpty.order_status)}}</td>
                                <td>渠道ID：</td>
                                <td>{{detailsEmpty.dealer_id||'--'}} <a class="f-c-blue" @click="getDetails(4,detailsEmpty.dealer_id)">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>识别仪名称：</td>
                                <td>{{detailsEmpty.device_id||'--'}}</td>                                    
                                <td>终端类型：</td>
                                <td>
                                    <span v-if="detailsEmpty.terminal_type==1">IOS</span>
                                    <span v-if="detailsEmpty.terminal_type==2">Android</span>
                                    <span v-if="detailsEmpty.terminal_type==0">未知设备</span>,版本号：{{detailsEmpty.user_token_info.appVersion}}
                                </td>
                            </tr>
                            <tr>
                                <td>MAC地址：</td>
                                <td>{{detailsEmpty.mac||'--'}}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <!-- 白卡 -->
                        <tbody v-if="cardType==2">
                            <tr>
                                <td>订单号码：</td>
                                <td>{{detailsWhite.sys_order_id||'--'}}</td>
                                <td>操 作 人：</td> 
                                <td>{{detailsWhite.create_user_name||'--'}}({{detailsWhite.create_user_id||'--'}})<a href="javascript:;" class="f-c-blue" @click="getDetails(1,detailsWhite.create_user_id)">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>创建时间：</td>
                                <td>{{getDateTime(detailsWhite.create_time)[6]}}</td>
                                <td>操作人IP：</td>
                                <td>{{detailsWhite.user_token_info.host||'--'}}</td>
                            </tr>
                            <tr>
                                <td>状态修改时间：</td>
                                <td>{{getDateTime(detailsWhite.create_time)[6]}} <a href="javascript:;" class="f-c-blue" @click="getDetails(2,detailsWhite.sys_order_id)">查看详情</a></td>
                                <td>操作人位置信息：</td>
                                <td>N{{detailsWhite.user_token_info.latitude||'--'}},E{{detailsWhite.user_token_info.longitude||'--'}}<a class="f-t-d-u linka" @click="getDetails(3,detailsWhite.user_token_info)">查看地图</a>{{detailsWhite.street}}</td>
                            </tr>
                            <tr>
                                <td>当前状态：</td>
                                <td>{{translateData(11,detailsWhite.latest_phase)}}</td>
                                <td>商户名称：</td>
                                <td>{{detailsWhite.create_company_name||'--'}}【信用等级：{{detailsWhite.merchantLevel||'--'}}】</td>
                            </tr>
                            <tr>
                                <td>制卡结果：</td>
                                <td>{{translateData(13,detailsWhite.status)}}</td>
                                <td>渠道ID：</td>
                                <td>{{detailsWhite.create_dealer_id||'--'}}<a class="f-c-blue" @click="getDetails(4,detailsWhite.create_dealer_id)">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>识别仪名称：</td>
                                <td>{{detailsWhite.device_id}}</td>                                    
                                <td>终端类型：</td>
                                <td>
                                    <span v-if="detailsWhite.terminal_type==1">IOS</span>
                                    <span v-if="detailsWhite.terminal_type==2">Android</span>
                                    <span v-if="detailsWhite.terminal_type==0">未知设备</span>
                                    ,版本号：
                                    {{detailsWhite.user_token_info.appVersion}}
                                </td>
                            </tr>
                            <tr>
                                <td>MAC地址：</td>
                                <td>{{detailsWhite.mac||'--'}}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </table>
                <!-- 成卡 -->
                <div v-if="cardType==1">
                    <p class="emptyDetailsTitle"><span></span> 成卡信息 </p>
                    <table class="merchant-total g-list-table table-numberDetails">
                        <table class="g-in-table col-l chengCardInfo">
                            <tbody>
                                <tr>
                                    <td>制卡号码：</td> 
                                    <td>{{detailsEmpty.phone_number||'--'}}（{{detailsEmpty.home}}）</td>
                                    <td>预存补差价：</td>
                                    <td>{{translateData('money',(detailsEmpty.prestore_money-detailsEmpty.old_prestore_money))}}</td>
                                </tr>
                                <tr>
                                    <td>码号类型：</td>  
                                    <td> {{translateData(10,detailsEmpty.monopoly_type)}} </td>
                                    <td>账户抵扣：</td>
                                    <td>{{translateData('money',detailsEmpty.deduction_money)}}</td>
                                </tr>
                                <tr>
                                    <td>号码等级：</td> 
                                    <td><span class="f-c-yellow">{{translateData(5,detailsEmpty.big_number_level)}}</span></td>
                                    <td>选号费：</td> 
                                    <td v-if="detailsEmpty.monopoly_type==0">{{translateData('money',detailsEmpty.card_money)}}元</td>
                                    <td v-else>--</td>
                                </tr>
                                <tr>
                                    <td>ICCID：</td>   
                                    <td>{{detailsEmpty.iccid||'--'}}</td>
                                    <td>折后选号费：</td>
                                    <td>{{translateData('money',detailsEmpty.actual_card_money)}}
                                        <span v-if="detailsEmpty.card_money_rebate/1000!=10">（{{detailsEmpty.card_money_rebate/1000}}折）</span>
                                        <span v-else></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>IMSI：</td>   
                                    <td>{{detailsEmpty.imsi||'--'}}</td>
                                    <td>支付订单：</td> 
                                    <td>{{detailsEmpty.sys_order_id_pay||'--'}}</td>
                                </tr>
                                    <tr>
                                    <td>原产品名称：</td>   
                                    <td>{{detailsEmpty.old_pkg_info||'--'}} <span class="f-c-grey">(资费：{{detailsEmpty.old_fee_voice}}，可选包：{{detailsEmpty.old_optional_pkg||'--'}})</span> </td>
                                    <td>支付方式：</td>   
                                    <td>{{translateData(12,detailsEmpty.pay_type)}}</td>
                                </tr>
                                <tr>
                                    <td>新产品名称：</td>
                                    <td>{{detailsEmpty.pkg_info||'--'}} <span class="f-c-grey">(资费：{{detailsEmpty.fee_voice}}，可选包：{{detailsEmpty.optional_package||'--'}})</span> </td>
                                    <td>实付金额：</td>   
                                    <td v-if="detailsEmpty.monopoly_type==0">{{translateData('money',detailsEmpty.actual_money)||'--'}}元({{`差价${translateData('money',(detailsEmpty.prestore_money-detailsEmpty.old_prestore_money))}元-抵扣${translateData('money',detailsEmpty.deduction_money)}元+选号费${translateData('money',detailsEmpty.card_money)}元`}})</td>
                                    <td v-else>{{translateData('money',detailsEmpty.actual_money)||'--'}}元({{`差价${translateData('money',(detailsEmpty.prestore_money-detailsEmpty.old_prestore_money))}元-抵扣${translateData('money',detailsEmpty.deduction_money)}元`}})</td>
                                </tr>
                                <tr>
                                    <td>原预存：</td>   
                                    <td>{{translateData('money',detailsEmpty.old_prestore_money)}}元</td>
                                    <td>制卡返佣：</td>   
                                    <td v-if="detailsEmpty.monopoly_type==0">{{translateData('money',detailsEmpty.open_income)}}元({{`预存返佣${translateData('money',detailsEmpty.pre_income)}元+选号费返佣${translateData('money',detailsEmpty.sel_income)}元+商户自调价格返佣${translateData('money',detailsEmpty.occupy_price_income)}`}})</td>
                                    <td v-else>{{translateData('money',detailsEmpty.open_income)}}元({{`预存返佣${translateData('money',detailsEmpty.pre_income)}元+商户自调价格返佣${translateData('money',detailsEmpty.occupy_price_income)}`}})</td>
                                </tr>
                                <tr>
                                    <td>新预存：</td>   
                                    <td>{{translateData('money',detailsEmpty.prestore_money)||'--'}}元</td>
                                    <td>短信验证：</td>
                                    <td>
                                        <p v-if="detailsEmpty.safe_type==1&&off.changePhone==false">是（{{detailsEmpty.safe_phone||'--'}}）</p>
                                        <p v-if="detailsEmpty.safe_type==1&&off.changePhone==true" class="m-changePhone">是<input ref="changePhone1" v-focus maxlength="11" type="text" v-model="detailsEmpty.safe_phone"><span @click="fcloseChange"></span><button @click="fchangePhone('2')">确定</button></p>
                                        <p v-if="detailsEmpty.safe_type==0">否</p>
                                        <!-- <p v-if="detailsEmpty.safe_type!=1&&detailsEmpty.safe_type!=2">--</p> -->
                                    </td>
                                </tr>
                                <tr>
                                    <td>制卡方式：</td>   
                                    <td>{{translateData(19,detailsEmpty.app_type)}}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </table>
                </div>
                <!-- 白卡 -->
                <div v-if="cardType==2">
                    <p class="emptyDetailsTitle"><span></span> 白卡信息 </p>
                    <table class="merchant-total g-list-table table-numberDetails">
                        <table class="g-in-table col-l whiteCard">
                            <tbody>
                                <tr>
                                    <td>所属号段：</td>
                                    <td>
                                        <span v-if="detailsWhite.monopoly_type==0">{{detailsWhite.phone_title||'--'}}****</span>    
                                        <span v-if="detailsWhite.monopoly_type==1">{{detailsWhite.phone_title||'--'}}****</span>    
                                        <span v-if="detailsWhite.monopoly_type==2">{{detailsWhite.phone_title||'--'}}***</span>    
                                    </td>                                   
                                </tr>
                                <tr>
                                    <td>码号类型：</td>
                                    <td>{{translateData(10,detailsWhite.monopoly_type)}}</td>
                                </tr>
                                <tr>
                                    <td>ICCID：</td>
                                    <td>{{detailsWhite.iccid||'--'}}</td>
                                </tr>
                                <tr>
                                    <td>IMSI：</td>
                                    <td>{{detailsWhite.imsi||'--'}}</td>
                                </tr>
                                <tr>
                                    <td>支付订单：</td>
                                    <td>{{detailsWhite.sys_order_id_pay||'--'}}</td>
                                </tr>
                                <tr>
                                    <td>保证金：</td>
                                    <td>{{translateData('money',detailsWhite.pay_money)}}元</td>
                                </tr>
                                <tr>
                                    <td>支付方式：</td>
                                    <td>{{translateData(12,detailsWhite.pay_type)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </table>
                </div>
            </div>
        </div>
        <detailsView v-if="isShowDetails" :type="typeDetails" :list="detailsList" :dealerId="searchDealerId"></detailsView>
    </section>
</template>
<script>
import "../assets/km/css/cardOrderDetails.css";
import { getDateTime, errorDeal,translateData } from "../../src/config/utils.js"
import { requestGetExclusiveNumerList,reqCommonMethod } from "../config/service.js";
import detailsView from '../componentskm/cardOrderDetailsAlert';
export default{
    name:"merchantDetails",
    props:{
        detailsEmpty:Object,
        detailsWhite:Object,
        cardType:String,
    },
    data (){
        return {
            isShowDetails:0,
			typeDetails:0,
            detailsList:'',
            searchDealerId:'',
            off:{
                changePhone:false
            }
        }
    },
    components:{
        detailsView
    },
    methods:{
       close(){
           let vm=this.$parent;
           vm.off.cardDetails=false;
       },
       searchMore(v){
           let vm=this.$parent;
           if(v===1){
               vm.getWhiteList(vm.searchWhiteRequsetData)
           }else if(v===2){
               vm.getEmptyList(vm.searchEmptyReauestData)
           }
       },
        getDetails(v,i){
            let vm=this;
            if(v==1){
               vm.searchDealerId=i;
                reqCommonMethod({"userId":i},false,"km-ecs/w/audit/getUserInfo")
                .then((data)=>{
                    vm.detailsList=data.data;
                    vm.isShowDetails=true;
                    vm.typeDetails=1;
                }).catch(error=>errorDeal(error));
            }else if(v==2){
            let vm=this;
            reqCommonMethod({"opKey":"makecard.order.time","params":['sys_order_id="'+i+'"'],"pageSize":"10","pageNum":"-1"},false,"km-ecs/w/handler/query")
            .then((data)=>{
				var list_item= data.data.list[0],str='',str2='';
				if(list_item){
					if(list_item.card_type==1){
						str+=`<li class="clr"><div class="fl">实时审核时间：</div><div class="fright">${vm.getDateTime(list_item.time_real_audited)[6]}</div></li>`;
						str2+=`<li class="clr"><div class="fl">开卡保存订单时间：</div><div class="fright">${vm.getDateTime(list_item.time_save_order)[6]}</div></li>`;
					}else if(list_item.card_type==2){
						str+=`<li class="clr"><div class="fl">开户成功时间：</div><div class="fright">${vm.getDateTime(list_item.time_serverice_open)[6]}</div></li>`;
					}
					layer.open({
						content:`<ul class="f-scroll-lt lay-details">
						<li class="clr"><div class="fl">生成时间：</div><div class="fright">${vm.getDateTime(list_item.time_create_order)[6]}</div></li>
						<li class="clr"><div class="fl">保存套餐时间：</div><div class="fright">${vm.getDateTime(list_item.time_set_business)[6]}</div></li>
						<li class="clr"><div class="fl">保存身份信息时间：</div><div class="fright">${vm.getDateTime(list_item.time_set_user_info)[6]}</div></li>
						<li class="clr"><div class="fl">支付时间：</div><div class="fright">${vm.getDateTime(list_item.time_payed)[6]}</div></li>
						<li class="clr"><div class="fl">自动审核时间：</div><div class="fright">${vm.getDateTime(list_item.time_auto_audited)[6]}</div></li>${str}
						<li class="clr"><div class="fl">受理单提交时间：</div><div class="fright">${vm.getDateTime(list_item.time_accepted)[6]}</div></li>
						<li class="clr"><div class="fl">请求IMSI时间：</div><div class="fright">${vm.getDateTime(list_item.time_imsi_request)[6]}</div></li>
						<li class="clr"><div class="fl">拿到IMSI时间：</div><div class="fright">${vm.getDateTime(list_item.time_imsi_got)[6]}</div></li>
						<li class="clr"><div class="fl">提交写卡结果时间：</div><div class="fright">${vm.getDateTime(list_item.time_write_card)[6]}</div></li>${str2}
						<li class="clr"><div class="fl">提交到BOSS时间：</div><div class="fright">${vm.getDateTime(list_item.time_submit_order)[6]}</div></li>
						<li class="clr"><div class="fl">开卡异步结果时间：</div><div class="fright">${vm.getDateTime(list_item.time_order_result)[6]}</div></li>
						<li class="clr"><div class="fl">事后审核时间：</div><div class="fright">${vm.getDateTime(list_item.time_after_audit)[6]}</div></li></ul>`,
						type:0,
						title:'开卡时间详情',
						btn:0,
						style:'width:auto;'
					});
				}else{
					layer.open({
			            content:'暂无该订单时间详情',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        })
				}
            }).catch(error=>errorDeal(error))
           }else if(v==3){
                var w=document.documentElement.clientWidth,url='';
                let latitude=parseFloat(i.latitude);
                let longitude=parseFloat(i.longitude);
                w<640 ? url='http://map.baidu.com/mobile/?latlng='+latitude+','+longitude+'' : url='http://map.baidu.com/?latlng='+latitude+','+longitude+'';
                window.open(url);
           }else if(v==4){
                vm.searchDealerId=i;
                reqCommonMethod({"dealerId":i},false,"km-ecs/w/audit/getMerchantInfo")
                .then((data)=>{
                    vm.detailsList=data.data;
                    vm.isShowDetails=true;
                    vm.typeDetails=2;
                }).catch(error=>errorDeal(error));   
           }else{
               return false;
           }
       },
        fchangePhone(v){
            let vm=this;
            if(v==1){
                vm.off.changePhone=true;
            }else if(v==2){
                let newPhone = vm.detailsEmpty.safe_phone;
            }
        },
        fcloseChange(){
            let vm=this;
            vm.detailsEmpty.safe_phone="";
            vm.$refs.changePhone1.focus();
        },
        getDateTime(v){
            return getDateTime(v)
        },translateData(v,i){
            return translateData(v,i)
        }
    },
    directives: {
        focus:{
            inserted:(el)=>{
                el.focus();
            }
        }
    }
}
</script>
<style scoped>
    .numberInfo{width:98%;background-color:#fff;padding:12px 8px;border-radius:6px}
    .numberInfo>label{margin-right: 30px;}
    p.whiteDetailsTitle, p.emptyDetailsTitle{padding: 10px;}
    p.whiteDetailsTitle>span, p.emptyDetailsTitle>span{display: inline-block;width: 10px;height: 10px;background: url('../assets/images/dian.png') no-repeat center;background-size: contain}
    .table-numberDetails{border:none}
    table.orderInfo tr td:nth-child(odd), table.chengCardInfo tr td:nth-child(odd){width:200px;text-align: right;color: #a5a5a5;}
    table.orderInfo tr td:nth-child(even), table.chengCardInfo tr td:nth-child(even){text-align: left;}
    table.whiteCard tr td:nth-child(odd){width:200px;text-align: right;color: #a5a5a5}
    table.whiteCard tr td:nth-child(even){text-align: left;}
    .m-total-table{background-color:transparent }
    .g-list-table, .g-inner-table, .g-box{height: auto;width:99%}
    .linka{color: #20A0FF;cursor: pointer;}
    .m-btn-changePhone{background: #01AA01;padding: 2px 5px;outline: none;border: 1px solid #01AA01;border-radius: 4px;color: #fff}
    .m-changePhone{position: relative;height: 25px;line-height: 25px;}
    .m-changePhone input{position: absolute;width: 200px;height: 25px;line-height: 25px;margin-left: 10px;}
    .m-changePhone span{position: absolute;left: 180px;top:6px;display: inline-block;width: 15px;height: 15px;background: url('../assets/images/close-circle.png') no-repeat;background-size: 100%;cursor: pointer;}
    .m-changePhone button{position: absolute;left: 200px;height: 25px;width: 50px;border-radius: 0 4px 4px 0;background: #ff6600;outline: none;border: 1px solid #ff6600;color: #fff;cursor: pointer;}

</style>


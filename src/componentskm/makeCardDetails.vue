<style scoped>
    .numberInfo{width:98%;background-color:#fff;padding:12px 8px;border-radius:6px}
    .numberInfo>label{margin-right: 30px;}
    p.whiteDetailsTitle, p.emptyDetailsTitle{padding: 10px;}
    p.whiteDetailsTitle>span, p.emptyDetailsTitle>span{display: inline-block;width: 10px;height: 10px;background: url('../assets/images/dian.png') no-repeat center;background-size: contain}
    .table-numberDetails{border:none}
    table.orderInfo tr td:nth-child(odd), table.chengCardInfo tr td:nth-child(odd){width:200px;text-align: right}
    table.whiteCard tr td:nth-child(odd){width:200px;text-align: right}
</style>
<template>
    <section>
        <div>
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
                            <tbody v-if="cardType==1">
                                <tr>
                                    <td>订单号码：</td>
                                    <td>{{detailsWhite.sysOrderId||'--'}}</td>
                                    <td>操 作 人：</td> 
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>创建时间：</td>
                                    <td>{{getDateTime(detailsWhite.createTime)[6]}}</td>
                                    <td>操作人IP：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>状态修改时间：</td>
                                    <td></td>
                                    <td>开卡人位置信息：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>当前状态：</td>
                                    <td></td>
                                    <td>商户名称：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>制卡结果：</td>
                                    <td></td>
                                    <td>渠道ID：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>识别仪名称：</td>
                                    <td></td>                                    
                                    <td>终端类型：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>识别模式：</td>
                                    <td></td>
                                    <td>MAC地址：</td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tbody v-if="cardType==2">
                                <tr>
                                    <td>订单号码：</td>
                                    <td>{{detailsEmpty.orderId||'--'}}</td>
                                    <td>操 作 人：</td> 
                                    <td>{{detailsEmpty.operatorName||'--'}}({{detailsEmpty.operatorId||'--'}})</td>
                                </tr>
                                <tr>
                                    <td>创建时间：</td>
                                    <td>{{getDateTime(detailsEmpty.createTime)[6]}}</td>
                                    <td>操作人IP：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>状态修改时间：</td>
                                    <td></td>
                                    <td>开卡人位置信息：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>当前状态：</td>
                                    <td>{{detailsEmpty.status||'--'}}
                                        <span v-if="detailsEmpty.status==0">全部</span>
                                        <span v-if="detailsEmpty.status==1">进行中</span>
                                        <span v-if="detailsEmpty.status==2">成功</span>
                                        <span v-if="detailsEmpty.status==3">失败</span>
                                        <span v-if="detailsEmpty.status==4">已激活</span>
                                    </td>
                                    <td>商户名称：</td>
                                    <td>{{detailsEmpty.companyName||'--'}}({{detailsEmpty.dealerId||'--'}})</td>
                                </tr>
                                <tr>
                                    <td>制卡结果：</td>
                                    <td></td>
                                    <td>渠道ID：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>识别仪名称：</td>
                                    <td></td>                                    
                                    <td>终端类型：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>识别模式：</td>
                                    <td></td>
                                    <td>MAC地址：</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </table>
                    <div v-if="cardType==1">
                        <p class="emptyDetailsTitle"><span></span> 成卡信息 </p>
                        <table class="merchant-total g-list-table table-numberDetails">
                            <table class="g-in-table col-l chengCardInfo">
                                <tbody>
                                    <tr>
                                        <td>制卡号码：</td> 
                                        <td>{{detailsWhite.phoneNumber||'--'}}</td>
                                        <td>预存：</td>   
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>码号类型：</td>  
                                        <td>
                                            <span v-if="detailsWhite.monopolyType==0">普号</span>
                                            <span v-if="detailsWhite.monopolyType==1">大众专营号</span>
                                            <span v-if="detailsWhite.monopolyType==2">专属专营号</span>
                                            <span v-else>--</span>
                                        </td>
                                        <td>选号费：</td> 
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>码号规则：</td> 
                                        <td></td>
                                        <td>支付订单：</td> 
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>ICCID：</td>   
                                        <td></td>
                                        <td>支付金额：</td>   
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>IMSI：</td>   
                                        <td></td>
                                        <td>支付方式：</td>   
                                        <td></td>
                                    </tr>
                                     <tr>
                                        <td>产品名称：</td>   
                                        <td></td>
                                        <td>制卡返佣：</td>   
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </table>
                    </div>
                    <div v-if="cardType==2">
                        <p class="emptyDetailsTitle"><span></span> 白卡信息 </p>
                        <table class="merchant-total g-list-table table-numberDetails">
                            <table class="g-in-table col-l whiteCard">
                                <tbody>
                                    <tr>
                                        <td>所属号段：</td>
                                        <td>{{detailsEmpty.phoneSegment||'--'}}</td>                                   
                                    </tr>
                                    <tr>
                                        <td>码号类型：</td>
                                        <td>{{detailsEmpty.phoneType}}
                                            <span v-if="detailsEmpty.phoneType==-1">全部</span>
                                            <span v-if="detailsEmpty.phoneType==0">普号</span>
                                            <span v-if="detailsEmpty.phoneType==1">大众专营号</span>
                                            <span v-if="detailsEmpty.phoneType==2">专属专营号</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ICCID：</td>
                                        <td>{{detailsEmpty.iccid||'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>IMSI：</td>
                                        <td>{{detailsEmpty.imsi||'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>支付订单：</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>保证金：</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>支付方式：</td>
                                        <td>
                                            {{detailsEmpty.payType||'--'}}
                                            <span v-if="detailsEmpty.payType==0">全部</span>
                                            <span v-if="detailsEmpty.payType==1">资金池</span>
                                            <span v-if="detailsEmpty.payType==2">微信</span>
                                            <span v-if="detailsEmpty.payType==3">支付宝</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import "../assets/km/css/cardOrderDetails.css";
import {getDateTime, errorDeal} from "../../src/config/utils.js"
import {requestGetExclusiveNumerList} from "../config/service.js";
export default{
    name:"merchantDetails",
    props:{
        detailsEmpty:Object,
        detailsWhite:Object,
        cardType:String,
    },
    data (){
        return {
            
        }
    },
    components:{
        
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
       getDateTime(v){
           return getDateTime(v)
       }
    }
}
</script>


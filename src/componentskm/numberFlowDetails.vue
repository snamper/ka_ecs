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
                    <p class="detailsEleP"><a class="detailsEleA">{{translateData('formatPhone',numberInfo.phoneTitle)}}***</a></p>
                    <p class="numberInfo">
                        <b><label class="f-c-grey">归属地 ：</label>{{numberInfo.cityName||'--'}}</b>
                        <b><label class="f-c-grey">预存 ：</label>{{translateData('money',numberInfo.preStore)}}元</b>
                        <b><label class="f-c-grey">产品名称 ：</label>{{numberInfo.pkgName||'--'}}<span class="f-c-grey"> ( 资费：{{numberInfo.feeVoice}}，可选包：{{numberInfo.optPkgInfo}} ) </span></b>
                    </p>
                    <p class="whiteDetailsTitle"><span></span> 白卡 ( {{cardTotalWhite}} 张)</p>
                    <table class="merchant-total g-list-table table-numberDetails">
                        <table class="g-in-table col-l">
                            <tbody>
                                <tr v-for="(v,i) in listWhite" :key="i">
                                    <td v-for="(num,ind) in v" :key="ind">
                                        <p>ICCID: <a class="detailsEleA">{{num.iccid||'--'}}</a></p>
                                        <p class="f-c-grey f-s-12">IMSI:{{num.imsi}}</p>
                                    </td>
                                    <td v-if="i==listWhite.length-1" v-for="(value,index) in tdWhite"></td>
                                </tr>
                                <tr>
                                    <td v-if="cardTotalWhite>listWhitelength" colspan="5">
                                        <p><a class="detailsEleA linka" @click="searchMore(1)">展开查看更多</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td v-if="!listWhite.length" colspan="5">
                                        <p><h3>暂无数据</h3></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </table>
                    <p class="emptyDetailsTitle"><span></span> 码号 （ {{cardTotalEmpty}} 个）</p>
                    <table class="merchant-total g-list-table table-numberDetails">
                        <table class="g-in-table col-l">
                            <tbody>
                                <tr>
                                    <tr class="numList" v-for="(v,i) in listEmpty" :key="i">
                                        <td v-for="(num,ind) in v" :key="ind">
                                            <p>{{num}}</p>
                                        </td> 
                                        <td v-if="i==listEmpty.length-1" v-for="(value,index) in tdEmpty"></td>
                                    </tr>  
                                </tr>
                                <tr>
                                    <td v-if="cardTotalEmpty>listEmptylength" colspan="5" >
                                        <p><a class="detailsEleA linka" @click="searchMore(2)">展开查看更多</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td v-if="!listEmpty.length" colspan="5">
                                        <p><h3>暂无数据</h3></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import "../assets/km/css/cardOrderDetails.css";
import {getDateTime, errorDeal,translateData} from "../../src/config/utils.js"
import {requestGetExclusiveNumerList} from "../config/service.js";
export default{
    name:"numberFlowDetails",
    props:[ 'listEmpty', 'listWhite', 'orderDetails', 'cardTotalWhite', 'cardTotalEmpty', 'numberInfo', 'tdEmpty', 'tdWhite'],
    data (){
        return {
            listEmptylength:0,
            listWhitelength:0,
        }
    },
    watch:{
        listEmpty(){
            for(let i in this.listEmpty){
                this.listEmptylength=this.listEmpty[i].length*i+this.listEmpty[i].length
            }
        },
        listWhite(){
            for(let i in this.listWhite){
                this.listWhitelength=this.listWhite[i].length*i+this.listWhite[i].length
            }
        }
    },
    created:function(){
        let vm=this;
        for(let i in vm.listEmpty){
            vm.listEmptylength+=vm.listEmpty[i].length
        }
        for(let i in vm.listWhite){
            vm.listWhitelength+=vm.listWhite[i].length
        }
    },
    methods:{
        searchMore(v){
            let vm=this.$parent;
            if(v===1){
                vm.getWhiteList(vm.searchWhiteRequsetData)
            }else if(v===2){
                vm.getEmptyList(vm.searchEmptyReauestData)
            }
        },close(){
            let vm=this.$parent;
            vm.off.flowDetails=false;
            vm.whitePageNum=0;
            vm.emptyPageNum=0;
            vm.detailsDataWhite=[];//白卡详情数据
            vm.detailsDataEmpty=[]; //空卡详情数据
        },translateData(v,i){
            return translateData(v,i)
        }
    }
}
</script>
<style scoped>
    .numberInfo{width:98%;background-color:#fff;padding:12px 8px;border-radius:6px}
    .numberInfo>b{padding-right: 20px;}
    p.whiteDetailsTitle, p.emptyDetailsTitle{padding: 10px;}
    p.whiteDetailsTitle>span, p.emptyDetailsTitle>span{display: inline-block;width: 10px;height: 10px;background: url('../assets/images/dian.png') no-repeat center;background-size: contain}
    .table-numberDetails{border:none}
    p.detailsEleP{margin-bottom: 10px;}
    a.detailsEleA{text-decoration: underline;color: #20A0FF;}
    a.linka{cursor: pointer;}
    .g-list-box, #details, .g-list-table, .g-inner-table, .g-box{width: 100%; height: auto;}
    .m-total-table{background: transparent}
</style>


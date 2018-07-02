<style scoped>
    .numberInfo{width:98%;background-color:#fff;padding:12px 8px;border-radius:6px}
    .numberInfo>label{margin-right: 30px;}
    p.whiteDetailsTitle, p.emptyDetailsTitle{padding: 10px;}
    p.whiteDetailsTitle>span, p.emptyDetailsTitle>span{display: inline-block;width: 10px;height: 10px;background: url('../assets/images/dian.png') no-repeat center;background-size: contain}
    .table-numberDetails{border:none}
    p.detailsEleA{margin-bottom: 10px;}
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
                    <p class="detailsEleA"><a>1568476****</a></p>
                    <p class="numberInfo"> <label>归属地：{{'--'}}</label><label>预存：{{'--'}}</label><label>产品名称：{{'--'}}</label></p>
                    <p class="whiteDetailsTitle"><span></span> 白卡 </p>
                    <table class="merchant-total g-list-table table-numberDetails">
                        <table class="g-in-table col-l">
                            <tbody>
                                <tr v-for="(v,i) in listWhite" :key="i">
                                    <td v-for="(num,ind) in v" :key="ind">
                                        <p>ICCID:{{num.iccid}}</p>
                                        <p>IMSI:{{num.imsi}}</p>
                                    </td>   
                                    <td v-if="kongA" v-for="(v,i) in kongA"></td>
                                </tr>
                                <tr>
                                    <td v-if="kongA.length" colspan="7">
                                        <p>
                                            <a @click="searchMore(1)">展开查看更多</a>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td v-if="!listWhite.length" colspan="7">
                                        <p>
                                           <h3>暂无数据</h3>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </table>
                    <p class="emptyDetailsTitle"><span></span> 码号 </p>
                    <table class="merchant-total g-list-table table-numberDetails">
                        <table class="g-in-table col-l">
                            <tbody>
                                <tr>
                                    <tr v-for="(v,i) in listEmpty" :key="i">
                                        <td v-for="(num,ind) in v" :key="ind">
                                            <p>{{num}}</p>
                                        </td> 
                                        <td v-if="kongAE" v-for="(v,i) in kongAE"></td>  
                                    </tr>  
                                </tr>
                                <tr>
                                    <td v-if="kongAE.length" colspan="7" >
                                        <p>
                                            <a @click="searchMore(2)">展开查看更多</a>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td v-if="!listEmpty.length" colspan="7">
                                        <p>
                                            <h3>暂无数据</h3>
                                        </p>
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
import {getDateTime, errorDeal} from "../../src/config/utils.js"
import {requestGetExclusiveNumerList} from "../config/service.js";
export default{
    name:"numberFlowDetails",
    props:{
        listEmpty:Array,
        listWhite:Array,
        kongA:Array,
        kongAE:Array
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
            vm.off.flowDetails=false;
            vm.whitePageNum=0;
            vm.emptyPageNum=0;
        },
        searchMore(v){
            let vm=this.$parent;
            if(v===1){
                vm.getWhiteList(vm.searchWhiteRequsetData)
            }else if(v===2){
                vm.getEmptyList(vm.searchEmptyReauestData)
            }
        }
    }
}
</script>


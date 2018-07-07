<!--**
  *@info 专营号详情
* *-->
<style scoped>
  #details{padding: 0}
  .g-box{height: auto}
  .m-total-table{background: none}
  .title{padding: 10px 10px;}
  td.styleTd{text-align: center;font-size: 14px;}
  td.styleTd p{width: 80%}
  td.styleTd p.line{text-decoration:underline;color:rgb(44, 118, 230);cursor: pointer;}
  .lay-details>li>.fr{width:1rem;}
  .f-c-orange{color: #FCC353}
</style>
<template>
    <section>
        <div  class="m-total-table g-list-box">
            <header class="g-lis-head">
                <a  class="m-details-back u-icon-back" style="width:20px;height:20px;" @click="close()"></a>
            </header>
            <div class="g-box" >
                <div class="numberDetails ">
                    <h3 class="title">专营号码（{{exclesiveLength}}）</h3>
                    <div class="m-total-table">
                        <table>
                            <tbody>
                                <tr v-for="(v,i) of numbersList" :key="i">
                                    <td class="styleTd" v-for="(value,index) of v" :key="index">
                                        <p class="line" @click="getNumberDetails(value.number)">{{value.number}}</p>
                                        <p><span>{{value.city}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="f-c-orange">{{value.prestoreMoney/100}}元卡</span></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
                    </div>
                </div>
            </div>
        </div>
         <numberDetailsAlert v-if="off.numberDetailsAlert" :details="numberDetails"></numberDetailsAlert>   
    </section>
</template>
<script>
import numberDetailsAlert from "./numberDetailsAlert";
import { errorDeal } from '../config/utils';
import { requestGetExclusiveNumerDetails } from "../config/service.js"
export default{
    name:"exclusiveNumber",
    props:{numbersList:Array,exclesiveLength:String},
	data(){
		return{
            numberDetails:'',
            off:{
                numberDetailsAlert:false
            }
        }
	},
	components:{
        numberDetailsAlert
	},
	created:function(){

	},
	methods:{
        close(){
            let vm=this;
            vm.$parent.off.detailsExclusiveNumber=false;
        },
        getNumberDetails(v){
            let vm=this,data={number:v};
            requestGetExclusiveNumerDetails(data)
            .then((data)=>{
                vm.off.numberDetailsAlert=true                                
                vm.numberDetails=data.data;
            }).catch(e=>errorDeal(e))
        }
    }
}
</script>
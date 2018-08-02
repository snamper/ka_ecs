<template>
    <section class="g-list-box" id="details">
        <div  class="m-total-table" >
            <header class="g-lis-head">
                <a  class="m-details-back u-icon-back" style="width:20px;height:20px;" @click="close"></a>
            </header>
            <div class="g-box">
                <p class="m-detail-title">证件号码</p>
                <table>
                    <tr>
                        <td>采集时间</td>
                        <td>姓名</td>
                        <td>采集方式</td>
                        <td>可信度</td>
                        <td>校验方式</td>
                        <td>采集结果</td>
                        <td>采集源</td>
                        <td>业务类型</td>
                        <td>订单号码</td>
                    </tr>
                    <tr >

                    </tr>
                </table>
            </div>
        </div>
    </section>
</template>
<script>
import "../../../assets/km/css/cardOrderDetails.css";
export default{
    props:[],
    data (){
        return {
   
        }
    },

    created:function(){

    },
    methods:{
       close(){
           let vm=this.$parent;
           vm.off.details=false;
       },getDateTime(v){
           return getDateTime(v)
       },translateData(v,i){
           return translateData(v,i)
       }
    }
}
</script>
<style scoped>
    .m-total-table{background: transparent}
    .g-box tr td{padding: 10px 0px} 
    .g-box tr:nth-child(1){background: #EEF1F8}
    .m-detail-title{height: 40px;line-height: 20px;background: #fff;padding: 10px}
</style>


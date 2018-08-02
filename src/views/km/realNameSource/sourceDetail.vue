
<template>
    <section class="g-list-box">
        <!--采集详情-->
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
                        <tbody>
                           
                        </tbody>
                    </table>
                </table>
            </div>
        </div>
    </section>
</template>
<script>
export default{
    props:[],
    data (){
        return {
            
        }
    },
    components:{
       
    },methods:{
        getDateTime(v){
            return getDateTime(v)
        },translateData(v,i){
            return translateData(v,i)
        },close(){
            let vm=this.$parent;
                vm.off.details=false;
        }
    }
}
</script>
<style scoped>
    
</style>

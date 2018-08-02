<!--**
  *@info 实名资源库
**-->
<template>
    <section class="g-search-menu">
        <div  id="search" :class="{active:off.details}">
            <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
            <!--查询-->
            <section>
                <div class="g-search-form">
                    <div class="m-tag"><b></b>精确查询</div>
                    <!--订单号码查询-->
                    <section class="form-c">
                        <div class="row clr m-col-2">
                            <span class="dp col-l">证件号码：</span>
                            <div class="col-r m-input-button"><input v-model="idCard" maxlength="18" type="tel" placeholder="请输入查询的证件号码"><button @click="searchList(1)">查询</button></div>
                        </div>
                    </section>
                </div>
                <p class="m-search-title" v-if="searchList" >查询结果</p>
                <div class="m-total-table" v-if="searchList">
                    <p class="m-tab-head">证件号码 : </p>
                    <table>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>采集时间</td>
                                <td>采集方式</td>
                                <td>可信度</td>
                                <td>校验方式</td>
                                <td>采集源</td>
                                <td>业务类型</td>
                                <td>订单号码</td>
                                <td>采集历史</td>
                            </tr>
                            <tr>
                                <td>姓名</td>
                                <td>itemName</td>
                                <td>collectTime</td>
                                <td>collectMode</td>
                                <td>reliability</td>
                                <td>checkMode</td>
                                <td>collectSource</td>
                                <td>businessType</td>
                                <td>orderId</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>地址</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>有效期</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>签发机关</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>正面照片</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>背面照片</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>手持证件照片</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>大头照</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>活体识别</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>签名照片</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </section>
</template>
<script>
import "../../../assets/km/css/search.css";
import { getRealNameSource } from "../../../config/service.js";
import pagination from "../../../componentskm/page.vue";
import { errorDeal,getDateTime ,translateData} from "../../../config/utils";
export default {
    data() {
        return {
            idCard:"",
            searchList:"true",
            form:{
                startTime:"",
                endTime:""
            },
            off:{
                details:false,
                isLoad:false
            }   
        };
    },
    components: {
        "my-page": pagination,
    },
    created: function() {
        this.init();
    },
    methods: {
        init: function() {
            var vm = this;
            vm.form.startTime = laydate.now(0, "YYYY-MM-DD 00:00:00");
            vm.form.endTime = laydate.now(0, "YYYY-MM-DD 23:59:59");
        },searchList(){
            let vm=this,
                json={idCardNo:vm.idCard};
            getRealNameSource(json,()=>{vm.off.isLoad=false})
            .then((data)=>{

            });
        },getDateTime(v){
            return getDateTime(v)
        },translateData(v,i){
            return translateData(v,i)
        }
    }
};
</script>
<style scoped>
.detailsEleA{text-decoration: underline;color: #20A0FF;cursor: pointer;}
.m-tab-head{height: 40px;line-height: 40px;padding-left: 20px}
.m-search-title{height: 30px;line-height: 30px;padding-left: 10px;}
.m-total-table table, .g-base-table{border-top: none}
.m-total-table tr:nth-child(1){background: #EEF1F8}
.m-total-table tr td:nth-child(1){background: #EEF1F8}

</style>


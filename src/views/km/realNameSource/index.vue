<!--**
  *@info 实名资源库
**-->
<template>
    <section class="g-search-menu">
        <div v-if="!off.details" id="search" :class="{active:off.details}">
            <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
            <section class="m-occlusion" :class="{active:off.isLoad}"></section>
            <section>
                <div class="g-search-form">
                    <div class="m-tag"><b></b>精确查询</div>
                    <section class="form-c">
                        <div class="row clr m-col-2">
                            <span class="dp col-l">证件号码：</span>
                            <div class="col-r m-input-button"><input v-model="idCard" maxlength="18" type="tel" placeholder="请输入查询的证件号码"><button @click="search()">查询</button></div>
                        </div>
                    </section>
                </div>
                <p class="m-search-title" v-if="searchList" >查询结果</p>
                <div class="m-total-table" v-if="searchList">
                    <p class="m-tab-head">证件号码 : </p>
                    <table>
                        <tbody >
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
                                <td>{{searchList[0].itemValue}}</td>
                                <td>{{searchList[0].collectTime}}</td>
                                <td>{{searchList[0].collectMode}}</td>
                                <td>{{searchList[0].reliability}}</td>
                                <td>{{searchList[0].checkMode}}</td>
                                <td>{{searchList[0].collectSource}}</td>
                                <td>{{searchList[0].businessType}}</td>
                                <td>{{searchList[0].orderId}}</td>
                                <td><a class="detailsA" @click="details">查看详情</a></td>
                            </tr>
                            <!-- <tr>
                                <td>地址</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td><a class="detailsA" @click="details">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>有效期</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td><a class="detailsA" @click="details">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>签发机关</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td><a class="detailsA" @click="details">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>正面照片</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td><a class="detailsA" @click="details">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>背面照片</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td><a class="detailsA" @click="details">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>手持证件照片</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td><a class="detailsA" @click="details">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>大头照</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td><a class="detailsA" @click="details">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>活体识别</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td><a class="detailsA" @click="details">查看详情</a></td>
                            </tr>
                            <tr>
                                <td>签名照片</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td>{{searchList}}</td>
                                <td><a class="detailsA" @click="details">查看详情</a></td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
        <detail v-if="off.details" :details="searchDetails"></detail>
    </section>
</template>
<script>
import "../../../assets/km/css/search.css";
import { getRealNameSource,getRealNameSourceDetail } from "../../../config/service.js";
import { errorDeal,getDateTime ,translateData} from "../../../config/utils";
import pagination from "../../../componentskm/page.vue";
import sourceDetail from './sourceDetail';
export default {
    data() {
        return {
            idCard:"",
            searchList:"true",
            searchDetails:"",
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
        "detail":sourceDetail
    },
    created: function() {
        this.init();
    },
    methods: {
        search(){
            let vm=this,
                // json={idCardNo:vm.idCard};
                json={"idCardNo":"51132519900515112X"};
            getRealNameSource(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.searchList=data.data.list;
            });
        },details(){
            let vm=this,
                // json={
                //     "idCardNo": vm.idCard,
                //     " markType": "",
                //     " pageNum": "1",
                //     " pageSize": "20"}
                json={"idCardNo":"51132519900515112X","markType":"1","pageNum":"1","pageSize":"10"}
                vm.off.details=true;
            getRealNameSourceDetail(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.off.details=true;
                vm.searchDetails=data.data.list;
            }).catch(e=>errorDeal(e))
        },init: function() {
            var vm = this;
            vm.form.startTime = laydate.now(0, "YYYY-MM-DD 00:00:00");
            vm.form.endTime = laydate.now(0, "YYYY-MM-DD 23:59:59");
        },getDateTime(v){
            return getDateTime(v)
        },translateData(v,i){
            return translateData(v,i)
        }
    }
};
</script>
<style scoped>
    .detailsA{text-decoration: underline;color: #20A0FF;cursor: pointer;}
    .m-tab-head{height: 40px;line-height: 40px;padding-left: 20px}
    .m-search-title{height: 30px;line-height: 30px;padding-left: 10px;}
    .m-total-table table, .g-base-table{border-top: none}
    .m-total-table tr:nth-child(1){background: #EEF1F8}
    .m-total-table tr td:nth-child(1){background: #EEF1F8}
</style>


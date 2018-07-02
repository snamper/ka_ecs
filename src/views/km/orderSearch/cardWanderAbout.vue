<!--**
  *@info 号码流转查询模块
**-->
<style scoped>
.form-c.o-no-bgc>.row .text{
    width: auto
}
.m-form-radio>label{
    margin-right: 0;
}
.detailsEleA{
    text-decoration: underline
}
</style>

<template>
    <section class="g-search-menu">
        <div  id="search" :class="{active:off.details}">
            <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
            <!--查询-->
            <section v-if="!off.flowDetails">
                <div class="g-search-form">
                    <div class="m-tag">
                        <b></b>精确查询</div>
                    <!--订单号码查询-->
                    <section class="form-c">
                        <div class="row clr m-col-2">
                            <span class="dp col-l">订单号码：</span>
                            <div class="col-r m-input-button"><input v-model="orderId" maxlength="32" type="tel" placeholder="请输入查询的订单号码"><button @click="searchList(1)">查询</button>
                            </div>
                        </div>
                    </section>
                    <div class="m-tag">
                        <b></b>条件查询</div>
                    <section class="form-c">
                        <div class="row clr m-col-2">
                            <div class="dp col-l">时间区间：</div>
                            <div class="col-r">
                                <span class="m-time-area"><input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
                            </div>
                        </div>
                        <div class="row  m-col-2">
                            <span class="dp col-l">商 户 I D ：</span>
                            <div class="col-r">
                                <div class="input-box"><input v-model="dealerId" maxlength="16" type="tel" placeholder="请输入查询的商户ID"></div>
                            </div>
                        </div>
                    </section>
                    <section class="form-c o-no-bgc">
                        <!--卡号-->
                        <div class="row" :class="{active:form.select==1}">
                            <span class="m-form-radio">
                                <label>
                                    <span class="radio"><input type="radio" value="1" @click="isChe" v-model="form.select">
                                        <span></span>
                                    </span>
                                    <span class="text">号码：</span>
                                </label>
                            </span>
                            <div class="input-box"><input v-model="cardNumber" :readonly="form.select!=1" maxlength="25" type="tel" placeholder="请输入查询的卡号"></div>
                        </div>
                        <div class="row" :class="{active:form.select==2}">
                            <span class="m-form-radio">
                                <label>
                                    <span class="radio"><input type="radio" value="2" @click="isChe" v-model="form.select">
                                        <span></span>
                                    </span>
                                    <span class="text">设备号：</span>
                                </label>
                            </span>
                            <div class="input-box"><input v-model="deviceId" :readonly="form.select!=2" maxlength="11" type="tel" placeholder="请输入查询的设备号码"></div>
                        </div>
                        <div class="row pdl">
                            <span class="dp">流转结果：</span>
                            <div class="m-form-checkbox">
                                <label><span class="checkbox"><input type="checkbox" value="true" v-model="checkAll" checked="checked" @change="BtnCheckAll"><span></span></span><span class="text">全部</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="2" v-model="flowResult" checked="checked"><span></span></span><span class="text">成功</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="3" v-model="flowResult" checked="checked"><span></span></span><span class="text">失败</span></label>
                                <label><span class="checkbox"><input type="checkbox" value="1" v-model="flowResult" checked="checked"><span></span></span><span class="text">进行中</span></label>
                            </div>
                        </div>
                        <button class="f-btn f-btn-line" @click="searchList(2)">查询</button>
                    </section>
                </div>
                <div class="m-total-table" v-if="searchFlowList">
                    <div class="total-head">
                        统计结果
                        <b>{{total}}</b>
                        <button class="btn_export_excel" v-if="searchFlowList.length!=0" :disabled="searchFlowList.length==0" @click="exportList">导出excel</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>订单号</th>
                                <th>创建时间</th>
                                <th>转出商户名称</th>
                                <th>转入商户名称</th>
                                <th>专营号段</th>
                                <th>设备号</th>
                                <th>流转结果</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!--查询结果表格-->
                            <tr v-for="(todo,index) in searchFlowList">
                                <td>{{((pageNow-1)*10+(index+1))}}</td>
                                <td>{{todo.sysOrderId||'--'}}</td>
                                <td>{{getDateTime(todo.createTime)[6]}}</td>
                                <td>{{todo.oldDealerId||'--'}}<br>{{todo.oldCompanyName||'--'}}</td>
                                <td>{{todo.newDealerId||'--'}}<br>{{todo.newCompanyName||'--'}}</td>
                                <td><a @click="numberFlowDetails(todo)" class="detailsEleA">{{todo.phoneTitle||'--'}}</a></td>
                                <td>{{todo.useDeviceId||'--'}}</td>
                                <td>
                                    <span v-if="todo.status==2">成功</span>
                                    <span class="f-c-red" v-if="todo.status==3">失败</span>
                                    <span class="f-c-green" v-if="todo.status==1">进行中</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <my-page :page="pageNow" :maxpage="maxpage" :callback="callback"></my-page>
                </div>
            </section>
            <numberFlowDetails v-if="off.flowDetails" :kongA="kongArr" :kongAE="kongArr2" :listEmpty="detailsDataEmpty" :listWhite="detailsDataWhite" :orderDetails="orderDetails"></numberFlowDetails>
        </div>
        <!--详情页面-->
    </section>
</template>
<script>
import { requestGetExclusiveNumerFlowList,requestGetExclusiveNumerFlowDetails1,requestGetExclusiveNumerFlowDetails2 } from "../../../config/service.js";
import pagination from "../../../componentskm/page.vue";
import numberFlowDetails from "../../../componentskm/numberFlowDetails";
import { createDownload, errorDeal,getDateTime } from "../../../config/utils";
export default {
  data() {
    return {
      off: {
        type: 1, //1，待审核;2，已审核;3，进行中;4，已关闭
        isLoad: 0, //加载条
        flowDetails: false, //详情页面开关
        number: "" //第几条详情
      },
      form: {
        startTime: "",
        endTime: "",
        select: "" //条件查询，默认选择的条件
      },
        orderId: "", //订单号码
        dealerId:"",//商户ID
        cardNumber:"", //卡号
        deviceId: "", //设备号
        flowResult:[1,2,3],//流转结果
        checkAll:true,
        searchFlowList: "", //查询数据
        detailsDataWhite: [], //白卡详情数据
        detailsDataEmpty: [], //空卡详情数据
        searchWhiteRequsetData:{},
        searchEmptyReauestData:{},
        whitePageNum:0,
        emptyPageNum:0,
        total: 0, //总查询条数
        pageNow: 1, //当前页数
        pageSize: 10, //显示条数
        maxpage: 1, //最大页数
        callback: Function ,//page组件点击回调
        kongArr:[],
        kongArr2:[],
        orderDetails:{},
    };
  },
  components: {
    "my-page": pagination,
    numberFlowDetails
  },
  created: function() {
    this.init();
  },
  watch:{
      flowResult(){
          if(this.flowResult.length==3){
              this.checkAll=true;
          }else{
              this.checkAll=false;
          }
      }
  },
  methods: {
    init: function() {
        var vm = this,
        type = this.$route.params.type;
        vm.form.startTime = laydate.now(0, "YYYY-MM-DD 00:00:00");
        vm.form.endTime = laydate.now(0, "YYYY-MM-DD 23:59:59");
    },
    searchList(v,i){
        let vm=this,
        json={
            "pageSize": "10",
            "pageNow": i||1,
            "startTime": new Date(vm.form.startTime).getTime(),
            "endTime": new Date(vm.form.endTime).getTime(),
            "orderId": vm.orderId,
            "dealerId": vm.dealerId,
            "status": vm.flowResult.join(","),//0全部 1进行中2成功3失败
            "searchType": vm.form.select||0,//搜索分类0:无，1:8位号码段，2设备号
        };
        if(vm.deviceId==1){
            json.context=vm.cardNumber
        }else{
            json.context=vm.deviceId
        }
        if(v==1){//订单查询
            requestGetExclusiveNumerFlowList(json,()=>{vm.off.isLoad=false;})
            .then((data)=>{
                vm.total=data.data.total
                vm.searchFlowList=data.data.datas;
                vm.maxpage=vm.total/vm.pageSize;
                vm.pageNow=i||1;
                vm.callback=(i)=>{vm.searchList(v,i)};
            }).catch((e=>errorDeal(e)))
        }else if(v==2){//条件查询
            json.orderId="";
            requestGetExclusiveNumerFlowList(json,()=>{vm.off.isLoad=false;})
            .then((data)=>{
                vm.total=data.data.total
                vm.searchFlowList=data.data.datas;
                vm.maxpage=vm.total/vm.pageSize;
                vm.pageNow=i||1;
                vm.callback=(i)=>{vm.searchList(v,i)};
            }).catch((e=>errorDeal(e)))
        }
    },
    numberFlowDetails(v){//专营号号段的详情
        let vm=this;vm.searchWhiteRequsetData={
            "pageSize": "10",
            "orderId": v.orderId
        };
        vm.searchEmptyReauestData={
            "pageSize": "10",
            "orderId": v.orderId
        }
        vm.orderDetails=v;
        vm.off.flowDetails=true;
        let d1 = new Promise((resolve,reject)=>{
            vm.getWhiteList(vm.searchWhiteRequsetData);
            resolve("success!!!!");
        }) 
        let d2 = new Promise((resolve,reject)=>{
            vm.getEmptyList(vm.searchEmptyReauestData);
            resolve("success!!!!");
        }) 
        Promise.all([d1,d2])
        .then(()=>{

        }).catch(e=>errorDeal(e))        
    },
    getWhiteList(v,fun){
        let vm=this;
        v.pageNow=++vm.whitePageNum
        requestGetExclusiveNumerFlowDetails1(v)
        .then((data)=>{
            let num=data.data.datas;
            vm.detailsDataWhite=[];
            for(let i =0 ,len=num.length;i<len;i+=7){
                vm.detailsDataWhite.push(num.slice(i,i+7))
                
            }
            let len=num.length;
            let kongTbW=7-len%7;
            if(kongTbW!=7){
                vm.kongArr.length=kongTbW
            }
            return "success";                  
        })
    },
    getEmptyList(v,fun){
        let vm=this;
        v.pageNow=++vm.emptyPageNum
        requestGetExclusiveNumerFlowDetails2(v)
        .then((data)=>{
            let num=data.data.datas; 
            vm.detailsDataEmpty=[];
            for(let i =0 ,len=num.length;i<len;i+=7){
                vm.detailsDataEmpty.push(num.slice(i,i+7))
            }   
            let len=num.length;
            let kongTbE=7-len%7;
            if(kongTbE!=7){
                vm.kongArr2.length=kongTbE
            }
            return "success";     
        })
    },
    exportList(){

    },
    //按钮
    isChe: function() {
      this.form.select = "";
    },
    BtnCheckAll(){
        if(this.checkAll==true){
            this.flowResult=[1,2,3]
        }else if(this.checkAll==false){
            this.flowResult=[]
        }
    },
    to_laydate: function(v) {
      var vm = this;
      laydate({
        istime: true,
        format: "YYYY-MM-DD hh:mm:ss",
        isclear: false,
        choose: function(dates) {
          //选择好日期的回调
          v == 1 ? (vm.form.startTime = dates) : (vm.form.endTime = dates);
        }
      });
    },
    getDateTime(v){
        return getDateTime(v)
    }
  }
};
</script>


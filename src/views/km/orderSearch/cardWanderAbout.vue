<!--**
  *@info 号码流转查询模块
**-->
<style scoped>
    .form-c.o-no-bgc>.row .text{width: auto}
    .m-form-radio>label{margin-right: 0;}
    a.detailsEleA{text-decoration: underline;color: #20A0FF;cursor: pointer;}
    div.input-box{width: 70%;}
    span.m-form-radio{width: 75px;}
</style>
<template>
    <section class="g-search-menu">
        <div  id="search" :class="{active:off.details}">
            <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
            <section class="m-occlusion" :class="{active:off.isLoad}"></section>
            <!--查询-->
            <section v-if="!off.flowDetails">
                <div class="g-search-form">
                    <div class="m-tag">
                    <b></b>订单查询</div>
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
                    <section class="form-c o-no-bgc">
                        <div class="row clr m-col-2">
                            <span class="m-form-radio">时间区间：</span>
                            <div class="input-box">
                                <span class="m-time-area"><input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
                            </div>
                        </div>
                        <div class="row" :class="{active:form.select==1}">
                            <span class="m-form-radio">
                                <label>
                                    <span class="radio"><input type="radio" value="1" @click="isChe" v-model="form.select">
                                        <span></span>
                                    </span>
                                    <span class="text">号段：</span>
                                </label>
                            </span>
                            <div class="input-box"><input v-model="cardNumber" :readonly="form.select!=1" maxlength="8" type="tel" placeholder="请输入查询的号段"></div>
                        </div>
                        <div class="row  m-col-2">
                            <span class="m-form-radio">商 户 I D ：</span>                            
                            <div class="input-box"><input v-model="dealerId" maxlength="16" type="tel" placeholder="请输入查询的商户ID"></div>
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
                            <div class="input-box"><input v-model="deviceId" :readonly="form.select!=2" maxlength="14" type="tel" placeholder="请输入查询的设备号码"></div>
                        </div>
                        <div class="row">
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
                        <button class="btn_export_excel" v-if="searchFlowList" :disabled="searchFlowList.length==0" @click="exportList">导出excel</button>
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
                                <td><a  @click="numberFlowDetails(todo)" :class="todo.status==2?'detailsEleA':'--'">{{translateData('formatPhone',todo.phoneTitle)}}***</a></td>
                                <td>{{todo.useDeviceId||'--'}}</td>
                                <td>
                                    <span class="f-c-green" v-if="todo.status==2">成功</span>
                                    <span class="f-c-red" v-if="todo.status==3">
                                        {{todo.errorMsg}}
                                    </span>
                                    <span class="f-c-blue" v-if="todo.status==1">进行中</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <my-page :page="pageNow" :maxpage="maxpage" :callback="callback"></my-page>
                </div>
            </section>
            <numberFlowDetails v-if="off.flowDetails" :cardTotalWhite="whiteCardTotal" :cardTotalEmpty="emptyCardTotal" :listEmpty="detailsDataEmpty" :listWhite="detailsDataWhite" :orderDetails="orderDetails" :numberInfo="numberInfo" :tdEmpty="tdEmpty" :tdWhite="tdWhite"></numberFlowDetails>
        </div>
        <!--详情页面-->
    </section>
</template>
<script>
import { requestGetExclusiveNumerFlowList,requestGetExclusiveNumerFlowDetails1,requestGetExclusiveNumerFlowDetails2 } from "../../../config/service.js";
import pagination from "../../../componentskm/page.vue";
import numberFlowDetails from "../../../componentskm/numberFlowDetails";
import { createDownload, errorDeal,getDateTime ,translateData,getStore,getUnixTime } from "../../../config/utils";
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
        searchFlowList:"", //查询数据
        numberInfo:"",//号码详情
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
        orderDetails:{},
        whiteCardTotal:0,
        emptyCardTotal:0,
        tdWhite:[],
        tdEmpty:[],
        whichSearch:"",
    };
  },
  components: {
    "my-page": pagination,
    numberFlowDetails
  },
    created: function() {
        var vm=this;
        vm.init();
        setTimeout(function(){
            let val=vm.$route.params.val,v={};
            if(val!='null'){
                vm.orderId=val;
                new Promise((resolve,reject)=>{
                    let json={
                        "pageSize": "10",
                        "pageNow": 1,
                        "startTime": new Date(vm.form.startTime.replace(/-/g,'/')).getTime(),
                        "endTime": new Date(vm.form.endTime.replace(/-/g,'/')).getTime(),
                        "orderId": vm.orderId,
                        "dealerId": vm.dealerId,
                        "status": vm.flowResult.join(","),//0全部 1进行中2成功3失败
                        "searchType": vm.form.select||0,//搜索分类0:无，1:8位号码段，2设备号
                    };
                    if(vm.form.select==1){
                        json.context=vm.cardNumber
                    }else{
                        json.context=vm.deviceId
                    }
                    requestGetExclusiveNumerFlowList(json,()=>{vm.off.isLoad=false;})
                    .then((data)=>{
                        vm.total=data.data.total
                        vm.searchFlowList=data.data.datas;
                        vm.numberInfo=data.data.datas[0];
                    }).catch((e=>errorDeal(e)))
                    resolve('success!')
                }).then(()=>{
                    v.sysOrderId=val;
                    v.status=2;
                    vm.numberFlowDetails(v);
                }).catch((e=>errorDeal(e)))
            }
        },300);
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
        var vm = this;
        vm.form.startTime = laydate.now(0, "YYYY-MM-DD 00:00:00");
        vm.form.endTime = laydate.now(0, "YYYY-MM-DD 23:59:59");
    },
    searchList(v,i,resolve){
        let vm=this,
        json={
            "pageSize": "10",
            "pageNow": i||1,
            "startTime": new Date(vm.form.startTime.replace(/-/g,'/')).getTime(),
            "endTime": new Date(vm.form.endTime.replace(/-/g,'/')).getTime(),
            "orderId": vm.orderId,
            "dealerId": vm.dealerId,
            "status": vm.flowResult.join(","),//0全部 1进行中2成功3失败
            "searchType": vm.form.select||0,//搜索分类0:无，1:8位号码段，2设备号
        };
        if(v==1&&vm.orderId==""){
            
            layer.open({
                content:"请输入查询的单号",
                skin:"msg",
                time: 2,
                msgSkin: "error"
            });
            return false;
        }
        if(v==2){
           
            json.orderId="";
            if(vm.flowResult.length==0){
                layer.open({
                    content:"请选择要查询的流转结果",
                    skin:"msg",
                    time: 2,
                    msgSkin: "error"
                });
                vm.searchFlowList="";
                return false;
            }
        }
        if(vm.form.select==1){
            json.context=vm.cardNumber
        }else{
            json.context=vm.deviceId
        }
        vm.whichSearch=v;
        vm.off.isLoad=true;
        if(v==1){//订单查询
            requestGetExclusiveNumerFlowList(json,()=>{vm.off.isLoad=false;})
            .then((data)=>{
                vm.total=data.data.total
                vm.searchFlowList=data.data.datas;
                vm.maxpage=Math.ceil(parseInt(vm.total)/vm.pageSize);
                vm.pageNow=i||1;
                vm.callback=(i)=>{vm.searchList(v,i)};
            }).catch((e=>errorDeal(e)))
        }else if(v==2){//条件查询
            json.orderId="";
            requestGetExclusiveNumerFlowList(json,()=>{vm.off.isLoad=false;})
            .then((data)=>{
                vm.total=data.data.total
                vm.searchFlowList=data.data.datas;
                vm.maxpage=Math.ceil(parseInt(vm.total)/vm.pageSize);
                vm.pageNow=i||1;
                vm.callback=(i)=>{vm.searchList(v,i)};
            }).catch((e=>errorDeal(e)))
        }
    },numberFlowDetails(v){//专营号号段的详情
        if(v.status!=2){
            return false
        }
        let vm=this;
        vm.searchWhiteRequsetData={
            "pageSize": "200",
            "orderId": v.sysOrderId
        };
        vm.searchEmptyReauestData={
            "pageSize": "200",
            "orderId": v.sysOrderId
        }
        vm.numberInfo=v;
        vm.off.flowDetails=true;
        let d1 = new Promise((resolve,reject)=>{
            vm.getWhiteList(vm.searchWhiteRequsetData);
        }) 
        let d2 = new Promise((resolve,reject)=>{
            vm.getEmptyList(vm.searchEmptyReauestData);
        }) 
        Promise.all([d1,d2])
        .then((result)=>{})
        .catch(e=>errorDeal(e))     
    },
    getWhiteList(v,fun){
        let vm=this;
        v.pageNow=++vm.whitePageNum
        requestGetExclusiveNumerFlowDetails1(v,()=>{vm.off.isLoad=false;})
        .then((data)=>{
            let num=data.data.datas;
            if(vm.whitePageNum>1){
                if(num.length==0){
                    layer.open({
                        content:"没有更多数据了",
                        skin:"msg",
                        time: 2,
                        msgSkin: "error"
                    });
                    return false;
                }
            }
            vm.whiteCardTotal=data.data.total;
            for(let i =0 ,len=num.length;i<len;i+=5){
                vm.detailsDataWhite.push(num.slice(i,i+5)) 
            }
            if(vm.detailsDataWhite instanceof Array&&vm.detailsDataWhite.length>0){
                let lastArr=vm.detailsDataWhite[vm.detailsDataWhite.length-1].length;
                if(lastArr<5){
                    vm.tdWhite=new Array(5-lastArr);
                }else{
                    vm.tdWhite=new Array(0);
                }
            }
            return "success";                  
        })
    },
    getEmptyList(v,fun){
        let vm=this;
        v.pageNow=++vm.emptyPageNum
        requestGetExclusiveNumerFlowDetails2(v,()=>{vm.off.isLoad=false;})
        .then((data)=>{
            let num=data.data.datas; 
            if(vm.emptyPageNum>1){
                if(num.length==0){
                    layer.open({
                        content:"没有更多数据了",
                        skin:"msg",
                        time: 2,
                        msgSkin: "error"
                    });
                    return false;
                }
            }
            vm.emptyCardTotal=data.data.total;
            for(let i = 0 ,len=num.length;i<len;i+=5){
                vm.detailsDataEmpty.push(num.slice(i,i+5))
            }  
            if(vm.detailsDataEmpty instanceof Array&&vm.detailsDataEmpty.length>0){
                let lastArr=vm.detailsDataEmpty[vm.detailsDataEmpty.length-1].length;
                if(lastArr<5){
                    vm.tdEmpty=new Array(5-lastArr);
                }else{
                    vm.tdEmpty=new Array(0);
                } 
            }
            return "success";     
        })
    },
    exportList(){
        let vm=this,select=vm.form.select,
			sql="",
			json={"pageSize":-1,"pageNum":-1,"params":[],"opKey":"list.flow.exout"};
            if(vm.whichSearch==1){
                sql+='a.sys_order_id="'+vm.orderId+'"'
            }else if(vm.whichSearch==2){
                sql+="a.status in("+vm.flowResult+") and a.create_time>"+getUnixTime(vm.form.startTime)+" and a.create_time<"+getUnixTime(vm.form.endTime)+""
                if(vm.dealerId!=''){
                    sql+=' and (a.old_dealer_id="'+vm.dealerId+'" or a.new_dealer_id="'+vm.dealerId+'")'
                }
            }
            if(select==1){
                sql+=' and a.phone_title="'+vm.cardNumber+'"'
            }else if(select==2){
                sql+=' and a.use_device_id="'+vm.deviceId+'"'
            }
            json.params.push(sql);
			let userInfo = getStore("KA_ECS_USER");
			json.customerId = userInfo.customerId;
            json.codeId = userInfo.codeId;
            console.log(json)
            createDownload('km-ecs/w/handler/queryExport',BASE64.encode(JSON.stringify(json)),  function(){
		        vm.off.isLoad=false;
	      	})
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
    },translateData(v,i){
        return translateData(v,i)
    }
  }
};
</script>


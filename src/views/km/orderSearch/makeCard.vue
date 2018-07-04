<!--**
  *@info 订单查询模块-开卡订单子模块
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<style scoped>
    .m-top-shift>.box{margin-bottom: none;}
    div.input-box{width: 60%;}
    .m-top-shift>.box{margin-bottom: 0}
</style>

<template>
    <div id="search" :class="{active:off.cardDetails}">
        <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
        <!--查询-->
        <section v-if="!off.cardDetails">
            <div class="g-search-form">
                <section class="m-top-shift f-tas">
                    <div class="box">
                        <label class="item" @click="topShiftClick">
                            <input type="radio" v-model="form.source" value="1">
                            <span class="slider">制成卡</span>
                        </label>
                        <label class="item" @click="topShiftClick">
                            <input type="radio" v-model="form.source" value="2">
                            <span class="slider">制白卡</span>
                        </label>
                    </div>
                </section>
                <section>
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
                             <div class="row pdl">
                                <span class="dp">码号类型：</span>
                                <div class="m-form-checkbox">
                                    <label><span class="checkbox"><input type="checkbox" value="true" v-model="checkAllcardType" checked="checked" @change="BtnCheckAllCardType"><span></span></span><span class="text">全部</span></label>
                                    <label><span class="checkbox"><input type="checkbox" value="0" v-model="cardType" checked="checked"><span></span></span><span class="text">大众号</span></label>
                                    <label><span class="checkbox"><input type="checkbox" value="1" v-model="cardType" checked="checked"><span></span></span><span class="text">大众专营号</span></label>
                                    <label><span class="checkbox"><input type="checkbox" value="2" v-model="cardType" checked="checked"><span></span></span><span class="text">专属专营号</span></label>
                                </div>
                            </div>
                            <div v-if="form.source==1" class="row clr m-col-2">
                                <span class="dp col-l">号码查询：</span>
                                <div class="col-r">
                                    <div class="input-box"><input v-model="phoneNumber" maxlength="11" type="tel" placeholder="请输入查询的号码"></div>
                                </div>
                            </div>
                            <div v-if="form.source==2" class="row clr m-col-2">
                                <span class="dp col-l">号段查询：</span>
                                <div class="col-r">
                                    <div class="input-box"><input v-model="phoneNumber" maxlength="8" type="tel" placeholder="请输入查询的号段"></div>
                                </div>
                            </div>
                            <div class="row pdl">
                                <span class="dp">制卡结果：</span>
                                <div class="m-form-checkbox">
                                    <label><span class="checkbox"><input type="checkbox" value="true" v-model="checkAllMakeCardRes" checked="checked" @change="BtnCheckAllMakeCardRes"><span></span></span><span class="text">全部</span></label>
                                    <label><span class="checkbox"><input type="checkbox" value="2" v-model="makeCardRes" checked="checked"><span></span></span><span class="text">成功</span></label>
                                    <label><span class="checkbox"><input type="checkbox" value="3" v-model="makeCardRes" checked="checked"><span></span></span><span class="text">失败</span></label>
                                    <label><span class="checkbox"><input type="checkbox" value="1" v-model="makeCardRes" checked="checked"><span></span></span><span class="text">进行中</span></label>
                                    <label><span class="checkbox"><input type="checkbox" value="4" v-model="makeCardRes" checked="checked"><span></span></span><span class="text">订单关闭</span></label>
                                </div>
                            </div>
                            <div class="row clr m-col-2">
                                <span class="dp col-l">商户ID：</span>
                                <div class="col-r">
                                    <div class="input-box"><input v-model="dealerId" maxlength="18" type="tel" placeholder="请输入查询的商户ID"></div>
                                </div>
                            </div>
                            <div class="row pdl">
                                <span class="dp">支付方式：</span>
                                <div class="m-form-checkbox">
                                    <label><span class="checkbox"><input type="checkbox" value="true" v-model="checkAllPayType" checked="checked" @change="BtnCheckAllPayType"><span></span></span><span class="text">全部</span></label>
                                    <label><span class="checkbox"><input type="checkbox" value="2" v-model="payType" checked="checked"><span></span></span><span class="text">微信</span></label>
                                    <label><span class="checkbox"><input type="checkbox" value="3" v-model="payType" checked="checked"><span></span></span><span class="text">支付宝</span></label>
                                    <label><span class="checkbox"><input type="checkbox" value="1" v-model="payType" checked="checked"><span></span></span><span class="text">账户</span></label>
                                    <label><span class="checkbox"><input type="checkbox" value="0" v-model="payType" checked="checked"><span></span></span><span class="text">未支付</span></label>
                                </div>
                            </div>
                            <div class="row clr m-col-2">
                                <span class="dp col-l">操作人：</span>
                                <div class="col-r">
                                    <div class="input-box"><input v-model="operatorId" maxlength="18" type="tel" placeholder="请输入查询的操作人ID"></div>
                                </div>
                            </div>
                            <button class="f-btn f-btn-line" @click="searchList(2)">查询</button>
                        </section>
                    </div>
                    <div class="m-total-table" v-if="searchMakeCardList">
                        <div class="total-head">
                            统计结果
                            <b>{{total}}</b>
                            <button class="btn_export_excel" v-if="false" :disabled="searchMakeCardList.length==0" @click="exportList">导出excel</button>
                        </div>
                        <table v-if="form.source==1">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>订单号</th>
                                    <th>创建时间</th>
                                    <th>制卡号码</th>
                                    <th>码号类型</th>
                                    <th>操作人</th>
                                    <th>商户名称</th>
                                    <th>支付金额（元）</th>
                                    <th>支付方式</th>
                                    <th>制卡结果</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!--查询结果表格-->
                                <tr v-for="(todo,index) in searchMakeCardList">
                                    <td>{{((pageNow-1)*10+(index+1))}}</td>
                                    <td><a @click="searchMakeCardDetails(todo)">{{todo.sys_order_id||'--'}}</a></td>
                                    <td>{{getDateTime(todo.create_time)[6]}}</td>
                                    <td>{{todo.phone_number||'--'}}</td>
                                    <td>
                                        <span v-if="todo.monopoly_type==0">普号</span>
                                        <span v-if="todo.monopoly_type==1">大众专营号</span>
                                        <span v-if="todo.monopoly_type==2">专属专营号</span>
                                    </td>
                                    <td>{{todo.user_id||'--'}}<br>({{todo.username||'--'}})</td>
                                    <td>{{todo.dealer_id||'--'}}<br>{{todo.company_name||'--'}}</td>
                                    <td>{{todo.actual_money/100}}</td>
                                    <td>
                                        {{translateData(12,todo.pay_type)}}
                                    </td>
                                    <td>
                                        <span class="f-c-blue" v-if="todo.order_status==1">进行中</span>
                                        <span class="f-c-green" v-if="todo.order_status==2">成功</span>
                                        <span class="f-c-red" v-if="todo.order_status==3">失败</span>
                                        <span class="f-c-red" v-if="todo.order_status==4">订单已关闭</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table v-if="form.source==2">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>订单号</th>
                                    <th>创建时间</th>
                                    <th>所属号段</th>
                                    <th>码号类型</th>
                                    <th>ICCID</th>
                                    <th>IMSI</th>
                                    <th>操作人</th>
                                    <th>商户名称</th>
                                    <th>支付金额（元）</th>
                                    <th>支付方式</th>
                                    <th>制卡结果</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!--查询结果表格-->
                                <tr v-for="(todo,index) in searchMakeCardList">
                                    <td>{{((pageNow-1)*10+(index+1))}}</td>
                                    <td><a @click="searchMakeCardDetails(todo)">{{todo.orderId||'--'}}</a></td>
                                    <td>{{getDateTime(todo.creatTime)[6]}}</td>
                                    <td>{{todo.phoneSegment||'--'}}***</td>
                                    <td>{{translateData(10,todo.phoneType)}}</td>
                                    <td>{{todo.iccid||'--'}}</td>
                                    <td>{{todo.imsi||'--'}}</td>
                                     <td>{{todo.operatorId||'--'}}<br>({{todo.operatorName||'--'}})</td>
                                    <td>{{todo.dealerId||'--'}}<br>{{todo.companyName||'--'}}</td>
                                    <td>{{translateData('money',todo.payMoney)}}</td>
                                    <td>{{translateData(12,todo.payType)}}</td>
                                    <td>
                                        <span class="f-c-blue" v-if="todo.status==1">进行中</span>
                                        <span class="f-c-green" v-if="todo.status==2">成功</span>
                                        <span class="f-c-red" v-if="todo.status==3">失败</span>
                                        <span class="f-c-red" v-if="todo.status==4">订单已关闭</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <my-page :page="pageNow" :maxpage="maxpage" :callback="callback"></my-page>
                    </div>
                </section>
            </div>
        </section>
        <!--详情-->
        <makeCardDetails v-if="off.cardDetails" :cardType="form.source" :detailsWhite="whiteCardDet" :detailsEmpty="emptyCardDet"></makeCardDetails>
    </div>
</template>
<script>
require("../../../assets/km/js/base64.min.js");
import {
    requestGetMakeWhiteList,
    requestGetMakeChengList,
    requestGetMakeWhiteDetails,
    requestGetMakeChengDetails
} from "../../../config/service.js";
import pagination from "../../../componentskm/page.vue";
import makeCardDetails from "../../../componentskm/makeCardDetails";
import {
  getDateTime,
  translateData,
  errorDeal
} from "../../../config/utils.js";
export default {
  data() {
    return {
      off: {
        type: 1, //1，待审核;2，已审核;3，进行中;4，已关闭
        isLoad: 0, //加载条
        cardDetails: false, //详情页面开关
        number: "", //第几条详情
        showData: 0
      },
      form: {
        source: "1", //1 成卡,2 白卡
        startTime: "",
        endTime: "",
        select: 6 //条件查询，选择的条件
      },
      searchMakeCardList:false,
      checkAllcardType:true,
      cardType:[0,1,2],
      checkAllMakeCardRes:true,
      makeCardRes:[1,2,3,4],
      checkAllPayType:true,
      payType:[0,1,2,3],
      phoneNumber:"",
      orderId:"",
      dealerId:"",
      operatorId:"",
      list: "", //查询数据
      detailsData: "", //详情数据
      total: 0, //总查询条数
      pageNow: 1, //当前页数
      pageSize: 10, //显示条数
      maxpage: 1, //最大页数
      callback: Function ,//page组件点击回调
      whiteCardDet:{},
      emptyCardDet:{},
    };
  },
  components: {
    "my-page": pagination,
    makeCardDetails
  },
  watch:{

    cardType(){
        if(this.cardType.length==3){
            this.checkAllcardType=true;
        }else{
            this.checkAllcardType=false;
        }
    },
    makeCardRes(){
        if(this.makeCardRes.length==4){
            this.checkAllMakeCardRes=true;
        }else{
            this.checkAllMakeCardRes=false;
        }
    },
    payType(){
        if(this.payType.length==4){
            this.checkAllPayType=true;
        }else{
            this.checkAllPayType=false;
        }
    }
  },
  computed: {

  },

  created: function() {
    this.init();
  },
  methods: {
    searchList(v,i){
        let vm=this,json={
            "pageSize": "10",
            "pageNow": i||1,
            "startTime": new Date(vm.form.startTime).getTime(),
            "endTime": new Date(vm.form.endTime).getTime(),
            "orderId": vm.orderId,
            "operatorId": vm.operatorId,//操作人
            "dealerId": vm.dealerId,
            "phoneSegment": vm.phoneNumber,//号码段前
            "phoneType": vm.cardType.join(","),// 0普号1大众专营号2专属专营号
            "status": vm.makeCardRes.join(","),// 1进行中2成功3失败
            "payType": vm.payType.join(",")// 1资金池2微信3支付宝
        }
        if(vm.form.source==2){//成卡
            requestGetMakeWhiteList(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.total=data.data.total;
                vm.searchMakeCardList=data.data.list;
                vm.maxpage=Math.ceil(parseInt(vm.total)/vm.pageSize);
                vm.callback=(v,i)=>{vm.searchList(v,i)};
            })
        }else{
            requestGetMakeChengList(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.total=data.data.total;
                vm.searchMakeCardList=data.data.datas;
                vm.maxpage=Math.ceil(parseInt(vm.total)/vm.pageSize);
                vm.callback=(v,i)=>{vm.searchList(v,i)};
            })
        }   
    },
    searchMakeCardDetails(v){
        let vm=this;
        if(vm.form.source==1){
            requestGetMakeChengDetails({orderId:v.sys_order_id},()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.off.cardDetails=true;
                vm.emptyCardDet=data.data;
            })
        }else{
            requestGetMakeWhiteDetails({orderId:v.orderId},()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.off.cardDetails=true;
                vm.whiteCardDet=data.data;
            })
        }
    },
    exportList(){

    },
    init: function() {
        var vm = this,
        type = this.$route.params.type;
        type == "auditing"
            ? (vm.off.type = 1)
            : type == "audited"
            ? (vm.off.type = 2)
            : type == "closed" ? (vm.off.type = 4) : (vm.off.type = 3);
        vm.form.startTime = laydate.now(0, "YYYY-MM-DD 00:00:00");
        vm.form.endTime = laydate.now(0, "YYYY-MM-DD 23:59:59");
    },
    BtnCheckAllCardType(){
        if(this.checkAllcardType==true){
            this.cardType=[0,1,2]
        }else if(this.checkAllcardType==false){
            this.cardType=[]
        }
    },BtnCheckAllMakeCardRes(){
        if(this.checkAllMakeCardRes==true){
            this.makeCardRes=[1,2,3,4]
        }else if(this.checkAllMakeCardRes==false){
            this.makeCardRes=[]
        }
    },BtnCheckAllPayType(){
        if(this.checkAllPayType==true){
            this.payType=[0,1,2,3]
        }else if(this.checkAllPayType==false){
            this.payType=[]
        }
    }
    ,
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
    topShiftClick() {
      var vm = this;
      vm.searchMakeCardList = false;
      vm.form = Object.assign(vm.form, {

      });
    },
    getDateTime(v) {
      return getDateTime(v);
    },
    translateData(v,i){
        return translateData(v,i)
    }
  }
};
</script>
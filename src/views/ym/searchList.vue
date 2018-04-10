<style scoped>
@import "../../assets/ym/css/search.css";
.g-search-menu #search #auditList .m-refresh {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.g-search-menu #search #auditList {
  display: block;
}
.m-sub-page>.fl{
	padding: 20px;
}
</style>
<template>
  <div id="search" :class="{active:off.details}">
  	<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}" v-if="!off.detailsList"></header>
  	<!--查询-->
  	<section v-if="!off.detailsList">
  	<div class="g-search-form">
		<div class="m-tag"><b></b>系统类型</div>
		<!--基础条件-->
		<section class="form-c">
			<div class="row">
				<span class="dp">系统名称：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="checkbox" value="0" v-model="form.source"><span></span></span><span class="text">远盟</span></label>
					<label><span class="radio"><input type="checkbox" value="1" v-model="form.source"><span></span></span><span class="text">远易站</span></label>
					<label><span class="radio"><input type="checkbox" value="3" v-model="form.source"><span></span></span><span class="text">远微商城</span></label>
					<label><span class="radio"><input type="checkbox" value="2" v-model="form.source"><span></span></span><span class="text">信时空</span></label>
					<label><span class="radio"><input type="checkbox" value="4" v-model="form.source"><span></span></span><span class="text">网厅</span></label>
				</div>
			</div>

		</section>
		<div class="m-tag"><b></b>订单查询</div>
		<section class="form-c">
			<div class="row clr m-col-2">
				<span class="dp col-l" style="width:.65rem;margin-left:0">订单号码：</span>
				<div class="col-r m-input-button"><input v-model="form.context1" maxlength="32" type="tel" placeholder="请输入查询的订单号码"><button @click="searchList('order')">查询</button></div>
			</div>
		</section>
		<div class="m-tag"><b></b>条件查询</div>
		<section class="form-c">
			<div class="row">
				<span class="dp">操作类型：</span>
				<div class="m-form-checkbox">
					<label><span class="checkbox"><input value="1" type="checkbox" v-model="form.orderType"><span></span></span><span class="text">成卡</span></label>
					<label><span class="checkbox"><input value="2" type="checkbox" v-model="form.orderType"><span></span></span><span class="text">白卡</span></label>
					<label><span class="checkbox"><input value="6" type="checkbox" v-model="form.orderType"><span></span></span><span class="text">过户办理</span></label>
					<label><span class="checkbox"><input value="4" type="checkbox" v-model="form.orderType"><span></span></span><span class="text">实名补录</span></label>
					<label><span class="checkbox"><input value="5" type="checkbox" v-model="form.orderType"><span></span></span><span class="text">实名登记</span></label>
				</div>
			</div>
			<div class="row" v-if="off.type==2">
				<span class="dp">订单状态：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="9" v-model="form.orderStatus"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.orderStatus"><span></span></span><span class="text">同意</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.orderStatus"><span></span></span><span class="text">拒绝</span></label>
					<label><span class="radio"><input type="radio" value="3" v-model="form.orderStatus"><span></span></span><span class="text">复审同意</span></label>
					<label><span class="radio"><input type="radio" value="4" v-model="form.orderStatus"><span></span></span><span class="text">准同意</span></label>
				</div>
			</div>
			<div class="row" v-if="off.type==2">
				<span class="dp">国政通校验：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value=0 v-model="form.gztChe"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value=1 v-model="form.gztChe"><span></span></span><span class="text">成功</span></label>
					<label><span class="radio"><input type="radio" value=2 v-model="form.gztChe"><span></span></span><span class="text">失败</span></label>
					<label><span class="radio"><input type="radio" value=3 v-model="form.gztChe"><span></span></span><span class="text">成功+失败</span></label>
					<label><span class="radio"><input type="radio" value=4 v-model="form.gztChe"><span></span></span><span class="text">未校验</span></label>
				</div>
			</div>
			
			<div class="row" v-if="off.type==2">
				<span class="dp">审核方式：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.auditType"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.auditType"><span></span></span><span class="text">实时审核</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.auditType"><span></span></span><span class="text">自动审核</span></label>
				</div>
			</div>
			<div class="row clr m-col-2">
				<div class="dp col-l"style="width:.65rem;margin-left:0">时间区间：</div>
				<div class="col-r">
					<span class="m-time-area" @click="to_laydate(1)"><input id="start" v-model="form.startTime" type="text" readonly="readonly"></span>
					<span class="m-space">一</span>
					<span class="m-time-area" @click="to_laydate(2)"><input id="end" v-model="form.endTime" type="text" readonly="readonly"></span>
				</div>
			</div>
		</section>
		<section class="form-c o-no-bgc">
			<div class="row" :class="{active:form.select==2}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="2" v-model="form.select"><span></span></span><span class="text">手机号码：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context2" :readonly="form.select!=2" maxlength="11" type="tel" placeholder="请输入查询的手机号码"></div>
			</div>
			<div class="row" :class="{active:form.select==3}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="3" v-model="form.select"><span></span></span><span class="text">审核人工号：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context3" :readonly="form.select!=3" maxlength="11" type="tel" placeholder="请输入查询的审核人号码"></div>
			</div>
			<div class="row" :class="{active:form.select==4}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="4" v-model="form.select"><span></span></span><span class="text">身份证号：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context4" :readonly="form.select!=4" maxlength="18" type="text" placeholder="请输入查询的身份证号码"></div>
			</div>
			<div class="row" :class="{active:form.select==6}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="6" v-model="form.select"><span></span></span><span class="text">操作者工号：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context6" :readonly="form.select!=6" maxlength="11" type="tel" placeholder="请输入查询的操作者工号"></div>
			</div>
			<div class="row" :class="{active:form.select==5}" v-if="off.type==1">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="5" :readonly="form.select!=5" v-model="form.select"><span></span></span><span class="text">订单状态：</span></label>
				</span>
				<div class="m-form-radio col-radio">
					<label><span class="radio"><input type="radio" checked="checked" value="9" v-model="form.orderStatus"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.orderStatus"><span></span></span><span class="text">待分配</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.orderStatus"><span></span></span><span class="text">已分配</span></label>
				</div>
			</div>
			<div class="row" :class="{active:form.select==7}" v-if="off.type==2">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="7" :readonly="form.select!=7" v-model="form.select"><span></span></span><span class="text">开卡状态：</span></label>
				</span>
				<div class="m-form-radio col-radio">
					<label><span class="radio"><input value="9" type="radio" v-model="form.context7"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input value="1" type="radio" v-model="form.context7"><span></span></span><span class="text">成功</span></label>
					<label><span class="radio"><input value="2" type="radio" v-model="form.context7"><span></span></span><span class="text">失败</span></label>
				</div>
			</div>
			<button class="f-btn f-btn-line" @click="searchList(1)">查询</button>
		</section>
  	</div>
  	<div id="totalDiv" v-if="list">
		<div class="total-head">统计结果<b>{{total}}</b> <button class="btn_export_excel" v-if="maxpage"  @click="downLoadList">导出excel</button> </div>
		<table>
			<thead>
				<tr v-if="off.type==1">
					<th>序号</th>
					<th>订单号</th>
					<th>操作类型</th>
					<th>用户姓名</th>
					<th>用户号码</th>
					<th>号码等级</th>
					<th>身份证号码</th>
					<th>审核人</th>
					<th>操作者工号</th>
					<th>生成时间</th>
					<th>状态</th>
					<th>操作</th>
                    <th></th>
				</tr>
				<tr v-if="off.type==2">
					<th>序号</th>
					<th>订单号</th>
					<th>操作类型</th>
					<th>用户姓名</th>
					<th>用户号码</th>
					<th>号码等级</th>
					<th>审核方式</th>
					<th>审核人</th>
					<th>操作人</th>
					<th>生成时间</th>
					<th>审核用时</th>
					<th>开卡状态</th>
					<th>国政通校验</th>
					<th>订单状态</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="off.type==1" v-for="(todo,index) in list" :key="index">
					<td>{{((pageNum-1)*10+(index+1))}}</td>
					<td>{{todo.orderId}}</td>
					<td>{{translateData(1,todo.orderType)}}</td>
					<td>{{todo.userName}}</td>
					<td>{{todo.phoneNumber}}</td>
					<td>{{translateData(5,todo.phoneLevel)}}</td>
					<td>{{todo.identityCard}}</td>
					<td>{{todo.customerId}}({{todo.customerName}})</td>
					<td>{{todo.operator}}({{todo.operatorName}})</td>
					<td>{{todo.createTime?getDateTime(todo.createTime)[6]:''}}</td>
					<td v-if="todo.orderStatus==1"><b class="f-c-red">待分配</b></td>
					<td v-if="todo.orderStatus==2"><b class="f-c-blue">已分配</b></td>
					<td><a :name="todo.orderId" @click="details" href="javascript:void(0)" class="details">查看详情</a></td>
                    <td><a v-if="todo.orderStatus==1" href="javascript:void(0)"  @click="auditBtn(todo.orderType,todo.orderId)" >审核</a></td>
				</tr>
				<tr v-if="off.type==2" v-for="(todo,index) in list" :key="index">
					<td>{{((pageNum-1)*10+(index+1))}}</td>
					<td>{{todo.orderId}}</td>
					<td>{{translateData(1,todo.orderType)}}</td>
					<td>{{todo.userName}}</td>
					<td>{{todo.userPhone}}</td>
					<td>{{translateData(5,todo.phoneLevel)}}</td>
					<td>
						<span v-show="todo.auditType==1">实时审核</span>
						<span v-show="todo.auditType==2">自动审核</span>
					</td>
					<td>{{todo.customerId}}({{todo.customerName}})</td>
					<td>{{todo.operator}}({{todo.operatorName}})</td>
					<td>{{todo.createTime?getDateTime(todo.createTime)[6]:''}}</td>
					<td>{{translateData(6,todo.takeTime)}}</td>
					<td :class="{fCYellow:todo.cardStatus==1,fCGreen:todo.cardStatus==2,fCRed:todo.cardStatus==3,fCGrey:todo.cardStatus==9}">{{translateData(4,todo.cardStatus)}}</td>
					<td>
					    <span v-if="todo.gztCheckResult==1">成功</span>
					    <span v-if="todo.gztCheckResult==2">失败</span>
					    <span v-if="todo.gztCheckResult==3">未定</span>
					    <span v-if="!todo.hasOwnProperty('gztCheckResult')">未校验</span>
				    </td>
					<td colspan="2" v-if="todo.result==1" class="td-col-2">
						<div class="f-c-green">同意</div>
						<div><a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">查看详情</a></div>
					</td>
					<td colspan="2" v-if="todo.result==2&&parseInt(todo.recheckLastTime)<new Date().getTime()" class="td-col-2">
						<div class="f-c-red">拒绝</div>
						<div><a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">查看详情</a><br><span class="time_out f-c-red">超过复审时间</span></div>
					</td>
					<td colspan="2" v-if="todo.result==2&&parseInt(todo.recheckLastTime)>=new Date().getTime()" class="td-col-2">
						<div class="f-c-red">拒绝</div>
						<div><a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">查看详情</a><br><a :name="todo.orderId"  v-if="off.power3" :title="index" @click="agree" class="agree f-mgt-10" href="javascript:void(0)">同意</a></div>
					</td>
					<td colspan="2" v-if="todo.result==3" class="td-col-2">
						<div class="f-c-blue">复审同意</div>
						<div><a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">查看详情</a></div>
					</td>
					<td colspan="2" v-if="todo.result==4" class="td-col-2">
						<div :class= "{ 'f-c-green': todo.updName==1||todo.updAddress==1||todo.updPapersCode==1, 'f-c-purple': todo.updName==0&&todo.updAddress==0&&todo.updPapersCode==0}">准同意</div>
						<div><a :name="todo.orderId" :title="index" @click="details"
						:class="{fCPurple:todo.updAddress==1&&todo.updPapersCode==1&&todo.updName==1}" class="details" href="javascript:void(0)">查看详情</a></div>
					</td>
				</tr>
			</tbody>
		</table>
		<section class="m-sub-page clr">
			<div v-if="form.orderStatus==4&&list.length" class="o-export-excel fl">
				<a href="javascript:void(0)" @click="downloadBugOrder" class="f-btn-success">导出准同意数据</a>
				<iframe src="" frameborder="0" id="downloadFrame" style="width:0;height:0;opacity:0"></iframe>
			</div>
			<my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
		</section>
		
	</div>
	</section>
	<!--详情-->
	<list-auditdetails  v-if="off.auditdetails==1" >
      
	</list-auditdetails>
    <list-details :list="detailsData" :type="off.type" v-if="off.details==1" :number="off.number">
      
	</list-details>
  </div>
</template>
<script>
import pagination from "../../componentskm/page.vue";
import details from "../ym/searchListDetails.vue";
import auditdetails from "../ym/auditList.vue";
import { setStore, getStore, createDownload,errorDeal } from "../../config/utils";
import {reqCommonMethod} from "../../config/service.js";
export default {
  name: "search",
  data() {
    return {
      off: {
        type: 1, //1，待审核；2，已审核
        isLoad: 0, //加载条
        detailsList: 0, //查询条件开关
        details: 0, //查看详情
        auditdetails: 0, //审核
        number: "", //第几条详情
        whichbtn: "",
        power3:0,
      },
      form: {
        source: [0], //系统名称
        orderType: [1, 2, 6, 4, 5], //操作类型
        auditType: 0, //审核方式
        orderStatus: 9, //订单状态
        context1: "", //订单号码
        context2: "", //手机号码
        context3: "", //审核人工号
        context4: "", //身份证号
        context5: "", // type=5时订单状态
        context6: "", //操作者工号
        context7: 9, //开卡状态
        startTime: "",
        endTime: "",
        select: 7, //条件查询，选择的条件
        gztChe: 0 //国政通校验
      },
      list: "", //查询数据
      cardOrderType: "", //开卡类型
      cardOrderId: "", //订单号
      detailsData: "", //详情数据
      total: 0, //总查询条数
      pageNum: 1, //当前页数
      pageSize: 10, //显示条数
      maxpage: 1, //最大页数
      callback: Function, //page组件点击回调
      cardT: "",
      orderId: "",
      info:'',
    };
  },
  components: {
    "my-page": pagination,
    "list-details": details, //查看详情页面
    "list-auditdetails": auditdetails //审核页面
  },
  created: function() {
    this.init();
  },
  methods: {
    init: function() {
      const vm=this;
      let userInfo=getStore("KA_ECS_USER");
	  vm.userInfo=userInfo;
      vm.userInfo.isadminYm&&(vm.userInfo.isadminYm.indexOf('1')>-1||vm.userInfo.isadminYm.indexOf('3')>-1) ? vm.off.power3=true : vm.off.power3=false;
      var type = this.$route.params.type;
      type == "auditing" ? (vm.off.type = 1) : (vm.off.type = 2);
      vm.form.startTime = laydate.now(0, "YYYY-MM-DD 00:00:00");
      vm.form.endTime = laydate.now(0, "YYYY-MM-DD 23:59:59");
      vm.off.type == 1 ? (vm.form.select = 5) : (vm.form.select = 7);
    },
    auditBtn: function(type, orderId) {
      var vm = this;
      vm.cardT = type;
      vm.orderId = orderId;
      // vm.detailsData=data.data.list;
      vm.off.detailsList = 1;
      vm.off.auditdetails = 1;
    },
    searchList: function(index, page) {
      var vm = this,
        url,
        json = {
        //   source: vm.form.source,
          source:vm.form.source.join(","),
          orderType: vm.form.orderType.join(","),
          pageSize: vm.pageSize,
          pageNum: page || 1,
          startTime: vm.form.startTime,
          endTime: vm.form.endTime,
          orderStatus: vm.form.orderStatus,
          auditType: vm.form.auditType,
          gztCheck: vm.form.gztChe
        };

      if (index == "order") {
        vm.off.whichbtn = "index";
        if (!vm.form.context1) {
          layer.open({
            content: "请输入订单号码",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        }
        json.context = vm.form.context1;
        json.type = 1;
      } else if (index == 1) {
        vm.off.whichbtn = 1;
        let context = vm.form["context" + vm.form.select];
        vm.off.type == 1 &&
          vm.form.select == 5 &&
          (context = vm.form.orderStatus);
        if (vm.form.select == 2 && !context) {
          layer.open({
            content: "请输入手机号码",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        } else if (vm.form.select == 2 && context.length != 11) {
          layer.open({
            content: "手机号码格式错误",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        } else if (vm.form.select == 3 && !context) {
          layer.open({
            content: "请输入审核人工号",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        } else if (vm.form.select == 4 && !context) {
          layer.open({
            content: "请输入身份证号",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        } else if (vm.form.select == 6 && !context) {
          layer.open({
            content: "请输入操作者工号",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        }
        json.context = context;
        json.type = vm.form.select;
      }
      vm.off.type == 1
        ? (url = "ym-ecs/c/audit/auditOrderSearch")
        : (url = "ym-ecs/c/audit/orderSearch");
    //   vm.AJAX(url,json,function(data) {
    //       vm.list = data.data.list;
    //       vm.total = data.data.total;
    //       vm.maxpage = Math.ceil(parseInt(data.data.total) / 10);
    //       vm.pageNum = page || 1;
    //       vm.callback = function(v) {
    //         vm.searchList(index, v);
    //       };
    //     },
    //     function() {
    //       vm.off.isLoad = false;
    //     }
    //   );
      vm.off.isLoad=true;
      reqCommonMethod(json,function(){vm.off.isLoad=false},url)
      .then((data)=>{
          vm.list = data.data.list;
          vm.total = data.data.total;
          vm.maxpage = Math.ceil(parseInt(data.data.total) / 10);
          vm.pageNum = page || 1;
          vm.callback = function(v) {
            vm.searchList(index, v);
          };
          vm.off.isLoad=false;
      }).catch(error=>errorDeal(error));    
    },
    downLoadList: function(index, page) {
      //导出EXCEL
      var vm = this,
        url,
        json = {
        //   source: vm.form.source,
          source:vm.form.source.join(","),
          orderType: vm.form.orderType.join(","),
          pageSize: vm.pageSize,
          pageNum: page || 1,
          startTime: vm.form.startTime,
          endTime: vm.form.endTime,
          orderStatus: vm.form.orderStatus,
          auditType: vm.form.auditType,
          gztCheck: vm.form.gztChe
        };
      if (vm.off.whichbtn == "order") {
        if (!vm.form.context1) {
          layer.open({
            content: "请输入订单号码",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        }
        json.context = vm.form.context1;
        json.type = 1;
      } else if (vm.off.whichbtn == 1) {
        let context = vm.form["context" + vm.form.select];
        vm.off.type == 1 &&
          vm.form.select == 5 &&
          (context = vm.form.orderStatus);
        if (vm.form.select == 2 && !context) {
          layer.open({
            content: "请输入手机号码",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        } else if (vm.form.select == 2 && context.length != 11) {
          layer.open({
            content: "手机号码格式错误",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        } else if (vm.form.select == 3 && !context) {
          layer.open({
            content: "请输入审核人工号",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        } else if (vm.form.select == 4 && !context) {
          layer.open({
            content: "请输入身份证号",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        } else if (vm.form.select == 6 && !context) {
          layer.open({
            content: "请输入操作者工号",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        }
        json.context = context;
        json.type = vm.form.select;
      }
      //      if(!userInfo){
      //        layer.open({
      //          content:'登录已过期，请重新登录',
      //          style:'width:auto;',
      //          btn:['确定'],
      //          shadeClose:false,
      //          yes:function(){
      //            setStore("KA_ECS_USER","");
      //            window.location.href="#/login";
      //            layer.closeAll();
      //          }
      //        });
      //        return false;
      //      }
      if (vm.off.type == 1) {
        url = "ym-ecs/c/audit/downloadOrderSearch";
      } else if (vm.off.type == 2) {
        url = "ym-ecs/c/audit/downloadOrderSearch";
      }
      vm.off.load = true;
      let userInfo=getStore("KA_ECS_USER");
      json.customerId=userInfo.customerId;
	  json.codeId=userInfo.codeId;
      createDownload(url, JSON.stringify(json), function() {
        vm.off.load = false;
      });
    },
    downloadBugOrder() {
      //下载准同意excel
      var vm = this;

      vm.off.load = true;
      let userInfo=getStore("KA_ECS_USER"),json={
      	startTime: vm.form.startTime,
      	endTime: vm.form.endTime,
      	cardStatus: vm.form.context7,
      	customerId:userInfo.customerId,
	  	codeId:userInfo.codeId
      };
      createDownload("ym-ecs/c/audit/exportBuggingOrder", JSON.stringify(json), function() {
        vm.off.load = false;
      });
    },
    agree: function(e) {
      var vm = this,
        url,
        orderId = e.target.name,
        number = e.target.title;
    //   vm.AJAX("c/audit/orderRecheck", { orderId: orderId }, function(data) {
    //     layer.open({
    //       content: "复审成功",
    //       skin: "msg",
    //       time: 4,
    //       msgSkin: "success"
    //     });
    //     vm.list[number].result = 3;
    //     vm.list[number].cardStatus = 1;
    //   });
      reqCommonMethod({ orderId: orderId },function(){vm.off.isLoad=false;},"ym-ecs/c/audit/orderRecheck")
      .then((response)=>{
          layer.open({
            content: "复审成功",
            skin: "msg",
            time: 4,
            msgSkin: "success"
            });
            vm.list[number].result = 3;
            vm.list[number].cardStatus = 1;
            vm.off.isLoad=false;
      }).catch(error=>errorDeal(error));         
    },
    details: function(e) {
      var vm = this,
        url,
        orderId = e.target.name;
      vm.off.number = e.target.title;
      vm.off.type == 1
        ? (url = "ym-ecs/c/audit/auditOrderDetails")
        : (url = "ym-ecs/c/audit/orderDetails");
      if (vm.off.isLoad) return false;
      vm.off.isLoad = true;
    //   vm.AJAX(
    //     url,
    //     { orderId: orderId },
    //     function(data) {
    //       vm.detailsData = data.data;
    //       vm.off.details = true;
    //       vm.off.detailsList = true;
    //     },
    //     function() {
    //       vm.off.isLoad = false;
    //     }
    //   );
      reqCommonMethod({ orderId: orderId },function(){vm.off.isLoad=false;},url)
      .then((data)=>{
          vm.detailsData = data.data;
          vm.off.details = true;
          vm.off.detailsList = true;
          vm.off.isLoad=false;
      }).catch(error=>errorDeal(error));          
    },
    to_laydate: function(v) {
      var vm = this,
        el = "";
      v == 1 ? (el = "#start") : (el = "#end");
      laydate({
        elem: el,
        istime: true,
        format: "YYYY-MM-DD hh:mm:ss",
        isclear: false,
        choose: function(dates) {
          //选择好日期的回调
          v == 1 ? (vm.form.startTime = dates) : (vm.form.endTime = dates);
        }
      });
    },
    toSearch: function(e) {
      e.keyCode == 13 && this.searchList(2);
    },
    translateData: function(type, v) {
      v = parseInt(v);
      switch (type) {
        case 1: //操作类型
          return v == 1
            ? "开成卡"
            : v == 2
              ? "开白卡"
              : v == 4
                ? "实名补录"
                : v == 3 ? "过户办理" : v == 5 ? "实名登记" : void 0;
          break;
        case 2: //证件类型
          return v == 1
            ? "身份证"
            : v == 2 ? "军官证" : v == 3 ? "护照" : void 0;
          break;
        case 3: //已审核，订单状态
          break;
        case 4: //开卡状态
          return v == 1
            ? "处理中"
            : v == 2 ? "成功" : v == 3 ? "失败" : v == 9 ? "--" : void 0;
          break;
        case 5: //靓号等级
          var level = [
            "普号",
            "特级",
            "一级",
            "二级",
            "三级",
            "四级",
            "五级",
            "六级",
            "七级",
            "八级",
            "九级",
            "十级",
            "十一级"
          ];
          return level[parseInt(v)];
          break;
        case 6: //天数，时分秒
          v = parseInt(v);
          var day, minute, second, hour;
          day = Math.floor(v / (60 * 60 * 24));
          hour = Math.floor((v % (60 * 60 * 24)) / (60 * 60));
          minute = Math.floor((v % (60 * 60)) / 60);
          second = Math.floor(v % 60);
          return day > 0
            ? day + "天" + hour + "时" + minute + "分" + second + "秒"
            : hour > 0
              ? hour + "时" + minute + "分" + second + "秒"
              : minute > 0 ? minute + "分" + second + "秒" : second + "秒";
          break;
      }
    },
    getDateTime: function(e) {
      var t;
      t = e ? new Date(parseInt(e)) : new Date();
      var n = t.getFullYear(),
        a = t.getMonth() + 1,
        r = t.getDate(),
        o = t.getHours(),
        i = t.getMinutes(),
        c = t.getSeconds(),
        k = [];
      a >= 10 ? a : (a = "0" + a),
        r >= 10 ? r : (r = "0" + r),
        o >= 10 ? o : (o = "0" + o),
        i >= 10 ? i : (i = "0" + i),
        c >= 10 ? c : (c = "0" + c),
        (k[0] = n),
        (k[1] = a),
        (k[2] = r),
        (k[3] = n + "-" + a),
        (k[4] = a + "-" + r),
        (k[5] = o + ":" + i + ":" + c),
        (k[6] = n + "-" + a + "-" + r + " " + o + ":" + i + ":" + c);
      return k;
    }
    // dropSelectButton:function(e){
    // 	var vm=this;
    // 	vm.drop.off ? vm.drop.off=false : vm.drop.off=true;
    // 	e.stopPropagation();
    // },
    // dropSelect:function(e){
    // 	var vm=this,obj=e.target,input=document.getElementById('context'),setInput=function(index){
    // 		if(index){
    // 			vm.form.context="点击查询";
    // 			input.className="active"
    // 			input.setAttribute("readonly","readonly");
    // 			input.attachEvent ? input.attachEvent("onclick",vm.searchList) : input.addEventListener("click",vm.searchList,false);

    // 		}else{
    // 			vm.form.context="";
    // 			input.className="";
    // 			input.removeAttribute("readonly");
    // 			input.detachEvent ? input.detachEvent('onclick',vm.searchList) : input.removeEventListener("click",vm.searchList,false);
    // 		}

    // 	};
    // 	if(obj.name=="79"){
    // 		vm.drop.text="开卡状态：全部";
    // 		setInput(1)

    // 	}else if(obj.name=="71"){
    // 		vm.drop.text="开卡状态：成功";
    // 		setInput(1)
    // 	}else if(obj.name=="72"){
    // 		vm.drop.text="开卡状态：失败";
    // 		setInput(1)
    // 	}else{
    // 		vm.drop.text=obj.innerHTML;
    // 		setInput()
    // 	}

    // 	vm.drop.type=obj.name;
    // 	vm.drop.off=false;
    // }
  }
};
</script>


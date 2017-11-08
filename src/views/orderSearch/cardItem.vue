<!--**
  *@info 订单查询模块-开卡订单子模块
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<template>
  <div id="search" :class="{active:off.details}">
  	<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
  	<!--查询-->
  	<section v-if="!off.details">
  	<div class="g-search-form">
		<!--<div class="m-tag"><b></b>系统类型</div>-->
		<!--基础条件-->
		<!--<section class="form-c">
			<div class="row">
				<span class="dp">系统名称：</span>
				<div class="m-form-radio">
					 <label><span class="radio"><input type="radio" value="0" v-model="form.source"><span></span></span><span class="text">远盟</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.source"><span></span></span><span class="text">远易站</span></label>
					<label><span class="radio"><input type="radio" value="6" v-model="form.source" checked="checked"><span></span></span><span class="text">卡盟</span></label>
					<label><span class="radio"><input type="radio" value="3" v-model="form.source"><span></span></span><span class="text">远微商城</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.source"><span></span></span><span class="text">信时空</span></label>
					<label><span class="radio"><input type="radio" value="4" v-model="form.source"><span></span></span><span class="text">网厅</span></label>
				</div>
			</div>

		</section>-->
		<div class="m-tag"><b></b>订单查询</div>
		<section class="form-c">
			<div class="row clr m-col-2">
				<span class="dp col-l">订单号码：</span>
				<div class="col-r m-input-button"><input v-model="form.context1" maxlength="32" type="tel" placeholder="请输入查询的订单号码"><button @click="searchList('order')">查询</button></div>
			</div>
		</section>
		<div class="m-tag"><b></b>条件查询</div>
		<section class="form-c">
			<div class="row">
				<span class="dp">操作类型：</span>
				<div class="m-form-radio">
					<!-- <label><span class="checkbox"><input value="1" type="checkbox" v-model="form.orderType"><span></span></span><span class="text">成卡</span></label>
					<label><span class="checkbox"><input value="2" type="checkbox" v-model="form.orderType"><span></span></span><span class="text">白卡</span></label>
					<label><span class="checkbox"><input value="4" type="checkbox" v-model="form.orderType"><span></span></span><span class="text">实名补录</span></label>
					<label><span class="checkbox"><input value="5" type="checkbox" v-model="form.orderType"><span></span></span><span class="text">实名登记</span></label> -->
					<label><span class="radio"><input value="6" type="radio" v-model="form.orderType"><span></span></span><span class="text">空卡</span></label>
					<label><span class="radio"><input value="7" type="radio" v-model="form.orderType"><span></span></span><span class="text">过户办理</span></label>
				</div>
			</div>
			<div class="row">
				<span class="dp">运营商：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.cardType"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.cardType"><span></span></span><span class="text">远特</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.cardType"><span></span></span><span class="text">联通</span></label>
				</div>
			</div>
			<div class="row" v-if="off.type==2">
				<span class="dp">订单状态：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.orderStatus"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.orderStatus"><span></span></span><span class="text">同意</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.orderStatus"><span></span></span><span class="text">拒绝</span></label>
					<!-- <label><span class="radio"><input type="radio" value="3" v-model="form.orderStatus"><span></span></span><span class="text">复审同意</span></label> -->
				</div>
			</div>
			<div class="row clr m-col-2" :class="{fullRow:off.type==3||off.type==4}">
				<div class="dp col-l">时间区间：</div>
				<div class="col-r">
					<span class="m-time-area"><input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"></span>
					<span class="m-space">一</span>
					<span class="m-time-area"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
				</div>
			</div>
			<div class="row" v-if="off.type==1||off.type==2">
				<span class="dp">审核方式：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="9" v-model="form.auditType"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="0" v-model="form.auditType"><span></span></span><span class="text">实时审核</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.auditType"><span></span></span><span class="text">事后审核</span></label>
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
			<div class="row" :class="{active:form.select==3}" v-if="off.type==1||off.type==2">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="3" v-model="form.select"><span></span></span><span class="text">审核人ID：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context3" :readonly="form.select!=3" maxlength="11" type="tel" placeholder="请输入查询的审核人号码"></div>
			</div>
			<div class="row" :class="{active:form.select==4}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="4" v-model="form.select"><span></span></span><span class="text">身份证号：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context4" :readonly="form.select!=4" maxlength="18" type="text" placeholder="请输入查询的身份证号码"></div>
			</div>
			<div class="row" :class="{active:form.select==5}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="5" v-model="form.select"><span></span></span><span class="text">操作者ID：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context5" :readonly="form.select!=5" maxlength="12" type="tel" placeholder="请输入查询的操作者ID"></div>
			</div>
			<div class="row" :class="{active:form.select==6}" v-if="off.type==1">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="6" :readonly="form.select!=6" v-model="form.select"><span></span></span><span class="text">订单状态：</span></label>
				</span>
				<div class="m-form-radio col-radio">
					<label><span class="radio"><input type="radio" checked="checked" value="0" v-model="form.orderStatus"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.orderStatus"><span></span></span><span class="text">待分配</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.orderStatus"><span></span></span><span class="text">已分配</span></label>
				</div>
			</div>
			<div class="row" :class="{active:form.select==6}" v-if="off.type==2">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="6" :readonly="form.select!=6" v-model="form.select"><span></span></span><span class="text">号卡状态：</span></label>
				</span>
				<div class="m-form-radio col-radio">
					<label><span class="radio"><input value="0" type="radio" v-model="form.context6"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input value="1" type="radio" v-model="form.context6"><span></span></span><span class="text">成功</span></label>
					<label><span class="radio"><input value="2" type="radio" v-model="form.context6"><span></span></span><span class="text">失败</span></label>
					<label><span class="radio"><input value="3" type="radio" v-model="form.context6"><span></span></span><span class="text">处理中</span></label>
					<label><span class="radio"><input value="4" type="radio" v-model="form.context6"><span></span></span><span class="text">关闭</span></label>
				</div>
			</div>
			<div class="row fullRow" :class="{active:form.select==6}" v-if="off.type==3||off.type==4">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="6" :readonly="form.select!=6" v-model="form.select"><span></span></span><span class="text">订单状态：</span></label>
				</span>
				<div class="m-form-radio col-radio">
					<label><span class="radio"><input value="0" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input value="1" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">已选号</span></label>
					<label><span class="radio"><input value="2" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">已选套餐</span></label>
					<label><span class="radio"><input value="3" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">已上传资料</span></label>
					<label><span class="radio"><input value="4" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">已支付</span></label>
					<!-- <label><span class="radio"><input value="5" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">已审核</span></label> -->
					<label><span class="radio"><input value="6" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">已开户申请</span></label>
					<label><span class="radio"><input value="7" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">已获取IMSI</span></label>
					<label><span class="radio"><input value="8" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">已开卡申请</span></label>
				</div>
			</div>
			<button class="f-btn f-btn-line" @click="searchList(1)">查询</button>
		</section>
		<!-- <section class="form-c o-detail-form" style="display:none">
			<div class="m-col-select_input clr">
				<div class="m-dropdown-select fl">
					<button class="drop-button" @click="dropSelectButton"><span class="text">{{drop.text}}</span><i class="caret"></i></button>
					<ul class="drop-menu" v-if="drop.off">
						<li :class="{selected:drop.type==2}"><a name="2" @click="dropSelect">手机号码</a></li>
						<li :class="{selected:drop.type==1}"><a name="1" @click="dropSelect">订单号码</a></li>
						<li class="cascarder" v-if="off.type==2">
							<a>开卡状态</a>
							<ul>
								<li :class="{selected:drop.type==79}"><a name="79" @click="dropSelect">全部</a></li>
								<li :class="{selected:drop.type==71}"><a name="71" @click="dropSelect">成功</a></li>
								<li :class="{selected:drop.type==72}"><a name="72" @click="dropSelect">失败</a></li>
							</ul>
						</li>
						<li :class="{selected:drop.type==3}"><a name="3" @click="dropSelect">审核人ID</a></li>
						<li :class="{selected:drop.type==4}"><a name="4" @click="dropSelect">身份证号码</a></li>
						<li :class="{selected:drop.type==6}"><a name="6" @click="dropSelect">操作者ID</a></li>
					</ul>
				</div>
				<input class="fl" type="text" id="context" @keydown="toSearch" v-model="form.context" placeholder="请输入对应参数，键入Enter查询" maxlength="32">
			</div>
		</section> -->
  	</div>
  	<div id="totalDiv" v-if="list">
		<div class="total-head">统计结果<b>{{total}}</b></div>
		<table>
			<thead>
				<tr v-if="off.type==1">
					<th>序号</th>
					<th>订单号</th>
					<th>操作类型</th>
					<th>审核方式</th>
					<th>用户姓名</th>
					<th>用户号码</th>
					<th>号码等级</th>
					<th>身份证号码</th>
					<th>审核姓名</th>
					<th>操作人</th>
					<th>生成时间</th>
					<th>状态修改时间</th>
					<th>状态</th>
					<th></th>
				</tr>
				<tr v-if="off.type==2">
					<th>序号</th>
					<th>订单号</th>
					<th>操作类型</th>
					<th>审核方式</th>
					<th>用户姓名</th>
					<th>用户号码</th>
					<th>号码等级</th>
					<th>身份证号码</th>
					<th>审核姓名</th>
					<th>操作人</th>
					<th>生成时间</th>
					<th>状态修改时间</th>
					<th>审核用时</th>
					<th>号卡状态</th>
					<th>审核状态</th>
					<th></th>
				</tr>
				<tr v-if="off.type==3||off.type==4">
					<th>序号</th>
					<th>订单号</th>
					<th>操作类型</th>
					<th>审核方式</th>
					<th>用户姓名</th>
					<th>用户号码</th>
					<th>号码等级</th>
					<th>身份证号码</th>
					<th>操作者姓名</th>
					<th>操作者ID</th>
					<th>生成时间</th>
					<th v-if="off.type==4">关闭时间</th>
					<th>订单状态</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<!--待审核-->
				<tr v-if="off.type==1" v-for="(todo,index) in list">
					<td>{{((pageNum-1)*10+(index+1))}}</td>
					<td>{{todo.orderId}}</td>
					<td>{{translateData(1,todo.type)}}</td>
					<td v-if="todo.auditType==0">实时审核</td>
					<td v-if="todo.auditType==1">事后审核</td>
					<td>{{todo.userName}}</td>
					<td>{{todo.phoneNumber}}</td>
					<td>{{translateData(5,todo.phoneLevel)}}</td>
					<td>{{todo.identityCard}}</td>
					<td>{{todo.customerName}}</td>
					<td>{{todo.operator}}<br/><b class="f-m-lighter">({{todo.operatorName}})</b></td>
					<td>{{todo.createTime?getDateTime(todo.createTime)[6]:''}}</td>
					<td>{{todo.createTime?getDateTime(todo.modifyTime)[6]:''}}</td>
					<td v-if="todo.status==1"><b class="f-c-red">待分配</b></td>
					<td v-if="todo.status==2"><b class="f-c-green">已分配</b></td>
					<td><a :name="todo.orderId" @click="details" href="javascript:void(0)" class="details">详情</a></td>
				</tr>
				<!--已审核-->
				<tr v-if="off.type==2" v-for="(todo,index) in list">
					<td>{{((pageNum-1)*10+(index+1))}}</td>
					<td>{{todo.orderId}}</td>
					<td>{{translateData(1,todo.type)}}</td>
					<td v-if="todo.auditType==0">实时审核</td>
					<td v-if="todo.auditType==1">事后审核</td>
					<td>{{todo.userName}}</td>
					<td>{{todo.phoneNumber}}</td>
					<td>{{translateData(5,todo.phoneLevel)}}</td>
					<td>{{todo.identityCard}}</td>
					<td>{{todo.customerName}}</td>
					<td>{{todo.operator}}<br/><b class="f-m-lighter">({{todo.operatorName}})</b></td>
					<td>{{todo.createTime?getDateTime(todo.createTime)[6]:''}}</td>
					<td>{{todo.createTime?getDateTime(todo.modifyTime)[6]:''}}</td>
					<td>{{translateData(6,todo.auditTime)}}</td>
					<td :class="{fCYellow:todo.cardStatus==1,fCGreen:todo.cardStatus==2,fCRed:todo.cardStatus==3,fCRed:todo.cardStatus==4,fCGrey:todo.cardStatus==9}">{{translateData(4,todo.cardStatus)}}</td>
					<td colspan="2" v-if="todo.status==1" class="td-col-2">
						<div class="f-c-green">同意</div>
						<div><a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">详情</a></div>
					</td>
					<td colspan="2" v-if="todo.status==2" class="td-col-2">
						<div class="f-c-red">拒绝</div>
						<div>
							<a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">详情</a>
							<!-- <br>
							<a v-if="todo.allowRecheck==1" :name="todo.orderId" :title="index" @click="agree" class="agree f-mgt-10" href="javascript:void(0)">同意</a> -->
							<span v-if="todo.allowRecheck==2" class="time_out f-c-red">超过复审时间</span>
						</div>
					</td>
					<td colspan="2" v-if="todo.status==3" class="td-col-2">
						<div class="f-c-red">超时关闭</div>
						<div><a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">详情</a></div>
					</td>
					<td colspan="2" v-if="todo.status==4" class="td-col-2">
						<div class="f-c-blue">复审同意</div>
						<div><a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">详情</a></div>
					</td>
				</tr>
				<!--进行中,已关闭-->
				<tr v-if="off.type==3||off.type==4" v-for="(todo,index) in list">
					<td>{{((pageNum-1)*10+(index+1))}}</td>
					<td>{{todo.orderId}}</td>
					<td>{{translateData(1,todo.type)}}</td>
					<td>
						<span v-if="todo.auditType=='0'">实时审核</span>
						<span v-else-if="todo.auditType==1">事后审核</span>
						<span v-else>--</span>
					</td>
					<td>{{todo.userName}}</td>
					<td>{{todo.phoneNumber}}</td>
					<td>{{translateData(5,todo.phoneLevel)}}</td>
					<td>{{todo.identityCard}}</td>
					<td>{{todo.operatorName}}</td>
					<td>{{todo.operatorId}}</td>
					<td>{{todo.createTime?getDateTime(todo.createTime)[6]:''}}</td>
					<td v-if="off.type==4">{{todo.createTime?getDateTime(todo.modifyTime)[6]:''}}</td>
					<td>{{translateData(7,todo.statusDetail)}}</td>
					<td><a :name="todo.orderId" @click="details" href="javascript:void(0)" class="details">详情</a></td>
				</tr>
			</tbody>
		</table>
		<my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
	</div>
	</section>
	<!--详情-->
	<list-details :list="detailsData" :type="off.type" v-if="off.details" :number="off.number">

	</list-details>
  </div>
</template>
<script>
require("../../assets/js/laydate/laydate.js");
require("../../assets/js/laydate/skins/default/laydate.css");
import pagination from "../../components/Page.vue";
import details from "../../components/cardOrderDetails.vue";
export default{
	name:'cardOrderSearch',
	data (){
		return {
			off:{
				type:1,//1，待审核;2，已审核;3，进行中;4，已关闭
				isLoad:0,//加载条
				details:0,//详情页面开关
				number:'',//第几条详情
			},
			form:{
				source:6,//系统名称
				orderType:6,//操作类型
				cardType:0,//运营商
				orderStatus:0,//订单状态
				auditType:9,//审核方式
				context1:'',//订单号码
				context2:'',//手机号码
				context3:'',//审核人ID
				context4:'',//身份证号
				context5:'',// 操作者ID
				context6:0,//type=1，订单状态；type=2，开卡状态
				startTime:'',
				endTime:'',
				select:6//条件查询，选择的条件
			},
			// drop:{//下拉控制
			// 	text:'订单号码',
			// 	type:1,
			// 	off:0
			// },
			list:'',//查询数据
			detailsData:'',//详情数据
			total:0,//总查询条数
			pageNum:1,//当前页数
			pageSize:10,//显示条数
			maxpage:1,//最大页数
			callback:Function//page组件点击回调
		}
	},
	components:{
		'my-page':pagination,
		'list-details':details
	},
	created:function(){
		this.init()
	},
	methods:{
		init:function(){
			var vm=this,type=this.$route.params.type;
			type=='auditing' ? vm.off.type=1 : type=='audited' ? vm.off.type=2 : type=='closed' ? vm.off.type=4 : vm.off.type=3;
			vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
			vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
			// vm.off.type==1 ? vm.form.select=6 : vm.form.select=7;
			// document.attachEvent ? document.body.attachEvent("onclick",function(event){
			// 	vm.drop.off=false;
			// 	window.event.cacenlBubble=false;
			// }) : document.body.addEventListener("click", function(event) {
			// 	vm.drop.off=false;
			// 	event.stopPropagation();
			// },false);
			//
			//
		},
		searchList:function(index,page){
			var vm=this,url,json={"source":vm.form.source,"type":vm.form.orderType,"pageSize":vm.pageSize,"pageNum":page||1,"startTime":vm.form.startTime,"endTime":vm.form.endTime,"status":vm.form.orderStatus,'auditType':vm.form.auditType,"cardType":vm.form.cardType};

			//进行中，已关闭
			if(vm.off.type==3||vm.off.type==4){
				vm.searchClosedAndDoing(index,page);
				return false;
			}

			//待审核和已审核
			if(index=='order'){
				if(!vm.form.context1){
					layer.open({
			            content:'请输入订单号码',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}
				json.context=vm.form.context1;
				json.searchtype=1;
			}else if(index==1){
				let context=vm.form['context'+vm.form.select];
				vm.off.type==1&&vm.form.select!=6&&(json.status=0,vm.form.orderStatus=0);
				if(vm.form.select==2&&(!context)){
					layer.open({
			            content:'请输入手机号码',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}else if(vm.form.select==2&&context.length!=11){
					layer.open({
			            content:'手机号码格式错误',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}else if(vm.form.select==3&&(!context)){
					layer.open({
			            content:'请输入审核人ID',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}else if(vm.form.select==4&&(!context)){
					layer.open({
			            content:'请输入身份证号',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}else if(vm.form.select==5&&(!context)){
					layer.open({
			            content:'请输入操作者ID',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}
				json.context=context;
				json.searchtype=vm.form.select;
			}
			if(!json.type){
				layer.open({
		            content:'请选择操作类型',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			vm.off.type==1 ? url='w/audit/ingList' : url='w/audit/edList';
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			vm.AJAX(url,json,function(data){
				vm.list=data.data.list
				vm.total=data.data.total;
				vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
				vm.pageNum=page||1;
				vm.callback=function(v){vm.searchList(index,v)};
			},function(){
				vm.off.isLoad=false;
			})
		},
		searchClosedAndDoing:function(index,page){//进行中,已关闭
			var vm=this,url,json={"source":vm.form.source,"type":vm.form.orderType,"pageSize":vm.pageSize,"pageNum":page||1,"startTime":vm.form.startTime,"endTime":vm.form.endTime,"status":vm.off.type,"statusDetail":vm.form.orderStatus,"cardType":vm.form.cardType};


			if(index=='order'){
				if(!vm.form.context1){
					layer.open({
			            content:'请输入订单号码',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}
				json.context=vm.form.context1;
				json.searchtype=1;
			}else if(index==1){
				let context=vm.form['context'+vm.form.select];
				if(vm.form.select==2&&(!context)){
					layer.open({
			            content:'请输入手机号码',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}else if(vm.form.select==2&&context.length!=11){
					layer.open({
			            content:'手机号码格式错误',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}else if(vm.form.select==4&&(!context)){
					layer.open({
			            content:'请输入身份证号',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}else if(vm.form.select==5&&(!context)){
					layer.open({
			            content:'请输入操作者ID',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}
				json.context=context;
				json.searchtype=vm.form.select;
			}
			if(!json.type){
				layer.open({
		            content:'请选择操作类型',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}

			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			vm.AJAX('w/audit/getOrderList',json,function(data){
				vm.list=data.data.list;
				vm.total=data.data.total;
				vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
				vm.pageNum=page||1;
				vm.callback=function(v){vm.searchClosedAndDoing(index,v)};
			},function(){
				vm.off.isLoad=false;
			})
		},
		agree:function(e){
			var vm=this,url,orderId=e.target.name,number=e.target.title;

			vm.AJAX('w/audit/reAudit',{"orderId":orderId},function(data){
				layer.open({
		            content:'复审成功',
		            skin: 'msg',
		            time: 4,
		            msgSkin:'success',
		        })
				vm.list[number].status=4
				vm.list[number].cardStatus=1
			})
		},
		details:function(e){//详情
			var vm=this,url,orderId=e.target.name;
			vm.off.number=e.target.title;
			vm.off.type==1 ? url='w/audit/ingInfo' : vm.off.type==2 ? url='w/audit/edInfo' : url='w/audit/getOrderInfo';
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			vm.AJAX(url,{"orderId":orderId,'status':vm.off.type},function(data){
				vm.detailsData=data.data;
				vm.off.details=true;
			},function(){
				vm.off.isLoad=false;
			})
		},
		to_laydate:function(v){
			var vm=this;
			laydate({
				istime:true,
				format: 'YYYY-MM-DD hh:mm:ss',
				isclear: false,
				choose: function(dates){ //选择好日期的回调
					v==1 ? vm.form.startTime=dates : vm.form.endTime=dates;
				}
			});
		},
		toSearch:function(e){
			e.keyCode==13&&this.searchList(2);
		},
		translateData:function(type,v) {
			v=parseInt(v);
			switch(type){
				case 1://操作类型
						return v==1 ? '开成卡' : v==2 ? '开白卡' : v==4 ? '实名补录' : v==7 ? '过户办理' : v==5 ? '实名登记' : v==6 ? '空卡' : void 0;
					break;
				case 2://证件类型
						return v==1 ? '身份证' : v==2 ? '军官证' : v==3 ? '护照' :void 0;
					break;
				case 3://已审核，订单状态

					break;
				case 4://开卡状态
					return v==1 ? '初始状态' : v==2 ? '成功' : v==3 ? '失败' : v==4 ? '订单关闭' : v==9 ? '--' :void 0;
					break;
				case 5://靓号等级
					var level=["普号","特级","一级","二级","三级","四级","五级","六级","七级","八级","九级","十级","十一级"];
		    		return v||v==0 ? level[parseInt(v)] : '未知';
					break;
				case 6://天数，时分秒
					v=parseInt(v);
				    var day,minute,second,hour;
				    day=Math.floor(v/(60*60*24));
				    hour=Math.floor(v%(60*60*24)/(60*60))
				    minute=Math.floor(v%(60*60)/60)
				    second=Math.floor(v%60)
				    return day>0 ? day+"天"+hour+"时"+minute+"分"+second+"秒" : hour>0? hour+"时"+minute+"分"+second+"秒" : minute>0 ? minute+"分"+second+"秒" : second+"秒";
					break;
				case 7://进行中，已关闭，订单状态
					return v==1 ? '已选号' : v==2 ? '已选套餐' : v==3 ? '已上传资料' : v==4 ? '已支付' : v==5 ? '已审核' : v==6 ? '已开户申请' : v==7 ? '已获取IMSI' : v==8 ? '已开卡申请' : v==0 ? '--' :void 0;
					break;
			}
		},
		getDateTime:function(e) {
		    var t;
		    t = e ? new Date(parseInt(e)) : new Date;
		    var n = t.getFullYear(),
		        a = t.getMonth()+1,
		        r = t.getDate(),
		        o = t.getHours(),
		        i = t.getMinutes(),
		        c = t.getSeconds(),
		        k = [];
		    a >= 10 ? a : a = "0" + a, r >= 10 ? r : r = "0" + r, o >= 10 ? o : o = "0" + o, i >= 10 ? i : i = "0" + i, c >= 10 ? c : c = "0" + c, k[0]=n,k[1]=a,k[2]=r,k[3]=n+'-'+a,k[4]=a+'-'+r,k[5]=o+":"+i+":"+c,k[6]=n + "-" + a + "-" + r + " " + o + ":" + i + ":" + c;
		    return k;
		},
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
}
</script>


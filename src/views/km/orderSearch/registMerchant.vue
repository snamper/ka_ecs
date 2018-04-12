<!--**
  *@info 订单查询模块-激活商户模块
  *@author: thinkmix
  *@date 2017-12-7
* *-->
<template>
<section class="g-search-menu">
  <div id="search" :class="{active:off.details}">
  	<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
  	<!--查询-->
  	<section v-if="!off.details">
  	<div class="g-search-form">
  		<section class="m-top-shift f-tas">
			<div class="box">
				<label class="item" @click="topShiftClick">
					<input type="radio" v-model="form.orderType" value="1"><span class="slider">待审核</span>
				</label>
				<label class="item" @click="topShiftClick">
					<input type="radio" v-model="form.orderType" value="2"><span class="slider">已审核</span>
				</label>
			</div>
		</section>
		<section class="form-c">
			<div class="row">
				<span class="dp">商户类型：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input value="0" type="radio" v-model="form.merchantType"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input value="1" type="radio" v-model="form.merchantType"><span></span></span><span class="text">企业</span></label>
					<label><span class="radio"><input value="2" type="radio" v-model="form.merchantType"><span></span></span><span class="text">个人</span></label>
				</div>
			</div>
			<div class="row">
				<span class="dp">订单状态：</span>
				<div class="m-form-radio" v-show="form.orderType==1">
					<label><span class="radio"><input type="radio" value="0" v-model="form.orderStatus"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="3" v-model="form.orderStatus"><span></span></span><span class="text">待分配</span></label>
					<label><span class="radio"><input type="radio" value="4" v-model="form.orderStatus"><span></span></span><span class="text">已分配</span></label>
				</div>
				<div class="m-form-radio" v-show="form.orderType==2">
					<label><span class="radio"><input type="radio" value="0" v-model="form.orderStatus"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.orderStatus"><span></span></span><span class="text">通过</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.orderStatus"><span></span></span><span class="text">拒绝</span></label>
				</div>
			</div>
			<div class="row">
				<span class="dp">时间区间：</span>
				<div class="f-inline-block">
					<span class="m-time-area">
						<input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly">
					</span>
				</div>
			</div>
			<div class="row">
				<span class="dp">审核方式：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input value="0" type="radio" v-model="form.auditType"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input value="1" type="radio" v-model="form.auditType"><span></span></span><span class="text">实时审核</span></label>
					<label><span class="radio"><input value="2" type="radio" v-model="form.auditType"><span></span></span><span class="text">事后审核</span></label>
					<label><span class="radio"><input value="3" type="radio" v-model="form.auditType"><span></span></span><span class="text">自动审核</span></label>
				</div>
			</div>
		</section>

		<section class="form-c o-no-bgc">
			<div class="row" :class="{active:form.select==1}">
				<span class="m-form-radio">
					<label><span class="radio"><input @click="radioClick" type="radio" value="1" v-model="form.select"><span></span></span><span class="text">订单号码：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context1" :readonly="form.select!=1" maxlength="32" type="tel" placeholder="请输入查询的订单号码"></div>
			</div>
			<div class="row" :class="{active:form.select==2}">
				<span class="m-form-radio">
					<label><span class="radio"><input @click="radioClick" type="radio" value="2" v-model="form.select"><span></span></span><span class="text">申请人号码：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context2" :readonly="form.select!=2" maxlength="11" type="tel" placeholder="请输入查询的申请人号码"></div>
			</div>
			
			<button class="f-btn f-btn-line" @click="searchList()">查询</button>
		</section>
  	</div>
  	<div class="m-total-table" v-if="list">
		<div class="total-head">统计结果<b>{{total}}</b></div>
		<table>
			<thead>
				<tr>
					<th>序号</th>
					<th>订单号</th>
					<th>申请时间</th>
					<th>商户类型</th>
					<th>售卡范围</th>
					<th>申请人号码</th>
					<th>审核方式</th>
					<th>订单状态</th>
					<th>商户名称</th>
					<th>操作人姓名</th>
					<th>审核时间</th>
					<th>审核人</th>
					<th class="hasBtn"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(todo,index) in list">
					<td>{{((pageNum-1)*10+(index+1))}}</td>
					<td>{{todo.orderId}}</td>
					<td>{{getDateTime(todo.createTime)[6]}}</td>
					<td>
						<span v-show="todo.merchantType==1">企业</span>
						<span v-show="todo.merchantType==2">个人</span>
					</td>
					<td>
						<span v-show="todo.openingType==1">远特卡<span v-if="todo.openingArea">({{todo.openingArea}})</span></span>
                        <span v-show="todo.openingType==2">联通卡<span v-if="todo.openingArea">({{todo.openingArea}})</span></span>
                        <span v-show="todo.openingType==3">移动卡<span v-if="todo.openingArea">({{todo.openingArea}})</span></span>
                        <span v-show="todo.openingType==4">电信卡<span v-if="todo.openingArea">({{todo.openingArea}})</span></span>
					</td>
					<td>{{todo.phone}}</td>
					<td>
						<span v-show="todo.auditType==1">实时审核</span>
						<span v-show="todo.auditType==2">事后审核</span>
						<span v-show="todo.auditType==3">自动审核</span>
					</td>
					<td>
						<span v-show="todo.orderStatus==1" class="f-c-green">通过</span>
						<span v-show="todo.orderStatus==2" class="f-c-red">拒绝</span>
						<span v-show="todo.orderStatus==3" class="f-c-yellow">待分配</span>
						<span v-show="todo.orderStatus==4" class="f-c-green">已分配</span>
					</td>
					<td>{{todo.companyName}}</td>
					<td>{{todo.userName}}</td>
					<td>{{getDateTime(todo.auditTime)[6]}}</td>
					<td>{{todo.customer}}</td>
					<td><a :name="todo.orderId" @click="details" href="javascript:void(0)" class="details">详情</a></td>
				</tr>
			</tbody>
		</table>
		<my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
	</div>
	</section>
	<!--详情-->
	<list-details :list="detailsData" v-if="off.details" :orderType="form.orderType">

	</list-details>
  </div>
</section>
</template>
<script>
import {reqCommonMethod} from "../../../config/service.js";  
import pagination from "../../../componentskm/page.vue";
import details from "../../../componentskm/registMerchantOrderDetails.vue";
import { getDateTime,getUnixTime ,errorDeal} from "../../../config/utils.js";
export default{
	data (){
		return {
			off:{
				isLoad:0,//加载条
				details:0,//详情页面开关
			},
			form:{
				auditType:0,//审核方式
				orderType:1,//1,待审核；2，已审核
				merchantType:0,//1,企业；2，个人
				orderStatus:0,//订单状态
				context1:'',//订单号码
				context2:'',//充值号码
				startTime:'',
				endTime:'',
				select:0//条件查询，选择的条件
			},
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
			var vm=this;

			vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
			vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
		},
		radioClick(){
			this.form.select=0;
		},
		searchList:function(page){
			var vm=this,select=vm.form.select,
			   sql="A.create_time BETWEEN "+getUnixTime(vm.form.startTime)+" AND "+getUnixTime(vm.form.endTime)+"",
			  json={"pageSize":vm.pageSize,"pageNum":page||1,"params":[],"opKey":"order.registerMerchant.list"};
			let context=vm.form['context'+vm.form.select];
			if(select==1&&(!context)){
				layer.open({
		            content:'请输入订单号码',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}else if(select==2&&context.length!=11){
				layer.open({
		            content:'申请人号码格式错误',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			if(vm.form.merchantType!=0)sql+=" AND A.merchant_type="+vm.form.merchantType;
			if(vm.form.auditType!=0)sql+=" AND A.audit_type="+vm.form.auditType;

			if(select==1){
				sql+=' AND A.order_id="'+context+'"';
			}else if(select==2){
				sql+=' AND A.request_phone="'+context+'"';
			}
			let orderStatus=vm.form.orderStatus;
			if(vm.form.orderType==1){
				 if(orderStatus==0){
					sql+=" AND (A.order_status=3 OR A.order_status=4)";
				 }else sql+=" AND A.order_status="+orderStatus;
			}else if(vm.form.orderType==2){
				if(orderStatus==0){
					sql+=" AND (A.order_status=1 OR A.order_status=2)";
				}else sql+=" AND A.order_status="+orderStatus;
			}

			json.params.push(sql);
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			// vm.AJAX("w/handler/query",json,function(data){
			// 	vm.list=data.data.list
			// 	vm.total=data.data.total;
			// 	vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
			// 	vm.pageNum=page||1;
			// 	vm.callback=function(v){vm.searchList(v)};
			// },function(){
			// 	vm.off.isLoad=false;
            // })
            reqCommonMethod(json,function(){vm.off.isLoad=false;},"km-ecs/w/handler/query")
            .then((data)=>{
                vm.list=data.data.list
				vm.total=data.data.total;
				vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
				vm.pageNum=page||1;
                vm.callback=function(v){vm.searchList(v)};
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 	
		},
		details:function(e){//详情
			var vm=this,
			orderId=e.target.name,
			json={"pageSize":"10","pageNum":"-1","params":['A.order_id="'+orderId+'"'],"opKey":"order.registerMerchant.details"};
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			// vm.AJAX("w/handler/query",json,function(data){
			// 	vm.detailsData=data.data.list[0];
			// 	vm.off.details=true;
			// },function(){
			// 	vm.off.isLoad=false;
            // })
            reqCommonMethod(json,function(){vm.off.isLoad=false;},"km-ecs/w/handler/query")
            .then((data)=>{
	            vm.detailsData=data.data.list[0];
                vm.off.details=true;
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 	
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
		topShiftClick(){
			var vm=this;
			vm.form.context3=0
		},
		getDateTime(v){
			return getDateTime(v);
		}
	}
}
</script>


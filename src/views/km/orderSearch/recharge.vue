<!--**
  *@info 订单查询模块-充值订单模块
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<template>
<section class="g-search-menu">
  <div id="search" :class="{active:off.details}">
  	<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
  	<!--查询-->
  	<section v-if="!off.details">
  	<div class="g-search-form">
  		<div class="m-tag"><b></b>条件查询</div>
		<section class="form-c">
			<div class="row">
				<span class="dp">充值类型：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input value="1" type="radio" v-model="form.rechargeType"><span></span></span><span class="text">流量</span></label>
					<label><span class="radio"><input value="2" type="radio" v-model="form.rechargeType"><span></span></span><span class="text">话费</span></label>
				</div>
			</div>
			<div class="row">
				<span class="dp"><i class="m-one-font"></i>运营商：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.isp"><span></span></span><span class="text">全部</span></label>
					<label v-show="form.rechargeType==2"><span class="radio"><input type="radio" value="4" v-model="form.isp"><span></span></span><span class="text">远特</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.isp"><span></span></span><span class="text">移动</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.isp"><span></span></span><span class="text">联通</span></label>
					<label><span class="radio"><input type="radio" value="3" v-model="form.isp"><span></span></span><span class="text">电信</span></label>
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
				<span class="dp">支付方式：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.payType"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.payType"><span></span></span><span class="text">远特账户</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.payType"><span></span></span><span class="text">微信</span></label>
					<label><span class="radio"><input type="radio" value="3" v-model="form.payType"><span></span></span><span class="text">支付宝</span></label>
				</div>
			</div>
		</section>

		<section class="form-c o-no-bgc">
			<div class="row" :class="{active:form.select==1}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="1" v-model="form.select"><span></span></span><span class="text">订单号码：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context1" :readonly="form.select!=1" maxlength="32" type="tel" placeholder="请输入查询的订单号码"></div>
			</div>
			<div class="row" :class="{active:form.select==2}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="2" v-model="form.select"><span></span></span><span class="text">充值号码：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context2" :readonly="form.select!=2" maxlength="11" type="tel" placeholder="请输入查询的充值号码"></div>
			</div>
			<div class="row" :class="{active:form.select==3}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="3" v-model="form.select"><span></span></span><span class="text">操作者工号：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context3" :readonly="form.select!=3" maxlength="16" type="tel" placeholder="请输入查询的操作者工号"></div>
			</div>
			<div class="row fullRow" :class="{active:form.select==4}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="4" :readonly="form.select!=4" v-model="form.select"><span></span></span><span class="text">订单状态：</span></label>
				</span>
				<div class="m-form-radio col-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.context4"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.context4"><span></span></span><span class="text">成功</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.context4"><span></span></span><span class="text">失败</span></label>
					<label><span class="radio"><input type="radio" value="3" v-model="form.context4"><span></span></span><span class="text">进行中</span></label>
					<label v-show="form.rechargeType==1"><span class="radio"><input type="radio" value="4" v-model="form.context4"><span></span></span><span class="text">已关闭</span></label>
				</div>
			</div>
			<button class="f-btn f-btn-line" @click="searchList()">查询</button>
		</section>
  	</div>
  	<div class="m-total-table" v-if="list">
		<div class="total-head clr">
			<span>统计结果<b>{{total}}</b></span>
			<span>总价格:<b class="bg-purple">{{ sumPrice }}</b></span>
			<button class="btn_export_excel" v-if="maxpage"  @click="downLoadList">导出excel</button>
		</div>
		<table>
			<thead>
				<tr>
					<th>序号</th>
					<th>订单号</th>
					<th>充值号码</th>
					<th>充值面额</th>
					<th>运营商</th>
					<th>支付方式</th>
					<th>充值时间</th>
					<th>操作人</th>
					<th>订单状态</th>
					<th class="hasBtn"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(todo,index) in list">
					<td>{{((pageNum-1)*10+(index+1))}}</td>
					<td>{{todo.orderId}}</td>
					<td>{{todo.phone}}</td>
					<td>
						<span v-show="todo.rechargeType==2">{{parseFloat(todo.money)/100}}</span>
						<span v-show="todo.rechargeType==1">{{todo.flowNum+todo.flowUnit}}</span>
					</td>
					<td>
						<span v-show="todo.isp==1">移动</span>
						<span v-show="todo.isp==2">联通</span>
						<span v-show="todo.isp==3">电信</span>
						<span v-show="todo.isp==4">远特</span>
					</td>
					<td>
						<span v-show="todo.payType==1" class="u-icon-yuantelrecharge"></span>
						<span v-show="todo.payType==2" class="u-icon-wechat"></span>
						<span v-show="todo.payType==3" class="u-icon-alipay"></span>
					</td>
					<td>{{getDateTime(todo.rechargeTime)[6]}}</td>
					<td>{{todo.userId}}<br/>（{{todo.userName}}）</td>
					<td v-if="todo.rechargeType==1">
						<span v-show="todo.orderStatus==1||todo.orderStatus==3" class="f-c-yellow">进行中</span>
						<span v-show="todo.orderStatus==2||todo.orderStatus==4" class="f-c-red">失败</span>
						<span v-show="todo.orderStatus==5" class="f-c-green">成功</span>
						<span v-show="todo.orderStatus==6" class="f-c-red">已关闭</span>
					</td>
					<td v-if="todo.rechargeType==2">
						<span v-show="todo.orderStatus==0" class="f-c-yellow">进行中</span>
						<span v-show="todo.orderStatus==2" class="f-c-red">失败</span>
						<span v-show="todo.orderStatus==1" class="f-c-green">成功</span>
					</td>
					<td><a :name="todo.orderId" @click="details" href="javascript:void(0)" class="details">详情</a></td>
				</tr>
			</tbody>
		</table>
		<my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
	</div>
	</section>
	<!--详情-->
	<list-details :list="detailsData" v-if="off.details" :number="off.number">

	</list-details>
  </div>
</section>
</template>
<script>
import {reqCommonMethod} from "../../../config/service.js";
import pagination from "../../../componentskm/page.vue";
import details from "../../../componentskm/rechargeOrderDetails.vue";
import { getDateTime,getUnixTime ,errorDeal,createDownload,getStore} from "../../../config/utils.js";
export default{
	data (){
		return {
			off:{
				isLoad:0,//加载条
				details:0,//详情页面开关
				number:'',//第几条详情
			},
			form:{
				isp:0,//运营商
				rechargeType:1,//操作类型
				payType:0,//支付方式
				context1:'',//订单号码
				context2:'',//充值号码
				context3:'',//操作者工号
				context4:0,//订单状态
				startTime:'',
				endTime:'',
				select:4//条件查询，选择的条件
			},
			list:'',//查询数据
			detailsData:'',//详情数据
			total:0,//总查询条数
			sumPrice:0,//总价格
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
		getForm(page){
			var vm=this,select=vm.form.select,
			   sql="A.create_time BETWEEN "+getUnixTime(vm.form.startTime)+" AND "+getUnixTime(vm.form.endTime)+"",
			  json={"pageSize":vm.pageSize,"pageNum":page||1,"params":[]};
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
		            content:'手机号码格式错误',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}else if(select==3&&(!context)){
				layer.open({
		            content:'请输入操作者工号',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}

			if(select==1){
				sql+=' AND A.sys_order_id="'+context+'"';
			}else if(select==2){
				sql+=' AND A.info_phone="'+context+'"';
			}else if(select==3){
				sql+=' AND A.user_id="'+context+'"';
			}else if(select==4&&context!=0){
				if(vm.form.rechargeType==1){
					if(context==1){
						sql+=" AND A.order_status=5";
					}else if(context==2){
						sql+=" AND (A.order_status=2 OR A.order_status=4)";
					}else if(context==3){
						sql+=" AND (A.order_status=1 OR A.order_status=3)";
					}else if(context==4){
						sql+=" AND A.order_status=6";
					}
				}else if(vm.form.rechargeType==2){
					if(context==3)context=0;
					sql+=" AND A.recharge_status="+context;
				}
				
			}

			if(vm.form.payType!=0){
				sql+=" AND A.pay_type="+vm.form.payType;
			}

			if(vm.form.rechargeType==1){//流量
				json.opKey="order.rechargeFlow.list";
				if(vm.form.isp!=0){
					sql+=" AND A.info_isp="+vm.form.isp;
				}
				json.sum='A.info_price';
			}else if(vm.form.rechargeType==2){
				json.opKey="order.rechargePhone.list";
				if(vm.form.isp!=0){
					sql+=" AND A.isp="+vm.form.isp;
				}
				json.sum='A.info_fee';
			}
			json.params.push(sql);
			return json;
		},
		searchList:function(page){
			const vm=this;
			let json=vm.getForm(page);
			if(!json)return false;

			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
            reqCommonMethod(json,function(){vm.off.isLoad=false;},"km-ecs/w/handler/query")
            .then((data)=>{
              	vm.list=data.data.list
				vm.total=data.data.total;
				vm.sumPrice=(parseFloat(data.data.sum)/100).toFixed(2);
				vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
				vm.pageNum=page||1;
                vm.callback=function(v){vm.searchList(v)};
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error));
		},
		// 导出查询结果excel
		downLoadList:function(){
			const vm=this;
			let json=vm.getForm();
			if(!json)return false;
			if(vm.form.rechargeType==1)json.exportType=2;
			if(vm.form.rechargeType==2)json.exportType=1;
			json.pageNum="-1";
			let userInfo = getStore("KA_ECS_USER");
			json.customerId = userInfo.customerId;
			json.codeId = userInfo.codeId;;

			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			createDownload('km-ecs/w/handler/queryExport',BASE64.encode(JSON.stringify(json)),  function(){
		        vm.off.isLoad=false;
	      	});
		},
		details:function(e){//详情
			var vm=this,
			orderId=e.target.name,
			json={"pageSize":"10","pageNum":"-1","params":['A.sys_order_id="'+orderId+'"']};
			if(vm.form.rechargeType==1){
				json.opKey="order.rechargeFlow.details";
			}else if(vm.form.rechargeType==2){
				json.opKey="order.rechargePhone.details";
			}
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			// vm.AJAX("w/handler/query",json,function(data){
			// 	vm.detailsData=data.data.list[0];
			// 	vm.off.details=true;
			// },function(){
            //     vm.off.isLoad=false;
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
			vm.list='';
		},
		getDateTime(v){
			return getDateTime(v);
		}
	}
}
</script>


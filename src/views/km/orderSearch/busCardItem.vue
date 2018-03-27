<!--**
  *@info 订单查询模块-公交一卡通订单子模块
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<style scoped>
  .o-col-2-input{width: 80%;margin:0;}
  .o-col-2-input>.col-r{margin-left: 0;}
  .o-col-2-input>.col-r>input{border-radius:0;}
  @media screen and (max-width: 640px){
  	.o-col-2-input{width: 60%;}
  }
</style>
<template>
  <div id="search" :class="{active:off.details}">
  	<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
  	<!--查询-->
  	<section v-if="!off.details">
  	<div class="g-search-form">
		
		<div class="m-tag" v-if="off.type==1"><b></b>订单查询</div>
		<section class="form-c o-detail-form" v-if="off.type==1">
			<div class="m-col-select_input clr">
				<div class="m-dropdown-select fl">
					<button class="drop-button" @click="dropSelectButton"><span class="text">{{drop.text}}</span><i class="caret"></i></button>
					<ul class="drop-menu" v-if="drop.off">
						<li :class="{selected:drop.type==1}"><a name="1" @click="dropSelect">充值订单号</a></li>
						<li :class="{selected:drop.type==2}"><a name="2" @click="dropSelect">支付流水号</a></li>
						<li :class="{selected:drop.type==3}"><a name="3" @click="dropSelect">公交平台订单号</a></li>
						<!-- <li class="cascarder" v-if="off.type==2">
							<a>开卡状态</a>
							<ul>
								<li :class="{selected:drop.type==79}"><a name="79" @click="dropSelect">全部</a></li>
								<li :class="{selected:drop.type==71}"><a name="71" @click="dropSelect">成功</a></li>
								<li :class="{selected:drop.type==72}"><a name="72" @click="dropSelect">失败</a></li>
							</ul>
						</li> -->
					</ul>
				</div>
				<div class="row fl m-col-2 o-col-2-input">
					<div class="col-r m-input-button"><input v-model="form.content1" maxlength="32" type="text" placeholder="请输入查询的订单号码"><button @click="searchRechargeList(1)">查询</button></div>
				</div>
			</div>
		</section>
		<div class="m-tag"><b></b>条件查询</div>
		<section class="form-c">	
			<div class="row fullRow clr m-col-2">
				<div class="dp col-l">时间区间：</div>
				<div class="col-r">
					<span class="m-time-area"><input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"></span>
					<span class="m-space">一</span>
					<span class="m-time-area"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
				</div>
			</div>
		</section>
		<!--充值订单查询条件-->
		<section class="form-c o-no-bgc" v-if="off.type==1">
			<div class="row" :class="{active:form.select==4}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="4" v-model="form.select"><span></span></span><span class="text">操作者工号：</span></label>
				</span>
				<div class="input-box"><input v-model="form.content4" :readonly="form.select!=4" maxlength="11" type="tel" placeholder="请输入查询的操作者工号"></div>
			</div>
			<div class="row" :class="{active:form.select==5}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="5" v-model="form.select"><span></span></span><span class="text">公交卡卡号：</span></label>
				</span>
				<div class="input-box"><input v-model="form.content5" :readonly="form.select!=5" maxlength="16" type="text" placeholder="请输入查询的公交卡卡号"></div>
			</div>
			<div class="row fullRow" :class="{active:form.select==6}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="6" :readonly="form.select!=6" v-model="form.select"><span></span></span><span class="text">订单状态：</span></label>
				</span>
				<div class="m-form-radio col-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.orderStatus"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.orderStatus"><span></span></span><span class="text">未支付</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.orderStatus"><span></span></span><span class="text">充值中</span></label>
					<label><span class="radio"><input type="radio" value="3" v-model="form.orderStatus"><span></span></span><span class="text">充值未完成</span></label>
					<label><span class="radio"><input type="radio" value="4" v-model="form.orderStatus"><span></span></span><span class="text">未付款已取消</span></label>
					<label><span class="radio"><input type="radio" value="5" v-model="form.orderStatus"><span></span></span><span class="text">充值成功</span></label>
					<label><span class="radio"><input type="radio" value="6" v-model="form.orderStatus"><span></span></span><span class="text">已退款</span></label>
				</div>
			</div>
			<button class="f-btn f-btn-line" @click="searchRechargeList(2)">查询</button>
		</section>
		<!--交易信息查询条件-->
		<section class="form-c o-no-bgc" v-if="off.type==2">
			<div class="row" :class="{active:form.select==1}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="1" v-model="form.select"><span></span></span><span class="text">公交卡卡号：</span></label>
				</span>
				<div class="input-box"><input v-model="form.content1" :readonly="form.select!=1" maxlength="11" type="tel" placeholder="请输入查询的公交卡卡号"></div>
			</div>
			<div class="row fullRow" :class="{active:form.select==2}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="2" :readonly="form.select!=2" v-model="form.select"><span></span></span><span class="text">交易途径：</span></label>
				</span>
				<div class="m-form-radio col-radio">
					<!-- <label><span class="radio"><input type="radio" value="0" v-model="form.tradeType"><span></span></span><span class="text">全部</span></label>
 -->					<label><span class="radio"><input type="radio" value="1" v-model="form.tradeType"><span></span></span><span class="text">公交</span></label>
					<!-- <label><span class="radio"><input type="radio" value="2" v-model="form.tradeType"><span></span></span><span class="text">地铁</span></label>
					<label><span class="radio"><input type="radio" value="3" v-model="form.tradeType"><span></span></span><span class="text">其它商户</span></label> -->
				</div>
			</div>
			<button class="f-btn f-btn-line" @click="searchExchangeList()">查询</button>
		</section>
  	</div>
  	<div class="m-total-table" v-if="list">
		<div class="total-head">统计结果<b>{{total}}</b></div>
		<table>
			<thead>
				<tr v-if="off.type==1">
					<th>序号</th>
					<th>充值订单号</th>
					<th>公交卡号</th>
					<th>充值金额</th>
					<th>支付途径</th>
					<th>操作者姓名</th>
					<th>操作者工号</th>
					<th>生成时间</th>
					<th>订单状态</th>
					<th class="hasBtn"></th>
				</tr>
				<tr v-if="off.type==2">
					<th>序号</th>
					<th>交易时间</th>
					<th>流水单号</th>
					<th>交易金额</th>
					<th>交易途径</th>
				</tr>
			</thead>
			<tbody>
				<!--充值订单-->
				<tr v-if="off.type==1" v-for="(todo,index) in list">
					<td>{{ (pageIndex-1)*pageSize+(index+1) }}</td>
					<td>{{ todo.sysOrderId }}</td>
					<td>{{ todo.busCardNo }}</td>
					<td>{{ (parseFloat(todo.tradeFee)/100).toFixed(2) }}元</td>
					<td>
						<span v-if="todo.payChannel==1" class="f-c-purple">远特支付</span>
						<span v-if="todo.payChannel==2" class="f-c-green">微信</span>
						<span v-if="todo.payChannel==3" class="f-c-blue">支付宝</span>
					</td>
					<td>{{ todo.username }}</td>
					<td>{{ todo.workNo }}</td>
					<td>{{ getDateTime(todo.createTime)[6] }}</td>
					<td>
						<span v-if="todo.orderStatus==1" class="f-c-purple">初始状态</span>
						<span v-if="todo.orderStatus==2" class="f-c-yellow">待支付</span>
						<span v-if="todo.orderStatus==3" class="f-c-green">支付成功</span>
						<span v-if="todo.orderStatus==4" class="f-c-green">充值成功</span>
						<span v-if="todo.orderStatus==5" class="f-c-red">充值失败</span>
						<span v-if="todo.orderStatus==6" class="f-c-red">退款订单关闭</span>
						<span v-if="todo.orderStatus==7" class="f-c-red">订单未支付超时关闭</span>
						<span v-if="todo.orderStatus==8" class="f-c-red">用户放弃订单关闭</span>
						<span v-if="todo.orderStatus==9" class="f-c-red">支付失败订单关闭</span>
					</td>
					<td><a :name="todo.sysOrderId" @click="details" href="javascript:void(0)" class="details">详情</a></td>
				</tr>
				<!--交易信息-->
				<tr v-if="off.type==2" v-for="(todo,index) in list">
					<td>{{ (pageIndex-1)*pageSize+(index+1) }}</td>
					<td>{{ getDateTime(todo.time)[6] }}</td>
					<td>{{ todo.transactionId }}</td>
					<td>{{ (parseFloat(todo.tradeFee)/100).toFixed(2) }}</td>
					<td>
						<span v-if="todo.tradeType==1" class="f-c-purple">公交</span>
						<span v-else>{{ tradeType }}</span>
					</td>
				</tr>
			</tbody>
		</table>
		<my-page :page="pageIndex" :maxpage="maxpage" :callback="callback"></my-page>
	</div>
	</section>
	<!--详情-->
	<list-details :list="detailsData" :type="off.type" v-if="off.details" :number="off.number">
	
	</list-details>
  </div>
</template>
<script>
import {reqCommonMethod} from "../../../config/service.js"; 
import {errorDeal} from "../../../config/utils";  
import pagination from "../../../componentskm/page.vue";
import details from "../../../componentskm/cardOrderDetails.vue";
import { getDateTime,getUnixTime } from "../../../config/utils.js";
export default{
	data (){
		return {
			off:{
				type:1,//1，充值订单；2，交易信息
				isLoad:0,//加载条
				details:0,//详情页面开关
			},
			form:{
				orderStatus:0,//订单状态
				tradeType:1,//交易途径
				content1:'',//订单号码
				content4:'',//操作者工号
				content5:'',//公交卡卡号
				startTime:'',
				endTime:'',
				select:6,//条件查询，选择的条件
				lastIndex:0,
			},
			drop:{//下拉控制
				text:'充值订单号',
				type:1,
				off:0
			},
			list:'',//列表数据
			detailsData:'',//详情数据
			total:0,//总查询条数
			pageIndex:1,//当前页数
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
		this.init();
	},
	methods:{
		init:function(){
			var vm=this,type=this.$route.params.type;
			type=='rechargeOrder' ? vm.off.type=1 : vm.off.type=2;

			vm.off.type==1 ? vm.form.select=6 :  vm.form.select=2;

			vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
			vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
			document.attachEvent ? document.body.attachEvent("onclick",function(event){
				vm.drop.off=false;
				window.event.cacenlBubble=false;
			}) : document.body.addEventListener("click", function(event) {
				vm.drop.off=false;
				event.stopPropagation();
			},false);
			
			
		},
		searchRechargeList(index,page){//充值订单
			var vm=this,url,json={"pageSize":vm.pageSize,"pageIndex":page||1,"startTime":getUnixTime(vm.form.startTime),"lastIndex":vm.form.lastIndex,"endTime":getUnixTime(vm.form.endTime),"orderStatus":vm.form.orderStatus,'searchType':vm.form.searchType};
			if(index==1){
				if(!vm.form.content1){
					layer.open({
			            content:'请输入订单号码',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}
				json.content=vm.form.content1;
				json.searchType=vm.drop.type;
			}else if(index==2){
				let content=vm.form['content'+vm.form.select]||'';
				if(vm.form.select==4&&!content){
					layer.open({
			            content:'请输入操作者工号',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}else if(vm.form.select==5&&!content){
					layer.open({
			            content:'请输入查询的公交卡卡号',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
			        return false;
				}
				json.content=content;
				json.searchType=vm.form.select;
			}
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			//vm.AJAX("w/audit/rechQuery",json,function(data){vm.list=data.data.list;vm.total=data.data.total;vm.form.lastIndex=data.data.list.pop().id;vm.maxpage=Math.ceil(parseInt(data.data.total)/10);vm.pageIndex=page||1;vm.callback=function(v){vm.searchRechargeList(index,v)}},function(){vm.off.isLoad=false});
            reqCommonMethod(json,function(){vm.off.isLoad=false;},"km-ecs/w/audit/rechQuery")
            .then((data)=>{
                vm.list=data.data.list;
				vm.total=data.data.total;
				vm.form.lastIndex=data.data.list.pop().id;
				vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
				vm.pageIndex=page||1;
                vm.callback=function(v){vm.searchRechargeList(index,v)};
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 	
		},
		searchExchangeList(page){//交易信息查询
			var vm=this,url,json={"pageSize":vm.pageSize,"pageIndex":page||1,"startTime":vm.getUnixTime(vm.form.startTime),"lastIndex":vm.form.lastIndex,"endTime":vm.getUnixTime(vm.form.endTime),"tradeType":vm.form.tradeType,'searchType':vm.form.searchType};
			let content=vm.form['content'+vm.form.select]||'';
			if(vm.form.select==1&&!content){
				layer.open({
		            content:'请输入查询的公交卡卡号',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			json.content=content;
			json.searchType=vm.form.select;
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			//vm.AJAX("w/bus/tradeQuery",json,function(data){vm.list=data.data.list;vm.total=data.data.total;vm.form.lastIndex=data.data.list.pop().id;vm.maxpage=Math.ceil(parseInt(data.data.total)/10);vm.pageIndex=page||1;vm.callback=function(v){vm.searchExchangeList(v)}},function(){vm.off.isLoad=false});
            reqCommonMethod(json,function(){vm.off.isLoad=false;},"km-ecs/w/bus/tradeQuery")
            .then((data)=>{
                vm.list=data.data.list;
				vm.total=data.data.total;
				vm.form.lastIndex=data.data.list.pop().id;
				vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
				vm.pageIndex=page||1;
                vm.callback=function(v){vm.searchExchangeList(v)};
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 	            
		},
		details:function(e){//详情
			var vm=this,url,sysOrderId=e.target.name;
			vm.off.number=e.target.title;
			
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			//vm.AJAX("w/bus/rechInfo",{"sysOrderId":sysOrderId},function(data){vm.detailsData=data.data;vm.off.details=true},function(){vm.off.isLoad=false});
            reqCommonMethod({"sysOrderId":sysOrderId},function(){vm.off.isLoad=false;},"km-ecs/w/bus/rechInfo")
            .then((data)=>{
                vm.detailsData=data.data;
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
		dropSelectButton:function(e){
			var vm=this;
			vm.drop.off ? vm.drop.off=false : vm.drop.off=true;
			e.stopPropagation();
		},
		dropSelect:function(e){
			var vm=this,obj=e.target;
			vm.drop.type=obj.name;
			vm.drop.text=obj.innerHTML;
			vm.drop.off=false;
		},
		getDateTime(v){
			return getDateTime(v);
		},
	}
}
</script>


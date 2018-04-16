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
		<section class="m-top-shift f-tas">
			<div class="box">
				<label class="item" @click="topShiftClick">
					<input type="radio" v-model="form.source" value="6"><span class="slider">卡盟APP</span>
				</label>
				<label class="item" @click="topShiftClick">
					<input type="radio" v-model="form.source" value="7"><span class="slider">卡盟SDK</span>
				</label>
				<label class="item" @click="topShiftClick">
					<input type="radio" v-model="form.source" value="8"><span class="slider">卡盟通服</span>
				</label>
			</div>
		</section>
		<!-- <div class="m-tag"><b></b>条件查询</div> -->
		<section class="form-c">
			<div class="row">
				<span class="dp">操作类型：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input value="6" type="radio" v-model="form.orderType"><span></span></span><span class="text">空卡</span></label>
					<label v-show="form.source==6"><span class="radio"><input value="7" type="radio" v-model="form.orderType"><span></span></span><span class="text">过户办理</span></label>
				</div>
			</div>
			<div class="row">
				<span class="dp"><i class="m-one-font"></i>运营商：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.cardType"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.cardType"><span></span></span><span class="text">远特</span></label>
					<label v-show="form.source!=8"><span class="radio"><input type="radio" value="2" v-model="form.cardType"><span></span></span><span class="text">联通</span></label>
				</div>
			</div>
			<div class="row" v-if="off.type==2">
				<span class="dp">订单状态：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.orderStatus"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.orderStatus"><span></span></span><span class="text">同意</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.orderStatus"><span></span></span><span class="text">拒绝</span></label>
				</div>
			</div>
			<div class="row" v-if="off.type==1||off.type==2" v-show="form.source!=7&&form.source!=8">
				<span class="dp">审核方式：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="9" v-model="form.auditType"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="0" v-model="form.auditType"><span></span></span><span class="text">实时审核</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.auditType"><span></span></span><span class="text">事后审核</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.auditType"><span></span></span><span class="text">自动审核</span></label>
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
			<div class="row" :class="{active:form.select==5}" v-show="form.source!=7&&form.source!=8">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="5" v-model="form.select"><span></span></span><span class="text">操作者ID：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context5" :readonly="form.select!=5" maxlength="12" type="tel" placeholder="请输入查询的操作者ID"></div>
			</div>
			<div class="row" :class="{active:form.select==6}" v-if="off.type==1">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="6" :readonly="form.select!=6" v-model="form.select"><span></span></span><span class="text">订单状态：</span></label>
				</span>
				<div class="m-form-radio col-radio" v-show="form.source!=7">
					<label><span class="radio"><input type="radio" checked="checked" value="0" v-model="form.orderStatus"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.orderStatus"><span></span></span><span class="text">待分配</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.orderStatus"><span></span></span><span class="text">已分配</span></label>
				</div>
				<div class="m-form-radio col-radio" v-show="form.source==7">
					<label><span class="radio"><input type="radio" checked="checked" value="0" v-model="form.orderStatus"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="4" v-model="form.orderStatus"><span></span></span><span class="text">待分配</span></label>
					<label><span class="radio"><input type="radio" value="5" v-model="form.orderStatus"><span></span></span><span class="text">已分配</span></label>
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
					<label v-show="form.source!=8"><span class="radio"><input value="6" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">已开户申请</span></label>
					<label><span class="radio"><input value="7" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">已获取IMSI</span></label>
					<label><span class="radio"><input value="8" type="radio" v-model="form.orderStatus"><span></span></span><span class="text">已开卡申请</span></label>
				</div>
			</div>
			<button class="f-btn f-btn-line" @click="searchList()">查询</button>
		</section>
  	</div>
  	<div class="m-total-table" v-if="list">
		<div class="total-head">统计结果<b>{{total}}</b> <button class="btn_export_excel" v-if="maxpage"  @click="downLoadList">导出excel</button></div>
		<table>
			<thead>
				<tr>
					<th>序号</th>
					<th>订单号</th>
					<th>生成时间</th>
					<th v-show="off.type==4">关闭时间</th>
					<th>操作类型</th>
					<th>审核方式</th>
					<th>用户姓名</th>
					<th>用户号码</th>
					<!-- <th>号码等级</th> -->
					<th>身份证号码</th>
					<th v-show="off.type==1||off.type==2">审核姓名</th>
					<th v-show="form.source!=7&&form.source!=8">操作人</th>
					<!-- <th v-show="off.type==1||off.type==2">状态修改时间</th> -->	
					<th v-show="off.type!=2">订单状态</th>
					<th v-show="off.type==2">审核用时</th>
					<th v-show="off.type==2">号卡状态</th>
					<th v-show="off.type==2">审核状态</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(todo,index) in list">
					<td>{{((pageNum-1)*10+(index+1))}}</td>
					<td>{{todo.orderId}}</td>
					<td>{{getDateTime(todo.createTime)[6]}}</td>
					<td v-if="off.type==4">{{getDateTime(todo.modifyTime)[6]}}</td>
					<td>{{translateData(1,todo.type)}}</td>
					<td>
						<span v-if="todo.auditType=='0'">实时审核</span>
						<span v-else-if="todo.auditType==1">事后审核</span>
						<span v-else-if="todo.auditType==2">自动审核</span>
						<span v-else>--</span>
					</td>
					<td>{{todo.userName}}</td>
					<td>{{todo.phoneNumber}}<div><span v-show="todo.phoneHome">（{{ todo.phoneHome }}）</span></div></td>
					<!-- <td>{{translateData(5,todo.phoneLevel)}}</td> -->
					<td>{{todo.identityCard}}</td>
					<td v-if="off.type==1||off.type==2">{{todo.customerName}}</td>
					<td v-if="form.source!=7&&form.source!=8">
						<span v-if="todo.operator">{{todo.operator}}</span>
						<span v-if="todo.operatorId">{{todo.operatorId}}</span>
						<br/><b class="f-m-lighter">（{{todo.operatorName}}）</b>
					</td>
					<td v-if="off.type==2">
						<span v-if="form.source!=7&&form.source!=8">{{secondsFormat(todo.auditTime)}}</span>
						<span v-else>{{ secondsFormat(parseInt(todo.modifyTime)/1000-parseInt(todo.createTime)/1000) }}</span>
					</td>
					<td v-if="off.type!=2">
						<span v-if="off.type==1">
							<span v-if="form.source==7||form.source==8">
								<b v-show="todo.status==4" class="f-c-red">待分配</b>
								<b v-show="todo.status==5" class="f-c-green">已分配</b>
							</span>
							<span v-else>
								<b v-show="todo.status==1" class="f-c-red">待分配</b>
								<b v-show="todo.status==2" class="f-c-green">已分配</b>
							</span>
						</span>
						<span v-else>{{translateData(7,todo.statusDetail)}}</span>
					</td>
					<td v-if="off.type!=2"><a :name="todo.orderId" @click="details" href="javascript:void(0)" class="details">详情</a></td>
					<!--已审核-->
					<td v-if="off.type==2" :class="{fCYellow:todo.cardStatus==1,fCGreen:todo.cardStatus==2,fCRed:todo.cardStatus==3,fCRed:todo.cardStatus==4,fCGrey:todo.cardStatus==9}">{{translateData(4,todo.cardStatus)}}</td>
					<td colspan="2" v-if="off.type==2&&todo.status==1" class="td-col-2">
						<div class="f-c-green">同意</div>
						<div><a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">详情</a></div>
					</td>
					<td colspan="2" v-if="off.type==2&&todo.status==2" class="td-col-2">
						<div class="f-c-red">拒绝</div>
						<div>
							<a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">详情</a>
							<!-- <br>
							<a v-if="todo.allowRecheck==1" :name="todo.orderId" :title="index" @click="agree" class="agree f-mgt-10" href="javascript:void(0)">同意</a> -->
							<span v-if="todo.allowRecheck==2" class="time_out f-c-red">超过复审时间</span>
						</div>
					</td>
					<td colspan="2" v-if="off.type==2&&todo.status==3" class="td-col-2">
						<div class="f-c-red">超时关闭</div>
						<div><a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">详情</a></div>
					</td>
					<!-- <td colspan="2" v-if="off.type==2&&todo.status==4" class="td-col-2">
						<div class="f-c-blue">复审同意</div>
						<div><a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">详情</a></div>
					</td> -->
				</tr>
			</tbody>
		</table>
		<my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
	</div>
	</section>
	<!--详情-->
	<list-details :list="detailsData" :source="form.source" :type="off.type" v-if="off.details" :number="off.number">

	</list-details>
  </div>
</template>
<script>
require('../../../assets/km/js/base64.min.js');
import {searchAuditList,reAudit,reqCommonMethod} from "../../../config/service.js"
import pagination from "../../../componentskm/page.vue";
import details from "../../../componentskm/cardOrderDetails.vue";
import { getDateTime,translateData,secondsFormat,getUnixTime,createDownload,setStore, getStore, errorDeal } from "../../../config/utils.js";
export default{
	data (){
		return {
			off:{
				type:1,//1，待审核;2，已审核;3，进行中;4，已关闭
				isLoad:0,//加载条
				details:0,//详情页面开关
				number:'',//第几条详情
			},
			form:{
				source:'6',//订单来源，6、卡盟APP；7、卡盟SDK；8卡盟通服
				orderType:6,//操作类型
				cardType:0,//运营商
				orderStatus:0,//订单状态
				auditType:9,//审核方式
				context1:'',//订单号码
				context2:'',//手机号码
				context3:'',//审核人ID
				context4:'',//身份证号
				context5:'',// 操作者ID
				context6:0,//号卡状态
				startTime:'',
				endTime:'',
				select:6//条件查询，选择的条件
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
			var vm=this,type=this.$route.params.type;
			type=='auditing' ? vm.off.type=1 : type=='audited' ? vm.off.type=2 : type=='closed' ? vm.off.type=4 : vm.off.type=3;
			vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
			vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
		},
		searchList:function(page){
            var vm=this,url,json={"source":vm.form.source,"type":vm.form.orderType,"pageSize":vm.pageSize,"pageNum":page||1,"startTime":vm.form.startTime,"endTime":vm.form.endTime,"status":vm.form.orderStatus,'auditType':vm.form.auditType,"cardType":vm.form.cardType};

			//进行中，已关闭
			if(json.source!=7&&json.source!=8&&(vm.off.type==3||vm.off.type==4)){
				vm.searchClosedAndDoing(page);
				return false;
			}
			let context=vm.form['context'+vm.form.select];
			vm.off.type==1&&vm.form.select!=6&&(json.status=0,vm.form.orderStatus=0);
			if(vm.form.select==1&&(!context)){
				layer.open({
		            content:'请输入订单号码',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}else if(vm.form.select==2&&(!context)){
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
			if(vm.form.source==7){
				url="km-ecs/w/handler/query";
				json=vm.getSdkJson(json);
			}else if(vm.form.source==8){
				url="km-ecs/w/handler/query";
				json=vm.getTfJson(json);
			}else{
				vm.off.type==1 ? url='km-ecs/w/audit/ingList' : url='km-ecs/w/audit/edList';
			}
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			// vm.AJAX(url,json,function(data){
			// 	vm.list=data.data.list
			// 	vm.total=data.data.total;
			// 	vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
			// 	vm.pageNum=page||1;
			// 	vm.callback=function(v){vm.searchList(v)};
			// },function(){
			// 	vm.off.isLoad=false;
            // })
            reqCommonMethod(json,function(){vm.off.isLoad=false;},url)
            .then((data)=>{
	            vm.list=data.data.list
				vm.total=data.data.total;
				vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
				vm.pageNum=page||1;
                vm.callback=function(v){vm.searchList(v)};
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 	 
		},
		searchClosedAndDoing:function(page){//进行中,已关闭
			var vm=this,url,json={"source":vm.form.source,"type":vm.form.orderType,"pageSize":vm.pageSize,"pageNum":page||1,"startTime":vm.form.startTime,"endTime":vm.form.endTime,"status":vm.off.type,"statusDetail":vm.form.orderStatus,"cardType":vm.form.cardType};
			let context=vm.form['context'+vm.form.select];
			if(vm.form.select==1&&(!context)){
				layer.open({
		            content:'请输入订单号码',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}else if(vm.form.select==2&&(!context)){
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
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			// vm.AJAX('w/audit/getOrderList',json,function(data){
			// 	vm.list=data.data.list;
			// 	vm.total=data.data.total;
			// 	vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
			// 	vm.pageNum=page||1;
			// 	vm.callback=function(v){vm.searchClosedAndDoing(v)};
			// },function(){
			// 	vm.off.isLoad=false;
            // })
            
             searchAuditList(json,function(){vm.off.isLoad=false;},"km-ecs/w/audit/getOrderList")
             .then((data)=>{
                    vm.list=data.data.list;
			    	vm.total=data.data.total;
			        vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
			        vm.pageNum=page||1;
                    vm.callback=function(v){vm.searchClosedAndDoing(v)};
                    vm.off.isLoad=false;
                 }
             ).catch(error=>errorDeal(error)); 	
		},
		// 导出查询结果excel
		downLoadList:function(page){
			var vm=this,url,json={"source":vm.form.source,"type":vm.form.orderType,"startTime":vm.form.startTime,"endTime":vm.form.endTime,"status":vm.form.orderStatus,'auditType':vm.form.auditType,"cardType":vm.form.cardType};
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
			var userInfo = getStore("KA_ECS_USER");
			var	customerId = userInfo.customerId;
			var codeId = userInfo.codeId;
				json.customerId = customerId;
				json.codeId = codeId;
				json.context=context;
				json.searchtype=vm.form.select;
			if(vm.form.source==7){
				return false;
			}else{
				url='km-ecs/w/audit/downloadEdList';
			}
			createDownload(url,  BASE64.encode(JSON.stringify(json)),  function(){
		        vm.off.isLoad=false;
	      	});
		},
		getSdkJson(json){//SDK查询采用统一查询接口
			var vm=this,type=vm.off.type,resJson={
					"opKey":"",
					"params":[],
					"pageSize":"10",
					"pageNum":json.pageNum
				},sql="A.create_time BETWEEN "+getUnixTime(json.startTime)+" AND "+getUnixTime(json.endTime)+"";
			if(json.cardType!=0){
				sql+=" AND A.card_type="+json.cardType;
			}
			if(type==2||type==1){//待审核-已审核
				resJson.opKey="sdk.orderAudit.list";
				if(json.status!=0){
					sql+=" AND A.result="+json.status;
				}else if(json.status==0){
					if(type==2){
						sql+=" AND (A.result=1 OR A.result=2)";
					}else if(type==1){
						sql+=" AND (A.result=4 OR A.result=5)";
					}
				}

				if(json.context!=0&&json.searchtype!=1){
					if(json.searchtype==6){
						sql+=" AND A.order_status="+json.context;
					}else if(vm.form.context6!=0){
						sql+=" AND A.order_status="+vm.form.context6;
					}
					
				}
			}else if(type==3||type==4){
				resJson.opKey="sdk.orderApp.list";
				if(type==3){
					sql+=" AND A.order_status=1";
				}else if(type==4){
					sql+=" AND A.order_status=4";
				}

				if(json.status!=0&&json.searchtype!=1){
					let code=0;
					if(json.status==1){
						code=1001;//已选号
					}else if(json.status==2){
						code=1001;//已选套餐
					}else if(json.status==3){
						code=1003;//已上传资料
					}else if(json.status==4){
						code=1004;//已支付
					}else if(json.status==6){
						code=1006;//已开户申请
					}else if(json.status==7){
						code=1007;//已获取IMSI
					}else if(json.status==8){
						code=1008;//已开卡申请
					}
					sql+=" AND A.latest_phase="+code;
				}
			}

			if(json.searchtype==1){
				sql+=' AND A.sys_order_id="'+json.context+'"';
			}else if(json.searchtype==2){
				sql+=' AND A.phone_number="'+json.context+'"';
			}else if(json.searchtype==3){
				sql+=' AND A.customer_id="'+json.context+'"';
			}else if(json.searchtype==4){
				sql+=' AND A.papers_code="'+json.context+'"';
			}
			resJson.params.push(sql);
			return resJson;
		},
		getTfJson(json){//通服查询采用统一查询接口
			var vm=this,type=vm.off.type,resJson={
					"opKey":"",
					"params":[],
					"pageSize":"10",
					"pageNum":json.pageNum
				},sql="A.create_time BETWEEN "+getUnixTime(json.startTime)+" AND "+getUnixTime(json.endTime)+"";

			if(type==2||type==1){//待审核-已审核
				resJson.opKey="tf.orderAudit.list";
				if(json.status!=0){
					sql+=" AND A.result="+json.status;
				}else if(json.status==0){//订单状态-全部
					if(type==2){
						sql+=" AND (A.result=1 OR A.result=2)";
					}else if(type==1){
						sql+=" AND (A.result=4 OR A.result=5)";
					}
				}

				if(json.context!=0&&json.searchtype!=1){
					if(json.searchtype==6){
						if(json.context==1){
							sql+=" AND B.order_status=2";
						}else if(json.context==2){
							sql+=" AND B.order_status=3";
						}else if(json.context==3){
							sql+=" AND B.order_status=1";
						}else if(json.context==4){
							sql+=" AND B.order_status=4";
						}
					}else if(vm.form.context6!=0){//输入值时，添加号卡状态查询条件
						sql+=" AND B.order_status="+vm.form.context6;
					}
				}
			}else if(type==3||type==4){
				resJson.opKey="tf.orderApp.list";
				if(type==3){
					sql+=" AND A.order_status=1";
				}else if(type==4){
					sql+=" AND A.order_status=4";
				}

				if(json.status!=0&&json.searchtype!=1){
					let code=0;
					if(json.status==1){
						code=1000;//已选号
					}else if(json.status==2){
						code=1001;//已选套餐
					}else if(json.status==3){
						code=1003;//已上传资料
					}else if(json.status==4){
						code=1004;//已支付
					}else if(json.status==7){
						code=1007;//已获取IMSI
					}else if(json.status==8){
						code=1008;//已开卡申请
					}
					sql+=" AND A.latest_phase="+code;
				}
			}

			if(json.searchtype==1){
				sql+=' AND A.sys_order_id="'+json.context+'"';
			}else if(json.searchtype==2){
				sql+=' AND A.phone_number="'+json.context+'"';
			}else if(json.searchtype==3){
				sql+=' AND A.customer_id="'+json.context+'"';
			}else if(json.searchtype==4){
				sql+=' AND A.papers_code="'+json.context+'"';
			}
			resJson.params.push(sql);
			return resJson;
		},
		agree:function(e){
			var vm=this,url,orderId=e.target.name,number=e.target.title;

			// vm.AJAX('w/audit/reAudit',{"orderId":orderId},function(data){
			// 	layer.open({
		    //         content:'复审成功',
		    //         skin: 'msg',
		    //         time: 4,
		    //         msgSkin:'success',
		    //     })
			// 	vm.list[number].status=4
			// 	vm.list[number].cardStatus=1
            // })
            reAudit({"orderId":orderId},"km-ecs/w/audit/reAudit")
            .then((data)=>{
	            layer.open({
		            content:'复审成功',
		            skin: 'msg',
		            time: 4,
		            msgSkin:'success',
		        })
				vm.list[number].status=4
                vm.list[number].cardStatus=1
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 	
		},
		details:function(e){//详情
			var vm=this,url,
			orderId=e.target.name,
			type=vm.off.type,
			json={"orderId":orderId,'status':type},
			sql='A.sys_order_id="'+orderId+'"';
			vm.off.number=e.target.title;
			if(vm.form.source==7){//SDK
				url="km-ecs/w/handler/query";
				if(type==1||type==2){
					json.opKey="sdk.orderAudit.details";
					if(type==2){
						sql+=" AND (A.result=1 OR A.result=2)";
					}else if(type==1){
						sql+=" AND (A.result=4 OR A.result=5)";
					}
				}else if(type==3||type==4){
					json.opKey="sdk.orderApp.details";
					if(type==3){
						sql+=" AND A.order_status=6";
					}else if(type==4){
						sql+=" AND A.order_status=4";
					}
				}
				json.params=[sql];
				json.pageSize="10";
				json.pageNum="-1";
			}else if(vm.form.source==8){//通服
				url="km-ecs/w/handler/query";
				if(type==1||type==2){
					json.opKey="tf.orderAudit.details";
					if(type==2){
						sql+=" AND (A.result=1 OR A.result=2)";
					}else if(type==1){
						sql+=" AND (A.result=4 OR A.result=5)";
					}
				}else if(type==3||type==4){
					json.opKey="tf.orderApp.details";
					if(type==3){
						sql+=" AND A.order_status=1";
					}else if(type==4){
						sql+=" AND A.order_status=4";
					}
				}
				json.params=[sql];
				json.pageSize="10";
				json.pageNum="-1";
			}else{
				type==1 ? url='km-ecs/w/audit/ingInfo' : type==2 ? url='km-ecs/w/audit/edInfo' : url='km-ecs/w/audit/getOrderInfo';
			}
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			// vm.AJAX(url,json,function(data){
			// 	if(vm.form.source==7||vm.form.source==8){
			// 		vm.detailsData=data.data.list[0];
			// 	}else{
			// 		vm.detailsData=data.data;
			// 	}
				
			// 	vm.off.details=true;
			// },function(){
			// 	vm.off.isLoad=false;
            // })
            reqCommonMethod(json,function(){vm.off.isLoad=false},url)
            .then((data)=>{
				if(vm.form.source==7||vm.form.source==8){
					vm.detailsData=data.data.list[0];
				}else{
					vm.detailsData=data.data;
				}
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
			vm.form=Object.assign(vm.form,{
				orderType:6,
				cardType:0,
				orderStatus:0,
				auditType:9,
				context1:'',
				context2:'',
				context3:'',
				context4:'',
				context5:'',
				context6:0,
				select:6
			});
		},
		getUnixTime(v){
			return getUnixTime(v);
		},
		getDateTime(v){
			return getDateTime(v);
		},
		translateData(type,v){
			return translateData(type,v);
		},
		secondsFormat(v){
			return secondsFormat(v);
		}
	}
}
</script>
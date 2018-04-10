<!--**
  *@info 资源查询模块-商户
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<style scoped>
  .g-search-form>.form-c>.row{width:auto}
  .m-col-2>.col-l{display: none;}
  .m-col-2>.col-r{margin-left: 0;width: 2.5rem;}
  .total-head{position: relative;}
  .total-head>span{margin-right: 10px;}
  .total-head>span>b{font-weight: bold;}
  .total-head>.f-btn-group{position: absolute;width:4rem;left: 50%;margin-left:-2rem;top:50%;margin-top: -0.15rem;}
  .total-head>.f-btn-group>button{height:0.3rem;line-height:0.3rem;color:#717171 !important;border-radius: 5px; border-bottom-color:#ccc;-webkit-box-shadow:0 1px 1px rgba(90, 90, 90, 0.1);box-shadow:0 1px 1px rgba(90, 90, 90, 0.1);display:inline-block;padding: 0 3px;font-size:12px;cursor:pointer;background-color:#fff;border:1px solid transparent;border-color:#dadada;}
  .total-head>.f-btn-group>button:hover{color:#333333;background-color:#f1f1f1;}
  .total-head>.f-btn-group>button.active{color:#717171 !important;background-color:#F9F9F9;border-color:#c6c6c6;box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);}
  .total-head>.m-select{display: none;margin-left:0.1rem;}

  .merchant-total, .g-in-table, .merchant-total>tbody>tr>td{border:none !important;border-collapse:separate !important;}
  .merchant-total th:first-child{border-right:1px solid #dfe6ec;}
  .merchant-total tbody tr{border-top: none !important;}
  .merchant-total>tbody>tr>td{padding:0 !important;}
  .merchant-total{ border:1px solid #dfe6ec !important;}

  .o-headTotal-table tr>td, .o-headTotal-table tr>th{border-right:1px solid #dfe6ec;}
  .o-headTotal-table tr>td:first-child{background-color: #eef1f6;}
  .o-headTotal-table thead th{ height:0.3rem; background-color: #eef1f6;font-weight: normal;}
  .o-headTotal-table tbody tr>td{padding: 6px 0;}
  .g-in-table{text-align: left !important;}
  .g-in-table tr>td:nth-child(2){border-right:1px solid #dfe6ec;border-left:1px solid #dfe6ec;}
  .g-in-table td>span{display: inline-block;text-align:right;}
  .g-in-table.col-l td>span{width: 1.2rem;}
  .g-in-table.col-r td>span{width: 1.6rem;}
  .m-no-data{text-align: center;padding:0.1rem 0;}
  .o-clr-bd tr:nth-child(even){background: #fff !important;}
  @media screen and (max-width: 960px){
  	.m-col-2>.col-r{width:auto;}
	.total-head>.m-select{display: inline-block;}
	.total-head>.f-btn-group{display: none;}
	.g-in-table td>span{text-align:left;margin-left: 5px;}
  	.g-in-table.col-l td>span, .g-in-table.col-r td>span{width:auto;}
  }
</style>
<template>
	<div id="merchantSearch">
		<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
	  	<section class="g-search-form">
			<table class="g-base-table o-headTotal-table">
				<thead>
					<tr>
						<th style="width:1.5rem;font-weight:bold">统计</th>
						<th>商户</th>
						<th>工号</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>总数</td>
						<td>{{totalInfo.merchantTotal}}</td>
						<td>{{totalInfo.userTotal}}</td>
					</tr>
					<tr>
						<td>激活数</td>
						<td>{{totalInfo.merchantActiviteNum}}</td>
						<td>{{totalInfo.userActiviteNum}}</td>
					</tr>
					<tr>
						<td>已申请待激活数(游客)</td>
						<td>{{totalInfo.merchantActiviteWaitNum}}</td>
						<td>{{totalInfo.userActiviteWaitNum}}</td>
					</tr>
					<tr>
						<td>已申请未激活数</td>
						<td>{{totalInfo.merchantActiviteApplyNum}}</td>
						<td>{{totalInfo.userActiviteApplyNum}}</td>
					</tr>
				</tbody>
			</table>
			<!--基础条件-->
			<section class="form-c">
				<div class="row">
					<span class="dp">类型：</span>
					<div class="m-form-radio">
						<label><span class="radio"><input @click="shiftType" maxlength="20" type="radio" value="1" v-model="form.type" checked="checked"><span></span></span><span class="text">商户ID</span></label>
						<label><span class="radio"><input @click="shiftType" maxlength="11" type="radio" value="2" v-model="form.type" checked="checked"><span></span></span><span class="text">登录手机号码</span></label>
					</div>
				</div>
				<div class="row clr m-col-2">
					<span class="dp col-l">订单号码：</span>
					<div class="col-r m-input-button">
						<input v-model="form.context" maxlength="24" type="tel" :placeholder="form.type==1 ? '请输入查询的商户ID' : '请输入查询的登录手机号码'"/><button @click="getDetails(1)">查询</button>
					</div>
				</div>
			</section>
	  	</section>
		<!--商户ID-->
	  	<div class="m-total-table" style="margin-top: 0.2rem;" v-if="form.type==1">
			<table class="merchant-total g-list-table" v-if="ajaxData.details">
			<thead>
				<tr>
					<th style="width:70%;">商户基本信息</th>
					<th style="width:30%;">商户账户信息</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<table class="g-in-table col-l">
							<tbody>
								<tr>
									<td><span>网点名称：</span>{{ ajaxData.details.companyName }}</td>
									<td><span>有效总次数：</span>{{ ajaxData.details.totalNums }}</td>
								</tr>
								<tr>
									<td><span>渠道id：</span>{{ ajaxData.details.dealerId }}</td>
									<td><span>开卡成功次数：</span>{{ ajaxData.details.successNums }}</td>
								</tr>
								<tr>
									<td><span>所在地址：</span>{{ ajaxData.details.address }}</td>
									<td><span>额外成功次数：</span>{{ ajaxData.details.extraFrequency }}</td>
								</tr>
								<tr>
									<td><span>门店地址：</span>{{ ajaxData.details.storeAddress }}</td>
									<td><span>获得分数：</span>{{ ajaxData.details.getPoints }}</td>
								</tr>
								<tr>
									<td><span>创建时间：</span>{{ ajaxData.details.createtime }}</td>
									<td><span>扣除分数：</span>{{ ajaxData.details.losePoints }}</td>
								</tr>
								<tr>
									<td><span>商户属性：</span>{{ ajaxData.details.merchantType }}</td>
									<td><span>额外分值：</span>{{ ajaxData.details.extraCredit }}</td>
								</tr>
								<tr>
									<td><span>商户类别：</span>{{ ajaxData.details.userType }}</td>
									<td><span>信用积分：</span>{{ ajaxData.details.creditNums }}</td>
								</tr>
								<tr>
									<td><span>售卡范围：</span>
										<!-- <b v-if="ajaxData.details.attribute==1">A（远特售卡）</b>
										<b v-if="ajaxData.details.attribute==2">B（联通售卡）</b>
										<b v-if="ajaxData.details.attribute==3">C（远特售卡+联通售卡）</b>
										<b v-if="ajaxData.details.attribute==4">D（联通售卡+远特售卡）</b> -->
                                        <b v-for="auditData in ajaxData.details.openedScopes">
                                            <span v-if="auditData.type==1">远特售卡</span><span v-if="auditData.type==2">联通售卡</span><span v-if="auditData.type==3">移动售卡</span><span v-if="auditData.type==4">电信售卡</span>(<span>{{auditData.areas}}</span>)
                                        </b>
									</td>
									<td><span>真实信用积分：</span>{{ ajaxData.details.realCreditNums }}</td>
								</tr>
								<tr>
									<td><span>激活状态：</span>
										<b v-if="ajaxData.details.status==0" class="f-c-green">已激活</b>
										<b v-if="ajaxData.details.status==1" class="f-c-yellow">待激活</b>
										<b v-if="ajaxData.details.status==2" class="f-c-blue">已申请设备</b>
									</td>
									<td><span>显示等级：</span>{{ ajaxData.details.showLevel }}</td>
								</tr>
								<tr>
									<td><span>签约状态：</span>{{ ajaxData.details.isSignAgreement }}[{{ ajaxData.details.signTime }}]</td>
									<td><span>真实等级：</span>{{ ajaxData.details.realLevel }}</td>
								</tr>
								<tr>
									<td><span>设备信息：</span>
										<a :href="'#/homek/resource/device/'+ajaxData.details.devMac" title="点击查看详情" class="details m-l">{{ ajaxData.details.devMac }}</a></td>
									<td><span>基础分值：</span>{{ ajaxData.details.btScore }}</td>
								</tr>
								<tr>
									<td><span>上级商户：</span>
										<a v-show="ajaxData.details.superDealerId" :href="'#/homek/resource/promoter/'+ajaxData.details.superDealerId" title="点击查看详情" class="details">{{ajaxData.details.superDealerId}}</a>【名称：{{ ajaxData.details.superDealerName||'--' }}】</td>
									<td><span>基础总次数：</span>{{ ajaxData.details.btFrequency }}</td>
								</tr>
								<tr>
									<td><span>上级商户名称：</span>{{ajaxData.details.superDealerName}}（{{ajaxData.details.superDealerId}}）</td>
									<td><span>基础成功次数：</span>{{ ajaxData.details.bsFrequency }}</td>
									
								</tr>
								<tr>
									<td><span>上级推广渠道ID：</span>
										<a v-show="ajaxData.details.superDealerId" :href="'#/homek/resource/promoter/'+ajaxData.details.superDealerId" title="点击查看详情" class="details">{{ajaxData.details.popDealerId}}</a>【名称：{{ ajaxData.details.popDealerName||'--' }}】</td>
									<td><span>推广渠道：</span>{{ ajaxData.details.popDealerId||'--' }}【名称：{{ ajaxData.details.popDealerName||'--' }}】</td>
									
								</tr>
								<tr>
									<td colspan="2"><span>总部推广渠道：</span>{{ ajaxData.details.topDealerId||'--' }}【名称：{{ ajaxData.details.topDealerName||'--' }}】</td>
								</tr>
							</tbody>
						</table>
					</td>
					<td>
						<table class="g-in-table col-r o-clr-bd">
							<tbody>
								<tr>
									<td><span>话分佣金历史总金额：</span>{{ parseFloat(ajaxData.details.incomeMoneyTotal)/100 }}元</td>
								</tr>
								<tr>
									<td><span>话分佣金余额：</span>{{ parseFloat(ajaxData.details.incomeMoney)/100 }}元</td>
								</tr>
								<tr>
									<td><span>开卡佣金历史总金额：</span>{{ parseFloat(ajaxData.details.commissionFeeTotal)/100 }}元</td>
								</tr>
								<tr>
									<td><span>开卡佣金余额：</span>{{ parseFloat(ajaxData.details.commissionFee)/100 }}元</td>
								</tr>
								<tr>
									<td><span>综合激励历史总金额：</span>{{ parseFloat(ajaxData.details.creditMoneyTotal)/100 }}元</td>
								</tr>
								<tr>
									<td><span>综合激励余额：</span>{{ parseFloat(ajaxData.details.creditMoney)/100 }}元</td>
								</tr>
								<tr>
									<td><span>自推广激励历史总金额：</span>{{ parseFloat(ajaxData.details.promotionTotal)/100 }}元</td>
								</tr>
								<tr>
									<td><span>自推广激励余额：</span>{{ parseFloat(ajaxData.details.promotion)/100 }}元</td>
								</tr>
								<tr>
									<td><span>保证金：</span>{{ parseFloat(ajaxData.details.bond)/100 }}元</td>
								</tr>
								<tr>
									<td><span>号码模式：</span>{{ajaxData.details.phoneModel}}
										<!-- <b v-if="ajaxData.details.phoneModel=='basemodel'||ajaxData.details.phoneModel==''">基本模式</b>
										<b v-else>其它模式</b> -->
									</td>
								</tr>
								<tr>
									<td><span>折扣模式：</span>{{ajaxData.details.discountModel}}
										<!-- <b v-if="ajaxData.details.discountModel=='basemodel'||ajaxData.details.discountModel==''">基本模式</b>
										<b v-else>其它模式</b> -->
									</td>
								</tr>
								<tr>
									<td><span>转账模式：</span>{{ajaxData.details.transferModel}}
										<!-- <b v-if="ajaxData.details.transferModel=='basemodel'||ajaxData.details.transferModel==''">基本模式</b>
										<b v-else>其它模式</b> -->
									</td>
								</tr>
							</tbody>
						</table>
						
					</td>
				</tr>
			</tbody>
			</table>
			<section v-if="ajaxData.details">
				<div class="total-head">商户下所有工号列表</div>
				<table>
					<thead>
						<tr>
							<th>序号</th>
							<th>工号ID</th>
							<th>工号姓名</th>
							<th>登录手机号码</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in ajaxData.list">
							<td>{{ ((ajaxData.pageNum-1)*10+(index+1)) }}</td>
							<td>{{ item.userId }}<span v-if="item.isMain==1">(主账号)</span></td>
							<td>{{ item.userName }}</td>
							<td>{{ item.phone }}</td>
							<td><a @click="details(item.phone,2)" class="details" href="javascript:void(0)">详情</a></td>
						</tr>
					</tbody>
				</table>
				<div class="m-no-data" v-if="!ajaxData.list.length">该商户暂无工号列表数据</div>
			</section>
			
		</div>
		<!--工号ID-->
		<div class="m-total-table" style="margin-top: 0.2rem;" v-if="form.type==2">
			<table class="merchant-total g-list-table" v-if="ajaxData.details">
			<thead>
				<tr>
					<th style="width:70%;">工号基本信息</th>
					<th style="width:30%;">工号账户信息</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<table class="g-in-table col-l">
							<tbody>
								<tr>
									<td><span>卡盟ID：</span>{{ ajaxData.details.userId }}<i v-if="ajaxData.details.isMain==1">(主账号)</i></td>
									<td><span>最近登录时间：</span>{{ getDateTime(ajaxData.details.lastLoginTime)[6] }}</td>
								</tr>
								<tr>
									<td><span>用户姓名：</span>{{ ajaxData.details.userName }}</td>
									<td><span>最近操作时间：</span>{{ getDateTime(ajaxData.details.lastReqeustTime)[6] }}</td>
								</tr>
								<tr>
									<td><span>登录手机号：</span>{{ ajaxData.details.phone }}</td>
									<td><span>所用机型：</span>{{ ajaxData.details.phoneType }}</td>
								</tr>
								<tr>
									<td><span>所属商户渠道ID：</span>{{ ajaxData.details.dealerId }}（{{ ajaxData.details.companyName }}<a  class="details" @click="details(ajaxData.details.dealerId,1)" href="javascript:void(0)">详情</a>）</td>
									<td><span>经纬度：</span>{{ ajaxData.details.longitude }},{{ ajaxData.details.latitude }}<a href="javascript:void(0)" @click="toMap" class="details m-l">查看地图</a></td>
								</tr>
								<tr>
									<td><span>当前城市：</span>{{ ajaxData.details.cityName }}</td>
									<td><span>支付宝账号：</span>{{ ajaxData.details.alipayID }}</td>
								</tr>
								<tr>
									<td><span>创建时间：</span>{{ getDateTime(ajaxData.details.createTime)[6] }}</td>
									<td><span>微信账号：</span>{{ ajaxData.details.wxID }}</td>
								</tr>
							</tbody>
						</table>
					</td>
					<td>
						<table class="g-in-table col-r">
							<tbody>
								<tr>
									<td><span>账户余额：</span>{{ parseFloat(ajaxData.details.leftFee)/100 }}元</td>
								</tr>
								<tr>
									<td><span>可提现额度：</span>{{ parseFloat(ajaxData.details.allowExtractFee)/100 }}元</td>
								</tr>
								<tr>
									<td><span>已提现金额：</span>{{ parseFloat(ajaxData.details.alreadyExtractFee)/100 }}元</td>
								</tr>
								<tr>
									<td><span>可退款额度：</span>{{ parseFloat(ajaxData.details.allowRefundFee)/100 }}元</td>
								</tr>
								<tr>
									<!-- <td><span>工号已退款金额：</span>{{ parseFloat(ajaxData.details.alreadyRefundFee)/100 }}元</td> -->
									<td><span>已退款金额：</span>--元</td>
								</tr>
								<tr>
									<td><span>赠送金额：</span>{{ parseFloat(ajaxData.details.giveMoney)/100 }}元（已使用：{{ parseFloat(ajaxData.details.giveMoneyUsed)/100 }}元）</td>
								</tr>
							</tbody>
						</table>
						
					</td>
				</tr>
			</tbody>
			</table>
			<section v-if="ajaxData.details">
				<div class="total-head">第三方支付流水号列表<b>{{ajaxData.total}}</b>
					<div class="f-btn-group">
						<button :class="{active:form.paySource==2}" @click="shiftPaySource(2)">账户充值成功</button>
						<button :class="{active:form.paySource==3}" @click="shiftPaySource(3)">开卡失败退款</button>
						<button :class="{active:form.paySource==4}" @click="shiftPaySource(4)">代充失败退款</button>
						<button :class="{active:form.paySource==1}" @click="shiftPaySource(1)">保证金充值成功</button>
						
					</div>
					<select class="m-select" @change="shiftPaySource">
						<option value="2">账户充值成功</option>
						<option value="3">开卡失败退款</option>
						<option value="4">代充失败退款</option>
						<option value="1">保证金充值成功</option>
					</select>
				</div>
				<table>
					<thead>
						<tr>
							<th>序号</th>
							<th>支付时间</th>
							<th>订单号</th>
							<th>第三方流水号</th>
							<th>支付方式</th>
							<th>金额（元）</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in ajaxData.list">
							<td>{{ ((ajaxData.pageNum-1)*10+(index+1)) }}</td>
							<td>{{ getDateTime(item.createTime)[6] }}</td>
							<td>{{ item.sysOrderId }}</td>
							<td>{{ item.transactionId||'无' }}</td>
							<td>{{ item.payType==1 ? '远特账户支付' : item.payType==2 ? '微信支付' : '支付宝支付' }}</td>
							<td>{{ parseFloat(item.payMoney)/100 }}</td>
						</tr>
					</tbody>
				</table>
				<my-page :page="ajaxData.pageNum" :maxpage="ajaxData.maxpage" :callback="ajaxData.callback"></my-page>
			</section>
		</div>
  	</div>
</template>
<script>
import {reqCommonMethod} from "../../../config/service.js";  
import pagination from "../../../componentskm/page.vue";
import { getDateTime,errorDeal } from "../../../config/utils.js"
export default{
	name:'merchantSearch',
	data (){
		return {
			off:{
				isLoad:!1,//ajax加载控制
			},
			form:{
				type:1,//1:商户，2:工号
				context:'',//输入内容
				time:'',//点击时间控制
				paySource:2//第三方流水号，来源(1:保证金,2:充值,3:开卡,4:代充)
			},
			ajaxData:{//ajax响应数据
				details:'',//商户/工号详情
				list:'',//第三方流水号列表/用户列表
				maxpage:0,//最大页数
				pageNum:1,//当前页
				callback:Function,//分页响应函数
				total:0,//列表总条数
			},
			totalInfo:{//头部数据统计
				"merchantTotal": "0",
		        "merchantActiviteNum": "0",
		        "merchantActiviteWaitNum": "0",
		        "merchantActiviteApplyNum": "0",
		        "userTotal": "0",
		        "userActiviteNum": "0",
		        "userActiviteWaitNum": "0",
		        "userActiviteApplyNum": "0",
			}
		};
	},
	components:{
		'my-page':pagination
	},
	created(){
		var vm=this;
		setTimeout(function(){
			vm.getTotal();
			let val=vm.$route.params.val;
			if(val!='null'){
				if(val.indexOf('phone')>-1){
					vm.form.type=2;
					val=parseInt(val);
				}
				vm.form.context=val;
				vm.getDetails();
			}
		},300);
	},
	methods:{
		toMap(){
			var w=document.documentElement.clientWidth,url='',vm=this;
			w<640 ? url='http://map.baidu.com/mobile/?latlng='+vm.ajaxData.details.latitude+','+vm.ajaxData.details.longitude+'' : url='http://map.baidu.com/?latlng='+vm.ajaxData.details.latitude+','+vm.ajaxData.details.longitude+'';
			window.open(url);
		},
		getTotal(){//获取顶部统计数据
			var vm=this;
			//vm.off.isLoad=true;
			// vm.AJAX('w/merchant/statistics',{},function(data){
			// 	vm.totalInfo=data.data;
			// },function(){
			// 	//vm.off.isLoad=false;
            // });
            reqCommonMethod({},function(){vm.off.isLoad=false;},"km-ecs/w/merchant/statistics")
            .then((data)=>{
                vm.totalInfo=data.data;
            }).catch(error=>errorDeal(error)); 	
		},
		shiftType(){//radio切换
			this.ajaxData={
				details:'',
				list:'',
				maxpage:0,
				pageNum:1,
				callback:Function,
				total:0
			};
			this.form.context='';
		},
		shiftPaySource(paySource){//支付订单来源切换

			if(paySource.target){
				let options=paySource.target.children;
				for(let i = 0;i<options.length;i++){
					if(options[i].selected){
						this.form.paySource=options[i].value;
					}
				}
			}else{
				this.form.paySource=paySource;
			}
			this.getList();
		},
		details(context,type){//商户上用户列表查看用户，用户上查看商户
			let vm=this;
			vm.shiftType();
			vm.form.type=type;
			vm.form.context=context;
			vm.getDetails();
		},
		getDetails(isBtn){//获取商户/工号基本信息
			var vm=this,type=vm.form.type,json,url,time=new Date().getTime();
			type==1 ? (json={dealerId:vm.form.context},url='km-ecs/w/merchant/getInfo') : (json={phone:vm.form.context},url='km-ecs/w/user/getInfo');

			if(vm.off.isLoad)return false;
			if(isBtn&&vm.form.time&&(time-vm.form.time<3000)){
				return false;
			}else if(type==1&&!json.dealerId){
				layer.open({
		            content:'请输入商户ID',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}else if(type==2&&!json.phone){
				layer.open({
		            content:'请输入工号ID',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			vm.form.time=time;
			vm.off.isLoad=true;
			// vm.AJAX(url,json,function(data){
			// 	vm.ajaxData.details=data.data;
			// 	vm.getList();
			// },function(){
			// 	vm.off.isLoad=false;
            // });
            reqCommonMethod(json,function(){vm.off.isLoad=false;},url)
            .then((data)=>{
                vm.ajaxData.details=data.data;
                vm.off.isLoad=false;
                vm.getList();
            }).catch(error=>errorDeal(error)); 	
		},
		getList(page){//获取第三方支付订单列表/获取用户列表
			var vm=this,type=vm.form.type,url,json;
			type==1 ? (json={dealerId:vm.form.context},url='km-ecs/w/audit/getUsersDetail') : (json={phone:vm.form.context,pageNum:page||1,pageSize:10,type:vm.form.paySource},url='km-ecs/w/user/paymengList');
			console.log(1)
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			vm.ajaxData.list=[];
			// vm.AJAX(url,json,function(data){
			// 	vm.ajaxData.list=data.data.list;
			// 	vm.ajaxData.total=data.data.total||0;
			// 	vm.ajaxData.maxpage=Math.ceil(parseInt(data.data.total)/10);
			// 	vm.ajaxData.pageNum=page||1;
			// 	vm.ajaxData.callback=function(v){vm.getList(v)};
			// },function(){
			// 	vm.off.isLoad=false;
            // });
             reqCommonMethod(json,function(){vm.off.isLoad=false;},url)
             .then((data)=>{
	            vm.ajaxData.list=data.data.list;
				vm.ajaxData.total=data.data.total||0;
				vm.ajaxData.maxpage=Math.ceil(parseInt(data.data.total)/10);
				vm.ajaxData.pageNum=page||1;
                vm.ajaxData.callback=function(v){vm.getList(v)};
                vm.off.isLoad=false;
             }).catch(error=>errorDeal(error)); 	
		},
		getDateTime:function(e) {
			return getDateTime(e);
		},
	}
};
</script>


<style scoped>
  @import "../assets/css/cardOrderDetails.css";
</style>
<template>
<section class="g-list-box" id="details">
	<header class="g-lis-head">
		<a class="m-details-back u-icon-back" @click="close"></a>
  	  	<div class="m-footD-btn">
  	  		<!-- <a v-if="type==2&&list.cardStatus==2" class="f-btn f-btn-warning" @click="integralLog">查看积分</a> -->
			<a class="f-btn f-btn-success" @click="orderLog">查看审核日志</a>
	  	</div>
  	</header>
	<div class="g-box">
		<table class="g-list-table">
			<tbody>
				<tr>
					<td>
						<table class="g-inner-table">
							<tbody>
								<tr v-if="list.operatorType!=7"><td>订单号码：</td><td>{{list.orderId}}<a href="javascript:void(0)" @click="detailsOrder" class="details m-l">查看详情</a></td></tr>
								<tr v-if="list.payOrderId&&list.operatorType!=7"><td>支付流水号：</td><td>{{list.payOrderId}}<a href="javascript:void(0)" @click="detailsPayOrder" class="details m-l">查看详情</a></td></tr>

								<tr><td>生成时间：</td><td>{{$parent.getDateTime(list.createTime)[6]}}</td></tr>
								<tr v-if="type==1||type==2"><td>状态修改时间：</td><td>{{$parent.getDateTime(list.modifyTime)[6]}}</td></tr>
								<tr v-show="type==2"><td>审核用时：</td>
									<td>
										<span v-show="source!=7">{{ $parent.secondsFormat(list.auditTime) }}</span>
										<span v-show="source==7">{{ $parent.secondsFormat(parseInt(list.modifyTime)-parseInt(list.createTime)) }}</span>
									</td>
								</tr>
								<tr v-if="type==1||type==2"><td>审核方式：</td>
									<td v-if="list.auditType=='0'">实时审核</td>
									<td v-else-if="list.auditType==1">事后审核</td>
									<td v-else-if="list.auditType==2">自动审核<a href="javascript:void(0)" @click="autoAuditInfo" class="details m-l">查看详情</a></td>
									<td v-else>--</td>
								</tr>
								<tr v-if="type==1"><td>当前状态：</td>
									<td>
										<span v-show="source!=7">
											<b v-show="list.status==1" class="f-c-red">待分配</b>
											<b v-show="list.status==2" class="f-c-green">已分配</b>
										</span>
										<span v-show="source==7">
											<b v-show="list.status==4" class="f-c-red">待分配</b>
											<b v-show="list.status==5" class="f-c-green">已分配</b>
										</span>
									</td>
								</tr>
								<tr v-if="type==4"><td>关闭时间：</td><td>{{$parent.getDateTime(list.modifyTime)[6]}}</td></tr>
								<tr v-if="type==4"><td>关闭原因：</td><td>{{list.closeReason}}</td></tr>
								
								<tr v-if="type==3||type==4"><td>订单状态：</td><td>{{ $parent.translateData(7,list.statusDetail) }}</td></tr>
								<tr v-if="type==2"><td>号卡状态：</td><td>{{ $parent.translateData(4,list.cardStatus) }}</td></tr>
								<tr v-if="type==2"><td>审核状态：</td>
									<td v-if="list.status==1"><b class="f-c-green">通过</b></td>
									<td v-if="list.status==3"><b class="f-c-red">超时关闭</b></td>
									<td v-if="list.status==4"><b class="f-c-blue">复审同意</b></td>
									<td v-if="list.status==2">
										<b class="f-c-red" style="padding-right:10px">拒绝</b>
										<!-- <a v-if="list.allowRecheck==1" class="agree" href="javascript:void(0)" @click="agree">同意</a> -->
										<span v-if="list.allowRecheck==2" class="red">超过复审时间</span>
									</td>
								</tr>
								<tr v-show="source!=7"><td>操作人姓名：</td><td>{{ list.operatorName }}【操作人ID：{{ list.operatorId }}】<a v-show="list.operatorName" href="javascript:void(0)" @click="detailsUser" class="details m-l">查看详情</a></td></tr>
								<tr v-if="list.operatorType==7"><td>原机主姓名：</td><td>{{ list.userNameOld }}</td></tr>
								<tr><td>商户名称：</td>
									<td>
										<span>{{ list.merchantShopName }}</span>
										<span v-show="source!=7">【信用等级：{{list.dealerLevel}}】</span>
									</td>
								</tr>
								<tr><td>渠道ID：</td><td>{{ list.dealerId }}<a v-show="list.dealerId" href="javascript:void(0)" @click="detailsMerchant" class="details m-l">查看详情</a></td></tr>
								<tr v-show="list.similarity!='0'&&source!=7"><td>活体识别相似度：</td>
									<td>{{ list.similarity }}%</td>
								</tr>
								<tr v-show="userMoreInfo.similarity&&source==7"><td>活体识别相似度：</td>
									<td>{{ userMoreInfo.similarity }}%</td>
								</tr>
								<tr><td>电话号码：</td>
									<td>{{ list.phoneNumber }}（<b v-if="list.cardType==1" class="f-c-purple">远特</b>
										<b v-if="list.cardType==2" class="f-c-yellow">联通</b>
										<b class="f-c-yellow">{{ $parent.translateData(5,list.phoneLevel) }}</b>，{{list.phoneHome}}）</td>
								</tr>
								<tr><td>号码规则：</td><td>{{ list.ruleCode }}</td></tr>
								<tr><td>用户姓名：</td><td>{{ list.userName }}</td></tr>
								<tr><td>身份证号码：</td><td>{{ list.identityCard }}</td></tr>
								<tr v-if="list.operatorType==7"><td>原机主证件号码：</td><td>{{ list.identityCardOld }}</td></tr>
								<tr><td>身份证地址：</td>
									<td>
										<span v-show="source!=7">{{ list.userAddress }}</span>
										<span v-show="source==7">{{ userMoreInfo.userAddress }}</span>
									</td>
								</tr>
								<tr v-if="list.operatorType==7"r><td>原机主证件地址：</td><td>{{ list.userAddressOld }}</td></tr>
								<tr><td>证件期限：</td>
									<td>
										<span v-show="source!=7">{{ list.period }}</span>
										<span v-show="source==7">{{ userMoreInfo.period }}</span>
									</td>
								</tr>
								<tr><td>ICCID：</td><td>{{ list.ICCID }}</td></tr>
								<tr><td>Mac地址：</td>
									<td>
										<span v-show="source!=7">{{ list.devMac }}</span>
										<span v-show="source==7">{{ userMoreInfo.devMac }}</span>
									</td>
								</tr>
								<tr><td>终端类型：</td>
									<td>
										<span v-show="source!=7">{{ list.terminalType }}</span>
										<span v-show="source==7">
											<b v-show="list.terminalType==1">IOS</b>
											<b v-show="list.terminalType==2">Android</b>
										</span>
									</td>
								</tr>
								<tr><td>识别仪名称：</td>
									<td>
										<span v-show="source!=7">{{ list.devInfo }}</span>
										<span v-show="source==7">{{ userMoreInfo.devInfo }}</span>
									</td>
								</tr>
								<!-- <tr><td>活体识别名称：</td>
									<td>
										<span v-show="source!=7">{{ list.livingImgSoftWareName }}</span>
										<span v-show="source==7">{{ userMoreInfo.livingImgSoftWareName }}</span>
									</td>
								</tr> -->
								<tr v-show="source!=7"><td>识别模式：</td><td>{{ list.openMode }}</td></tr>
								<tr v-show="type==2"><td>审核人：</td><td>{{ list.customerName }}【审核人ID：{{ list.customerId }}】</td></tr>
								
								<tr v-show="type==2"><td>状态说明：</td><td>{{ list.cardStatusReason }}</td></tr>
								<tr v-if="type==2&&list.status==2"><td>拒绝原因：</td><td><ul><li v-for="todo in filterReason(list.auditReason)"><b v-show="todo.star" class="f-c-red">*</b>{{todo.text}}</li></ul></td></tr>
								<tr v-show="type==2&&list.adutiRemarks"><td>备注：</td><td>{{ list.adutiRemarks }}</td></tr>
							</tbody>
						</table>
					</td>
					<td class="m-meida-640up m-box-img">
						<ImgZoom :imgData="imgData"></ImgZoom>
					</td>
				</tr>
				<tr class="m-box-img m-meida-640down">
					<img v-for="item in imgData" :src="item.src">
				</tr>
			</tbody>
  		</table>
  	</div>
  <um-details-view v-if="isShowDetails" :type="typeDetails" :list="detailsList" :dealerId="list.dealerId">

  </um-details-view>
</section>
</template>
<script>
import ImgZoom from '../components/ImgZoom';
import detailsView from '../components/cardOrderDetailsAlert';
import { SDK_IMAGE_URL } from '../config/service';
export default{
	name:'cardOrderDetails',
	props:{
		list:Object,
		type:Number,
		number:String,
		source:String
	},
	data(){
		return{
			imgData:[],//当前订单的图片
			isShowDetails:0,
			typeDetails:0,
			detailsList:'',
			userMoreInfo:''//sdk更多用户信息
		}
	},
	components:{
		'um-details-view':detailsView,
		'ImgZoom':ImgZoom
	},
	created:function(){
		var vm=this;
		if(vm.list.operatorType==7){
			vm.imgData[0]={'src':vm.list.frontImageOld,'name':'原机主正面照片'};
			vm.imgData[1]={'src':vm.list.backImageOld,'name':'原机主反面照片'};
			vm.imgData[2]={'src':vm.list.handImageOld,'name':'原机主手持照片'};
			vm.imgData[3]={'src':vm.list.papersImage,'name':'过户人正面照片'};
			vm.imgData[4]={'src':vm.list.backImage,'name':'过户人反面照片'};
			vm.imgData[5]={'src':vm.list.handImage,'name':'过户人手持照片'};
			vm.imgData[6]={'src':vm.list.signImage,'name':'过户人手签名照片'};
		}else{
			if(vm.source==7){
				var userMoreInfo=JSON.parse(decodeURIComponent(vm.list.userMoreInfo));
				
				if(userMoreInfo){
					vm.userMoreInfo=userMoreInfo;
					vm.imgData=[
						{'src':SDK_IMAGE_URL+userMoreInfo.handImageNameSrc,'name':'手持'},
						{'src':SDK_IMAGE_URL+userMoreInfo.imageNameSrc,'name':'正面'},
						{'src':SDK_IMAGE_URL+userMoreInfo.backImageNameSrc,'name':'反面'},
						{'src':SDK_IMAGE_URL+userMoreInfo.livingIdentificationImagePath,'name':'活体识别'}
					];
				}else{
					vm.imgData=[
						{'src':'','name':'手持'},
						{'src':'','name':'正面'},
						{'src':'','name':'反面'},
						{'src':'','name':'活体识别'}
					];
				}
				
			}else{
				vm.imgData=[
					{'src':vm.list.handImageUrl,'name':'手持'},
					{'src':vm.list.imageUrl,'name':'正面'},
					{'src':vm.list.backImageUrl,'name':'反面'},
					{'src':vm.list.livingImg,'name':'活体识别'}
				];
			}
			
			if(vm.type==2){
				if(vm.source==7){
					if(userMoreInfo){
						vm.imgData.push({'src':SDK_IMAGE_URL+vm.userMoreInfo.signImageName,'name':'手签名'});
					}else{
						vm.imgData.push({'src':'','name':'手签名'});
					}
					vm.imgData.push({'src':SDK_IMAGE_URL+vm.list.acceptanceImg,'name':'受理单'});
				}else{
					vm.imgData.push({'src':vm.list.signImageUrl,'name':'手签名'},{'src':vm.list.acceptanceImg,'name':'受理单'});
				}
			}
		}
	},
	methods:{
		close:function(){
			this.$parent.off.details=false
		},
		detailsOrder:function(){//开卡订单详情
			var vm=this;
			vm.AJAX('w/audit/openCardInfo',{"transactionId":vm.list.orderId},function(data){
				var list= data.data,str='',payed='';
				for(let i in list.optionalPackage){
					str+='<p>'+list.optionalPackage[i].title+'</p>';
				}
				if(list.payed==1){
					payed+='<li class="clr"><div class="fl">实付价格：</div><div class="fright">'+(parseFloat(list.actualPrice)/100).toFixed(2)+'元<b class="f-c-grey">（号码占用费'+(parseFloat(list.actualPrice_x)/10000).toFixed(2)+'元+预存话费'+(parseFloat(list.actualPrice_y)/10000).toFixed(2)+'元）</b></div></li>'+
						   '<li class="clr"><div class="fl">抵扣金额：</div><div class="fright">'+(parseFloat(list.deductionMoney)/100).toFixed(2)+'元</div></li>'+
						   '<li class="clr"><div class="fl">开卡返佣：</div><div class="fright">'+(parseFloat(list.commission)/100).toFixed(2)+'元<b class="f-c-grey">（号码占用费'+(parseFloat(list.commission_x)/100).toFixed(2)+'元+预存话费'+(parseFloat(list.commission_y)/100).toFixed(2)+'元）</b></div></li>'+
						   '<li class="clr"><div class="fl">支付模式：</div><div class="fright">'+list.payChannel+'</div></li>';
				}
				layer.open({
					content:'<ul class="f-scroll-lt lay-details">'+
								'<li class="clr"><div class="fl">订单号：</div><div class="fright">'+list.sysOrderId+'</div></li>'+
								'<li class="clr"><div class="fl">BOSS流水号：</div><div class="fright">'+list.transactionId+'</div></li>'+
								'<li class="clr"><div class="fl">用户姓名：</div><div class="fright">'+list.userName+'</div></li>'+
								'<li class="clr"><div class="fl">电话号码：</div><div class="fright">'+list.phoneNumber+'（<b class="f-c-grey">'+vm.$parent.translateData(5,list.phoneLevel)+'</b>，'+list.phoneHome+'）</div></li>'+
								'<li class="clr"><div class="fl">ICCID：</div><div class="fright">'+list.ICCID+'</div></li>'+
								'<li class="clr"><div class="fl">IMSI卡号：</div><div class="fright">'+list.esim+'</div></li>'+
								'<li class="clr"><div class="fl">状态修改时间：</div><div class="fright">'+vm.$parent.getDateTime(list.timestamp)[6]+'</div></li>'+
								'<li class="clr"><div class="fl">应付价格：</div><div class="fright">'+((parseFloat(list.price_x)/100)+(parseFloat(list.price_y)/100)).toFixed(2)+'元<b class="f-c-grey">（号码占用费'+(parseFloat(list.price_x)/100).toFixed(2)+'元+预存话费'+(parseFloat(list.price_y)/100).toFixed(2)+'元）</b></div></li>'+payed+
								'<li class="clr"><div class="fl">已选套餐：</div><div class="fright">'+list.package+'</div></li>'+
								'<li class="clr"><div class="fl">已选可选包：</div><div class="fright">'+str+'</div></li></ul>',
					type:0,
					title:'开卡订单详情',
					btn:0,
					style:'width:auto;'
				});
			});
		},
		detailsPayOrder:function(){//支付订单详情
			var vm=this;
			vm.AJAX('w/audit/payInfo',{"payId":vm.list.payOrderId},function(data){
				var list= data.data;
				layer.open({
					content:'<ul class="f-scroll-lt lay-details">'+
					'<li class="clr"><div class="fl">系统流水号：</div><div class="fright">'+list.sysPayId+'</div></li>'+
					'<li class="clr"><div class="fl">第三方流水号：</div><div class="fright">'+list.payId+'</div></li>'+
					'<li class="clr"><div class="fl">支付渠道：</div><div class="fright">'+list.payChannel+'</div></li>'+
					'<li class="clr"><div class="fl">支付方式：</div><div class="fright">'+list.payType+'</div></li>'+
					'<li class="clr"><div class="fl">支付金额：</div><div class="fright">'+list.payMoney+'元</div></li></ul>',
					type:0,
					title:'支付订单详情',
					btn:0,
					style:'width:auto;'
				});
			})
		},
		detailsUser:function(){//操作者详情
			var vm=this;
			vm.AJAX('w/audit/getUserInfo',{"userId":vm.list.operatorId},function(data){
				vm.detailsList=data.data;
				vm.isShowDetails=true;
				vm.typeDetails=1;
			})
		},
		detailsMerchant:function(){//商户详情
			var vm=this;
			vm.AJAX('w/audit/getMerchantInfo',{"dealerId":vm.list.dealerId},function(data){
				vm.detailsList=data.data;
				vm.isShowDetails=true;
				vm.typeDetails=2;
			})
		},
		autoAuditInfo(){//自动审核详情
			var vm=this;
			vm.AJAX("w/handler/query",{"opKey":"order.autoAudit.details","params":['order_id="'+vm.list.orderId+'"'],"pageSize":"10","pageNum":"-1"},function(data){
				var list_item1= data.data.list[0];
				layer.open({
					content:`<ul class="f-scroll-lt lay-details o-fl-w">
					<li class="clr"><div class="fl">正面与手持对比相似度：</div><div class="fright">${list_item1.frontHandImageSimilarity}%</div></li>
					<li class="clr"><div class="fl">正面与第三方对比相似度：</div><div class="fright">${list_item1.frontImageSimilarity}%</div></li>
					<li class="clr"><div class="fl">手持与第三方相似度：</div><div class="fright">${list_item1.handImageSimilarity}%</div></li>
					<li class="clr"><div class="fl">活体识别照相似度：</div><div class="fright">${list_item1.livingImageSimilarity}%</div></li></ul>`,
					type:0,
					title:'自动审核详情',
					btn:0,
					style:'width:auto;'
				});
			})
		},
		agree:function(){//复审同意
			var vm=this;
			vm.AJAX('w/audit/reAudit',{"orderId":vm.list.orderId},function(data){
				layer.open({
		            content:'复审成功',
		            skin: 'msg',
		            time: 4,
		            msgSkin:'success',
		        })
				vm.list.status=4;
				vm.list.cardStatus=1
				vm.$parent.list[parseInt(vm.number)].status=4;
				vm.$parent.list[parseInt(vm.number)].cardStatus=1;
			})
		},
		orderLog:function(){//审核日志
			var vm=this;
			vm.AJAX('w/audit/log',{"orderId":vm.list.orderId},function(data){
				var str='',list= data.data;
				for(var i in list){
					str+='<li><time><b></b>'+vm.$parent.getDateTime(list[i].modifyTime)[6]+'</time><div>'+list[i].context+'</div></li>'
				}
				layer.open({
					content:'<ul class="lay-log">'+str+'</ul>',
					type:0,
					title:'审核日志',
					btn:0,
					style:'width:auto;'
				});
			})
		},
		integralLog:function(){//积分详情
			var vm=this;
			vm.AJAX('c/audit/searchIntegration',{"orderId":vm.list.orderId},function(data){
				var statusStr='',reasonStr='';
				if(data.data.cardStatus!="1")reasonStr+='<li><span>原因：</span>'+data.data.cardStatusReason+'</li>';
				layer.open({
					content:'<ul class="lay-integralLog"><li><span>本级获得积分：</span>'+data.data.integration+'积分</li><li><span>上级获得积分：</span>'+data.data.superiorIntegration+'积分</li>'+reasonStr+'</ul>',
					type:0,
					title:'积分查询',
					btn:0,
					style:'width:auto;'
				});
			})
		},
		filterReason:function(reason){
			var reasonArr=reason.split('|'),str=[];
			var starReason=['非本人现场手持证卡照',"证件与手持合影照中证件不同","证件填报信息与证照中信息不符(包括但不限于证件号码,姓名,地址等信息)","发证机关有误或与证件地址不符","部分或全部照片为翻拍或疑似合成"];
			for(var i in reasonArr){
				if(reasonArr[i]){
					str[i]={'star':0,'text':''};
					for(var j in starReason){
						if(starReason[j]==reasonArr[i]){str[i].star=true;}
						else if(j==(starReason.length-1)){str[i].star=false}
					}
					str[i].text=reasonArr[i];
				}
			}
			return str;
		},
	}
}
</script>


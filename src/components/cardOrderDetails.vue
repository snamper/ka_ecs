<style scoped>
  @import "../assets/css/searchDetails.css";
</style>
<template>
<section class="g-list-box" id="details">
	<header class="g-lis-head">
		<a class="m-details-back" @click="close"></a>
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
								<tr v-if="type==1||type==2"><td>状态修改时间：</td><td>{{list.modifyTime?$parent.getDateTime(list.modifyTime)[6]:''}}</td></tr>
								<tr v-if="type==4"><td>关闭时间：</td><td>{{list.modifyTime?$parent.getDateTime(list.modifyTime)[6]:''}}</td></tr>
								<tr v-if="type==4"><td>关闭原因：</td><td>{{list.closeReason}}</td></tr>
								<tr v-if="type==1"><td>当前状态：</td>
									<td v-if="list.status==1" class="f-c-red">待分配</td>
									<td v-if="list.status==2" class="f-c-green">已分配</td>
								</tr>
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

								<tr v-if="type==1||type==2"><td>审核方式：</td>
									<td v-if="list.auditType==0">实时审核</td>
									<td v-if="list.auditType==1">事后审核</td>
								</tr>

								<tr><td>用户姓名：</td><td>{{ list.userName }}</td></tr>
								<tr v-if="list.operatorType==7"><td>原机主姓名：</td><td>{{ list.userNameOld }}</td></tr>
								<tr><td>商户名称：</td><td>{{ list.merchantShopName }}【信用等级：{{list.dealerLevel}}】</td></tr>
								<tr><td>相似度：</td><td>{{ list.similarity }}%</td></tr>
								<tr><td>电话号码：</td><td>{{ list.phoneNumber }}（<b v-if="list.cardType==1" class="f-c-purple">远特</b><b v-if="list.cardType==2" class="f-c-yellow">联通</b><b class="f-c-yellow">{{ typeCheck(4,list.phoneLevel) }}</b>，{{list.phoneHome}}）</td></tr>
								<tr><td>号码规则：</td><td>{{ list.ruleCode }}</td></tr>
								<tr><td>身份证号码：</td><td>{{ list.identityCard }}</td></tr>
								<tr v-if="list.operatorType==7"><td>原机主证件号码：</td><td>{{ list.identityCardOld }}</td></tr>
								<tr><td>身份证地址：</td><td>{{ list.userAddress }}</td></tr>
								<tr v-if="list.operatorType==7"r><td>原机主证件地址：</td><td>{{ list.userAddressOld }}</td></tr>
								<tr><td>证件期限：</td><td>{{ list.period }}</td></tr>
								<tr><td>ICCID：</td><td>{{ list.ICCID }}</td></tr>
								<tr><td>Mac地址：</td><td>{{ list.devMac }}</td></tr>
								<tr><td>终端类型：</td><td>{{ list.terminalType }}</td></tr>
								<tr><td>识别仪名称：</td><td>{{ list.devInfo }}</td></tr>
								<tr><td>活体识别名称：</td><td>{{ list.livingImgSoftWareName }}</td></tr>
								<tr><td>识别模式：</td><td>{{ list.openMode }}</td></tr>
								<tr><td>审核人：</td><td>{{ list.customerName }}【审核人ID：{{ list.customerId }}】</td></tr>
								<tr><td>操作人姓名：</td><td>{{ list.operatorName }}【操作人ID：{{ list.operatorId }}】<a v-if="list.operatorName" href="javascript:void(0)" @click="detailsUser" class="details m-l">查看详情</a></td></tr>
								<tr><td>渠道ID：</td><td>{{ list.dealerId }}<a v-if="list.dealerId" href="javascript:void(0)" @click="detailsMerchant" class="details m-l">查看详情</a></td></tr>
								<tr v-if="type==2"><td>审核用时：</td><td>{{ $parent.translateData(6,list.auditTime) }}</td></tr>
								<tr v-if="type==2"><td>失败原因：</td><td>{{ list.cardStatusReason }}</td></tr>
								<tr v-if="type==2&&list.status==2"><td>拒绝原因：</td><td><ul><li v-for="todo in filterReason(list.auditReason)"><b v-if="todo.star" class="f-c-red">*</b>{{todo.text}}</li></ul></td></tr>
								<tr v-if="type==2"><td>备注：</td><td>{{ list.adutiRemarks }}</td></tr>
							</tbody>
						</table>
					</td>
					<td class="m-box-img m-meida-640up">
						<div class="m-zoomContent zoom-c">
							<div class="m-img-c"><div id="imgContent" class="fGrab" :class="{fGrabbing:mouse.off}" :style="zoomStyle" @mousemove="mouseOn" @mousedown="mouseOn" @mouseup="mouseOn" @mouseout="mouseOn" @mousewheel="mouseOn"></div></div>
							<a href="javascript:void(0)" class="slide slide-left" @click="slide(1)"></a>
							<a href="javascript:void(0)" class="slide slide-right" @click="slide(2)"></a>
							<a href="javascript:void(0)" class="rotate" @click="rotate"><span></span></a>
							<div class="text">{{imgData[imgIndex].name}}</div>
						</div>
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
import detailsView from '../components/cardOrderDetailsAlert';
export default{
	name:'cardOrderDetails',
	props:{
		list:Object,
		type:Number,
		number:String,
	},
	data(){
		return{
			zoomStyle:{"transform":"translate3d(0,0,0) scale(1) rotate(0deg)"},//缩放样式
			transformStyle:{x:0,y:0,s:1,r:0},//缩放初始坐标
			mouse:{x:0,y:0,off:!1},//鼠标坐标
			imgData:[{"name":''}],//当前订单的图片
			imgIndex:0,//图片索引
			isShowDetails:0,
			typeDetails:0,
			detailsList:''
		}
	},
	components:{
		'um-details-view':detailsView
	},
	created:function(){
	  console.log(this.list);
		var vm=this;
		if(vm.list.operatorType==7){
			vm.imgData[0]={'src':vm.list.frontImageOld||'assets/img/no-img.png','name':'原机主正面照片'};
			vm.imgData[1]={'src':vm.list.backImageOld||'assets/img/no-img.png','name':'原机主反面照片'};
			vm.imgData[2]={'src':vm.list.handImageOld||'assets/img/no-img.png','name':'原机主手持照片'};
			vm.imgData[3]={'src':vm.list.papersImage||'assets/img/no-img.png','name':'过户人正面照片'};
			vm.imgData[4]={'src':vm.list.backImage||'assets/img/no-img.png','name':'过户人反面照片'};
			vm.imgData[5]={'src':vm.list.handImage||'assets/img/no-img.png','name':'过户人手持照片'};
			vm.imgData[6]={'src':vm.list.signImage||'assets/img/no-img.png','name':'过户人手签名照片'};
		}else{
			vm.imgData=[{'src':vm.list.handImageUrl||'assets/img/no-img.png','name':'手持'},{'src':vm.list.imageUrl||'assets/img/no-img.png','name':'正面'},{'src':vm.list.backImageUrl||'assets/img/no-img.png','name':'反面'},{'src':vm.list.livingImg||'assets/img/no-img.png','name':'活体识别'}];
			if(vm.type==2){
				vm.imgData.push({'src':vm.list.signImageUrl||'assets/img/no-img.png','name':'手签名'},{'src':vm.list.acceptanceImg||'assets/img/no-img.png','name':'受理单'})
			}
		}
		vm.zoomStyle.backgroundImage='url('+vm.imgData[0].src+')';
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
								'<li class="clr"><div class="fl">电话号码：</div><div class="fright">'+list.phoneNumber+'（<b class="f-c-grey">'+vm.typeCheck(4,list.phoneLevel)+'</b>，'+list.phoneHome+'）</div></li>'+
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
		rotate:function(){//旋转
			var deg=parseInt(this.zoomStyle.transform.match(/\((\S*)deg/)[1]);
			deg+=90;
			this.transformStyle.r=deg;
			this.zoomStyle.transform='translate3d(0,0,0) scale(1) rotate('+deg+'deg)';
		},
		slide:function(index){//切换
			var len=this.imgData.length;
			index==2?this.imgIndex<(len-1) ? this.imgIndex+=1 : this.imgIndex=0 : this.imgIndex>0 ? this.imgIndex-=1 : this.imgIndex=len-1;
			this.zoomStyle.backgroundImage='url('+this.imgData[this.imgIndex].src+')';
			this.transformStyle={x:0,y:0,s:1,r:0};
			this.zoomStyle.transform='translate3d(0,0,0) scale(1) rotate(0deg)';
		},
		mouseOn:function(e){//图片缩放，鼠标事件
			var vm=this;
			switch(e.type){
				case "mousedown":
					vm.mouse.off=true;
					vm.mouse.x=e.clientX;
					vm.mouse.y=e.clientY;
					vm.zoomStyle.transform='translate3d('+vm.transformStyle.x+'px,'+vm.transformStyle.y+'px,0) scale('+vm.transformStyle.s+') rotate('+vm.transformStyle.r+'deg)';
					break;
				case "mousemove":
					if(vm.mouse.off){
						var x=e.clientX-vm.mouse.x,y=e.clientY-vm.mouse.y;
						vm.transformStyle.x+=x;
						vm.transformStyle.y+=y;
						vm.mouse.x=e.clientX;
						vm.mouse.y=e.clientY;
						vm.zoomStyle.transform='translate3d('+vm.transformStyle.x+'px,'+vm.transformStyle.y+'px,0) scale('+vm.transformStyle.s+') rotate('+vm.transformStyle.r+'deg)';
					}
					break;
				case "mouseup":
					vm.mouse.off=false;
					break;
				case "mouseout":
					vm.mouse.off=false;
					break;
				case "mousewheel":case "DOMMouseScroll":
					if(e.wheelDelta&&e.wheelDelta>0||(e.detail&&e.detail<0)){
						vm.transformStyle.s.toFixed(0)==3?vm.transformStyle.s=3:vm.transformStyle.s+=0.2;

					}else{
						vm.transformStyle.s.toFixed(1)==0.4?vm.transformStyle.s=0.4:vm.transformStyle.s-=0.2;
					}
					vm.zoomStyle.transform='translate3d('+vm.transformStyle.x+'px,'+vm.transformStyle.y+'px,0) scale('+vm.transformStyle.s+') rotate('+vm.transformStyle.r+'deg)';
					break;
			}
		},
		typeCheck:function(v,l){
			var ret=new Array();
			v=parseInt(v);
			if(v!=1&&v!=2&&v!=3&&v!=4){
				ret[0]="其他";
				ret[1]="证件地址";
				ret[2]="证件号码";
				return ret;
			}
			switch(v){
				case 1:
					ret[0]="身份证";
					ret[1]="身份证地址";
					ret[2]="身份证号码";
					return ret;
					break;
				case 2:
					ret[0]="军官证";
					ret[1]="发证机关";
					ret[2]="编号";
					return ret;
					break;
				case 3:
					ret[0]="护照";
					ret[1]="签发地址";
					ret[2]="护照号码";
					return ret;
					break;
				case 4:
					var level=["普号","特级","一级","二级","三级","四级","五级","六级","七级","八级","九级","十级","十一级"];
	   	 			return l||l==0 ? level[parseInt(l)] : '未知';
					break;
			}
		}
	}
}
</script>


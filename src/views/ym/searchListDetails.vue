<style scoped>
  @import "../../assets/ym/css/searchDetails.css";
  /* @import "../../assets/km/css/cardOrderDetails.css"; */
</style>
<template>
<section class="g-list-box" id="details">
	<header class="g-lis-head">
		<a class="m-details-back" @click="close"></a>
  	  	<div class="m-footD-btn">
  	  		<a v-if="type==2&&list.cardStatus==2" class="f-btn f-btn-warning" @click="integralLog">查看积分</a>
			<a class="f-btn f-btn-success" @click="orderLog">查看审核日志</a>
	  	</div>
  	</header>
	<div class="g-box">
		<table class="g-list-table" :class="{transfer:list.operatorType==6}">
			<tbody v-if="list.operatorType!=6">
				<tr>
					<td>
						<table class="g-inner-table">
							<tbody>
								<tr><td>订单号码：</td><td>{{list.orderId}}</td></tr>
								<tr><td>生成时间：</td><td>{{$parent.getDateTime(list.createTime)[6]}}</td></tr>
								<tr v-if="type==2"><td>开卡状态：</td><td>{{ $parent.translateData(4,list.cardStatus) }}</td></tr>
								<tr v-if="type==2"><td>订单状态：</td>
									<td v-if="list.result==1"><b class="f-c-green">通过</b></td>
									<td v-if="list.result==3"><b class="f-c-blue">复审同意</b></td>
									<td v-if="list.result==4"><b class="f-c-purple">准同意</b></td>
									<td v-if="list.result==2&&parseInt(list.recheckLastTime)<new Date().getTime()"><b class="f-c-red" style="padding-right:10px">拒绝</b><span class="red">超过复审时间</span></td>
									<td v-if="list.result==2&&parseInt(list.recheckLastTime)>=new Date().getTime()"><b class="f-c-red" style="padding-right:10px">拒绝</b><a :name="list.orderId" @="agree" class="agree" href="javascript:void(0)" @click="agree">同意</a></td>
								</tr>
								<tr v-if="type==2"><td>审核方式：</td><td>
									<span v-show="list.auditType==1">实时审核</span>
									<span v-show="list.auditType==2">自动审核</span>
									<a href="javascript:void(0)" @click="autoAuditInfo" class="details m-l">查看详情</a>
								</td></tr>
								<tr v-if="type==1"><td>自动审核详情：</td><td>
									<a href="javascript:void(0)" @click="autoAuditInfo" class="details m-l">点击查看</a>
								</td></tr>
								<tr v-if="type==2"><td>开卡状态说明：</td><td>{{ list.cardStatusReason }}</td></tr>
								<tr><td>用户姓名：</td><td>
									<span class="o-order-modify" v-if="list.result==4&&list.updName==0">
										<span v-if="!modify.off1">{{ list.userName }}</span>
										<input v-if="modify.off1" maxlength="30" type="text" v-model="modify.userName">
										<span class="btn-group" v-if="off.power4||off.power1">
											<a href="javascript:void(0)" v-if="!modify.off1" @click="modifyOrder(1,1)" title="修改" class="modify"></a>
											<a href="javascript:void(0)" v-if="modify.off1" @click="modifyOrder(2,1)" title="完成" class="myicon-success-circle f-c-green complete"></a>
											<a href="javascript:void(0)" v-if="modify.off1" @click="modifyOrder(3,1)" title="取消" class="myicon-cancel f-c-red cancel"></a>
										</span>
									</span>
									<span v-else>{{ list.userName }}</span>
								</td></tr>
								<tr><td>电话号码：</td><td>{{ list.userPhone }}（{{ typeCheck(4,list.phoneLevel) }}）</td></tr>
								<tr><td>{{ typeCheck(list.papersType)[2] }}：</td><td>
									<span class="o-order-modify" v-if="list.result==4&&list.updPapersCode==0">
										<span v-if="!modify.off3">{{ list.papersCode }}</span>
										<input v-if="modify.off3" maxlength="30" type="text" v-model="modify.papersCode">
										<span class="btn-group" v-if="off.power4||off.power1">
											<a href="javascript:void(0)" v-if="!modify.off3" @click="modifyOrder(1,3)" title="修改" class="modify"></a>
											<a href="javascript:void(0)" v-if="modify.off3" @click="modifyOrder(2,3)" title="完成" class="myicon-success-circle f-c-green complete"></a>
											<a href="javascript:void(0)" v-if="modify.off3" @click="modifyOrder(3,3)" title="取消" class="myicon-cancel f-c-red cancel"></a>
										</span>
									</span>
									<span v-else>{{ list.papersCode }}</span>
								</td></tr>
								<tr><td>证件类型：</td><td>{{ typeCheck(list.papersType)[0] }}</td></tr>
								<tr><td>{{ typeCheck(list.papersType)[1] }}：</td><td>
									<span class="o-order-modify" v-if="list.result==4&&list.updAddress==0">
										<span v-if="!modify.off2">{{ list.userAddress }}</span>
										<textarea v-if="modify.off2" maxlength="50" type="text" v-model="modify.userAddress">{{modify.userAddress}}</textarea>
										<span class="btn-group" v-if="off.power4||off.power1">
											<a href="javascript:void(0)" v-if="!modify.off2" @click="modifyOrder(1,2)" title="修改" class="modify"></a>
											<a href="javascript:void(0)" v-if="modify.off2" @click="modifyOrder(2,2)" title="完成" class="myicon-success-circle f-c-green complete"></a>
											<a href="javascript:void(0)" v-if="modify.off2" @click="modifyOrder(3,2)" title="取消" class="myicon-cancel f-c-red cancel"></a>
										</span>
									</span>
									<span v-else>{{ list.userAddress }}</span>
								</td></tr>
								<tr><td>证件期限：</td><td>{{ list.validityPeriod}}</td></tr>
								<tr><td>号码归属部门：</td><td>{{ list.phone_depName }}</td></tr>
								<tr><td>UCCID：</td><td>{{ list.cardNumber }}</td></tr>
								<tr><td>Mac地址：</td><td>{{ list.devMacAddr }}</td></tr>
								<tr><td>终端类型：</td><td>{{ list.terminalType }}</td></tr>
								<tr><td>识别仪名称：</td><td>{{ list.devSN }}</td></tr>
								<tr><td>识别模式：</td><td>{{ list.openMode }}</td></tr>
								<tr><td>照片模式：</td><td>{{ list.photoMode }}</td></tr>
								<tr v-if="type==2"><td>审核人姓名：</td><td>{{ list.customerName }}</td></tr>
								<tr><td>操作人：</td><td>{{ list.operatorName }}【操作人工号：{{ list.operatorId }}】</td></tr>
								<tr><td>操作人部门：</td><td>{{ list.depName }}</td></tr>
								<tr v-if="type==2&&list.result==2"><td>拒绝原因：</td><td><ul><li v-for="todo in filterReason(list.reason)"><b v-if="todo.star" class="f-c-red">*</b>{{todo.text}}</li></ul></td></tr>
								<tr v-if="type==2&&list.result==2"><td>备注：</td><td>{{ list.comment }}</td></tr>
								<tr v-if="type==2&&list.result==4"><td>准同意理由：</td><td>{{ list.buggingReason }}</td></tr>
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
					<img :src="imgData[0].src">
					<img :src="imgData[1].src">
					<img :src="imgData[2].src">
					<img :src="imgData[3].src">
					<img :src="imgData[4].src">
				</tr>
			</tbody>
			<!--过户办理-->
			<tbody v-if="list.operatorType==6">
				<tr>
					<td><span>订单号码：</span>{{list.orderId}}</td>
					<td><span>电话号码：</span>{{list.userPhone}}（{{typeCheck(4,list.phoneLevel)}}）</td>
					<td><span>审核方式：</span>
						<b v-show="list.auditType==1">实时审核</b>
						<b v-show="list.auditType==2">自动审核<a href="javascript:void(0)" @click="autoAuditInfo" class="details m-l">查看详情</a></b>
					</td>
				</tr>
				<tr>
					<td><span>生成时间：</span>{{$parent.getDateTime(list.createTime)[6]}}</td>
					<td><span>原机主姓名：</span>{{list.userNameOld}}</td>
					<td class="clr"><span class="fl">过户人姓名：</span>
						
						<span class="o-order-modify" v-if="list.result==4&&list.updName==0">
							<i v-if="!modify.off1">{{ list.userName }}</i>
							<input v-if="modify.off1" maxlength="30" type="text" v-model="modify.userName">
							<div class="btn-group">
								<a href="javascript:void(0)" v-if="!modify.off1" @click="modifyOrder(1,1)" title="修改" class="modify"></a>
								<a href="javascript:void(0)" v-if="modify.off1" @click="modifyOrder(2,1)" title="完成" class="myicon-success-circle f-c-green complete">x</a>
								<a href="javascript:void(0)" v-if="modify.off1" @click="modifyOrder(3,1)" title="取消" class="myicon-cancel f-c-red cancel">xx</a>
							</div>
						</span>
						<span v-else>{{ list.userName }}</span>
					</td>
				</tr>
				<tr>
					<td><span>终端类型：</span>{{list.terminalType}}</td>
					<td><span>证件类型：</span>{{typeCheck(list.papersTypeOld)[0]}}</td>
					<td><span>证件类型：</span>{{typeCheck(list.papersType)[0]}}</td>
				</tr>
				<tr>
					<td><span>识别仪名称：</span>{{list.devSN}}</td>
					<td><span>{{ typeCheck(list.papersTypeOld)[2] }}：</span>{{list.papersCodeOld}}</td>
					<td class="clr"><span class="fl">{{ typeCheck(list.papersType)[2] }}：</span>
						<span class="o-order-modify" v-if="list.result==4&&list.updPapersCode==0">
							<i v-if="!modify.off3">{{ list.papersCode }}</i>
							<input v-if="modify.off3" maxlength="30" type="text" v-model="modify.papersCode">
							<div class="btn-group">
								<a href="javascript:void(0)" v-if="!modify.off3" @click="modifyOrder(1,3)" title="修改" class="modify"></a>
								<a href="javascript:void(0)" v-if="modify.off3" @click="modifyOrder(2,3)" title="完成" class="myicon-success-circle f-c-green complete"></a>
								<a href="javascript:void(0)" v-if="modify.off3" @click="modifyOrder(3,3)" title="取消" class="myicon-cancel f-c-red cancel"></a>
							</div>
						</span>
						<span v-else>{{ list.papersCode }}</span>
					</td>
				</tr>
				<tr>
					<td><span>识别模式：</span>{{list.openMode}}</td>
					<td><span>{{ typeCheck(list.papersTypeOld)[1] }}：</span>{{list.userAddressOld}}</td>
					<td class="clr"><span class="fl">{{ typeCheck(list.papersType)[1] }}：</span>
						<span class="o-order-modify" v-if="list.result==4&&list.updAddress==0">
							<i v-if="!modify.off2">{{ list.userAddress }}</i>
							<input v-if="modify.off2" maxlength="50" type="text" v-model="modify.userAddress">
							<div class="btn-group">
								<a href="javascript:void(0)" v-if="!modify.off2" @click="modifyOrder(1,2)" title="修改" class="modify"></a>
								<a href="javascript:void(0)" v-if="modify.off2" @click="modifyOrder(2,2)" title="完成" class="myicon-success-circle f-c-green complete"></a>
								<a href="javascript:void(0)" v-if="modify.off2" @click="modifyOrder(3,2)" title="取消" class="myicon-cancel f-c-red cancel"></a>
							</div>
						</span>
						<span v-else>{{ list.userAddress }}</span>
					</td>
				</tr>
				<tr>
					<td><span>Mac地址：</span>{{list.devMacAddr}}</td>
					<td><span>证件期限：</span>{{list.validityPeriodOld}}</td>
					<td><span>证件期限：</span>{{list.validityPeriod}}</td>
				</tr>
				<tr>
					<td><span>操作人：</span>{{list.operatorName}}【操作人工号：{{list.operatorId}}】</td>
					<td colspan="2"><span>操作人部门：</span>{{list.depName}}</td>
				</tr>
				<tr>
					<td><span>备注：</span>{{list.comment}}</td>
					<td colspan="2"><span>号码归属部门：</span>{{list.phone_depName}}</td>
				</tr>
				<tr v-if="type==2">
					<td><span>开卡状态：</span>{{ $parent.translateData(4,list.cardStatus) }}</td>
					<td><span>订单状态：</span>
						<i v-if="list.result==1"><b class="f-c-green">通过</b></i>
						<i v-if="list.result==3"><b class="f-c-blue">复审同意</b></i>
						<i v-if="list.result==4"><b class="f-c-yellow">准同意</b></i>
						<i v-if="list.result==2&&parseInt(list.recheckLastTime)<new Date().getTime()"><b class="f-c-red" style="padding-right:10px">拒绝</b><span class="red">超过复审时间</span></i>
						<i v-if="list.result==2&&parseInt(list.recheckLastTime)>=new Date().getTime()"><b class="f-c-red" style="padding-right:10px">拒绝</b><a :name="list.orderId" @="agree" class="agree" href="javascript:void(0)" @click="agree">同意</a></i>
					</td>
					<td><span>开卡状态说明：</span>{{ list.cardStatusReason }}</td>
				</tr>
				<tr v-if="type==2&&list.result==2">
					<td colspan="3">
						<span>拒绝原因：</span>
						<ul><li v-for="todo in filterReason(list.reason)"><b v-if="todo.star" class="f-c-red">*</b>{{todo.text}}</li></ul>
					</td>
				</tr>
				<tr v-if="type==2&&list.result==4">
					<td colspan="3">
						<span>准同意理由：</span>
						{{ list.buggingReason }}
					</td>
				</tr>
			</tbody>
  		</table>
  		<div class="g-transfer-img" v-if="list.operatorType==6">
			<div class="m-zoomContent zoom-c">
				<div class="m-img-c"><div id="imgContent" title="1" class="fGrab" :class="{fGrabbing:mouse.off}" :style="zoomStyle_1" @mousemove="mouseOn" @mousedown="mouseOn" @mouseup="mouseOn" @mouseout="mouseOn" @mousewheel="mouseOn"></div></div>
				<a href="javascript:void(0)" class="slide slide-left" @click="slide(1)"></a>
				<!-- <a href="javascript:void(0)" class="slide slide-right" @click="slide(2)"></a> -->
				<a href="javascript:void(0)" name="1" class="rotate" @click="rotate"><span></span></a>
				<div class="text">{{imgData[imgIndex*2].name}}</div>
			</div>
			<div class="m-zoomContent zoom-c">
				<div class="m-img-c"><div id="imgContent" title="2" class="fGrab" :class="{fGrabbing:mouse.off}" :style="zoomStyle_2" @mousemove="mouseOn" @mousedown="mouseOn" @mouseup="mouseOn" @mouseout="mouseOn" @mousewheel="mouseOn"></div></div>
				<!-- <a href="javascript:void(0)" class="slide slide-left" @click="slide(1)"></a> -->
				<a href="javascript:void(0)" class="slide slide-right" @click="slide(2)"></a>
				<a href="javascript:void(0)" name="2" class="rotate" @click="rotate"><span></span></a>
				<div class="text">{{imgData[(imgIndex*2+1)].name}}</div>
			</div>
		</div>
  </div>
</section>
</template>
<script>
import {reqCommonMethod} from "../../config/service.js";
import {setStore, getStore, createDownload,errorDeal} from '../../config/utils';
export default{
	name:'pagination',
	props:{
		list:Object,
		type:Number,
		number:String,
	},
	data(){
		return{
			zoomStyle:{"transform":"translate3d(0,0,0) scale(1) rotate(0deg)"},//缩放样式
			zoomStyle_1:{"transform":"translate3d(0,0,0) scale(1) rotate(0deg)"},//缩放样式
			zoomStyle_2:{"transform":"translate3d(0,0,0) scale(1) rotate(0deg)"},//缩放样式
			transformStyle:{x:0,y:0,s:1,r:0},//缩放初始坐标
			mouse:{x:0,y:0,off:!1},//鼠标坐标
			imgData:[{"name":''}],//当前订单的图片
			imgIndex:0,//图片索引
			modify:{
				off1:0,
				off2:0,
				off3:0,
				userName:'',
				userAddress:'',
				papersCode:''
            },
            off:{
                power4:0,
                power1:0,
            }
		};
	},
	created:function(){
		const vm=this;
        let userInfo=getStore("KA_ECS_USER");
        vm.userInfo=userInfo;
        var isadmin=vm.userInfo.isadminYm.split(","); 
        function IsInArray(arr,val){ 
            var testStr=','+arr.join(",")+","; 
            return testStr.indexOf(","+val+","); 
        }
        IsInArray(isadmin,'1')>-1?vm.off.power1=true : vm.off.power1=false;
        IsInArray(isadmin,'4')>-1?vm.off.power4=true : vm.off.power4=false;
		if(vm.list.operatorType==6){
			vm.imgData[0]={'src':vm.list.frontImageOld||'../../assets/ym/img/no-img.png','name':'原机主正面照片'};
			vm.imgData[1]={'src':vm.list.transferFrontImageOld||'../../assets/ym/img/no-img.png','name':'原机主过户正面照片'};
			vm.imgData[2]={'src':vm.list.backImageOld||'../../assets/ym/img/no-img.png','name':'原机主反面照片'};//
			vm.imgData[3]={'src':vm.list.transferBackImageOld||'../../assets/ym/img/no-img.png','name':'原机主过户反面照片'};
			vm.imgData[4]={'src':vm.list.handImageOld||'../../assets/ym/img/no-img.png','name':'原机主手持照片'};
			vm.imgData[5]={'src':vm.list.transferHandImageOld||'../../assets/ym/img/no-img.png','name':'原机主过户手持照片'};

			vm.imgData[6]={'src':vm.list.papersImage||'../../assets/ym/img/no-img.png','name':'过户人正面照片'};
			vm.imgData[7]={'src':vm.list.backImage||'../../assets/ym/img/no-img.png','name':'过户人反面照片'};
			vm.imgData[8]={'src':vm.list.handImage||'../../assets/ym/img/no-img.png','name':'过户人手持照片'};
			vm.imgData[9]={'src':vm.list.signImage||'../../assets/ym/img/no-img.png','name':'过户人手签名照片'};

			vm.zoomStyle_1.backgroundImage='url('+vm.imgData[0].src+')';
			vm.zoomStyle_2.backgroundImage='url('+vm.imgData[1].src+')';
		}else{
			vm.imgData=[{'src':vm.list.handImage||'../../assets/ym/img/no-img.png','name':'手持'},{'src':vm.list.papersImage||'../../assets/ym/img/no-img.png','name':'正面'},{'src':vm.list.backImage||'../../assets/ym/img/no-img.png','name':'反面'},{'src':vm.list.avatarImage||'../../assets/ym/img/no-img.png','name':'头像'},{'src':vm.list.signImage||'../../assets/ym/img/no-img.png','name':'手签名'}];
				vm.zoomStyle.backgroundImage='url('+vm.imgData[0].src+')';
		}

		    
	},
	methods:{
		close:function(){
			let vm=this,
				vmPa=vm.$parent;
                vmPa.off.details=false; 
                vmPa.off.detailsList=false;
		},
		agree:function(e){
			var vm=this,url,orderId=e.target.name;
			// vm.AJAX('c/audit/orderRecheck',{"orderId":orderId},function(data){
			// 	layer.open({
		    //         content:'复审成功',
		    //         skin: 'msg',
		    //         time: 4,
		    //         msgSkin:'success',
		    //     });
			// 	vm.list.result=3;
			// 	vm.list.cardStatus=1;
			// 	vm.$parent.list[parseInt(vm.number)].result=3;
			// 	vm.$parent.list[parseInt(vm.number)].cardStatus=1;
            // });
            reqCommonMethod({"orderId":orderId},function(){vm.off.isLoad=false;},"ym-ecs/c/audit/orderRecheck")
            .then((response)=>{
                layer.open({
		            content:'复审成功',
		            skin: 'msg',
		            time: 4,
		            msgSkin:'success',
		        });
				vm.list.result=3;
				vm.list.cardStatus=1;
				vm.$parent.list[parseInt(vm.number)].result=3;
				vm.$parent.list[parseInt(vm.number)].cardStatus=1;
            }).catch(error=>errorDeal(error));    
		},
		modifyOrder(state,type){//state：1、修改；2、完成；3、取消，type：1、用户姓名修改；2、地址修改；3、身份证号
			var vm=this;
			if(state==1){
				type==1 ? (vm.modify.userName=vm.list.userName,vm.modify.off1=true) : type==2 ? (vm.modify.userAddress=vm.list.userAddress,vm.modify.off2=true) : (vm.modify.papersCode=vm.list.papersCode,vm.modify.off3=true);
			}else if(state==2){
				let content = type==1 ? vm.modify.userName : type==2 ? vm.modify.userAddress : vm.modify.papersCode;
				// vm.AJAX('c/audit/updateBuggingOrder',{"type":type,"content":content,"orderId":vm.list.orderId},function(data){
				// 	type==1 ? (vm.list.userName=vm.modify.userName,vm.modify.off1=false) : type==2 ? (vm.list.userAddress=vm.modify.userAddress,vm.modify.off2=false) : (vm.list.papersCode=vm.modify.papersCode,vm.modify.off3=false);
				// 	if(vm.modify.off1&&vm.modify.off2&&vm.modify.off3){
				// 		vm.$parent.list[parseInt(vm.number)].updAddress=1;
				// 		vm.$parent.list[parseInt(vm.number)].updName=1;
				// 		vm.$parent.list[parseInt(vm.number)].updPapersCode=1;
				// 	}
                // });
                reqCommonMethod({"type":type,"content":content,"orderId":vm.list.orderId},function(){vm.off.isLoad=false;},"ym-ecs/c/audit/updateBuggingOrder")
                .then((data)=>{
                    type==1 ? (vm.list.userName=vm.modify.userName,vm.modify.off1=false) : type==2 ? (vm.list.userAddress=vm.modify.userAddress,vm.modify.off2=false) : (vm.list.papersCode=vm.modify.papersCode,vm.modify.off3=false);
					if(vm.modify.off1&&vm.modify.off2&&vm.modify.off3){
						vm.$parent.list[parseInt(vm.number)].updAddress=1;
						vm.$parent.list[parseInt(vm.number)].updName=1;
						vm.$parent.list[parseInt(vm.number)].updPapersCode=1;
					}
                }).catch(error=>errorDeal(error));    
			}else if(state==3){
				type==1 ? (vm.modify.off1=false) : type==2 ? (vm.modify.off2=false) : (vm.modify.off3=false);
			}
		},
		orderLog:function(){
			var vm=this;
			// vm.AJAX('c/audit/orderLogSearch',{"orderId":vm.list.orderId},function(data){
			// 	var str='',list= data.data;
			// 	for(var i in list){
			// 		str+='<li><time><b></b>'+vm.$parent.getDateTime(list[i].modifyTime)[6]+'</time><div>'+list[i].context+'</div></li>'
			// 	}
			// 	layer.open({
			// 		content:'<ul class="lay-log">'+str+'</ul>',
			// 		type:0,
			// 		title:'审核日志',
			// 		btn:0,
			// 		style:'width:auto;'
			// 	});
            // });
            reqCommonMethod({"orderId":vm.list.orderId},function(){vm.off.isLoad=false;},"ym-ecs/c/audit/orderLogSearch")
            .then((data)=>{
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
            }).catch(error=>errorDeal(error));    
		},
		integralLog:function(){
			var vm=this;
			// vm.AJAX('c/audit/searchIntegration',{"orderId":vm.list.orderId},function(data){
			// 	var statusStr='',reasonStr='';
			// 	if(data.data.cardStatus!="1")reasonStr+='<li><span>原因：</span>'+data.data.cardStatusReason+'</li>';
			// 	layer.open({
			// 		content:'<ul class="lay-integralLog"><li><span>本级获得积分：</span>'+data.data.integration+'积分</li><li><span>上级获得积分：</span>'+data.data.superiorIntegration+'积分</li>'+reasonStr+'</ul>',
			// 		type:0,
			// 		title:'积分查询',
			// 		btn:0,
			// 		style:'width:auto;'
			// 	});
            // });
            reqCommonMethod({"orderId":vm.list.orderId},function(){vm.off.isLoad=false;},"ym-ecs/c/audit/searchIntegration")
            .then((data)=>{
                var statusStr='',reasonStr='';
				if(data.data.cardStatus!="1")reasonStr+='<li><span>原因：</span>'+data.data.cardStatusReason+'</li>';
				layer.open({
					content:'<ul class="lay-integralLog"><li><span>本级获得积分：</span>'+data.data.integration+'积分</li><li><span>上级获得积分：</span>'+data.data.superiorIntegration+'积分</li>'+reasonStr+'</ul>',
					type:0,
					title:'积分查询',
					btn:0,
					style:'width:auto;'
				});
            }).catch(error=>errorDeal(error));               
		},
		autoAuditInfo(){//自动审核详情
			var vm=this;
			// vm.AJAX("c/audit/automaticDetails",{"orderId":vm.list.orderId},function(data){
			// 	var list_item1= data.data;
			// 	layer.open({
			// 		content:`<ul class="f-scroll-lt lay-details o-fl-w">
			// 		<li class="clr"><div class="fl">正面与手持对比相似度：</div><div class="fright">${list_item1.front_hand_image_similarity}%</div></li>
			// 		<li class="clr"><div class="fl">正面与第三方对比相似度：</div><div class="fright">${list_item1.front_image_similarity}%</div></li>
			// 		<li class="clr"><div class="fl">手持与第三方相似度：</div><div class="fright">${list_item1.hand_image_similarity}%</div></li>
			// 		<li class="clr"><div class="fl">活体识别照相似度：</div><div class="fright">${list_item1.living_image_similarity}%</div></li>
			// 		<li class="clr"><div class="fl">年龄校验结果：</div><div class="fright">${
			// 			list_item1.age_check==1?'<span class="fCGreen">成功</span>':
			// 			list_item1.age_check==2?'<span class="fCRed">失败</span>':
			// 			list_item1.age_check==3?'<span class="fCYellow">未定</span>':	'--'
			// 		}</div></li>
			// 		<li class="clr"><div class="fl">地址校验结果：</div><div class="fright">${
			// 			list_item1.address_check==1?'<span class="fCGreen">成功</span>':
			// 			list_item1.address_check==2?'<span class="fCRed">失败</span>':
			// 			list_item1.address_check==3?'<span class="fCYellow">未定</span>':	'--'
			// 		}</div></li>
			// 		<li class="clr"><div class="fl">身份证有效期校验结果：</div><div class="fright">${
			// 			list_item1.period_check==1?'<span class="fCGreen">成功</span>':
			// 			list_item1.period_check==2?'<span class="fCRed">失败</span>':
			// 			list_item1.period_check==3?'<span class="fCYellow">未定</span>':	'--'
			// 		}</div></li>
			// 		<li class="clr"><div class="fl">身份证号与正面OCR匹配结果：</div><div class="fright">${
			// 			list_item1.ocr_id_card_no_check==1?'<span class="fCGreen">成功</span>':
			// 			list_item1.ocr_id_card_no_check==2?'<span class="fCRed">失败</span>':
			// 			list_item1.ocr_id_card_no_check==3?'<span class="fCYellow">未定</span>':	'--'
			// 		}</div></li>
			// 		<li class="clr"><div class="fl">有效期与背面OCR匹配结果：</div><div class="fright">${
			// 			list_item1.ocr_id_card_period_check==1?'<span class="fCGreen">成功</span>':
			// 			list_item1.ocr_id_card_period_check==2?'<span class="fCRed">失败</span>':
			// 			list_item1.ocr_id_card_period_check==3?'<span class="fCYellow">未定</span>':	'--'
			// 		}</div></li>
			// 		<li class="clr"><div class="fl">上传身份证号与OCR对比相似度：</div><div class="fright">${list_item1.id_card_no_similarity}%</div></li>
			// 		<li class="clr"><div class="fl">上传姓名与OCR对比相似度：</div><div class="fright">${list_item1.id_card_name_similarity}%</div></li>
			// 		<li class="clr"><div class="fl">上传地址与OCR对比相似度：</div><div class="fright">${list_item1.id_card_address_similarity}%</div></li>
			// 		<li class="clr"><div class="fl">上传有效期与OCR对比相似度：</div><div class="fright">${list_item1.id_card_period_similarity}%</div></li>
			// 		<li class="clr"><div class="fl">国政通校验结果：</div><div class="fright">${
  			// 			list_item1.gzt_check==1?'<span class="fCGreen">成功</span>':
			// 			list_item1.gzt_check==2?'<span class="fCRed">失败</span>':
 			// 			list_item1.gzt_check==3?'<span class="fCYellow">未定</span>':'--'
  			// 		}</div></li>			
  			// 		<li class="clr"><div class="fl">审核结果：</div><div class="fright">${
  			// 			list_item1.result==1?'<span class="fCGreen">成功</span>':
  			// 			list_item1.result==2?'<span class="fCRed">拒绝</span>':
  			// 			list_item1.result==3?'<span class="fCYellow">转人工审核</span>':	'--'
  			// 		}</div></li>
			// 		<li class="clr"><div class="fl">审核结果描述：</div><div class="fright">${list_item1.desc}</div></li>
			// 		<li class="clr"><div class="fl">拒绝理由：</div><div class="fright">${
			// 			list_item1.code==1018?'<span class="fCGreen">远特开卡超过上限</span>':
			// 			list_item1.code==1019?'<span class="fCRed">联通开卡超过上限</span>':'--'
			// 		}</div></li></ul>`,
			// 		type:0,
			// 		title:'自动审核详情',
			// 		btn:0,
			// 		style:'width:auto;'
			// 	});
			// });
            reqCommonMethod({"orderId":vm.list.orderId},function(){vm.off.isLoad=false;},"ym-ecs/c/audit/automaticDetails")
            .then((data)=>{
                var list_item1= data.data;
				layer.open({
					content:`<ul class="f-scroll-lt lay-details o-fl-w">
					<li class="clr"><div class="fl">正面与手持对比相似度：</div><div class="fright">${list_item1.front_hand_image_similarity}%</div></li>
					<li class="clr"><div class="fl">正面与第三方对比相似度：</div><div class="fright">${list_item1.front_image_similarity}%</div></li>
					<li class="clr"><div class="fl">手持与第三方相似度：</div><div class="fright">${list_item1.hand_image_similarity}%</div></li>
					<li class="clr"><div class="fl">活体识别照相似度：</div><div class="fright">${list_item1.living_image_similarity}%</div></li>
					<li class="clr"><div class="fl">年龄校验结果：</div><div class="fright">${
						list_item1.age_check==1?'<span class="fCGreen">成功</span>':
						list_item1.age_check==2?'<span class="fCRed">失败</span>':
						list_item1.age_check==3?'<span class="fCYellow">未定</span>':	'--'
					}</div></li>
					<li class="clr"><div class="fl">地址校验结果：</div><div class="fright">${
						list_item1.address_check==1?'<span class="fCGreen">成功</span>':
						list_item1.address_check==2?'<span class="fCRed">失败</span>':
						list_item1.address_check==3?'<span class="fCYellow">未定</span>':	'--'
					}</div></li>
					<li class="clr"><div class="fl">身份证有效期校验结果：</div><div class="fright">${
						list_item1.period_check==1?'<span class="fCGreen">成功</span>':
						list_item1.period_check==2?'<span class="fCRed">失败</span>':
						list_item1.period_check==3?'<span class="fCYellow">未定</span>':	'--'
					}</div></li>
					<li class="clr"><div class="fl">身份证号与正面OCR匹配结果：</div><div class="fright">${
						list_item1.ocr_id_card_no_check==1?'<span class="fCGreen">成功</span>':
						list_item1.ocr_id_card_no_check==2?'<span class="fCRed">失败</span>':
						list_item1.ocr_id_card_no_check==3?'<span class="fCYellow">未定</span>':	'--'
					}</div></li>
					<li class="clr"><div class="fl">有效期与背面OCR匹配结果：</div><div class="fright">${
						list_item1.ocr_id_card_period_check==1?'<span class="fCGreen">成功</span>':
						list_item1.ocr_id_card_period_check==2?'<span class="fCRed">失败</span>':
						list_item1.ocr_id_card_period_check==3?'<span class="fCYellow">未定</span>':	'--'
					}</div></li>
					<li class="clr"><div class="fl">上传身份证号与OCR对比相似度：</div><div class="fright">${list_item1.id_card_no_similarity}%</div></li>
					<li class="clr"><div class="fl">上传姓名与OCR对比相似度：</div><div class="fright">${list_item1.id_card_name_similarity}%</div></li>
					<li class="clr"><div class="fl">上传地址与OCR对比相似度：</div><div class="fright">${list_item1.id_card_address_similarity}%</div></li>
					<li class="clr"><div class="fl">上传有效期与OCR对比相似度：</div><div class="fright">${list_item1.id_card_period_similarity}%</div></li>
					<li class="clr"><div class="fl">国政通校验结果：</div><div class="fright">${
  						list_item1.gzt_check==1?'<span class="fCGreen">成功</span>':
						list_item1.gzt_check==2?'<span class="fCRed">失败</span>':
 						list_item1.gzt_check==3?'<span class="fCYellow">未定</span>':'--'
  					}</div></li>			
  					<li class="clr"><div class="fl">审核结果：</div><div class="fright">${
  						list_item1.result==1?'<span class="fCGreen">成功</span>':
  						list_item1.result==2?'<span class="fCRed">拒绝</span>':
  						list_item1.result==3?'<span class="fCYellow">转人工审核</span>':	'--'
  					}</div></li>
					<li class="clr"><div class="fl">审核结果描述：</div><div class="fright">${list_item1.desc}</div></li>
					<li class="clr"><div class="fl">拒绝理由：</div><div class="fright">${
						list_item1.code==1018?'<span class="fCGreen">远特开卡超过上限</span>':
						list_item1.code==1019?'<span class="fCRed">联通开卡超过上限</span>':'--'
					}</div></li></ul>`,
					type:0,
					title:'自动审核详情',
					btn:0,
					style:'width:auto;'
				});
            }).catch(error=>errorDeal(error));                
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
		rotate:function(e){//旋转
			var deg,name=e.target.parentNode.name;
			name==1 ? deg=parseInt(this.zoomStyle_1.transform.match(/\((\S*)deg/)[1]) : name==2 ? deg=parseInt(this.zoomStyle_2.transform.match(/\((\S*)deg/)[1]) : deg=parseInt(this.zoomStyle.transform.match(/\((\S*)deg/)[1]);
			deg+=90;
			this.transformStyle.r=deg;
			var transform='translate3d(0,0,0) scale(1) rotate('+deg+'deg)';
			name==1 ? this.zoomStyle_1.transform=transform : name==2 ? this.zoomStyle_2.transform=transform : this.zoomStyle.transform=transform;
		},
		slide:function(index){//切换
			var len=this.imgData.length;
			if(this.list.operatorType==6){
				len=len/2;
				index==2 ? (this.imgIndex<(len-1) ? this.imgIndex+=1 : this.imgIndex=0) : this.imgIndex>0 ? this.imgIndex-=1 : this.imgIndex=len-1;
				this.zoomStyle_1.backgroundImage='url('+this.imgData[(this.imgIndex)*2].src+')';
				this.zoomStyle_2.backgroundImage='url('+this.imgData[((this.imgIndex)*2+1)].src+')';
			}else{
				index==2?this.imgIndex<(len-1) ? this.imgIndex+=1 : this.imgIndex=0 : this.imgIndex>0 ? this.imgIndex-=1 : this.imgIndex=len-1;
				this.zoomStyle.backgroundImage='url('+this.imgData[this.imgIndex].src+')';
			}
			this.transformStyle={x:0,y:0,s:1,r:0};
			this.zoomStyle.transform='translate3d(0,0,0) scale(1) rotate(0deg)';
			this.zoomStyle_1.transform='translate3d(0,0,0) scale(1) rotate(0deg)';
			this.zoomStyle_2.transform='translate3d(0,0,0) scale(1) rotate(0deg)';
		},
		mouseOn:function(e){//图片缩放，鼠标事件
			var vm=this,title=e.target.title;
			e.preventDefault()
			switch(e.type){
				case "mousedown":
					vm.mouse.off=true;
					vm.mouse.x=e.clientX;
					vm.mouse.y=e.clientY;
					var transform='translate3d('+vm.transformStyle.x+'px,'+vm.transformStyle.y+'px,0) scale('+vm.transformStyle.s+') rotate('+vm.transformStyle.r+'deg)';

					title==1 ? vm.zoomStyle_1.transform=transform : title==2 ? vm.zoomStyle_2.transform=transform : vm.zoomStyle.transform=transform;
					break;
				case "mousemove":
					if(vm.mouse.off){
						var x=e.clientX-vm.mouse.x,y=e.clientY-vm.mouse.y;
						vm.transformStyle.x+=x;
						vm.transformStyle.y+=y;
						vm.mouse.x=e.clientX;
						vm.mouse.y=e.clientY;
						var transform='translate3d('+vm.transformStyle.x+'px,'+vm.transformStyle.y+'px,0) scale('+vm.transformStyle.s+') rotate('+vm.transformStyle.r+'deg)';
						title==1 ? vm.zoomStyle_1.transform=transform : title==2 ? vm.zoomStyle_2.transform=transform : vm.zoomStyle.transform=transform;
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
					var transform='translate3d('+vm.transformStyle.x+'px,'+vm.transformStyle.y+'px,0) scale('+vm.transformStyle.s+') rotate('+vm.transformStyle.r+'deg)';
					title==1 ? vm.zoomStyle_1.transform=transform : title==2 ? vm.zoomStyle_2.transform=transform : vm.zoomStyle.transform=transform;
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
	   	 			return l ? level[parseInt(l)] : '未知等级';
					break;
			}
		}
	}
}
</script>


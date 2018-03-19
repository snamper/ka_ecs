<style scoped>
  /* @import "../../assets/km/css/cardOrderDetails.css"; */
  @import "../../assets/ym/css/audit.css"; 
	.redF{
		color: #AE0B39;
		font-weight: bold;
	}
</style>
<template>
	<div id="auditList">
	  <section class="g-list-box" v-if="auditData">
	  	  <header class="g-lis-head">
	  	  	<div class="m-has-db">审核状态：<span><b>{{off.auditIndex}}</b>/<i>{{list.length}}</i></span></div>
	  	  	<div class="m-time-down"  style="display:none">审核计时：<span class="f-c-red">{{off.time}}</span></div>
	  	  	<div class="m-foot-btn" :class="{scroll:off.isScroll}">
	  	  		<a class="f-btn f-btn-success" @click="agree">同意</a>
				<a class="f-btn f-btn-warning" @click="agree2">准同意</a>
				<a class="f-btn f-btn-danger" @click="refuse">拒绝</a>
		  	</div>
	  	  </header>
	  	  <div class="g-box">
			  <table class="g-list-table" :class="{transfer:$route.params.type==3}">
				<tbody v-if="$route.params.type!=3">
					<tr>
						<td>
							<table class="g-inner-table">
								<tbody>
									<tr><td>订单号码：</td><td>{{auditData.orderId}}</td></tr>
									<tr><td>自动审核详情：</td><td><a href="javascript:void(0)" @click="autoAuditInfo" class="details m-l">点击查看</a></td></tr>
									<tr><td>生成时间：</td><td>{{getDateTime(auditData.create_time)[6]}}</td></tr>
									<tr><td>用户姓名：</td><td>{{auditData.userName}}</td></tr>
									<tr><td>电话号码：</td><td>{{ auditData.phoneNumber }}</td></tr>
									<tr><td>号码等级：</td><td>{{ typeCheck(4,auditData.phoneLevel) }}</td></tr>
									<tr><td>{{ typeCheck(auditData.papersType)[2] }}：</td><td>{{ auditData.papersCode }}</td></tr>
									<tr><td>证件类型：</td><td>{{ typeCheck(auditData.papersType)[0] }}</td></tr>
									<tr><td>{{ typeCheck(auditData.papersType)[1] }}：</td><td>{{ auditData.userAddress }}</td></tr>
									<tr><td>证件期限：</td><td>{{ auditData.validityPeriod }}</td></tr>
									<tr><td>号码归属部门：</td><td>{{ auditData.phone_depName }}</td></tr>
									<tr><td>UCCID：</td><td>{{ auditData.cardNumber }}</td></tr>
									<tr><td>Mac地址：</td><td>{{ auditData.devMacAddr }}</td></tr>
									<tr><td>终端类型：</td><td>{{ auditData.terminalType }}</td></tr>
									<tr><td>识别仪名称：</td><td>{{ auditData.devSN }}</td></tr>
									<tr><td>识别模式：</td><td>{{ auditData.openMode }}</td></tr>
									<tr><td>操作人：</td><td>{{ auditData.operatorName }}</td></tr>
									<tr><td>操作人工号：</td><td>{{ auditData.operator }}</td></tr>
									<tr><td>操作人部门：</td><td>{{ auditData.depName }}</td></tr>
									<tr><td>备注：</td><td>{{ auditData.comment }}</td></tr>
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
				<tbody v-if="$route.params.type==3">
					<tr>
						<td><span>订单号码：</span>{{auditData.orderId}}</td>
						<td colspan="2"><span>电话号码：</span>{{auditData.phoneNumber}}（{{typeCheck(4,auditData.phoneLevel)}}）</td>
					</tr>
					<tr>
						<td><span>生成时间：</span>{{getDateTime(auditData.create_time)[6]}}</td>
						<td><span>原机主姓名：</span>{{auditData.userNameOld}}</td>
						<td><span>过户人姓名：</span>{{auditData.userName}}</td>

					</tr>
					<tr>
						<td><span>终端类型：</span>{{auditData.terminalType}}</td>
						<td><span>证件类型：</span>{{typeCheck(auditData.papersTypeOld)[0]}}</td>
						<td><span>证件类型：</span>{{typeCheck(auditData.papersType)[0]}}</td>


					</tr>
					<tr>
						<td><span>识别仪名称：</span>{{auditData.devSN}}</td>
						<td><span>{{ typeCheck(auditData.papersTypeOld)[2] }}：</span>{{auditData.papersCodeOld}}</td>
						<td><span>{{ typeCheck(auditData.papersType)[2] }}：</span>{{auditData.papersCode}}</td>

					</tr>
					<tr>
						<td><span>识别模式：</span>{{auditData.openMode}}</td>
						<td><span>{{ typeCheck(auditData.papersTypeOld)[1] }}：</span>{{auditData.userAddressOld}}</td>
						<td><span>{{ typeCheck(auditData.papersType)[1] }}：</span>{{auditData.userAddress}}</td>
					</tr>
					<tr>

						<td><span>Mac地址：</span>{{auditData.devMacAddr}}</td>
						<td><span>证件期限：</span>{{auditData.validityPeriodOld}}</td>
						<td><span>证件期限：</span>{{auditData.validityPeriod}}</td>

					</tr>
					<tr>
						<td><span>操作人：</span>{{auditData.operatorName}}【操作人工号：{{auditData.operator}}】</td>
						<td colspan="2"><span>操作人部门：</span>{{auditData.depName}}</td>

					</tr>
					<tr>
						<td><span>备注：</span>{{auditData.comment}}</td>
						<td colspan="2"><span>号码归属部门：</span>{{auditData.phone_depName}}</td>
					</tr>
				</tbody>
			  </table>
			  <div class="g-transfer-img" v-if="$route.params.type==3">
				<div class="m-zoomContent zoom-c">
					<div class="m-img-c"><div id="imgContent" title="1" class="fGrab" :class="{fGrabbing:mouse.off}" :style="zoomStyle_1" @mousemove="mouseOn" @mousedown="mouseOn" @mouseup="mouseOn" @mouseout="mouseOn" @mousewheel="mouseOn"></div></div>
					<a href="javascript:void(0)" class="slide slide-left" @click="slide(1)"></a>
					<a href="javascript:void(0)" name="1" class="rotate" @click="rotate"><span></span></a>
					<div class="text">{{imgData[imgIndex*2].name}}</div>
				</div>
				<div class="m-zoomContent zoom-c">
					<div class="m-img-c"><div id="imgContent" title="2" class="fGrab" :class="{fGrabbing:mouse.off}" :style="zoomStyle_2" @mousemove="mouseOn" @mousedown="mouseOn" @mouseup="mouseOn" @mouseout="mouseOn" @mousewheel="mouseOn"></div></div>
					<a href="javascript:void(0)" class="slide slide-right" @click="slide(2)"></a>
					<a href="javascript:void(0)" name="2" class="rotate" @click="rotate"><span></span></a>
					<div class="text">{{imgData[(imgIndex*2+1)].name}}</div>
				</div>
			  </div>
		  </div>
	  </section>
	  <div class="m-refresh" v-if="!auditData"><span class="u-icon-refresh" :class="{rotate360:off.isLoad}"></span><a @click="getAuditList">{{off.isLoad?'loading':'点击刷新'}}</a></div>
  </div>
</template>
<script>
import {reqCommonMethod} from "../../config/service.js";
import {errorDeal,getStore} from "../../config/utils.js";
import {mapState, mapMutations, mapActions} from 'vuex';
export default{
	name:'auditList',
	data (){
		return {
			off:{
				auditIndex:0,//订单索引
				time:'00:00',//审核计时
				isLoad:0,//是否ajax请求
				isScroll:0,//滚动
                isBugginPower:1,
			},
			list:[],//分配的订单
			auditData:'',//当前处理的订单
			zoomStyle:{"transform":"translate3d(0,0,0) scale(1) rotate(0deg)"},//缩放样式
			zoomStyle_1:{"transform":"translate3d(0,0,0) scale(1) rotate(0deg)"},//缩放样式
			zoomStyle_2:{"transform":"translate3d(0,0,0) scale(1) rotate(0deg)"},//缩放样式
			transformStyle:{x:0,y:0,s:1,r:0},//缩放初始坐标
			mouse:{x:0,y:0,off:!1},//鼠标坐标
			imgData:[{"name":''}],//当前订单的图片
			imgIndex:0,//图片索引
			refuseArr:["没有用户签名或签名与用户姓名不符","部分或全部照片中存在模糊、分辨率太小无法辨认/严重变形/反光严重/拍摄角度不规范","部分/全部照片中存在非远特SIM卡号码现象","部分/全部照片中的SIM卡号码与填报号码不符","无证件与SIM卡合影(包括身份证正反面及现场手持照)","背景非通讯营业网点、非通讯销售商业场所或非售卡现场拍摄照片(包括证件及手持照)","手持证卡合影不规范,非免冠正脸照、人脸被遮挡等导致无法清晰辨别是否为本人","同一证件、姿态手持合影照,与不同号码交叉反复提交","同一证件为不同号码当日交叉提交达三次以上","非有效期证件或申卡人未满16周岁","填报信息与证照中信息不符、缺失内容或乱码(包括但不限于证件号码,姓名,地址等信息)","发证机关与证件行政归属地不符","部分或全部照片内容为疑似翻拍或合成","非本人现场手持证卡照（严重违规）","证件与手持合影照中证件不同（严重违规）","已被拒绝并明知信息有问题仍然多次重复恶意上传（严重违规）","部分或全部照片内容被明确为翻拍或合成、造假（严重违规）"]
        }
	},
	created:function(){
        var userInfo=localStorage.getItem('ECS_INFO');
        
        userInfo=getStore("KA_ECS_USER");
		userInfo.isadmin&&userInfo.isadmin.indexOf('4')>-1 ? this.off.isBugginPower=true : this.off.isBugginPower=false;
		this.getAuditList();
		this.dealAuditList();
	},
	mounted:function(){
		var vm=this;
		var homeDom=document.getElementById('home');
		homeDom.onscroll=function(){
			var t = homeDom.scrollTop;
			t>=100?vm.off.isScroll=true:vm.off.isScroll=false;
		};
	},
	methods:{
		agree:function(){//审核同意
			var vm=this;
			var orderId=vm.auditData.orderId;
			// vm.AJAX('c/audit/audit',{"orderId":orderId,"result":1,"remark":'',"reason": ''},function(data){
			// 	layer.open({
			// 		content:data.msg,
			// 		skin: 'msg',
			// 		time: 4,
			// 		msgSkin:'success',
			// 		success:function(){
			// 			vm.dealAuditList();
			// 		}
			// 	})
            // });
            reqCommonMethod({"orderId":orderId,"result":1,"remark":'',"reason": ''},function(){vm.off.isLoad=false;console.log(1111)},"ym-ecs/c/audit/audit")
            .then((data)=>{
                layer.open({
					content:data.msg,
					skin: 'msg',
					time: 4,
					msgSkin:'success',
					success:function(){
						vm.dealAuditList();
					}
                })
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 
		},
        agree2:function(){//准同意
			var vm=this,orderId=vm.auditData.orderId,popIndex,ww=window.innerWidth,wwSet;
			ww<=640 ? wwSet='width:98%' : wwSet='max-width:610px';
			popIndex=layer.open({
				content:'<section id="buggingReason"><div class="checkbox-list"><div class="m-form-checkbox"><label><span class="checkbox"><input value="地址有误" checked="true" type="checkbox" name="bug_model"><span></span></span><span class="text">地址有误</span></label></div></div></section><div class="radio-list"><div class="m-form-checkbox"><label><span class="checkbox"><input value="姓名有误"  type="checkbox" name="bug_model"><span></span></span><span class="text">姓名有误</span></label></div></div>',
				btn:['确定','取消'],
				type:1,
				style:wwSet,
				title:'选择准同意理由',
				yes:function(){
					var p=document.getElementsByTagName('input'),buggingReason='';
					for(let i=0;i<p.length;i++){
						if(p[i].nodeType==1&&p[i].checked){
							buggingReason+=p[i].value+'|';
						}
					}
					buggingReason=buggingReason.substring(0,buggingReason.length-1);
					// vm.AJAX('c/audit/audit',{"orderId":orderId,"result":3,"remark":'',"reason": '',"buggingReason":buggingReason},function(data){
					// 	layer.open({
					// 		content:data.msg,
					// 		skin: 'msg',
					// 		time: 4,
					// 		msgSkin:'success',
					// 		success:function(){
					// 			layer.close(popIndex);
					// 			vm.dealAuditList();
					// 		}
					// 	});
                    // });
                    reqCommonMethod({"orderId":orderId,"result":3,"remark":'',"reason": '',"buggingReason":buggingReason},function(){vm.off.isLoad=false;},"ym-ecs/c/audit/audit")
                    .then((data)=>{
                        layer.open({
							content:data.msg,
							skin: 'msg',
							time: 4,
							msgSkin:'success',
							success:function(){
								layer.close(popIndex);
                                vm.dealAuditList();
                                vm.off.isLoad=false;                                
							}
                        });
                        vm.off.isLoad=false;
                    }).catch(error=>errorDeal(error)); 
				}
			});

		},
		refuse:function(obj){//审核拒绝
			var str='',vm=this,orderId=vm.auditData.orderId,popIndex,ww=window.innerWidth,wwSet;
			for(var i=0;i<vm.refuseArr.length;i++){
				var b='';
				if(i>12)b='<b class="f-c-red">*</b>';
				str+='<div class="checkbox-list"><div class="m-form-checkbox"><label><span class="checkbox"><input value="'+vm.refuseArr[i]+'" type="checkbox" name="refuse_model"><span></span></span><span class="text">'+vm.refuseArr[i]+b+'</span></label></div></div>';
			}
			ww<=640 ? wwSet='width:98%' : wwSet='max-width:610px';
			popIndex=layer.open({
				content:'<div class="f-scroll-lt lay-div-refuse f-tal" id="refuseList">'+str+'<div class="checkbox-list"><input maxlength="30" type="text" id="reason" placeholder="请输入补充内容"></div></div>',
				btn:['确定','取消'],
				type:1,
				style:wwSet,
				title:['选择拒绝理由','color:#ffc333;text-align:left;padding-left:0.2rem;'],
				yes:function(){
					var p=document.getElementsByTagName('input'),remark='',illegal="";
					for(var i=0;i<p.length;i++){
						if(p[i].nodeType==1&&p[i].checked){
							remark+=p[i].value+'|';
							i>12&&(illegal="UNABLE");
						}
					}
					remark=remark.substring(0,remark.length-1)
					var reason=document.getElementById('reason').value;
					if(remark=='')return false;
					// vm.AJAX('c/audit/audit',{"orderId":orderId,"result":2,"remark":remark,"reason": reason,"illegal":illegal},function(data){
					// 	layer.open({
					// 		content:data.msg,
					// 		skin: 'msg',
					// 		time: 4,
					// 		msgSkin:'success',
					// 		success:function(){
					// 			vm.dealAuditList();
					// 			layer.close(popIndex);
					// 		}
					// 	})
                    // });
                    reqCommonMethod({"orderId":orderId,"result":2,"remark":remark,"reason": reason,"illegal":illegal},function(){vm.off.isLoad=false;},"ym-ecs/c/audit/audit")
                    .then((data)=>{
                        layer.open({
							content:data.msg,
							skin: 'msg',
							time: 4,
							msgSkin:'success',
							success:function(){
								vm.dealAuditList();
                                layer.close(popIndex);
                                vm.off.isLoad=false;                                
							}
                        });
                        vm.off.isLoad=false;
                    }).catch(error=>errorDeal(error)); 
				}
			})

		},
		autoAuditInfo(){//自动审核详情
			var vm=this;
			// vm.AJAX("c/audit/automaticDetails",{"orderId":vm.auditData.orderId},function(data){
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
            reqCommonMethod({"orderId":vm.auditData.orderId},function(){vm.off.isLoad=false;},"ym-ecs/c/audit/automaticDetails")            
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
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 
		},
        getAuditList:function(){//获取订单
            var vm=this,orderId,url,json={},type=vm.$route.params.type;
            if(typeof type=="number"){
                type==3&&(type=6);
                url="ym-ecs/c/audit/toaudit";
                json.type=type;
            }else{
                type=vm.$parent.cardT;
                orderId=vm.$parent.orderId;
                url="ym-ecs/c/audit/dispatchAudit";
                json.type=type;
                json.orderId=orderId;
            }
			if(vm.off.isLoad==1){return false};
            vm.off.isLoad=1;
			// vm.AJAX(url,json,function(data){
			// 	if(data.data.list.length==0){
			// 		layer.open({
			//             content:'当前没有分配的订单',
			//             skin: 'msg',
			//             time: 4,
			//             msgSkin:'error',
			//         })
			// 	}
			// 	vm.list=data.data.list;
			// 	vm.off.auditIndex=0;
			// 	vm.dealAuditList();
			// 	//vm.timeDown();
            // },
            reqCommonMethod(json,function(){vm.off.isLoad=false;},url)            
            .then((data)=>{
                if(data.data.list.length==0){
					layer.open({
			            content:'当前没有分配的订单',
			            skin: 'msg',
			            time: 4,
			            msgSkin:'error',
			        })
				}
				vm.list=data.data.list;
				vm.off.auditIndex=0;
                vm.dealAuditList();
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 
		},
		dealAuditList:function(){//处理分配的订单
			const vm=this,len=vm.list.length;
			vm.auditData='';
			if(len&&(vm.off.auditIndex+1)<=len){
				vm.auditData=vm.list[vm.off.auditIndex];
				if(vm.$route.params.type==3){
					vm.imgData[0]={'src':vm.auditData.frontImageOld||'../../assets/ym/img/no-img.png','name':'原机主正面照片'};
					vm.imgData[1]={'src':vm.auditData.transferFrontImageOld||'../../assets/ym/img/no-img.png','name':'原机主过户正面照片'};
					vm.imgData[2]={'src':vm.auditData.backImageOld||'../../assets/ym/img/no-img.png','name':'原机主反面照片'};//
					vm.imgData[3]={'src':vm.auditData.transferBackImageOld||'../../assets/ym/img/no-img.png','name':'原机主过户反面照片'};
					vm.imgData[4]={'src':vm.auditData.handImageOld||'../../assets/ym/img/no-img.png','name':'原机主手持照片'};
					vm.imgData[5]={'src':vm.auditData.transferHandImageOld||'../../assets/ym/img/no-img.png','name':'原机主过户手持照片'};

					vm.imgData[6]={'src':vm.auditData.papersImage||'../../assets/ym/img/no-img.png','name':'过户人正面照片'};
					vm.imgData[7]={'src':vm.auditData.backImage||'../../assets/ym/img/no-img.png','name':'过户人反面照片'};
					vm.imgData[8]={'src':vm.auditData.avatarImage||'../../assets/ym/img/no-img.png','name':'过户人手持照片'};
					vm.imgData[9]={'src':vm.auditData.signImage||'../../assets/ym/img/no-img.png','name':'过户人手签名照片'};

					vm.zoomStyle_1.backgroundImage='url('+vm.imgData[0].src+')';
					vm.zoomStyle_2.backgroundImage='url('+vm.imgData[1].src+')';
				}else{
					vm.imgData=[{'src':vm.auditData.avatarImage||'../../assets/ym/img/no-img.png','name':'手持'},{'src':vm.auditData.papersImage||'../../assets/ym/img/no-img.png','name':'正面'},{'src':vm.auditData.backImage||'../../assets/ym/img/no-img.png','name':'反面'},{'src':vm.auditData.headImage||'../../assets/ym/img/no-img.png','name':'头像'},{'src':vm.auditData.signImage||'../../assets/ym/img/no-img.png','name':'手签名'}];
					vm.zoomStyle.backgroundImage='url('+vm.imgData[0].src+')';
				}
				vm.off.auditIndex++;
			}
		},
		timeDown:function(time){//倒计时
			var vm=this,timeFormat=function(t){
	    		var t_s=t%60,t_m=Math.floor(t/60);
	    		t_s<=9&&(t_s='0'+t_s);
	    		t_m<=9&&(t_m='0'+t_m);
	    		return t_m+':'+t_s;
	    	},timer=setInterval(function(){
				time--;
	    		time==0?(vm.off.time='00:00',clearInterval(timer),vm.getAuditList()):vm.off.time=timeFormat(time);
			},1000);
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
			if(this.$route.params.type==3){
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
	   	 			return l?level[parseInt(l)]:"未知";
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
		    a >= 10 ? a : a = "0" + a, r >= 10 ? r : r = "0" + r, o >= 10 ? o : o = "0" + o, i >= 10 ? i : i = "0" + i, c >= 10 ? c : c = "0" + c, k[0]=n,k[1]=a,k[2]=r,k[3]=n+'-'+a,k[4]=a+'-'+r,k[5]=o+":"+i,k[6]=n + "-" + a + "-" + r + " " + o + ":" + i + ":" + c;
		    return k;
		}
	}
}
</script>


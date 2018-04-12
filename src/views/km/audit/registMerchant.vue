<!--**
  *@info 审核子模块-激活商户模块
  *@author: thinkmix
  *@date 2017-12-7
* *-->
<style scoped>
  #auditList{
  	width: 100%;
  	height: 100%;
  	position: relative;
  }
  .gztBtn{
  	width: 86px;
  	height: 24px;
  	border:1px solid #13ce66;
  	border-radius: 5px;
  	background: #13ce66;
  	color: white;
  	margin-left: 20px;
  	font-size: 14px;
  	cursor: pointer;
  }
  .gztBtn:active{
  	box-shadow: 0 0 2px #13ce66;
  }
</style>
<template>
<div style="width100%;height:100%;padding:10px;">
	<section class="g-audit-menu" v-show="!off.isGet">
		<div class="g-audit-menu-c">
			<div class="m-menu-div" v-show="off.auditType==1">
				<router-link :to="{name:'registMerchantAudit',params:{type:'realtime_get'}}" class="u-bg navBg10"><div>激活商户</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>{{auditCount.registerMerchantRealTime}}</span></p><p>已分配<span>{{auditCount.registerMerchantRealTime_}}</span></p></div>
			</div>
			<div class="m-menu-div" v-show="off.auditType==2">
				<router-link :to="{name:'registMerchantAudit',params:{type:'afterwards_get'}}" class="u-bg navBg10"><div>激活商户</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>{{auditCount.registerMerchantAfter}}</span></p><p>已分配<span>{{auditCount.registerMerchantAfter_}}</span></p></div>
			</div>
		</div>
	</section>
	<div id="auditList" v-show="off.isGet">
	  <section class="g-list-box" v-if="auditData">
	  	  <header class="g-lis-head">
	  	  	<div class="m-has-db">审核状态：<span><b>{{off.auditIndex}}</b>/<i>{{list.length}}</i></span></div>
	  	  	<div class="m-time-down">审核计时：<span class="f-c-red">{{off.time}}</span></div>
	  	  	<div class="m-foot-btn">
				<a class="f-btn f-btn-success" @click="agree">同意</a>
				<a class="f-btn f-btn-danger" @click="refuse">拒绝</a>
		  	</div>
	  	  </header>
	  	  <div class="g-box">
			  <table class="g-list-table">
				<tbody>
					<tr>
						<td>
							<table class="g-inner-table">
								<tbody>
									<tr><td>订单号码：</td><td>{{auditData.orderId}}</td></tr>
									<tr><td>申请时间：</td><td>{{getDateTime(auditData.createTime)[6]}}</td></tr>
									<tr><td>
										<span v-show="auditData.merchantType==1">门店名称：</span>
										<span v-show="auditData.merchantType==2">个人商户名称：</span>
									</td><td>{{auditData.companyName}}</td></tr>
									<tr><td>
										<span v-show="auditData.merchantType==1">营业执照编号：</span>
										<span v-show="auditData.merchantType==2">身份证号码：</span>
									</td>
									<td>{{auditData.businessLicence}}
										<!-- <button class="gztBtn" @click="gztBtn" v-show="auditData.merchantType==2">国政通检验</button> -->
									</td>
								</tr>
									<tr v-show="auditData.merchantType==2"><td>身份证有效期：</td><td>{{auditData.idCardPeriod}}</td></tr>

									<tr><td>商户注册电话：</td><td>{{auditData.phone}}</td></tr>
									<tr><td>门店地址：</td><td>{{auditData.storeAddress}}</td></tr>
									<tr><td>证件地址：</td><td>{{auditData.address}}</td></tr>
									<tr><td>邀请码：</td><td>{{auditData.superInviteCode}}</td></tr>
									<tr><td>支付宝账号：</td><td>{{auditData.alipayUserId}}</td></tr>
									<tr><td>微信账号：</td><td>{{auditData.weixinUserId}}</td></tr>
									<tr><td>售卡城市：</td><td>{{auditData.cityName}}[{{auditData.cityCode}}]</td></tr>
									<tr><td>商户属性：</td><td>
										<span v-show="auditData.merchantType==1">企业</span>
										<span v-show="auditData.merchantType==2">个人</span>
									</td></tr>
									<tr><td>售卡权限：</td><td>
                                        <span v-show="auditData.openingType==1">远特卡<span v-if="auditData.openingArea">({{auditData.openingArea}})</span></span>
										<span v-show="auditData.openingType==2">联通卡<span v-if="auditData.openingArea">({{auditData.openingArea}})</span></span>
										<span v-show="auditData.openingType==3">移动卡<span v-if="auditData.openingArea">({{auditData.openingArea}})</span></span>
										<span v-show="auditData.openingType==4">电信卡<span v-if="auditData.openingArea">({{auditData.openingArea}})</span></span>
									</td></tr>
									<tr><td>折扣模式：</td><td>{{auditData.discountModel}}</td></tr>
									<tr><td>号码模式：</td><td>{{auditData.phoneModel}}</td></tr>
									<tr><td>转账模式：</td><td>{{auditData.transferModel}}</td></tr>
									<tr><td>设备编号：</td><td>{{auditData.devMac}}</td></tr>
									<tr><td>设备MAC：</td><td>{{auditData.devMacAddress}}</td></tr>
									<tr><td>推广渠道ID：</td><td>{{auditData.popchannel}}</td></tr>
									<tr><td>推广渠道名称：</td><td>{{auditData.popchannelName}}</td></tr>
									<tr><td>上级商户ID：</td><td>{{auditData.superDealerId}}</td></tr>
									<tr><td>上级商户名称：</td><td>{{auditData.superDealerName}}</td></tr>
									<tr><td>操作人ID：</td><td>{{auditData.userId}}</td></tr>
									<tr><td>操作人姓名：</td><td>{{auditData.userName}}</td></tr>

								</tbody>
							</table>
						</td>
						<td class="m-box-img m-meida-640up">
							<ImgZoom :imgData="imgData"></ImgZoom>
						</td>
					</tr>
					<tr class="m-box-img m-meida-640down">
						<img v-for="item in imgData" :src="item.src">
					</tr>
				</tbody>
			  </table>
		  </div>
	  </section>
	  <div class="m-refresh" v-if="!auditData"><span class="u-icon-refresh" :class="{rotate360:off.isLoad}"></span><a @click="getAuditList">{{off.isLoad?'loading':'获取订单'}}</a></div>
  </div>
</div>
</template>
<script>
import "../../../assets/km/css/cardOrderDetails.css";
import "../../../assets/km/css/audit.css";
import {reqCommonMethod} from "../../../config/service.js";
import { mapState } from 'vuex';
import ImgZoom from '../../../componentskm/ImgZoom';
import { getDateTime } from "../../../config/utils.js";
export default{
	data (){
		return {
			off:{
				auditIndex:0,//订单索引
				time:'00:00',//审核计时
				isLoad:0,//是否ajax请求,
				isGet:0,//是否获取订单数据
				auditType:1//1，实时；2、事后
			},
			timer:Number,//审核倒计时
			list:[],//分配的订单
			auditData:'',//当前处理的订单
			imgData:[],//当前订单的图片,
			result:'',
			refuseArr:{"type":"1","list":[{"code":"2001","info":"部分或全部照片中存在模糊、分辨率太小无法辨认/严重变形/反光严重/拍摄角度不规范","point":"0","stopCard":"0"},{"code":"2002","info":"背景非售卡现场拍摄照片(包括证件及手持照)","point":"0","stopCard":"0"},{"code":"2003","info":"无用户签名或签名与用户姓名不符","point":"0","stopCard":"0"},{"code":"2004","info":"手持证卡合影不规范，非免冠正脸照、人脸被遮挡等导致无法清晰辨别是否为本人","point":"0","stopCard":"0"},{"code":"2005","info":"部分或全部照片内容为疑似翻拍或合成","point":"0","stopCard":"0"},{"code":"2006","info":"非本人现场手持证卡照","point":"0","stopCard":"0"},{"code":"2007","info":"证件与手持合影照中证件不同","point":"0","stopCard":"0"},{"code":"2008","info":"已被拒绝并明知信息有问题（包括但不限于非本人现场手持证件）仍然多次重复恶意上传（严重违规）","point":"0","stopCard":"1"},{"code":"2009","info":"部分或全部照片内容被明确为翻拍或合成、造假（严重违规）","point":"0","stopCard":"1"}]}//拒绝原因
		}
	},
	components:{
		'ImgZoom':ImgZoom
	},
	beforeDestroy:function(){
		window.clearInterval(this.timer)
	},
	created:function(){
		this.setType();
		
	},
	computed:{
		...mapState([
			"auditCount"
		])
	},
	watch:{
		'$route':'setType'
	},
	methods:{
		setType:function(){
			const route=this.$route,type=this.$route.params.type;
			if(type.indexOf("realtime")>-1){
				this.off.auditType=1;
			}else if(type.indexOf("afterwards")>-1){
				this.off.auditType=2;
			}

			if(type.indexOf("_get")>-1){
				this.off.isGet=1;
				this.getAuditList();
			}else{
				this.off.isGet=0;
			}
		},
		agree:function(){//审核同意
			var vm=this,url='',orderId=vm.auditData.orderId;	
            //vm.AJAX("w/regist/audit",{"orderId":orderId,"result":1,"remarks":"","auditType":vm.off.auditType,"gztResult":vm.auditData.gztResult},function(data){layer.open({content:data.msg,skin:"msg",time:4,msgSkin:"success",success:function(){vm.dealAuditList()}})});
            reqCommonMethod({"orderId":orderId,"result":1,"remarks":"","auditType":vm.off.auditType,"gztResult":vm.auditData.gztResult},function(){vm.off.isLoad=false;},"km-ecs/w/regist/audit")
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
            }).catch(error=>errorDeal(error));             
		},
		refuse:function(obj){//审核拒绝
			var str='',vm=this,orderId=vm.auditData.orderId,popIndex,ww=window.innerWidth,wwSet;
			for(let i=0;i<vm.refuseArr.list.length;i++){
				var b='';
				if(vm.refuseArr.list[i].stopCard==1)b='<b class="f-c-red">★</b>';
				str+=`<div class="checkbox-list">
						<div class="m-form-checkbox">
							<label>
								<span class="checkbox">
									<input type="checkbox" name="${i}">
									<span></span>
								</span>
								<span class="text"><b class="f-c-red"></b>${vm.refuseArr.list[i].info+b}</span>
							</label>
						</div>
					  </div>`;
			}
			ww<=640 ? wwSet='width:98%' : wwSet='max-width:645px';
			popIndex=layer.open({
				content:`<div class="f-scroll-lt lay-div-refuse f-tal" id="refuseList">${str}<div class="checkbox-list"><input maxlength="30" type="text" id="reason" placeholder="请输入补充内容"></div></div>`,
				btn:['确定','取消'],
				type:1,
				style:wwSet,
				title:['选择拒绝理由','color:#ffc333;text-align:left;padding-left:0.2rem;'],
				yes:function(){
					var p=document.getElementsByTagName('input'),remark='',reason;
					for(let i=0;i<p.length;i++){
						if(p[i].nodeType==1&&p[i].checked){
							remark+=vm.refuseArr.list[p[i].name].info+'|';//拒绝原因
						}
					}
					remark=remark.substring(0,remark.length-1);
					reason=document.getElementById('reason').value;
					if(remark==''&&reason=='')return false;
					console.log(remark+'|'+reason)
					//vm.AJAX("w/regist/audit",{"orderId":orderId,"result":2,"remarks":remark+"|"+reason,"auditType":vm.off.auditType,"gztResult":vm.auditData.gztResult},function(data){layer.open({content:data.msg,skin:"msg",time:4,msgSkin:"success",success:function(){vm.dealAuditList();layer.close(popIndex)}})});
                    reqCommonMethod({"orderId":orderId,"result":2,"remarks":remark+'|'+reason,"auditType":vm.off.auditType,"gztResult":vm.auditData.gztResult},function(){vm.off.isLoad=false;},"km-ecs/w/regist/audit")
                    .then((data)=>{
                        layer.open({
							content:data.msg,
							skin: 'msg',
							time: 4,
							msgSkin:'success',
							success:function(){
								vm.dealAuditList();
								layer.close(popIndex);
							}
						})
                    }).catch(error=>errorDeal(error)); 					
				}
			})
		},
		getAuditList:function(){//获取订单
			const vm=this;
			if(vm.off.isLoad==1){return false};
			vm.off.isLoad=1;
			// 审核信息列表
			//vm.AJAX("w/regist/toAuditList",{"auditType":vm.off.auditType},function(data){if(data.data.list.length==0){layer.open({content:"当前没有分配的订单",skin:"msg",time:4,msgSkin:"error",});return false}vm.list=data.data.list;vm.off.auditIndex=0;vm.dealAuditList();window.clearInterval(vm.timer);vm.timeDown(parseInt(vm.list[0].peirod))},function(){vm.off.isLoad=0});
            reqCommonMethod({"auditType":vm.off.auditType},function(){vm.off.isLoad=false;},"km-ecs/w/regist/toAuditList")
            .then((data)=>{
                if(data.data.list.length==0){
					layer.open({
			            content:'当前没有分配的订单',
			            skin: 'msg',
			            time: 4,
			            msgSkin:'error',
                    })
                    vm.off.isLoad=false;
			        return false;
				}
				vm.list=data.data.list;
				vm.off.auditIndex=0;
				vm.dealAuditList();
				window.clearInterval(vm.timer);
                vm.timeDown(parseInt(vm.list[0].peirod));
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 	
		},
		// 激活审核国政通校验
		gztBtn:function(){
			const vm=this;
			//vm.AJAX("w/regist/gztCheck",{"orderId":vm.auditData.orderId,"auditType":vm.off.auditType},function(data){if(data==""){return false}else{vm.result=data.msg;var code=data.code;vm.off.auditIndex=0;if(code==200){layer.open({content:vm.result,skin:"msg",time:4,msgSkin:"success",})}else{layer.open({content:vm.result,skin:"msg",time:4,msgSkin:"error",})}}},function(){vm.off.isLoad=0});
            reqCommonMethod({"orderId":vm.auditData.orderId,"auditType":vm.off.auditType},function(){vm.off.isLoad=false;},"km-ecs/w/regist/gztCheck")
            .then((data)=>{
                if(data==''){
			        return false;
				}else{
					vm.result = data.msg;
					var code = data.code;
				    vm.off.auditIndex=0;
				    if(code==200){
				    	layer.open({
				            content:vm.result,
				            skin: 'msg',
				            time: 4,
				            msgSkin:'success',
				        })
				    }else{
				    	layer.open({
				            content:vm.result,
				            skin: 'msg',
				            time: 4,
				            msgSkin:'error',
				        })
				    }
				}
            }).catch(error=>errorDeal(error)); 	        
		}
		,
		dealAuditList:function(){//处理分配的订单
			const vm=this,len=vm.list.length;
			vm.auditData='';
			if(len&&(vm.off.auditIndex+1)<=len){
				vm.auditData=vm.list[vm.off.auditIndex];
				if(vm.auditData.merchantType==1){//企业
					vm.imgData=[
						{'src':vm.auditData.doorPictureLeft,'name':'门店照片-左'},
						{'src':vm.auditData.doorPictureRight,'name':'门店照片-右'},
						{'src':vm.auditData.handPicture,'name':'手持证件照'},
						{'src':vm.auditData.signPicture,'name':'手签名'},
					];
				}else if(vm.auditData.merchantType==2){//个人
					vm.imgData=[
						{'src':vm.auditData.doorPictureLeft,'name':'身份证正面'},
						{'src':vm.auditData.doorPictureRight,'name':'身份证反面'},
						{'src':vm.auditData.handPicture,'name':'手持证件照'},
						{'src':vm.auditData.signPicture,'name':'手签名'},
					];
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
	    	};vm.timer=setInterval(function(){
				time--;
	    		time==0?(vm.off.time='00:00',clearInterval(vm.timer),vm.auditData=''):vm.off.time=timeFormat(time);
			},1000);
		},
		getDateTime(v){
			return getDateTime(v);
		}
	}
}
</script>


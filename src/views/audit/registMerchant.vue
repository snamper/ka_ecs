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
</style>
<template>
<div style="width100%;height:100%;padding:10px;">
	<section class="g-audit-menu" v-show="!off.type">
		<div class="g-audit-menu-c">
			<div class="m-menu-div">
				<router-link :to="{name:'registMerchantAudit',params:{type:'get'}}" class="u-bg navBg10"><div>激活商户</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>{{auditCount.registerMerchant}}</span></p><p>已分配<span>{{auditCount.registerMerchant_}}</span></p></div>
			</div>
		</div>
		<router-view></router-view>
	</section>
	<div id="auditList" v-show="off.type">
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
										<span v-show="auditData.merchantType=1">门店名称：</span>
										<span v-show="auditData.merchantType==2">个人商户名称：</span>
									</td><td>{{auditData.companyName}}</td></tr>
									<tr><td>
										<span v-show="auditData.merchantType=1">营业执照编号：</span>
										<span v-show="auditData.merchantType==2">身份证号码：</span>
									</td><td>{{auditData.businessLicence}}</td></tr>
									<tr><td>商户注册电话：</td><td>{{auditData.phone}}</td></tr>
									<tr><td>具体地址：</td><td>{{auditData.address}}</td></tr>
									<tr><td>邀请码：</td><td>{{auditData.superInviteCode}}</td></tr>
									<tr><td>支付宝账号：</td><td>{{auditData.alipayUserId}}</td></tr>
									<tr><td>微信账号：</td><td>{{auditData.weixinUserId}}</td></tr>
									<tr><td>售卡城市：</td><td>{{auditData.cityName}}[{{auditData.cityCode}}]</td></tr>
									<tr><td>商户属性：</td><td>
										<span v-show="auditData.merchantType==1">企业</span>
										<span v-show="auditData.merchantType==2">个人</span>
									</td></tr>
									<tr><td>售卡权限：</td><td>
										<span v-show="auditData.merchantAttribute==1">远特卡</span>
										<span v-show="auditData.merchantAttribute==2">联通卡</span>
										<span v-show="auditData.merchantAttribute==3">远特卡+联通卡</span>
										<span v-show="auditData.merchantAttribute==4">联通卡+远特卡</span>
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
import "../../assets/css/cardOrderDetails.css";
import "../../assets/css/audit.css";
import { mapState } from 'vuex';
import ImgZoom from '../../components/ImgZoom';
import { getDateTime } from "../../config/utils.js";
export default{
	data (){
		return {
			off:{
				auditIndex:0,//订单索引
				time:'00:00',//审核计时
				isLoad:0,//是否ajax请求,
				type:0
			},
			timer:Number,//审核倒计时
			list:[],//分配的订单
			auditData:'',//当前处理的订单
			imgData:[],//当前订单的图片
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
			const route=this.$route;
			if(route.params.type=="index"){
				this.off.type=0;
			}else if(route.params.type=="get"){
				this.off.type=1;
				this.getAuditList();
			}
		},
		agree:function(){//审核同意
			var vm=this,url='',orderId=vm.auditData.orderId;

			vm.AJAX("w/regist/audit",{"orderId":orderId,"result":1,"remarks":""},function(data){
				layer.open({
					content:data.msg,
					skin: 'msg',
					time: 4,
					msgSkin:'success',
					success:function(){
						vm.dealAuditList();
					}
				})
			})
		},
		refuse:function(obj){//审核拒绝
			var str='',vm=this,orderId=vm.auditData.orderId,popIndex;
		
			popIndex=layer.open({
				content:`<div class="f-scroll-lt lay-div-refuse f-tal" id="refuseList"><div class="checkbox-list" style="margin:0;width:200px;"><input maxlength="30" type="text" id="remarks" placeholder="请输入拒绝理由"></div></div>`,
				type:0,
				title:'开卡时间详情',
				btn:['确定','取消'],
				style:'width:auto;',
				yes:function(){
					let remarks=document.getElementById('remarks').value;
					if(remarks=='')return false;
					vm.AJAX("w/regist/audit",{"orderId":orderId,"result":2,"remarks":remarks},function(data){
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
					})
				}
			});	
		},
		getAuditList:function(){//获取订单
			const vm=this;
			if(vm.off.isLoad==1){return false};
			vm.off.isLoad=1;
			vm.AJAX("w/regist/toAuditList",{},function(data){
				if(data.data.list.length==0){
					layer.open({
			            content:'当前没有分配的订单',
			            skin: 'msg',
			            time: 4,
			            msgSkin:'error',
			        })
			        return false;
				}
				vm.list=data.data.list;
				vm.off.auditIndex=0;
				vm.dealAuditList();
				window.clearInterval(vm.timer);
				vm.timeDown(parseInt(vm.list[0].peirod));
			},function(){
				vm.off.isLoad=0;
			})
		},
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


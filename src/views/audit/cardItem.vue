<!--**
  *@info 审核子模块-开卡子模块
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<style scoped>
  @import "../../assets/css/audit.css";
  #auditList{
  	width: 100%;
  	height: 100%;
  	position: relative;
  }
</style>
<template>
	<div id="auditList">
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
									<tr><td>订单状态：</td>
										<td class="f-c-purple" v-if="auditData.orderStatus==0">待审核</td>
										<td class="f-c-yellow" v-if="auditData.orderStatus==1">进行中</td>
										<td class="f-c-green" v-if="auditData.orderStatus==2">成功</td>
										<td class="f-c-red" v-if="auditData.orderStatus==3">失败</td>
									</tr>
									<tr><td>生成时间：</td><td>{{getDateTime(auditData.create_time)[6]}}</td></tr>
									<tr><td>完工时间：</td><td>{{auditData.getResultTime==0? '--' : getDateTime(auditData.getResultTime)[6]}}</td></tr>
									<tr><td>审核方式：</td><td>{{off.auditType==0 ? '实时审核' : '事后审核'}}</td></tr>
									<tr><td>用户姓名：</td><td>{{auditData.userName}}</td></tr>
									<tr v-if="$route.params.type==7"><td>原机主姓名：</td><td>{{auditData.userNameOld}}</td></tr>
									<tr><td>电话号码：</td><td>{{ auditData.phone }}
										<span class="f-c-purple" v-if="auditData.cardType==1">远特</span>
										<span class="f-c-yellow" v-if="auditData.cardType==2">联通</span>
									</td></tr>
									<tr><td>归属地：</td><td>{{ auditData.cityName }}</td></tr>
									<tr><td>相似度：</td><td>{{ auditData.similarity }}%</td></tr>
									<tr><td>证件类型：</td><td>身份证</td></tr>
									<tr><td>证件号码：</td><td>{{ auditData.papersCode }}</td></tr>
									<tr v-if="$route.params.type==7"><td>原机主证件号码：</td><td>{{auditData.papersCodeOld}}</td></tr>
									<tr><td>证件地址：</td><td>{{ auditData.userAddress }}</td></tr>
									<tr v-if="$route.params.type==7"><td>原机主证件地址：</td><td>{{auditData.userAddressOld}}</td></tr>
									<tr><td>证件期限：</td><td>{{ auditData.validityPeriod }}</td></tr>
									<tr><td>Mac地址：</td><td>{{ auditData.devMacAddr }}</td></tr>
									<tr><td>终端类型：</td><td>{{ auditData.terminalType }}</td></tr>
									<tr><td>识别仪名称：</td><td>{{ auditData.devSN }}</td></tr>
									<tr><td>活体识别APK：</td><td>{{ auditData.livingImgSoftWareName }}</td></tr>
									<tr><td>操作人：</td><td>{{ auditData.operatorName }}【操作人ID：{{ auditData.operator }}】</td></tr>
									<tr><td>商户名称：</td><td>{{ auditData.companyName }}【信用等级：{{auditData.levelName}}】</td></tr>
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
	  <div class="m-refresh" v-if="!auditData"><span class="u-icon-refresh" :class="{rotate360:off.isLoad}"></span><a @click="getAuditList">{{off.isLoad?'loading':'点击刷新'}}</a></div>
  </div>
</template>
<script>
import ImgZoom from '../../components/ImgZoom';
import { getDateTime } from "../../config/utils.js";
export default{
	data (){
		return {
			off:{
				auditIndex:0,//订单索引
				time:'00:00',//审核计时
				isLoad:0,//是否ajax请求
				auditType:1
			},
			timer:Number,//审核倒计时
			integralCount:[0],//选择的拒绝原因
			list:[],//分配的订单
			auditData:'',//当前处理的订单
			imgData:[],//当前订单的图片
			refuseArr:{}//拒绝原因
		}
	},
	components:{
		'ImgZoom':ImgZoom
	},
	beforeDestroy:function(){
		window.clearInterval(this.timer)
	},
	created:function(){
		var vm=this;
		vm.off.auditType=vm.$parent.off.auditType;
		vm.AJAX('w/audit/getRefuseReasons',{"auditType":vm.off.auditType},function(data){
			vm.refuseArr=data.data;
		},function(){

		});
		vm.getAuditList();
	},
	methods:{
		agree:function(){//审核同意
			var vm=this,auditType=vm.off.auditType;
			var orderId=vm.auditData.orderId;
			vm.AJAX('w/audit/audit',{"orderId":orderId,"result":1,"remark":'',"reason": '',"refuseReasonCode":"","auditType":auditType},function(data){
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
			var str='',vm=this,orderId=vm.auditData.orderId,popIndex,ww=window.innerWidth,wwSet,auditType=vm.off.auditType;
			vm.integralCount[0]=0;
			window.reasonClick=function(obj){//确定按钮，显示扣除分数
				var btn=document.getElementsByClassName('layui-m-layerbtn')[0].childNodes[1],points;
				if(obj.checked){//选择
					if(vm.refuseArr.type==1){//累加
						vm.integralCount[0]+=parseInt(vm.refuseArr.list[obj.name].point);
						points=vm.integralCount[0]
					}else{//最大值
						vm.integralCount.push(parseInt(vm.refuseArr.list[obj.name].point));
						points=Math.max.apply(null,vm.integralCount);
					}
				}else{//取消
					if(vm.refuseArr.type==1){//累减
						vm.integralCount[0]-=parseInt(vm.refuseArr.list[obj.name].point);
						points=vm.integralCount[0]
					}else{//最大值
						for(var i in vm.integralCount){
							if(vm.integralCount[i]==parseInt(vm.refuseArr.list[obj.name].point)){
								vm.integralCount.splice(i,1);
								break;
							}
						}
						points=Math.max.apply(null,vm.integralCount);
					}
					
				}
			}
			for(var i=0;i<vm.refuseArr.list.length;i++){
				var b='';
				if(vm.refuseArr.list[i].stopCard==1)b='<b class="f-c-red">★</b>';
				str+='<div class="checkbox-list">'+
						'<div class="m-form-checkbox"><label>'+
							'<span class="checkbox">'+
								'<input onclick="reasonClick(this)" type="checkbox" name="'+i+'">'+
								'<span></span>'+
							'</span>'+
							'<span class="text"><b class="f-c-red"></b>'+vm.refuseArr.list[i].info+b+'</span>'+
							'</label></div>'+
					  '</div>';
			}
			ww<=640 ? wwSet='width:98%' : wwSet='max-width:645px';
			popIndex=layer.open({
				content:'<div class="f-scroll-lt lay-div-refuse f-tal" id="refuseList">'+str+'<div class="checkbox-list"><input maxlength="30" type="text" id="reason" placeholder="请输入补充内容"></div></div>',
				btn:['确定','取消'],
				type:1,
				style:wwSet,
				title:['选择拒绝理由','color:#ffc333;text-align:left;padding-left:0.2rem;'],
				yes:function(){
					var p=document.getElementsByTagName('input'),remark='',stopCard="0",refuseReasonCode="";
					for(var i=0;i<p.length;i++){
						if(p[i].nodeType==1&&p[i].checked){
							remark+=vm.refuseArr.list[p[i].name].info+'|';//拒绝原因
							refuseReasonCode+=vm.refuseArr.list[p[i].name].code+','//拒绝原因code
							if(vm.refuseArr.list[p[i].name].stopCard==1&&vm.off.auditType==1)stopCard="1";
						}
					}
					remark=remark.substring(0,remark.length-1);
					refuseReasonCode=refuseReasonCode.substring(0,refuseReasonCode.length-1)
					var reason=document.getElementById('reason').value;
					if(remark==''&&reason=='')return false;

					vm.AJAX('w/audit/audit',{"orderId":orderId,"result":2,"remark":remark,"refuseReasonCode":refuseReasonCode,"reason": reason,"stopCard":stopCard,"auditType":auditType},function(data){
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
			})
			
		},
		getAuditList:function(){//获取订单
			const vm=this,type=vm.$route.params.type,auditType=vm.off.auditType;
			if(vm.off.isLoad==1){return false};
			vm.off.isLoad=1;
			vm.AJAX('w/audit/toaudit',{"type":type,"auditType":auditType},function(data){
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
				window.clearInterval(vm.timer)
				vm.timeDown(parseInt(vm.list[0].expireTime));
			},function(){
				vm.off.isLoad=0;
			})
		},
		dealAuditList:function(){//处理分配的订单
			const vm=this,len=vm.list.length;
			vm.auditData='';
			if(len&&(vm.off.auditIndex+1)<=len){
				vm.auditData=vm.list[vm.off.auditIndex];
				if(vm.$route.params.type==7){
					vm.imgData[0]={'src':vm.auditData.frontImageOld,'name':'原机主正面照片'};
					vm.imgData[1]={'src':vm.auditData.backImageOld,'name':'原机主反面照片'};//
					vm.imgData[2]={'src':vm.auditData.handImageOld,'name':'原机主手持照片'};
					vm.imgData[3]={'src':vm.auditData.papersImage,'name':'过户人正面照片'};
					vm.imgData[4]={'src':vm.auditData.backImage,'name':'过户人反面照片'};
					vm.imgData[5]={'src':vm.auditData.handImage,'name':'过户人手持照片'};
					vm.imgData[6]={'src':vm.auditData.signImage,'name':'过户人手签名照片'};
				}else{
					vm.imgData=[
						{'src':vm.auditData.papersImage,'name':'正面'},
						{'src':vm.auditData.backImage,'name':'反面'},
						{'src':vm.auditData.headImage,'name':'手持'},
						{'src':vm.auditData.livingImg,'name':'活体识别'}
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


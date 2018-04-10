<!--**
  *@info 审核子模块-开卡子模块
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<style scoped>
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
									<!-- <tr><td>订单状态：</td>
										<td class="f-c-purple" v-if="auditData.orderStatus==0">待审核</td>
										<td class="f-c-yellow" v-if="auditData.orderStatus==1">进行中</td>
										<td class="f-c-green" v-if="auditData.orderStatus==2">成功</td>
										<td class="f-c-red" v-if="auditData.orderStatus==3">失败</td>
									</tr> -->
									<tr><td>生成时间：</td><td>{{getDateTime(auditData.createTime)[6]}}</td></tr>
									<tr v-show="off.itemType==6"><td>完工时间：</td><td>{{auditData.getResultTime==0? '--' : getDateTime(auditData.getResultTime)[6]}}</td></tr>
									<tr><td>审核方式：</td>
										<td>
											<span v-show="off.auditType==0">实时审核</span>
											<span v-show="off.auditType==1">事后审核</span>
										</td>
									</tr>

									<tr><td>电话号码：</td>
										<td>{{ auditData.phone }}
											<span class="f-c-purple" v-if="auditData.cardType==1">远特</span>
											<span class="f-c-yellow" v-if="auditData.cardType==2">联通</span>
										</td>
									</tr>
									<tr><td>归属地：</td><td>{{ auditData.cityName }}</td></tr>
									<tr v-show="off.itemType!=8&&off.itemType!=9"><td>IMEI：</td><td>{{ auditData.IMEI }}</td></tr>
									<tr v-show="off.itemType==9"><td>appId：</td><td>{{ auditData.appId }}</td></tr>
	
									<tr><td>证件类型：</td><td>身份证</td></tr>
									<tr v-show="off.itemType==7"><td>原机主姓名：</td><td>{{auditData.userNameOld}}</td></tr>
									<tr><td>用户姓名：</td><td>{{auditData.userName}}</td></tr>
									<tr><td>证件号码：</td><td>{{ auditData.papersCode }}</td></tr>
									<tr v-show="off.itemType==7"><td>原机主证件号码：</td><td>{{auditData.papersCodeOld}}</td></tr>
									<tr><td>证件地址：</td><td>{{ auditData.userAddress }}</td></tr>
									<tr v-show="off.itemType==7"><td>原机主证件地址：</td><td>{{auditData.userAddressOld}}</td></tr>
									<tr><td>证件期限：</td><td>{{ auditData.validityPeriod }}</td></tr>
									<tr><td>活体识别相似度：</td><td>{{ auditData.similarity }}%</td></tr>
									<tr><td>终端类型：</td><td>{{ auditData.terminalType }}</td></tr>
									<tr v-show="off.itemType!=8&&off.itemType!=9"><td>Mac地址：</td><td>{{ auditData.devMacAddr }}</td></tr>
									<tr v-show="off.itemType!=8&&off.itemType!=9"><td>识别仪名称：</td><td>{{ auditData.devSN }}</td></tr>
									<!-- <tr><td>活体识别APK：</td><td>{{ auditData.livingImgSoftWareName }}</td></tr> -->
									<tr v-show="off.itemType!=8&&off.itemType!=9"><td>操作人：</td>
										<td>{{ auditData.operatorName }}【ID：{{ auditData.operator }}】</td>
									</tr>
									
									<tr v-show="off.itemType!=8"><td>操作人IP：</td><td>{{ auditData.host }}</td></tr>
									<tr v-show="off.itemType!=8"><td>操作人GPS：</td><td>{{ auditData.longitude }}，{{ auditData.latitude }}</td></tr>
									<tr v-show="off.itemType!=8&&off.itemType!=9"><td>商户名称：</td>
										<td>
											<span>{{ auditData.companyName }}</span>
											<span v-show="">【信用等级：{{auditData.levelName}}】</span>
										</td>
									</tr>
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
import {reqCommonMethod} from "../../../config/service.js";
import {errorDeal} from "../../../config/utils.js";
import "../../../assets/km/css/cardOrderDetails.css";
import "../../../assets/km/css/audit.css";
import ImgZoom from '../../../componentskm/ImgZoom';
import { getDateTime } from "../../../config/utils.js";
export default{
	data (){
		return {
			off:{
				auditIndex:0,//订单索引
				time:'00:00',//审核计时
				isLoad:0,//是否ajax请求
				auditType:1,//0,实时;1,事后;
				itemType:6//6，APP开卡；7，过户；8，SDK开卡；9，通服开卡
			},
			timer:Number,//审核倒计时
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
		vm.off.itemType=vm.$route.params.type;
		//vm.AJAX("w/audit/getRefuseReasons",{"auditType":vm.off.auditType},function(data){vm.refuseArr=data.data},function(){});
        reqCommonMethod({"auditType":vm.off.auditType},function(){vm.off.isLoad=false;},"km-ecs/w/audit/getRefuseReasons")
        .then((data)=>{
            vm.refuseArr=data.data;
        }).catch(error=>errorDeal(error));              
		vm.getAuditList();
	},
	methods:{
		agree:function(){//审核同意
			var vm=this,auditType=vm.off.auditType,url='';
			var orderId=vm.auditData.orderId;

			if(vm.off.itemType==8){
				url="km-ecs/w/sdk/auditOrder";
			}else if(vm.off.itemType==9){
				url="km-ecs/w/tongfu/auditOrder";
			}else{
				url="km-ecs/w/audit/audit";
			}
			//vm.AJAX(url,{"orderId":orderId,"result":1,"remark":"","reason":"","refuseReasonCode":"","auditType":auditType},function(data){layer.open({content:data.msg,skin:"msg",time:4,msgSkin:"success",success:function(){vm.dealAuditList()}})});
            reqCommonMethod({"orderId":orderId,"result":1,"remark":'',"reason": '',"refuseReasonCode":"","auditType":auditType},function(){vm.off.isLoad=false;},url)
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
			var str='',vm=this,orderId=vm.auditData.orderId,popIndex,ww=window.innerWidth,wwSet,auditType=vm.off.auditType;
		
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
					var p=document.getElementsByTagName('input'),remark='',stopCard="0",refuseReasonCode="",url='',reason;
					for(let i=0;i<p.length;i++){
						if(p[i].nodeType==1&&p[i].checked){
							remark+=vm.refuseArr.list[p[i].name].info+'|';//拒绝原因
							refuseReasonCode+=vm.refuseArr.list[p[i].name].code+','//拒绝原因code
							if(vm.refuseArr.list[p[i].name].stopCard==1&&auditType==1)stopCard="1";
						}
					}
					remark=remark.substring(0,remark.length-1);
					refuseReasonCode=refuseReasonCode.substring(0,refuseReasonCode.length-1)
					reason=document.getElementById('reason').value;
					if(remark==''&&reason=='')return false;

					if(vm.off.itemType==8){
						url="km-ecs/w/sdk/auditOrder";
					}else if(vm.off.itemType==9){
						url="km-ecs/w/tongfu/auditOrder";
					}else{
						url="km-ecs/w/audit/audit";
					}
					//vm.AJAX(url,{"orderId":orderId,"result":2,"remark":remark,"refuseReasonCode":refuseReasonCode,"reason":reason,"stopCard":stopCard,"auditType":auditType},function(data){layer.open({content:data.msg,skin:"msg",time:4,msgSkin:"success",success:function(){vm.dealAuditList();layer.close(popIndex)}})});
                    reqCommonMethod({"orderId":orderId,"result":2,"remark":remark,"refuseReasonCode":refuseReasonCode,"reason": reason,"stopCard":stopCard,"auditType":auditType},function(){vm.off.isLoad=false;},url)
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
			const vm=this,auditType=vm.off.auditType;
			var url='';
			if(vm.off.isLoad==1){return false};
			vm.off.isLoad=1;

			if(vm.off.itemType==8){
				url="km-ecs/w/sdk/distributeOrder";
			}else if(vm.off.itemType==9){
				url="km-ecs/w/tongfu/distributeOrder";
			}else{
				url="km-ecs/w/audit/toaudit";
			}
			//vm.AJAX(url,{"type":vm.off.itemType,"auditType":auditType},function(data){if(data.data.list.length==0){layer.open({content:"当前没有分配的订单",skin:"msg",time:4,msgSkin:"error",});return false}vm.list=data.data.list;vm.off.auditIndex=0;vm.dealAuditList();window.clearInterval(vm.timer);vm.timeDown(parseInt(vm.list[0].expireTime))},function(){vm.off.isLoad=0});
            reqCommonMethod({"type":vm.off.itemType,"auditType":auditType},function(){vm.off.isLoad=false;},url)
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
				window.clearInterval(vm.timer)
                vm.timeDown(parseInt(vm.list[0].expireTime));
                vm.off.isLoad=false;                  
            }).catch(error=>errorDeal(error)); 
		},
		dealAuditList:function(){//处理分配的订单
			const vm=this,len=vm.list.length;
			vm.auditData='';
			if(len&&(vm.off.auditIndex+1)<=len){
				vm.auditData=vm.list[vm.off.auditIndex];
				if(vm.off.itemType==7){//过户办理
					vm.imgData[0]={'src':vm.auditData.frontImageOld,'name':'原机主正面照片'};
					vm.imgData[1]={'src':vm.auditData.backImageOld,'name':'原机主反面照片'};//
					vm.imgData[2]={'src':vm.auditData.handImageOld,'name':'原机主手持照片'};
					vm.imgData[3]={'src':vm.auditData.imageUrl,'name':'过户人正面照片'};
					vm.imgData[4]={'src':vm.auditData.backImageUrl,'name':'过户人反面照片'};
					vm.imgData[5]={'src':vm.auditData.handImage,'name':'过户人手持照片'};
					vm.imgData[6]={'src':vm.auditData.signImage,'name':'过户人手签名照片'};
				}else{//开卡
					vm.imgData=[
						{'src':vm.auditData.imageUrl,'name':'正面'},
						{'src':vm.auditData.backImageUrl,'name':'反面'},
						{'src':vm.auditData.handImageUrl,'name':'手持'},
						{'src':vm.auditData.livingImgUrl,'name':'活体识别'},
						{'src':vm.auditData.signImageUrl,'name':'手签名'}
					];
					console.log(vm.imgData[0].src)
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


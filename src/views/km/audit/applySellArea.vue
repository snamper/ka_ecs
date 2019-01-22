<!--**
  *@info 开卡订单详情模块
  *@author: thinkmix
  *@date 2017-2-11
* *-->
<style scoped>
table.g-box{
    height: 98%;
}
#details,.divApply{
    width: 100%;
    height: 100%;
    display: table;
    position: relative;
}
table.g-inner-table tbody tr td:first-child{
    width: 1.2rem;
    text-align: right;
}
</style>
<template>
<section class="g-list-box" id="details">
  <div v-if="auditData" class="divApply">
      	<header class="g-lis-head">
		<a class="m-details-back" ></a>
  	  	<div class=" m-footD-btn ">
            <a class="f-btn f-btn-success" @click="agree()" style="margin-right:20px">通过</a>
			<a class="f-btn f-btn-danger" @click="refuse()">拒绝</a>
	  	</div>
        </header>
        <div class="g-box">
            <table class="g-list-table">
                <tr>
                    <td>
                        <table  class="g-inner-table">
                            <tbody>
                                <tr><td>订单号:</td><td>{{auditData.orderId}}</td></tr>
                                <tr><td>原业务范围:</td><td><span v-for="x in auditData.openedScopes" :key="x">{{x.areas}}(<span v-if="x.type==1">远特售卡</span><span v-if="x.type==2">联通售卡</span><span v-if="x.type==3">移动售卡</span><span v-if="x.type==4">电信售卡</span>)<br></span></td></tr>
                                <tr><td>申请业务范围:</td><td>
                                <span v-if="auditData.operateType==2"><span>{{auditData.openingArea}}</span>(<span v-if="auditData.type==1">远特售卡</span><span v-if="auditData.type==2">联通售卡</span><span v-if="auditData.type==3">移动售卡</span><span v-if="auditData.type==4">电信售卡</span>)</span>
                                <span v-if="auditData.operateType==1"><span v-if="auditData.type==1">远特售卡</span><span v-if="auditData.type==2">联通售卡</span><span v-if="auditData.type==3">移动售卡</span><span v-if="auditData.type==4">电信售卡</span>(<span>{{auditData.openingArea}}</span>)</span>
                                </td></tr>
                                <tr><td>操作类型:</td><td><span v-if="auditData.operateType==1">开通权限</span><span v-if="auditData.operateType==2">扩展区域</span></td></tr>
                                <tr><td>审核状态:</td><td><span v-if="auditData.status==1" class="f-c-yellow">待审核</span><span v-if="auditData.status==2">通过</span><span v-if="auditData.status==3">拒绝</span></td></tr>
                                <tr><td>审核时间:</td><td>{{auditData.modifyTime}}</td></tr>
                                <tr><td>商户名称:</td><td>{{auditData.companyName}}<a href="javascript:void(0)"class="details m-l" @click="detailsMerchant">查看详情</a></td></tr>
                                <tr><td>商户ID:</td><td>{{auditData.dealerId}}</td></tr>
                                <tr><td>申请人姓名:</td><td>{{auditData.userName}}</td></tr>
                                <tr><td>申请人ID:</td><td>{{auditData.userId}}<a href="javascript:void(0)"class="details m-l"  @click="detailsUser">查看详情</a></td></tr>
                                <tr><td>申请人手机号码:</td><td>{{auditData.userPhone}}</td></tr>
                            </tbody>
                        </table>
                    </td>
                    <td class="m-box-img m-meida-640up" style="border-left:1px solid #ccc">
                        <ImgZoom :imgData="imgData"></ImgZoom>
                    </td>
                </tr>
            </table>
        </div>
        <um-details-view v-if="isShowDetails" :type="typeDetails" :list="detailsList" :dealerId="auditData.dealerId"></um-details-view>
  </div>
  <div class="m-refresh" v-if="!auditData"><span class="u-icon-refresh" :class="{rotate360:off.isLoad}"></span><a @click="getAuditList">{{off.isLoad?'loading':'获取订单'}}</a></div>  
</section>
</template>
<script>
import "../../../assets/km/css/cardOrderDetails.css";
import "../../../assets/km/css/audit.css";
import {reqCommonMethod} from "../../../config/service.js";
import {errorDeal,imgUrlDeal} from "../../../config/utils.js";
import ImgZoom from '../../../componentskm/ImgZoom';
import detailsView from '../../../componentskm/cardOrderDetailsAlert';

export default{
	name:'cardOrderDetails',
	props:{
		type:Number,
		number:String,
        source:String,//订单来源，6、卡盟APP；7、卡盟SDK；8卡盟通服
        auditData:Object,
	},
	data(){
		return{
            auditData:{},
			imgData:[],//当前订单的图片
			isShowDetails:0,
			typeDetails:0,
			detailsList:'',
            userMoreInfo:'',//更多用户信息
			refuseArr:{"type":"1","list":[{"code":"2001","info":"部分或全部照片中存在模糊、分辨率太小无法辨认/严重变形/反光严重/拍摄角度不规范","point":"0","stopCard":"0"},{"code":"2002","info":"背景非售卡现场拍摄照片(包括证件及手持照)","point":"0","stopCard":"0"},{"code":"2003","info":"无用户签名或签名与用户姓名不符","point":"0","stopCard":"0"},{"code":"2004","info":"手持证卡合影不规范，非免冠正脸照、人脸被遮挡等导致无法清晰辨别是否为本人","point":"0","stopCard":"0"},{"code":"2005","info":"部分或全部照片内容为疑似翻拍或合成","point":"0","stopCard":"0"},{"code":"2006","info":"非本人现场手持证卡照","point":"0","stopCard":"0"},{"code":"2007","info":"证件与手持合影照中证件不同","point":"0","stopCard":"0"},{"code":"2008","info":"已被拒绝并明知信息有问题（包括但不限于非本人现场手持证件）仍然多次重复恶意上传（严重违规）","point":"0","stopCard":"1"},{"code":"2009","info":"部分或全部照片内容被明确为翻拍或合成、造假（严重违规）","point":"0","stopCard":"1"}]}//拒绝原因            
            ,off:{
                auditIndex:'',
            }
        }
	},
	components:{
		'um-details-view':detailsView,
		'ImgZoom':ImgZoom
	},
	created:function(){
		var vm=this;
        vm.getAuditList();
        vm.imgData=[{'src':imgUrlDeal(vm.auditData.img),'name':'手签名'}];
	},
	methods:{
          getAuditList:function(){//获取订单
			let vm=this,url='km-ecs/w/attribute/auditList';
			// if(vm.off.isLoad==1){return false};
			vm.off.isLoad=1;
            reqCommonMethod({},function(){vm.off.isLoad=false;},url)
            .then((data)=>{
                if(data.data.length==0){
					layer.open({
			            content:'当前没有分配的订单',
			            skin: 'msg',
			            time: 4,
			            msgSkin:'error',
			        })
                vm.off.isLoad=false;  
                return false;                                  
                }
				vm.list=data.data;
				vm.off.auditIndex=0;
				vm.dealAuditList();
				window.clearInterval(vm.timer)
                vm.timeDown(parseInt(vm.list[0].expireTime));
                //vm.off.isLoad=false;                  
            }).catch(error=>errorDeal(error)); 
        },dealAuditList:function(){//处理分配的订单
			const vm=this,len=vm.list.length;
			vm.auditData='';
			if(len&&(vm.off.auditIndex+1)<=len){
				vm.auditData=vm.list[vm.off.auditIndex];
                vm.imgData=[{'src':imgUrlDeal(vm.auditData.img),'name':'手签名'},];
				vm.off.auditIndex++;
			}
		},agree:function(){//审核同意
			var vm=this,url='km-ecs/w/attribute/audit';	
            reqCommonMethod({"orderId":vm.auditData.orderId,"result":2,reason:""},false,url)
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
        audit:function(result,reason,cb){//复审同意
			var vm=this;
            reqCommonMethod({"orderId":vm.auditData.orderId,"result":result,"reason":reason||''},false,"km-ecs/w/attribute/audit")
            .then((data)=>{
                layer.open({
		            content:'操作成功',
		            skin: 'msg',
		            time: 4,
                    msgSkin:'success',
                    success:function(){
                        vm.dealAuditList();
                    }
		        });
				cb&&cb();
            }).catch(error=>errorDeal(error));            
		},
		refuse:function(obj){//审核拒绝
			// var str='',url='/km-ecs/w/attribute/audit',vm=this,orderId=vm.auditData.orderId,popIndex,ww=window.innerWidth,wwSet;
			// for(let i=0;i<vm.refuseArr.list.length;i++){
			// 	var b='';
			// 	if(vm.refuseArr.list[i].stopCard==1)b='<b class="f-c-red">★</b>';
			// 	str+=`<div class="checkbox-list">
			// 			<div class="m-form-checkbox">
			// 				<label>
			// 					<span class="checkbox">
			// 						<input type="checkbox" name="${i}">
			// 						<span></span>
			// 					</span>
			// 					<span class="text"><b class="f-c-red"></b>${vm.refuseArr.list[i].info+b}</span>
			// 				</label>
			// 			</div>
			// 		  </div>`;
			// }
			// ww<=640 ? wwSet='width:98%' : wwSet='max-width:645px';
			// popIndex=layer.open({
			// 	content:`<div class="f-scroll-lt lay-div-refuse f-tal" id="refuseList">${str}<div class="checkbox-list"><input maxlength="30" type="text" id="reason" placeholder="请输入补充内容"></div></div>`,
			// 	btn:['确定','取消'],
			// 	type:1,
			// 	style:wwSet,
			// 	title:['选择拒绝理由','color:#ffc333;text-align:left;padding-left:0.2rem;'],
			// 	yes:function(){
			// 		var p=document.getElementsByTagName('input'),remark='',reason;
			// 		for(let i=0;i<p.length;i++){
			// 			if(p[i].nodeType==1&&p[i].checked){
			// 				remark+=vm.refuseArr.list[p[i].name].info+'|';//拒绝原因
			// 			}
			// 		}
			// 		remark=remark.substring(0,remark.length-1);
			// 		reason=document.getElementById('reason').value;
            //         if(remark==''&&reason=='')return false;
			// 		// vm.AJAX(url,{"orderId":orderId,"result":3,"reason":remark+"|"+reason},function(data){layer.open({content:data.msg,skin:"msg",time:4,msgSkin:"success",success:function(){vm.dealAuditList();layer.close(popIndex)}})});
            //         reqCommonMethod({"orderId":orderId,"result":3,"reason":remark+'|'+reason},function(){vm.off.isLoad=false;},url)
            //         .then((data)=>{
            //                layer.open({
			// 				content:data.msg,
			// 				skin: 'msg',
			// 				time: 4,
			// 				msgSkin:'success',
			// 				success:function(){
			// 					vm.dealAuditList();
			// 					layer.close(popIndex);
			// 				}
			// 			})
            //         }).catch((data)=>{
            //             layer.open({
			// 				content:data.msg,
			// 				skin: 'msg',
			// 				time: 4,
			// 				msgSkin:'error',
			// 				success:function(){
			// 					vm.dealAuditList();
			// 					layer.close(popIndex);
			// 				}
			// 			})
            //         }); 					
			// 	}
            // })
            var vm=this,ww=window.innerWidth,wwSet,popIndex;
			ww<=640 ? wwSet='width:98%' : wwSet='max-width:645px';
			popIndex=layer.open({
				content:'<div class="layer-refuse-pop"><textarea maxlength="30" id="reason"></textarea></div>',
				btn:['确定','取消'],
				type:1,
				style:wwSet,
				title:['请输入拒绝理由'],
				yes:function(){
					var reason=document.getElementById('reason').value;
					if(!reason)return false;
					vm.audit(3,reason,function(){
						layer.close(popIndex);
					})
				}
			});
		},timeDown:function(time){//倒计时
			var vm=this,timeFormat=function(t){
	    		var t_s=t%60,t_m=Math.floor(t/60);
	    		t_s<=9&&(t_s='0'+t_s);
	    		t_m<=9&&(t_m='0'+t_m);
	    		return t_m+':'+t_s;
	    	};vm.timer=setInterval(function(){
				time--;
	    		time==0?(vm.off.time='00:00',clearInterval(vm.timer),vm.auditData=''):vm.off.time=timeFormat(time);
			},1000);
		},detailsUser:function(){//申请人详情
			var vm=this;
            reqCommonMethod({"userId":vm.auditData.userId},false,"km-ecs/w/audit/getUserInfo")
            .then((data)=>{
                vm.detailsList=data.data;
				vm.isShowDetails=true;
				vm.typeDetails=1;
            }).catch(error=>errorDeal(error));;            
		},
		detailsMerchant:function(){//商户详情
			var vm=this;
            reqCommonMethod({"dealerId":vm.auditData.dealerId},false,"km-ecs/w/audit/getMerchantInfo")
            .then((data)=>{
                vm.detailsList=data.data;
				vm.isShowDetails=true;
				vm.typeDetails=2;
            }).catch(error=>errorDeal(error));;            
		},
	}
}
</script>
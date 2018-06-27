<style scoped>
  @import "../../assets/ym/css/audit.css";
  .m-set-table{display: table;width: 100%;height: 100%;}
</style>
<template>
<section class="m-set-table">
	<div id="auditList">
	  <section class="g-list-box" v-if="auditData">
	  	  <header class="g-lis-head">
	  	  	<div class="m-has-db">审核状态：<span><b>{{off.auditIndex}}</b>/<i>{{list.length}}</i></span></div>
	  	  	<!-- <div class="m-time-down">审核计时：<span class="f-c-red">{{off.time}}</span></div> -->
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
									<tr><td>订单号码：</td><td>{{auditData.custOrderId}}</td></tr>
									<tr><td>生成时间：</td><td>{{auditData.orderDate}}</td></tr>
									<tr><td>用户姓名：</td><td>{{auditData.custName}}</td></tr>
									<tr><td>电话号码：</td><td>{{ auditData.phoneNumber }}</td></tr>
									<tr><td>证件类型：</td><td>身份证</td></tr>
									<tr><td>证件号码：</td><td>{{ auditData.identityCode }}</td></tr>
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
					<tr class="m-box-img m-meida-640down" v-for="todo in imgData">
						<img :src="todo.src">
					</tr>
				</tbody>
			  </table>
		  </div>
	  </section>
	  <div class="m-refresh" v-if="!auditData"><span class="u-icon-refresh" :class="{rotate360:off.isLoad}"></span><a @click="getAuditList">{{off.isLoad?'loading':'点击刷新'}}</a></div>
  </div>
</section>
</template>
<script>
import {reqCommonMethod} from "../../config/service.js";
import {errorDeal} from "../../config/utils.js";
export default{
	name:'auditList',
	data (){
		return {
			off:{
				auditIndex:0,//订单索引
				time:'03:00',//审核计时
				isLoad:0//是否ajax请求
			},
			list:[],//分配的订单
			auditData:'',//当前处理的订单
			zoomStyle:{"transform":"translate3d(0,0,0) scale(1) rotate(0deg)"},//缩放样式
			transformStyle:{x:0,y:0,s:1,r:0},//缩放初始坐标
			mouse:{x:0,y:0,off:!1},//鼠标坐标
			imgData:[{"name":''}],//当前订单的图片
			imgIndex:0,//图片索引
		}
	},
	created:function(){
		this.getAuditList();
	},
	methods:{
		agree:function(){//审核同意
			var vm=this,popIndex;
			popIndex=layer.open({
				content:'您是否同意该订单申请？',
				btn:['确定','取消'],
				type:0,
				style:'width:auto',
				yes:function(){
				// 	vm.AJAX('c/audit/sendWsimResult',{"phoneNumber":vm.auditData.phoneNumber,"transactionid":vm.auditData.transactionid,"resInt":'1'},function(data){
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
                reqCommonMethod({"phoneNumber":vm.auditData.phoneNumber,"transactionid":vm.auditData.transactionid,"resInt":'1'},function(){vm.off.isLoad=false;},"ym-ecs/c/audit/sendWsimResult")
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
			});
		},
		refuse:function(obj){//审核拒绝
			var vm=this,popIndex;
			popIndex=layer.open({
				content:'您是否拒绝该订单？',
				btn:['确定','取消'],
				type:0,
				style:'width:auto',
				yes:function(){
					// vm.AJAX('c/audit/sendWsimResult',{"phoneNumber":vm.auditData.phoneNumber,"transactionid":vm.auditData.transactionid,"resInt":'0'},function(data){
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
                    reqCommonMethod({"phoneNumber":vm.auditData.phoneNumber,"transactionid":vm.auditData.transactionid,"resInt":'0'},function(){vm.off.isLoad=false;},"ym-ecs/c/audit/sendWsimResult")
                    .then(()=>{
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
			const vm=this,type=vm.$route.params.type;
			if(vm.off.isLoad==1){return false};
			vm.off.isLoad=1;
			// vm.AJAX('c/audit/getWsimCard',{"t":new Date().getTime()},function(data){
			// 	vm.list[0]=data.data;
			// 	vm.off.auditIndex=0;
			// 	vm.dealAuditList();
			// 	vm.timeDown();
			// },function(){
			// 	vm.off.isLoad=0;
            // });
            reqCommonMethod({"t":new Date().getTime()},function(){vm.off.isLoad=false;},"ym-ecs/c/audit/getWsimCard")
            .then((data)=>{
                vm.list[0]=data.data;
				vm.off.auditIndex=0;
				vm.dealAuditList();
                vm.timeDown();
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error));    
		},
		dealAuditList:function(){//处理分配的订单
			const vm=this,len=vm.list.length;
			vm.auditData='';
			if(len&&(vm.off.auditIndex+1)<=len){
				vm.auditData=vm.list[vm.off.auditIndex];
				vm.imgData=[];
				for(let i in vm.auditData.picurlLists){
					vm.imgData.push({'src':vm.auditData.picurlLists[i].picurl||'assets/img/no-img.png','name':''})
				}
				vm.zoomStyle.backgroundImage='url('+vm.imgData[0].src+')';
				vm.off.auditIndex++;
			}
		},
		timeDown:function(){//倒计时
			var vm=this,time=180,timeFormat=function(t){
	    		var t_s=t%60,t_m=Math.floor(t/60);
	    		t_s<=9&&(t_s='0'+t_s);
	    		t_m<=9&&(t_m='0'+t_m);
	    		return t_m+':'+t_s;
	    	},timer=setInterval(function(){
				time--;
	    		time==0?(vm.off.time='00:00',clearInterval(timer),vm.getAuditList()):vm.off.time=timeFormat(time);
			},1000);
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
			if(v!=1&&v!=2&&v!=3){
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


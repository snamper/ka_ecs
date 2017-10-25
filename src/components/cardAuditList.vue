<style scoped>
  @import "../assets/css/audit.css";
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
	  </section>
	  <div class="m-refresh" v-if="!auditData"><span class="u-icon-refresh" :class="{rotate360:off.isLoad}"></span><a @click="getAuditList">{{off.isLoad?'loading':'点击刷新'}}</a></div>
  </div>
</template>
<script>
export default{
	name:'auditList',
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
			zoomStyle:{"transform":"translate3d(0,0,0) scale(1) rotate(0deg)"},//缩放样式
			transformStyle:{x:0,y:0,s:1,r:0},//缩放初始坐标
			mouse:{x:0,y:0,off:!1},//鼠标坐标
			imgData:[{"name":''}],//当前订单的图片
			imgIndex:0,//图片索引
			refuseArr:{}//拒绝原因
		}
	},
	beforeDestroy:function(){
		window.clearInterval(this.timer)
	},
	created:function(){
		var vm=this;
		vm.off.auditType=vm.$parent.off.auditType;
		vm.AJAX('w/audit/getRefuseReasons',{"auditType":vm.off.auditType},function(data){
			vm.refuseArr=data.data;
		})
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
				//points==0 ? btn.innerHTML='确定' : btn.innerHTML='确定<b class="f-c-red">【-'+(parseFloat(points)/1000).toFixed(3)+'】</b>';
			}
			for(var i=0;i<vm.refuseArr.list.length;i++){
				var b='';
				// if(vm.refuseArr.list[i].stopCard==1&&vm.off.auditType==1)b='<b class="u-icon-stop"></b>';
				if(vm.refuseArr.list[i].stopCard==1)b='<b class="f-c-red">★</b>';
				str+='<div class="checkbox-list">'+
						'<div class="m-form-checkbox"><label>'+
							'<span class="checkbox">'+
								'<input onclick="reasonClick(this)" type="checkbox" name="'+i+'">'+
								'<span></span>'+
							'</span>'+//[-'+(parseFloat(vm.refuseArr.list[i].point)/1000).toFixed(3)+']
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
					vm.imgData[0]={'src':vm.auditData.frontImageOld||'assets/img/no-img.png','name':'原机主正面照片'};
					vm.imgData[1]={'src':vm.auditData.backImageOld||'assets/img/no-img.png','name':'原机主反面照片'};//
					vm.imgData[2]={'src':vm.auditData.handImageOld||'assets/img/no-img.png','name':'原机主手持照片'};
					vm.imgData[3]={'src':vm.auditData.papersImage||'assets/img/no-img.png','name':'过户人正面照片'};
					vm.imgData[4]={'src':vm.auditData.backImage||'assets/img/no-img.png','name':'过户人反面照片'};
					vm.imgData[5]={'src':vm.auditData.handImage||'assets/img/no-img.png','name':'过户人手持照片'};
					vm.imgData[6]={'src':vm.auditData.signImage||'assets/img/no-img.png','name':'过户人手签名照片'};
				}else{
					vm.imgData=[{'src':vm.auditData.papersImage||'assets/img/no-img.png','name':'正面'},{'src':vm.auditData.backImage||'assets/img/no-img.png','name':'反面'},{'src':vm.auditData.headImage||'assets/img/no-img.png','name':'手持'},{'src':vm.auditData.avatarImage||'assets/img/no-img.png','name':'手签名'},{'src':vm.auditData.livingImg||'assets/img/no-img.png','name':'活体识别'}];
				}
				vm.zoomStyle.backgroundImage='url('+vm.imgData[0].src+')';
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
		rotate:function(e){//旋转
			var deg=parseInt(this.zoomStyle.transform.match(/\((\S*)deg/)[1]);
			deg+=90;
			this.transformStyle.r=deg;
			var transform='translate3d(0,0,0) scale(1) rotate('+deg+'deg)';
			this.zoomStyle.transform=transform;
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
					var transform='translate3d('+vm.transformStyle.x+'px,'+vm.transformStyle.y+'px,0) scale('+vm.transformStyle.s+') rotate('+vm.transformStyle.r+'deg)';

					vm.zoomStyle.transform=transform;
					break;
				case "mousemove":
					if(vm.mouse.off){
						var x=e.clientX-vm.mouse.x,y=e.clientY-vm.mouse.y;
						vm.transformStyle.x+=x;
						vm.transformStyle.y+=y;
						vm.mouse.x=e.clientX;
						vm.mouse.y=e.clientY;
						var transform='translate3d('+vm.transformStyle.x+'px,'+vm.transformStyle.y+'px,0) scale('+vm.transformStyle.s+') rotate('+vm.transformStyle.r+'deg)';
						vm.zoomStyle.transform=transform
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
					vm.zoomStyle.transform=transform;
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


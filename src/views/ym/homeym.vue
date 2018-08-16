<!--<style scoped>
  @import "../../assets/km/css/home.css";
</style>
<template>
  <div class="f-scroll-lt" id="home" :class={active:off.headMenu}>
  	<header class="g-head">
		<table cellspacing="0">
			<tbody>
				<tr>
					<td>
						<a class="m-navside-show" @click="headMenu"><i class="u-icon-menu"></i></a>
						<span v-if="crumb[1].name" class="f-inline-block m-crumb"><a :href="crumb[0].href">{{crumb[0].name}}</a><a class="u-icon-right mid"></a><a>{{crumb[1].name}}</a></span>
					</td>
					<td class="f-tar">
						<div class="m-user-online">Online <b>{{off.time}}</b></div>
						<div class="m-info-user"><i></i><span>{{userInfo.name}}</span></div>
						<div class="m-menu-user">
							<a @click="userMenu"><i class="u-icon-menu2"></i></a>
							<ul class="m-user-dropdown f-tas" :class="{active:off.userMenu}">
								<li>
									<a class="user clr">
										<div class="logo fl"></div>
										<div class="info f-tal"><div class="author">{{userInfo.name}}</div><time class="online">online：<b>{{off.time}}</b></time></div>
									</a>
								</li>
								<li><a @click="signOut">退出</a></li>
							</ul>
						</div>

					</td>
				</tr>
			</tbody>
		</table>
  	</header>
  	<aside class="g-side">
		<nav class="g-side-nav">
			<header class="g-side-head">远盟</header>
			<ul class="g-side-ul" >
				<li :class="{active:$route.path.indexOf('/home/audit')>-1||$route.path=='/home/wsim'}" v-if="off.power0">
					<b></b>
					<router-link to="/home/audit/yuanmeng"><div><i class="u-icon-audit"></i><span>订单审核</span><b class="animated infinite bounce m-lighter" v-if="count.total">{{count.total}}</b></div></router-link>
					<ul class="g-side-subul">
						<li><router-link :to="{name:'audit',params:{source:'yuanmeng'}}"><b></b>远盟</router-link></li>
						<li><router-link to="/home/wsim"><b></b>WSIM卡</router-link></li>
					</ul>
				</li>
				<li :class="{active:$route.path.indexOf('/home/search')>-1}" v-if="off.power">
					<b></b>
					<router-link to="/home/search"><div><i class="u-icon-search"></i><span>订单查询</span></div></router-link>
				</li>
				<li :class="{active:$route.path=='/home/pointsSearch'||$route.path=='/home/pointsEx'||$route.path=='/home/pointsGain'||$route.path=='/home/pointsManage'}">
					<b></b>
					<router-link to="/home/pointsSearch"><div><i class="u-icon-points"></i><span>积分管理</span></div></router-link>
					<ul class="g-side-subul" :class="off.power5?'Tall':'Talls'">
						<li><router-link to="/home/pointsSearch"><b></b>用户积分查询</router-link></li>
						<li><router-link to="/home/pointsGain"><b></b>积分获取详情</router-link></li>
						<li><router-link to="/home/pointsEx"><b></b>积分兑换详情</router-link></li>
						<li v-if="off.power5"><router-link to="/home/pointsManage"><b></b>积分管理</router-link></li>
					</ul>
				</li>
                <li :class="{active:$route.path.indexOf('/home/excelDownload')>-1}">
					<b></b>
					<router-link to="/home/excelDownload"><div><i class="u-icon-downLoad"></i><span>日报excel</span></div></router-link>
				</li>
				<li :class="{active:$route.path.indexOf('/home/illegalSearch')>-1}" v-if="off.power1">
					<b></b>
					<router-link to="/home/illegalSearch"><div><i class="u-icon-illegalSearch"></i><span>违规查询</span></div></router-link>
				</li>
			</ul>
		</nav>
	</aside>
  	<section class="g-main" id="main">
		<transition appear name="fadeInUp">
			<router-view></router-view>
		</transition>
	</section>
	<footer class="g-foot">

	</footer>
  </div>
</template>
<script>-->
// export default{
// 	name:'home',
// 	data (){
// 		return {
// 			off:{
// 				headMenu:1,
// 				window:0,
// 				userMenu:0,
// 				power:0,
//                 time:'00:00',
//                 power0:0,
//                 power5:0,
// 			},
// 			userInfo:'',
// 			timerLine:Number,
// 			timerUp:Number,
// 			crumb:[{'name':'','href':''},{'name':''}],
// 			count:{data:{"whiteCard": "0","readyCard": "0","newChangeCard": "0","realNameCollection": "0","fill": "0","whiteCard_1": "0","readyCard_1": "0","newChangeCard_1": "0","realNameCollection_1": "0","fill_1": "0"},total:0}
// 		};
// 	},
// 	watch:{
// 		'$route':'routeChange'
// 	},
// 	beforeDestroy:function(){
// 		clearInterval(this.timerLine);
// 		clearInterval(this.timerUp);
// 	},
// 	mounted:function(){
// 		this.init();
// 	},
// 	methods:{
// 		init:function(){//页面初始化
// 			const vm=this;
// 			var userInfo=localStorage.getItem('ECS_INFO');
// 			userInfo&&(vm.userInfo=JSON.parse(userInfo));
// 			vm.windowChange();//浏览器窗口变化
// 			vm.timeUp();//在线时间
// 			vm.routeChange();//头部面包屑
// 			vm.intervalCount();//获取审核统计
// 			vm.userInfo.isadmin&&vm.userInfo.isadmin.indexOf('1')>-1? vm.off.power1=true : vm.off.power1=false;
// 			vm.userInfo.isadmin&&(vm.userInfo.isadmin.indexOf('1')>-1||vm.userInfo.isadmin.indexOf('2')>-1) ? vm.off.power=true : vm.off.power=false;
// 			vm.userInfo.isadmin&&(vm.userInfo.isadmin.indexOf('1')>-1||vm.userInfo.isadmin.indexOf('0')>-1) ? vm.off.power0=true : vm.off.power0=false;
// 			vm.userInfo.isadmin&&(vm.userInfo.isadmin.indexOf('1')>-1||vm.userInfo.isadmin.indexOf('5')>-1) ? vm.off.power5=true : vm.off.power5=false;
            

// 			vm.timerLine=setInterval(function(){
// 				userInfo?vm.intervalCount():clearInterval(vm.timerLine);
// 			},10*1000);

// 			document.attachEvent ? doucument.body.attachEvent("onclick",function(event){
// 				vm.off.userMenu=false;
// 				window.event.cacenlBubble=false;
// 			}) : document.body.addEventListener("click", function(event) {
// 				vm.off.userMenu=false;
// 				event.stopPropagation();
// 			},false);
// 		},
// 		headMenu:function(){//侧边导航show or hide
// 			this.off.headMenu?this.off.headMenu=false:this.off.headMenu=true;
// 		},
// 		routeChange:function(){//路由变化
// 			this.off.window<=960?this.off.headMenu=false:void 0;
// 			var path=this.$route.path,crumb=[{'name':'','href':''},{'name':''}],mainDom=document.getElementById('main');
// 			path.indexOf("yuanmeng/")>-1&&(crumb[0]={'name':'远盟','href':'#/home/audit/yuanmeng'}) ? path.indexOf("/1")>-1 ? crumb[1]={'name':'成卡审核'} : path.indexOf("/2")>-1 ? crumb[1]={'name':'白卡审核'} : path.indexOf("/4")>-1 ? crumb[1]={'name':'实名补录'} : path.indexOf("/3")>-1 ? crumb[1]={'name':'过户办理'} : path.indexOf("/5")>-1 ? crumb[1]={'name':'实名登记'} : null : 
// 			path.indexOf("search/")>-1&&(crumb[0]={'name':'订单查询','href':'#/home/search'}) ? path.indexOf("/auditing")>-1 ? crumb[1]={'name':'待审核'} : path.indexOf("/audited")>-1 ? crumb[1]={'name':'已审核'} : null :void 0;
// 			if(path.indexOf("pointsSearch")>-1){
// 				crumb=[{'name':'积分管理','href':'#/home/pointsSearch'},{'name':'用户积分查询'}]
// 			}else if(path.indexOf("pointsEx")>-1){
// 				crumb=[{'name':'积分管理','href':'#/home/pointsEx'},{'name':'积分兑换详情'}]
// 			}else if(path.indexOf("pointsGain")>-1){
// 				crumb=[{'name':'积分管理','href':'#/home/pointsGain'},{'name':'积分获取详情'}]
// 			}else if(path.indexOf("pointsManage")>-1){
// 				crumb=[{'name':'积分管理','href':'#/home/pointsManage'},{'name':'积分管理'}]
// 			}
// 			this.crumb=crumb;
// 			mainDom.style.overflowY='hidden'
// 			var timer=setTimeout(function(){
// 				mainDom.style.overflowY=''
// 			},500)
// 		},
// 		userMenu:function(e){//用户菜单show or hide
// 			this.off.userMenu?this.off.userMenu=false:this.off.userMenu=true;
// 			e.stopPropagation();
// 		},
// 		windowChange:function(){//窗口改变
// 			const vm=this,change=function(){
// 				var w=window.innerWidth;
// 				vm.off.window=w;
// 				w<=960?vm.off.headMenu=false:void 0;
// 			};
// 			change();
// 			window.onresize=function(){
// 				change();
// 			};
// 		},
// 		timeUp:function(){//在线时间
// 			var vm=this;
// 			const timeFormat=function (t){
// 			    t=parseInt(t);
// 			    var day,minute,second,hour;
// 			    day=Math.floor(t/(60*60*24));
// 			    day>0 ? hour=Math.floor(t%(60*60*24)/(60*60)) : hour=Math.floor(t/(60*60));
// 			    hour>0 ? minute=Math.floor(t%(60*60)/60) : minute=Math.floor(t/60);
// 			    minute>0 ? second=Math.floor(t%60) : second=t;
// 			    hour<10&&(hour='0'+hour);
// 			    minute<10&&(minute='0'+minute);
// 			    second<10&&(second='0'+second);
// 			    return day!='00' ? day+"天"+hour+":"+minute+":"+second : hour!='00' ? hour+":"+minute+":"+second : minute!='00' ? minute+":"+second : "00:"+second;

// 			}
// 			vm.timerUp=setInterval(function(){
// 				var userInfo=localStorage.getItem('ECS_INFO');
// 				if(userInfo){
// 					userInfo=JSON.parse(userInfo)
// 					var time=userInfo.time;
// 				}else{
// 					window.clearInterval(vm.timerUp);
// 					return false;
// 				}
// 				time++;
// 				vm.off.time=timeFormat(time);
// 				userInfo.time=time;
// 				localStorage.setItem('ECS_INFO',JSON.stringify(userInfo));
// 			},1000)
// 		},
// 		intervalCount:function(){
// 			const vm=this;
// 			vm.AJAX('/c/audit/statisticsaudit',{'t':new Date().getTime()},function(data){
// 				if(data.data.whiteCard!="0"||data.data.readyCard!="0"||data.data.newChangeCard!="0"||data.data.realNameCollection!="0"||data.data.fill!="0"){
// 					vm.count.total=(parseInt(data.data.whiteCard)+parseInt(data.data.readyCard)+parseInt(data.data.newChangeCard)+parseInt(data.data.realNameCollection)+parseInt(data.data.fill));
// 				}else{
// 					vm.count.total=0;
// 				}
// 				vm.count.data=data.data;
// 			},function(){
// 				//去除加载层
// 			})
// 		},
// 		signOut:function(){
// 			var vm=this;
// 			vm.AJAX('c/user/loginOut',{'t':new Date().getTime()},function(data){
// 				localStorage.clear();
// 				clearInterval(vm.timerLine)
// 				clearInterval(vm.timerUp)
//                 location.href='#/login';
// 			})
// 		},
// 	}
// }

// </script>


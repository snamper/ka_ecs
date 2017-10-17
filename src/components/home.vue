<style scoped>
  @import "../assets/css/home.css";
</style>
<template>
  <div class="f-scroll-lt" id="home" :class={active:off.headMenu}>
  	<header class="g-head">
		<table cellspacing="0">
			<tbody>
				<tr>
					<td>
						<a class="m-navside-show" @click="headMenu"><i class="u-icon-menu"></i></a>
						<span v-if="crumb[1].name" class="f-inline-block m-crumb">
							<router-link :to="crumb[0].href">{{crumb[0].name}}</router-link>
							<a class="u-icon-right mid"></a>
							<a>{{crumb[1].name}}</a>
						</span>
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
			<header class="g-side-head">卡盟</header>
			<ul class="g-side-ul">
				<li :class="{active:$route.path.indexOf('/home/realtime')>-1}">
					<b></b>
					<router-link :to="{name:'realtime',params:{source:'kameng'}}"><div><i class="u-icon-time"></i><span>开卡实时审核</span><b class="animated infinite bounce m-lighter" v-if="count.total">{{count.total}}</b></div></router-link>
					<!-- <ul class="g-side-subul">
						<li><router-link :to="{name:'audit',params:{source:'kameng'}}"><b></b>卡盟</router-link></li>

					</ul> -->
				</li>
				<li :class="{active:$route.path.indexOf('/home/afterwards')>-1}">
					<b></b>
					<router-link :to="{name:'afterwards',params:{source:'kameng'}}"><div><i class="u-icon-audit"></i><span>开卡事后审核</span><b class="animated infinite bounce m-lighter" v-if="count.total2">{{count.total2}}</b></div></router-link>
					<!-- <ul class="g-side-subul">
						<li><router-link :to="{name:'audit',params:{source:'kameng'}}"><b></b>卡盟</router-link></li>

					</ul> -->
				</li>
				<li :class="{active:$route.path.indexOf('/home/cardOrderSearch')>-1}" v-if="off.power">
					<b></b>
					<router-link to="/home/cardOrderSearch"><div><i class="u-icon-search"></i><span>开卡订单查询</span></div></router-link>
					<!-- <ul class="g-side-subul">
						<li><a><b></b>待审核</a></li>
						<li><a><b></b>已审核</a></li>
					</ul> -->
				</li>
				<li :class="{active:$route.path.indexOf('/home/merchantAttr')>-1}">
					<b></b>
					<router-link to="/home/merchantAttr"><div><i class="u-icon-merchantAttr"></i><span>商户属性审核</span><b class="animated infinite bounce m-lighter" v-if="count.data.attribute!=0">{{count.data.attribute}}</b></div></router-link>
				</li>
				<li :class="{active:$route.path.indexOf('/home/merchantSearch')>-1}" v-if="off.power">
					<b></b>
					<router-link to="/home/merchantSearch"><div><i class="u-icon-merchant"></i><span>商户查询</span></div></router-link>
				</li>
				<!-- <li :class="{active:$route.path.indexOf('/home/busOrderSearch')>-1}" v-if="off.power">
					<b></b>
					<router-link to="/home/busOrderSearch"><div><i class="u-icon-busSearch"></i><span>公交一卡通</span></div></router-link>
				</li> -->
				<li :class="{active:$route.path.indexOf('/home/cardOrderDownload')>-1}" v-if="off.power">
					<b></b>
					<router-link to="/home/cardOrderDownload"><div><i class="u-icon-download"></i><span>开卡统计下载</span></div></router-link>
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
<script>
export default{
	name:'home',
	data (){
		return {
			off:{
				headMenu:1,
				window:0,
				userMenu:0,
				power:0,
				time:'00:00'
			},
			userInfo:'',
			timerLine:Number,
			timerUp:Number,
			crumb:[{'name':'','href':''},{'name':''}],
			count:{data:{"opencard": "0","opencard_": "0","opencardAfterwards": "0","opencard_Afterwards": "0","attribute":0},total:0,total2:0}
		}
	},
	watch:{
		'$route':'routeChange'
	},
	beforeDestroy:function(){
		clearInterval(this.timerLine)
		clearInterval(this.timerUp)
	},
	mounted:function(){
		this.init();
	},
	methods:{
		init:function(){//页面初始化
			const vm=this;
			var userInfo=localStorage.getItem('KA_ECS_INFO');
			userInfo&&(vm.userInfo=JSON.parse(userInfo));
			vm.windowChange();//浏览器窗口变化
			vm.timeUp();//在线时间
			vm.routeChange();//头部面包屑
			vm.intervalCount();//获取审核统计

			vm.userInfo.isadmin!='0'&&vm.userInfo.isadmin!='3' ? vm.off.power=true : vm.off.power=false;

			vm.timerLine=setInterval(function(){
				userInfo?vm.intervalCount():clearInterval(vm.timerLine);
			},10*1000)

			document.attachEvent ? doucument.body.attachEvent("onclick",function(event){
				vm.off.userMenu=false;
				window.event.cacenlBubble=false;
			}) : document.body.addEventListener("click", function(event) {
				vm.off.userMenu=false;
				event.stopPropagation();
			},false);
		},
		headMenu:function(){//侧边导航show or hide
			this.off.headMenu?this.off.headMenu=false:this.off.headMenu=true;
		},
		routeChange:function(){//路由变化
			this.off.window<=960?this.off.headMenu=false:void 0;
			var path=this.$route.path,crumb=[{'name':'','href':''},{'name':''}],mainDom=document.getElementById('main');

			path.indexOf("home/afterwards")>-1&&(crumb[0]={'name':'事后审核','href':'/home/afterwards/kameng'}) ? path.indexOf("/6")>-1 ? crumb[1]={'name':'开卡审核'} : null : null;

			path.indexOf("home/realtime")>-1&&(crumb[0]={'name':'实时审核','href':'/home/realtime/kameng'}) ? path.indexOf("/6")>-1 ? crumb[1]={'name':'开卡审核'} : path.indexOf("/7")>-1 ? crumb[1]={'name':'过户办理'} : null :null;

			path.indexOf("cardOrderSearch/")>-1&&(crumb[0]={'name':'订单查询','href':'/home/cardOrderSearch'}) ? path.indexOf("/auditing")>-1 ? crumb[1]={'name':'待审核'} : path.indexOf("/audited")>-1 ? crumb[1]={'name':'已审核'} : path.indexOf("/closed")>-1 ? crumb[1]={'name':'已关闭'} : path.indexOf("/doing")>-1 ? crumb[1]={'name':'进行中'} :null :null;

			path.indexOf("busOrderSearch/")>-1&&(crumb[0]={'name':'公交一卡通','href':'/home/busOrderSearch'}) ? path.indexOf("/rechargeOrder")>-1 ? crumb[1]={'name':'充值订单'} : path.indexOf("/exchangeList")>-1 ? crumb[1]={'name':'交易信息'} : null :null;

			path.indexOf("merchantAttr/")>-1&&(crumb[0]={'name':'商户属性','href':'/home/merchantAttr'}) ? path.indexOf("/auditing")>-1 ? crumb[1]={'name':'待审核'} : path.indexOf("/audited")>-1 ? crumb[1]={'name':'已审核'} : null :null;

			this.crumb=crumb;
			mainDom.style.overflowY='hidden';
			var timer=setTimeout(function(){
				mainDom.style.overflowY='';
			},500);
		},
		userMenu:function(e){//用户菜单show or hide
			this.off.userMenu?this.off.userMenu=false:this.off.userMenu=true;
			e.stopPropagation();
		},
		windowChange:function(){//窗口改变
			const vm=this,change=function(){
				var w=window.innerWidth;
				vm.off.window=w;
				w<=960?vm.off.headMenu=false:void 0;
			};
			change();
			window.onresize=function(){
				change();
			};
		},
		timeUp:function(){//在线时间
			var vm=this;
			const timeFormat=function (t){
			    t=parseInt(t);
			    var day,minute,second,hour;
			    day=Math.floor(t/(60*60*24));
			    day>0 ? hour=Math.floor(t%(60*60*24)/(60*60)) : hour=Math.floor(t/(60*60));
			    hour>0 ? minute=Math.floor(t%(60*60)/60) : minute=Math.floor(t/60);
			    minute>0 ? second=Math.floor(t%60) : second=t;
			    hour<10&&(hour='0'+hour);
			    minute<10&&(minute='0'+minute);
			    second<10&&(second='0'+second);
			    return day!='00' ? day+"天"+hour+":"+minute+":"+second : hour!='00' ? hour+":"+minute+":"+second : minute!='00' ? minute+":"+second : "00:"+second;

			}
			vm.timerUp=setInterval(function(){
				var userInfo=localStorage.getItem('KA_ECS_INFO');
				if(userInfo){
					userInfo=JSON.parse(userInfo)
					var time=userInfo.time;
				}else{
					window.clearInterval(vm.timerUp);
					return false;
				}
				time++;
				vm.off.time=timeFormat(time);
				userInfo.time=time;
				localStorage.setItem('KA_ECS_INFO',JSON.stringify(userInfo));
			},1000)
		},
		intervalCount:function(){//循环获取审核订单统计
			const vm=this;
			vm.AJAX('w/audit/statisticsaudit',{'t':new Date().getTime()},function(data){

				data.data.opencard!="0"||data.data.transfer!="0" ? vm.count.total=(parseInt(data.data.opencard)+parseInt(data.data.transfer)) : vm.count.total=0;
				//data.data.opencard!="0" ? vm.count.total=parseInt(data.data.opencard) : vm.count.total=0;
				
				data.data.opencardAfterwards!="0" ? vm.count.total2=parseInt(data.data.opencardAfterwards) : vm.count.total2=0;
				
				vm.count.data=data.data;
			},function(){
				//去除加载层
			})
		},
		signOut:function(){
			var vm=this;
			vm.AJAX('w/user/loginOut',{'t':new Date().getTime()},function(data){
				localStorage.clear();
				clearInterval(vm.timerLine)
				clearInterval(vm.timerUp)
                location.href='#/login';
			})
		},
	}
}

</script>


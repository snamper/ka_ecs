<style>
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
							<a>{{crumb[0].name}}</a>
							<a class="u-icon-right mid"></a>
							<a v-show="!crumb[1].href">{{crumb[1].name}}</a>
							<router-link v-show="crumb[1].href" :to="crumb[1].href">{{crumb[1].name}}</router-link>
							<span v-show="crumb[2].name">
								<a class="u-icon-right mid"></a>
								<a>{{crumb[2].name}}</a>
							</span>
						</span>
					</td>
					<td class="f-tar">
						<div class="m-user-online">Online <b>{{onlineTime}}</b></div>
						<div class="m-info-user"><i></i><span>{{userInfo.name}}</span></div>
						<div class="m-menu-user">
							<a @click="userMenu"><i class="u-icon-menu2"></i></a>
							<ul class="m-user-dropdown f-tas" :class="{active:off.userMenu}">
								<li>
									<a class="user clr">
										<div class="logo fl"></div>
										<div class="info f-tal"><div class="author">{{userInfo.name}}</div><time class="online">online：<b>{{onlineTime}}</b></time></div>
									</a>
								</li>
								<li><a @click="clickSignOut">退出</a></li>
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
				<li :class="{active:$route.path.indexOf('/home/dashboard')>-1}">
					<b></b>
					<router-link to="/home/dashboard">
						<div>
							<i class="u-icon-home"></i>
							<span>首页</span>
						</div>
					</router-link>
				</li>
				<li :class="{active:$route.path.indexOf('/home/audit')>-1}">
					<b></b>
					<router-link to="/home/audit">
						<div>
							<i class="u-icon-audit"></i>
							<span>订单审核</span>
							<b class="animated m-lighter" :class="{bounce:offCountChange}" v-show="countTotal">{{countTotal}}</b>
						</div>
					</router-link>
					<ul class="g-side-subul nav1">
						<li v-if="userInfo.isadmin.indexOf('0')>-1||userInfo.isadmin.indexOf('1')>-1">
							<router-link :to="{name:'audit_card',params:{source:'realtime'}}">
								<b></b>开卡实时审核<span>{{auditCount.opencard+auditCount.transfer}}</span>
							</router-link>
						</li>
						<li v-if="userInfo.isadmin.indexOf('0')>-1||userInfo.isadmin.indexOf('1')>-1">
							<router-link :to="{name:'audit_card',params:{source:'afterwards'}}">
								<b></b>开卡事后审核<span>{{auditCount.opencardAfterwards}}</span>
							</router-link>
						</li>
						<li v-if="userInfo.isadmin.indexOf('6')>-1||userInfo.isadmin.indexOf('5')>-1||userInfo.isadmin.indexOf('1')>-1">
							<router-link :to="{name:'businessPowerAudit',params:{type:'auditing'}}">
								<b></b>售卡范围审核<span>{{auditCount.attribute}}</span>
							</router-link>
						</li>
						<li v-if="userInfo.isadmin.indexOf('6')>-1||userInfo.isadmin.indexOf('5')>-1||userInfo.isadmin.indexOf('1')>-1">
							<router-link :to="{name:'registMerchantAudit',params:{type:'realtime'}}">
								<b></b>激活商户实时<span>{{auditCount.registerMerchantRealTime}}</span>
							</router-link>
						</li>
						<li v-if="userInfo.isadmin.indexOf('6')>-1||userInfo.isadmin.indexOf('5')>-1||userInfo.isadmin.indexOf('1')>-1">
							<router-link :to="{name:'registMerchantAudit',params:{type:'afterwards'}}">
								<b></b>激活商户事后<span>{{auditCount.registerMerchantAfter}}</span>
							</router-link>
						</li>
					</ul>
				</li>
				<li :class="{active:$route.path.indexOf('/home/orderSearch')>-1}"
					v-if="userInfo.isadmin.indexOf('2')>-1||userInfo.isadmin.indexOf('1')>-1">
					<b></b>
					<router-link to="/home/orderSearch">
						<div>
							<i class="u-icon-search"></i>
							<span>订单查询</span>
						</div>
					</router-link>
					<ul class="g-side-subul nav2">
						<li><router-link to="/home/orderSearch/card"><b></b>开卡订单</router-link></li>
						<li><router-link to="/home/orderSearch/recharge"><b></b>充值订单</router-link></li>
						<li><router-link to="/home/orderSearch/onlineHall"><b></b>网厅订单</router-link></li>
						<li><router-link :to="{name:'businessPowerSearch',params:{type:'audited'}}"><b></b>售卡范围</router-link></li>
						<li><router-link :to="{name:'registMerchantSearch',params:{type:'search'}}"><b></b>激活商户</router-link></li>
						<!-- <li><router-link to="/home/orderSearch/busCard"><b></b>公交一卡通</router-link></li> -->
					</ul>
				</li>
				<li :class="{active:$route.path.indexOf('/home/resource')>-1}">
					<b></b>
					<router-link to="/home/resource">
						<div>
							<i class="u-icon-searchResource"></i>
							<span>资源查询</span>
						</div>
					</router-link>
					<ul class="g-side-subul nav3">
						<li><router-link :to="{name:'merchant',params:{val:'null'}}"><b></b>商户查询</router-link></li>
						<li><router-link :to="{name:'device',params:{val:'null'}}"><b></b>设备查询</router-link></li>
						<li><router-link :to="{name:'promoter',params:{val:'null'}}"><b></b>推广方查询</router-link></li>
						
						<li v-if="userInfo.isadmin.indexOf('7')>-1||userInfo.isadmin.indexOf('1')>-1"><router-link to="/home/resource/numberRelease"><b></b>号码占用/解冻</router-link></li>
					</ul>
				</li>
				<li :class="{active:$route.path.indexOf('/home/statistics')>-1}">
					<b></b>
					<router-link to="/home/statistics">
						<div>
							<i class="u-icon-statistics"></i>
							<span>统计报表</span>
						</div>
					</router-link>
					<ul class="g-side-subul nav4">
						<li><router-link to="/home/statistics/cardOrder"><b></b>开卡统计下载</router-link></li>
						<li><router-link :to="{name:'softwareUseTimes',params:{type:'idCard'}}"><b></b>身份证识别统计</router-link></li>
						<li><router-link :to="{name:'softwareUseTimes',params:{type:'faceConfirm'}}"><b></b>活体识别统计</router-link></li>
					</ul>
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
	<div id="routerLoading">
      <div class="circle-loader">
          <div class="circle-line">
              <div class="circle circle-blue"></div>
          </div>
          <div class="circle-line">
              <div class="circle circle-yellow"></div>
          </div>
          <div class="circle-line">
              <div class="circle circle-red"></div>
          </div>
          <div class="circle-line">
              <div class="circle circle-green"></div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import {getStore} from '../config/utils';
import { signOut } from '../config/service';
export default{
	data (){
		return {
			off:{
				headMenu:false,
				window:0,
				userMenu:0,
			},
			userInfo:{isadmin:''},
			crumb:[{'name':''},{'name':''},{'name':''}],//面包屑
		}
	},
	watch:{
		'$route':'routeChange',
	},
	beforeDestroy:function(){
		this.CLEAR_TIMER();
	},
	mounted:function(){
		this.init();
	},
	computed:{
		...mapState([
            "onlineTime",
            "timer",
            "auditCount",
            "countTotal",
            "offCountChange"
        ]),
	},
	methods:{
		...mapMutations([
            "SET_ONLINE_TIME",
            "CLEAR_TIMER",
            "SIGN_OUT",
            "SET_USERINFO"
        ]),
        ...mapActions([
        	"getAuditStatisticsInfo"
        ]),
		async init(){//页面初始化
			const vm=this;

			vm.windowChange();//浏览器窗口变化
			vm.routeChange();//头部面包屑

			vm.timer.count=setInterval(function(){
				vm.getAuditStatisticsInfo();
			},3000);
			vm.SET_ONLINE_TIME();

			let userInfo=getStore("KA_ECS_USER");
			vm.userInfo=userInfo;
			vm.SET_USERINFO(userInfo);
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
			var path=this.$route.path,
				crumb=[{"name":""},{"name":""},{"name":""}],
				mainDom=document.getElementById("main");
			if(path.indexOf('dashboard')>-1){
				this.off.headMenu=false;
			}
			if(path.indexOf("/home/audit")>-1){
				crumb[0]={"name":"订单审核"}
				if(path.indexOf("card/realtime")>-1){
					crumb[1]={"name":"开卡实时审核","href":"/home/audit/card/realtime"}
					if(path.indexOf("6")>-1){
						crumb[2]={"name":"开卡"}
					}else if(path.indexOf("7")>-1){
						crumb[2]={"name":"过户办理"}
					}else if(path.indexOf("8")>-1){
						crumb[2]={"name":"SDK开卡"}
					}
				}else if(path.indexOf("card/afterwards")>-1){
					crumb[1]={"name":"开卡事后审核","href":"/home/audit/card/afterwards"}
					if(path.indexOf("6")>-1){
						crumb[2]={"name":"开卡"}
					}
				}else if(path.indexOf("businessPower")>-1){
					crumb[1]={"name":"售卡范围","href":""};
					if(path.indexOf("auditing")>-1){
						crumb[2]={"name":"待审核"}
					}
				}else if(path.indexOf("registMerchant")>-1){
					if(path.indexOf("/realtime")>-1){
						crumb[1]={"name":"激活商户实时","href":"/home/audit/registMerchant/realtime"};
					}else if(path.indexOf("/afterwards")>-1){
						crumb[1]={"name":"激活商户事后","href":"/home/audit/registMerchant/afterwards"};
					}
					if(path.indexOf("_get")>-1){
						crumb[2]={"name":"审核"};
					}
				}
			}else if(path.indexOf("/home/orderSearch")>-1){
				crumb[0]={"name":"订单查询","href":"/home/orderSearch"}
				if(path.indexOf("card")>-1){
					crumb[1]={"name":"开卡订单","href":"/home/orderSearch/card"}
					if(path.indexOf("doing")>-1){
						crumb[2]={"name":"进行中"}
					}else if(path.indexOf("closed")>-1){
						crumb[2]={"name":"已关闭"}
					}else if(path.indexOf("auditing")>-1){
						crumb[2]={"name":"待审核"}
					}else if(path.indexOf("audited")>-1){
						crumb[2]={"name":"已审核"}
					}
				}else if(path.indexOf("onlineHall")>-1){
					crumb[1]={"name":"网厅订单","href":""}
				}else if(path.indexOf("businessPower")>-1){
					crumb[1]={"name":"售卡范围","href":""};
					if(path.indexOf("audited")>-1){
						crumb[2]={"name":"已审核"}
					}
				}else if(path.indexOf("registMerchant")>-1){
					crumb[1]={"name":"激活商户","href":""};
				}else if(path.indexOf("recharge")>-1){
					crumb[1]={"name":"充值订单","href":""}
				}
			}else if(path.indexOf("/home/resource")>-1){
				crumb[0]={"name":"资源查询"}
				if(path.indexOf("merchant")>-1){
					crumb[1]={"name":"商户查询","href":""}
				}else if(path.indexOf("numberRelease")>-1){
					crumb[1]={"name":"号码解冻","href":""}
				}else if(path.indexOf("promoter")>-1){
					crumb[1]={"name":"推广方","href":""}
				}else if(path.indexOf("device")>-1){
					crumb[1]={"name":"设备","href":""}
				}
			}else if(path.indexOf("/home/statistics")>-1){
				crumb[0]={"name":"统计报表"}
				if(path.indexOf("cardOrder")>-1){
					crumb[1]={"name":"开卡订单下载","href":""}
				}else if(path.indexOf("softwareUseTimes/idCard")>-1){
					crumb[1]={"name":"身份识别统计下载","href":""}
				}else if(path.indexOf("softwareUseTimes/faceConfirm")>-1){
					crumb[1]={"name":"活体识别统计下载","href":""}
				}
			}
		
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
		clickSignOut:function(){
			var vm=this;
			signOut().then(function(res){
				vm.SIGN_OUT();
				vm.CLEAR_TIMER();
			});
		},
	}
}

</script>


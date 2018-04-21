<style>
  @import "../assets/km/css/home.css";
  @import "../assets/km/css/home_ym.css";
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
						<div class="m-info-user"><i></i><span>{{userInfo.customerName}}</span></div>
						<div class="m-menu-user">
							<a @click="userMenu"><i class="u-icon-menu2"></i></a>
							<ul class="m-user-dropdown f-tas" :class="{active:off.userMenu}">
								<li>
									<a class="user clr">
										<div class="logo fl"></div>
										<div class="info f-tal"><div class="author">{{userInfo.customerName}}</div><time class="online">online：<b>{{onlineTime}}</b></time></div>
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
			<header class="g-side-head"><img src="../assets/km/images/logo_page.png" alt="titleLogo"></header>
            <ul class="m-mainCatalog">
                <li :class="{'active':isCheckk}" @click="isCheck('k')" v-if="!off.powerKmHidden">
                    <span>卡盟</span>
					<b class="animated m-lighter" :class="{bounce:offCountChange}" v-show="countTotal||auditCount[0]">{{countTotal+auditCount[0]}}</b> 
				</li>
				<li  :class="{'active':isChecky}" @click="isCheck('y')" v-if="!off.powerYmHidden">
                    <span>远盟</span>
					<b class="animated m-lighter" :class="{bounce:offCountChange}" v-show="auditCountYm.readyCard+auditCountYm.whiteCard+auditCountYm.newChangeCard+auditCountYm.realNameCollection+auditCountYm.fill">{{auditCountYm.readyCard+auditCountYm.whiteCard+auditCountYm.newChangeCard+auditCountYm.realNameCollection+auditCountYm.fill}}</b>
				</li>
            </ul>
			<ul class="g-side-ul" :class="{'hide':!isCheckk}" v-if="!off.powerKmHidden">
				<li :class="{active:crumb[0].name=='数据统计'}" v-if="off.powerkm2||off.powerkm1">
					<b></b>
					<router-link to="/homek/dashboard">
						<div>
							<i class="u-icon-home"></i>
							<span>数据面板</span>
						</div>
					</router-link>
				</li>
				<li :class="{active:crumb[0].name=='订单审核'}" v-if="off.powerkm0||off.powerkm1||off.powerkm4||off.powerkm5||off.powerkm6">
					<b></b>
					<router-link to="/homek/audit">
						<div>
							<i class="u-icon-audit"></i>
							<span>订单审核</span>
							<b class="animated m-lighter" :class="{bounce:offCountChange}" v-show="countTotal">{{countTotal}}</b>
						</div>
					</router-link>
					<ul class="g-side-subul nav1">
						<li v-if="userInfo.isadmin.indexOf('0')>-1||userInfo.isadmin.indexOf('1')>-1">
							<router-link :to="{name:'audit_card',params:{source:'realtime'}}">
								<b></b>开卡实时审核<span v-if="auditCount.opencard+auditCount.transfer+auditCount.sdkRealTime!=0">{{auditCount.opencard+auditCount.transfer+auditCount.sdkRealTime
}}</span>
							</router-link>
						</li>
						<li v-if="userInfo.isadmin.indexOf('0')>-1||userInfo.isadmin.indexOf('1')>-1">
							<router-link :to="{name:'audit_card',params:{source:'afterwards'}}">
								<b></b>开卡事后审核<span v-if="auditCount.opencardAfterwards+auditCount.tfOpenCard!=0">{{auditCount.opencardAfterwards+auditCount.tfOpenCard
}}</span>
							</router-link>
						</li>
						<li v-if="userInfo.isadmin.indexOf('6')>-1||userInfo.isadmin.indexOf('5')>-1||userInfo.isadmin.indexOf('1')>-1">
							<router-link :to="{name:'businessPowerAudit',params:{type:'auditing'}}">
								<b></b>业务范围审核<span v-if="auditCount.attribute!=0">{{auditCount.attribute}}</span>
							</router-link>
						</li>
						<li v-if="userInfo.isadmin.indexOf('6')>-1||userInfo.isadmin.indexOf('5')>-1||userInfo.isadmin.indexOf('1')>-1">
							<router-link :to="{name:'registMerchantAudit',params:{type:'realtime'}}">
								<b></b>激活商户实时<span v-if="auditCount.registerMerchantRealTime!=0">{{auditCount.registerMerchantRealTime}}</span>
							</router-link>
						</li>
						<li v-if="userInfo.isadmin.indexOf('6')>-1||userInfo.isadmin.indexOf('5')>-1||userInfo.isadmin.indexOf('1')>-1">
							<router-link :to="{name:'registMerchantAudit',params:{type:'afterwards'}}">
								<b></b>激活商户事后<span v-if="auditCount.registerMerchantAfter!=0">{{auditCount.registerMerchantAfter}}</span>
							</router-link>
						</li>
                        <!-- <li v-if="userInfo.isadmin.indexOf('6')>-1||userInfo.isadmin.indexOf('5')>-1||userInfo.isadmin.indexOf('1')>-1">
							<router-link :to="{name:'applySellArea'}">
								<b></b>申请区域审核<span v-if="auditCount.attribute!=0">{{auditCount.attribute}}</span>
							</router-link>
						</li> -->
					</ul>
				</li>
				<li :class="{active:crumb[0].name=='订单查询'}" v-if="off.powerkm1||off.powerkm2||off.powerkm3">
					<b></b>
					<router-link to="/homek/orderSearch">
						<div>
							<i class="u-icon-search"></i>
							<span>订单查询</span>
						</div>
					</router-link>
					<ul class="g-side-subul nav2">
						<li><router-link to="/homek/orderSearch/card"><b></b>开卡订单</router-link></li>
						<li><router-link to="/homek/orderSearch/recharge"><b></b>充值订单</router-link></li>
						<li><router-link to="/homek/orderSearch/onlineHall"><b></b>网厅订单</router-link></li>
						<li><router-link :to="{name:'businessPowerSearch',params:{type:'audited'}}"><b></b>业务范围</router-link></li>
						<li><router-link :to="{name:'registMerchantSearch',params:{type:'search'}}"><b></b>激活商户</router-link></li>
						<li><router-link to="/homek/orderSearch/reserve"><b></b>预占号码</router-link></li>
						<!-- <li><router-link to="/home/orderSearch/busCard"><b></b>公交一卡通</router-link></li> -->
					</ul>
				</li>
				<li :class="{active:crumb[0].name=='资源查询'}" v-if="off.powerkm1||off.powerkm2||off.powerkm7">
					<b></b>
					<router-link to="/homek/resource">
						<div>
							<i class="u-icon-searchResource"></i>
							<span>资源查询</span>
						</div>
					</router-link>
					<ul class="g-side-subul nav3">
						<li><router-link :to="{name:'merchant',params:{val:'null'}}"><b></b>商户查询</router-link></li>
						<li><router-link :to="{name:'device',params:{val:'null'}}"><b></b>设备查询</router-link></li>
						<li><router-link :to="{name:'promoter',params:{val:'null'}}"><b></b>推广方查询</router-link></li>
						<!-- <li v-if="off.powerkm1||off.powerkm7"><router-link to="/homek/resource/numberRelease"><b></b>号码冻结/解冻</router-link></li> -->
					</ul>
				</li>
				<li :class="{active:crumb[0].name=='统计报表'}" v-if="off.powerkm1||off.powerkm2">
					<b></b>
					<router-link to="/homek/statistics">
						<div>
							<i class="u-icon-statistics"></i>
							<span>统计报表</span>
						</div>
					</router-link>
					<ul class="g-side-subul nav4">
						<li><router-link to="/homek/statistics/cardOrder"><b></b>开卡统计下载</router-link></li>
						<li><router-link :to="{name:'softwareUseTimes',params:{type:'idCard'}}"><b></b>身份证识别统计</router-link></li>
						<li><router-link :to="{name:'softwareUseTimes',params:{type:'faceConfirm'}}"><b></b>活体识别统计</router-link></li>
						<li><router-link :to="{name:'softwareUseTimes',params:{type:'writeCard'}}"><b></b>写卡记录统计</router-link></li>
					</ul>
				</li>
				<li :class="{active:crumb[0].name=='意见反馈'}" v-if="off.powerkm1||off.powerkm11">
					<b></b>
					<router-link to="/homek/opinion">
						<div>
							<i class="u-icon-opinion"></i>
							<span>意见反馈</span>
							<b class="animated m-lighter" :class="{bounce:offCountChange}" v-show="auditCount[0]">{{auditCount[0]}}</b>
						</div>
					</router-link>
				</li>
				<!-- <li :class="{active:$route.path.indexOf('/home/fence')>-1}">
					<b></b>
					<router-link to="/home/fence">
						<div>
							<i class="u-icon-fence"></i>
							<span>区域管理</span>
						</div>
					</router-link>
				</li> -->
			</ul>

            <!-- 远盟目录 -->
            <ul class="g-side-ul-ym" :class="{'hide':!isChecky}" v-if="!off.powerYmHidden">
				<li :class="{active:$route.path.indexOf('/homey/audit')>-1||$route.path=='/homey/wsim'}" v-if="off.power0||off.power1">
					<b></b>
					<router-link to="/homey/audit/yuanmeng"><div><i class="u-icon-audit"></i><span>订单审核</span><b class="animated infinite bounce m-lighter" ></b></div></router-link>                                                
                </li>
				<li :class="{active:$route.path.indexOf('/homey/search')>-1}" v-if="off.power2||off.power1">
					<b></b>
					<router-link to="/homey/search"><div><i class="u-icon-search"></i><span>订单查询</span></div></router-link>
				</li>
				<li v-if="off.power1||off.power5" :class="{active:$route.path=='/homey/pointsSearch'||$route.path=='/homey/pointsEx'||$route.path=='/homey/pointsGain'||$route.path=='/homey/pointsManage'}">
					<b></b>
					<router-link to="/homey/pointsSearch"><div><i class="u-icon-points"></i><span>积分管理</span></div></router-link>
					<ul class="g-side-subul" :class="off.power5||off.power1?'Tall':'Talls'">
						<li><router-link to="/homey/pointsSearch"><b></b>用户积分查询</router-link></li>
						<li><router-link to="/homey/pointsGain"><b></b>积分获取详情</router-link></li>
						<li><router-link to="/homey/pointsEx"><b></b>积分兑换详情</router-link></li>
						<li v-if="off.power5"><router-link to="/homey/pointsManage"><b></b>积分管理</router-link></li>
					</ul>
				</li>
                <li v-if="off.power6||off.power1" :class="{active:$route.path.indexOf('/homey/excelDownload')>-1}">
					<b></b>
					<router-link to="/homey/excelDownload"><div><i class="u-icon-downLoad"></i><span>日报excel</span></div></router-link>
				</li>
				<li :class="{active:$route.path.indexOf('/homey/illegalSearch')>-1}" v-if="off.power1||off.power2">
					<b></b>
					<router-link to="/homey/illegalSearch"><div><i class="u-icon-illegalSearch"></i><span>违规查询</span></div></router-link>
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
                powerKmHidden:0,//卡盟隐藏
                powerYmHidden:0,//远盟隐藏
				headMenu:true,//导航栏开关
				window:0,//浏览器窗口宽度
                userMenu:0,//用户菜单开关
                power:0,
                power0:0,
                power5:0,
                power6:0,
                powerkm0:0,
                powerkm1:0,
                powerkm2:0,
                powerkm3:0,
                powerkm4:0, 
                powerkm5:0,
                powerkm6:0,
                powerkm7:0,
                powerkm11:0,
                powerkm21:0,
			},
			userInfo:{isadmin:''},
            crumb:[{'name':''},{'name':''},{'name':''}],//面包屑
            isCheckk:false,
            isChecky:true,
            count:'',
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
        //this.initMenu();
	},
	computed:{
		...mapState([
            "onlineTime",
            "timer",
            "auditCount",
            "countTotal",
            "auditCountYm",
            "offCountChange",
            "OpcountTotal",
            "countTotalYm",
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
        	"getAuditStatisticsInfo",
            "getOpinionCountInfo",
            "getAuditStatisticsInfoYm",
        ]),
        async init(){//页面初始化
            let vm = this;
            vm.routeChange();//头部面包屑导航
			let kmAuditInfo=vm.getAuditStatisticsInfo();//km订单审核数统计
            let kmOpinionInfo=vm.getOpinionCountInfo();//km意见反馈数统计
            let ymAuditInfo=vm.getAuditStatisticsInfoYm();//ym订单审核数统计
            window.onresize=()=>vm.debounce(300,vm.windowChange());
			vm.timer.count=setInterval(()=>vm.getAuditStatisticsInfo(),5000);
            vm.timer.OpcountT=setInterval(()=>vm.getOpinionCountInfo(),60000);
			vm.timer.countYm=setInterval(()=>vm.getAuditStatisticsInfoYm(),5000);            
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
            //远盟权限
            vm.userInfo.isadminYm&&vm.userInfo.isadminYm.indexOf('1')>-1? vm.off.power1=true : vm.off.power1=false;
			vm.userInfo.isadminYm&&(vm.userInfo.isadminYm.indexOf('1')>-1||vm.userInfo.isadminYm.indexOf('2')>-1) ? vm.off.power2=true : vm.off.power2=false;
			vm.userInfo.isadminYm&&(vm.userInfo.isadminYm.indexOf('1')>-1||vm.userInfo.isadminYm.indexOf('0')>-1) ? vm.off.power0=true : vm.off.power0=false;
			vm.userInfo.isadminYm&&(vm.userInfo.isadminYm.indexOf('1')>-1||vm.userInfo.isadminYm.indexOf('5')>-1) ? vm.off.power5=true : vm.off.power5=false;
			vm.userInfo.isadminYm&&(vm.userInfo.isadminYm.indexOf('1')>-1||vm.userInfo.isadminYm.indexOf('6')>-1) ? vm.off.power6=true : vm.off.power6=false;
            //卡盟权限
            var isadmin=vm.userInfo.isadmin.split(","); 
            function IsInArray(arr,val){ 
            　　var testStr=','+arr.join(",")+","; 
            　　return testStr.indexOf(","+val+","); 
            } 
            IsInArray(isadmin,'0')>-1?vm.off.powerkm0=true : vm.off.powerkm0=false;
            IsInArray(isadmin,'1')>-1?vm.off.powerkm1=true : vm.off.powerkm1=false;
            IsInArray(isadmin,'2')>-1?vm.off.powerkm2=true : vm.off.powerkm2=false;
            IsInArray(isadmin,'3')>-1?vm.off.powerkm3=true : vm.off.powerkm3=false;
            IsInArray(isadmin,'4')>-1?vm.off.powerkm4=true : vm.off.powerkm4=false;
            IsInArray(isadmin,'5')>-1?vm.off.powerkm5=true : vm.off.powerkm5=false;
            IsInArray(isadmin,'6')>-1?vm.off.powerkm6=true : vm.off.powerkm6=false;
            IsInArray(isadmin,'7')>-1?vm.off.powerkm7=true : vm.off.powerkm7=false;
            IsInArray(isadmin,'11')>-1?vm.off.powerkm11=true : vm.off.powerkm11=false;
            IsInArray(isadmin,'21')>-1?vm.off.powerkm21=true : vm.off.powerkm21=false;
            vm.initMenu();
        },
        initMenu:function(){
            let vm=this;
            if(!vm.userInfo.isadmin){
                vm.off.powerKmHidden=1;
                vm.isChecky=1;
            }else if(!vm.userInfo.isadminYm){
                vm.off.powerYmHidden=1;
                vm.isCheckk=1;
            }
            let path=vm.$route.path;
            if(path.indexOf('homek')>-1){
            	vm.isCheckk=1;
            	vm.isChecky=0;
            }else{
            	vm.isCheckk=0;
            	vm.isChecky=1;
            }
        },
		headMenu:function(){//侧边导航show or hide
			this.off.headMenu?this.off.headMenu=false:this.off.headMenu=true;
		},
		routeChange:function(){//路由变化
			this.windowChange();
			var path=this.$route.path,
				crumb=[{"name":""},{"name":""},{"name":""}],
				mainDom=document.getElementById("main");
            
            if(path.indexOf("/homek/dashboard")>-1){
				crumb[0]={"name":"数据统计"};
			}else if(path.indexOf("/homek/audit")>-1){
				crumb[0]={"name":"订单审核"}
				if(path.indexOf("card/realtime")>-1){
					crumb[1]={"name":"开卡实时审核","href":"/homek/audit/card/realtime"}
					if(path.indexOf("6")>-1){
						crumb[2]={"name":"开卡"}
					}else if(path.indexOf("7")>-1){
						crumb[2]={"name":"过户办理"}
					}else if(path.indexOf("8")>-1){
						crumb[2]={"name":"SDK开卡"}
					}
				}else if(path.indexOf("card/afterwards")>-1){
					crumb[1]={"name":"开卡事后审核","href":"/homek/audit/card/afterwards"}
					if(path.indexOf("6")>-1){
						crumb[2]={"name":"开卡"}
					}else if(path.indexOf("9")>-1){
						crumb[2]={"name":"通服开卡"}
					}
				}else if(path.indexOf("businessPower")>-1){
					crumb[1]={"name":"业务范围","href":""};
					if(path.indexOf("auditing")>-1){
						crumb[2]={"name":"待审核"}
					}
				}else if(path.indexOf("registMerchant")>-1){
					if(path.indexOf("/realtime")>-1){
						crumb[1]={"name":"激活商户实时","href":"/homek/audit/registMerchant/realtime"};
					}else if(path.indexOf("/afterwards")>-1){
						crumb[1]={"name":"激活商户事后","href":"/homek/audit/registMerchant/afterwards"};
					}
					if(path.indexOf("_get")>-1){
						crumb[2]={"name":"审核"};
					}
				}else if(path.indexOf("applySellArea")>-1){
                    crumb[1]={"name":"申请区域审核","href":"/homek/audit/applySellArea"};
                }
			}else if(path.indexOf("/homek/orderSearch")>-1){
				crumb[0]={"name":"订单查询","href":"/homek/orderSearch"}
				if(path.indexOf("card")>-1){
					crumb[1]={"name":"开卡订单","href":"/homek/orderSearch/card"}
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
					crumb[1]={"name":"业务范围","href":""};
					if(path.indexOf("audited")>-1){
						crumb[2]={"name":"已审核"}
					}
				}else if(path.indexOf("registMerchant")>-1){
					crumb[1]={"name":"激活商户","href":""};
				}else if(path.indexOf("recharge")>-1){
					crumb[1]={"name":"充值订单","href":""}
				}else if(path.indexOf("reserve")>-1){
					crumb[1]={"name":"预占号码","href":""}
				}
			}else if(path.indexOf("/homek/resource")>-1){
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
			}else if(path.indexOf("/homek/statistics")>-1){
				crumb[0]={"name":"统计报表"}
				if(path.indexOf("cardOrder")>-1){
					crumb[1]={"name":"开卡订单下载","href":""}
				}else if(path.indexOf("softwareUseTimes/idCard")>-1){
					crumb[1]={"name":"身份识别统计下载","href":""}
				}else if(path.indexOf("softwareUseTimes/faceConfirm")>-1){
					crumb[1]={"name":"活体识别统计下载","href":""}
				}else if(path.indexOf("softwareUseTimes/writeCard")>-1){
					crumb[1]={"name":"写卡记录统计","href":""}
				}
			}else if(path.indexOf("/homek/opinion")>-1){
				crumb[0]={"name":"意见反馈"};
				if(path.indexOf("pending")>-1){
					crumb[1]={"name":"待处理","href":""}
				}else if(path.indexOf("processing")>-1){
					crumb[1]={"name":"进行中","href":""}
				}else if(path.indexOf("finish")>-1){
					crumb[1]={"name":"已完成","href":""}
				}
			}
			this.crumb=crumb;
			mainDom.style.overflowY='hidden';
			var timer=setTimeout(()=>mainDom.style.overflowY='',500);
        },
        isCheck:function(i){//远盟卡盟运维中心切换
            const vm=this;
            if(i==='k'){
                vm.isCheckk=true;
                vm.isChecky=false;
            }else if(i==='y'){
                vm.isChecky=true;
                vm.isCheckk=false;
            }
        },
      
       
		userMenu:function(e){//用户菜单show or hide
			this.off.userMenu?this.off.userMenu=false:this.off.userMenu=true;
			e.stopPropagation();
		},
		windowChange:function(){//窗口改变
			const vm=this;
			let w=window.innerWidth;
			let href=window.location.href;

			if(href.indexOf('dashboard')>-1||w<=960){
				vm.off.headMenu=false;
			}

			vm.off.window=w;
        },
		debounce:function(time,action){//节流函数
		  let last;
		  return function(){
		    let ctx=this, args=arguments
		    clearTimeout(last)
		    last=setTimeout(function(){
		        action.apply(ctx,args)
		    },time)
		  }
		},
		clickSignOut:function(){
			var vm=this;
			signOut({},function(){vm.load=false}).then(function(res){
				vm.SIGN_OUT();
				vm.CLEAR_TIMER();
			});
		},
	}
}
</script>


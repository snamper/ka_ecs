<!--**
  *@info 更多模块顶层
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<template>
	<section id="more">
		<ul class="g-more-menu" v-show="!off.fn">
			<li v-if="off.powerKm_hmd_xg" class="u-black-phone" @click="showFn(1)">
				<i class="icon"></i>
				<span class="dp">号码黑名单</span>
			</li>
			<li v-if="off.powerKm_hyy_cx" class="u-welcome-conf" @click="showFn(2)">
				<i class="icon"></i>
				<span class="dp">欢迎页管理</span>
			</li>
			<li v-if="off.powerKm_hmzy_cx" class="u-number-release" @click="showFn(3)">
				<i class="icon"></i>
				<span class="dp">号码占用/解冻</span>
			</li>
            <li v-if="off.powerKm_xghm_cx" class="u-SMSCheck-change" @click="showFn(4)">
				<i class="icon"></i>
				<span class="dp">更改成卡短信验证号码</span>
			</li>
			<li v-if="off.powerKm_hyy_cx" class="u-banner-manage" @click="showFn(5)">
				<i class="icon"></i>
				<span class="dp">卡盟APP首页banner管理</span>
			</li>
		</ul>
		<div class="g-more-fn" v-show="off.fn">
			<header class="clr">
				<a href="javascript:;" @click="showFn(0)" class="fl u-icon-backleft">返回菜单</a>
				<div class="dp">
					<b v-show="off.fn==1">号码黑名单</b>
					<b v-show="off.fn==2">欢迎页管理</b>
					<b v-show="off.fn==3">号码占用/解冻</b>
					<b v-show="off.fn==4">更改成卡短信验证号码</b>
					<b v-show="off.fn==5">卡盟APP首页banner管理</b>
				</div>
			</header>
			<PhoneBlackList v-if="off.fn==1"></PhoneBlackList>
			<WelcomeConf v-if="off.fn==2"></WelcomeConf>
			<NumberRelease v-if="off.fn==3"></NumberRelease>
            <SMSCheckout v-if="off.fn==4"></SMSCheckout>
			<BannerManage v-if="off.fn==5"></BannerManage>
		</div>
	</section>
</template>
<script>
import "../../../assets/km/css/search.css";
import PhoneBlackList from '../../../componentskm/more/phoneBlackList';
import WelcomeConf from '../../../componentskm/more/welcomeConf';
import NumberRelease from '../../../componentskm/more/numberRelease';
import SMSCheckout from '../../../componentskm/more/SMSCheckout';
import BannerManage from './components/bannerManage';
import { powerKm,getStore } from "../../../config/utils.js";
export default{
	name:'more',
	data (){
		return {
			off:{
				fn:0
			},
		}
    },
    mounted:function(){
  
	},
	components:{
		PhoneBlackList,
		WelcomeConf,
        NumberRelease,
		SMSCheckout,
		BannerManage
	},
	created(){
        this.off.power=this.$parent.off;
        let vm=this,
            userInfo=getStore("KA_ECS_USER");
            vm.userInfo=userInfo;
        powerKm(vm); 
	},
	methods:{
		showFn(off){
			this.off.fn=off;
		}
	}
}
</script>
<style scpoed>

.u-black-phone>.icon{background-image: url(../../../assets/images/black_phone.png);}
.u-black-phone>.dp{color: #107792;}
.u-welcome-conf>.icon{background-image: url(../../../assets/images/welcome.png);}
.u-welcome-conf>.dp{color: #60A9D1;}
.u-number-release>.icon{background-image: url(../../../assets/images/numberRelease.png);}
.u-number-release>.dp{color: #1A75F2;}
.u-SMSCheck-change>.icon{background-image: url(../../../assets/images/icon_num.png);}
.u-SMSCheck-change>.dp{color: #6a21f1;}
.u-banner-manage>.icon{background-image: url(../../../assets/images/icon_banner.png);}
.u-banner-manage>.dp{color: #0CA2A4;}

#more{
	width: 100%;
	height:100%;
	padding:0.2rem;
	position: relative;
}
.g-more-menu{
	padding:0.4rem;
}
.g-more-menu>li{
	position: relative;
	display: inline-block;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0,0,0,0.1);
	cursor: pointer;
	padding:0.1rem;
	border:1px solid transparent;
	border-color:#ddd;
	border-radius: 3px;
	margin-right: 0.2rem;
	margin-bottom: 0.2rem;
}
.g-more-menu>li>.icon{
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
	
	width: 0.4rem;
	height: 0.4rem;
	background-repeat: no-repeat;
	background-size: 100%;
	background-position: center;
}

.g-more-menu>li>.dp{
	display: inline-block;
	vertical-align: middle;

	font-size: 0.18rem;
	font-weight: bold;
	letter-spacing: 1px;
}
.g-more-fn>header{
	position: relative;
	padding:0.1rem 5px;
	background-color: #fff;
}
.g-more-fn>header>.dp{
	margin-left:0.75rem;
	text-align: center;
}
.g-more-fn>header>a{
	font-weight: bold;
	padding-left: 0.2rem;
	background-image:url(../../../assets/images/page-left.png);
	background-position: left center;
	background-size: 0.17rem;
	color: inherit;
}
.g-more-fn>header b{
	font-weight: bold;
	position: relative;
	margin-left: -0.75rem;
}
</style>

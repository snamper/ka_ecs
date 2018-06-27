<!--**
  *@info 订单查询模块-公交一卡通订单顶层
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<template>
	<section class="g-search-menu">
		<div v-show="off.source==0" class="g-search-menu-c">
			<div class="m-menu-div">
				<router-link :to="{name:'busOrderSearch',params:{type:'rechargeOrder'}}" class="u-bg navBg7"><div>充值订单</div><p><span>点击查询</span></p></router-link>
			</div>
			<div class="m-menu-div">
				<router-link :to="{name:'busOrderSearch',params:{type:'exchangeList'}}" class="u-bg navBg8"><div>交易信息</div><p><span>点击查询</span></p></router-link>
			</div>
		</div>
		<transition appear name="fadeInUp">
			<router-view></router-view>
		</transition>
	</section>
</template>
<script>
export default{
	name:'busOrder',
	data (){
		return {
			off:{
				source:0
			}
		}
	},
	created:function(){
		var vm=this;
		vm.setType();
	},
	watch:{
		'$route':'setType'
	},
	methods:{
		setType:function(){
			const path=this.$route.path;
			if(path.indexOf('/home/busOrderSearch/')>-1){
				this.off.source='close';
			}else if(path.indexOf('/home/busOrderSearch')>-1){
				this.off.source=0;
			}
		}
	}
}
</script>


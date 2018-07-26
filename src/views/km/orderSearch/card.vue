<!--**
  *@info 订单查询模块-开卡订单顶层
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<template>
	<section class="g-search-menu">
		<div v-show="off.source==1" class="g-search-menu-c">
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:'orderSearch_cardItem',params:{type:'doing',id:'null'}}" class="slide-c f-c-green">进行中</router-link>
				</div>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:'orderSearch_cardItem',params:{type:'closed',id:'null'}}" class="slide-c f-c-purple">已关闭</router-link>
				</div>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:'orderSearch_cardItem',params:{type:'auditing',id:'null'}}" class="slide-c f-c-red">待审核</router-link>
				</div>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:'orderSearch_cardItem',params:{type:'audited',id:'null'}}" class="slide-c f-c-blue">已审核</router-link>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</section>
</template>
<script>
export default{
	name:'cardOrder',
	data (){
		return {
			off:{
				source:0,
				name:"orderSearch_cardIte"
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
			if(path.indexOf('/homek/orderSearch/card/')>-1||path.indexOf('/homek/orderSearch/sdkCard/')>-1){
				this.off.source=0;
			}else if(path.indexOf('/homek/orderSearch/card')>-1){
				this.off.source=1;
			}
		}
	}
}
</script>


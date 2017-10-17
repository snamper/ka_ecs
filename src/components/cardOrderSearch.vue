<style scoped>
  @import "../assets/css/search.css";
</style>
<template>
	<section class="g-search-menu">
		<div v-show="off.source==0" class="g-search-menu-c">
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:'cardOrderSearchItem',params:{type:'doing'}}" class="slide-c f-c-green">进行中</router-link>
				</div>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:'cardOrderSearchItem',params:{type:'closed'}}" class="slide-c f-c-purple">已关闭</router-link>
				</div>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:'cardOrderSearchItem',params:{type:'auditing'}}" class="slide-c f-c-red">待审核</router-link>
				</div>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:'cardOrderSearchItem',params:{type:'audited'}}" class="slide-c f-c-blue">已审核</router-link>
				</div>
			</div>
		</div>
		<transition appear name="fadeInUp">
			<router-view></router-view>
		</transition>
	</section>
</template>
<script>
export default{
	name:'cardOrderSearch',
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
			if(path.indexOf('/home/cardOrderSearch/')>-1){
				this.off.source='close';
			}else if(path.indexOf('/home/cardOrderSearch')>-1){
				this.off.source=0;
			}
		}
	}
}
</script>


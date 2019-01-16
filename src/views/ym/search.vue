<style scoped>
  
</style>
<template>
	<section class="g-search-menu">
		<div v-if="off.source==0" class="g-search-menu-c">
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{path:'auditing',params:{type:'auditing'}}" append class="slide-c f-c-red">待审核</router-link>
				</div>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{path:'audited',params:{type:'audited'}}" append class="slide-c f-c-blue">已审核</router-link>
				</div>
			</div>
		</div>
		<transition appear name="fadeInUp">
			<router-view></router-view>
		</transition>
	</section>
</template>
<script>
import "../../assets/ym/css/search.css";
export default{
	name:'search',
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
			if(path.indexOf('/homey/search/')>-1){
				this.off.source='close';
			}else if(path.indexOf('/homey/search')>-1){
				this.off.source=0;
			}
		}
	}
}
</script>


<style scoped>
  @import "../assets/css/search.css";
  .o-audit-count{
  	position: absolute;
  	top: 50%;
  	left: 50%;
  	width: 15px;
  	height: 15px;
  	margin-top: 15px;
  	margin-left: -7px;
  	line-height: normal;
  }
</style>
<template>
	<section class="g-search-menu">
		<div v-if="off.source==0" class="g-search-menu-c">
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:'orderList',params:{type:'auditing'}}" class="slide-c f-c-red">待审核<span class="o-audit-count">{{ count.data.attribute }}</span></router-link>
				</div>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:'orderList',params:{type:'audited'}}" class="slide-c f-c-blue">已审核</router-link>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</section>
</template>
<script>
export default{
	name:'merchantAttr',
	data (){
		return {
			off:{
				source:0,
			},
			count:''
		};
	},
	created:function(){
		var vm=this;
		vm.count=vm.$parent.count;
		vm.setType();
	},
	watch:{
		'$route':'setType'
	},
	methods:{
		setType:function(){
			const path=this.$route.path;
			if(path.indexOf('/home/merchantAttr/')>-1){
				this.off.source='close';
			}else if(path.indexOf('/home/merchantAttr')>-1){
				this.off.source=0;
			}
		}
	}
};
</script>


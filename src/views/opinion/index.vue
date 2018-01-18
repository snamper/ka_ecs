<!--**
  *@info 意见反馈首页
* *-->
<template>
	<section class="g-search-menu">
		<div v-show="off.source==1" class="g-search-menu-c">
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:off.name,params:{type:'pending'}}" class="slide-c f-c-green">待处理</router-link>
				</div>
				<p class="opinionCountP" style="color:#3DD79B"></p>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:off.name,params:{type:'processing'}}" class="slide-c f-c-purple">进行中</router-link>
				</div>
				<p class="opinionCountP" style="color:#4b3887"></p>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{name:off.name,params:{type:'finish'}}" class="slide-c f-c-red">已完成</router-link>
				</div>
				<p class="opinionCountP" style="color:#E13722"></p>
			</div>
		</div>
		<router-view></router-view>
	</section>
</template>
<script>
 import "../../assets/css/search.css";
export default{
	name:'opinionItem',
	data (){
		return {
			off:{
				source:0,
				name:"opinion_item"
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
			const path = this.$route.path;
			if(path.indexOf('/home/opinion/')<0){
				this.off.source=1;
			}else if(path.indexOf('/home/opinion/')>=0){
				this.off.source=0;
				this.off.name="opinion_item";
			}
		}
	}
}
</script>


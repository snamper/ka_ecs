<!--**
  *@info 订单查询模块顶层
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<style scoped>
  @import "../../assets/css/audit.css";
</style>
<template>
		<router-view></router-view>
	</section>
</template>
<script>
export default{
	name:'audit',
	data (){
		return {

		}
	},
	created:function(){
		
	},
	watch:{
		'$route':'setType'
	},
	methods:{
		setType:function(){
			const path=this.$route.path;
		}
	}
}
</script>


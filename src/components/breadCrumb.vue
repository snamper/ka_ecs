<!--**
  *@info 面包屑组件
  *@author: thinkmix
  *@date 2019-01-15
* *-->
<template>
	<div class="_m-breadCrumb">
		<div class="item" v-for="(crumb,index) in list" :key="index">
			<router-link :to="crumb.to" v-if="crumb.to">{{ crumb.name }}</router-link>
			<span v-else>{{ crumb.name }}</span>
		</div>
	</div>
</template>
<script>

export default{
	name:'breadCrumb',
	props:{
		list:Array,
	},
	data(){
		return{
			off:false,
			position:{x:0, y:0},
			placement:4,//1,top;2,right;3,bottom;4,left;
		}
	},
	mounted(){
		
	},
	methods:{
		
	}
}
</script>

<style lang="scss" scoped>

._m-breadCrumb{

	>.item{
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-right: 0.3rem;
		color: #D7D7D7;
		>a{
			display: block;
			color: inherit;
		}
		&:after{
			content: '';
			position: absolute;
			right: -25px;
			top: 2px;
			display: inline-block;
			background-image: url(../assets/images/right-w.png);
			background-position: center;
			background-size: 100%;
			background-repeat: no-repeat;
			width: 0.16rem;
			height: 0.16rem;
		}
	}
	>.item:last-child{
		color: #fff !important;
		font-weight: bold;
		&:after{
			display: none;
		}
	}
}
</style>


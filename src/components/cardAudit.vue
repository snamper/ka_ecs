<style scoped>
  @import "../assets/css/audit.css";
</style>
<template>
	<section class="g-audit-menu">
		<div v-if="off.source==4&&off.auditType==0" class="g-audit-menu-c">
			<div class="m-menu-div">
				<router-link :to="{name:'realtimeChild',params:{type:6}}" class="u-bg navBg1"><div>开卡审核</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>{{count.data.opencard}}</span></p><p>已分配<span>{{count.data.opencard_}}</span></p></div>
			</div>
			<div class="m-menu-div">
				<router-link :to="{name:'realtimeChild',params:{type:7}}" class="u-bg navBg5"><div>过户办理</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>{{count.data.transfer}}</span></p><p>已分配<span>{{count.data.transfer_}}</span></p></div>
			</div>
		</div>
		<div v-if="off.source==4&&off.auditType==1" class="g-audit-menu-c">
			<div class="m-menu-div">
				<router-link :to="{name:'afterwardsChild',params:{type:6}}" class="u-bg navBg1"><div>开卡审核</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>{{count.data.opencardAfterwards}}</span></p><p>已分配<span>{{count.data.opencard_Afterwards}}</span></p></div>
			</div>
		</div>
		<router-view></router-view>
	</section>
</template>
<script>
export default{
	name:'audit',
	data (){
		return {
			off:{
				source:0,
				auditType:1//0,实时;1,事后
			},
			count:''
		}
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
			if(path.indexOf('/home/realtime/kameng/')>-1||path.indexOf('/home/afterwards/kameng/')>-1){
				this.off.source='close';
			}else if(path.indexOf('/home/realtime/kameng')>-1){
				this.off.source=4;
			}else if(path.indexOf('/home/afterwards/kameng')>-1){
				this.off.source=4;
			}
			
			path.indexOf('/home/realtime/kameng')>-1 ? this.off.auditType=0 : this.off.auditType=1;

		}
	}
}
</script>


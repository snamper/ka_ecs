<style scoped>
  @import "../../assets/ym/css/audit.css";
</style>
<template>
	<section class="g-audit-menu">
		<div v-if="off.source==0" class="g-audit-menu-c">
			<div class="m-menu-div">
				<router-link :to="{name:'card',params:{type:1}}" class="u-bg navBg2"><div>成卡审核</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>{{auditCountYm.readyCard}}</span></p><p>已分配<span>{{auditCountYm.readyCard_1}}</span></p></div>
			</div>
			<div class="m-menu-div">
				<router-link :to="{name:'card',params:{type:2}}" class="u-bg navBg3"><div>白卡审核</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>{{auditCountYm.whiteCard}}</span></p><p>已分配<span>{{auditCountYm.whiteCard_1}}</span></p></div>
			</div>
			<div class="m-menu-div">
				<router-link :to="{name:'card',params:{type:3}}" class="u-bg navBg5"><div>过户办理</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>{{auditCountYm.newChangeCard}}</span></p><p>已分配<span>{{auditCountYm.newChangeCard_1}}</span></p></div>
			</div>
			<div class="m-menu-div">
				<router-link :to="{name:'card',params:{type:4}}" class="u-bg navBg4"><div>实名补录</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>{{auditCountYm.realNameCollection}}</span></p><p>已分配<span>{{auditCountYm.realNameCollection_1}}</span></p></div>
			</div>
			<div class="m-menu-div">
				<router-link :to="{name:'card',params:{type:5}}" class="u-bg navBg6"><div>实名登记</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>{{auditCountYm.fill}}</span></p><p>已分配<span>{{auditCountYm.fill_1}}</span></p></div>
			</div>
		</div>
		<div v-if="off.source==4" class="g-audit-menu-c">
			<div class="m-menu-div">
				<router-link :to="{name:'card',params:{type:1}}" class="u-bg navBg1"><div>开卡审核</div><p><span>点击审核</span></p></router-link>
				<div class="navInfoDiv"><p>待审核<span>0</span></p><p>已分配<span>0</span></p></div>
			</div>
		</div>
		<router-view></router-view>
	</section>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import {getStore} from '../../config/utils';
export default{
    name:'audit',
	data (){
		return {
			off:{
				source:0
			},
			count:''
		}
    },
     computed:{
		...mapState([
            "auditCountYm",
            "countTotalYm",
        ]),
	},
	created:function(){
		var vm=this;
        // vm.count=vm.$parent.count;
        vm.count={"code":"200","msg":"success","data":{"changeCard_1":"0","changeCard":"0","realNameCollection":"0","fill":"0","fill_1":"0","readyCard_1":"0","whiteCard_1":"0","newChangeCard_1":"0","type_1":"0,2,3,4","newChangeCard":"0","whiteCard":"0","readyCard":"0","realNameCollection_1":"0"}}
		vm.setType();
	},
	watch:{
		'$route':'setType'
	},
	methods:{
        ...mapActions([
            "getAuditStatisticsInfoYm",
        ]),
		setType:function(){
			const path=this.$route.path;
			if(path.indexOf('/homey/audit/yuanmeng/')>-1){
				this.off.source='close';
			}else if(path.indexOf('/homey/audit/yuanmeng')>-1){
                this.off.source=0;
			}else if(path.indexOf('/homey/audit/yyz')>-1){
				this.off.source=1;
			}else if(path.indexOf('/homey/audit/xsk')>-1){
				this.off.source=2;
			}else if(path.indexOf('/homey/audit/yuanwei')>-1){
				this.off.source=3;
			}else if(path.indexOf('/homey/audit/kameng/')>-1){
				this.off.source='close';
			}else if(path.indexOf('/homey/audit/kameng')>-1){
				this.off.source=4;
			}
		}
	}
}
</script>


<!--**
  *@info 意见反馈首页
* *-->
<template>
	<section class="g-search-menu">
		<div v-show="off.source==1" class="g-search-menu-c">
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{path:'pending',params:{type:'pending'}}" append class="slide-c f-c-green">待处理</router-link>
				</div>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{path:'doing',params:{type:'doing'}}" append class="slide-c f-c-purple">进行中</router-link>
				</div>
			</div>
			<div class="m-search-menu">
				<div class="slide">
					<router-link :to="{path:'finish',params:{type:'finish'}}" append class="slide-c f-c-red">已完成</router-link>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</section>
</template>
<script>
 import "../../../assets/km/css/search.css";
 import {mapState, mapMutations, mapActions} from 'vuex';
 import {getStore} from '../../../config/utils';
export default{
	name:'opinionItem',
	data (){
		return {
			off:{
				source:0,
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
	computed:{
		...mapState([
            "onlineTime",
            "timer",
            "auditCount",
            "countTotal",
            "offCountChange",
            "OpcountTotal"
        ]),
	},
	methods:{
		...mapMutations([
            "SET_ONLINE_TIME",
            "CLEAR_TIMER",
            "SIGN_OUT",
            "SET_USERINFO"
        ]),
        ...mapActions([
        	"getAuditStatisticsInfo",
        	"getOpinionCountInfo",
        ]),
		setType:function(){
			const path = this.$route.path;
			if(path.indexOf('/homek/opinion/')<0){
				this.off.source=1;
			}else if(path.indexOf('/homek/opinion/')>=0){
				this.off.source=0;
			}
		}
	}
}
</script>


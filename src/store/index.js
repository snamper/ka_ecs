import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';

Vue.use(Vuex);

const state = {
	userInfo:{},//用户信息
	auditCount:{//审核统计数据
		"opencard":0,//开卡实时待审核
		"opencard_":0,//开卡试试已分配
		"opencardAfterwards":0,//开卡事后待审核
		"opencard_Afterwards":0,//开卡事后已分配
		"attribute":0,//售卡权限待审核
		"registerMerchantRealTime":0,//激活商户实时待审核
		"registerMerchantRealTime_":0,//激活商户实时已分配
		"registerMerchantAfter":0,//激活商户事后待审核
		"registerMerchantAfter_":0,//激活商户事后已分配
		"transfer":0,//过户办理待审核
		"transfer_":0,//过户办理已分配
		"sdkRealTime":0,//sdk开卡实时待审核
		"sdkRealTime_":0,//sdk开卡实时已分配
	},
	countTotal:0,//审核总待审核数
	offCountChange:true,//统计变化开关
	onlineTime:'00:00:00',//在线时间
	timer:{//定时器对象
		online:null,
		count:null
	},
};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
});
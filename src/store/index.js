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
		"attribute":0,//商户属性待审核
		"transfer":0,//过户办理待审核
		"transfer_":0//过户办理已分配
	},
	onlineTime:'00:00',//在线时间
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
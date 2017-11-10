import {
	SET_AUDIT_STATISTICS_INFO,
	SET_ONLINE_TIME,
	CLEAR_TIMER,
	SIGN_OUT,
	SET_USERINFO
} from './mutation-types.js';
import {
	getAuditStatistics
} from '../config/service';
import {setStore, getStore, removeStore, secondsFormat} from '../config/utils';

export default {
	//获取审核统计信息
	[SET_AUDIT_STATISTICS_INFO](state,res) {
		state.auditCount = Object.assign({}, state.auditCount,res.data);
	},
	//设置在线时间
	[SET_ONLINE_TIME](state){
		state.timer.online=setInterval(function(){
			let time=parseInt(getStore('KA_ECS_ONLINE_TIME'));
			!time&&(time=0);
			state.onlineTime=secondsFormat(time);
			time++;
			setStore('KA_ECS_ONLINE_TIME',time);
		},1000);
	},
	[CLEAR_TIMER](state){
		Object.keys(state.timer).forEach(function(key){
			clearInterval(state.timer[key]);
		});
	},
	[SET_USERINFO](state,res){
		state.userInfo=res;
		setStore("KA_ECS_USER",res);
	},
	[SIGN_OUT](state){
		state.userInfo={};
		removeStore("KA_ECS_USER");
		removeStore("KA_ECS_ONLINE_TIME");
		window.location.href='#/login';
	}
};

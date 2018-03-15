import {
    SET_AUDIT_STATISTICS_INFO,
	SET_COUNT_TOTAL,
	SET_COUNT_TOTAL_CHANGE,
	SET_ONLINE_TIME,
	CLEAR_TIMER,
	SIGN_OUT,
	SET_USERINFO,
    SET_OPINION_COUNT,
    SET_AUDIT_STATISTICS_INFO_YM
} from './mutation-types.js';
import {
	getAuditStatistics,
    getOpinionCount,
    getAuditStatisticsYm,
} from '../config/service';
import {setStore, getStore, removeStore, secondsFormat} from '../config/utils';

export default {
	//获取审核统计信息
	[SET_AUDIT_STATISTICS_INFO](state,res) {
        // console.log("kmaudit");
		state.auditCount = Object.assign({}, state.auditCount,res.data);
		let count=this.getters.getCountTotal;
		if(count!=state.countTotal){
			state.offCountChange=true;
		}else{
			state.offCountChange=false;
		}
		state.countTotal=count;
	},
	// 获取意见反馈统计数
	[SET_OPINION_COUNT](state,res){
        // console.log("kmopinion");    
		state.auditCount = Object.assign({}, state.auditCount,res.data);
		let Opcount=this.getters.getOpinionTotal;
		if(Opcount!=state.OpcountTotal){
			state.offCountChange=true;
		}else{
			state.offCountChange=false;
		}
		state.OpcountTotal=Opcount;
    },
    //获取YM审核统计信息
	[SET_AUDIT_STATISTICS_INFO_YM](state,res) {
        // console.log("ymaudit");        
        state.auditCountYm = Object.assign({}, state.auditCountYm,res.data);
        let count=this.getters.getCountTotalYm;
		if(count!=state.countTotalYm){
			state.offCountChange=true;
		}else{
			state.offCountChange=false;
		}
        state.countTotalYm=count;
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
	[SET_COUNT_TOTAL](state,val){
        state.countTotal=val;
	},
	[SET_COUNT_TOTAL_CHANGE](state,val){
		state.offCountChange=val;
	},
	//清除定时器
	[CLEAR_TIMER](state){
		Object.keys(state.timer).forEach(function(key){
			clearInterval(state.timer[key]);
		});
	},
	//设置用户信息
	[SET_USERINFO](state,res){
		state.userInfo=res;
		setStore("KA_ECS_USER",res);
	},
	//登出
	[SIGN_OUT](state){
		state.userInfo={};
		removeStore("KA_ECS_USER");
		removeStore("KA_ECS_ONLINE_TIME");
		window.location.href='#/login';
	}
};

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
import {setStore, getStore, removeStore} from '../config/utils';

export default {
	//获取审核统计信息
	[SET_AUDIT_STATISTICS_INFO](state,res) {
		state.count = Object.assign({}, state.count,res);
	},
	//设置在线时间
	[SET_ONLINE_TIME](state){
		const timeFormat=function (t){
		    t=parseInt(t);
		    var day,minute,second,hour;
		    day=Math.floor(t/(60*60*24));
		    day>0 ? hour=Math.floor(t%(60*60*24)/(60*60)) : hour=Math.floor(t/(60*60));
		    hour>0 ? minute=Math.floor(t%(60*60)/60) : minute=Math.floor(t/60);
		    minute>0 ? second=Math.floor(t%60) : second=t;
		    hour<10&&(hour='0'+hour);
		    minute<10&&(minute='0'+minute);
		    second<10&&(second='0'+second);
		    return day!='00' ? day+"天"+hour+":"+minute+":"+second : hour!='00' ? hour+":"+minute+":"+second : minute!='00' ? minute+":"+second : "00:"+second;
		}
		state.timer.online=setInterval(function(){
			let time=parseInt(getStore('KA_ECS_ONLINE_TIME'));
			!time&&(time=0);
			state.onlineTime=timeFormat(time);
			time++;
			setStore('KA_ECS_ONLINE_TIME',time);
		},1000);
	},
	[CLEAR_TIMER](state){
		Object.keys(state.timer).forEach(function(key){
			state.timer[key]=null;
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
	}
};

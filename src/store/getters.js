export default {
	getCountTotal:state=>{
		let auditCount=state.auditCount;
		Object.keys(auditCount).forEach(function(key){
			auditCount[key]=parseInt(auditCount[key]);
		});
		let isadmin=state.userInfo.isadmin;
		if(isadmin){
			let count=0;
			if(isadmin.indexOf("0")>-1){//开卡审核权限
				count += auditCount.opencard+auditCount.opencardAfterwards+auditCount.transfer+auditCount.sdkRealTime+auditCount.tfOpenCard;
			}
			if(isadmin.indexOf("5")>-1||isadmin.indexOf("6")>-1){//业务权限
				count += auditCount.attribute+auditCount.registerMerchantRealTime+auditCount.registerMerchantAfter;
			}
			if(isadmin.indexOf("1")>-1){//所有权限
				count = auditCount.opencard+auditCount.opencardAfterwards+auditCount.attribute+auditCount.transfer+auditCount.sdkRealTime+auditCount.tfOpenCard+auditCount.registerMerchantRealTime+auditCount.registerMerchantAfter;
			}
			return count;
		}else{
			return 0;
		}
	},
	getOpinionTotal:state=>{
		let auditCount=state.auditCount;
		Object.keys(auditCount).forEach(function(key){
			auditCount[key]=parseInt(auditCount[key]);
		});
		let isadmin=state.userInfo.isadmin;
		if(isadmin){
			let Opcount=0;
			Opcount += auditCount[0]+auditCount[1]+auditCount[2];
			return Opcount;	
		}else{
			return 0;
		}
	},
	getCountTotalYm:state=>{
        let auditCount=state.auditCount;
		Object.keys(auditCount).forEach(function(key){
			auditCount[key]=parseInt(auditCount[key]);
		});
        let isadmin=state.userInfo.isadmin;
        		if(isadmin){
			let countYm=0;
			countYm += auditCount[0]+auditCount[1]+auditCount[2];
            return countYm;
		}else{
			return 0;
		}
	}
};
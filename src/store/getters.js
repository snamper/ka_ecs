export default {
	getCountTotal:state=>{
		let auditCount=state.auditCount;
		Object.keys(auditCount).forEach(function(key){
			auditCount[key]=parseInt(auditCount[key]);
		});
		let isadmin=state.userInfo.isadmin;
		if(isadmin){
			if(isadmin.indexOf("0")>-1){
				return auditCount.opencard+auditCount.opencardAfterwards+auditCount.transfer+auditCount.sdkRealTime;
			}else if(isadmin.indexOf("1")>-1){
				return auditCount.opencard+auditCount.opencardAfterwards+auditCount.attribute+auditCount.transfer+auditCount.sdkRealTime;
			}else if(isadmin.indexOf("5")>-1||isadmin.indexOf("6")>-1){
				return auditCount.attribute;
			}
		}else{
			return 0;
		}
	}
}
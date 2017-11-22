export default {
	getCountTotal:state=>{
		let auditCount=state.auditCount;
		Object.keys(auditCount).forEach(function(key){
			auditCount[key]=parseInt(auditCount[key]);
		});
		let isadmin=state.userInfo.isadmin;
		if(isadmin){
			let count=0;
			if(isadmin.indexOf("0")>-1){
				count = auditCount.opencard+auditCount.opencardAfterwards+auditCount.transfer+auditCount.sdkRealTime;
			}else if(isadmin.indexOf("1")>-1){
				count = auditCount.opencard+auditCount.opencardAfterwards+auditCount.attribute+auditCount.transfer+auditCount.sdkRealTime;
			}else if(isadmin.indexOf("5")>-1||isadmin.indexOf("6")>-1){
				count = auditCount.attribute;
			}
			return count;
		}else{
			return 0;
		}
	}
}
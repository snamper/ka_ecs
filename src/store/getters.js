export default {
	getCountTotal:state=>{
		let auditCount=state.auditCount;
		Object.keys(auditCount).forEach(function(key){
			auditCount[key]=parseInt(auditCount[key]);
		});
		return auditCount.opencard+auditCount.opencardAfterwards+auditCount.attribute+auditCount.transfer;
	}
}
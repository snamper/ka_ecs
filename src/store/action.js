import {
	getAuditStatistics,
    getOpinionCount,
    getAuditStatisticsYm,
} from '../config/service';
import {
	SET_AUDIT_STATISTICS_INFO,
    SET_OPINION_COUNT,
	SET_AUDIT_STATISTICS_INFO_YM,    
} from './mutation-types.js';



export default {

	async getAuditStatisticsInfo({
		commit,
		state
	}) {
		let res = await getAuditStatistics();
		res&&commit(SET_AUDIT_STATISTICS_INFO, res)
	},

	async getOpinionCountInfo({
		commit,
		state
	}){
		let res = await getOpinionCount();
		res&&commit(SET_OPINION_COUNT, res)
    },
    
    async getAuditStatisticsInfoYm({
		commit,
        state
	}) {
        let res = await getAuditStatisticsYm();
		res&&commit(SET_AUDIT_STATISTICS_INFO_YM, res)
	}
}
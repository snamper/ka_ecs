import {
	getAuditStatistics,
	getOpinionCount
} from '../config/service';
import {
	SET_AUDIT_STATISTICS_INFO,
	SET_OPINION_COUNT
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
	}
}
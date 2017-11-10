import {
	getAuditStatistics
} from '../config/service';
import {
	SET_AUDIT_STATISTICS_INFO
} from './mutation-types.js';

export default {

	async getAuditStatisticsInfo({
		commit,
		state
	}) {
		let res = await getAuditStatistics();
		res&&commit(SET_AUDIT_STATISTICS_INFO, res)
	},

}
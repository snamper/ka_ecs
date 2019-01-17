import {
  getAuditStatistics, // 获取卡盟订单数
  getOpinionCount, // 获取意见反馈数
  getAuditStatisticsYm, // 获取远盟订单数
  getSearchListAuditYm
} from '../config/service'
import {
  SET_AUDIT_STATISTICS_INFO,
  SET_OPINION_COUNT,
  SET_AUDIT_STATISTICS_INFO_YM,
  SET_AUDITED_SEARCHLIST_YM
} from './mutation-types.js'
import { errorDeal } from '../config/utils'

export default {
  async getAuditStatisticsInfo ({ commit, state }) {
    let res = await getAuditStatistics()
      .then((data) => {
        return data
      })
      .catch(e => errorDeal(e))
    res && commit(SET_AUDIT_STATISTICS_INFO, res)
  },
  async getAuditStatisticsInfoYm ({ commit, state }) {
    let res = await getAuditStatisticsYm()
    res && commit(SET_AUDIT_STATISTICS_INFO_YM, res)
  },
  async getOpinionCountInfo ({ commit, state }) {
    let res = await getOpinionCount()
      .then((data) => {
        return data
      })
      .catch(e => errorDeal(e))
    res && commit(SET_OPINION_COUNT, res)
  },
  async getSearchListAuditInfoYm ({ commit, state }) {
    let res = await getSearchListAuditYm()
      .then((data) => {
        return data
      })
      .catch(e => errorDeal(e))
    res && commit(SET_AUDITED_SEARCHLIST_YM, res)
  }
}

import {
  SET_AUDIT_STATISTICS_INFO,
  SET_COUNT_TOTAL,
  SET_COUNT_TOTAL_CHANGE,
  SET_ONLINE_TIME,
  CLEAR_TIMER,
  SIGN_OUT,
  SET_USERINFO,
  SET_OPINION_COUNT,
  SET_AUDIT_STATISTICS_INFO_YM,
  SET_AUDITED_SEARCHLIST_YM
} from './mutation-types.js'
import {
  getAuditStatistics,
  getOpinionCount,
  getAuditStatisticsYm
} from '../config/service'
import { setStore, getStore, removeStore, secondsFormat } from '../config/utils'

export default {
  // 获取审核统计信息
  [SET_AUDIT_STATISTICS_INFO] (state, res) {
    let powerKm = getStore('KA_ECS_USER').rightCodes
    powerKm = powerKm.split(',')
    let powerKm5a = false, powerKm5b = false, powerKm6a = false, powerKm6b = false
    for (let i in powerKm) {
      if (powerKm[i].indexOf('5') > -1) {
        var powerKm5 = powerKm[i]
      }
      if (powerKm[i].indexOf('6') > -1) {
        var powerKm6 = powerKm[i]
      }
      for (let _i in powerKm5) {
        if (powerKm5[_i] == 'a') {
          powerKm5a = true// 开卡审核
        }
        if (powerKm5[_i] == 'b') {
          powerKm5b = true// 开卡查询
        }
      }
      for (let _i in powerKm6) {
        if (powerKm6[_i] == 'a') {
          powerKm6a = true// 商户审核
        }
        if (powerKm6[_i] == 'b') {
          powerKm6b = true// 商户查询
        }
      }
    }
    state.auditCount = Object.assign({}, state.auditCount, res.data)
    if (powerKm5a != true) {
      state.auditCount = Object.assign({}, state.auditCount,
        { 'opencard': 0,
          'opencard_': 0,
          'tfOpenCardReal': 0,
          'tfOpenCardReal_': 0,
          'opencardAfterwards': 0,
          'opencardAfterwards_': 0,
          'realNameCollection': 0,
          'realNameCollection_': 0,
          'realNameRechCard': 0,
          'realNameRechCard_': 0,
          'transfer': 0,
          'transfer_': 0,
          'sdkRealTime': 0,
          'sdkRealTime_': 0,
          'tfOpenCard': 0,
          'tfOpenCard_': 0 }
      )
    } if (powerKm6a != true) {
      state.auditCount = Object.assign({}, state.auditCount,
        {
          'registerMerchantRealTime': 0,
          'registerMerchantRealTime_': 0,
          'fillMerchantRealTime': 0,
          'fillMerchantRealTime_': 0,
          'registerMerchantAfterWards': 0,
          'registerMerchantAfterWards_': 0,
          'registerMerchantAfter': 0,
          'registerMerchantAfter_': 0,
          'attribute': 0
        })
    }
    let count = this.getters.getCountTotal
    if (count != state.countTotal) {
      state.offCountChange = true
    } else {
      state.offCountChange = false
    }
    state.countTotal = count
  },
  // 获取意见反馈统计数
  [SET_OPINION_COUNT] (state, res) {
    let powerKm = getStore('KA_ECS_USER').rightCodes
    powerKm = powerKm.split(',')
    let powerKm1a = false, powerKm1b = false
    for (let i in powerKm) {
      if (powerKm[i].indexOf('1') > -1) {
        var powerKm1 = powerKm[i]
      }
      for (let _i in powerKm1) {
        if (powerKm1[_i] == 'a') {
          // 意见反馈待处理
          powerKm1a = true
        }
        if (powerKm1[_i] == 'b') {
          // 意见反馈查询
          powerKm1b = true
        }
      }
    }
    state.opinionCount = Object.assign({}, state.opinionCount, res.data)
    if (powerKm1a != true) {
      state.opinionCount = Object.assign({}, state.opinionCount, [0, 0, 0])
    }
    let Opcount = this.getters.getOpinionTotal
    if (Opcount != state.OpcountTotal) {
      state.offCountChange = true
    } else {
      state.offCountChange = false
    }
    state.OpcountTotal = Opcount
  },
  // 获取YM审核统计信息
  [SET_AUDIT_STATISTICS_INFO_YM] (state, res) {
    state.auditCountYm = Object.assign({}, state.auditCountYm, res.data)
    let count = this.getters.getCountTotalYm
    if (count != state.countTotalYm) {
      state.offCountChange = true
    } else {
      state.offCountChange = false
    }
    state.countTotalYm = count
  },
  [SET_AUDITED_SEARCHLIST_YM] (state, res) { // 获取远盟已审核订单查询结果
    state.ymAuditedSearchList = Object.assign({}, state.ymAuditedSearchList, res.data)
    let searchRes = this.getters.getAuditedSearchListYm
    if (searchRes != sate.ymAuditedSearchList) {
      state.off.offGetSearchListAuditYm = true
    } else {
      state.off.offGetSearchListAuditYm = false
    }
    state.ymAuditedSearchList = searchRes
  },
  // 设置在线时间
  [SET_ONLINE_TIME] (state) {
    state.timer.online = setInterval(function () {
      let time = parseInt(getStore('KA_ECS_ONLINE_TIME'))
      !time && (time = 0)
      state.onlineTime = secondsFormat(time)
      time++
      setStore('KA_ECS_ONLINE_TIME', time)
    }, 1000)
  },
  [SET_COUNT_TOTAL] (state, val) {
    state.countTotal = val
  },
  [SET_COUNT_TOTAL_CHANGE] (state, val) {
    state.offCountChange = val
  },
  // 清除定时器
  [CLEAR_TIMER] (state) {
    Object.keys(state.timer).forEach(function (key) {
      clearInterval(state.timer[key])
    })
  },
  // 设置用户信息
  [SET_USERINFO] (state, res) {
    state.userInfo = res
    setStore('KA_ECS_USER', res)
  },
  // 登出
  [SIGN_OUT] (state) {
    state.userInfo = {}
    removeStore('KA_ECS_USER')
    removeStore('KA_ECS_ONLINE_TIME')
    window.location.href = '#/login'
  }
}

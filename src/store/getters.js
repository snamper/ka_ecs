export default {
  getCountTotal: state => { // 卡盟总计
    let auditCount = state.auditCount
    Object.keys(auditCount).forEach(function (key) {
      auditCount[key] = parseInt(auditCount[key])
    })
    let isadmin = state.userInfo.isadmin
    if (isadmin) {
      var count = 0
      count = Object.values(auditCount).reduce(function (total, val) {
        return total + val
      })

      return count
    } else {
      return 0
    }
  },
  getOpinionTotal: state => { // 卡盟意见反馈总计
    let auditCount = state.opinionCount
    Object.keys(auditCount).forEach(function (key) {
      auditCount[key] = parseInt(auditCount[key])
    })
    let isadmin = state.userInfo.isadmin
    if (isadmin) {
      let Opcount = 0
      Opcount += auditCount[0] + auditCount[1] + auditCount[2]
      return Opcount
    } else {
      return 0
    }
  },
  getCountTotalYm: state => { // 远盟总计
    let auditCountYm = state.auditCountYm
    Object.keys(auditCountYm).forEach(function (key) {
      auditCountYm[key] = parseInt(auditCountYm[key])
    })
    let isadmin = state.userInfo.isadmin
    if (isadmin) {
      var countYm = 0
      for (let i in auditCountYm) {
        if (!isNaN(auditCountYm[i])) {
          countYm = countYm + auditCountYm[i]
        }
      }
      return countYm
    } else {
      return 0
    }
  },
  getAuditedSearchListYm: state => {
    let searchListYm = state.ymAuditedSearchList
    return searchListYm
  }
}

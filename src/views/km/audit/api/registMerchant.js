import fetch from '@/config/fetch'

export default {
  /**
    *@describe 获取商户实名补录审核列表
    *@data {
      auditType:'',
    }
    **/
  getAuditList: (data, load, type) => {
    let url = ''
    if (type == 1) {
      url = 'km-ecs/w/regist/toAuditList'// 激活商户
    } else if (type == 2) {
      url = 'km-ecs/w/regist/toFillAuditList'// 商户实名补录
    }
    return fetch(url, data, 'POST', load)
  },
  /**
    *@describe 新增
    *@data {
        result:1,
        orderId:'',
        remarks:'',
    }
    **/
  actionAudit: (data, load, type) => {
    let url = ''
    if (type == 1) {
      url = 'km-ecs/w/regist/audit'// 激活商户
    } else if (type == 2) {
      url = 'km-ecs/w/regist/fillAudit'// 商户实名补录
    }
    return fetch(url, data, 'POST', load)
  }
}

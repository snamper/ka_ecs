import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  userInfo: {}, // 用户信息
  auditCount: {// 审核统计数据
    'opencard': 0, // 开卡实时待审核
    'opencard_': 0, // 开卡实时已分配
    'opencardAfterwards': 0, // 开卡事后待审核
    'opencard_Afterwards': 0, // 开卡事后已分配
    'attribute': 0, // 售卡权限待审核
    'registerMerchantRealTime': 0, // 激活商户实时待审核
    'registerMerchantRealTime_': 0, // 激活商户实时已分配
    'registerMerchantAfter': 0, // 激活商户事后待审核
    'registerMerchantAfter_': 0, // 激活商户事后已分配
    'realNameCollection': 0, // 实名补录待审核
    'realNameCollection_': 0, // 实名补录已分配
    'realNameRechCard': 0, // 补换卡待审核
    'realNameRechCard_': 0, // 补换卡已分配
    'transfer': 0, // 过户办理待审核
    'transfer_': 0, // 过户办理已分配
    'sdkRealTime': 0, // sdk开卡实时待审核
    'sdkRealTime_': 0, // sdk开卡实时已分配
    'tfOpenCard': 0, // i卡开卡事后待审核
    'tfOpenCard_': 0, // i卡开卡事后已分配
    'tfOpenCardReal': 0, // i卡开卡实时待审核
    'tfOpenCardReal_': 0, // i卡开卡实时已分配
    'fillMerchantRealTime': 0, // 商户实名补录待审核
    'fillMerchantRealTime_': 0 // 商户实名补录已分配
    // opinionTotal1:0,//意见反馈未处理
    // opinionTotal2:0,//意见反馈处理中
    // opinionTotal3:0,//意见反馈已完成
  },
  opinionCount: {
    '0': 0,
    '1': 0,
    '2': 0
  },
  auditCountYm: {
    'whiteCard': 0, // 开白卡待审核数
    'readyCard': 0, // 开成卡待审核数
    'newChangeCard': 0, // 补换卡待审核数
    'realNameCollection': 0, // 实名补录待审核数
    'fill': 0,
    'whiteCard_1': 0,
    'readyCard_1': 0,
    'newChangeCard_1': 0,
    'realNameCollection_1': 0,
    'fill_1': 0
  },
  countTotal: 0, // 审核总待审核数
  OpcountTotal: 0, // 意见反馈数统计
  countTotalYm: 0, // 远盟总待审核数
  offCountChange: true, // 统计变化开关
  offGetSearchListAuditYm: true, // 查询远盟已审核订单结果
  onlineTime: '00:00:00', // 在线时间
  timer: {// 定时器对象
    online: null,
    count: null,
    OpcountT: null,
    countYm: null
  },
  ymAuditedSearchList: {// 远盟已审核订单信息

  }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

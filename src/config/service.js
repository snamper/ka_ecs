import fetch from './fetch'

/* 登录相关 */
export const signIn = (data, load) => fetch('km_center_ecs/user/login', data, 'POST', load)// 登录
export const getSignCode = (data, load) => fetch('km_center_ecs/user/getSmsCode', data, 'POST', load)// 获取登录验证码
export const signOut = (data, load) => fetch('km_center_ecs/user/loginout', data, 'POST', load)// 登出

/* 全局审核订单循环获取相关 */
export const getAuditStatistics = (data) => fetch('km-ecs/w/audit/statisticsaudit', data, 'POST', true)// 获取审核统计
export const getOpinionCount = (data) => fetch('km-ecs/w/advice/countNum', data, 'POST', true)// 查询意见反馈统计数
export const getAuditStatisticsYm = (data) => fetch('ym-ecs/c/audit/statisticsaudit', data, 'POST', true)// 获取YM审核统计

/* 其它 */
export const unifySearchApi = (data, load) => fetch('km-ecs/w/handler/query', data, 'POST', load)// 统一查询接口
export const searchAuditList = (data, load, url) => fetch(url, data, 'POST', load)// 开卡订单查询
export const reAudit = (data, url) => fetch(url, data, 'POST')// 复审
export const reqCommonMethodNoLoad = (data, load, url) => fetch(url, data, 'POST', load)// 无加载条通用请求
export const reqCommonMethod = (data, load, url) => fetch(url, data, 'POST', load)// 通用请求方式
export const getSearchListAuditYm = (data, load, url) => fetch(url, data, 'POST', load)// 获取远盟已审核订单查询结果
/* export const getCityAreaPoint=(data,load)=>fetch("w/cityArea/pointList",data,"POST",load);//获取城市区域点坐标
export const setCityAreaPoint=(data,load)=>fetch("w/cityArea/newPointList",data,"POST",load);//设置城市区域点坐标 */

/* 商户列表查询 */
export const requestGetMerchantList = (data, load) => fetch('km-ecs/w/merchant/getMerchantList', data, 'POST', load)
/* 专营号条件查询 */
export const requestGetExclusiveNumer = (data, load) => fetch('km-ecs/w/monopoly/getPhoneListCriteria', data, 'POST', load)
/* 专营号详情 */
export const requestGetExclusiveNumerDetails = (data, load) => fetch('km-ecs/w/monopoly/getPhoneDetail', data, 'POST', load)
/* 商户下专营号列表 */
export const requestGetExclusiveNumerList = (data, load) => fetch('km-ecs/w/monopoly/getPhoneListByDealerId', data, 'POST', load)
/* sim查询 */
export const requestGetSimCardList = (data, load) => fetch('km-ecs/w/monopoly/getPhoneInfoByIccid', data, 'POST', load)
/** 专营号流转查询 */
export const requestGetExclusiveNumerFlowList = (data, load) => fetch('km-ecs/w/monopoly/getTransferNums', data, 'POST', load)
/** 专营号流转详情查询 */
export const requestGetExclusiveNumerFlowDetails1 = (data, load) => fetch('km-ecs/w/monopoly/getWhiteList', data, 'POST', load)
export const requestGetExclusiveNumerFlowDetails2 = (data, load) => fetch('km-ecs/w/monopoly/getEmptyList', data, 'POST', load)

/** 制白卡 */
export const requestGetMakeWhiteList = (data, load) => fetch('km-ecs/w/monopoly/getMakeWhiteList', data, 'POST', load)
export const requestGetMakeWhiteDetails = (data, load) => fetch('km-ecs/w/monopoly/getMakeWhiteDesc', data, 'POST', load)
/** 制成卡 */
export const requestGetMakeChengList = (data, load) => fetch('km-ecs/w/monopoly/getMakeReadyList', data, 'POST', load)
export const requestGetMakeChengDetails = (data, load) => fetch('km-ecs/w/monopoly/getMakeReadyDesc', data, 'POST', load)
/* 手机号码查询制卡订单详情 */
export const getAdultByPhone = (data, load) => fetch('km-ecs/w/monopoly/getAdultByPhone', data, 'POST', load)
/* 修改制卡订单验证号码 */
export const batchUpdateAdultSafePhone = (data, load) => fetch('km-ecs/w/monopoly/batchUpdateAdultSafePhone', data, 'POST', load)
export const updateAdultSafePhone = (data, load) => fetch('km-ecs/w/monopoly/updateAdultSafePhone', data, 'POST', load)

/* 专营号制卡相关 */
// export const requestGetExclusiveWhite=(data,load)=>fetch("km-ecs/w/monopoly/getMakeReadyDesc",data,"POST",load);
// export const requestGetExclusiveCheng=(data,load)=>fetch("km-ecs/w/monopoly/getMakeReadyDesc",data,"POST",load);
// export const requestGetExclusiveActive=(data,load)=>fetch("km-ecs/w/monopoly/getMakeReadyDesc",data,"POST",load);
// export const requestGetExclusiveNotActive=(data,load)=>fetch("km-ecs/w/monopoly/getMakeReadyDesc",data,"POST",load);
/* 商户专营号查询 */
export const requestGetMerchantExclusiveNumber = (data, load) => fetch('km-ecs/w/monopoly/getPrivateListByDealerId', data, 'POST', load)

/* 专营号号段列表查询 */
export const requestGetExclusiveNumberList = (data, load) => fetch('km-ecs/w/monopoly/getPrivateList', data, 'POST', load)
/* 专营号号段流转概况查询 */
export const requestGetExclusiveNumberFlow = (data, load) => fetch('km-ecs/w/monopoly/getPrivateByTitle', data, 'POST', load)
/* 专营号数目详情列表 */
export const requestGetExclusiveNumberDesc = (data, load) => fetch('km-ecs/w/monopoly/getNumsDesList', data, 'POST', load)
/* 大众号码精确查询 */
export const requestGetGeneralNumberList1 = (data, load) => fetch('km-ecs/w/monopoly/getGeneralByPhone', data, 'POST', load)

/* 大众号条件查询 */
export const requestGetGeneralNumberList2 = (data, load) => fetch('km-ecs/w/monopoly/getGeneralList', data, 'POST', load)
/* 大众号个数查询 */
export const requestGetGeneralNumberDesc = (data, load) => fetch('km-ecs/w/monopoly/getGNumsDesList', data, 'POST', load)
/* 获取卡盟专营号城市列表 */
export const getCitys = (data, load) => fetch('km-ecs/w/monopoly/getCitys', data, 'POST', load)
/* 实名资源库 */
export const getRealNameSource = (data, load) => fetch('km-ecs/w/realNameAuth/query', data, 'POST', load)
export const getRealNameSourceDetail = (data, load) => fetch('km-ecs/w/realNameAuth/queryDetail', data, 'POST', load)

/* 远盟订单查询总条数 */
export const getOrderTotal = (data, load) => fetch('ym-ecs/c/audit/orderSearchTotal', data, 'POST', load)

/* 卡盟获取黑名单列表 */
export const getBlackList = (data, load) => fetch('km-ecs/w/msgFile/list', data, 'POST', load)

/* 卡盟黑名单文件列表 */
export const downLoadBlackList = (data, load) => fetch('km-ecs/w/msgFile/download', data, 'POST', load)

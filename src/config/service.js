import fetch from "./fetch";

/*登录相关*/
export const signIn=(data,load)=>fetch("km_center_ecs/user/login",data,"POST",load);//登录
export const getSignCode=(data,load)=>fetch("km_center_ecs/user/getSmsCode",data,"POST",load);//获取登录验证码
export const signOut=(data,load)=>fetch("km_center_ecs/user/loginout",data,"POST",load);//登出

/*全局审核订单循环获取相关*/
export const getAuditStatistics=(data)=>fetch("km-ecs/w/audit/statisticsaudit",data,"POST",true);//获取审核统计
export const getOpinionCount=(data)=>fetch("km-ecs/w/advice/countNum",data,"POST",true);//查询意见反馈统计数
export const getAuditStatisticsYm=(data)=>fetch("ym-ecs/c/audit/statisticsaudit",data,"POST",true);//获取YM审核统计

/*其它*/
export const unifySearchApi=(data,load)=>fetch("km-ecs/w/handler/query",data,"POST",load);//统一查询接口
export const searchAuditList=(data,load,url)=>fetch(url,data,"POST",load)//开卡订单查询
export const reAudit=(data,url)=>fetch(url,data,"POST")//复审
export const reqCommonMethodNoLoad=(data,load,url)=>fetch(url,data,"POST",load)//无加载条通用请求
export const reqCommonMethod=(data,load,url)=>fetch(url,data,"POST",load)//通用请求方式
export const getSearchListAuditYm=(data,load,url)=>fetch(url,data,"POST",load)//获取远盟已审核订单查询结果
/*export const getCityAreaPoint=(data,load)=>fetch("w/cityArea/pointList",data,"POST",load);//获取城市区域点坐标
export const setCityAreaPoint=(data,load)=>fetch("w/cityArea/newPointList",data,"POST",load);//设置城市区域点坐标*/

/*资源查询接口*/
export const requestGetMerchantList=(data,load)=>fetch("km-ecs/w/merchant/getMerchantList",data,"POST",load);
/*专营号查询*/
export const requestGetExclusiveNumer=(data,load)=>fetch("km-ecs/w/monopoly/getPhoneListCriteria",data,"POST",load);
/*专营号详情*/
export const requestGetExclusiveNumerDetails=(data,load)=>fetch("km-ecs/w/monopoly/getPhoneDetail",data,"POST",load);
/*专营号列表*/
export const requestGetExclusiveNumerList=(data,load)=>fetch("km-ecs/w/monopoly/getPhoneListByDealerId",data,"POST",load);
/**专营号流转查询*/
export const requestGetExclusiveNumerFlowList=(data,load)=>fetch("km-ecs/w/monopoly/getTransferNums",data,"POST",load);
/**专营号流转详情查询 */
export const requestGetExclusiveNumerFlowDetails1=(data,load)=>fetch("km-ecs/w/monopoly/getWhiteList",data,"POST",load);
export const requestGetExclusiveNumerFlowDetails2=(data,load)=>fetch("km-ecs/w/monopoly/getEmptyList",data,"POST",load);

/**制成卡 */
export const requestGetMakeWhiteList=(data,load)=>fetch("km-ecs/w/monopoly/getMakeWhileList",data,"POST",load);
export const requestGetMakeWhiteDetails=(data,load)=>fetch("km-ecs/w/monopoly/getMakeWhiteDesc",data,"POST",load);
/**制白卡 */
export const requestGetMakeChengList=(data,load)=>fetch("km-ecs/w/monopoly/getMakeReadyList",data,"POST",load);
export const requestGetMakeChengDetails=(data,load)=>fetch("km-ecs/w/monopoly/getMakeReadyDesc",data,"POST",load);

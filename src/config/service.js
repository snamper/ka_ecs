import fetch from "./fetch";

export const signIn=(data,load)=>fetch("km_center_ecs/user/login",data,"POST",load);//登录
export const getSignCode=(data,load)=>fetch("km_center_ecs/user/getSmsCode",data,"POST",load);//获取登录验证码
export const signOut=(data,load)=>fetch("km_center_ecs/user/loginout",data,"POST",load);//登出
export const getAuditStatistics=(data)=>fetch("km-ecs/w/audit/statisticsaudit",data,"POST",true);//获取审核统计
export const getOpinionCount=(data)=>fetch("km-ecs/w/advice/countNum",data,"POST",true);//查询意见反馈统计数
export const getAuditStatisticsYm=(data)=>fetch("ym-ecs/c/audit/statisticsaudit",data,"POST",true);//获取YM审核统计
export const unifySearchApi=(data,load)=>fetch("km-ecs/w/handler/query",data,"POST",load);//统一查询接口
export const searchAuditList=(data,load,url)=>fetch(url,data,"POST",load)//开卡订单查询
export const reAudit=(data,url)=>fetch(url,data,"POST")//复审
export const reqCommonMethodNoLoad=(data,load,url)=>fetch(url,data,"POST",load)//无加载条通用请求
export const reqCommonMethod=(data,load,url)=>fetch(url,data,"POST",load)//通用请求方式
/*export const getCityAreaPoint=(data,load)=>fetch("w/cityArea/pointList",data,"POST",load);//获取城市区域点坐标
export const setCityAreaPoint=(data,load)=>fetch("w/cityArea/newPointList",data,"POST",load);//设置城市区域点坐标*/
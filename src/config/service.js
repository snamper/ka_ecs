import fetch from "./fetch";

export const signIn=(data,load)=>fetch("w/user/login",data,"POST",load);//登录
export const getSignCode=(data,load)=>fetch("w/user/getSmsCode",data,"POST",load);//获取登录验证码
export const signOut=(data)=>fetch("w/user/loginOut",data,"POST");//登出
export const getAuditStatistics=(data)=>fetch("w/audit/statisticsaudit",data,"POST",true);//获取审核统计
export const unifySearchApi=(data,load)=>fetch("w/handler/query",data,"POST",load);//统一查询接口
export const getOpinionCount=(data)=>fetch("w/advice/countNum",data,"POST",true);//查询意见反馈统计数
/*export const getCityAreaPoint=(data,load)=>fetch("w/cityArea/pointList",data,"POST",load);//获取城市区域点坐标
export const setCityAreaPoint=(data,load)=>fetch("w/cityArea/newPointList",data,"POST",load);//设置城市区域点坐标*/
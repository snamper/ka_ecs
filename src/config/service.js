import fetch from "./fetch";
export const SDK_IMAGE_URL="https://kmsdk.m10027.com/eas/";//sdk图片地址路径

export const signIn=(data,load)=>fetch("w/user/login",data,"POST",load);//登录
export const getSignCode=(data,load)=>fetch("w/user/getSmsCode",data,"POST",load);//获取登录验证码
export const signOut=(data)=>fetch("w/user/loginOut",data,"POST");//登出
export const getAuditStatistics=(data)=>fetch("w/audit/statisticsaudit",data,"POST",true);//获取审核统计
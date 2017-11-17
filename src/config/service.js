import fetch from './fetch';

export const getAuditStatistics=(data)=>fetch('w/audit/statisticsaudit',data,'POST',true);
export const signOut=(data)=>fetch('w/user/loginOut',data,'POST');
export const SDK_IMAGE_URL="https://192.168.10.109:6086/ecs/";


import fetch from './fetch';

export const getAuditStatistics=(data)=>fetch('w/audit/statisticsaudit',data,'POST',true);
export const signOut=(data)=>fetch('w/user/loginOut',data,'POST');


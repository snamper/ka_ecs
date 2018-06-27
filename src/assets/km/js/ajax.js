import Vue from 'vue';
import axios from 'axios';
import {setStore, getStore, errorDeal} from '../../../config/utils';
require('./base64.min.js');
Vue.prototype.AJAX=function(url,data,success,load){
    var index;
    !load&&(index=layer.open({type: 2,shadeClose:false}));
    
    const closeLoadLayout=()=>{
        typeof load==='function' ? load() : layer.close(index);
    };
    var userInfo=getStore("KA_ECS_USER");
    if(userInfo){
        data.customerId=userInfo.customerId;
        data.codeId=userInfo.codeId;
        data=BASE64.encode(JSON.stringify(data));
    }else{
         errorDeal({'code':648},closeLoadLayout);
         return false;
    }

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    axios.post(url,data).then((response) => {
        closeLoadLayout();
        if(typeof response.data==='string'){
            errorDeal('数据解析失败');
            return false;
        }
        response.data.code=="200" ? success(response.data) : errorDeal(response.data);
    }).catch((response)=>{
        let msg='';
        if (response instanceof Error) {
            msg=response.message;
        }else{
            msg=response.status;
        }
        errorDeal(msg,closeLoadLayout);
    });
};

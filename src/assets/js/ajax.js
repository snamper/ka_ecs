import Vue from 'vue';
import axios from 'axios';
import {setStore, getStore} from '../../config/utils';
require('./base64.min.js');
Vue.prototype.AJAX=function(url,data,success,closeLoad){
    var index;
    !closeLoad&&(index=layer.open({type: 2,shadeClose:false}));
    const error=function(data){
        closeLoad ? closeLoad() : layer.close(index);
        data.code=="648"||data.code=="671" ? layer.open({
            content:'登录已过期，请重新登录',
            style:'width:auto;',
            btn:['确定'],
            shadeClose:false,
            yes:function(){
                setStore("KA_ECS_USER","");
                window.location.href="#/login";
                layer.closeAll();
            }
        }) : layer.open({
            content:data.msg,
            skin: 'msg',
            time: 4,
            msgSkin:'error',
        });
    };

    var userInfo=getStore("KA_ECS_USER");;
    if(userInfo){
        data.customerId=userInfo.customerId;
        data.codeId=userInfo.codeId;
        data=BASE64.encode(JSON.stringify(data));
    }else{
         error({'code':648});
         return false;
    }

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    axios.post(url,data).then((response) => {
        typeof closeLoad==='function' ? closeLoad() : layer.close(index);
        if(typeof response.data==='string'){
            error({'code':999,'msg':'数据解析失败'});
            return false;
        }
        response.data.code=="200" ? success(response.data) : error(response.data);
    }).catch((response)=>{
        if (response instanceof Error) {
            // error({'code':999,'msg':response.message});
            console.log(response.message);
        }else{
            error({'code':999,'msg':response.status});
        }
        typeof closeLoad==='function' ? closeLoad() : layer.close(index);
    });
};

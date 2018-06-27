import Vue from 'vue'
import axios from 'axios'
require('./base64.min.js')

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
                window.localStorage.setItem('ECS_INFO','');
                window.location.href="#/login";
                layer.closeAll();
            }
        }) : layer.open({
            content:data.msg,
            skin: 'msg',
            time: 4,
            msgSkin:'error',
        })
    }
    var userInfo=localStorage.getItem('ECS_INFO');
    if(userInfo){
        data.customerId=JSON.parse(userInfo).customerId;
        data=BASE64.encode(JSON.stringify(data));
    }else{
          error({'code':648});
          return false;
    }
    
    axios.defaults.headers.post['Content-Type'] = 'text/html;charset=UTF-8;';

    axios.post(url,data).then((response) => {
        closeLoad ? closeLoad() : layer.close(index);
        if(typeof response.data==='string'){
            error({'code':999,'msg':'数据解析失败'});
            return false;
        }
        //response.data.code=="200" ? success(response.data):void 0;
         response.data.code=="200" ? success(response.data) : error(response.data);
    }).catch((response)=>{
        if (response instanceof Error) {
            console.log(response.message)
        }else{
            error({'code':999,'msg':response.status});
        }
        closeLoad ? closeLoad() : layer.close(index);
    })
}

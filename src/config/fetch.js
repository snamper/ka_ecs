import {getStore} from '../config/utils';
import store from '../store';
require('../assets/js/base64.min.js');
export default async(url = '', data = {}, type = 'GET', load, method = 'fetch') => {
	if(!load){
		var layerIndex=layer.open({type: 2,shadeClose:false});
	}
	type = type.toUpperCase();
	
	const error=(res)=>{
        typeof load==='function' ? load() : layer.close(layerIndex);
        res.code=="648"||res.code=="671" ? (layer.open({
            content:'登录已过期，请重新登录',
            style:'width:auto;',
            btn:['确定'],
            shadeClose:false,
            yes:function(){
                store.commit("SIGN_OUT");
                layer.closeAll();
            }
        }),store.commit("CLEAR_TIMER")) : layer.open({
            content:res.msg||res.statusText||res,
            skin: 'msg',
            time: 4,
            msgSkin:'error',
        });
    };
//--------------------------------------------------------------------
	let userInfo=getStore("KA_ECS_USER");
	if(userInfo){
        data.customerId=userInfo.customerId;
        data.codeId=userInfo.codeId;
    }else{
         error({'code':648});
         return false;
    }
//--------------------------------------------------------------------
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		});

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			mode: "cors",
			cache: "force-cache"
		};

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: BASE64.encode(JSON.stringify(data))
			});
		}
		
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response;
			typeof load==='function' ? load() : layer.close(layerIndex);
	        if(responseJson.status=="200"){
	        	return responseJson.json();
	        }else{
	        	error(responseJson);
	        }
		} catch (errorText) {
			
			throw new Error(errorText);
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = BASE64.encode(JSON.stringify(data));
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response;
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						typeof load==='function' ? load() : layer.close(layerIndex);
				        if(typeof obj==='string'){
				            error({'code':999,'msg':'数据解析失败'});
				            return false;
				        }else if(obj.code=="200"){
				        	resolve(obj);
				        }else{
				        	error(obj);
				        }
						
					} else {
						reject(requestObj);
					}
				}
			};
		});
	}
}
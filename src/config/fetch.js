import {getStore} from '../config/utils';
require('../assets/js/base64.min.js');
export default async(url = '', data = {}, type = 'GET', load, method = 'fetch') => {
	if(!load){
		var layerIndex=layer.open({type: 2,shadeClose:false});
	}
	type = type.toUpperCase();
	
	const error=(res)=>{
        load ? load() : layer.close(layerIndex);
        res.code=="648"||res.code=="671" ? layer.open({
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
            content:res.msg,
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
			const responseJson = await response.json();

			typeof load==='function' ? load() : layer.close(layerIndex);
	        if(typeof responseJson==='string'){
	            error({'code':999,'msg':'数据解析失败'});
	            return false;
	        }else if(responseJson.code=="200"){
	        	return responseJson;
	        }else{
	        	error(responseJson);
	        }
		} catch (error) {
			throw new Error(error);
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
import {getStore,errorDeal} from '../config/utils';

require('../assets/km/js/base64.min.js');
export default async(url = '', data = {}, type = 'GET', load, method = 'fetch') => {
	if(!load){
		var layerIndex=layer.open({type: 2,shadeClose:false});
	}
	type = type.toUpperCase();
	const closeLoadLayout=()=>{
        typeof load==='function' ? load() : layer.close(layerIndex);
    };
	
//--------------------------------------------------------------------
	let userInfo=getStore("KA_ECS_USER");
    if(url!="km_center_ecs/user/getSmsCode"&&url!="km_center_ecs/user/login"){//排除登录
		if(userInfo){
	        data.customerId=userInfo.customerId;
	        data.codeId=userInfo.codeId;
	    }else{
	         errorDeal({'code':648},closeLoadLayout);
	         return false;
	    }
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
	if (window.fetch && method == 'fetch') {//FETCH
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
        return await fetch(url,requestConfig).then((response)=>{
			closeLoadLayout();
			if(response.status=="200"){
                return response.json();
	        }else {
                
                return response.status;
	        }
        })
       
        .then(data=>{
			if(data.code==200){
                return data;
            }else{
                errorDeal(data);
                return false;
            }
        })
        .catch(error=>errorDeal(error));
		// try {
		// 	const response = await fetch(url, requestConfig);
		// 	const responseJson = await response;
        //     closeLoadLayout();
        //     // responseJson.json().then((data)=>{
        //     //     if(data.code==200){
        //     //         return data
        //     //     }
        //     // }).then((res)=>{
        //     //     debugger;
        //     //     return res;
        //     // }).catch((res)=>{
        //     //     errorDeal(res);
        //     // })
	    //     if(responseJson.status=="200"){
        //         return responseJson.json();
        //         // responseJson.json().then((data)=>{
        //         //     if(data.code==200){
        //         //         console.log(data);
        //         //         return data;
        //         //     }
        //         // }).catch((res)=>{
        //         //     errorDeal(res);
        //         // })
        //         // var res = responseJson.json();           
        //         // res.json().then((data)=>{
        //         //     return res2=data;
        //         // }).then((res2)=>{
        //         //     if(res2.code==200){
        //         //         var pp = new Promise(resolve => resolve(res2));
        //         //         console.log(pp);
        //         //     }else if(res2.code!=200){
        //         //         errorDeal(res2);
        //         //     }
        //         // });
	    //     }else{
	    //     	errorDeal(res2);
	    //     }
		// } catch (errorText) {
		// 	throw new Error(errorText);
		// }
	} else {//XHR对象
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
						let response = requestObj.response;
						if (typeof response !== 'object') {
							response = JSON.parse(response);
						}
						closeLoadLayout();
				        if(typeof response==='string'){
				            errorDeal('数据解析失败');
				        }else if(response.code=="200"){
				        	resolve(response);
				        }else{
				        	errorDeal(response);
				        }
						
					} else {
						reject(requestObj);
					}
				}
			};
		});
	}
}
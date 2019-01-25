/* eslint-disable */

import store from '../store';

/**
 * http错误处理
 */
export const errorDeal=(res,cb)=>{
    typeof cb==="function"&&cb();
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
        content:res.msg||res.statusText||res.message||res,
        skin: 'msg',
        time: 4,
        msgSkin:'error',
    });
};
/**
 * 图片地址处理函数
 */
export const imgUrlDeal = (val = '', source = '/') => {
    let host = 'https://' + window.location.host,
        env = 1;

    if(host.indexOf('km.') > -1){//3,正式环境;
        env = 3;
    }else if(host.indexOf('kmsdk.') > -1){//2,线上测试环境
        env = 2;
    }else {//1,测试环境;
        env = 1;
        host = 'https://192.168.10.110';
    }

    const doIt = (url) => {
        let temp = '/' + source,// eas,ums,tas
            n = url.match(new RegExp("^([\\S]*)/yuantel/2017(\\d{4}/[\\S]*)$"));// 匹配/yuantel/2017,并截取其后的字符

        if(null != n){//匹配到
            temp = 'https://datayuantel.oss-cn-hangzhou.aliyuncs.com' + '/yuantel/2017' + n[2];
        }else if(/http:\/\/|https:\/\//.test(url)){//绝对路径
            temp = url;
        }else {
            temp = host + temp + url;
        }

        if(!url)temp = '';

        return temp
    }
    if(typeof val === 'string'){//单个地址
        return doIt(val)
    }else {//数组对象
        val.forEach(item => {
            item.src = doIt(item.src);
        });
        return val;
    }
}
/**
 * 节流函数
 */
export const debounce = function (time, action) {
    let last
    return function () {
      let ctx = this, args = arguments
  
      clearTimeout(window.LastDebounce)
      window.LastDebounce = setTimeout(function () {
        action.apply(ctx, args)
      }, time)
    }
  }
/**
 * iframe 文件下载
 */
export const createDownload=(url,data,cb)=>{
	var body=document.getElementsByTagName("body")[0],
	ifr=document.getElementById("downLoadForm"),
    form = document.createElement("form"),
    input = document.createElement("input");
    if(!ifr){
    	ifr=document.createElement("iframe");
    	ifr.setAttribute("id","downLoadForm");
    	ifr.setAttribute("name","downLoadForm");
    	ifr.setAttribute("style","display:none");
    }
    cb();
    ifr.addEventListener("load",function(e){
    	try{
            var res = ifr.contentWindow.document.body.textContent;
            if(res!=''&&res.indexOf('code')>-1){
                var result=JSON.parse(res);
                if(res.code!=200){
                    errorDeal(result);
                }
            }
    	}catch(error){
    		errorDeal(error);
    	}
    });
    
    form.setAttribute("style","display:none");
    form.setAttribute("target","downLoadForm");
    form.setAttribute("enctype","application/x-www-form-urlencoded;charset=utf-8");
    form.setAttribute("method","post");
    form.setAttribute("action",url);

    input.setAttribute("type","hidden");
    input.setAttribute("name","data");
    input.setAttribute("value",data);

    body.appendChild(ifr);
    body.appendChild(form);

    form.appendChild(input);
    form.submit();
    form.remove();
};
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	let content=window.localStorage.getItem(name);
	return content?JSON.parse(content):'';
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
/**
 * 时间戳格式化
 */
export const getDateTime= e =>{
    var t;
    if(!e||e=='null'||e=='0')return ['--','--','--','--','--','--','--'];
    t = new Date(parseInt(e));
    var n = t.getFullYear(),
        a = t.getMonth()+1,
        r = t.getDate(),
        o = t.getHours(),
        i = t.getMinutes(),
        c = t.getSeconds(),
        k = [];
    a >= 10 ? a : a = "0" + a, r >= 10 ? r : r = "0" + r, o >= 10 ? o : o = "0" + o, i >= 10 ? i : i = "0" + i, c >= 10 ? c : c = "0" + c, k[0]=n,k[1]=a,k[2]=r,k[3]=n+'-'+a,k[4]=a+'-'+r,k[5]=o+":"+i+":"+c,k[6]=n + "-" + a + "-" + r + " " + o + ":" + i + ":" + c,k[7]=o+":"+i,k[8]=n+'-'+a+'-'+r;
    return k;
}
/**
 * 日期转时间戳
 */
export const getUnixTime= e =>{
	var t;
	if(e){
		e=e.replace(/-/g,'/');
		t=new Date(e);
	}else t= new Date();
	return t.getTime().toString();
}
/**
 * 秒数格式化
 */
export const secondsFormat=(v)=>{
	v=parseInt(v);
    var day,minute,second,hour;
    day=Math.floor(v/(60*60*24));
    hour=Math.floor(v%(60*60*24)/(60*60));
    minute=Math.floor(v%(60*60)/60);
    second=Math.floor(v%60);
    hour<10&&(hour='0'+hour);
    minute<10&&(minute='0'+minute);
    second<10&&(second='0'+second);
    return day!='00' ? day+"天"+hour+":"+minute+":"+second : 
	    hour!='00' ? hour+":"+minute+":"+second : 
	    minute!='00' ? "00:"+minute+":"+second : "00:00:"+second;
}
/**
 * 开卡订单-数据翻译
 */
export const translateData=(type,v)=> {
	v=parseInt(v);
	switch(type){
		case 1://操作类型
				return v==1 ? '开成卡' : v==2 ? '开白卡' :v==3? '--' : v==4 ? '实名补登' : v==5 ? '实名登记' :v==6 ? '开空卡' : v==7 ? '过户办理' : v==8 ? '补换卡' :  '--';
			break;
		case 2://证件类型
				return v==1 ? '身份证' : v==2 ? '军官证' : v==3 ? '护照' : v==6 ? '居住证' : void 0;
			break;
		case 3://卡盟统计报表查询操作类型
                return v==1 ? '开卡' : v==2 ? '激活商户' : v==3 ? '过户' : v==4 ? '实名补登' : v==5 ? '补换卡' : '--';
			break;
		case 4://号卡状态
			    return v==1 ? '初始状态' : v==2 ? '成功' : v==3 ? '失败' : v==4 ? '订单关闭' : '--';
		    break;
		case 5://靓号等级
			var level=["普号","特级","一级","二级","三级","四级","五级","六级","七级","八级","九级","十级","十一级"];
                return v||v==='0' ? level[parseInt(v)] : '未知';
			break;
		case 7://进行中，已关闭，订单状态
			    return v==1||v==1000 ? '已选号' : v==2||v==1001 ? '已选套餐' : v==3||v==1003 ? '已上传资料' : v==4||v==1004 ? '已支付' : v==5||v==1005 ? '已审核' : v==6||v==1006 ? '已审核，待支付' : v==7||v==1007 ? '已获取IMSI' : v==8||v==1008 ? '已开卡申请' : v==0 ? '--' :void 0;
            break;
        case 8://进行中，已关闭的补换卡订单状态
                return v==1||v==1001 ? '已上传资料' : v==2||v==1002 ? '已审核' : v==3||v==1003 ? '生成受理单' : v==4||v==1004 ? '已提交受理单' : v==5||v==1005 ? '已获取imsi' : v==6||v==1006 ? '已申请换补卡' : v==7||v==1007 ? '已收到回调' : void 0;
            break;
        case 9://卡盟统计报表查询设备类型
                return v==1 ? '森瑞' : v==2 ? '握奇' : v==3 ? '卡尔' : '--';
            break;
        case 10://开卡码号类型 
                return v==-1 ? '全部' : v==0 ? '大众号' : v==1 ? '大众专营号' : v==2 ? '专属专营号':'--';
            break;
        case 11://开卡当前状态
                return v==1001 ? '生成订单' : v==1002 ? '支付' : v==1003 ? '获取imsi' : v==1004 ? '写卡成功':'--';
            break;
        case 12://开卡制卡付款方式
                return v==1 ? '远特账户' : v==2 ? '微信' : v==3 ? '支付宝' : v==0 ? '未支付' : '--';
            break;
        case 13://开卡制卡结果
                return v==1 ? '进行中' : v==2 ? '制卡成功' : v==3 ? '制卡失败' : v==4 ? '订单关闭':v==5 ? '已激活':'--';
            break;
        case 14://卡类型
                return v==4 ? '成卡' : v==5 ? '白卡' : v==6 ? '空卡' : '--';
            break;
        case 15://开卡方式
                return v==1 ? '卡盟APP' : v==6 ? '远微商城' : v==7 ? '信时空公众号' : v==8? '开卡盟成卡':v==9? '新零售':v==10? '小程序':'--' ;
            break;
        case 16://短信验证
                return v==1?'是':v==0?'否':'--';
            break;
        case 17://号卡状态
                return v==4?'开成卡':v==5?'开白卡':v==6?'开空卡':v==7?'过户':v==8?'实名补登':v==9?'补换卡':'--';
            break;
        case 18://号卡状态
            return v==0?'未激活':v==1?'预占':v==2?'成卡':v==3?'已激活':'--';
        break;
        case 19:
            return v==0?'非成卡开卡':v==1?'卡盟app':v==2?'sdk':v==3?'dwatch':v==4?'wear':v==5?'i卡':v==6?'远微商城':v==7?'信时空公众号':v==8?'亚飞达s2s开成卡':v==9?'新零售':v==10?'小程序':'--';
        break;
        case 20://远特i卡
            return v==1 ? '远特i卡' : v==2 ? '远特eSIM' : v==3 ? 'SDK' : v==4 ? 'eSIM助手' : v==5 ? '国星卡' : '--'
            break;
        case 'money'://金额转换
            if(!isNaN(v)){
                return (v/100).toFixed(2)
            }else{
                return '--'
            }
        case 'formatPhone'://格式化手机号
            v=v+"";
            return `${v.slice(0,3)} ${v.slice(3,7)} ${v.slice(7,8)}`
	}
}
/**
 * 
 * 
 */
export const to_laydate=(t,v)=>{
    var vm=t;
    laydate({
        istime:true,
        format: 'YYYY-MM-DD hh:mm:ss',
        isclear: false,
        choose: function(dates){ //选择好日期的回调
        v==1 ? vm.form.startTime=dates : vm.form.endTime=dates;
        }
    });
}

export const powerKm=(v)=>{
    let vm=v,powerKm=vm.userInfo.rightCodes;
    powerKm=powerKm.split(',');
    for(let i in powerKm){
        if(powerKm[i].indexOf('1')>-1){
            var powerKm_yjfk=powerKm[i]//意见反馈模块
        }else if(powerKm[i].indexOf('2')>-1){
            var powerKm_hyy=powerKm[i]//欢迎页
        }else if(powerKm[i].indexOf('3')>-1){
            var powerKm_hmzy=powerKm[i]//号码占用解冻
        }else if(powerKm[i].indexOf('4')>-1){
            var powerKm_hmd=powerKm[i]//黑名单
        }else if(powerKm[i].indexOf('5')>-1){
            var powerKm_kk=powerKm[i]//开卡
        }else if(powerKm[i].indexOf('6')>-1){
            var powerKm_sh=powerKm[i]//审核
        }else if(powerKm[i].indexOf('7')>-1){
            var powerKm_bb=powerKm[i]//报表
        }else if(powerKm[i].indexOf('8')>-1){
            var powerKm_jbpz=powerKm[i]//基本配置
        }else if(powerKm[i].indexOf('9')>-1){
            var powerKm_xghm=powerKm[i]//修改成卡验证号码
        }
    }
    for(let _i in powerKm_yjfk){//意见反馈
        if(powerKm_yjfk[_i]=='a'){
            vm.off.powerKm_yjfk_sh=true;
        }if(powerKm_yjfk[_i]=='b'){
            vm.off.powerKm_yjfk_cx=true;
        }if(powerKm_yjfk[_i]=='c'){
            vm.off.powerKm_yjfk_xz=true;
        }if(powerKm_yjfk[_i]=='d'){
            vm.off.powerKm_yjfk_xg=true;
        }if(powerKm_yjfk[_i]=='e'){
            vm.off.powerKm_yjfk_sc=true;
        }
    }
    for(let _i in powerKm_hyy){//欢迎页
        if(powerKm_hyy[_i]=='a'){
            vm.off.powerKm_hyy_sh=true;
        }if(powerKm_hyy[_i]=='b'){
            vm.off.powerKm_hyy_cx=true;
        }if(powerKm_hyy[_i]=='c'){
            vm.off.powerKm_hyy_xz=true;
        }if(powerKm_hyy[_i]=='d'){
            vm.off.powerKm_hyy_xg=true;
        }if(powerKm_hyy[_i]=='e'){
            vm.off.powerKm_hyy_sc=true;
        }
    }
    for(let _i in powerKm_hmzy){//号码占用
        if(powerKm_hmzy[_i]=='a'){
            vm.off.powerKm_hmzy_sh=true;
        }if(powerKm_hmzy[_i]=='b'){
            vm.off.powerKm_hmzy_cx=true;
        }if(powerKm_hmzy[_i]=='c'){
            vm.off.powerKm_hmzy_xz=true;
        }if(powerKm_hmzy[_i]=='d'){
            vm.off.powerKm_hmzy_xg=true;
        }if(powerKm_hmzy[_i]=='e'){
            vm.off.powerKm_hmzy_sc=true;
        }
    }
    for(let _i in powerKm_hmd){//黑名单
        if(powerKm_hmd[_i]=='a'){
            vm.off.powerKm_hmd_sh=true;
        }if(powerKm_hmd[_i]=='b'){
            vm.off.powerKm_hmd_cx=true;
        }if(powerKm_hmd[_i]=='c'){
            vm.off.powerKm_hmd_xz=true;
        }if(powerKm_hmd[_i]=='d'){
            vm.off.powerKm_hmd_xg=true;
        }if(powerKm_hmd[_i]=='e'){
            vm.off.powerKm_hmd_sc=true;
        }
    }
    for(let _i in powerKm_xghm){//
        if(powerKm_xghm[_i]=='a'){
            vm.off.powerKm_xghm_sh=true;
        }if(powerKm_xghm[_i]=='b'){
            vm.off.powerKm_xghm_cx=true;
        }if(powerKm_xghm[_i]=='c'){
            vm.off.powerKm_xghm_xz=true;
        }if(powerKm_xghm[_i]=='d'){
            vm.off.powerKm_xghm_xg=true;
        }if(powerKm_xghm[_i]=='e'){
            vm.off.powerKm_xghm_sc=true;
        }
    }
    for(let _i in powerKm_kk){//开卡
        if(powerKm_kk[_i]=='a'){
            vm.off.powerKm_kk_sh=true;
        }if(powerKm_kk[_i]=='b'){
            vm.off.powerKm_kk_cx=true;
        }if(powerKm_kk[_i]=='c'){
            vm.off.powerKm_kk_xz=true;
        }if(powerKm_kk[_i]=='d'){
            vm.off.powerKm_kk_xg=true;
        }if(powerKm_kk[_i]=='e'){
            vm.off.powerKm_kk_sc=true;
        }
    }
    for(let _i in powerKm_sh){//商户
        if(powerKm_sh[_i]=='a'){
            vm.off.powerKm_sh_sh=true;
        }if(powerKm_sh[_i]=='b'){
            vm.off.powerKm_sh_cx=true;
        }if(powerKm_sh[_i]=='c'){
            vm.off.powerKm_sh_xz=true;
        }if(powerKm_sh[_i]=='d'){
            vm.off.powerKm_sh_xg=true;
        }if(powerKm_sh[_i]=='e'){
            vm.off.powerKm_sh_sc=true;
        }
    }
    for(let _i in powerKm_bb){//报表
        if(powerKm_bb[_i]=='a'){
            vm.off.powerKm_bb_sh=true;
        }if(powerKm_bb[_i]=='b'){
            vm.off.powerKm_bb_cx=true;
        }if(powerKm_bb[_i]=='c'){
            vm.off.powerKm_bb_xz=true;
        }if(powerKm_bb[_i]=='d'){
            vm.off.powerKm_bb_xg=true;
        }if(powerKm_bb[_i]=='e'){
            vm.off.powerKm_bb_sc=true;
        }
    }
    for(let _i in powerKm_jbpz){//基本配置
        if(powerKm_jbpz[_i]=='a'){
            vm.off.powerKm_jbpz_sh=true;
        }if(powerKm_jbpz[_i]=='b'){
            vm.off.powerKm_jbpz_cx=true;
        }if(powerKm_jbpz[_i]=='c'){
            vm.off.powerKm_jbpz_xz=true;
        }if(powerKm_jbpz[_i]=='d'){
            vm.off.powerKm_jbpz_xg=true;
        }if(powerKm_jbpz[_i]=='e'){
            vm.off.powerKm_jbpz_sc=true;
        }
    }
}
export const getKmMenu=()=>{
    var powerKm1a=false,powerKm1b=false,powerKm5a=false,powerKm5b=false,powerKm6a=false,powerKm6b=false;//定义权限，根据权限进行路由重定向
    if(typeof (getStore('KA_ECS_USER').rightCodes)!="undefined"){
        var powerKm=getStore('KA_ECS_USER').rightCodes;
    }else{return false}
    powerKm=powerKm.split(',');
    for(let i in powerKm){
        if(powerKm[i].indexOf('1')>-1){
            var powerKm1=powerKm[i]
        }
        if(powerKm[i].indexOf('5')>-1){
            var powerKm5=powerKm[i]
        }
        if(powerKm[i].indexOf('6')>-1){
            var powerKm6=powerKm[i]
        }
        for(let _i in powerKm1){
            if(powerKm1[_i]=='a'){
              powerKm1a=true//意见反馈审核
            }
            if(powerKm1[_i]=='b'){
              powerKm1b=true//意见反馈查询
            }
        }
        for(let _i in powerKm5){
            if(powerKm5[_i]=='a'){
               powerKm5a=true//开卡审核
            }
            if(powerKm5[_i]=='b'){
               powerKm5b=true//开卡查询
            }
        }
        for(let _i in powerKm6){
            if(powerKm6[_i]=='a'){
               powerKm6a=true//商户审核                  
            }
            if(powerKm6[_i]=='b'){
               powerKm6b=true//商户查询                  
            }
        }
    }
    return({"powerKm1a":powerKm1a,"powerKm1b":powerKm1b,"powerKm5a":powerKm5a,"powerKm5b":powerKm5b,"powerKm6a":powerKm6a,"powerKm6b":powerKm6b})
}


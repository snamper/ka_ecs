
<!--**
  *@info 统计下载模块-软件使用次数统计
  *@author: thinkmix
  *@date 2017-11-16
* *-->
<style scoped>
  .form-c.o-no-bgc>.row .text{
  	width: auto;
  }
  .m-sub-page>.fl{
  	padding: 20px;
  }
  .m-sub-page>.fl>.f-btn{
  	padding: 8px;
  }
</style>
<template>
<section class="g-search-menu">
  <div id="search" :class="{active:off.details}">
  	<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
    <section class="m-occlusion" :class="{active:off.isLoad}"></section>
  	<!--查询-->
  	<section v-if="!off.details">
  	<div class="g-search-form">
		<div class="m-tag"><b></b>条件查询</div>
		<section class="form-c">	
			<div class="row fullRow">
				<span class="dp">系统类型：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.appType"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.appType"><span></span></span><span class="text">卡盟APP</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.appType"><span></span></span><span class="text">Dwatch</span></label>
					<label><span class="radio"><input type="radio" value="3" v-model="form.appType"><span></span></span><span class="text">Android Wear</span></label>
					<label><span class="radio"><input type="radio" value="4" v-model="form.appType"><span></span></span><span class="text">卡盟SDK</span></label>
					<label><span class="radio"><input type="radio" value="5" v-model="form.appType"><span></span></span><span class="text">卡盟通服</span></label>
				</div>
			</div>
			<div class="row clr m-col-2">
				<span class="dp col-l">操作人ID：</span>
				<div class="col-r">
					<div class="input-box"><input v-model="form.userId" maxlength="16" type="tel" placeholder="请输入查询的操作人ID"></div>
				</div>
			</div>
			<div class="row clr m-col-2">
				<span class="dp col-l">订单号码：</span>
				<div class="col-r">
					<div class="input-box"><input v-model="form.orderId" maxlength="32" type="tel" placeholder="请输入查询的订单号码"></div>
				</div>
			</div>
			<div class="row clr m-col-2" v-show="off.type==1||off.type==2">
				<span class="dp col-l">身份证号：</span>
				<div class="col-r">
					<div class="input-box"><input v-model="form.idCardNo" maxlength="18" type="tel" placeholder="请输入查询的身份证号"></div>
				</div>
			</div>
			<div class="row clr m-col-2">
				<span class="dp col-l">操作号码：</span>
				<div class="col-r">
					<div class="input-box"><input v-model="form.phoneNo" maxlength="11" type="tel" placeholder="请输入查询的操作号码"></div>
				</div>
			</div>
			<div class="row">
				<span class="dp">时间区间：</span>
				<div class="f-inline-block">
					<span class="m-time-area"><input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
				</div>
			</div>
			<div class="row">
				<span class="dp">设备类型：</span>
				<div class="m-form-radio" v-show="off.type==1||off.type==3">
					<label><span class="radio"><input type="radio" value="0" v-model="form.deviceId"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.deviceId"><span></span></span><span class="text">森锐</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.deviceId"><span></span></span><span class="text">握奇</span></label>
					<label v-if="off.type!=3"><span class="radio"><input type="radio" value="3" v-model="form.deviceId"><span></span></span><span class="text">卡尔</span></label>
				</div>
				<div class="m-form-radio" v-show="off.type==2">
					<label><span class="radio"><input type="radio" value="0" v-model="form.deviceId"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.deviceId"><span></span></span><span class="text">旷视</span></label>
				</div>
			</div>
			
			<div class="row">
				<span class="dp">操作类型：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.operation"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.operation"><span></span></span><span class="text">开卡</span></label>
					<label v-if="off.type!=3"><span class="radio"><input type="radio" value="2" v-model="form.operation"><span></span></span><span class="text">激活商户</span></label>
					<label v-if="off.type!=3"><span class="radio"><input type="radio" value="3" v-model="form.operation"><span></span></span><span class="text">过户办理</span></label>
					<label v-if="off.type!=3"><span class="radio"><input type="radio" value="4" v-model="form.operation"><span></span></span><span class="text">实名补登</span></label>
					<label v-if="off.type!=3"><span class="radio"><input type="radio" value="5" v-model="form.operation"><span></span></span><span class="text">换补卡</span></label>
				</div>
			</div>
			<div class="row">
				<span class="dp">终端类型：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="0" v-model="form.terminalType"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.terminalType"><span></span></span><span class="text">IOS</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.terminalType"><span></span></span><span class="text">Android</span></label>
				</div>
			</div>
			<div class="row">
				<span class="dp">识别状态：</span>
				<div class="m-form-radio">
					<label><span class="radio"><input type="radio" value="-1" v-model="form.result"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="1" v-model="form.result"><span></span></span><span class="text">成功</span></label>
					<label><span class="radio"><input type="radio" value="0" v-model="form.result"><span></span></span><span class="text">失败</span></label>
				</div>
			</div>
			<button class="f-btn f-btn-line" @click="searchList(2)">查询</button>
		</section>
  	</div>
  	<div class="m-total-table" v-if="list">
		<div class="total-head">统计结果<b>{{total}}</b></div>
		<table>
			<thead>
				<tr>
					<th>序号</th>
					<th>操作人
					<th>识别时间</th>
					<th>终端类型</th>
					<th>设备类型</th>
					<th>订单号码</th>
					<th>系统类型</th>
					<th>操作类型</th>
					<th v-show="off.type==1||off.type==2">身份证号码</th>
					<th>用户号码</th>
					<th>状态</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(todo,index) in list" :key="index">
					<td>{{ (pageNum-1)*pageSize+(index+1) }}</td>
					<td>{{ todo.userId }}<br/>（{{todo.userName}}）</td>
            <td>
                <span v-show="off.type==1||off.type==2">{{ getDateTime(todo.readTime)[6] }}</span>
                <span v-show="off.type==3">{{ getDateTime(todo.writeTime)[6] }}</span>
            </td>
					<td>
						<span v-show="todo.terminalType==1">IOS</span>
						<span v-show="todo.terminalType==2">Android</span>
					</td>
					<td>
						<span v-show="off.type==1||off.type==3">
              {{translateData(9,todo.deviceId)}}
						</span>
						<span v-show="off.type==2">
							<label v-show="todo.deviceId==1">旷视</label>
						</span>
					</td>
					<td>{{ todo.orderId||'--' }}</td>
					<td>
						<span v-show="todo.appType==1">卡盟APP</span>
						<span v-show="todo.appType==2">Dwatch</span>
						<span v-show="todo.appType==3">Android wear</span>
						<span v-show="todo.appType==4">卡盟SDK</span>
						<span v-show="todo.appType==5">卡盟通服</span>
					</td>
					<td>
						<span>{{translateData(3,todo.operation)}}</span>
					</td>
					<td v-show="off.type==1||off.type==2">{{ todo.idCardNo||'--' }}</td>
					<td>{{ todo.phoneNo||'--' }}</td>
					<td>
						<span v-show="todo.result==0" class="f-c-red">失败 : {{todo.errorMsg||'--'}} </span>
						<span v-show="todo.result==1" class="f-c-green">成功</span>
					</td>
				</tr>
			</tbody>
		</table>
		<section class="m-sub-page clr">
			<div class="fl" v-if="maxpage">
				<a href="javascript:void(0)" @click="downLoadList" class="f-btn f-btn-success">导出EXCEL</a>
				<iframe id="loadIframe" src="" style="padding: 0;margin:0;width: 0;height: 0;opacity: 0" frameborder="0"></iframe>
			</div>
			<my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
		</section>
	</div>
	</section>
	<!--详情-->
	<list-details :list="detailsData" :type="off.type" v-if="off.details" :number="off.number">
	
	</list-details>
  </div>
</section>
</template>
<script>
import {reqCommonMethod} from "../../../config/service.js";
import pagination from "../../../componentskm/page.vue";
import { getDateTime,getUnixTime,errorDeal } from "../../../config/utils.js";
import {setStore, getStore, createDownload,translateData} from '../../../config/utils';
export default{
	data (){
		return {
			off:{
				type:1,//1，身份识别；2，活体识别
				isLoad:0,//加载条
			},
			form:{
				orderId:'',//订单号码
				idCardNo:'',//身份证号码
				phoneNo:'',//操作号码
				operation:0,//操作类型
				appType:0,//系统类型
				userId:'',//用户工号
				deviceId:0,//设备类型
				terminalType:0,//终端类型
				result:-1,//识别结果
				startTime:'',
				endTime:'',
			},
			list:'',//列表数据
			total:0,//总查询条数
			pageNum:1,//当前页数
			pageSize:10,//显示条数
			maxpage:1,//最大页数
			callback:Function//page组件点击回调
		}
	},
	components:{
		'my-page':pagination,
	},
	created:function(){
		this.init();
		this.changeRouter();
	},
	watch:{
		'$route':'changeRouter'
	},
	methods:{
		init:function(){
			var vm=this;
			vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
			vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
		},
		searchList(index,page){//充值订单
			var vm=this,url,
				json={
					"userId":vm.form.userId,
					"pageSize":vm.pageSize,
					"pageNum":page||1,
					"startTime":vm.form.startTime,
					"endTime":vm.form.endTime,
					"terminalType":vm.form.terminalType,
					"deviceId":vm.form.deviceId,
					"result":vm.form.result,
					"orderId":vm.form.orderId,
					"phoneNo":vm.form.phoneNo,
					"operation":vm.form.operation,
					"appType":vm.form.appType,
				};
			if(vm.off.type==1){
        url="km-ecs/w/statistics/identifier";
        json.idCardNo=vm.form.idCardNo;
			}else if(vm.off.type==2){
        url="km-ecs/w/statistics/identifierLive";
        json.idCardNo=vm.form.idCardNo;
			}else if(vm.off.type==3){
				url="km-ecs/w/statistics/writecard";
      }
			vm.off.isLoad=true;
      reqCommonMethod(json,function(){vm.off.isLoad=false;},url)
      .then((data)=>{
        vm.list=data.data.list;
				vm.total=data.data.total;
				vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
				vm.pageNum=page||1;
        vm.callback=function(v){vm.searchList(index,v)};
      }).catch(error=>errorDeal(error)); 	            
		},
		downLoadList:function(){//导出EXCEL
			var vm=this,url,userInfo=getStore("KA_ECS_USER");
		    if(!userInfo){
					layer.open({
						content:'登录已过期，请重新登录',
						style:'width:auto;',
						btn:['确定'],
						shadeClose:false,
						yes:function(){
							setStore("KA_ECS_USER","");
							window.location.href="#/login";
							layer.closeAll();
						}
					});
					return false;
		    }
			var json={
				"userId":vm.form.userId,
				"pageSize":vm.pageSize,
				"pageNum":vm.page||1,
				"startTime":vm.form.startTime,
				"endTime":vm.form.endTime,
				"terminalType":vm.form.terminalType,
				"deviceId":vm.form.deviceId,
				"result":vm.form.result,
				"customerId":userInfo.customerId,
				"codeId":userInfo.codeId,
				"orderId":vm.form.orderId,
				"phoneNo":vm.form.phoneNo,
				"operation":vm.form.operation,
				"appType":vm.form.appType,
			};
			if(vm.off.type==1){
        url="km-ecs/w/statistics/identifierListdown";
        json.idCardNo=vm.form.idCardNo;
			}else if(vm.off.type==2){
        url="km-ecs/w/statistics/identifierLivedown";
        json.idCardNo=vm.form.idCardNo;
			}else if(vm.off.type==3){
				url="km-ecs/w/statistics/writecarddown";
      }
			vm.off.load=true;
			createDownload(url,BASE64.encode(JSON.stringify(json)),function(){
				vm.off.load=false;
			});
		},
		to_laydate:function(v){
			var vm=this;
			laydate({
				istime:true,
				format: 'YYYY-MM-DD hh:mm:ss',
				isclear: false,
				choose: function(dates){ //选择好日期的回调
					v==1 ? vm.form.startTime=dates : vm.form.endTime=dates;
				}
			});
		},
		getDateTime(v){
			return getDateTime(v);
		},
		changeRouter(){
			let type=this.$route.params.type
			if(type=="idCard"){//身份证识别
				this.off.type=1;
			}else if(type=="faceConfirm"){//活体识别
				this.off.type=2;
			}else if(type=="writeCard"){//写卡记录
				this.off.type=3;                
      }
		    this.list='';
    },
    translateData(t,v){
      return translateData(t,v);
    },
	}
}
</script>


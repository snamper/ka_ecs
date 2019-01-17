<style scoped>
  
  .grey{
      background: grey;
      border: 1px solid grey;
      color: black;
  }
</style>
<template>
  <div id="search" :class="{active:off.details}">
	<layerForm v-cloak v-if="off.layerState==true"></layerForm>	
  	<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
    <section class="m-occlusion" :class="{active:off.isLoad}"></section>
  	<!--查询-->
  	<section>
  	<div class="g-search-form">
		<div class="m-tag"><b></b>订单查询</div>
		<section class="form-c">
			<div class="row clr m-col-2">
				<span class="dp col-l">订单号码：</span>
				<div class="col-r m-input-button"><input v-model="form.context1" maxlength="30" type="tel" placeholder="请输入订单号码"><button @click="searchList('order')">查询</button></div>
			</div>
		</section>
		<!-- 条件查询 -->
  	    <div class="m-tag"><b></b>条件查询</div>
  	    <section class="form-c">
  	    	<div class="row40 clr m-col-2">
				<div class="dp col-l">时间区间:&nbsp;&nbsp;&nbsp;</div>
				<div class="col-r">
					<span class="m-time-area" @click="to_laydate(1)"><input id="start" v-model="form.startTime" type="text" readonly="readonly"></span>
					<span class="m-space">一</span>
					<span class="m-time-area" @click="to_laydate(2)"><input id="end" v-model="form.endTime" type="text" readonly="readonly"></span>
				</div>
			</div>
		</section>
		<section class="form-c o-no-bgc">
			<div class="row" :class="{active:form.select==2}">
				<span class="m-form-radio">
					<label><span class="radio"><input @click="isChe" type="radio" value="2" v-model="form.select"><span></span></span><span class="text">用户ID：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context2" :readonly="form.select!=2" maxlength="13" type="tel" placeholder="请输入用户ID"></div>
			</div>
			<div class="row" :class="{active:form.select==3}">
				<span class="m-form-radio">
					<label><span class="radio"><input @click="isChe" type="radio" value="3" v-model="form.select"><span></span></span><span class="text">开卡号码：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context3" :readonly="form.select!=3" maxlength="13" type="tel" placeholder="请输入开卡号码"></div>
			</div>
			<button class="f-btn f-btn-line" @click="searchList('condition')">查询</button>
		</section>
  	</div>	
  	<div id="totalDiv" v-if="list">
  	<div v-if="off.getPoints==1" class="total-head">查询结果</div>
  	<div v-if="off.getPoints==1">
  		<table class="pointsSearchTab">
			<thead>
				<tr>
					<th>序号</th>
					<th>订单号码</th>
					<th>开卡号码</th>
					<th>订单创建时间</th>
					<!-- <th>开卡结果</th> -->
					<th>未送积分原因</th>
                    <th>积分赠送结果</th>
                    <th>赠送积分</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(todo,index) in detailsData" :key="index">
					<td>{{index+1}}</td>
					<td>{{todo.orderId}}</td>
					<td>{{todo.phone}}</td>
					<td>{{todo.createTime}}</td>
					<!-- <td>{{todo.result}}</td> -->
					<td>{{todo.reason}}</td>
                    <td>
                        <span v-if="todo.giveResult==1">已赠送</span>
                        <span v-if="todo.giveResult==2">未赠送</span>
                    </td>
                    <td>{{todo.give}}</td>
					<th><button class="btnPoints" :class="{grey:todo.giveResult==1}" :disabled="todo.giveResult==1" :title="todo.orderId" @click="openinput('add')">补积分</button></th>
				</tr>
			</tbody>
		</table>
        <section class="m-sub-page clr">
		    <my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>		
        </section>
	</div>
    </div>
	</section>
	<!--详情-->
  </div>
</template>
<script>
import pagination from "@/componentskm/page.vue";
import details from "../searchListDetails.vue";
import layerForm from '../layerForm.vue'
import {setStore, getStore, createDownload,errorDeal} from '@/config/utils';
import {reqCommonMethod} from "@/config/service.js";
import axios from 'axios';
export default{
	name:'search',
	data (){
		return {
			off:{
				type:1,//1，待审核；2，已审核
				isLoad:0,//加载条
				details:0,//详情页面开关
				number:'',//第几条详情
				points:'0',//点击积分兑换的结果
				layerState:'0',//点击兑换的结果
				result:'0',//点击查询的结果
				getPoints:'0',//点击积分获取详情结果
				exPoints:'0'//点击积分兑换详情结果
			},
			form:{
				source:0,//系统名称
				orderType:[1,2,6,4,5],//操作类型
				auditType:0,//审核方式
				orderStatus:3,//订单状态
				context1:'',//订单号码
				context2:'',//手机号码
				context3:'',//审核人工号
				context4:'',//身份证号
				context5:'',// type=5时订单状态
				context6:'',//操作者工号
				context7:9,//开卡状态
				startTime:'',
				endTime:'',
				select:''//条件查询，选择的条件
			},
			list:{},//查询数据
            detailsData:'',//详情数据
			total:0,//总查询条数
			pageNum:1,//当前页数
			pageSize:20,//显示条数
			maxpage:1,//最大页数
			callback:Function,//page组件点击回调
			exchangeNum:'',
			extotal:0,
			exdetailsData:'',
            exmaxpage:1,
            staffNo:'',
            depId:'',
            dh:'',
            btntype:'',
            orderId:'',
		}
	},
	components:{
		'my-page':pagination,
		'list-details':details,
		'layerForm':layerForm
	},
	created:function(){
		this.init()
	},
	methods:{
		init:function(){
			var vm=this;
			vm.form.startTime=laydate.now(-30,'YYYY-MM-DD 00:00:00');
			vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
		},
		to_laydate:function(v){
			var vm=this,el='';
			v==1 ? el='#start' : el='#end';
			laydate({
				elem:el,
				istime:true,
				format:'YYYY-MM-DD hh:mm:ss',
				isclear:false,
				choose: function(dates){ //选择好日期的回调
					v==1 ? vm.form.startTime=dates : vm.form.endTime=dates;
				}
			});
		},
		isChe:function(){
			this.form.select='';
        },
        openinput:function(v){//增加积分
            let vm =this;
            vm.whichLayer = '2';
            vm.off.layerState=true;
            vm.orderId=event.target.title;
        },
		searchList:function(type,page){
            let vm = this,url,json={"type": "","orderId": "","phone": "","startTime": "","endTime": "","staffNo":""};
			let s = this.form.select;
            let context = vm.form['context'+vm.form.select];
            vm.detailsData=[];
			if(type=='order'){//订单号查询
                vm.btntype='1';
                json.type = '1';
				json.startTime='0';
				json.endTime='0';
				json.orderId = vm.form.context1;
				if(json.orderId !== ''){
				json = vm.trim(JSON.stringify(json));
                json = JSON.parse(json);
                if (vm.off.isLoad) return false;
                vm.off.isLoad = true;
			    //  vm.AJAX('c/user/queryOrderFill',json,function(response){ 
			    //   	if(response.code==200){
			    //      vm.list = response.data;
			    //      vm.detailsData=response.data.list;
                //      vm.off.getPoints='1';
                //      vm.off.isLoad = false;
			    //   	}else if(response.code!=200){
				//      vm.off.getPoints='0';
			    //   	}
                //  });
                reqCommonMethod(json,function(){vm.off.isLoad=false;},"ym-ecs/c/user/queryOrderFill")
                .then((response)=>{
                    if(response.code==200){
			         vm.list = response.data;
			         vm.detailsData=response.data.list;
                     vm.off.getPoints='1';
                     vm.off.isLoad = false;
			      	}else if(response.code!=200){
				     vm.off.getPoints='0';
                      }
                      vm.off.isLoad=false;
                }).catch(error=>errorDeal(error));                   
				}else{
					layer.open({
			          content:'请输入订单号码',
			          skin: 'msg',
			          time: 2,
			          msgSkin:'error',
			        })
				}
			}else if(type=='condition'){//条件查询
                if(vm.form.select==""){
                    layer.open({
		            content:'请输入查询条件',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
				    vm.off.getPoints=='0';
		        	return false;
                }else if(vm.form.select==2&&(!context)){
					layer.open({
		            content:'请输入用户ID',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
				    vm.off.getPoints=='0';
		        	return false;
				}else if(vm.form.select==3&&(!context)){
					layer.open({
		            content:'请输入开卡号码',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
				    vm.off.getPoints=='0';
		        	return false;
				}
				if(s=='2'){
                    vm.btntype='3';
                    json.type='3';
					json.staffNo = context;
				}else if(s=='3'){
                    vm.btntype='2';
					json.type = '2';
					json.phone = context;
				}	
				json.startTime=Date.parse(vm.form.startTime);
				json.endTime=Date.parse(vm.form.endTime);
				json = vm.trim(JSON.stringify(json));
                json = JSON.parse(json);
                if (vm.off.isLoad) return false;
                vm.off.isLoad = true;
				// vm.AJAX('c/user/queryOrderFill',json,function(response){
				// 	if(response.code==200){
			    //      vm.list = response.data;
				// 	 vm.detailsData=response.data.list;
				// 	 vm.pageNum=page||1;
				//      vm.callback=function(v){vm.searchList(type,v)};
                //      vm.off.getPoints='1';
                //      vm.off.isLoad = false;
			    //   	}else if(response.code!=200){
				//      vm.off.getPoints='0';
			    //   	}						
                // });
                reqCommonMethod(json,"","ym-ecs/c/user/queryOrderFill")
                .then((response)=>{
                    if(response.code==200){
			         vm.list = response.data;
					 vm.detailsData=response.data.list;
					 vm.pageNum=page||1;
				     vm.callback=function(v){vm.searchList(type,v)};
                     vm.off.getPoints='1';
                     vm.off.isLoad = false;
			      	}else if(response.code!=200){
				     vm.off.getPoints='0';
                      }
                      vm.off.isLoad=false;
                }).catch(error=>errorDeal(error));                    
			}
        },
	}
}
</script>


<style scoped>
  
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
		<section class="form-c o-no-bgc">
			<div class="row" :class="{active:form.select==2}">
				<span class="m-form-radio">
					<label><span class="radio"><input @click="isChe" type="radio" value="2" v-model="form.select"><span></span></span><span class="text">用户ID：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context2" :readonly="form.select!=2" maxlength="11" type="tel" placeholder="请输入用户ID"></div>
			</div>
			<div class="row" :class="{active:form.select==3}">
				<span class="m-form-radio">
					<label><span class="radio"><input @click="isChe" type="radio" value="3" v-model="form.select"><span></span></span><span class="text">渠道ID：</span></label>
				</span>
				<div class="input-box"><input v-model="form.context3" :readonly="form.select!=3" maxlength="11" type="tel" placeholder="请输入渠道ID"></div>
			</div>
			<button class="f-btn f-btn-line" @click="searchList('condition')">查询</button>
		</section>
  	</div>	
  	<div id="totalDiv"  v-if="list">
  	<div class="total-head" v-if="off.getPoints==1">查询结果</div>
  	<div v-if="off.getPoints==1">
  		<table class="pointsSearchTab">
			<thead>
				<tr>
					<th>序号</th>
					<th>用户ID</th>
					<th>用户姓名</th>
					<th>渠道</th>
					<th>积分总数</th>
					<th>原有积分</th>
					<th>已兑换积分</th>
					<th>可兑换积分</th>
					<th colspan="2"></th>
                    <th v-if="off.power5" colspan="2"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(todo,index) in detailsData" :key="index">
					<td>{{((pageNum-1)*20+(index+1))}}</td>
					<td>{{todo.staffNo}}</td>
					<td>{{todo.staffName}}</td>
					<td>{{todo.departmentName}} <span>({{todo.departmentId}})</span> </td>
					<td class="fBlue">{{todo.creditTotal}}</td>
					<td>{{todo.creditOriginal}}</td>
					<td class="fRed">{{todo.creditAlready}}</td>
					<td>{{todo.creditRemain}}</td>
					<th colspan="2"><input  maxlength="15" class="active" name="" type="text" placeholder="请输入要兑换的积分"><button class="btnPoints" @click="openinput('ex')" >兑换</button></th>
				</tr>
			</tbody>
		</table>
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
				open:0,
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
				orderStatus:9,//订单状态
				context1:'',//订单号码
				context2:'',//手机号码
				context3:'',//审核人工号
				context4:'',//身份证号
				context5:'',// type=5时订单状态
				context6:'',//操作者工号
				context7:9,//开卡状态
				startTime:'',
				endTime:'',
				select:'2',//条件查询，选择的条件
			},
			list:{},//查询数据
            detailsData:'',
			total:0,//总查询条数
			pageNum:1,//当前页数
			pageSize:20,//显示条数
			maxpage:1,//最大页数
			callback:Function,//page组件点击回调
			exchangeNum:'',
			extotal:0,
			exdetailsData:'',
			exmaxpage:1,
			sy:'',
			ydh:'',
			dh:'',
			staffNo:'',
			depId:'',
			whichLayer:'',
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
             const vm=this;
	  let userInfo=getStore("KA_ECS_USER");
	  vm.userInfo=userInfo;
      vm.userInfo.isadmin.indexOf('5')>-1?vm.off.power5=true : vm.off.power5=false;
      vm.userInfo.isadmin.indexOf('1')>-1?vm.off.power1=true : vm.off.power1=false;
      vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
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
		openinput:function(v){//兑换
			var vm =this;
			var theBtn = event.target;
			var id = theBtn.parentNode.parentNode.firstChild.innerHTML-1;
			var theData = vm.detailsData[id];
			event.target.name = theData.departmentId;
			vm.staffNo = theData.staffNo;
			vm.depId = theData.departmentId;
			vm.sy = parseInt(theData.creditRemain);
		    vm.ydh = parseInt(theData.creditAlready);
			vm.dh = parseInt(theBtn.parentNode.firstChild.value);
            if(v=="ex"){
                 if(!isNaN(vm.dh)){
				   if(vm.dh==''){
						layer.open({
				            content:'请输入要兑换的积分',
				            skin: 'msg',
				            time: 2,
				            msgSkin:'error',
				        })
					}else if(vm.dh>vm.sy){
						layer.open({
				            content:'没有足够的积分',
				            skin: 'msg',
				            time: 2,
				            msgSkin:'error',
				        })
					}else if(vm.sy>=vm.dh&&vm.dh>=100&&vm.dh%50==0&&vm.dh!=0){
				       vm.whichLayer = '1';
				       vm.off.layerState=true;					
					}else{
						layer.open({
				            content:'请输入100以上的50倍数的有效数字',
				            skin: 'msg',
				            time: 2,
				            msgSkin:'error',
			        	})
					}
				}else{
					layer.open({
			            content:'请输入100以上的50倍数的有效数字',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        })
				}
            }
			theBtn.parentNode.firstChild.value="";
		},
		searchList:function(type,manner,page){//积分查询
			let vm = this,url,json={"pageSize":vm.pageSize,"pageNum":page||1, "type": "","staffNo": "","depId": ""};
			let s = this.form.select;
			if(s==''){
			    layer.open({
		          content:'请输入查询条件',
		          skin: 'msg',
		          time: 2,
		          msgSkin:'error',
		        })
		        vm.off.getPoints='0';
			    return false;
			}
			let context = vm.form['context'+vm.form.select];
			if(type=='condition'){//条件查询	
				if(vm.form.select==2&&(!context)){
					layer.open({
		            content:'请输入用户ID',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
					vm.off.getPoints='0';
		        	return false;
				}else if(vm.form.select==3&&(!context)){
					layer.open({
		            content:'请输入渠道ID',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
					vm.off.getPoints='0';
		        	return false;
				}
				if(s==2){
					json.type = '1';
					json.staffNo = context
				}else if(s==3){
					json.type = '2';
					json.depId = context
				}	
				json = vm.trim(JSON.stringify(json));
				json = JSON.parse(json);						
				// vm.AJAX('c/user/userCredits',json,function(response){
				// 	if(response.code==200){
				// 		vm.list = response.data;
				// 		vm.total=response.data.total;
				// 		vm.detailsData=response.data.list;
				// 		vm.maxpage=Math.ceil(parseInt(response.data.total)/20);
				// 		vm.pageNum=page||1;
				// 		vm.callback=function(v){vm.searchList(type,v)};
			    //         vm.off.getPoints='1';	
				// 	}else{
				// 		return false;
				// 	}					
                // });
                reqCommonMethod(json,function(){vm.off.isLoad=false;},"ym-ecs/c/user/userCredits")
                .then((response)=>{
                    if(response.code==200){
						vm.list = response.data;
						vm.total=response.data.total;
						vm.detailsData=response.data.list;
						vm.maxpage=Math.ceil(parseInt(response.data.total)/20);
						vm.pageNum=page||1;
						vm.callback=function(v){vm.searchList(type,v)};
			            vm.off.getPoints='1';	
					}else{
						return false;
                    }
                    vm.off.isLoad=false;
                }).catch(error=>errorDeal(error));                   
			}
		}
	}
}
</script>


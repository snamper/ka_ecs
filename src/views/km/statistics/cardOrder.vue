<!--**
  *@info 统计报表模块-开卡订单
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<style scoped>
  @import "../../../assets/km/css/download.css";
</style>
<template>
	<section class="g-download-box">
		<ul class="g-download-tab clr">
			<li :class="{active:tabType==1}"><a @click="tab(1)">开卡统计</a></li>
			<li :class="{active:tabType==2}"><a @click="tab(2)">订单成功数据</a></li>
			<li :class="{active:tabType==3}"><a @click="tab(3)">关停订单下载</a></li>
			<li :class="{active:tabType==4}"><a @click="tab(4)">账户对账明细</a></li>
		</ul>
		<div class="g-tabcontent">
			<div v-if="tabType==1">
				<label class="left-tag">日期：</label>
				<span class="f-inline-block"><input placeholder="选择日期" @click="to_laydate(3)" v-model="form.singleTime" type="text" readonly="readonly"></span>
				<button class="m-create-button" @click="dealerListDown">点击生成EXCEL</button>
			</div>
			<div v-if="tabType==2||tabType==3">
				<label class="left-tag">时间区间：</label>
				<span class="m-time-area"><input placeholder="选择起始日期" @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"><input placeholder="选择截止日期" @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
				<button class="m-create-button" @click="orderListDown">点击生成EXCEL</button>
			</div>
			<div v-if="tabType==4">
				<div class="m-form-input clr">
					<label class="col-l fl">商户ID：</label>
					<div class="col-r"><input v-model="form.dealerId" placeholder="请输入商户ID" type="text" maxlength="24"></div>
				</div>
				<label class="left-tag">时间区间：</label>
				<span class="m-time-area"><input placeholder="选择起始日期" @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"><input placeholder="选择截止日期" @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
				<button class="m-create-button" @click="accountList">点击生成EXCEL</button>
			</div>
		</div>
		<iframe src="" id="downloadFrame" style="opacity:0;width:0;height:0"></iframe>
	</section>
</template>
<script>
import {reqCommonMethod} from "../../../config/service.js";
export default{
	name:'cardOrderDownload',
	data (){
		return {
			tabType:1,
			form:{
				startTime:'',
				endTime:'',
				singleTime:'',
				dealerId:''
			}
		}
	},
	created:function(){

	},
	methods:{
		tab:function(tabType){
			this.tabType=tabType;
		},
		orderListDown:function(){
			var vm=this,json={'startTime':vm.form.startTime,'endTime':vm.form.endTime},url;
			if(!json.startTime){
				layer.open({
		            content:'请选择起始时间',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}else if(!json.endTime){
				layer.open({
		            content:'请选择截止时间',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			vm.tabType==2 ? url='km-ecs/w/audit/orderListDown' : url='km-ecs/w/audit/getFreezonOrder'
			vm.AJAX(url,json,function(data){
				var frame=document.getElementById('downloadFrame');
				frame.setAttribute('src',data.data.url);
            });
		},
		dealerListDown:function(){
			var vm=this,json={'time':vm.form.singleTime};
			if(!json.time){
				layer.open({
		            content:'请选择日期',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			vm.AJAX('km-ecs/w/audit/dealerListDown',json,function(data){
                console.log(data);
				var frame=document.getElementById('downloadFrame');
				frame.setAttribute('src',data.data.url);
			})
		},
		accountList:function(){//账户对账明细
			var vm=this,json={'startTime':vm.form.startTime,'endTime':vm.form.endTime,'dealerId':vm.form.dealerId};
			if(!json.startTime){
				layer.open({
		            content:'请选择起始时间',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}else if(!json.endTime){
				layer.open({
		            content:'请选择截止时间',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			
			vm.AJAX('km-ecs/w/audit/accountList',json,function(data){
				var frame=document.getElementById('downloadFrame');
				frame.setAttribute('src',data.data.url);
			});
		},
		to_laydate:function(v){
			var vm=this;
			if(v==3){
				laydate({
					istime:false,
					format: 'YYYY-MM-DD',
					isclear: false,
					choose: function(dates){ //选择好日期的回调
						vm.form.singleTime=dates
					}
				});
			}else{
				laydate({
					istime:true,
					format: 'YYYY-MM-DD hh:mm:ss',
					isclear: false,
					choose: function(dates){ //选择好日期的回调
						v==1 ? vm.form.startTime=dates : vm.form.endTime=dates;
					}
				});
			}
			
		}
	}
}
</script>


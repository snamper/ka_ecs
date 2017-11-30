<!--**
  *@info 资源查询模块-推广方
  *@author: thinkmix
  *@date 2017-11-29
* *-->
<style scoped>
.m-total-table{margin-top: 0.2rem;}
@media screen and (min-width: 961px){
	.o-input-button{
		width: 500px
	}
}
</style>
<template>
	<div style="padding:15px;">
		<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
		<div class="m-input-button o-input-button">
			<input maxlength="16" type="tel" v-model="form.dealerId" placeholder="请输入查询的推广方ID"><button @click="searchClick">查询</button>
		</div>
		<div class="m-total-table" v-show="promoterData.dealerId">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>创建时间</th>
						<th>创建人</th>
						<th>推广码</th>
						<th>渠道模式</th>
						<th>折扣模式</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ promoterData.dealerId }}</td>
						<td>{{ promoterData.dealerName }}</td>
						<td>{{ getDateTime(promoterData.createTime)[6] }}</td>
						<td>{{ promoterData.modifyUser||'--' }}</td>
						<td>{{ promoterData.referralCode||'--' }}</td>
						<td>{{ promoterData.phoneModel||'--' }}</td>
						<td>{{ promoterData.discountModel||'--' }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="m-total-table" v-show="deviceList.length">
			<div class="total-head">设备列表<b>{{devicePageParam.total}}</b></div>
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>设备编号</th>
						<th>激活状态</th>
						<th>MAC地址</th>
						<th>业务权限</th>
						<th>创建时间</th>
						<th>激活时间</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(todo,index) in deviceList">
						<td>{{((devicePageParam.pageNum-1)*10+(index+1))}}</td>
						<td><a :href="'#/home/resource/device/'+todo.deviceNumber" title="点击查看详情" class="details m-l">{{todo.deviceNumber}}</a></td>
						<td>
							<span class="f-c-green" v-show="todo.state==1">已激活</span>
							<span class="f-c-red" v-show="todo.state==0">未激活</span>
						</td>
						<td>{{ todo.mac }}</td>
						<td>
							<span v-show="todo.businessPower==1">远特发展线</span>
							<span v-show="todo.businessPower==2">联通发展线</span>
							<span v-show="todo.businessPower==3">远特开通联通卡权限</span>
							<span v-show="todo.businessPower==4">联通开通远特卡权限</span>
						</td>
						<td>{{ getDateTime(todo.createTime)[6] }}</td>
						<td>{{ todo.activationTime }}</td>
					</tr>
				</tbody>
			</table>
			<my-page :page="devicePageParam.pageNum" :maxpage="devicePageParam.maxpage" :callback="devicePageParam.callback"></my-page>
		</div>
		<div class="m-total-table" v-show="merchantList.length">
			<div class="total-head">商户列表<b>{{merchantPageParam.total}}</b></div>
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>渠道ID</th>
						<th>网点名称</th>
						<th>总部推广渠道</th>
						<th>商户类型</th>
						<th>达标状态</th>
						<th>业务权限</th>
						<th>签约状态</th>
						<th>创建时间</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(todo,index) in merchantList">
						<td>{{((merchantPageParam.pageNum-1)*10+(index+1))}}</td>
						<td>
							<a :href="'#/home/resource/merchant/'+todo.dealerId" title="点击查看详情" class="details m-l">{{todo.dealerId}}</a>
						</td>
						<td>{{ todo.companyName }}</td>
						<td>
							<span v-if="todo.headPopchannel">{{ todo.headPopchannel }}[{{ todo.headPopchannelName }}]</span>
							<span v-else>--</span>
						</td>
						
						<td>
							<span v-show="todo.merchantType==1">企业</span>
							<span v-show="todo.merchantType==2">个人</span>
						</td>
						<td>
							<span class="f-c-green" v-show="todo.standardStatus==1">达标</span>
							<span class="f-c-red" v-show="todo.standardStatus==2">未达标</span>
						</td>
						<td>
							<span v-show="todo.businessPower==1">远特发展线</span>
							<span v-show="todo.businessPower==2">联通发展线</span>
							<span v-show="todo.businessPower==3">远特开通联通卡权限</span>
							<span v-show="todo.businessPower==4">联通开通远特卡权限</span>
						</td>
						<td>
							<span class="f-c-green" v-show="todo.isSignAgreement==1">已签约</span>
							<span class="f-c-red" v-show="todo.isSignAgreement==0">未签约</span>
						</td>
						<td>{{ getDateTime(todo.createTime)[6] }}</td>
					</tr>
				</tbody>
			</table>
			<my-page :page="merchantPageParam.pageNum" :maxpage="merchantPageParam.maxpage" :callback="merchantPageParam.callback"></my-page>
		</div>
	</div>
</template>
<script>
import pagination from "../../components/Page.vue";
import { getDateTime } from "../../config/utils.js";
import { unifySearchApi } from '../../config/service';
export default{
	data (){
		return {
			off:{
				isLoad:false
			},
			form:{
				dealerId:''
			},
			promoterData:{},
			deviceList:[],//设备列表
			merchantList:[],//商户列表
			devicePageParam:{
				total:0,//总查询条数
				pageNum:1,//当前页数
				maxpage:1,//最大页数
				callback:Function//page组件点击回调
			},
			merchantPageParam:{
				total:0,//总查询条数
				pageNum:1,//当前页数
				maxpage:1,//最大页数
				callback:Function//page组件点击回调
			}
		};
	},
	components:{
		'my-page':pagination,
	},
	created(){
		let val=this.$route.params.val;
		if(val!='null'){
			this.form.dealerId=val;
			this.searchClick()
		}
	},
	methods:{
		searchClick(){
			var vm=this;
			if(vm.off.isLoad)return false;
			
			vm.promoterData={};
			vm.deviceList=[];
			if(!vm.form.dealerId){
				layer.open({
		            content:'请输入查询的推广方ID',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			vm.off.isLoad=true;
			unifySearchApi({
					"opKey":"info.promoter.search",
					"params":["'"+vm.form.dealerId+"'"],
					"pageSize":"10",
					"pageNum":"-1"
			},function(){
				vm.off.isLoad=false;
			}).then(res=>{
				if(res.data.list[0]){
					vm.promoterData=res.data.list[0];
					vm.getDeviceList(1,vm.form.dealerId);
				}else{
					layer.open({
			            content:'暂无该推广方信息',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
				}
				
			});
		},
		getDeviceList(page,dealerId){
			var vm=this;
			vm.off.isLoad=true;
			unifySearchApi({
					"opKey":"info.promoterDevice.list",
					"params":["'"+dealerId+"'"],
					"pageSize":"10",
					"pageNum":page||1
			},function(){
				vm.off.isLoad=false;
			}).then(res=>{
				vm.deviceList=res.data.list;
				vm.devicePageParam={
					total:res.data.total,
					maxpage:Math.ceil(parseInt(res.data.total)/10),
					pageNum:page||1,
					callback:function(v){vm.getDeviceList(v,dealerId)}
				}
				vm.getMerchantList(1,dealerId)
			});
		},
		getMerchantList(page,dealerId){
			var vm=this;
			vm.off.isLoad=true;
			unifySearchApi({
					"opKey":"info.promoterMerchant.list",
					"params":["'"+dealerId+"'"],
					"pageSize":"10",
					"pageNum":page||1
			},function(){
				vm.off.isLoad=false;
			}).then(res=>{
				vm.merchantList=res.data.list;
				vm.merchantPageParam={
					total:res.data.total,
					maxpage:Math.ceil(parseInt(res.data.total)/10),
					pageNum:page||1,
					callback:function(v){vm.getMerchantList(v,dealerId)}
				}
			});
		},
		getDateTime(v){
			return getDateTime(v);
		},
	}
};
</script>


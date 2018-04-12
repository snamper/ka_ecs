<!--**
  *@info 资源查询模块-设备
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
			<input maxlength="16" type="tel" v-model="form.deviceNumber" placeholder="请输入查询的设备编号"><button @click="searchClick">查询</button>
		</div>
		<div class="m-total-table" v-show="deviceList.length">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>设备编号</th>
						<th>设备状态</th>
						<th>创建时间</th>
						<th>激活时间</th>
						<th>推广方</th>
						<th>绑定商户</th>
						<th>业务范围</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(todo,index) in deviceList">
						<td>{{(index+1)}}</td>
						<td>{{ todo.deviceNumber }}</td>
						<td>
							<span class="f-c-green" v-show="todo.state==1">已激活</span>
							<span class="f-c-red" v-show="todo.state==0">未激活</span>
						</td>
						
						<td>{{ todo.createTime }}</td>
						<td>{{ todo.activationTime }}</td>
						<td>
							<a :href="'#/homek/resource/promoter/'+todo.protomerDealerId" title="点击查看详情" class="details">{{todo.protomerDealerId}}</a><br/>
							<span v-show="todo.protomerName">（{{todo.protomerName}}）</span></td>
						<td>
							<span v-if="todo.merchantDealerId!='null'">
								<a :href="'#/homek/resource/merchant/'+todo.merchantDealerId" title="点击查看详情" class="details">{{todo.merchantDealerId}}</a><br/>
								<span>（{{todo.merchantName}}）</span>
							</span>
							<span v-else class="f-c-red">未绑定</span>
						</td>
						<td>
							<span v-show="todo.isp==1">远特</span>
							<span v-show="todo.isp==2">联通</span>
							<span v-show="todo.isp==3">移动</span>
							<span v-show="todo.isp==4">电信</span>
							<span>（{{ todo.area }}）</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import { getDateTime } from "../../../config/utils.js";
import { unifySearchApi } from '../../../config/service';
export default{
	data (){
		return {
			off:{
				isLoad:false
			},
			form:{
				deviceNumber:''
			},
			deviceList:[],
		};
	},
	created(){
		let val=this.$route.params.val;
		if(val!='null'){
			this.form.deviceNumber=val;
			this.searchClick()
		}
	},
	methods:{
		searchClick(){
			var vm=this;
			if(vm.off.isLoad)return false;
			vm.deviceList=[];
			if(!vm.form.deviceNumber){
				layer.open({
		            content:'请输入查询的设备编号',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			// vm.off.isLoad=true;
			unifySearchApi({
					"opKey":"info.device.search",
					"params":["'"+vm.form.deviceNumber+"'"],
					"pageSize":"10",
					"pageNum":"1"
			},function(){
				vm.off.isLoad=false;
			}).then(res=>{
				if(res.data.list.length){
					vm.deviceList=res.data.list;	
				}else{
					layer.open({
			            content:'暂无该设备信息',
			            skin: 'msg',
			            time: 2,
			            msgSkin:'error',
			        });
				}
			});
		},
		getDateTime(v){
			return getDateTime(v);
		},
	}
};
</script>


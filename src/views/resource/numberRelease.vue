<!--**
  *@info 资源查询模块-号码解冻
  *@author: thinkmix
  *@date 2017-11-8
* *-->
<style scoped>
#totalDiv{margin-top: 0.2rem;}
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
			<input maxlength="11" type="tel" v-model="form.phone" placeholder="请输入查询的手机号码"><button @click="searchPhone">查询</button>
		</div>
		<div id="totalDiv" v-show="phoneList.occupancy">
			<table>
				<thead>
					<tr>
						<th>号码</th>
						<th>状态</th>
						<th>等级</th>
						<th v-show="phoneList.occupancy!=0"></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ form.phone }}</td>
						<td>
							<span v-show="phoneList.occupancy==0" class="f-c-green">可售</span>
							<span v-show="phoneList.occupancy==1" class="f-c-red">被占用中</span>
							<span v-show="phoneList.occupancy==2" class="f-c-grey">已售</span>
						</td>
						<td>
							<span v-show="phoneList.pretty==1" class="f-c-yellow">靓号</span>
							<span v-show="phoneList.pretty==2" class="f-c-grey">普号</span>
						</td>
						<td v-show="phoneList.occupancy!=0">
							<a href="javascript:void(0)" @click="phoneRelease" class="details">解冻</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
export default{
	data (){
		return {
			off:{
				isLoad:false
			},
			form:{
				phone:''
			},
			phoneList:{},
		};
	},
	
	created(){
		
	},
	methods:{
		searchPhone(){
			var vm=this;
			if(vm.off.isLoad)return false;
			
			vm.phoneList={};
			if(!vm.form.phone){
				layer.open({
		            content:'请输入查询的号码',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			vm.off.isLoad=true;
			vm.AJAX("w/frozen/getPhone",{"phone":vm.form.phone},function(data){
				vm.phoneList=data.data;
			},function(){
				vm.off.isLoad=false;
			})
		},
		phoneRelease(){
			var vm=this;
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			vm.AJAX("w/frozen/phoneThaw",{"phone":vm.form.phone},function(data){
				layer.open({
		            content:'解冻成功',
		            skin: 'msg',
		            time: 4,
		            msgSkin:'success',
		        });
			},function(){
				vm.off.isLoad=false;
			})
		}
	}
};
</script>


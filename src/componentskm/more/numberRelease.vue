<!--**
  *@info 号码解冻
  *@author: thinkmix
  *@date 2017-11-8
* *-->
<template>
	<div style="padding:15px;">
		<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
        <section class="m-occlusion" :class="{active:off.isLoad}"></section>
		<div class="m-input-button o-input-button">
			<input maxlength="11" type="tel" v-model="form.phone" placeholder="请输入查询的手机号码"><button @click="searchPhone">查询</button>
		</div>
		<div class="m-total-table" v-show="phoneList.occupancy">
			<table>
				<thead>
					<tr>
						<th></th>
						<th>号码</th>
						<th>状态</th>
						<th>等级</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td>
							{{ form.phone }}
						</td>
						<td>
							<span v-show="phoneList.occupancy==0" class="f-c-green">可售</span>
							<span v-show="phoneList.occupancy==1" class="f-c-red">被占用中</span>
							<span v-show="phoneList.occupancy==2" class="f-c-grey">已售</span>
						</td>
						<td>
							<span v-show="phoneList.pretty==1" class="f-c-yellow">靓号</span>
							<span v-show="phoneList.pretty==2" class="f-c-grey">普号</span>
						</td>
						<td >
							<a v-show="phoneList.occupancy!=0" href="javascript:void(0)" @click="phoneRelease" class="details">解冻</a>
							<a v-show="phoneList.occupancy==0" href="javascript:void(0)" @click="phoneOccupy" class="details">占用</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import {reqCommonMethod} from "../../config/service.js";
import {errorDeal} from "../../config/utils.js";
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
            reqCommonMethod({"phone":vm.form.phone},function(){vm.off.isLoad=false;},"km-ecs/w/frozen/getPhone")
            .then((data)=>{
                if(typeof data=='object'){
                    vm.phoneList=data.data;
                }
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 	
		},
		phoneRelease(){//解冻
			var vm=this;
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
            reqCommonMethod({"phone":vm.form.phone,"type":0},function(){vm.off.isLoad=false;},"km-ecs/w/frozen/phoneThaw")
            .then(()=>{
                layer.open({
                    content:'解冻成功',
                    skin: 'msg',
                    time: 4,
                    msgSkin:'success',
                });
                vm.searchPhone();
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 	
		},
		phoneOccupy(){//占用
			var vm=this;
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
            reqCommonMethod({"phone":vm.form.phone,"type":1},function(){vm.off.isLoad=false;},"km-ecs/w/frozen/phoneThaw")
            .then((data)=>{
                layer.open({
		            content:'占用成功',
		            skin: 'msg',
		            time: 4,
		            msgSkin:'success',
		        });
                vm.searchPhone();
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 	           
		}
	}
};
</script>
<style scoped>
.m-total-table{margin-top: 0.2rem;}
@media screen and (min-width: 961px){
	.o-input-button{
		width: 500px
	}
}
</style>
<style scoped>
  
</style>
<template>
<div id="search">
  	<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
    <section class="m-occlusion" :class="{active:off.isLoad}"></section>
  	<section>
	  	<div class="g-search-form">
			<div class="m-tag"><b></b>违规查询</div>
			<section class="form-c">
				<div class="row clr m-col-2">
					<div class="m-input-button"><input v-model="form.user" maxlength="18" type="tel" placeholder="请输入查询的工号"><button @click="search">查询</button></div>
				</div>
			</section>
		</div>
	</section>
	<div id="totalDiv" v-if="resData">
		<table >
			<thead>
				<tr>
					<th>员工工号</th>
					<th>员工姓名</th>
					<th>第一次违规时间</th>
					<th>最后一次违规时间</th>
					<th>最后一次违规原因</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{ resData.staffNo }}</td>
					<td>{{ resData.staffName }}</td>
					<td>{{ resData.createTime }}</td>
					<td>{{ resData.modifyTime }}</td>
					<td>{{ resData.reason }}</td>
					<td>
						<span v-show="!off.isRelieve&&JSON.stringify(resData)!='{}'"><a href="javascript:void(0)" @click="relieve" class="details">解除</a></span>
						<span v-show="off.isRelieve" class="f-c-green">已解除</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>
<script>
import {reqCommonMethod} from "../../config/service.js";
import {errorDeal} from "../../config/utils";
import "../../assets/ym/css/search.css";
export default{
	name:'illegalSearch',
	data (){
		return {
			off:{
				isLoad:false,
				isRelieve:false
			},
			form:{
				user:''
			},
			resData:''
		}
	},
	created:function(){
	},
	methods:{
		search:function(){
			let vm=this;

			if(!vm.form.user){
				layer.open({
		            content:'请输入查询的工号',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}

			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			// vm.AJAX('c/user/queryBlack',{staffNo:vm.form.user},function(data){
			// 	vm.off.isRelieve=false;
			// 	vm.resData=data.data;
			// },function(){
			// 	vm.off.isLoad=false;
            // });
            reqCommonMethod({staffNo:vm.form.user},function(){vm.off.isLoad=false;},"ym-ecs/c/user/queryBlack")
            .then((data)=>{
                vm.off.isRelieve=false;
                vm.resData=data.data;
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error));              
		},
		relieve:function(){
			let vm=this;

			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			// vm.AJAX('c/user/unlockBlack',{staffNo:vm.resData.staffNo},function(data){
			// 	vm.off.isRelieve=true;
			// 	layer.open({
		    //         content:'解除成功',
		    //         skin: 'msg',
		    //         time: 3,
		    //         msgSkin:'success',
		    //     });
			// },function(){
			// 	vm.off.isLoad=false;
            // });
            reqCommonMethod({staffNo:vm.resData.staffNo},function(){vm.off.isLoad=false;},"ym-ecs/c/user/unlockBlack")
            .then((data)=>{
                vm.off.isRelieve=true;
				layer.open({
		            content:'解除成功',
		            skin: 'msg',
		            time: 3,
		            msgSkin:'success',
                });
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error));               
		},
	}
}
</script>


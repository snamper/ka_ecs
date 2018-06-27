<style scoped>

</style>
<template>
<section class="g-list-box" id="details">
	<header class="g-lis-head">
		<a class="m-details-back u-icon-back" @click="close"></a>
  	</header>
	<div class="g-box">
		<table class="g-list-table">
			<tbody>
				<tr>
					<td>
						<table class="g-inner-table">
							<tbody>
								<tr><td>订单号：</td><td>{{ list.occupy_order_id }}</td></tr>
								<tr><td>生成时间：</td><td>{{ $parent.getDateTime(list.create_time)[6] }}</td></tr>
								<tr><td>结束时间：</td><td>{{ $parent.getDateTime(list.modify_time)[6] }}</td></tr>
								<tr><td>商户：</td><td>{{ list.dealer_id }}（{{ list.company_name }}）</td></tr>
								<tr><td>工号：</td><td>{{ list.user_id }}（{{ list.user_name }}）</td></tr>
								<tr><td>预占号码：</td><td>{{ list.occupy_phone }}（<span v-show="list.phone_type==1">远特</span><span v-show="list.phone_type==2">联通</span>，{{list.occupy_city_name}}，{{$parent.translateData(5,list.big_number_level)}}）</td></tr>
								<tr><td>系统号码占用费：</td><td>{{ parseInt(list.phone_money)/100 }}元</td></tr>
								<tr><td>商家自定占用费：</td><td>{{ parseInt(list.occupy_price)/100 }}元</td></tr>
								<tr><td>预占保证金：</td><td>{{ parseInt(list.occupy_money)/100 }}元</td></tr>
								<tr><td>退回预占保证金：</td><td>{{ parseInt(list.order_refund_money)/100 }}元</td></tr>
								<tr><td>扣除预占保证金：</td><td>{{ parseInt(list.order_deduct_money)/100 }}元</td></tr>
								
								<tr v-show="list.cancel_user_id"><td>解除操作人：</td><td>{{ list.cancel_user_id }}（{{ list.cancel_user_name }}）</td></tr>
								<tr><td>终端类型：</td><td>
									<span v-show="list.terminal_type==1">ios</span>
									<span v-show="list.terminal_type==2">android</span>
									<span v-show="list.terminal_type==0">未知</span>
								</td></tr>
								<tr><td>订单状态：</td><td>
									<span v-show="list.order_status==1" class="f-c-yellow">占用中</span>
									<span v-show="list.order_status==2" class="f-c-red">手动解除占用</span>
									<span v-show="list.order_status==3" class="f-c-red">超时解除占用</span>
									<span v-show="list.order_status==4" class="f-c-yellow">开卡中</span>
									<span v-show="list.order_status==5" class="f-c-green">开卡成功解除占用</span>
								</td></tr>	
								
								<tr><td>订单描述：</td><td>{{ list.order_desc }}</td></tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

</section>
</template>
<script>
import "../assets/km/css/cardOrderDetails.css";
export default{
	name:'reserveOrderDetails',
	props:{
		list:Object,
	},
	data(){
		return{
			
		}
	},
	created:function(){
		
	},
	methods:{
		close:function(){
			this.$parent.off.details=false;
		},
	}
}
</script>


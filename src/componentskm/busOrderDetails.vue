<style scoped>

</style>
<template>
<section class="g-list-box" id="details">
	<header class="g-lis-head">
		<a class="m-details-back" @click="close"></a>
  	</header>
	<div class="g-box">
		<table class="g-list-table">
			<tbody>
				<tr>
					<td>
						<table class="g-inner-table">
							<tbody>
								<tr><td>充值订单号：</td><td>{{ list.sysOrderId }}</td></tr>
								<tr><td>生成时间：</td><td>{{ getDateTime(list.createTime)[6] }}</td></tr>
								<tr><td>公交卡号：</td><td>{{ list.busCardNo }}</td></tr>
								<tr><td>充值金额：</td><td>{{ (parseFloat(list.tradeFee)/100).toFixed(2) }}元</td></tr>
								<tr><td>订单状态：</td><td>
									<span v-if="list.orderStatus==1" class="f-c-purple">初始状态</span>
									<span v-if="list.orderStatus==2" class="f-c-yellow">待支付</span>
									<span v-if="list.orderStatus==3" class="f-c-green">支付成功</span>
									<span v-if="list.orderStatus==4" class="f-c-green">充值成功</span>
									<span v-if="list.orderStatus==5" class="f-c-red">充值失败</span>
									<span v-if="list.orderStatus==6" class="f-c-red">退款订单关闭</span>
									<span v-if="list.orderStatus==7" class="f-c-red">订单未支付超时关闭</span>
									<span v-if="list.orderStatus==8" class="f-c-red">用户放弃订单关闭</span>
									<span v-if="list.orderStatus==9" class="f-c-red">支付失败订单关闭</span>
								</td></tr>
								<tr><td>支付途径：</td><td>
									<span v-if="list.payChannel==1" class="f-c-purple">远特支付</span>
									<span v-if="list.payChannel==2" class="f-c-green">微信</span>
									<span v-if="list.payChannel==3" class="f-c-blue">支付宝</span>
								</td></tr>
								<tr><td>支付流水号：</td><td>{{ list.transactionIdPay }}</td></tr>
								<tr><td>支付时间：</td><td>{{ getDateTime(list.payTime)[6] }}</td></tr>
								<tr><td>公交平台订单：</td><td>{{ list.outOrderNo }}</td></tr>
								<tr><td>状态更改时间：</td><td>{{ getDateTime(list.modifyTime)[6] }}</td></tr>
								<tr><td>操作者姓名：</td><td>{{ list.username }}</td></tr>
								<tr><td>操作者工号：</td><td>{{ list.workNo }}</td></tr>
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
import { getDateTime } from "../config/utils.js";
export default{
	name:'busOrderDetails',
	props:{
		list:Object,
		type:Number,
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
		getDateTime(v){
			return getDateTime(v);
		},
	}
}
</script>


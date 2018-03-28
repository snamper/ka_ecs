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
								<tr><td>系统订单号：</td><td>{{ list.orderId }}</td></tr>
								<tr v-show="list.payOrderId"><td>支付订单号：</td><td>{{ list.payOrderId }}</td></tr>
								
								<tr><td>生成时间：</td><td>{{ getDateTime(list.createTime)[6] }}</td></tr>
								<tr><td>支付耗时：</td><td>
									<span v-show="list.createTime">{{ secondsFormat(parseInt(list.modifyTime)/1000-parseInt(list.createTime)/1000) }}</span>
									<span v-show="!list.createTime">--</span>
								</td></tr>
								<tr><td>终端类型：</td><td>
									<span v-show="list.terminalType==1">IOS</span>
									<span v-show="list.terminalType==2">Android</span>
								</td></tr>
								<tr><td>商户号：</td><td>{{ list.dealerId }}</td></tr>
								<tr><td>操作人ID：</td><td>{{ list.userId }}</td></tr>
								<tr><td>操作人号码：</td><td>
									<a :href="'#/homek/resource/merchant/'+list.userPhone+'_phone'" title="点击查看详情" class="details">{{ list.userPhone }}</a>
								</td></tr>
								<tr><td>充值类型：</td><td>
									<span v-show="list.rechargeType==1">流量</span>
									<span v-show="list.rechargeType==2">话费</span>
								</td></tr>
								<tr><td>支付方式：</td><td>
									<span v-show="list.payType==1" class="u-icon-yuantelrecharge"></span>
									<span v-show="list.payType==2" class="u-icon-wechat"></span>
									<span v-show="list.payType==3" class="u-icon-alipay"></span>
								</td></tr>
								<tr v-show="list.rechargeType==1"><td>产品号：</td><td>{{ list.productId }}</td></tr>
								<tr><td>充值面额：</td><td>
									<span v-if="list.rechargeType==1">{{ list.flowNum+list.flowUnit }}</span>
									<span v-if="list.rechargeType==2">{{ parseInt(list.money)/100 }}</span>
								</td></tr>
								<tr v-show="list.rechargeType==1"><td>售价：</td><td>{{ parseInt(list.price)/100 }}</td></tr>
								<tr><td>支付金额：</td><td>{{ parseInt(list.payMoney)/100 }}<span style="margin-left:0.2rem;">折扣：{{ parseFloat(list.discount)/1000 }}</span></td></tr>

								<tr><td>充值号码：</td><td>{{ list.phone }}</td></tr>
								<tr v-show="list.rechargeType==1"><td>所属省份：</td><td>{{ list.province }}</td></tr>
								<tr><td>运营商：</td><td>
									<span v-show="list.isp==1">移动</span>
									<span v-show="list.isp==2">联通</span>
									<span v-show="list.isp==3">电信</span>
									<span v-show="list.isp==4">远特</span>
								</td></tr>
								
								<tr v-show="list.rechargeType==1"><td>订单状态：</td><td>
									<span v-show="list.orderStatus==1" class="f-c-yellow">待支付</span>
									<span v-show="list.orderStatus==2" class="f-c-red">支付失败</span>
									<span v-show="list.orderStatus==3" class="f-c-yellow">支付成功，待充值</span>
									<span v-show="list.orderStatus==4" class="f-c-red">充值失败</span>
									<span v-show="list.orderStatus==5" class="f-c-green">充值成功</span>
									<span v-show="list.orderStatus==6" class="f-c-red">已关闭</span>
								</td></tr>	
								<tr v-show="list.rechargeType==2"><td>订单状态：</td><td>
									<span v-show="list.orderStatus==1" class="f-c-green">成功</span>
									<span v-show="list.orderStatus==2" class="f-c-red">失败</span>
									<span v-show="list.orderStatus==0" class="f-c-yellow">进行中</span>
								</td></tr>
								
								<tr><td>订单描述：</td><td>{{ list.errMsg }}</td></tr>
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
import { getDateTime,secondsFormat } from "../config/utils.js";
export default{
	name:'rechargeOrderDetails',
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
		getDateTime(v){
			return getDateTime(v);
		},
		secondsFormat(v){
			return secondsFormat(v);
		}
	}
}
</script>


<!--**
  *@info 商户实名补录组件
  *@author: thinkmix
  *@date 2019-01-16
* *-->
<template>
<section class="g-list-box" id="details">
	<header class="g-lis-head" v-if="type == 2">
		<a class="m-details-back u-icon-back" @click="close"></a>
	</header>
	<div class="g-box">
		<table class="g-list-table">
			<tbody>
				<tr>
					<td>
						<table class="g-inner-table">
							<thead>
								<tr>
									<th style="width:110px;">原始资料</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr><td>订单号码：</td><td>{{ oldInfo.orderId }}</td></tr>
								<tr><td>订单来源：</td><td>
									<span v-if="oldInfo.sourceType == 1">卡盟APP</span>
									<span v-if="oldInfo.sourceType == 2">新零售APP</span>
								</td></tr>
								<tr><td>生成时间：</td><td>{{ getDateTime(oldInfo.createTime)[6] }}</td></tr>
								<tr><td>商户属性：</td><td>{{ oldInfo.merchantType == 1 ? '企业' : '个人' }}</td></tr>
								<tr><td>商户类别：</td><td>{{ oldInfo.nickname }}</td></tr>
								<tr><td>商户名称：</td><td>{{ oldInfo.companyName }} [{{ creditRank }}]</td></tr>
								<tr><td>门店地址：</td><td>{{ oldInfo.storeAddress || '--' }}</td></tr>
								<tr><td>{{ oldInfo.merchantType == 1 ? '营业执照编号：' : '身份证号码：' }}</td><td>{{ oldInfo.businessLicence }}</td></tr>
								<tr v-if="oldInfo.merchantType == 2"><td>证件地址：</td><td>{{ oldInfo.address }}</td></tr>
								<tr v-if="oldInfo.merchantType == 2"><td>证件有效期：</td><td>{{ oldInfo.period || '--' }}</td></tr>
								<tr><td>操作人：</td><td>{{ oldInfo.userName }} [ID:{{ oldInfo.userId }}]</td></tr>
								<tr><td>操作人号码：</td><td>{{ oldInfo.requestPhone }}</td></tr>
								<tr><td>售卡城市：</td><td>{{ oldInfo.cityName }} [{{ oldInfo.cityCode }}]</td></tr>
								<tr>
									<td colspan="2" style="width:auto;">
										<div class="m-img-list">
											<div :style="{backgroundImage:`url(${ imgUrlDeal(oldInfo.doorPictureLeft) })`}"><a target="_blank" :href="newInfo.doorPictureLeft"></a></div>
											<div :style="{backgroundImage:`url(${ imgUrlDeal(oldInfo.doorPictureRight) })`}"><a target="_blank" :href="newInfo.doorPictureRight"></a></div>
											<div :style="{backgroundImage:`url(${ imgUrlDeal(oldInfo.handPicture) })`}"><a target="_blank" :href="newInfo.handPicture"></a></div>
											<div :style="{backgroundImage:`url(${ imgUrlDeal(oldInfo.signPicture) })`}"><a target="_blank" :href="newInfo.signPicture"></a></div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
					<td>
						<table class="g-inner-table">
							<thead>
								<tr>
									<th style="width:110px;">补录资料</th>
									<th class="f-tal"><b class="fCRed">(补录原因：{{ oldInfo.remarks }})</b></th>
								</tr>
							</thead>
							<tbody>
								<tr><td>订单号码：</td><td>{{ newInfo.orderId }}</td></tr>
								<tr><td>订单来源：</td><td>
									<span v-if="newInfo.sourceType == 1">卡盟APP</span>
									<span v-if="newInfo.sourceType == 2">新零售APP</span>
								</td></tr>
								<tr><td>生成时间：</td><td>{{ getDateTime(newInfo.createTime)[6] }}</td></tr>
								<tr><td>商户属性：</td><td>{{ newInfo.merchantType == 1 ? '企业' : '个人' }}</td></tr>
								<tr><td>商户类别：</td><td>{{ newInfo.nickname }}</td></tr>
								<tr><td>商户名称：</td><td>{{ newInfo.companyName }} [{{ creditRank }}]</td></tr>
								<tr><td>门店地址：</td><td>{{ newInfo.storeAddress || '--' }}</td></tr>
								<tr><td>{{ newInfo.merchantType == 1 ? '营业执照编号：' : '身份证号码：' }}</td><td>{{ newInfo.businessLicence }}</td></tr>
								<tr v-if="newInfo.merchantType == 2"><td>证件地址：</td><td>{{ newInfo.address }}</td></tr>
								<tr v-if="newInfo.merchantType == 2"><td>证件有效期：</td><td>{{ newInfo.period || '--' }}</td></tr>
								<tr><td>操作人：</td><td>{{ newInfo.userName }} [ID:{{ newInfo.userId }}]</td></tr>
								<tr><td>操作人号码：</td><td>{{ newInfo.requestPhone }}</td></tr>
								<tr><td>售卡城市：</td><td>{{ newInfo.cityName }} [{{ newInfo.cityCode }}]</td></tr>
								<tr>
									<td colspan="2" style="width:auto;">
										<div class="m-img-list">
											<div :style="{backgroundImage:`url(${ imgUrlDeal(newInfo.doorPictureLeft) })`}"><a target="_blank" :href="newInfo.doorPictureLeft"></a></div>
											<div :style="{backgroundImage:`url(${ imgUrlDeal(newInfo.doorPictureRight) })`}"><a target="_blank" :href="newInfo.doorPictureRight"></a></div>
											<div :style="{backgroundImage:`url(${ imgUrlDeal(newInfo.handPicture) })`}"><a target="_blank" :href="newInfo.handPicture"></a></div>
											<div :style="{backgroundImage:`url(${ imgUrlDeal(newInfo.signPicture) })`}"><a target="_blank" :href="newInfo.signPicture"></a></div>
										</div>
									</td>
								</tr>
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
import comApi from '@/comApi/';
import { getDateTime,imgUrlDeal } from '@/config/utils.js';

export default{
	name:'fillMercahnt',
	props:{
		oldInfo:Object,
		newInfo:Object,
		type:Number//1,审核里面;2,查询详情里面
	},
	data(){
		return {
			creditRank:''
		}
	},
	created:function(){
		if(this.type == 2){
			this.getMerchantCreditLevel();
		}
	},
	methods:{
		getMerchantCreditLevel(){
			const vm = this;

			comApi.getMerchantCreditLevel({dealerId:vm.newInfo.dealerId}).then((res)=>{
				if(res.data){
					vm.creditRank = res.data;
				}
			},function(){
				//关闭全局loading
			})
		},
		getDateTime(t){
			return getDateTime(t);
		},
		close() {
			this.$parent.off.details = false;
		},
		imgUrlDeal(url,source){
			return imgUrlDeal(url,source)
		}
	}
}
</script>
<style lang="scss" scoped>
@import "../../assets/km/css/cardOrderDetails.css";
  .m-img-list{
	  display: flex;
	  >div{
		  flex: 1;
		  background-position: center;
		  background-repeat: no-repeat;
		  background-size: contain;
		  height: 200px;
		  >a{
			  display: block;
			  height: 100%;
		  }
	  }
  }
</style>

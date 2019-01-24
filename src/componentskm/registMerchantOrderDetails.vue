<!--**
  *@info 激活商户审核订单详情模块
  *@author: thinkmix
  *@date 2017-12-7
* *-->
<style scoped>
.g-list-box {
  padding: 10px;
}
</style>
<template>
	<section class="g-list-box" v-if="list">
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
								<tr><td>订单号码：</td><td>{{list.orderId}}</td></tr>
								<tr><td>申请时间：</td><td>{{getDateTime(list.createTime)[6]}}</td></tr>
								<tr><td>订单状态：</td><td>
									<span v-show="list.orderStatus==1" class="f-c-green">通过</span>
									<span v-show="list.orderStatus==2" class="f-c-red">拒绝</span>
									<span v-show="list.orderStatus==3" class="f-c-yellow">待分配</span>
									<span v-show="list.orderStatus==4" class="f-c-green">已分配</span>
									<span v-show="list.orderStatus==5" class="f-c-yellow">等待自动审核</span>
									<span v-show="list.orderStatus==6" class="f-c-green">复审通过</span>
								</td></tr>
								<tr><td>激活状态：</td><td>
									<span v-show="list.merchantStatus==1" class="f-c-green">已激活</span>
									<span v-show="list.merchantStatus==0" class="f-c-red">游客</span>
								</td></tr>
								<tr><td>审核方式：</td><td>
									<span v-show="list.auditType==1">实时审核</span>
									<span v-show="list.auditType==2">事后审核</span>
									<span v-show="list.auditType==3">自动审核</span>
								</td></tr>
								<tr><td>
									<span v-show="list.merchantType==1">门店名称：</span>
									<span v-show="list.merchantType==2">个人商户名称：</span>
								</td><td>{{list.companyName}}【{{list.dealerId}}】</td></tr>
								<tr><td>
									<span v-show="list.merchantType==1">营业执照编号：</span>
									<span v-show="list.merchantType==2">身份证号码：</span>
								</td><td>{{list.businessLicence}}</td></tr>
								<tr v-show="list.merchantType==2"><td>身份证有效期：</td><td>{{list.idCardPeriod}}</td></tr>
								<tr><td>商户注册电话：</td><td>{{list.phone}}</td></tr>
								<tr><td>门店地址：</td><td>{{list.storeAddress}}</td></tr>
								<tr><td>证件地址：</td><td>{{list.address}}</td></tr>
								<tr><td>邀请码：</td><td>{{list.superInviteCode||'--'}}</td></tr>
								<tr><td>支付宝账号：</td><td>{{list.alipayUserId||'--'}}</td></tr>
								<tr><td>微信账号：</td><td>{{list.weixinUserId||'--'}}</td></tr>
								<tr><td>售卡城市：</td><td>{{list.cityName}}【{{list.cityCode}}】</td></tr>
								<tr><td>商户属性：</td><td>
									<span v-show="list.merchantType==1">企业</span>
									<span v-show="list.merchantType==2">个人</span>
								</td></tr>
								<tr><td>售卡权限：</td><td>
										<span v-show="list.openingType==1">远特卡<span v-if="list.openingArea">({{list.openingArea}})</span></span>
									<span v-show="list.openingType==2">联通卡<span v-if="list.openingArea">({{list.openingArea}})</span></span>
									<span v-show="list.openingType==3">移动卡<span v-if="list.openingArea">({{list.openingArea}})</span></span>
									<span v-show="list.openingType==4">电信卡<span v-if="list.openingArea">({{list.openingArea}})</span></span>
								</td></tr>
								<tr><td>折扣模式：</td><td>{{list.discountModel}}</td></tr>
								<tr><td>号码模式：</td><td>{{list.phoneModel}}</td></tr>
								<tr><td>转账模式：</td><td>{{list.transferModel}}</td></tr>
								<tr><td>设备编号：</td><td>{{list.devMac}}</td></tr>
								<tr><td>设备MAC：</td><td>{{list.devMacAddress}}</td></tr>
								<tr><td>推广渠道：</td><td>{{list.popchannel}}（{{list.popchannelName}}）</td></tr>
								<tr><td>上级商户：</td><td>{{list.superDealerId}}（{{list.superDealerName}}）</td></tr>
								<tr><td>上级de上级商户：</td><td>{{list.superSuperDealerId}}[{{ list.superSuperDealerName }}]</td></tr>
								<tr><td>操作人：</td><td>{{list.userId}}（{{list.userName}}）</td></tr>
								<tr><td>商户来源：</td><td>{{list.merchType==1?'卡盟':list.merchType==2?'新零售':'--'}}</td></tr>
								<tr v-show="orderType==2"><td>审核人ID：</td><td>{{list.customer}}</td></tr>
								<tr v-show="orderType==2&&list.orderStatus==2"><td>备注：</td><td v-html="filterReason()"></td></tr>
							</tbody>
						</table>
					</td>
					<td class="m-box-img m-meida-640up">
						<ImgZoom :imgData="imgData"></ImgZoom>
					</td>
				</tr>
				<tr class="m-box-img m-meida-640down">
					<img v-for="(item,i) in imgData" :src="item.src" :key="i">
				</tr>
			</tbody>
			</table>
		</div>
	</section>
</template>
<script>
import "../assets/km/css/cardOrderDetails.css";
import ImgZoom from "./ImgZoom";
import { getDateTime,translateData,imgUrlDeal } from "../config/utils.js";

export default {
  props: {
    list: Object,
    orderType: String
  },
  data() {
    return {
      imgData: [] //当前订单的图片
    };
  },
  components: {
    ImgZoom: ImgZoom
  },

  created: function() {
    let vm = this;

    vm.imgData = imgUrlDeal([
      { src: vm.list.doorPictureLeft, name: "门店照片-左" },
      { src: vm.list.doorPictureRight, name: "门店照片-右" },
      { src: vm.list.handPicture, name: "手持/免冠证件照" },
      { src: vm.list.signPicture, name: "手签名" }
    ],'ums');

    if (vm.list.merchantType == 2) {
      //个人
      vm.imgData[0].name = "身份证正面";
      vm.imgData[1].name = "身份证反面";
    }
  },
  methods: {
    close: function() {
      this.$parent.off.details = false;
    },
    filterReason() {
      return this.list.remarks.replace(/\|/g, "<br/>");
    },
    getDateTime(v) {
      return getDateTime(v);
	},
	translateData(v,i){
		return translateData(v,i)
	}
  }
};
</script>


<style scoped>
  .set-height{
  	height:3rem;
  }
</style>
<template>
<tbody>
	<tr>
		<td class="set-height">
			<table class="g-inner-table">
				<tbody>
					<tr><td>订单号码：</td><td>{{auditData.sysOrderId||'--'}}</td></tr>
					<tr><td>补登号码：</td><td>{{auditData.phoneNumber||'--'}}[{{ auditData.home }}]</td></tr>
					<tr v-if="auditStatus==2"><td>审核方式：</td><td>
						<span v-if="auditData.auditType=='0'">实时审核</span>
						<span v-else-if="auditData.auditType==1">事后审核</span>
						<span v-else-if="auditData.auditType==2">自动审核</span>
						<span v-else>--</span>
						<a href="javascript:void(0)" @click="$parent.autoAuditInfo" class="details m-l">查看详情</a>
					</td></tr>
					<tr v-if="auditData.status!=-1"><td>拒绝原因：</td><td>{{auditData.reason||'--'}}</td></tr>
					<tr><td>错误码：</td><td>{{auditData.errCode||'--'}}</td></tr>
					<tr><td>设备编码：</td><td>{{auditData.reqParam.devInfo||'--'}}</td></tr>
					<tr><td>原开卡方式：</td><td>{{auditData.oldSource||'--'}}</td></tr>
					<tr><td>原用户姓名：</td><td>{{auditData.oldUserName||auditData.oldReqParam.username||'--'}}</td></tr>
					<tr><td>原证件号码：</td><td>{{auditData.oldIdCard||auditData.oldReqParam.IDcard||'--'}}</td></tr>
					<tr><td>原证件类型：</td><td>{{auditData.oldPapersType||'--'}}</td></tr>
					<tr><td>原证件地址：</td><td>{{auditData.oldUserAddress||auditData.oldReqParam.userAddress||'--'}}</td></tr>
					<tr><td>原证件有效期：</td><td>{{auditData.oldPeriod||auditData.oldReqParam.period||'--'}}</td></tr>
				</tbody>
			</table>
		</td>
		<td class="set-height">
			<table class="g-inner-table">
				<tbody>
					<tr><td>生成时间：</td><td>{{$parent.getDateTime(auditData.createTime)[6]}}</td></tr>
					<tr><td>号码等级：</td><td>
						<span v-show="auditData.numberType==1">普号</span>
						<span v-show="auditData.numberType==2">靓号</span>
					</td></tr>
					<tr><td>商户ID：</td><td>{{auditData.dealerId}}<a v-if="auditData.operatorType==5" href="javascript:void(0)" @click="$parent.detailsMerchant" class="details m-l">查看详情</a></td></tr>
					<tr v-if="auditStatus==2"><td>审核状态：</td><td>
						<span v-if="auditData.status==1" class="f-c-green">同意</span>
						<span v-else-if="auditData.status==2" class="f-c-red">拒绝</span>
						<span v-else>--</span>
					</td></tr>
					<tr v-if="auditData.status!=-1"><td>备注：</td><td>{{auditData.remarks||'--'}}</td></tr>
					<tr><td>错误描述：</td><td>{{auditData.errMsg||'--'}}</td></tr>
					<tr><td>设备MAC：</td><td>{{auditData.reqParam.devMac||'--'}}</td></tr>
					<tr><td>新用户姓名：</td><td>{{auditData.reqParam.username||'--'}}</td></tr>
					<tr><td>新证件号码：</td><td>{{auditData.reqParam.IDcard||'--'}}</td></tr>
					<tr><td>新证件类型：</td><td>{{translateData(2,auditData.newPapersType)}}</td></tr>
					<tr><td>新证件地址：</td><td>{{auditData.reqParam.userAddress||'--'}}</td></tr>
					<tr><td>新证件有效期：</td><td>{{auditData.reqParam.period||'--'}}</td></tr>
				</tbody>
			</table>
		</td>
	</tr>
	<tr>
		<td class="m-box-img"><ImgZoom :imgData="oldImage"></ImgZoom></td>
		<td class="m-box-img"><ImgZoom :imgData="newImage"></ImgZoom></td>
	</tr>
</tbody>
</template>
<script>
import ImgZoom from '../ImgZoom';
import { translateData } from '../../config/utils.js';

export default{
	name:'realTimeCollection',
	props:{
		auditData:Object,
		imgData:Array,
		auditStatus:Number
	},
	data(){
		return{
			newImage:[{src:'',name:''}],
			oldImage:[{src:'',name:''}]
		}
  },
  watch:{
    imgData(){
      this.oldImage=this.imgData.slice(0,3);
      this.newImage=this.imgData.slice(3,7);
    },
  },
	components:{
		ImgZoom
	},
	created:function(){
    this.oldImage=this.imgData.slice(0,3);
    this.newImage=this.imgData.slice(3,7);
	},
	methods:{
		translateData(i,v){
      return translateData(i,v)
    }
	}
}
</script>


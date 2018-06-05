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
					<tr><td>订单号码：</td><td>{{auditData.sysOrderId}}</td></tr>
					<tr><td>生成时间：</td><td>{{getDateTime(auditData.createTime)[6]}}</td></tr>
					<tr><td>用户姓名：</td><td>{{auditData.newUserName}}</td></tr>
                    <tr><td>电话号码：</td><td>{{auditData.phoneNumber}}</td></tr>
                    <tr><td>开卡时间：</td><td>{{auditData.oldReqParam.createTime}}</td></tr>
                    <tr><td>开卡子系统：</td><td>{{auditData.oldSource}}</td></tr>
                    <tr><td>证件类型：</td>
                        <td>
                            <span v-if="auditData.newPapersType==1">身份证</span>
                            <span v-if="auditData.newPapersType==2">护照</span>
                            <span v-if="auditData.newPapersType==3">军官证</span>
                        </td>
                    </tr>
                    <tr><td>证件号码：</td><td>{{auditData.newIdCard}}</td></tr>
                    <tr><td>证件地址：</td><td>{{auditData.reqParam.userAddress}}</td></tr>
                    <tr><td>证件期限：</td><td>{{auditData.reqParam.period}}</td></tr>
                    <tr><td>操作人：</td><td>{{auditData.operatorName}}</td></tr>
                    <tr><td>操作人IP：</td><td>{{auditData.userInfo.ip||'--'}}</td></tr>
                    <tr><td>位置信息：</td>
                        <td>{{auditData.longitude||'--'}},{{auditData.latitude||'--'}}
                            <a href="javascript:void(0)" @click="toMap" class="details m-l">查看地图</a>
                        </td>
                    </tr>
                    <tr><td>渠道ID：</td><td>{{auditData.dealerId}}</td></tr>
                    <tr><td>商户名称：</td><td>{{auditData.companyName}}</td></tr>
                    <tr><td>补换卡原因：</td><td>{{auditData.req_reason}}</td></tr>
				</tbody>
			</table>
		</td>
		<td class="set-height">
			<table class="g-inner-table">
				<tbody>
                    <tr>
                        <td class="m-box-img"><ImgZoom :imgData="oldImage"></ImgZoom></td>
                    </tr>
				</tbody>
			</table>	
		</td>
	</tr>
</tbody>
</template>
<script>
import ImgZoom from '../ImgZoom';
import {getDateTime} from '../../config/utils.js';
export default{
	name:'realTimeCollection',
	props:{
		auditData:Object,
		imgData:Array,
		auditStatus:Number
	},
	data(){
		return{
			newImage:[],
			oldImage:[]
		}
	},
	components:{
		ImgZoom
	},
	created:function(){
		this.oldImage=this.imgData.slice(0,3);
		this.newImage=this.imgData.slice(3,7);
	},
	methods:{
		getDateTime(e){
            return getDateTime(e);
        },toMap(){
			var w=document.documentElement.clientWidth,url='',vm=this;
			let latitude=parseFloat(vm.auditData.latitude);
			let longitude=parseFloat(vm.auditData.longitude);
			w<640 ? url='http://map.baidu.com/mobile/?latlng='+latitude+','+longitude+'' : url='http://map.baidu.com/?latlng='+latitude+','+longitude+'';
			window.open(url);
		},
	}
}
</script>


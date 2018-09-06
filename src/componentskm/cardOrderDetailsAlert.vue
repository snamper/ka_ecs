<style scoped>
#detailsView{position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 997;text-align: center;}
#detailsView>div{display: table-cell;vertical-align: middle;}
#detailsView table{margin:auto;border-radius: 4px;background-color: #fff;border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;}
#detailsView table td{padding:5px;}
#detailsView table th{padding: 10px 0;background-color: #eee;border-radius: 4px 4px 0 0;}
#detailsView table td>.fl{width:1rem;text-align: right;}
#detailsView table td>.fright{margin-left: 1.05rem;text-align: left; }
.lay-mask{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;}
</style>
<template>
<section id="detailsView">
	<div>
  	    <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header> 
        <section class="m-occlusion" :class="{active:off.isLoad}"></section>       
		<table>
			<thead>
				<tr>
					<th colspan="2">
						{{title}}
					</th>
				</tr>
			</thead>
			<tbody v-if="type==1">
				<tr>
					<td><div class="fl">操作人姓名：</div><div class="fright">{{list.userName}}</div></td>
					<td><div class="fl">电话号码：</div><div class="fright">{{list.phone}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">当前城市：</div><div class="fright">{{list.cityName}}</div></td>
					<td><div class="fl">创建时间：</div><div class="fright">{{list.createTime}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">所属商户：</div><div class="fright">{{list.companyName}}</div></td>
					<td><div class="fl">支付宝账号：</div><div class="fright">{{list.alipayID}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">登录手机IP：</div><div class="fright">{{list.phoneIp}}</div></td>
					<td><div class="fl">最近操作时间：</div><div class="fright">{{list.latestTime}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">最近登录时间：</div><div class="fright">{{list.loginTime}}</div></td>
					<td><div class="fl">所用机型：</div><div class="fright">{{list.phoneType}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">账户余额：</div><div class="fright">￥{{parseFloat(list.money)/100}}</div></td>
					<td><div class="fl">赠送余额：</div><div class="fright">￥{{parseFloat(list.deductionFee)/100}}</div></td>
				</tr>
				<tr>
					<td colspan="2" style="padding-bottom:10px;"><div class="fl">经纬度：</div><div class="fright">N{{list.latitude}}，E{{list.longitude}} <a href="javascript:void(0)" @click="toMap" class="details m-l">查看地图</a></div></td>
				</tr>
			</tbody>
			<tbody v-if="type==2">
				<tr>
					<td><div class="fl">网点名称：</div><div class="fright">{{list.companyName}}</div></td>
					<td><div class="fl">渠道ID：</div><div class="fright">{{list.dealerId}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">签约状态：</div><div class="fright">{{list.isSignAgreement}}</div></td>
					<td><div class="fl">签约时间：</div><div class="fright">{{list.signTime}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">所在地址：</div><div class="fright" style="max-width: 200px;">{{list.address}}</div></td>
					<td><div class="fl">商户类别：</div><div class="fright">{{list.userType}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">商户属性：</div><div class="fright">{{list.merchantType}}</div></td>
					<td><div class="fl">售卡范围：</div><div class="fright">
						<span v-if="list.attribute==1">A远特售卡</span>
						<span v-if="list.attribute==2">B联通售卡</span>
						<span v-if="list.attribute==3">C远特售卡+联通售卡</span>
						<span v-if="list.attribute==4">D联通售卡+远特售卡</span>
					</div></td>
				</tr>
				<tr>
					<td><div class="fl">有效总次数：</div><div class="fright">{{list.totalNums}}</div></td>
					<td><div class="fl">保证金：</div><div class="fright">{{parseFloat(list.bond)/100}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">成功次数：</div><div class="fright">{{list.successNums}}</div></td>
					<td><div class="fl">额外成功次数：</div><div class="fright">{{list.extraFrequency}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">获得分数：</div><div class="fright">{{list.getPoints}}</div></td>
					<td><div class="fl">额外分值：</div><div class="fright">{{list.extraCredit}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">扣除分数：</div><div class="fright">{{list.losePoints}}</div></td>
					<td><div class="fl">信用积分：</div><div class="fright">{{list.creditNums}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">真实信用积分：</div><div class="fright">{{list.realCreditNums}}</div></td>		
					<td><div class="fl">显示等级：</div><div class="fright">{{list.showLevel}}</div></td>
				</tr>
				<tr>
					<td><div class="fl">真实等级：</div><div class="fright">{{list.realLevel}}</div></td>
					<td>
						<div class="fl">基础分值：</div>
						<div class="fright">{{ list.btScore }}</div>
					</td>
				</tr>
				<tr>
					<td><div class="fl">开卡佣金：</div><div class="fright">￥{{parseFloat(list.income)/100}}</div></td>
					<td><div class="fl">基础总次数：</div><div class="fright">{{list.btFrequency}}</div></td>
				</tr>
				<tr>
					<td style="padding-bottom:10px;">
						<div class="fl">话分佣金：</div>
						<div class="fright">￥{{parseFloat(list.incomeMoney)/100}}<a href="javascript:void(0)" @click="toIncome" class="details m-l">查看详情</a></div>
					</td>
					<td><div class="fl">基础成功次数：</div><div class="fright">{{list.bsFrequency}}</div></td>
				</tr>
				<tr>
					<td>
						<div class="fl">综合激励：</div>
						<div class="fright">￥{{parseFloat(list.creditMoney)/100}}<a href="javascript:void(0)" @click="toCredit(1)" class="details m-l">查看详情</a></div>
					</td>
					<td><div class="fl">用户总数：</div><div class="fright">{{list.userNum}}<a href="javascript:void(0)" @click="toUserList" class="details m-l">查看详情</a></div></td>
				</tr>
				<tr>
					<td><div class="fl">自推广激励：</div><div class="fright">￥{{parseFloat(list.promotion)/100}}<a href="javascript:void(0)" @click="toCredit(2)" class="details m-l">查看详情</a></div></td>
					<td><div class="fl">创建时间：</div><div class="fright">{{list.createtime}}</div></td>
				</tr>
			</tbody>
		</table>
		<div class="lay-mask" @click="close"></div>
	</div>
</section>
</template>
<script>
import {reqCommonMethodNoLoad} from "../config/service.js";
import {errorDeal} from "../config/utils.js";
export default{
	name:'detailsView',
	props:{
		type:Number,
		list:Object,
		dealerId:String
	},
	data (){
		return {
			title:''
            ,off:{
                isLoad:false
            }
        }
	},
	created:function(){
		var vm=this;
		vm.type==1 ? vm.title='操作者信息' : vm.title='商户信息';
	},
	methods:{
		toMap:function(){
			var w=document.documentElement.clientWidth,url='',vm=this;
			let latitude=parseFloat(vm.list.latitude);
			let longitude=parseFloat(vm.list.longitude);
			w<640 ? url='http://map.baidu.com/mobile/?latlng='+latitude+','+longitude+'' : url='http://map.baidu.com/?latlng='+latitude+','+longitude+'';
			window.open(url);
		},
		toUserList:function(){
			var vm=this;
            reqCommonMethodNoLoad({"dealerId":vm.dealerId},function(){vm.off.isLoad=false;},"km-ecs/w/audit/getUsersDetail")
            .then((data)=>{
                var list= data.data.list;
				var str='';
				for(let i in list){
					if(list[i].isMain==1){
						str+='<tr><td><span class="u-icon-main"></span></td><td>'+list[i].createTime+'</td><td>'+list[i].userName+'</td><td>'+list[i].phone+'</td><td>'+list[i].cityName+'</td></tr>';
					}else{
						str+='<tr><td>'+i+'</td><td>'+list[i].createTime+'</td><td>'+list[i].userName+'</td><td>'+list[i].phone+'</td><td>'+list[i].cityName+'</td></tr>';
					}
				}
				layer.open({
					content:'<div class="f-scroll-lt" style="max-height:430px;overflow-y:scroll"><table><thead><tr><th>序号</th><th>创建时间</th><th>用户姓名</th><th>电话号码</th><th>当前城市</th></tr></thead><tbody>'+str+'</tbody></table></div>',
					type:0,
					title:'用户列表',
					btn:0,
					style:'width:auto;'
				});
            }).catch(error=>errorDeal(error));
		},
		toIncome:function(index){
            var vm=this;
            reqCommonMethodNoLoad({"dealerId":vm.dealerId,"type":index},function(){vm.off.isLoad=false;},"km-ecs/w/audit/getIncomeDetail")
            .then((data)=>{           
                var list= data.data;
				layer.open({
					content:'<ul class="f-scroll-lt lay-details light">'+
					'<li class="clr"><div class="fl">当前余额：</div><div class="fright">￥'+parseFloat(list.leftIncome)/100+'</div></li>'+
					'<li class="clr"><div class="fl">可转额度：</div><div class="fright">￥'+parseFloat(list.livingIncome)/100+'</div></li>'+
					'<li class="clr"><div class="fl">上月佣金：</div><div class="fright">￥'+parseFloat(list.monthIncome)/100+'</div></li>'+
					'<li class="clr"><div class="fl">历史总计：</div><div class="fright">￥'+parseFloat(list.totalIncome)/100+'</div></li></ul>',
					type:0,
					title:'话分佣金详情',
					btn:0,
					style:'width:auto;'
				});
            }).catch(error=>errorDeal(error));;            
		},
		toCredit:function(index){//激励详情,1\综合激励；2\自推广激励
			var vm=this,title='';
			if(index==1){
				title='综合激励详情';
			}else{
				title='自推广激励详情';
			}
            reqCommonMethodNoLoad({"dealerId":vm.dealerId,"type":index},function(){vm.off.isLoad=false;},"km-ecs/w/audit/getCreditDetail")
            .then((data)=>{
                var list= data.data;
				layer.open({
					content:'<ul class="f-scroll-lt lay-details light">'+
					'<li class="clr"><div class="fl">当前余额：</div><div class="fright">￥'+parseFloat(list.leftCredit)/100+'</div></li>'+
					'<li class="clr"><div class="fl">可转额度：</div><div class="fright">￥'+parseFloat(list.livingCredit)/100+'</div></li>'+
					'<li class="clr"><div class="fl">昨日激励：</div><div class="fright">￥'+parseFloat(list.dayCredit)/100+'</div></li>'+
					'<li class="clr"><div class="fl">上月激励：</div><div class="fright">￥'+parseFloat(list.monthCredit)/100+'</div></li>'+
					'<li class="clr"><div class="fl">历史总计：</div><div class="fright">￥'+parseFloat(list.totalCredit)/100+'</div></li></ul>',
					type:0,
					title:title,
					btn:0,
					style:'width:auto;'
				});
            }).catch(error=>errorDeal(error));;            
		},
		close:function(){
			var vm=this;
			vm.$parent.isShowDetails=false;
		}
	}
}
</script>


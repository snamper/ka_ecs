<style scoped>
#detailsView{position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 997;text-align: center;}
#detailsView>div{display: table-cell;vertical-align: middle;}
#detailsView table{margin:auto;border-radius: 4px;background-color: #fff;border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;}
#detailsView table{}
#detailsView table td{padding:5px;}
#detailsView table th{padding: 10px 0;background-color: #eee;border-radius: 4px 4px 0 0;}
#detailsView table td>.fl{width:1rem;text-align: right;}
#detailsView table td>.fright{margin-left: 1.05rem;text-align: left; }
.lay-mask{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;}
</style>
<template>
<section id="detailsView">
	<div @mousewheel="stopScroll">
  	    <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header> 
        <section class="m-occlusion" :class="{active:off.isLoad}"></section>       
		<table>
			<thead>
				<tr>
					<th colspan="2">
						专营号详情
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><div class="fl">专营号码:</div><div class="fright">{{details.number}}</div></td>
				</tr>
                <tr>
					<td><div class="fl">套餐:</div><div class="fright">{{details.standard}}</div></td>                    
                </tr>
                <tr>
					<td><div class="fl">所选包:</div><div class="fright">{{details.optionalPkg}}</div></td>                    
                </tr>
                <tr>
					<td><div class="fl">预存话费:</div><div class="fright">{{details.prestoreMoney}}</div></td>                    
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
        details:Object,
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
	methods:{
		toMap:function(){
			var w=document.documentElement.clientWidth,url='',vm=this;
			let latitude=parseFloat(vm.list.latitude);
			let longitude=parseFloat(vm.list.longitude);
			w<640 ? url='http://map.baidu.com/mobile/?latlng='+latitude+','+longitude+'' : url='http://map.baidu.com/?latlng='+latitude+','+longitude+'';
			window.open(url);
		},stopScroll(e){
            e.preventDefault()
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
			vm.$parent.off.numberDetailsAlert=false;
		}
	}
}
</script>


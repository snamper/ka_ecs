<style scoped>
#detailsView{position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 997;text-align: center;}
#detailsView>div{display: table-cell;vertical-align: middle;}
#detailsView table{padding: 20px; margin:auto;border-radius: 4px;background-color: #fff;border-collapse: collapse;table-layout: fixed;word-wrap:break-word;word-break: break-word;white-space: normal;}
#detailsView table td{padding:5px;}
#detailsView table th{padding: 10px 0;background-color: #eee;border-radius: 4px 4px 0 0;}
#detailsView table td>.fl{width:1rem;text-align: right;}
#detailsView table td>.fright{margin-left: 1.05rem;text-align: left; }
.lay-mask{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;}
.inpexChangePoints{
	width: 280px;
	height: 38px;
	border-radius: 4px;
	border:1px solid grey;
}
.btnexChange{
	width: 100px;
	height: 30px;
}
.btnYes{
  border:1px solid #00B07F;
  border-radius: 5px;
  background: #00B07F;
  color: white;
  padding: 5px 15px;
}
.btnNo{
	border:1px solid red;
  border-radius: 5px;
  background: red;
  color: white;
  padding: 5px 15px;
}
.btnYes:active{
  box-shadow: 0 0 2px #00B07F;
}
.btnNo:active{
  box-shadow: 0 0 2px red;
}
.exchangeInfo{
	font-size: 16px;
	color: red;
}
</style>
<template>
<section  id="detailsView">
	<div>
		<table v-if="$parent.whichLayer==1">
			<thead>
				<tr>
					<th colspan="2">
						积分兑换确认
					</th>
				</tr>
			</thead>
			<tbody v-if="true">
				<tr>
					<td class="exchangeInfo" colspan="2">
						您将兑换{{this.$parent.dh}}积分!				
					</td>
				</tr>
				<tr>
					<td>
						<button class="btnYes" @click="exChangeY('ex')">确认</button>
						<button class="btnNo" @click="close">取消</button>
					</td>
				</tr>
			</tbody>
		</table>
        <table v-if="$parent.whichLayer==2">
			<thead>
				<tr>
					<th colspan="2">
						积分增加确认
					</th>
				</tr>
			</thead>
			<tbody v-if="true">
				<tr>
					<td class="exchangeInfo" colspan="2">
						您将为该用户增加积分!			                        
					</td>
				</tr>
				<tr>
					<td>
						<button class="btnYes" @click="exChangeY('add')">确认</button>
						<button class="btnNo" @click="close">取消</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="lay-mask"></div>
	</div>
	<div>
		<table  v-if="exchangeDet==1">
			<thead>
				<tr>
					<th colspan="2">
						积分兑换情况
					</th>
				</tr>
			</thead>
			<tbody v-if="true">
				<tr>
					<td class="exchangeInfo" colspan="2">
						<p>积分兑换订单号 : <span>{{this.exchangeTab.data.orderId}}</span></p> 
						<p>兑换积分 ： <span>{{this.$parent.dh}}</span></p> 
						<p>操作结果 ： <span>{{this.exchangeRes}}</span></p>				
					</td>
				</tr>
				<tr>
					<td>
						<button class="btnYes" @click="close">确认</button>
					</td>
				</tr>
			</tbody>
		</table>
        <table  v-if="exchangeDet==2">
			<thead>
				<tr>
					<th colspan="2">
						积分增加情况
					</th>
				</tr>
			</thead>
			<tbody v-if="true">
				<tr>
					<td class="exchangeInfo" colspan="2">
						<p>积分增加订单号 : <span>{{this.exchangeTab.data.orderId}}</span></p> 
						<p>操作结果 ： <span>{{this.exchangeRes}}</span></p>				
					</td>
				</tr>
				<tr>
					<td>
						<button class="btnYes" @click="close">确认</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="lay-mask"></div>
	</div>	
</section>
</template>
<script>
import {reqCommonMethod} from "../../config/service.js";
import {errorDeal} from "../../config/utils.js";
export default{
	// name:'detailsView',
	props:{
		type:Number,
		list:Object,
		dealerId:String
	},
	data (){
		return {
			title:'',
			exchangeTab:'',
			exchangeDet:'0',
			exchangeRes:'',
		}
		
	},
	created:function(){
		var vm=this;
		vm.type==1 ? vm.title='操作者信息' : vm.title='商户信息';
	},
	methods:{
		close:function(){
			var vm=this;
			vm.$parent.off.layerState=false;
		},
		exChangeY:function(v){//积分兑换确认
			var vm=this,url,data={};
            if(v=='add'){
                url="ym-ecs/c/user/addUserCredit";
                data.orderId=vm.$parent.orderId;
            }else if(v=='ex'){
                url="ym-ecs/c/user/exchange";
                var points = vm.$parent.dh;//获得要兑换的积分数
			    data.staffNo=vm.$parent.staffNo;
			    data.credit=points;
            }
			// vm.AJAX(url,data,function(data){
			// 	if(data.code==200){
			// 		vm.$parent.off.layerState=true
			// 		vm.exchangeTab = data;
            //         vm.$parent.whichLayer ='0';
			// 		if(v=='add'){
            //             vm.exchangeDet = '2';
            //         }else if(v=='ex'){
            //             vm.exchangeDet = '1';
            //         }
			// 		if(data.msg=="success"){
			// 			vm.exchangeRes="成功"
			// 	     }else{
			// 			vm.exchangeRes="失败"
			// 	     }
			// 		new Promise(function(resolve,reject){
			//         	resolve('success')
			// 		}).then(function(reso){
			// 			// 兑换积分后重新获取积分情况
			// 	       var data = {};
            //            if(v=="ex"){
            //               data.staffNo=vm.$parent.staffNo;
            //               data.depId=vm.$parent.depId;
            //               if(vm.$parent.form.select=='2'){
            //                  data.type="1"
            //               }else if(vm.$parent.form.select=='3'){
            //                 data.type="2"
            //               }
            //               vm.AJAX("c/user/userCredits",data,function(response){
			// 	        	 vm.$parent.detailsData=response.data.list;
			// 	          })
            //            }else if(v=="add"){
            //                data={"type": "","orderId": "","phone": "","startTime": "","endTime": "","staffNo":""};
            //                let context = vm.$parent.form['context'+vm.$parent.form.select];
            //                if(vm.$parent.btntype==1){
            //                    data.type=1;
            //                    data.orderId=vm.$parent.form.context1;
            //                }else if(vm.$parent.btntype==3){
            //                    data.type='3';
            //                    data.staffNo = context;
            //                    data.startTime=Date.parse(vm.$parent.form.startTime);
            //                    data.endTime=Date.parse(vm.$parent.form.endTime);
            //                }else if(vm.$parent.btntype==2){
            //                    data.type = '2';
            //                    data.phone = context;
            //                    data.startTime=Date.parse(vm.$parent.form.startTime);
            //                    data.endTime=Date.parse(vm.$parent.form.endTime);
            //                }
            //                vm.AJAX("c/user/queryOrderFill",data,function(response){
			// 	        	 vm.$parent.detailsData=response.data.list;
			// 	          })
            //            }
			// 		})     
			// 	}
            // });
            reqCommonMethod(data,function(){vm.off.isLoad=false;},url)
            .then((data)=>{
                if(data.code==200){
					vm.$parent.off.layerState=true
					vm.exchangeTab = data;
                    vm.$parent.whichLayer ='0';
					if(v=='add'){
                        vm.exchangeDet = '2';
                    }else if(v=='ex'){
                        vm.exchangeDet = '1';
                    }
					if(data.msg=="success"){
						vm.exchangeRes="成功"
				     }else{
						vm.exchangeRes="失败"
                     }
					new Promise(function(resolve,reject){
			        	resolve('success')
					}).then(function(reso){
						// 兑换积分后重新获取积分情况
				       var data = {};
                       if(v=="ex"){
                          data.staffNo=vm.$parent.staffNo;
                          data.depId=vm.$parent.depId;
                          if(vm.$parent.form.select=='2'){
                             data.type="1"
                          }else if(vm.$parent.form.select=='3'){
                            data.type="2"
                          }
                        //   vm.AJAX("c/user/userCredits",data,function(response){
				        // 	 vm.$parent.detailsData=response.data.list;
                        //   })
                          reqCommonMethod(data,function(){vm.off.isLoad=false;},"ym-ecs/c/user/userCredits")
                          .then((response)=>{
				        	 vm.$parent.detailsData=response.data.list;
                          }).catch(error=>errorDeal(error));    
                       }else if(v=="add"){
                           data={"type": "","orderId": "","phone": "","startTime": "","endTime": "","staffNo":""};
                           let context = vm.$parent.form['context'+vm.$parent.form.select];
                           if(vm.$parent.btntype==1){
                               data.type=1;
                               data.orderId=vm.$parent.form.context1;
                           }else if(vm.$parent.btntype==3){
                               data.type='3';
                               data.staffNo = context;
                               data.startTime=Date.parse(vm.$parent.form.startTime);
                               data.endTime=Date.parse(vm.$parent.form.endTime);
                           }else if(vm.$parent.btntype==2){
                               data.type = '2';
                               data.phone = context;
                               data.startTime=Date.parse(vm.$parent.form.startTime);
                               data.endTime=Date.parse(vm.$parent.form.endTime);
                           }
                        //   vm.AJAX("c/user/queryOrderFill",data,function(response){
				        // 	 vm.$parent.detailsData=response.data.list;
                        //   })
                          reqCommonMethod(data,function(){vm.off.isLoad=false;},"ym-ecs/c/user/queryOrderFill")
                          .then((data)=>{
                              vm.$parent.detailsData=data.data.list;
                          }).catch(error=>errorDeal(error));                             
                       }
					})     
				}
            }).catch(error=>errorDeal(error));    
		}
	}
}
</script>


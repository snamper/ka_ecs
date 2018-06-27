<!--**
  *@info意见反馈详情页
* *-->
<style scoped>
    .fileInputContainer{
        height:36px;
        position:relative;
        width: 40px;
        font-size: 26px;
        display: inline-block;
    }
    .fileInputContainer span{
    	display: inline-block;
    }
    .fileInput{
        height:30px;
        width: 30px;
        position:absolute;
        right:0;
        top:0;
        opacity: 0;
        filter:alpha(opacity=0);
        cursor:pointer;
    }

    .disposeTab>tbody>tr>td:first-child{
		width: auto;
	}
	.disposeTab>tbody>tr>td{
		padding-left:5px; 
	}
	.disposeTab{
		height:100%;
	}
	.g-box{
		display: flex;
		padding-top: 25px;
	}
	.g-box>div{
		padding:20px;
	}
	tr.noborder{
		border:none;
		padding-right: 20px;
	}
	.disposeTab>tbody>tr td{
		border-right:1px solid #dfe6ec;
		text-align: center;
	}
	.disposeTab>tbody>tr.noborder>td{
		border-right:none;
	}
	.disposeTab>tbody>tr>td.noborder{
		border-right:none;
	}
	.imgTab>td{
		text-align: center;
		vertical-align: top;
	}
	.disposeTab>tbody>tr>td:first-child{
		text-align: center;
	}
	.imgTab>td>img{
		width:90%;
	}
	span.title{
		font-size: 16px;
		padding:5px;
		font-weight: bold; 
		display: inline-block;
	}
	.disposeb>div{
		height: 100%;
	}
	.disposeb>div>div{
		width: 100%;
		height: 100%;
		background: white;

	}
	.disposeb>div>div:nth-child(2){
		height: 95%;
	}
	.disposeLog{
		padding:20px;
		height: 70%;
	}
	.disposeLog>ul:not(:first-child){
		margin-top: 20px;
	}
	.disposeLog>ul{
		width: 100%;
	}
	.disposeLog>ul>li{
		width: 100%;
		list-style: disc;
		margin-left: 20px;
	}
	.disposeInput{
		height: 16%;
		border-top: 2px solid #EAEAEA;
		position: relative;
	}
	.disposeInput>div{
		width: 88%;
		margin:0 auto;
	}
	.borderR{
		border-right: 1px solid #dfe6ec;
	}
	.disposeTab>tbody>tr.bgwhite{
		background: white;
	}
	.disposeTab>tbody>tr td:nth-child(even){
		text-align: left;
	}
	.disposeTab>tbody>tr td.vt{
		vertical-align: top;
	}
	p.tl,.disposeTab>tbody>tr td.tl{
		text-align: left;
	}
	p.tr,.disposeTab>tbody>tr td.tr{
		text-align: right;
	}
	.disposeTab>tbody>tr.mgt10{
		margin-top:10px; 
	}
	.disposeInput .emoij{
		text-align: left;
		height:25px;
	}
	.disposeInputBtn button{
		margin-top: 10px;
		width: 88px;
		height: 24px;
		border-radius: 7px;
		outline: none;
	}
	.disposeInputBtn button:active{
		box-shadow: 0 0 2px grey;
	}
	.disposeInputBtn button:nth-child(1){
		background: #f85656;
		border: 1px solid  #f85656;
		color: white;
		margin-right: 15px;
	}
	.disposeInputBtn button:nth-child(2){
		background: #42bce8;
		border:1px solid #42bce8;
		color: white;
	}
	.disposeInputBtn button.forb{
		background: grey;
		border:1px solid grey;
		color: white;

	}
	.disposeDiv{
		width: 100%;
	}
	.padl{
		margin-left: .2rem;
	}
	div.disposes{
		display: none;
	}
	div.disposes .title:nth-child(2){
		display: block;
		 background: rgb(241, 242, 243);
	}
	@media screen and (max-width: 700px){
    	div.disposeb{
    		display: none;
    	}
    	div.disposes{
    		display: inline-block !important;
    	}
    	div.disposes .title{
    		display: inline !important;
    	}
    }
</style>
<template>
<section class="g-list-box" id="details">
	<header class="g-lis-head padl">
		<a class="m-details-back u-icon-back" @click="close"></a>
  	</header>
	<div class="g-box">
          <!--反馈单详情-->
          <div style="flex:1;height:100%;width:50%;" >
          	<span class="title">反馈单详情</span>
          	<table class="g-list-table" style="height:95%;" >
			<tbody>
				<tr>
					<td>
						<table class="disposeTab g-inner-table">
							<tbody>
								<tr >
									<td >反馈单号</td>
									<td colspan="2">{{list.acceptId||'--'}} 
										<span v-if="list.status==1" style="color:#3DD79B">待处理</span>
										<span v-if="list.status==2" style="color:#4b3887">进行中</span>
										<span v-if="list.status==3" style="color:#E13722">已完成</span>
									</td>
								    <td>提交时间</td>
								    <td class="noborder" colspan="2">{{new Date(list.creattime).toLocaleString()||'--'}}</td>
								</tr>
								<tr >
									<td>反馈人</td>
									<td colspan="2">{{list.userName||'--'}} 
									<span>【ID : {{list.userId||'--'}}】</span>
									<a  href="javascript:void(0)" @click="detailsUser" class="details m-l">查看详情</a>	
									</td>
								    <td>商户名称</td>
								    <td class="noborder" colspan="2">{{list.companyName||'--'}} <span>【信用等级：{{list.showLevel||'--'}}】</span> </td>
								</tr>
								<tr >
									<td>反馈人位置</td>
									<td colspan="2">{{list.longitude||'--'}},{{list.latitude||'--'}}
									<a href="javascript:void(0)" @click="toMap" class="details m-l">查看地图</a>
									</td>
								    <td>渠道ID</td>
								    <td class="noborder" colspan="2">{{list.dealerId||'--'}}
									<a  href="javascript:void(0)" @click="detailsMerchant" class="details m-l">查看详情</a>
								    </td>
								</tr>
								<tr></tr>
								<tr></tr>
								<tr class="noborder bgwhite">
									<td>反馈类型 : </td>
									<td v-if="list.type==1" class="tl" colspan="5">功能异常</td>
									<td v-if="list.type==2" class="tl" colspan="5">其他问题</td>
								</tr>
								<tr></tr>
								<tr></tr>
								<tr class="noborder">
									<td>联系电话 : </td>
									<td class="tl" colspan="5">{{list.phone||'--'}}</td>
								</tr>
								<tr></tr>
								<tr></tr>
								<tr class="noborder bgwhite mgt10">
									<td class="vt">反馈内容 : </td>
									<td colspan="5" class="vt tl" style="padding-right:25px;letter-spacing:2px" >{{list.content||'--'}}</td>
								</tr>
								<!-- <tr class="imgTab noborder">
									<td colspan="2" rowspan="14"><img src="../assets/images/no-img.png"></td>
									<td colspan="2" rowspan="14"><img src="../assets/images/no-img.png"></td>
									<td colspan="2" rowspan="14"><img src="../assets/images/no-img.png"></td>
								</tr> -->
								<tr class="imgTab noborder">
									<td colspan="6" rowspan="18"></td>
								</tr>
								<tr></tr>		
							</tbody>
						</table>
					</td>
				</tr>
				<tr class="m-box-img m-meida-640down">
		        <div class="disposes" style="flex:1;">
          	<div style="height:100%">
          	    <span class="title" >反馈处理</span>
          	    <div  class="disposeDiv">
          	    	<div  class="disposeLog" style="overflow:auto;height:100%">
          	    		<ul v-for="(v,i) in logList">
	          	    		<li>{{new Date(v.treatTime).toLocaleString()}}  {{v.treatNote}}</li>
	          	    		<li v-if="v.treaterName">处理人: <span>{{v.treaterName}} 【ID : {{v.treaterId}}】</span></li>
	          	    	</ul>
          	    	</div>
          	    	<div class="disposeInput" v-if="list.status!=3">
          	    		<div >
          	    			<p class="tl emoij">
          	    				<!-- <div class="fileInputContainer">
          	    			  	  <span class="icon-happy"></span>
							    </div> -->
          	    			   <!--  <div class="fileInputContainer">
          	    			  	  <span class="icon-file-picture"></span>
								  <input class="fileInput " type="file" name="" id="" />
							    </div>
							    <div class="fileInputContainer">
          	    			  	  <span class="icon-folder-upload"></span>
								  <input class="fileInput " type="file" name="" id="" />
							    </div> -->
          	    		    </p>
          	    		    <input type="text" v-model="form.context1">
          	    		    <p class="tr disposeInputBtn">
          	    		    	<button  :class="{forb:form.context1.length==0? true : false}" :disabled="form.context1.length==0? true : false " :name="list.acceptId" @click="btnDeal('finished')">处理结束</button>
          	    		    	<button  :class="{forb:form.context1.length==0? true : false}" :disabled="form.context1.length==0? true : false " :name="list.acceptId" @click="btnDeal('continue')">继续跟进</button>
          	    		    </p>
          	    		</div>
          	    	</div>
          	    </div>          		
          	</div>
          	<!-- <div>
          		<span class="title" style="padding:10px;">沟通互动</span>
          		<div class="talkDiv"></div>
          	</div> -->
          </div>
				</tr>
			</tbody>
  		      </table>
          </div>
          <!--反馈处理-->
          <div class="disposeb"  style=" word-wrap:break-word;word-break:break-all; overflow: hidden;flex:1;height:100%;width:50%;letter-spacing:1px;">
          	<div >
          	    <span class="title">反馈处理</span>
          	    <div  class="disposeDiv">
          	    	<div  class="disposeLog" style="overflow:auto;height:85%">
          	    		<ul style="white-space: normal" v-for="(v,i) in logList">
	          	    		<li>{{new Date(v.treatTime).toLocaleString()}}  {{v.treatNote}}</li>
	          	    		<li v-if="v.treaterName">处理人: <span>{{v.treaterName}} 【ID : {{v.treaterId}}】</span></li>
	          	    	</ul>	
          	    	</div>
          	    	<div v-if="list.status!=3" class="disposeInput" style="height:15%">
          	    		<div >
          	    			<p class="tl emoij">
          	    				<!-- <div class="fileInputContainer">
          	    			  	  <span class="icon-happy"></span>
							    </div> -->
          	    			    <!-- <div class="fileInputContainer">
          	    			  	  <span class="icon-file-picture"></span>
								  <input class="fileInput " type="file" name="" id="" />
							    </div>
							    <div class="fileInputContainer">
          	    			  	  <span class="icon-folder-upload"></span>
								  <input class="fileInput " type="file" name="" id="" />
							    </div> -->
          	    		    </p>
          	    		    <input  type="text" v-model="form.context1">
          	    		    <p v-if="list.status!=3" class="tr disposeInputBtn">
          	    		    	<button  :class="{forb:form.context1.length==0? true : false}" :disabled="form.context1.length==0? true : false " :name="list.acceptId" @click="btnDeal('finished')">处理结束</button>
          	    		    	<button  :class="{forb:form.context1.length==0? true : false}" :disabled="form.context1.length==0? true : false " :name="list.acceptId" @click="btnDeal('continue')">继续跟进</button>
          	    		    </p>
          	    		</div>
          	    	</div>
          	    </div>          		
          	</div>
          <!-- 	<div>
          		<span class="title" style="display:block;padding:10px;background:#F1F2F3;">沟通互动</span>
          		<div class="talkDiv"></div>
          	</div> -->
          </div>
		
  	</div>
  <um-details-view v-if="isShowDetails" :type="typeDetails" :list="detailsList" :dealerId="list.dealerId">

  </um-details-view>
</section>
</template>
<script>
import "../assets/km/css/cardOrderDetails.css";
import "../assets/km/css/fontstyle.css";
import ImgZoom from '../componentskm/ImgZoom';
import detailsView from '../componentskm/cardOrderDetailsAlert';
import { reqCommonMethod,SDK_IMAGE_URL } from '../config/service';
import {errorDeal} from "../config/utils.js";
import '../assets/km/js/base64.min.js';
export default{
	name:'opinionDetails',
	props:{
		list:Object,
		logList:Array,
	},
	data(){
		return{
			imgData:[],//当前订单的图片
			isShowDetails:0,
			typeDetails:0,
			detailsList:'',
			userMoreInfo:'',//sdk更多用户信息
			log:'',
			form:{
				context1:'',
			},
			
		}
	},
    components:{
		'um-details-view':detailsView,
		'ImgZoom':ImgZoom
	},
	mounted:function(){
		this.init();
	},
	methods:{
		init:function(){
			this.con = this.list;
		},
		close:function(){
			let vm=this,url,
				vmPa=vm.$parent,
				page=vmPa.pageNum;
			vmPa.off.details=false;
			let i=vmPa.off.whichBtn;
			let s=vmPa.form.select;
	        let userInfo=localStorage.getItem('KA_ECS_USER');
	            userInfo=JSON.parse(userInfo);
	        let customerId=userInfo.customerId,
	        json={
	          status:vmPa.off.type,
	          type:vmPa.form.orderType,
	          starttime:Date.parse(vmPa.form.startTime),
	          endtime:Date.parse(vmPa.form.endTime),
	          pageNum:page||'1',
	          pageSize:'10',
	          acceptId:'',
	          dealerId:'',
	          phone:'',
	          treatUserId:'',//处理人id
	          userId:''//反馈人id
	        };

			if(i==1){
				 if(s==2){
		            json.dealerId=vmPa.form.context2;
		          }
		          else if(s==6){
		            json.userId=vmPa.form.context6;
		          }
		          else if(s==3){
		            json.phone=vmPa.form.context3;
		          }
		          else if(s==4){
		            json.treatUserId=vmPa.form.context4;
		          }
			}else if(i==2){
				 json={
		              status:vmPa.off.type,
		              starttime:Date.parse(vmPa.form.startTime),
		              endtime:Date.parse(vmPa.form.endTime),
		              pageNum:page||'1',
		              pageSize:'10',
		              acceptId:vmPa.form.context1,
		              dealerId:'',
		              phone:'',
		              treatUserId:'',
		              treatName:''
		          };
			} 
		// 	vm.AJAX("w/advice/query",json,function(data){
        //     vmPa.list=data.data.pageData;//数据
        //     vmPa.total=data.data.total;//总条数
        //     vmPa.maxpage=Math.ceil(parseInt(data.data.total)/10);//最大页码
        //     vm.index=vmPa.off.whichBtn;
        //     vmPa.callback=function(v){vmPa.searchList(vm.index,v)};
        //   },function(){
        //     vmPa.off.isLoad=false;
        //   });
        reqCommonMethod(json,false,"km-ecs/w/advice/query")
        .then((data)=>{
            vmPa.list=data.data.pageData;//数据
            vmPa.total=data.data.total;//总条数
            vmPa.maxpage=Math.ceil(parseInt(data.data.total)/10);//最大页码
            vm.index=vmPa.off.whichBtn;
            vmPa.callback=function(v){vmPa.searchList(vm.index,v)};
        }).catch(error=>errorDeal(error));
		},
		detailsUser:function(){//操作者详情
		var vm=this;
		// vm.AJAX('w/audit/getUserInfo',{"userId":vm.list.userId},function(data){
		// 	vm.detailsList=data.data;
		// 	vm.isShowDetails=true;
		// 	vm.typeDetails=1;
        // });
        reqCommonMethod({"userId":vm.list.userId},false,"km-ecs/w/audit/getUserInfo")
        .then((data)=>{
            vm.detailsList=data.data;
			vm.isShowDetails=true;
			vm.typeDetails=1;
        }).catch(error=>errorDeal(error));;
		},
		detailsMerchant:function(){//商户详情
			var vm=this;
			// vm.AJAX('w/audit/getMerchantInfo',{"dealerId":vm.list.dealerId},function(data){
			// 	vm.detailsList=data.data;
			// 	vm.isShowDetails=true;
			// 	vm.typeDetails=2;
            // });
            reqCommonMethod({"dealerId":vm.list.dealerId},false,"km-ecs/w/audit/getMerchantInfo")
            .then((data)=>{
                vm.detailsList=data.data;
				vm.isShowDetails=true;
				vm.typeDetails=2;
            }).catch(error=>errorDeal(error));
		},
		toMap(){
			var w=document.documentElement.clientWidth,url='',vm=this;
			let latitude=parseFloat(vm.list.latitude);
			let longitude=parseFloat(vm.list.longitude);
			w<640 ? url='http://map.baidu.com/mobile/?latlng='+latitude+','+longitude+'' : url='http://map.baidu.com/?latlng='+latitude+','+longitude+'';
			window.open(url);
		},
		btnDeal(btn){
			let vm = this,
			    acceptId = event.target.name;
			let	json = {"acceptId":acceptId,"note": vm.form.context1};
				if(btn == "finished"){
					json.isEnd = 1
				}else if(btn == "continue"){
					json.isEnd = 0
				}
				vm.form.context1 = '';
				// vm.AJAX("w/advice/treatFeedback",json,function(data){
				// 	vm.AJAX("w/advice/getDetails" ,json,function(data){	
				// 	  vm.$parent.detailsData=data.data.details;
				// 	  vm.$parent.detailsData.content = BASE64.decode(vm.$parent.detailsData.content);
			    //       vm.$parent.detailsLog=data.data.process;
			    //       // vm.$parent.detailsLog.unshift({"acceptId": "F18010810202700000","treatNote": "已提交开发部修改！","treatTime": vm.$parent.detailsData.treattime,})
			    //     },function(){
			    //       vm.$parent.off.isLoad=false;
			    //     })
                // });
                reqCommonMethod(json,function(){vm.$parent.off.isLoad=false;},"km-ecs/w/advice/treatFeedback")
                .then((data)=>{
                    reqCommonMethod(json,function(){vm.$parent.off.isLoad=false;},"km-ecs/w/advice/getDetails")
                    .then((data)=>{
                    vm.$parent.detailsData=data.data.details;
					vm.$parent.detailsData.content = BASE64.decode(vm.$parent.detailsData.content);
			        vm.$parent.detailsLog=data.data.process;
                    }).catch(error=>errorDeal(error));
                }).catch(error=>errorDeal(error));
		}
	}
}
</script>


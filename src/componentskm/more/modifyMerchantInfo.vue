<!--**
  *@info 修改商户信息模块
  *@author: thinkmix
  *@date 2018-05-15
* *-->
<template>
	<div id="modifyInfo">
	  <section class="g-list-box">
			<header class="g-lis-head">
				<a class="m-details-back u-icon-back" @click="close"></a>
				<div class="m-footD-btn">
                    <a class="f-btn f-btn-success" @click="actionSubmitModify">确定修改</a>
                </div>
			</header>
	  	  <div class="g-box">
			  <table class="g-list-table">
				<tbody>
					<tr>
						<!--左侧信息区域-->
						<td>
							<table class="g-inner-table">
								<tbody>
									<tr><td>网点名称：</td><td>{{merchantInfo.companyName}}</td></tr>
									<tr><td>渠道ID：</td><td>{{merchantInfo.dealerId}}</td></tr>
									<tr><td>证件地址：</td><td>{{merchantInfo.address}}</td></tr>
									<tr><td><em class="f-c-red">*</em>证件号码：</td><td>
										<input v-model="modifyInfo.businessLicense" type="text" maxlength="32">
										<span class="u-icon-red_close" @click="inputClear('businessLicense')"></span>
									</td></tr>
									<tr><td><em class="f-c-red">*</em>门店地址：</td><td>
										<input v-model="modifyInfo.storeAddress" type="text" maxlength="32">
										<span class="u-icon-red_close" @click="inputClear('storeAddress')"></span>
									</td></tr>
									<tr><td>售卡城市：</td><td>
										<div class="m-dropdown-select">
							              <button class="drop-button" @click="dropSelectButton"><span class="text">{{cityData[drop.select].name}}</span><i class="caret"></i></button>
							              <ul class="drop-menu f-scroll-lt" v-if="drop.off">
							                <li v-for="(todo,index) in cityData" :key="index"><a @click="dropSelectScope(index)">{{todo.name}}</a></li>
							              </ul>
							            </div>
									</td></tr>
									<tr><td>微信提现账户：</td><td>
										<input v-model="modifyInfo.pickMoneyWechat" type="text" maxlength="32">
										<span class="u-icon-red_close" @click="inputClear('pickMoneyWechat')"></span>
									</td>
									</tr>
									<tr><td>支付宝提现账户：</td><td>
										<input v-model="modifyInfo.pickMoneyAlipay" type="text" maxlength="32">
										<span class="u-icon-red_close" @click="inputClear('pickMoneyAlipay')"></span>
									</td></tr>
									<tr><td>上级商户名称：</td><td>
										<input v-model="modifyInfo.superDealerName" type="text" maxlength="32">
										<span class="u-icon-red_close" @click="inputClear('superDealerName')"></span>
									</td></tr>
									<tr><td>上级商户ID：</td><td>
										<input v-model="modifyInfo.superDealerId" type="text" maxlength="32">
										<span class="u-icon-red_close" @click="inputClear('superDealerId')"></span>
									</td></tr>
									<tr><td>上级推广渠道名称：</td><td>
										<input v-model="modifyInfo.popDealerName" type="text" maxlength="32">
										<span class="u-icon-red_close" @click="inputClear('popDealerName')"></span>
									</td></tr>
									<tr><td>上级推广渠道ID：</td><td>
										<input v-model="modifyInfo.popDealerId" type="text" maxlength="32">
										<span class="u-icon-red_close" @click="inputClear('popDealerId')"></span>
									</td></tr>
									<tr><td>总部推广渠道名称：</td><td>
										<input v-model="modifyInfo.topDealerName" type="text" maxlength="32">
										<span class="u-icon-red_close" @click="inputClear('topDealerName')"></span>
									</td></tr>
									<tr><td>总部推广渠道ID：</td><td>
										<input v-model="modifyInfo.topDealerId" type="text" maxlength="32">
										<span class="u-icon-red_close" @click="inputClear('topDealerId')"></span>
									</td></tr>
								</tbody>
							</table>
						</td>
						<!--右侧图片区域-->
						<td class="m-img-box">
							<table>
								<tbody>
									<tr class="hd f-tal"><td colspan="3">原证件照片</td></tr>
									<tr class="img">
										<td>
											<a target="_blank" :href="imgData.frontImageUrl" :style="{backgroundImage:`url(${imgData.frontImageUrl})`}"></a>
										</td>
										<td>
											<a target="_blank" :href="imgData.backImageUrl" :style="{backgroundImage:`url(${imgData.backImageUrl})`}"></a>
										</td>
										<td>
											<a target="_blank" :href="imgData.handImageUrl" :style="{backgroundImage:`url(${imgData.handImageUrl})`}"></a>
										</td>
									</tr>
									<tr class="info">
										<td>
											<div>正面</div>
											<button @click="setUploadIndex(1)">上传照片
												<FileUpload
												  text=""
												  inputAccept="image/png,image/jpeg,image/jpg"
												  uploadIndex="1"
												  v-bind:headers="userInfo"
										          v-bind:crop="false"
										          v-bind:url=upload.action
										          v-on:imageuploaded="imageuploaded"
										          v-on:imagechanged="imagechanged"
										          v-on:onprogress="onprogress"
										          v-on:errorhandle="errorhandle"
										          class="m-upload"/>
										        <span v-show="upload.index==1" class="progress" :style="{width:`${upload.progress}`}"></span>
										    </button>
										</td>
										<td>
											<div>反面</div>
											<button @click="setUploadIndex(2)">上传照片
												<FileUpload
												  text=""
												  inputAccept="image/png,image/jpeg,image/jpg"
												  uploadIndex="2"
												  v-bind:headers="userInfo"
										          v-bind:crop="false"
										          v-bind:url=upload.action
										          v-on:imageuploaded="imageuploaded"
										          v-on:imagechanged="imagechanged"
										          v-on:onprogress="onprogress"
										          v-on:errorhandle="errorhandle"
										          class="m-upload"/>
										        <span v-show="upload.index==2" class="progress" :style="{width:`${upload.progress}`}"></span>
										    </button>
										</td>
										<td>
											<div>手持</div>
											<button @click="setUploadIndex(3)">上传照片
												<FileUpload
												  text=""
												  inputAccept="image/png,image/jpeg,image/jpg"
												  uploadIndex="3"
												  v-bind:headers="userInfo"
										          v-bind:crop="false"
										          v-bind:url=upload.action
										          v-on:imageuploaded="imageuploaded"
										          v-on:imagechanged="imagechanged"
										          v-on:onprogress="onprogress"
										          v-on:errorhandle="errorhandle"
										          class="m-upload"/>
										        <span v-show="upload.index==3" class="progress" :style="{width:`${upload.progress}`}"></span>
										    </button>
										</td>
									</tr>
									<tr class="hd f-tal"><td colspan="3">新证件照片</td></tr>
									<tr class="img">
										<td>
											<a target="_blank" :style="{backgroundImage:`url(${uploadThumb.frontImageUrl})`}"></a>
										</td>
										<td>
											<a target="_blank" :style="{backgroundImage:`url(${uploadThumb.backImageUrl})`}"></a>
										</td>
										<td>
											<a target="_blank" :style="{backgroundImage:`url(${uploadThumb.handImageUrl})`}"></a>
										</td>
									</tr>
									<tr class="info">
										<td>
											<div>正面</div>
										</td>
										<td>
											<div>反面</div>
										</td>
										<td>
											<div>手持</div>
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
  </div>
</template>
<script>
import "../../assets/km/css/cardOrderDetails.css";
import { reqCommonMethod } from "../../config/service";  
import { errorDeal,getStore,imgUrlDeal } from '../../config/utils';
import ImgZoom from '../ImgZoom';
import FileUpload  from '@/components/file-upload';
import imgToBase64 from '@/utils/imgToBase64';

export default{
	props:{
		merchantInfo:Object,
	},
	data (){
		return {
			cityData:[{"name":"北京","code":"110"},{"name":"长春","code":"901"},{"name":"长沙","code":"741"},{"name":"沧州","code":"180"},{"name":"常州","code":"440"},{"name":"成都","code":"810"},{"name":"重庆","code":"831"},{"name":"大连","code":"940"},{"name":"大庆","code":"981"},{"name":"东莞","code":"580"},{"name":"佛山","code":"530"},{"name":"福州","code":"380"},{"name":"广州","code":"510"},{"name":"贵阳","code":"850"},{"name":"哈尔滨","code":"971"},{"name":"海口","code":"501"},{"name":"杭州","code":"360"},{"name":"合肥","code":"305"},{"name":"呼和浩特","code":"101"},{"name":"湖州","code":"362"},{"name":"惠州","code":"570"},{"name":"济南","code":"170"},{"name":"嘉兴","code":"363"},{"name":"江门","code":"550"},{"name":"金华","code":"367"},{"name":"开封","code":"762"},{"name":"昆明","code":"860"},{"name":"丽水","code":"469"},{"name":"南昌","code":"750"},{"name":"南京","code":"340"},{"name":"南宁","code":"591"},{"name":"南通","code":"358"},{"name":"宁波","code":"370"},{"name":"平顶山","code":"769"},{"name":"青岛","code":"166"},{"name":"衢州","code":"468"},{"name":"泉州","code":"480"},{"name":"汕头","code":"560"},{"name":"上海","code":"310"},{"name":"绍兴","code":"365"},{"name":"深圳","code":"540"},{"name":"沈阳","code":"910"},{"name":"石家庄","code":"188"},{"name":"苏州","code":"450"},{"name":"台州","code":"476"},{"name":"泰州","code":"445"},{"name":"天津","code":"130"},{"name":"潍坊","code":"155"},{"name":"温州","code":"470"},{"name":"乌鲁木齐","code":"890"},{"name":"无锡","code":"330"},{"name":"芜湖","code":"303"},{"name":"武汉","code":"710"},{"name":"西安","code":"841"},{"name":"厦门","code":"390"},{"name":"徐州","code":"350"},{"name":"烟台","code":"161"},{"name":"盐城","code":"348"},{"name":"银川","code":"880"},{"name":"珠海","code":"620"},{"name":"镇江","code":"343"},{"name":"中山","code":"556"},{"name":"舟山","code":"364"},{"name":"郑州","code":"760"}],
			drop:{//下拉控制
		       select:0,
		       off:0,
		    },
		    upload:{//上传组件参数
				files:'',
				action:'km_ums/w/upload/merchantFileUpload',
				response:'',
				progress:0,
				index:1//1,正面上传;2,反面上传;3,手持上传;
			},
			userInfo:'',
			uploadThumb:{//缩略图
				frontImageUrl:'',//正面照片地址
				backImageUrl:'',//反面照片地址
				handImageUrl:''//手持照片地址
			},
			imgData:{//原照片地址
				frontImageUrl:'',//正面照片地址
				backImageUrl:'',//反面照片地址
				handImageUrl:''//手持照片地址
			},
			modifyImg:{//新上传的照片路径
				frontImageUrl:'',
				backImageUrl:'',
				handImageUrl:''
			},
			modifyInfo:{//修改的信息
				businessLicense:'',
				storeAddress:'',
				pickMoneyWechat:'',
				pickMoneyAlipay:'',
				superDealerName:'',
				superDealerId:'',
				popDealerName:'',
				popDealerId:'',
				topDealerName:'',
				topDealerId:'',
			},
		}
	},
	components:{
		ImgZoom,
		FileUpload
	},

	created:function(){

		vm.userInfo=getStore('KA_ECS_USER');
		vm.imgData={
			frontImageUrl:imgUrlDeal(vm.merchantInfo.frontImageUrl,'ums'),
			backImageUrl:imgUrlDeal(vm.merchantInfo.backImageUrl,'ums'),
			handImageUrl:imgUrlDeal(vm.merchantInfo.handImageUrl,'ums'),
		};

		let modify_keys=Object.keys(vm.modifyInfo);
		modify_keys.forEach((val)=>{
			vm.modifyInfo[val]=vm.merchantInfo[val];
		});

		vm.cityData.forEach((val,index)=>{//设置售卡区域index
			if(val.name==vm.merchantInfo.openedCity)vm.drop.select=index;
		})
		
	},
	mounted(){
		let vm=this;

		document.attachEvent ? document.body.attachEvent("onclick",function(event){
	     vm.drop.off=false;
	     window.event.cacenlBubble=false;
	    }) : document.body.addEventListener("click", function(event) {
	     vm.drop.off=false;
	     event.stopPropagation();
	    },false);
	},
	methods:{
		actionSubmitModify(){//提交修改的数据
			const vm=this;

			let json=JSON.parse(JSON.stringify(vm.modifyInfo));//深拷贝

			if(!json.businessLicense.match(/^\w+$/)){
				errorDeal('证件号码格式错误');
				return false;
			}else if(!json.storeAddress){
				errorDeal('请输入门店地址');
				return false;
			}else if(json.pickMoneyWechat&&!json.pickMoneyWechat.match(/^\w+$/)){
				errorDeal('微信提现账户格式错误');
				return false;
            }else if(json.pickMoneyAlipay&&!json.pickMoneyAlipay.match(/^[^\u4e00-\u9fa5]+$/)){
				errorDeal('支付宝账户格式错误');
				return false;
            }
            else if(json.superDealerId&&!json.superDealerId.match(/^\w+$/)){
				errorDeal('上级商户ID格式错误');
				return false;
			}else if(json.popDealerId&&!json.popDealerId.match(/^\w+$/)){
				errorDeal('上级推广渠道ID格式错误');
				return false;
			}else if(json.topDealerId&&!json.topDealerId.match(/^\w+$/)){
				errorDeal('总部推广渠道ID格式错误');
				return false;
			}

			json.openedCity=vm.cityData[vm.drop.select].name;
			json.cityCode=vm.cityData[vm.drop.select].code;
			Object.assign(json,vm.modifyImg);
			json.dealerId=vm.merchantInfo.dealerId;

			reqCommonMethod(json,false,'km-ecs/w/merchant/updateDynamic')
			.then((data)=>{
				layer.open({
					content:'修改成功',
					skin: 'msg',
					time: 1,
					msgSkin:'success',
				});
				setTimeout(function(){
					vm.close();
					vm.$emit && vm.$emit('details', vm.merchantInfo.dealerId,1,'x');
				},1000)
			})
		},
		close:function(){//关闭修改组件
			this.$parent.off.modifyInfo=false;
		},
		dropSelectButton:function(e){
	       var vm=this;
	       vm.drop.off ? vm.drop.off=false : vm.drop.off=true;
	       e.stopPropagation();
	    },
	    dropSelectScope:function(index){
	      var vm=this;
	      vm.drop.select=index;
	    },
	    inputClear(key){//清除输入框对应项
	    	this.modifyInfo[key]='';
	    },
	    setUploadIndex(index){
	    	this.upload.index=index;
	    	//将参数放在头部
	    	this.userInfo.imgNo=index;
	    	if(index==1){
	    		this.userInfo.imgPath=this.merchantInfo.frontImageUrl;
	       	}else if(index==2){
	       		this.userInfo.imgPath=this.merchantInfo.backImageUrl;
			}else if(index==3){
				this.userInfo.imgPath=this.merchantInfo.handImageUrl;
			}
	    },
	    imageuploaded(res,uploadIndex) {
			const vm=this;

			setTimeout(function(){
				vm.upload.progress=0;
			},300)

	       	if(res&&res.code=="200"){
	       		if(uploadIndex==1){
		       		vm.modifyImg.frontImageUrl=res.data.imgPath;
		       	}else if(uploadIndex==2){
		       		vm.modifyImg.backImageUrl=res.data.imgPath;
				}else if(uploadIndex==3){
		       		vm.modifyImg.handImageUrl=res.data.imgPath;
				}
	       		layer.open({
			        content:'上传成功',
			        skin: 'msg',
			        time: 3,
			        msgSkin:'success',
			    });
			    vm.upload.files='';
	       	}else if(res){
	       		vm.errorhandle(res)
	       	}
	    },
	    imagechanged(res) {
			const vm=this;
			let uploadIndex=vm.upload.index;
			vm.upload.files=res;
			imgToBase64({
				file:res,
				complete:function(data){
					if(uploadIndex==1){
			       		vm.uploadThumb.frontImageUrl=data;
			       	}else if(uploadIndex==2){
			       		vm.uploadThumb.backImageUrl=data;
					}else if(uploadIndex==3){
			       		vm.uploadThumb.handImageUrl=data;
					}
				}
			})
			
		},
		onprogress(res){
			this.upload.progress=(res.loaded/res.total*100).toFixed(2)+'%';
		},
		errorhandle(err) {
		  const vm=this;
		  vm.upload.files='';

		  setTimeout(function(){
			vm.upload.progress=0;
		  },300)
		  
		  errorDeal(err)
		},
	}
}
</script>
<style scoped>
	.u-icon-red_close{
		background-image:url('../../assets/images/close_grey.png');
		position:relative;
		z-index:99;
		cursor:pointer;
		margin-left:-0.25rem;
		margin-top:-5px;
		width:0.15rem;
		height:0.15rem;
		background-size:0.1rem;
	}
	#modifyInfo{
		width: 100%;
		height: 100%;
	}
	#modifyInfo>.g-list-box{
		position: relative;
	}
	#modifyInfo .g-inner-table>tbody>tr>td:first-child{
		width:1.3rem;
	}
	#modifyInfo .g-inner-table>tbody>tr>td>input{
		width:95%;
		border-radius:5px;
	}
	.m-img-box>table{
		width:100%;
		height:100%;
		text-align:center;
	}
	.m-img-box .hd{
		height:0.2rem;
		background-color:#fafafa;
	}
	.m-img-box .hd>td{
		padding-left:0.2rem;
	}
	.m-img-box .info{
		height:0.6rem;
	}
	.m-img-box .info button{
		position:relative;
		cursor:pointer;
		margin-top:0.1rem;
		background-color: #fff;
		background-image: none;
    	border-radius: 3px;
    	border: 1px solid #bfcbd9;
    	color: #1f2d3d;
    	font-size: inherit;
	    font-family: inherit;
	    line-height: 1;
	    outline: none;
	    padding: 5px 10px;
	    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
	}
	.m-upload{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.m-upload+ .progress{
		position:absolute;
		z-index:566;
		left:0;
		bottom: 0;
		width: 0;
		height: 100%;
		background-color:#20a0ff;
		transition: width .3s linear;
	}
	.m-img-box .info button:hover{
		color: #20a0ff;
		border-color: #20a0ff;
	}
	.m-img-box .img>td{
		position:relative;
		overflow:hidden;
	}
	.m-img-box .img a{
		position:absolute;
		width:100%;
		height:100%;
		top:0;
		left:0;
		background-position:center;
		background-size:contain;
		background-repeat: no-repeat;
	}

	.m-dropdown-select{width:95%;position: relative;}
	.m-dropdown-select>.drop-button{position: relative;font-family:inherit; cursor: pointer;transition-duration: .3s;-webkit-transition-duration: .3s;-moz-transition-duration: .3s; appearance:none;-webkit-appearance:none;-moz-appearance:none;-o-appearance:none;-ms-appearance:none;
	  background-color: #fff;width: 100%;padding:0 0.10rem;border-radius: 4px; height: 0.35rem;border:1px solid transparent;border-color:#bfcbd9;outline: none;text-align: left;}
	.m-dropdown-select>.drop-button:hover{border-color: #8391a5;}
	.m-dropdown-select>.drop-button:focus{border-color:#20a0ff;color:#20a0ff;}
	.m-dropdown-select>.drop-button>.text{color: #1f2d3d;font-size: 0.13rem;}
	.m-dropdown-select>.drop-button>.caret{
	display:inline-block;position: absolute;right: 5px;top:50%;width:0.18rem;height:0.18rem;margin-top: -9px;
	  background-image: url(../../assets/images/drop-down.png);background-repeat: no-repeat;background-position: center;background-size:100%; }
	.m-dropdown-select ul{position: absolute;width: 100%;max-height: 3rem;overflow-y: scroll; z-index: 999; background-color: #fff;border-radius: 2px;border:1px solid #d1dbe5;box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);margin:5px 0;}
	.m-dropdown-select ul>li{}
	.m-dropdown-select ul>li>a{display: block;color: #48576a;padding: 8px 10px;line-height: 1.5; height:0.35rem;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;cursor: pointer;}
	.m-dropdown-select ul>li>a:hover{background-color: #e4e8f1}
	.m-dropdown-select ul>li.selected>a:hover, .m-dropdown-select ul>li.selected>a{color: #fff;background-color: #20a0ff}
	.m-dropdown-select>.drop-menu{}
	.m-dropdown-select>.drop-menu>.cascarder>a{background-image: url(../../assets/images/drop-left.png);background-repeat: no-repeat;background-position:98% center;background-size:17px; }
	.m-dropdown-select>.drop-menu>.cascarder>ul{display: none;height: 100%; top:-1px;box-sizing: content-box;border-radius: 0 2px 2px 0; left: 100%;margin:0;margin-left: 1px; border-left:none;transition-duration:.3s; }
	.m-dropdown-select>.drop-menu>.cascarder:hover>ul{display: block;}
</style>

<!--**
  *@info 更多模块顶层
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<template>
	<ul class="g-more-menu">
		<li class="u-black-phone">
			<i class="icon"></i>
			<span class="dp">号码黑名单</span>
			<FileUpload
			  text=""
			  inputAccept=".txt"
	          v-bind:crop="false" 
	          v-bind:url=upload.action
	          v-on:imageuploaded="imageuploaded"
	          v-on:imagechanged="imagechanged"
	          v-on:onprogress="onprogress"
	          v-on:errorhandle="errorhandle"
	          class="m-upload"/>
	        </FileUpload>
	        <span class="progress" :style="{height:progress}"></span>
		</li>
	</ul>
</template>
<script>
import FileUpload  from '../../../componentskm/fileUpload';
import { errorDeal } from '../../../config/utils'
export default{
	name:'more',
	data (){
		return {
			upload:{
				files:'',
				action:'km-ecs/w/msgFile/freezen',
				response:''
			},
			progress:'0%',
		}
	},
	components:{
		FileUpload
	},
	methods:{
		imageuploaded(res,data) {
			var vm=this;
			setTimeout(function(){
				vm.progress='0%';
			},300)
	       	if(res&&res.code=="200"){
	       		layer.open({
			        content:'号码黑名单上传成功',
			        skin: 'msg',
			        time: 3,
			        msgSkin:'success',
			    });
	       	}else if(res){
	       		errorDeal(res)
	       	}
	    },
	    imagechanged(res) {
			var vm=this;
			vm.progress=0;
			vm.upload.files=res;
		},
		onprogress(res){
			this.progress=(res.loaded/res.total*100).toFixed(2)+'%';
		},
		errorhandle(err) {
		  var vm=this;
		  vm.upload.files='';
		  setTimeout(function(){
		  	vm.progress='0%';
		  },300)
		  
		  errorDeal('上传失败')
		},
	}
}
</script>
<style scpoed>
.u-black-phone>.icon{background-image: url(../../../assets/images/black_phone.png);}
.u-black-phone>.dp{color: #107792;}
.u-black-phone>.progress{
	position:absolute;
	right:0;
	bottom: 0;
	width: 5px;
	background-color:#3DD79B;
	transition: height .3s linear;
}

.g-more-menu{
	padding:0.4rem;
	display: flex;
}
.g-more-menu>li{
	position: relative;
	display: inline-block;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0,0,0,0.1);
	cursor: pointer;
	padding:0.1rem;
	border:1px solid transparent;
	border-color:#ddd;
	border-radius: 3px;
}
.g-more-menu>li>.icon{
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
	
	width: 0.4rem;
	height: 0.4rem;
	background-repeat: no-repeat;
	background-size: 100%;
	background-position: center;
}
.g-more-menu>li>.dp{
	display: inline-block;
	vertical-align: middle;

	font-size: 0.18rem;
	font-weight: bold;
	letter-spacing: 1px;
}

.m-upload{
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

}
</style>

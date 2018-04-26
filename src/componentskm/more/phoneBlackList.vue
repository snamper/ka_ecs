<template>
	<section class="m-upload-box">
		<div class="dp">上传文件</div>
		<FileUpload
		  text=""
		  inputAccept=".txt"
          v-bind:crop="false"
          v-bind:autoUpload="true"
          v-bind:url=upload.action
          v-on:imageuploaded="imageuploaded"
          v-on:imagechanged="imagechanged"
          v-on:onprogress="onprogress"
          v-on:errorhandle="errorhandle"
          class="m-upload"/>
        </FileUpload>
        <span class="progress" :style="{width:progress}"></span>
	</section>
</template>
<script>
import FileUpload  from '../fileUpload';
import { errorDeal } from '../../config/utils';
export default{
	name:'phoneBlackList',
	data (){
		return {
			off:{
				power:'',
			},
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
	created(){
		this.off.power=this.$parent.off;
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
<style scoped>
.m-upload-box{
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -0.5rem;
	margin-top: -0.5rem;
	width: 1rem;
	height: 1rem;
}
.m-upload{
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

}
.m-upload-box>.progress{
	position:absolute;
	left:0;
	bottom: 0;
	height: 5px;
	background-color:#3DD79B;
	transition: height .3s linear;
}
.m-upload-box>.dp{
	background-image: url(../../assets/images/txt.png);
	background-size: 0.5rem;
	background-repeat: no-repeat;
	background-position: center top;
	height: 0.5rem;
	text-align: center;
	line-height: 1.25rem;
	font-weight: bold;
}
</style>

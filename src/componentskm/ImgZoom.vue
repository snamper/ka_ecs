<!--**
  *@info 图片缩放组件
  *@author: thinkmix
  *@date 2017-4-25
* *-->
<template>
	<div class="m-zoomContent zoom-c">
		<div class="m-img-c"><div id="imgContent" class="fGrab" :class="{fGrabbing:mouse.off}" :style="zoomStyle" @mousemove="mouseOn" @mousedown="mouseOn" @mouseup="mouseOn" @mouseout="mouseOn" @mousewheel="mouseOn"></div></div>
		<a href="javascript:void(0)" class="slide slide-left" @click="slide(1)"></a>
		<a href="javascript:void(0)" class="slide slide-right" @click="slide(2)"></a>
		<a href="javascript:void(0)" class="rotate" @click="rotate"><span></span></a>
		<div class="text">{{imgData[imgIndex].name}}</div>
	</div>
</template>
<script>
import noImage from '../assets/km/images/no-img.png';
export default{
	name:'pagination',
	props:{
		imgData:Array,
	},
	data(){
		return {
			zoomStyle:{"transform":"translate3d(0,0,0) scale(1) rotate(0deg)"},//缩放样式
			transformStyle:{x:0,y:0,s:1,r:0},//缩放初始坐标
			mouse:{x:0,y:0,off:!1},//鼠标坐标
			imgIndex:0,//图片索引

		}
	},
	created:function(){
        this.initSet();
	},
	watch:{
		imgData:'initSet'
	},
	methods:{
		initSet(){
			if(this.imgData[0].src){
				this.zoomStyle.backgroundImage='url('+this.imgData[0].src+')';
			}else{
				this.zoomStyle.backgroundImage='url('+noImage+')';
			}
		},
		rotate:function(e){//旋转
			var deg=parseInt(this.zoomStyle.transform.match(/\((\S*)deg/)[1]);
			deg+=90;
			this.transformStyle.r=deg;
			var transform='translate3d(0,0,0) scale(1) rotate('+deg+'deg)';
			this.zoomStyle.transform=transform;
		},
		slide:function(index){//切换
			var len=this.imgData.length;
			index==2?this.imgIndex<(len-1) ? this.imgIndex+=1 : this.imgIndex=0 : this.imgIndex>0 ? this.imgIndex-=1 : this.imgIndex=len-1;
			if(this.imgData[this.imgIndex].src){
				this.zoomStyle.backgroundImage='url('+this.imgData[this.imgIndex].src+')';
			}else{
				this.zoomStyle.backgroundImage='url('+noImage+')';
			}
			this.transformStyle={x:0,y:0,s:1,r:0};
			this.zoomStyle.transform='translate3d(0,0,0) scale(1) rotate(0deg)';
		},
		mouseOn:function(e){//图片缩放，鼠标事件
			var vm=this;
			switch(e.type){
				case "mousedown":
					vm.mouse.off=true;
					vm.mouse.x=e.clientX;
					vm.mouse.y=e.clientY;
					var transform='translate3d('+vm.transformStyle.x+'px,'+vm.transformStyle.y+'px,0) scale('+vm.transformStyle.s+') rotate('+vm.transformStyle.r+'deg)';

					vm.zoomStyle.transform=transform;
					break;
				case "mousemove":
					if(vm.mouse.off){
						var x=e.clientX-vm.mouse.x,y=e.clientY-vm.mouse.y;
						vm.transformStyle.x+=x;
						vm.transformStyle.y+=y;
						vm.mouse.x=e.clientX;
						vm.mouse.y=e.clientY;
						var transform='translate3d('+vm.transformStyle.x+'px,'+vm.transformStyle.y+'px,0) scale('+vm.transformStyle.s+') rotate('+vm.transformStyle.r+'deg)';
						vm.zoomStyle.transform=transform
					}
					break;
				case "mouseup":
					vm.mouse.off=false;
					break;
				case "mouseout":
					vm.mouse.off=false;
					break;
				case "mousewheel":case "DOMMouseScroll":
					if(e.wheelDelta&&e.wheelDelta>0||(e.detail&&e.detail<0)){
						vm.transformStyle.s.toFixed(0)==3?vm.transformStyle.s=3:vm.transformStyle.s+=0.2;

					}else{
						vm.transformStyle.s.toFixed(1)==0.4?vm.transformStyle.s=0.4:vm.transformStyle.s-=0.2;
					}
					var transform='translate3d('+vm.transformStyle.x+'px,'+vm.transformStyle.y+'px,0) scale('+vm.transformStyle.s+') rotate('+vm.transformStyle.r+'deg)';
					vm.zoomStyle.transform=transform;
					break;
			}
		},
	}
}
</script>

<style scoped>
.m-zoomContent{position: absolute;height: 100%;overflow: hidden; width: 100%; top:0;left: 0;}
.m-zoomContent>.zoom-c{position: relative;}
.m-zoomContent>.zoom-c>div{overflow: hidden;}
.zoom-c>.slide{position: absolute;width:0.3rem;height:0.4rem;top: 50%; margin-top:-0.2rem;
	background-size: 0.25rem;
	background-position: center;
	background-repeat: no-repeat;
	transition-duration: .3s;-webkit-transition-duration: .3s;-moz-transition-duration: .3s;}
#imgContent, .g-transfer-img>.fl>.box{background-size:contain;background-repeat: no-repeat;background-position: center;}
.zoom-c>.slide-left{left:0;background-image: url(../assets/km/images/left.png);}
.zoom-c>.slide-left:hover{background-image: url(../assets/km/images/left2.png);}
.zoom-c>.slide-right{right:0;background-image: url(../assets/km/images/right.png);}
.zoom-c>.slide-right:hover{background-image: url(../assets/km/images/right2.png);}
#imgContent{/*background-image:url(../../assets/images/test1.jpg);*/position: absolute;height: 100%;overflow: hidden; width: 80%; top:0;left: 10%;}
.m-img-c{overflow:hidden; position: absolute;width:92%;height: 90%;top: 5%;left: 4%;}
.zoom-c>.rotate{position: absolute; display: none;left: 50%;margin-left: -0.15rem; bottom:5px;text-align: center; width:0.25rem;height: 0.25rem;}
.zoom-c>.rotate>span{background-image:url(../assets/km/images/rotate2.png);background-repeat: no-repeat;background-size:0.25rem;background-position: center;display: inline-block;height: 0.25rem;width: 0.25rem;cursor: pointer;}
/*.zoom-c>.rotate>span:hover{background-image:url(../../assets/images/rotate2.png);}*/
.zoom-c>a{outline: none;}
.m-zoomContent:hover .rotate, .m-zoomContent:hover .delete{ display: block;}
.m-zoomContent>.text{position: absolute;top: 6px;left: 0;width: 100%;text-align: center;font-size: 0.16rem;font-weight:bold;}
</style>


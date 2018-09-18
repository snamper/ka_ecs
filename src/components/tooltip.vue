<!--**
  *@info 文字提示组件
  *@author: thinkmix
  *@date 2018-5-18
  *@未完成功能：1、上和下的适应；
* *-->
<template>
	<div class="_m-tips-box"
		v-if="off"
		:class="{top:placement==1,right:placement==2,bottom:placement==3,left:placement==4}"
		:style="position">
		<slot name="content"></slot>
	</div>
</template>
<script>
import { debounce } from '~/utils/utils.js';

export default{
	name:'tooltip',
	props:{
		mouseEvent:'',
	},
	data(){
		return{
			off:false,
			position:{x:0, y:0},
			placement:4,//1,top;2,right;3,bottom;4,left;
		}
	},
	watch:{
		mouseEvent(e){
			this.setPosition(e);
		}
	},
	mounted(){
		
	},
	methods:{
		setPosition(e){

			if(e){

				if(e.type == 'mouseenter'){
					let position={},
						target = this.getParentLi(e.target),
						window_w = document.documentElement.clientWidth||window.innerWidth||document.body.clientWidth,
						pos = target.getBoundingClientRect();

					if(window_w - pos.right < 300){
						position.right = `${window_w - pos.right + pos.width + 20}px`;
						this.placement = 2;
					}else{
						position.left = `${pos.left + pos.width + 20}px`;
						this.placement = 4;
					}
					position.top = `${pos.top}px`;

					this.off = true;
					this.position = position;
				}else if(e.type == 'mouseleave'){
					this.off = false;
				}
			}
		},
		getParentLi(target){
			if(target.nodeName == 'LI'){
				return target;
			}else{
				return this.getParentLi(target.parentNode);
			}
		}
	}
}
</script>

<style scoped>
._m-tips-box{
	position: fixed;
	z-index: 999;
	background-color: #fff;
	padding:0.1rem;
	box-shadow: 0 0 15px rgba(0,0,0,0.2);
	border-radius: 3px;
}
._m-tips-box:before{
	content: '';
	display: inline-block;
	position: absolute;
	width: 0.15rem;
	height: 0.15rem;
	background-color: #fff;
	box-shadow: -1px -1px 5px rgba(0,0,0,0.05);
}
._m-tips-box.left:before{
	top: 0.2rem;
	left: -7px;
	transform: rotate(-45deg);
}
._m-tips-box.top:before{
	top: -7px;
	left: 50%;
	margin-left: -7px;
	transform: rotate(45deg);
}
._m-tips-box.right:before{
	top: 0.2rem;
	right: -7px;
	transform: rotate(135deg);
}
._m-tips-box.bottom:before{
	bottom: -7px;
	left: 50%;
	margin-left: -7px;
	transform: rotate(-135deg);
}
</style>


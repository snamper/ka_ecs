<template>
	<div class="page-div">
		<ul class="pagination pagination-sm" v-if="maxpage">
			<li><a @click="handle('prev')"><i class="fa-chevron-left"></i></a></li>
			<li v-if="pages.isHome"><a @click="handle('home')">首页</a></li>
			<li v-for="todo in pages.left" :class="{active:page==todo}">
				<a @click="handle(0,todo)">{{todo}}</a>
			</li>
			<li v-if="pages.isSpace"><a href="javascript:void(0)">···</a></li>
			<li v-if="pages.isSpace" v-for="todo in pages.right" :class="{active:page==todo}">
				<a @click="handle('index',todo)">{{todo}}</a>
			</li>
			<li><a @click="handle('next')"><i class="fa-chevron-right"></i></a></li>
		</ul>
		<div v-if="!maxpage" style="text-align:center">没有数据</div>
	</div>
</template>
<script>
export default{
	name:'pagination',
	// props:{
	// 	maxpage:Number,
	// 	page:Number,
	// 	callback:Function
    // },
    props:["maxpage", "page", "callback"],
	computed:{
		pages(){
			var arr={isHome:!1,isSpace:!1,left:[],right:[]},maxpage=this.maxpage,page=this.page;

			if(maxpage<=8){
		        for(var i=1;i<=maxpage;i++){
		        	arr.left.push(i)		            
		        }
		    }else{
		        if((page!=4&&(page+1)%5==0)||page==5){
		            if(page+7>maxpage){
		                arr.isHome=true;
		                for(var i=maxpage-7;i<=maxpage;i++){
		                    arr.left.push(i)
		                }
		            }else{
		                arr.isHome=true;
		                for(var i=page;i<=page+4;i++){
		                    arr.left.push(i)
		                }
		                arr.isSpace=true;
		                arr.right=[maxpage-1,maxpage];
		            }
		            
		        }else if(page==1){
		        	arr.isHome=true;
	                for(var i=1;i<=5;i++){
	                    arr.left.push(i)
	                }
	                arr.isSpace=true;
	                arr.right=[maxpage-1,maxpage];
		        }else{
		            if(page+7>maxpage){
		            	arr.isHome=true;
		                for(var i=maxpage-7;i<=maxpage;i++){
		                    arr.left.push(i)
		                }
		            }else{
		                arr.isHome=true;
		                var pageL=1;
		                if((page)%5==0){
		                    pageL=page;
		                }else if((page-1)%5==0){
		                    pageL=page-1;
		                }else if((page-2)%5==0){
		                    pageL=page-2;
		                }else if((page-3)%5==0){
		                    pageL=page-3;
		                }
		                pageL==0||page==null ? (pageL=1) : pageL;
		                for(var i=pageL;i<=pageL+4;i++){
		                   arr.left.push(i) 
		                }
		                arr.isSpace=true;
	                	arr.right=[maxpage-1,maxpage];
		            }
		        }
		        
		    }
		    return arr;
		}
	},
	methods:{
		handle(type,page){
			switch(type){
		        case 0:
		            page=page
		            break;
		        case "prev":
		            if(this.page==1) return false;
		            page=this.page-1;
		            break;
		        case "next":
		            if(this.page==this.maxpage) return false;
		            page=this.page+1;
		            break;
		        case "home":
		            page=1
		            break;
		    }
		    this.callback(page);
		}
	}
}
</script>


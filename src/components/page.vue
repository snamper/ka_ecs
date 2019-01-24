<!--**
  *@info 分页组件
  *@author: thinkmix
  *@date 2017-2-13
* *-->
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
	</div>
</template>
<script>
export default{
	name:'pagination',
	props:{
		maxpage:Number,
		page:Number,
		callback:Function
	},
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

<style scoped>
.page-div{ padding:20px; text-align: right; }
.pagination {
	display:inline-block;
	padding-left:0;
	border-radius:4px;
	}
.pagination>li {
	display:inline-block;
	vertical-align: top;
}
.pagination>li>a{
	position:relative;
	display:inline-block;
	vertical-align: top;
	color: #2e3e4e;
	padding:0 15px;
	font-size:14px;
	margin-left:-1px;
	height: 35px;
	line-height:33px;
	text-decoration:none;
	background-color:#ffffff;
	border:1px solid #dddddd;
	text-align: center;
	cursor: pointer;
}
.pagination>li:first-child>a{
	margin-left:0;
	padding: 0;
	border-bottom-left-radius:4px;
	border-top-left-radius:4px;
}
.pagination>li:last-child>a{
	border-top-right-radius:4px;
	border-bottom-right-radius:4px;
	padding: 0;
}
.pagination>li>a:hover, .pagination>li>a:focus{background-color:#eeeeee;}
.pagination>li>a>i{ display: inline-block;vertical-align: top; padding:0px 20px; height: 35px;}
.pagination>.active>a, .pagination>.active>a:hover, .pagination>.active>a:focus{z-index:2;color:#ffffff;cursor:default;background-color:#20a0ff;border-color:#20a0ff;}

.pagination-sm>li>a{
	padding:0 10px;
	font-size:13px;
	height: 30px;
	line-height:28px;
	cursor: pointer;
}
.pagination-sm>li:first-child>a{border-bottom-left-radius:3px;border-top-left-radius:3px;}
.pagination-sm>li:last-child>a{border-top-right-radius:3px;border-bottom-right-radius:3px;}
.pagination-sm>li>a>i{ padding:0px 15px; height: 30px;}
.fa-chevron-left{ background-image: url(~/assets/img/page-left.png);background-repeat: no-repeat;background-position: center 6px;background-size:50%; }
.fa-chevron-right{background-image: url(~/assets/img/page-right.png);background-repeat:  no-repeat;background-position: center 6px;background-size:50%;}
</style>


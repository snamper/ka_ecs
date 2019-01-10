<template>
	<section>
		<header class="m-create-btn clr">
			<a href="javascript:;" v-if="!off.create" @click="showCreate(1)" class="top fr f-btn f-btn-warning">添加欢迎页</a>
			<div class="top" v-else>
				<a href="javascript:;" class="fr f-btn f-btn-danger" @click="actionCreate">提交</a>
				<a href="javascript:;" class="fr f-btn f-btn-success" @click="newCreate">新增</a>
				
			</div>
		</header>
		<!--新建欢迎页-->
		<section class="m-create-box" v-if="off.create">
			<div class="item clr" v-for="(item,index) in form" :key="index">
				<div class="m-form-line fl">
					<header><b>{{ index+1 }}</b>NEW WELCOME PAGE<a href="javascript:;" @click="deleteCreate(index)" class="u-icon-close"></a></header>
					<div class="form-c">
						<label>欢迎页ID：</label>
						<div class="inner"><input type="text" v-model="item.bannerId" maxlength="20"></div>
					</div>
					<div class="form-c">
						<label>欢迎页名称：</label>
						<div class="inner"><input type="text" v-model="item.bannerName" maxlength="32"></div>
					</div>
					<div class="form-c">
						<label>跳转地址：</label>
						<div class="inner"><input type="text" v-model="item.linkUrl" maxlength="100"></div>
					</div>
					<div class="form-c">
						<label>权重：</label>
						<div class="inner"><input type="number" v-model="item.power" max="10"></div>
					</div>
					<div class="form-c">
						<label>可用：</label>
						<div class="inner m-form-radio">
							<label><span class="radio"><input @click="shiftLock(index)" v-model="item.lock" type="radio" value="0"><span></span></span><span class="text">是</span></label>
							<label><span class="radio"><input @click="shiftLock(index)" v-model="item.lock" type="radio" value="1"><span></span></span><span class="text">否</span></label>
						</div>
					</div>
					<div class="form-c">
						<label>默认：</label>
						<div class="inner m-form-radio">
							<label><span class="radio"><input @click="shiftLock(index)" v-model="item.isDefault" type="radio" value="1"><span></span></span><span class="text">是</span></label>
							<label><span class="radio"><input @click="shiftLock(index)" v-model="item.isDefault" type="radio" value="0"><span></span></span><span class="text">否</span></label>
						</div>
					</div>
					
				</div>
				<div class="m-upload-box fl">
					<div :style="{backgroundImage:uploadThumb[index].thumb}" class="img" @click="setUploadIndex(index)">
						<FileUpload
						  text=""
						  inputAccept="image/png,image/jpeg,image/jpg"
				          v-bind:crop="false"
				          v-bind:headers="userInfo"
				          v-bind:url=upload.action
				          v-on:imageuploaded="imageuploaded"
				          v-on:imagechanged="imagechanged"
				          v-on:onprogress="onprogress"
				          v-on:errorhandle="errorhandle"
				          class="m-upload"/>
				        </FileUpload>
				    </div>
				    <div class="progress" :style="{width:uploadThumb[index].progress}"></div>
					<!-- <div class="upload"><a href="javascript:;">点击上传图片</a></div> -->
				</div>
			</div>
		</section>
		<!--欢迎页列表-->
		<section class="m-total-table" v-if="!off.create">
			<div class="total-head">欢迎页列表<b>{{ list.length }}</b><span class="f-c-red">Tips：欢迎页最多可设置1至3个默认页面,不可用状态时页面不可设为默认</span></div>
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>欢迎页ID</th>
						<th>欢迎页名称</th>
						<th>创建时间</th>
						<th>跳转地址</th>
						<th>权重</th>
						<th>当前状态</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(todo,index) in list">
						<td>{{ index+1 }}</td>
						<td>{{ todo.bannerId }}</td>
						<td>{{ todo.bannerName }}</td>
						<td>{{ todo.createTime }}</td>
						<td>{{ todo.linkUrl }}</td>
						<td>{{ todo.power }}</td>
						<td>
							<span v-if="todo.lock==1">不可用</span>
							<span v-else>
								<em v-show="todo.isDefault==1">默认</em>
								<em v-show="todo.isDefault==0">可用</em>
							</span>
						</td>
						<td class="o-btn-group">
							<a href="javascript:;" class="f-c-blue" @click="modifyPop(index)">编辑</a>
							<a href="javascript:;" class="f-c-red" @click="actionDelete(index)">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="f-no-data" v-if="!list.length">暂无数据</div>
		</section>
		<!--上传历史记录-->
		<section class="m-total-table" v-if="!off.create">
			<div class="total-head clr">
				<div class="fl"><i>上传历史记录</i><b>{{ uploadLogList.length }}</b></div>
				<div v-if="off.uploadIndex!=998" class="btn_export_excel" @click="setUploadIndex(999)">批量上传
					<FileUpload
					  ref="fileUploadCase"
					  text=""
					  inputAccept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
			          v-bind:crop="false"
			          v-bind:autoUpload="false"
			          v-bind:headers="userInfo"
			          v-bind:url=upload.action
			          v-on:imageuploaded="imageuploaded"
			          v-on:imagechanged="imagechanged"
			          v-on:onprogress="onprogress"
			          v-on:errorhandle="errorhandle"
			          class="m-upload"/>
				    </FileUpload>
				</div>
				<div class="fr" v-if="off.uploadIndex==999&&upload.files">
					<span>{{ upload.files.name }}</span>
					<span class="f-c-blue" v-show="upload.progress">{{ upload.progress}}</span>
					<a href="javascript:;" @click="actionUploadExcel" class="btn_export_excel">确认上传</a>
				</div>
			</div>
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>上传时间</th>
						<th>文件名</th>
						<th>操作人</th>
						<th>操作人手机号</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(todo,index) in uploadLogList">
						<td>{{ index+1 }}</td>
						<td>{{ todo.createTime }}</td>
						<td>{{ todo.fileName }}</td>
						<td>{{ todo.userName }}</td>
						<td>{{ todo.userPhone }}</td>
					</tr>
				</tbody>
			</table>
			<div class="f-no-data" v-if="!uploadLogList.length">暂无数据</div>
		</section>
		<!--编辑欢迎页项-->
		<Pop v-if="off.pop" :callBack="closePop" :width="900">
	      <div slot="content" class="m-create-box m-pop-createbox">
	        <div class="item clr">
				<div class="m-form-line fl">
					<header>MODIFY WELCOME PAGE</header>
					<div class="form-c">
						<label>欢迎页ID：</label>
						<div class="inner"><input type="text" readonly="readonly" v-model="modifyInfo.bannerId" maxlength="20"></div>
					</div>
					<div class="form-c">
						<label>欢迎页名称：</label>
						<div class="inner"><input type="text" v-model="modifyInfo.bannerName" maxlength="32"></div>
					</div>
					<div class="form-c">
						<label>跳转地址：</label>
						<div class="inner"><input type="text" v-model="modifyInfo.linkUrl" maxlength="100"></div>
					</div>
					<div class="form-c">
						<label>权重：</label>
						<div class="inner"><input type="number" v-model="modifyInfo.power" max="10"></div>
					</div>
					<div class="form-c">
						<label>可用：</label>
						<div class="inner m-form-radio">
							<label><span class="radio"><input @click="shiftLock()" v-model="modifyInfo.lock" type="radio" value="0"><span></span></span><span class="text">是</span></label>
							<label><span class="radio"><input @click="shiftLock()" v-model="modifyInfo.lock" type="radio" value="1"><span></span></span><span class="text">否</span></label>
						</div>
					</div>
					<div class="form-c">
						<label>默认：</label>
						<div class="inner m-form-radio">
							<label><span class="radio"><input @click="shiftLock()" v-model="modifyInfo.isDefault" type="radio" value="1"><span></span></span><span class="text">是</span></label>
							<label><span class="radio"><input @click="shiftLock()" v-model="modifyInfo.isDefault" type="radio" value="0"><span></span></span><span class="text">否</span></label>
						</div>
					</div>
				</div>
				<div class="m-upload-box fl">
					<div :style="{backgroundImage:'url('+modifyInfo.imageUrl+')'}" class="img" @click="setUploadIndex(998)">
						<FileUpload
						  text=""
						  inputAccept="image/png,image/jpeg,image/jpg"
						  v-bind:headers="userInfo"
				          v-bind:crop="false"
				          v-bind:url=upload.action
				          v-on:imageuploaded="imageuploaded"
				          v-on:imagechanged="imagechanged"
				          v-on:onprogress="onprogress"
				          v-on:errorhandle="errorhandle"
				          class="m-upload"/>
				        </FileUpload>
				    </div>
				    <div class="progress" :style="{width:modifyInfo.progress}"></div>
					<!-- <div class="upload"><a href="javascript:;">点击上传图片</a></div> -->
				</div>
			</div>
			<a href="javascript:;" @click="actionModify" class="f-btn f-btn-warning">确认修改</a>
	      </div>
	    </Pop>
	</section>
</template>
<script>
import FileUpload  from '../fileUpload';
import Pop  from '../pop';
import { reqCommonMethod } from '../../config/service';
import { errorDeal,getStore } from '../../config/utils';
import imgToBase64 from '@/utils/imgToBase64';

export default{
	name:'welcomeConf',
	data (){
		return {
			off:{
				create:0,
				uploadIndex:0,//999为批量上传action，998为编辑action
				pop:0
			},
			userInfo:'',
			form:[],//创建新的欢迎页表单数据
			uploadThumb:[],//缩略图
			upload:{//上传组件参数
				files:'',
				action:'km-ecs/w/banner/fileUpload',
				response:'',
				progress:0
			},
			list:[],//欢迎页列表
			uploadLogList:[],//欢迎页上传历史列表
			modifyInfo:''//存储要修改的欢迎页项
		}
	},
	components:{
		FileUpload,
		Pop
	},
	created(){
		this.userInfo=getStore('KA_ECS_USER');

		this.getList();
		this.getUploadLogList();
	},
	methods:{
		getList(){//获取欢迎页列表
			const vm=this;

			reqCommonMethod({},true,'km-ecs/w/banner/list')
            .then((data)=>{
	            vm.list=data.data.bannerList;
            })
		},
		getUploadLogList(){//获取欢迎页历史列表
			const vm=this;

			reqCommonMethod({},true,'km-ecs/w/banner/uploadLogs')
            .then((data)=>{
	            vm.uploadLogList=data.data.bannerList;
            })
		},
		actionCreate(){//提交创建欢迎页
			const vm=this;

			let form=JSON.parse(JSON.stringify(vm.form));
			let space=form.filter((item)=>{
				return Object.values(item).filter((_item)=>{
					return _item==='';
				}).length!=0
			});
			let checkBannerId=form.filter((item)=>{
				return !item.bannerId.match(/^\w+$/)
			});
			if(space.length){
				errorDeal('你有东西没填完，自己找找吧！');
				return false;
			}else if(checkBannerId.length){
				errorDeal('【欢迎页ID】只能包含数字、大小写字母和下划线哟~');
				return false;
			}else{
				reqCommonMethod({bannerList:form},false,'km-ecs/w/banner/addList')
	            .then((data)=>{
		            layer.open({
				        content:'成功啦~',
				        skin: 'msg',
				        time: 3,
				        msgSkin:'success',
				    });
				    vm.showCreate();
				    vm.form=[];
				    vm.uploadThumb=[];
				    vm.getList();
	            })
			}
		},
		actionDelete(index){//提交删除欢迎页项
	      const vm=this;
	      var layerIndex=layer.open({
	          content:'<div style="padding:10px 20px;">Are you sure ?</div>',
	          style:'width:auto;',
	          btn:['是的'],
	          yes:function(){
	              vm.AJAX('km-ecs/w/banner/del',{bannerId:vm.list[index].bannerId},function(data){
	                layer.open({
	                    content:'Oho!You delete it',
	                    skin: 'msg',
	                    time: 3,
	                    msgSkin:'success',
	                });
	                vm.getList();
	                layer.close(layerIndex)
	              })
	          }
	      })
	    },
	    actionModify(){//提交修改欢迎页项
	    	const vm=this;
	    	let modifyInfo=JSON.parse(JSON.stringify(vm.modifyInfo));

	    	let space=Object.values(modifyInfo).filter((val)=>{
	    		return val==='';
	    	});
	    	if(space.length){
				errorDeal('你有东西没填完，自己找找吧！');
				return false;
			}else{
				reqCommonMethod(modifyInfo,false,'km-ecs/w/banner/upd')
	            .then((data)=>{
		            layer.open({
				        content:'修改成功啦~',
				        skin: 'msg',
				        time: 3,
				        msgSkin:'success',
				    });
				    vm.modifyInfo='';
				    vm.closePop();
				    vm.getList();
	            })
			}
	    },
	    closePop(off){//关闭弹窗
	     
	      if(!off){
	      	this.modifyInfo='';
	      	this.off.uploadIndex=0;
	      }
	      this.off.pop=off;
	      this.upload.files='';

	    },
	    modifyPop(index){//修改欢迎弹窗
	    	this.closePop(true);
	    	this.off.uploadIndex=998;
	    	this.modifyInfo=JSON.parse(JSON.stringify(this.list[index]));
	    	this.modifyInfo.imageUrl=this.modifyInfo.imageUrl;
	    	this.modifyInfo.progress=0;
	    },
		actionUploadExcel(){//确认上传excel
			this.$refs.fileUploadCase.tryAjaxUpload();
		},
		showCreate(off){//新建欢迎页
			if(off){
				this.form.push({
		            bannerId:'',
		            bannerName:'',
		            imageUrl:'',
		            linkUrl:'',
		            isDefault:0,
		            lock:0,
		        });
		        this.uploadThumb.push({
		        	thumb:'',
		        	progress:0
		        })
			}
			this.off.create=off;
		},
		newCreate(){//添加欢迎页
			let len=this.form.length;
			if(len<3){
				this.form.push({
		            bannerId:'',
		            bannerName:'',
		            imageUrl:'',
		            linkUrl:'',
		            isDefault:0,
		            lock:0,
		        });
		        this.uploadThumb.push({
		        	thumb:'',
		        	progress:0
		        });
			}else errorDeal('最多同时新增三条记录');
		},
		deleteCreate(index){//删除新建欢迎页
			this.uploadThumb.splice(index,1);
			this.form.splice(index,1);
			if(!this.form.length){
				this.showCreate()
			}
		},
		shiftLock(index){//切换欢迎页属性
			const vm=this;
			setTimeout(function(){
				if(vm.off.uploadIndex==998){
					if(vm.modifyInfo.lock==1)vm.modifyInfo.isDefault=0;
				}else{
					if(vm.form[index].lock==1)vm.form[index].isDefault=0;
				}
				
			},300)
			
		},
		setUploadIndex(index){//设置上传的index
			this.off.uploadIndex=index;
		},
		imageuploaded(res,data) {//上传文件完成统一回调
			const vm=this;
			let uploadIndex=vm.off.uploadIndex;
			setTimeout(function(){
				if(uploadIndex==999){
					vm.upload.progress=0;
				}else if(uploadIndex==998){
					vm.modifyInfo=Object.assign({},vm.modifyInfo,{progress:0});//对象更改检测方法
				}else vm.uploadThumb[uploadIndex].progress=0;
				
			},300)
	       	if(res&&res.code=="200"){
	       		if(uploadIndex==999){
		       		vm.getUploadLogList();
		       	}else if(uploadIndex==998){
		       		vm.modifyInfo.imageUrl=res.data.fileInfo;
					vm.getList();
				}else vm.form[uploadIndex].imageUrl=res.data.fileInfo;
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
	    imagechanged(res) {//上传文件添加文件统一回调
			const vm=this;
			let uploadIndex=vm.off.uploadIndex;

			vm.upload.files=res;
			if(uploadIndex!=999){
				imgToBase64({
					file:res,
					complete:function(data){
						if(uploadIndex==998){
							vm.modifyInfo.thumb='url('+data+')';
						}else vm.uploadThumb[uploadIndex].thumb='url('+data+')';
					}
				})
			}
			
		},
		onprogress(res){//上传文件进度条统一回调
			let progress=(res.loaded/res.total*100).toFixed(2)+'%';
			let uploadIndex=this.off.uploadIndex;

			if(uploadIndex==999){
				this.upload.progress=progress;
			}else if(uploadIndex==998){
				this.modifyInfo.progress=progress;
			}else this.uploadThumb[uploadIndex].progress=progress;
		},
		errorhandle(err) {//上传文件错误统一回调
		  var vm=this;
		  vm.upload.files='';
		  let uploadIndex=vm.off.uploadIndex;

		  setTimeout(function(){
			if(uploadIndex==999){
				vm.upload.progress=0;
			}else if(uploadIndex==998){
				vm.modifyInfo=Object.assign({},vm.modifyInfo,{progress:0});//对象更改检测方法
				// vm.$set(vm.modifyInfo,'progress',0)
			}else vm.uploadThumb[uploadIndex].progress=0;
		  },300)
		  
		  errorDeal(err)
		},
	}
}
</script>
<style scoped>
.f-space-1{
	display: inline-block;
	width: 0.13rem;
}
.o-btn-group>a{
	margin-right:0.1rem;
}
/*.o-pop-tips{
	position: absolute;
	left: 0;
	bottom: 5px;
	width: 100%;
	text-align: center;
}*/
.total-head>.f-c-red{
	font-size: 0.12rem;
	margin-left: 0.1rem;
}

.m-create-btn{
	
}
.m-create-btn a{
	margin-right:0.1rem;
	padding:6px 10px;
	border-radius: 3px
}
.m-create-btn>.top{
	position: relative;
	top: -0.3rem;
	
}
.m-create-box{
	/*display: flex;
	justify-content:center;
	flex-direction:wrap;*/
	text-align: center;
}
.m-create-box>.item{
	display: inline-block;
	background-color: #fff;
	padding:0.1rem;
	margin-right: 0.2rem;
	margin-bottom: 0.2rem;
	border-radius: 3px;
	box-shadow: 0 0 10px rgba(0,0,0,0.1)
}
.m-pop-createbox>.item{
	box-shadow:none;
	margin:0;
}
.m-pop-createbox>.f-btn-warning{
	width: 87%;
	padding:0.15rem 0;
	text-align: center;
	margin-top: 0.2rem;
}



.m-upload-box{
	width: 3rem;
	height: 3.7rem;
	display: table;
	text-align: center;
	margin-left: 0.1rem;
	position: relative;
}
.m-upload-box>.img{
	position: absolute;
	/*z-index: 998;*/
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #fff;
	background-image: url(../../assets/images/upload-img.png);
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: center;
}
.m-upload-box>.progress{
	position:absolute;
	left:0;
	bottom: 0;
	width: 0;
	height: 5px;
	background-color:#20a0ff;
	transition: width .3s linear;
}

/*.m-upload-box>.upload{
	display: table-cell;
	vertical-align: middle;
}
.m-upload-box>.upload>a{
	background-color: #20a0ff;
	color: #fff;
	border-radius: 3px;
	padding:8px 12px;
}*/
.m-create-box .m-form-line{
	width: 4rem;
}
.m-create-box .m-form-line>header{
	padding-bottom: 0.2rem;
	position: relative;
	font-weight: bold;
	text-align: center;
}
.m-create-box .m-form-line>header>b{
	top: 2px;
	left: 0;
	position: absolute;
	display: inline-block;
	width: 0.15rem;
	height: 0.15rem;
	font-size: 0.12rem;
	background-color: #20a0ff;
	text-align: center;
	color: #fff;
	border-radius: 100%;
	line-height: 0.15rem;
	margin-right: 3px;
}
.u-icon-close{
	background-image: url(../../assets/images/close.png);
	width:0.15rem;
	height: 0.15rem;
	position: absolute;
	right: 0;
	top: 2px;
}

.m-form-line{
	background-color: #fff;
}
.m-form-line .form-c{
	text-align:left;
}
.m-form-line .form-c>label{
	color: #898F96;
}
.m-form-line .form-c>.inner{
	margin-bottom: 0.1rem;
}
.m-form-line .form-c>.inner>input{
	border:1px solid transparent;
	color: #2e3e4e;
	border-bottom-color:#E9EAED;
	width: 100%;
	border-radius: 0;
	font-size: inherit;
   	font-family: inherit;
    height: 0.35rem;line-height: 1;
    outline: none;
    padding: 3px 10px;
    width: 100%;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    -moz-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}
.m-form-line .form-c>.inner>input:hover{
	border-bottom-color:#20a0ff;
}

.btn_export_excel{
	position: relative;
}
.m-upload{
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

}
</style>

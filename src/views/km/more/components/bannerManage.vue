<template>
	<section>
		<header class="m-create-btn clr">
			<a href="javascript:;" v-if="!off.showForm" @click="showFormClick(1)" class="top fr f-btn f-btn-warning">添加banner</a>
			<div class="top" v-else>
				<a href="javascript:;" v-if="!off.modify" class="fr f-btn f-btn-danger" @click="checkForm('create')">提交</a>
				<a href="javascript:;" v-if="off.modify" class="fr f-btn f-btn-warning" @click="checkForm('modify')">修改</a>
			</div>
		</header>
		<!--新建banner页-->
		<section class="m-create-box" v-if="off.showForm">
			<div class="item clr">
				<div class="m-form-line fl">
					<header>
						<b>1</b>
						<span v-if="!off.modify">新建Banner</span>
						<span v-if="off.modify">修改Banner</span>
						<a href="javascript:;" @click="showFormClick(false)" class="u-icon-close"></a>
					</header>
					<div class="form-c">
						<label>标题：</label>
						<div class="inner"><input type="text" v-model="form.title" maxlength="32"></div>
					</div>
					<div class="form-c">
						<label>跳转地址：</label>
						<div class="inner"><input type="text" v-model="form.jumpUrl" maxlength="100"></div>
					</div>
					<div class="form-c">
						<label>权重：</label>
						<div class="inner"><input type="number" v-model="form.priority" max="10"></div>
					</div>
					<div class="form-c">
						<label>状态：</label>
						<div class="inner m-form-radio">
							<label><span class="radio"><input v-model="form.useFlag" type="radio" value="1"><span></span></span><span class="text">使用</span></label>
							<label><span class="radio"><input v-model="form.useFlag" type="radio" value="2"><span></span></span><span class="text">不使用</span></label>
						</div>
					</div>
					<div class="form-c">
						<label>背景渐变：<span class="m-gradient" :style="form.cssStyle"></span></label>
						<div class="inner f-input-two">
							<input type="text" maxlength="7" @blur="checkGradient(1)" v-model="form.startColor" placeholder="请输入起始值">
							<em>-</em>
							<input type="text" maxlength="7" @blur="checkGradient(2)" v-model="form.endColor" placeholder="请输入结束值">
						</div>
					</div>
					<div class="form-c">
						<label>渐变方向：</label>
						<div class="inner m-form-radio">
							<label @click="directColorShift"><span class="radio"><input type="radio" v-model="form.directColor" value="1"><span></span></span><span class="text">左=>右</span></label>
							<label @click="directColorShift"><span class="radio"><input type="radio" v-model="form.directColor" value="2"><span></span></span><span class="text">左上=>右下</span></label>
							<label @click="directColorShift"><span class="radio"><input type="radio" v-model="form.directColor" value="3"><span></span></span><span class="text">左下=>右上</span></label>
						</div>
					</div>
				</div>
				<div class="m-upload-box fl">
					<div class="f-c-red">tips：请上传1182X350分辨率的图片</div>
					<div :style="{backgroundImage:uploadThumb.thumb}" class="img">
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
				    <div class="progress" :style="{width:uploadThumb.progress}"></div>
				</div>
			</div>
		</section>
		<!--banner页列表-->
		<section class="m-total-table" v-if="!off.showForm">
			<div class="total-head">列表<b>{{ list.length }}</b></div>
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>标题</th>
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
						<td>{{ todo.title }}</td>
						<td>{{ getDateTime(todo.createTime)[6] }}</td>
						<td>
							<a v-if="todo.jumpUrl" :href="todo.jumpUrl" class="f-c-blue" target="_blank">{{ todo.jumpUrl }}</a>
							<span v-else>--</span>
						</td>
						<td>{{ todo.priority }}</td>
						<td>
							<span v-show="todo.useFlag==1" class="f-c-green">使用中</span>
							<span v-show="todo.useFlag==2">未使用</span>
						</td>
						<td class="o-btn-group">
							<a href="javascript:;" class="f-c-blue" @click="modifyClick(index)">编辑</a>
							<a href="javascript:;" class="f-c-red" @click="actionDelete(index)">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="f-no-data" v-if="!list.length">暂无数据</div>
		</section>
	</section>
</template>
<script>
import FileUpload  from '@/components/file-upload';
import Pop  from '@/components/pop';
import api from '../api/bannerManage';
import { errorDeal,getStore,getDateTime,debounce } from '@/config/utils';
import imgToBase64 from '@/utils/imgToBase64';


export default{
	name:'bannerManage',
	data (){
		return {
			off:{
				showForm:false,
				modify:false
			},
			userInfo:'',
			form:{
				title:'',
				imgUrl:'',
				priority:1,
				jumpUrl:'',
				cssStyle:'',
				useFlag:1,
				startColor:'',
				endColor:'',
				directColor:1,
			},//创建新的banner表单数据
			uploadThumb:{
				thumb:'',
				progress:0
			},//缩略图
			upload:{//上传组件参数
				files:'',
				action:api.actionUploadUrl,
				response:'',
			},
			setGradient:{
				start:'',
				end:'',
				direct:1,
			},
			list:[],//banner页列表
		}
	},
	components:{
		FileUpload,
		Pop
	},
	created(){
		let userInfo = getStore('KA_ECS_USER');
		if(userInfo){
			this.userInfo = {
				codeId: userInfo.codeId,
				customerId: userInfo.customerId,
				rightCodes: userInfo.rightCodes
			}
		}
		this.getList();
	},
	methods:{
		getList(){//获取欢迎页列表
			const vm=this;

			api.getList({})
            .then((data)=>{
				vm.list=data.data.list;
				vm.initForm();
            });
		},
		checkForm(step){
			const vm=this;

			let form = JSON.parse(JSON.stringify(vm.form)),
				errorText = '';
			if(!vm.checkGradient(1) || !vm.checkGradient(2)){
				return false;
			}
			form.cssStyle = vm.getGradient();
			if(!form.title){
				errorText = '标题不能为空';
			}else if(form.priority == ''){
				errorText = '权重不能为空';
			}else if(!form.imgUrl){
				errorText = '请上传图片';
			}

			if(errorText){
				errorDeal(errorText);
				return false;
			}
			
			switch(step){
				case 'create':
					vm.actionCreate(form);
					break;
				case 'modify':
					vm.actionModify(form);
					break;
				default :
					
					break;
			}
		},
		actionCreate(form){//提交创建欢迎页
			const vm=this;

			api.actionCreate(form)
			.then((data)=>{
				layer.open({
					content:'新增成功',
					skin: 'msg',
					time: 3,
					msgSkin:'success',
				});
				vm.showFormClick();
				vm.getList();
			})
		},
		actionDelete(index){//提交删除欢迎页项
	      const vm=this;
	      var layerIndex=layer.open({
	          content:'<div style="padding:10px 20px;">Are you sure ?</div>',
	          style:'width:auto;',
	          btn:['是的'],
	          yes:function(){
				  api.actionDelete({id:vm.list[index].id})
				  .then((data)=>{
	                layer.open({
	                    content:'删除成功',
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
	    actionModify(form){//提交修改欢迎页项
			const vm=this;
			
	    	api.actionModify(form)
			.then((data)=>{
				layer.open({
					content:'修改成功',
					skin: 'msg',
					time: 3,
					msgSkin:'success',
				});
				vm.showFormClick();
				vm.getList();
			})
	    },
	    modifyClick(index){//修改banner弹窗
	    	this.off.modify = true;
			this.form = JSON.parse(JSON.stringify(this.list[index]));
			this.uploadThumb.thumb = `url(${ this.form.imgUrl })`;
			this.showFormClick(true);
	    },
		showFormClick(off){//新建banner页
			this.off.showForm=off;
		},
		initForm(){//添加banner页
			this.form = {
				title:'',
				imgUrl:'',
				priority:1,
				jumpUrl:'',
				cssStyle:'',
				useFlag:1,
				startColor:'',
				endColor:'',
				directColor:1,
			};
			this.off.modify = false;
			this.uploadThumb = {
				thumb:'',
				progress:0
			};
		},
		getGradient(){
			let start = this.form.startColor,
				end = this.form.endColor,
				direct = this.form.directColor,
				directDesc = '';

			if(direct == 1){
				directDesc = 'right';
			}else if(direct == 2){
				directDesc = 'right bottom';
			}else if(direct == 3){
				directDesc = 'right top';
			}

			return `background-image: -webkit-linear-gradient(to ${directDesc}, ${start} 0, ${end} 100%);background-image: linear-gradient(to ${directDesc}, ${start} 0, ${end} 100%);`
		},
		checkGradient(type){
			let val = '';
			if(type == 1){
				val = this.form.startColor;
				if(!val){
					errorDeal('起始颜色不能为空');
					return false;
				}
			}else if(type == 2){
				val = this.form.endColor;
				if(!val){
					errorDeal('结束颜色不能为空');
					return false;
				}
			}

			if(!/^#\w{6}$/.test(val)){
				errorDeal('请输入6位合法16进制色值');
				return false;
			}

			this.form.cssStyle = this.getGradient();
			return true;
		},
		directColorShift(){
			let t = setTimeout(()=>{
				clearTimeout(t);
				this.form.cssStyle = this.getGradient();
			},0)
		},
		imageuploaded(res,data) {//上传文件完成统一回调
			const vm=this;

			setTimeout(function(){
				vm.uploadThumb.progress=0;
			},300)
	       	if(res&&res.code=="200"){
	       		vm.form.imgUrl=res.data.imgUrl;
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

			vm.upload.files=res;
			imgToBase64({
				file:res,
				complete:function(data){
					vm.uploadThumb.thumb='url('+data+')';
				}
			})
			
		},
		onprogress(res){//上传文件进度条统一回调
			let progress=(res.loaded/res.total*100).toFixed(2)+'%';
			
			this.uploadThumb.progress=progress;
		},
		errorhandle(err) {//上传文件错误统一回调
		  var vm=this;
		  vm.upload.files='';

		  setTimeout(function(){
			vm.uploadThumb.progress=0;
		  },300)
		  
		  errorDeal(err)
		},
		getDateTime(t){
			return getDateTime(t);
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
	position: relative;
    margin-top: 5px;
	width: 100%;
	height: 3.5rem;
	background-color: #fff;
	background-image: url(../../../../assets/images/upload-img.png);
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
	background-image: url(../../../../assets/images/close.png);
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
	height: 0.35rem;
	line-height: 1;
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
.f-input-two{
	display: flex;
	align-items: center;
	display: -webkit-flex;
	-webkit-align-items: center;
}
.f-input-two>input{
	flex: 1;
	-webkit-flex: 1;
}
.f-input-two>em{
	width: 20px;
	text-align: center;
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
.m-gradient{
	display: inline-block;
	vertical-align: middle;
	width: 100px;
	height: 25px;
}
</style>

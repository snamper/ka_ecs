<!--**
  *@info 意见反馈
* *-->
<template>
  <section class="g-search-menu">
    <div id="search" :class="{active:off.details}">
      <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
      <!--查询-->
      <section v-if="!off.details">
        <div class="g-search-form">
          <div class="m-tag"><b></b>反馈单查询</div>
          <!--订单号码查询-->
          <section class="form-c">
            <div class="row clr m-col-2">
              <span class="dp col-l">反馈单号：</span>
              <div class="col-r m-input-button"><input v-model="form.context1" maxlength="32" type="tel" placeholder="请输入要查询的单号"><button @click="searchList('order')">查询</button></div>
            </div>
          </section>
          <div class="m-tag"><b></b>条件查询</div>
          <section class="form-c">
            <div class="row">
              <span class="dp">问题类型：</span>
              <div class="m-form-radio">
                <label><span class="radio"><input value="0" type="radio" v-model="form.orderType"><span></span></span><span class="text">全部</span></label>
                <label><span class="radio"><input value="1" type="radio" v-model="form.orderType"><span></span></span><span class="text">功能异常</span></label>
                <label ><span class="radio"><input value="2" type="radio" v-model="form.orderType"><span></span></span><span class="text">其他问题</span></label>
              </div>
            </div>
          </section>
          <section class="form-c">
            <div class="row clr m-col-2">
              <div class="dp col-l">时间区间：</div>
              <div class="col-r">
                <span class="m-time-area"><input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
              </div>
            </div>
          </section>
          <section class="form-c o-no-bgc">
            <!--卡号-->
            <div class="row" :class="{active:form.select==2}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="2" @click="isChe" v-model="form.select"><span></span></span><span class="text">商户ID：</span></label>
				</span>
              <div class="input-box"><input v-model="form.context2" :readonly="form.select!=2" maxlength="20" type="tel" placeholder="请输入查询的商户ID"></div>
            </div>
            <div class="row" :class="{active:form.select==6}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="6" @click="isChe" v-model="form.select"><span></span></span><span class="text">反馈人ID：</span></label>
				</span>
              <div class="input-box"><input v-model="form.context6" :readonly="form.select!=6" maxlength="13" type="tel" placeholder="请输入查询的反馈人ID"></div>
            </div>
            <div class="row" :class="{active:form.select==3}" >
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="3" @click="isChe" v-model="form.select"><span></span></span><span class="text">联系号码：</span></label>
				</span>
              <div class="input-box"><input v-model="form.context3" :readonly="form.select!=3" maxlength="11" type="tel" placeholder="请输入反馈人联系号码"></div>
            </div>
             <div class="row" v-if="off.type>1" :class="{active:form.select==4}">
        <span class="m-form-radio">
          <label><span class="radio"><input type="radio" value="4" @click="isChe" v-model="form.select"><span></span></span><span class="text">处理人ID：</span></label>
        </span>
        <div class="input-box"><input v-model="form.context4" :readonly="form.select!=4" maxlength="18" type="text" placeholder="请输入查询的处理人ID"></div>
      </div>
            <button class="f-btn f-btn-line" @click="searchList(1)">查询</button>
          </section>
        </div>
        <div class="m-total-table" v-if="list">
          <div class="total-head">
              查询结果<b>{{total}}</b>
          </div>
          <table>
            <thead>
            <tr >
              <th>序号</th>
              <th>反馈单号</th>
              <th>提交时间</th>
              <th>商户名称</th>
              <th>反馈人</th>
              <th>联系电话</th>
              <th>问题类型</th>
              <th>处理状态</th>
              <th>处理人</th>
              <th>处理时间</th>
              <th>详情</th>
            </tr>
            </thead>
            <tbody>
            <!--查询结果表格-->
            <tr v-for="(todo,index) in list" :key="index">
              <td>{{((pageNum-1)*10+(index+1))}}</td>
              <td>{{todo.acceptId||'--'}}</td>
              <td>{{new Date(todo.creattime).toLocaleString()||'--'}}</td>
              <td>{{todo.companyName||'--'}}</td>
              <td>{{todo.userId||'--'}}<br> <span>（{{todo.userName||'--'}} ）</span> </td>
              <td>{{todo.phone||'--'}}</td>
              <td v-if="todo.type==1">功能异常</td>
              <td v-if="todo.type==2">其他问题</td>
              <td v-if="todo.status==1">待处理</td>
              <td v-if="todo.status==2">处理中</td>
              <td v-if="todo.status==3">已完成</td>
              <td>{{todo.treatUserId||'--'}} <br> <span>（{{todo.treatName||'--'}}）</span> </td>
              <td v-if="todo.treattime==0">--</td>
              <td v-if="todo.treattime!=0">{{new Date(todo.treattime).toLocaleString()}}</td>
              <td><a :name="todo.acceptId"  @click="details" href="javascript:void(0)" class="details">点击查看详情</a></td>
            </tr>
            </tbody>
          </table>
          <my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
        </div>
      </section>
      <!--详情页面-->
      <list-details :list="detailsData" :logList="detailsLog" v-if="off.details" >

      </list-details>
    </div>
  </section>
</template>
<script>
  import {reqCommonMethod} from "../../../config/service.js";
  import {errorDeal} from "../../../config/utils.js";  
  import pagination from "../../../componentskm/page.vue";
  import details from "../../../componentskm/opinionDetails.vue";
  import {createDownload} from '../../../config/utils';
  import "../../../assets/km/css/search.css";
  import '../../../assets/km/js/base64.min.js';
  export default{
    name:'ecsNetOrderList',
    data (){
      return {
        off:{
          type:1,//1、待处理2、处理中3、已完成
          isLoad:0,//加载条
          details:0,//详情页面开关
          number:'',//第几条详情
          whichBtn:'',
        },
        form:{
          orderType:0,//0全部;1功能异常;2其他问题;
          context1:'',//反馈单号
          context2:'',//商户ID
          context3:'',//手机号码
          context4:'',//处理人ID
          context6:'',//反馈人ID
          startTime:'',
          endTime:'',
          select:''//条件查询，默认选择的条件
        },
        list:'',//查询数据
        detailsData:{},
        detailsLog:[],
        con:'',
        total:0,//总查询条数
        pageNum:1,//当前页数
        pageSize:10,//显示条数
        maxpage:1,//最大页数
        callback:Function,//page组件点击回调
      }
    },
    components:{
      'my-page':pagination,
      'list-details':details
    },
    created:function(){
      this.init()
    },
    methods:{
      init:function(){
        var vm=this,
            type=this.$route.params.type;
            type=='pending' ? vm.off.type=1 : type=='processing' ? vm.off.type=2 : type=='finish' ? vm.off.type=3 : void(0);
            vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
            vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
      }
//查询按钮
      ,searchList:function(index,page){
        var s=this.form.select;
        var userInfo=localStorage.getItem('KA_ECS_USER');
            userInfo=JSON.parse(userInfo);
        var customerId=userInfo.customerId;
        var vm=this,url,whichBtn,
        json={
          status:vm.off.type,
          type:vm.form.orderType,
          starttime:Date.parse(vm.form.startTime),
          endtime:Date.parse(vm.form.endTime),
          pageNum:page||'1',
          pageSize:'10',
          acceptId:'',
          dealerId:'',
          phone:'',
          treatUserId:'',//处理人id
          userId:''//反馈人id
        };
        if(index===1){//条件查询
          vm.off.whichBtn=1;
          if(s==2&&vm.form.context2===''){
            layer.open({
              content:"请输入要查询的商户ID",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
          else if(s==6&&vm.form.context6===''){
            layer.open({
              content:"请输入要查询的反馈人ID",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
          else if(s==3&&vm.form.context3===''){
            layer.open({
              content:"请输入反馈人联系号码",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
          else if(s==4&&vm.form.context4===''){
            layer.open({
              content:"请输入要查询的处理人ID",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
          if(s==2){
            json.dealerId=vm.form.context2;
          }
          else if(s==6){
            json.userId=vm.form.context6;
          }
          else if(s==3){
            json.phone=vm.form.context3;
          }
          else if(s==4){
            json.treatUserId=vm.form.context4;
          }
        }
        else if(index==='order'){//订单号查询
          vm.off.whichBtn=2;
          if(!vm.form.context1){
            layer.open({
              content:'请输入要查询的反馈单号',
              skin: 'msg',
              time: 2,
              msgSkin:'error',
            });
            return false;
          }
          json={
              status:vm.off.type,
              starttime:Date.parse(vm.form.startTime),
              endtime:Date.parse(vm.form.endTime),
              pageNum:page||'1',
              pageSize:'10',
              acceptId:vm.form.context1,
              dealerId:'',
              phone:'',
              treatUserId:'',
              treatName:''
          };
        }
        if(index===1||index==='order'){//发送请求
        //vm.AJAX("w/advice/query",json,function(data){vm.list=data.data.pageData;vm.total=data.data.total;vm.maxpage=Math.ceil(parseInt(data.data.total)/10);vm.pageNum=page||1;vm.callback=function(v){vm.searchList(index,v)}},function(){vm.off.isLoad=false});
        reqCommonMethod(json,function(){vm.off.isLoad=false;},"km-ecs/w/advice/query")
        .then((data)=>{
            vm.list=data.data.pageData;//数据
            vm.total=data.data.total;//总条数
            vm.maxpage=Math.ceil(parseInt(data.data.total)/10);//最大页码
            vm.pageNum=page||1;
            vm.callback=function(v){vm.searchList(index,v)};
        }).catch(error=>errorDeal(error)); 	  
        }
      }
      //按钮
      ,isChe:function(){
        this.form.select='';
      }
//      详情页点击事件
      ,details:function(e){//详情
        this.off.details=true;
        var vm=this
            ,customerId=localStorage.getItem('KA_ECS_USER')[customerId]
            ,json={acceptId:e.target.name}
            ,url;
        if(vm.off.isLoad)return false;
        vm.off.isLoad=true;
        //vm.AJAX("w/advice/getDetails",json,function(data){vm.detailsData=data.data.details;vm.detailsData.content=BASE64.decode(vm.detailsData.content);vm.detailsLog=data.data.process;vm.detailsData?vm.off.details=true:vm.off.details=false},function(){vm.off.isLoad=false});
        reqCommonMethod(json,function(){vm.off.isLoad=false;},"km-ecs/w/advice/getDetails")
        .then((data)=>{
            vm.detailsData=data.data.details;
            vm.detailsData.content = BASE64.decode(vm.detailsData.content);
            vm.detailsLog=data.data.process;
            vm.detailsData?vm.off.details=true:vm.off.details=false; 
            vm.off.isLoad=false;         
        }).catch(error=>errorDeal(error)); 	        
      }
      ,to_laydate:function(v){
        var vm=this;
        laydate({
          istime:true,
          format: 'YYYY-MM-DD hh:mm:ss',
          isclear: false,
          choose: function(dates){ //选择好日期的回调
            v==1 ? vm.form.startTime=dates : vm.form.endTime=dates;
          }
        });
      },
    }
  }
</script>


<!--**
  *@info 订单查询模块-网厅订单
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<template>
  <section class="g-search-menu">
    <div id="search" :class="{active:off.details}">
      <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
      <!--查询-->
      <section v-if="!off.details">
        <div class="g-search-form">
          <div class="m-tag"><b></b>订单查询</div>
          <!--订单号码查询-->
          <section class="form-c">
            <div class="row clr m-col-2">
              <span class="dp col-l">订单号码：</span>
              <div class="col-r m-input-button"><input v-model="form.context1" maxlength="32" type="tel" placeholder="请输入查询的订单号码"><button @click="searchList('order')">查询</button></div>
            </div>
          </section>
          <div class="m-tag"><b></b>条件查询</div>
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
					<label><span class="radio"><input type="radio" value="2" @click="isChe" v-model="form.select"><span></span></span><span class="text">卡号：</span></label>
				</span>
              <div class="input-box"><input v-model="form.context2" :readonly="form.select!=2" maxlength="25" type="tel" placeholder="请输入查询的卡号"></div>
            </div>
            <div class="row" :class="{active:form.select==6}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="6" @click="isChe" v-model="form.select"><span></span></span><span class="text">手机号码：</span></label>
				</span>
              <div class="input-box"><input v-model="form.context6" :readonly="form.select!=6" maxlength="11" type="tel" placeholder="请输入查询的手机号码"></div>
            </div>
            <div class="row" :class="{active:form.select==3}" >
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="3" @click="isChe" v-model="form.select"><span></span></span><span class="text">用户姓名：</span></label>
				</span>
              <div class="input-box"><input v-model="form.context3" :readonly="form.select!=3" maxlength="18" type="tel" placeholder="请输入查询的用户姓名"></div>
            </div>
            <div class="row" :class="{active:form.select==4}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="4" @click="isChe" v-model="form.select"><span></span></span><span class="text">身份证号：</span></label>
				</span>
              <div class="input-box"><input v-model="form.context4" :readonly="form.select!=4" maxlength="18" type="text" placeholder="请输入查询的身份证号码"></div>
            </div>

            <button class="f-btn f-btn-line" @click="searchList(1)">查询</button>
          </section>
        </div>
        <div class="m-total-table" v-if="list">
          <div class="total-head">
              统计结果<b>{{total}}</b>
              <button class="btn_export_excel" v-if="list.length==0?false :true "  :disabled="list.length==0? true : false " @click="searchList(2)">导出excel</button>
          </div>
          <table>
            <thead>
            <tr >
              <th>序号</th>
              <th>订单号</th>
              <th>卡号</th>
              <th>电话号码</th>
              <th>用户姓名</th>
              <th>身份证号码</th>
              <th>用户地址</th>
              <th>激活时间</th>
              <th>详情</th>
            </tr>
            </thead>
            <tbody>
            <!--查询结果表格-->
            <tr v-for="(todo,index) in list">
              <td>{{((pageNum-1)*10+(index+1))}}</td>
              <td>{{todo.orderId}}</td>
              <td>{{todo.cardNumber}}</td>
              <td>{{todo.phoneNumber}}</td>
              <td>{{todo.userName}}</td>
              <td>{{todo.papersCode}}</td>
              <td>{{todo.userAddress}}</td>
              <td >{{todo.opTime}}</td>
              <td><a :name="todo.orderId"  @click="details" href="javascript:void(0)" class="details">点击查看详情</a></td>
            </tr>
            </tbody>
          </table>
          <my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
        </div>
      </section>
      <!--详情页面-->
      <list-details :list="detailsData" :type="off.type" v-if="off.details" :number="off.number">

      </list-details>
    </div>
  </section>
</template>
<script>
  import {reqCommonMethod} from "../../../config/service.js";  
  import pagination from "../../../componentskm/page.vue";
  import details from "../../../componentskm/onlineHallOrderDetails.vue";
  import {createDownload} from '../../../config/utils';
  export default{
    name:'ecsNetOrderList',
    data (){
      return {
        off:{
          buttonState:0,//按钮的点击状态
          jsonData:{},
          type:1,//1，待审核;2，已审核;3，进行中;4，已关闭
          isLoad:0,//加载条
          details:0,//详情页面开关
          number:'',//第几条详情
        },
        form:{
          source:6,//系统名称
          orderType:6,//操作类型
          cardType:0,//运营商
          orderStatus:0,//订单状态
          auditType:9,//审核方式
          context1:'',//订单号码
          context2:'',//卡号
          context3:'',//用户名
          context4:'',//身份证号
          context6:'',//手机号码
          startTime:'',
          endTime:'',
          select:''//条件查询，默认选择的条件
        },
        list:'',//查询数据
        detailsData:'',//详情数据
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
        var vm=this,type=this.$route.params.type;
        vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
        vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
      }
//查询按钮
      ,searchList:function(index,page){
        var s=this.form.select;
        var userInfo=localStorage.getItem('KA_ECS_USER');
        userInfo=JSON.parse(userInfo);
        var customerId=userInfo.customerId;
        var vm=this,url,whichBtn,json={"customerId": customerId,"orderId":'','phoneNumber':'',"cardNumber":'',"pageNum": "1","pageSize": "10","userName":'',"papersCode":'',"opTimeStart":vm.form.startTime,"opTimeEnd":vm.form.endTime};
//单条件查询,构造发送给后台的json
        if(index===1){
          vm.off.buttonState=1;
          if(s==2&&vm.form.context2===''){
            layer.open({
              content:"请输入要查询的卡号",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
          else if(s==6&&vm.form.context6===''){
            layer.open({
              content:"请输入要查询的手机号",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
          else if(s==3&&vm.form.context3===''){
            layer.open({
              content:"请输入要查询的用户名",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
          else if(s==4&&vm.form.context4===''){
            layer.open({
              content:"请输入要查询的身份证号",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
        //单选框条件传参
          if(s==2){
            json.cardNumber=vm.form.context2;
          }
          else if(s==6){
            json.phoneNumber=vm.form.context6;
          }
          else if(s==3){
            json.userName=vm.form.context3;
          }
          else if(s==4){
            json.papersCode=vm.form.context4;
          }
        }
        //订单号查询,构造发送给后台的json
        else if(index==='order'){
          vm.off.buttonState='ord';
          if(!vm.form.context1){
            layer.open({
              content:'请输入订单号码',
              skin: 'msg',
              time: 2,
              msgSkin:'error',
            });
            return false;
          }
          json={"customerId": customerId,"orderId":vm.form.context1,'phoneNumber':'',"cardNumber":'',"pageNum": "1","pageSize": "10","userName":'',"papersCode":'',"opTimeStart":'',"opTimeEnd":''};
        }
        //如果index===1||index==='order'就发送ajax请求
        if(index===1||index==='order'){
          vm.off.isLoad=true;
          reqCommonMethod(json,function(){
            vm.off.isLoad=false;
          },"km-ecs/w/boss/order/query")
              .then((data)=>{
                  vm.list=data.data.list
                  vm.total=data.data.total;
                  vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
                  vm.pageNum=page||1;
                  vm.callback=function(v){vm.searchList(index,v)}; 
                  vm.off.isLoad=false; 
              }).catch(error=>errorDeal(error)); 	 
        }
        //如果index===2则导出excel
        if(index===2){
          //导出条件查询结果
          if(vm.off.buttonState===1){
            var s=this.form.select;
                userInfo=localStorage.getItem('KA_ECS_USER');
                userInfo=JSON.parse(userInfo);
                customerId=userInfo.customerId;
                vm=this,url,json={"customerId": customerId,"orderId":'','phoneNumber':'',"cardNumber":'',"pageNum": "1","pageSize": "10","userName":'',"papersCode":'',"opTimeStart":vm.form.startTime,"opTimeEnd":vm.form.endTime};
                json.codeId=userInfo.codeId;
            if(s==2){
              json.cardNumber=vm.form.context2;
            }
            else if(s==6){
              json.phoneNumber=vm.form.context6;
            }
            else if(s==3){
              json.userName=vm.form.context3;
            }
            else if(s==4){
              json.papersCode=vm.form.context4;
            }
            var _data=BASE64.encode(JSON.stringify(json));
            }
          //导出订单号查询结果
          else if(vm.off.buttonState==='ord'){
            json={"customerId": '',"orderId":'','phoneNumber':'',"cardNumber":'',"pageNum": "1","pageSize": "10","userName":'',"papersCode":'',"opTimeStart":' ',"opTimeEnd":' '};
            var userInfo=localStorage.getItem('KA_ECS_USER');
            userInfo=JSON.parse(userInfo);
            json.customerId=userInfo.customerId;
            json.codeId=userInfo.codeId;
            json.orderId=vm.form.context1;
            var _data=BASE64.encode(JSON.stringify(json));
          }

          vm.off.load=true;
          createDownload("km-ecs/w/boss/order/export",_data,function(){
            vm.off.load=false;
          });
        }
      }
      //按钮
      ,isChe:function(){
        this.form.select='';
      }
//      详情页点击事件
      ,details:function(e){//详情
        var vm=this
            ,customerId=localStorage.getItem('KA_ECS_USER')[customerId]
            ,json={"customerId": customerId,"orderId":'','phoneNumber':'',"cardNumber":'',"pageNum": "1","pageSize": "10","userName":'',"papersCode":'',"opTimeStart":'',"opTimeEnd":''}
            ,url;
        vm.off.number=e.target.title;
        if(vm.off.isLoad)return false;
        vm.off.isLoad=true;
        json.orderId=e.target.name;
        // vm.AJAX('w/boss/order/query' ,json,function(data){
        //   vm.detailsData=data.data.list[0];
        //   vm.off.details=true;
        // },function(){
        //   vm.off.isLoad=false;
        // })
        reqCommonMethod(json,function(){vm.off.isLoad=false;},"km-ecs/w/boss/order/query")
        .then((data)=>{
            vm.detailsData=data.data.list[0];
            vm.off.details=true;
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


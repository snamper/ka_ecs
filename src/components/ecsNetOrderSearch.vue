<style scoped>
  @import "../assets/css/search.css";
</style>
<template>
  <div id="search" :class="{active:off.details}">
    <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
    <!--查询-->
    <section v-if="!off.details">
      <div class="g-search-form">
        <div class="m-tag"><b></b>订单查询</div>
        <section class="form-c">
          <div class="row clr m-col-2">
            <span class="dp col-l">订单号码：</span>
            <div class="col-r m-input-button"><input v-model="form.context1" maxlength="32" type="tel" placeholder="请输入查询的订单号码"><button @click="searchList('order')">查询</button></div>
          </div>
        </section>
        <div class="m-tag"><b></b>条件查询</div>
        <section class="form-c">
          <div class="row clr m-col-2">
            <div class="dp col-l">激活时间：</div>
            <div class="col-r">
              <span class="m-time-area"><input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"></span>
              <span class="m-space">一</span>
              <span class="m-time-area"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
            </div>
          </div>
        </section>
        <section class="form-c o-no-bgc">
          <!--卡号-->
          <div class="row" :class="{active:form.select==2}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="2" v-model="form.select"><span></span></span><span class="text">卡号：</span></label>
				</span>
            <div class="input-box"><input v-model="form.context2" :readonly="form.select!=2" maxlength="11" type="tel" placeholder="请输入查询的卡号"></div>
          </div>
          <div class="row" :class="{active:form.select==6}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="6" v-model="form.select"><span></span></span><span class="text">手机号码：</span></label>
				</span>
            <div class="input-box"><input v-model="form.context6" :readonly="form.select!=6" maxlength="11" type="tel" placeholder="请输入查询的手机号码"></div>
          </div>
          <div class="row" :class="{active:form.select==3}" >
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="3" v-model="form.select"><span></span></span><span class="text">用户姓名：</span></label>
				</span>
            <div class="input-box"><input v-model="form.context3" :readonly="form.select!=3" maxlength="11" type="tel" placeholder="请输入查询的用户姓名"></div>
          </div>
          <div class="row" :class="{active:form.select==4}">
				<span class="m-form-radio">
					<label><span class="radio"><input type="radio" value="4" v-model="form.select"><span></span></span><span class="text">身份证号：</span></label>
				</span>
            <div class="input-box"><input v-model="form.context4" :readonly="form.select!=4" maxlength="18" type="text" placeholder="请输入查询的身份证号码"></div>
          </div>


          <button class="f-btn f-btn-line" @click="searchList(1)">查询</button>
        </section>
      </div>
      <div id="totalDiv" v-if="list">
        <div class="total-head">统计结果<b>{{total}}</b></div>
        <table>
          <thead>
            <tr >
              <th>订单号</th>
              <th>卡号</th>
              <th>电话号码</th>
              <th>用户姓名</th>
              <th>身份证号码</th>
              <th>用户地址</th>
              <th>证明照片</th>
              <th>反面照片</th>
              <th>手持照片</th>
              <th>激活时间</th>
            </tr>
          </thead>
          <tbody>
          <!--待审核-->
          <tr  v-for="(todo,index) in list">
            <td>{{((pageNum-1)*10+(index+1))}}</td>
            <td>{{todo.orderId}}</td>
            <td>{{todo.cardNumber}}</td>
            <td>{{todo.phoneNumber}}</td>
            <td>{{todo.userName}}</td>
            <td>{{todo.papersCode}}</td>
            <!--地址-->
            <td>{{todo.userAddress}}</td>
            <td><img :src="todo.papersImage" alt="Pic"></td>
            <td><img :src="todo.backImage" alt="Pic"></td>
            <td><img :src="todo.fourthImage" alt="Pic"></td>
            <td>{{todo.opTime}}</td>
            <td><a :name="todo.orderId" @click="details" href="javascript:void(0)" class="details">详情</a></td>
          </tr>
          <!--进行中,已关闭-->
          </tbody>
        </table>
        <my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
      </div>
    </section>
    <!--详情-->
    <list-details :list="detailsData" :type="off.type" v-if="off.details" :number="off.number">

    </list-details>
  </div>
</template>
<script>
  require("../assets/js/laydate/laydate.js");
  require("../assets/js/laydate/skins/default/laydate.css");
  import pagination from "../components/page.vue";
  import details from "../components/cardOrderDetails.vue";
  export default{
    name:'ecsNetOrderList',
    data (){
      return {
        off:{
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
          context5:'',// 用户地址
          context6:'',//type=1，订单状态；type=2，开卡状态
          opTimeStart:'',
          opTimeEnd:'',
          select:''//条件查询，默认选择的条件
        },
        list:'',//查询数据
        detailsData:'',//详情数据
        total:0,//总查询条数
        pageNum:1,//当前页数
        pageSize:10,//显示条数
        maxpage:1,//最大页数
        callback:Function//page组件点击回调
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
//        根据路由传参做判断
        vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
        vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
      },
//      根据表单构建条件进行查询
      searchList:function(index,page){
        var customerId=localStorage.getItem('KA_ECS_INFO');
        var vm=this,url,json={"orderId":vm.form.context1,'phoneNumber':vm.form.context6,"cardNumber":vm.form.context2,"userName":vm.form.context3,"papersCode":vm.form.context4,"opTimeStart":vm.form.startTime,"opTimeEnd":vm.form.endTime};
        console.log(json);
        //待审核和已审核
        vm.AJAX('w/boss/order/query',json,function(data){
          vm.list=data.data.list;//数据
          vm.total=data.data.total;//总条数
          vm.maxpage=Math.ceil(parseInt(data.data.total)/10);//最大页码
          vm.pageNum=page||1;
          vm.callback=function(v){vm.searchList(index,v)};
        },function(){
          vm.off.isLoad=false;
        })
      }
    }
  }
</script>


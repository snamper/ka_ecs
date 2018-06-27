<style scoped>
  @import "../assets/css/login.css";
  body,#app{ max-width: 1600px;}
</style>
<template>
  <section class="login-box">
    <div class="login-bg clr">
      <form>
        <header><img src="../assets/images/pc_logo.png"></header>
        <div class="form-controll user"><label></label><div class="input-outter"><input v-model="user" type="text" maxlength="11" name="" placeholder="输入登录账号"><transition name="shake"><b v-if="message[0].off">{{message[0].text}}</b></transition></div></div>
        <div class="form-controll password"><label class="letter-space2"></label><div class="input-outter"><input maxlength="20" type="password" v-model="password" placeholder="输入密码"><transition name="shake"><b v-if="message[1].off">{{message[1].text}}</b></transition></div></div>
        <div class="form-controll reg"><label></label><div class="input-outter"><input @keydown="toLogin" v-model="validCode" type="text" maxlength="4" name="" placeholder="输入验证码"><img :src="validImg" @click="getVlidateCode"><transition name="shake"><b v-if="message[2].off">{{message[2].text}}</b></transition></div></div>
        <a href="javascript:void(0)" @click="login" class="btn bg-b">登录<div class="loading-spinner" v-if="load"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></a>
      </form>
    </div>
  </section>
</template>
<script type="text/javascript">
// import hexMD5 from "../assets/js/md5.min.js";
import axios from 'axios';
export default {
  name: 'login',
  data () {
    return {
      user:'',
      password:'',
      validCode:'',
      load:0,
      list:'',
      validImg:'',
      message:[{off:0,text:''},{off:0,text:''},{off:0,text:''}]
    }
  },
  mounted:function(){
    this.getVlidateCode();
  },
  methods:{
    getVlidateCode:function(){
      this.validImg="jsp/common/ValidateCode.jsp?t="+new Date().getTime();
    },
    login:function(){
      var vm=this;
      if(!vm.load){
        if(!vm.user){
          vm.showMessage(0,'请输入账户');
          return false;
        }else if(!vm.password){
          vm.showMessage(1,'请输入密码');
          return false;
        }else if(!vm.validCode){
          vm.showMessage(2,'请输入验证码');
          return false;
        }
      }
      vm.load=true;
      var json={"userId":vm.user,"pwd":vm.password,"validCode":vm.validCode};
      json=BASE64.encode(JSON.stringify(json));
      axios.defaults.headers.post['Content-Type'] = 'text/html;charset=UTF-8;';
      axios.post('c/user/login',json).then((response)=>{
        vm.load=false;
        if(response.data.code=="200"){
          var staffInfo=response.data.data.staffInfo;
          staffInfo.time=0;
          window.localStorage.clear();
          window.localStorage.setItem('ECS_INFO',JSON.stringify(staffInfo))
          window.location.href="#/home";
        }else{
          vm.getVlidateCode();
          vm.showMessage(2,response.data.msg)
        }
      }).catch((response)=>{
          vm.load=false;
          vm.getVlidateCode();
          vm.showMessage(2,'服务错误');
      })
    },
    toLogin:function(e){
      e.keyCode==13&&this.login();
    },
    showMessage:function(index,text){
      var vm=this;
      vm.message[index].off=true;
      vm.message[index].text=text;
      setTimeout(function(){
        vm.message[index].off=false;
        vm.message[index].text='';
      },1500);
    }
  }
}

</script>


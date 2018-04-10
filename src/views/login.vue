<style scoped>
  @import "../assets/km/css/login.css";
  /* body,#app{ max-width: 1600px;} */
</style>
<template>
  <section class="login-box">
    <div class="login-bg clr">
      <form>
        <header><img src="../assets/km/images/logo_yyzx.png"></header>
        <div class="loginForm">
            <div class="">
                <img src="" alt="">
            </div>
            <div class="loginInput fr">
                <div class="form-controll user"><label></label><div class="input-outter"><input v-model="user" type="text" maxlength="11" name="" placeholder="输入管理员账号"><transition name="shake"><b v-if="message[0].off">{{message[0].text}}</b></transition></div></div>
                <div class="form-controll password"><label class="letter-space2"></label><div class="input-outter"><input maxlength="6" type="password" v-model="password" placeholder="输入密码"><transition name="shake"><b v-if="message[1].off">{{message[1].text}}</b></transition></div></div>
                <div class="form-controll reg"><label></label><div class="input-outter"><input @keydown="toLogin" v-model="validCode" type="text" maxlength="4" name="" placeholder="输入验证码"><img :src="list.validateCode" @click="getVlidateCode"><transition name="shake"><b v-if="message[2].off">{{message[2].text}}</b></transition></div></div>
                <a href="javascript:void(0)" @click="login" class="btn bg-b">登录<div class="loading-spinner" v-if="load"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></a>
            </div>
        </div>
      </form>
    </div>
  </section>
</template>
<script type="text/javascript">
import {removeStore,errorDeal,getStore} from '../config/utils';
import {getSignCode,signIn} from '../config/service.js';
import {mapMutations} from 'vuex';
import hexMD5 from "../assets/km/js/md5.min.js";
import axios from 'axios';
export default {
  name: 'login',
  data () {
    return {
        off:{
            powerKmHidden:0,//卡盟隐藏
            powerYmHidden:0,//远盟隐藏
            headMenu:true,//导航栏开关
            window:0,//浏览器窗口宽度
            userMenu:0,//用户菜单开关
            power:0,
            power0:0,
            power5:0,
            power6:0,
            powerkm0:0,
            powerkm1:0,
            powerkm2:0,
            powerkm3:0,
            powerkm4:0, 
            powerkm5:0,
            powerkm6:0,
            powerkm7:0,
            powerkm11:0,
            powerkm21:0,
		},
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
    ...mapMutations([
        "SET_USERINFO",
    ]),
    getVlidateCode:function(){
      var vm=this;
      getSignCode({"data":'156465'},function(){
        vm.load=false;
      }).then(function(res){
        res?vm.list=res.data:void 0;
      }).catch(
          error=>errorDeal(error)
      );
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
      signIn({"userId":vm.user,"pwd":hexMD5(vm.password),"validCode":vm.validCode,"codeId":vm.list.codeId},function(){
        vm.load=false;
      }).then(res=>{
        if(res.code=="200"){
          removeStore("KA_ECS_ONLINE_TIME");
          let userInfo=res.data;
          userInfo.codeId=vm.list.codeId;
          vm.SET_USERINFO(userInfo);
          let isadmin = userInfo.isadmin;
          let isadminYm = userInfo.isadminYm;
          isadminYm&&isadminYm.indexOf('1')>-1? vm.off.power1=true : vm.off.power1=false;
		  isadminYm&&(isadminYm.indexOf('1')>-1||isadminYm.indexOf('2')>-1) ? vm.off.power2=true : vm.off.power2=false;
		  isadminYm&&(isadminYm.indexOf('1')>-1||isadminYm.indexOf('0')>-1) ? vm.off.power0=true : vm.off.power0=false;
		  isadminYm&&(isadminYm.indexOf('1')>-1||isadminYm.indexOf('5')>-1) ? vm.off.power5=true : vm.off.power5=false;
		  isadminYm&&(isadminYm.indexOf('1')>-1||isadminYm.indexOf('6')>-1) ? vm.off.power6=true : vm.off.power6=false;
          var isadmin=isadmin.split(","); 
          function IsInArray(arr,val){ 
        　　var testStr=','+arr.join(",")+","; 
        　　return testStr.indexOf(","+val+","); 
          } 
          IsInArray(isadmin,'0')>-1?vm.off.powerkm0=true : vm.off.powerkm0=false;
          IsInArray(isadmin,'1')>-1?vm.off.powerkm1=true : vm.off.powerkm1=false;
          IsInArray(isadmin,'2')>-1?vm.off.powerkm2=true : vm.off.powerkm2=false;
          IsInArray(isadmin,'3')>-1?vm.off.powerkm3=true : vm.off.powerkm3=false;
          IsInArray(isadmin,'4')>-1?vm.off.powerkm4=true : vm.off.powerkm4=false;
          IsInArray(isadmin,'5')>-1?vm.off.powerkm5=true : vm.off.powerkm5=false;
          IsInArray(isadmin,'6')>-1?vm.off.powerkm6=true : vm.off.powerkm6=false;
          IsInArray(isadmin,'7')>-1?vm.off.powerkm7=true : vm.off.powerkm7=false;
          IsInArray(isadmin,'11')>-1?vm.off.powerkm11=true : vm.off.powerkm11=false;
          IsInArray(isadmin,'21')>-1?vm.off.powerkm21=true : vm.off.powerkm21=false;
        if(vm.off.power1||vm.off.power0){
            window.location.href="#/homey/audit/yuanmeng";
            return false;
        }else if(vm.off.power1||vm.off.power2){
            window.location.href="#/homey/search";
            return false;            
        }else if(vm.off.power1||vm.off.power5){
            window.location.href="#/homey/pointsSearch";
            return false;
        } else if(vm.off.power1||vm.off.power6){
            window.location.href="#/homey/excelDownload";
             return false;
        } else if(vm.off.powerkm1||vm.off.powerkm11){
            window.location.href="#/homey/illegalSearch";
            return false;
        }
        
        if(vm.off.powerkm1||vm.off.powerkm2){
           window.location.href="#/homek/dashboard"
            return false;
        }else if( vm.off.powerkm0||vm.off.powerkm1||vm.off.powerkm2||vm.off.powerkm4||vm.off.powerkm5||vm.off.powerkm6){
            window.location.href="#/homek/audit";
            return false;            
        }else if(vm.off.powerkm1||vm.off.powerkm2||vm.off.powerkm3){
            window.location.href="#/homek/orderSearch"
            return false;
        } else if(vm.off.powerkm1||vm.off.powerkm2||vm.off.powerkm7){
            window.location.href="#/homek/resource"
             return false;
        } else if(vm.off.powerkm1||vm.off.powerkm11){
            window.location.href="#/homek/opinion"
            return false;
        }
        }else{
          vm.getVlidateCode();
          vm.showMessage(2,res.msg);
          vm.load=false;
        }
      }).catch(error=>{
          vm.getVlidateCode();
          errorDeal(error)
      });
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


<style scoped>

</style>
<template>
  <section class="g-list-box" id="details">
    <header class="g-lis-head">
      <a class="m-details-back u-icon-back" @click="close"></a>
    </header>
    <div class="g-box">
      <table class="g-list-table">
        <tbody>
        <tr>
          <td>
            <table class="g-inner-table">
              <tbody>
              <tr v-if="list.operatorType!=7"><td>订单号码：</td><td>{{list.orderId}}</td></tr>
              <tr><td>卡号：</td><td>{{ list.cardNumber }}</td></tr>
              <tr v-if="type==3||type==4"><td>订单状态：</td><td>{{ $parent.translateData(7,list.statusDetail) }}</td></tr>
              <tr v-if="type==2"><td>号卡状态：</td><td>{{ $parent.translateData(4,list.cardStatus) }}</td></tr>
              <tr><td>电话号码：</td><td>{{ list.phoneNumber }}</td></tr>
              <tr><td>用户姓名：</td><td>{{ list.userName }}</td></tr>
              <tr><td>身份证号码：</td><td>{{ list.papersCode }}</td></tr>
              <tr><td>用户地址：</td><td>{{ list.userAddress }}</td></tr>
              <tr><td>激活时间：</td><td>{{list.opTime}}</td></tr>
              </tbody>
            </table>
          </td>
          <td class="m-box-img m-meida-640up">
            <ImgZoom :imgData="imgData"></ImgZoom>
          </td>
        </tr>
        <tr class="m-box-img m-meida-640down">
          <img v-for="item in imgData" :src="item.src">
        </tr>
        </tbody>
      </table>
    </div>
    <um-details-view v-if="isShowDetails" :type="typeDetails" :list="detailsList" :dealerId="list.dealerId">

    </um-details-view>
  </section>
</template>
<script>
  import "../assets/km/css/cardOrderDetails.css";
  import {reqCommonMethod} from "../config/service.js";  
  import {errcrDeal} from "../config/utils.js";
  import ImgZoom from '../componentskm/ImgZoom';
  import detailsView from '../componentskm/cardOrderDetailsAlert';
  export default{
    name:'cardOrderDetails',
    props:{
      list:Object,
      type:Number,
      number:String,
    },
    data(){
      return{
        imgData:[],//当前订单的图片
        isShowDetails:0,
        typeDetails:0,
        detailsList:''
      }
    },
    components:{
      'um-details-view':detailsView,
      'ImgZoom':ImgZoom
    },
    created:function(){
      var vm=this;
      vm.imgData=[
        {'src':vm.list.fourthImage,'name':'手持'},
        {'src':vm.list.papersImage,'name':'正面'},
        {'src':vm.list.backImage,'name':'反面'}
      ];
    },
    methods:{
      close:function(){
        this.$parent.off.details=false
      },
      detailsOrder:function(){//开卡订单详情
        var vm=this;
        // vm.AJAX('w/audit/openCardInfo',{"transactionId":vm.list.orderId},function(data){
        //   var list= data.data,str='',payed='';
        //   for(let i in list.optionalPackage){
        //     str+='<p>'+list.optionalPackage[i].title+'</p>';
        //   }
        //   if(list.payed==1){
        //     payed+='<li class="clr"><div class="fl">实付价格：</div><div class="fright">'+(parseFloat(list.actualPrice)/100).toFixed(2)+'元<b class="f-c-grey">（号码占用费'+(parseFloat(list.actualPrice_x)/10000).toFixed(2)+'元+预存话费'+(parseFloat(list.actualPrice_y)/10000).toFixed(2)+'元）</b></div></li>'+
        //       '<li class="clr"><div class="fl">抵扣金额：</div><div class="fright">'+(parseFloat(list.deductionMoney)/100).toFixed(2)+'元</div></li>'+
        //       '<li class="clr"><div class="fl">开卡返佣：</div><div class="fright">'+(parseFloat(list.commission)/100).toFixed(2)+'元<b class="f-c-grey">（号码占用费'+(parseFloat(list.commission_x)/100).toFixed(2)+'元+预存话费'+(parseFloat(list.commission_y)/100).toFixed(2)+'元）</b></div></li>'+
        //       '<li class="clr"><div class="fl">支付模式：</div><div class="fright">'+list.payChannel+'</div></li>';
        //   }
        //   layer.open({
        //     content:'<ul class="f-scroll-lt lay-details">'+
        //     '<li class="clr"><div class="fl">订单号：</div><div class="fright">'+list.sysOrderId+'</div></li>'+
        //     '<li class="clr"><div class="fl">BOSS流水号：</div><div class="fright">'+list.transactionId+'</div></li>'+
        //     '<li class="clr"><div class="fl">用户姓名：</div><div class="fright">'+list.userName+'</div></li>'+
        //     '<li class="clr"><div class="fl">电话号码：</div><div class="fright">'+list.phoneNumber+'（<b class="f-c-grey">'+vm.$parent.translateData(5,list.phoneLevel)+'</b>，'+list.phoneHome+'）</div></li>'+
        //     '<li class="clr"><div class="fl">ICCID：</div><div class="fright">'+list.ICCID+'</div></li>'+
        //     '<li class="clr"><div class="fl">IMSI卡号：</div><div class="fright">'+list.esim+'</div></li>'+
        //     '<li class="clr"><div class="fl">状态修改时间：</div><div class="fright">'+vm.$parent.getDateTime(list.timestamp)[6]+'</div></li>'+
        //     '<li class="clr"><div class="fl">应付价格：</div><div class="fright">'+((parseFloat(list.price_x)/100)+(parseFloat(list.price_y)/100)).toFixed(2)+'元<b class="f-c-grey">（号码占用费'+(parseFloat(list.price_x)/100).toFixed(2)+'元+预存话费'+(parseFloat(list.price_y)/100).toFixed(2)+'元）</b></div></li>'+payed+
        //     '<li class="clr"><div class="fl">已选套餐：</div><div class="fright">'+list.package+'</div></li>'+
        //     '<li class="clr"><div class="fl">已选可选包：</div><div class="fright">'+str+'</div></li></ul>',
        //     type:0,
        //     title:'开卡订单详情',
        //     btn:0,
        //     style:'width:auto;'
        //   });
        // });
        reqCommonMethod({"transactionId":vm.list.orderId},function(){vm.off.isLoad=false;},"km-ecs/w/audit/openCardInfo")
        .then((data)=>{
            var list= data.data,str='',payed='';
          for(let i in list.optionalPackage){
            str+='<p>'+list.optionalPackage[i].title+'</p>';
          }
          if(list.payed==1){
            payed+='<li class="clr"><div class="fl">实付价格：</div><div class="fright">'+(parseFloat(list.actualPrice)/100).toFixed(2)+'元<b class="f-c-grey">（号码占用费'+(parseFloat(list.actualPrice_x)/10000).toFixed(2)+'元+预存话费'+(parseFloat(list.actualPrice_y)/10000).toFixed(2)+'元）</b></div></li>'+
              '<li class="clr"><div class="fl">抵扣金额：</div><div class="fright">'+(parseFloat(list.deductionMoney)/100).toFixed(2)+'元</div></li>'+
              '<li class="clr"><div class="fl">开卡返佣：</div><div class="fright">'+(parseFloat(list.commission)/100).toFixed(2)+'元<b class="f-c-grey">（号码占用费'+(parseFloat(list.commission_x)/100).toFixed(2)+'元+预存话费'+(parseFloat(list.commission_y)/100).toFixed(2)+'元）</b></div></li>'+
              '<li class="clr"><div class="fl">支付模式：</div><div class="fright">'+list.payChannel+'</div></li>';
          }
          layer.open({
            content:'<ul class="f-scroll-lt lay-details">'+
            '<li class="clr"><div class="fl">订单号：</div><div class="fright">'+list.sysOrderId+'</div></li>'+
            '<li class="clr"><div class="fl">BOSS流水号：</div><div class="fright">'+list.transactionId+'</div></li>'+
            '<li class="clr"><div class="fl">用户姓名：</div><div class="fright">'+list.userName+'</div></li>'+
            '<li class="clr"><div class="fl">电话号码：</div><div class="fright">'+list.phoneNumber+'（<b class="f-c-grey">'+vm.$parent.translateData(5,list.phoneLevel)+'</b>，'+list.phoneHome+'）</div></li>'+
            '<li class="clr"><div class="fl">ICCID：</div><div class="fright">'+list.ICCID+'</div></li>'+
            '<li class="clr"><div class="fl">IMSI卡号：</div><div class="fright">'+list.esim+'</div></li>'+
            '<li class="clr"><div class="fl">状态修改时间：</div><div class="fright">'+vm.$parent.getDateTime(list.timestamp)[6]+'</div></li>'+
            '<li class="clr"><div class="fl">应付价格：</div><div class="fright">'+((parseFloat(list.price_x)/100)+(parseFloat(list.price_y)/100)).toFixed(2)+'元<b class="f-c-grey">（号码占用费'+(parseFloat(list.price_x)/100).toFixed(2)+'元+预存话费'+(parseFloat(list.price_y)/100).toFixed(2)+'元）</b></div></li>'+payed+
            '<li class="clr"><div class="fl">已选套餐：</div><div class="fright">'+list.package+'</div></li>'+
            '<li class="clr"><div class="fl">已选可选包：</div><div class="fright">'+str+'</div></li></ul>',
            type:0,
            title:'开卡订单详情',
            btn:0,
            style:'width:auto;'
          });
        }).catch(error=>errorDeal(error));;
      },
      detailsPayOrder:function(){//支付订单详情
        var vm=this;
        // vm.AJAX('w/audit/payInfo',{"payId":vm.list.payOrderId},function(data){
        //   var list= data.data;
        //   layer.open({
        //     content:'<ul class="f-scroll-lt lay-details">'+
        //     '<li class="clr"><div class="fl">系统流水号：</div><div class="fright">'+list.sysPayId+'</div></li>'+
        //     '<li class="clr"><div class="fl">第三方流水号：</div><div class="fright">'+list.payId+'</div></li>'+
        //     '<li class="clr"><div class="fl">支付渠道：</div><div class="fright">'+list.payChannel+'</div></li>'+
        //     '<li class="clr"><div class="fl">支付方式：</div><div class="fright">'+list.payType+'</div></li>'+
        //     '<li class="clr"><div class="fl">支付金额：</div><div class="fright">'+list.payMoney+'元</div></li></ul>',
        //     type:0,
        //     title:'支付订单详情',
        //     btn:0,
        //     style:'width:auto;'
        //   });
        // });
        reqCommonMethod({"payId":vm.list.payOrderId},function(){vm.off.isLoad=false;},"km-ecs/w/audit/payInfo")
        .then((data)=>{
          var list= data.data;
          layer.open({
            content:'<ul class="f-scroll-lt lay-details">'+
            '<li class="clr"><div class="fl">系统流水号：</div><div class="fright">'+list.sysPayId+'</div></li>'+
            '<li class="clr"><div class="fl">第三方流水号：</div><div class="fright">'+list.payId+'</div></li>'+
            '<li class="clr"><div class="fl">支付渠道：</div><div class="fright">'+list.payChannel+'</div></li>'+
            '<li class="clr"><div class="fl">支付方式：</div><div class="fright">'+list.payType+'</div></li>'+
            '<li class="clr"><div class="fl">支付金额：</div><div class="fright">'+list.payMoney+'元</div></li></ul>',
            type:0,
            title:'支付订单详情',
            btn:0,
            style:'width:auto;'
          });
        }).catch(error=>errorDeal(error));;        
      },
      detailsUser:function(){//操作者详情
        var vm=this;
        // vm.AJAX('w/audit/getUserInfo',{"userId":vm.list.operatorId},function(data){
        //   vm.detailsList=data.data;
        //   vm.isShowDetails=true;
        //   vm.typeDetails=1;
        // });
        reqCommonMethod({"userId":vm.list.operatorId},function(){vm.off.isLoad=false;},"km-ecs/w/audit/getUserInfo")
        .then((data)=>{
           vm.detailsList=data.data;
           vm.isShowDetails=true;
           vm.typeDetails=1;
        }).catch(error=>errorDeal(error));;        
      },
      detailsMerchant:function(){//商户详情
        var vm=this;
        // vm.AJAX('w/audit/getMerchantInfo',{"dealerId":vm.list.dealerId},function(data){
        //   vm.detailsList=data.data;
        //   vm.isShowDetails=true;
        //   vm.typeDetails=2;
        // });
        reqCommonMethod({"dealerId":vm.list.dealerId},function(){vm.off.isLoad=false;},"km-ecs/w/audit/getMerchantInfo")
        .then((data)=>{
            vm.detailsList=data.data;
          vm.isShowDetails=true;
          vm.typeDetails=2;
        }).catch(error=>errorDeal(error));;        
      },
      agree:function(){//复审同意
        var vm=this;
        // vm.AJAX('w/audit/reAudit',{"orderId":vm.list.orderId},function(data){
        //   layer.open({
        //     content:'复审成功',
        //     skin: 'msg',
        //     time: 4,
        //     msgSkin:'success',
        //   })
        //   vm.list.status=4;
        //   vm.list.cardStatus=1
        //   vm.$parent.list[parseInt(vm.number)].status=4;
        //   vm.$parent.list[parseInt(vm.number)].cardStatus=1;
        // });
        reqCommonMethod({"orderId":vm.list.orderId},function(){vm.off.isLoad=false;},"km-ecs/w/audit/reAudit")
        .then((data)=>{
            layer.open({
            content:'复审成功',
            skin: 'msg',
            time: 4,
            msgSkin:'success',
          })
          vm.list.status=4;
          vm.list.cardStatus=1
          vm.$parent.list[parseInt(vm.number)].status=4;
          vm.$parent.list[parseInt(vm.number)].cardStatus=1;
        }).catch(error=>errorDeal(error));;        
      },
      orderLog:function(){//审核日志
        var vm=this;
        // vm.AJAX('w/audit/log',{"orderId":vm.list.orderId},function(data){
        //   var str='',list= data.data;
        //   for(var i in list){
        //     str+='<li><time><b></b>'+vm.$parent.getDateTime(list[i].modifyTime)[6]+'</time><div>'+list[i].context+'</div></li>'
        //   }
        //   layer.open({
        //     content:'<ul class="lay-log">'+str+'</ul>',
        //     type:0,
        //     title:'审核日志',
        //     btn:0,
        //     style:'width:auto;'
        //   });
        // });
        reqCommonMethod({"orderId":vm.list.orderId},function(){vm.off.isLoad=false;},"km-ecs/w/audit/log")
        .then((data)=>{
          var str='',list= data.data;
          for(var i in list){
            str+='<li><time><b></b>'+vm.$parent.getDateTime(list[i].modifyTime)[6]+'</time><div>'+list[i].context+'</div></li>'
          }
          layer.open({
            content:'<ul class="lay-log">'+str+'</ul>',
            type:0,
            title:'审核日志',
            btn:0,
            style:'width:auto;'
          });
        }).catch(error=>errorDeal(error));;        
      },
      integralLog:function(){//积分详情
        var vm=this;
        // vm.AJAX('c/audit/searchIntegration',{"orderId":vm.list.orderId},function(data){
        //   var statusStr='',reasonStr='';
        //   if(data.data.cardStatus!="1")reasonStr+='<li><span>原因：</span>'+data.data.cardStatusReason+'</li>';
        //   layer.open({
        //     content:'<ul class="lay-integralLog"><li><span>本级获得积分：</span>'+data.data.integration+'积分</li><li><span>上级获得积分：</span>'+data.data.superiorIntegration+'积分</li>'+reasonStr+'</ul>',
        //     type:0,
        //     title:'积分查询',
        //     btn:0,
        //     style:'width:auto;'
        //   });
        // });
        reqCommonMethod({"orderId":vm.list.orderId},function(){vm.off.isLoad=false;},"km-ecs/c/audit/searchIntegration")
        .then((data)=>{
          var statusStr='',reasonStr='';
          if(data.data.cardStatus!="1")reasonStr+='<li><span>原因：</span>'+data.data.cardStatusReason+'</li>';
          layer.open({
            content:'<ul class="lay-integralLog"><li><span>本级获得积分：</span>'+data.data.integration+'积分</li><li><span>上级获得积分：</span>'+data.data.superiorIntegration+'积分</li>'+reasonStr+'</ul>',
            type:0,
            title:'积分查询',
            btn:0,
            style:'width:auto;'
          });
        }).catch(error=>errorDeal(error));;        
      },
      filterReason:function(reason){
        var reasonArr=reason.split('|'),str=[];
        var starReason=['非本人现场手持证卡照',"证件与手持合影照中证件不同","证件填报信息与证照中信息不符(包括但不限于证件号码,姓名,地址等信息)","发证机关有误或与证件地址不符","部分或全部照片为翻拍或疑似合成"];
        for(var i in reasonArr){
          if(reasonArr[i]){
            str[i]={'star':0,'text':''};
            for(var j in starReason){
              if(starReason[j]==reasonArr[i]){str[i].star=true;}
              else if(j==(starReason.length-1)){str[i].star=false}
            }
            str[i].text=reasonArr[i];
          }
        }
        return str;
      },
    }
  }
</script>


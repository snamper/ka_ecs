<style scoped>
  @import "../assets/css/dashboard.css";
</style>
<template>
  <section class="dashboard-box">
    <div style="position:relative;height:100%;min-width:1200px;min-height:700px;">
      <div class="notice map-box-out" style="width:25%;">
        <header>实时公告</header>
        <div class="noticediv f-scroll-lt" id="notice-box" @mouseover="noticeMouseEvent(false)" @mouseleave="noticeMouseEvent(true)" :style="{height:noticeUlHeight}">
          <ul class="m-notice-ul" id="notice-ul">
            <li class="clr" v-for="msg in notice">
              <div class="fl msg-type">
                <span class="u-icon-chongzhi" v-show="msg.type==3"></span>
                <span class="u-icon-jili" v-show="msg.type==4"></span>
                <span class="u-icon-kaika" v-show="msg.type==5"></span>
                <span class="u-icon-jifen" v-show="msg.type==2"></span>
                <span class="u-icon-icon_yewu" v-show="msg.type==1"></span>
              </div>
              <div class="msg-content">
                <time>{{ getDateTime(msg.createTime)[5] }}</time>
                <div class="content">{{ msg.message }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div style="width:75%;" class="map-box-out make_transist" v-bind:class="{'showscale' : !isA, 'hidescale': isA}">
        <div class="map-box">
          <!--开卡尝试-->
          <div class="map-box-inner" id="cardCreate">总数</div>
          <div class="inner-total total-1">（<span>总数：</span><b class="fsfantasy">{{subtext[0]}}</b>）</div>
          <!--活跃商户-->
          <div class="map-box-inner" id="activeUser"></div>
          <div class="inner-total total-2">（<span>总数：</span><b class="fsfantasy">{{subtext[1]}}</b>）</div>
        </div>
        <div class="map-box">
          <!--在线用户-->
          <div class="map-box-inner" id="onlineUser"></div>
          <div class="inner-total total-1">（<span>总数：</span><b class="fsfantasy">{{subtext[2]}}</b>）</div>
          <!--充值金额-->
          <div class="map-box-inner" id="rechargeMoney"></div>
          <div class="inner-total total-2">（<span>总数：</span><b class="fsfantasy">{{subtext[3]}}</b>）</div>
        </div>
      </div>

      <div style="width:75%;" class="map-box-out make_transist fl" v-bind:class="{'showscale' : isA, 'hidescale': !isA}">
        <div class="map-box">
          <!--开卡成功总数-->
          <div class="map-box-inner" id="amount"></div>
          <div class="statistics">
            <div>远特普号</div><b class="fsfantasy">{{saleabil[0]}}</b>
            <div>远特靓号</div><b class="fsfantasy">{{saleabil[1]}}</b>
            <div>联通普号</div><b class="fsfantasy">{{saleabil[2]}}</b>
            <div>联通靓号</div><b class="fsfantasy">{{saleabil[3]}}</b>
          </div>
        </div>
        <!--商户总数-->
        <div class="map-box">
          <div class="map-box-inner" id="merchant"></div>
          <div class="statistics">
            <div>游客</div><b class="fsfantasy">{{userNub[0]}}</b>
            <div>远特商户数</div><b class="fsfantasy">{{userNub[1]}}</b>
            <div>远特商户数</div><b class="fsfantasy">{{userNub[2]}}</b>
            <div>设备数</div><b class="fsfantasy">{{userNub[3]}}</b>
          </div>
        </div>
      </div>
    </div>
    <span  v-on:click="toogle" class="switch u-icon-shiftEchart"></span>
  </section>
</template>
<script type="text/javascript">
import { getDateTime,getUnixTime } from "../config/utils.js";
  export default {
    name: "dashboard",
    data() {
      return {
        isA: true,
        //category:[],
        //lineData:[],
        notice:[],//公共数据列表
        noticeUlHeight:'',//公共栏高
        noticelatestTime:0,//最近获取消息的时间
        TimerNotice:[],//消息定时器
        off:{
          cardTry_index:0,//开卡尝试legend selected index
          onlineUser_index:0,//在线用户legend selected index
          recharge_index:0,//充值legend selected index
        },
        saleabil:[],//0,;1,;2,;3,;
        userNub:[],//0,;1,;2,;3,;
        subtext:[]//0,;1,;2,;3,;
      };
    },
    created:function(){
      const vm=this,change=function(){
        vm.noticeUlHeight=document.documentElement.clientHeight-80+'px';
      };
      change();
      window.onresize=function(){
        change();
      };
    },
    beforeDestroy:function(){
      this.noticeMouseEvent();
    },
    mounted() {
      //   ajax请求获取数据统计
      var vm=this;
      
      vm.getnotice();

      vm.getamount();
      vm.getcreatecardAmount();
      vm.getmerchant();
      vm.getcardCreate();
      vm.getonlineUser();
      vm.getrechargeMoney();
      vm.getActiveUser();

      this.noticeMouseEvent(true);
    },
    methods: {
      toogle:function(){
        this.isA = !this.isA;
      },
      noticeMouseEvent(off){
        const vm=this;
        if(off){ 
          let timer=setInterval(function(){
              vm.getnotice();
          },2000);
          vm.TimerNotice.push(timer)
        }else{
          for(let i=0;i<vm.TimerNotice.length;i++){
            clearInterval(vm.TimerNotice[i]);
          }
        }
      },
      getLatelyTime(now,type,num){//获取最近日期
        let dateArr=[];
        for(let i=(num-1);i>=0;i--){
          if(type=='hour')dateArr.push(getDateTime(now-1000*60*60*i)[7]);
          if(type=='day')dateArr.push(getDateTime(now-1000*60*60*24*i)[4]);
          if(type=='month')dateArr.push(getDateTime(now-1000*60*60*24*30*i)[1]);
        }
        return dateArr
      },
      getnotice(){//获取公告
        var vm=this;
        vm.AJAX('w/statistics/realtimenotice',{time:vm.noticelatestTime},function(data){
          if(data.code==200){
            for(let i=0;i<data.data.list.length;i++){
              vm.notice.push(data.data.list[i]);
            }

            setTimeout(function(){
              vm.noticeScroll();
            },30)
            
            if(data.data.list[0]){
              vm.noticelatestTime=data.data.list[0].now;
            }
          }
        },true);
      },
      noticeScroll(){//消息滚动执行
        var vm=this,noticeBox=document.getElementById("notice-box");
        noticeBox.scrollTop=noticeBox.scrollHeight;
        if(vm.notice.length>60){
          vm.notice=[];
        }
      },
      getamount(){//获取第一屏右边总数
        var vm=this;
        vm.AJAX('w/statistics/homepagedrawline',{"type":1},function(data){
          if(data.code==200){
            vm.saleabil = data.data.saleabil;
            vm.userNub = data.data.userNub;
          }
        },true);
      },
      getcreatecardAmount(){//获取开卡成功数
        var vm=this;
        vm.AJAX('w/statistics/homepagedrawline',{"type":2},function(data){
          vm.initMap({
            id: "amount",
            name: "开卡成功总数",
            index:0,
            legend: ["天"],
            category: [vm.getLatelyTime(data.data.lasttime,'day',7)],
            lineData: [data.data.day]
          });
        },true);
      },
      getmerchant(){//获取签约商户数
        var vm=this;
        vm.AJAX('w/statistics/homepagedrawline',{"type":3},function(data){
          vm.initMap({
            id: "merchant",
            name: "商户总数",
            //subtext:subtext,
            index:0,
            legend: ["天"],
            category: [vm.getLatelyTime(data.data.lasttime,'day',7)],
            lineData: [data.data.day]
          });
        },true);
      },
      getcardCreate(){//开卡尝试数
        var vm=this;
        vm.AJAX('w/statistics/homepagedrawline',{"type":5},function(data){
          vm.subtext[0] = data.data.total;
          vm.initMap({
            id: "cardCreate",
            name: "开卡尝试",
            legend: ["时", "天", "月"],
            category: [vm.getLatelyTime(data.data.lasttime[0],'hour',12),vm.getLatelyTime(data.data.lasttime[1],'day',7),vm.getLatelyTime(data.data.lasttime[2],'month',6)],
            lineData: [data.data.hour,data.data.day,data.data.month],
            index:vm.off.cardTry_index
          });
        },true);
      },
      getonlineUser(){//用户在线数
        var vm=this;
        vm.AJAX('w/statistics/homepagedrawline',{"type":6},function(data){
          vm.subtext[2] = data.data.total;
          vm.initMap({
            id: "onlineUser",
            name: "当前在线用户",
            legend: ["时","天"],
            index:vm.off.onlineUser_index,
            category: [vm.getLatelyTime(data.data.lasttime[0],'hour',12),vm.getLatelyTime(data.data.lasttime[1],'day',7)],
            lineData: [data.data.hour,data.data.day]
          });
        },true);
      },
      getrechargeMoney(){//充值金额
        var vm=this;
        vm.AJAX('w/statistics/homepagedrawline',{"type":7},function(data){
          vm.subtext[3] = data.data.total;
          vm.initMap({
            id: "rechargeMoney",
            name: "充值金额",
            index:vm.off.recharge_index,
            legend: ["时", "天"],
            category: [vm.getLatelyTime(data.data.lasttime[0],'hour',12),vm.getLatelyTime(data.data.lasttime[1],'day',7)],
            lineData: [data.data.hour,data.data.day]
          });
        },true);
      },
      getActiveUser(){//活跃商户
        var vm=this;
        vm.AJAX('w/statistics/homepagedrawline',{"type":4},function(data){
          vm.subtext[1] = data.data.total;
          vm.initMap({
            id: "activeUser",
            name: "活跃商户",
            legend: ["天"],
            index:0,
            category: [vm.getLatelyTime(data.data.lasttime[1],'day',7)],
            lineData: [data.data.day],
          });
        },true);
      },
      initMap(params) {
        var vm = this,series = [],
        myChart = echarts.init(document.getElementById(params.id));
        myChart.showLoading();
        for (let i = 0; i < params.legend.length; i++) {
          series.push({
            name: params.legend[i],
            type: "line",
            smooth: true,
            showAllSymbol: false,
            symbol: "emptyCircle",
            symbolSize: 5,
            data: params.lineData[i],
            itemStyle: {
              normal: {
                width: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#14c8d4" },
                  { offset: 1, color: "#43eec6" }
                ])
              }
            }
          });
        }
        // option
        var option = {
          backgroundColor: "#F8FAFB",
          title: {
            show: true,
            text: params.name,
            textStyle: {
              color: "#555",
              fontSize:"15",
            },
            left:20
          },
          tooltip: {
            show:true,
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                show: true,
                backgroundColor: "#333"
              }
            },
            formatter:'{c}'
          },
          legend: {
            data: params.legend,
            selectedMode: "single",
            textStyle: {
              color: "#555"
            },
          },
          xAxis: {
            data: params.category[params.index],
            axisLabel: {
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: "#555"
              }
            }
          },
          yAxis: {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#555"
              }
            }
          },
          series: series
        };
        myChart.on("legendselectchanged", function(legend) {//legend click
          
          let index = 0,
          len = Object.keys(legend.selected).length;
          //console.log(legend);
          if (legend.name == "时") {
            index = 0;
          } else if (legend.name == "天") {
            if (len == 3) {
              index = 1;
            } else {
              //index = 0;
              index =1 ;
            }
          } else if (legend.name == "月") {
            index = len - 1;
          }
          if(params.id=="cardCreate"){
            vm.off.cardTry_index=index
          }else if(params.id=="onlineUser"){
            vm.off.onlineUser_index=index
          }else if(params.id=="rechargeMoney"){
            vm.off.recharge_index=index
          }
          option.xAxis.data = params.category[index];
          myChart.setOption(option);
        });
        myChart.setOption(option);
        myChart.hideLoading();
      },
      getDateTime(v){
        return getDateTime(v);
      },
    }
  };
</script>


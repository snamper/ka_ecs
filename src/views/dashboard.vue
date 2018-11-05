<style scoped>
  @import "../assets/km/css/dashboard.css";
</style>
<template>
  <section class="dashboard-box">
    <div class="dashboard-box-inner">
      <div class="notice map-box-out">
        <header>实时公告</header>
        <div class="noticediv f-scroll-lt" id="notice-box" @mousewheel="noticeMouseEvent(false,'wheel')" @mouseover="noticeMouseEvent(false)" @mouseleave="noticeMouseEvent(true)" :style="{height:noticeUlHeight}">
          <ul class="m-notice-ul" id="notice-ul">
            <li class="clr" v-for="(msg,i) in notice" :key="i">
              <div class="fl msg-type">
                <span class="u-icon-chongzhi" v-show="msg.type==3"></span>
                <span class="u-icon-jili" v-show="msg.type==4"></span>
                <span class="u-icon-kaika" v-show="msg.type==5"></span>
                <span class="u-icon-jifen" v-show="msg.type==2"></span>
                <span class="u-icon-icon_yewu" v-show="msg.type==1"></span>
                <span class="u-icon-liuliang" v-show="msg.type==9"></span>
                <span class="u-icon-zhuce" v-show="msg.type==6"></span>
                <span class="u-icon-jihuo" v-show="msg.type==7"></span>
                <span class="u-icon-huafei" v-show="msg.type==8"></span> 
                <span class="u-icon-bulu" v-show="msg.type==10"></span> 
                <span class="u-icon-guohu" v-show="msg.type==12"></span> 
                <span class="u-icon-buhuanka" v-show="msg.type==11"></span> 
                <span class="u-icon-chengka" v-show="msg.type==13"></span> 
              </div>
              <div class="msg-content">
                <time>{{ getDateTime(msg.createTime)[5] }}</time>
                <div class="content">{{ msg.message }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--第一屏-->
      <div class="map-box-out make_transist" v-bind:class="{'showscale' : isA, 'hidescale': !isA}">
        <div class="map-box">
          <!--总开卡成功数-->
          <div class="map-box-inner">
            <div id="amount" class="render"></div>
            <div class="inner-total">
              <span>总数：</span>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="amountCard[0]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback" />
            </div>
          </div>

          <div class="statistics">
            <div class="col">
              <div>远特普号<span class="media-540">（可售）</span></div>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="phoneTotal[0]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback"/>
              <div>远特靓号<span class="media-540">（可售）</span></div>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="phoneTotal[1]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback"/>
            </div>
            <div class="col">
              <div>联通普号<span class="media-540">（可售）</span></div>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="phoneTotal[2]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback"/>
              <div>联通靓号<span class="media-540">（可售）</span></div>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="phoneTotal[3]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback"/>
            </div>
          </div>
        </div>
        <!--签约/激活商户-->
        <div class="map-box">
          <div class="map-box-inner">
            <div id="merchant" class="render"></div>
            <div class="inner-total">
              <span>签约总数：</span>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="merchantTotal[0]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback" />
              <span>激活总数：</span>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="merchantTotal[1]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback" />
            </div>
          </div>
          <div class="statistics">
            <div class="col">
              <div>游客</div>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="userTotal[0]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback"/>
              <div>远特商户/工号数</div>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="userTotal[1]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback"/>
              <em>/</em>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="userTotal[4]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback"/>
            </div>
            <div class="col">
              <div>联通商户/工号数</div>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="userTotal[2]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback"/>
              <em>/</em>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="userTotal[5]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback"/>
              <div>设备数</div>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="userTotal[3]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback"/>
            </div>
          </div>
        </div>
      </div>
      <!--第二屏-->
      <div class="map-box-out make_transist" v-bind:class="{'showscale' : !isA, 'hidescale': isA}">
        <div class="map-box">
          <!--开卡统计-->
          <div class="map-box-inner">
            <div id="cardCreate" class="render"></div>
            <div class="inner-total second-total">
              <span>历史总数：</span>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="secondViewTotal[0]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback" />
              <span>成功：</span>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="secondViewTotal[1]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback" />
            </div>
            <div class="m-create-legend">
              <div class="item" :class="{active:off.cardCreate_index == 0}" @click="cardCreateTimeShift(0)">
                <span class="sty">
                  <span class="circle"></span>
                  <span class="line"></span>
                </span>
                <span class="text">时</span>
              </div>
              <div class="item" :class="{active:off.cardCreate_index == 1}" @click="cardCreateTimeShift(1)">
                <span class="sty">
                  <span class="circle"></span>
                  <span class="line"></span>
                </span>
                <span class="text">天</span>
              </div>
              <div class="item" :class="{active:off.cardCreate_index == 2}" @click="cardCreateTimeShift(2)">
                <span class="sty">
                  <span class="circle"></span>
                  <span class="line"></span>
                </span>
                <span class="text">月</span>
              </div>
            </div>
          </div>
          
          <!--制卡成功数-->
          <div class="map-box-inner">
            <div id="makeCardSuccess" class="render"></div>
            <div class="inner-total second-total">
              <span>历史总数：</span>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="secondViewTotal[4]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback" />
            </div>
          </div>
        </div>
        <div class="map-box">
          <!--在线用户-->
          <div class="map-box-inner">
            <div id="onlineUser" class="render"></div>
            <div class="inner-total second-total">
              <span>历史总数：</span>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="secondViewTotal[2]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback" />
            </div>
          </div>
          <!--充值金额-->
          <div class="map-box-inner">
            <div id="rechargeMoney" class="render"></div>
            <div class="inner-total second-total">
              <span>历史总数：</span>
              <CountUp class="f-fst-gotham"
                :start="0"
                :endVal="secondViewTotal[3]"
                :decimals="0"
                :duration="3"
                :options="countOptions"
                :callback="callback" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <span  v-on:click="toogle" class="switch u-icon-shiftEchart"></span>
  </section>
</template>
<script type="text/javascript">
import {reqCommonMethod} from "../config/service.js";
import { getDateTime,getUnixTime ,errorDeal,getStore} from "../config/utils.js";
import CountUp from 'vue-countup-v2';
  export default {
    name: "dashboard",
    data() {
      return {
        isA: true,
        countOptions:{//countUp options
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        },
        notice:[],//公共数据列表
        noticeUlHeight:'',//公共栏高
        noticelatestMaxid:0,//最近获取消息的时间
        TimerNotice:[],//消息定时器
        TimerLine:[],
        off:{
          cardMake_index:0,//开卡尝试legend selected index
          onlineUser_index:0,//在线用户legend selected index
          recharge_index:0,//充值legend selected index
          cardCreate_index:0,//开卡统计：时、天、月切换index
        },
        phoneTotal:[0,0,0,0],//0,远特普号;1,远特靓号;2,联通普号;3,联通靓号;
        userTotal:[0,0,0,0,0,0],//0,游客;1,远特商户数;2,联通商户数;3,设备数;4,远特工号数;5,联通工号数;
        secondViewTotal:[0,0,0,0,0],//0,开卡尝试;1,在线商户;2,在线用户;3,充值金额;4,制卡成功数
        merchantTotal:[0,0],//0,签约商户总数;1,激活商户总数;
        amountCard:[0],//总开卡成功数
        cardCreateData:{//开卡统计数据
          success:{},
          created:{},
        }
      };
    },
    components: {
      CountUp
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
      this.intervalGetLine();
    },
    mounted() {
      let userInfo=getStore("KA_ECS_USER");
      
      if(userInfo.isadmin.length<=0){
         return false;
      }
      //   ajax请求获取数据统计
      var vm=this;
      
      vm.getnotice();

      setTimeout(function(){//第一屏
        vm.getamount();
        vm.getcreatecardAmount();
        vm.getmerchant();
      },500);
      

      setTimeout(function(){//第二屏
        vm.getcardCreate();
        vm.getonlineUser();
        vm.getrechargeMoney();
        vm.getmakeCardSuccess();
      },2500);
      

      vm.noticeMouseEvent(true);
      vm.intervalGetLine(true);
    },
    methods: {
      callback: function(ins) {
        // ins.update(ins.endVal + 100);
      },
      intervalGetLine(off){//5分钟轮循获取折线图数据
        const vm=this;
        if(off){ 
          let timer=setInterval(function(){
              vm.getamount();
              vm.getcreatecardAmount();
              vm.getmerchant();
              
              vm.getcardCreate();
              vm.getonlineUser();
              vm.getrechargeMoney();
              vm.getmakeCardSuccess();
          },1000*60*5);
          vm.TimerLine.push(timer)
        }else{
          for(let i=0;i<vm.TimerLine.length;i++){
            clearInterval(vm.TimerLine[i]);
          }
        }
      },
      toogle:function(){//切屏
        this.isA = !this.isA;
      },
      noticeMouseEvent(off,type){//轮循获取公共数据数据
        const vm=this;
        if(off){ 
          let timer=setInterval(function(){
              vm.getnotice();
          },2000);
          vm.TimerNotice.push(timer)
        }else{
          for(let i=0;i<vm.TimerNotice.length;i++){
            clearInterval(vm.TimerNotice[i]);
            clearTimeout(vm.TimerNotice[i]);
          }

          if(type == 'wheel'){//滚轮滚动后10秒没有动
            let timer=setTimeout(()=>{
              vm.noticeMouseEvent(true);
            },10*1000);
            vm.TimerNotice.push(timer);
          }
        }
      },
      getLatelyTime(now,type,num){//获取最近7天、12个小时、6个月
        let dateArr=[];
        for(let i=(num-1);i>=0;i--){
          if(type=='hour'){
            if(i!=11){
              let sm=getDateTime(now-1000*60*60*i)[7];
              dateArr.push(sm.split(":")[0]+":00");
              if(i==0){
                dateArr.push(getDateTime(now-1000*60*60*i)[7]);
              }
            }
            
          };
          if(type=='day')dateArr.push(getDateTime(now-1000*60*60*24*i)[4]);
        }

        if(type=='month'){
          let year=getDateTime(now)[0],month=getDateTime(now)[1];
          for(let i=0;i<num;i++){
            let mm=month-i,yy=year;
            mm<=0&&(mm=12-Math.abs(mm),yy=year-1);
            mm<10&&(mm='0'+mm);
            dateArr[i]=mm;
          }
          dateArr=dateArr.reverse();
        }

        return dateArr
      },
      getnotice(){//获取公告
        var vm=this;
        reqCommonMethod({"maxId":vm.noticelatestMaxid},function(){vm.off.isLoad=false;},"km-ecs/w/statistics/realtimenotice")
        .then((data)=>{
          if(data.code==200){
            data.data.list.reverse();
            for(let i=0;i<data.data.list.length;i++){
              vm.notice.push(data.data.list[i]);
            }
            setTimeout(function(){
              vm.noticeScroll();
            },30)
            
            if(data.data.list[0]){
              vm.noticelatestMaxid=data.data.list[0].maxId;
            }
          }
        }).catch(error=>errorDeal(error));  
      },
      noticeScroll(){//消息滚动执行
        var vm=this,noticeBox=document.getElementById("notice-box");
        if(noticeBox)noticeBox.scrollTop=noticeBox.scrollHeight;
        if(vm.notice.length>100){
          vm.notice=[];
        }
      },
      getamount(){//获取第一屏右边总数
        var vm=this;
         reqCommonMethod({"type":1},function(){vm.off.isLoad=false;},"km-ecs/w/statistics/homepagedrawline")
         .then((data)=>{
            if(data.code==200){
                vm.phoneTotal = [
                data.data.YT_sellbleGeneralNum,
                data.data.YT_sellblePrettyNum,
                data.data.LT_sellbleGeneralNum,
                data.data.LT_sellblePrettyNum
                ];
                vm.userTotal = [
                data.data.visitor,
                data.data.YT_merch,
                data.data.LT_merch,
                data.data.device,
                data.data.YT_userNum,
                data.data.LT_userNum
                ];
            }
         }).catch(error=>errorDeal(error));     
      },
      getcreatecardAmount(){//总开卡成功数
        var vm=this;
         reqCommonMethod({"type":2},function(){vm.off.isLoad=false;},"km-ecs/w/statistics/homepagedrawline")
        .then((data)=>{
            vm.initMap({
                id: "amount",
                name: "总开卡成功数",
                index:0,
                legend: ["天"],
                category: [vm.getLatelyTime(data.data.lasttime,'day',7)],
                lineData: [data.data.day]
            });
            vm.amountCard[0]=data.data.day[6];
        }).catch(error=>errorDeal(error));
      },
      getmerchant(){//获取签约商户数和激活商户
        var vm=this;
         reqCommonMethod({"type":3},function(){vm.off.isLoad=false;},"km-ecs/w/statistics/homepagedrawline")
          .then((data)=>{
               vm.initMap({
                    id: "merchant",
                    name: "",
                    index:0,
                    legend: ["签约商户","激活商户"],
                    category: [vm.getLatelyTime(data.data.lasttime,'day',7),vm.getLatelyTime(data.data.lasttime,'day',7)],
                    lineData: [data.data.signMerch,data.data.activeMerch]
                });
                vm.merchantTotal=[data.data.totalSign,data.data.totalActive]
          }).catch(error=>errorDeal(error));     
      },
      getcardCreate(){//开卡尝试数
        var vm=this;
         reqCommonMethod({"type":5},function(){vm.off.isLoad=false;},"km-ecs/w/statistics/homepagedrawline")
          .then((createData)=>{
            vm.secondViewTotal[0] = parseInt(createData.data.total);
            vm.cardCreateData.created = createData.data;


            reqCommonMethod({"type":4},function(){vm.off.isLoad=false;},"km-ecs/w/statistics/homepagedrawline")
            .then((successData)=>{
              vm.secondViewTotal[1] = parseInt(successData.data.total);
              vm.cardCreateData.success = successData.data;

              vm.cardCreateTimeShift(0);
          }).catch(error=>errorDeal(error));

        }).catch(error=>errorDeal(error));    
      },
      getonlineUser(){//用户在线数
        var vm=this;
         reqCommonMethod({"type":6},function(){vm.off.isLoad=false;},"km-ecs/w/statistics/homepagedrawline")
          .then((data)=>{
              vm.secondViewTotal[2] = parseInt(data.data.total);
              vm.initMap({
                id: "onlineUser",
                name: "在线用户",
                legend: ["时","天"],
                index:vm.off.onlineUser_index,
                category: [vm.getLatelyTime(data.data.lasttime[0],'hour',12),vm.getLatelyTime(data.data.lasttime[1],'day',7)],
                lineData: [data.data.hour,data.data.day]
              });
          }).catch(error=>errorDeal(error));      
      },
      getrechargeMoney(){//充值金额
        var vm=this;
         reqCommonMethod({"type":7},function(){vm.off.isLoad=false;},"km-ecs/w/statistics/homepagedrawline")
          .then((data)=>{
              vm.secondViewTotal[3] = parseInt(data.data.total);
              vm.initMap({
                id: "rechargeMoney",
                name: "充值金额",
                index:vm.off.recharge_index,
                legend: ["时", "天", "月"],
                category: [vm.getLatelyTime(data.data.lasttime[0],'hour',12),vm.getLatelyTime(data.data.lasttime[1],'day',7),vm.getLatelyTime(data.data.lasttime[2],'month',6)],
                lineData: [data.data.hour,data.data.day,data.data.month]
              });
          }).catch(error=>errorDeal(error));
      },
      getmakeCardSuccess(){//获取制卡统计
        var vm=this;
         reqCommonMethod({"type":8},function(){vm.off.isLoad=false;},"km-ecs/w/statistics/homepagedrawline")
          .then((data)=>{
              vm.secondViewTotal[4] = parseInt(data.data.total);
              vm.initMap({
                id: "makeCardSuccess",
                name: "制卡成功数",
                index:vm.off.cardMake_index,
                legend: ["时", "天", "月"],
                category: [vm.getLatelyTime(data.data.lasttime[0],'hour',12),vm.getLatelyTime(data.data.lasttime[1],'day',7),vm.getLatelyTime(data.data.lasttime[2],'month',6)],
                lineData: [data.data.hour,data.data.day,data.data.month]
              });
          }).catch(error=>errorDeal(error));
      },
      initMap(params) {
        var vm = this,series = [],min=[],myChart = '';
        if(document.getElementById(params.id)==null){
          return false;
        }else{
          myChart = echarts.init(document.getElementById(params.id));
          myChart.showLoading();
        for (let i = 0; i < params.legend.length; i++) {
          let option={
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
                  { offset: 0, color: "#7E57C2" },
                  { offset: 1, color: "#4b3887" }
                ])
              }
            },
            // areaStyle: {normal: {}},
          }
          if(params.id=="merchant" || params.id=="cardCreate"){
            if(i==1)option.itemStyle.normal.color="#3DD79B";
            option.yAxisIndex=i;
          }
          min[i]=Math.min.apply(null,params.lineData[i]);
          series.push(option);
        }


        for(let j=0;j<min.length;j++){//最小值取整
          min[j] = vm.mathNearInteger(min[j]);
        }
        // option
        var option = {
          title: {
            show: true,
            text: params.name,
            textStyle: {
              color: "#555",
              fontSize:"15",
            },
            left:20
          },
          grid:{
            y:50,
          },
          tooltip: {
            show:true,
            trigger: "axis",
            axisPointer: {
              type: "line",
              label: {
                show: true,
                backgroundColor: "#333"
              }
            },
            formatter:params.id=="merchant" || params.id=="cardCreate" ? '{a0}: {c0}<br />{a1}: {c1}' : '{c}'
          },
          legend: {
            data: params.legend,
            selectedMode: params.id=="merchant" || params.id=="cardCreate" ? "multiple" : "single",
            textStyle: {
              color: "#555"
            },
            left:120,
            top:3
          },
          xAxis: {
            type : 'category',
            boundaryGap : false,
            data: params.category[params.index],
            axisLine: {
              lineStyle: {
                color: "#555"
              }
            },
            splitLine:{
              show:false
            },
          },
          yAxis: [{
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#555"
              }
            },
          }],
          series: series
        };
        option.yAxis[0].min=min[params.index];

        

        if(params.id=="merchant"){
          option.yAxis[0].name=params.legend[0];
          option.yAxis.push({
            name:params.legend[1],
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#3DD79B"
              }
            },
            min:min[1]
          });
        }else if(params.id == "cardCreate"){
          option.legend.show = false;
          let _min = Math.min.apply(null,params.lineData[1]),
              _max = Math.max.apply(null,params.lineData[0]);

          _min = vm.mathNearInteger(_min);

          option.yAxis[0].min=_min;
          option.yAxis[0].max=_max;
          option.yAxis.push({
            show:false,
            name:params.legend[1],
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#3DD79B"
              }
            },
            min:_min,
            max:_max
          });
        }
        

        myChart.on("legendselectchanged", function(legend) {//legend click
          let index = 0,
              len = Object.keys(legend.selected).length;

          if (legend.name == "时") {
            index = 0;
          } else if (legend.name == "天") {
            if(len == 1){
              index =0 ;
            }else index = 1;
          } else if (legend.name == "月") {
            index = len - 1;
          }

          if(params.id=="onlineUser"){
            vm.off.onlineUser_index=index
          }else if(params.id=="rechargeMoney"){
            vm.off.recharge_index=index
          }else if(params.id=="makeCardSuccess"){
            vm.off.cardMake_index=index
          }
          option.xAxis.data = params.category[index];

          if(params.id!="merchant" && params.id!="cardCreate"){
            option.yAxis[0].min=min[index];
          }

          myChart.setOption(option);
        });

        myChart.setOption(option);
        myChart.hideLoading();

        }
      },
      cardCreateTimeShift(index){//开卡统计，时、天、月切换。（PS：因未能实现legend切换双折线的方法，故采用手动渲染）
        const vm = this;

        let cardCreateData = vm.cardCreateData,
            lineData = [];

        if(index == 0){
          lineData = [cardCreateData.created.hour,cardCreateData.success.hour];
        }else if(index == 1){
          lineData = [cardCreateData.created.day,cardCreateData.success.day];
        }else if(index == 2){
          lineData = [cardCreateData.created.month,cardCreateData.success.month];
        }

        vm.off.cardCreate_index = index;
        vm.initMap({
            id: "cardCreate",
            name: "开卡",
            legend: ["开卡尝试", "开卡成功"],
            index:index,
            category: [vm.getLatelyTime(cardCreateData.created.lasttime[0],'hour',12),vm.getLatelyTime(cardCreateData.created.lasttime[1],'day',7),vm.getLatelyTime(cardCreateData.created.lasttime[2],'month',6)],
            lineData: lineData,
        });
      },
      mathNearInteger(num){//计算临近最小整数
        let near;

        if(num > 9){
          let len = num.toString().length,power;

          if(len >= 4){
            power=Math.pow(10,(len-2));
          }else{
            power=Math.pow(10,(len-1));
          }

          near=parseInt(num/power)*power;
        }else near = 0;

        return near;
      },
      getDateTime(v){
        return getDateTime(v);
      },
    }
  };
</script>


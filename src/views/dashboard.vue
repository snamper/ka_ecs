<style scoped>
  @import "../assets/css/dashboard.css";
</style>
<template>
  <section class="dashboard-box">
    <div class="map-box-out make_transist class1" v-bind:class="{'showscale' : !isA, 'hidescale': isA}">
      <div class="notice" style="flex:0.4;">
        <div class="noticediv f-scroll-lt">
          <p>实时公告</p>
          <ul class="noticeul" v-for="v in notice">
            <li>{{v}}</li>
          </ul>
        </div>
      </div>
      <div style="flex: 1.6;rgb(14, 42, 67)">
        <div class="map-box">
          <div class="map-box-inner" id="cardCreate">总数</div>
          <div class="map-box-inner" id="cardSuccess"></div>
        </div>
        <div class="map-box">
          <div class="map-box-inner" id="onlineUser"></div>
          <div class="map-box-inner" id="rechargeMoney"></div>
        </div>
      </div>
    </div>

    <!-- 新增折线图 -->
    <div class="map-box-out1 make_transist"  v-bind:class="{'showscale' : isA, 'hidescale': !isA}">
      <div class="notice" style="flex:0.4;">
        <div class="noticediv f-scroll-lt">
          <p>实时公告</p>
          <ul class="noticeul" v-for="v in notice">
            <li>{{v}}</li>
          </ul>
        </div>
      </div>
      <div style="flex:1.2;background: rgb(14, 42, 67);">
        <div class="map-box">
          <div class="map-box-inner" id="amount"></div>
        </div>
        <div class="map-box">
          <div class="map-box-inner" id="merchant"></div>
        </div>
      </div>
      <div class="statistics" style="flex:0.4">
        <h3>远特普号: <span>{{saleabil[0]}}</span> </h3>
        <h3>远特靓号: <span>{{saleabil[1]}}</span> </h3>
        <h3>联通普号: <span>{{saleabil[2]}}</span> </h3>
        <h3>联通靓号: <span>{{saleabil[3]}}</span> </h3>
        <div style="margin-top:200px;"></div>
        <h3>游客: <span>{{userNub[0]}}</span> </h3>
        <h3>远特商户数: <span>{{userNub[1]}}</span> </h3>
        <h3>联通商户数: <span>{{userNub[2]}}</span> </h3>
        <h3>设备数: <span>{{userNub[3]}}</span> </h3>
      </div>
    </div>
    <span  v-on:click="toogle" class="switch">></span>
  </section>
</template>
<script type="text/javascript">
  import echarts from "echarts";
  export default {
    name: "dashboard",
    data() {
      return {
        isA: true,
        //category:[],
        //lineData:[],
        notice:[],
        saleabil:[],
        userNub:[],
        Timer:0,
        off:{
          cardTry_index:0,
          onlineUser_index:0,
          recharge_index:0
        }
      };
    },
    created:function(){

    },
    beforeDestroy:function(){
      this.Timer;
    },
    mounted() {
      //   ajax请求获取数据统计
      var vm=this;
      var _data={};
      function getamount (){
        _data.type='1';
        vm.AJAX('w/statistics/homepagedrawline',_data,function(data){
          if(data.code==200){
            vm.saleabil = data.data.saleabil;
            vm.userNub = data.data.userNub;
          }
        },true);
      }
      getamount();

//   获取折线图数据开卡成功数
      function getcreatecardAmount(){
        _data.type='2';
        vm.AJAX('w/statistics/homepagedrawline',_data,function(data){
          var lineData=[data.data.day];
          //var subtext = '开卡成功总数：'+[data.data.total]+'(次)';
          let category=[[],[],[]];
          let date=parseInt(data.data.lasttime-1000*60*60*24);
          for(var i=7;i--;i>1){
            let _date=date-1000*60*60*24*i;
            let _dateDay = new Date(_date);
            let _day = _dateDay.getDate();
            category[0].push(_day);
          }
          if(data.code==200){
            vm.initMap({
              id: "amount",
              name: "开卡成功总数",
              //subtext:subtext,
              index:0,
              legend: ["天"],
              category:[category[0]],
              lineData: [lineData[0]]
            });
          }
        },true);
      }
      getcreatecardAmount();
//      获取签约商户数
      function getmerchant (){
        _data.type='3';
        vm.AJAX('w/statistics/homepagedrawline',_data,function(data){
          var lineData=[data.data.day];
          //var subtext = '商户总数：'+[data.data.total]+'(家)';
          let category=[[],[],[]];
          let date=parseInt(data.data.lasttime-1000*60*60*24);
          for(var i=7;i--;i>1){
            let _date=date-1000*60*60*24*i;
            let _dateDay = new Date(_date);
            let _day = _dateDay.getDate();
            category[0].push(_day);
          }
          if(data.code==200){
            vm.initMap({
              id: "merchant",
              name: "商户总数",
              //subtext:subtext,
              index:0,
              legend: ["天"],
              category: [category[0]],
              lineData: [lineData[0]]
            });
          }
        },true);
      }
      getmerchant();
      //      开卡尝试数
      function getcardCreate(){
        _data.type='5';
        vm.AJAX('w/statistics/homepagedrawline',_data,function(data){
          var lineData=[data.data.hour,data.data.day,data.data.month];
          var subtext = '开卡尝试总数：'+[data.data.total]+'(次)';
          let category=[[],[],[]];
          let date=parseInt(data.data.lasttime[0]-1000*60*60*24);
          for(var i=7;i--;i>1){
            let _date=date-1000*60*60*24*i;
            let _dateDay = new Date(_date);
            let _day = _dateDay.getDate();
            category[1].push(_day);
          }
          for(var i=12;i--;i>1){
            let _date=date-1000*60*60*i;
            let _dateDay = new Date(_date);
            let _hour = _dateDay.getHours();
            category[0].push(_hour);
          }
          for(var i=5;i--;i>1){
            let _date=date-1000*60*60*24*30*i;
            let _dateDay = new Date(_date);
            let _month = _dateDay.getMonth();
            category[2].push(_month);
          }
          if(data.code==200){
            vm.initMap({
              id: "cardCreate",
              name: "开卡尝试",
              subtext:subtext,
              legend: ["时", "天", "月"],
              category: category,
              lineData: lineData,
              index:vm.off.cardTry_index
            });
          }
        },true);
      }
      getcardCreate();

      //      用户在线数
      function getonlineUser(){
        _data.type='6';
        vm.AJAX('w/statistics/homepagedrawline',_data,function(data){
          var lineData=[data.data.hour,data.data.day,[]];
          var subtext = '用户在线总数：'+[data.data.total]+'（人）';
          let category=[[],[],[]];
          let date=parseInt(data.data.lasttime[0]-1000*60*60*24);
          for(var i=7;i--;i>1){
            let _date=date-1000*60*60*24*i;
            let _dateDay = new Date(_date);
            let _day = _dateDay.getDate();
            category[1].push(_day);
          }
          for(var i=12;i--;i>1){
            let _date=date-1000*60*60*i;
            let _dateDay = new Date(_date);
            let _hour = _dateDay.getHours();
            category[0].push(_hour);
          }
          if(data.code==200){
            vm.initMap({
              id: "onlineUser",
              name: "当前在线用户",
              subtext:subtext,
              legend: ["时","天"],
              index:vm.off.onlineUser_index,
              category: [category[0],category[1]],
              lineData: [lineData[0],lineData[1]]
            });
          }
        },true);
      }
      getonlineUser();
      //      充值数
      function getrechargeMoney(){
        _data.type='7';
        vm.AJAX('w/statistics/homepagedrawline',_data,function(data){
          var lineData=[data.data.hour,data.data.day];
          var subtext = '充值总金额：'+[data.data.total]+'(元)';
          let category=[[],[],[]];
          let date=parseInt(data.data.lasttime[0]);
          let _date = new Date(date);
          let _hour = _date.getHours();
          let _day = _date.getDate();
          let s_day=_day-7;
          let s_hour=_hour-12;
          for(let i = s_day;i<_day;i++){
            category[1].push(i);
          }
          for(let i = s_hour;i<_hour;i++){
            category[0].push(i);
          }
          if(data.code==200){
            vm.initMap({
              id: "rechargeMoney",
              name: "充值金额",
              subtext:subtext,
              index:vm.off.recharge_index,
              legend: ["时", "天"],
              category: [category[0], category[1]],
              lineData: [lineData[0], lineData[1]]
            });
          }
        },true);
      }
      getrechargeMoney();
      //     活跃商户数
      function getcardSuccess(){
        _data.type='4';
        vm.AJAX('w/statistics/homepagedrawline',_data,function(data){
          var lineData=[data.data.day];
          var subtext = '活跃商户总数：'+[data.data.total]+'(次)';
          let category=[[],[],[]];
          let date=parseInt(data.data.lasttime[0]-1000*60*60*24);
          for(var i=7;i--;i>1){
            let _date=date-1000*60*60*24*i;
            let _dateDay = new Date(_date);
            let _day = _dateDay.getDate();
            category[0].push(_day);
          }
          if(data.code==200){
            vm.initMap({
              id: "cardSuccess",
              name: "活跃商户",
              subtext:subtext,
              legend: ["天"],
              index:0,
              category: category,
              lineData: lineData,
            });
          }
        },true);
      }
      getcardSuccess();

//      获取公告
      function getnotice(){
        vm.AJAX('w/statistics/realtimenotice',_data,function(data){
          //vm.notice=[];
          if(data.code==200){
            for(const v in data.data.list){
             vm.notice.push(data.data.list[v].message);
            }
          }
        },true)
      }
     getnotice();
      this.Timer=setInterval(
        function(){
          getamount();
          getcreatecardAmount();
          getmerchant();
          getcardCreate();
          getonlineUser();
          getrechargeMoney();
          getcardSuccess();
          getnotice();
        },5000);
    },
    methods: {
      toogle:function(){
        this.isA = !this.isA;
      },
      initMap(params) {
        var vm = this;
        var myChart = echarts.init(document.getElementById(params.id));
        var series = [];
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
          backgroundColor: "#0E2A43",
          title: {
            show: true,
            subtext:params.subtext,
            text: params.name,
            textStyle: {
              color: "#fff",
              x:'center'
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                backgroundColor: "#333"
              }
            }
          },
          legend: {
            data: params.legend,
            selectedMode: "single",
            textStyle: {
              color: "#ccc"
            }
          },
          xAxis: {
            data: params.category[params.index],
            axisLabel: {
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            }
          },
          yAxis: {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            }
          },
          series: series
        };
        myChart.on("legendselectchanged", function(legend) {
          //legend click
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
      }
    }
  };
</script>


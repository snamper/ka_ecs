<style scoped>
@import "../assets/css/dashboard.css";
.dashboard-box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.map-box-out {
  width: 100%;
  height: 100%;
  top:0;
  left:0;
}
.map-box-out1{
  display: flex;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
}
.map-box {
  display: flex;
  width: 100%;
  height: 50%;
}
.map-box-inner {
  flex: 1;
}
.map-box-inner1 {
  width: 100%;
  height: 50%;
}
.switch{
  display: inline-block;
  width: 30px;
  height: 70px;
  position: absolute;
  right: 10px;
  top: 40%;
  background: #374858;
  border-radius: 5px;
  font-size: 40px;
  padding-top: 5px;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.class1{
  position: absolute;
}
/*售卡情况统计结果*/
.statistics{
  padding-top:100px;
  background: rgb(14, 42, 67);
  color: #cad7d6;
}
.statistics p{
  font-size:24px;
}
.statistics h3{
  margin-top:20px;
  width:88px;
  text-align: justify;
}
.statistics h3 > span { display: inline-block /* Opera */; padding-left: 100%;  position: relative;  top:-20px;  left:5px;}
/*公告区域*/
.notice{
  color: #cad7d6;;
  background: rgb(14, 42, 67);
  text-align: center;
}
.notice p{
  font-size:26px;
}
/* 切换效果 */
.hidescale {
    -webkit-transform: translateX(-100%);
    -moz-transform:  translateX(-100%);
    -o-transform:  translateX(-100%);
    -ms-transform:  translateX(-100%);
    transform:  translateX(-100%);
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    filter: alpha(opacity=0);
    opacity: 0;
}

.showscale {
    -webkit-transform:  translateX(0);
    -moz-transform: translateX(0);
    -o-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
    opacity: 1;

    -webkit-transition-delay: .3s;
    -moz-transition-delay: .3s;
    -o-transition-delay: .3s;
    -ms-transition-delay: .3s;
    transition-delay: .3s;
}

.make_transist {
    -webkit-transition: all .5s ease-in-out;
    -moz-transition: all .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    -ms-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
}
</style>
<template>
  <section class="dashboard-box">
    <div class="map-box-out make_transist class1" v-bind:class="{'showscale' : !isA, 'hidescale': isA}">
      <div class="map-box">
        <div class="map-box-inner" id="cardCreate"></div>
        <div class="map-box-inner" id="cardSuccess"></div>
      </div>
      <div class="map-box">
        <div class="map-box-inner" id="onlineUser"></div>
        <div class="map-box-inner" id="rechargeMoney"></div>
      </div>
    </div>

    <!-- 新增折线图 -->
    <div class="map-box-out1 make_transist"  v-bind:class="{'showscale' : isA, 'hidescale': !isA}">
        <div class="notice" style="flex:0.4;">
          <p>实时公告</p>
        </div>
        <div style="flex:1.2">
          <div class="map-box">
            <div class="map-box-inner" id="amount"></div>
          </div>
          <div class="map-box">
            <div class="map-box-inner" id="merchant"></div>
          </div>
        </div>
        <div class="statistics" style="flex:0.4">
          <p>详情统计</p>
          <h3>远特普号: <span>{{saleabil[0]}}</span> </h3>
          <h3>远特靓号: <span>{{saleabil[1]}}</span> </h3>
          <h3>联通普号: <span>{{saleabil[2]}}</span> </h3>
          <h3>联通靓号: <span>{{saleabil[3]}}</span> </h3>
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
        category:[],
        lineData:[],
        saleabil:[],
        userNub:[]
  };
  },
  created:function(){

  },
  mounted() {
    // ajax请求获取数据统计
      var vm=this;
      var _data={};
      _data.type='1';
      vm.AJAX('w/statistics/homepagedrawline',_data,function(data){
        if(data.code==200){
          vm.saleabil = data.data.saleabil;
          vm.userNub = data.data.userNub;
        }
      });
//   获取折线图数据
    var _data={};
    _data.type='2';
    vm.AJAX('w/statistics/homepagedrawline',_data,function(data){
      if(data.code==200){
       vm.lineData=data.data.list
      }
    });
    // Generate data
    var category = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      [
        "2017-11-29",
        "2017-11-30",
        "2017-12-1",
        "2017-12-2",
        "2017-12-3",
        "2017-12-4",
        "2017-12-4"
      ],
      ["2017-07", "2017-08", "2017-09", "2017-10", "2017-11", "2017-12"]
    ];
    var lineData = [
      [12.154, 3.6, 2, 25.36, 12.154, 5.4, 12, 60, 50, 42, 34, 1.154],
      [20, 900, 372, 245, 134, 777, 555],
      [870, 4548, 6688, 1201, 2000, 4000]
    ];

    this.initMap({
      id: "cardCreate",
      name: "开卡尝试",
      legend: ["时", "天", "月"],
      category: category,
      lineData: lineData
    });
    this.initMap({
      id: "cardSuccess",
      name: "开卡成功",
      legend: ["时", "天", "月"],
      category: category,
      lineData: lineData
    });
    this.initMap({
      id: "onlineUser",
      name: "当前在线用户",
      legend: ["时"],
      category: [category[0]],
      lineData: [lineData[0]]
    });
    this.initMap({
      id: "rechargeMoney",
      name: "充值金额",
      legend: ["天", "月"],
      category: [category[1], category[2]],
      lineData: [lineData[1], lineData[2]]
    });
    this.initMap({
      id: "amount",
      name: "开卡成功总数",
      legend: ["天", "月"],
      category: [category[1], category[2]],
      lineData: [lineData[1], lineData[2]]
    });
    this.initMap({
      id: "merchant",
      name: "商户数",
      legend: ["天", "月"],
      category: [category[1], category[2]],
      lineData: [lineData[1], lineData[2]]
    });
  },
  methods: {
    toogle:function(){
      this.isA = !this.isA;
},
    initMap(params) {
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
          text: params.name,
          textStyle: {
            color: "#fff"
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
          data: params.category[0],
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
        console.log(legend);
        if (legend.name == "时") {
          index = 0;
        } else if (legend.name == "天") {
          if (len == 3) {
            index = 1;
          } else {
            index = 0;
          }
        } else if (legend.name == "月") {
          index = len - 1;
        }
        option.xAxis.data = params.category[index];
        myChart.setOption(option);
      });
      myChart.setOption(option);
    }
  }
};
</script>


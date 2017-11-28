<style scoped>
  @import "../assets/css/dashboard.css";
  .dashboard-box{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .map-box{
    display: flex;
    width: 100%;
    height: 50%;
  }
  .map-box-inner{
    flex: 1;
  }
</style>
<template>
  <section class="dashboard-box">
    <div class="map-box">
      <div class="map-box-inner" id="cardCreate"></div>
      <div class="map-box-inner" id="cardSuccess"></div>
    </div>
    <div class="map-box">
      <div class="map-box-inner" id="onlineUser"></div>
      <div class="map-box-inner" id="rechargeMoney"></div>
    </div>
  </section>
</template>
<script type="text/javascript">
import echarts from "echarts";
export default {
  name:"dashboard",
  data () {
    return {

    }
  },
  mounted(){
    // Generate data
    var category = [
      [1,2,3,4,5,6,7,8,9,10,11,12],
      ["2017-11-29", "2017-11-30", "2017-12-1", "2017-12-2", "2017-12-3", "2017-12-4", "2017-12-4"],
      ["2017-07", "2017-08", "2017-09", "2017-10", "2017-11", "2017-12"],
    ];
    var lineData = [
      [12.154,3.6,2,25.36,12.154,5.4,12,60,50,42,34,1.154],
      [20,900,372,245,134,777,555],
      [870,4548,6688,1201,2000,4000]
    ];
  
    this.initMap({
      id:"cardCreate",
      name:"开卡尝试",
      legend:['时','天','月'],
      category:category,
      lineData:lineData
    });
    this.initMap({
      id:"cardSuccess",
      name:"开卡成功",
      legend:['时','天','月'],
      category:category,
      lineData:lineData
    });
    this.initMap({
      id:"onlineUser",
      name:"当前在线用户",
      legend:['时'],
      category:[category[0]],
      lineData:[lineData[0]]
    });
    this.initMap({
      id:"rechargeMoney",
      name:"充值金额",
      legend:['天','月'],
      category:[category[1],category[2]],
      lineData:[lineData[1],lineData[2]]
    });
  },
  methods:{
    initMap(params){
      var myChart = echarts.init(document.getElementById(params.id));
      var series=[];
      for(let i=0;i<params.legend.length;i++){
        series.push({
              name: params.legend[i],
              type: 'line',
              smooth: true,
              showAllSymbol: false,
              symbol: "emptyCircle",
              symbolSize: 5,
              data: params.lineData[i],
              itemStyle: {
                  normal: {
                      width:5,
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#14c8d4'},
                              {offset: 1, color: '#43eec6'}
                          ]
                      )
                  }
              },
          })
      }
      // option
      var option={
          backgroundColor: '#0E2A43',
          title:{
            show:true,
            text:params.name,
            textStyle:{
              color:"#fff",
            }
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow',
                  label: {
                      show: true,
                      backgroundColor: '#333'
                  }
              }
          },
          legend: {
              data: params.legend,
              selectedMode:'single',
              textStyle: {
                  color: '#ccc'
              }
          },
          xAxis: {
              data: params.category[0],
              axisLabel:{
                interval:0 
              },
              axisLine: {
                  lineStyle: {
                      color: '#ccc'
                  }
              }
          },
          yAxis: {
              splitLine: {show: false},
              axisLine: {
                  lineStyle: {
                      color: '#ccc'
                  }
              }
          },
          series: series
      };
      myChart.on("legendselectchanged",function(legend){//legend click
        let index=0,len=Object.keys(legend.selected).length;
        console.log(legend)
        if(legend.name=="时"){
          index=0;
        }else if(legend.name=="天"){
          if(len==3){
            index=1;
          }else{
            index=0;
          }
        }else if(legend.name=="月"){
          index=len-1;
        }
        option.xAxis.data=params.category[index];
        myChart.setOption(option);
      })
      myChart.setOption(option);
    }
  }
}
</script>


<style scoped>
[v-cloak]{
    display: none;
}
.timeDiv {
  font-weight: bold;
  font-size: 16px;
  padding-left: 25px;
  margin-top: 10px;
  color: #3dd79b;
}
p.title {
  font-weight: bold;
  font-size: 16px;
  padding-left: 25px;
  margin-top: 10px;
  color: rgb(83, 79, 79);
}
ul {
  padding-left: 25px;
}
ul > li {
  padding: 8px;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 6px;
  background: rgb(238, 234, 234);
  display: inline-block;
}
ul > li > span > img {
  width: .6rem;
  height: .6rem;
}
label {
  display: block;
}
select {
  width: 1rem;
  height: 0.25rem;
}
.timeCheck {
  margin-left: 25px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}
.timeCheck select {
  font-size: 16px;
}
</style>
<template>
<div>
<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
<section class="m-occlusion" :class="{active:off.isLoad}"></section>
    <section >
    <div>
        <p v-cloak class="timeDiv">现在时间:{{time}}</p>
        <p class="title">审核数据日报下载列表</p>
        <p class="timeCheck">
      时间区间:
        <select name="year"  @change="selectChange('yy')" v-model="selectedy">
            <option v-cloak v-for="(v,index) in timeyear" :value="v">{{v}}</option>       
        </select>
        <select name="month" @change="selectChange('mm')" v-model="selectedm">
            <option v-cloak v-for="(v,index) in timemonth" :value="v">{{v}}</option>
        </select>
        </p>
        <ul > 
            <li v-for="(v,index) in downloadDate">
                <span><img src="../../assets/images/excel.svg" alt="icon"></span>
                <span> <label v-cloak for="">{{v}}</label> <label for=""> <a href="javascript:void(0)" @click="downLoadExcel(v)"> 下载报表</a></label></span>
            </li>
        </ul>
    </div>
    </section>
</div>
</template>
<script>
import { setStore, getStore, createDownload ,errorDeal } from "../../config/utils";
import {reqCommonMethod} from "../../config/service.js";
import pagination from "../ym/page.vue";
import details from "../ym/searchListDetails.vue";
import layerForm from "../ym/layerForm.vue";
import "../../assets/ym/css/search.css";
import axios from "axios";
export default {
    name:"Excel",
  data() {
    return {
      off:{
        isLoad:false,
      },
      selectedm: "",
      selectedy: "",
      form: {},
      time: "00:00",
      timeyear: [],
      timemonth: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      timeo: "",
      timen: "",
      downloadDate:"",
    };
  },
  created() {
    this.init();
    this.updateTime();
    // this.downloadList();
  },
  methods: {
    init: function() {
      let vm = this,
      nowTime = new Date();
      //vm.timeo = parseInt(Date.parse(nowTime));
      //vm.time = new Date(vm.timeo).toLocaleString().replace(/\//g, "-");
      let initYear=nowTime.getFullYear();//2018
      let initMonth=nowTime.getMonth()+1;//2
      vm.selectedy=initYear+"年";
      vm.selectedm=vm.timemonth[initMonth-1];
      if(initMonth<10){
        initMonth="0"+initMonth;
      }
      let initTime=""+initYear+initMonth;
      let data={date:initTime};
      reqCommonMethod(data,function(){vm.off.isLoad=false;},"ym-ecs/c/audit/dailyAudits")    
      .then((data)=>{
          if(data.code==200){
            let arr=[];
            data.data.dailyAudits.sort((a,b)=> parseInt(a.replace(/[^0-9]/ig,"")) > parseInt(b.replace(/[^0-9]/ig,"")) ? 1 : -1);
            vm.downloadDate=data.data.dailyAudits;
          }
          vm.off.isLoad=false;
      }).catch(error=>errorDeal(error)); 
      if (initYear >= 2018) {
        for (let i = 2018; i <= initYear; i++) {
          vm.timeyear.push(i + "年");
        }
      }
    },
    updateTime: function() {
      let vm = this,
        nowTime = new Date();
      vm.timeo = parseInt(Date.parse(nowTime));
      vm.timeUp = setInterval(function() {
        vm.timeo += 1000;
        vm.time = new Date(vm.timeo).toLocaleString().replace(/\//g, "-");
      }, 1000);
    },
    downLoadExcel: function(v) {
    let userInfo=getStore("KA_ECS_USER");
    var vm = this,url,json={'date':''};
        json.customerId=userInfo.customerId;
	    json.codeId=userInfo.codeId;
        url = "ym-ecs/c/audit/downloadDailyAudit";
        v=v.replace(/[^0-9]/ig,"");
        vm.off.load = true;
        json.date=v;
        createDownload(url, JSON.stringify(json), function() {
        vm.off.load = false;
      });
    },
    // downloadList: function(v) {
    //   let vm = this;
    //   for (let i = 30; i--; i > 0) {
    //     var dn = new Date(),
    //       dny = dn.getFullYear(),
    //       dnm = dn.getMonth() + 1,
    //       dnd = dn.getDate();
    //     if (dnm < 10) {
    //       dnm = "0" + dnm;
    //     }
    //     if (dnd < 10) {
    //       dnd = "0" + dnd;
    //     }
    //     var nowDay = dny + "-" + dnm + "-" + dnd;
    //     if (nowDay != laydate.now(-i, "YYYY-MM-DD")) {
    //       vm.downloadDate.push(laydate.now(-i, "YYYY-MM-DD"));
    //     }
    //   }
    // },
    to_laydate: function(v) {
      var vm = this,
        el = "";
      v == 1 ? (el = "#start") : (el = "#end");
      laydate({
        elem: el,
        istime: false,
        format: "YYYY-MM",
        isclear: false,
        choose: function(dates) {
          //选择好日期的回调
          v == 1 ? (vm.form.startTime = dates) : (vm.form.endTime = dates);
        }
      });
    },
    selectChange: function(a) {
      var vm = this;
      var y = vm.selectedy;
      var m = vm.selectedm;
      y = parseInt(y), 
      m = vm.timemonth.indexOf(m) + 1;
      if(m<10){
          m="0"+m;
      }
      let date=""+y+m;
      let data={date:date};

      reqCommonMethod(data,function(){vm.off.isLoad=false;},"ym-ecs/c/audit/dailyAudits")
      .then((data)=>{
          if(data.code==200){
            data.data.dailyAudits.sort((a,b)=> parseInt(a.replace(/[^0-9]/ig,"")) > parseInt(b.replace(/[^0-9]/ig,"")) ? 1 : -1);
             vm.downloadDate=data.data.dailyAudits;
          }
          vm.off.isLoad=false;          
      }).catch(error=>errorDeal(error));        
    //   var dn = new Date(),
    //     dny = dn.getFullYear(),
    //     dnm = dn.getMonth() + 1,
    //     dnd = dn.getDate() - 1;
    //   (y = parseInt(y)), (m = vm.timemonth.indexOf(m) + 1);
    //   var mm = parseInt(m) + 1;
    //   var nowDay = y + "/" + m;
    //   nowDay = Date.parse(nowDay);
    //   var firstDay = y + "/" + mm + "/" + "1";
    //   firstDay = Date.parse(firstDay);
    //   var lastDay = firstDay - 1000 * 60 * 60 * 24;
    //   lastDay = new Date(lastDay);
    //   lastDay = lastDay.getDate();
    //   vm.downloadDate = [];
    //   if (m < 10) m = "0" + m;
    //   if (new Date(nowDay) < new Date()) {
    //     if (y == dny && m == dnm) {
    //       lastDay = dnd;
    //       for (var x = 1; x <= lastDay; x++) {
    //         if (x < 10) {
    //           x = "0" + x;
    //         }
    //         vm.downloadDate.push(y + "-" + m + "-" + x);
    //       }
    //     } else {
    //       for (var x = 1; x <= lastDay; x++) {
    //         if (x < 10) {
    //           x = "0" + x;
    //         }
    //         vm.downloadDate.push(y + "-" + m + "-" + x);
    //       }
    //     }
    //  }
    }
  }
};
</script>

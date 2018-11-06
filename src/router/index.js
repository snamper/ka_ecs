/**
  *@info 路由模块
  *@author: thinkmix
  *@date 2017-11-6
* */
import Vue from "vue";
import Router from "vue-router";
import {getStore,getKmMenu} from '../config/utils';

Vue.use(Router);

const router=new Router({
  routes: [
    {
      path:"/login",
      component:() => import("@/views/login/")
    },
    {
      path:"/homey",
      component:() => import("@/views/home"),
      children:[
        {
          path:"audit/:source",
          name:"audit",
          component:() => import("@/views/ym/audit"),
          children:[{
              path:":type",
              component:() => import("@/views/ym/auditList"),
              name:"card",
          }]
        },
        {
          path:"wsim",
          component:() => import("@/views/ym/wsim"),
        },
        {
          path:'search',
          component:() => import("@/views/ym/search"),
          name:'search',
          children:[{
              path:':type',
              component:() => import("@/views/ym/searchList"),
              name:'order'
          }]
        },
        {
          path:'pointsSearch',
          component:() => import("@/views/ym/pointsSearch"),
        },
        {
          path:'pointsEx',
          component:() => import("@/views/ym/pointsEx"),
        },
        {
          path:'pointsGain',
          component:() => import("@/views/ym/pointsGain"),
        },
        {
          path:'pointsManage',
          component:() => import("@/views/ym/pointsManage"),
        },
        {
            path:'exceldownload',
            component:() => import("@/views/ym/Excel"),
          },
        {
          path:'illegalSearch',
          component:() => import("@/views/ym/illegalSearch"),
        }
      ]
    },
    {
      path:"/homek",
      component:() => import("@/views/home"),
      children:[
        {
          path:"dashboard",
          component:() => import("@/views/dashboard")
        },
        {//审核
          path:"audit",
          component:() => import("@/views/km/audit/index"),
          redirect:function(){
              let _switch=getKmMenu();
              if(_switch.powerKm5a&&_switch.powerKm5b){//开卡订单审核和查询
                  return "audit/card/realtime"
              }else{
                  return "audit/businessPower/auditing"
              }
          }(),
          children:[{//开卡
            path:"card/:source",
            name:"audit_card",
            component:() => import("@/views/km/audit/card"),
            children:[{//实时审核
                path:":type",
                component:() => import("@/views/km/audit/cardItem"),
                name:"realtime"
            },{//事后审核
                path:":type",
                component:() => import("@/views/km/audit/cardItem"),
                name:"afterwards"
            }]
          },{//售卡权限
              path:"businessPower/:type",
              name:'businessPowerAudit',
              component:() => import("@/views/km/orderSearch/businessPower"),
          },{//激活商户
              path:"registMerchant/:type",
              name:'registMerchantAudit',
              component:() => import("@/views/km/audit/registMerchant"),
          },{//激活商户
              path:"applySellArea",
              name:'applySellArea',
              component:() => import("@/views/km/audit/applySellArea"),
          }]
        },
        {//订单查询
          path:"orderSearch",
          component:() => import("@/views/km/orderSearch/index"),
          redirect:"orderSearch/card",
          children:[{//开卡
            path:"card",
            name:"orderSearch_card",
            component:() => import("@/views/km/orderSearch/card"),
            children:[{
                path:":type/:deviceType/:id",
                component:() => import("@/views/km/orderSearch/cardItem"),
                name:"orderSearch_cardItem"
            }]
          },{//售卡权限
            path:"businessPower/:type",
            component:() => import("@/views/km/orderSearch/businessPower"),
            name:'businessPowerSearch'
          },{//网厅
            path:"onlineHall",
            component:() => import("@/views/km/orderSearch/onlineHall"),
          },{//公交一卡通
            path:"busCard",
            component:() => import("@/views/km/orderSearch/busCard"),
            children:[{
              path:":type",
              component:() => import("@/views/km/orderSearch/busCardItem")
            }]
          },{//充值订单
            path:"recharge",
            component:() => import("@/views/km/orderSearch/recharge"),
          },{//激活商户
            path:"registMerchant/:type",
            name:'registMerchantSearch',
            component:() => import("@/views/km/orderSearch/registMerchant"),
          },{//预占号码
            path:"reserve",
            name:'reserveSearch',
            component:() => import("@/views/km/orderSearch/reserve"),
          },{//号码流转
            path:"flowCard/:val",
            name:'flowCard',
            component:() => import("@/views/km/orderSearch/cardWanderAbout"),
          },{//制卡
            path:"makeCard/:val",
            name:'makeCard',
            component:() => import("@/views/km/orderSearch/makeCard"),
          }]
        },
        {//资源查询
          path:"resource",
          component:() => import("@/views/km/resource/index"),
          redirect:"resource/merchant/null",
          children:[{//商户查询
            path:"merchant/:val",
            component:() => import("@/views/km/resource/merchant"),
            name:"merchant"
          },{//推广方查询
            path:"promoter/:val",
            component:() => import("@/views/km/resource/promoter"),
            name:"promoter"
          },{//设备查询
            path:"device/:val",
            component:() => import("@/views/km/resource/device"),
            name:"device"
          },{//大众专营号
            path:"ordinaryExclusive/:val",
            component:() => import("@/views/km/resource/publicNumber"),
            name:"ordinaryExclusive"
          },{//专营号
            path:"exclusive/:val",
            component:() => import("@/views/km/resource/exclusive"),
            name:"exclusive"
          },{//专属专营号
            path:"specialExclusive/:val",
            component:() => import("@/views/km/resource/specialExclusive"),
            name:"specialExclusive"
          },{//sim卡查询
            path:"simCard/:val",
            component:() => import("@/views/km/resource/simCard"),
            name:"simCard"
          }]
        },
        {//统计报表
          path:"statistics",
          component:() => import("@/views/km/statistics/index"),
          redirect:"statistics/cardOrder",
          children:[{
            path:"cardOrder",
            component:() => import("@/views/km/statistics/cardOrder"),
          },{
            path:"softwareUseTimes/:type",
            component:() => import("@/views/km/statistics/softwareUseTimes"),
            name:"softwareUseTimes"
          }]
        },
        {//意见反馈
          path:"opinion",
          component:() => import("@/views/km/opinion/index"),
          name:"opinion",
          children:[{
            path:":type",
            component:() => import("@/views/km/opinion/opinion"),
            name:"opinion_item"
          }]
        },
        {//更多功能
          path:"more",
          component:() => import("@/views/km/more/index"),
          name:"more"
        },
        {//实名资源
          path:"realNameResource",
          component:() => import("@/views/km/realNameSource/index"),
          name:"realNameResource"
        },
        // {//区域管理
        //   path:"fence",
        //   component:() => import("@/views/fence"),
        //   name:"fence"
        // }
      ]
    },
  ]
});

const load=(isShow)=>{
  var routerLoad=document.getElementById("routerLoading");
  if(routerLoad){
    isShow ? routerLoad.style.display="block" : setTimeout(function(){
      routerLoad.style.display="none";
    },200);
  }
};

router.beforeEach((to, from, next) => {
    load(true);
    var token = localStorage.getItem("KA_ECS_USER");
    if (!token&&to.path!=="/login"||to.path=="/"){
        next({path:"/login"});
        return false;
    }
     next();
});
router.afterEach((to, from) => {
  load();
})
export default router;



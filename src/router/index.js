/**
  *@info 路由模块
  *@author: thinkmix
  *@date 2017-11-6
* */
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const load=(isShow)=>{
  var routerLoad=document.getElementById("routerLoading");
  if(routerLoad){
    isShow ? routerLoad.style.display="block" : setTimeout(function(){
      routerLoad.style.display="none";
    },200);
  }
};
const Login = resolve => {
  require.ensure(["@/views/login"], () => {
    resolve(require("@/views/login"));
  });
};
const Home = resolve => {
  require.ensure(["@/views/home"], () => {
    resolve(require("@/views/home"));
  });
};
const Dashboard = resolve => {//首页-数据面板
  load(true);
  require.ensure(["@/views/dashboard"], () => {
    resolve(require("@/views/dashboard"));
    load();
  });
};
/*审核*/
const Audit = resolve => {
  load(true);
  require.ensure(["@/views/audit/index"], () => {
    resolve(require("@/views/audit/index"));
    load();
  });
};
const Audit_card = resolve => {//开卡
  load(true);
  require.ensure(["@/views/audit/card"], () => {
    resolve(require("@/views/audit/card"));
    load();
  });
};
const Audit_cardItem = resolve => {//开卡子模块
  load(true);
  require.ensure(["@/views/audit/cardItem"], () => {
    resolve(require("@/views/audit/cardItem"));
    load();
  });
};
const Audit_registMerchant = resolve => {//激活商户
  load(true);
  require.ensure(["@/views/audit/registMerchant"], () => {
    resolve(require("@/views/audit/registMerchant"));
    load();
  });
};
/*订单查询*/
const OrderSearch = resolve => {
  load(true);
  require.ensure(["@/views/orderSearch/index"], () => {
    resolve(require("@/views/orderSearch/index"));
    load();
  });
};
const OrderSearch_card = resolve => {//开卡订单
  load(true);
  require.ensure(["@/views/orderSearch/card"], () => {
    resolve(require("@/views/orderSearch/card"));
    load();
  });
};
const OrderSearch_cardItem = resolve => {//开卡订单子模块
  load(true);
  require.ensure(["@/views/orderSearch/cardItem"], () => {
    resolve(require("@/views/orderSearch/cardItem"));
    load();
  });
};
const OrderSearch_businessPower = resolve => {//售卡范围
  load(true);
  require.ensure(["@/views/orderSearch/businessPower"], () => {
    resolve(require("@/views/orderSearch/businessPower"));
    load();
  });
};
const OrderSearch_onlineHall = resolve => {//网厅订单
  load(true);
  require.ensure(["@/views/orderSearch/onlineHall"], () => {
    resolve(require("@/views/orderSearch/onlineHall"));
    load();
  });
};
const OrderSearch_busCard = resolve => {//公交一卡通
  load(true);
  require.ensure(["@/views/orderSearch/busCard"], () => {
    resolve(require("@/views/orderSearch/busCard"));
    load();
  });
};
const OrderSearch_busCardItem = resolve => {//公交一卡通子模块
  load(true);
  require.ensure(["@/views/orderSearch/busCardItem"], () => {
    resolve(require("@/views/orderSearch/busCardItem"));
    load();
  });
};
const OrderSearch_recharge = resolve => {//充值订单
  load(true);
  require.ensure(["@/views/orderSearch/recharge"], () => {
    resolve(require("@/views/orderSearch/recharge"));
    load();
  });
};
const OrderSearch_registMerchant = resolve => {//激活商户
  load(true);
  require.ensure(["@/views/orderSearch/registMerchant"], () => {
    resolve(require("@/views/orderSearch/registMerchant"));
    load();
  });
};
const OrderSearch_reserve = resolve => {//预占号码
  load(true);
  require.ensure(["@/views/orderSearch/reserve"], () => {
    resolve(require("@/views/orderSearch/reserve"));
    load();
  });
};
/*资源查询*/
const Resource = resolve => {
  load(true);
  require.ensure(["@/views/resource/index"], () => {
    resolve(require("@/views/resource/index"));
    load();
  });
};
const Resource_merchant = resolve => {//商户查询
  load(true);
  require.ensure(["@/views/resource/merchant"], () => {
    resolve(require("@/views/resource/merchant"));
    load();
  });
};
const Resource_numberRelease = resolve => {//号码冻结/解冻
  load(true);
  require.ensure(["@/views/resource/numberRelease"], () => {
    resolve(require("@/views/resource/numberRelease"));
    load();
  });
};
const Resource_promoter = resolve => {//推广方查询
  load(true);
  require.ensure(["@/views/resource/promoter"], () => {
    resolve(require("@/views/resource/promoter"));
    load();
  });
};
const Resource_device = resolve => {//设备查询
  load(true);
  require.ensure(["@/views/resource/device"], () => {
    resolve(require("@/views/resource/device"));
    load();
  });
};

/*统计报表*/
const Statistics = resolve => {
  load(true);
  require.ensure(["@/views/statistics/index"], () => {
    resolve(require("@/views/statistics/index"));
    load();
  });
};
const Statistics_cardOrder = resolve => {//开卡统计
  load(true);
  require.ensure(["@/views/statistics/cardOrder"], () => {
    resolve(require("@/views/statistics/cardOrder"));
    load();
  });
};
const Statistics_softwareUseTimes= resolve => {//身份证识别/活体识别统计
  load(true);
  require.ensure(["@/views/statistics/softwareUseTimes"], () => {
    resolve(require("@/views/statistics/softwareUseTimes"));
    load();
  });
};
/*意见反馈*/
const Opinion = resolve =>{
  load(true);
  require.ensure(["@/views/opinion/index"], () => {
    resolve(require("@/views/opinion/index"));
    load();
  });
};
const Opinion_item = resolve => {
  load(true);
  require.ensure(["@/views/opinion/opinion"], () => {
    resolve(require("@/views/opinion/opinion"));
    load();
  });
};
/*区域管理*/
// const Fence = resolve =>{
//   load(true);
//   require.ensure(["@/views/fence"], () => {
//     resolve(require("@/views/fence"));
//     load();
//   });
// };
const router=new Router({
  routes: [
    {
      path:"/login",
      component:Login
    },
    {
      path:"/home",
      component:Home,
      redirect:"home/dashboard",
      // redirect:"home/audit/card/realtime",
      children:[{
        path:"dashboard",
        component:Dashboard
      },
      {//审核
          path:"audit",
          component:Audit,
          redirect:"audit/card/realtime",
          children:[{//开卡
            path:"card/:source",
            name:"audit_card",
            component:Audit_card,
            children:[{//实时审核
              path:":type",
              component:Audit_cardItem,
              name:"realtime"
            },{//事后审核
              path:":type",
              component:Audit_cardItem,
              name:"afterwards"
            }]
          },{//售卡权限
            path:"businessPower/:type",
            name:'businessPowerAudit',
            component:OrderSearch_businessPower,
          },{//激活商户
            path:"registMerchant/:type",
            name:'registMerchantAudit',
            component:Audit_registMerchant,
          }]
        },
        {//订单查询
          path:"orderSearch",
          component:OrderSearch,
          redirect:"orderSearch/card",
          children:[{//开卡
            path:"card",
            name:"orderSearch_card",
            component:OrderSearch_card,
            children:[{
              path:":type",
              component:OrderSearch_cardItem,
              name:"orderSearch_cardItem"
            }]
          },{//售卡权限
            path:"businessPower/:type",
            component:OrderSearch_businessPower,
            name:'businessPowerSearch'
          },{//网厅
            path:"onlineHall",
            component:OrderSearch_onlineHall,
          },{//公交一卡通
            path:"busCard",
            component:OrderSearch_busCard,
            children:[{
              path:":type",component:OrderSearch_busCardItem
            }]
          },{//充值订单
            path:"recharge",
            component:OrderSearch_recharge,
          },{//激活商户
            path:"registMerchant/:type",
            name:'registMerchantSearch',
            component:OrderSearch_registMerchant,
          },{//预占号码
            path:"reserve",
            name:'reserveSearch',
            component:OrderSearch_reserve,
          }]
        },
		    {//资源查询
          path:"resource",
          component:Resource,
          redirect:"resource/merchant/null",
          children:[{//商户查询
            path:"merchant/:val",
            component:Resource_merchant,
            name:"merchant"
          },{//号码解冻
            path:"numberRelease",
            component:Resource_numberRelease
          },{//推广方查询
            path:"promoter/:val",
            component:Resource_promoter,
            name:"promoter"
          },{//设备查询
            path:"device/:val",
            component:Resource_device,
            name:"device"
          }]
        },
        {//统计报表
          path:"statistics",
          component:Statistics,
          redirect:"statistics/cardOrder",
          children:[{
            path:"cardOrder",
            component:Statistics_cardOrder,
          },{
            path:"softwareUseTimes/:type",
            component:Statistics_softwareUseTimes,
            name:"softwareUseTimes"
          }]
        },
        {//意见反馈
          path:"opinion",
          component:Opinion,
          name:"opinion",
          children:[{
            path:":type",
            component:Opinion_item,
            name:"opinion_item"
          }]
        },
        // {//区域管理
        //   path:"fence",
        //   component:Fence,
        //   name:"fence"
        // }
      ]
    }
  ]
});


router.beforeEach((to, from, next) => {

    var token = localStorage.getItem("KA_ECS_USER");
    if (!token&&to.path!=="/login"||to.path=="/"){
        next({path:"/login"});
        return false;
    }
    next();
});
export default router;



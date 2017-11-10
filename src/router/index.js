/**
  *@info 路由模块
  *@author: thinkmix
  *@date 2017-11-6
* */
import Vue from "vue"
import Router from "vue-router"
Vue.use(Router);
const load=(isShow)=>{
  var routerLoad=document.getElementById("routerLoading");
  if(routerLoad){
    isShow ? routerLoad.style.display="block" : setTimeout(function(){
      routerLoad.style.display="none";
    },1000);
  }
}
//const login=resolve => require(["@/views/login"], resolve);
const login = resolve => {
  require.ensure(["@/views/login"], () => {
    resolve(require("@/views/login"));
  });
}
//const home=resolve => require(["@/views/home"], resolve);
const home = resolve => {
  require.ensure(["@/views/home"], () => {
    resolve(require("@/views/home"));
  });
}
/*审核*/
// const Audit=resolve=>require(["@/views/audit/index"],resolve);
// const Audit_card=resolve=>require(["@/views/audit/card"],resolve);
// const Audit_cardItem=resolve=>require(["@/views/audit/cardItem"],resolve);
const Audit = resolve => {
  load(true)
  require.ensure(["@/views/audit/index"], () => {
    resolve(require("@/views/audit/index"));
    load()
  });
}
const Audit_card = resolve => {
  load(true)
  require.ensure(["@/views/audit/card"], () => {
    resolve(require("@/views/audit/card"));
    load()
  });
}
const Audit_cardItem = resolve => {
  load(true)
  require.ensure(["@/views/audit/cardItem"], () => {
    resolve(require("@/views/audit/cardItem"));
    load()
  });
}
/*订单查询*/
// const OrderSearch=resolve=>require(["@/views/orderSearch/index"],resolve);
// const OrderSearch_card=resolve => require(["@/views/orderSearch/card"], resolve);
// const OrderSearch_cardItem=resolve => require(["@/views/orderSearch/cardItem"], resolve);
// const OrderSearch_businessPower=resolve => require(["@/views/orderSearch/businessPower"], resolve);
// const OrderSearch_onlineHall=resolve => require(["@/views/orderSearch/onlineHall"], resolve);
// const OrderSearch_busCard=resolve => require(["@/views/orderSearch/busCard"], resolve);
// const OrderSearch_busCardItem=resolve => require(["@/views/orderSearch/busCardItem"], resolve);
const OrderSearch = resolve => {
  load(true)
  require.ensure(["@/views/orderSearch/index"], () => {
    resolve(require("@/views/orderSearch/index"));
    load()
  });
}
const OrderSearch_card = resolve => {
  load(true)
  require.ensure(["@/views/orderSearch/card"], () => {
    resolve(require("@/views/orderSearch/card"));
    load()
  });
}
const OrderSearch_cardItem = resolve => {
  load(true)
  require.ensure(["@/views/orderSearch/cardItem"], () => {
    resolve(require("@/views/orderSearch/cardItem"));
    load()
  });
}
const OrderSearch_businessPower = resolve => {
  load(true)
  require.ensure(["@/views/orderSearch/businessPower"], () => {
    resolve(require("@/views/orderSearch/businessPower"));
    load()
  });
}
const OrderSearch_onlineHall = resolve => {
  load(true)
  require.ensure(["@/views/orderSearch/onlineHall"], () => {
    resolve(require("@/views/orderSearch/onlineHall"));
    load()
  });
}
const OrderSearch_busCard = resolve => {
  load(true)
  require.ensure(["@/views/orderSearch/busCard"], () => {
    resolve(require("@/views/orderSearch/busCard"));
    load()
  });
}
const OrderSearch_busCardItem = resolve => {
  load(true)
  require.ensure(["@/views/orderSearch/busCardItem"], () => {
    resolve(require("@/views/orderSearch/busCardItem"));
    load()
  });
}


/*资源查询*/
// const Resource=resolve=>require(["@/views/resource/index"],resolve);
// const Resource_merchant=resolve=>require(["@/views/resource/merchant"],resolve);
// const Resource_numberRelease=resolve=>require(["@/views/resource/numberRelease"],resolve);

const Resource = resolve => {
  load(true)
  require.ensure(["@/views/resource/index"], () => {
    resolve(require("@/views/resource/index"));
    load()
  });
}
const Resource_merchant = resolve => {
  load(true)
  require.ensure(["@/views/resource/merchant"], () => {
    resolve(require("@/views/resource/merchant"));
    load()
  });
}
const Resource_numberRelease = resolve => {
  load(true)
  require.ensure(["@/views/resource/numberRelease"], () => {
    resolve(require("@/views/resource/numberRelease"));
    load()
  });
}

/*统计报表*/
// const Statistics=resolve=>require(["@/views/statistics/index"],resolve);
// const Statistics_cardOrder=resolve=>require(["@/views/statistics/cardOrder"],resolve);
const Statistics = resolve => {
  load(true)
  require.ensure(["@/views/statistics/index"], () => {
    resolve(require("@/views/statistics/index"));
    load()
  });
}
const Statistics_cardOrder = resolve => {
  load(true)
  require.ensure(["@/views/statistics/cardOrder"], () => {
    resolve(require("@/views/statistics/cardOrder"))
    load()
  });
}

const router=new Router({
  routes: [
    {
      path:"/login",
      component:login
    },
    {
      path:"/home",
      component:home,
      redirect:"home/audit/card/realtime",
      children:[{//审核
          path:"audit",
          component:Audit,
          redirect:"audit/card/realtime",
          children:[{//开卡
            path:"card/:source",
            name:"audit_card",
            component:Audit_card,
            children:[{//实时
              path:":type",
              component:Audit_cardItem,
              name:"realtime"
            },{//事后
              path:":type",
              component:Audit_cardItem,
              name:"afterwards"
            },{//SDK实时
              path:":type",
              component:Audit_cardItem,
              name:"sdk_realtime"
            }]
          },{//业务权限
            path:"businessPower/:type",
            name:'businessPowerAudit',
            component:OrderSearch_businessPower,
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
          },{//业务权限
            path:"businessPower/:type",
            component:OrderSearch_businessPower,
            name:'businessPowerSearch'
          },,{//网厅
            path:"onlineHall",
            component:OrderSearch_onlineHall,
          },{//公交一卡通
            path:"busCard",
            component:OrderSearch_busCard,
            children:[{
              path:":type",component:OrderSearch_busCardItem
            }]
          }]
        },
		    {//资源查询
          path:"resource",
          component:Resource,
          redirect:"resource/merchant",
          children:[{//商户
            path:"merchant",
            component:Resource_merchant
          },{//号码解冻
            path:"numberRelease",
            component:Resource_numberRelease
          }]
        },
        {//统计报表
          path:"statistics",
          component:Statistics,
          redirect:"statistics/cardOrder",
          children:[{
            path:"cardOrder",
            component:Statistics_cardOrder,
          }]
        },
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



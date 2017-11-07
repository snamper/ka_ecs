/**
  *@info 路由模块
  *@author: thinkmix
  *@date 2017-11-6
* */
import Vue from "vue"
import Router from "vue-router"
Vue.use(Router);

const login=resolve => require(["@/views/login"], resolve);
const home=resolve => require(["@/views/home"], resolve);
/*审核*/
const Audit=resolve=>require(["@/views/audit/index"],resolve);
const Audit_card=resolve=>require(["@/views/audit/card"],resolve);
const Audit_cardItem=resolve=>require(["@/views/audit/cardItem"],resolve);


/*订单查询*/
const OrderSearch=resolve=>require(["@/views/orderSearch/index"],resolve);
const OrderSearch_card=resolve => require(["@/views/orderSearch/card"], resolve);
const OrderSearch_cardItem=resolve => require(["@/views/orderSearch/cardItem"], resolve);
const OrderSearch_merchant=resolve => require(["@/views/orderSearch/merchant"], resolve);
const OrderSearch_onlineHall=resolve => require(["@/views/orderSearch/onlineHall"], resolve);
const OrderSearch_busCard=resolve => require(["@/views/orderSearch/busCard"], resolve);
const OrderSearch_busCardItem=resolve => require(["@/views/orderSearch/busCardItem"], resolve);
/*资源查询*/
const Resource=resolve=>require(["@/views/resource/index"],resolve);
const Resource_merchant=resolve=>require(["@/views/resource/merchant"],resolve);
/*统计报表*/
const Statistics=resolve=>require(["@/views/statistics/index"],resolve);
const Statistics_cardOrder=resolve=>require(["@/views/statistics/cardOrder"],resolve);

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
            children:[{
              path:":type",
              component:Audit_cardItem,
              name:"realtime"
            },{
              path:":type",
              component:Audit_cardItem,
              name:"afterwards"
            }]
          },{//商户属性
            path:"merchant/:type",
            name:'merchantAudit',
            component:OrderSearch_merchant,
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
          },{//商户属性
            path:"merchant/:type",
            component:OrderSearch_merchant,
            name:'merchantSearch'
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



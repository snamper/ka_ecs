import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const router=new Router({
  routes: [
    {
      path:'/login',
      component:resolve => require(['@/components/login.vue'], resolve)
    },
    {
      path:'/home',
      component:resolve => require(['@/components/home'], resolve),
      redirect:'home/realtime/kameng',
      children:[
        {//开卡实时审核
          path:'realtime/:source',
          name:'realtime',
          component:resolve=>require(['@/components/cardAudit'],resolve),
          children:[{path:':type',component:resolve => require(['@/components/cardAuditList'], resolve),name:'realtimeChild'}]
        },
        {//开卡事后审核
          path:'afterwards/:source',
          name:'afterwards',
          component:resolve=>require(['@/components/cardAudit'],resolve),
          children:[{path:':type',component:resolve => require(['@/components/cardAuditList'], resolve),name:'afterwardsChild'}]
        },
        {//订单查询
          path:'cardOrderSearch',
          component:resolve => require(['@/components/cardOrderSearch'], resolve),
          name:'cardOrderSearch',
          children:[{path:':type',component:resolve => require(['@/components/cardOrderList'], resolve),name:'cardOrderSearchItem'}]
        },
		{//ecs网厅订单查询
          path:'ecsNetOrderSearch',
          component:resolve => require(['@/components/ecsNetOrderSearch'], resolve),
          name:'ecsNetOrderSearch',
        },
        {//统计下载
          path:'cardOrderDownload',
          component:resolve => require(['@/components/cardOrderDownload'], resolve),
          name:'cardOrderDownload'
        },
        {//商户属性审核
          path:'merchantAttr',
          component:resolve=>require(['@/components/merchantAttr'],resolve),
          name:'merchantAttr',
          children:[{path:':type',component:resolve => require(['@/components/merchantAttrOrderList'], resolve),name:'orderList'}]
        },
        {//商户查询
          path:'merchantSearch',
          component:resolve => require(['@/components/merchantSearch'], resolve),
          name:'merchantSearch'
        },
        {//公交一卡通
          path:'busOrderSearch',
          component:resolve => require(['@/components/busOrderSearch'], resolve),
          name:'busOrderSearch',
          children:[{path:':type',component:resolve => require(['@/components/busOrderList'], resolve),name:'busOrderSearchItem'}]
        },
      ]
    }
  ]
})




router.beforeEach((to, from, next) => {


    var token = localStorage.getItem('KA_ECS_INFO');
    if (!token&&to.path!=='/login'||to.path=='/'){
        next({path:'/login'});
        return false;
    }
    next()

  
})
export default router;



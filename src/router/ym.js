/**
  *@info 远盟路由模块
  *@author: thinkmix
  *@date 2017-11-6
* */

export default {
  path: '/homey',
  component: () => import('@/views/home'),
  name: '远盟',
  children: [
    {
      path: 'audit/:source',
      name: '远盟订单审核',
      component: () => import('@/views/ym/audit'),
      children: [{
        path: ':type',
        component: () => import('@/views/ym/auditList'),
        name: '远盟业务订单'
      }]
    },
    {
      path: 'search',
      component: () => import('@/views/ym/search'),
      name: '远盟订单查询',
      children: [{
        path: ':type',
        component: () => import('@/views/ym/searchList'),
        name: '远盟订单查询子项'
      }]
    },
    {
      path: 'points',
      component: () => import('@/views/ym/points/index'),
      name: '远盟积分',
      redirect: 'points/search/',
      children: [{
        path: 'search',
        component: () => import('@/views/ym/points/search'),
        name: '远盟积分查询'
      },
      {
        path: 'exchange',
        component: () => import('@/views/ym/points/exchange'),
        name: '远盟积分兑换详情'
      },
      {
        path: 'gain',
        component: () => import('@/views/ym/points/gain'),
        name: '远盟积分获取详情'
      },
      {
        path: 'manage',
        component: () => import('@/views/ym/points/manage'),
        name: '远盟积分管理'
      }]
    },
    {
      path: 'exceldownload',
      component: () => import('@/views/ym/Excel'),
      name: '远盟日报excel'
    },
    {
      path: 'illegalSearch',
      component: () => import('@/views/ym/illegalSearch'),
      name: '远盟违规查询'
    }
  ]
}

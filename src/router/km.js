/**
  *@info 卡盟路由模块
  *@author: thinkmix
  *@date 2017-11-6
* */
import { getKmMenu } from '../config/utils'

export default {
  path: '/homek',
  component: () => import('@/views/home'),
  name: '卡盟',
  children: [
    {
      path: 'dashboard',
      component: () => import('@/views/dashboard'),
      name: '卡盟数据面板'
    },
    {
      path: 'audit',
      component: () => import('@/views/km/audit/index'),
      name: '卡盟订单审核',
      redirect: (function () {
        let _switch = getKmMenu()
        if (_switch.powerKm5a && _switch.powerKm5b) { // 开卡订单审核和查询
          return 'audit/card/realtime'
        } else {
          return 'audit/businessPower/auditing'
        }
      }()),
      children: [{
        path: 'card/:source',
        name: '卡盟业务订单审核',
        component: () => import('@/views/km/audit/card'),
        children: [{
          path: ':type',
          component: () => import('@/views/km/audit/cardItem'),
          name: '卡盟业务订单审核子项'
        }]
      }, {
        path: 'businessPower/:type',
        name: '卡盟售卡范围',
        component: () => import('@/views/km/orderSearch/businessPower')
      }, {
        path: 'registMerchant/:source',
        name: '卡盟激活商户',
        component: () => import('@/views/km/audit/registMerchant')
      }, {
        path: 'applySellArea',
        name: '卡盟申请区域审核',
        component: () => import('@/views/km/audit/applySellArea')
      }]
    },
    {
      path: 'orderSearch',
      component: () => import('@/views/km/orderSearch/index'),
      name: '卡盟订单查询',
      redirect: 'orderSearch/card',
      children: [{
        path: 'card',
        name: '卡盟业务订单查询',
        component: () => import('@/views/km/orderSearch/card'),
        children: [{
          path: ':type/:deviceType/:id',
          component: () => import('@/views/km/orderSearch/cardItem'),
          name: '卡盟业务订单查询子项'
        }]
      }, {
        path: 'businessPower/:type',
        component: () => import('@/views/km/orderSearch/businessPower'),
        name: '售卡范围'
      }, {
        path: 'onlineHall',
        component: () => import('@/views/km/orderSearch/onlineHall'),
        name: '网厅订单'
      }, {
        path: 'recharge',
        component: () => import('@/views/km/orderSearch/recharge'),
        name: '充值订单'
      }, {
        path: 'registMerchant/:type',
        name: '激活商户',
        component: () => import('@/views/km/orderSearch/registMerchant')
      }, {
        path: 'fillMerchant/:type',
        name: '补录商户',
        component: () => import('@/views/km/orderSearch/fillMerchant')
      }, {
        path: 'reserve',
        name: '预占号码',
        component: () => import('@/views/km/orderSearch/reserve')
      }, {
        path: 'flowCard/:val',
        name: '流转订单',
        component: () => import('@/views/km/orderSearch/cardWanderAbout')
      }, {
        path: 'makeCard/:val',
        name: '制卡订单',
        component: () => import('@/views/km/orderSearch/makeCard')
      }]
    },
    {
      path: 'resource',
      component: () => import('@/views/km/resource/index'),
      name: '资源查询',
      redirect: 'resource/merchant/null',
      children: [{
        path: 'merchant/:val',
        component: () => import('@/views/km/resource/merchant'),
        name: '商户查询'
      }, {
        path: 'promoter/:val',
        component: () => import('@/views/km/resource/promoter'),
        name: '推广方'
      }, {
        path: 'device/:val',
        component: () => import('@/views/km/resource/device'),
        name: '设备查询'
      }, {
        path: 'ordinaryExclusive/:val',
        component: () => import('@/views/km/resource/publicNumber'),
        name: '大众号查询'
      }, {
        path: 'exclusive/:val',
        component: () => import('@/views/km/resource/exclusive'),
        name: '专营号查询'
      }, {
        path: 'specialExclusive/:val',
        component: () => import('@/views/km/resource/specialExclusive'),
        name: '商户专营号查询'
      }, {
        path: 'simCard/:val',
        component: () => import('@/views/km/resource/simCard'),
        name: 'SIM卡查询'
      }]
    },
    {
      path: 'statistics',
      component: () => import('@/views/km/statistics/index'),
      name: '统计报表',
      redirect: 'statistics/cardOrder',
      children: [{
        path: 'cardOrder',
        component: () => import('@/views/km/statistics/cardOrder'),
        name: '开卡统计下载'
      }, {
        path: 'softwareUseTimes/:type',
        component: () => import('@/views/km/statistics/softwareUseTimes'),
        name: '识别统计'
      }]
    },
    {
      path: 'opinion',
      component: () => import('@/views/km/opinion/index'),
      name: '意见反馈',
      children: [{
        path: ':type',
        component: () => import('@/views/km/opinion/opinion'),
        name: '意见反馈子项'
      }]
    },
    {
      path: 'more',
      component: () => import('@/views/km/more/index'),
      name: '更多功能'
    },
    {
      path: 'realNameResource',
      component: () => import('@/views/km/realNameSource/index'),
      name: '实名资源库'
    }
  ]
}

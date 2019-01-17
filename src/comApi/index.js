import fetch from '@/config/fetch'

export default {
  /**
    *@describe 获取商户实信用等级
    *@data {
      dealerId:'',
    }
    **/
  getMerchantCreditLevel: (data, load, type) => fetch('km-ecs/w/regist/getCreditLevel', data, 'POST', load)
}

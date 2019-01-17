import fetch from '@/config/fetch'

export default {
  /**
    *@describe 查询商户实名补录列表
    *@data {
      
    }
    **/
  getList: (data, load) => {
    return fetch('km-ecs/w/handler/query', data, 'POST', load)
  },
}

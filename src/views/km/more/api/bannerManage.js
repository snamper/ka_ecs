import fetch from '@/config/fetch'

export default {
  /**
     *@describe 列表
    *@data {

    }
    **/
  getList: (data, load) => fetch('km-ecs/w/homePageBanner/list', data, 'POST', load),
  /**
     *@describe 上传图片
    *@data {

    }
    **/
  actionUploadUrl: 'km-ecs/w/homePageBanner/upload',
  /**
     *@describe 新增
    *@data {
        id:'',
        title:'',
        jumpUrl:'',
        priority:'',
        cssStyle:'',
        useFlag:''
    }
    **/
  actionCreate: (data, load) => fetch('km-ecs/w/homePageBanner/add', data, 'POST', load),
  /**
     *@describe 修改
    *@data {
        id:'',
        title:'',
        jumpUrl:'',
        priority:'',
        cssStyle:'',
        useFlag:''
    }
    **/
  actionModify: (data, load) => fetch('km-ecs/w/homePageBanner/modify', data, 'POST', load),
  /**
     *@describe 删除
    *@data {
        id:''
    }
    **/
  actionDelete: (data, load) => fetch('km-ecs/w/homePageBanner/del', data, 'POST', load)
}

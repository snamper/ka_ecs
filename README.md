# ka_ecs

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost
yarn serve

# build for production with minification
yarn build

```
# 在开发前请阅读‘路由导图’，遵守架构设计规则

#架构目录
```
├── public（静态资源）
├── src
│   ├── assets（公共资源）
│   │   ├── fonts
│   │   ├── images
│   │   └── css
│   ├── components（公共组件）
│   ├── config（配置）
│   ├── router（路由）
│   ├── store（vuex）
│   ├── utils（公共工具）
│   └── views
│       ├── km
│	│   │   ├── audit（订单审核）
│	│   │   │   │   ├── components（组件）
│	│   │	│   │   ├── api（接口地址管理）
│	│   │	│   │   └── ...
│	│   │   ├── more（更多功能）
│	│   │   ├── opinion（意见反馈）
│	│   │   ├── orderSearch（订单查询）
│	│   │   ├── realNameSource（实名资源库）
│	│   │   ├── resource（资源查询）
│	│   │   ├── statistics（统计报表）
│	│   │   └── dashboard.vue（数据面板）
│       ├── ym
│	│   │   ├── audit（订单审核）
│	│   │   ├── points（积分管理）
│	│   │   └── orderSearch（订单查询）
│       ├── home.vue（主视图）
│       └── login.vue（登录页面）
├── vue.config.js（webpack相关配置）
└── ecosystem.config.js（pm2相关配置）
```
#重构任务列表
```
1、将公共css提取到assets目录下
	1）、功能css模块采用sass混合指令
	2）、css命名规则参照[http://nec.netease.com/standard]
2、公共组件整合到components目录下
	1）、Page分页组件
	2）、Loading自定义加载组件
	3）、Button按钮组件
	4）、Message消息交互组件
	5）、PopBox弹窗外壳组件
	6）、RadioGroup单选（组合）组件
	7）、CheckboxGroup复选框（组合）组件
	8）、Select选择框组件
	9）、ImgZoom相册组件
	10）、TimePicker时间选择组件
	11）、Input输入框组件
	12）、FileUpload文件上传组件
3、用户权限配置
	1）、根据权限生成左侧菜单配置
4、api整合到各级目录下
5、代码优化
```

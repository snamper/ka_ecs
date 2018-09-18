# Message

消息提示模块



##options
```javascript
{
	title:'',
    message: '',//消息体的内容，目前支持:html模板、文本、vnode
    type: 'alert',//目前只实现了，alert和confirm（info暂未开发）
    status: 'error',//状态图标：success、error、info。目前只用于alert（load暂未开发）
    button: [],//底部按钮文字。目前只用于confirm
    duration: 3000,//销毁时间
    onConfirm:Function,//确认回掉函数
}
```
**.挂载在Vue实例上使用**

webpackJsonp([30],{"9pjA":function(e,s,t){var a=t("KfXA");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("FIqI")("40a9742c",a,!0,{})},Ihe9:function(e,s,t){"use strict";function a(e){t("9pjA")}Object.defineProperty(s,"__esModule",{value:!0});var r=t("04Cm"),o=t("Gcvq"),i=(t("mkH3"),t("R2SV")),n={name:"rechargeOrderDetails",props:{list:Object},data:function(){return{}},created:function(){},methods:{close:function(){this.$parent.off.details=!1},getDateTime:function(e){return Object(i.c)(e)},secondsFormat:function(e){return Object(i.g)(e)}}},c=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("section",{staticClass:"g-list-box",attrs:{id:"details"}},[t("header",{staticClass:"g-lis-head"},[t("a",{staticClass:"m-details-back u-icon-back",on:{click:e.close}})]),e._v(" "),t("div",{staticClass:"g-box"},[t("table",{staticClass:"g-list-table"},[t("tbody",[t("tr",[t("td",[t("table",{staticClass:"g-inner-table"},[t("tbody",[t("tr",[t("td",[e._v("系统订单号：")]),t("td",[e._v(e._s(e.list.orderId))])]),e._v(" "),t("tr",{directives:[{name:"show",rawName:"v-show",value:e.list.payOrderId,expression:"list.payOrderId"}]},[t("td",[e._v("支付订单号：")]),t("td",[e._v(e._s(e.list.payOrderId))])]),e._v(" "),t("tr",[t("td",[e._v("生成时间：")]),t("td",[e._v(e._s(e.getDateTime(e.list.createTime)[6]))])]),e._v(" "),t("tr",[t("td",[e._v("支付耗时：")]),t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:e.list.createTime,expression:"list.createTime"}]},[e._v(e._s(e.secondsFormat(parseInt(e.list.modifyTime)/1e3-parseInt(e.list.createTime)/1e3)))]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:!e.list.createTime,expression:"!list.createTime"}]},[e._v("--")])])]),e._v(" "),t("tr",[t("td",[e._v("终端类型：")]),t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:1==e.list.terminalType,expression:"list.terminalType==1"}]},[e._v("IOS")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:2==e.list.terminalType,expression:"list.terminalType==2"}]},[e._v("Android")])])]),e._v(" "),t("tr",[t("td",[e._v("商户号：")]),t("td",[e._v(e._s(e.list.dealerId))])]),e._v(" "),t("tr",[t("td",[e._v("操作人ID：")]),t("td",[e._v(e._s(e.list.userId))])]),e._v(" "),t("tr",[t("td",[e._v("充值类型：")]),t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:1==e.list.rechargeType,expression:"list.rechargeType==1"}]},[e._v("流量")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:2==e.list.rechargeType,expression:"list.rechargeType==2"}]},[e._v("话费")])])]),e._v(" "),t("tr",[t("td",[e._v("支付方式：")]),t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:1==e.list.payType,expression:"list.payType==1"}],staticClass:"u-icon-yuantelrecharge"}),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:2==e.list.payType,expression:"list.payType==2"}],staticClass:"u-icon-wechat"}),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:3==e.list.payType,expression:"list.payType==3"}],staticClass:"u-icon-alipay"})])]),e._v(" "),t("tr",{directives:[{name:"show",rawName:"v-show",value:1==e.list.rechargeType,expression:"list.rechargeType==1"}]},[t("td",[e._v("产品号：")]),t("td",[e._v(e._s(e.list.productId))])]),e._v(" "),t("tr",[t("td",[e._v("充值面额：")]),t("td",[1==e.list.rechargeType?t("span",[e._v(e._s(e.list.flowNum+e.list.flowUnit))]):e._e(),e._v(" "),2==e.list.rechargeType?t("span",[e._v(e._s(parseInt(e.list.money)/100))]):e._e()])]),e._v(" "),t("tr",{directives:[{name:"show",rawName:"v-show",value:1==e.list.rechargeType,expression:"list.rechargeType==1"}]},[t("td",[e._v("售价：")]),t("td",[e._v(e._s(parseInt(e.list.price)/100))])]),e._v(" "),t("tr",[t("td",[e._v("支付金额：")]),t("td",[e._v(e._s(parseInt(e.list.payMoney)/100)),t("span",{staticStyle:{"margin-left":"0.2rem"}},[e._v("折扣："+e._s(parseFloat(e.list.discount)/1e3))])])]),e._v(" "),t("tr",[t("td",[e._v("充值号码：")]),t("td",[e._v(e._s(e.list.phone))])]),e._v(" "),t("tr",{directives:[{name:"show",rawName:"v-show",value:1==e.list.rechargeType,expression:"list.rechargeType==1"}]},[t("td",[e._v("所属省份：")]),t("td",[e._v(e._s(e.list.province))])]),e._v(" "),t("tr",[t("td",[e._v("运营商：")]),t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:1==e.list.isp,expression:"list.isp==1"}]},[e._v("移动")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:2==e.list.isp,expression:"list.isp==2"}]},[e._v("联通")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:3==e.list.isp,expression:"list.isp==3"}]},[e._v("电信")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:4==e.list.isp,expression:"list.isp==4"}]},[e._v("远特")])])]),e._v(" "),t("tr",{directives:[{name:"show",rawName:"v-show",value:1==e.list.rechargeType,expression:"list.rechargeType==1"}]},[t("td",[e._v("订单状态：")]),t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:1==e.list.orderStatus,expression:"list.orderStatus==1"}],staticClass:"f-c-yellow"},[e._v("待支付")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:2==e.list.orderStatus,expression:"list.orderStatus==2"}],staticClass:"f-c-red"},[e._v("支付失败")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:3==e.list.orderStatus,expression:"list.orderStatus==3"}],staticClass:"f-c-yellow"},[e._v("支付成功，待充值")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:4==e.list.orderStatus,expression:"list.orderStatus==4"}],staticClass:"f-c-red"},[e._v("充值失败")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:5==e.list.orderStatus,expression:"list.orderStatus==5"}],staticClass:"f-c-green"},[e._v("充值成功")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:6==e.list.orderStatus,expression:"list.orderStatus==6"}],staticClass:"f-c-red"},[e._v("已关闭")])])]),e._v(" "),t("tr",{directives:[{name:"show",rawName:"v-show",value:2==e.list.rechargeType,expression:"list.rechargeType==2"}]},[t("td",[e._v("订单状态：")]),t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:1==e.list.orderStatus,expression:"list.orderStatus==1"}],staticClass:"f-c-green"},[e._v("成功")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:2==e.list.orderStatus,expression:"list.orderStatus==2"}],staticClass:"f-c-red"},[e._v("失败")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:0==e.list.orderStatus,expression:"list.orderStatus==0"}],staticClass:"f-c-yellow"},[e._v("进行中")])])]),e._v(" "),t("tr",[t("td",[e._v("订单描述：")]),t("td",[e._v(e._s(e.list.errMsg))])])])])])])])])])])},l=[],v={render:c,staticRenderFns:l},p=v,m=t("Z0/y"),d=a,u=m(n,p,!1,d,"data-v-068e56a3",null),f=u.exports;t("Ue0x"),t("V+BO");var _={data:function(){return{off:{isLoad:0,details:0,number:""},form:{isp:0,rechargeType:1,payType:0,context1:"",context2:"",context3:"",context4:0,startTime:"",endTime:"",select:4},list:"",detailsData:"",total:0,pageNum:1,pageSize:10,maxpage:1,callback:Function}},components:{"my-page":o.a,"list-details":f},created:function(){this.init()},methods:{init:function(){var e=this;e.form.startTime=laydate.now(0,"YYYY-MM-DD 00:00:00"),e.form.endTime=laydate.now(0,"YYYY-MM-DD 23:59:59")},searchList:function(e){var s=this,t=s.form.select,a="A.create_time BETWEEN "+Object(i.e)(s.form.startTime)+" AND "+Object(i.e)(s.form.endTime),o={pageSize:s.pageSize,pageNum:e||1,params:[]},n=s.form["context"+s.form.select];return 1!=t||n?2==t&&11!=n.length?(layer.open({content:"手机号码格式错误",skin:"msg",time:2,msgSkin:"error"}),!1):3!=t||n?(1==t?a+=' AND A.sys_order_id="'+n+'"':2==t?a+=' AND A.info_phone="'+n+'"':3==t?a+=' AND A.user_id="'+n+'"':4==t&&0!=n&&(1==s.form.rechargeType?1==n?a+=" AND A.order_status=5":2==n?a+=" AND (A.order_status=2 OR A.order_status=4)":3==n?a+=" AND (A.order_status=1 OR A.order_status=3)":4==n&&(a+=" AND A.order_status=6"):2==s.form.rechargeType&&(3==n&&(n=0),a+=" AND A.recharge_status="+n)),0!=s.form.payType&&(a+=" AND A.pay_type="+s.form.payType),1==s.form.rechargeType?(o.opKey="order.rechargeFlow.list",0!=s.form.isp&&(a+=" AND A.info_isp="+s.form.isp)):2==s.form.rechargeType&&(o.opKey="order.rechargePhone.list"),o.params.push(a),!s.off.isLoad&&(s.off.isLoad=!0,void Object(r.reqCommonMethod)(o,function(){s.off.isLoad=!1},"km-ecs/w/handler/query").then(function(t){s.list=t.data.list,s.total=t.data.total,s.maxpage=Math.ceil(parseInt(t.data.total)/10),s.pageNum=e||1,s.callback=function(e){s.searchList(e)}}).catch(function(){s.off.isLoad=!1}))):(layer.open({content:"请输入操作者工号",skin:"msg",time:2,msgSkin:"error"}),!1):(layer.open({content:"请输入订单号码",skin:"msg",time:2,msgSkin:"error"}),!1)},details:function(e){var s=this,t=e.target.name,a={pageSize:"10",pageNum:"-1",params:['A.sys_order_id="'+t+'"']};if(1==s.form.rechargeType?a.opKey="order.rechargeFlow.details":2==s.form.rechargeType&&(a.opKey="order.rechargePhone.details"),s.off.isLoad)return!1;s.off.isLoad=!0,Object(r.reqCommonMethod)(a,function(){s.off.isLoad=!1},"km-ecs/w/handler/query").then(function(e){s.detailsData=e.data.list[0],s.off.details=!0}).catch(function(){s.off.isLoad=!1})},ispShiftClick:function(){var e=this;setTimeout(function(){1==e.form.rechargeType?e.form.isp=0:2==e.form.rechargeType&&(e.form.isp=4)},300)},to_laydate:function(e){var s=this;laydate({istime:!0,format:"YYYY-MM-DD hh:mm:ss",isclear:!1,choose:function(t){1==e?s.form.startTime=t:s.form.endTime=t}})},topShiftClick:function(){this.list=""},getDateTime:function(e){return Object(i.c)(e)}}},h=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("section",{staticClass:"g-search-menu"},[t("div",{class:{active:e.off.details},attrs:{id:"search"}},[t("header",{staticClass:"m-scroll-bar animated infinite",class:{active:e.off.isLoad}}),e._v(" "),e.off.details?e._e():t("section",[t("div",{staticClass:"g-search-form"},[e._m(0),e._v(" "),t("section",{staticClass:"form-c"},[t("div",{staticClass:"row"},[t("span",{staticClass:"dp"},[e._v("充值类型：")]),e._v(" "),t("div",{staticClass:"m-form-radio"},[t("label",{on:{click:e.ispShiftClick}},[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.rechargeType,expression:"form.rechargeType"}],attrs:{value:"1",type:"radio"},domProps:{checked:e._q(e.form.rechargeType,"1")},on:{change:function(s){e.$set(e.form,"rechargeType","1")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("流量")])]),e._v(" "),t("label",{on:{click:e.ispShiftClick}},[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.rechargeType,expression:"form.rechargeType"}],attrs:{value:"2",type:"radio"},domProps:{checked:e._q(e.form.rechargeType,"2")},on:{change:function(s){e.$set(e.form,"rechargeType","2")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("话费")])])])]),e._v(" "),t("div",{staticClass:"row"},[e._m(1),e._v(" "),t("div",{staticClass:"m-form-radio"},[t("label",{directives:[{name:"show",rawName:"v-show",value:1==e.form.rechargeType,expression:"form.rechargeType==1"}]},[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.isp,expression:"form.isp"}],attrs:{type:"radio",value:"0"},domProps:{checked:e._q(e.form.isp,"0")},on:{change:function(s){e.$set(e.form,"isp","0")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("全部")])]),e._v(" "),t("label",{directives:[{name:"show",rawName:"v-show",value:2==e.form.rechargeType,expression:"form.rechargeType==2"}]},[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.isp,expression:"form.isp"}],attrs:{type:"radio",value:"4"},domProps:{checked:e._q(e.form.isp,"4")},on:{change:function(s){e.$set(e.form,"isp","4")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("远特")])]),e._v(" "),t("label",{directives:[{name:"show",rawName:"v-show",value:1==e.form.rechargeType,expression:"form.rechargeType==1"}]},[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.isp,expression:"form.isp"}],attrs:{type:"radio",value:"1"},domProps:{checked:e._q(e.form.isp,"1")},on:{change:function(s){e.$set(e.form,"isp","1")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("移动")])]),e._v(" "),t("label",{directives:[{name:"show",rawName:"v-show",value:1==e.form.rechargeType,expression:"form.rechargeType==1"}]},[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.isp,expression:"form.isp"}],attrs:{type:"radio",value:"2"},domProps:{checked:e._q(e.form.isp,"2")},on:{change:function(s){e.$set(e.form,"isp","2")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("联通")])]),e._v(" "),t("label",{directives:[{name:"show",rawName:"v-show",value:1==e.form.rechargeType,expression:"form.rechargeType==1"}]},[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.isp,expression:"form.isp"}],attrs:{type:"radio",value:"3"},domProps:{checked:e._q(e.form.isp,"3")},on:{change:function(s){e.$set(e.form,"isp","3")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("电信")])])])]),e._v(" "),t("div",{staticClass:"row"},[t("span",{staticClass:"dp"},[e._v("时间区间：")]),e._v(" "),t("div",{staticClass:"f-inline-block"},[t("span",{staticClass:"m-time-area"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.startTime,expression:"form.startTime"}],attrs:{type:"text",readonly:"readonly"},domProps:{value:e.form.startTime},on:{click:function(s){e.to_laydate(1)},input:function(s){s.target.composing||e.$set(e.form,"startTime",s.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.endTime,expression:"form.endTime"}],attrs:{type:"text",readonly:"readonly"},domProps:{value:e.form.endTime},on:{click:function(s){e.to_laydate(2)},input:function(s){s.target.composing||e.$set(e.form,"endTime",s.target.value)}}})])])]),e._v(" "),t("div",{staticClass:"row"},[t("span",{staticClass:"dp"},[e._v("支付方式：")]),e._v(" "),t("div",{staticClass:"m-form-radio"},[t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.payType,expression:"form.payType"}],attrs:{type:"radio",value:"0"},domProps:{checked:e._q(e.form.payType,"0")},on:{change:function(s){e.$set(e.form,"payType","0")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("全部")])]),e._v(" "),t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.payType,expression:"form.payType"}],attrs:{type:"radio",value:"1"},domProps:{checked:e._q(e.form.payType,"1")},on:{change:function(s){e.$set(e.form,"payType","1")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("远特账户")])]),e._v(" "),t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.payType,expression:"form.payType"}],attrs:{type:"radio",value:"2"},domProps:{checked:e._q(e.form.payType,"2")},on:{change:function(s){e.$set(e.form,"payType","2")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("微信")])]),e._v(" "),t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.payType,expression:"form.payType"}],attrs:{type:"radio",value:"3"},domProps:{checked:e._q(e.form.payType,"3")},on:{change:function(s){e.$set(e.form,"payType","3")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("支付宝")])])])])]),e._v(" "),t("section",{staticClass:"form-c o-no-bgc"},[t("div",{staticClass:"row",class:{active:1==e.form.select}},[t("span",{staticClass:"m-form-radio"},[t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.select,expression:"form.select"}],attrs:{type:"radio",value:"1"},domProps:{checked:e._q(e.form.select,"1")},on:{change:function(s){e.$set(e.form,"select","1")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("订单号码：")])])]),e._v(" "),t("div",{staticClass:"input-box"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.context1,expression:"form.context1"}],attrs:{readonly:1!=e.form.select,maxlength:"32",type:"tel",placeholder:"请输入查询的订单号码"},domProps:{value:e.form.context1},on:{input:function(s){s.target.composing||e.$set(e.form,"context1",s.target.value)}}})])]),e._v(" "),t("div",{staticClass:"row",class:{active:2==e.form.select}},[t("span",{staticClass:"m-form-radio"},[t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.select,expression:"form.select"}],attrs:{type:"radio",value:"2"},domProps:{checked:e._q(e.form.select,"2")},on:{change:function(s){e.$set(e.form,"select","2")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("充值号码：")])])]),e._v(" "),t("div",{staticClass:"input-box"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.context2,expression:"form.context2"}],attrs:{readonly:2!=e.form.select,maxlength:"11",type:"tel",placeholder:"请输入查询的充值号码"},domProps:{value:e.form.context2},on:{input:function(s){s.target.composing||e.$set(e.form,"context2",s.target.value)}}})])]),e._v(" "),t("div",{staticClass:"row",class:{active:3==e.form.select}},[t("span",{staticClass:"m-form-radio"},[t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.select,expression:"form.select"}],attrs:{type:"radio",value:"3"},domProps:{checked:e._q(e.form.select,"3")},on:{change:function(s){e.$set(e.form,"select","3")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("操作者工号：")])])]),e._v(" "),t("div",{staticClass:"input-box"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.context3,expression:"form.context3"}],attrs:{readonly:3!=e.form.select,maxlength:"16",type:"tel",placeholder:"请输入查询的操作者工号"},domProps:{value:e.form.context3},on:{input:function(s){s.target.composing||e.$set(e.form,"context3",s.target.value)}}})])]),e._v(" "),t("div",{staticClass:"row fullRow",class:{active:4==e.form.select}},[t("span",{staticClass:"m-form-radio"},[t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.select,expression:"form.select"}],attrs:{type:"radio",value:"4",readonly:4!=e.form.select},domProps:{checked:e._q(e.form.select,"4")},on:{change:function(s){e.$set(e.form,"select","4")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("订单状态：")])])]),e._v(" "),t("div",{staticClass:"m-form-radio col-radio"},[t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.context4,expression:"form.context4"}],attrs:{type:"radio",value:"0"},domProps:{checked:e._q(e.form.context4,"0")},on:{change:function(s){e.$set(e.form,"context4","0")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("全部")])]),e._v(" "),t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.context4,expression:"form.context4"}],attrs:{type:"radio",value:"1"},domProps:{checked:e._q(e.form.context4,"1")},on:{change:function(s){e.$set(e.form,"context4","1")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("成功")])]),e._v(" "),t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.context4,expression:"form.context4"}],attrs:{type:"radio",value:"2"},domProps:{checked:e._q(e.form.context4,"2")},on:{change:function(s){e.$set(e.form,"context4","2")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("失败")])]),e._v(" "),t("label",[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.context4,expression:"form.context4"}],attrs:{type:"radio",value:"3"},domProps:{checked:e._q(e.form.context4,"3")},on:{change:function(s){e.$set(e.form,"context4","3")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("进行中")])]),e._v(" "),t("label",{directives:[{name:"show",rawName:"v-show",value:1==e.form.rechargeType,expression:"form.rechargeType==1"}]},[t("span",{staticClass:"radio"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.context4,expression:"form.context4"}],attrs:{type:"radio",value:"4"},domProps:{checked:e._q(e.form.context4,"4")},on:{change:function(s){e.$set(e.form,"context4","4")}}}),t("span")]),t("span",{staticClass:"text"},[e._v("已关闭")])])])]),e._v(" "),t("button",{staticClass:"f-btn f-btn-line",on:{click:function(s){e.searchList()}}},[e._v("查询")])])]),e._v(" "),e.list?t("div",{staticClass:"m-total-table"},[t("div",{staticClass:"total-head"},[e._v("统计结果"),t("b",[e._v(e._s(e.total))])]),e._v(" "),t("table",[e._m(2),e._v(" "),t("tbody",e._l(e.list,function(s,a){return t("tr",[t("td",[e._v(e._s(10*(e.pageNum-1)+(a+1)))]),e._v(" "),t("td",[e._v(e._s(s.orderId))]),e._v(" "),t("td",[e._v(e._s(s.phone))]),e._v(" "),t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:2==s.rechargeType,expression:"todo.rechargeType==2"}]},[e._v(e._s(parseFloat(s.money)/100))]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:1==s.rechargeType,expression:"todo.rechargeType==1"}]},[e._v(e._s(s.flowNum+s.flowUnit))])]),e._v(" "),t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:1==s.isp,expression:"todo.isp==1"}]},[e._v("移动")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:2==s.isp,expression:"todo.isp==2"}]},[e._v("联通")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:3==s.isp,expression:"todo.isp==3"}]},[e._v("电信")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:4==s.isp,expression:"todo.isp==4"}]},[e._v("远特")])]),e._v(" "),t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:1==s.payType,expression:"todo.payType==1"}],staticClass:"u-icon-yuantelrecharge"}),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:2==s.payType,expression:"todo.payType==2"}],staticClass:"u-icon-wechat"}),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:3==s.payType,expression:"todo.payType==3"}],staticClass:"u-icon-alipay"})]),e._v(" "),t("td",[e._v(e._s(e.getDateTime(s.rechargeTime)[6]))]),e._v(" "),t("td",[e._v(e._s(s.userId)),t("br"),e._v("（"+e._s(s.userName)+"）")]),e._v(" "),1==s.rechargeType?t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:1==s.orderStatus||3==s.orderStatus,expression:"todo.orderStatus==1||todo.orderStatus==3"}],staticClass:"f-c-yellow"},[e._v("进行中")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:2==s.orderStatus||4==s.orderStatus,expression:"todo.orderStatus==2||todo.orderStatus==4"}],staticClass:"f-c-red"},[e._v("失败")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:5==s.orderStatus,expression:"todo.orderStatus==5"}],staticClass:"f-c-green"},[e._v("成功")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:6==s.orderStatus,expression:"todo.orderStatus==6"}],staticClass:"f-c-red"},[e._v("已关闭")])]):e._e(),e._v(" "),2==s.rechargeType?t("td",[t("span",{directives:[{name:"show",rawName:"v-show",value:0==s.orderStatus,expression:"todo.orderStatus==0"}],staticClass:"f-c-yellow"},[e._v("进行中")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:2==s.orderStatus,expression:"todo.orderStatus==2"}],staticClass:"f-c-red"},[e._v("失败")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:1==s.orderStatus,expression:"todo.orderStatus==1"}],staticClass:"f-c-green"},[e._v("成功")])]):e._e(),e._v(" "),t("td",[t("a",{staticClass:"details",attrs:{name:s.orderId,href:"javascript:void(0)"},on:{click:e.details}},[e._v("详情")])])])}))]),e._v(" "),t("my-page",{attrs:{page:e.pageNum,maxpage:e.maxpage,callback:e.callback}})],1):e._e()]),e._v(" "),e.off.details?t("list-details",{attrs:{list:e.detailsData,number:e.off.number}}):e._e()],1)])},w=[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"m-tag"},[t("b"),e._v("条件查询")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("span",{staticClass:"dp"},[t("i",{staticClass:"m-one-font"}),e._v("运营商：")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("thead",[t("tr",[t("th",[e._v("序号")]),e._v(" "),t("th",[e._v("订单号")]),e._v(" "),t("th",[e._v("充值号码")]),e._v(" "),t("th",[e._v("充值面额")]),e._v(" "),t("th",[e._v("运营商")]),e._v(" "),t("th",[e._v("支付方式")]),e._v(" "),t("th",[e._v("充值时间")]),e._v(" "),t("th",[e._v("操作人")]),e._v(" "),t("th",[e._v("订单状态")]),e._v(" "),t("th",{staticClass:"hasBtn"})])])}],y={render:h,staticRenderFns:w},x=y,g=t("Z0/y"),T=g(_,x,!1,null,null,null);s.default=T.exports},KfXA:function(e,s,t){s=e.exports=t("XLS9")(!1),s.push([e.i,"\n\n",""])}});
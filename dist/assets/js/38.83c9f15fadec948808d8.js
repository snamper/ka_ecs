webpackJsonp([38],{wrRc:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("4YfN"),i=s.n(e),n=s("9rMa"),v={name:"audit",data:function(){return{off:{source:4,auditType:1}}},created:function(){this.setType()},watch:{$route:"setType"},computed:i()({},Object(n.d)(["auditCount"])),methods:{setType:function(){var t=this.$route;"realtime"==t.params.source?(this.off.auditType=0,this.off.source=4):"afterwards"==t.params.source&&(this.off.auditType=1,this.off.source=4),(t.path.indexOf("realtime/")>-1||t.path.indexOf("afterwards/")>-1)&&(this.off.source=0)}}},r=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("section",{staticClass:"g-audit-menu"},[4==t.off.source&&0==t.off.auditType?s("div",{staticClass:"g-audit-menu-c"},[s("div",{staticClass:"m-menu-div"},[s("router-link",{staticClass:"u-bg navBg1",attrs:{to:{name:"realtime",params:{type:6}}}},[s("div",[t._v("卡盟APP订单")]),s("p",[s("span",[t._v("点击审核")])])]),t._v(" "),s("div",{staticClass:"navInfoDiv"},[s("p",[t._v("待审核"),s("span",[t._v(t._s(t.auditCount.opencard))])]),s("p",[t._v("已分配"),s("span",[t._v(t._s(t.auditCount.opencard_))])])])],1),t._v(" "),s("div",{staticClass:"m-menu-div"},[s("router-link",{staticClass:"u-bg navBg9",attrs:{to:{name:"realtime",params:{type:8}}}},[s("div",[t._v("卡盟SDK订单")]),s("p",[s("span",[t._v("点击审核")])])]),t._v(" "),s("div",{staticClass:"navInfoDiv"},[s("p",[t._v("待审核"),s("span",[t._v(t._s(t.auditCount.sdkRealTime))])]),s("p",[t._v("已分配"),s("span",[t._v(t._s(t.auditCount.sdkRealTime_))])])])],1),t._v(" "),s("div",{staticClass:"m-menu-div"},[s("router-link",{staticClass:"u-bg navBg5",attrs:{to:{name:"realtime",params:{type:7}}}},[s("div",[t._v("过户办理")]),s("p",[s("span",[t._v("点击审核")])])]),t._v(" "),s("div",{staticClass:"navInfoDiv"},[s("p",[t._v("待审核"),s("span",[t._v(t._s(t.auditCount.transfer))])]),s("p",[t._v("已分配"),s("span",[t._v(t._s(t.auditCount.transfer_))])])])],1)]):t._e(),t._v(" "),4==t.off.source&&1==t.off.auditType?s("div",{staticClass:"g-audit-menu-c"},[s("div",{staticClass:"m-menu-div"},[s("router-link",{staticClass:"u-bg navBg1",attrs:{to:{name:"afterwards",params:{type:6}}}},[s("div",[t._v("卡盟APP订单")]),s("p",[s("span",[t._v("点击审核")])])]),t._v(" "),s("div",{staticClass:"navInfoDiv"},[s("p",[t._v("待审核"),s("span",[t._v(t._s(t.auditCount.opencardAfterwards))])]),s("p",[t._v("已分配"),s("span",[t._v(t._s(t.auditCount.opencard_Afterwards))])])])],1),t._v(" "),s("div",{staticClass:"m-menu-div"},[s("router-link",{staticClass:"u-bg navBg11",attrs:{to:{name:"afterwards",params:{type:9}}}},[s("div",[t._v("卡盟通服订单")]),s("p",[s("span",[t._v("点击审核")])])]),t._v(" "),s("div",{staticClass:"navInfoDiv"},[s("p",[t._v("待审核"),s("span",[t._v(t._s(t.auditCount.tfOpenCard))])]),s("p",[t._v("已分配"),s("span",[t._v(t._s(t.auditCount.tfOpenCard_))])])])],1)]):t._e(),t._v(" "),s("router-view")],1)},u=[],d={render:r,staticRenderFns:u},o=d,p=s("Z0/y"),_=p(v,o,!1,null,null,null);a.default=_.exports}});
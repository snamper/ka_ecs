webpackJsonp([16],{"4BRY":function(e,t,n){"use strict";function o(e){n("h6jt")}Object.defineProperty(t,"__esModule",{value:!0});var s={data:function(){return{off:{isLoad:!1},form:{phone:""},phoneList:{}}},created:function(){},methods:{searchPhone:function(){var e=this;return!e.off.isLoad&&(e.phoneList={},e.form.phone?(e.off.isLoad=!0,void e.AJAX("w/frozen/getPhone",{phone:e.form.phone},function(t){e.phoneList=t.data},function(){e.off.isLoad=!1})):(layer.open({content:"请输入查询的号码",skin:"msg",time:2,msgSkin:"error"}),!1))},phoneRelease:function(){var e=this;if(e.off.isLoad)return!1;e.off.isLoad=!0,e.AJAX("w/frozen/phoneThaw",{phone:e.form.phone,type:0},function(t){layer.open({content:"解冻成功",skin:"msg",time:4,msgSkin:"success"}),e.searchPhone()},function(){e.off.isLoad=!1})},phoneOccupy:function(){var e=this;if(e.off.isLoad)return!1;e.off.isLoad=!0,e.AJAX("w/frozen/phoneThaw",{phone:e.form.phone,type:1},function(t){layer.open({content:"占用成功",skin:"msg",time:4,msgSkin:"success"}),e.searchPhone()},function(){e.off.isLoad=!1})}}},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{padding:"15px"}},[n("header",{staticClass:"m-scroll-bar animated infinite",class:{active:e.off.isLoad}}),e._v(" "),n("div",{staticClass:"m-input-button o-input-button"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.phone,expression:"form.phone"}],attrs:{maxlength:"11",type:"tel",placeholder:"请输入查询的手机号码"},domProps:{value:e.form.phone},on:{input:function(t){t.target.composing||e.$set(e.form,"phone",t.target.value)}}}),n("button",{on:{click:e.searchPhone}},[e._v("查询")])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.phoneList.occupancy,expression:"phoneList.occupancy"}],staticClass:"m-total-table"},[n("table",[e._m(0),e._v(" "),n("tbody",[n("tr",[n("td"),e._v(" "),n("td",[e._v("\n\t\t\t\t\t\t"+e._s(e.form.phone)+"\n\t\t\t\t\t")]),e._v(" "),n("td",[n("span",{directives:[{name:"show",rawName:"v-show",value:0==e.phoneList.occupancy,expression:"phoneList.occupancy==0"}],staticClass:"f-c-green"},[e._v("可售")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:1==e.phoneList.occupancy,expression:"phoneList.occupancy==1"}],staticClass:"f-c-red"},[e._v("被占用中")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:2==e.phoneList.occupancy,expression:"phoneList.occupancy==2"}],staticClass:"f-c-grey"},[e._v("已售")])]),e._v(" "),n("td",[n("span",{directives:[{name:"show",rawName:"v-show",value:1==e.phoneList.pretty,expression:"phoneList.pretty==1"}],staticClass:"f-c-yellow"},[e._v("靓号")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:2==e.phoneList.pretty,expression:"phoneList.pretty==2"}],staticClass:"f-c-grey"},[e._v("普号")])]),e._v(" "),n("td",[n("a",{directives:[{name:"show",rawName:"v-show",value:0!=e.phoneList.occupancy,expression:"phoneList.occupancy!=0"}],staticClass:"details",attrs:{href:"javascript:void(0)"},on:{click:e.phoneRelease}},[e._v("解冻")]),e._v(" "),n("a",{directives:[{name:"show",rawName:"v-show",value:0==e.phoneList.occupancy,expression:"phoneList.occupancy==0"}],staticClass:"details",attrs:{href:"javascript:void(0)"},on:{click:e.phoneOccupy}},[e._v("占用")])])])])])])])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("thead",[n("tr",[n("th"),e._v(" "),n("th",[e._v("号码")]),e._v(" "),n("th",[e._v("状态")]),e._v(" "),n("th",[e._v("等级")]),e._v(" "),n("th")])])}],c={render:a,staticRenderFns:i},r=c,p=n("X4nt"),h=o,v=p(s,r,!1,h,"data-v-4869f942",null);t.default=v.exports},h6jt:function(e,t,n){var o=n("z3kb");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n("mY/K")("0cea66c6",o,!0,null)},z3kb:function(e,t,n){t=e.exports=n("I71c")(!1),t.push([e.i,"\n.m-total-table[data-v-4869f942]{margin-top: 0.2rem;\n}\n@media screen and (min-width: 961px){\n.o-input-button[data-v-4869f942]{\r\n\t\twidth: 500px\n}\n}\r\n",""])}});
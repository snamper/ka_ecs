<!--**
  *@info 审核子模块-开卡子模块
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<style scoped>
#auditList {
  width: 100%;
  height: 100%;
  position: relative;
}
.supIcon {
  color: #ff961e;
}
</style>
<template>
  <div id="auditList">
    <section class="g-list-box" v-if="auditData">
      <header class="g-lis-head">
        <div class="m-has-db">审核状态：<span><b>{{off.auditIndex}}</b>/<i>{{list.length}}</i></span>
        </div>
        <div class="m-time-down">审核计时：<span class="f-c-red">{{off.time}}</span>
        </div>
        <div class="m-foot-btn">
          <a class="f-btn f-btn-success" @click="agree">同意</a>
          <a class="f-btn f-btn-danger" @click="refuse">拒绝</a>
        </div>
      </header>
      <div class="g-box">
        <table class="g-list-table">
          <tbody v-if="off.itemType!=1&&off.itemType!=2">
            <tr>
              <td>
                <table class="g-inner-table">
                  <tbody>
                    <tr>
                      <td>订单号码：</td>
                      <td>
                        <span>{{auditData.orderId}}</span>
                        <b v-show="auditData.deviceType == 1">（远特i卡）</b>
                        <b v-show="auditData.deviceType == 2">（远特eSIM）</b>
                        <b v-show="auditData.deviceType == 4">（eSIM助手）</b>
                        <b v-show="auditData.deviceType == 5">（国星卡）</b>
                      </td>
                    </tr>
                    <tr>
                      <td>生成时间：</td>
                      <td>{{getDateTime(auditData.createTime)[6]}}</td>
                    </tr>
                    <tr v-show="off.itemType=='4,5,6'">
                      <td>完工时间：</td>
                      <td>{{auditData.getResultTime==0? '--' : getDateTime(auditData.getResultTime)[6]}}</td>
                    </tr>
                    <tr>
                      <td>审核方式：</td>
                      <td>
                        <span v-show="auditData.auditType==0">实时审核</span>
                        <span v-show="auditData.auditType==1">事后审核</span>
                        <a v-if="off.itemType=='4,5,6'||off.itemType=='8'||off.itemType=='9'" href="javascript:void(0)"
                          @click="autoAuditInfo" class="details m-l">查看详情</a>
                      </td>
                    </tr>
                    <tr>
                      <td>电话号码：</td>
                      <td>
                        <span>{{ auditData.phone }}</span>
                        <span v-if="auditData.isMonopoly==1" class="supIcon">【专营号】</span>
                        <span class="f-c-purple" v-if="auditData.cardType==1">远特</span>
                        <span class="f-c-yellow" v-if="auditData.cardType==2">联通</span>
                      </td>
                    </tr>
                    <tr>
                      <td>归属地：</td>
                      <td>{{ auditData.cityName||'--'}}</td>
                    </tr>
                    <tr>
                      <td>ICCID：</td>
                      <td>{{ auditData.iccid ||'--'}}</td>
                    </tr>
                    <tr v-show="off.itemType!=8&&off.itemType!=9">
                      <td>IMEI：</td>
                      <td>{{ auditData.IMEI ||'--'}}</td>
                    </tr>
                    <tr v-show="off.itemType==9">
                      <td>appId：</td>
                      <td>{{ auditData.appId ||'--'}}</td>
                    </tr>

                    <tr>
                      <td>证件类型：</td>
                      <td v-if="off.itemType!=9">
                        {{translateData(2,auditData.papersType)}}
                      </td>
                      <td v-else>身份证</td>
                    </tr>
                    <tr v-show="off.itemType==7">
                      <td>原机主姓名：</td>
                      <td>{{auditData.userNameOld}}</td>
                    </tr>
                    <tr>
                      <td>用户姓名：</td>
                      <td>{{auditData.userName}}</td>
                    </tr>
                    <tr>
                      <td>证件号码：</td>
                      <td>{{ auditData.papersCode }}</td>
                    </tr>
                    <tr v-show="off.itemType==7">
                      <td>原机主证件号码：</td>
                      <td>{{auditData.papersCodeOld}}</td>
                    </tr>
                    <tr>
                      <td>证件地址：</td>
                      <td>{{ auditData.userAddress }}</td>
                    </tr>
                    <tr v-show="off.itemType==7">
                      <td>原机主证件地址：</td>
                      <td>{{auditData.userAddressOld}}</td>
                    </tr>
                    <tr>
                      <td>证件期限：</td>
                      <td>{{ auditData.validityPeriod }}</td>
                    </tr>
                    <tr>
                      <td>活体识别相似度：</td>
                      <td>{{ auditData.similarity }}%</td>
                    </tr>
                    <tr>
                      <td>终端类型：</td>
                      <td>
                        <span v-if="auditData.terminalType==1">ios</span>
                        <span v-else-if="auditData.terminalType==2">android</span>
                        <span v-else>{{ auditData.terminalType }}</span>
                      </td>
                    </tr>
                    <tr v-show="off.itemType!=8&&off.itemType!=9">
                      <td>Mac地址：</td>
                      <td>{{ auditData.devMacAddr ||'--'}}</td>
                    </tr>
                    <tr v-show="off.itemType!=8&&off.itemType!=9">
                      <td>识别仪名称：</td>
                      <td>{{ auditData.devSN }}</td>
                    </tr>
                    <tr v-show="off.itemType!=8&&off.itemType!=9">
                      <td>操作人：</td>
                      <td>{{ auditData.operatorName }}【ID：{{ auditData.operator }}】</td>
                    </tr>

                    <tr v-show="off.itemType!=8">
                      <td>操作人IP：</td>
                      <td>{{ auditData.host ||'--'}}</td>
                    </tr>
                    <tr v-show="off.itemType!=8">
                      <td>操作人GPS：</td>
                      <td>{{ auditData.longitude ||'--'}} , {{ auditData.latitude ||'--'}}</td>
                    </tr>
                    <tr v-show="off.itemType!=8&&off.itemType!=9">
                      <td>商户名称：</td>
                      <td>
                        <span>{{ auditData.companyName }}</span>
                        <span>【信用等级：{{auditData.levelName}}】</span>
                      </td>
                    </tr>
                    <tr v-if="off.itemType == '4,5,6'">
                      <td>号卡分类：</td>
                      <td>{{translateData(10,auditData.monopolyType)}}</td>
                    </tr>
                    <tr v-if="off.itemType == '4,5,6'">
                      <td>号卡类型：</td>
                      <td>{{translateData(14,auditData.operatorType)}}</td>
                    </tr>
                    <tr>
                      <td>开卡方式：</td>
                      <td>{{translateData(15,auditData.appType)}}</td>
                    </tr>
                    <tr v-if="off.itemType == '4,5,6'">
                      <td>预存补差价：</td>
                      <td>{{translateData('money',auditData.prodRecords.diffPrestore)}}元</td>
                    </tr>
                    <tr v-if="off.itemType == '4,5,6'">
                      <td>账户抵扣：</td>
                      <td>{{translateData('money',auditData.prodRecords.deductionMoney)}}元</td>
                    </tr>
                    <tr v-if="off.itemType == '4,5,6'">
                      <td>实付金额：</td>
                      <td>{{translateData('money',auditData.prodRecords.actualMoney/100)}}元</td>
                    </tr>
                    <tr v-if="(off.itemType=='4,5,6'&&auditData.monopolyType==1)||(off.itemType=='4,5,6'&&auditData.monopolyType==2)">
                      <td>初始信息：</td>
                      <td>可选包：{{auditData.prodRecords.primalyOptPkg||'--'}}；
                        套餐：{{auditData.prodRecords.primalyPkg||'--'}}；
                        预存：{{translateData('money',auditData.prodRecords.primalyPrestore)}}元
                      </td>
                    </tr>
                    <tr v-if="(off.itemType=='4,5,6'&&auditData.monopolyType==1)||(off.itemType=='4,5,6'&&auditData.monopolyType==2)">
                      <td>制卡信息：</td>
                      <td>可选包：{{auditData.prodRecords.makeOptPkg||'--'}}；
                        套餐：{{auditData.prodRecords.makePkg||'--'}}；
                        预存：{{translateData('money',auditData.prodRecords.makePrestore)}}元
                      </td>
                    <tr>
                      <td>制卡方式：</td>
                      <td>
                        {{translateData(19,auditData.makeSource)}}
                      </td>
                    </tr>
                    <tr v-if="(off.itemType=='4,5,6'&&auditData.monopolyType==1)||(off.itemType=='4,5,6'&&auditData.monopolyType==2)">
                      <td>首充金额：</td>
                      <td>{{translateData('money',auditData.prodRecords.firstCharge)}}元</td>
                    </tr>
                    <tr v-if="(off.itemType=='4,5,6'&&auditData.monopolyType==1)||(off.itemType=='4,5,6'&&auditData.monopolyType==2)">
                      <td>首充金额折扣：</td>
                      <td>{{auditData.prodRecords.firstChargeDiscount/1000}}折</td>
                    </tr>
                    <tr v-if="(off.itemType=='4,5,6'&&auditData.monopolyType==1)||(off.itemType=='4,5,6'&&auditData.monopolyType==2)">
                      <td>首充实际支付：</td>
                      <td>{{translateData('money',auditData.prodRecords.firstChargeActual/100)}}元</td>
                    </tr>
                    <tr v-if="off.itemType == '4,5,6'">
                      <td>短信校验：</td>
                      <td>{{translateData(16,auditData.safeType)}}</td>
                    </tr>
                    <tr v-if="off.itemType == 9">
                      <td>操作类型：</td>
                      <td>{{translateData(17,auditData.bizType)}}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td class="m-box-img m-meida-640up">
                <ImgZoom :imgData="imgData"></ImgZoom>
              </td>
            </tr>
            <tr class="m-box-img m-meida-640down">
              <img v-for="(item,i) in imgData" :key="i" :src="item.src">
            </tr>
          </tbody>
          <!-- 实名补登 -->
          <RealTimeCollection v-if="off.itemType==1" :auditStatus="1" :auditData="auditData" :imgData="imgData"></RealTimeCollection>
          <!-- 补换卡 -->
          <RealNameRechCard v-if="off.itemType==2" :auditStatus="1" :auditData="auditData" :imgData="imgData"></RealNameRechCard>
        </table>
      </div>
    </section>
    <div class="m-refresh" v-if="!auditData">
      <span class="u-icon-refresh" :class="{rotate360:off.isLoad}"></span>
      <a @click="getAuditList">{{off.isLoad?'loading':'点击刷新'}}</a>
    </div>
  </div>
</template>
<script>
import "../../../assets/km/css/cardOrderDetails.css";
import "../../../assets/km/css/audit.css";
import {
  errorDeal,
  getDateTime,
  translateData,
  imgUrlDeal
} from "../../../config/utils.js";
import { reqCommonMethod } from "../../../config/service.js";
import RealTimeCollection from "../../../componentskm/audit/realTimeCollection";
import RealNameRechCard from "../../../componentskm/audit/realNameRechCard";
import ImgZoom from "../../../componentskm/ImgZoom";
export default {
  data() {
    return {
      off: {
        auditIndex: 0, //订单索引
        time: "00:00", //审核计时
        isLoad: 0, //是否ajax请求
        auditType: 1, //0,实时;1,事后;
        itemType: "4,5,6" //4,5,6业务订单；7 过户；8 SDK开卡；9 i卡；1 实名补录；2 补换卡；
      },
      timer: Number, //审核倒计时
      list: [], //分配的订单
      auditData: "", //当前处理的订单
      imgData: [], //当前订单的图片
      refuseArr: {} //拒绝原因
    };
  },
  components: {
    ImgZoom,
    RealTimeCollection,
    RealNameRechCard
  },
  beforeDestroy: function() {
    window.clearInterval(this.timer);
  },
  created: function() {
    var vm = this;
    vm.off.auditType = vm.$parent.off.auditType; //0,实时;1,事后;
    if (vm.$route.params.type === "auditing") {
      vm.off.itemType = "4,5,6";
    } else {
      vm.off.itemType = vm.$route.params.type; //6 业务订单；7 过户；8 SDK开卡；9 i卡开卡；1 实名补录；2 补换卡；
    }
    reqCommonMethod(
      { auditType: vm.off.auditType },
      function() {},
      "km-ecs/w/audit/getRefuseReasons"
    )
      .then(data => {
        vm.refuseArr = data.data;
      })
      .then(() => {
        vm.getAuditList();
      })
      .catch(error => errorDeal(error));
  },
  methods: {
    agree: function() {
      //审核同意
      let vm = this,
        auditType = vm.auditData.auditType,
        orderId = vm.auditData.orderId,
        url = "";
      let json = {
        orderId: orderId,
        result: 1,
        remark: "",
        reason: "",
        refuseReasonCode: "",
        auditType: auditType
      };
      if (vm.off.itemType == 8) {
        url = "km-ecs/w/sdk/auditOrder";
      } else if (vm.off.itemType == 9) {
        url = "km-ecs/w/tongfu/auditOrder";
      } else if (vm.off.itemType == 1 || vm.off.itemType == 2) {
        url = "km-ecs/w/audit/auditOfReinput";
        json.result = 2;
        json.phone = vm.auditData.phoneNumber;
        json.orderId = vm.auditData.sysOrderId;
      } else {
        url = "km-ecs/w/audit/audit";
      }
      reqCommonMethod(json, false, url)
        .then(data => {
          layer.open({
            content: data.msg,
            skin: "msg",
            time: 4,
            msgSkin: "success",
            success: function() {
              vm.dealAuditList();
            }
          });
        })
        .then(() => {
          if (vm.$route.params.type === "auditing") {
            vm.$parent.off.details = false;
            vm.$parent.off.searchlist = true;
            vm.$parent.off.auditDetails = false;
            reqCommonMethod(
              vm.$parent.requestlistData,
              function() {
                vm.$parent.off.isLoad = false;
              },
              vm.$parent.requestlistUrl
            )
              .then(data => {
                vm.$parent.list = data.data.list;
                vm.$parent.total = data.data.total;
                vm.$parent.maxpage = Math.ceil(parseInt(data.data.total) / 10);
                vm.$parent.pageNum = 1;
                vm.$parent.callback = function(v) {
                  vm.$parent.searchList(v);
                };
                vm.$parent.off.isLoad = false;
              })
              .catch(error => errorDeal(error));
          }
        })
        .catch(error => errorDeal(error));
    },
    refuse: function(obj) {
      //审核拒绝
      var str = "",
        vm = this,
        orderId = vm.auditData.orderId,
        popIndex,
        ww = window.innerWidth,
        wwSet,
        auditType = vm.auditData.auditType;
      for (let i = 0; i < vm.refuseArr.list.length; i++) {
        var b = "";
        if (vm.refuseArr.list[i].stopCard == 1) b = '<b class="f-c-red">★</b>';
        str += `<div class="checkbox-list">
                    <div class="m-form-checkbox">
                        <label>
                            <span class="checkbox">
                                <input type="checkbox" name="${i}">
                                <span></span>
                            </span>
                            <span class="text"><b class="f-c-red"></b>${vm
                              .refuseArr.list[i].info + b}</span>
                        </label>
                    </div>
                </div>`;
      }
      ww <= 640 ? (wwSet = "width:98%") : (wwSet = "max-width:645px");
      popIndex = layer.open({
        content: `<div class="f-scroll-lt lay-div-refuse f-tal" id="refuseList">${str}<div class="checkbox-list"><input maxlength="30" type="text" id="remarkInput" placeholder="请输入补充内容"></div></div>`,
        btn: ["确定", "取消"],
        type: 1,
        style: wwSet,
        title: [
          "选择拒绝理由",
          "color:#ffc333;text-align:left;padding-left:0.2rem;"
        ],
        yes: function() {
          var p = document.getElementsByTagName("input"),
            remark = "",
            stopCard = "0",
            refuseReasonCode = "",
            url = "",
            reason = "";
          for (let i = 0; i < p.length; i++) {
            if (p[i].nodeType == 1 && p[i].checked) {
              reason += vm.refuseArr.list[p[i].name].info + "|"; //拒绝原因
              refuseReasonCode += vm.refuseArr.list[p[i].name].code + ","; //拒绝原因code
              if (vm.refuseArr.list[p[i].name].stopCard == 1 && auditType == 1)
                stopCard = "1";
            }
          }
          reason = reason.substring(0, reason.length - 1);
          refuseReasonCode = refuseReasonCode.substring(
            0,
            refuseReasonCode.length - 1
          );
          remark = document.getElementById("remarkInput").value;
          if (remark == "" && reason == "") return false;
          let json = {
            orderId: orderId,
            result: 2,
            remark: remark,
            refuseReasonCode: refuseReasonCode,
            reason: reason,
            stopCard: stopCard,
            auditType: auditType
          };
          if (vm.off.itemType == 8) {
            url = "km-ecs/w/sdk/auditOrder";
          } else if (vm.off.itemType == 9) {
            url = "km-ecs/w/tongfu/auditOrder";
          } else if (vm.off.itemType == 1 || vm.off.itemType == 2) {
            url = "km-ecs/w/audit/auditOfReinput";
            json.result = 3;
            json.phone = vm.auditData.phoneNumber;
            json.orderId = vm.auditData.sysOrderId;
          } else {
            url = "km-ecs/w/audit/audit";
          }
          reqCommonMethod(json, false, url)
            .then(data => {
              layer.open({
                content: data.msg,
                skin: "msg",
                time: 4,
                msgSkin: "success",
                success: function() {
                  vm.dealAuditList();
                  layer.close(popIndex);
                }
              });
            })
            .then(() => {
              if (vm.$route.params.type === "auditing") {
                vm.$parent.off.details = false;
                vm.$parent.off.searchlist = true;
                vm.$parent.off.auditDetails = false;
                reqCommonMethod(
                  vm.$parent.requestlistData,
                  function() {
                    vm.$parent.off.isLoad = false;
                  },
                  vm.$parent.requestlistUrl
                )
                  .then(data => {
                    vm.$parent.list = data.data.list;
                    vm.$parent.total = data.data.total;
                    vm.$parent.maxpage = Math.ceil(
                      parseInt(data.data.total) / 10
                    );
                    vm.$parent.pageNum = 1;
                    vm.$parent.callback = function(v) {
                      vm.$parent.searchList(v);
                    };
                    vm.$parent.off.isLoad = false;
                  })
                  .catch(error => errorDeal(error));
              }
            })
            .catch(error => errorDeal(error));
        }
      });
    },
    autoAuditInfo() {
      //自动审核详情
      var vm = this,
        orderId = vm.auditData.orderId;
      if (vm.auditData.sysOrderId) {
        orderId = vm.auditData.sysOrderId;
      }
      const transferStyle = (i1, i2) => {
        if (i2.indexOf("成功") > -1) {
          return "fCGreen";
        } else if (i2.indexOf("失败") > -1) {
          return "fCRed";
        }
        if (i1.indexOf("审核结果") > -1) {
          if (i2.indexOf("同意") > -1) {
            return "fCGreen";
          } else if (i2.indexOf("拒绝") > -1) {
            return "fCRed";
          } else if (i2.indexOf("转人工") > -1) {
            return "fCBlue";
          }
        }
      };
      reqCommonMethod(
        { sysOrderId: orderId },
        false,
        "km-ecs/w/audit/autoAuditDesc"
      )
        .then(data => {
          let detailslist = data.data.checkList,
            content = `<li class="clr"><div class="fl tl autoAudit">识别模式</div><div class="fright"> : A、识别仪 | B、OCR | C、活体 </div></li>
            <li class="clr"><div class="fl tl autoAudit">本次识别模式</div><div class="fright"> : ${
              data.data.mode
            }</div></li>`;
          for (let i = 0; i < detailslist.length; i++) {
            Object.keys(detailslist[i]).forEach(key => {
              if (key != "mode") {
                if (
                  detailslist[i].hasOwnProperty("mode") &&
                  detailslist[i].mode != ""
                ) {
                  content += `<li class="clr"><div class="fl tl autoAudit">${key}（${
                    detailslist[i]["mode"]
                  }）</div><div class="fright"> : <span class="${transferStyle(
                    key,
                    detailslist[i][key]
                  )}">${detailslist[i][key]}</span> </div></li>`;
                } else {
                  content += `<li class="clr"><div class="fl tl autoAudit">${key}</div><div class="fright"> : <span class="${transferStyle(
                    key,
                    detailslist[i][key]
                  )}">${detailslist[i][key]}</span> </div></li>`;
                }
              }
            });
          }
          detailslist
            ? layer.open({
                content: `<ul class="f-scroll-lt lay-details o-fl-w">${content}</ul>`,
                type: 0,
                title: "自动审核详情",
                btn: 0,
                style: "width:auto;"
              })
            : layer.open({
                content: "未查到审核信息",
                skin: "msg",
                time: 4,
                msgSkin: "error"
              });
        })
        .catch(error => errorDeal(error));
    },
    getAuditList: function() {
      //获取订单
      let vm = this,
        auditType = vm.off.auditType,
        url = "",
        searchtype = vm.$route.params.type;

      if (vm.$route.params.type != "auditing") {
        if (vm.off.isLoad == 1) {
          return false;
        }
        vm.off.isLoad = 1;
        if (vm.off.itemType == 8) {
          //sdk开卡
          url = "km-ecs/w/sdk/distributeOrder";
        } else if (vm.off.itemType == 9) {
          //i卡开卡
          url = "km-ecs/w/tongfu/distributeOrder";
        } else if (vm.off.itemType == 1 || vm.off.itemType == 2) {
          url = "km-ecs/w/audit/getAuditOfReinput";
        } else {
          url = "km-ecs/w/audit/toaudit";
        }
        reqCommonMethod(
          { type: vm.off.itemType, auditType: auditType },
          function() {
            vm.off.isLoad = false;
          },
          url
        )
          .then(data => {
            if (data.data.list.length == 0) {
              layer.open({
                content: "当前没有分配的订单",
                skin: "msg",
                time: 4,
                msgSkin: "error"
              });
              vm.off.isLoad = false;
              return false;
            }
            vm.list = data.data.list;
            vm.off.auditIndex = 0;
            vm.dealAuditList();
            window.clearInterval(vm.timer);
            vm.timeDown(parseInt(vm.list[0].expireTime));
            vm.off.isLoad = false;
          })
          .catch(error => errorDeal(error));
      } else {// 订单查询，待审核订单，复用
        let json = { orderId: vm.$parent.orderId },
          url = "km-ecs/w/audit/toAuditByOrderId";
        reqCommonMethod(
          json,
          () => {
            vm.off.isLoad = true;
          },
          url
        )
          .then(data => {
            vm.list = data.data.list;
            vm.off.auditIndex = 0;
            vm.dealAuditList();
            window.clearInterval(vm.timer);
            vm.timeDown(parseInt(vm.list[0].expireTime));
            vm.off.isLoad = false;
          })
          .catch(e => errorDeal(e));
      }
    },
    dealAuditList: function() {
      //处理分配的订单
      const vm = this,
        len = vm.list.length;

      vm.auditData = "";
      vm.imgData = [];
      if (len && vm.off.auditIndex + 1 <= len) {
        vm.auditData = vm.list[vm.off.auditIndex];
        if (vm.off.itemType == 7) {
          //过户办理
          this.$set(vm.imgData, 0, {
            src: imgUrlDeal(vm.auditData.frontImageOld),
            name: "原机主正面照片"
          });
          this.$set(vm.imgData, 1, {
            src: imgUrlDeal(vm.auditData.backImageOld),
            name: "原机主反面照片"
          });
          this.$set(vm.imgData, 2, {
            src: imgUrlDeal(vm.auditData.handImageOld),
            name: "原机主手持/免冠照片"
          });
          this.$set(vm.imgData, 3, {
            src: imgUrlDeal(vm.auditData.imageUrl),
            name: "新机主正面照片"
          });
          this.$set(vm.imgData, 4, {
            src: imgUrlDeal(vm.auditData.backImageUrl),
            name: "新机主反面照片"
          });
          this.$set(vm.imgData, 5, {
            src: imgUrlDeal(vm.auditData.handImage),
            name: "新机主手持/免冠照片"
          });
          this.$set(vm.imgData, 6, {
            src: imgUrlDeal(vm.auditData.signImage),
            name: "新机主手签名照片"
          });
          this.$set(vm.imgData, 7, {
            src: imgUrlDeal(vm.auditData.livingImgUrl),
            name: "活体识别照片"
          });
        } else if (vm.off.itemType == 1) {
          //实名补登
          this.$set(vm.imgData, 0, {
            src: imgUrlDeal(vm.auditData.oldReqParam.imageName),
            name: "原正面照片"
          });
          this.$set(vm.imgData, 1, {
            src: imgUrlDeal(vm.auditData.oldReqParam.backImageName),
            name: "原反面照片"
          });
          this.$set(vm.imgData, 2, {
            src: imgUrlDeal(vm.auditData.oldReqParam.handImageName),
            name: "原手持/免冠照片"
          });
          this.$set(vm.imgData, 3, {
            src: imgUrlDeal(vm.auditData.reqParam.imageName),
            name: "正面照片"
          });
          this.$set(vm.imgData, 4, {
            src: imgUrlDeal(vm.auditData.reqParam.backImageName),
            name: "反面照片"
          });
          this.$set(vm.imgData, 5, {
            src: imgUrlDeal(vm.auditData.reqParam.handImageName),
            name: "手持/免冠照片"
          });
          this.$set(vm.imgData, 6, {
            src: imgUrlDeal(vm.auditData.reqParam.signImageName),
            name: "手签名照片"
          });
          this.$set(vm.imgData, 7, {
            src: imgUrlDeal(vm.auditData.reqParam.livingIdentificationImagePath),
            name: "活体识别照片"
          });
        } else if (vm.off.itemType == 2) {
          //补换卡
          this.$set(vm.imgData, 0, {
            src: imgUrlDeal(vm.auditData.reqParam.imageName),
            name: "正面照片"
          });
          this.$set(vm.imgData, 1, {
            src: imgUrlDeal(vm.auditData.reqParam.backImageName),
            name: "反面照片"
          });
          this.$set(vm.imgData, 2, {
            src: imgUrlDeal(vm.auditData.reqParam.handImageName),
            name: "手持/免冠照片"
          });
          this.$set(vm.imgData, 3, {
            src: imgUrlDeal(vm.auditData.reqParam.signImageName),
            name: "手签名照片"
          });
        } else {
          this.$set(vm.imgData, 0, {
            src: imgUrlDeal(vm.auditData.imageUrl),
            name: "正面照"
          });
          this.$set(vm.imgData, 1, {
            src: imgUrlDeal(vm.auditData.backImageUrl),
            name: "反面照"
          });
          this.$set(vm.imgData, 2, {
            src: imgUrlDeal(vm.auditData.handImageUrl),
            name: "手持/免冠照"
          });
          this.$set(vm.imgData, 3, {
            src: imgUrlDeal(vm.auditData.livingImgUrl),
            name: "活体识别"
          });
          this.$set(vm.imgData, 4, {
            src: imgUrlDeal(vm.auditData.signImageUrl || vm.auditData.signImgUrl),
            name: "手签名"
          });
          if (vm.off.itemType == "4,5,6") {
            //业务订单
            this.$set(vm.imgData, 5, {
              src: imgUrlDeal(vm.auditData.headImageName),
              name: "证件照片"
            });
          }
        }
        vm.off.auditIndex++;
      }
    },
    timeDown: function(time) {
      //倒计时
      var vm = this,
        timeFormat = function(t) {
          var t_s = t % 60,
            t_m = Math.floor(t / 60);
          t_s <= 9 && (t_s = "0" + t_s);
          t_m <= 9 && (t_m = "0" + t_m);
          return t_m + ":" + t_s;
        };
      vm.timer = setInterval(function() {
        time--;
        time == 0
          ? ((vm.off.time = "00:00"),
            clearInterval(vm.timer),
            (vm.auditData = ""))
          : (vm.off.time = timeFormat(time));
      }, 1000);
    },
    getDateTime(v) {
      return getDateTime(v);
    },
    translateData(v, i) {
      return translateData(v, i);
    }
  }
};
</script>


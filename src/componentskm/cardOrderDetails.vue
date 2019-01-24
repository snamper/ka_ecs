<!--**
  *@info 开卡订单详情模块
  *@author: thinkmix
  *@date 2017-2-11
* *-->
<template>
    <section class="g-list-box" id="details">
        <header class="g-lis-head">
            <a class="m-details-back u-icon-back" @click="close"></a>
            <div class="m-footD-btn">
                <a class="f-btn f-btn-success" v-if="list.operatorType!=8" @click="orderLog">查看审核日志</a>
            </div>
        </header>
        <div class="g-box">
            <table class="g-list-table">
                <tbody v-if="list.operatorType!=4&&list.operatorType!=8">
                    <tr>
                        <td>
                            <table class="g-inner-table">
                                <tbody>
                                    <tr v-if="list.operatorType!=7">
                                        <td>订单号码：</td>
                                        <td>{{list.orderId}}
                                            <a href="javascript:void(0)" @click="detailsOrder" class="details m-l">查看详情</a>
                                        </td>
                                    </tr>
                                    <tr v-if="list.operatorType!=7">
                                        <td>支付流水号：</td>
                                        <td>{{list.payOrderId||'--'}}
                                            <a v-if="list.payOrderId" href="javascript:void(0)" @click="detailsPayOrder" class="details m-l">查看详情</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>生成时间：</td>
                                        <td>{{getDateTime(list.createTime)[6]}}</td>
                                    </tr>
                                    <tr v-if="type==1||type==2">
                                        <td>状态修改时间：</td>
                                        <td>{{getDateTime(list.modifyTime)[6]}}
                                            <a v-if="detailsSource!=7" href="javascript:void(0)" @click="detailsTime" class="details m-l">查看详情</a>
                                        </td>
                                    </tr>
                                   
                                    <tr v-if="type==1">
                                        <td>当前状态：</td>
                                        <td>
                                            <span v-if="source==7||source==8">
                                                <b v-show="list.status==4" class="f-c-red">待分配</b>
                                                <b v-show="list.status==5" class="f-c-green">已分配</b>
                                            </span>
                                            <span v-else>
                                                <b v-show="list.status==1" class="f-c-red">待分配</b>
                                                <b v-show="list.status==2" class="f-c-green">已分配</b>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr v-if="type==4">
                                        <td>关闭时间：</td>
                                        <td>{{getDateTime(list.modifyTime)[6]}}</td>
                                    </tr>
                                    <tr v-if="type==4">
                                        <td>关闭原因：</td>
                                        <td>{{list.closeReason}}</td>
                                    </tr>

                                    <tr v-if="type==3||type==4">
                                        <td>订单状态：</td>
                                        <td>{{ $parent.translateData(7,list.statusDetail) }}</td>
                                    </tr>
                                    <tr v-if="type==2">
                                        <td>号卡状态：</td>
                                        <td>{{ $parent.translateData(4,list.cardStatus) }}</td>
                                    </tr>
                                    <tr v-show="type==2">
                                        <td>状态说明：</td>
                                        <td class="fCRed">{{ list.cardStatusReason }}</td>
                                    </tr>
                                    <tr v-show="type==2">
                                        <td>审核用时：</td>
                                        <td>
                                            <span v-if="source==7||source==8">{{ $parent.secondsFormat(parseInt(list.modifyTime)/1000-parseInt(list.createTime)/1000) }}</span>
                                            <span v-else>{{ $parent.secondsFormat(list.auditTime) }}</span>
                                        </td>
                                    </tr>
                                    <tr v-if="type==1||type==2">
                                        <td>审核方式：</td>
                                        <td>
                                            <span v-if="list.auditType=='0'">实时审核</span>
                                            <span v-else-if="list.auditType==1">事后审核</span>
                                            <span v-else-if="list.auditType==2">自动审核</span>
                                            <a href="javascript:void(0)" @click="autoAuditInfo" class="details m-l">查看详情</a>
                                        </td>
                                    </tr>
                                    <tr v-if="type==2">
                                        <td>审核状态：</td>
                                        <td v-if="list.status==1">
                                            <b class="f-c-green">通过</b>
                                        </td>
                                        <td v-if="list.status==3">
                                            <b class="f-c-red">订单关闭</b>
                                        </td>
                                        <td v-if="list.status==4">
                                            <b class="f-c-blue">复审同意</b>
                                        </td>
                                        <td v-if="list.status==2">
                                            <b class="f-c-red" style="padding-right:10px">拒绝</b>
                                            <!-- <a v-if="list.allowRecheck==1" class="agree" href="javascript:void(0)" @click="agree">同意</a> -->
                                            <span v-if="list.allowRecheck==2" class="red">超过复审时间</span>
                                        </td>
                                    </tr>
                                    <tr v-show="type==2">
                                        <td>审核人：</td>
                                        <td>{{ list.customerName }}【审核人ID：{{ list.customerId }}】</td>
                                    </tr>
                                    <tr v-if="type==2&&list.status==2">
                                        <td>拒绝原因：</td>
                                        <td>
                                            <ul>
                                                <li v-for="(todo,i) in filterReason(list.auditReason)" :key="i">
                                                    <b v-show="todo.star" class="f-c-red">*</b>{{todo.text}}</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr v-show="type==2">
                                        <td>审核备注：</td>
                                        <td>{{ list.adutiRemarks || '--' }}</td>
                                    </tr>
                                    <tr v-show="source!=7&&source!=8">
                                        <td>操作人：</td>
                                        <td>{{ list.operatorName }}【ID：{{ list.operatorId }}】
                                            <a v-show="list.operatorName" href="javascript:void(0)" @click="detailsUser" class="details m-l">查看详情</a>
                                        </td>
                                    </tr>
                                    <tr v-show="source!=7">
                                        <td>操作人IP：</td>
                                        <td v-if="source==8">{{ userMoreInfo.host||'--' }}</td>
                                        <td v-else>{{ list.host || '--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>开卡位置信息：</td>
                                        <td>
                                            <span v-if="list.longitude||userMoreInfo.longitude">
                                                <i v-if="source==8||source==7">{{ userMoreInfo.latitude }}，{{ userMoreInfo.longitude }}</i>
                                                <i v-else>{{ list.latitude }}，{{ list.longitude }}</i>
                                                <a href="javascript:void(0)" @click="toMap" class="details m-l">查看地图</a>
                                                <em>{{ list.street }}</em>
                                            </span>
                                            <span v-else>
                                                --
                                            </span>
                                        </td>
                                    </tr>
                                    <tr v-if="list.operatorType==7">
                                        <td>原机主姓名：</td>
                                        <td>{{ list.userNameOld }}</td>
                                    </tr>
                                    <tr>
                                        <td>商户名称：</td>
                                        <td>
                                            <span v-show="source == 6">{{ list.merchantShopName }}</span>
                                            <span v-show="source != 6">{{ list.companyName }}</span>
                                            <span v-show="source == 6">【信用等级：{{list.dealerLevel}}】</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>渠道ID：</td>
                                        <td>{{ list.dealerId }}
                                            <a v-show="list.dealerId" href="javascript:void(0)" @click="detailsMerchant" class="details m-l">查看详情</a>
                                        </td>
                                    </tr>
                                    <tr v-show="list.similarity!='0'&&source!=7&&source!=8">
                                        <td>活体识别相似度：</td>
                                        <td v-if="list.similarity">{{ list.similarity }}%</td>
                                        <td v-else>--</td>
                                    </tr>
                                    <tr v-show="userMoreInfo.similarity&&(source==7||source==8)">
                                        <td>活体识别相似度：</td>
                                        <td>{{ userMoreInfo.similarity }}%</td>
                                    </tr>
                                    <tr>
                                        <td>开卡号码：</td>
                                        <td>
                                            <span>{{ list.phoneNumber }}</span>（
                                            <b v-if="list.cardType==1" class="f-c-purple">远特</b>
                                            <b v-if="list.cardType==2" class="f-c-yellow">联通</b>
                                            <b class="f-c-yellow">{{ $parent.translateData(5,list.phoneLevel) }}</b>，{{list.phoneHome}}）
                                            <span v-if="list.monopolyType==1" class="supIcon">【专营号】</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>号卡分类：</td>
                                        <td>{{translateData(10,list.monopolyType)}}</td>
                                    </tr>
                                    <tr >
                                        <td>操作类型：</td>
                                        <td>
                                            <span v-if="source == 6">{{translateData(1,list.operatorType)}}</span>
                                            <span v-if="source == 8||source == 7">{{translateData(17,list.type)}}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>制卡方式：</td>
                                        <td>{{translateData(19,list.makeSource)}}</td>
                                    </tr>
                                    <tr>
                                        <td>开卡方式：</td>
                                        <td>{{list.appType ? translateData(15,list.appType) : translateData(20,list.deviceType)}}</td>
                                    </tr>
                                    <tr>
                                        <td>用户姓名：</td>
                                        <td>{{ list.userName }}</td>
                                    </tr>
                                    <tr>
                                        <td>证件类型：</td>
                                        <td v-if="list.papersType&&source!=8">
                                            {{translateData(2,list.papersType)}}
                                        </td>
                                        <td v-if="source==8">
                                            身份证
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>证件号码：</td>
                                        <td>{{ list.identityCard }}</td>
                                    </tr>
                                    <tr v-if="list.operatorType==7">
                                        <td>原机主证件号码：</td>
                                        <td>{{ list.identityCardOld }}</td>
                                    </tr>
                                    <tr>
                                        <td>证件地址：</td>
                                        <td>
                                            <span v-if="source==7||source==8">{{ userMoreInfo.userAddress }}</span>
                                            <span v-else>{{ list.userAddress }}</span>
                                        </td>
                                    </tr>
                                    <tr v-if="list.operatorType==7">
                                        <td>原机主证件地址：</td>
                                        <td>{{ list.userAddressOld }}</td>
                                    </tr>
                                    <tr>
                                        <td>证件期限：</td>
                                        <td>
                                            <span v-if="source==7||source==8">{{ userMoreInfo.period }}</span>
                                            <span v-else>{{ list.period }}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>IMEI：</td>
                                        <td>
                                            <span v-if="source==6">{{ list.IMEI||'--' }}</span>
                                            <span v-else>{{ userMoreInfo.IMEI||'--' }}</span>
                                        </td>
                                    </tr>
                                    <tr v-if="source!=7">
                                        <td>ICCID：</td>
                                        <td>{{ list.ICCID||'--' }}</td>
                                    </tr>

                                    <tr v-show="source==6">
                                        <td>终端类型：</td>
                                        <td>
                                            <span v-if="source==7">
                                                <b v-show="list.terminalType==1">IOS</b>
                                                <b v-show="list.terminalType==2">Android</b>
                                                <b v-show="!list.terminalType">--</b>
                                            </span>
                                            <span v-else>{{ list.terminalType }}</span>
                                        </td>
                                    </tr>
                                    <tr v-show="source==8||source==7">
                                        <td>终端类型：</td>
                                        <td>
                                            <span>{{ userMoreInfo.phoneType }}</span>
                                            <span>{{ userMoreInfo.osVersion }}</span>
                                            <span>{{ userMoreInfo.net }}</span>
                                        </td>
                                    </tr>
                                    <tr v-show="source!=8">
                                        <td>Mac地址：</td>
                                        <td>
                                            <span v-if="source!=7&&source!=8">{{ list.devMac||'--' }}</span>
                                            <span v-else>{{ userMoreInfo.devMac||'--' }}</span>
                                        </td>
                                    </tr>
                                    <tr v-show="source!=8">
                                        <td>识别仪名称：</td>
                                        <td>
                                            <span v-show="source==6">{{ list.devInfo||'--' }}</span>
                                            <span v-show="source==7">{{ userMoreInfo.devInfo||'--' }}</span>
                                        </td>
                                    </tr>
                                    <tr v-show="source!=7&&source!=8">
                                        <td>识别模式：</td>
                                        <td>{{ list.openMode }}</td>
                                    </tr>
                                    <tr v-if="source == 6">
                                        <td>预存补差价：</td>
                                        <td>{{translateData('money',list.prodRecords.diffPrestore)}}元</td>
                                    </tr>
                                    <tr v-if="source == 6">
                                        <td>账户抵扣：</td>
                                        <td>{{translateData('money',list.prodRecords.deductionMoney)}}元</td>
                                    </tr>
                                    <tr v-if="source == 6">
                                        <td>实付金额：</td>
                                        <td>{{translateData('money',list.prodRecords.actualMoney/100)}}元</td>
                                    </tr>
                                    <tr v-if="source == 6">
                                        <td>初始信息：</td>
                                        <td>可选包：{{list.prodRecords.primalyOptPkg||'--'}}； 套餐：{{list.prodRecords.primalyPkg||'--'}}； 预存：{{translateData('money',list.prodRecords.primalyPrestore)}}元
                                        </td>
                                    </tr>
                                    <tr v-if="source == 6">
                                        <td>制卡信息：</td>
                                        <td>可选包：{{list.prodRecords.makeOptPkg||'--'}}； 套餐：{{list.prodRecords.makePkg||'--'}}； 预存：{{translateData('money',list.prodRecords.makePrestore)}}元
                                        </td>
                                    </tr>
                                    <!-- <tr v-if="source == 6">
                                        <td>开卡信息：</td>
                                        <td>可选包：{{list.prodRecords.openOptPkg||'--'}}； 套餐：{{list.prodRecords.openPkg||'--'}}； 预存：{{translateData('money',list.prodRecords.openPrestore)}}元
                                        </td>
                                    </tr> -->
                                    <tr v-if="source == 6">
                                        <td>首充金额：</td>
                                        <td>{{translateData('money',list.prodRecords.firstCharge)}}元</td>
                                    </tr>
                                    <tr v-if="source == 6">
                                        <td>首充实际支付：</td>
                                        <td>{{translateData('money',list.prodRecords.firstChargeActual/100)}}元（ {{list.prodRecords.firstChargeDiscount/1000}}折 ）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="m-meida-640up m-box-img">
                            <ImgZoom :imgData="imgData"></ImgZoom>
                        </td>
                    </tr>
                    <tr class="m-box-img m-meida-640down">
                        <img v-for="(item,i) in imgData" :src="item.src" :key="i">
                    </tr>
                </tbody>
                <!--实名补登-->
                <RealTimeCollection v-if="list.operatorType==4" :auditStatus="type" :auditData="list" :imgData="imgData"></RealTimeCollection>
                <!--补换卡-->
                <RealNameRechCard v-if="list.operatorType==8" :auditStatus="type" :auditData="list" :imgData="imgData"></RealNameRechCard>
            </table>
        </div>
        <um-details-view v-if="isShowDetails" :type="typeDetails" :list="detailsList" :dealerId="list.dealerId"></um-details-view>
    </section>
</template>
<script>
import "../assets/km/css/cardOrderDetails.css";
import { reqCommonMethod } from "../config/service.js";
import { errorDeal, getDateTime, translateData, imgUrlDeal } from "../config/utils.js";
import ImgZoom from "../componentskm/ImgZoom";
import RealTimeCollection from "./audit/realTimeCollection";
import RealNameRechCard from "./audit/realNameRechCard";
import detailsView from "../componentskm/cardOrderDetailsAlert";

export default {
  name: "cardOrderDetails",
  props: {
    list: Object,
    type: Number, //1，待审核;2，已审核;3，进行中;4，已关闭
    number: String,
    source: String //订单来源，6、卡盟APP；7、卡盟SDK；8卡盟通服
  },
  data() {
    return {
      imgData: [], //当前订单的图片
      isShowDetails: 0,
      typeDetails: 0,
      detailsList: "",
      userMoreInfo: "", //更多用户信息
      detailsSource: "", //要查询的详情 6、卡盟APP；7、卡盟SDK；8远特i卡
      checkType: 1,
      tdata: [
        { 活体识别相似度: "86%", mode: "2" },
        { 活体识别相似度: "86%", mode: "2" },
        { 活体识别相似度: "86%", mode: "2" },
        { 校验结果: "成功" }
      ]
    };
  },
  components: {
    "um-details-view": detailsView,
    ImgZoom: ImgZoom,
    RealTimeCollection,
    RealNameRechCard
  },
  created: function() {
    var vm = this;

    if (this.source != 6) this.list.prodRecords = {};
    vm.detailsSource = vm.$parent.form.source;
    if (vm.list.operatorType == 7) {
      //过户办理
      vm.imgData = imgUrlDeal([
        { src: vm.list.frontImageOld, name: "原机主正面照片" },
        { src: vm.list.backImageOld, name: "原机主反面照片" },
        { src: vm.list.handImageOld, name: "原机主手持/免冠照片" },
        { src: vm.list.papersImage, name: "新机主正面照片" },
        { src: vm.list.backImage, name: "新机主反面照片" },
        { src: vm.list.handImage, name: "新机主手持/免冠照片" },
        { src: vm.list.signImage, name: "新机主手签名照片" },
        { src: vm.list.livingImg, name: "活体识别" }
      ]);
    } else if (vm.list.operatorType == 8) {
      //补换卡
      vm.imgData = imgUrlDeal([
        { src: vm.list.reqParam.imageName, name: "正面照片" },
        { src: vm.list.reqParam.backImageName, name: "反面照片" },
        { src: vm.list.reqParam.handImageName, name: "手持/免冠照片" }
      ])
    } else if (vm.list.operatorType == 4) {
      //实名补登
      vm.imgData = imgUrlDeal([
        { src: vm.list.oldReqParam.imageName, name: "原正面照片" },
        { src: vm.list.oldReqParam.backImageName, name: "原反面照片" },
        { src: vm.list.oldReqParam.handImageName, name: "原手持/免冠照片" },
        { src: vm.list.reqParam.imageName, name: "正面照片" },
        { src: vm.list.reqParam.backImageName, name: "反面照片" },
        { src: vm.list.reqParam.handImageName, name: "手持/免冠照片" },
        { src: vm.list.reqParam.signImageName, name: "手签名照片" },
        { src: vm.list.reqParam.livingIdentificationImagePath, name: "活体识别" }
      ])
    } else {
      //空卡,成卡,白卡
      if (vm.source == 7 || vm.source == 8) {
        //7、卡盟SDK；8远特i卡
        let userMoreInfo = JSON.parse(decodeURIComponent(vm.list.userMoreInfo));
        Object.assign(
          userMoreInfo,
          JSON.parse(decodeURIComponent(vm.list.tokenInfo))
        );
        if (userMoreInfo) {
          vm.userMoreInfo = userMoreInfo;
          vm.imgData = imgUrlDeal([
            { src: userMoreInfo.imageName, name: "正面" },
            { src: userMoreInfo.backImageName, name: "反面" },
            { src: userMoreInfo.livingIdentificationImagePath, name: "活体识别" },
          ],'tas');
          if (vm.source == 8) {
            vm.imgData.push({
              src: imgUrlDeal(userMoreInfo.handImageName,'tas'),
              name: "手持/免冠照"
            });
          }
        } else {
          vm.imgData = [
            { src: "", name: "正面" },
            { src: "", name: "反面" },
            { src: "", name: "活体识别" },
          ];
        }
      } else {
        vm.imgData = imgUrlDeal([
          { src: vm.list.handImageUrl, name: "手持/免冠" },
          { src: vm.list.imageUrl, name: "正面" },
          { src: vm.list.backImageUrl, name: "反面" },
          { src: vm.list.livingImg, name: "活体识别" },
          { src: vm.list.headImageName, name: "证件照片" }
        ]);
      }

      if (vm.type == 2) {
        //已审核
        if (vm.source == 7) {
          if (vm.list.acceptanceImg) {
            vm.imgData.push({
              src: imgUrlDeal(vm.list.acceptanceImg,'tas'),
              name: "受理单"
            });
          } else {
            vm.imgData.push({ src: "", name: "受理单" });
          }
        } else {
          if (vm.source == 8) {
            vm.imgData.push({
              src: imgUrlDeal(vm.list.acceptanceImg,'tas'),
              name: "受理单"
            });
          } else {
            vm.imgData.push({ src: imgUrlDeal(vm.list.acceptanceImg), name: "受理单" });
          }
        }
      }
    }
  },
  methods: {
    toMap() {
      var w = document.documentElement.clientWidth,
        url = "",
        vm = this;
      let latitude = parseFloat(vm.list.latitude);
      let longitude = parseFloat(vm.list.longitude);
      if (vm.source == 8) {
        latitude = parseFloat(vm.userMoreInfo.latitude);
        longitude = parseFloat(vm.userMoreInfo.longitude);
      }
      w < 640
        ? (url =
            "http://map.baidu.com/mobile/?latlng=" +
            latitude +
            "," +
            longitude +
            "")
        : (url =
            "http://map.baidu.com/?latlng=" + latitude + "," + longitude + "");
      window.open(url);
    },
    close() {
      let vmp = this.$parent;
      vmp.off.details = false;
      vmp.off.searchlist = true;
    },
    detailsTime() {
      //用时信息
      var vm = this,
        requestoPkey;
      if (vm.detailsSource == 8) {
        requestoPkey = "tforder.time.details";
      } else {
        requestoPkey = "order.time.details";
      }
      reqCommonMethod(
        {
          opKey: requestoPkey,
          params: ['sys_order_id="' + vm.list.orderId + '"'],
          pageSize: "10",
          pageNum: "-1"
        },
        false,
        "km-ecs/w/handler/query"
      )
        .then(data => {
          var list_item = data.data.list[0],
            str = "",
            str2 = "";
          if (list_item) {
            if (list_item.card_type == 1) {
              str += `<li class="clr"><div class="fl">实时审核时间：</div><div class="fright">${
                vm.getDateTime(list_item.time_real_audited)[6]
              }</div></li>`;
              str2 += `<li class="clr"><div class="fl">开卡保存订单时间：</div><div class="fright">${
                vm.getDateTime(list_item.time_save_order)[6]
              }</div></li>`;
            } else if (list_item.card_type == 2) {
              str += `<li class="clr"><div class="fl">开户成功时间：</div><div class="fright">${
                vm.getDateTime(list_item.time_serverice_open)[6]
              }</div></li>`;
            }
            layer.open({
              content: `<ul class="f-scroll-lt lay-details">
						<li class="clr"><div class="fl">生成时间：</div><div class="fright">${
              vm.getDateTime(list_item.time_create_order)[6]
            }</div></li>
						<li class="clr"><div class="fl">保存套餐时间：</div><div class="fright">${
              vm.getDateTime(list_item.time_set_business)[6]
            }</div></li>
						<li class="clr"><div class="fl">保存身份信息时间：</div><div class="fright">${
              vm.getDateTime(list_item.time_set_user_info)[6]
            }</div></li>
						<li class="clr"><div class="fl">支付时间：</div><div class="fright">${
              vm.getDateTime(list_item.time_payed)[6]
            }</div></li>
						<li class="clr"><div class="fl">自动审核时间：</div><div class="fright">${
              vm.getDateTime(list_item.time_auto_audited)[6]
            }</div></li>${str} <li class="clr"><div class="fl">受理单提交时间：</div><div class="fright">${
                vm.getDateTime(list_item.time_accepted)[6]
              }</div></li>
						<li class="clr"><div class="fl">请求IMSI时间：</div><div class="fright">${
              vm.getDateTime(list_item.time_imsi_request)[6]
            }</div></li>
						<li class="clr"><div class="fl">拿到IMSI时间：</div><div class="fright">${
              vm.getDateTime(list_item.time_imsi_got)[6]
            }</div></li>
						<li class="clr"><div class="fl">提交写卡结果时间：</div><div class="fright">${
              vm.getDateTime(list_item.time_write_card)[6]
            }</div></li>${str2} <li class="clr"><div class="fl">提交到BOSS时间：</div><div class="fright">${
                vm.getDateTime(list_item.time_submit_order)[6]
              }</div></li>
						<li class="clr"><div class="fl">开卡异步结果时间：</div><div class="fright">${
              vm.getDateTime(list_item.time_order_result)[6]
            }</div></li>
                        <li class="clr"><div class="fl">事后审核时间：</div><div class="fright">${
                          vm.getDateTime(list_item.time_after_audit)[6]
                        }</div></li>
                        </ul>`,
              type: 0,
              title: "开卡时间详情",
              btn: 0,
              style: "width:auto;"
            });
          } else {
            layer.open({
              content: "暂无该订单时间详情",
              skin: "msg",
              time: 2,
              msgSkin: "error"
            });
          }
        })
        .catch(error => errorDeal(error));
    },
    detailsOrder: function() {
      //开卡订单详情
      var vm = this,
        url;
      if (vm.detailsSource == 8 || vm.detailsSource == 7) {
        url = "km-ecs/w/audit/tfopenCardInfo";
      } else {
        url = "km-ecs/w/audit/openCardInfo";
      }
      reqCommonMethod({ transactionId: vm.list.orderId }, false, url)
        .then(data => {
          var list = data.data,
            str = "",
            payed = "";
          if (list.optionalPackage instanceof Array === false) {
            list.optionalPackage = list.optionalPackage.split(",");
          }
          for (let i in list.optionalPackage) {
            if (vm.detailsSource == "8" || vm.detailsSource == "7") {
              str += "<p>" + list.optionalPackage[i] + "</p>";
            } else {
              str += "<p>" + list.optionalPackage[i].title + "</p>";
            }
          }
          if (list.payed == 1) {
            payed +=
              '<li class="clr"><div class="fl">实付价格：</div><div class="fright">' +
              (parseFloat(list.actualPrice) / 100).toFixed(2) +
              '元<b class="f-c-grey">（系统号码占用费' +
              (parseFloat(list.actualPrice_x) / 10000).toFixed(2) +
              "元+商家自定占用费" +
              (parseFloat(list.updPrice) / 100).toFixed(2) +
              "元+预存话费" +
              (parseFloat(list.actualPrice_y) / 10000).toFixed(2) +
              "元+实付首充预存" +
              (parseFloat(list.actualFirstCharge) / 10000).toFixed(2) +
              "元）</b></div></li>" +
              '<li class="clr"><div class="fl">抵扣金额：</div><div class="fright">' +
              (parseFloat(list.deductionMoney) / 100).toFixed(2) +
              "元</div></li>" +
              '<li class="clr"><div class="fl">开卡返佣：</div><div class="fright">' +
              (parseFloat(list.commission) / 100).toFixed(2) +
              '元<b class="f-c-grey">（系统号码占用费' +
              (parseFloat(list.commission_x) / 100).toFixed(2) +
              "元+商家自定占用费" +
              (parseFloat(list.updPrice) / 100).toFixed(2) +
              "元+预存话费" +
              (parseFloat(list.commission_y) / 100).toFixed(2) +
              "元）</b></div></li>" +
              '<li class="clr"><div class="fl">支付模式：</div><div class="fright">' +
              list.payChannel +
              "</div></li>";
          }
          if (vm.detailsSource == "8" || vm.detailsSource == "7") {
            layer.open({
              content:
                '<ul class="f-scroll-lt lay-details">' +
                '<li class="clr"><div class="fl">订单号：</div><div class="fright">' +
                list.sysOrderId +
                "</div></li>" +
                '<li class="clr"><div class="fl">BOSS流水号：</div><div class="fright">' +
                list.transactionId +
                "</div></li>" +
                '<li class="clr"><div class="fl">用户姓名：</div><div class="fright">' +
                list.userName +
                "</div></li>" +
                '<li class="clr"><div class="fl">电话号码：</div><div class="fright">' +
                list.phoneNumber +
                '（<b class="f-c-grey">' +
                vm.$parent.translateData(5, list.bigNumberLevel) +
                "</b>，" +
                list.phoneHome +
                "）</div></li>" +
                '<li class="clr"><div class="fl">ICCID：</div><div class="fright">' +
                list.iccid +
                "</div></li>" +
                '<li class="clr"><div class="fl">IMSI卡号：</div><div class="fright">' +
                list.imsi +
                "</div></li>" +
                '<li class="clr"><div class="fl">状态修改时间：</div><div class="fright">' +
                vm.getDateTime(list.modifyTime)[6] +
                "</div></li>" +
                '<li class="clr"><div class="fl">选号费：</div><div class="fright">' +
                (parseFloat(list.cardMoney) / 100).toFixed(2) +
                "元</b></div></li>" +
                payed +
                '<li class="clr"><div class="fl">折后选号费：</div><div class="fright">' +
                (parseFloat(list.actualCardMoney) / 100).toFixed(2) +
                "元</div></li>" +
                '<li class="clr"><div class="fl">预存话费：</div><div class="fright">' +
                (parseFloat(list.prestoreMoney) / 100).toFixed(2) +
                "元</div></li>" +
                '<li class="clr"><div class="fl">折后预存：</div><div class="fright">' +
                (parseFloat(list.actualPrestoreMoney) / 100).toFixed(2) +
                "元</div></li>" +
                '<li class="clr"><div class="fl">实际支付：</div><div class="fright">' +
                (parseFloat(list.actualMoney) / 100).toFixed(2) +
                "元</div></li>" +
                '<li class="clr"><div class="fl">已选套餐：</div><div class="fright">' +
                list.tfPackageinfo +
                "</div></li>" +
                '<li class="clr"><div class="fl">已选可选包：</div><div class="fright">' +
                str +
                "</div></li></ul>",
              type: 0,
              title: "开卡订单详情",
              btn: 0,
              style: "width:auto;"
            });
          } else
            layer.open({
              content:
                '<ul class="f-scroll-lt lay-details">' +
                '<li class="clr"><div class="fl">订单号：</div><div class="fright">' +
                list.sysOrderId +
                "</div></li>" +
                '<li class="clr"><div class="fl">BOSS流水号：</div><div class="fright">' +
                list.transactionId +
                "</div></li>" +
                '<li class="clr"><div class="fl">用户姓名：</div><div class="fright">' +
                list.userName +
                "</div></li>" +
                '<li class="clr"><div class="fl">电话号码：</div><div class="fright">' +
                list.phoneNumber +
                '（<b class="f-c-grey">' +
                vm.$parent.translateData(5, list.phoneLevel) +
                "</b>，" +
                list.phoneHome +
                "）</div></li>" +
                '<li class="clr"><div class="fl">ICCID：</div><div class="fright">' +
                list.ICCID +
                "</div></li>" +
                '<li class="clr"><div class="fl">IMSI卡号：</div><div class="fright">' +
                list.esim +
                "</div></li>" +
                '<li class="clr"><div class="fl">状态修改时间：</div><div class="fright">' +
                vm.getDateTime(list.timestamp)[6] +
                "</div></li>" +
                '<li class="clr"><div class="fl">应付价格：</div><div class="fright">' +
                (
                  parseFloat(list.price_x) / 100 +
                  parseFloat(list.price_y) / 100 +
                  parseFloat(list.updPrice) / 100 +
                  parseFloat(list.firstCharge) / 100
                ).toFixed(2) +
                '元<b class="f-c-grey">（系统号码占用费' +
                (parseFloat(list.price_x) / 100).toFixed(2) +
                "元+商家自定占用费" +
                (parseFloat(list.updPrice) / 100).toFixed(2) +
                "元+预存话费" +
                (parseFloat(list.price_y) / 100).toFixed(2) +
                "元+首冲预存" +
                (parseFloat(list.firstCharge) / 100).toFixed(2) +
                "元）</b></div></li>" +
                payed +
                '<li class="clr"><div class="fl">预占保证金：</div><div class="fright">' +
                (parseFloat(list.occupy) / 100).toFixed(2) +
                "元</div></li>" +
                '<li class="clr"><div class="fl">退回预占保证金：</div><div class="fright">' +
                (parseFloat(list.occupyReturn) / 100).toFixed(2) +
                "元</div></li>" +
                '<li class="clr"><div class="fl">扣除预占保证金：</div><div class="fright">' +
                (parseFloat(list.occupyDeduct) / 100).toFixed(2) +
                "元</div></li>" +
                '<li class="clr"><div class="fl">已选套餐：</div><div class="fright">' +
                list.package +
                "</div></li>" +
                '<li class="clr"><div class="fl">已选可选包：</div><div class="fright">' +
                str +
                "</div></li></ul>",
              type: 0,
              title: "开卡订单详情",
              btn: 0,
              style: "width:auto;"
            });
        })
        .catch(error => errorDeal(error));
    },
    detailsPayOrder: function() {
      //支付订单详情
      var vm = this;
      if (vm.detailsSource == 8) {
        reqCommonMethod(
          {
            opKey: "tf.orderApp.payInfo",
            params: ['pay_transaction_id="' + vm.list.payOrderId + '"'],
            pageSize: "10",
            pageNum: "-1"
          },
          false,
          "km-ecs/w/handler/query"
        )
          .then(data => {
            var list = data.data.list[0],
              content;
            content =
              '<ul class="f-scroll-lt lay-details">' +
              '<li class="clr"><div class="fl">支付流水号：</div><div class="fright">' +
              list.pay_transaction_id +
              "</div></li>" +
              '<li class="clr"><div class="fl">第三方流水号：</div><div class="fright">' +
              list.sys_order_id_pay +
              "</div></li>" +
              '<li class="clr"><div class="fl">支付账号：</div><div class="fright">' +
              list.pay_user_id +
              "</div></li>" +
              '<li class="clr"><div class="fl">支付方式：</div><div class="fright">' +
              list.payType +
              "</div></li>" +
              '<li class="clr"><div class="fl">支付金额：</div><div class="fright">' +
              list.actual_money / 100 +
              "元</div></li></ul>";
            layer.open({
              content: content,
              type: 0,
              title: "支付订单详情",
              btn: 0,
              style: "width:auto;"
            });
          })
          .catch(e => errorDeal(e));
      } else {
        reqCommonMethod(
          { payId: vm.list.payOrderId },
          false,
          "km-ecs/w/audit/payInfo"
        )
          .then(data => {
            var list = data.data;
            layer.open({
              content:
                '<ul class="f-scroll-lt lay-details">' +
                '<li class="clr"><div class="fl">系统流水号：</div><div class="fright">' +
                list.sysPayId +
                "</div></li>" +
                '<li class="clr"><div class="fl">第三方流水号：</div><div class="fright">' +
                list.payId +
                "</div></li>" +
                '<li class="clr"><div class="fl">支付渠道：</div><div class="fright">' +
                list.payChannel +
                "</div></li>" +
                '<li class="clr"><div class="fl">支付方式：</div><div class="fright">' +
                list.payType +
                "</div></li>" +
                '<li class="clr"><div class="fl">支付金额：</div><div class="fright">' +
                list.payMoney +
                "元</div></li></ul>",
              type: 0,
              title: "支付订单详情",
              btn: 0,
              style: "width:auto;"
            });
          })
          .catch(error => errorDeal(error));
      }
    },
    detailsUser: function() {
      //操作者详情
      var vm = this;
      reqCommonMethod(
        { userId: vm.list.operatorId },
        false,
        "km-ecs/w/audit/getUserInfo"
      )
        .then(data => {
          vm.detailsList = data.data;
          vm.isShowDetails = true;
          vm.typeDetails = 1;
        })
        .catch(error => errorDeal(error));
    },
    detailsMerchant: function() {
      //商户详情
      var vm = this;
      reqCommonMethod(
        { dealerId: vm.list.dealerId },
        false,
        "km-ecs/w/audit/getMerchantInfo"
      )
        .then(data => {
          vm.detailsList = data.data;
          vm.isShowDetails = true;
          vm.typeDetails = 2;
        })
        .catch(error => errorDeal(error));
    },
    autoAuditInfo() {
      //自动审核详情
      var vm = this,
        orderId = vm.list.orderId;
      if (vm.list.sysOrderId) {
        orderId = vm.list.sysOrderId;
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
            content = `<li style="text-align:left" class="clr"><span>**识别模式**</span><span> (A:识别仪 , B:OCR , C:活体) </span></li>
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
    agree: function() {
      //复审同意
      var vm = this;
      reqCommonMethod(
        { orderId: vm.list.orderId },
        false,
        "km-ecs/w/audit/reAudit"
      )
        .then(data => {
          layer.open({
            content: "复审成功",
            skin: "msg",
            time: 4,
            msgSkin: "success"
          });
          vm.list.status = 4;
          vm.list.cardStatus = 1;
          vm.$parent.list[parseInt(vm.number)].status = 4;
          vm.$parent.list[parseInt(vm.number)].cardStatus = 1;
        })
        .catch(error => errorDeal(error));
    },
    orderLog: function() {
      //审核日志
      var vm = this,
        json;
      if (vm.$parent.form.orderType == 8) {
        json = { orderId: vm.list.sysOrderId };
      } else {
        json = { orderId: vm.list.orderId };
      }
      reqCommonMethod(json, false, "km-ecs/w/audit/log")
        .then(data => {
          var str = "",
            list = data.data;
          for (var i in list) {
            str +=
              "<li><time><b></b>" +
              vm.getDateTime(list[i].modifyTime)[6] +
              "</time><div>" +
              list[i].context +
              "</div></li>";
          }
          layer.open({
            content: '<ul class="lay-log">' + str + "</ul>",
            type: 0,
            title: "审核日志",
            btn: 0,
            style: "width:auto;"
          });
        })
        .catch(error => errorDeal(error));
    },
    integralLog: function() {
      //积分详情
      var vm = this;
      reqCommonMethod(
        { orderId: vm.list.orderId },
        false,
        "km-ecs/c/audit/searchIntegration"
      )
        .then(data => {
          var statusStr = "",
            reasonStr = "";
          if (data.data.cardStatus != "1")
            reasonStr +=
              "<li><span>原因：</span>" + data.data.cardStatusReason + "</li>";
          layer.open({
            content:
              '<ul class="lay-integralLog"><li><span>本级获得积分：</span>' +
              data.data.integration +
              "积分</li><li><span>上级获得积分：</span>" +
              data.data.superiorIntegration +
              "积分</li>" +
              reasonStr +
              "</ul>",
            type: 0,
            title: "积分查询",
            btn: 0,
            style: "width:auto;"
          });
        })
        .catch(error => errorDeal(error));
    },
    filterReason: function(reason) {
      if (reason == null) {
        return false;
      }
      var reasonArr = reason.split("|"),
        str = [];
      var starReason = [
        "非本人现场手持证卡照",
        "证件与手持合影照中证件不同",
        "证件填报信息与证照中信息不符(包括但不限于证件号码,姓名,地址等信息)",
        "发证机关有误或与证件地址不符",
        "部分或全部照片为翻拍或疑似合成"
      ];
      for (var i in reasonArr) {
        if (reasonArr[i]) {
          str[i] = { star: 0, text: "" };
          for (var j in starReason) {
            if (starReason[j] == reasonArr[i]) {
              str[i].star = true;
            } else if (j == starReason.length - 1) {
              str[i].star = false;
            }
          }
          str[i].text = reasonArr[i];
        }
      }
      return str;
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
<style>
.supIcon {
  color: #ff961e;
}
label.active {
  color: #4b8cd6;
}
.m-audit-btn {
  position: absolute;
  right: 200px;
}
</style>
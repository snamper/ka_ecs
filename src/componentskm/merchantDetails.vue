<style scoped>
  @import "../assets/km/css/merchant.css";
</style>
<template>
  <section>
    <div v-if="!off.detailsExclusiveNumber">
      <!--商户ID详情-->
      <div class="m-total-table g-list-box" v-show="_form.type==1&&_ajaxData.details&&!_off.modifyInfo">
        <header class="g-lis-head">
          <a v-if="searchRoad.length" class="m-details-back u-icon-back" style="width:20px;height:20px;" @click="close('dealerId')"></a>
          <div class="m-footD-btn">
            <a class="f-btn f-btn-danger" @click="_off.modifyInfo=true" v-if="_ajaxData.details.status==0">修改商户资料</a>
          </div>
        </header>
        <div class="g-box">
          <table class="merchant-total g-list-table">
            <thead>
              <tr>
                <th style="width:70%;">商户基本信息</th>
                <th style="width:30%;">商户账户信息</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <table class="g-in-table col-l">
                    <tbody>
                      <tr>
                        <td><span>网点名称：</span>{{ _ajaxData.details.companyName }}</td>
                        <td><span>有效总次数：</span>{{ _ajaxData.details.totalNums }}</td>
                      </tr>
                      <tr>
                        <td><span>渠道ID：</span><span>{{ _ajaxData.details.dealerId }}</span>
                          <b v-if="_ajaxData.details.status==0" class="f-c-green">已激活</b>
                          <b v-if="_ajaxData.details.status==1" class="f-c-yellow">待激活</b>
                          <b v-if="_ajaxData.details.status==2" class="f-c-blue">激活待审核</b>
                          <b v-if="_ajaxData.details.fillStatus != 0">[补录]</b>
                        </td>
                        <td><span>开卡成功次数：</span>{{ _ajaxData.details.successNums }}</td>
                      </tr>
                      <tr>
                        <td><span>证件地址：</span>{{ _ajaxData.details.address }}</td>
                        <td><span>额外成功次数：</span>{{ _ajaxData.details.extraFrequency }}</td>
                      </tr>
                      <tr>
                        <td><span>门店地址：</span>{{ _ajaxData.details.storeAddress||'--' }}</td>
                        <td><span>获得分数：</span>{{ _ajaxData.details.getPoints }}</td>
                      </tr>
                      <tr>
                        <td><span>创建时间：</span>{{ _ajaxData.details.createtime }}</td>
                        <td><span>扣除分数：</span>{{ _ajaxData.details.losePoints }}</td>
                      </tr>
                      <tr>
                        <td><span>商户属性：</span>{{ _ajaxData.details.merchantType }}</td>
                        <td><span>额外分值：</span>{{ _ajaxData.details.extraCredit }}</td>
                      </tr>
                      <tr>
                        <td><span>商户类别：</span>{{ _ajaxData.details.userType }}</td>
                        <td><span>信用积分：</span>{{ _ajaxData.details.creditNums }}</td>
                      </tr>
                      <tr>
                        <td><span>证件号码：</span>{{ _ajaxData.details.businessLicense }}</td>
                        <td><span>真实信用积分：</span>{{ _ajaxData.details.realCreditNums }}</td>
                      </tr>
                      <tr>
                        <td><span>售卡城市：</span>{{ _ajaxData.details.openedCity }}</td>
                        <td><span>显示等级：</span>{{ _ajaxData.details.showLevel }}</td>
                      </tr>
                      <tr>
                        <td><span>售卡范围：</span>
                          <em v-for="(_item,i) in _ajaxData.details.openedScopes" :key="i">
                            <em v-if="_item.type==1">远特售卡</em>
                            <em v-if="_item.type==2">,联通售卡</em>
                            <em v-if="_item.type==3">,移动售卡</em>
                            <em v-if="_item.type==4">,电信售卡</em>
                          </em>
                          <a href="javascript:;" @click="sellScopePower()" class="details">详情</a>
                        </td>
                        <td><span>真实等级：</span>{{ _ajaxData.details.realLevel }}</td>
                      </tr>
                      <tr>
                        <td><span>激活订单号：</span>{{ _ajaxData.details.registOrderId }}
                          <b v-if="_ajaxData.details.auditType==0"></b>
                          <b v-if="_ajaxData.details.auditType==1">实时审核/</b>
                          <b v-if="_ajaxData.details.auditType==2">事后审核/</b>
                          <b v-if="_ajaxData.details.auditType==3">自动审核/</b>
                          <b v-if="_ajaxData.details.orderStatus==0"></b>

                          <b v-if="_ajaxData.details.orderStatus==1" class="f-c-green">通过</b>
                          <b v-if="_ajaxData.details.orderStatus==2" class="f-c-red">拒绝</b>
                          <b v-if="_ajaxData.details.orderStatus==3" class="f-c-red">待分配</b>
                          <b v-if="_ajaxData.details.orderStatus==4" class="f-c-yellow">已分配</b>
                          <b v-if="_ajaxData.details.orderStatus==5" class="f-c-yellow">等待自动审核</b>
                          <b v-if="_ajaxData.details.orderStatus==6" class="f-c-green">复审通过</b>
                        </td>
                        <td><span>基础分值：</span>{{ _ajaxData.details.btScore }}</td>
                      </tr>
                      <tr>
                        <td><span>激活时间：</span>{{ _ajaxData.details.registTime }}</td>
                        <td><span>基础总次数：</span>{{ _ajaxData.details.btFrequency
                          }}【成功：{{_ajaxData.details.bsFrequency}}】</td>
                      </tr>
                      <tr>
                        <td><span>签约状态：</span><b :class="{fCGreen:_ajaxData.details.isSignAgreement=='已签约',fCRed:_ajaxData.details.isSignAgreement=='未签约'}">{{
                            _ajaxData.details.isSignAgreement }}</b>[{{ _ajaxData.details.signTime }}]</td>
                        <td><span>上级商户：</span>
                          <a href="javascript:;" v-if="_ajaxData.details.superDealerId" @click="details(_ajaxData.details.superDealerId,1,'x')"
                            title="点击查看详情" class="details">{{_ajaxData.details.superDealerId}}</a>【名称：{{
                          _ajaxData.details.superDealerName||'--' }}】</td>
                      </tr>
                      <tr>
                        <td><span>设备信息：</span>
                          <a :href="'#/homek/resource/device/'+_ajaxData.details.devMac" title="点击查看详情" class="details m-l">{{
                            _ajaxData.details.devMac }}</a></td>
                        <td><span>上级de上级商户：</span>
                          <a href="javascript:;" v-if="_ajaxData.details.superSuperDealerId" @click="details(_ajaxData.details.superSuperDealerId,1,'x')"
                            title="点击查看详情" class="details">{{_ajaxData.details.superSuperDealerId}}</a>【名称：{{
                          _ajaxData.details.superSuperDealerIdName||'--' }}】</td>
                      </tr>
                      <tr>
                        <td><span>欢迎页：</span>{{ _ajaxData.details.bannerNames||'--' }}</td>
                        <td><span>上级推广渠道：</span>
                          <a :href="'#/homek/resource/promoter/'+_ajaxData.details.popDealerId" title="点击查看详情" class="details">{{_ajaxData.details.popDealerId}}</a>【名称：{{
                          _ajaxData.details.popDealerName||'--' }}】</td>
                      </tr>
                      <tr>
                        <td><span>证件照片：</span>
                          <a v-if="_ajaxData.details.status==0" href="javascript:;" @click="lookMerchantImg" class="details">查看图片信息</a>
                          <span v-if="_ajaxData.details.status!=0">暂无图片</span>
                        </td>
                        <td><span>总部推广渠道：</span>{{ _ajaxData.details.topDealerId||'--' }}【名称：{{
                          _ajaxData.details.topDealerName||'--' }}】</td>
                      </tr>
                      <tr>
                        <td><span>制卡数：</span>
                          {{_ajaxData.details.makeCardNum}}
                        </td>
                        <td><span>开卡数：</span>
                          {{_ajaxData.details.openCardNum}}
                        </td>
                      </tr>
                      <tr>
                        <td><span>激活卡数：</span>
                          {{_ajaxData.details.activeCardNum}}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table class="g-in-table col-r o-clr-bd">
                    <tbody>
                      <tr>
                        <td><span>微信提现账户：</span>{{ _ajaxData.details.pickMoneyWechat }}</td>
                      </tr>
                      <tr>
                        <td><span>支付宝提现账户：</span>{{ _ajaxData.details.pickMoneyAlipay }}</td>
                      </tr>
                      <tr>
                        <td><span>话分佣金历史总金额：</span>{{ parseFloat(_ajaxData.details.incomeMoneyTotal)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>话分佣金余额：</span>{{ parseFloat(_ajaxData.details.incomeMoney)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>开卡佣金历史总金额：</span>{{ parseFloat(_ajaxData.details.commissionFeeTotal)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>开卡佣金余额：</span>{{ parseFloat(_ajaxData.details.commissionFee)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>综合激励历史总金额：</span>{{ parseFloat(_ajaxData.details.creditMoneyTotal)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>综合激励余额：</span>{{ parseFloat(_ajaxData.details.creditMoney)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>自推广激励历史总金额：</span>{{ parseFloat(_ajaxData.details.promotionTotal)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>自推广激励余额：</span>{{ parseFloat(_ajaxData.details.promotion)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>其它佣金历史总金额：</span>{{ parseFloat(_ajaxData.details.extraMoneyTotal)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>其它佣金余额：</span>{{ parseFloat(_ajaxData.details.extraMoney)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>保证金：</span>{{ parseFloat(_ajaxData.details.bond)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>号码模式：</span>{{_ajaxData.details.phoneModel}}【{{_ajaxData.details.dealer_model_describe||'--'}}】
                        </td>
                      </tr>
                      <tr>
                        <td><span>折扣模式：</span>{{_ajaxData.details.discountModel}}【{{_ajaxData.details.discount_model_describe||'--'}}】
                        </td>
                      </tr>
                      <tr>
                        <td><span>转账模式：</span>{{_ajaxData.details.transferModel}}【{{_ajaxData.details.model_code_describe||'--'}}】
                        </td>
                      </tr>
                      <tr>
                        <td><span>专营号码：</span><a @click="detailsOwnNumber(_ajaxData.details.dealerId)" class="details"
                            href="javascript:void(0)">查看详情</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <section v-if="_ajaxData.details&&!_off.modifyInfo" class="m-total-table">
          <div class="total-head">商户下所有工号列表</div>
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>工号ID</th>
                <th>工号姓名</th>
                <th>登录手机号码</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in _ajaxData.list" :key="index">
                <td>{{ ((_ajaxData.pageNum-1)*10+(index+1)) }}</td>
                <td>{{ item.userId }}<span v-if="item.isMain==1">(主账号)</span></td>
                <td>{{ item.userName }}</td>
                <td>{{ item.phone }}</td>
                <td><a @click="details(item.userId,2,3)" class="details" href="javascript:void(0)">详情</a></td>
              </tr>
            </tbody>
          </table>
          <div class="m-no-data" v-if="!_ajaxData.list.length">该商户暂无工号列表数据</div>
        </section>
      </div>
      <!-- 工号ID详情 -->
      <div class="m-total-table g-list-box" v-if="_form.type==2&&_ajaxData2.details">
        <header class="g-lis-head">
          <a v-if="searchRoad.length" class="m-details-back u-icon-back" style="width:20px;height:20px;" @click="close('workNum')"></a>
          <div class="m-footD-btn">
          </div>
        </header>
        <div class="g-box">
          <table class="merchant-total g-list-table">
            <thead>
              <tr>
                <th style="width:70%;">工号基本信息</th>
                <th style="width:30%;">工号账户信息</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <table class="g-in-table col-l">
                    <tbody>
                      <tr>
                        <td><span>卡盟ID：</span>{{ _ajaxData2.details.userId }}<i v-if="_ajaxData2.details.isMain==1">(主账号)</i></td>
                        <td><span>最近登录时间：</span>{{ getDateTime(_ajaxData2.details.lastLoginTime)[6] }}</td>
                      </tr>
                      <tr>
                        <td><span>用户姓名：</span>{{ _ajaxData2.details.userName }}</td>
                        <td><span>最近操作时间：</span>{{ getDateTime(_ajaxData2.details.lastReqeustTime)[6] }}</td>
                      </tr>
                      <tr>
                        <td><span>登录手机号：</span>{{ _ajaxData2.details.phone }}</td>
                        <td><span>所用机型：</span>{{ _ajaxData2.details.phoneType }}</td>
                      </tr>
                      <tr>
                        <td><span>所属商户渠道ID：</span>{{ _ajaxData2.details.dealerId }}（{{ _ajaxData2.details.companyName
                          }}<a class="details" @click="details(_ajaxData2.details.dealerId,1,4)" href="javascript:void(0)">详情</a>）</td>
                        <td><span>经纬度：</span>{{ _ajaxData2.details.latitude}},{{ _ajaxData2.details.longitude}}<a href="javascript:void(0)"
                            @click="toMap" class="details m-l">查看地图</a></td>
                      </tr>
                      <tr>
                        <td><span>当前城市：</span>{{ _ajaxData2.details.cityName }}</td>
                        <td><span>支付宝账号：</span>{{ _ajaxData2.details.alipayID }}</td>
                      </tr>
                      <tr>
                        <td><span>创建时间：</span>{{ getDateTime(_ajaxData2.details.createTime)[6] }}</td>
                        <td><span>微信账号：</span>{{ _ajaxData2.details.wxID }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table class="g-in-table col-r">
                    <tbody>
                      <tr>
                        <td><span>账户余额：</span>{{ parseFloat(_ajaxData2.details.leftFee)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>可提现额度：</span>{{ parseFloat(_ajaxData2.details.allowExtractFee)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>已提现金额：</span>{{ parseFloat(_ajaxData2.details.alreadyExtractFee)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>可退款额度：</span>{{ parseFloat(_ajaxData2.details.allowRefundFee)/100 }}元</td>
                      </tr>
                      <tr>
                        <td><span>已退款金额：</span>--元</td>
                      </tr>
                      <tr>
                        <td><span>赠送金额：</span>{{ parseFloat(_ajaxData2.details.giveMoney)/100 }}元（已使用：{{
                          parseFloat(_ajaxData2.details.giveMoneyUsed)/100 }}元）</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <section v-if="_ajaxData2.details" class="m-total-table">
          <div class="total-head">第三方支付流水号列表<b>{{_ajaxData2.total}}</b>
            <div class="f-btn-group">
              <button :class="{active:_form.paySource==2}" @click="shiftPaySource(2)">账户充值成功</button>
              <button :class="{active:_form.paySource==3}" @click="shiftPaySource(3)">开卡失败退款</button>
              <button :class="{active:_form.paySource==4}" @click="shiftPaySource(4)">代充失败退款</button>
              <button :class="{active:_form.paySource==1}" @click="shiftPaySource(1)">保证金充值成功</button>
            </div>
            <select class="m-select" @change="shiftPaySource">
              <option value="2">账户充值成功</option>
              <option value="3">开卡失败退款</option>
              <option value="4">代充失败退款</option>
              <option value="1">保证金充值成功</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>支付时间</th>
                <th>订单号</th>
                <th>第三方流水号</th>
                <th>支付方式</th>
                <th>金额（元）</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in _ajaxData2.list" :key="index">
                <td>{{ ((_ajaxData2.pageNum-1)*10+(index+1)) }}</td>
                <td>{{ getDateTime(item.createTime)[6] }}</td>
                <td>{{ item.sysOrderId }}</td>
                <td>{{ item.transactionId||'无' }}</td>
                <td>{{ item.payType==1 ? '远特账户支付' : item.payType==2 ? '微信支付' : '支付宝支付' }}</td>
                <td>{{ parseFloat(item.payMoney)/100 }}</td>
              </tr>
            </tbody>
          </table>
          <my-page :page="_ajaxData2.pageNum" :maxpage="_ajaxData2.maxpage1" :callback="_ajaxData2.callback"></my-page>
        </section>
      </div>
    </div>
    <exclusiveNumber v-if="off.detailsExclusiveNumber" :exclesiveLength="exclusiveNumberLength" :numbersList="numbersArray"></exclusiveNumber>
  </section>
</template>
<script>
  import {
    getDateTime,
    errorDeal,
    imgUrlDeal
  } from "../../src/config/utils.js"
  import exclusiveNumber from "./exclusiveNumber";
  import {
    requestGetExclusiveNumerList
  } from "../config/service.js";
  export default {
    name: "merchantDetails",
    props: {
      _form: Object,
      _ajaxData: Object,
      _ajaxData2: Object,
      _off: Object,
      searchRoad: Array
    },
    data() {
      return {
        off: {
          detailsExclusiveNumber: false,
        },
        numbersArray: [],
        exclusiveNumberLength: 0,
      }
    },
    components: {
      "exclusiveNumber": exclusiveNumber
    },
    methods: {
      lookMerchantImg() {
        const vm = this;

        let merchantType = vm._ajaxData.details.merchantType;
        vm.$parent.merchantImgData = imgUrlDeal([
          {
            'src': vm._ajaxData.details.frontImageUrl,
            'name': merchantType == '企业' ? '门店左照片' : '正面照片'
          },
          {
            'src': vm._ajaxData.details.backImageUrl,
            'name': merchantType == '企业' ? '门店右照片' : '反面照片'
          },
          {
            'src': vm._ajaxData.details.handImageUrl,
            'name': '手持/免冠照片'
          }
        ],'ums');
        vm.$parent.closePop(1);
      },
      sellScopePower() {
        let vm = this.$parent;
        let info = JSON.parse(vm.ajaxData.details.openedScopes1);
        let str = '';
        for (let key in info) {
          if (key == 1) str += `<li class="clr"><div class="fl">远特售卡：</div>`;
          if (key == 2) str += `<li class="clr"><div class="fl">联通售卡：</div>`;
          if (key == 3) str += `<li class="clr"><div class="fl">移动售卡：</div>`;
          if (key == 4) str += `<li class="clr"><div class="fl">电信售卡：</div>`;
          info[key].forEach((value) => {
            if (value.isLocal == 0) str += `<div class="fright">${value.area!='null'?value.area:''}（不限）</div></li>`;
            if (value.isLocal == 1) {
              // value.cusWhiteList.split(',').forEach((val)=>{
              //     _str+='，'+info.whiteList[val];
              // })
              str += `<div class="fright">${value.area}（本地${value.cusWhiteDes=='null'?'':value.cusWhiteDes}）</div>`;
            }
          })
          str += '</li>';
        }
        layer.open({
          content: `<ul class="f-scroll-lt lay-details">${str}</ul>`,
          type: 0,
          title: '售卡区域详情',
          btn: 0,
          style: 'width:auto;'
        });
      },
      details(context, type, i) { //商户上用户列表查看用户，用户上查看商户
        let vm = this.$parent;
        if (i !== 'x') {
          vm.searchRoad.push({
            'vm.form.type': vm.form.type
          })
        }
        vm.i = vm.searchRoad.length;
        vm.off.detailskind = i;
        vm.form.type = type;
        vm.form.context = context;

        vm.getDetails();
      },
      getDetails(isBtn) { //获取商户/工号基本信息
        var vm = this.$parent,
          type = vm.form.type,
          json, url, time = new Date().getTime();
        type == 1 ? (json = {
          dealerId: vm.form.context
        }, url = 'km-ecs/w/merchant/getInfo') : (json = {
          phone: vm.form.context
        }, url = 'km-ecs/w/user/getInfo');
        if (vm.off.isLoad) return false;
        if (isBtn && vm.form.time && (time - vm.form.time < 3000)) {
          return false;
        } else if (type == 1 && !json.dealerId) {
          layer.open({
            content: '请输入商户ID',
            skin: 'msg',
            time: 2,
            msgSkin: 'error',
          });
          return false;
        } else if (type == 2 && !json.phone) {
          layer.open({
            content: '请输入工号ID',
            skin: 'msg',
            time: 2,
            msgSkin: 'error',
          });
          return false;
        }
        vm.form.time = time;
        vm.off.isLoad = true;

        reqCommonMethod(json, function () {
            vm.off.isLoad = false;
          }, url)
          .then((data) => {
            vm.form.type == 1 ? vm.ajaxData.details = data.data : vm.ajaxData2.details = data.data;
            vm.off.isLoad = false;
            vm.getList();
          }).catch(error => errorDeal(error));
      },
      detailsOwnNumber(v) {
        let vm = this;
        vm.numbersArray = []
        requestGetExclusiveNumerList({
            dealerId: v
          }, function () {
            vm.off.isLoad = false;
          })
          .then((data) => {
            vm.exclusiveNumberLength = data.data.length;
            vm.off.detailsExclusiveNumber = true;
            for (var i = 0, len = data.data.length; i < len; i += 10) {
              vm.numbersArray.push(data.data.slice(i, i + 10));
            }
          }).catch(e => errorDeal(e))
      },
      getList(page) { //获取第三方支付订单列表/获取用户列表
        var vm = this.$parent,
          type = vm.form.type,
          url, json;
        type == 1 ? (json = {
          dealerId: vm.form.context
        }, url = 'km-ecs/w/audit/getUsersDetail') : (json = {
          phone: vm.form.context,
          pageNum: page || 1,
          pageSize: 10,
          type: vm.form.paySource
        }, url = 'km-ecs/w/user/paymengList');
        if (vm.off.isLoad) return false;
        vm.off.isLoad = true;
        reqCommonMethod(json, function () {
            vm.off.isLoad = false;
          }, url)
          .then((data) => {
            type == 1 ? vm.$set(vm.ajaxData, 'list', data.data.list) : vm.$set(vm.ajaxData2, 'list', data.data.list);
            type == 1 ? vm.ajaxData.total = data.data.total || 0 : vm.ajaxData2.total = data.data.total || 0;
            type == 1 ? vm.ajaxData.maxpage1 = Math.ceil(parseInt(data.data.list.length) / 10) : vm.ajaxData2.maxpage1 =
              Math.ceil(parseInt(data.data.list.length) / 10);
            type == 1 ? vm.ajaxData.pageNum = page || 1 : vm.ajaxData2.pageNum = page || 1;
            type == 1 ? vm.ajaxData.callback = function (v) {
              vm.getList(v)
            } : vm.ajaxData2.callback = function (v) {
              vm.getList(v)
            };
            vm.off.isLoad = false;
            type == 1 ? vm.dealerInfo = vm.ajaxData : vm.dealerInfo = vm.ajaxData2;
          }).catch(error => errorDeal(error));
      },
      toMap() {
        var w = document.documentElement.clientWidth,
          url = '',
          vm = this.$parent;
        w < 640 ? url = 'http://map.baidu.com/mobile/?latlng=' + vm.ajaxData2.details.latitude + ',' + vm.ajaxData2.details
          .longitude + '' : url = 'http://map.baidu.com/?latlng=' + vm.ajaxData2.details.latitude + ',' + vm.ajaxData2.details
          .longitude + '';
        window.open(url);
      },
      shiftPaySource(paySource) { //支付订单来源切换
        let vm = this.$parent;
        if (paySource.target) {
          let options = paySource.target.children;
          for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
              vm.form.paySource = options[i].value;
            }
          }
        } else {
          vm.form.paySource = paySource;
        }
        vm.getList();
      },
      close(v) {
        let vm = this.$parent,
          road = vm.searchRoad;
        vm.i--;
        if (vm.pagename && vm.pagename == "exclusiveNumber") {
          vm.ajaxData.details = ""
        } else {
          for (let i in road[vm.i]) {
            vm.$set(vm.form, vm.replacedian(i), road[vm.i][i])
          }
          if (vm.i == 0) {
            vm.searchRoad = [];
          }
        }
      },
      getDateTime(e) {
        return getDateTime(e);
      }
    }
  }
</script>

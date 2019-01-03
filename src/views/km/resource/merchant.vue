<!--**
  *@info 资源查询模块-商户
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<!--
    模块待重构
-->
<style scoped>
@import "../../../assets/km/css/merchant.css";
</style>
<template>
  <div id="merchantSearch">
    <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
    <section class="m-occlusion" :class="{active:off.isLoad}"></section>
    <div v-if="form.type!=1&&form.type!=2">
      <section class="g-search-form">
        <table class="g-base-table o-headTotal-table">
          <thead>
            <tr>
              <th style="width:1.5rem;font-weight:bold">统计</th>
              <th>商户</th>
              <th>工号</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>总数</td>
              <td>{{totalInfo.merchantTotal}}</td>
              <td>{{totalInfo.userTotal}}</td>
            </tr>
            <tr>
              <td>激活数</td>
              <td>{{totalInfo.merchantActiviteNum}}</td>
              <td>{{totalInfo.userActiviteNum}}</td>
            </tr>
            <tr>
              <td>已申请待激活数(游客)</td>
              <td>{{totalInfo.merchantActiviteWaitNum}}</td>
              <td>{{totalInfo.userActiviteWaitNum}}</td>
            </tr>
            <tr>
              <td>已申请未激活数</td>
              <td>{{totalInfo.merchantActiviteApplyNum}}</td>
              <td>{{totalInfo.userActiviteApplyNum}}</td>
            </tr>
          </tbody>
        </table>
        <!--基础条件-->
        <div class="m-tag"><b></b>条件查询</div>
        <section class="form-c">
          <div class="border-bottom">
            <!-- <span class="dp">查询内容：</span> -->
            <div class="m-form-radio">
              <label><span><input @click="changeSearchType" type="radio" value="1" v-model="form.content" checked="checked"><span></span></span><span
                  class="text" :class="{fCBlue:form.content==1}">商户查询</span></label>
              <label><span><input @click="changeSearchType" type="radio" value="2" v-model="form.content" checked="checked"><span></span></span><span
                  class="text" :class="{fCBlue:form.content==2}">工号查询</span></label>
            </div>
          </div>
          <div>
            <div v-if="form.content==1">
              <div style="margin-top:20px;color:#000">
                <span style="display:inline-block;width:88px;text-align:right;margin-right:10px" type="text">商户来源：</span>
                <div class="m-form-radio">
                  <label><span class="radio"><input type="radio" value="0" v-model="form.merchants" checked="checked"><span></span></span><span
                  class="text">全部</span></label>
                  <label><span class="radio"><input type="radio" value="1" v-model="form.merchants" checked="checked"><span></span></span><span
                  class="text">卡盟</span></label>
                  <label><span class="radio"><input type="radio" value="2" v-model="form.merchants" checked="checked"><span></span></span><span
                  class="text">新零售</span></label>
                </div>
              </div>
              <div class="m-form-radio">
                <label><span class="radioYes"><input @click="changeSearchType" type="radio" value="1" v-model="form.searchKind"
                      checked="checked"><span></span></span><span class="text">精确查找：</span></label>
              </div>
              <div class="m-form-radio">
                <label><span class="radio"><input @click="changeSearchType" type="radio" value="1" v-model="form.searchType"
                      checked="checked"><span></span></span><span class="text">商户ID</span></label>
                <label><span class="radio"><input @click="changeSearchType" type="radio" value="2" v-model="form.searchType"
                      checked="checked"><span></span></span><span class="text">员工手机号码</span></label>
                <div style="display:inline-block" class="col-r m-input">
                  <input v-model="form.searchContext" maxlength="24" type="tel" :placeholder="form.searchType==1 ? '请输入查询的商户ID':'请输入查询的手机号码'" />
                </div>
              </div>
            </div>
            <div v-if="form.content==2">
              <div style="margin-top:20px;color:#000">
                <span style="display:inline-block;width:88px;text-align:right;margin-right:10px" type="text">工号来源：</span>
                <div class="m-form-radio">
                  <label><span class="radio"><input type="radio" value="0" v-model="form.merchants" checked="checked"><span></span></span><span
                  class="text">全部</span></label>
                  <label><span class="radio"><input type="radio" value="1" v-model="form.merchants" checked="checked"><span></span></span><span
                  class="text">卡盟</span></label>
                  <label><span class="radio"><input type="radio" value="2" v-model="form.merchants" checked="checked"><span></span></span><span
                  class="text">新零售</span></label>
                </div>
              </div>
              <div class="m-form-radio">
                <label><span class="radioYes"><input @click="changeSearchType" type="radio" value="1" v-model="form.searchKind"
                      checked="checked"><span></span></span><span class="text">精确查找：</span></label>
              </div>
              <div class="m-form-radio">
                <label><span class="radio"><input @click="changeSearchType" type="radio" value="1" v-model="form.searchType"
                      checked="checked"><span></span></span><span class="text">工号ID</span></label>
                <label><span class="radio"><input @click="changeSearchType" type="radio" value="2" v-model="form.searchType"
                      checked="checked"><span></span></span><span class="text">手机号码</span></label>
                <div style="display:inline-block" class="col-r m-input">
                  <input v-model="form.searchContext" maxlength="24" type="tel" :placeholder="form.searchType==1 ? '请输入查询的工号ID':'请输入查询的手机号码'" />
                </div>
              </div>
            </div>
          </div>
          <div class="m-form-radio">
            <label><span class="radioYes"><input @click="changeSearchType" type="radio" value="2" v-model="form.searchKind"
                  checked="checked"><span></span></span><span class="text">组合查找：</span></label>
          </div>
          <div class="row clr m-col-2">
            <div class="dp col-l">创建时间：</div>
            <div class="col-r">
              <span class="m-time-area"><input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"><input
                  @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
            </div>
          </div>
          <div class="row clr m-col-2" v-if="form.content==1">
            <span class="dp">商户名称：</span>
            <div style="display:inline-block;width:60%;">
              <input v-model="form.searchDealerName" maxlength="24" type="tel" placeholder="请输入查询的商户名称" />
            </div>
          </div>
          <div class="row clr m-col-2" v-if="form.content==2">
            <span class="dp">用户名称：</span>
            <div style="display:inline-block;width:60%;">
              <input v-model="form.searchDealerName" maxlength="24" type="tel" placeholder="请输入查询的用户名称" />
            </div>
          </div>
          <div class="row pdl" v-if="form.content==1">
            <span class="dp">激活状态：</span>
            <div class="m-form-radio">
              <label><span class="radio"><input type="radio" value="-1" v-model="form.activationState" checked="checked"><span></span></span><span
                  class="text">全部</span></label>
              <label><span class="radio"><input type="radio" value="0" v-model="form.activationState" checked="checked"><span></span></span><span
                  class="text">已激活</span></label>
              <label><span class="radio"><input type="radio" value="1" v-model="form.activationState" checked="checked"><span></span></span><span
                  class="text">待激活</span></label>
              <label><span class="radio"><input type="radio" value="3" v-model="form.activationState" checked="checked"><span></span></span><span
                  class="text">激活审核中</span></label>
            </div>
          </div>

          <div class="row pdl" v-if="form.content==1">
            <span class="dp">售卡范围：</span>
            <div class="m-form-checkbox">
              <label><span class="checkbox"><input type="checkbox" value="1" v-model="form.businessScope" checked="checked"><span></span></span><span
                  class="text">远特售卡</span></label>
              <label><span class="checkbox"><input type="checkbox" value="2" v-model="form.businessScope" checked="checked"><span></span></span><span
                  class="text">联通售卡</span></label>
            </div>
          </div>
          <button class="f-btn f-btn-line" @click="searchList(1)">查询</button>
        </section>
      </section>
      <!-- 商户查询结果列表 -->
      <div class="m-total-table" style="margin-top: 0.2rem;" v-if="form.content==1">
        <section v-if="searchResultList.list">
          <table v-if="searchResultList.list.length">
            <thead>
              <tr>
                <th class="total-head" colspan="12" style="background-color:#fff;text-align:left;padding-left:20px;">
                  统计结果<b>{{total}}</b><button class="btn_export_excel" v-if="searchResultList.maxpage" @click="downLoadList">导出excel</button>
                </th>
              </tr>
              <tr>
                <th>序号</th>
                <th>创建时间</th>
                <th>商户ID</th>
                <th>商户名称</th>
                <th>商户属性</th>
                <th>商户类型</th>
                <th>商户来源</th>
                <th>商户等级</th>
                <th>激活状态</th>
                <th>售卡范围</th>
                <th>签约状态</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in searchResultList.list" :key="index">
                <td>{{ ((searchResultList.pageNum-1)*10+(index+1)) }}</td>
                <td>{{ getDateTime(item.create_time)[6] }}</td>
                <td>{{item.dealer_id}}</td>
                <td>{{item.company_name||"--"}}</td>
                <td>
                  <span>{{item.merchant_type}}</span>
                  <!-- <span v-if="item.merchant_type==1">企业</span>
                                    <span v-if="item.merchant_type==2">个人</span> -->
                </td>
                <td>{{item.user_type_name}}</td>
                <td>{{item.sourceType==1?'卡盟商户':item.sourceType==2?'新零售商户':'--'}}</td>
                <td>
                  <span v-if="item.showLevel==1">普通用户</span>
                  <span v-if="item.showLevel==2">白金用户</span>
                  <span v-if="item.showLevel==3">vip用户</span>
                </td>
                <td>
                  <span v-if="item.status==0">已激活</span>
                  <span v-if="item.status==1">待激活</span>
                  <span v-if="item.status==3">激活审核中</span>
                </td>
                <td>
                  <span v-if="item. merchant_attribute.indexOf('1')>-1">远特</span>
                  <span v-if="item. merchant_attribute.indexOf('2')>-1">联通</span>
                </td>
                <td>{{item.isSignAgreement}}</td>
                <td><a :name="item.dealer_id" @click="details(item.dealer_id,form.content,1)" href="javascript:void(0)"
                    class="details">详情</a></td>
              </tr>
            </tbody>
          </table>
          <my-page :page="searchResultList.pageNum" :maxpage="searchResultList.maxpage" :callback="searchResultList.callback"></my-page>
        </section>
      </div>
      <!-- 工号查询结果列表 -->
      <div class="m-total-table" style="margin-top: 0.2rem;" v-if="form.content==2">
        <section v-if="searchResultList2.list">
          <table v-if="searchResultList2.list.length">
            <thead>
              <tr>
                <th class="total-head" colspan="9" style="background-color:#fff;text-align:left;padding-left:20px;">
                  统计结果<b>{{total}}</b><button class="btn_export_excel" v-if="searchResultList2.maxpage" @click="downLoadList">导出excel</button>
                </th>
              </tr>
              <tr>
                <th>序号</th>
                <th>创建时间</th>
                <th>用户姓名</th>
                <th>卡盟ID</th>
                <th>登录手机号码</th>
                <th>所属商户名称</th>
                <th>工号来源</th>
                <th>当前城市</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in searchResultList2.list" :key="index">
                <td>{{ ((searchResultList2.pageNum-1)*10+(index+1)) }}</td>
                <td>{{ getDateTime(item.create_time)[6]||'--' }}</td>
                <td>{{item.customerName||'--'}}</td>
                <td>{{item.userid||"--"}}</td>
                <td>{{item.phone||'--'}}</td>
                <td>{{item.company_name||'--'}}</td>
                <td>{{item.sourceType==1?'卡盟商户':item.sourceType==2?'新零售商户':'--'}}</td>
                <td>{{item.Cityname||'--'}}</td>
                <td><a :name="item.dealer_id" @click="details(item.userid,2,2)" href="javascript:void(0)" class="details">详情</a></td>
              </tr>
            </tbody>
          </table>
          <my-page :page="searchResultList2.pageNum" :maxpage="searchResultList2.maxpage" :callback="searchResultList2.callback"></my-page>
        </section>
      </div>
    </div>
    <!-- 详情 -->
    <merchantDetails v-if="ajaxData.details||ajaxData2.details" :searchRoad="searchRoad" :_form="form" :_off="off"
      :_ajaxData="ajaxData" :_ajaxData2="ajaxData2"></merchantDetails>
    <!--查看商户照片-->
    <Pop v-if="off.pop" :callBack="closePop">
      <div slot="content" style="height:500px">
        <ImgZoom :imgData="merchantImgData"></ImgZoom>
      </div>
    </Pop>
    <!--修改商户信息-->
    <ModifyInfo v-if="off.modifyInfo" :merchantInfo="ajaxData.details" v-on:details="details" ref="ModifyInfoCase"></ModifyInfo>
  </div>
</template>
<script>
import {
  reqCommonMethod,
  requestGetMerchantList
} from "../../../config/service.js";
import {
  getDateTime,
  errorDeal,
  createDownload,
  getStore
} from "../../../config/utils.js";
import pagination from "../../../componentskm/page.vue";
import Pop from "../../../componentskm/pop";
import ImgZoom from "../../../componentskm/ImgZoom";
import ModifyInfo from "../../../componentskm/more/modifyMerchantInfo";
import merchantDetails from "../../../componentskm/merchantDetails";
export default {
  name: "merchantSearch",
  data() {
    return {
      dealerInfo: "",
      downLoadData: "",
      total: 0,
      i: 0,
      searchRoad: [],
      merchantImgData: [], //商户照片存储
      dataList: "",
      checkAllmerchants:true,
      searchResultList: {
        list: "",
        maxpage: 0, //最大页数
        pageNum: 1, //当前页
        callback: Function //分页响应函数
      },
      searchResultList2: {
        list: "",
        maxpage: 0, //最大页数
        pageNum: 1, //当前页
        callback: Function //分页响应函数
      },
      off: {
        isLoad: !1, //ajax加载控制
        detailskind: "",
        pop: 0, //弹出组件开关
        modifyInfo: 0 //显示修改商户资料开关
      },
      form: {
        content: 1, //1:商户，2:工号
        searchContext: "", //输入框查询内容
        searchType: 1, //查询类型
        inputContext: "", //输入内容
        context: "",
        activationState: -1,
        businessScope: [1, 2],
        merchants:0,
        startTime: "",
        endTime: "",
        time: "", //点击时间控制
        paySource: 2, //第三方流水号，来源(1:保证金,2:充值,3:开卡,4:代充)
        startTime: "",
        endTime: "",
        type: "3",
        searchKind: "1", //true:精确查找false:组合查找
        searchDealerName: "" //商户名称
      },
      ajaxData: {
        //ajax响应数据
        details: "", //商户/工号详情
        list: [], //第三方流水号列表/用户列表
        maxpage: 0, //最大页数
        maxpage1: 0, //第三方支付查询结果页码
        pageNum: 1, //当前页
        callback: Function, //分页响应函数
        total: 0 //列表总条数
      },
      ajaxData2: {
        //ajax响应数据
        details: "", //商户/工号详情
        list: [], //第三方流水号列表/用户列表
        maxpage: 0, //最大页数
        maxpage1: 0, //第三方支付查询结果页码
        pageNum: 1, //当前页
        callback: Function, //分页响应函数
        total: 0 //列表总条数
      },
      totalInfo: {
        //头部数据统计
        merchantTotal: 0,
        merchantActiviteNum: 0,
        merchantActiviteWaitNum: 0,
        merchantActiviteApplyNum: 0,
        userTotal: 0,
        userActiviteNum: 0,
        userActiviteWaitNum: 0,
        userActiviteApplyNum: 0
      }
    };
  },
  components: {
    "my-page": pagination,
    merchantDetails: merchantDetails,
    Pop,
    ImgZoom,
    ModifyInfo
  },
  created() {
    var vm = this;
    setTimeout(function() {
      vm.getTotal();
      let val = vm.$route.params.val;
      if (val != "null") {
        vm.form.type = 1;
        if (val.indexOf("phone") > -1) {
          vm.form.type = 2;
          val = parseInt(val);
        }
        vm.form.context = val;
        vm.form.searchContext = val;
        vm.form.searchKind = 1;
        vm.getDetails();
      }
    }, 300);
    vm.init();
  },
  methods: {
    init: function() {
      var vm = this,
        type = this.$route.params.type;
      type == "pending"
        ? (vm.off.type = 1)
        : type == "processing"
          ? (vm.off.type = 2)
          : type == "finish"
            ? (vm.off.type = 3)
            : void 0;
      vm.form.startTime = laydate.now(0, "YYYY-MM-DD 00:00:00");
      vm.form.endTime = laydate.now(0, "YYYY-MM-DD 23:59:59");
    },
    closePop(off) {
      this.off.pop = off;
    },
    searchList(index, page) {
      let vm = this,
        searchData = {
          chooseSearch: vm.form.searchKind, //1精确查找,2组合查找
          getListType: vm.form.content, //1商户查询2工号查询
          merchType:vm.form.merchants,//商户 卡盟、新零售
          userName: "", //商户名称
          typeKey: "", //商户id，手机号码
          typeValue: "", //商户id,手机号码的值
          timeStar: "",
          timeEnd: "",
          status: "",
          merchant_attribute: "",
          pageSize: 10,
          pageNum: page || 1
        };
      let searchDatajq = {
        typeKey: vm.form.searchType,
        typeValue: vm.form.searchContext
      };
      let searchDatazh = {
        timeStar: new Date(vm.form.startTime.replace(/-/g, "/")).getTime(),
        timeEnd: new Date(vm.form.endTime.replace(/-/g, "/")).getTime(),
        username: vm.form.searchDealerName //商户名称
      };
      if (vm.form.searchKind == "1") {
        Object.assign(searchData, searchDatajq);
      } else if (vm.form.searchKind == "2") {
        Object.assign(searchData, searchDatazh);
      }

      if (vm.form.content == 1 && vm.form.searchKind == "2") {
        let businessScope = vm.form.businessScope.join(",");
        Object.assign(searchData, {
          status: vm.form.activationState,
          merchant_attribute: businessScope
        });
      }
      if (vm.form.searchKind == "1" && vm.form.searchContext == "") {
        layer.open({
          content: "请输入查询内容",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      }
      vm.downLoadData = searchData;
      vm.searchRoad.push({
        "vm.form.type": vm.form.type
      });
      vm.i = vm.searchRoad.length;
      requestGetMerchantList(searchData, function() {
        vm.off.isLoad = false;
      })
        .then(data => {
          if (data.code == 200) {
            vm.total = data.data.total;
            vm.form.content == 1
              ? (vm.searchResultList.list = data.data.list)
              : (vm.searchResultList2.list = data.data.list);
            vm.form.content == 1
              ? (vm.searchResultList.maxpage = Math.ceil(
                  parseInt(data.data.total) / 10
                ))
              : (vm.searchResultList2.maxpage = Math.ceil(
                  parseInt(data.data.total) / 10
                ));
            vm.form.content == 1
              ? (vm.searchResultList.pageNum = page || 1)
              : (vm.searchResultList2.pageNum = page || 1);
            vm.form.content == 1
              ? (vm.searchResultList.callback = function(v) {
                  vm.searchList(index, v);
                })
              : (vm.searchResultList2.callback = function(v) {
                  vm.searchList(index, v);
                });
          } else {
            errorDeal(data);
          }
        })
        .catch(e => errorDeal(e));
    },
    downLoadList() {
      let vm = this,
        url = "km-ecs/w/merchant/listDownload",
        userInfo = getStore("KA_ECS_USER"),
        customerId = userInfo.customerId,
        codeId = userInfo.codeId;
      vm.downLoadData.customerId = customerId;
      vm.downLoadData.codeId = codeId;
      delete vm.downLoadData.pageSize;
      delete vm.downLoadData.pageNum;

      createDownload(
        url,
        BASE64.encode(JSON.stringify(vm.downLoadData)),
        function() {
          vm.off.isLoad = false;
        }
      );
    },

    getTotal() {
      //获取顶部统计数据
      var vm = this;
      reqCommonMethod(
        {},
        function() {
          vm.off.isLoad = false;
        },
        "km-ecs/w/merchant/statistics"
      )
        .then(data => {
          vm.totalInfo = data.data;
        })
        .catch(error => errorDeal(error));
    },

    details(context, type, i) {
      //商户上用户列表查看用户，用户上查看商户
      let vm = this;
      if (i !== "x") {
        vm.searchRoad.push({
          "vm.form.type": vm.form.type
        });
      }
      vm.i = vm.searchRoad.length;
      vm.off.detailskind = i;
      vm.form.type = type;
      vm.form.context = context;
      vm.getDetails();
    },
    getDetails(isBtn) {
      //获取商户/工号基本信息
      var vm = this,
        type = vm.form.type,
        json,
        url,
        time = new Date().getTime();
      type == 1
        ? ((json = {
            dealerId: vm.form.context
          }),
          (url = "km-ecs/w/merchant/getInfo"))
        : ((json = {
            userId: vm.form.context
          }),
          (url = "km-ecs/w/user/getInfo"));
      if (vm.off.isLoad) return false;
      if (isBtn && vm.form.time && time - vm.form.time < 3000) {
        return false;
      } else if (type == 1 && !json.dealerId) {
        layer.open({
          content: "请输入商户ID",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (type == 2 && !json.userId) {
        layer.open({
          content: "请输入工号ID",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      }
      vm.form.time = time;
      vm.off.isLoad = true;

      reqCommonMethod(
        json,
        function() {
          vm.off.isLoad = false;
        },
        url
      )
        .then(data => {
          vm.form.type == 1
            ? (vm.ajaxData.details = data.data)
            : (vm.ajaxData2.details = data.data);
          vm.off.isLoad = false;
          vm.getList();
        })
        .catch(error => errorDeal(error));
    },
    getList(page) {
      //获取第三方支付订单列表/获取用户列表
      var vm = this,
        type = vm.form.type,
        url,
        json;
      type == 1
        ? ((json = {
            dealerId: vm.form.context
          }),
          (url = "km-ecs/w/audit/getUsersDetail"))
        : ((json = {
            phone: vm.form.context,
            pageNum: page || 1,
            pageSize: 10,
            type: vm.form.paySource
          }),
          (url = "km-ecs/w/user/paymengList"));
      if (vm.off.isLoad) return false;
      vm.off.isLoad = true;
      reqCommonMethod(
        json,
        function() {
          vm.off.isLoad = false;
        },
        url
      )
        .then(data => {
          type == 1
            ? vm.$set(vm.ajaxData, "list", data.data.list)
            : vm.$set(vm.ajaxData2, "list", data.data.list);
          type == 1
            ? (vm.ajaxData.total = data.data.total || 0)
            : (vm.ajaxData2.total = data.data.total || 0);
          type == 1
            ? (vm.ajaxData.maxpage1 = Math.ceil(
                parseInt(data.data.list.length) / 10
              ))
            : (vm.ajaxData2.maxpage1 = Math.ceil(
                parseInt(data.data.list.length) / 10
              ));
          type == 1
            ? (vm.ajaxData.pageNum = page || 1)
            : (vm.ajaxData2.pageNum = page || 1);
          type == 1
            ? (vm.ajaxData.callback = function(v) {
                vm.getList(v);
              })
            : (vm.ajaxData2.callback = function(v) {
                vm.getList(v);
              });
          vm.off.isLoad = false;
          type == 1
            ? (vm.dealerInfo = vm.ajaxData)
            : (vm.dealerInfo = vm.ajaxData2);
        })
        .catch(error => errorDeal(error));
    },
    getDateTime: function(e) {
      return getDateTime(e);
    },
    to_laydate: function(v) {
      var vm = this;
      laydate({
        istime: true,
        format: "YYYY-MM-DD hh:mm:ss",
        isclear: false,
        choose: function(dates) {
          //选择好日期的回调
          v == 1 ? (vm.form.startTime = dates) : (vm.form.endTime = dates);
        }
      });
    },
    replacedian(str) {
      var index = str.lastIndexOf(".");
      return str.substring(index + 1, str.length);
    },
    changeSearchType() {
      let vm = this;
      (vm.form.searchContext = ""),
        (vm.form.searchDealerName = ""),
        (vm.ajaxData = {
          //ajax响应数据
          details: "", //商户/工号详情
          list: [], //第三方流水号列表/用户列表
          maxpage: 0, //最大页数
          maxpage1: 0, //第三方支付查询结果页码
          pageNum: 1, //当前页
          callback: Function, //分页响应函数
          total: 0 //列表总条数
        }),
        (vm.ajaxData2 = {
          //ajax响应数据
          details: "", //商户/工号详情
          list: [], //第三方流水号列表/用户列表
          maxpage: 0, //最大页数
          maxpage1: 0, //第三方支付查询结果页码
          pageNum: 1, //当前页
          callback: Function, //分页响应函数
          total: 0 //列表总条数
        });
    }
  }
};
</script>
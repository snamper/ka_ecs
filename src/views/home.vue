<style>
  @import "../assets/km/css/home.css";
</style>
<template>
  <div id="home" :class={active:off.headMenu} ref="psec">
    <header class="g-head">
      <table cellspacing="0">
        <tbody>
          <tr>
            <td>
              <a class="m-navside-show" @click="headMenu"><i class="u-icon-menu"></i></a>
              <!-- <span v-if="crumb[1].name" class="f-inline-block m-crumb">
                <a>{{crumb[0].name}}</a>
                <a class="u-icon-right mid"></a>
                <a v-show="!crumb[1].href">{{crumb[1].name}}</a>
                <router-link v-show="crumb[1].href" :to="crumb[1].href">{{crumb[1].name}}</router-link>
                <span v-show="crumb[2].name">
                  <a class="u-icon-right mid"></a>
                  <a>{{crumb[2].name}}</a>
                </span>
              </span> -->
              <BreadCrumbList :list="breadCrumbList" class="f-inline-block" />
            </td>
            <td class="f-tar">
              <div class="m-user-online">Online <b>{{onlineTime}}</b></div>
              <div class="m-info-user"><i></i><span>{{userInfo.customerName}}</span></div>
              <div class="m-menu-user">
                <a @click="userMenu"><i class="u-icon-menu2"></i></a>
                <ul class="m-user-dropdown f-tas" :class="{active:off.userMenu}">
                  <li>
                    <a class="user clr">
                      <div class="logo fl"></div>
                      <div class="info f-tal">
                        <div class="author">{{userInfo.customerName}}</div><time class="online">online：<b>{{onlineTime}}</b></time>
                      </div>
                    </a>
                  </li>
                  <li><a @click="clickSignOut">退出</a></li>
                </ul>
              </div>

            </td>
          </tr>
        </tbody>
      </table>
    </header>
    <aside class="g-side f-scroll-lt">
      <nav class="g-side-nav">
        <header class="g-side-head"><img src="../assets/images/logo_page.png" alt="titleLogo"></header>
        <ul class="m-mainCatalog">
          <li :class="{'active':isCheckk}" @click="isCheck('k')" v-if="!off.powerKmHidden">
            <span>卡盟</span>
            <b class="animated m-lighter" :class="{bounce:offCountChange}" v-if="countTotal||opinionCount[0]">{{countTotal+opinionCount[0]}}</b>
          </li>
          <li :class="{'active':isChecky}" @click="isCheck('y')" v-if="!off.powerYmHidden">
            <span>远盟</span>
            <b class="animated m-lighter" :class="{bounce:offCountChange}" v-if="off.power0||off.power1" v-show="auditCountYm.readyCard+auditCountYm.whiteCard+auditCountYm.newChangeCard+auditCountYm.realNameCollection+auditCountYm.fill">{{auditCountYm.readyCard+auditCountYm.whiteCard+auditCountYm.newChangeCard+auditCountYm.realNameCollection+auditCountYm.fill}}</b>
          </li>
        </ul>
        <ul class="g-side-ul" :class="{'hide':!isCheckk}" v-if="!off.powerKmHidden">
          <!--数据面板-->
          <router-link tag="li" to="/homek/dashboard">
            <b></b>
            <div>
              <i class="u-icon-chart"></i>
              <span>数据面板</span>
            </div>
          </router-link>
          <!--订单审核-->
          <router-link v-if="off.powerKm_sh_sh||off.powerKm_kk_sh" tag="li" to="/homek/audit">
            <div>
              <i class="u-icon-audit"></i>
              <span>订单审核</span>
              <b class="animated m-lighter" :class="{bounce:offCountChange}" v-show="countTotal">{{countTotal}}</b>
            </div>
            <ul class="g-side-subul nav1">  
              <router-link v-if="off.powerKm_kk_sh" tag="li" :to="{path:'/homek/audit/card/realtime',params:{source:'realtime'}}">
                <b></b>业务实时审核<span v-if="auditCount.opencard+auditCount.transfer+auditCount.realNameCollection+auditCount.tfOpenCardReal+auditCount.sdkRealTime+auditCount.realNameRechCard!=0">{{auditCount.opencard+auditCount.transfer+auditCount.realNameCollection+auditCount.tfOpenCardReal+auditCount.sdkRealTime+auditCount.realNameRechCard}}</span>
              </router-link>
              <router-link v-if="off.powerKm_kk_sh" tag="li" :to="{path:'/homek/audit/card/afterwards',params:{source:'afterwards'}}">
                <b></b>业务事后审核<span v-if="auditCount.opencardAfterwards+auditCount.tfOpenCard!=0">{{auditCount.opencardAfterwards+auditCount.tfOpenCard}}</span>
              </router-link>
              <router-link v-if="off.powerKm_sh_sh" tag="li" :to="{path:'/homek/audit/businessPower/auditing',params:{type:'auditing'}}">
                <b></b>售卡范围审核<span v-if="auditCount.attribute!=0">{{auditCount.attribute}}</span>
              </router-link>
              <router-link v-if="off.powerKm_sh_sh" tag="li" :to="{path:'/homek/audit/registMerchant/realtime',params:{source:'realtime'}}">
                <b></b>商户实时审核<span v-if="auditCount.registerMerchantRealTime+auditCount.fillMerchantRealTime!=0">{{auditCount.registerMerchantRealTime+auditCount.fillMerchantRealTime}}</span>
              </router-link>
              <router-link v-if="off.powerKm_sh_sh" tag="li" :to="{path:'/homek/audit/registMerchant/afterwards',params:{source:'afterwards'}}">
                <b></b>商户事后审核<span v-if="auditCount.registerMerchantAfter!=0">{{auditCount.registerMerchantAfter}}</span>
              </router-link>
            </ul>
          </router-link>
          <!--订单查询-->
          <router-link v-if="off.powerKm_kk_cx||off.powerKm_sh_cx" tag="li" to="/homek/orderSearch">
            <b></b>
            <div>
              <i class="u-icon-search"></i>
              <span>订单查询</span>
            </div>
            <ul class="g-side-subul nav2">
              <router-link v-if="off.powerKm_kk_cx" tag="li" to="/homek/orderSearch/card"><b></b>业务订单</router-link>
              <router-link v-if="off.powerKm_kk_cx" tag="li" to="/homek/orderSearch/recharge"><b></b>充值订单</router-link>
              <router-link v-if="off.powerKm_kk_cx" tag="li" to="/homek/orderSearch/onlineHall"><b></b>网厅订单</router-link>
              <router-link v-if="off.powerKm_sh_cx" tag="li" :to="{path:'/homek/orderSearch/businessPower/audited',params:{type:'audited'}}"><b></b>售卡范围</router-link>
              <router-link v-if="off.powerKm_sh_cx" tag="li" :to="{path:'/homek/orderSearch/registMerchant/search',params:{type:'search'}}"><b></b>激活商户</router-link>
              <router-link v-if="off.powerKm_sh_cx" tag="li" :to="{path:'/homek/orderSearch/fillMerchant/search',params:{type:'search'}}"><b></b>补录商户</router-link>
              <router-link v-if="off.powerKm_kk_cx" tag="li" to="/homek/orderSearch/reserve"><b></b>预占号码</router-link>
              <router-link tag="li" :to="{path:'/homek/orderSearch/makeCard/null',params:{val:'null'}}"><b></b>制卡订单</router-link>
              <router-link tag="li" :to="{path:'/homek/orderSearch/flowCard/null',params:{val:'null'}}"><b></b>流转订单</router-link>
            </ul>
          </router-link>
          <!--资源查询-->
          <router-link v-if="off.powerKm_sh_cx" tag="li" to="/homek/resource">
            <b></b>
            <div>
              <i class="u-icon-searchResource"></i>
              <span>资源查询</span>
            </div>
            <ul class="g-side-subul nav3">
              <router-link v-if="off.powerKm_sh_cx" tag="li" :to="{path:'/homek/resource/merchant/null',params:{val:'null'}}"><b></b>商户查询</router-link>
              <router-link v-if="off.powerKm_sh_cx" tag="li" :to="{path:'/homek/resource/device/null',params:{val:'null'}}"><b></b>设备查询</router-link>
              <router-link v-if="off.powerKm_sh_cx" tag="li" :to="{path:'/homek/resource/promoter/null',params:{val:'null'}}"><b></b>推广方查询</router-link>
              <router-link tag="li" :to="{path:'/homek/resource/ordinaryExclusive/null',params:{val:'null'}}"><b></b>大众号查询</router-link>
              <router-link tag="li" :to="{path:'/homek/resource/exclusive/null',params:{val:'null'}}"><b></b>专营号查询</router-link>
              <router-link tag="li" :to="{path:'/homek/resource/specialExclusive/null',params:{val:'null'}}"><b></b>商户专营号查询</router-link>
              <router-link tag="li" :to="{path:'/homek/resource/simCard/null',params:{val:'null'}}"><b></b>SIM卡查询</router-link>
            </ul>
          </router-link>
          <!--统计报表-->
          <router-link v-if="off.powerKm_bb_cx" tag="li" to="/homek/statistics">
            <b></b>
            <div>
              <i class="u-icon-statistics"></i>
              <span>统计报表</span>
            </div>
            <ul class="g-side-subul nav4">
              <router-link tag="li" to="/homek/statistics/cardOrder"><b></b>开卡统计下载</router-link>
              <router-link tag="li" :to="{path:'/homek/statistics/softwareUseTimes/idCard',params:{type:'idCard'}}"><b></b>身份证识别统计</router-link>
              <router-link tag="li" :to="{path:'/homek/statistics/softwareUseTimes/faceConfirm',params:{type:'faceConfirm'}}"><b></b>活体识别统计</router-link>
              <router-link tag="li" :to="{path:'/homek/statistics/softwareUseTimes/writeCard',params:{type:'writeCard'}}"><b></b>写卡记录统计</router-link>
            </ul>
          </router-link>
          <!--意见反馈-->
          <router-link tag="li" to="/homek/opinion" v-if="off.powerKm_yjfk_cx">
            <b></b>
            <div>
              <i class="u-icon-opinion"></i>
              <span>意见反馈</span>
              <b class="animated m-lighter" :class="{bounce:offCountChange}" v-show="opinionCount[0]">{{opinionCount[0]}}</b>
            </div>
          </router-link>
          <!--更多功能-->
          <router-link tag="li" to="/homek/more">
            <b></b>
            <div>
              <i class="u-icon-morefn"></i>
              <span>更多功能</span>
            </div>
          </router-link>
          <!--实名资源库-->
          <!-- <router-link tag="li" to="/homek/realNameResource">
            <b></b>
            <div>
              <i class="u-icon-morefn"></i>
              <span>实名资源库</span>
            </div>
          </router-link> -->
        </ul>

        <!-- 远盟目录 -->
        <ul class="g-side-ul" :class="{'hide':!isChecky}" v-if="!off.powerYmHidden">
          <router-link :to="{path:'/homey/audit/realtime',params:{source:'realtime'}}" tag="li" v-if="off.power0||off.power1">
            <b></b>
            <div><i class="u-icon-audit"></i><span>订单审核</span><b class="animated infinite bounce m-lighter" v-show="auditCountYm.readyCard+auditCountYm.whiteCard+auditCountYm.newChangeCard+auditCountYm.realNameCollection+auditCountYm.fill">{{auditCountYm.readyCard+auditCountYm.whiteCard+auditCountYm.newChangeCard+auditCountYm.realNameCollection+auditCountYm.fill}}</b></div>
          </router-link>
          <router-link to="/homey/search" tag="li" v-if="off.power2||off.power1">
            <b></b>
            <div><i class="u-icon-search"></i><span>订单查询</span></div>
          </router-link>
          <router-link to="/homey/points/" tag="li" v-if="off.power1||off.power5">
            <b></b>
            <div><i class="u-icon-points"></i><span>积分管理</span></div>
            <ul class="g-side-subul" :class="off.power5||off.power1?'Tall':'Talls'">
              <router-link to="/homey/points/search" tag="li"><b></b>用户积分查询</router-link>
              <router-link to="/homey/points/gain" tag="li"><b></b>积分获取详情</router-link>
              <router-link to="/homey/points/exchange" tag="li"><b></b>积分兑换详情</router-link>
              <router-link to="/homey/points/manage" tag="li" v-if="off.power5"><b></b>积分管理</router-link>
            </ul>
          </router-link>
          <router-link to="/homey/excelDownload" tag="li" v-if="off.power6||off.power1">
            <b></b>
            <div><i class="u-icon-downLoad"></i><span>日报excel</span></div>
          </router-link>
          <router-link to="/homey/illegalSearch" tag="li" v-if="off.power1||off.power2">
            <b></b>
            <div><i class="u-icon-illegalSearch"></i><span>违规查询</span></div>
          </router-link>
        </ul>
      </nav>
    </aside>
    <section class="g-main" id="main">
      <transition appear name="fadeInUp">
        <router-view></router-view>
      </transition>
    </section>
    <footer class="g-foot"></footer>
    <div id="routerLoading">
      <div class="circle-loader">
        <div class="circle-line">
          <div class="circle circle-blue"></div>
        </div>
        <div class="circle-line">
          <div class="circle circle-yellow"></div>
        </div>
        <div class="circle-line">
          <div class="circle circle-red"></div>
        </div>
        <div class="circle-line">
          <div class="circle circle-green"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapMutations, mapActions } from 'vuex';
  import { getStore, powerKm } from '../config/utils';
  import { signOut } from '../config/service';
  import BreadCrumbList from '@/components/breadCrumb';

  export default {
    data() {
      return {
        off: {
          powerKmHidden: 0, //卡盟隐藏
          powerYmHidden: 0, //远盟隐藏
          headMenu: true, //导航栏开关
          window: 0, //浏览器窗口宽度
          userMenu: 0, //用户菜单开关
          power: 0,
          power0: 0,
          power5: 0,
          power6: 0,
        },
        userInfo: {
          isadmin: ''
        },
        crumb:[{name:'0'},{name:'0'},{name:'0'},],
        breadCrumbList:[],
        isCheckk: false,
        isChecky: true,
        count: ''
      }
    },
    watch: {
      '$route':'routeChange',
    },
    beforeDestroy: function () {
      this.CLEAR_TIMER();
    },
    components:{
      BreadCrumbList
    },
    mounted: function () {
      this.init();
    },
    computed: {
      ...mapState([
        "onlineTime",
        "timer",
        "auditCount",
        "opinionCount",
        "countTotal",
        "auditCountYm",
        "offCountChange",
        "OpcountTotal",
        "countTotalYm",
      ]),
    },
    methods: {
      ...mapMutations([
        "SET_ONLINE_TIME",
        "CLEAR_TIMER",
        "SIGN_OUT",
        "SET_USERINFO"
      ]),
      ...mapActions([
        "getAuditStatisticsInfo",
        "getOpinionCountInfo",
        "getAuditStatisticsInfoYm",
      ]),
      async init() { //页面初始化
        let vm = this;
        vm.routeChange(); //头部面包屑导航
        let kmAuditInfo = vm.getAuditStatisticsInfo(); //km订单审核数统计
        let kmOpinionInfo = vm.getOpinionCountInfo(); //km意见反馈数统计
        let ymAuditInfo = vm.getAuditStatisticsInfoYm(); //ym订单审核数统计
        window.onresize = () => vm.debounce(300, vm.windowChange());
        vm.timer.count = setInterval(() => vm.getAuditStatisticsInfo(), 10000);
        vm.timer.OpcountT = setInterval(() => vm.getOpinionCountInfo(), 60000);
        vm.timer.countYm = setInterval(() => vm.getAuditStatisticsInfoYm(), 10000);
        vm.SET_ONLINE_TIME();
        let userInfo = getStore("KA_ECS_USER");
        vm.userInfo = userInfo;
        vm.SET_USERINFO(userInfo);
        document.attachEvent ? doucument.body.attachEvent("onclick", function (event) {
          vm.off.userMenu = false;
          window.event.cacenlBubble = false;
        }) : document.body.addEventListener("click", function (event) {
          vm.off.userMenu = false;
          event.stopPropagation();
        }, false);

        /* 远盟权限 */
        vm.userInfo.isadminYm && vm.userInfo.isadminYm.indexOf('1') > -1 ? vm.off.power1 = true : vm.off.power1 = false;
        vm.userInfo.isadminYm && (vm.userInfo.isadminYm.indexOf('1') > -1 || vm.userInfo.isadminYm.indexOf('2') > -1) ? vm.off.power2 = true : vm.off.power2 = false;
        vm.userInfo.isadminYm && (vm.userInfo.isadminYm.indexOf('1') > -1 || vm.userInfo.isadminYm.indexOf('0') > -1) ? vm.off.power0 = true : vm.off.power0 = false;
        vm.userInfo.isadminYm && (vm.userInfo.isadminYm.indexOf('1') > -1 || vm.userInfo.isadminYm.indexOf('5') > -1) ? vm.off.power5 = true : vm.off.power5 = false;
        vm.userInfo.isadminYm && (vm.userInfo.isadminYm.indexOf('1') > -1 || vm.userInfo.isadminYm.indexOf('6') > -1) ? vm.off.power6 = true : vm.off.power6 = false;

        /* 卡盟权限 */
        powerKm(this);
        vm.initMenu();
      },
      initMenu: function () {
        let vm = this;
        if (!vm.userInfo.isadmin) {
          vm.off.powerKmHidden = 1;
          vm.isChecky = 1;
        } else if (!vm.userInfo.isadminYm) {
          vm.off.powerYmHidden = 1;
          vm.isCheckk = 1;
        }
        let path = vm.$route.path;
        if (path.indexOf('homek') > -1) {
          vm.isCheckk = 1;
          vm.isChecky = 0;
        } else {
          vm.isCheckk = 0;
          vm.isChecky = 1;
        }
      },
      headMenu: function () { //侧边导航show or hide
        this.off.headMenu ? this.off.headMenu = false : this.off.headMenu = true;
      },
      routeChange: function () { //路由变化
        this.windowChange();
        //设置面包屑
        let breadCrumbList = [], isYm = false,
            currentPath = this.$route.path,
            currentParams = this.$route.params,//当前路由参数
            lastBreadCrumbName = '';//面包屑最后de名称

        this.$route.matched.forEach((item, index) => {
          if(index){// 排除第一个路由元

            breadCrumbList.push({
              to: item.path.replace(/:source/g,currentParams.source).replace(/:type/g,currentParams.type),//替换:source和:type
              name: item.name.replace(/卡盟|远盟/g,'')// 去除系统类型
            })
          }
        });

        if(this.$route.path.indexOf('homey') > -1){// 判断是否远盟系统
          isYm = true;
        }
        //末尾判断
        if(currentParams.type){
          
          switch (currentParams.type) {
            case 'auditing':
              lastBreadCrumbName = '待审核'
              break;
            case 'audited':
              lastBreadCrumbName = '已审核'
              break;
            case 'search':
              lastBreadCrumbName = '查询'
              break;
            case 'idCard':
              lastBreadCrumbName = '身份证识别统计'
              break;
            case 'faceConfirm':
              lastBreadCrumbName = '活体识别统计'
              break;
            case 'writeCard':
              lastBreadCrumbName = '写卡记录统计'
              break;
            case 'doing':
              lastBreadCrumbName = '进行中'
              break;
            case 'closed':
              lastBreadCrumbName = '已关闭'
              break;
            case 'pending':
              lastBreadCrumbName = '待处理'
              break;
            case 'finish':
              lastBreadCrumbName = '已完成'
              break;
            case '4,5,6':
              lastBreadCrumbName = '业务订单'
              break;
            case '1':
              lastBreadCrumbName = isYm ? '开成卡' : '实名补录';
              break;
            case '2':
              lastBreadCrumbName = isYm ? '开白卡' :'补换卡'
              break;
            case '3':
              lastBreadCrumbName = '过户办理'// 远盟系统
              break;
            case '4':
              lastBreadCrumbName = '实名补录'// 远盟系统
              break;
            case '5':
              lastBreadCrumbName = '实名登记'// 远盟系统
              break;
            case '7':
              lastBreadCrumbName = '过户办理'
              break;
            case '8':
              lastBreadCrumbName = 'SDK订单'
              break;
            case '9':
              lastBreadCrumbName = '远特i卡订单'
              break;
            default:
              lastBreadCrumbName = ''
              break;
          }
        }
        if(currentParams.source){// 目前只在审核模块使用
          
          switch (currentParams.source) {
            case 'realtime':
              lastBreadCrumbName += '实时审核'
              break;
            case 'afterwards':
              lastBreadCrumbName += '事后审核'
              break;
            default:
              lastBreadCrumbName += ''
              break;
          } 
        }

        if(lastBreadCrumbName){
          if(
            (currentParams.source && currentParams.type) || currentPath == '/homek/orderSearch/card/audited/null/null'// 订单审核路径和订单查询子项特殊处理
          ){
            breadCrumbList[breadCrumbList.length - 1] = {
              to: '',
              name: lastBreadCrumbName
            }
          }else breadCrumbList.push({
              to: '',
              name: lastBreadCrumbName
            })
        }
        this.breadCrumbList = breadCrumbList;
      },
      isCheck: function (i) { //远盟卡盟运维中心切换
        const vm = this;
        if (i === 'k') {
          vm.isCheckk = true;
          vm.isChecky = false;
        } else if (i === 'y') {
          vm.isChecky = true;
          vm.isCheckk = false;
        }
      },
      userMenu: function (e) { //用户菜单show or hide
        this.off.userMenu ? this.off.userMenu = false : this.off.userMenu = true;
        e.stopPropagation();
      },
      windowChange: function () { //窗口改变
        const vm = this;
        let w = window.innerWidth;
        let href = window.location.href;

        if (href.indexOf('dashboard') > -1 || w <= 960) {
          vm.off.headMenu = false;
        }

        vm.off.window = w;
      },
      debounce: function (time, action) { //节流函数
        let last;
        return function () {
          let ctx = this,
            args = arguments
          clearTimeout(last)
          last = setTimeout(function () {
            action.apply(ctx, args)
          }, time)
        }
      },
      clickSignOut: function () {
        var vm = this;
        signOut({}, function () {
          vm.load = false
        }).then(function (res) {
          vm.SIGN_OUT();
          vm.CLEAR_TIMER();
        });
      },
    }
  }
</script>

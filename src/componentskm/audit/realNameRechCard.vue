<style scoped>
.set-height {
  height: 3rem;
}
</style>
<template>
  <tbody>
    <tr>
      <td class="set-height">
        <table class="g-inner-table">
          <tbody>
            <tr>
              <td>订单号码：</td>
              <td>{{auditData.sysOrderId}}</td>
            </tr>
            <tr>
              <td>生成时间：</td>
              <td>{{getDateTime(auditData.createTime)[6]}}</td>
            </tr>
            <tr>
              <td>用户姓名：</td>
              <td>{{auditData.newUserName}}</td>
            </tr>
            <tr>
              <td>电话号码：</td>
              <td>{{auditData.phoneNumber}}【{{auditData.numberLevelDesc}}-{{auditData.home||'--'}}】</td>
            </tr>
            <tr>
              <td>开卡时间：</td>
              <td>{{auditData.oldReqParam.createTime}}</td>
            </tr>
            <tr v-if="examine">
              <td>号卡状态：</td>
              <td>{{translateData(4,auditData.orderStatus)}}</td>
            </tr>
            <tr v-if="examine">
              <td>审核状态：</td>
              <td>
                <span
                  v-if="auditData.status==1"
                  class="f-c-green"
                >同意</span>
                <span
                  v-if="auditData.status==2"
                  class="f-c-red"
                >拒绝</span>
                <span
                  v-if="auditData.status==3"
                  class="f-c-grey"
                >超时关闭</span>
              </td>
            </tr>
            <tr>
              <td>开卡子系统：</td>
              <td>{{auditData.oldSource}}</td>
            </tr>
            <tr>
              <td>证件类型：</td>
              <td>
                {{translateData(2,auditData.newPapersType)}}
              </td>
            </tr>
            <tr>
              <td>证件号码：</td>
              <td>{{auditData.newIdCard}}</td>
            </tr>
            <tr>
              <td>证件地址：</td>
              <td>{{auditData.reqParam.userAddress}}</td>
            </tr>
            <tr>
              <td>证件期限：</td>
              <td>{{auditData.reqParam.period}}</td>
            </tr>
            <tr>
              <td>操作人：</td>
              <td>{{auditData.operatorName}}【ID : {{auditData.operator||'--'}}】</td>
            </tr>
            <tr>
              <td>操作人IP：</td>
              <td>{{auditData.userInfo.ip||auditData.userInfo.host||'--'}}</td>
            </tr>
            <tr>
              <td>位置信息：</td>
              <td>{{auditData.userInfo.latitude||'--'}},{{auditData.userInfo.longitude||'--'}}
                <a
                  href="javascript:void(0)"
                  @click="toMap"
                  class="details m-l"
                >查看地图</a>
              </td>
            </tr>
            <tr>
              <td>渠道ID：</td>
              <td>{{auditData.dealerId}}</td>
            </tr>
            <tr>
              <td>商户名称：</td>
              <td>{{auditData.companyName}}【{{auditData.levelName||'--'}}】</td>
            </tr>
            <tr>
              <td>补换卡原因：</td>
              <td>{{auditData.reason||auditData.req_reason}}</td>
            </tr>
            <!-- <tr><td>失败原因：</td><td>{{auditData.errMsg}}</td></tr> -->
          </tbody>
        </table>
      </td>
      <td class="set-height">
        <table class="g-inner-table">
          <tbody>
            <tr>
              <td class="m-box-img">
                <ImgZoom :imgData="imgData"></ImgZoom>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</template>
<script>
import ImgZoom from "../ImgZoom";
import { getDateTime, translateData } from "../../config/utils.js";
export default {
  name: "realNameRechCard",
  props: {
    auditData: Object,
    imgData: Array,
    auditStatus: Number
  },
  data() {
    return {
      newImage: [],
      examine: false
    };
  },
  components: {
    ImgZoom
  },
  created: function() {
    let vm = this;
    
    vm.examine = this.$parent.$parent.off.examine;
  },
  methods: {
    getDateTime(e) {
      return getDateTime(e);
    },
    toMap() {
      var w = document.documentElement.clientWidth,
        url = "",
        vm = this;
      let latitude = parseFloat(vm.auditData.userInfo.latitude);
      let longitude = parseFloat(vm.auditData.userInfo.longitude);
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
    translateData(v, i) {
      return translateData(v, i);
    }
  }
};
</script>


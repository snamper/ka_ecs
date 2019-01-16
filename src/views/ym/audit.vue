<style scoped>
@import "../../assets/ym/css/audit.css";
</style>
<template>
  <section class="g-audit-menu">
    <div
      v-if="off.openMenu"
      class="g-audit-menu-c"
    >
      <div class="m-menu-div">
        <router-link
          :to="{path:'1',params:{type:1}}"
          append
          class="u-bg navBg2"
        >
          <div>成卡审核</div>
          <p><span>点击审核</span></p>
        </router-link>
        <div class="navInfoDiv">
          <p>待审核<span>{{auditCountYm.readyCard}}</span></p>
          <p>已分配<span>{{auditCountYm.readyCard_1}}</span></p>
        </div>
      </div>
      <div class="m-menu-div">
        <router-link
          :to="{path:'2',params:{type:2}}"
          append
          class="u-bg navBg3"
        >
          <div>白卡审核</div>
          <p><span>点击审核</span></p>
        </router-link>
        <div class="navInfoDiv">
          <p>待审核<span>{{auditCountYm.whiteCard}}</span></p>
          <p>已分配<span>{{auditCountYm.whiteCard_1}}</span></p>
        </div>
      </div>
      <div class="m-menu-div">
        <router-link
          :to="{path:'3',params:{type:3}}"
          append
          class="u-bg navBg5"
        >
          <div>过户办理</div>
          <p><span>点击审核</span></p>
        </router-link>
        <div class="navInfoDiv">
          <p>待审核<span>{{auditCountYm.newChangeCard}}</span></p>
          <p>已分配<span>{{auditCountYm.newChangeCard_1}}</span></p>
        </div>
      </div>
      <div class="m-menu-div">
        <router-link
          :to="{path:'4',params:{type:4}}"
          append
          class="u-bg navBg4"
        >
          <div>实名补录</div>
          <p><span>点击审核</span></p>
        </router-link>
        <div class="navInfoDiv">
          <p>待审核<span>{{auditCountYm.realNameCollection}}</span></p>
          <p>已分配<span>{{auditCountYm.realNameCollection_1}}</span></p>
        </div>
      </div>
      <div class="m-menu-div">
        <router-link
          :to="{path:'5',params:{type:5}}"
          append
          class="u-bg navBg6"
        >
          <div>实名登记</div>
          <p><span>点击审核</span></p>
        </router-link>
        <div class="navInfoDiv">
          <p>待审核<span>{{auditCountYm.fill}}</span></p>
          <p>已分配<span>{{auditCountYm.fill_1}}</span></p>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </section>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { getStore } from "../../config/utils";
export default {
  name: "audit",
  data() {
    return {
      off: {
        openMenu: true
      },
      count: ""
    };
  },
  computed: {
    ...mapState(["auditCountYm", "countTotalYm"])
  },
  created: function() {
    var vm = this;
    vm.count = {
      code: "200",
      msg: "success",
      data: {
        changeCard_1: "0",
        changeCard: "0",
        realNameCollection: "0",
        fill: "0",
        fill_1: "0",
        readyCard_1: "0",
        whiteCard_1: "0",
        newChangeCard_1: "0",
        type_1: "0,2,3,4",
        newChangeCard: "0",
        whiteCard: "0",
        readyCard: "0",
        realNameCollection_1: "0"
      }
    };
    vm.setType();
  },
  watch: {
    $route: "setType"
  },
  methods: {
    ...mapActions(["getAuditStatisticsInfoYm"]),
    setType: function() {
      if(this.$route.params.type){
        this.off.openMenu = false;
      }else this.off.openMenu = true;
    }
  }
};
</script>


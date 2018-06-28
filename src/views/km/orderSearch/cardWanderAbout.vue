<style scoped>
  .f-dis-inline-block{width:70px;line-height: 35px;}
  .inputOrderId{width: 70%;border-top-right-radius: 0;border-bottom-right-radius: 0;}
  .searchBtn{width: 30%;height: 35px;background: #fff;border: 1px solid #bfcbd9;border-left: 0;outline: none;border-top-right-radius: 7px;border-bottom-right-radius: 7px}
  .searchBtn:hover{background: #20a0ff;color: #fff;border: 1px solid #20a0ff}
</style>
<template>
  <div id="search">
    <Row>
      <Col span="24" class="f-padding-left2"><b class="u-arrow"></b>精确查询</Col>
      <Col span="24" class="f-dis-flex f-bgc-white f-border-radius4 m-search-padding f-margin-top1">
          <span class="f-dis-inline-block">订单号码 </span>
          <Col :xs="20" :sm="18" :md="12" :lg="12">
            <input v-model="orderId" maxlength="30" placeholder="请输入查询的订单号码" class="inputOrderId" type="text"><button class="searchBtn">查询</button>
          </Col> 
      </Col>
    </Row>
    <Row>
      <Col span="24" class="f-padding-left2 f-margin-top1"><b class="u-arrow"></b>条件查询</Col>      
      <Col span="24" class="f-dis-flex f-bgc-white f-border-radius4 m-search-padding f-margin-top1">
          <Col span="24">
            <Col :xs="22" :sm="20" :md="12" :lg="12">
              <span class="f-dis-inline-block">时间区间 </span>
              <div class="f-inline-block">
                <span class="m-time-area">
                  <input @click="to_laydate(this,1)" v-model="form.startTime" type="text" readonly="readonly"><input @click="to_laydate(this,2)" v-model="form.endTime" type="text" readonly="readonly">
                </span>
              </div>
            </Col>
            <Col class="f-dis-flex" :xs="22" :sm="20" :md="12" :lg="12">
              <span class="f-dis-inline-block">专营号段 </span>
              <Col :xs="20" :sm="18" :md="12" :lg="12">
                
                <RadioGroup v-model="phone">
                  <Radio label="windows">
                    <span>号码  </span>
                    <input v-model="orderId" maxlength="30" placeholder="请输入查询的订单号码"  type="text">
                  </Radio>
                </RadioGroup>
              </Col>
            </Col>
          </Col>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { to_laydate } from "../../../config/utils.js";
  export default {
    data () {
      return {
        orderId:'',
        form:{
          startTime:"",
          endTime:"",
        }
      }
    },
    created:function(){
      let vm=this;
      vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
			vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
    },
    methods: {
      to_laydate(i,v){
        return to_laydate(i,v)
      }
    }
  }
</script>



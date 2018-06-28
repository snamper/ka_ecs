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
        <Col :xs="20" :sm="18" :md="12" :lg="12">
          <span class="f-dis-inline-block">时间区间 </span>
          <div class="f-inline-block">
            <span class="m-time-area">
              <input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly">
            </span>
          </div>
        </Col>
      </Col>
    </Row>
  </div>
</template>
<script>
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
    methods: {
      to_laydate:function(v){
        var vm=this;
        laydate({
          istime:true,
          format: 'YYYY-MM-DD hh:mm:ss',
          isclear: false,
          choose: function(dates){ //选择好日期的回调
            v==1 ? vm.form.startTime=dates : vm.form.endTime=dates;
          }
        });
      },
    }
  }
</script>



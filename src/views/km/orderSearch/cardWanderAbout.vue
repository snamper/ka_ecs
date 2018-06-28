<template>
  <div id="search">
    <Row>
        <Col span="24" class="f-padding-left2"><b class="u-arrow"></b>精确查询</Col>
        <Col span="24" style="display:flex" class="f-bgc-white f-border-radius4 m-search-padding f-margin-top1">
           <span style="width:70px;display:inline-block">订单号码 :</span>
           <Col :xs="22" :sm="18" :md="12" :lg="12">
            <!-- <input style="width:70%" type="text"> -->
            <!-- <button style="width:30%"></button> -->
            1111
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
            }
        }
    }
</script>

<template>
  <div id="search">
    <Row>
        <Col span="24" class="f-padding-left2"><b class="u-arrow"></b>精确查询</Col>
        <Col span="24" class="f-bgc-white f-border-radius4 m-search-padding f-margin-top1">
          订单号码 : <Input v-model="orderId" size="small" placeholder="Enter something..." style="width:300px"></Input>
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

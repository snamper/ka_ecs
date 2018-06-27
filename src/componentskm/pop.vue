<!--**
  *@info 弹窗外壳组件
  *@author: thinkmix
  *@date 2018-04-26
* *-->
<template>
  <div class="m-pop-box">
    <div class="box">
      <div class="inner f-scroll-lt" :style="{width:width+'px'}">
        <a href="javascript:;" class="close" @click="callBack()"></a>
        <slot name="content"></slot>
      </div>
      <div class="f-mask"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    callBack:Function,
    width:Number
  },
  data() {
    return {
      
    }
  },
  created:function(){
  },
  mounted(){
    let mainDom=document.querySelector('.g-main');
    mainDom.style.overflow='hidden';
    mainDom.scrollTop=0;
  },
  beforeDestroy(){
    let mainDom=document.querySelector('.g-main');
    mainDom.style.overflowY='scroll';
    mainDom.scrollTop=0;
  },
  methods: {
    
  },
};
</script>
<style scoped>
.m-pop-box{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: table;
  z-index:998;
}
.m-pop-box>.box{
  
  display: table-cell;
  vertical-align: middle;
  padding-left:1.4rem;
}
.m-pop-box>.box>.inner{
  position: relative;
  padding:0.3rem;
  background-color: #f5f5f5;
  min-width: 6rem;
  max-width: 10rem;
  width: 6rem;
  margin:auto;
  max-height: 7rem;
  overflow-y: scroll;
}
.m-pop-box>.box>.inner>.close{
  position: absolute;
  top: 0.1rem;
  right:0.1rem;
  display: inline-block;
  width: 0.15rem;
  height: 0.15rem;
  background-image: url(../assets/images/close_grey.png);
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 888;
}
.m-pop-box>.box>.inner>.close:hover{
  background-image: url(../assets/images/close_red.png);
}
</style>
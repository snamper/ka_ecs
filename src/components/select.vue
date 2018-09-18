<!--**
  *@info 下拉选择组件
  *@author: thinkmix
  *@date 2018-06-27
* *-->
<template>
  <div class="m-dropdown-select">
    <button class="drop-button" @click="dropDown"><span class="text">{{list[select].name}}</span><i class="caret"></i></button>
    <ul class="drop-menu f-scroll-lt" v-if="off">
      <li v-for="(todo,index) in list"><a @click="dropSelect(index)">{{todo.name}}</a></li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'select-tag',
  props: {
    list:Array,
  },
  data() {
    return {
      off:false,
      select:0
    }
  },
  watch: {

  },
  mounted() {
  	const vm = this;
  	
  	document.attachEvent ? document.body.attachEvent("onclick",function(event){
     vm.off=false;
     window.event.cacenlBubble=false;
    }) : document.body.addEventListener("click", function(event) {
     vm.off=false;
     event.stopPropagation();
    },false);
  },
  methods: {
    selectInit:function(){
      this.select=0;
    },
    dropDown:function(e){
       var vm=this;
       vm.off ? vm.off=false : vm.off=true;
       e.stopPropagation();
    },
    dropSelect:function(index){
      this.select=index;
      this.$emit && this.$emit('callback', index);
    },
  }
}

</script>
<style scoped>
/*模拟select*/

.m-dropdown-select {
  /*display: inline-block;*/
  width: 100%;
  position: relative;
}

.m-dropdown-select>.drop-button {
  position: relative;
  font-family: inherit;
  cursor: pointer;
  transition-duration: .3s;
  -webkit-transition-duration: .3s;
  -moz-transition-duration: .3s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  background-color: #fff;
  width: 100%;
  padding: 0 0.10rem;
  border-radius: 4px;
  height: 0.35rem;
  border: 1px solid transparent;
  border-color: #bfcbd9;
  outline: none;
  text-align: left;
}

.m-dropdown-select>.drop-button:hover {
  border-color: #8391a5;
}

.m-dropdown-select>.drop-button:focus {
  border-color: #20a0ff;
  color: #20a0ff;
}

.m-dropdown-select>.drop-button>.text {
  color: #1f2d3d;
  font-size: 0.13rem;
}

.m-dropdown-select>.drop-button>.caret {
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 50%;
  width: 0.18rem;
  height: 0.18rem;
  margin-top: -9px;
  background-image: url(~/assets/img/drop-down.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.m-dropdown-select ul {
  position: absolute;
  width: 100%;
  max-height: 3rem;
  overflow-y: scroll;
  z-index: 999;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #d1dbe5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin: 5px 0;
}

.m-dropdown-select ul>li {}

.m-dropdown-select ul>li>a {
  display: block;
  color: #48576a;
  padding: 8px 10px;
  line-height: 1.5;
  height: 0.35rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}

.m-dropdown-select ul>li>a:hover {
  background-color: #e4e8f1
}

.m-dropdown-select ul>li.selected>a:hover,
.m-dropdown-select ul>li.selected>a {
  color: #fff;
  background-color: #20a0ff
}

.m-dropdown-select>.drop-menu {}

.m-dropdown-select>.drop-menu>.cascarder>a {
  background-image: url(~/assets/img/drop-left.png);
  background-repeat: no-repeat;
  background-position: 98% center;
  background-size: 17px;
}

.m-dropdown-select>.drop-menu>.cascarder>ul {
  display: none;
  height: 100%;
  top: -1px;
  box-sizing: content-box;
  border-radius: 0 2px 2px 0;
  left: 100%;
  margin: 0;
  margin-left: 1px;
  border-left: none;
  transition-duration: .3s;
}

.m-dropdown-select>.drop-menu>.cascarder:hover>ul {
  display: block;
}

</style>

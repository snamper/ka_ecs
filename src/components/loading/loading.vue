<template>
  <div class="_loading-box" role="loading" :style="{backgroundColor:bgc}">
    <div class="box">
      <div class="_inner">
        <span class="_circle" v-if="type=='circle'">
          <svg viewBox="20 20 40 40" class="box">
            <circle :style="{stroke:color}" cx="40" cy="40" r="18" fill="none" class="path"></circle>
          </svg>
        </span>
        <span class="_text" v-if="text" :style="{color:color}">{{ text }}</span>
        <span class="_line-circle" v-if="type=='line-circle'">
          <i class="f1"></i>
          <i class="f2"></i>
          <i></i>
        </span>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    props:{
      text:String,
      bgc:{
        type:String,
        default:'rgb(255,255,255)'
      },
      type:{
        type:String,
        default: 'circle'
      },
      color:{
        type:String,
        default:'#fff'
      }
    },
    data() {
      return {
        
      }
    },
    computed:{
      typeClass(){
        return this.type ? `_loading-${ this.type }` : '';
      }
    },
    methods: {
      destroyElement() {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },
      close() {
        this.closed = true;
      },
      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      },
    },
    mounted() {
      this.startTimer();
    },
  };
</script>
<style lang="sass" scoped>

._loading-box{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  >.box{
    display: table;
    line-height: normal;
    text-align: center;
    width: 100%;
    height: 100%;
    >._inner{
      display: table-cell;
      vertical-align: middle;
      position:relative;
      pointer-events: all;

      >._circle{
        display: inline-block;
        vertical-align: middle;
        height: 0.2rem;
        >.box{
            animation: loading-rotate 2s linear infinite;
            width: 0.2rem;
            height: 0.2rem;
            position: relative;
            .path{
                animation:loading-dash 1.5s ease-in-out infinite;
                stroke-dasharray:90,150;
                stroke-dashoffset:0;
                stroke-width:3;
                stroke-linecap:round
            }
        }
      }
      ._line-circle{
        display: inline-block;
        vertical-align: middle;
        >i{
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-left:2px;
          border-radius: 100%;
          background-color:#fff;
          animation: sp-loading 1s infinite ease-in-out;
          animation-fill-mode: both
        }
        >.f1{
          margin-left: 0;
          animation-delay: -.4s
        }
        >.f2{
          animation-delay: -.2s
        }
      }
      >._text{
        display: inline-block;
        vertical-align: middle;
        margin:0 0.1rem;
        color: #fff;
      }
    }
  }
}

@keyframes loading-rotate{
    to{transform:rotate(1turn)}
}
@keyframes loading-dash{
    0%{
        stroke-dasharray:1,200;stroke-dashoffset:0
    }
    50%{
        stroke-dasharray:90,150;stroke-dashoffset:-40px
    }
    to{
        stroke-dasharray:90,150;stroke-dashoffset:-120px
    }
}
@keyframes sp-loading {
    0%,
    100%,
    80% {
        transform: scale(0);
        -webkit-transform: scale(0)
    }
    40% {
        transform: scale(1);
        -webkit-transform: scale(1)
    }
}
</style>
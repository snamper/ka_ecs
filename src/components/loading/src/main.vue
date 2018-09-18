<template>
  <div class="_loading-box" role="loading">
    <div class="_inner">
      <span class="_loading">
        
      </span>
      <span class="_text" v-if="text">{{ text }}</span>
    </div>
    <div class="_shade" v-if="showShade" @click="close"></div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        showShade:false,
        text:'',
        duration: 3000,
        closed: false,
        timer: null,
      };
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
          this.destroyElement()
        }
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
  position: fixed;
  left: 0;
  right: 0;
  z-index: 99999;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  text-align: center;
  ._inner{
    box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
    display: inline-block;
    position:relative;
    pointer-events: all;
    padding: 9px 16px;
    border-radius: 4px;
    background: rgb(255, 255, 255);
    animation: fade-down .2s ease-in-out;
    
  }
  >._shade{
    position:fixed;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,0.3);
  }
}

@keyframes fade-down{
  0%{
    opacity: 0;
    transform: translate(0, -100%)
  }
  100%{
    opacity: 1;
    transform: translate(0, 0)
  }
}
</style>
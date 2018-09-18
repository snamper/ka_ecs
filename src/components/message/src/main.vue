<template>
  <div
    :class="[
      '_message-box',
      type ? `_message-${ type }` : '',
    ]"
    role="alert"
    >
    <div class="_inner">
      <div v-if="title" class="_title">{{ title }}</div>
      <div class="_content">
        <i :class="statusClass" v-if="type == 'alert'"></i>
        <slot><span v-html="message"></span></slot>
      </div>
      <div class="_message-btn" v-if="button.length">
        <button v-for="(btn,index) in button" @click="btnCick(index)">{{ btn }}</button>
      </div>
      
      <i v-if="type != 'alert'" class="_close" @click="close"></i>
    </div>
    <div class="_shade" v-if="type != 'alert'"></div>
  </div>
</template>

<script>
  const typeMap = {
    confirm: 'confirm',
    info: 'info',
    message: 'alert',
  };
  const statusMap = {
    success: 'success',
    error: 'error',
    info: 'info',
    load: 'load'
  };

  export default {
    data() {
      return {
        title:'',
        message: '',
        type: 'alert',
        status: 'error',
        button: [],
        duration: 3000,
        closed: false,
        timer: null,
        onConfirm:Function,
      };
    },

    computed: {
      statusClass() {
        return this.type
          ? `_message-icon _icon-${ statusMap[this.status] }`
          : '';
      }
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
      btnCick(index){
        let len = this.button.length;

        if(len == 1 && index == 0){
          this.onConfirm(this);
        }else if(len ==2 && index == 1){
          this.onConfirm(this);
        }else{
          this.close();
        }
      },
      close() {
        this.closed = true;
        // if (typeof this.onClose === 'function') {
        //   this.onClose(this);
        // }
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
      if(this.type == 'alert')this.startTimer();
    },
  };
</script>
<style lang="sass" scoped>

._message-box{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  ._inner{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
    display: inline-block;
    position:relative;
    pointer-events: all;
    padding: 15px;
    border-radius: 4px;
    background: rgb(255, 255, 255);
    animation: fade-down .2s ease-in-out;
    >._title{
      font-size: 16px;
      color: rgba(0,0,0,.85);
      margin-bottom: 8px;
      line-height: 24px;
      display: inline-block;
    }
    >._content{
      
      >span{

      }
    }
    
    >._close{
      position: absolute;
      right: 15px;
      top: 15px;
      display: inline-block;
      cursor: pointer;
      width: 17px;
      height: 17px;
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url(./img/_message-close.png);
      &:hover{
        background-image: url(./img/_message-close-black.png);
      }
    }
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
._message-icon{
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  font-size: 17px;
  position: relative;
  margin-top: -2px;
  width: 17px;
  height: 17px;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
._message-icon._icon-success{
  background-image: url(./img/_message-success.png);
}
._message-icon._icon-error{
  background-image: url(./img/_message-error.png);
}
._message-icon._icon-info{
  background-image: url(./img/_message-info.png);
}
._message-alert{
  top: 30px;
  align-items: start;
  font-size: 15px;
  >._inner{
    padding: 10px;
  }
}
._message-confirm{

  ._inner{
    text-align: left;
    >._title{

    }
    >._content{
      padding:4px 0 20px;
    }
  }
  
}
._message-info, ._message-confirm{
  height: 100%;
  
}
._message-btn{
  text-align: right;
  >button{
    display: inline-block;
    font-weight: 400;
    text-align: center;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    height: 32px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    position: relative;
    color: rgba(0,0,0,.65);
    background-color: #fff;
    border-color: #d9d9d9;
    margin-left: 10px;
  }
  >button:first-child{
    
    &:hover{
      color: #1890ff;
      border-color: #1890ff;
    }
  }
  >button:last-child{
    color: #fff!important;
    background-color: #1890ff;
    border-color: #1890ff;
    &:hover{
      background-color:#40a9ff;
      border-color:#40a9ff
    }
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
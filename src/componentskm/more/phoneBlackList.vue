<template>
  <section class="m-upload-box">
    <div class="dp">上传文件</div>
    <FileUpload text="" inputAccept=".txt" v-bind:headers="userInfo" v-bind:crop="false" v-bind:url=upload.action
      v-on:imageuploaded="imageuploaded" v-on:imagechanged="imagechanged" v-on:onprogress="onprogress" v-on:errorhandle="errorhandle"
      class="m-upload" />
    </FileUpload>
    <span class="progress" :style="{width:progress}"></span>
    <div class="m-upload-list">
      <p class="title">黑名单上传列表</p>
      <div v-if="list" class="m-total-table">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>上传时间</th>
              <th>操作人姓名</th>
              <th>操作人号码</th>
              <th>上传文件列表</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(todo,index) in list" :key="index">
              <td>{{((pageNum-1)*20+(index+1))}}</td>
              <td>{{getDateTime(todo.createTime)[6]}}</td>
              <td>{{todo.userName||'--'}}</td>
              <td>{{todo.opertPhone||'--'}}</td>
              <td>
                <a href="javascript:void(0)" @click="updateList(todo.fileName)">{{todo.fileName}}</a>
              </td>
            </tr>
          </tbody>
        </table>
        <my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
      </div>
    </div>
  </section>
</template>
<script>
  import FileUpload from '../fileUpload';
  import pagination from "../page.vue";
  import {
    errorDeal,
    getDateTime,
    createDownload,
    getStore
  } from '../../config/utils';
  import {
    getBlackList,
    downLoadBlackList
  } from '../../config/service.js';
  require('../../assets/km/js/base64.min.js');
  export default {
    name: 'phoneBlackList',
    data() {
      return {
        off: {
          power: '',
        },
        upload: {
          files: '',
          action: 'km-ecs/w/msgFile/freezen',
          response: ''
        },
        progress: '0%',
        list: "",
        maxpage: 0,
        pageNum: 0,
        callback: Function,
        numberList: []
      }
    },
    components: {
      FileUpload,
      "my-page": pagination,
    },
    created() {
      this.userInfo = getStore('KA_ECS_USER');
      this.off.power = this.$parent.off;
      this.getNumberList(1);
    },
    methods: {
      updateList(reqdata) {
        let vm = this;
        let json = {
          fileName: reqdata
        };
        let userInfo = getStore("KA_ECS_USER");
        let customerId = userInfo.customerId;
        let codeId = userInfo.codeId;
        json.customerId = customerId;
        json.codeId = codeId;
        createDownload('km-ecs/w/msgFile/download', BASE64.encode(JSON.stringify(json)), () => {});
      },
      getNumberList(p) {
        let vm = this;
        let json = {
          pageSize: 20,
          pageNum: p || 1
        };
        vm.off.isLoad = true;
        getBlackList(json, () => {
            vm.off.isLoad = false
          })
          .then((data) => {
            vm.list = data.data.datas;
            vm.pageNum = p || 1;
            vm.maxpage = Math.ceil(parseInt(data.data.total) / 20);
            vm.callback = (p) => {
              vm.getNumberList(p)
            }
          }).catch(e => errorDeal(e))
      },
      imageuploaded(res, data) {
        var vm = this;
        setTimeout(function () {
          vm.progress = '0%';
        }, 300)
        if (res && res.code == "200") {
          layer.open({
            content: '号码黑名单上传成功',
            skin: 'msg',
            time: 3,
            msgSkin: 'success',
          });
          vm.getNumberList(1);
        } else if (res) {

          errorDeal(res, vm.getNumberList(1))
        }
      },
      imagechanged(res) {
        var vm = this;
        vm.progress = 0;
        vm.upload.files = res;
      },
      onprogress(res) {
        this.progress = (res.loaded / res.total * 100).toFixed(2) + '%';
      },
      errorhandle(err) {
        var vm = this;
        vm.upload.files = '';
        setTimeout(function () {
          vm.progress = '0%';
        }, 300)

        errorDeal('上传失败')
      },
      getDateTime(v) {
        return getDateTime(v);
      },
    }
  }
</script>
<style scoped>
  .m-upload-box {
    width: 100%;
    height: .5rem;
    margin-top: .2rem;
  }

  .m-upload {
    position: absolute;
    width: 70px;
    height: 30px;
    top: 65px;
    right: 20px;

  }

  .m-upload-box>.progress {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 5px;
    background-color: #3DD79B;
    transition: height .3s linear;
  }

  .m-upload-box>.dp {
    background: #00A901;
    color: #fff;
    text-align: center;
    height: 25px;
    width: 70px;
    line-height: 25px;
    border-radius: 4px;
    float: right;
  }

  .m-upload-list .title {
    height: 25px;
    line-height: 25px;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>

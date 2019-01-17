<template>
  <div class="m-fileUpload-box">
    <!-- <label :for="'upload-input-' + formID">{{text}}</label> -->
    <form class="upload-form">
      <input
        v-bind:id="'upload-input-' + formID"
        v-bind:name="name"
        v-bind:multiple="multiple"
        v-bind:accept="inputAccept"
        v-on:change="change"
        v-on:drop="change"
        type="file" />
      </form>
  </div>
</template>
<script>
  export default {
    props: {
      url:String,
      autoUpload:{//auto upload file
        type:Boolean,
        default:true
      },
      text: {
        type:String,
        default:  'Upload File'
      },
      inputOfFile: {
        type: String,
        default: 'files'
      },
      inputAccept:{
        type: String,
        default: ''
      },
      headers: {//http headers
        type: Object,
        default: function() {
          return {};
        }
      },
      data: {
        type: Object,
        default: function() {
          return {};
        }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      credentials: {
        type: [String, Boolean],
        default: false,
      },
      uploadIndex: String
    },
    data() {
      return {
        files: [],
        options: this.props,
        uploading: false,
        formID:'',
      }
    },
    created:function(){
      this.createdFormId();
    },
    computed: {
      name() {
        return this.inputOfFile;
      }
    },

    methods: {
      __dispatch(name,res, data) {
        this.$emit && this.$emit(name, res, data);
      },
      __find(str) {
        let dq = document.querySelector('#vciu-modal-' + this.formID);
        return dq.querySelector(str);
      },
      clearFileInput() {
        let uploadForm=document.querySelectorAll('.upload-form');
        for(let i=0,len=uploadForm.length;i<len;i++){
          uploadForm[i].reset()
        }
        this.createdFormId();
      },
      createdFormId(){
        this.formID = (Math.random() * 10000 + '').split('.')[0];
      },
      change(e) {
        let fileVal = document.querySelector('#upload-input-' + this.formID).value.replace(/C:\\fakepath\\/i, "");
        let fileExt = fileVal.substring(fileVal.lastIndexOf(".") + 1);

        if (e.target.files .length && e.target.files[0].size > this.maxFileSize) {
            var formatSize;
            if (parseInt(this.maxFileSize / 1024 / 1024) > 0) {
                formatSize = (this.maxFileSize / 1024 / 1024).toFixed(2) + 'MB';
            } else if (parseInt(this.maxFileSize / 1024) > 0) {
                formatSize = (this.maxFileSize / 1024).toFixed(2) + 'kB';
            } else {
                formatSize = options.maxFileSize.toFixed(2) + 'Byte';
            }
            return this.__dispatch('errorhandle','FILE IS TOO LARGER MAX FILE IS ' + formatSize);
        }


        if(e.target.files.length){
          this.files = e.target.files;

          this. __dispatch('imagechanged', this.files.length > 1 ? this.files : this.files[0]);
          if(this.autoUpload){
            this.tryAjaxUpload();
          }
        }
        
        
      },

      __readFiles() {
        let reader = new FileReader();
        let self = this;
        reader.onload = function(e) {
          let src = e.target.result;
          overflowVal = document.body.style.overflow;
          document.body.style.overflow = 'hidden';
          self.__initImage(src);
        }
        reader.readAsDataURL(this.files[0]);
      },
      __setData(type) {
        if (typeof this.data !== 'object') {
          this.data = {};
        }
        this.data["request"] = type;
        const cropBox = this.$refs.cropBox;
        const newCSSObj = cropBox.getCropData();
        for (const k of Object.keys(newCSSObj)) {
          this.data[k] = newCSSObj[k];
        }
        if (this.maxWidth) {
          this.data['maxWidth'] = this.maxWidth;
        }
        if (this.maxHeight) {
          this.data['maxHeight'] = this.maxHeight;
        }
        if (this.minWidth) {
          this.data['minWidth'] = this.minWidth;
        }
      },
      // use ajax upload  IE10+
      tryAjaxUpload(callback, isBinary, base64Code) {
        const self = this;

        const done = function(res) {
          self.clearFileInput();
          if(typeof callback === 'function') {
            callback();
          }

          self.__dispatch('imageuploaded',res, self.uploadIndex);
        };
        const errorUpload = function(err) {
          self.clearFileInput();
          self.__dispatch('errorhandle', err);
        };
        const onprogressCb= function(lod){
          self.__dispatch('onprogress',lod);
        };
        let data;
        if (isBinary) {
          data = {
            type: this.files[0]['type'],
            filename: this.files[0]['name'],
            filed: this.inputOfFile,
            base64Code: base64Code
          };
          if (typeof this.data === 'object') {
            data = Object.assign(this.data, data);
          }
        } else {
          data = new FormData();
          for (let i=0;i<this.files.length;i++) {
            data.append(this.name, this.files[i]);
          }
          if (typeof this.data === 'object') {
            for(let k in this.data) {
              if(this.data[k] !== undefined) {
                data.append(k,this.data[k]);
              }
            }
          }
        }
        this.xhr('POST',this.url, this.headers, data, done, errorUpload, isBinary, this.credentials,onprogressCb);
      },
      xhr(method, url, headers, data, callback, err, isBinary, withCredentials,onprogressCb) {
        var r = new XMLHttpRequest();
        var error = err || function () {
          console.error('AJAX ERROR!');
        };
        var boundary = 'webcodeimageupload';
        // Binary?
        var binary = false;
        if (method === 'blob') {
          binary = method;
          method = 'GET';
        }
        method = method.toUpperCase();
        // Xhr.responseType 'json' is not supported in any of the vendors yet.
        r.onload = function () {
          var json = r.response;
          try {
            json = JSON.parse(r.responseText);
          } catch (_e) {
            if (r.status === 401) {
              json = error('access_denied', r.statusText);
            }
          }
          var headers = headersToJSON(r.getAllResponseHeaders());
          headers.statusCode = r.status;
          callback(json || (method === 'GET' ? error('empty_response', 'Could not get resource') : {}), headers);
        };
        r.onerror = function () {
          var json = r.responseText;
          try {
            json = JSON.parse(r.responseText);
          } catch (_e) {
            console.error(_e);
          }
          callback(json || error('access_denied', 'Could not get resource'));
        };
        r.upload.onprogress=function(event){
          if(event.lengthComputable){
            onprogressCb(event)
          }
        }
        var x = void 0;
        // Should we add the query to the URL?
        if (method === 'GET' || method === 'DELETE') {
          data = null;
        } else if (isBinary) {
          var keyData = data;
          var code = data.base64Code.replace('data:' + data.type + ';base64,', '');
          data = ['--' + boundary, 'Content-Disposition: form-data; name="' + data.filed + '"; filename="' + data.filename + '"', 'Content-Type: ' + data.type, '', window.atob(code), ''].join('\r\n');
          var keyArr = Object.keys(keyData);
          if (keyArr.length > 4) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = keyArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var k = _step.value;

                if (['filed', 'filename', 'type', 'base64Code'].indexOf(k) == -1) {
                  data += ['--' + boundary, 'Content-Disposition: form-data; name="' + k + '";', '', ''].join('\r\n');
                  data += [_typeof(keyData[k]) === 'object' ? JSON.stringify(keyData[k]) : encodeURI(keyData[k]), ''].join('\r\n');
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
          data += '--' + boundary + '--';
        }
        // Open the path, async
        r.open(method, url, true);
        if (binary) {
          if ('responseType' in r) {
            r.responseType = binary;
          } else {
            r.overrideMimeType('text/plain; charset=x-user-defined');
          }
        }
        // Set any bespoke headers
        if (headers) {
          for (x in headers) {
            if(x!='customerName'){
              r.setRequestHeader(x, headers[x]);
            }
          }
        }
        r.withCredentials = typeof withCredentials === 'undefined' ? true : withCredentials;
        if (isBinary) {
          r.setRequestHeader('Content-Type','multipart/form-data; boundary=' + boundary);
          r.setRequestHeader('customerId',this.headers.customerId);
          return r.sendAsBinary(data);
        }
        r.send(data);
        return r;
        // Headers are returned as a string
        function headersToJSON(s) {
          var o = {};
          var reg = /([a-z\-]+):\s?(.*);?/gi;
          var m = void 0;
          while (m = reg.exec(s)) {
            o[m[1]] = m[2];
          }
          return o;
        }
    } 
  },

};
</script>
<style scoped>
/* .m-fileUpload-box{
  position: relative;
  overflow: hidden;
  color: #fff;
} */
.m-fileUpload-box>label, .upload-form, .upload-form>input{
  position: absolute;
  width: 100%;
  height: 100%;
  left:0;
  right: 0;
  top:0;
  bottom:0;
  cursor: pointer;
}
.m-fileUpload-box>label{
  z-index: 999;
}
.upload-form{
  opacity: 0;

}
</style>
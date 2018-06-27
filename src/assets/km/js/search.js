var searchList = function (index,page){
        var s=this.form.select;
        var userInfo=localStorage.getItem('KA_ECS_USER');
            userInfo=JSON.parse(userInfo);
        var customerId=userInfo.customerId;
        var vm=this,url,whichBtn,
        json={
          status:vm.off.type,
          type:vm.form.orderType,
          starttime:Date.parse(vm.form.startTime),
          endtime:Date.parse(vm.form.endTime),
          pageNum:page||'1',
          pageSize:'10',
          acceptId:'',
          dealerId:'',
          phone:'',
          treatUserId:'',//处理人id
          userId:''//反馈人id
        };
        if(index===1){//条件查询
          if(s==2&&vm.form.context2===''){
            layer.open({
              content:"请输入要查询的商户ID",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
          else if(s==6&&vm.form.context6===''){
            layer.open({
              content:"请输入要查询的反馈人ID",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
          else if(s==3&&vm.form.context3===''){
            layer.open({
              content:"请输入反馈人联系号码",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
          else if(s==4&&vm.form.context4===''){
            layer.open({
              content:"请输入要查询的处理人ID",
              skin: 'msg',
              time: 4,
              msgSkin:'error',
            });
            return false;
          }
          if(s==2){
            json.dealerId=vm.form.context2;
          }
          else if(s==6){
            json.userId=vm.form.context6;
          }
          else if(s==3){
            json.phone=vm.form.context3;
          }
          else if(s==4){
            json.treatUserId=vm.form.context4;
          }
        }
        else if(index==='order'){//订单号查询
          if(!vm.form.context1){
            layer.open({
              content:'请输入要查询的反馈单号',
              skin: 'msg',
              time: 2,
              msgSkin:'error',
            });
            return false;
          }
          json={
              status:vm.off.type,
              starttime:Date.parse(vm.form.startTime),
              endtime:Date.parse(vm.form.endTime),
              pageNum:page||'1',
              pageSize:'10',
              acceptId:vm.form.context1,
              dealerId:'',
              phone:'',
              treatUserId:'',
              treatName:''
          };
        }
        if(index===1||index==='order'){//发送请求
          vm.AJAX("w/advice/query",json,function(data){
            vm.list=data.data.pageData;//数据
            vm.total=data.data.total;//总条数
            vm.maxpage=Math.ceil(parseInt(data.data.total)/10);//最大页码
            vm.pageNum=page||1;
            vm.callback=function(v){vm.searchList(index,v)};
          },function(){
            vm.off.isLoad=false;
          })
        }
      }

      export default searchList;
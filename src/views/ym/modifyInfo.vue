<style scoped>
#detailsView{position: absolute;width: 100%;height: 100%;top: 0;left: 0;background: #808080;background:  hsla(0, 0%, 90%, 0.8)}
#detailsView>div{position: absolute; margin:auto;right: 0;left: 0;top:0;bottom:0;width: 320px;height: 222px;border-radius: 6px;text-align: center;background: #ffffff}
#detailsView>div>p{padding: 12px 20px;width: 320px;margin: 0 auto}
#detailsView>div>h3{font-size: 16px;margin-top: 18px;}
#detailsView>div>p>span{display: inline-block;width: 70px;text-align: right}
#detailsView>div>p>input{width: 240px;padding-left: 20px;border: 1px solid #eee;outline: none;border:1px solid #808080;border-radius: 4px;}
p.modifyInp{display: flex}
p.modifyInp span{flex: 1;line-height: 35px; }
p.modifyInp input{flex: 4;line-height: 35px;height: 35px; }
div.btn{cursor: pointer;;height:50px;display: flex;color: #fff;font-size: 16px;margin-top: 15px;}
div.btn span.btnYes{line-height:50px;flex:1;background: #20a0ff;border-bottom-left-radius: 6px}
div.btn span.btnNo{line-height:50px;flex:1;background: #f84c4c;border-bottom-right-radius: 6px;}
</style>
<template>
<section  id="detailsView">
	<div>
    <h3>准同意信息修改</h3>
    <p class="modifyInp"><span>姓名&nbsp;:&nbsp;</span><input type="text" v-model=papers.userName></p>
    <p class="modifyInp"><span>地址&nbsp;:&nbsp;</span><input type="text" v-model=papers.userAddress></p>
    <p v-if="false">{{papers.papersCode}}</p>
    <div class="btn">
      <span class="btnYes" @click="btnYes">修改</span>
      <span class="btnNo" @click="close">取消</span>
    </div>
  </div>
</section>
</template>
<script>
import {reqCommonMethod} from "../../config/service.js";
import {errorDeal} from "../../config/utils.js";
export default{
	// name:'detailsView',
	props:['phone','papers','index'],
	data (){
		return {
            olduserName:"",
            olduserAddress:"",
            oldPapersCode:"",
		}
	},
	created:function(){
        let vm=this;
        let info=vm.papers;
        vm.olduserName=info.userName;
        vm.olduserAddress=info.userAddress;
        vm.oldPapersCode=info.papersCode;
	},
	methods:{
        ifFaild(){
            let vm=this;
            vm.$parent.off.modifyBox=false;
            vm.papers.userName=vm.olduserName;
            vm.papers.userAddress=vm.olduserAddress;
        },
		close:function(){
			var vm=this;
            vm.ifFaild();
        },
        btnYes(){
            let vm=this,index,page;
            index=vm.$parent.$parent.lastSearchIndex;
            page=vm.$parent.$parent.lastSearchPage;

            if(vm.papers.userName==vm.olduserName&&
            vm.papers.userAddress==vm.olduserAddress){
                layer.open({
                    content:'与原信息一致,无需修改',
                    skin: 'msg',
                    time: 4,
                    msgSkin:'error',
                })
                vm.close();
                return false;
            }
            let info=vm.papers;
            let json={orderId:info.orderId,userName:info.userName,userAddress:info.userAddress,papersCode:info.papersCode};
            reqCommonMethod(json,false,"ym-ecs/c/audit/updateBuggingOrder")
            .then((data)=>{
                if(data.code==200){
                  layer.open({
                    content:'准同意信息修改成功',
                    skin: 'msg',
                    time: 4,
                    msgSkin:'success',
                  })
                  }else{
                    layer.open({
                      content:'准同意信息修改失败',
                      skin: 'msg',
                      time: 4,
                      msgSkin:'error',
                    })
                      vm.ifFaild();
                  }
                vm.$parent.$parent.searchList(index,page);
                vm.$parent.$parent.details();
                vm.close();
            }).catch(e=>{
                layer.open({
                    content:'准同意信息修改失败',
                    skin: 'msg',
                    time: 4,
                    msgSkin:'error',
                })
                vm.ifFaild();
            })
        }
	}
}
</script>


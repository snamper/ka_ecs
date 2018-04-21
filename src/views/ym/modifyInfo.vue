<style scoped>
#detailsView{position: absolute;width: 100%;height: 100%;top: 0;left: 0;background: grey;background:  rgba(230, 230, 230, 0.8)}
#detailsView>div{position: absolute; margin:auto;right: 0;left: 0;top:0;bottom:0;width: 400px;height: 350px;
border-radius: 6px;text-align: center;background: rgb(255, 255, 255)}
#detailsView>div>p{padding: 18px 40px;width: 400px;margin: 0 auto}
#detailsView>div>p>span{display: inline-block;width: 70px;text-align: right}
#detailsView>div>p>input{width: 240px;height: 40px;padding-left: 20px;border: 1px solid #eee;outline: none;
border:1px solid grey;border-radius: 4px;}
#detailsView>div>button{width: 100px;height: 40px;outline: none;border-radius: 6px;color:#eee}
.ml{margin-left: 20px;background: rgb(206, 51, 51);border: 1px solid rgb(206, 51, 51);}
.mr{margin-right: 20px;background: rgb(117, 177, 29);border: 1px solid rgb(117, 177, 29);}
.ml:active{box-shadow:0 0 6px red }
.mr:active{box-shadow:0 0 6px green }
</style>
<template>
<section  id="detailsView">
	<div style="opacity:1">
        <p>准同意信息修改</p>
        <p><span>姓名&nbsp;:&nbsp;</span><input type="text" v-model=papers.userName></p>
        <p><span>地址&nbsp;:&nbsp;</span><input type="text" v-model=papers.userAddress></p>
        <p><span>证件号码&nbsp;:&nbsp;</span><input type="text" v-model=papers.papersCode></p>
        <button class="mr" @click="btnYes">修改</button><button class="ml" @click="close">取消</button>
    </div>
</section>
</template>
<script>
import {reqCommonMethod} from "../../config/service.js";
import {errorDeal} from "../../config/utils.js";
export default{
	// name:'detailsView',
	props:['phone','papers'],
	data (){
		return {
            olduserName:"",
            olduserAddress:"",
            oldpapersCode:"",
		}
	},
	created:function(){
        let vm=this;
        let info=vm.papers;
        vm.olduserName=info.userName;
        vm.olduserAddress=info.userAddress;
        vm.oldpapersCode=info.papersCode;
	},
	methods:{
        ifFaild(){
            let vm=this;
            vm.$parent.off.modifyBox=false;
            vm.papers.userName=vm.olduserName;
            vm.papers.userAddress=vm.olduserAddress;
            vm.papers.papersCode=vm.oldpapersCode;
        },
		close:function(){
			var vm=this;
            vm.ifFaild();
        },
        btnYes(){
            let vm=this;
            if(vm.papers.userName==vm.olduserName&&
            vm.papers.userAddress==vm.olduserAddress&&
            vm.papers.papersCode==vm.oldpapersCode){
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
            reqCommonMethod(json,false,"ym-ecs/c/audit/updateBuggingOrde")
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
            }).catch(e=>errorDeal(e),
            this.ifFaild(),
            layer.open({
                content:'准同意信息修改失败',
			    skin: 'msg',
			    time: 4,
                msgSkin:'error'
            }))
        }
	}
}
</script>


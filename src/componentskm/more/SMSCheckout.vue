<template>
	<div style="padding:15px;">
        <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
        <section class="m-occlusion" :class="{active:off.isLoad}"></section>
        <div>
            <section class="m-top-shift f-tas">
                <div class="box">
                    <label class="item">
                        <input type="radio" v-model="form.source" value="1">
                        <span class="slider">查询</span>
                    </label>
                    <label class="item">
                        <input type="radio" v-model="form.source" value="2">
                        <span class="slider">Excel</span>
                    </label>
                </div>
            </section>
        </div>
        <div v-if="form.source==1">
            <div class="m-input-button o-input-button">
                <input maxlength="11" type="tel" v-model="form.phone" placeholder="请输入查询的手机号码"><button @click="searchPhone">查询</button>
            </div>
            <div class="m-total-table" v-if="listInfo">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>制卡号码</th>
                            <th>码号类型</th>
                            <th>码号等级</th>
                            <th>ICCID</th>
                            <th>IMSI</th>
                            <th>商户名称</th>
                            <th>短信校验</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>{{listInfo.phone_number}}</td>
                            <td>{{translateData(10,listInfo.monopoly_type)}}</td>
                            <td>{{translateData(5,listInfo.big_number_level)}}</td>
                            <td>{{listInfo.iccid||'--'}}</td>
                            <td>{{listInfo.imsi||'--'}}</td>
                            <td>{{listInfo.company_name||'--'}}</td>
                            <td>
                                <p v-if="!off.changePhone" class="m-phone"><label>{{listInfo.safe_phone||'无'}}</label><button @click="fchangePhone('1')">修改号码</button></p>
                                <p v-if="off.changePhone" class="m-changePhone"><input ref="changePhone1" v-focus maxlength="11" type="text" v-model="listInfo.safe_phone"><span @click="fcloseChange('2')"></span>
                                <button @click="fchangePhone('2',listInfo.safe_phone)">确定</button></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
		<div v-if="form.source==2" class="m-upExcel">
            <div class="m-upExcel-icon">
                <input type="file" ref="file" name="xlfile" id="xlf" accept="xlsx/*" @change="fupExcel()">
                <span></span>
                <label for="xlf"><b>上传excel</b><b>（ 请按规定格式上传! ）</b></label>
            </div>
            <div class="m-changephone">
                <p class="m-changephone-box">
                    <span>订单号 : <input v-model="form.orderId" placeholder="请输入查询的订单号码"/></span>
                    <span>成卡号码 : <input v-model="form.phone1" placeholder="请输入查询的订单号码"/></span>
                    <span>校验号码 : <input v-model="form.checkPhone" placeholder="请输入新的短信校验号码"/></span>
                </p>
                <button @click="changeSafePhone">修改</button>
            </div>
        </div>
    </div>
</template>
<script>
import { getAdultByPhone,updateAdultSafePhone } from '../../config/service.js';
import { errorDeal,translateData } from '../../config/utils.js';
import XLSX from 'xlsx';
export default{
	name:'SMSCheckout',
	data (){
		return {
            listInfo:'',
            excelData:'',
            index:0,
            form:{
                phone:'',
                orderId:'',
                phone1:'',
                checkPhone:'',
                source:'1'
            },
            off:{
                isLoad:false,
                changePhone:''
            }
		}
    },
	components:{
		
	},
	methods:{
		searchPhone(){
            let vm=this;
            getAdultByPhone({phone:vm.form.phone},()=>{vm.off.isLoad})
            .then((data)=>{
                vm.listInfo=data.data;
            })
        },
        fchangePhone(i,v){
            let vm=this;
            if(i==1){
                vm.off.changePhone=true;
            }else if(i==2){
                let vm=this,data={
                    "sysOrderId":vm.listInfo.sys_order_id,
                    "safePhone": vm.listInfo.safe_phone,
                    "phone": vm.listInfo.phone_number
                };
                vm.off.changePhone=false;
                updateAdultSafePhone(data,()=>{vm.off.isLoad})
                .then((data)=>{
                    layer.open({
                        content:'修改短信校验手机号码成功',
                        skin: 'msg',
                        time: 3,
                        msgSkin:'success',
                    });
                }).then(()=>{
                    vm.searchPhone();
                }).catch(e=>errorDeal(e))
                }
        },
        fcloseChange(){
            let vm=this;
            vm.listInfo.safe_phone="";
            vm.$refs.changePhone1.focus();
        },
        changeSafePhone(){
            let vm=this,data={
                "sysOrderId":vm.form.orderId,
                "safePhone": vm.form.checkPhone,
                "phone": vm.form.phone1
            };
            if(vm.form.orderId==""||vm.form.phone1==""){
                layer.open({
                    content:'请输入或导入要修改的信息',
                    skin: 'msg',
                    time: 3,
                    msgSkin:'error',
                });
                return false;
            }
            vm.dealExcel(++vm.index,vm.excelData);
            updateAdultSafePhone(data,()=>{vm.off.isLoad})
            .then((data)=>{
                layer.open({
                    content:'修改短信校验手机号码成功',
                    skin: 'msg',
                    time: 3,
                    msgSkin:'success',
                });
            }).catch(e=>errorDeal(e))
        },
        fupExcel(e) {
            let vm=this, xlf = document.getElementById('xlf'), f=this.$refs.file.files[0];
            var reader = new FileReader();
            var name = f.name;
            vm.index = 0;
            vm.excelData = "";
            reader.onload = function(e) {
                if(typeof console !== 'undefined')
                var data = e.target.result,wb = XLSX.read(btoa(vm.fixdata(data)), {type:'base64'});
                vm.excelData = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
                vm.dealExcel(vm.index,vm.excelData)
            };  
            vm.$refs.file.value=null;
            reader.readAsArrayBuffer(f);  
        },
        dealExcel(i,v){
            let vm=this,data = JSON.parse(v);
            if(data.length>i){
                vm.form.orderId=data[i]['订单号'];
                vm.form.phone1=data[i]['成卡号码'];
                vm.form.checkPhone=data[i]['验证号码'];
            }else{
                vm.form.orderId="";
                vm.form.phone1="";
                vm.form.checkPhone="";
            }
        },
        fixdata(data) { //文件流转BinaryString
            var o = "",
                l = 0,
                w = 10240;
            for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        },
        translateData(v,i){
            return translateData(v,i);
        }
    }
    ,directives: {
        focus:{
            inserted:(el)=>{
                el.focus();
            }
        }
    }
}
</script>
<style scoped>
.m-total-table{margin-top: 0.2rem;}
@media screen and (min-width: 961px){
	.o-input-button{
		width: 500px
	}
}
.m-total-table tr th:last-child,.m-total-table tr td:last-child{
    width: 300px;
}
.m-total-table tr td:last-child p.m-phone button{margin-left: 10px;padding: 2px 5px;outline: none;border-radius: 4px;color: #fff;background: #01AA01;border: 1px solid #01AA01}
.m-total-table tr td:last-child p.m-changePhone {position: relative;height: 25px;line-height: 25px;}
.m-total-table tr td:last-child p.m-changePhone input{width: 200px;height: 25px;line-height: 25px;margin-left: 10px;}
.m-total-table tr td:last-child p.m-changePhone span{position: absolute;left: 200px;top:6px;display: inline-block;width: 15px;height: 15px;background: url('../../assets/images/close-circle.png') no-repeat;background-size: 100%;cursor: pointer;}
.m-total-table tr td:last-child p.m-changePhone button{position: absolute;left: 220px;height: 25px;width: 50px;border-radius: 0 4px 4px 0;background: #ff6600;outline: none;border: 1px solid #ff6600;color: #fff;cursor: pointer;}
.m-changephone{margin-top: 20px;width: 100%;position: relative;}
.m-changephone .m-changephone-box{margin-right: 100px;}
.m-changephone button{position: absolute;right: 0px;top:0px;width: 66px;background: #01AA01;color:#fff;border: 1px solid #01AA01;height: 35px;line-height: 35px;border-radius: 4px;}
.m-changephone span{display: inline-block;width: 33.333%;position: relative;}
.m-changephone input{height: 35px;line-height: 35px;border-radius: 4px;padding-left: 10px;border: 1px solid #bfcbd9;width: 80%;min-width:300px;}
.m-upExcel .m-upExcel-icon{position: relative;height: 40px;}
.m-upExcel .m-upExcel-icon span{position: absolute;left:0;display: inline-block;width: 40px;height: 40px;background: url('../../assets/images/excel.png') no-repeat;background-size: 100%;}
.m-upExcel .m-upExcel-icon #xlf{position:absolute;opacity: 0;height: 40px;width: 40px;z-index:999;}
.m-upExcel .m-upExcel-icon label{position: absolute;left: 40px;top:25px;font-size: 14px;color:#44C688;font-weight: bold;}
</style>

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
                        <span class="slider">批量修改</span>
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
                            <th>订单号</th>
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
                        <tr v-if="JSON.stringify(listInfo)!='{}'">
                            <td></td>
                            <td>{{listInfo.sys_order_id}}</td>
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
                        <tr v-if="JSON.stringify(listInfo)=='{}'">
                            <td colspan="9">暂无数据！</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
		<div v-if="form.source==2" class="m-upExcel">
            <div class="m-upExcel-icon">
                <input type="file" ref="file" name="xlfile" id="xlf" accept="xlsx/*" @change="fupExcel()">
                <span></span>
                <button v-if="off.upExcel" @click="dealExcel()">开始上传</button>
                <p>
                    <b v-if="!imageName">上传excel（ 请按规定格式上传! ）</b>
                    <b v-if="imageName">{{imageName}}</b>
                </p>
                <p class="m-excel-demo">
                    <label>excel示例及说明如下：</label>
                    <img src="../../assets/images/excle-demo.png" alt="excel-demo">
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import { getAdultByPhone,updateAdultSafePhone,batchUpdateAdultSafePhone } from '../../config/service.js';
import { errorDeal,translateData } from '../../config/utils.js';
import XLSX from 'xlsx';
export default{
	name:'SMSCheckout',
	data (){
		return {
            listInfo:'',
            excelData:'',
            index:0,
            errorLog:[],
            imageName:'',
            form:{
                phone:'',
                orderId:'',
                phone1:'',
                checkPhone:'',
                source:1
            },
            off:{
                isLoad:false,
                upExcel:false,
                changePhone:''
            }
		}
    },
	methods:{
		searchPhone(){
            let vm=this;
            getAdultByPhone({phone:vm.form.phone},()=>{vm.off.isLoad})
            .then((data)=>{
                vm.listInfo=data.data;
                vm.off.changePhone=false;
            })
        },
        fchangePhone(i,v){
            let vm=this;
            if(i==1){
                vm.off.changePhone=true;
            }else if(i==2){
                if(vm.listInfo.safe_phone.length!=11&&vm.listInfo.safe_phone!=""){
                    layer.open({
                        content:'请输入正确的手机号码',
                        skin: 'msg',
                        time: 3,
                        msgSkin:'error',
                    });
                    vm.searchPhone();
                    return false;
                }
                let data={
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
                }).catch(e=>errorDeal(e,()=>{vm.searchPhone()}))
                }
        },
        fcloseChange(){
            let vm=this;
            vm.listInfo.safe_phone="";
            vm.$refs.changePhone1.focus();
        },
        fupExcel(e) {
            let vm=this, xlf = document.getElementById('xlf'), f=this.$refs.file.files[0],reader = new FileReader(),name = f.name;
            vm.index = 0;
            vm.excelData = "";
            reader.onload = function(e) {
                if(typeof console !== 'undefined')//验证浏览器支持
                var data = e.target.result,wb = XLSX.read(btoa(vm.fixdata(data)), {type:'base64'});
                vm.excelData = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
                vm.off.upExcel=true;
                vm.imageName=name;
            };  
            vm.$refs.file.value=null;
            reader.readAsArrayBuffer(f);  
        },
        dealExcel(){
            let vm=this,data = JSON.parse(vm.excelData);
            vm.off.isLoad=true;
            let json = {"list":data}
            let msg="" ,layerIndex;
            batchUpdateAdultSafePhone(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.off.upExcel=false;
                vm.imageName="";
                for(let v of data.data){
                    if(v.index==0){
                        msg+=`<p> ${v.msg}</p>`
                    }else{
                        msg+=`<p>第${v.index}条 : ${v.msg}</p>`;
                    }
                } 
                layerIndex = layer.open({
                    content:`<div style="text-align:left;overflow-y:auto;height:300px;width:500px">${msg}</div>`,
                    style:"width:520px",
                    btn:['确定'],
                    msgSkin:'error',
                    title:'上传结果',
                    yes:function(){
                        layer.close(layerIndex);
                    }
                });
            }).catch(e=>errorDeal(e))
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
.m-changephone button{position: absolute;right: 0px;top:0px;width: 66px;background: #01AA01;color:#fff;border: 1px solid #01AA01;height: 35px;line-height: 35px;border-radius: 4px;}
.m-changephone span{display: inline-block;width: 33.333%;position: relative;}
.m-changephone input{height: 35px;line-height: 35px;border-radius: 4px;padding-left: 10px;border: 1px solid #bfcbd9;width: 80%;min-width:300px;}
.m-changephone .m-changephone-box{margin-right: 100px;}
.m-upExcel{position: absolute;width: 700px;height: 400px;margin: auto;top: 0;left: 0;right: 0;bottom: 0;text-align: center}
.m-upExcel .m-upExcel-icon span{display: inline-block;width: 50px;height: 50px;background: url('../../assets/images/excel.png') no-repeat;background-size: 100%;}
.m-upExcel .m-upExcel-icon button{position: absolute;left: 380px;top:26px;background: #44C688;color: #fff;border: 1px solid #44C688;border-radius: 4px;padding: 2px 5px;outline: none}
.m-upExcel .m-upExcel-icon #xlf{position:absolute;opacity: 0;height: 50px;width: 50px;z-index:999;}
.m-upExcel .m-upExcel-icon p b{font-weight: bold}
.m-excel-demo{margin-top: 15px;}
.m-excel-demo label{display:block;text-align: left;height: 30px;color: #fa4040}
</style>

<!--**
  *@info 大众号查询
* *-->
<template>
<section >
    <div class="g-search-menu" id="search" :class="{active:off.details}">
        <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
        <section class="m-occlusion" :class="{active:off.isLoad}"></section>
        <!--查询-->
        <section>
            <div class="g-search-form">
                <div class="m-tag"><b></b>条件查询</div>
                <section class="form-c o-no-bgc">
                    <div class="row">
                        <span class="text m-title">号码/段：</span>
                        <div class="input-box"><input v-model="form.context1"  maxlength="11" type="tel" placeholder="请输入查询的号码/段"></div>
                    </div>
                    <div class="row" style="margin-top:10px;">
                            <span class="text m-title">归属地：</span>
                            <div style="width:80%;display:inline-block">
                                <input type="text" v-on:input="filterData()" v-model="searchKey" @blur="msHide" @focus="msShow">
                                <p v-if="isShowCitySearch" class="m-searchCity" style="width:400px;height:400px">
                                    <span v-for="(v,i) in ret" @mousedown="checkCity(v)">{{v.cityName}}</span>
                                </p>
                                <p v-if="isShowCityAll" class="m-allCity" style="width:400px;height:400px">
                                    <span>
                                        <span class="m-mapCityBox" v-for="(v,i) in letterList.a" @mousedown="checkCity(v)">{{v.cityName}}</span> 
                                    </span>
                                    <span v-for="(item,key,index) in letterList"  v-if="key!='a'" >
                                        <h2 style="color:red" >{{key}}</h2>
                                        <span class="m-mapCityBox" v-for="(v,i) in item" @mousedown="checkCity(v)">{{v.cityName}}</span> 
                                    </span>
                                </p>
                            </div>
                        </div>  
                    <div class="row fullRow" >
                        <span class="text m-title">面额：</span>
                        <div class="m-form-checkbox">
                            <label><span class="checkbox"><input type="checkbox" value="true" v-model="context5All" checked="checked" @change="BtnCheckAll"><span></span></span><span class="f-checkText">全部</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="100" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">100卡</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="50" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">50卡</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="20" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">20卡</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="10" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">10卡</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="0" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">0卡</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="-1" v-model="context5" checked="checked"><span></span></span><span class="f-checkText">无预存</span></label>
                        </div>
                    </div>
                    <button class="f-btn f-btn-line" @click="searchList()">查询</button>
                </section>
            </div>
            <div class="m-total-table" v-if="dataList">
                <div class="total-head">查询结果<b>{{total}}</b> <!--<button class="btn_export_excel" v-if="maxpage"  @click="downLoadList">导出excel</button>--></div>
                <table class="exclusiveNumberTab" v-if="listShow==2">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>号码</th>
                            <th>归属地</th>
                            <th>面额(元)</th>
                            <th>产品名称</th>
                            <th>已激活(个)</th>
                            <th>成卡(个)</th>
                            <th>未激活(个)</th>
                            <th>白卡(个)</th>
                            <th>预占(个)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(v,i) in dataList" :key="i">
                            <td>{{((pageNum-1)*10+(i+1))}}</td>
                            <td>{{translateData('formatPhone',v.phoneSg)}}****</td>
                            <td>{{v.city||'--'}}</td>
                            <td>{{translateData('money',v.preStore)}}</td>
                            <td>{{v.pkgName||'--'}}</td>
                            <td><a :class="{'f-a-td':v.actived!=0}" @click="getNumberInfo({s:'3',phone:v.phoneSg,size:v.actived,monopolyType:v.monopolyType})">{{v.actived}}</a></td>
                            <td><a :class="{'f-a-td':v.adulted!=0}" @click="getNumberInfo({s:'2',phone:v.phoneSg,size:v.adulted,monopolyType:v.monopolyType})">{{v.adulted}}</a></td>
                            <td><a :class="{'f-a-td':v.unactived!=0}" @click="getNumberInfo({s:'4',phone:v.phoneSg,size:v.unactived,monopolyType:v.monopolyType})">{{v.unactived}}</a></td>
                            <td><a :class="{'f-a-td':v.whiteed!=0}" @click="getNumberInfo({s:'1',phone:v.phoneSg,size:v.whiteed,monopolyType:v.monopolyType})">{{v.whiteed}}</a></td>
                            <td><a :class="{'f-a-td':v.occupy!=0}" @click="getNumberInfo({s:'5',phone:v.phoneSg,size:v.occupy,monopolyType:v.monopolyType})">{{v.occupy}}</a></td>
                        </tr>
                    </tbody>
                </table>
                <table class="exclusiveNumberTab" v-if="listShow==1">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>号码</th>
                            <th>归属地</th>
                            <th>面额(元)</th>
                            <th>产品名称</th>
                            <th>当前状态</th>
                            <th>短信校验</th>
                            <th>制卡订单号码</th>
                            <th>制卡商户</th>
                            <th>开卡订单号码</th>
                            <th>开卡商户</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="JSON.stringify(dataList)!='{}'">
                            <td>{{((pageNum-1)*10+(i+1))}}</td>
                            <td>{{dataList.phone}}</td>
                            <td>{{dataList.home||'--'}}</td>
                            <td>{{translateData('money',dataList.preStore)}}</td>
                            <td>{{dataList.pkgName||'--'}}</td>
                            <td>{{translateData(17,dataList.status)}}</td>
                            <td>{{translateData(16,dataList.safeType)}}</td>
                            <td>
                                <a :href="dataList.makeCardId!=''?'#/homek/orderSearch/makeCard/'+dataList.makeCardId:`javascript:void(0)`" class="details">{{dataList.makeCardId||'--'}}</a>
                            </td>
                            <td>
                                <a :href="dataList.makeDealer!=''?'#/homek/resource/merchant/'+dataList.makeDealer:`javascript:void(0)`" class="details">{{dataList.makeDealerName||'--'}}({{dataList.makeDealer||'--'}})</a>
                            </td>
                            <td>
                                <a :href="dataList.openCardId!=''?'#/homek/orderSearch/card/audited/null/'+dataList.openCardId:`javascript:void(0)`" class="details">{{dataList.openCardId||'--'}}</a>
                            </td>
                            <td>
                                <a :href="dataList.openDealer?'#/homek/resource/merchant/'+dataList.openDealer:`javascript:void(0)`" class="details">{{dataList.openDealerName||'--'}}({{dataList.openDealer||'--'}})</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <my-page v-if="listShow==2" :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
                <div v-if="numberInfo" class="total-head">号码信息【{{translateData('formatPhone',phoneNum)}}****】{{translateCardType(phoneStatus)}}<b>{{total1}}</b> <!--<button class="btn_export_excel" v-if="maxpage"  @click="downLoadList">导出excel</button>--></div>
                <table class="exclusiveNumberTab" v-if="numberInfo">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>号码</th>
                            <th>面额(元)</th>
                            <th>产品名称</th>
                            <th>制卡订单号码</th>
                            <th>制卡商户</th>
                            <th>开卡订单号码</th>
                            <th>开卡商户</th>
                            <th>短信校验</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(v,i) in numberInfo" :key="i">
                            <td>{{((pageNum1-1)*10+(i+1))}}</td>
                            <td>{{v.phone}}</td>
                            <td>{{translateData('money',v.preStore)}}</td>
                            <td>{{v.pkgName||'--'}}</td>
                            <td>
                                <a v-if="v.makeCardId!=''" :href="'#/homek/orderSearch/makeCard/'+v.makeCardId" :class="{'details':v.makeCardId!=''}">{{v.makeCardId||'--'}}</a>
                                <a v-if="v.makeCardId==''" :class="{'details':v.makeCardId!=''}">--</a>
                            </td>
                            <td>
                                <a v-if="v.makeDealer!=''" :href="'#/homek/resource/merchant/'+v.makeDealer" :class="{'details':v.makeDealerName!=''}">{{v.makeDealerName||'--'}}({{v.makeDealer||'--'}})</a>
                                <a v-if="v.makeDealer==''" :class="{'details':v.makeDealerName!=''}">{{v.makeDealerName||'--'}}({{v.makeDealer||'--'}})</a>
                            </td>
                            <td>
                                <a v-if="v.openCardId!=''" :href="'#/homek/orderSearch/card/audited/null/'+v.openCardId" :class="{'details':v.openCardId!='--'}">{{v.openCardId||'--'}}</a>
                                <a v-if="v.openCardId==''" :class="{'details':v.openCardId!=''}">--</a>
                            </td>
                            <td>
                                <a v-if="v.openDealer!=''" :href="'#/homek/resource/merchant/'+v.openDealer" :class="{'details':v.openDealerName!=''}">{{v.openDealerName||'--'}}({{v.openDealer||'--'}})</a>
                                <a v-if="v.openDealer==''" :class="{'details':v.openDealerName!=''}">{{v.openDealerName||'--'}}({{v.openDealer||'--'}})</a>
                            </td>
                            <td>{{translateData(16,v.safeType)}}</td>
                        </tr>
                    </tbody>
                </table>
                <my-page v-if="numberInfo" :page="pageNum1" :maxpage="maxpage1" :callback="callback1"></my-page>
            </div>
        </section>
    </div>
</section>
</template>
<script>
import { requestGetGeneralNumberList1,requestGetGeneralNumberList2,requestGetGeneralNumberDesc,getCitys } from "../../../config/service.js";  
import { getDateTime,translateData,getUnixTime,createDownload,getStore, errorDeal } from "../../../config/utils.js";
import pagination from "../../../componentskm/page.vue";
import details from "../../../componentskm/reserveOrderDetails.vue";
export default{
	data (){
		return {
			off:{
                details:0,//详情页面开关
                numberDetails:'',
                numberDetailsAlert:false,
                isLoad:false,
                show:""
            },
			form:{
                context1:'',//号码/段
                context:"",
                type:"1"
            },
            numberDetails:'',
            pagename:"exclusiveNumber",
            searchRoad:[],
            i:'',            
            list:'',//查询数据
            context5All:true,//面额全选
            context5:[100,50,20,10,0,-1],//面额
			dataList:"",//号码/段查询列表
			numberInfo:"",//号码/段查询列表
			pageNum:1,//当前页数
            pageSize:10,//显示条数
            pageNum1:1,//当前页数
			pageSize1:10,//显示条数
			total:0,//总查询条数
            maxpage:1,//最大页数
            total1:0,//总查询条数
			maxpage1:1,//最大页数
			callback1:Function//page组件点击回调
            ,letterList:""
            ,phoneNum:""
            ,phoneStatus:""
            ,listShow:""
            ,searchKey:"全国",
            searchCityCode:100,
            letterList:"",
            selectedNode:"100",
            isShowCitySearch:false,
            isShowCityAll:false,
            findCitylist:[],
            ret:[],
		}
	},
	components:{
		'my-page':pagination,
        'list-details':details,
	},
	created:function(){
        let vm=this;
        getCitys({"monoType":0},()=>{vm.off.isLoad=false})
        .then((data)=>{
            vm.letterList=data.data.list;
            vm.letterList.a=[{ "cityName": "全国","cityCode":100}]
        }).catch(e=>errorDeal(e))
    },
    watch:{
        context5(){
            if(this.context5.length==6){
                this.context5All=true;
            }else{
                this.context5All=false;
            }
        },
    },
	methods:{
		searchList(page){
            let vm=this,data,url,reqAction;
            vm.numberInfo="";
            if(vm.context5.length==0){
                layer.open({
                    content:"请选择面额",
                    skin:"msg",
                    time: 2,
                    msgSkin: "error"
                });
                return false;
            }
            if(vm.form.context1!=""&&vm.form.context1.length<7){
                layer.open({
                    content:"请输入正确的号码/段",
                    skin:"msg",
                    time: 2,
                    msgSkin: "error"
                });
                return false;
            }else{
                if(isNaN(vm.form.context1)){
                    layer.open({
                        content:"请输入正确的号码/段",
                        skin:"msg",
                        time: 2,
                        msgSkin: "error"
                    });
                    return false;
                }
            }
            vm.off.isLoad=true;
            vm.pageNum=page||1;
            if(vm.form.context1.length==11){
                data={phone:vm.form.context1};
                requestGetGeneralNumberList1(data,()=>{vm.off.isLoad=false;})
                .then((data)=>{
                    vm.dataList=data.data
                    vm.maxpage=Math.ceil(parseInt(data.data.length)/20);
                    vm.total=1;
                    vm.listShow="1";
                    if(JSON.stringify(vm.dataList)=="{}"){
                        vm.total=0;
                    }
                    vm.callback=function(v){vm.searchList(v)};                
                }).catch(e=>errorDeal(e)) 
            }else{
                data={phone:vm.form.context1,cityCode:vm.searchCityCode,prestoreMoney:vm.context5,pageNow:page||1,pageSize:10} 
                requestGetGeneralNumberList2(data,()=>{vm.off.isLoad=false;})
                .then((data)=>{
                    vm.dataList=data.data
                    vm.maxpage=Math.ceil(parseInt(data.total)/10);
                    vm.total=data.total;
                    vm.listShow="2";
                    vm.callback=function(v){vm.searchList(v)};                
                }).catch(e=>errorDeal(e)) ;
            }
        },
        getNumberInfo(v,p){
            if(v.size==0){
                return false;
            }
            let vm=this,
            json={
                "pageSize": "10",
                "pageNow": p||1,
                "searchType": v.s,//1白卡2成卡3已激活4未激活
                "phoneSg":v.phone,//8位码号段
                "monopolyType":v.monopolyType
            };
            vm.off.isLoad=true;
            requestGetGeneralNumberDesc(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.numberInfo=data.data;
                vm.maxpage1=Math.ceil(parseInt(v.size)/10);
                vm.total1=v.size
                vm.pageNum1=p||1;
                vm.phoneNum=v.phone;
                vm.phoneStatus=v.s;
                vm.callback1=function(p){vm.getNumberInfo(v,p)};    
                setTimeout(()=>{
                    this.funScrollTop()
                },50) 
            }).catch(e=>errorDeal(e))
        },
        filterData(v){
            let vm = this;
            var sKey = vm.searchKey && vm.searchKey.toLowerCase();
            var data =  vm.letterList;vm.ret=[];
            if (sKey) {
                Object.entries(data).forEach(
                    (row,index)=>{
                        if(row[0].toLowerCase().indexOf(sKey)>-1){//首字母匹配
                            vm.ret=row[1];
                            return;
                        }else{
                            let todo = row[1].filter((value)=>
                                Object.keys(value).some((key)=>
                                    String(value[key]).indexOf(sKey) > -1
                                )
                            );
                            if(todo.length)vm.ret=vm.ret.concat(todo);
                        }
                    }
                );
                vm.isShowCityAll=false;
                vm.isShowCitySearch=true;
            }else{
                vm.isShowCitySearch=false;
                vm.isShowCityAll=true;
            }
        },
        checkCity(v){
            let vm=this;
            vm.searchKey="";
            vm.searchKey=v.cityName;
            vm.searchCityCode=v.cityCode;
        },
        msHide(){
            this.isShowCitySearch=false;
            this.isShowCityAll=false;
            let vm=this;
            if(vm.searchKey==''){
                vm.searchKey="全国";
            }
        },msShow(){
            let vm=this;
            vm.isShowCitySearch=false;
            vm.isShowCityAll=true;
        },
        funScrollTop(){
            let ch=this.$parent.$parent.$refs.psec.clientHeight;
            let sh=this.$parent.$parent.$refs.psec.scrollHeight;
            let sch = sh-ch;
            this.$parent.$parent.$refs.psec.scrollTop=sch;
        },
        replacedian(str){
            var index = str .lastIndexOf("\.");  
            return str.substring(index + 1, str.length);
        },
		ispShiftClick(){
			var vm=this;
			setTimeout(function(){
				if(vm.form.rechargeType==1){
					vm.form.isp=0;
				}else if(vm.form.rechargeType==2){
					vm.form.isp=4;
				}
			},300)
		},
		to_laydate(v){
			var vm=this;
			laydate({
				istime:true,
				format: 'YYYY-MM-DD hh:mm:ss',
				isclear: false,
				choose: function(dates){ //选择好日期的回调
					v==1 ? vm.form.startTime=dates : vm.form.endTime=dates;
				}
			});
		},
		topShiftClick(){
			var vm=this;
			vm.list='';
		},
		getDateTime(v){
			return getDateTime(v);
		},
		getUnixTime(v){
			return getUnixTime(v);
		},
		translateData(t,v){
			return translateData(t,v);
        },
        BtnCheckAll(){
            if(this.context5All==true){
                this.context5=[100,50,20,10,0,-1]
            }else if(this.context5All==false){
                this.context5=[]
            }
        },
        translateCardType(v){
             //1白卡2成卡3已激活4未激活5预占
            return v==1?'白卡':v==2?"成卡":v==3?'已激活':v==4?'未激活':v==5?'预占':'';
        }
        
	}
}
</script>
<style>
    .form-c.o-no-bgc{padding: .3rem}
    /* .m-total-table table.exclusiveNumberTab tbody tr>td:nth-child(4){border-right: 1px solid #dfe6ec} */
    .m-total-table table.exclusiveNumberTab tbody tr>td.dealerInfo{padding: 0;text-align: center}
    .m-total-table table.exclusiveNumberTab tbody tr>td.dealerInfo table{border: none;}
    .m-total-table table.exclusiveNumberTab tbody tr>td  table tr:nth-child(1){border-top: none}
    .selectStyle{width: 60%;border-color:#eee;border-radius: 7px;height: .35rem;padding-left: 10px;outline: none}
    a.underLine{text-decoration: underline;color:#3D6FDC;}
    #merchantDetails{padding: .15rem}
    .g-search-menu{position: static}
    /* .g-list-box, #details, .g-list-table, .g-inner-table, .g-box{width: auto;height: auto} */
    div.m-total-table{background: transparent}
    .m-title{text-align: justify;text-align-last: justify}
    span.f-checkText{display: inline-block;margin-left: 5px;margin-right: 5px;}
    .m-searchCity, .m-allCity{position: absolute;z-index: 999;background: #fff;border: 1px solid #eee;margin-top: 5px;border-radius: 6px;padding: 10px;overflow-y: auto}
.m-allCity>span{display: block;}
.m-allCity .m-mapCityBox{cursor: pointer;display: inline-block;margin-right:5px;line-height: 25px;overflow: auto;width: 80px;height: 25px;}
.m-searchCity>span{cursor: pointer;display: inline-block;margin-right:5px;width: 70px;height: 25px;line-height: 25px;overflow: auto}
</style>


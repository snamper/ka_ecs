<!--**
  *@info 大众号查询
* *-->
<template>
<section >
    <div class="g-search-menu" id="search" :class="{active:off.details}">
        <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
        <!--查询-->
        <section>
            <div class="g-search-form">
                <div class="m-tag"><b></b>条件查询</div>
                <section class="form-c o-no-bgc">
                    <div class="row">
                        <span class="text">号码/段：</span>
                        <div class="input-box"><input v-model="form.context1"  maxlength="11" type="tel" placeholder="请输入查询的专营号码/段"></div>
                    </div>
                    <div class="row" >
                        <span class="text">归属地：</span>
                        <select name="citysSelect" id="city" class="selectStyle" v-model="selectedNode">
                            <option v-for="(v,i) in citys" :key="i" :value="v.cityCode">{{v.cityName}}</option>
                        </select>
                    </div>
                    <div class="row fullRow" >
                        <span class="text">面额：</span>
                        <div class="m-form-checkbox">
                            <label><span class="checkbox"><input type="checkbox" value="true" v-model="context5All" checked="checked" @change="BtnCheckAll"><span></span></span><span class="text">全部</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="100" v-model="context5" checked="checked"><span></span></span><span class="text">100卡</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="50" v-model="context5" checked="checked"><span></span></span><span class="text">50卡</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="20" v-model="context5" checked="checked"><span></span></span><span class="text">20卡</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="10" v-model="context5" checked="checked"><span></span></span><span class="text">10卡</span></label>
                        </div>
                    </div>
                    <button class="f-btn f-btn-line" @click="searchList()">查询</button>
                </section>
            </div>
            <div class="m-total-table" v-if="dataList">
                <div class="total-head">查询结果<b>{{total}}</b> <!--<button class="btn_export_excel" v-if="maxpage"  @click="downLoadList">导出excel</button>--></div>
                <table class="exclusiveNumberTab" v-if="form.context1.length!=11">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>号码</th>
                            <th>归属地</th>
                            <th>预存(元)</th>
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
                            <td><a :class="{'f-a-td':v.actived!=0}" @click="getNumberInfo({s:'3',phone:v.phoneSg,size:v.actived},p)">{{v.actived}}</a></td>
                            <td><a :class="{'f-a-td':v.adulted!=0}" @click="getNumberInfo({s:'2',phone:v.phoneSg,size:v.adulted},p)">{{v.adulted}}</a></td>
                            <td><a :class="{'f-a-td':v.unactived!=0}" @click="getNumberInfo({s:'4',phone:v.phoneSg,size:v.unactived},p)">{{v.unactived}}</a></td>
                            <td><a :class="{'f-a-td':v.whiteed!=0}" @click="getNumberInfo({s:'1',phone:v.phoneSg,size:v.whiteed},p)">{{v.whiteed}}</a></td>
                            <td><a :class="{'f-a-td':v.occupy!=0}" @click="getNumberInfo({s:'5',phone:v.phoneSg,size:v.occupy},p)">{{v.occupy}}</a></td>
                        </tr>
                    </tbody>
                </table>
                <table class="exclusiveNumberTab" v-if="form.context1.length==11">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>号码</th>
                            <th>归属地</th>
                            <th>预存(元)</th>
                            <th>产品名称</th>
                            <th>当前状态</th>
                            <th>短信校验</th>
                            <th>制卡订单号码</th>
                            <th>制卡商户</th>
                            <th>开卡订单号码</th>
                            <th>开卡商户</th>
                            <th>所属渠道</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{((pageNum-1)*10+(i+1))}}</td>
                            <td>{{dataList.phone}}</td>
                            <td>{{dataList.home||'--'}}</td>
                            <td>{{translateData('money',dataList.preStore)}}</td>
                            <td>{{dataList.pkgName||'--'}}</td>
                            <td>{{translateData(17,dataList.status)}}</td>
                            <td>{{translateData(16,dataList.safeType)}}</td>
                            <td>
                                <a v-if="dataList.makeCardId!=0&&dataList.makeCardId!='--'" :href="'#/homek/orderSearch/makeCard/'+dataList.makeCardId" class="details">{{dataList.makeCardId||'--'}}</a>
                                <a v-if="dataList.makeCardId==0&&dataList.makeCardId=='--'">{{dataList.makeCardId||'--'}}</a>
                            </td>
                            <td>
                                <a v-if="dataList.makeDealer!='--'" :href="'#/homek/resource/merchant/'+dataList.makeDealer" class="details">{{dataList.makeDealerName||'--'}}({{dataList.makeDealer||'--'}})</a>
                                <a v-if="dataList.makeDealer=='--'">{{dataList.makeDealerName||'--'}}({{dataList.makeDealer||'--'}})</a>
                            </td>
                            <td>
                                <a v-if="dataList.makeDealer!='--'" :href="'#/homek/orderSearch/makeCard/'+dataList.openCardId" class="details">{{dataList.openCardId||'--'}}</a>
                                <a v-if="dataList.makeDealer=='--'">{{dataList.openCardId||'--'}}</a>
                            </td>
                            <td>
                                <a v-if="dataList.openDealer!='--'" :href="'#/homek/resource/merchant/'+dataList.openDealer" class="details">{{dataList.openDealerName||'--'}}({{dataList.openDealer||'--'}})</a>
                                <a v-if="dataList.openDealer=='--'">{{dataList.openDealerName||'--'}}({{dataList.openDealer||'--'}})</a>
                            </td>
                            <td>
                                <a v-if="dataList.channelId!='--'" :href="'#/homek/resource/merchant/'+dataList.channelId" class="details">{{dataList.channelName||'--'}}({{dataList.channelId||'--'}})</a>
                                <a v-if="dataList.channelId=='--'">{{dataList.channelName||'--'}}({{dataList.channelId||'--'}})</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <my-page v-if="form.context1.length!=11" :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
                <div v-if="numberInfo" class="total-head">号码信息【{{translateData('formatPhone',phoneNum)}}****】{{translateCardType(phoneStatus)}}<b>{{total1}}</b> <!--<button class="btn_export_excel" v-if="maxpage"  @click="downLoadList">导出excel</button>--></div>
                <table class="exclusiveNumberTab" v-if="numberInfo">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>号码</th>
                            <th>预存(元)</th>
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
                                <a v-if="v.makeCardId!='--'" :href="'#/homek/orderSearch/makeCard/'+v.makeCardId" :class="{'details':v.makeCardId!='--'}">{{v.makeCardId||'--'}}</a>
                                <a v-if="v.makeCardId=='--'" :class="{'details':v.makeCardId!='--'}">--</a>
                            </td>
                            <td>
                                <a v-if="v.makeDealer!='--'" :href="'#/homek/resource/merchant/'+v.makeDealer" :class="{'details':v.makeDealerName!='--'}">{{v.makeDealerName||'--'}}({{v.makeDealer||'--'}})</a>
                                <a v-if="v.makeDealer=='--'" :class="{'details':v.makeDealerName!='--'}">{{v.makeDealerName||'--'}}({{v.makeDealer||'--'}})</a>
                            </td>
                            <td>
                                <a v-if="v.openCardId!='--'" :href="'#/homek/orderSearch/card/audited/'+v.openCardId" :class="{'details':v.openCardId!='--'}">{{v.openCardId||'--'}}</a>
                                <a v-if="v.openCardId=='--'" :class="{'details':v.openCardId!='--'}">--</a>
                            </td>
                            <td>
                                <a v-if="v.openDealer!='--'" :href="'#/homek/resource/merchant/'+v.openDealer" :class="{'details':v.openDealerName!='--'}">{{v.openDealerName||'--'}}({{v.openDealer||'--'}})</a>
                                <a v-if="v.openDealer=='--'" :class="{'details':v.openDealerName!='--'}">{{v.openDealerName||'--'}}({{v.openDealer||'--'}})</a>
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
import { requestGetGeneralNumberList1,requestGetGeneralNumberList2,requestGetGeneralNumberDesc } from "../../../config/service.js";  
import { getDateTime,translateData,getUnixTime,createDownload,getStore, errorDeal } from "../../../config/utils.js";
import pagination from "../../../componentskm/page.vue";
import details from "../../../componentskm/reserveOrderDetails.vue";
export default{
	data (){
		return {
			off:{
                details:0,//详情页面开关
                numberDetails:'',
                numberDetailsAlert:false
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
            context5:[100,50,20,10],//面额
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
            ,citys:[{"cityName":"全国","cityCode":" "},{"cityName":"北京","cityCode":"110"},{"cityName":"长春","cityCode":"901"},{"cityName":"长沙","cityCode":"741"},{"cityName":"沧州","cityCode":"180"},{"cityName":"常州","cityCode":"440"},{"cityName":"成都","cityCode":"810"},{"cityName":"重庆","cityCode":"831"},{"cityName":"大连","cityCode":"940"},{"cityName":"大庆","cityCode":"981"},{"cityName":"东莞","cityCode":"580"},{"cityName":"佛山","cityCode":"530"},{"cityName":"福州","cityCode":"380"},{"cityName":"广州","cityCode":"510"},{"cityName":"贵阳","cityCode":"850"},{"cityName":"哈尔滨","cityCode":"971"},{"cityName":"海口","cityCode":"501"},{"cityName":"杭州","cityCode":"360"},{"cityName":"合肥","cityCode":"305"},{"cityName":"呼和浩特","cityCode":"101"},{"cityName":"湖州","cityCode":"362"},{"cityName":"惠州","cityCode":"570"},{"cityName":"济南","cityCode":"170"},{"cityName":"嘉兴","cityCode":"363"},{"cityName":"江门","cityCode":"550"},{"cityName":"金华","cityCode":"367"},{"cityName":"开封","cityCode":"762"},{"cityName":"昆明","cityCode":"860"},{"cityName":"丽水","cityCode":"469"},{"cityName":"南昌","cityCode":"750"},{"cityName":"南京","cityCode":"340"},{"cityName":"南宁","cityCode":"591"},{"cityName":"南通","cityCode":"358"},{"cityName":"宁波","cityCode":"370"},{"cityName":"平顶山","cityCode":"769"},{"cityName":"青岛","cityCode":"166"},{"cityName":"衢州","cityCode":"468"},{"cityName":"泉州","cityCode":"480"},{"cityName":"汕头","cityCode":"560"},{"cityName":"上海","cityCode":"310"},{"cityName":"绍兴","cityCode":"365"},{"cityName":"深圳","cityCode":"540"},{"cityName":"沈阳","cityCode":"910"},{"cityName":"石家庄","cityCode":"188"},{"cityName":"苏州","cityCode":"450"},{"cityName":"台州","cityCode":"476"},{"cityName":"泰州","cityCode":"445"},{"cityName":"天津","cityCode":"130"},{"cityName":"潍坊","cityCode":"155"},{"cityName":"温州","cityCode":"470"},{"cityName":"乌鲁木齐","cityCode":"890"},{"cityName":"无锡","cityCode":"330"},{"cityName":"芜湖","cityCode":"303"},{"cityName":"武汉","cityCode":"710"},{"cityName":"西安","cityCode":"841"},{"cityName":"厦门","cityCode":"390"},{"cityName":"徐州","cityCode":"350"},{"cityName":"烟台","cityCode":"161"},{"cityName":"盐城","cityCode":"348"},{"cityName":"银川","cityCode":"880"},{"cityName":"珠海","cityCode":"620"},{"cityName":"镇江","cityCode":"343"},{"cityName":"中山","cityCode":"556"},{"cityName":"舟山","cityCode":"364"},{"cityName":"郑州","cityCode":"760"},{"cityName":"安顺","cityCode":"789"},{"cityName":"白银","cityCode":"879"},{"cityName":"北海","cityCode":"599"},
            {"cityName": "潮州", cityCode: "531"},{"cityName": "德阳", cityCode: "825"},{"cityName": "大理", cityCode: "862"},{"cityName": "桂林", cityCode: "592"},{"cityName": "赣州", cityCode: "752"},{"cityName": "固原", cityCode: "885"},{"cityName": "淮安", cityCode: "354"},{"cityName": "黄石", cityCode: "715"},{"cityName": "酒泉", cityCode: "931"},{"cityName": "荆州", cityCode: "712"},{"cityName": "荆门", cityCode: "724"},{"cityName": "泸州", cityCode: "815"},{"cityName": "兰州", cityCode: "870"},{"cityName": "柳州", cityCode: "593"},{"cityName": "乐山", cityCode: "814"},{"cityName": "南充", cityCode: "822"},{"cityName": "梅州", cityCode: "528"},{"cityName": "绵阳", cityCode: "824"},{"cityName": "清远", cityCode: "535"},{"cityName": "韶关", cityCode: "558"},{"cityName": "石嘴山", cityCode: "884"},{"cityName": "吴忠", cityCode: "883"},{"cityName": "孝感", cityCode: "717"},{"cityName": "咸宁", cityCode: "719"},{"cityName": "宜昌", cityCode: "711"},{"cityName": "宜宾", cityCode: "817"},{"cityName": "扬州", cityCode: "430"},{"cityName": "湛江", cityCode: "520"},{"cityName": "肇庆", cityCode: "536"},{"cityName": "中卫", cityCode: "886"},{"cityName": "资阳", cityCode: "830"},{"cityName": "天水", cityCode: "877"}]
            ,selectedNode:" "
            ,phoneNum:""
            ,phoneStatus:""
		}
	},
	components:{
		'my-page':pagination,
        'list-details':details,
	},
	created:function(){

    },
    watch:{
        context5(){
            if(this.context5.length==4){
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
            if(vm.form.context1.length==11){
                data={phone:vm.form.context1};
                reqAction=requestGetGeneralNumberList1;
            }else{
                data={phone:vm.form.context1,cityCode:vm.selectedNode,prestoreMoney:vm.context5.join(','),pageNow:page||1,pageSize:20} 
                if(vm.context5All==true){
                    data.prestoreMoney="-1"
                }
                reqAction=requestGetGeneralNumberList2;
            }
            reqAction(data,()=>{vm.off.isLoad=false;})
            .then((data)=>{
                vm.dataList=data.data
                vm.maxpage=Math.ceil(parseInt(data.data.length)/20);
                vm.pageNum=page||1;
                vm.total=data.data.length;
                vm.callback=function(v){vm.searchList(v)};                
            }).catch(e=>errorDeal(e))     
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
            };
            requestGetGeneralNumberDesc(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.numberInfo=data.data;
                vm.maxpage1=Math.ceil(parseInt(v.size)/10);
                vm.total1=v.size
                vm.pageNum1=p||1;
                vm.phoneNum=v.phone;
                vm.phoneStatus=v.s;
                vm.callback1=function(i){vm.getNumberInfo(v,i)};    
                setTimeout(()=>{
                    this.funScrollTop()
                },50) 
            }).catch(e=>errorDeal(e))
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
                this.context5=[100,50,20,10]
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
</style>


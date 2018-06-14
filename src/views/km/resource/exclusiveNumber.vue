<!--**
  *@info 订单查询模块-预占号码模块
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<style>
    .form-c.o-no-bgc{padding: .3rem}
    .m-total-table table.exclusiveNumberTab tbody tr>td:nth-child(4){border-right: 1px solid #dfe6ec}
    .m-total-table table.exclusiveNumberTab tbody tr>td.dealerInfo{padding: 0;text-align: center}
    .m-total-table table.exclusiveNumberTab tbody tr>td.dealerInfo table{border: none;}
    .m-total-table table.exclusiveNumberTab tbody tr>td  table tr:nth-child(1){border-top: none}
    .selectStyle{width: 60%;border-color:#eee;border-radius: 7px;height: .35rem;padding-left: 10px;outline: none}
    a.underLine{text-decoration: underline;color:#3D6FDC;}
    #merchantDetails{padding: .15rem}
    .g-search-menu{position: static}
    .g-list-box, #details, .g-list-table, .g-inner-table, .g-box{width: auto;height: auto}
</style>
<template>
<section >
    <div class="g-search-menu" v-if="!ajaxData.details" id="search" :class="{active:off.details}">
        <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
        <!--查询-->
        <section v-if="!off.details">
        <div class="g-search-form">
            <div class="m-tag"><b></b>条件查询</div>
            <section class="form-c o-no-bgc">
                <div class="row" >
                    <span class="m-form-radio fr">
                        <input type="radio"><span></span></span><span class="text">专营号码：
                    </span>
                    <div class="input-box"><input v-model="form.context1"  maxlength="11" type="tel" placeholder="请输入查询的专营号码"></div>
                </div>
                <div class="row" >
                    <span class="m-form-radio fr">
                        <input type="radio"><span></span></span><span class="text">归属地：
                    </span>
                    <select name="citysSelect" id="city" class="selectStyle" v-model="selectedNode">
                        <option v-for="(v,i) in citys" :key="i" :value="v.cityCode">{{v.cityName}}</option>
                    </select>
                </div>
                <div class="row fullRow" >
                    <span class="m-form-radio fr">
                        <input type="radio"><span></span></span><span class="text">面额：
                    </span>
                    <div class="m-form-radio col-radio">
                        <label><span class="radio"><input type="radio" value="0" v-model="form.context5"><span></span></span><span class="text">全部</span></label>
                        <label><span class="radio"><input type="radio" value="100" v-model="form.context5"><span></span></span><span class="text">100卡</span></label>
                        <label><span class="radio"><input type="radio" value="50" v-model="form.context5"><span></span></span><span class="text">50卡</span></label>
                        <label><span class="radio"><input type="radio" value="20" v-model="form.context5"><span></span></span><span class="text">20卡</span></label>
                        <label><span class="radio"><input type="radio" value="10" v-model="form.context5"><span></span></span><span class="text">10卡</span></label>
                    </div>
                </div>
                <button class="f-btn f-btn-line" @click="searchList()">查询</button>
            </section>
        </div>
        <div class="m-total-table" v-if="list">
            <div class="total-head">统计结果<b>{{total}}</b> <!--<button class="btn_export_excel" v-if="maxpage"  @click="downLoadList">导出excel</button>--></div>
            <table class="exclusiveNumberTab">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>专营号</th>
                        <th>面额</th>
                        <th>归属地</th>
                        <th>商户名称</th>
                        <th>商户属性</th>
                        <th>商户类型</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v,i) in dataList" :key="i">
                        <td>{{ ((pageNum-1)*10+(i+1)) }}</td>
                        <td><a @click="getNumberDetails(v.id)" class="underLine" href="javascript:void(0)">{{v.number}}</a></td>
                        <td>{{v.prestoreMoney}}</td>
                        <td>{{v.city}}</td>

                        <td class="dealerInfo">
                            <table>
                                <tr v-if="v.dealers.length!=0" v-for="(value,index) in v.dealers" :key="index">
                                    <td >
                                        <a class="underLine" href="javascript:void(0)" @click="detailsDealer(value.dealerId)">{{value.companyName}}</a>
                                    </td>
                                </tr>
                                <tr v-if="v.dealers.length==0">
                                    <td >
                                        全部商户
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="dealerInfo">
                            <table>
                                <tr v-if="v.dealers.length!=0" v-for="(value,index) in v.dealers" :key="index">
                                    <td >
                                        <span v-if="value.merchantType==1">企业</span>
                                        <span v-if="value.merchantType==2">个人</span>
                                    </td>
                                </tr>
                                <tr v-if="v.dealers.length==0">
                                    <td >
                                        --
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="dealerInfo">
                            <table>
                                <tr v-if="v.dealers.length!=0" v-for="(value,index) in v.dealers" :key="index">
                                    <td >
                                        {{value.nickname}}
                                    </td>
                                </tr>
                                <tr v-if="v.dealers.length==0">
                                    <td >
                                        --
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
        </div>
        </section>
    </div>
    <div id="merchantDetails">
        <merchantDetails v-if="ajaxData.details" :searchRoad="searchRoad" :_form="form" :_off="off" :_ajaxData="ajaxData"></merchantDetails>
    </div>
    <numberDetailsAlert v-if="off.numberDetailsAlert" :details="numberDetails"></numberDetailsAlert>
</section>
</template>
<script>
import { requestGetExclusiveNumer,reqCommonMethod,requestGetExclusiveNumerDetails } from "../../../config/service.js";  
import pagination from "../../../componentskm/page.vue";
import details from "../../../componentskm/reserveOrderDetails.vue";
import { getDateTime,translateData,getUnixTime,createDownload,getStore, errorDeal } from "../../../config/utils.js";
import merchantDetails from "../../../componentskm/merchantDetails";
import numberDetailsAlert from "../../../componentskm/numberDetailsAlert";
export default{
	data (){
		return {
			off:{
				isLoad:0,//加载条
                details:0,//详情页面开关
                numberDetails:'',
            },
            numberDetails:'',
            pagename:"exclusiveNumber",
            searchRoad:[],
            i:'',            
            list:'',//查询数据
            off:{
                isLoad:!1,//ajax加载控制
                detailskind:'',
                pop:0,//弹出组件开关
                modifyInfo:0//显示修改商户资料开关
                ,numberDetailsAlert:false
			},
			form:{
                context1:'',//订单号码
				context5:0,//订单状态
				select:5,//条件查询，选择的条件
                content:1,//1:商户，2:工号
                searchContext:'',//输入框查询内容
                searchType:1,//查询类型
                inputContext:'',//输入内容
                context:"",
                activationState:-1,
                businessScope:[1,2],
                startTime:'',
                endTime:'',
				time:'',//点击时间控制
				paySource:2//第三方流水号，来源(1:保证金,2:充值,3:开卡,4:代充)
                ,startTime:'',
                endTime:'',
                type:"1",
                searchKind:"1",//true:精确查找false:组合查找
                searchDealerName:"",//商户名称
			},
            ajaxData:{//ajax响应数据
				details:'',//商户/工号详情
				list:[],//第三方流水号列表/用户列表
                maxpage:0,//最大页数
                maxpage1:0,//第三方支付查询结果页码
				pageNum:1,//当前页
				callback:Function,//分页响应函数
				total:0,//列表总条数
            },
            ajaxData2:{//ajax响应数据
				details:'',//商户/工号详情
				list:[],//第三方流水号列表/用户列表
                maxpage:0,//最大页数
                maxpage1:0,//第三方支付查询结果页码
				pageNum:1,//当前页
				callback:Function,//分页响应函数
				total:0,//列表总条数
			},
			dataList:
                {
                    "city": "北京",
                    "number": "17190069919",
                    "prestoreMoney": "3500",
                    "dealers": [{
                        "dealerId": "test",
                        "companyName": "家乐福",
                        "merchantType": "1", //商户属性  1 企业 2 个人
                        "nickname": "test" //商户类别
                },{
                        "dealerId": "test",
                        "companyName": "家乐福22",
                        "merchantType": "2", //商户属性  1 企业 2 个人
                        "nickname": "测试" //商户类别
                }]
            }
        ,//详情数据
			total:0,//总查询条数
			pageNum:1,//当前页数
			pageSize:10,//显示条数
			maxpage:1,//最大页数
			callback:Function//page组件点击回调
            ,citys:[{"cityName":"全部城市","cityCode":" "},{"cityName":"北京","cityCode":"110"},{"cityName":"长春","cityCode":"901"},{"cityName":"长沙","cityCode":"741"},{"cityName":"沧州","cityCode":"180"},{"cityName":"常州","cityCode":"440"},{"cityName":"成都","cityCode":"810"},{"cityName":"重庆","cityCode":"831"},{"cityName":"大连","cityCode":"940"},{"cityName":"大庆","cityCode":"981"},{"cityName":"东莞","cityCode":"580"},{"cityName":"佛山","cityCode":"530"},{"cityName":"福州","cityCode":"380"},{"cityName":"广州","cityCode":"510"},{"cityName":"贵阳","cityCode":"850"},{"cityName":"哈尔滨","cityCode":"971"},{"cityName":"海口","cityCode":"501"},{"cityName":"杭州","cityCode":"360"},{"cityName":"合肥","cityCode":"305"},{"cityName":"呼和浩特","cityCode":"101"},{"cityName":"湖州","cityCode":"362"},{"cityName":"惠州","cityCode":"570"},{"cityName":"济南","cityCode":"170"},{"cityName":"嘉兴","cityCode":"363"},{"cityName":"江门","cityCode":"550"},{"cityName":"金华","cityCode":"367"},{"cityName":"开封","cityCode":"762"},{"cityName":"昆明","cityCode":"860"},{"cityName":"丽水","cityCode":"469"},{"cityName":"南昌","cityCode":"750"},{"cityName":"南京","cityCode":"340"},{"cityName":"南宁","cityCode":"591"},{"cityName":"南通","cityCode":"358"},{"cityName":"宁波","cityCode":"370"},{"cityName":"平顶山","cityCode":"769"},{"cityName":"青岛","cityCode":"166"},{"cityName":"衢州","cityCode":"468"},{"cityName":"泉州","cityCode":"480"},{"cityName":"汕头","cityCode":"560"},{"cityName":"上海","cityCode":"310"},{"cityName":"绍兴","cityCode":"365"},{"cityName":"深圳","cityCode":"540"},{"cityName":"沈阳","cityCode":"910"},{"cityName":"石家庄","cityCode":"188"},{"cityName":"苏州","cityCode":"450"},{"cityName":"台州","cityCode":"476"},{"cityName":"泰州","cityCode":"445"},{"cityName":"天津","cityCode":"130"},{"cityName":"潍坊","cityCode":"155"},{"cityName":"温州","cityCode":"470"},{"cityName":"乌鲁木齐","cityCode":"890"},{"cityName":"无锡","cityCode":"330"},{"cityName":"芜湖","cityCode":"303"},{"cityName":"武汉","cityCode":"710"},{"cityName":"西安","cityCode":"841"},{"cityName":"厦门","cityCode":"390"},{"cityName":"徐州","cityCode":"350"},{"cityName":"烟台","cityCode":"161"},{"cityName":"盐城","cityCode":"348"},{"cityName":"银川","cityCode":"880"},{"cityName":"珠海","cityCode":"620"},{"cityName":"镇江","cityCode":"343"},{"cityName":"中山","cityCode":"556"},{"cityName":"舟山","cityCode":"364"},{"cityName":"郑州","cityCode":"760"},{"cityName":"安顺","cityCode":"789"},{"cityName":"白银","cityCode":"879"},{"cityName":"北海","cityCode":"599"},
            {"cityName": "潮州", cityCode: "531"},{"cityName": "德阳", cityCode: "825"},{"cityName": "大理", cityCode: "862"},{"cityName": "桂林", cityCode: "592"},{"cityName": "赣州", cityCode: "752"},{"cityName": "固原", cityCode: "885"},{"cityName": "淮安", cityCode: "354"},{"cityName": "黄石", cityCode: "715"},{"cityName": "酒泉", cityCode: "931"},{"cityName": "荆州", cityCode: "712"},{"cityName": "荆门", cityCode: "724"},{"cityName": "泸州", cityCode: "815"},{"cityName": "兰州", cityCode: "870"},{"cityName": "柳州", cityCode: "593"},{"cityName": "乐山", cityCode: "814"},{"cityName": "南充", cityCode: "822"},{"cityName": "梅州", cityCode: "528"},{"cityName": "绵阳", cityCode: "824"},{"cityName": "清远", cityCode: "535"},{"cityName": "韶关", cityCode: "558"},{"cityName": "石嘴山", cityCode: "884"},{"cityName": "吴忠", cityCode: "883"},{"cityName": "孝感", cityCode: "717"},{"cityName": "咸宁", cityCode: "719"},{"cityName": "宜昌", cityCode: "711"},{"cityName": "宜宾", cityCode: "817"},{"cityName": "扬州", cityCode: "430"},{"cityName": "湛江", cityCode: "520"},{"cityName": "肇庆", cityCode: "536"},{"cityName": "中卫", cityCode: "886"},{"cityName": "资阳", cityCode: "830"},{"cityName": "天水", cityCode: "877"}]
            ,selectedNode:" "
		}
	},
	components:{
		'my-page':pagination,
        'list-details':details,
        merchantDetails,
        numberDetailsAlert
	},
	created:function(){
		this.init()
	},
	methods:{
		init:function(){
		
		},
		searchList:function(page){
			let vm=this,data,url;
            data={phone:vm.form.context1,cityCode:vm.selectedNode,prestoreMoney:vm.form.context5,currentPage:page||1,pageSize:20} 
            vm.list=true;
            vm.pageNum=page||1;
            vm.searchRoad.push({'vm.form.type':vm.ajaxData.details});
            vm.i=vm.searchRoad.length; 
            requestGetExclusiveNumer(data,function(){vm.off.isLoad=false;})
            .then((data)=>{
                vm.dataList=data.data
                vm.maxpage=Math.ceil(parseInt(data.total)/20);
                vm.callback=function(v){vm.searchList(v)};                
            }).catch(e=>errorDeal(e))     
        },detailsDealer(v){
            let vm=this,data={},url='km-ecs/w/merchant/getInfo';
            data.dealerId=v;
            reqCommonMethod(data,function(){vm.off.isLoad=false;},url)
            .then((data)=>{
                vm.searchRoad.push({'vm.form.type':vm.ajaxData.details});
                vm.ajaxData.details=data.data;
                vm.ajaxData.details.status=1;
                vm.off.isLoad=false;
            }).catch(e=>errorDeal(e))
        },
        getNumberDetails(v){
            let vm=this,data={};
            data.id=v;
            requestGetExclusiveNumerDetails(data)
            .then((data)=>{
                vm.off.numberDetailsAlert=true                                
                vm.numberDetails=data.data;
            }).catch(e=>errorDeal(e))
        },
		// 导出查询结果excel
		downLoadList:function(){
			const vm=this;
			let json=vm.getForm();
			if(!json)return false;
			json.exportType=3;
			json.pageNum="-1";
			let userInfo = getStore("KA_ECS_USER");
			json.customerId = userInfo.customerId;
			json.codeId = userInfo.codeId;

			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;
			createDownload('km-ecs/w/handler/queryExport',BASE64.encode(JSON.stringify(json)),  function(){
		        vm.off.isLoad=false;
	      	});
		},
		details:function(e){//详情
			var vm=this,
			orderId=e.target.name,
			json={"pageSize":"10","pageNum":"-1","params":['occupy_order_id="'+orderId+'"'],"opKey":"order.reserve.details"};
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;

            reqCommonMethod(json,function(){vm.off.isLoad=false;},"km-ecs/w/handler/query")
            .then((data)=>{
	            vm.detailsData=data.data.list[0];
                vm.off.details=true;
                vm.off.isLoad=false;
            }).catch(error=>errorDeal(error)); 	
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
		to_laydate:function(v){
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
	}
}
</script>


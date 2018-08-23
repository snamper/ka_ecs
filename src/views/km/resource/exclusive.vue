<!--**
  *@info 专营号查询
* *-->
<template>
    <section>
        <div class="g-search-menu" id="search" :class="{active:off.details}">
            <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
            <!--查询-->
            <section v-if="!off.numberFlow">
                <div class="g-search-form">
                    <div class="m-tag"><b></b>条件查询</div>
                    <section class="form-c o-no-bgc">
                        <div class="row" :class="{active:form.select==1}">
                            <span class="m-form-radio">
                                <label style="width:0.7rem;margin-right:0">
                                    <span class="radio"><input type="radio" value="1" v-model="form.select">
                                        <span></span>
                                    </span>
                                    <span>号码/段：</span>
                                </label>
                            </span>
                            <div class="input-box"><input v-model="numberSection" :readonly="form.select!=1" maxlength="11" type="tel" placeholder="请输入查询的号码/段"></div>
                        </div>
                        <div class="row" :class="{active:form.select==2}">
                            <span class="m-form-radio">
                                <label style="width:0.7rem;margin-right:0">
                                    <span class="radio"><input type="radio" value="2" v-model="form.select">
                                        <span></span>
                                    </span>
                                    <span>设备号：</span>
                                </label>
                            </span>
                            <div class="input-box"><input v-model="deviceId" :readonly="form.select!=2" maxlength="20" type="tel" placeholder="请输入查询的设备号"></div>
                        </div>
                        <div class="row" style="margin-top:10px;">
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
                        <div class="row" style="margin-top:10px;">
                            <span class="text m-title">归属地：</span>
                            <!-- <select name="citysSelect" id="city" class="selectStyle" v-model="selectedNode">
                                <option v-for="(v,i) in citys" :key="i" :value="v.cityCode">{{v.cityName}}</option>
                            </select> -->
                            <div style="width:80%;display:inline-block">
                                <input type="text" v-on:input="filterData()" v-model="searchKey" @blur="msHide">
                                <p v-if="isShowCitySearch" class="m-searchCity" style="width:350px;height:200px">
                                    <span v-for="(v,i) in ret" @mousedown="checkCity(v)">{{v.cityName}}</span>
                                </p>
                            </div>
                        </div>              
                        <button class="f-btn f-btn-line" @click="searchList()">查询</button>
                    </section>
                </div>
                <div class="m-total-table" v-if="dataList">
                    <div class="total-head">查询结果<b>{{total}}</b></div>
                    <table class="exclusiveNumberTab">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>号码</th>
                                <th>归属地</th>
                                <th>面额(元)</th>
                                <th>产品名称</th>
                                <th>所属商户</th>
                                <th>设备号</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v,i) in dataList" :key="i">
                                <td>{{((pageNum-1)*10+(i+1))}}</td>
                                <td><a @click="getFlowDetails(v)" style="cursor:pointer" class="details ">{{translateData('formatPhone',v.title)}}****</a></td>
                                <td>{{v.home||'--'}}</td>
                                <td>{{translateData('money',v.preStore)}}</td>
                                <td>{{v.prodName||'--'}}</td>
                                <td><a :href="v.dealerId!='--'?'#/homek/resource/merchant/'+v.dealerId:`javascript:void(0)`" :class="{'details':v.dealerId!='--'}">{{v.dealerName}}({{v.dealerId}})</a></td>
                                <td>{{v.deviceId||'--'}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <my-page v-if="total" :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
                </div>
            </section>
            <numberFlow v-if="off.numberFlow" :numberInfo="numberInfo" :flowlist="flowlist" :pageNumf="pageNumf" :maxPagef="maxPagef" :callbackf="callbackf"></numberFlow>
        </div>
    </section>
</template>
<script>
import "../../../assets/km/css/search.css";
import { translateData,getDateTime, errorDeal } from '../../../config/utils.js';
import { requestGetExclusiveNumberList,requestGetExclusiveNumberFlow } from "../../../config/service.js";
import pagination from "../../../componentskm/page.vue";
import numberFlow from './exclusiveFlow.vue';
export default {
    data() {
        return{
            off:{
                details:"",
                isLoad:"",
                numberFlow:""
            },
            form:{
                select:1
            },
            numberSection:"",//号码
            deviceId:"",//设备号
            context5:[100,50,20,10,0,-1],//面额
            context5All:"true",
            dataList:"",
            total:"",
            numberInfo:"",
            searchKey:"全国",
            searchCityCode:100,
            citys:[{"cityName":"全国","cityCode":"100"},{"cityName":"北京","cityCode":"110"},{"cityName":"长春","cityCode":"901"},{"cityName":"长沙","cityCode":"741"},{"cityName":"沧州","cityCode":"180"},{"cityName":"常州","cityCode":"440"},{"cityName":"成都","cityCode":"810"},{"cityName":"重庆","cityCode":"831"},{"cityName":"大连","cityCode":"940"},{"cityName":"大庆","cityCode":"981"},{"cityName":"东莞","cityCode":"580"},{"cityName":"佛山","cityCode":"530"},{"cityName":"福州","cityCode":"380"},{"cityName":"广州","cityCode":"510"},{"cityName":"贵阳","cityCode":"850"},{"cityName":"哈尔滨","cityCode":"971"},{"cityName":"海口","cityCode":"501"},{"cityName":"杭州","cityCode":"360"},{"cityName":"合肥","cityCode":"305"},{"cityName":"呼和浩特","cityCode":"101"},{"cityName":"湖州","cityCode":"362"},{"cityName":"惠州","cityCode":"570"},{"cityName":"济南","cityCode":"170"},{"cityName":"嘉兴","cityCode":"363"},{"cityName":"江门","cityCode":"550"},{"cityName":"金华","cityCode":"367"},{"cityName":"开封","cityCode":"762"},{"cityName":"昆明","cityCode":"860"},{"cityName":"丽水","cityCode":"469"},{"cityName":"南昌","cityCode":"750"},{"cityName":"南京","cityCode":"340"},{"cityName":"南宁","cityCode":"591"},{"cityName":"南通","cityCode":"358"},{"cityName":"宁波","cityCode":"370"},{"cityName":"平顶山","cityCode":"769"},{"cityName":"青岛","cityCode":"166"},{"cityName":"衢州","cityCode":"468"},{"cityName":"泉州","cityCode":"480"},{"cityName":"汕头","cityCode":"560"},{"cityName":"上海","cityCode":"310"},{"cityName":"绍兴","cityCode":"365"},{"cityName":"深圳","cityCode":"540"},{"cityName":"沈阳","cityCode":"910"},{"cityName":"石家庄","cityCode":"188"},{"cityName":"苏州","cityCode":"450"},{"cityName":"台州","cityCode":"476"},{"cityName":"泰州","cityCode":"445"},{"cityName":"天津","cityCode":"130"},{"cityName":"潍坊","cityCode":"155"},{"cityName":"温州","cityCode":"470"},{"cityName":"乌鲁木齐","cityCode":"890"},{"cityName":"无锡","cityCode":"330"},{"cityName":"芜湖","cityCode":"303"},{"cityName":"武汉","cityCode":"710"},{"cityName":"西安","cityCode":"841"},{"cityName":"厦门","cityCode":"390"},{"cityName":"徐州","cityCode":"350"},{"cityName":"烟台","cityCode":"161"},{"cityName":"盐城","cityCode":"348"},{"cityName":"银川","cityCode":"880"},{"cityName":"珠海","cityCode":"620"},{"cityName":"镇江","cityCode":"343"},{"cityName":"中山","cityCode":"556"},{"cityName":"舟山","cityCode":"364"},{"cityName":"郑州","cityCode":"760"},{"cityName":"安顺","cityCode":"789"},{"cityName":"白银","cityCode":"879"},{"cityName":"北海","cityCode":"599"},
            {"cityName": "潮州", "cityCode": "531"},{"cityName": "德阳", "cityCode": "825"},{"cityName": "大理", "cityCode": "862"},{"cityName": "桂林", "cityCode": "592"},{"cityName": "赣州", "cityCode": "752"},{"cityName": "固原", "cityCode": "885"},{"cityName": "淮安", "cityCode": "354"},{"cityName": "黄石", "cityCode": "715"},{"cityName": "酒泉", "cityCode": "931"},{"cityName": "荆州", "cityCode": "712"},{"cityName": "荆门", "cityCode": "724"},{"cityName": "泸州", "cityCode": "815"},{"cityName": "兰州", "cityCode": "870"},{"cityName": "柳州", "cityCode": "593"},{"cityName": "乐山", "cityCode": "814"},{"cityName": "南充", "cityCode": "822"},{"cityName": "梅州", "cityCode": "528"},{"cityName": "绵阳", "cityCode": "824"},{"cityName": "清远", "cityCode": "535"},{"cityName": "韶关", "cityCode": "558"},{"cityName": "石嘴山", "cityCode": "884"},{"cityName": "吴忠", "cityCode": "883"},{"cityName": "孝感", "cityCode": "717"},{"cityName": "咸宁", "cityCode": "719"},{"cityName": "宜昌", "cityCode": "711"},{"cityName": "宜宾", "cityCode": "817"},{"cityName": "扬州", "cityCode": "430"},{"cityName": "湛江", "cityCode": "520"},{"cityName": "肇庆", "cityCode": "536"},{"cityName": "中卫", "cityCode": "886"},{"cityName": "资阳", "cityCode": "830"},{"cityName": "天水", "cityCode": "877"}]
            ,letterList:{
                "A":[ { "cityName": "阿坝", "cityCode": "829" }, { "cityName": "阿克苏", "cityCode": "896" }, { "cityName": "阿拉善盟", "cityCode": "114" }, { "cityName": "阿勒泰", "cityCode": "953" }, { "cityName": "阿里", "cityCode": "802" }, { "cityName": "安康", "cityCode": "848" }, { "cityName": "安庆", "cityCode": "302" }, { "cityName": "安顺", "cityCode": "789" }, { "cityName": "安阳", "cityCode": "767" }, { "cityName": "鞍山", "cityCode": "912" }],
                "B":[{ "cityName": "巴彦淖尔市", "cityCode": "105" }, { "cityName": "巴中", "cityCode": "827" }, { "cityName": "巴州", "cityCode": "895" }, { "cityName": "白城", "cityCode": "907" }, { "cityName": "白山", "cityCode": "908" }, { "cityName": "白银", "cityCode": "879" }, { "cityName": "百色", "cityCode": "596" }, { "cityName": "蚌埠", "cityCode": "301" }, { "cityName": "包头市", "cityCode": "102" }, { "cityName": "宝鸡", "cityCode": "840" }, { "cityName": "保定", "cityCode": "187" }, { "cityName": "保山", "cityCode": "731" }, { "cityName": "北海", "cityCode": "599" }, { "cityName": "北京", "cityCode": "110" }, { "cityName": "本溪", "cityCode": "914" }, { "cityName": "毕节", "cityCode": "851" }, { "cityName": "滨州", "cityCode": "151" }, { "cityName": "亳州", "cityCode": "318" }, { "cityName": "博乐", "cityCode": "951" }],
                "C":[{ "cityName": "沧州", "cityCode": "180" }, { "cityName": "昌都", "cityCode": "800" }, { "cityName": "昌吉", "cityCode": "891" }, { "cityName": "常德", "cityCode": "749" }, { "cityName": "常州", "cityCode": "440" }, { "cityName": "巢湖", "cityCode": "309" }, { "cityName": "朝阳", "cityCode": "920" }, { "cityName": "潮州", "cityCode": "531" }, { "cityName": "郴州", "cityCode": "748" }, { "cityName": "成都", "cityCode": "810" }, { "cityName": "承德", "cityCode": "189" }, { "cityName": "池州", "cityCode": "317" }, { "cityName": "赤峰市", "cityCode": "107" }, { "cityName": "崇左", "cityCode": "600" }, { "cityName": "滁州", "cityCode": "312" }, { "cityName": "楚雄", "cityCode": "864" }],
                "D":[{ "cityName": "达州", "cityCode": "820" }, { "cityName": "大理", "cityCode": "862" }, { "cityName": "大连", "cityCode": "940" }, { "cityName": "大庆", "cityCode": "981" }, { "cityName": "大同", "cityCode": "193" }, { "cityName": "大兴安岭", "cityCode": "995" }, { "cityName": "丹东", "cityCode": "915" }, { "cityName": "德宏", "cityCode": "730" }, { "cityName": "德阳", "cityCode": "825" }, { "cityName": "德州", "cityCode": "173" }, { "cityName": "迪庆", "cityCode": "735" }, { "cityName": "定西", "cityCode": "871" }, { "cityName": "东莞", "cityCode": "580" }, { "cityName": "东营", "cityCode": "156" }],
                "E":[{ "cityName": "鄂尔多斯市", "cityCode": "104" }, { "cityName": "鄂州", "cityCode": "718" }, { "cityName": "恩施", "cityCode": "727" }],
                "F":[{ "cityName": "防城港", "cityCode": "590" }, { "cityName": "佛山", "cityCode": "530" }, { "cityName": "福州", "cityCode": "380" }, { "cityName": "抚顺", "cityCode": "913" }, { "cityName": "抚州", "cityCode": "759" }, { "cityName": "阜新", "cityCode": "918" }, { "cityName": "阜阳", "cityCode": "306" }],
                "G":[{ "cityName": "甘南", "cityCode": "961" }, { "cityName": "甘孜", "cityCode": "828" }, { "cityName": "赣州", "cityCode": "752" }, { "cityName": "格尔木", "cityCode": "702" }, { "cityName": "固原", "cityCode": "885" }, { "cityName": "广安", "cityCode": "823" }, { "cityName": "广元", "cityCode": "826" }, { "cityName": "广州", "cityCode": "510" }, { "cityName": "贵港", "cityCode": "589" }, { "cityName": "贵阳", "cityCode": "850" }, { "cityName": "桂林", "cityCode": "592" }, { "cityName": "果洛州", "cityCode": "708" }],
                "H":[{ "cityName": "哈尔滨", "cityCode": "971" }, { "cityName": "哈密", "cityCode": "900" }, { "cityName": "海北洲", "cityCode": "706" }, { "cityName": "海东", "cityCode": "701" }, { "cityName": "海南", "cityCode": "501" }, { "cityName": "海南洲", "cityCode": "705" }, { "cityName": "海西洲", "cityCode": "704" }, { "cityName": "邯郸", "cityCode": "186" }, { "cityName": "汉中", "cityCode": "849" }, { "cityName": "杭州", "cityCode": "360" }, { "cityName": "合肥", "cityCode": "305" }, { "cityName": "和田", "cityCode": "955" }, { "cityName": "河池", "cityCode": "598" }, { "cityName": "河源", "cityCode": "670" }, { "cityName": "荷泽", "cityCode": "159" }, { "cityName": "贺州", "cityCode": "588" }, { "cityName": "鹤壁", "cityCode": "774" }, { "cityName": "鹤岗", "cityCode": "993" }, { "cityName": "黑河", "cityCode": "990" }, { "cityName": "衡水", "cityCode": "720" }, { "cityName": "衡阳", "cityCode": "744" }, { "cityName": "红河", "cityCode": "861" }, { "cityName": "呼和浩特市", "cityCode": "101" }, { "cityName": "呼伦贝尔市", "cityCode": "108" }, { "cityName": "葫芦岛", "cityCode": "922" }, { "cityName": "湖州", "cityCode": "362" }, { "cityName": "怀化", "cityCode": "795" }, { "cityName": "淮安", "cityCode": "354" }, { "cityName": "淮北", "cityCode": "314" }, { "cityName": "淮南", "cityCode": "307" }, { "cityName": "黄冈", "cityCode": "714" }, { "cityName": "黄南州", "cityCode": "707" }, { "cityName": "黄山", "cityCode": "316" }, { "cityName": "黄石", "cityCode": "715" }, { "cityName": "惠州", "cityCode": "570" }],
                "J":[{ "cityName": "鸡西市", "cityCode": "991" }, { "cityName": "吉安", "cityCode": "751" }, { "cityName": "吉林市", "cityCode": "902" }, { "cityName": "济南", "cityCode": "170" }, { "cityName": "济宁", "cityCode": "158" }, { "cityName": "济源", "cityCode": "775" }, { "cityName": "佳木斯", "cityCode": "976" }, { "cityName": "嘉兴", "cityCode": "363" }, { "cityName": "嘉峪关", "cityCode": "876" }, { "cityName": "江汉", "cityCode": "713" }, { "cityName": "江门", "cityCode": "550" }, { "cityName": "焦作", "cityCode": "763" }, { "cityName": "揭阳", "cityCode": "526" }, { "cityName": "金昌", "cityCode": "930" }, { "cityName": "金华", "cityCode": "367" }, { "cityName": "锦州", "cityCode": "916" }, { "cityName": "晋城", "cityCode": "194" }, { "cityName": "晋中", "cityCode": "191" }, { "cityName": "荆门", "cityCode": "724" }, { "cityName": "荆州", "cityCode": "712" }, { "cityName": "景德镇", "cityCode": "740" }, { "cityName": "九江", "cityCode": "755" }, { "cityName": "酒泉", "cityCode": "931" }], 
                "k":[{ "cityName": "喀什", "cityCode": "897" }, { "cityName": "开封", "cityCode": "762" }, { "cityName": "克拉玛依", "cityCode": "899" }, { "cityName": "克州", "cityCode": "954" }, { "cityName": "奎屯", "cityCode": "892" }, { "cityName": "昆明", "cityCode": "860" }], 
                "L":[{ "cityName": "拉萨", "cityCode": "790" }, { "cityName": "来宾", "cityCode": "601" }, { "cityName": "莱芜", "cityCode": "160" }, { "cityName": "兰州", "cityCode": "870" }, { "cityName": "廊坊", "cityCode": "183" }, { "cityName": "乐山", "cityCode": "814" }, { "cityName": "丽江", "cityCode": "863" }, { "cityName": "丽水", "cityCode": "469" }, { "cityName": "连云港", "cityCode": "346" }, { "cityName": "凉山州", "cityCode": "812" }, { "cityName": "辽阳", "cityCode": "919" }, { "cityName": "辽源", "cityCode": "906" }, { "cityName": "聊城", "cityCode": "174" }, { "cityName": "林芝", "cityCode": "799" }, { "cityName": "临沧", "cityCode": "733" }, { "cityName": "临汾", "cityCode": "197" }, { "cityName": "临夏", "cityCode": "878" }, { "cityName": "临沂", "cityCode": "153" }, { "cityName": "柳州", "cityCode": "593" }, { "cityName": "六安", "cityCode": "304" }, { "cityName": "六盘水", "cityCode": "853" }, { "cityName": "龙岩", "cityCode": "384" }, { "cityName": "陇南", "cityCode": "960" }, { "cityName": "娄底", "cityCode": "791" }, { "cityName": "泸州", "cityCode": "815" }, { "cityName": "洛阳", "cityCode": "761" }, { "cityName": "漯河", "cityCode": "766" }, { "cityName": "吕梁", "cityCode": "200" }], 
                "M":[{ "cityName": "马鞍山", "cityCode": "300" }, { "cityName": "茂名", "cityCode": "568" }, { "cityName": "眉山", "cityCode": "819" }, { "cityName": "梅州", "cityCode": "528" }, { "cityName": "绵阳", "cityCode": "824" }, { "cityName": "牡丹江市", "cityCode": "988" }], 
                "N":[{ "cityName": "那曲", "cityCode": "801" }, { "cityName": "南昌", "cityCode": "750" }, { "cityName": "南充", "cityCode": "822" }, { "cityName": "南京", "cityCode": "340" }, { "cityName": "南宁", "cityCode": "591" }, { "cityName": "南平", "cityCode": "387" }, { "cityName": "南通", "cityCode": "358" }, { "cityName": "南阳", "cityCode": "777" }, { "cityName": "内江", "cityCode": "816" }, { "cityName": "宁波", "cityCode": "370" }, { "cityName": "宁德", "cityCode": "386" }, { "cityName": "怒江", "cityCode": "734" }], 
                "P":[{ "cityName": "攀枝花", "cityCode": "813" }, { "cityName": "盘锦", "cityCode": "921" }, { "cityName": "平顶山", "cityCode": "769" }, { "cityName": "平凉", "cityCode": "872" }, { "cityName": "萍乡", "cityCode": "758" }, { "cityName": "莆田", "cityCode": "385" }, { "cityName": "濮阳", "cityCode": "773" }, { "cityName": "普洱", "cityCode": "869" }], 
                "Q":[{ "cityName": "全国", "cityCode": "100" },{ "cityName": "七台河", "cityCode": "992" }, { "cityName": "齐齐哈尔", "cityCode": "973" }, { "cityName": "黔东南", "cityCode": "786" }, { "cityName": "黔南", "cityCode": "788" }, { "cityName": "黔西南", "cityCode": "852" }, { "cityName": "钦州", "cityCode": "597" }, { "cityName": "秦皇岛", "cityCode": "182" }, { "cityName": "青岛", "cityCode": "166" }, { "cityName": "清远", "cityCode": "535" }, { "cityName": "庆阳", "cityCode": "873" }, { "cityName": "衢州", "cityCode": "468" }, { "cityName": "曲靖", "cityCode": "866" }, { "cityName": "泉州", "cityCode": "480" }], 
                "R":[{ "cityName": "日喀则", "cityCode": "797" }, { "cityName": "日照", "cityCode": "154" }], 
                "S":[{ "cityName": "三门峡", "cityCode": "772" }, { "cityName": "三明", "cityCode": "389" }, { "cityName": "厦门", "cityCode": "390" }, { "cityName": "山南", "cityCode": "798" }, { "cityName": "汕头", "cityCode": "560" }, { "cityName": "汕尾", "cityCode": "525" }, { "cityName": "商洛", "cityCode": "847" }, { "cityName": "商丘", "cityCode": "768" }, { "cityName": "上海", "cityCode": "310" }, { "cityName": "上饶", "cityCode": "757" }, { "cityName": "韶关", "cityCode": "558" }, { "cityName": "邵阳", "cityCode": "792" }, { "cityName": "绍兴", "cityCode": "365" }, { "cityName": "深圳", "cityCode": "540" }, { "cityName": "沈阳", "cityCode": "910" }, { "cityName": "十堰", "cityCode": "721" }, { "cityName": "石河子", "cityCode": "893" }, { "cityName": "石家庄", "cityCode": "188" }, { "cityName": "石嘴山", "cityCode": "884" }, { "cityName": "双鸭山", "cityCode": "994" }, { "cityName": "朔州", "cityCode": "199" }, { "cityName": "四平", "cityCode": "903" }, { "cityName": "松原", "cityCode": "904" }, { "cityName": "苏州", "cityCode": "450" }, { "cityName": "绥化", "cityCode": "989" }, { "cityName": "随州", "cityCode": "723" }, { "cityName": "遂宁", "cityCode": "821" }], 
                "T":[{ "cityName": "塔城", "cityCode": "952" }, { "cityName": "台州", "cityCode": "476" }, { "cityName": "太原", "cityCode": "190" }, { "cityName": "泰安", "cityCode": "172" }, { "cityName": "泰州", "cityCode": "445" }, { "cityName": "唐山", "cityCode": "181" }, { "cityName": "天津", "cityCode": "130" }, { "cityName": "天水", "cityCode": "877" }, { "cityName": "铁岭", "cityCode": "911" }, { "cityName": "通化", "cityCode": "905" }, { "cityName": "通辽市", "cityCode": "109" }, { "cityName": "铜川", "cityCode": "846" }, { "cityName": "铜陵", "cityCode": "308" }, { "cityName": "铜仁", "cityCode": "785" }, { "cityName": "吐鲁番", "cityCode": "894" }],
                "W":[{ "cityName": "威海", "cityCode": "152" }, { "cityName": "潍坊", "cityCode": "155" }, { "cityName": "渭南", "cityCode": "843" }, { "cityName": "温州", "cityCode": "470" }, { "cityName": "文山", "cityCode": "732" }, { "cityName": "乌海市", "cityCode": "106" }, { "cityName": "乌兰察布市", "cityCode": "103" }, { "cityName": "乌鲁木齐", "cityCode": "890" }, { "cityName": "无锡", "cityCode": "330" }, { "cityName": "芜湖", "cityCode": "303" }, { "cityName": "吴忠", "cityCode": "883" }, { "cityName": "梧州", "cityCode": "594" }, { "cityName": "武汉", "cityCode": "710" }, { "cityName": "武威", "cityCode": "874" }], 
                "X":[{ "cityName": "西安", "cityCode": "841" }, { "cityName": "西宁", "cityCode": "700" }, { "cityName": "西双版纳", "cityCode": "736" }, { "cityName": "锡林郭勒盟", "cityCode": "111" }, { "cityName": "咸宁", "cityCode": "719" }, { "cityName": "咸阳", "cityCode": "844" }, { "cityName": "湘潭", "cityCode": "743" }, { "cityName": "湘西", "cityCode": "793" }, { "cityName": "襄阳", "cityCode": "716" }, { "cityName": "孝感", "cityCode": "717" }, { "cityName": "忻州", "cityCode": "198" }, { "cityName": "新乡", "cityCode": "764" }, { "cityName": "新余", "cityCode": "753" }, { "cityName": "信阳", "cityCode": "776" }, { "cityName": "邢台", "cityCode": "185" }, { "cityName": "兴安盟", "cityCode": "113" }, { "cityName": "宿迁", "cityCode": "349" }, { "cityName": "宿州", "cityCode": "313" }, { "cityName": "徐州", "cityCode": "350" }, { "cityName": "许昌", "cityCode": "765" }, { "cityName": "宣城", "cityCode": "311" }], 
                "Y":[{ "cityName": "雅安", "cityCode": "811" }, { "cityName": "烟台", "cityCode": "161" }, { "cityName": "延安", "cityCode": "842" }, { "cityName": "延边", "cityCode": "909" }, { "cityName": "盐城", "cityCode": "348" }, { "cityName": "扬州", "cityCode": "430" }, { "cityName": "阳江", "cityCode": "565" }, { "cityName": "阳泉", "cityCode": "192" }, { "cityName": "伊春", "cityCode": "996" }, { "cityName": "伊犁", "cityCode": "898" }, { "cityName": "宜宾", "cityCode": "817" }, { "cityName": "宜昌", "cityCode": "711" }, { "cityName": "宜春", "cityCode": "756" }, { "cityName": "益阳", "cityCode": "747" }, { "cityName": "银川", "cityCode": "880" }, { "cityName": "鹰潭", "cityCode": "754" }, { "cityName": "营口", "cityCode": "917" }, { "cityName": "永州", "cityCode": "796" }, { "cityName": "榆林", "cityCode": "845" }, { "cityName": "玉林", "cityCode": "595" }, { "cityName": "玉树州", "cityCode": "709" }, { "cityName": "玉溪", "cityCode": "865" }, { "cityName": "岳阳", "cityCode": "745" }, { "cityName": "云浮", "cityCode": "538" }, { "cityName": "运城", "cityCode": "196" }], 
                "Z":[{ "cityName": "枣庄", "cityCode": "157" }, { "cityName": "湛江", "cityCode": "520" }, { "cityName": "张家界", "cityCode": "794" }, { "cityName": "张家口", "cityCode": "184" }, { "cityName": "张掖", "cityCode": "875" }, { "cityName": "漳州", "cityCode": "395" }, { "cityName": "长春", "cityCode": "901" }, { "cityName": "长沙", "cityCode": "741" }, { "cityName": "长治", "cityCode": "195" }, { "cityName": "昭通", "cityCode": "867" }, { "cityName": "肇庆", "cityCode": "536" }, { "cityName": "镇江", "cityCode": "343" }, { "cityName": "郑州", "cityCode": "760" }, { "cityName": "中山", "cityCode": "556" }, { "cityName": "中卫", "cityCode": "886" }, { "cityName": "重庆", "cityCode": "831" }, { "cityName": "舟山", "cityCode": "364" }, { "cityName": "周口", "cityCode": "770" }, { "cityName": "珠海", "cityCode": "620" }, { "cityName": "株洲", "cityCode": "742" }, { "cityName": "驻马店", "cityCode": "771" }, { "cityName": "资阳", "cityCode": "830" }, { "cityName": "淄博", "cityCode": "150" }, { "cityName": "自贡", "cityCode": "818" }, { "cityName": "遵义", "cityCode": "787" }]
            }
            ,selectedNode:"100",
            isShowCitySearch:false,
            findCitylist:[],
            ret:[],
            /*流转详情页数据*/
            flowlist:"",
            pageNumf:"",
            maxPagef:""
        }
    },
    components:{
        'my-page':pagination,
        numberFlow,
    },
    created:function(){
        let vm=this;
        setTimeout(function(){
            let val=vm.$route.params.val,v={};
            v.sys_order_id=val;
            if(val!='null'){
                vm.form.context1=val;
                vm.searchList()
            }
        },300);
    },watch:{
        context5(){
            if(this.context5.length==6){
                this.context5All=true;
            }else{
                this.context5All=false;
            }
        }
    },
    methods:{
        searchList(page){
            let vm=this,data,url;
            let json={
                pageNow:page||1,
                pageSize:10,
                phone:vm.numberSection,
                deviceId:vm.deviceId,
                prestoreMoney:vm.context5,
                cityCode:vm.searchCityCode,
            };
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
            if(vm.form.select==1){
                if(vm.numberSection!=""){
                    if(isNaN(vm.numberSection)||vm.numberSection.length<7){
                        layer.open({
                            content:"请输入正确的号码或号段",
                            skin:"msg",
                            time: 2,
                            msgSkin: "error"
                        });
                        return false;
                    }
                    json.deviceId="";
                }
            }
            if(vm.form.select==2){
                json.phone="";
            }
            vm.off.isLoad=true;
            vm.pageNum=page||1;
            requestGetExclusiveNumberList(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.dataList=data.data.datas;
                vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
                vm.total=data.data.total;
                vm.pageNum=page||1;
                vm.callback=function(v){vm.searchList(v)};     
            }).catch(e=>errorDeal(e))
        },  
        getFlowDetails(v){
            let vm=this,json={
                pageSize:10,
                pageNow:1,
                phoneTitle:v.title
            };
            vm.getFlowlist(json)
        },
        getFlowlist(json,p){
            let vm=this;
            json.pageNow=p||1;
            vm.off.isLoad=true;
            requestGetExclusiveNumberFlow(json,()=>{vm.off.isLoad=false})
            .then((data)=>{
                vm.numberInfo=data.privInfo;
                vm.flowlist=data.data.datas;
                vm.flowTotal=data.data.total;
                vm.pageNumf=p||1;
                vm.maxPagef=Math.ceil(parseInt(data.data.total)/10);
                vm.callbackf=function(p){vm.getFlowlist(json,p)}; 
                vm.off.numberFlow=true;
            }).catch(e=>errorDeal(e))
        },
        filterData(v){
            let vm = this;
            var sKey = vm.searchKey && vm.searchKey.toLowerCase();
            var data =  vm.letterList;vm.ret=[];
            if (sKey) {
                vm.isShowCitySearch=true;
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
            }else{
                vm.isShowCitySearch=false;
            }
        },
        checkCity(v){
            let vm=this;
            vm.searchKey="";
            vm.searchKey=v.cityName;
            vm.searchCityCode=v.cityCode;
        },
        msShow(){
            this.isShowCitySearch=true
        },
        msHide(){
            this.isShowCitySearch=false
        },
        funScrollTop(){
            let ch=this.$parent.$parent.$refs.psec.clientHeight;
            let sh=this.$parent.$parent.$refs.psec.scrollHeight;
            let sch = sh-ch;
            this.$parent.$parent.$refs.psec.scrollTop=sch;
        },
        translateData(v,i){
            return translateData(v,i);
        },
        getDateTime(v){
            return getDateTime(v);
        },
        translateCardType(v){
            //1白卡2成卡3已激活4未激活5预占
            return v==1?'白卡':v==2?"成卡":v==3?'已激活':v==4?'未激活':v==5?'预占':'';
        },BtnCheckAll(){
            if(this.context5All==true){
                this.context5=[100,50,20,10,0,-1]
            }else if(this.context5All==false){
                this.context5=[]
            }
        },
    }
}
</script>
<style>
.form-c.o-no-bgc{padding: .3rem}
.m-total-table table.exclusiveNumberTab tbody tr>td.dealerInfo{padding: 0;text-align: center}
.m-total-table table.exclusiveNumberTab tbody tr>td.dealerInfo table{border: none;}
.m-total-table table.exclusiveNumberTab tbody tr>td  table tr:nth-child(1){border-top: none}
.selectStyle{width: 60%;border-color:#eee;border-radius: 7px;height: .35rem;padding-left: 10px;outline: none}
.underLine{text-decoration: underline;color:#3D6FDC;}
.g-search-menu{position: static}
.m-total-table{background: transparent}
.m-title{text-align: justify;text-align-last: justify}
.f-checkText{display: inline-block;margin-left: 5px;margin-right: 5px;}
.details{text-decoration: underline}
.m-searchCity{position: absolute;background: #fff;border: 1px solid #eee;margin-top: 5px;border-radius: 6px;padding: 10px;overflow-y: auto}
.m-searchCity>span{cursor: pointer;display: inline-block;margin-right:5px;width: 70px;height: 25px;line-height: 25px;overflow: auto}
</style>


<template>
    <!--工号ID-->
    <div class="m-total-table g-list-box" >
        <header class="g-lis-head">
            <a class="m-details-back u-icon-back" style="width:20px;height:20px;" @click="close('workNum')"></a>
            <div class="m-footD-btn">
                <!-- <a v-if="type==2&&list.cardStatus==2" class="f-btn f-btn-warning" @click="integralLog">查看积分</a> -->
            </div>
        </header>
        <div class="g-box">	
            <table class="merchant-total g-list-table" >
                <thead>
                    <tr>
                        <th style="width:70%;">工号基本信息</th>
                        <th style="width:30%;">工号账户信息</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <table class="g-in-table col-l">
                                <tbody>
                                    <tr>
                                        <td><span>卡盟ID：</span>{{ dataList.details.userId }}<i v-if="dataList.details.isMain==1">(主账号)</i></td>
                                        <td><span>最近登录时间：</span>{{ getDateTime(dataList.details.lastLoginTime)[6] }}</td>
                                    </tr>
                                    <tr>
                                        <td><span>用户姓名：</span>{{ dataList.details.userName }}</td>
                                        <td><span>最近操作时间：</span>{{ getDateTime(dataList.details.lastReqeustTime)[6] }}</td>
                                    </tr>
                                    <tr>
                                        <td><span>登录手机号：</span>{{ dataList.details.phone }}</td>
                                        <td><span>所用机型：</span>{{ dataList.details.phoneType }}</td>
                                    </tr>
                                    <tr>
                                        <td><span>所属商户渠道ID：</span>{{ dataList.details.dealerId }}（{{ dataList.details.companyName }}<a  class="details" @click="details(dataList.details.dealerId,1,4)" href="javascript:void(0)">详情</a>）</td>
                                        <td><span>经纬度：</span>{{ dataList.details.longitude }},{{ dataList.details.latitude }}<a href="javascript:void(0)" @click="toMap" class="details m-l">查看地图</a></td>
                                    </tr>
                                    <tr>
                                        <td><span>当前城市：</span>{{ dataList.details.cityName }}</td>
                                        <td><span>支付宝账号：</span>{{ dataList.details.alipayID }}</td>
                                    </tr>
                                    <tr>
                                        <td><span>创建时间：</span>{{ new Date(dataList.details.createTime).toLocaleString() }}</td>
                                        <td><span>微信账号：</span>{{ dataList.details.wxID }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table class="g-in-table col-r">
                                <tbody>
                                    <tr>
                                        <td><span>账户余额：</span>{{ parseFloat(dataList.details.leftFee)/100 }}元</td>
                                    </tr>
                                    <tr>
                                        <td><span>可提现额度：</span>{{ parseFloat(dataList.details.allowExtractFee)/100 }}元</td>
                                    </tr>
                                    <tr>
                                        <td><span>已提现金额：</span>{{ parseFloat(dataList.details.alreadyExtractFee)/100 }}元</td>
                                    </tr>
                                    <tr>
                                        <td><span>可退款额度：</span>{{ parseFloat(dataList.details.allowRefundFee)/100 }}元</td>
                                    </tr>
                                    <tr>
                                        <!-- <td><span>工号已退款金额：</span>{{ parseFloat(dataList.details.alreadyRefundFee)/100 }}元</td> -->
                                        <td><span>已退款金额：</span>--元</td>
                                    </tr>
                                    <tr>
                                        <td><span>赠送金额：</span>{{ parseFloat(dataList.details.giveMoney)/100 }}元（已使用：{{ parseFloat(dataList.details.giveMoneyUsed)/100 }}元）</td>
                                    </tr>
                                </tbody>
                            </table>          
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <section v-if="dataList.details">
            <div class="total-head">第三方支付流水号列表<b>{{dataList.total}}</b>
                <div class="f-btn-group">
                    <button :class="{active:$parent.form.paySource==2}" @click="shiftPaySource(2)">账户充值成功</button>
                    <button :class="{active:$parent.form.paySource==3}" @click="shiftPaySource(3)">开卡失败退款</button>
                    <button :class="{active:$parent.form.paySource==4}" @click="shiftPaySource(4)">代充失败退款</button>
                    <button :class="{active:$parent.form.paySource==1}" @click="shiftPaySource(1)">保证金充值成功</button>
                </div>
                <select class="m-select" @change="shiftPaySource">
                    <option value="2">账户充值成功</option>
                    <option value="3">开卡失败退款</option>
                    <option value="4">代充失败退款</option>
                    <option value="1">保证金充值成功</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>支付时间</th>
                        <th>订单号</th>
                        <th>第三方流水号</th>
                        <th>支付方式</th>
                        <th>金额（元）</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in dataList.list" :key="index">
                        <td>{{ ((dataList.pageNum-1)*10+(index+1)) }}</td>
                        <td>{{ getDateTime(item.createTime)[6] }}</td>
                        <td>{{ item.sysOrderId }}</td>
                        <td>{{ item.transactionId||'无' }}</td>
                        <td>{{ item.payType==1 ? '远特账户支付' : item.payType==2 ? '微信支付' : '支付宝支付' }}</td>
                        <td>{{ parseFloat(item.payMoney)/100 }}</td>
                    </tr>
                </tbody>
            </table>
            <my-page :page="dataList.pageNum" :maxpage="dataList.maxpage" :callback="dataList.callback"></my-page>
        </section>
    </div>
</template>
<script>
import { getDateTime,secondsFormat } from "../config/utils.js";
import pagination from "./page.vue";
export default{
    props:['dataList'],
    data(){
        return{

        };
    },
    created(){
        console.log(this.dataList);
    },
    components:{
        'my-page':pagination,
	},
    methods:{
        close(){
            
        },
        getDateTime:function(v){
         return getDateTime(v)   
        },
        toMap(){
			var w=document.documentElement.clientWidth,url='',vm=this;
			w<640 ? url='http://map.baidu.com/mobile/?latlng='+vm.ajaxData.details.latitude+','+vm.ajaxData.details.longitude+'' : url='http://map.baidu.com/?latlng='+vm.ajaxData.details.latitude+','+vm.ajaxData.details.longitude+'';
			window.open(url);
		},
    }
}
</script>

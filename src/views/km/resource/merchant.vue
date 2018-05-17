<!--**
  *@info 资源查询模块-商户
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<!--
    模块待重构
-->
<style scoped>
/* .g-search-form>.form-c>.row{width:auto} */
/* .m-col-2>.col-l{display: none;} */
/* .m-col-2>.col-r{margin-left: 0;width: 2.5rem;} */
.total-head{position: relative;}
.total-head>span{margin-right: 10px;}
.total-head>span>b{font-weight: bold;}
.total-head>.f-btn-group{position: absolute;width:4rem;left: 50%;margin-left:-2rem;top:50%;margin-top: -0.15rem;}
.total-head>.f-btn-group>button{height:0.3rem;line-height:0.3rem;color:#717171 !important;border-radius: 5px; border-bottom-color:#ccc;-webkit-box-shadow:0 1px 1px rgba(90, 90, 90, 0.1);box-shadow:0 1px 1px rgba(90, 90, 90, 0.1);display:inline-block;padding: 0 3px;font-size:12px;cursor:pointer;background-color:#fff;border:1px solid transparent;border-color:#dadada;}
.total-head>.f-btn-group>button:hover{color:#333333;background-color:#f1f1f1;}
.total-head>.f-btn-group>button.active{color:#717171 !important;background-color:#F9F9F9;border-color:#c6c6c6;box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);}
.total-head>.m-select{display: none;margin-left:0.1rem;}

.merchant-total, .g-in-table, .merchant-total>tbody>tr>td{border:none !important;border-collapse:separate !important;}
.merchant-total th:first-child{border-right:1px solid #dfe6ec;}
.merchant-total tbody tr{border-top: none !important;}
.merchant-total>tbody>tr>td{padding:0 !important;}
.merchant-total{ border:1px solid #dfe6ec !important;}

.o-headTotal-table tr>td, .o-headTotal-table tr>th{border-right:1px solid #dfe6ec;}
.o-headTotal-table tr>td:first-child{background-color: #eef1f6;}
.o-headTotal-table thead th{ height:0.3rem; background-color: #eef1f6;font-weight: normal;}
.o-headTotal-table tbody tr>td{padding: 6px 0;}
.g-in-table{text-align: left !important;}
.g-in-table tr>td:nth-child(2){border-right:1px solid #dfe6ec;border-left:1px solid #dfe6ec;}
.g-in-table td>span{display: inline-block;text-align:right;}
.g-in-table.col-l td>span{width: 1.2rem;}
.g-in-table.col-r td>span{width: 1.6rem;}
.m-no-data{text-align: center;padding:0.1rem 0;}
.o-clr-bd tr:nth-child(even){background: #fff !important;}
@media screen and (max-width: 960px){
.m-col-2>.col-r{width:auto;}
.total-head>.m-select{display: inline-block;}
.total-head>.f-btn-group{display: none;}
.g-in-table td>span{text-align:left;margin-left: 5px;}
	.g-in-table.col-l td>span, .g-in-table.col-r td>span{width:auto;}
}
.g-lis-head {
    height: 45px;
    background-color: #fff;
    width: 100%;
    padding: 0.12rem 0.1rem;
    -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.1);
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 4px;
}
.g-box {
    /*padding-top: 0.2rem;*/
    height:auto;
}
.m-total-table{
    background: none;
}
span.dp{
    display: inline-block;
}
div.border-bottom{
    border-bottom:1px solid rgb(221, 220, 220);
}
.g-search-form>.form-c>.row{
    width:45%;
}
.pdl{
    padding-left:100px;
}
#merchantSearch{
    height: 100%;
    position: relative;
}
</style>
<template>
	<div id="merchantSearch">
		<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
            <div v-if="form.type!=1&&form.type!=2">
                <section class="g-search-form">
                <table class="g-base-table o-headTotal-table">
                    <thead>
                        <tr>
                            <th style="width:1.5rem;font-weight:bold">统计</th>
                            <th>商户</th>
                            <th>工号</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>总数</td>
                            <td>{{totalInfo.merchantTotal}}</td>
                            <td>{{totalInfo.userTotal}}</td>
                        </tr>
                        <tr>
                            <td>激活数</td>
                            <td>{{totalInfo.merchantActiviteNum}}</td>
                            <td>{{totalInfo.userActiviteNum}}</td>
                        </tr>
                        <tr>
                            <td>已申请待激活数(游客)</td>
                            <td>{{totalInfo.merchantActiviteWaitNum}}</td>
                            <td>{{totalInfo.userActiviteWaitNum}}</td>
                        </tr>
                        <tr>
                            <td>已申请未激活数</td>
                            <td>{{totalInfo.merchantActiviteApplyNum}}</td>
                            <td>{{totalInfo.userActiviteApplyNum}}</td>
                        </tr>
                    </tbody>
                </table>
                <!--基础条件-->
                <div class="m-tag"><b></b>条件查询</div>
                <section class="form-c">
                    <div class="border-bottom">
                        <!-- <span class="dp">查询内容：</span> -->
                        <div class="m-form-radio">
                            <label><span ><input @click="changeSearchType" type="radio" value="1" v-model="form.content" checked="checked"><span></span></span><span class="text" :class="{fCBlue:form.content==1}">商户查询</span></label>
                            <label><span ><input @click="changeSearchType" type="radio" value="2" v-model="form.content" checked="checked"><span></span></span><span class="text" :class="{fCBlue:form.content==2}">工号查询</span></label>
                        </div>
                    </div>
                    <div >
                        <div v-if="form.content==1">
                            <div class="m-form-radio">
                                <label><span class="radioYes"><input @click="changeSearchType" type="radio" value="1" v-model="form.searchKind" checked="checked"><span></span></span><span class="text">精确查找：</span></label>                            
                            </div>
                            <div class="m-form-radio">
                                <label><span class="radio"><input @click="changeSearchType"  type="radio" value="1" v-model="form.searchType" checked="checked"><span></span></span><span class="text">商户ID</span></label>
                                <label><span class="radio"><input @click="changeSearchType" type="radio" value="2" v-model="form.searchType" checked="checked"><span></span></span><span class="text">员工手机号码</span></label>
                                <div style="display:inline-block" class="col-r m-input">
                                    <input @focus="inpFocus" @blur="inpBlur" v-model="form.searchContext" maxlength="24" type="tel" :placeholder="form.searchType==1 ? '请输入查询的商户ID':'请输入查询的手机号码'"/>
                                </div>
                            </div>
                        </div>
                        <div v-if="form.content==2">
                            <div class="m-form-radio">
                                <label><span class="radioYes"><input @click="changeSearchType" type="radio" value="1" v-model="form.searchKind" checked="checked"><span></span></span><span class="text">精确查找：</span></label>                            
                            </div>
                            <div class="m-form-radio">
                                <label><span class="radio"><input @click="changeSearchType"  type="radio" value="1" v-model="form.searchType" checked="checked"><span></span></span><span class="text">卡盟ID</span></label>
                                <label><span class="radio"><input @click="changeSearchType" type="radio" value="2" v-model="form.searchType" checked="checked"><span></span></span><span class="text">手机号码</span></label>
                                <div style="display:inline-block" class="col-r m-input">
                                    <input @focus="inpFocus" @blur="inpBlur" v-model="form.searchContext" maxlength="24" type="tel" :placeholder="form.searchType==1 ? '请输入查询的卡盟ID':'请输入查询的手机号码'"/>
                                </div>
                            </div>
                        </div>
                    </div>        
                    <div class="m-form-radio">
                        <label><span class="radioYes"><input @click="changeSearchType" type="radio" value="2" v-model="form.searchKind" checked="checked"><span></span></span><span class="text">组合查找：</span></label>                            
                    </div>
                    <div class="row clr m-col-2">
                        <div class="dp col-l">创建时间：</div>
                        <div class="col-r">
                            <span class="m-time-area"><input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly"></span>
                        </div>
                    </div>
                    <div class="row clr m-col-2"   v-if="form.content==1">
                        <span class="dp" >商户名称：</span>
                        <div style="display:inline-block;width:60%;">
                            <input @focus="inpFocus" @blur="inpBlur" v-model="form.searchDealerName" maxlength="24" type="tel" placeholder="请输入查询的商户名称"/>
                        </div>
                    </div>
                    <div class="row clr m-col-2"   v-if="form.content==2">
                        <span class="dp" >用户名称：</span>
                        <div style="display:inline-block;width:60%;">
                            <input @focus="inpFocus" @blur="inpBlur" v-model="form.searchDealerName" maxlength="24" type="tel" placeholder="请输入查询的用户名称"/>
                        </div>
                    </div>
                    <div class="row pdl" v-if="form.content==1">
                        <span class="dp">激活状态：</span>
                        <div class="m-form-radio">
                            <label><span class="radio"><input type="radio" value="-1" v-model="form.activationState" checked="checked"><span></span></span><span class="text">全部</span></label>
                            <label><span class="radio"><input type="radio" value="0" v-model="form.activationState" checked="checked"><span></span></span><span class="text">已激活</span></label>
                            <label><span class="radio"><input type="radio" value="1" v-model="form.activationState" checked="checked"><span></span></span><span class="text">待激活</span></label>
                            <label><span class="radio"><input type="radio" value="3" v-model="form.activationState" checked="checked"><span></span></span><span class="text">激活审核中</span></label>
                        </div>
                    </div>

                    <div class="row pdl"  v-if="form.content==1">
                        <span class="dp">售卡范围：</span>
                        <div class="m-form-checkbox">
                            <label><span class="checkbox"><input type="checkbox" value="1" v-model="form.businessScope" checked="checked"><span></span></span><span class="text">远特售卡</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="2" v-model="form.businessScope" checked="checked"><span></span></span><span class="text">联通售卡</span></label>
                        </div>
                    </div>
                    <button class="f-btn f-btn-line" @click="searchList(1)">查询</button>
                </section>
            </section>
            <!-- 商户查询结果列表 -->
            <div class="m-total-table" style="margin-top: 0.2rem;" v-if="form.content==1">
                <section v-if="searchResultList.list">
                    <table v-if="searchResultList.list.length">
                        <thead>
                            <tr>
                                <th class="total-head" colspan="11" style="background-color:#fff;text-align:left;padding-left:20px;">
                                    统计结果<b>{{total}}</b><button class="btn_export_excel" v-if="searchResultList.maxpage"  @click="downLoadList">导出excel</button>
                                </th>
                            </tr>
                            <tr>
                                <th>序号</th>
                                <th>创建时间</th>
                                <th>商户ID</th>
                                <th>商户名称</th>
                                <th>商户属性</th>
                                <th>商户类型</th>
                                <th>商户等级</th>
                                <th>激活状态</th>
                                <th>售卡范围</th>
                                <th>签约状态</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in searchResultList.list" :key="index">
                                <td>{{ ((searchResultList.pageNum-1)*10+(index+1)) }}</td>
                                <td>{{ getDateTime(item.create_time)[6] }}</td>
                                <td>{{item.dealer_id}}</td>
                                <td>{{item.company_name||"--"}}</td>
                                <td>
                                    <span>{{item.merchant_type}}</span>
                                    <!-- <span v-if="item.merchant_type==1">企业</span>
                                    <span v-if="item.merchant_type==2">个人</span> -->
                                </td>
                                <td>{{item.user_type_name}}</td>
                                <td>
                                    <span v-if="item.showLevel==1">普通用户</span>
                                    <span v-if="item.showLevel==2">白金用户</span>
                                    <span v-if="item.showLevel==3">vip用户</span>
                                </td>
                                <td>
                                    <span v-if="item.status==0">已激活</span>
                                    <span v-if="item.status==1">待激活</span>
                                    <span v-if="item.status==3">激活审核中</span>
                                </td>
                                <td>
                                    <span v-if="item. merchant_attribute.indexOf('1')>-1">远特</span>
                                    <span v-if="item. merchant_attribute.indexOf('2')>-1">联通</span>     
                                </td>
                                <td>{{item.isSignAgreement}}</td>
                                <td><a :name="item.dealer_id" @click="details(item.dealer_id,form.content,1)" href="javascript:void(0)" class="details">详情</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <my-page :page="searchResultList.pageNum" :maxpage="searchResultList.maxpage" :callback="searchResultList.callback"></my-page>
                </section>
            </div>
            <!-- 工号查询结果列表 -->
            <div class="m-total-table" style="margin-top: 0.2rem;" v-if="form.content==2">
                <section v-if="searchResultList2.list">
                    <table v-if="searchResultList2.list.length">
                        <thead>
                            <tr>
                                <th class="total-head" colspan="8" style="background-color:#fff;text-align:left;padding-left:20px;">
                                    统计结果<b>{{total}}</b><button class="btn_export_excel" v-if="searchResultList2.maxpage"  @click="downLoadList">导出excel</button>
                                </th>
                            </tr>
                            <tr>
                                <th>序号</th>
                                <th>创建时间</th>
                                <th>用户姓名</th>
                                <th>卡盟ID</th>
                                <th>登录手机号码</th>
                                <th>所属商户名称</th>
                                <th>当前城市</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in searchResultList2.list" :key="index">
                                <td>{{ ((searchResultList2.pageNum-1)*10+(index+1)) }}</td>
                                <td>{{ getDateTime(item.create_time)[6]||'--' }}</td>
                                <td>{{item.customerName||'--'}}</td>
                                <td>{{item.userid||"--"}}</td>
                                <td>{{item.phone||'--'}}</td>
                                <td>{{item.company_name||'--'}}</td>
                                <td>{{item.Cityname||'--'}}</td>
                                <td><a :name="item.dealer_id" @click="details(item.phone,2,2)" href="javascript:void(0)" class="details">详情</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <my-page :page="searchResultList2.pageNum" :maxpage="searchResultList2.maxpage" :callback="searchResultList2.callback"></my-page>
                </section>
            </div>
        </div>
		<!--商户ID-->
	  	<div class="m-total-table g-list-box"  v-if="form.type==1&&ajaxData.details&&!off.modifyInfo">
            <header class="g-lis-head">
                <a v-if="searchRoad.length" class="m-details-back u-icon-back" style="width:20px;height:20px;" @click="close('dealerId')"></a>
                <div class="m-footD-btn">
                    <a class="f-btn f-btn-danger" @click="off.modifyInfo=true" v-show="ajaxData.details.status==0">修改商户资料</a>
                </div>
            </header>
            <div class="g-box" >
                <table class="merchant-total g-list-table">
                    <thead>
                        <tr>
                            <th style="width:70%;">商户基本信息</th>
                            <th style="width:30%;">商户账户信息</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <table class="g-in-table col-l">
                                    <tbody>
                                        <tr>
                                            <td><span>网点名称：</span>{{ ajaxData.details.companyName }}</td>
                                            <td><span>有效总次数：</span>{{ ajaxData.details.totalNums }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>渠道ID：</span>{{ ajaxData.details.dealerId }}
                                                <b v-if="ajaxData.details.status==0" class="f-c-green">已激活</b>
                                                <b v-if="ajaxData.details.status==1" class="f-c-yellow">待激活</b>
                                                <b v-if="ajaxData.details.status==2" class="f-c-blue">激活待审核</b>
                                            </td>
                                            <td><span>开卡成功次数：</span>{{ ajaxData.details.successNums }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>证件地址：</span>{{ ajaxData.details.address }}</td>
                                            <td><span>额外成功次数：</span>{{ ajaxData.details.extraFrequency }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>门店地址：</span>{{ ajaxData.details.storeAddress||'--' }}</td>
                                            <td><span>获得分数：</span>{{ ajaxData.details.getPoints }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>创建时间：</span>{{ ajaxData.details.createtime }}</td>
                                            <td><span>扣除分数：</span>{{ ajaxData.details.losePoints }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>商户属性：</span>{{ ajaxData.details.merchantType }}</td>
                                            <td><span>额外分值：</span>{{ ajaxData.details.extraCredit }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>商户类别：</span>{{ ajaxData.details.userType }}</td>
                                            <td><span>信用积分：</span>{{ ajaxData.details.creditNums }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>证件号码：</span>{{ ajaxData.details.businessLicense }}</td>
                                            <td><span>真实信用积分：</span>{{ ajaxData.details.realCreditNums }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>售卡城市：</span>{{ ajaxData.details.openedCity }}</td>
                                            <td><span>显示等级：</span>{{ ajaxData.details.showLevel }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>售卡范围：</span>
                                                <em v-for="_item in ajaxData.details.openedScopes">
                                                    <em v-show="_item.type==1">远特售卡</em>
                                                    <em v-show="_item.type==2">,联通售卡</em>
                                                    <em v-show="_item.type==3">,移动售卡</em>
                                                    <em v-show="_item.type==4">,电信售卡</em>
                                                </em>
                                                <a href="javascript:;" @click="sellScopePower()" class="details">详情</a>
                                            </td>
                                            <td><span>真实等级：</span>{{ ajaxData.details.realLevel }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>激活订单号：</span>{{ ajaxData.details.registOrderId }}
                                                <b v-show="ajaxData.details.orderStatus==0"></b>
                                                <b v-show="ajaxData.details.orderStatus==1" class="f-c-yellow">通过</b>
                                                <b v-show="ajaxData.details.orderStatus==2" class="f-c-red">拒绝</b>
                                                <b v-show="ajaxData.details.orderStatus==3" class="f-c-red">待分配</b>
                                                <b v-show="ajaxData.details.orderStatus==4" class="f-c-yellow">已分配</b>
                                                <b v-show="ajaxData.details.orderStatus==5" class="f-c-yellow">等待自动审核</b>
                                                <b v-show="ajaxData.details.auditType==0"></b>
                                                <b v-show="ajaxData.details.auditType==1">/实时审核</b>
                                                <b v-show="ajaxData.details.auditType==2">/事后审核</b>
                                                <b v-show="ajaxData.details.auditType==3">/自动审核</b>
                                            </td>
                                            <td><span>基础分值：</span>{{ ajaxData.details.btScore }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>激活时间：</span>{{ ajaxData.details.registTime }}</td>
                                            <td><span>基础总次数：</span>{{ ajaxData.details.btFrequency }}</td>
                                        </tr>
                                        <tr>
                                             <td><span>签约状态：</span>{{ ajaxData.details.isSignAgreement }}[{{ ajaxData.details.signTime }}]</td>
                                             <td><span>基础成功次数：</span>{{ ajaxData.details.bsFrequency }}</td> 
                                        </tr>
                                        <tr>
                                            <td><span>设备信息：</span>
                                                <a :href="'#/homek/resource/device/'+ajaxData.details.devMac" title="点击查看详情" class="details m-l">{{ ajaxData.details.devMac }}</a></td>
                                            <td><span>上级商户：</span>
                                                <a href="javascript:;" v-show="ajaxData.details.superDealerId" @click="details(ajaxData.details.superDealerId,1,'x')"  title="点击查看详情" class="details">{{ajaxData.details.superDealerId}}</a>【名称：{{ ajaxData.details.superDealerName||'--' }}】</td>
                                        </tr>
                                        <tr>
                                            <td><span>欢迎页：</span>{{ ajaxData.details.bannerNames||'--' }}</td>
                                            <td><span>上级推广渠道：</span>
                                                <a :href="'#/homek/resource/promoter/'+ajaxData.details.popDealerId" title="点击查看详情" class="details">{{ajaxData.details.popDealerId}}</a>【名称：{{ ajaxData.details.popDealerName||'--' }}】</td>
                                        </tr>
                                        <tr>
                                            <td><span>证件照片：</span>
                                                <a v-show="ajaxData.details.status==0" href="javascript:;" @click="lookMerchantImg" class="details">查看图片信息</a>
                                                <span v-show="ajaxData.details.status!=0">暂无图片</span>
                                            </td>
                                            <td><span>总部推广渠道：</span>{{ ajaxData.details.topDealerId||'--' }}【名称：{{ ajaxData.details.topDealerName||'--' }}】</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table class="g-in-table col-r o-clr-bd">
                                    <tbody>
                                        <tr>
                                            <td><span>微信提现账户：</span>{{ ajaxData.details.pickMoneyWechat }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>支付宝提现账户：</span>{{ ajaxData.details.pickMoneyAlipay }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>话分佣金历史总金额：</span>{{ parseFloat(ajaxData.details.incomeMoneyTotal)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>话分佣金余额：</span>{{ parseFloat(ajaxData.details.incomeMoney)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>开卡佣金历史总金额：</span>{{ parseFloat(ajaxData.details.commissionFeeTotal)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>开卡佣金余额：</span>{{ parseFloat(ajaxData.details.commissionFee)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>综合激励历史总金额：</span>{{ parseFloat(ajaxData.details.creditMoneyTotal)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>综合激励余额：</span>{{ parseFloat(ajaxData.details.creditMoney)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>自推广激励历史总金额：</span>{{ parseFloat(ajaxData.details.promotionTotal)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>自推广激励余额：</span>{{ parseFloat(ajaxData.details.promotion)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>保证金：</span>{{ parseFloat(ajaxData.details.bond)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>号码模式：</span>{{ajaxData.details.phoneModel}}【{{ajaxData.details.dealer_model_describe||'--'}}】
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span>折扣模式：</span>{{ajaxData.details.discountModel}}【{{ajaxData.details.discount_model_describe||'--'}}】
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span>转账模式：</span>{{ajaxData.details.transferModel}}【{{ajaxData.details.model_code_describe||'--'}}】
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>	
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <section v-if="ajaxData.details&&!off.modifyInfo" class="m-total-table">
                <div class="total-head">商户下所有工号列表</div>
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>工号ID</th>
                            <th>工号姓名</th>
                            <th>登录手机号码</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in ajaxData.list" :key="index">
                            <td>{{ ((ajaxData.pageNum-1)*10+(index+1)) }}</td>
                            <td>{{ item.userId }}<span v-if="item.isMain==1">(主账号)</span></td>
                            <td>{{ item.userName }}</td>
                            <td>{{ item.phone }}</td>
                            <td><a @click="details(item.phone,2,3)" class="details" href="javascript:void(0)">详情</a></td>
                        </tr>
                    </tbody>
                </table>
                <div class="m-no-data" v-if="!ajaxData.list.length">该商户暂无工号列表数据</div>
            </section>
        </div>
		<!--工号ID-->
        <div class="m-total-table g-list-box"  v-if="form.type==2&&ajaxData2.details">
            <header class="g-lis-head">
                <a v-if="searchRoad.length" class="m-details-back u-icon-back" style="width:20px;height:20px;" @click="close('workNum')"></a>
                <div class="m-footD-btn">
                </div>
            </header>
            <div class="g-box" >	
                <table class="merchant-total g-list-table">
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
                                            <td><span>卡盟ID：</span>{{ ajaxData2.details.userId }}<i v-if="ajaxData2.details.isMain==1">(主账号)</i></td>
                                            <td><span>最近登录时间：</span>{{ getDateTime(ajaxData2.details.lastLoginTime)[6] }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>用户姓名：</span>{{ ajaxData2.details.userName }}</td>
                                            <td><span>最近操作时间：</span>{{ getDateTime(ajaxData2.details.lastReqeustTime)[6] }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>登录手机号：</span>{{ ajaxData2.details.phone }}</td>
                                            <td><span>所用机型：</span>{{ ajaxData2.details.phoneType }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>所属商户渠道ID：</span>{{ ajaxData2.details.dealerId }}（{{ ajaxData2.details.companyName }}<a  class="details" @click="details(ajaxData2.details.dealerId,1,4)" href="javascript:void(0)">详情</a>）</td>
                                            <td><span>经纬度：</span>{{ ajaxData2.details.latitude}},{{ ajaxData2.details.longitude}}<a href="javascript:void(0)" @click="toMap" class="details m-l">查看地图</a></td>
                                        </tr>
                                        <tr>
                                            <td><span>当前城市：</span>{{ ajaxData2.details.cityName }}</td>
                                            <td><span>支付宝账号：</span>{{ ajaxData2.details.alipayID }}</td>
                                        </tr>
                                        <tr>
                                            <td><span>创建时间：</span>{{ getDateTime(ajaxData2.details.createTime)[6] }}</td>
                                            <td><span>微信账号：</span>{{ ajaxData2.details.wxID }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table class="g-in-table col-r">
                                    <tbody>
                                        <tr>
                                            <td><span>账户余额：</span>{{ parseFloat(ajaxData2.details.leftFee)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>可提现额度：</span>{{ parseFloat(ajaxData2.details.allowExtractFee)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>已提现金额：</span>{{ parseFloat(ajaxData2.details.alreadyExtractFee)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>可退款额度：</span>{{ parseFloat(ajaxData2.details.allowRefundFee)/100 }}元</td>
                                        </tr>
                                        <tr>
                                            <td><span>已退款金额：</span>--元</td>
                                        </tr>
                                        <tr>
                                            <td><span>赠送金额：</span>{{ parseFloat(ajaxData2.details.giveMoney)/100 }}元（已使用：{{ parseFloat(ajaxData2.details.giveMoneyUsed)/100 }}元）</td>
                                        </tr>
                                    </tbody>
                                </table>          
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <section v-if="ajaxData2.details"class="m-total-table">
                <div class="total-head">第三方支付流水号列表<b>{{ajaxData2.total}}</b>
                    <div class="f-btn-group">
                        <button :class="{active:form.paySource==2}" @click="shiftPaySource(2)">账户充值成功</button>
                        <button :class="{active:form.paySource==3}" @click="shiftPaySource(3)">开卡失败退款</button>
                        <button :class="{active:form.paySource==4}" @click="shiftPaySource(4)">代充失败退款</button>
                        <button :class="{active:form.paySource==1}" @click="shiftPaySource(1)">保证金充值成功</button>
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
                        <tr v-for="(item,index) in ajaxData2.list" :key="index">
                            <td>{{ ((ajaxData2.pageNum-1)*10+(index+1)) }}</td>
                            <td>{{ getDateTime(item.createTime)[6] }}</td>
                            <td>{{ item.sysOrderId }}</td>
                            <td>{{ item.transactionId||'无' }}</td>
                            <td>{{ item.payType==1 ? '远特账户支付' : item.payType==2 ? '微信支付' : '支付宝支付' }}</td>
                            <td>{{ parseFloat(item.payMoney)/100 }}</td>
                        </tr>
                    </tbody>
                </table>
                <my-page :page="ajaxData2.pageNum" :maxpage="ajaxData2.maxpage1" :callback="ajaxData2.callback"></my-page>
            </section>
		</div>
        <!--查看商户照片-->
        <Pop v-if="off.pop" :callBack="closePop">
            <div slot="content" style="height:500px">
                <ImgZoom :imgData="merchantImgData">

                </ImgZoom>
            </div>
        </Pop>
        <!--修改商户信息-->
        <ModifyInfo
            v-if="off.modifyInfo"
            :merchantInfo="ajaxData.details"
            v-on:details="details"
            ref="ModifyInfoCase">

        </ModifyInfo>
  	</div>
</template>
<script>
import {reqCommonMethod,requestGetMerchantList} from "../../../config/service.js";  
import { getDateTime,errorDeal,createDownload,getStore } from "../../../config/utils.js";

import pagination from "../../../componentskm/page.vue";
import Pop from '../../../componentskm/pop';
import ImgZoom from '../../../componentskm/ImgZoom';
import ModifyInfo from '../../../componentskm/more/modifyMerchantInfo';

export default{
	name:'merchantSearch',
	data() {
		return {
            dealerInfo:'',
            downLoadData:'',
            total:0,
            i:0,
            searchRoad:[],
            merchantImgData:[],//商户照片存储
            dataList:'',
            searchResultList:{
                list:'',
                maxpage:0,//最大页数
				pageNum:1,//当前页
				callback:Function,//分页响应函数
            },
            searchResultList2:{
                list:'',
                maxpage:0,//最大页数
				pageNum:1,//当前页
				callback:Function,//分页响应函数
            },
			off:{
                isLoad:!1,//ajax加载控制
                detailskind:'',
                pop:0,//弹出组件开关
                modifyInfo:0//显示修改商户资料开关
			},
			form:{
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
                type:"3",
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
			totalInfo:{//头部数据统计
				merchantTotal: 0,
		        merchantActiviteNum: 0,
		        merchantActiviteWaitNum: 0,
		        merchantActiviteApplyNum: 0,
		        userTotal: 0,
		        userActiviteNum: 0,
		        userActiviteWaitNum: 0,
		        userActiviteApplyNum: 0,
			}
		};
    },
	components:{
        'my-page':pagination,
        Pop,
        ImgZoom,
        ModifyInfo
	},
	created(){
		var vm=this;
		setTimeout(function(){
			vm.getTotal();
			let val=vm.$route.params.val;
			if(val!='null'){
                vm.form.type=1;
				if(val.indexOf('phone')>-1){
					vm.form.type=2;
					val=parseInt(val);
				}
				vm.form.context=val;
				vm.getDetails();
			}
		},300);
        vm.init();
    },
	methods:{
        init:function(){
            var vm=this,
            type=this.$route.params.type;
            type=='pending' ? vm.off.type=1 : type=='processing' ? vm.off.type=2 : type=='finish' ? vm.off.type=3 : void(0);
            vm.form.startTime=laydate.now(0,'YYYY-MM-DD 00:00:00');
            vm.form.endTime=laydate.now(0,'YYYY-MM-DD 23:59:59');
        },
        inpFocus(){
            
        },
        inpBlur(){
            
        },
        closePop(off){
          this.off.pop=off;
        },
        searchList(index,page){
            let vm=this,
            searchData={
                chooseSearch:vm.form.searchKind, //精确查找,组合查找
                getListType:vm.form.content,//商户查询，工号查询
                userName:"",//商户名称
                typeKey:"",//商户id，手机号码
                typeValue:"",//商户id,手机号码的值
                timeStar:"",
                timeEnd:"",
                status:"",
                merchant_attribute:"",
                pageSize:10,
                pageNum:page||1
            }    

            let searchDatajq={
                typeKey:vm.form.searchType,
                typeValue:vm.form.searchContext,                
            }

            let searchDatazh={
                timeStar:new Date(vm.form.startTime.replace(/-/g,'/')).getTime(),
                timeEnd:new Date(vm.form.endTime.replace(/-/g,'/')).getTime(),
                username:vm.form.searchDealerName,//商户名称
            }
            if(vm.form.searchKind=="1"){
                Object.assign(searchData,searchDatajq)
            }else if(vm.form.searchKind=="2"){
                Object.assign(searchData,searchDatazh)               
            }

            if(vm.form.content==1&&vm.form.searchKind=="2"){
                let businessScope=vm.form.businessScope.join(',');
                Object.assign(searchData,{status:vm.form.activationState,merchant_attribute:businessScope}) 
            }
            if(vm.form.searchKind=="1"&&vm.form.searchContext==''){
                layer.open({
		            content:'请输入查询内容',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
            }
            vm.downLoadData=searchData;
            vm.searchRoad.push({'vm.form.type':vm.form.type});
            vm.i=vm.searchRoad.length;    
            requestGetMerchantList(searchData,function(){vm.off.isLoad=false;},)
            .then((data)=>{
                if(data.code==200){
                    vm.total=data.data.total;
                    vm.form.content==1?vm.searchResultList.list=data.data.list:vm.searchResultList2.list=data.data.list;
                    vm.form.content==1?vm.searchResultList.maxpage=Math.ceil(parseInt(data.data.total)/10):vm.searchResultList2.maxpage=Math.ceil(parseInt(data.data.total)/10);
                    vm.form.content==1?vm.searchResultList.pageNum=page||1:vm.searchResultList2.pageNum=page||1;
                    vm.form.content==1?vm.searchResultList.callback=function(v){vm.searchList(index,v)}:vm.searchResultList2.callback=function(v){vm.searchList(index,v)};
                }else{  
                    errorDeal(data);
                }
            }).catch(e=>errorDeal(e));
        },
        downLoadList(){
            let vm=this,
                url="km-ecs/w/merchant/listDownload",
                userInfo = getStore("KA_ECS_USER"),
			    customerId = userInfo.customerId,
			    codeId = userInfo.codeId;
				vm.downLoadData.customerId = customerId;
                vm.downLoadData.codeId = codeId;
            delete vm.downLoadData.pageSize;
            delete vm.downLoadData.pageNum;

            createDownload(url,BASE64.encode(JSON.stringify(vm.downLoadData)),function(){
		        vm.off.isLoad=false;
	      	});
        },
		toMap(){
			var w=document.documentElement.clientWidth,url='',vm=this;
			w<640 ? url='http://map.baidu.com/mobile/?latlng='+vm.ajaxData2.details.latitude+','+vm.ajaxData2.details.longitude+'' : url='http://map.baidu.com/?latlng='+vm.ajaxData2.details.latitude+','+vm.ajaxData2.details.longitude+'';
			window.open(url);
		},
		getTotal(){//获取顶部统计数据
			var vm=this;
            reqCommonMethod({},function(){vm.off.isLoad=false;},"km-ecs/w/merchant/statistics")
            .then((data)=>{
                vm.totalInfo=data.data;
            }).catch(error=>errorDeal(error)); 	
		},
		shiftPaySource(paySource){//支付订单来源切换
			if(paySource.target){
				let options=paySource.target.children;
				for(let i = 0;i<options.length;i++){
					if(options[i].selected){
						this.form.paySource=options[i].value;
					}
				}
			}else{
				this.form.paySource=paySource;
			}
			this.getList();
		},
        details(context,type,i){//商户上用户列表查看用户，用户上查看商户
            let vm=this;
            if(i!=='x'){
                vm.searchRoad.push({'vm.form.type':vm.form.type})
            }
            vm.i=vm.searchRoad.length;           
            vm.off.detailskind=i;
            vm.form.type=type;
            vm.form.context=context;

            vm.getDetails();
		},
		getDetails(isBtn){//获取商户/工号基本信息
			var vm=this,type=vm.form.type,json,url,time=new Date().getTime();
			type==1 ? (json={dealerId:vm.form.context},url='km-ecs/w/merchant/getInfo') : (json={phone:vm.form.context},url='km-ecs/w/user/getInfo');
			if(vm.off.isLoad)return false;
			if(isBtn&&vm.form.time&&(time-vm.form.time<3000)){
				return false;
			}else if(type==1&&!json.dealerId){
				layer.open({
		            content:'请输入商户ID',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}else if(type==2&&!json.phone){
				layer.open({
		            content:'请输入工号ID',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			vm.form.time=time;
			vm.off.isLoad=true;

            reqCommonMethod(json,function(){vm.off.isLoad=false;},url)
            .then((data)=>{
                vm.form.type==1?vm.ajaxData.details=data.data:vm.ajaxData2.details=data.data;
                vm.off.isLoad=false;
                vm.getList();
            }).catch(error=>errorDeal(error)); 	
		},
		getList(page){//获取第三方支付订单列表/获取用户列表
			var vm=this,type=vm.form.type,url,json;
			type==1 ? (json={dealerId:vm.form.context},url='km-ecs/w/audit/getUsersDetail') : (json={phone:vm.form.context,pageNum:page||1,pageSize:10,type:vm.form.paySource},url='km-ecs/w/user/paymengList');
			if(vm.off.isLoad)return false;
			vm.off.isLoad=true;

             reqCommonMethod(json,function(){vm.off.isLoad=false;},url)
             .then((data)=>{
	            type==1?vm.$set(vm.ajaxData,'list',data.data.list):vm.$set(vm.ajaxData2,'list',data.data.list);
                type==1?vm.ajaxData.total=data.data.total||0:vm.ajaxData2.total=data.data.total||0;
				type==1?vm.ajaxData.maxpage1=Math.ceil(parseInt(data.data.list.length)/10):vm.ajaxData2.maxpage1=Math.ceil(parseInt(data.data.list.length)/10);
				type==1?vm.ajaxData.pageNum=page||1:vm.ajaxData2.pageNum=page||1;
                type==1?vm.ajaxData.callback=function(v){vm.getList(v)}:vm.ajaxData2.callback=function(v){vm.getList(v)};
                vm.off.isLoad=false;
                type==1?vm.dealerInfo=vm.ajaxData:vm.dealerInfo=vm.ajaxData2;
             }).catch(error=>errorDeal(error)); 	
		},
		getDateTime:function(e) {
			return getDateTime(e);
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
        replacedian(str){
            var index = str .lastIndexOf("\.");  
            return str.substring(index + 1, str.length);
        },
        sellScopePower(){
            let info=this.ajaxData.details.openedScopes1;
            let str='';
            for(let key in info){
                if(key==1)str+=`<li class="clr"><div class="fl">远特售卡：</div>`;
                if(key==2)str+=`<li class="clr"><div class="fl">联通售卡：</div>`;
                if(key==3)str+=`<li class="clr"><div class="fl">移动售卡：</div>`;
                if(key==4)str+=`<li class="clr"><div class="fl">电信售卡：</div>`;
                info[key].forEach((value)=>{
                    if(value.isLocal==0)str+=`<div class="fright">${value.area!='null'?value.area:''}（不限）</div></li>`;
                    if(value.isLocal==1){
                        // value.cusWhiteList.split(',').forEach((val)=>{
                        //     _str+='，'+info.whiteList[val];
                        // })
                        str+=`<div class="fright">${value.area}（本地${value.cusWhiteDes=='null'?'':value.cusWhiteDes}）</div>`;
                    }
                })
                str+='</li>';
            }
            layer.open({
                content:`<ul class="f-scroll-lt lay-details">${str}</ul>`,
                type:0,
                title:'售卡区域详情',
                btn:0,
                style:'width:auto;'
            });
        },
        close(v){
            let vm=this,
            road=vm.searchRoad;
            vm.i--;
            for(let i in road[vm.i]){
                vm.$set(vm.form,vm.replacedian(i),road[vm.i][i])
            }

            if(vm.i==0){
                vm.searchRoad=[];
            }
        },
        changeSearchType(){
            let vm=this;

            vm.form.searchContext='',
            vm.form.searchDealerName="",
            vm.ajaxData={//ajax响应数据
				details:'',//商户/工号详情
				list:[],//第三方流水号列表/用户列表
                maxpage:0,//最大页数
                maxpage1:0,//第三方支付查询结果页码
				pageNum:1,//当前页
				callback:Function,//分页响应函数
				total:0,//列表总条数
            },
            vm.ajaxData2={//ajax响应数据
				details:'',//商户/工号详情
				list:[],//第三方流水号列表/用户列表
                maxpage:0,//最大页数
                maxpage1:0,//第三方支付查询结果页码
				pageNum:1,//当前页
				callback:Function,//分页响应函数
				total:0,//列表总条数
			};
        },
        lookMerchantImg(){
            const vm=this;

            let imgUrl=_CONFIG ? _CONFIG[_CONFIG.env].REGISTER_MERCHANT_IMAGE_URL : '';
            vm.merchantImgData=[
                {'src':vm.ajaxData.details.frontImageUrl?imgUrl+vm.ajaxData.details.frontImageUrl:'','name':'正面照片'},
                {'src':vm.ajaxData.details.backImageUrl?imgUrl+vm.ajaxData.details.backImageUrl:'','name':'反面照片'},
                {'src':vm.ajaxData.details.handImageUrl?imgUrl+vm.ajaxData.details.handImageUrl:'','name':'手持照片'}
            ]

            vm.closePop(1);
        }
	}
};
</script>
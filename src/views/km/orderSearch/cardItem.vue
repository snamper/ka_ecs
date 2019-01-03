<!--**
  *@info 订单查询模块-开卡订单子模块
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<template>
    <div id="search" :class="{active:off.details}">
        <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
        <section class="m-occlusion" :class="{active:off.isLoad}"></section>
        <!--查询-->
        <section v-if="off.searchlist">
            <div class="g-search-form">
                <section class="m-top-shift f-tas">
                    <div class="box">
                        <label class="item" @click="topShiftClick">
                            <input type="radio" v-model="form.source" value="6">
                            <span class="slider">卡盟小站</span>
                        </label>
                        <label class="item" @click="topShiftClick">
                            <input type="radio" v-model="form.source" value="7">
                            <span class="slider">SDK</span>
                        </label>
                        <label class="item" @click="topShiftClick">
                            <input type="radio" v-model="form.source" value="8">
                            <span class="slider">远特i卡</span>
                        </label>
                    </div>
                </section>
                <!-- <div class="m-tag"><b></b>条件查询</div> -->
                <section class="form-c">
                    <!-- 非i卡操作类型查询条件 -->
                    <div class="row" v-if="form.source!=8">
                        <span class="dp">操作类型：</span>
                        <div class="m-form-radio">
                            <label>
                                <span class="radio"><input value="6" type="radio" v-model="form.orderType">
                                    <span></span>
                                </span>
                                <span class="text">开空卡</span>
                            </label>
                            <label v-show="form.source==6">
                                <span class="radio"><input value="9" type="radio" v-model="form.orderType">
                                    <span></span>
                                </span>
                                <span class="text">开白卡</span>
                            </label>
                            <label v-show="form.source==6">
                                <span class="radio"><input value="10" type="radio" v-model="form.orderType">
                                    <span></span>
                                </span>
                                <span class="text">开成卡</span>
                            </label>
                            <label v-show="form.source==6&&(off.type==2||off.type==1)">
                                <span class="radio"><input value="7" type="radio" v-model="form.orderType">
                                    <span></span>
                                </span>
                                <span class="text">过户办理</span>
                            </label>
                            <label v-show="form.source==6&&(off.type==2||off.type==1)">
                                <span class="radio"><input value="4" type="radio" v-model="form.orderType">
                                    <span></span>
                                </span>
                                <span class="text">实名补登</span>
                            </label>
                            <label v-show="form.source==6">
                                <span class="radio"><input value="8" type="radio" v-model="form.orderType">
                                    <span></span>
                                </span>
                                <span class="text">补换卡</span>
                            </label>
                        </div>
                    </div>
                    <!-- i卡操作类型查询条件 -->
                    <div class="row" v-if="form.source==8">
                        <span class="dp">操作类型：</span>
                        <div class="m-form-radio">
                            <label>
                                <span class="radio"><input value="6" type="radio" v-model="form.orderType">
                                    <span></span>
                                </span>
                                <span class="text">开空卡</span>
                            </label>
                            <label>
                                <span class="radio"><input value="5" type="radio" v-model="form.orderType">
                                    <span></span>
                                </span>
                                <span class="text">开白卡</span>
                            </label>
                            <label>
                                <span class="radio"><input value="4" type="radio" v-model="form.orderType">
                                    <span></span>
                                </span>
                                <span class="text">开成卡</span>
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <span class="dp">
                            <i class="m-one-font"></i>运营商：</span>
                        <div class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="0" v-model="form.cardType">
                                    <span></span>
                                </span>
                                <span class="text">全部</span>
                            </label>
                            <label>
                                <span class="radio"><input type="radio" value="1" v-model="form.cardType">
                                    <span></span>
                                </span>
                                <span class="text">远特</span>
                            </label>
                            <label v-show="form.source!=8&&form.orderType!=4&&form.source!=7">
                                <span class="radio"><input type="radio" value="2" v-model="form.cardType">
                                    <span></span>
                                </span>
                                <span class="text">联通</span>
                            </label>
                        </div>
                    </div>
                    <div class="row" v-if="off.type==2">
                        <span class="dp">订单状态：</span>
                        <div class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="0" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">全部</span>
                            </label>
                            <label>
                                <span class="radio"><input type="radio" value="1" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">同意</span>
                            </label>
                            <label>
                                <span class="radio"><input type="radio" value="2" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">拒绝</span>
                            </label>
                        </div>
                    </div>
                    <div class="row" v-if="off.type==1&&form.source!=7||off.type==2&&form.source!=7">
                        <span class="dp">审核方式：</span>
                        <div class="m-form-radio">
                            <label> <span class="radio"><input type="radio" value="9" v-model="form.auditType"> <span></span> </span> <span class="text">全部</span> </label>
                            <label> <span class="radio"><input type="radio" value="0" v-model="form.auditType"> <span></span> </span> <span class="text">实时审核</span> </label>
                            <label> <span class="radio"><input type="radio" value="1" v-model="form.auditType"> <span></span> </span> <span class="text">事后审核</span> </label>
                            <label> <span class="radio"><input type="radio" value="2" v-model="form.auditType"> <span></span> </span> <span class="text">自动审核</span> </label>
                        </div>
                    </div>
                    <div class="line" v-if="form.source==6">
                        <span class="dp">开卡方式：</span>
                        <div class="m-form-checkbox">
                            <label><span class="checkbox"><input type="checkbox" value="true" v-model="checkAllopencardType" checked="checked" @change="BtnCheckAllopencardType"><span></span></span><span class="text">全部</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="1" v-model="form.sourceFrom" checked="checked"><span></span></span><span class="text">卡盟</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="6" v-model="form.sourceFrom" checked="checked"><span></span></span><span class="text">远微商城</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="7" v-model="form.sourceFrom" checked="checked"><span></span></span><span class="text">信时空公众号</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="8" v-model="form.sourceFrom" checked="checked"><span></span></span><span class="text">开卡盟成卡</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="9" v-model="form.sourceFrom" checked="checked"><span></span></span><span class="text">新零售</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="10" v-model="form.sourceFrom" checked="checked"><span></span></span><span class="text">小程序</span></label>
                        </div>
                    </div>
                    <div class="row" v-if="form.source==8">
                        <span class="dp">开卡方式：</span>
                        <div class="m-form-checkbox">
                            <label><span class="checkbox"><input type="checkbox" value="1" v-model="form.deviceType" checked="checked"><span></span></span><span class="text">远特i卡</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="2" v-model="form.deviceType" checked="checked"><span></span></span><span class="text">远特eSIM</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="4" v-model="form.deviceType" checked="checked"><span></span></span><span class="text">eSIM助手</span></label>
                            <label><span class="checkbox"><input type="checkbox" value="5" v-model="form.deviceType" checked="checked"><span></span></span><span class="text">国星卡</span></label>
                        </div>
                    </div>
                    <div class="row" v-if="form.source==6&&form.orderType==10">
                        <span class="dp">制卡商户：</span>
                        <div class="m-form-radio">
                            <label><span class="radio"><input type="radio" value="0" v-model="form.merchants" checked="checked"><span></span></span><span
                            class="text">全部</span></label>
                            <label><span class="radio"><input type="radio" value="1" v-model="form.merchants" checked="checked"><span></span></span><span
                            class="text">卡盟</span></label>
                            <label><span class="radio"><input type="radio" value="9" v-model="form.merchants" checked="checked"><span></span></span><span
                            class="text">新零售</span></label>
                        </div>
                    </div>
                    <div class="row" v-if="form.source==8&&form.orderType==4">
                        <span class="dp">制卡商户：</span>
                        <div class="m-form-radio">
                            <label><span class="radio"><input type="radio" value="0" v-model="form.merchants" checked="checked"><span></span></span><span
                            class="text">全部</span></label>
                            <label><span class="radio"><input type="radio" value="1" v-model="form.merchants" checked="checked"><span></span></span><span
                            class="text">卡盟</span></label>
                            <label><span class="radio"><input type="radio" value="9" v-model="form.merchants" checked="checked"><span></span></span><span
                            class="text">新零售</span></label>
                        </div>
                    </div>
                    <div class="row">
                        <span class="dp">时间区间：</span>
                        <div class="f-inline-block">
                            <span class="m-time-area">
                                <input @click="to_laydate(1)" v-model="form.startTime" type="text" readonly="readonly"><input @click="to_laydate(2)" v-model="form.endTime" type="text" readonly="readonly">
                            </span>
                        </div>
                    </div>
                </section>
                <section class="form-c o-no-bgc">
                    <div class="row" :class="{active:form.select==1}">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="1" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">订单号码：</span>
                            </label>
                        </span>
                        <div class="input-box"><input v-model="form.context1" :readonly="form.select!=1" maxlength="32" type="tel" placeholder="请输入查询的订单号码"></div>
                    </div>
                    <div class="row" :class="{active:form.select==2}">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="2" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">手机号码：</span>
                            </label>
                        </span>
                        <div class="input-box"><input v-model="form.context2" :readonly="form.select!=2" maxlength="11" type="tel" placeholder="请输入查询的手机号码"></div>
                    </div>
                    <div class="row" :class="{active:form.select==3}" v-if="off.type==1||off.type==2">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="3" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">审核人ID：</span>
                            </label>
                        </span>
                        <div class="input-box"><input v-model="form.context3" :readonly="form.select!=3" maxlength="11" type="tel" placeholder="请输入查询的审核人号码"></div>
                    </div>
                    <div class="row" :class="{active:form.select==4}">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="4" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">证件号码：</span>
                            </label>
                        </span>
                        <div class="input-box"><input v-model="form.context4" :readonly="form.select!=4" maxlength="18" type="text" placeholder="请输入查询的证件号码"></div>
                    </div>
                    <div class="row" :class="{active:form.select==5}" v-show="form.source!=7&&form.source!=8">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="5" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">操作者ID：</span>
                            </label>
                        </span>
                        <div class="input-box"><input v-model="form.context5" :readonly="form.select!=5" type="tel" placeholder="请输入查询的操作者ID"></div>
                    </div>
                    <div class="row" :class="{active:form.select==7}" v-show="form.source!=7&&form.source!=8">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="7" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">用户姓名：</span>
                            </label>
                        </span>
                        <div class="input-box"><input v-model="form.context7" :readonly="form.select!=7" maxlength="12" type="tel" placeholder="请输入查询的开卡证件姓名"></div>
                    </div>
                    <div class="row" :class="{active:form.select==6}" v-if="off.type==1">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="6" :readonly="form.select!=6" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">订单状态：</span>
                            </label>
                        </span>
                        <div class="m-form-radio col-radio" v-show="form.source!=7">
                            <label>
                                <span @click="checked6" class="radio"><input type="radio" checked="checked" value="0" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">全部</span>
                            </label>
                            <label>
                                <span @click="checked6" class="radio"><input type="radio" value="1" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">待分配</span>
                            </label>
                            <label>
                                <span @click="checked6" class="radio"><input type="radio" value="2" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已分配</span>
                            </label>
                        </div>
                        <div class="m-form-radio col-radio" v-show="form.source==7">
                            <label>
                                <span class="radio"><input type="radio" checked="checked" value="0" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">全部</span>
                            </label>
                            <label>
                                <span class="radio"><input type="radio" value="4" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">待分配</span>
                            </label>
                            <label>
                                <span class="radio"><input type="radio" value="5" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已分配</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="row" :class="{active:form.select==6}" v-if="off.type==2">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="6" :readonly="form.select!=6" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">号卡状态：</span>
                            </label>
                        </span>
                        <div class="m-form-radio col-radio">
                            <label>
                                <span @click="checked6" class="radio"><input value="0" type="radio"  v-model="form.context6">
                                    <span></span>
                                </span>
                                <span class="text">全部</span>
                            </label>
                            <label>
                                <span @click="checked6" class="radio"><input value="1" type="radio" v-model="form.context6">
                                    <span></span>
                                </span>
                                <span class="text">成功</span>
                            </label>
                            <label>
                                <span @click="checked6" class="radio"><input value="2" type="radio" v-model="form.context6">
                                    <span></span>
                                </span>
                                <span class="text">失败</span>
                            </label>
                            <label>
                                <span @click="checked6" class="radio"><input value="3" type="radio" v-model="form.context6">
                                    <span></span>
                                </span>
                                <span class="text">处理中</span>
                            </label>
                            <label @click="checked6" v-if="form.orderType!=4">
                                <span class="radio"><input value="4" type="radio" v-model="form.context6">
                                    <span></span>
                                </span>
                                <span class="text">关闭</span>
                            </label>
                        </div>
                    </div>
                    <div class="row" :class="{active:form.select==8}" v-if="form.source==6">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="8" :readonly="form.select!=8" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">号卡类型：</span>
                            </label>
                        </span>
                        <div class="m-form-radio col-radio">
                            <label>
                                <span @click="checked8" class="radio"><input value="-1" type="radio" v-model="form.context8">
                                    <span></span>
                                </span>
                                <span class="text">全部</span>
                            </label>
                            <label>
                                <span @click="checked8" class="radio"><input value="0" type="radio" v-model="form.context8">
                                    <span></span>
                                </span>
                                <span class="text">普通号码</span>
                            </label>
                            <label>
                                <span @click="checked8" class="radio"><input value="1" type="radio" v-model="form.context8">
                                    <span></span>
                                </span>
                                <span class="text">大众专营号</span>
                            </label>
                            <label>
                                <span @click="checked8" class="radio"><input value="2" type="radio" v-model="form.context8">
                                    <span></span>
                                </span>
                                <span class="text">专属专营号</span>
                            </label>
                        </div>
                    </div>
                    <div class="row fullRow" :class="{active:form.select==6}" v-if="off.type==3||off.type==4">
                        <span class="m-form-radio">
                            <label>
                                <span class="radio"><input type="radio" value="6" :readonly="form.select!=6" v-model="form.select">
                                    <span></span>
                                </span>
                                <span class="text">订单状态：</span>
                            </label>
                        </span>
                        <div class="m-form-radio col-radio" v-if="form.orderType!=8">
                            <label>
                                <span @click="checked6" class="radio"><input value="0" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">全部</span>
                            </label>
                            <label>
                                <span @click="checked6" class="radio"><input value="1" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已选号</span>
                            </label>
                            <label>
                                <span @click="checked6" class="radio"><input value="2" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已选套餐</span>
                            </label>
                            <label>
                                <span @click="checked6" class="radio"><input value="3" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已上传资料</span>
                            </label>
                            <label>
                                <span  @click="checked6"  class="radio"><input value="4" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已支付</span>
                            </label>
                            <label>
                                <span  @click="checked6"  class="radio"><input value="6" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已审核，待支付</span>
                            </label>
                            <label>
                                <span @click="checked6"  class="radio"><input value="7" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已获取IMSI</span>
                            </label>
                            <label>
                                <span @click="checked6"  class="radio"><input value="8" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已开卡申请</span>
                            </label>
                        </div>
                        <div class="m-form-radio col-radio" v-if="form.orderType==8">
                            <label>
                                <span class="radio"><input value="0" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">全部</span>
                            </label>
                            <label>
                                <span class="radio"><input value="1001" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已上传资料</span>
                            </label>
                            <label>
                                <span class="radio"><input value="1002" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已审核</span>
                            </label>
                            <label v-show="form.source!=8">
                                <span class="radio"><input value="1004" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已提交受理单</span>
                            </label>
                            <label>
                                <span class="radio"><input value="1005" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已获取IMSI</span>
                            </label>
                            <label>
                                <span class="radio"><input value="1006" type="radio" v-model="form.orderStatus">
                                    <span></span>
                                </span>
                                <span class="text">已申请补换卡</span>
                            </label>
                        </div>
                    </div>
                    <button class="f-btn f-btn-line" @click="searchList()">查询</button>
                </section>
            </div>
            <div class="m-total-table" v-if="list">
                <div class="total-head">统计结果
                    <b>{{total}}</b>
                    <button class="btn_export_excel" v-if="maxpage&&off.type==2" @click="downLoadList">导出excel</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>订单号</th>
                            <th>生成时间</th>
                            <th v-show="off.type==4">关闭时间</th>
                            <th>操作类型</th>
                            <th v-show="form.source==8">开卡方式</th>
                            <th>审核方式</th>
                            <th>用户姓名</th>
                            <th>用户号码</th>
                            <!-- <th>号码等级</th> -->
                            <th>证件号码</th>
                            <th v-show="off.type==1||off.type==2">审核姓名</th>
                            <th v-show="form.source!=7&&form.source!=8">操作人</th>
                            <!-- <th v-show="off.type==1||off.type==2">状态修改时间</th> -->
                            <th v-show="off.type!=2">订单状态</th>
                            <th v-show="off.type==2">审核用时</th>
                            <th v-show="off.type==2">号卡状态</th>
                            <th v-if="isShowDXYZ==true">短信验证</th>
                            <th v-show="off.type==2">审核状态</th>
                            <th>操作</th>
                            <th v-if="off.type==1&&form.source==6"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(todo,index) in list" :key="index">
                            <td>{{((pageNum-1)*10+(index+1))}}</td>
                            <td>{{todo.orderId||'--'}}</td>
                            <td>{{getDateTime(todo.createTime)[6]}}</td>
                            <td v-if="off.type==4">{{getDateTime(todo.modifyTime)[6]}}</td>
                            <td>
                                <span v-if="form.source==8">{{translateData(17,todo.type)}}</span>
                                <span v-if="form.source!=8">{{translateData(1,todo.type)}}</span>
                            </td>
                            <td v-show="form.source==8">{{ translateData(20,todo.deviceType) }}</td>
                            <td>
                                <span v-if="todo.auditType=='0'">实时审核</span>
                                <span v-else-if="todo.auditType==1">事后审核</span>
                                <span v-else-if="todo.auditType==2">自动审核</span>
                                <span v-else>--</span>
                            </td>
                            <td>{{todo.userName||'--'}}</td>
                            <td>{{todo.phoneNumber||'--'}}
                                <div>
                                    <span v-show="todo.phoneHome">（{{ todo.phoneHome||'--' }}）</span>
                                </div>
                            </td>
                            <!-- <td>{{translateData(5,todo.phoneLevel)}}</td> -->
                            <td>{{todo.identityCard||'--'}}</td>
                            <td v-if="off.type==1||off.type==2">{{todo.customerName||'--'}}</td>
                            <td v-if="form.source!=7&&form.source!=8">
                                <span v-if="todo.operator">{{todo.operator||'--'}}</span>
                                <span v-if="todo.operatorId">{{todo.operatorId||'--'}}</span>
                                <br/>
                                <b class="f-m-lighter">（{{todo.operatorName||'--'}}）</b>
                            </td>
                            <td v-if="off.type==2">
                                <span v-if="form.source!=7&&form.source!=8">{{secondsFormat(todo.auditTime)}}</span>
                                <span v-else>{{ secondsFormat(parseInt(todo.modifyTime)/1000-parseInt(todo.createTime)/1000) }}</span>
                            </td>
                            <td v-if="off.type!=2">
                                <span v-if="off.type==1">
                                    <span v-if="form.source==7||form.source==8">
                                        <b v-show="todo.status==4" class="f-c-red">待分配</b>
                                        <b v-show="todo.status==5" class="f-c-green">已分配</b>
                                    </span>
                                    <span v-else>
                                        <b v-show="todo.status==1" class="f-c-red">待分配</b>
                                        <b v-show="todo.status==2" class="f-c-green">已分配</b>
                                    </span>
                                </span>
                                <span v-if="form.orderType!=8">{{translateData(7,todo.statusDetail)}}</span>
                                <span v-if="form.orderType==8">{{translateData(8,todo.statusDetail)}}</span>
                            </td>
                            <td v-if="off.type!=2&&isShowDXYZ==true">
                                {{translateData(16,todo.safeType)}}
                            </td>
                            <td v-if="off.type!=2">
                                <a :name="todo.orderId" @click="details" href="javascript:void(0)" class="details">详情</a>
                            </td>
                            <!--已审核-->
                            <td v-if="off.type==2" :class="{fCYellow:todo.cardStatus==1,fCGreen:todo.cardStatus==2,fCRed:todo.cardStatus==3,fCRed:todo.cardStatus==4,fCGrey:todo.cardStatus==9}">{{translateData(4,todo.cardStatus)}}</td>
                            <td v-if="off.type==2&&isShowDXYZ==true">
                                {{translateData(16,todo.safeType)}} <span v-if="todo.safeType">（{{todo.safePhone||'--'}}）</span>
                            </td>
                            <td colspan="2" v-if="off.type==2&&todo.status==1" class="td-col-2">
                                <div class="f-c-green">同意</div>
                                <div>
                                    <a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">详情</a>
                                </div>
                            </td>
                            <td colspan="2" v-if="off.type==2&&todo.status==2" class="td-col-2">
                                <div class="f-c-red">拒绝</div>
                                <div>
                                    <a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">详情</a>
                                    <span v-if="todo.allowRecheck==2" class="time_out f-c-red">超过复审时间</span>
                                </div>
                            </td>
                            
                            <td colspan="2" v-if="off.type==2&&todo.status==3" class="td-col-2">
                                <div class="f-c-red">超时关闭</div>
                                <div>
                                    <a :name="todo.orderId" :title="index" @click="details" class="details" href="javascript:void(0)">详情</a>
                                </div>
                            </td>
                            <td v-if="off.type==1&&form.source==6"><a v-if="todo.isMe==1" href="javascript:void(0)" @click="auditBtn(todo.type,todo.orderId)">审核</a></td>
                        </tr>
                    </tbody>
                </table>
                <my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
            </div>
        </section>
        <!--详情-->
        <list-details v-if="off.details" :list="detailsData" :source="form.source" :type="off.type" :number="off.number"> </list-details>
        <auditDetails v-if="off.auditDetails"></auditDetails>
    </div>
</template>
<script>
import {
  getDateTime,
  translateData,
  secondsFormat,
  getUnixTime,
  createDownload,
  setStore,
  getStore,
  errorDeal
} from "../../../config/utils.js";
import {
  searchAuditList,
  reAudit,
  reqCommonMethod
} from "../../../config/service.js";
import pagination from "../../../componentskm/page.vue";
import details from "../../../componentskm/cardOrderDetails.vue";
import auditDetails from "../audit/cardItem";
require("../../../assets/km/js/base64.min.js");

export default {
  data() {
    return {
      off: {
        type: 1, //1，待审核;2，已审核;3，进行中;4，已关闭
        isLoad: 0, //加载条
        number: "", //第几条详情
        showData: 0,
        searchlist: true, //订单列表
        details: false, //详情页面
        auditDetails: false //审核订单分配
      },
      form: {
        source: "6", //订单来源，6、卡盟APP；7、卡盟SDK；8远特i卡
        orderType: 6, //6 开空卡 9 开白卡 10 开成卡 7 过户 4 实名补录 8 补换卡
        cardType: 0, //运营商
        orderStatus: 0, //订单状态
        operatorType: 1, //操作类型
        sourceFrom: [1, 6, 7, 8, 9, 10], //开卡方式
        deviceType: [1, 2, 4, 5], //远特i卡，开卡方式：1，远特i卡；2，远特eSIM；4，eSIM助手；5，国星卡
        merchants: 0, //商户类型
        auditType: 9, //审核方式
        context1: "", //订单号码
        context2: "", //手机号码
        context3: "", //审核人ID
        context4: "", //身份证号
        context5: "", // 操作者ID
        context6: 0, //号卡状态
        context7: "", //开卡者姓名
        context8: -1, //号卡类型
        startTime: "",
        select: 6, //条件查询 1 订单号码2 手机号码 3 审核人ID 4 身份证号 5 操作者ID 6 订单状态7 用户姓名 8 号卡类型
        endTime: ""
      },
      options: [1, 2],
      checkAllopencardType: true,
      checkAllmerchants: true,
      list: "", //查询数据
      detailsData: "", //详情数据
      total: 0, //总查询条数
      pageNum: 1, //当前页数
      pageSize: 10, //显示条数
      maxpage: 1, //最大页数
      callback: Function, //page组件点击回调
      isShowDXYZ: false,
      requestlistData: "",
      requestlistUrl: ""
    };
  },
  components: {
    "my-page": pagination,
    "list-details": details,
    auditDetails
  },
  watch: {
    context8() {
      this.form.select = 8;
    },
    context6() {
      this.form.select = 6;
    },
    "form.select"(nv, ov) {
      if (this.form.select != 6) {
        this.form.context6 = "0";
        this.form.orderStatus = "0";
      }
      if (this.form.select != 8) {
        this.form.context8 = "-1";
      }
    },
    "form.sourceFrom"() {
      if (this.form.sourceFrom.length == 6) {
        this.checkAllopencardType = true;
      } else {
        this.checkAllopencardType = false;
      }
    },
    "form.merchants"() {
      if (this.form.merchants.length == 2) {
        this.checkAllmerchants = true;
      } else {
        this.checkAllmerchants = false;
      }
    }
  },
  created: function() {
    this.init();
  },
  methods: {
    init: function() {
      var vm = this,
        type = this.$route.params.type;
      type == "auditing"
        ? (vm.off.type = 1)
        : type == "audited"
          ? (vm.off.type = 2)
          : type == "closed"
            ? (vm.off.type = 4)
            : (vm.off.type = 3);
      vm.form.startTime = laydate.now(0, "YYYY-MM-DD 00:00:00");
      vm.form.endTime = laydate.now(0, "YYYY-MM-DD 23:59:59");
      let id = this.$route.params.id;
      let deviceType = this.$route.params.deviceType;
      if (deviceType == 1) {
        vm.form.source = 6;
      } else if (deviceType == 2) {
        vm.form.source = 8;
      } else if (deviceType == 3) {
        vm.form.source = 7;
      }
      if (id != "null") {
        vm.form.select = "1";
        vm.form.context1 = id;
        vm.searchList();
        let e = {};
        e.name = id;
        vm.details(e);
      }
    },
    searchList: function(page) {
      var vm = this,
        url,
        json = {
          source: vm.form.source, //订单来源，6、卡盟APP；7、卡盟SDK；8远特i卡
          type: vm.form.orderType, //6 开空卡 9 开白卡 10 开成卡 7 过户 4 实名补录 8 补换卡
          pageSize: vm.pageSize,
          pageNum: page || 1,
          startTime: vm.form.startTime,
          endTime: vm.form.endTime,
          status: vm.form.orderStatus, //订单状态
          auditType: vm.form.auditType, //审核方式
          cardType: vm.form.cardType, //运营商
          periodType: vm.off.type, //1，待审核;2，已审核;3，进行中;4，已关闭
          sourceFrom: vm.form.sourceFrom.join(","), //开卡方式
          makeSource: vm.form.merchants
        };
      vm.isShowDXYZ = false;
      //非卡盟SDK+远特I卡，进行中，已关闭
      if (
        json.source != 7 &&
        json.source != 8 &&
        (vm.off.type == 3 || vm.off.type == 4)
      ) {
        vm.searchClosedAndDoing(page);
        return false;
      }
      if (vm.form.orderType == "10") {
        vm.isShowDXYZ = true;
      }
      let context = vm.form["context" + vm.form.select];
      vm.off.type == 1 &&
        vm.form.select != 6 &&
        ((json.status = 0), (vm.form.orderStatus = 0));
      if (vm.form.select == 1 && !context) {
        layer.open({
          content: "请输入订单号码",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 2 && !context) {
        layer.open({
          content: "请输入手机号码",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 2 && context.length != 11) {
        layer.open({
          content: "手机号码格式错误",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 3 && !context) {
        layer.open({
          content: "请输入审核人ID",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 4 && !context) {
        layer.open({
          content: "请输入证件号码",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 5 && !context) {
        layer.open({
          content: "请输入操作者ID",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 7 && !context) {
        layer.open({
          content: "请输入查询的用户姓名",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      }
      json.context = context;
      json.searchtype = vm.form.select;
      if (vm.form.source == 7) {
        //SDK
        url = "km-ecs/w/handler/query";
        json = vm.getSdkJson(json);
      } else if (vm.form.source == 8) {
        //I卡
        url = "km-ecs/w/handler/query";
        json = vm.getTfJson(json);
      } else {
        if (json.type == 4 || json.type == 8) {
          url = "km-ecs/w/audit/ingList4Reinput";
        } else
          vm.off.type == 1
            ? (url = "km-ecs/w/audit/ingList")
            : (url = "km-ecs/w/audit/edList");
      }
      if (vm.off.isLoad) return false;
      vm.off.isLoad = true;
      vm.requestlistData = json;
      vm.requestlistUrl = url;
      reqCommonMethod(
        json,
        function() {
          vm.off.isLoad = false;
        },
        url
      )
        .then(data => {
          vm.list = data.data.list;
          vm.total = data.data.total;
          vm.maxpage = Math.ceil(parseInt(data.data.total) / vm.pageSize);
          vm.pageNum = page || 1;
          vm.callback = function(v) {
            vm.searchList(v);
          };
          vm.off.isLoad = false;
        })
        .catch(error => errorDeal(error));
    },
    searchClosedAndDoing: function(page) {
      //进行中,已关闭
      var vm = this,
        url,
        json = {
          source: vm.form.source,
          type: vm.form.orderType, //6 开空卡 9 开白卡 10 开成卡 7 过户 4 实名补录 8 补换卡
          pageSize: vm.pageSize,
          pageNum: page || 1,
          startTime: vm.form.startTime,
          endTime: vm.form.endTime,
          status: vm.off.type,
          statusDetail: vm.form.orderStatus,
          cardType: vm.form.cardType,
          sourceFrom: vm.form.sourceFrom.join(",")
        };
      vm.isShowDXYZ = false;
      let context = vm.form["context" + vm.form.select];
      if (vm.form.select == 1 && !context) {
        layer.open({
          content: "请输入订单号码",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 2 && !context) {
        layer.open({
          content: "请输入手机号码",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 2 && context.length != 11) {
        layer.open({
          content: "手机号码格式错误",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 4 && !context) {
        layer.open({
          content: "请输入证件号码",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 5 && !context) {
        layer.open({
          content: "请输入操作者ID",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      }
      if (vm.form.orderType == "10") {
        vm.isShowDXYZ = true;
      }
      json.context = context;
      json.searchtype = vm.form.select;
      if (vm.off.isLoad) return false;
      vm.off.isLoad = true;
      if (
        json.type == 6 ||
        json.type == 9 ||
        json.type == 10 ||
        json.type == 11
      ) {
        //4、实名补录；6、空卡；7、过户办理；8、补换卡
        url = "km-ecs/w/audit/getOrderList";
      } else if (json.type == 8) {
        url = "km-ecs/w/audit/getAdditionOrderList";
        Object.assign(json, { periodType: vm.off.type });
      }
      searchAuditList(
        json,
        function() {
          vm.off.isLoad = false;
        },
        url
      )
        .then(data => {
          if (vm.form.orderType == 6) {
            //空卡
            vm.off.showData = 6;
          } else if (vm.form.orderType == 8) {
            //补换卡
            vm.off.showData = 8;
          }
          vm.list = data.data.list;
          vm.total = data.data.total;
          vm.maxpage = Math.ceil(parseInt(data.data.total) / 10);
          vm.pageNum = page || 1;
          vm.callback = function(v) {
            vm.searchClosedAndDoing(v);
          };
          vm.off.isLoad = false;
        })
        .catch(error => errorDeal(error));
    },
    // 导出查询结果excel
    downLoadList: function(page) {
      var vm = this,
        url,
        json = {
          source: vm.form.source,
          type: vm.form.orderType,
          startTime: vm.form.startTime,
          endTime: vm.form.endTime,
          status: vm.form.orderStatus,
          auditType: vm.form.auditType,
          cardType: vm.form.cardType,
          sourceFrom: vm.form.sourceFrom.join(","),
          periodType: vm.off.type,
          makeSource: vm.form.merchants,
        };
      let context = vm.form["context" + vm.form.select];
      vm.off.type == 1 &&
        vm.form.select != 6 &&
        ((json.status = 0), (vm.form.orderStatus = 0));
      if (vm.form.select == 2 && !context) {
        layer.open({
          content: "请输入手机号码",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 2 && context.length != 11) {
        layer.open({
          content: "手机号码格式错误",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 3 && !context) {
        layer.open({
          content: "请输入审核人ID",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 4 && !context) {
        layer.open({
          content: "请输入证件号码",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      } else if (vm.form.select == 5 && !context) {
        layer.open({
          content: "请输入操作者ID",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      }
      var userInfo = getStore("KA_ECS_USER");
      var customerId = userInfo.customerId;
      var codeId = userInfo.codeId;
      json.customerId = customerId;
      json.codeId = codeId;
      json.context = context;
      json.searchtype = vm.form.select;
      if(vm.form.source==6){
        if (
          vm.form.orderType == 7 ||
          vm.form.orderType == 6 ||
          vm.form.orderType == 9 ||
          vm.form.orderType == 10
        ) {
          //过户，开空卡,成卡，白卡
          url = "km-ecs/w/audit/downloadEdList";
        } else if (
          (vm.form.source == 6 && vm.form.orderType == 4) ||
          (vm.form.source == 6 && vm.form.orderType == 8)
        ) {
          //实名补录，补换卡
          url = "km-ecs/w/audit/downloadReinput";
        } 
      } else if (vm.form.source != 6) {
        url = "km-ecs/w/handler/queryExport";
        if (vm.form.source == 7) {
          json = vm.getSdkJson(json);
        } else if (vm.form.source == 8) {
          json = vm.getTfJson(json);
        }
      }

      createDownload(url, BASE64.encode(JSON.stringify(json)), function() {
        vm.off.isLoad = false;
      });
    },
    getSdkJson(json) {
      //SDK查询采用统一查询接口
      var vm = this,
        type = vm.off.type,
        str,
        resJson = {
          opKey: "",
          params: [],
          pageSize: "10",
          pageNum: json.pageNum,
        };
      var userInfo = getStore("KA_ECS_USER");
      var customerId = userInfo.customerId;
      var codeId = userInfo.codeId;
      if (type == 3 || type == 4) {
        str = "A.device_type=3 AND ";
      } else if (type == 2 || type == 1) {
        str = "B.device_type=3 AND ";
      }
      var sql =
        str +
        "A.create_time BETWEEN " +
        getUnixTime(json.startTime) +
        " AND " +
        getUnixTime(json.endTime) +
        "";
      //   if (json.cardType != 0) {
      //     sql += " AND A.card_type=" + json.cardType;
      //   }
      if (type == 2 || type == 1) {
        //待审核-已审核
        resJson.opKey = "tf.orderAudit.list";
        if (json.status != 0) {
          sql += " AND A.result=" + json.status;
        } else if (json.status == 0) {
          if (type == 2) {
            sql += " AND (A.result=1 OR A.result=2)";
          } else if (type == 1) {
            sql += " AND (A.result=4 OR A.result=5)";
          }
        }

        if (json.context != 0 && json.searchtype != 1) {
          if (json.searchtype == 6) {
            // sql += " AND B.order_status=" + json.context;
            if (json.context == 1) {
              sql += " AND B.order_status=2";
            } else if (json.context == 2) {
              sql += " AND B.order_status=3";
            } else if (json.context == 3) {
              sql += " AND B.order_status=1";
            } else if (json.context == 4) {
              sql += " AND B.order_status=4";
            }
          } else if (vm.form.context6 != 0) {
            sql += " AND B.order_status=" + vm.form.context6;
          }
        }
      } else if (type == 3 || type == 4) {
        resJson.opKey = "tf.orderApp.list";
        if (type == 3) {
          //1，待审核;2，已审核;3，进行中;4，已关闭
          sql += " AND A.order_status=1";
        } else if (type == 4) {
          sql += " AND A.order_status=4";
        }

        if (json.status != 0 && json.searchtype != 1) {
          let code = 0;
          if (json.status == 1) {
            code = 1000; //已选号
          } else if (json.status == 2) {
            code = 1001; //已选套餐
          } else if (json.status == 3) {
            code = 1003; //已上传资料
          } else if (json.status == 4) {
            code = 1004; //已支付
          } else if (json.status == 6) {
            code = 1006; //已开户申请
          } else if (json.status == 7) {
            code = 1007; //已获取IMSI
          } else if (json.status == 8) {
            code = 1008; //已开卡申请
          }
          sql += " AND A.latest_phase=" + code;
        }
      }

      if (json.searchtype == 1) {
        sql += ' AND A.sys_order_id="' + json.context + '"';
      } else if (json.searchtype == 2) {
        sql += ' AND A.phone_number="' + json.context + '"';
      } else if (json.searchtype == 3) {
        sql += ' AND A.customer_id="' + json.context + '"';
      } else if (json.searchtype == 4) {
        sql += ' AND A.papers_code="' + json.context + '"';
      }
      resJson.codeId=codeId;
      resJson.customerId=customerId;
      resJson.params.push(sql);
      return resJson;
    },
    getTfJson(json) {
      //远特i卡查询采用统一查询接口
      var vm = this,
        type = vm.off.type, //1，待审核;2，已审核;3，进行中;4，已关闭
        auditType = vm.form.auditType, //9.全部 0.实时 1.事后 2.自动
        merchantType = vm.form.merchants,
        str,
        resJson = {
          opKey: "",
          params: [],
          pageSize: "10",
          pageNum: json.pageNum
        };
      var userInfo = getStore("KA_ECS_USER");
      var customerId = userInfo.customerId;
      var codeId = userInfo.codeId;
      let deviceType = vm.form.deviceType.join(",") || "1,2,4";
      if (type == 3 || type == 4) {
        str = `A.device_type in (${deviceType}) AND A.biz_type=${
          json.type
        } AND `;
      } else if (type == 2 || type == 1) {
        str = `B.device_type in (${deviceType}) AND B.biz_type=${
          json.type
        } AND `;
      }
      var sql =
        str +
        "A.create_time BETWEEN " +
        getUnixTime(json.startTime) +
        " AND " +
        getUnixTime(json.endTime) +
        "";

      if (type == 2 || type == 1) {
        //待审核-已审核
        resJson.opKey = "tf.orderAudit.list";
        if (json.status != 0) {
          sql += " AND A.result=" + json.status;
        } else if (json.status == 0) {
          //订单状态-全部
          if (type == 2) {
            sql += " AND (A.result=1 OR A.result=2)";
          } else if (type == 1) {
            sql += " AND (A.result=4 OR A.result=5)";
          }
        }

        if (json.context != 0 && json.searchtype != 1) {
          if (json.searchtype == 6) {
            if (json.context == 1) {
              sql += " AND B.order_status=2";
            } else if (json.context == 2) {
              sql += " AND B.order_status=3";
            } else if (json.context == 3) {
              sql += " AND B.order_status=1";
            } else if (json.context == 4) {
              sql += " AND B.order_status=4";
            }
          } else if (vm.form.context6 != 0) {
            //输入值时，添加号卡状态查询条件
            sql += " AND B.order_status=" + vm.form.context6;
          }
        }
      } else if (type == 3 || type == 4) {
        resJson.opKey = "tf.orderApp.list";
        if (type == 3) {
          sql += " AND A.order_status=1";
        } else if (type == 4) {
          sql += " AND A.order_status=4";
        }

        if (json.status != 0 && json.searchtype != 1) {
          let code = 0;
          if (json.status == 1) {
            code = 1000; //已选号
          } else if (json.status == 2) {
            code = 1001; //已选套餐
          } else if (json.status == 3) {
            code = 1003; //已上传资料
          } else if (json.status == 4) {
            code = 1004; //已支付
          } else if (json.status == 6) {
            code = 1006; //已审核，待支付
          } else if (json.status == 7) {
            code = 1007; //已获取IMSI
          } else if (json.status == 8) {
            code = 1008; //已开卡申请
          }
          sql += " AND A.latest_phase=" + code;
        }
      }
      if (auditType != 9) {
        sql += " AND A.audit_type= " + auditType;
      }
      if (json.searchtype == 1) {
        sql += ' AND A.sys_order_id="' + json.context + '"';
      } else if (json.searchtype == 2) {
        sql += ' AND A.phone_number="' + json.context + '"';
      } else if (json.searchtype == 3) {
        sql += ' AND A.customer_id="' + json.context + '"';
      } else if (json.searchtype == 4) {
        sql += ' AND A.papers_code="' + json.context + '"';
      }
      if (merchantType != 0) {
        sql +=
          " AND (select app_type from tb_adultcard_order where sys_order_id=B.sys_activation_order_id limit 1)=" +
          merchantType +
          "";
      }
      resJson.codeId=codeId;
      resJson.customerId=customerId;
      resJson.params.push(sql);
      return resJson;
    },
    agree: function(e) {
      var vm = this,
        url,
        orderId = e.target.name,
        number = e.target.title;
      reAudit({ orderId: orderId }, "km-ecs/w/audit/reAudit")
        .then(data => {
          layer.open({
            content: "复审成功",
            skin: "msg",
            time: 4,
            msgSkin: "success"
          });
          vm.list[number].status = 4;
          vm.list[number].cardStatus = 1;
          vm.off.isLoad = false;
        })
        .catch(error => errorDeal(error));
    },
    details: function(e) {
      //详情
      var vm = this,
        url,
        orderId,
        type = vm.off.type,
        str,
        json = {};
      if (e.hasOwnProperty("name")) {
        orderId = e.name;
        vm.off.number = e.title;
      } else {
        orderId = e.target.name;
        vm.off.number = e.target.title;
      }
      let sql = 'A.sys_order_id="' + orderId + '"';
      json = { orderId: orderId, status: type };
      if (vm.form.source == 7) {
        //SDK
        url = "km-ecs/w/handler/query";
        if (type == 1 || type == 2) {
          json.opKey = "tf.orderAudit.details";
          if (type == 2) {
            sql += " AND (A.result=1 OR A.result=2)";
          } else if (type == 1) {
            sql += " AND (A.result=4 OR A.result=5)";
          }
        } else if (type == 3 || type == 4) {
          json.opKey = "tf.orderApp.details";
          if (type == 3) {
          } else if (type == 4) {
            sql += " AND A.order_status=4";
          }
        }
        json.params = [sql];
        json.pageSize = "10";
        json.pageNum = "-1";
      } else if (vm.form.source == 8) {
        //远特i卡
        url = "km-ecs/w/handler/query";
        if (type == 1 || type == 2) {
          json.opKey = "tf.orderAudit.details";
          if (type == 2) {
            sql += " AND (A.result=1 OR A.result=2)";
          } else if (type == 1) {
            sql += " AND (A.result=4 OR A.result=5)";
          }
        } else if (type == 3 || type == 4) {
          json.opKey = "tf.orderApp.details";
          if (type == 3) {
            sql += " AND A.order_status=1";
          } else if (type == 4) {
            sql += " AND A.order_status=4";
          }
        }
        json.params = [sql];
        json.pageSize = "10";
        json.pageNum = "-1";
      } else {
        //卡盟App
        if (type == 1) {
          //待审核
          url = "km-ecs/w/audit/ingInfo";
          if (vm.form.orderType == 4 || vm.form.orderType == 8)
            url = "km-ecs/w/audit/getReinputInfo";
          vm.form.orderType == 4 ? (json.type = "1") : (json.type = "2");
        } else if (type == 2) {
          //已审核
          url = "km-ecs/w/audit/edInfo";
          if (vm.form.orderType == 4 || vm.form.orderType == 8)
            url = "km-ecs/w/audit/getReinputInfo";
          vm.form.orderType == 4 ? (json.type = "1") : (json.type = "2");
        } else {
          url = "km-ecs/w/audit/getOrderInfo";
          if (vm.form.orderType == 4 || vm.form.orderType == 8)
            url = "km-ecs/w/audit/getReinputInfo";
          vm.form.orderType == 4 ? (json.type = "1") : (json.type = "2");
        }
      }
      // if (vm.off.isLoad) return false;
      vm.off.isLoad = true;
      reqCommonMethod(
        json,
        function() {
          vm.off.isLoad = false;
        },
        url
      )
        .then(data => {
          if (vm.form.source == 7 || vm.form.source == 8) {
            vm.detailsData = data.data.list[0];
          } else {
            vm.detailsData = data.data;
          }
          vm.off.details = true;
          vm.off.searchlist = false;
          vm.off.isLoad = false;
          vm.off.examine = true;
        })
        .catch(error => errorDeal(error));
    },
    auditBtn(type, orderId) {
      var vm = this;
      vm.cardT = type;
      vm.orderId = orderId;
      vm.off.detailsList = 1;
      vm.off.details = false;
      vm.off.searchlist = false;
      vm.off.auditDetails = true;
    },
    to_laydate: function(v) {
      var vm = this;
      laydate({
        istime: true,
        format: "YYYY-MM-DD hh:mm:ss",
        isclear: false,
        choose: function(dates) {
          //选择好日期的回调
          v == 1 ? (vm.form.startTime = dates) : (vm.form.endTime = dates);
        }
      });
    },
    topShiftClick() {
      var vm = this;
      vm.list = "";
      vm.form = Object.assign(vm.form, {
        orderType: 6,
        cardType: 0,
        orderStatus: 0,
        auditType: 9,
        context1: "",
        context2: "",
        context3: "",
        context4: "",
        context5: "",
        context6: 0,
        select: 6
      });
    },
    checked6() {
      this.form.select = 6;
    },
    checked8() {
      this.form.select = 8;
    },
    getUnixTime(v) {
      return getUnixTime(v);
    },
    getDateTime(v) {
      return getDateTime(v);
    },
    translateData(type, v) {
      return translateData(type, v);
    },
    secondsFormat(v) {
      return secondsFormat(v);
    },
    BtnCheckAllopencardType() {
      if (this.checkAllopencardType == true) {
        this.form.sourceFrom = [1, 6, 7, 8, 9, 10];
      } else {
        this.form.sourceFrom = [];
      }
    },
    BtnCheckAllMerchants() {
      if (this.checkAllmerchants == true) {
        this.form.merchants = [1, 2];
      } else {
        this.form.merchants = [];
      }
    }
  }
};
</script>
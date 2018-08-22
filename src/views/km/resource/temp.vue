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
                                    <a :href="'#/homek/orderSearch/makeCard/'+dataList.makeCardId" class="details">{{dataList.makeCardId||'--'}}</a>
                                    <!-- <a v-if="dataList.makeCardId==0&&dataList.makeCardId=='--'">{{dataList.makeCardId||'--'}}</a> -->
                                </td>
                                <td>
                                    <a :href="'#/homek/resource/merchant/'+dataList.makeDealer" class="details">{{dataList.makeDealerName||'--'}}({{dataList.makeDealer||'--'}})</a>
                                    <!-- <a v-if="dataList.makeDealer=='--'">{{dataList.makeDealerName||'--'}}({{dataList.makeDealer||'--'}})</a> -->
                                </td>
                                <td>
                                    <a :href="'#/homek/orderSearch/card/audited/'+dataList.openCardId" class="details">{{dataList.openCardId||'--'}}</a>
                                    <!-- <a v-if="dataList.makeDealer=='--'">{{dataList.openCardId||'--'}}</a> -->
                                </td>
                                <td>
                                    <a :href="'#/homek/resource/merchant/'+dataList.openDealer" class="details">{{dataList.openDealerName||'--'}}({{dataList.openDealer||'--'}})</a>
                                    <!-- <a v-if="dataList.openDealer=='--'">{{dataList.openDealerName||'--'}}({{dataList.openDealer||'--'}})</a> -->
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
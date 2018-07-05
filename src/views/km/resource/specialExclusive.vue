<style scoped>
.form-c.o-no-bgc{padding: .3rem .1rem;}
p.detailsEleP{margin-bottom: 10px;}
.numberInfo{width:98%;background-color:#fff;padding:12px 8px;border-radius:6px}
.numberInfo>b{padding-right: 20px;}
</style>
<template>
    <section>
        <div class="g-search-menu" id="search">
            <header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
            <div class="g-search-form">
                <div class="m-tag"><b></b>精确查询</div>
                <section class="form-c">
                    <div class="row clr m-col-2">
                        <span class="dp col-l">商户ID：</span>
                        <div class="col-r m-input-button"><input v-model="dealerId" maxlength="32" type="tel" placeholder="请输入查询的商户ID"><button @click="searchList()">查询</button>
                        </div>
                    </div>
                    <div class="row">
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
                                <span class="text">有设备</span>
                            </label>
                            <label>
                                <span class="radio"><input type="radio" value="2" v-model="form.cardType">
                                    <span></span>
                                </span>
                                <span class="text">无设备</span>
                            </label>
                        </div>
                    </div>
                </section>
            </div>
            <!-- 查询结果 -->
            <div v-if="search.list" class="m-total-table">
                <div class="total-head">查询结果
                    <b>{{total}}</b>
                    <button class="btn_export_excel" v-if="maxpage" @click="downLoadList">导出excel</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>专营号段</th>
                            <th>地区</th>
                            <th>预存（元）</th>
                            <th>产品名称</th>
                            <th>已激活（个）</th>
                            <th>成卡（个）</th>
                            <th>未激活（个）</th>
                            <th>白卡（张）</th>
                            <th>设备号</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(todo,index) in search.list">
                            
                        </tr>
                    </tbody>
                </table>
                <my-page :page="pageNow" :maxpage="maxpage" :callback="callback"></my-page>
            </div>
            </div>
        </div>
    </section>
</template>
<script>
import "../../../assets/km/css/search.css";
import { translateData,getDateTime } from '../../../config/utils.js';
export default { 
    data() {
        return{
            off:{
                isLoad:false,
            },
            form:{
                select:"",
                cardType:0,
            },
            search:{
                list:"",
            },
            dealerId:"",
            pageNow:1,
            maxpage:1,
            callback:Function,
        }
    },
    methods:{
        searchList(){

        },
        isChe(){
            this.form.select = "";
        },
        translateData(v,i){
            return translateData(v,i);
        },
        getDateTime(v){
            return getDateTime(v);
        }
    }
}
</script>



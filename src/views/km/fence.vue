<!--**
  *@info 区域管理模块顶层
  *@author: thinkmix
  *@date 2017-11-6
* *-->
<style scoped>
  @import "../../assets/km/css/fence.css";
</style>
<template>
	<div class="f-fullscreen clr">
		<header class="m-scroll-bar animated infinite" :class="{active:off.isLoad}"></header>
        <section class="m-occlusion" :class="{active:off.isLoad}"></section>
		<div id="mapBox" class="fl"></div>
		<div class="m-city-display f-scroll-lt fl">
			<ul class="m-citylist-ul">
				<li v-for="(item,index) in cityList" @click="citySelectClick(index)" :class="{active:off.select==index}">{{ item.name }}</li>
			</ul>
		</div>
		<div class="m-btn-editing">
			<span class="f-btn-warning" @click="editingClick(1)" v-if="off.click==1">编辑区域</span>
			<span class="f-btn-success" @click="editingClick(2)" v-if="off.click==2">编辑完成</span>
			<div class="loading-spinner" v-if="off.isSet"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div>
		</div>
	</div>
</template>
<script>
import { getCityAreaPoint, setCityAreaPoint} from "../../config/service";
import { errorDeal } from '../../config/utils';
export default{
	name:'fance',
	data (){
		return {
			off:{
				select:0,//选中的城市
				isLoad:0,//loading
				click:1,//编辑按钮点击1,编辑；2，编辑完成；
				isSet:0,//是否提交编辑
			},
			cityList:[{"name":"北京","code":"110"},{"name":"长春","code":"901"},{"name":"长沙","code":"741"},{"name":"沧州","code":"180"},{"name":"常州","code":"440"},{"name":"成都","code":"810"},{"name":"重庆","code":"831"},{"name":"大连","code":"940"},{"name":"大庆","code":"981"},{"name":"东莞","code":"580"},{"name":"佛山","code":"530"},{"name":"福州","code":"380"},{"name":"广州","code":"510"},{"name":"贵阳","code":"850"},{"name":"哈尔滨","code":"971"},{"name":"海口","code":"501"},{"name":"杭州","code":"360"},{"name":"合肥","code":"305"},{"name":"呼和浩特","code":"101"},{"name":"湖州","code":"362"},{"name":"惠州","code":"570"},{"name":"济南","code":"170"},{"name":"嘉兴","code":"363"},{"name":"江门","code":"550"},{"name":"金华","code":"367"},{"name":"开封","code":"762"},{"name":"昆明","code":"860"},{"name":"丽水","code":"469"},{"name":"南昌","code":"750"},{"name":"南京","code":"340"},{"name":"南宁","code":"591"},{"name":"南通","code":"358"},{"name":"宁波","code":"370"},{"name":"平顶山","code":"769"},{"name":"青岛","code":"166"},{"name":"衢州","code":"468"},{"name":"泉州","code":"480"},{"name":"汕头","code":"560"},{"name":"上海","code":"310"},{"name":"绍兴","code":"365"},{"name":"深圳","code":"540"},{"name":"沈阳","code":"910"},{"name":"石家庄","code":"188"},{"name":"苏州","code":"450"},{"name":"台州","code":"476"},{"name":"泰州","code":"445"},{"name":"天津","code":"130"},{"name":"潍坊","code":"155"},{"name":"温州","code":"470"},{"name":"乌鲁木齐","code":"890"},{"name":"无锡","code":"330"},{"name":"芜湖","code":"303"},{"name":"武汉","code":"710"},{"name":"西安","code":"841"},{"name":"厦门","code":"390"},{"name":"徐州","code":"350"},{"name":"烟台","code":"161"},{"name":"盐城","code":"348"},{"name":"银川","code":"880"},{"name":"珠海","code":"620"},{"name":"镇江","code":"343"},{"name":"中山","code":"556"},{"name":"舟山","code":"364"},{"name":"郑州","code":"760"}],
			map:'',
			polygon:'',
		}
	},
	created(){
		
	},
	mounted(){
		let vm=this;
		this.citySelectClick(0);
	// 	setTimeout(vm.initMap([
	// 	new BMap.Point(116.387112,39.920977),
	// 	new BMap.Point(116.385243,39.913063),
	// 	new BMap.Point(116.394226,39.917988),
	// 	new BMap.Point(116.401772,39.921364),
	// 	new BMap.Point(116.41248,39.927893)
	// ],[116.404, 39.915]),300)
	},
	methods:{
		initMap(pointList,centerPoint){
			let vm=this;
			// 百度地图API功能
			var map = new BMap.Map("mapBox");
			map.centerAndZoom(new BMap.Point(centerPoint[0], centerPoint[1]), 10);
			map.enableScrollWheelZoom();

			if(pointList[0].lat){
				var polygon = new BMap.Polygon(pointList, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});  //创建多边形
				map.addOverlay(polygon);
				vm.polygon=polygon;
			}else vm.getBoundary(map);
			vm.map=map;
		},
		getBoundary(map){
			let vm=this;
			var bdary = new BMap.Boundary();
			bdary.get(vm.cityList[vm.off.select].name, function(rs){       //获取行政区域
				map.clearOverlays();        //清除地图覆盖物       
				var count = rs.boundaries.length; //行政区域的点有多少个
				if (count === 0) {
					alert('未能获取当前输入行政区域');
					return ;
				}
				let pointList=[];
				rs.boundaries[0].split(';').forEach((value,index)=>{
					let arr=value.split(',');
					pointList[index]=new BMap.Point(arr[0], arr[1]);
				});

				var polygon = new BMap.Polygon(pointList, {strokeWeight: 2, strokeColor: "#ff0000", strokeOpacity:0.5}); //建立多边形覆盖物
				map.addOverlay(polygon);  //添加覆盖物
				vm.polygon=polygon;

	          	var pointArray = [];
				for (var i = 0; i < count; i++) {
					pointArray = pointArray.concat(polygon.getPath());
				}


				map.setViewport(pointArray);    //调整视野               
			});   
		},
		citySelectClick(index){
			let vm=this;
			vm.off.select=index;
			vm.getCityAreaPointDeal(vm.cityList[index].code);
		},
		getCityAreaPointDeal(code){//处理获取区域结果
			let vm=this;
			vm.off.isLoad=true;
			getCityAreaPoint({cityCode:code},function(){
				vm.off.isLoad=false;
			}).then(res=>{
				if(res.code==200){
					let list=res.data.pointStr.split(',');
					list.forEach((value,index)=>{
						let arr=value.split('_');
						list[index]=new BMap.Point(arr[0], arr[1]);
					});

					vm.off.click=1;

					vm.initMap(list,[res.data.centerLongtitude,res.data.centerLatitude]);
				}else errorDeal(res);
			});
		},
		editingClick(index){
			let vm=this;
			if(index==1){
				vm.off.click=2;
				vm.polygon.enableEditing();
			}else if(index==2){
				let path=vm.polygon.getPath();
				let pointStr='';
				path.forEach((value,index)=>{
					pointStr+=value.lng+'_'+value.lat+',';
				})
				pointStr=pointStr.substring(0,pointStr.lastIndexOf(','));

				vm.off.isSet=true;
				setCityAreaPoint({cityCode:vm.cityList[vm.off.select].code,pointStr:pointStr},function(){
					vm.off.isSet=false;
					vm.off.click=1;
					vm.polygon.disableEditing();
				}).then(res=>{
					if(res.code==200){

					}else errorDeal(res);
				});
			}
		}
	}
}
</script>


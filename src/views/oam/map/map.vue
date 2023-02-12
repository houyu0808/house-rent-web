
<template>
  <div class="container">
    <div class="search-box flex main-box">
      <div class="search-input flex">
        <input id="address-input" placeholder="请输入地址">
      </div>
    </div>
    <div class="mt-10 table-box main-box">
      <div style="background-color: #ffffff;">
        <div id="container"></div>
      </div>
      <div class="flex info-box">
        <div class="flex info-item">
          <div>省：</div>
          <div>{{addInfo.province}}</div>
        </div>
        <div class="flex info-item">
          <div>市：</div>
          <div>{{addInfo.city}}</div>
        </div>
        <div class="flex info-item">
          <div>区：</div>
          <div>{{addInfo.district}}</div>
        </div>
        <div class="flex info-item mt-10">
          <div>地址：</div>
          <div>{{addInfo.address}}</div>
        </div>
        <div class="flex info-item mt-10">
          <div>经度：</div>
          <div>{{addInfo.longitude}}</div>
        </div>
        <div class="flex info-item mt-10">
          <div>纬度：</div>
          <div>{{addInfo.latitude}}</div>
        </div>
      </div>
      <div class="btn-box"><el-button type="primary" size="large" class="submit-btn" @click="commitAddress">确定位置</el-button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
/*在Vue3中使用时,需要引入Vue3中的shallowRef方法(使用shallowRef进行非深度监听,
因为在Vue3中所使用的Proxy拦截操作会改变JSAPI原生对象,所以此处需要区别Vue2使用方式对地图对象进行非深度监听,
否则会出现问题,建议JSAPI相关对象采用非响应式的普通对象来存储)*/
import { shallowRef } from '@vue/reactivity';
import {ref} from "vue";
import {store} from "../../../store";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {House} from "../../../common/interface";

let house = ref<House>({
  address: "",
  area: "",
  bedroomDevice: "",
  cashMonths: "",
  city: "",
  communalDevice: "",
  communityName: "",
  coverUrl: "",
  district: "",
  elevator: "",
  feeMonths: "",
  floor: "",
  id: "",
  introduce: "",
  latitude: "",
  longitude: "",
  name: "",
  province: "",
  rentFee: "",
  status: "",
  towards: "",
  type: "",
  userId: ""
})
house.value = store.getters.getHouse
let addInfo = ref({
  address: "南京大学",
  province: "江苏",
  city: "南京",
  district: "高淳",
  longitude: "118",
  latitude: "31",
})
const router = useRouter()
// const map = shallowRef(null);
const path = ref([]);

const initMap = () => {
  window._AMapSecurityConfig = {
    securityJsCode: '103d4e7cf2a3b833a9d92faf7c6dbba4',
  }
  AMapLoader.load({
    key:"beb89d44b61eb39c49b2f8fd8b96bfaa", // 申请好的Web端开发者Key，首次调用 load 时必填
    version:"2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins:["AMap.ToolBar", "AMap.Scale", "AMap.HawkEye","AMap.Geolocation","AMap.MapType","AMap.MouseTool","AMap.PlaceSearch",], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap)=>{
    let center:any = []
    AMap.plugin('AMap.Geolocation', function () {
      const geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000
      })
      //进行IP城市查询
      geolocation.getCityInfo((status:any, result:any) =>{
        if (status == 'complete') {
          console.log(result, 'Ip获取的')
          // center = result.position
        } else {
          console.log(result)
        }
      })
      //获取用户当前的精确位置信息(经纬度)
      geolocation.getCurrentPosition( (status:any, result:any) => {
        if (status == 'complete') {
          // console.log(result)
          center = [result.lng,result.lat]
        } else {
          console.log(result)
        }
      })
    })
    const map = new AMap.Map("container",{  //设置地图容器id
      viewMode:"3D",    //是否为3D地图模式
      zoom:13,           //初始化地图级别
      center:[118.767413, 32.041544], //初始化地图中心点位置
      position: 'RB'
    });
    map.addControl(new AMap.Scale()); // 显示当前地图中心的比例尺
    map.addControl(new AMap.HawkEye()); // 显示缩略图
    map.addControl(new AMap.Geolocation()); // 定位当前位置
    const autoOptions = {
      input: "address-input"
    };
    AMap.plugin(['AMap.PlaceSearch','AMap.AutoComplete'], function(){
      const auto = new AMap.AutoComplete(autoOptions);
      const placeSearch = new AMap.PlaceSearch({
        map: map
      });  //构造地点查询类
      auto.on("select", select);//注册监听，当选中某条记录时会触发
      function select(e:any) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
        console.log(e)
        addInfo.value.address = e.poi.district + e.poi.address
        addInfo.value.province = e.poi.district.split('省')[0]
        addInfo.value.city = e.poi.district.split('省')[1] ? e.poi.district.split('省')[1].split('市')[0] :  e.poi.district.split('省')[1]
        addInfo.value.district = e.poi.district.split('省')[1] ? (e.poi.district.split('省')[1].split('市')[1] ? e.poi.district.split('省')[1].split('市')[1].split('区')[0] : e.poi.district.split('省')[1].split('市')[0]) :  e.poi.district.split('省')[1]
        addInfo.value.latitude = e.poi.location.lat
        addInfo.value.longitude = e.poi.location.lng
      }
    });

  }).catch(e=>{
    console.log(e);
  })
}

initMap()

const commitAddress = () => {
  type addInfoType = keyof typeof addInfo.value
  let flag:number = 0
  Object.keys(addInfo.value).forEach(key => {
    if(addInfo.value[key as addInfoType] === ""){
      flag++
    }
  })
  if(flag !== 0){
    ElMessage.error('请选择一个准确地点')
    return
  }
  house.value.address = addInfo.value.address
  house.value.province = addInfo.value.province
  house.value.city = addInfo.value.city
  house.value.district = addInfo.value.district
  house.value.latitude = addInfo.value.latitude
  house.value.longitude = addInfo.value.longitude
  store.commit('setHouse',house.value)
  router.back()
}

</script>

<style scoped lang="scss">
#container{
  padding:0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
.search-box{
  height: 40px;
  padding: 10px;
  #address-input{
    width: 420px;
    outline: none;
    border: 1px solid #999;
    border-radius: 4px;
  }
}
.info-box{
  padding: 20px;
  flex-wrap: wrap;
  .info-item{
    flex: 0 0 33.33%;
  }
}
.submit-btn{
  margin: 20px auto;
}
.btn-box{
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}
</style>
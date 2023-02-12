<template>
    <div class="header-title">
        <div class="header-content">
            <img class="logo-icon" src="../../../static/icon/name_logo.png" alt="logo">
            <div class="house-title">{{ house.name }}</div>
            <div class="font-c99 font-s13 mt-8">楼层好，采光好，南北通透。</div>
            <div class="search-house">
                <el-input
                    v-model="searchContent"
                    placeholder="请输入房源标题搜索"
                    class="search-input"
                >
                    <template #prepend>
                        <div>房源</div>
                    </template>
                    <template #append>
                        <el-button :icon="Search"/>
                    </template>
                </el-input>
                <div class="font-c99 font-s13 mt-8 click-time">
                    {{ house.clickTimes }}次浏览
                </div>
            </div>
        </div>
    </div>
    <div class="main-content">
        <div class="house-info flex">
            <div class="left-box" v-if="houseImgList.length > 0">
                <img :src="houseImgList[active].imgUrl" alt="房源图片" class="house-img">
                <div class="flex img-list">
                    <div class="pre img-btn" @click="pre"> {{ '<' }}</div>
                    <div class="flex item-list">
                        <img :src="item.imgUrl" :class="active === index ? 'active' : 'unactive'"
                             v-for="(item,index) in houseImgList" :key="item.id" class="img-item" alt="房源图片">
                    </div>
                    <div class="next img-btn" @click="next"> {{ '>' }}</div>
                </div>
                <div class="flex mt-10 real-tips">
                    <img src="../../../static/icon/real-icon.png" alt="真" class="real-icon">
                    <div class="ml-20 font-s14 real-content">真实存在，真实在租，真实价格，假一赔百</div>
                </div>
            </div>
            <div class="right-box">
                <div class="house-fee font-cf00 flex justify-between">
                    <div><span class="font-s26 font-bold">{{ house.rentFee }}</span>元/月</div>
                    <div class="font-c99 font-s14 pt-14">{{ '押' + house.cashMonths + '付' + house.feeMonths }}</div>
                </div>
                <div class="house-intro flex justify-between">
                    <div>{{ house.room + '室' + house.hall + '厅' + house.toilet + '卫' }}</div>
                    <div>朝向: {{ house.towards }}</div>
                    <div>{{ house.area }}平米</div>
                </div>
                <div class="flex align-center house-content">
                    <img src="../../../static/icon/house-title.png" class="house-title" alt="房子">
                    <div class="ml-8 font-s14">好房源，诚信租</div>
                </div>
                <div class="house-info font-s14">
                    <div class="flex mt-8">
                        <div class="font-c99 mr-10">小区名称：</div>
                        <div>{{ house.communityName }}</div>
                    </div>
                    <div class="flex mt-8">
                        <div class="font-c99 mr-10 ">所在市区：</div>
                        <div>{{ house.province + ' ' + house.city }}</div>
                    </div>
                    <div class="flex mt-8">
                        <div class="font-c99 mr-10">看房时间：</div>
                        <div>具体看房时间请联系房东</div>
                    </div>
                    <div class="flex mt-8">
                        <div class="font-c99 mr-10 ">房源编号：</div>
                        <div>{{ house.id }}</div>
                    </div>
                    <div class="flex mt-8">
                        <div class="font-c99 mr-10 ">风险提示：</div>
                        <div>请勿随意相信他人，保护自身财产安全</div>
                    </div>
                </div>
                <div class="user-box flex">
                    <img :src="user.avatar" alt="头像" class="avatar">
                    <div class="ml-20">
                        <div class="font-bold font-s18">{{ renter.realName }}</div>
                        <div class="mt-8 font-s14 font-c99">平台认证房东，熟悉房源特色</div>
                    </div>
                </div>
                <div class="connect-renter flex align-center justify-center">
                    <img src="../../../static/icon/call.png" alt="call" class="mr-10" >
                    <div>{{user.phoneNumber}}</div>
                </div>
            </div>
        </div>
        <div class="house-base">
            <div class="title">房源基本信息</div>
            <div class="house-detail flex font-s14">
                <div class="font-c99 detail-title">基本属性</div>
                <div class="detail-list flex">
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20 ">房屋户型</div>
                        <div>{{ house.room + '室' + house.hall + '厅' + house.toilet + '卫' }}</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20 ">建筑面积</div>
                        <div>{{ house.area}}平米</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20">房屋类型</div>
                        <div>{{ house.type }}</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20">所在楼层</div>
                        <div>{{ house.floor}}</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20">房屋朝向</div>
                        <div>{{ house.towards}}</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20">配备电梯</div>
                        <div>{{ house.elevator == 1 ? '有' : '无'}}</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20">租押类型</div>
                        <div>押{{house.cashMonths}}付{{house.feeMonths}}</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20">建筑结构</div>
                        <div>钢混结构</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20">装修情况</div>
                        <div>精装修</div>
                    </div>
                </div>
            </div>
            <div class="house-detail flex font-s14">
                <div class="font-c99 detail-title">交易属性</div>
                <div class="detail-list flex">
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20 ">交易权属</div>
                        <div>动迁安置房</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20 ">房屋用途</div>
                        <div>普通住宅</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20">产权所有</div>
                        <div>非公有</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20">抵债信息</div>
                        <div>无抵押</div>
                    </div>
                    <div class="flex detail-item mb-10">
                        <div class="font-c99 mr-20">房本备件</div>
                        <div>已上传房本照片</div>
                    </div>
                </div>
            </div>
            <div class="font-c99 font-s14 mb-20">
                特别提示：本房源所示信息仅供参考，购房时请以该房屋档案登记信息、产权证信息以及所签订合同条款约定为准；本房源公示信息不做为合同条款，不具有合同约束力。
            </div>
            <div class="title">房屋介绍</div>
            <div class="house-detail flex font-s14">
                {{house.introduce}}
            </div>
            <div class="title">房源位置</div>
            <div class="house-detail flex font-s14">
                <div id="map"></div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {houseDetail, renterApplyDetail} from "../../../http/http";
import {ref} from "vue";
import {HouseImg} from "../../../common/interface";
import {Search} from "@element-plus/icons-vue";
import AMapLoader from '@amap/amap-jsapi-loader';
import position from '../../../static/icon/position.png';

const route = useRoute()
const id = route.query.id
let searchContent = ref("")

let house: any = ref({})
let houseImgList = ref<HouseImg[]>([])
let user: any = ref({})
//获取房源详情
const getHouseDetail = () => {
    houseDetail({id: id}).then(res => {
        user.value = res.result.userVO
        house.value = res.result.houseVO
        houseImgList.value = res.result.houseImgVOList
        getRenterDetail()
        console.log([house.value.longitude,house.value.latitude])
        initMap([house.value.longitude,house.value.latitude])
    })
}
getHouseDetail()

//切换图片操作
const active = ref(0)
const pre = () => {
    if (active.value == 0) {
        active.value = houseImgList.value.length - 1
    } else {
        active.value--
    }
}
const next = () => {
    if (active.value == houseImgList.value.length - 1) {
        active.value = 0
    } else {
        active.value++
    }
}
//查询房东信息

let renter: any = ref({})
const getRenterDetail = () => {
    renterApplyDetail({userId: user.value.userId}).then(res => {
        renter.value = res.result
    })
}

//初始化地图
const initMap = (center) => {
    window._AMapSecurityConfig = {
        securityJsCode: '103d4e7cf2a3b833a9d92faf7c6dbba4',
    }
    AMapLoader.load({
        key:"beb89d44b61eb39c49b2f8fd8b96bfaa", // 申请好的Web端开发者Key，首次调用 load 时必填
        version:"2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins:["AMap.ToolBar", "AMap.HawkEye","AMap.Geolocation","AMap.MapType","AMap.MouseTool","AMap.PlaceSearch","AMap.LabelsLayer"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
        const map = new AMap.Map("map",{  //设置地图容器id
            viewMode:"3D",    //是否为3D地图模式
            zoom:13,           //初始化地图级别
            center:center, //初始化地图中心点位置
            position: 'RB'
        });
        map.addControl(new AMap.HawkEye()); // 显示缩略图
        map.addControl(new AMap.Geolocation()); // 定位当前位置

        let layer = new AMap.LabelsLayer({
            // zooms: [10, 20],
            zIndex: 1000,
            collision: false,
        });

        // 将图层添加到地图
        map.add(layer);
        let icon = {
            type: 'image',
            image: position,
            size: [30, 30],
            anchor: 'bottom-center',
        }
        //设置点位信息
        let labelMarker = new AMap.LabelMarker({...{
                position: center,
                entId: '1',
                entName: house.value.address
            },icon});
        //图层中添加点位
        layer.add([labelMarker]);
    }).catch(e=>{
        console.log(e);
    })
}
</script>

<style scoped lang="scss">
.header-title {
    width: 100%;
    height: 280px;
    box-sizing: border-box;
    padding: 90px 0 20px;
    background: #eaeaea;

    .header-content {
        width: 1170px;
        margin: 0 auto;

        .logo-icon {
            height: 70px;
        }

        .house-title {
            font-size: 26px;
            font-weight: bold;
            margin-top: 30px;
        }

        .search-house {
            width: 340px;
            position: absolute;
            top: 110px;
            margin-left: 830px;

            .search-input {
                height: 42px;
            }

            .click-time {
                margin-top: 30px;
                text-align: right;
            }
        }
    }
}

:deep(.el-input-group__prepend) {
    background: #3072f6;
    color: white;
}

.main-content {
    width: 1170px;
    margin: 30px auto;

    .house-info {
        .left-box {
            width: 760px;
            margin-right: 30px;

            .house-img {
                width: 760px;
                height: 420px;
                object-fit: cover;
            }

            .img-list {
                .img-btn {
                    background: #000;
                    font-size: 20px;
                    font-weight: bold;
                    color: white;
                    line-height: 80px;
                    width: 22px;
                    text-align: center;
                    cursor: pointer;

                    &:hover {
                        background: rgba($color: #000, $alpha: 0.7);
                    }
                }

                .img-item {
                    width: 120px;
                    height: 80px;
                }
            }

            .active {
                border: 1px solid #ef8013;
            }

            .unactive {
                border: 1px solid #fff;
            }

            .item-list {
                width: 718px;
            }

            .real-tips {
                padding: 15px 0;
                border-bottom: 1px solid #d7d7d7;
                .real-icon {
                    width: 23px;
                }

                .real-content {
                    margin-top: 2px;
                }
            }

        }

        .right-box {
            width: 380px;
            box-sizing: border-box;
            padding: 20px 24px;
            border: 1px solid #d7d7d7;

            .house-fee {
                padding-bottom: 30px;
                border-bottom: 1px solid #d7d7d7;
            }

            .pt-14 {
                padding-top: 14px;
            }

            .house-intro {
                font-size: 22px;
                font-weight: bold;
                padding: 20px 0;
            }

            .house-title {
                height: 30px;
            }

            .house-content {
                background: #fff;
            }

            .house-info {
                padding: 20px 0;
                margin-top: 20px;
                border-top: 1px solid #d7d7d7;
            }

            .user-box {
                border-top: 1px solid #d7d7d7;
                padding-top: 20px;

                .avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }
            .connect-renter{
                width: 100%;
                height: 50px;
                margin-top: 20px;
                background: #3072f6;
                color: #fff;
                text-align: center;
                line-height: 50px;
                font-size: 22px;
                font-weight: bold;
                >img{
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }
}
.house-base{
    margin-top: 20px;
    .title{
        width: 100%;
        font-size: 26px;
        font-weight: bold;
        padding: 20px 0;

    }
    .house-detail{
        padding: 20px 0;
        border-top: 1px solid #d7d7d7;
        .detail-title{
            width: 300px;
        }
        .detail-list{
            width: calc(100% - 300px);
            flex-wrap: wrap;
            .detail-item{
                flex: 0 0 33.33%;
            }
        }
    }
    #map{
        width: 100%;
        height: 500px;
    }
}
</style>
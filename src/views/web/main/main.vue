<template>
    <div>
        <div class="nav-top" :class="['nav-image-' + navImage]">
            <div class="nav-contain font-cff">
                <div class="font-s28">易租网 安心租</div>
                <div class="font-s66 font-bold">开始寻找属于你的避风港</div>
                <div class="search-rent flex">
                    <input type="text" placeholder="搜索属于你的心仪房子吧" class="search-input"
                           v-model="searchContent">
                    <button class="search-btn" @click="search"><img class="search-icon" src="../../../static/icon/search.png" alt=""></button>
                </div>
            </div>
        </div>
        <div class="contain">
            <h1>热门位置</h1>
            <div class="flex justify-between">
                <div class="hot-rmd flex justify-between">
                    <div class="rmd-item br-4" v-for="item in rcmdHouseList" :key="item" @click="toHouseDetail(item)">
                        <img :src="item.coverUrl" class="item-img" alt="">
                        <div class="item-info">
                            <div class="font-s14 name">{{'[' + item.city + '市-' + item.district +'区] ' + item.name}}</div>
                            <div class="font-s14 mt-4">{{item.communityName}}·{{item.room}}室{{item.hall}}厅{{item.toilet}}卫</div>
                            <div class="font-cf00 mt-4 flex justify-between">
                                <div class="font-bold">{{item.clickTimes}}名租客选择这里</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="renter-rmd">
                    <div class="flex align-center justify-between">
                        <div class="font-s16">预约看房</div>
                        <img class="arrow-icon" src="../../../static/icon/arrow-right.png" alt="">
                    </div>
                    <div class="flex align-center mt-8">
                        <div class="font-s12 flex align-center"><img class="selected mr-4"
                                                                     src="../../../static/icon/selected.png" alt="">免费专车
                        </div>
                        <div class="font-s12 flex align-center ml-10"><img class="selected mr-4"
                                                                           src="../../../static/icon/selected.png"
                                                                           alt="">真实房源
                        </div>
                        <div class="font-s12 flex align-center ml-10"><img class="selected mr-4"
                                                                           src="../../../static/icon/selected.png"
                                                                           alt="">随时看房
                        </div>
                    </div>
                    <div class="subs-list">
                        <div class="subs-item mt-10" v-for="(item,index) in renterList" :key="index">
                            <div class="font-s15">[{{ item.city }}]{{item.district}}</div>
                            <div class="font-s14 flex justify-between mt-4">
                                <div>
                                    房东：{{item.realName}}(可联系)
                                </div>
                                <el-button class="connect-btn" type="success" color="#23c993" size="small">立即联系
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1>推荐好房</h1>
            <div class="rmd-box justify-between">
                <div class="rmd-item br-4" v-for="item in hotHouseList" :key="item.id" @click="toHouseDetail(item)">
                    <houseItem :house="item" :hot="true"/>
                </div>
            </div>
            <h1>好房上新</h1>
            <div class="rmd-box justify-between">
                <div class="rmd-item br-4" v-for="item in newHouseList" :key="item.id" @click="toHouseDetail(item)">
                    <houseItem :house="item"/>
                </div>
            </div>
        </div>
        <div class="page-footer"></div>
    </div>
</template>

<script lang="ts" setup>
import houseItem from '../../../components/houseItem/houseItem.vue'
import util from "../../../utils/utilFunction";
import {ref} from "vue";
import {getRenterList, houseSelect} from "../../../http/http";
import {useRouter} from "vue-router";
import {House} from "../../../common/interface";

const router = useRouter()
//生成随机数
let navImage: number = util.getRandom(1, 3)

//获取热门房源列表
let hotHouseList = ref([])
const getHotHouseList = () => {
    houseSelect({name: "", userId: "", pageNumber: 1, size: 4, sort: 'area,desc'}).then(res => {
        hotHouseList.value = res.result.content
    })
}
getHotHouseList()

//获取点击量较高的房源列表
let rcmdHouseList = ref([])
const getRcmdHouseList = () => {
    houseSelect({name: "", userId: "", pageNumber: 1, size: 3, sort: 'clickTimes,desc'}).then(res => {
        rcmdHouseList.value = res.result.content
    })
}
getRcmdHouseList()
//获取新上传的房源列表
let newHouseList = ref([])
const getNewHouseList = () => {
    houseSelect({name: "", userId: "", pageNumber: 1, size: 4, sort: 'id,desc'}).then(res => {
        newHouseList.value = res.result.content
    })
}
getNewHouseList()

//跳转房源详情页面
const toHouseDetail = (item: House) => {
    router.push({path: '/house-info', query: {id: item.id}})
}

let searchContent = ref("")
const search = () => {
    router.push({path: '/rent-house', query: {query: searchContent.value}})
}
//查询房东列表
let renterList = ref([])
const getRenter = () => {
    getRenterList({pageNumber:1,size:4}).then(res => {
        renterList.value = res.result
    })
}
getRenter()
</script>

<style scoped lang="scss">
.nav-top {
    width: 100vw;
    height: 400px;
    min-width: 1170px;
    padding: 200px 10px 0;

    .nav-contain {
        width: 1170px;
        margin: 0 auto;
    }
}

.nav-image-1 {
    background: url("../../../static/temSource/nav-image-1.jpg") no-repeat center;
    background-size: cover;
}

.nav-image-2 {
    background: url("../../../static/temSource/nav-image-2.jpg") no-repeat center;
    background-size: cover;
}

.nav-image-3 {
    background: url("../../../static/temSource/nav-image-3.jpg") no-repeat center;
    background-size: cover;
}

.contain {
    //height: 2000px;
    width: 1170px;
    padding: 0 10px;
    margin: 0 auto;
}

.font-s28 {
    font-size: 28px;
}

.font-s66 {
    font-size: 66px;
}

.connect-btn {
    color: white;
}

.search-rent {
    margin-top: 20px;

    .search-input {
        font-size: 16px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        padding-left: 10px;
        border: none;
        width: 500px;

        &:focus {
            outline: none;
        }

        &::placeholder {
            font-size: 16px;
        }
    }

    .search-icon {
        width: 30px;
        height: 30px;
    }

    .search-btn {
        outline: none;
        border: none;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        width: 70px;
        height: 50px;
        padding: 0;
        background: #3072f6;
        cursor: pointer;
    }
}

.renter-rmd {
    width: 250px;
}

.arrow-icon {
    width: 14px;
    object-fit: contain;
}

.selected {
    width: 12px;
    height: 12px;
}

.rmd-box {
    display: flex;

    .rmd-item {
        flex: 0 0 calc((100% - 90px) / 4);
    }
}

.hot-rmd {
    width: calc(100% - 280px);

    .rmd-item {
        flex: 0 0 calc((100% - 60px) / 3);
    }
}

.rmd-item {
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        background: #ffffff;
        box-shadow: 0 0 10px #ccc;
        margin-top: -4px;
    }

    .item-img {
        width: 100%;
        height: 205px;
        object-fit: cover;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .item-info {
        padding: 8px 12px;
    }
}

</style>
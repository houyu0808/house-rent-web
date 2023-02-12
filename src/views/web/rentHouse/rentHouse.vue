<template>
    <div class="header-content">
        <div class="header-box">
            <div class="flex align-center">
                <img class="logo-icon" src="../../../static/icon/name_logo.png" alt="logo">
                <div class="search-rent flex">
                    <input type="text" placeholder="搜索属于你的心仪房子吧" class="search-input" v-model="searchContent">
                    <button class="search-btn" @click="search"><img class="search-icon" src="../../../static/icon/search.png" alt="" ></button>
                </div>
            </div>
            <div class="tips mt-20 font-c00 font-bold font-s18">
                开始寻找属于你的避风港
            </div>
        </div>
    </div>
    <div class="main-content">
        <div class="search-list flex">
            <div class="search-item" :class="active == index ? 'active': ''" v-for="(item,index) in searchList" :key="item.id" @click="changeSearch(item,index)">{{item.name}}</div>
        </div>
        <div class="search-count">
            共找到<span class="total">{{totalElement}}</span>套 房源
        </div>
        <div class="house-list">
            <div class="house-item flex" v-for="item in houseList" :key="item.id">
                <img :src="item.coverUrl" alt="封面" class="house-cover">
                <div class="house-info">
                    <div class="font-bold name flex">
                        <div>{{item.name}}</div>
                        <div class="name-icon">必看好房</div>
                    </div>
                    <div class="flex align-center font-s14 font-c99">
                        <img src="../../../static/icon/house_position.png" class="icon" alt="icon">
                        <div class="ml-20">{{item.address}}</div>
                    </div>
                    <div class="flex mt-10 align-center font-s14 font-c99">
                        <img src="../../../static/icon/house_info.png" class="icon" alt="icon">
                        <div class="ml-20">{{item.floor + '层 | ' + item.room + '室' + item.hall + '厅' + item.toilet + '卫 | ' + item.area + '平米 | 朝向：' + item.towards}}</div>
                    </div>
                    <div class="flex mt-10 align-center font-s14 font-c99">
                        <img src="../../../static/icon/view.png" class="icon" alt="icon">
                        <div class="ml-20">{{item.clickTimes}}次浏览</div>
                    </div>
                    <div class="label-list flex">
                        <div class="label-item">{{item.type}}</div>
                        <div class="label-item">崭新房源</div>
                        <div class="label-item">物业保障</div>
                    </div>
                </div>
                <div class="extra-info">
                    <div class="rent-fee font-cf00"><span class="font-s22 font-bold">{{item.rentFee}}</span><span class="font-s14">/月</span></div>
                    <div class="mt-10 font-cf00 font-s14">{{'押' + item.cashMonths + '付' + item.feeMonths}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {houseSelect} from "../../../http/http";
import {useRoute,useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
let searchContent:any = ref("")
console.log(route.query.query)
if(route.query.query){
    searchContent.value = route.query.query
}

const searchList = ref([
    {
        id: 1,
        name: '默认排序',
        value: ''
    },
    {
        id: 2,
        name: '最新发布',
        value: 'id,desc'
    },
    {
        id: 3,
        name: '租金',
        value: 'rentFee,desc'
    },
    {
        id: 4,
        name: '面积',
        value: 'area,desc'
    }
])
let active = ref(0)

//选择搜索条件
const changeSearch = (item:any,index:number) => {
    active.value = index
    getHouseList(item.value)
}

//查询房源列表
let totalElement = ref(0)
let houseList = ref([])
const getHouseList = (sort:string) => {
    houseSelect({name: searchContent.value,userId: "",pageNumber:1,size:10,sort:sort}).then(res => {
        houseList.value = res.result.content
        totalElement.value = res.result.totalElements
    })
}
getHouseList("")

//搜索
let href = window.location.href
const search = () => {
    getHouseList("")
    if(route.query.query){
        router.replace('/rent-house')
    }
}
</script>

<style scoped lang="scss">
.header-content{
    height: 240px;
    box-sizing: border-box;
    padding: 90px 0 20px;
    background: #eaeaea;
    .header-box{
        width: 1170px;
        margin: 0 auto;
        .logo-icon {
            height: 70px;
        }
        .search-rent{
            margin-left: 100px;
            .search-input{
                font-size: 16px;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                padding-left: 10px;
                border: none;
                width: 500px;
                &:focus{
                    outline: none;
                }
                &::placeholder {
                    font-size: 16px;
                }
            }
            .search-icon{
                width: 30px;
                height: 30px;
            }
            .search-btn{
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
    }
}
.main-content{
    width: 1170px;
    margin: 0 auto;
    .search-list{
        margin-top: 30px;
        border-bottom: 2px solid #3072f6;
        .search-item{
            width: 120px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            cursor: pointer;
        }
        .active{
            background: #3072f6;
            color: #fff;
        }
    }
    .search-count{
        font-size: 22px;
        padding: 10px 0;
        font-weight: bold;
        border-bottom: 1px solid #d7d7d7;
        .total{
            color: #3072f6;
            margin: 2px 6px 0;
        }
    }
    .house-list{
        .house-item{
            position: relative;
            padding: 30px 0;
            border-bottom: 1px solid #d7d7d7;
            cursor: pointer;
            .house-cover{
                width: 232px;
                height: 174px;
                margin-right: 30px;
            }
            .house-info{
                .name{
                    font-size: 22px;
                    margin-bottom: 15px;
                    align-items: center;
                    &:hover{
                        color: #3072f6;
                    }
                    .name-icon{
                        font-size: 12px;
                        background: #d53c3c;
                        color: #fff;
                        padding: 0 6px;
                        height: 22px;
                        margin-left: 8px;
                        line-height: 22px;
                    }
                }
                .icon{
                    width: 20px;
                    height: 20px;
                }
                .label-list{
                    font-size: 14px;
                    margin-top: 15px;
                    .label-item{
                        padding: 0 11px;
                        height: 34px;
                        line-height: 34px;
                        text-align: center;
                        margin-right: 10px;
                        color: #849aae;
                        background: #f4f7f9;
                    }
                }
            }
            .extra-info{
                position: absolute;
                left: calc(100% - 120px);
                top: 70px;
            }
        }
    }
}
</style>
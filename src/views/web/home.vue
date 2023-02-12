<template>
    <div>
        <div class="fixed-top">
            <div class="nav-menu">
                <el-menu
                    :default-active="currentPath"
                    class="el-menu-demo"
                    mode="horizontal"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @select="handleSelect"
                >
                    <div></div>
                    <el-menu-item :index="item.path" v-for="(item,index) in webMenu" :key="index">{{ item.name }}
                    </el-menu-item>
                    <div class="user-box">
                        <div class="font-cff mr-10" @click="toOam" v-if="userInfo.role === 1 || userInfo.role === 3">控制台</div>
                        <img :src="userInfo.avatar || defaultAvatar" alt="头像" >
                        <div class="font-cff ml-8" @click="toLogin" v-if="!userInfo.userId">登录 / 注册</div>
                        <el-popover
                            placement="top-start"
                            :width="80"
                            trigger="hover"
                        >
                            <div class="opt-list">
                                <div class="opt-item" @click="toUserDetail">我的信息</div>
                                <div class="opt-item" @click="exit">退出登录</div>
                            </div>
                            <template #reference>
                                <div class="font-cff ml-8 font-s12" v-if="userInfo.userId">{{userInfo.nickName || '用户' + userInfo.userId}}</div>
                            </template>
                        </el-popover>
                    </div>
                </el-menu>
            </div>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
//引入首页菜单配置
import {webMenu} from '../../common/menu'
import {onMounted, ref} from 'vue'
import {useRouter} from "vue-router";
import defaultAvatar from '../../static/icon/avatar.png'
import {ElMessage} from "element-plus";

//获取当前路由
let router = useRouter()
let currentPath: string = router.currentRoute.value.path

let userInfo:any= ref(JSON.parse(localStorage.getItem("userInfo") || '{}'))

//处理导航栏点击事件-路由跳转
const handleSelect = (key: string, keyPath: string[]) => {
    router.push(key)
}
//页面滚动事件
const handleScroll = () => {
    let scrollTop: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    // console.log(scrollTop, '滚动距离')
}

//生命周期mounted
onMounted(() => {
    //监听页面滚动
    // window.addEventListener('scroll', handleScroll)
})
const toLogin = () => {
    router.push({path: '/user-login'})
}
//退出登录
const exit = () => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("token")
    userInfo.value = {}
    ElMessage.success('退出登录成功');
}
//编辑资料
const toUserDetail = () => {
    router.push({path: '/user-detail'})
}
const toOam = () => {
    router.push({path: '/oam'})
}
</script>

<style scoped lang="scss">
.nav-menu {
    width: 1170px;
    padding: 0 10px;
    margin: 0 auto;
    position: relative;
}

.fixed-top {
    width: 100vw;
    position: fixed;
    background-image: linear-gradient(to bottom, rgba(94, 94, 94, 0.5), rgba(185, 185, 185, 0.5));
    box-shadow: 2px 3px 8px rgba(185, 185, 185, 0.5);
}

:deep(.el-menu) {
    border-bottom: none;
    //justify-content: center;
    background: transparent;
}

//:deep(.el-menu-item):hover{
//  background-color: rgba(185, 185, 185, 0.5);
//}
.user-box{
    >img{
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
    }
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    height: 60px;
    right: 0;
    >div{
        &:hover{
            text-decoration: underline;
        }
    }
}
.opt-list{
    .opt-item{
        box-sizing: border-box;
        width: 100%;
        padding: 6px;
        text-align: center;
        cursor: pointer;
        &:hover{
            background-color: rgba(0,0,0,0.05);
        }
    }
}
</style>
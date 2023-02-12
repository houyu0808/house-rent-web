<template>
    <div class="common-layout">
        <el-container class="contain">
            <el-aside width="260px">
                <div class="menu-box">
                    <div class="logo-box"><img class="logo" src="../../static/icon/name_logo_w.png" alt=""></div>
                    <el-scrollbar>
                        <el-menu :default-openeds="['1']">
                            <el-sub-menu :index="item.id" v-for="item in menu" :key="item.path">
                                <template #title>
                                    {{ item.title }}
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item :index="i.id" @click="toManagePage(i.path)" v-for="i in item.children"
                                                  :key="i.path">{{ i.title }}
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                        </el-menu>
                    </el-scrollbar>
                </div>
            </el-aside>
            <el-container>
                <el-header class="header-box">
                    <div class="flex back-box" @click="backPage">
                        <img src="../../static/icon/back.png" alt="返回" class="back-icon">
                        <div class="font-c99">返回</div>
                    </div>
                    <div class="flex back-box" @click="toHome">
                        <div class="home-font">[返回首页]</div>
                    </div>
                    <div class="user-box">
                        <div class="flex align-center">
                            <img class="avatar" :src="userInfo.avatar ||'/src/static/icon/avatar.png'" alt="">
                            <div class="ml-8">
                                <div class="font-s14 font-bold">{{ getRole() }}</div>
                                <div class="mt-4 font-s12 font-c99">{{ (userInfo.realName || userInfo.nickName) || '用户' + userInfo.userId }}</div>
                            </div>
                            <el-popover
                                placement="top-start"
                                :width="80"
                                trigger="hover"
                            >
                                <div class="opt-list">
<!--                                    <div class="opt-item" @click="toUserDetail">我的信息</div>-->
                                    <div class="opt-item" @click="exit">退出登录</div>
                                </div>
                                <template #reference>
                                    <img class="arrow ml-8" src="/src/static/icon/arrow_down.png" alt="">
                                </template>
                            </el-popover>
                        </div>

                    </div>
                </el-header>
                <el-main class="main-contain">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import {adminMenu, renterMenu} from '../../common/menu'
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {User} from "../../common/interface";
import {ElMessage} from "element-plus";

let menu: any[] = []

const router = useRouter()

const userInfo: User = JSON.parse(localStorage.getItem("userInfo") || "{}")

if (userInfo.role === 1) {
    menu = adminMenu
} else if (userInfo.role === 3) {
    menu = renterMenu
}

router.push(menu[0].children[0].path)

const toManagePage = (path: string) => {
    router.push(path)
}

const getRole = () => {
    switch (userInfo.role) {
        case 1:
            return '管理员';
        case 3:
            return '房东';
    }
}

const backPage = () => {
    router.back()
}

//退出登录
const exit = () => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("token")
    ElMessage.success('退出登录成功');
    router.push('/oam/login')
}
const toHome = () => {
    router.push({path: '/'})
}
</script>

<style scoped lang="scss">
.common-layout {
    width: 100vw;
    height: 100vh;

    .contain {
        width: 100vw;
        height: 100vh;
    }
}

.menu-box {
    background: #2d63da;
    height: 100%;

    .logo-box {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 40px 0;
    }

    .logo {
        height: 60px;
    }
}

:deep(.el-scrollbar) {
    height: calc(100% - 140px);
}

:deep(.el-menu) {
    background: none;
    color: #fff;
    border: none;
}

:deep(.el-sub-menu__title) {
    color: #fff;

    &:hover {
        background: #2253BA;
    }
}

:deep(.el-menu-item) {
    color: #fff;

    &:hover {
        color: #40cdef;
        background: #2253BA;
    }
}

:deep(.is-active) {
    background: #2253BA;
    color: #40cdef;
}

.header-box {
    background: white;
    box-shadow: 2px 2px 3px 2px #d8d8d8;
    display: flex;
    justify-content: space-between;
    min-width: 1000px;

    .user-box {
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .avatar {
            width: 46px;
            height: 46px;
        }

        .arrow {
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
    }
}

.main-contain {
    min-width: 1000px;
}

.back-box {
    align-items: center;
    cursor: pointer;

    .back-icon {
        width: 20px;
        height: 20px;
        margin-right: 2px;
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
.home-font{
    color: #3072f6;
}
</style>
import {RouteRecordRaw } from 'vue-router'

//web 页面的路由配置
export default [
    {
        path: '/',
        name: '首页',
        meta:{
            title: '易租网'
        },
        component: () => import('../views/web/home.vue'),
        redirect: '/home-page',
        children:[
            {
                path: '/home-page',
                name: '首页',
                meta:{
                    title: '易租网'
                },
                component: () => import('../views/web/main/main.vue'),
            },
            {
                path: '/rent-house',
                name: '租房',
                meta:{
                    title: '易租网'
                },
                component: () => import('../views/web/rentHouse/rentHouse.vue'),
            },
            {
                path: '/renter-apply',
                name: '申请成为房东',
                meta:{
                    title: '申请成为房东'
                },
                component:() => import('../views/web/renter/renterApply.vue')
            },
            {
                path: '/house-info',
                name: '房源详细',
                meta:{
                    title: '房源详细'
                },
                component:() => import('../views/web/house/houseDetail.vue')
            },
            {
                path: '/user-detail',
                name: '编辑资料',
                meta:{
                    title: '编辑资料'
                },
                component:() => import('../views/web/userDetail/userDetail.vue')
            }
        ]
    },
    {
        path: '/user-login',
        name: '登录',
        meta:{
            title: '登录'
        },
        component:() => import('../views/web/login/userLogin.vue')
    }
] as RouteRecordRaw[]
import {RouteRecordRaw } from 'vue-router'

//后台管理页面的路由配置
/**
 * @param path:String  路由
 * @param name:String 名称
 * @param component:String  路由文件
 * */
export default [
    {
        path: '/oam',
        name: '后台管理系统',
        meta:{
            title: '后台管理系统',
            requireAuth: true
        },
        component: () => import('../views/oam/index.vue'),
        children:[
            {
                path: '/oam/account-manage',
                name: '账号管理',
                meta:{
                    title: '账号管理',
                    requireAuth: true
                },
                component: () => import('../views/oam/accountManage/accountManage.vue'),
            },
            {
                path: '/oam/account-detail',
                name: '账号明细',
                meta:{
                    title: '账号明细',
                    requireAuth: true
                },
                component: () => import('../views/oam/accountManage/accountDetail.vue'),
            },
            {
                path: '/oam/renter-manage',
                name: '房东申请',
                meta:{
                    title: '房东申请',
                    requireAuth: true
                },
                component: () => import('../views/oam/renterManage/renterManage.vue'),
            },
            {
                path: '/oam/house-manage',
                name: '房源审批',
                meta:{
                    title: '房源审批',
                    requireAuth: true
                },
                component: () => import('../views/oam/houseManage/houseManage.vue'),
            },
            {
                path: '/oam/house-insert',
                name: '添加房源',
                meta:{
                    title: '添加房源',
                    requireAuth: true
                },
                component: () => import('../views/oam/houseManage/houseInsert.vue'),
            },
            {
                path: '/oam/house-detail',
                name: '房源详情',
                meta:{
                    title: '房源详情',
                    requireAuth: true
                },
                component: () => import('../views/oam/houseManage/houseDetail.vue'),
            },
            {
                path: '/oam/map',
                name: '获取定位',
                meta:{
                    title: '获取定位',
                    requireAuth: true
                },
                component: () => import('../views/oam/map/map.vue'),
            }
        ]
    },{
        path: '/oam/login',
        name: '登陆后台管理系统',
        meta:{
            title: '后台登陆',
            requireAuth:false
        },
        component: () => import('../views/oam/login/login.vue')
    }
] as RouteRecordRaw[]
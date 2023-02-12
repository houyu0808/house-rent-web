import {createRouter, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import webRouter from './web'
import oamRouter from './oam'

const routes = [
    ...webRouter,...oamRouter
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const title = '易租网'
const getPageTitle = (pageTitle:any) => {
    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
}


router.beforeEach(async (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
    document.title = getPageTitle(to.meta.title)
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}")
    if ((!localStorage.getItem("token") || userInfo.role === 2) && to.meta.requireAuth) { // 判断本地存储中是否存在token字段
       return next('/oam/login')
    }
    next();
});
export default router;
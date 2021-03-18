import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import Login from '../views/Login.vue';

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
            title: '首页',
            requireAuth: false, // 标识该路由是否需要登录
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    /**
     * 未登录则跳转到登录页
     * 未登录跳转到登录页,也可以通过axios的响应拦截器去实现,但是会先在当前页面渲染一下,再跳转到登录页,会有个闪动的现象
     * 这里通过路由守卫的方式,不会在当前页闪现一下,但是需要在每个路由组件添加一个是否需要登录的标识位,如本项目中的requireAuth字段
     */

    if (to.matched.some((auth) => auth.meta.requireAuth)) {
        let token = localStorage.getItem('token');
        if (token) {
            next();
        } else {
            next({
                path: '/login',
            });
        }
    } else {
        next();
    }
});

export default router;

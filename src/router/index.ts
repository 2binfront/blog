import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import(/* webpackChunkName: "home" */ "../views/Home.vue"),
        meta: {}
    },
    {
        path: "/login/",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Login.vue")
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


export default router;

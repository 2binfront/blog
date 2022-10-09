import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    /* webpackChunkName: "home" */
    {
        path: "/",
        name: "Home",
        component: () =>
            import("../views/Home.vue"),
        meta: {}
    },
    /* webpackChunkName: "login" */
    {
        path: "/login/",
        name: "Login",
        component: () =>
            import("../views/Login.vue")
    },
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


export default router;

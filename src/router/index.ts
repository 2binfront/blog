import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () =>
            //lazy load
            import("../views/client/Home.vue"),
        meta: {}
    },
    {
        path: "/login/",
        name: "Login",
        component: () =>
            import("../views/admin/Login.vue")
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import("../views/admin/Admin.vue"),
        children: [
            {
                path: '/admin',
                name: 'Dashboard',
                component: () => import("../views/admin/Dashboard.vue"),
            },
            //和上面的一样？
            {
                path: '/admin/dashboard',
                name: 'AdminDashboard',
                component: () => import("../views/admin/Dashboard.vue"),
            },
        ]
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


export default router;

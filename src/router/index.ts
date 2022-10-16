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
            {
                path: '/admin/user',
                name: 'UserManagement',
                component: () => import("../views/admin/User.vue"),
            },
            {
                path: '/admin/tag',
                name: 'Tag',
                component: () => import("../views/admin/Tag.vue"),
            },
            {
                path: '/admin/article',
                name: 'ArticleManagement',
                component: () => import("../views/admin/Article.vue"),
            },
            {
                path: '/admin/comment',
                name: 'CommentManagement',
                component: () => import("../views/admin/Comment.vue"),
            },
            {
                path: '/article',
                name: 'ArticleDetail',
                component: () => import("../views/client/ArticleDetail.vue")
            },
            {
                path: '/catalog',
                name: 'Catalog',
                component: () => import("../views/client/Catalog.vue")
            },
            {
                path: "/archive/",
                name: "Archive",
                component: () => import("../views/client/Archive.vue")
            },
            {
                path: '/about',
                name: 'About',
                component: () => import("../views/client/ArticleDetail.vue")
            },


        ]
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


export default router;

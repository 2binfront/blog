import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useStore } from "../store";


const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import("../views/client/Home.vue"),
        meta: {
            title: 'hh blog'
        }
    },
    {
        path: "/articles",
        name: "Articles",
        component: () =>
            import("../views/client/Home.vue")
    },
    {
        path: "/article/",
        name: "ArticleDetail",
        component: () =>
            import("../views/client/ArticleDetail.vue")
    },
    {
        path: '/catalog',
        name: 'Catalog',
        component: () =>
            import("../views/client/Catalog.vue")
    },
    {
        path: "/archive/",
        name: "Archive",
        component: () =>
            import("../views/client/Archive.vue")
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import("../views/client/ArticleDetail.vue")
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
                path: '/admin/',
                name: 'Dashboard',
                component: () => import("../views/admin/Dashboard.vue"),
            },
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
        ]
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

//全局前置导航守卫
router.beforeEach((to, from, next) => {
    const store = useStore();
    //假如尝试访问管理员目录但并非管理员和登录用户
    if (/\/admin/i.test(to.path)
        && (!(store.user.id && store.user.is_superuser === true))) {
        //debug
        console.log(store.user.is_superuser);
        next('/');
        return;
    }
    next();
})

export default router;

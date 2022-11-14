//import { createStore, Store } from "vuex";
import { ArticleParams, Nav, User } from "../types";
import { defineStore } from 'pinia'

export interface State {
    user: User,
    navIndex: string,
    navs: Array<Nav>,
    articleParams: ArticleParams,
}

export const StateKey = Symbol();

// export const SET_USER = 'setUser';
// export const CLEAR_USER = 'clearUser';
// export const SET_NAV_INDEX = 'srtNavIndex';

export const initDefaultUserInfo = (): User => {
    let user: User = {
        id: 0,
        username: "",
        avatar: "",
        email: '',
        nickname: '',
        is_superuser: false,
    }
    if (window.sessionStorage.userInfo) {
        user = JSON.parse(window.sessionStorage.userInfo);
    }
    return user;
}

const initDefaultArticleParams = (): ArticleParams => {
    let params: ArticleParams = {
        title: undefined,
        status: 'Published',
        tags: undefined,
        catalog: undefined,
        page: 1,
        page_size: 10,
    }
    if (window.sessionStorage.articleParams) {
        params = JSON.parse(window.sessionStorage.articleParams);
    }
    return params;
}

export const useStore = defineStore('main', {
    state: (): State => {
        return {
            user: initDefaultUserInfo(),
            articleParams: initDefaultArticleParams(),
            navIndex: '1',
            // navs: [
            //     {
            //         index: "1",
            //         path: "/",
            //         name: "主页",
            //     },
            //     {
            //         index: "2",
            //         path: "/catalog",
            //         name: "分类"
            //     },
            //     {
            //         index: "3",
            //         path: "/archive",
            //         name: "归档"
            //     },
            //     {
            //         index: "4",
            //         path: "/message",
            //         name: "留言"
            //     },
            //     {
            //         index: "5",
            //         path: "/about",
            //         name: "分类"
            //     },
            // ]
            navs: [
                {
                    index: "1",
                    path: "/",
                    name: "主页",
                },
                {
                    index: "2",
                    path: "/catalog",
                    name: "分类",
                },
                {
                    index: "3",
                    path: "/archive",
                    name: "归档",
                },
                {
                    index: "4",
                    path: "/about",
                    name: "关于",
                },
            ],
        }
    },
    actions: {
        setUser(userInfo: object | any) {
            for (const prop in userInfo) {
                (this.user as any).prop = userInfo[prop];
                //Object.defineProperty(this, prop, userInfo[prop]);
            }
        },
        clearUser() {
            this.user = initDefaultUserInfo();
        },
        setNavIndex(navIndex: string) {
            this.navIndex = navIndex
        },
        setArticleParams(params: object) {
            this.articleParams = { ...this.articleParams, ...params }
        },
        //和setNavIndex一起负责view跳转
        setNavIndexByRoute(route: string) {
            const index = this.navs.findIndex((r: { path: string; }) => r.path === route)
            if (this.navIndex === this.navs[index].index)
                return
            if (index > -1) {
                this.setNavIndex(this.navs[index].index)
            }
        }
    }
})
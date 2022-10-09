import { InjectionKey } from "vue-demi";
//import { createStore, Store } from "vuex";
import { Nav, User } from "../types";
import { defineStore, Store } from 'pinia'

export interface State {
    user: User,
    navIndex: string,
    navs: Array<Nav>,
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

export const useStore = defineStore('main', {
    state: (): State => {
        return {
            user: initDefaultUserInfo(),
            navIndex: '1',
            navs: [
                {
                    index: "1",
                    path: "/",
                    name: "主页",
                },
                {
                    index: "2",
                    path: "/catalog",
                    name: "分类"
                },
                {
                    index: "3",
                    path: "/archive",
                    name: "归档"
                },
                {
                    index: "4",
                    path: "/message",
                    name: "留言"
                },
                {
                    index: "5",
                    path: "/about",
                    name: "分类"
                },
            ]
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
        }
    }
})
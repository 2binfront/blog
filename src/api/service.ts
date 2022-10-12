import request from "./index";
import { User, ResponseData } from "../types"
//请求接口代码
export function getUserList(params: any) {
    return request({
        url: '/user/',
        method: 'get',
        params,
    })
}

//登入登出方法
export async function login(data: any) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'get'
    })
}

export function register(data: any) {
    return request({
        url: '/user/',
        method: 'post',
        data
    })
}

export function forgetPassword(data: any) {
    return request({
        url: '/user/pwd/reset',
        method: 'post',
        data
    })
}

//用户管理相关的接口，列表查询、启用、禁用、详情查看
export function getUserDetail(userId: number) {
    return request({
        url: '/user/' + userId + '/',
        method: 'get',
    }) as unknown as User
}

export function saveUser(method: string, data: User) {
    // @ts-ignore
    return request({
        url: '/user/' + data.id + '/',
        method,
        data,
    }) as unknown as ResponseData
}
import request from "./index";

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

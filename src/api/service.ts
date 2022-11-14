import request from "./index";
import { User, ResponseData, Tag, TagList, Article, ArticleArray, ArticleParams, Catalog, CommentPara, NumberInfo, Like, PageInfo } from "../types"
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

//问题出在这里，后端注册接口并没有保存密码的逻辑
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

export function getTagList(params: any) {
    return request({
        url: '/tag/',
        method: 'get',
        params,
    }) as unknown as TagList
}

export function saveTag(method: string, data: Tag) {
    let url = '/tag/'
    if (['put', 'patch'].includes(method)) {
        url += data.id + '/'
    }
    // @ts-ignore
    return request({
        url,
        method,
        data,
    }) as unknown as ResponseData
}

export function addTag(data: Tag) {
    return request({
        url: '/tag/',
        method: 'post',
        data,
    }) as unknown as ResponseData
}

export function deleteTag(id: number) {
    return request({
        url: '/tag/' + id + '/',
        method: 'delete',
    }) as unknown as ResponseData
}

export function getCatalogTree() {
    return request({
        url: '/catalog/',
        method: 'get',
    }) as unknown as Array<Catalog>
}

export function saveCatalog(method: string, data: Catalog) {
    let url = '/catalog/'
    if (['put', 'patch'].includes(method)) {
        url += data.id + '/'
    }
    // @ts-ignore
    return request({
        url,
        method,
        data,
    }) as unknown as ResponseData

}

export function deleteCatalog(catalogId: number) {

    return request({
        url: '/catalog/' + catalogId + '/',
        method: 'delete',
    }) as unknown as ResponseData

}

export function getArticleList(params: ArticleParams) {
    return request({
        url: '/list/',
        method: 'get',
        params
    }) as unknown as ArticleArray
}

export function remoteDeleteArticle(articleId: number) {
    return request({
        url: '/article/' + articleId + '/',
        method: 'delete',
    }) as unknown as ResponseData
}

export function getArticleDetail(articleId: number) {
    return request({
        url: '/article/' + articleId + '/',
        method: 'get',
    }) as unknown as Article
}

export function remoteSaveArticle(method: string, data: Article) {
    let url = '/article/'
    if (['put', 'patch'].includes(method)) {
        url += data.id + '/'
    }
    // @ts-ignore
    return request({
        url,
        method,
        data,
    }) as unknown as Article
}

export function remotePublishArticle(articleId: number) {

    // @ts-ignore
    return request({
        url: '/publish/' + articleId + '/',
        method: 'patch',
    }) as unknown as Article
}

export function remoteOfflineArticle(articleId: number) {
    return request({
        url: '/offline/' + articleId + '/',
        method: 'patch',
    }) as unknown as Article
}


export function getCommentList(params: CommentPara) {
    return request({
        url: '/comment/',
        method: 'get',
        params,
    }) as unknown as ResponseData
}

export function getTopArticleList() {
    return request({
        url: '/top/',
        method: 'get',
    }) as unknown as ResponseData
}

export function getNumbers() {
    return request({
        url: '/number/',
        method: 'get',
    }) as unknown as NumberInfo
}

export function postLikeArticle(data: Like) {
    return request({
        url: '/like/',
        method: 'post',
        data,
    })
}

export function getArticleComments(articleId: number) {
    return request({
        url: '/comment/',
        method: 'get',
        params: {
            article: articleId,
        },
    }) as unknown as ResponseData
}

export function addComment(data: CommentPara) {
    return request({
        url: '/comment/',
        method: 'post',
        data
    })
}

export function getArchiveList(params: PageInfo) {
    return request({
        url: '/archive/',
        method: 'get',
        params
    })
}


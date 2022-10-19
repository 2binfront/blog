export interface User {
    id: number,
    username: string,
    email: string,
    avatar: string | any,
    nickname: string | any,
    is_active?: boolean,
    is_superuser: boolean,
    created_at?: string,
    last_login?: string,
}

export interface State {
    loginForm: {
        account: string;
        password: string;
    };
    loginRules: {
        account: {
            required: boolean;
            trigger: string;
        }[];
        password: {
            required: boolean;
            trigger: string;
            validator: (rule: any, value: string, callback: Function) => void;
        }[];
    };
    forgetRules: {
        account: {
            required: boolean;
            trigger: string;
        }[];
    }
    passwordType: string;
    capsTooltip: boolean;
    loading: boolean;
    //是否忘记密码
    isFP: boolean;
}

export interface Nav {
    index: string,
    path: string,
    name: string,
}

export interface ResponseData {
    count: number;
    results?: any;
    detail?: string;
}

export interface ResponseDataAxios {
    code: number;
    data?: any;
    message: string;
}

//标签
export interface Tag {
    id: number,
    name: string,
    created_at: string,
    modified_at: string,
}

export interface TagList {
    count: number,
    results: Array<Tag> | any
}

export interface Catalog {
    id: number,
    name: string,
    parent: number,
    parents: Array<number>,
    children: Array<Catalog>

}

//文章
export interface Article {
    id: number,
    title: string,
    cover: string,
    toc: string,
    excerpt: string,
    markdown: string,
    html: string,
    create_at: string,
    views: number,
    likes: number,
    comments: number,
    words: number,
    tags: Array<number> | any,
    tags_info: Array<Tag> | any
    catalog: number,
    catalog_info: Catalog,
    created_at: string,
    modified_at: string,
    author: string,
    status?: string,
}

export interface ArticleArray {
    count: number,
    results: Array<Article> | any
}

export interface ArticleParams {
    title: string | any,
    status: string | any,
    tags: Array<number> | any,
    catalog: number | any,
    page: number,
    page_size: number,
}

//评论类型
export interface CommentInfo {
    id: number,
    user: number,
    user_info: User | any,
    article: number,
    article_info: Article | any,
    created_at: string,
    reply: number | any,
    content: string,
    comment_replies: CommentInfo | any,
}

export interface CommentPara {
    user: number,
    article: number,
    reply: number | any,
    content: string,
    page: number,
    page_size: number
}

export interface NumberInfo {
    views: number,
    likes: number,
    comments: number,
    messages: number
}

//点赞
export interface Like {
    article: number,
    user: number,
}

export interface PageInfo {
    page: number,
    page_size: number
}

export interface ArticleArchiveList {
    year: number,
    list: Array<Article> | any
}

export interface User {
    id: number,
    username: string,
    email: string,
    avatar: string | any,
    nickname: string | any,
    is_active?: boolean,
    is_superuser?: boolean,
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

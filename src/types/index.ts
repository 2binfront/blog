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
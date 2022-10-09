import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import _ from "lodash";
import router from "../router";
import { getCookie } from "../utils";

//配置 Axios 实例
const request = axios.create({
    //访问接口的url前缀，代指部署路径，不为生产环境添加/api前缀，为生产路径则默认部署在域名根目录下
    baseURL: import.meta.env.MODE !== 'production' ? '/api' : '',
    headers: { 'X-CSRFToken': getCookie('csrftoken') },
    timeout: 1000,
})

// request.interceptors.request.use((config: AxiosRequestConfig) => {
//     \// ? Django SessionAuthentication need csrf token
//     config.headers!['X-CSRFToken'] = getCookie('csrftoken');
//     \// ? config.headers = _.extend(config.headers, { 'X-CSRFToken' : getCookie('csrftoken') })
//     \// ? Object.defineProperty(config.headers, 'X-CSRFToken', getCookie('csrftoken'));
//     return config;
// })

request.interceptors.response.use(
    // ! 对响应数据做点什么
    (response: AxiosResponse) => {
        const data = response.data
        console.log('response => ', response)
        //未登录
        if (data.status === '401') {
            localStorage.removeItem('user');
            ElMessage({
                message: data.error,
                type: 'error',
                duration: 1.5 * 1000
            });
            return router.push('/login');
        }
        // 
        else if (data.status === 'error') {
            ElMessage({
                message: data.error || data.status,
                type: 'error',
                duration: 1.5 * 1000
            })
        }

        if (data.success === false && data.msg) {
            ElMessage({
                message: data.msg,
                type: 'error',
                duration: 1.5 * 1000
            })
        }
        return data
    },
    // ! 对响应错误做点什么
    // ! AxiosError，解构赋值
    ({ message, response }) => {
        console.log('err => ', message, response) // for debug
        if (response && response.data && response.data.detail) {
            ElMessage({
                message: response.data.detail,
                type: 'error',
                duration: 2 * 1000
            })
        } else {
            ElMessage({
                message: message,
                type: 'error',
                duration: 2 * 1000
            })
        }
        if (response && (response.status === 403 || response.status === 401)) {
            localStorage.removeItem('user');
            return router.push('/login')
        }
        return Promise.reject(message);
    }
)

export default request;
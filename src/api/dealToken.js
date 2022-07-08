import axios from 'axios'
import router from '@/router'

const API = axios.create()

// 添加请求拦截器
API.interceptors.request.use(config=>{
    const { url } = config;

    //当url不是/login 或 不是/register请求路由时(这两个路由不需要token)， 请求头添加token    
    if(!url.startsWith('/login') ||  !url.startsWith('/register')){ 
        //当url以/user开头的时候，
        config.headers.Authorization = localStorage.getItem('token');
    }
    return config
})

API.interceptors.response.use(response => {

    const { status }  = response.data; //这里的response数据结构不一样，直接打印出来看，参照后端返回的结果

    if(status === 400 || status === 401 || status === 402 || 403){ 
        localStorage.removeItem('token');
        //当token超时or失效 403账号无权限的时候直接跳转到/login页重新登录
        router.history.push('/login')
    }
    return response
})

export { API } 
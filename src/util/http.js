import axios from 'axios';
import store from '@/store';

const TIMEOUT = 1000 * 12; // 接口请求超时时间
// 创建axios
let server = axios.create({ timeout: TIMEOUT });

// 设置POST请求头为JSON类型接收
server.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
server.interceptors.request.use(
    (config) => {
        // 登录流程控制中，根据本地是否存在TOKEN判断用户的登录状态
        // 但是即使TOKEN存在，也有可能过期，所以在每次的请求头中携带TOKEN
        // 后台根据携带的TOKEN判断用户的登录情况，并返回对应的状态码
        // 然后可以再响应拦截器中，根据状态码进行统一操作
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    (error) => Promise.error(error)
);

// 响应拦截器
server.interceptors.response.use(
    // 请求成功
    (res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
    // 请求失败
    (error) => {
        const { response } = error;
        if(response){
            // 请求已发出，但状态码不在2XX范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        }
    }
);

// 请求返回状态码统一管理
const errorHandle = (status) => {
    switch (status) {
        // 401：未登录状态，跳转登录页
        case 401:
            break;
        // 403：TOKEN过期，清除TOKEN并跳转登录页
        case 403:
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {}, 1000);
            break;
        // 404：请求不存在
        case 404:
            console.log('-----------404-----------');
            break;
    }
};

// 导出对象
export default server;
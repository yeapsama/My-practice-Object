import axios from "axios"

import nprogress from "nprogress"
import "nprogress/nprogress.css"
const requests = axios.create({
    //baseURL为请求后自动在路径上加入baseURL的内容
    baseURL:"/mock",
    timeout:5000
    
})

//请求拦截器，在发请求之前，请求拦截器可以检测到，并且可以在发出去之前做点什么

requests.interceptors.request.use((config)=>{
    nprogress.start();
    //config为配置对象
    return config
})

//响应拦截器

requests.interceptors.response.use((res)=>{
    //成功的回调，数据请求回来之后可以在这里做点什么
    nprogress.done();
   return res.data;
},(error)=>{
    //失败的回调
    return Promise.reject(new Error('失败了！',error));
})

export default requests;
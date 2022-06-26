import axios from "axios";
import { startLoading,endLoading } from "../utils/loading";

    // 请求方法
export function request(url){
    const axiosData = axios.create({
        baseURL: "http://124.221.63.19:3000/",
		timeout: 30000,
		withCredentials: true,  //跨域请求时发送Cookie
    })
    // 请求拦截
    axiosData.interceptors.request.use(
        config => {
            //如果不是二维码登录的页面就在请求时候进行loading显示
            // if(config.url != 'login/qr/check'){
            //     startLoading()
            // }
            startLoading()
            return config
        },
        error =>{
            return Promise.reject(error)
        }
    )
    //响应拦截
    axiosData.interceptors.response.use(
        res =>{
            endLoading()
            return res
        },
        error =>{
            return Promise.reject(error)
        }
    )

    axiosData.defaults.withCredentials = true
    return axiosData(url)
}

    // 下载音乐方法
export function downloadMusic(){

}
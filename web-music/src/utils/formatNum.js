//整理大于1w的数的方法
export function formatNum(num){
    let newNum=0
    if(num>100000000){
        // 将传进来的数字四舍五入到小数点的后面两位
        newNum = (num/100000000).toFixed(2)
        return newNum + "亿"
    }else if(num>10000){
        // 将传进来的数字四舍五入到小数点的后面一位
        newNum = (num/10000).toFixed(1)
        return newNum + "万"
    }else return num
}

export default{
    install(Vue){
        Vue.filter('formatNum',formatNum)
    }
}
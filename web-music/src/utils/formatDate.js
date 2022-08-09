/* 格式化日期
    y：年  M：月  d：日  h：时  m：分  s：秒
*/
export function formatDate(date, fmt) {
    //（y+）表示匹配一个或者多个y
    if (/(y+)/.test(fmt)) {
        //RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
        //RegExp这个对象会在我们调用了正则表达式的方法后, 自动将最近一次的结果保存在里面, 
        //所以如果我们在使用正则表达式时, 有用到分组, 那么就可以直接在调用完以后直接使用RegExp.$xx来使用捕获到的分组内容
        //后面跟上substr(4 - RegExp.$1.length))的目的市保证根所给的fmt年份长度一致，避免给出yy-MM-ss却展示2018-11-11这样不合规矩的样式
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            //将fmt里给的格式的时间都替换成时间戳获取的真实时间
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
 
//一位数补零函数
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
export function formatDuration(time){
    // 如果超过了100000 基本都是毫秒为单位的了 先转成秒的
    time = parseInt(time)
    if (time > 10000) {
        //毫秒转为秒
        time = Math.floor(time / 1000);
    } else {
        time = Math.floor(time)
    }
    //分
    let m = Math.floor(time / 60);
    //秒
    let s = Math.floor(time % 60);
    //格式化补零
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
}
export default{
    install(Vue){
      Vue.filter('formatDuration',formatDuration)
    }
  }
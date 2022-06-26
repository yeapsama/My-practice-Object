import { Loading } from "element-ui";
let loading;
// 开始加载函数
export function startLoading(text = '正在玩命加载中....'){
   loading = Loading.service({
    lock: true,
    text,
    background: "rgba(0,0,0,0)",
  })
}

// 结束加载函数
export function endLoading(){
    loading.close();
}
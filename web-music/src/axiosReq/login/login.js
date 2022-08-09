import {request} from "../requests";
// 手机号登录
export const login = (phone,password) => request({url:'/login/cellphone',params:{phone,password}})

// 退出登录
export const logout = () => request({url:'/logout'})

// 二维码登录  需要经过三步：生成key->根据 key 可生成二维码图片的 base64 和二维码信息-> 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
// 获取二维码key
export const getQrKey = () => request({url:'/login/qr/key',params:{timestamp:Date.parse(new Date())}})
// 生成二维码
//qrimg:传入后会额外返回二维码图片 base64 编码
export const getLoginQr = (key) => request({url:'/login/qr/create',params:{key,timestamp:Date.parse(new Date()),qrimg:true}})
// 检查二维码状态
//轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
export const checkLoginQr = (key) => request({url:'/login/qr/check',params:{key,timestamp:Date.parse(new Date())}})


// 获取用户账号信息
export const getUserAccount = () => request({url:'/user/account',params:{timestamp:Date.parse(new Date())}})

//注册账号
//获取验证码
export const getAuthcode = (phone) => request({url:'/captcha/sent',params:{phone}})

//检查验证码
export const checkAuthcode = (phone,captcha) => request({url:'/captcha/verify',params:{phone,captcha}})

//注册(修改密码)
//captcha:验证码
export const register = (phone,captcha,password,nickname) => request({url:'/register/cellphone',params:{phone,captcha,password,nickname}})

// 检测手机号码是否已注册
export const checkPhoneNum = (phone) => request({url:'/cellphone/existence/check',params:{phone}})

import requests from "./request";

import mockAjax from "./mockAjax"
//请求头部信息
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'});

export const reqGetBannerList = () => mockAjax.get('/banner');
export const reqGetFloorList = () => mockAjax.get('/floor');



//搜索模块
//此后用reqGetSearchList时候至少要带个空对象，否则将请求失败：reqGetSearchList({})
export const reqGetSearchList = (item) => requests({url:'/list',method:'post',data:item});

//获取商品信息详情页的请求
export const reqGetGoodsInfo = (stuId) => requests({url:`/item/${stuId}`,method:'get'});

//添加到购物车的请求
export const reqUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});

//购物车数据请求
export const reqGetShopCart = () => requests({url:'/cart/cartList',method:'get'});

//删除某样购物车商品请求
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//选中状态请求
export const reqGetCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});


//获取注册验证码
export const reqGetYzmCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//用户注册
export const reqUserRegister = (info) => requests({url:'/user/passport/register',info,method:'post'});

//用户登录
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'});

//获取用户信息
export const reqUserInfo = () => requests(({url:'/user/passport/auth/getUserInfo',method:'get'}));

//退出登录
export const reqLoginOut = () =>requests({url:'/user/passport/logout',method:'get'});

//获取用户地址信息
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

//获取交易页商品清单
export const reqOderInfo = () => requests({url:'/order/auth/trade',method:'get'});

//提交订单
export const reqSubmitOder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

//获取支付信息
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//获取支付订单状态
export const reqPayStatus = (openId) =>requests({url:`/payment/weixin/queryPayStatus/${openId}`,method:'get'});

//获取个人中心的数据
export const reqMyOrder = (pageNo,limit) => requests(({url:`/order/auth/${pageNo}/${limit}`,method:'get'}));
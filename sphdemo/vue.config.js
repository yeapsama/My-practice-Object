module.exports = {
    //关闭eslint
    lintOnSave: false,

    //解决跨域问题，构建代理服务器
    devServer:{
        proxy:{
            '/api':{
                target:'http://39.98.123.211',

            }
        }
    }
}
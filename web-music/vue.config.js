module.exports = {
	//忽略报错
	lintOnSave: false,
	configureWebpack: {
		resolve: {
            //自定义路径
			alias: {
				//配置路径别名//在vue中@默认代表src
          //配置后我们调用assets目录下的某个文件，可以直接通过'assets/该文件名'
				assets: "@/assets",
				common: "@/common",
				components: "@/components",
				axiosReq: "@/axiosReq",
				mainLayout: "@/mainLayout",
				view: "@/view",
			},
		},
		//解决跨域问题
		devServer:{
			proxy:"http://localhost:8080"
		},
	}
}
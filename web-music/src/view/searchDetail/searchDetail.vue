<template>
  <div class="searchdetail">
      <!-- 顶部导航 -->
      <div class="topnav">
          <el-menu :default-active="defalutActive" router mode="horizontal">
            <el-menu-item v-for="(item, index) in topnav" :key="index" :index="item.path">
                {{item.name}}
            </el-menu-item>
          </el-menu>
      </div>

    <!-- 内容部分 -->
    <div class="search-content">
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
    </div>


  </div>
</template>

<script>
export default{
    name:"searchDetail",
    inject:['reload'],
    data() {
        return {
            topnav:[
                {
					name: "单曲",
					path: "/searchdetail/songres/" + this.$route.params.keywords,
				},
				{
					name: "专辑",
					path: "/searchdetail/albumres/" + this.$route.params.keywords,
				},
				{
					name: "歌手",
					path: "/searchdetail/singerres/" + this.$route.params.keywords,
				},
				{
					name: "歌单",
					path: "/searchdetail/songlistres/" + this.$route.params.keywords,
				},
				{
					name: "MV",
					path: "/searchdetail/mvres/" + this.$route.params.keywords,
				},
				{
					name: "视频",
					path: "/searchdetail/videores/" + this.$route.params.keywords,
				},
            ],
            //菜单中默认显示的选项
            defalutActive:""
        }
    },
    created(){
        //将默认topnav设为当前路径上的那个
        let pathArr = this.$route.path.split("/");
		this.defaultActive = `/${pathArr[1]}/${pathArr[2]}/${this.$route.params.keywords}`;
    },
    watch:{
        //路由push相同地址不同参数时 不会自动刷新页面，这里通过watch监听路由变化，一但发生变化reload刷新
        $route(to, from) {
			if (to !== from) {
				this.reload();
			}
		},
    }

}
</script>

<style lang="less" scoped>
.searchdetail{
    display: flex;    
    align-items: center;
    flex-direction: column;
}
.el-menu {
	border: 0;
}
.el-menu-item {
	color: #303133;
	height: 45px;
	line-height: 45px;
	font-size: 16px;
}
.el-menu--horizontal > .el-menu-item.is-active {
	border-bottom: 3px solid var(--mycompColor);
	font-size: 18px;
	color: var(--mycompColor);
}


</style>

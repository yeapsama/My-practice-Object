<template>
  <div class="aside">
      <el-menu router :default-active="defaultActive">
        <el-menu-item v-for="(item, index) in subnavitem" :key="index" :index="item.path">
            <span class="iconfont" :class="item.icon"></span>
			<span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
    name:'Aside',
    data() {
        return {
            defaultActive: " ",
			subnavitem: [
				{ name: "发现音乐", path: "/findmusic", icon: "icon-yinyueclick" },
				{ name: "推荐视频", path: "/recvideo", icon: "icon-shipin1" },
				{ name: "每日推荐", path: "/receveryday", icon: "icon-dianzan" },
				{ name: "我的收藏", path: "/myfavorite", icon: "icon-myfavorite" },
			],
			collectIndex: null,
        }
    },
}
</script>

<style lang="less" scoped>
.aside{
    width: 230px;
    height: 100%;
    border-right: 1px solid #dddddd;
	padding-top: 2px;
    overflow-y: scroll;
    .el-menu {
		border-right: 0;
	}
    .el-menu-item {
		height: 53px;
		line-height: 53px;
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
    .el-menu-item.is-active {
		color: var(--base-black);
		font-weight: 700;
		background: rgb(245, 245, 245, 0.3) !important;
	}
    .el-menu-item:hover {
		background: rgb(245, 245, 245, 0.3);
	}
	span {
		padding-right: 10px;
	}
}
</style>
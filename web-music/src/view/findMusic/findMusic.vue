<template>
  <div class="findmusic">
    <!-- 顶部自定义菜单栏 -->
    <topNav :tabitem="topnav"/>

    <!-- 内容 -->
    <div class="music-content w">
			<transition name="el-fade-in-linear">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</transition>
			<!-- <router-view></router-view> -->
		</div>
  </div>
</template>

<script>
import topNav from '../../components/common/topNav.vue'
export default {
    name:'findMusic',
    components:{
      topNav,
    },
    data() {
      return {
        topnav: [
				{
					name: "个性推荐",
					path: "/findmusic/discover",
				},
				{
					name: "歌单",
					path: "/findmusic/recsonglist",
				},
				{
					name: "排行榜",
					path: "/findmusic/songrank",
				},
				{
					name: "歌手",
					path: "/findmusic/singer",
				},
				{
					name: "最新音乐",
					path: "/findmusic/newsongs",
				},
			],
      }
    },
    activated() {
		// document.querySelector(".view").scrollTop = 0;
	},
}
</script>

<style lang="less" scoped>
.music-content {
	overflow-y: scroll;
}
</style>
<template>
  <div class="main">
      <div class="aside">
         <Aside/> 
      </div>
    <div class="view">
			<transition name="el-fade-in-linear">
				<keep-alive include="findMusic,recvideo,recEveryday,myFavorite">
					<router-view v-if="isRouterAlive"></router-view>
				</keep-alive>
			</transition>
    </div>
	<!-- 浮动歌词 -->
		<transition name="el-fade-in-linear">
			<FloatLynic v-show="showFloatLyric" />
		</transition>
  </div>
</template>

<script>
import Aside from './Aside.vue'
import FloatLynic from '@/components/content/FloatLyric/FloatLynic'

import { mapGetters } from "vuex";
export default {
    name:'Main',
    data() {
      return {
        isRouterAlive:true
      }
    },
    components:{
        Aside,
		FloatLynic
    },
	computed:{
		...mapGetters(["showFloatLyric"])
	}
}
</script>

<style lang="less" scoped>
    .main {
	height: calc(100% - 130px);
	display: flex;
	.aside {
		::-webkit-scrollbar {
			width: 5px;
			height: 12px;
		}
	}
	.view {
		flex: 1;
		height: 100%;
		overflow-y: scroll;
		
	}
}

// 歌曲详情页动画
.songdetail-enter,
.songdetail-leave-to {
	transform: translateY(calc(100vh - 70px));
}
.songdetail-enter-active,
.songdetail-leave-active {
	transition: all 0.6s;
}
.songdetail-enter-to {
	transform: translateY(0);
}
</style>
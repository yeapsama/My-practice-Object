<template>
  <div class="video-list-item" @click="videoItemClick">
      <!-- 视频封面 -->
		<div class="item-img" @mouseenter="showIcon" @mouseleave="hideIcon">
			<img :src="showImg" alt="" />
			<!-- 播放图标遮罩层 -->
			<transition name="el-fade-in-linear">
				<div class="mask-playicon" v-show="isShowPlay">
					<span class="iconfont icon-play"></span>
				</div>
			</transition>
			<!-- 播放量 -->
			<transition name="el-zoom-in-top">
				<div class="play-icon" v-show="isShowIcon">
					<span class="iconfont icon-play-square"></span>
					<span>{{ newMVItem.playCount || newMVItem.playTime || newMVItem.data.playTime || newMVItem.data.playCount | formatNum }}</span>
				</div>
			</transition>
			<!-- 时长 -->
			<transition name="el-zoom-in-bottom">
				<div class="playduration" v-show="isShowIcon">
					<span>{{ newMVItem.duration || newMVItem.durationms || newMVItem.data.durationms || newMVItem.data.duration | formatDuration }}</span>
				</div>
			</transition>
		</div>
		<!-- 视频介绍 -->
		<div class="item-text">
			<div class="twoLine">
				{{ newMVItem.name || newMVItem.title || newMVItem.data.title || newMVItem.data.name }}
			</div>
			<div class="by">by{{ showAuthor }}</div>
		</div>
  </div>
</template>

<script>
export default {
    name:"videoListItem",
    props:{
        newMVItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data() {
        return {
            	isShowIcon: true, //控制播放量和时长的显示与隐藏
				isShowPlay: false, //控制播放图标的显示与隐藏
        }
    },
    computed:{
        //展示图片
        showImg(){
            return this.newMVItem.cover || this.newMVItem.imgurl16v9 || this.newMVItem.picUrl || this.newMVItem.coverUrl || this.newMVItem.data.coverUrl;
        },
        //展示作者名字
        showAuthor(){
            //个性推荐里的MV
            if(this.newMVItem.id){
                return this.newMVItem.artistName;
            }
            /*
            // 视频页面
			else if (this.videolistitem.data) {
				// 视频中的MV
				if (this.videolistitem.data.artists) {
					return this.videolistitem.data.artists[0].name;
				}
				// 视频
				else return this.videolistitem.data.creator.nickname;
			}
			// 我的收藏视频页面
			else if (this.videolistitem.vid) {
				return this.videolistitem.creator[0].userName;
			}
             */
        },
    },
    methods:{
        showIcon(){
            this.isShowIcon = false
            this.isShowPlay = true
        },
        hideIcon(){
            this.isShowIcon = true
            this.isShowPlay = false
        },
        //点击事件
        videoItemClick(){
            console.log(111);
        }
    }
}
</script>

<style lang="less" scoped>
.video-list-item{
    padding-bottom: 0px;
	width: 100%;
	cursor: pointer;
	.item-img {
		position: relative;
		img {
			width: 100%;
			height: 180px;
		}
		.play-icon{
			position: absolute;
			top: 0;
			right: 0;
			height: 30px;
			line-height: 30px;
			background: rgba(100, 100, 100, 0.5);
			color: #fff;
			padding:0 5px
		}
		.playduration{
			position: absolute;
			bottom: 0;
			left: 0;
			height: 30px;
			line-height: 30px;
			background: rgba(100, 100, 100, 0.5);
			color: #fff;
			span{
				padding:5px
			}
		}
}
}
</style>
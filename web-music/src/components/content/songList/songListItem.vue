<template>
  <div class="song-list-item"  v-if="Object.keys(songList).length !== 0" @click="listItemClick">
      <div class="imgitem" @mouseleave="hideMask" @mouseenter="showMask">
          <!-- 图片上的播放图标 鼠标经过时显示 -->
          <transition name="el-fade-in-linear">
				<div class="mask-playicon" v-show="isShowPlay">
					<span class="iconfont icon-play"></span>
				</div>
			</transition>
            <!-- 图片上方遮罩层1 显示歌单播放量 -->
			<transition name="el-zoom-in-top">
				<div class="mask1" v-if="songList.playCount" v-show="isShowIcon">
					<span class="iconfont icon-yinle"></span>
                    <!-- 采用formatNum过滤器让数字以万或亿的简写形式出现 -->
					<span>{{ songList.playCount | formatNum }}</span>
				</div>
			</transition>
            <!-- 图片下方遮罩层2 显示歌单作者名 -->
			<transition name="el-zoom-in-bottom">
				<div class="mask2" v-if="songList.creator" v-show="isShowIcon">
					<span class="iconfont">&#xe841;</span>
					<span>{{ songList.creator.nickname }}</span>
				</div>
			</transition>
          <!-- 图片本身 使用懒加载 -->
			<img v-lazy="showImg" alt="" />
      </div>
                  <div class="item-text">
			<div>{{ songList.name }}</div>
		</div>
  </div>
</template>

<script>
export default {
    name:'songListItem',
    data() {
        return {
            isShowIcon: true, //播放量显示与隐藏
			isShowPlay: false, //播放图标遮罩层的显示与隐藏
        }
    },
    props:{
        songList:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        showImg(){
            return this.songList.picUrl || this.songList.coverImgUrl;
        }
    },
    methods:{
        // 点击每一项时候的方法
        listItemClick(){
            console.log(111);
        },
        showMask(){
           this.isShowIcon = false;
            this.isShowPlay = true;
        },
        hideMask(){
           this.isShowIcon = true;
            this.isShowPlay = false;
        }
    }
}
</script>

<style lang="less" scoped>
.song-list-item{
    width: 100%;
    height: 100%;
    cursor: pointer;
    margin-bottom: 15px;
    .imgitem{
        position: relative;
        img{
           width: 100%; 
        }
        .item-text {
		margin: 5px 0;
	}
    .mask1{
        position: absolute;
        top: 0;
        height: 30px;
        width: 100%;
        font-size: 13px;
        line-height: 30px;
        color: white;
        text-align: right;
        padding-right: 7px;
        span{
            padding-left: 5px;
        }
    }
    .mask2{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
		text-align: left;
		color: #fff;
		font-size: 13px;
		padding-left: 7px;
		span {
			padding-right: 5px;
		}
    }
    }
}
</style>
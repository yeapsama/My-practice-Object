<template>
  <div class="footer">
    <div class="player">
      
      <!-- 
        loadedmetadata:当指定的音频/视频的元数据已加载时，触发事件
        timeupdate:在音频/视频（audio/video）的播放位置发生改变时触发事件
        enden:查看音频是否播放结束
         -->
      <audio
				id="audio"
				autoplay
				:src="songUrl"
				ref="audioplay"
				@play="changeState(true)"
				@pause="changeState(false)"
				@loadedmetadata="onLoadedmetadata"
				@timeupdate="onTimeupdate"
				@ended="playModel == 3 ? loopPlay() : toggleSong(1)"
			></audio>
       <!--@ended="playModel == 3 ? loopPlay() : toggleSong(1)"
            播放完后如果模式为3，则单曲循环
            如果模式不为3，则执行togglesong，先判断播放模式，如果是顺序播放则往下播一首，如果是随机则直接随机切歌
        -->
      <!-- 左侧歌曲封面和名字 -->
      <div class="left-music-content">
        <!-- 没有音乐时候的显示 -->
        <div class="music-cover"  v-if="Object.keys(nowSongDetail).length==0" @click="showDetail">
          <div class="music">
            <span class="iconfont icon-yinleyanzou"></span>
          </div>
          <div class="songname">暂无音乐</div>
        </div>
        <!-- 有音乐时候的显示 -->
        <div class="music-cover"  v-if="Object.keys(nowSongDetail).length!=0">
          <div class="music" @click="showDetail" @mouseenter="showMask = true" @mouseleave="showMask = false">
            <!-- 鼠标移入显示遮罩 -->
            <transition name="el-fade-in-linear">
							<div class="mask-playicon" v-show="showMask" style="cursor: pointer; background:rgba(0,0,0,.6)">
								<span :class="!isShowSongDetail ? 'iconfont icon-xiangshangjiantou' : 'iconfont icon-down-arrow'"></span>
							</div>
						</transition>
            <img :src="cover" alt="" :class="{ blur: showMask }" />
          </div>
          <div class="songname">
            <p style="padding-bottom: 5px">{{ nowSongDetail.name }}</p>
            <p class="by">{{ nowSongDetail.ar[0].name }}</p>
          </div>
          <!-- 喜欢该歌曲 -->
					<div class="like-song" @click="likeNowSongBy">
						<span :class="islike ? 'iconfont icon-xihuan2' : 'iconfont icon-xihuan'"></span>
					</div>
					<div class="download" @click="downloadCurrentMusic" title="下载">
						<span class="iconfont icon-xiazai"></span>
					</div>
        </div>
      </div>

      <!-- 中间播放设置 -->
      <div class="center-player-song">
        <div class="center-main-box">
          <!-- 上一首 -->
        <div class="change-box" @click="toggleSong(0)">
          <i class="iconfont icon-shangyiqu"></i>
        </div>
        <!-- 播放暂停 -->
        <div class="play-box" v-if="!isPlaying" @click="playingMusic">
          <i class="iconfont icon-play"></i>
        </div>
        <div class="play-box" v-else @click="pauseMusic">
          <i class="iconfont icon-pause"></i>
        </div>
        <!-- 下一首 -->
        <div class="change-box" @click="toggleSong(1)">
          <i class="iconfont icon-xiayiqu"></i>
        </div>
        </div>

        <!-- 进度条 -->
        <div class="song-progress">
          <!-- 歌曲时间 -->
          <span>{{currentTime}}</span>
          <!-- 进度条 -->
          <div class="progress">
            <Progress
            :disabled="playingList.length==0"
            :progress="songProgress"
            :formatToolTip="{isFormatTooltip:true,tooltipTxt:tooltipTime}"
            @onMove="tooltipTimeFuction"
            @onChange="changeSongProgress"></Progress>
          </div>
          <!-- 总时长 -->
					<span style="cursor: auto">{{ totalTime }}</span>
        </div>
        <!-- 播放模式 -->
        <div class="playmodel">
          <el-tooltip effect="dark" content="顺序播放" placement="top" v-if="playModel==1">
            <span class="iconfont icon-orderplay" v-if="playModel==1" @click="changePlayModel(2)"></span>
          </el-tooltip>
          <el-tooltip effect="dark" content="随机播放" placement="top" v-if="playModel==2">
            <span class="iconfont icon-random" v-if="playModel==2" @click="changePlayModel(3)"></span>
          </el-tooltip>
          <el-tooltip effect="dark" content="单曲循环" placement="top" v-if="playModel==3">
            <span class="iconfont icon-danqu" v-if="playModel==3" @click="changePlayModel(1)"></span>
          </el-tooltip>
          <!-- 悬浮歌词显示 -->
          <span class="iconfont icon-cibiaoquanyi" @click="showFloatLyric"></span>
        </div>
      </div>

      <!-- 右侧声音控制 -->
      <div class="right-voice">
        <span>
          <!-- 静音控制 -->
          <i class="iconfont icon-jingyin" @click="cancelJingyin" v-if="voiceProgress == 0"></i>
          <i class="iconfont icon-laba" @click="muteVolume" v-else></i>
        </span>
        <!-- 声音进度条 -->
        <div class="vprogress">
          <Progress :progress="voiceProgress" @onChange="changeVoice"></Progress>
        </div>
        <!-- 播放列表 -->
        <el-tooltip effect="dark" content="播放列表" placement="top">
          <span class="iconfont icon-songplaylist" @click="isShowDrawer=!isShowDrawer"></span>
        </el-tooltip>
      </div>
      <!-- 播放列表展开 -->
      <transition name="playList">
      <PlayingList v-if="isShowDrawer" @closePlayList="isShowDrawer = false"></PlayingList>
      </transition>
    </div>
  </div>
</template>

<script>
import {getSongUrl,checkSong,likeNowSong,getLikeSongList,getNowLyric} from 'axiosReq/playmusic/playmusic.js'
import { throttle , getRandom} from '../utils/utils'
import { mapGetters } from "vuex";
import {formatDuration} from "../utils/formDuration"
import Progress from '@/components/common/Progress'
import PlayingList from '@/components/content/playSet/PlayingList'
export default {
    name:'Footer',
    data() {
      return {
      // 歌曲总秒数
			totalSecond: this.getItem("totalSecond") ? this.getItem("totalSecond") : 0,
      //歌曲总时长(分钟)，从缓存中取，用于刷新后显示
			totalTime: this.getItem("totalTime") ? this.getItem("totalTime") : "00:00",
      //歌曲当前处于的时间(分钟)，从缓存中取，用于刷新后显示
			currentTime: this.getItem("currentTime") ? this.getItem("currentTime") : "00:00",
      //歌曲时间进度条，从缓存中取，用于刷新后显示
			songProgress: this.getItem("songProgress") ? this.getItem("songProgress") : 0, 
      //音量进度条，从缓存中取，用于刷新后显示
			voiceProgress: this.getItem("voiceProgress") ? this.getItem("voiceProgress") : 50, 
      //播放模式
			playModel: this.getItem("playModel") ? this.getItem("playModel") : 1, 
			nowVolume: "", //静音前的音量
			islike: false, //是否喜欢当前播放歌曲
			isDrag: false, //是否在拖拽时间进度条
			showMask: false, //封面遮罩
			isShowDrawer: false, //是否显示播放列表
			tooltipTime: "", //悬浮时间显示
      formatlyric: [], //格式化后的歌词
      }
    },
    mounted(){
    this.$refs.audioplay.volume = this.voiceProgress / 100; // 刷新后设置播放器声音大小为原来设置过的
		this.pauseMusic();
    },
    computed:{
      ...mapGetters(['isPlaying','songUrl','nowSongDetail','playingList','isShowSongDetail','currentSecond']),
      //当前播放的音乐的图片
      cover() {
			return this.nowSongDetail.al.picUrl + "?param=60y60";
		},
  },
  components:{
    Progress,
    PlayingList
  },
    methods: {
      //改变播放状态，true为播放，false为暂停
      changeState(flag){
        this.$store.dispatch('changePlayState',flag)
      },
      //音频数据加载完成后触发事件
      onLoadedmetadata(res){
        //总秒数
        this.totalSecond = res.target.duration
        //总时长
        this.totalTime = formatDuration(this.totalSecond)
        this.setItem("totalTime",this.totalTime)
        this.setItem("totalSecond",this.totalSecond)
      },
      // 监听时间的改变
		  onTimeupdate(res) {
			// 提交歌曲播放的实时秒数
			this.$store.dispatch("saveCurrentSeconds", res.target.currentTime);
			// 格式化为分钟
			this.currentTime = formatDuration(res.target.currentTime);
			// 缓存当前播放时间（分钟）,用于刷新后显示
			this.setItem("currentTime", this.currentTime);
			// 如果没有在拖拽进度条 歌曲当前时间改变后，时间进度条也要改变
			if (!this.isDrag) {
				let songProgress = Math.ceil((res.target.currentTime / this.totalSecond) * 100);
				if (songProgress != Infinity && !isNaN(songProgress)) {
					// 缓存进度条,用于刷新后恢复
					this.setItem("songProgress", songProgress);
					this.songProgress = this.getItem("songProgress");
				}
			}
		},
    //切歌
    toggleSong(type){
      if(this.playingList.length == 0){
        //如果播放列表没有歌
        this.$message({
          message: "播放列表为空",
					type: "warning",
					center: true,
        })
      }else if(this.playingList.length == 1){
        //如果播放列表只有一首歌
        this.$message({
          message: "播放列表只有一首歌",
					type: "warning",
					center: true,
        })
      }else{
        //当播放模式为顺序播放或者单曲循环时候
        if(this.playModel == 1 || this.playModel == 3){
          this.orderPlay(type)
        }else if(this.playModel == 2){
          //当播放模式随机播放
          this.randomPlay()
        }
      }
    },
    //改变播放模式
    changePlayModel(type){
      //关闭循环，并且更改模式
      this.$refs.audioplay.loop = false
      this.playModel = type
      this.setItem("playModel",type)
    },
    //顺序播放 type等于0 是上一曲 否则下一曲
    orderPlay(type){
      //查找当前歌曲的索引号
      let nowIndex = this.playingList.findIndex(item => this.nowSongDetail.id == item.id)
      let toggleIndex
      switch (nowIndex) {
        case -1:
          //如果当前歌曲是第-1首，则将切换到第一首
          toggleIndex = 0
          break;
        case 0:
          // 如果当前歌曲是第一首，则看type是切换上一首还是下一首，上一首则切换到最后一首，否则切换到下一首
          toggleIndex = type === 0 ? this.playingList.length - 1 : nowIndex + 1 
          break;
        case this.playingList.length - 1:
          //如果当前歌曲是最后一首，则看type是上一首还是下一首，上一首则切换到倒数第二首，下一首则切换到下一首
          toggleIndex = type === 0 ? nowIndex - 1 : 0
          break;
        default:
          //其他情况则照常切换
          toggleIndex = type === 0 ? nowIndex + 1 : nowIndex - 1
          break;
      }
      let toggleSong = this.playingList[toggleIndex]
      this.getSongUrl(toggleSong)
    },
    //单曲循环
    loopPlay(){
      this.$refs.audioplay.loop = true
      this.$refs.audioplay.play()
    },
    //随机播放
    randomPlay(){
      let randomIndex = getRandom(0,this.playingList.length-1)
      this.getSongUrl(this.playingList[randomIndex])
    },
    //获取歌曲url
    getSongUrl(song){
      checkSong(song.id).then(res=>{
        getSongUrl(song.id).then(res=>{
          this.$store.dispatch('saveSongUrl',res.data.data[0].url)
          this.$store.dispatch('saveSongDetail',song)
        })
      })
    },
    //打开歌词展示页
    showDetail(){
      this.$store.dispatch('showSongDetail')
    },
    //喜欢当前歌曲
    likeNowSongBy:throttle(function(){
      if(!this.$store.state.login.isLogin){
        this.$message({
          type: "warning",
					message: "登录后才能收藏",
					showClose: true,
					center: true,
      })
      // return
      }
      // 等到登录功能完成了再来完善。。。。
      //this.islike = true
    },1000),
    //下载当前歌曲
    downloadCurrentMusic:throttle(function(){
      let downloadMusicInfo = {
				url: this.songUrl,
				name: this.nowSongDetail.name + " - " + this.nowSongDetail.ar[0].name,
			};
			this.$store.commit("updateDownloadMusicInfo", downloadMusicInfo);
    },2000),
    //播放音乐
    playingMusic(){
      if(this.playingList.length == 0){
        this.$message({
					message: "播放列表为空",
					type: "warning",
					center: true,
				});
      }else{
        this.$refs.audioplay.currentTime = this.currentSecond
        //判断歌曲是否失效，失效了则从新获取，否则播放
        if(this.songUrl != ""){
          this.$refs.audioplay.play();
        }else{
          getSongUrl(this.nowSongDetail.id).then(res=>{
            this.$store.dispatch('saveSongUrl',res.data.data[0].url)
          })
        }
      }
    },
    //暂停播放
    pauseMusic(){
      this.$refs.audioplay.pause()
    },
    //进度条移动时,计算进度条当前值
    tooltipTimeFuction(val){
      // 当前悬浮时间=现在处于进度条的百分之几*总时长
      this.tooltipTime = formatDuration((val/100)*this.totalSecond)
    },
      //拖动进度条时候触发，len是进度条改变时的回调函数的参数在0-100之间，需要换算成实际时间拖动进度条
    changeSongProgress(len){
      this.songProgress = len
      let currentSecond = Math.ceil((len/100)*this.totalSecond)
      this.$refs.audioplay.currentTime = currentSecond
    },

    //取消静音
    cancelJingyin(){
      this.voiceProgress = this.nowVolume
      this.$refs.audioplay.volume = this.voiceProgress / 100
    },
    //静音
    muteVolume(){
      //先保持当前音量，将来取消静音时候用
      this.nowVolume = this.voiceProgress
      this.voiceProgress = 0
      this.$refs.audioplay.volume = 0
    },
    //改变音量
    changeVoice(len){
      this.voiceProgress = len
      this.setItem("voiceProgress",this.voiceProgress)
      this.$refs.audioplay.volume = this.voiceProgress / 100
    },
    //格式化歌词
    formatLyricF(lyric_str) {
      /*
      歌词形式：
      [00:00.000] 作词 : Charlie Puth/Jacob Kasher Hindlin
      [00:00.360] 作曲 : Charlie Puth/Jacob Kasher Hindlin
      [00:00.720]Memories follow me  left and right
      [00:04.303]I can feel you over here
      */
			// 将歌词字符串 根据换行符 转换为 数组
			let lyric_arr = lyric_str.split("\n");
			// 遍历歌词数组
			for (let i = 0; i < lyric_arr.length; i++) {
				//得到每一行歌词
				let lyric_row = lyric_arr[i];
				//再将每一行歌词根据”]“分隔为时间和歌词,变为每行歌词数组
				let lyric_row_arr = lyric_row.split("]");
				// 通过pop()方法得到每行歌词文本
				let lryic_row_text = lyric_row_arr.pop();
				// 处理每行歌词时间
				lyric_row_arr.forEach((item, index) => {
					let LyricRowObj = {};
          //去掉"[" "]",并且分离出 分钟和秒
					let time_arr = item.substr(1, item.length - 1).split(":"); 
					// 将每行歌词时间转换为秒
					let seconds_row = time_arr[0] * 60 + Math.ceil(time_arr[1]);
					// 将每行歌词时间和文本添加到每行歌词对象中  trim去除首尾空格
					if (lryic_row_text.trim().length !== 0) {
						LyricRowObj.time = seconds_row;
						LyricRowObj.text = lryic_row_text;
						//再将每行歌词对象添加到数组中
						this.formatlyric.push(LyricRowObj);
					}
				});
			}
			// 根据时间对歌词排序
			this.formatlyric.sort((a, b) => {
				return a.time - b.time;
			});
		},
    //获取歌词
    getNowLyricBy(songId){
      getNowLyric(songId).then(res => {
        if(res.data.nolyric) return
        let lyric = res.data.lrc.lyric
        this.formatLyricF(lyric)
      })
    },
    //悬浮歌词显示
    showFloatLyric(){
      if (Object.keys(this.nowSongDetail).length != 0) {
			this.getNowLyricBy(this.nowSongDetail.id);
		}
      this.$store.dispatch("saveCurrentLyric",this.formatlyric)
      this.$store.commit("showFloatLyric")
      // this.$store.commit("saveCurrentLyric",this.isPlaying)
    }
    },
    
    watch: {
      
		playingList() {
			// 清空播放列表时重置歌曲进度条和总时长
			if (this.playingList.length == 0) {
				this.removeItem("songProgress");
				this.songProgress = 0;
				this.removeItem("totalTime");
				this.totalTime = "00:00";
			}
		},
	},
}
</script>

<style lang="less" scoped>
  .footer{
    // word-wrap: 100%;
    width: 100%;
    position: fixed;
    height: 70px;
    bottom: 0;
    z-index: 999;
    background: #f8f8ff;
    border-top: 1px solid #dddddd;
  }
  
    .player{
      display: flex;
      align-items: center;
      width: 98%;
      height: 100%;
      margin: 0 auto;
      //左边样式
      .left-music-content{
        width: 15%;

        .music-cover{
          display: flex;
          align-items: center;

          .music{
          position: relative;
          width: 60px;
          img {
					width: 100%;
				}
				.icon-xiangshangjiantou,
				.icon-down-arrow {
					font-size: 22px;
					color: #fff;
					font-weight: 700;
				}
				.icon-yinleyanzou {
					font-size: 34px;
					color: var(--themeColor);
				}
        }

        .songname {
          width: 100px;
				margin-left: 10px;
				p {
					width: 100px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
      .like-song{
        .icon-xihuan{
          font-weight: 700;
        font-size: 18px;
        &:hover{
          color: var(--themeColor);
        }
        }
        .icon-xihuan2{
          font-weight: 700;
          font-size: 18px;
          color: var(--themeColor);
        }
      }
      .download{
        padding-left: 10px;
        .icon-xiazai{
          font-size: 18px;
          font-weight: 700;
          &:hover{
            color: var(--themeColor);
          }
        }
      }
    }

       
      }
      //中间播放按钮样式
      .center-player-song{
        flex:1;
        display: flex;
        margin-left: 20px;
        
        .center-main-box{
        display: flex;
        align-items: center;
			  justify-content: center;
			  width: 15%;
        .change-box , .play-box{
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          background: var(--themeRgba);
          border-radius: 50%;
        }
        .change-box{
          width: 30px;
          height: 30px;
          margin: 0 5px;
        }
        .play-box{
          width: 45px;
          height: 45px;
          margin: 0 5px;
        }
        .icon-shangyiqu , .icon-xiayiqu {
				font-size: 18px;
			}
			.icon-play , .icon-pause {
				font-size: 22px;
			}
    }
    //进度条
    .song-progress{
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      height: 70px;
      span{
        padding: 0 10px;
      }
      .progress{
        width: 100%;
      }
    }
    }
    //播放模式
    .playmodel{
      display: flex;
      width: 8%;
      justify-content: center;
      align-items: center;
      span{
        width: 25px;
        margin: 0 5px;
        &:hover{
          color: var(--themeColor);
        }
      }
      .icon-orderplay,
      .icon-random{
        font-size: 18px;
        font-weight: 700;
      }
      .icon-danqu,
      .icon-cibiaoquanyi{
        font-weight: 700;
      }
    }
    //右侧声音控制
    .right-voice{
      display: flex;
      justify-content: center;
      align-items: flex-end;
      width: 15%;
    .icon-laba,
		.icon-jingyin {
			font-size: 20px;
			font-weight: 700;
			padding-right: 10px;
		}
    .icon-songplaylist {
			font-size: 18px;
			padding-left: 10px;
		}
		.vprogress {
			width: 60%;
      padding-bottom: 8px;
		}
		span {
			cursor: pointer;
			&:hover {
				color: var(--themeColor);
			}
		}
    }
    }

    // 播放列表动画
    // 进入的起点和离开的终点
    .playlist-enter,
    .playlist-leave-to {
    	transform: translateX(100%);
    }
    //动画进入和离开时激活的样式
    .playlist-enter-active,
    .playlist-leave-active {
    	transition: all 0.6s;
    }
    // 进入的终点
    .playlist-enter-to {
    	transform: translateX(0);
    }
</style>
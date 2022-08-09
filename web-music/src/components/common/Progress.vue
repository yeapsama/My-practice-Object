<template>
  <div class="progress">
      <div class="progressbox" ref="progressBox" @mousemove="setTooltip" @mouseleave="mouseLeave" @click="changeProgressBar">
        <!-- 已播放的进度条 -->
        <div class="progress-bar" ref="progressBar"></div>
        <!-- 上方气泡显示时间 -->
        <div class="tool-tip" ref="toolTip" v-show="isShowToolTip">
          <span>{{formatToolTip.isFormatTooltip?formatToolTip.tooltipTxt:length}}</span>
          <!-- 气泡下面的小三角 -->
          <div class="sanjiao"></div>
        </div>
        <!-- 播放时候的进度条动效 -->
        <div class="hover-bar" ref="hoverBar"></div>
      </div>
      <transition name="el-fade-in-linear">
      <div class="radius-btn" ref="radiusBtn" v-show="isMouseover" @mouseover="isMouseover=true" @mouseleave="isMouseover=false" @mousedown="dragProgress"></div>
      </transition>
  </div>
</template>

<script>
export default {
    name:"Progress",
    data() {
      return {
      progressBoxWidth: 0, //进度条总宽度
			progressBoxLeft: "", //进度条距左边距离
			length: 0, //进度条百分比数值
			isMouseover: false, //鼠标是否经过进度条
			isShowToolTip: false, //是否显示tooltip
			isDrag: false, //是否正在拖拽
      }
    },
    props:{
      //进度条进程
      progress:{
        type:Number,
        default:0,
        // 声明是否必须
        require:true
      },
      //
      disabled:{
      type: Boolean,
			default: false,
      },
      formatToolTip:{
        type:Object,
        default(){
          return {
            isFormatTooltip: false,
					  tooltipTxt: "",
          }
        }
      }
    },
    mounted(){
      //getBoundingClientRect()获取元素位置，这个方法没有参数
		//该函数返回一个Object对象，该对象有6个属性：top,lef,right,bottom,width,height
		/*
			rectObject.top：元素上边到视窗上边的距离;
			rectObject.right：元素右边到视窗左边的距离;
			rectObject.bottom：元素下边到视窗上边的距离;
			rectObject.left：元素左边到视窗左边的距离;
			rectObject.width：是元素自身的宽
			rectObject.height是元素自身的高
		*/ 
      this.progressBoxWidth = this.$refs.progressBox.getBoundingClientRect().width; //进度条总宽度
		  this.progressBoxLeft = this.$refs.progressBox.getBoundingClientRect().left; //进度条距左边距离
		  this.setProgressBar(this.progress);
		  this.setHoverBar();
    },
    methods:{
      // 设置进度条和小圆点的位置
      setProgressBar(len){
        this.$refs.progressBar.style.width = len + "%"
        this.$refs.radiusBtn.style.left = len + "%"
      },
      //设置小圆点出现和消失的动效
      setHoverBar(){
      this.$refs.hoverBar.style.opacity = "0";
			this.$refs.hoverBar.style.transition = "all 1s ease-out";
			this.$refs.hoverBar.style.width = this.percent + "%";
			setTimeout(() => {
				this.$refs.hoverBar.style.transition = "none";
				this.$refs.hoverBar.style.width = 0;
				this.$refs.hoverBar.style.opacity = "1";
			}, 500);
      },
      //获取鼠标在进度条上的位置并返回一个百分比
      getMousePosition(e){
        let mousePosition = e.clientX - this.progressBoxLeft
        // console.log("e.clientX",e.clientX,"mousePosition",mousePosition,"progressBoxWidth",this.progressBoxWidth);
        if(mousePosition<=0){
          mousePosition = 0
        }else if(mousePosition>this.progressBoxWidth){
          mousePosition = this.progressBoxWidth
        }
        let precentData = Math.ceil((mousePosition*100)/this.progressBoxWidth)
        return precentData
      },
      //鼠标移动时更新悬浮框位置并且设置百分比
      setTooltip(e){
        if(this.disabled){
          this.$refs.progressBox.style.cursor = "non-allowed"
          return
        }
        this.$refs.progressBox.style.cursor = "pointer"
        this.isMouseover = true
        this.isShowToolTip = true
        let percentLength = this.getMousePosition(e);
			  this.$refs.toolTip.style.left = percentLength + "%";
			  this.$emit("onMove", percentLength);
			  this.length = percentLength;

      },
      mouseLeave(){
        this.isShowToolTip = false
        this.isMouseover = false
      },
      //点击进度条的时候改变已播放时长
      changeProgressBar(e){
        if(this.disabled) return
        let percentLength = this.getMousePosition(e)
        this.setProgressPosition(percentLength)
        this.$emit("onChange",percentLength)
      },
      //改变进度条位置
      setProgressPosition(len){
        this.$refs.progressBar.style.width = len + "%"
        this.$refs.radiusBtn.style.left = len + "%"
      },
      //拖拽进度条时候触发的事件
      dragProgress(){
        let move = e =>{
          //将拖拽设置为真，然后将圆点和已播放进度条的过渡动画设为none
          this.isDrag = true
          this.$refs.progressBar.style.transition = "none"
          this.$refs.radiusBtn.style.transition = "none"
          //获取鼠标位置，然后设置当前的时间气泡和已播放进度条为当前时间
          let precentLen = this.getMousePosition(e)
          this.setTooltip(e)
          this.setProgressBar(precentLen)
        }
        document.addEventListener("mousemove",move)

        let up = e =>{
          //拖拽信号为镇，然后改变进度条播放信息等，将过渡动画设置回来，并且用mouseLeave将圆点和提示隐藏，解绑自身
          this.isDrag = false
          document.removeEventListener("mousemove",move)
          this.changeProgressBar(e)
          this.$refs.progressBar.style.transition = "all .3s ease-out"
          this.$refs.radiusBtn.style.transition = "all .3s ease-out"
          this.mouseLeave()
          document.removeEventListener("mouseup",up)
        }
        document.addEventListener("mouseup",up)
      }
    },
    watch:{
      progress(){
        //监听歌曲播放位置，然后实时更新
        if(!this.isDrag){
          this.setProgressBar(this.progress)
          this.setHoverBar()
        }
      }
    }
}
</script>

<style lang="less" scoped>
  .progress{
    position: relative;

    .progressbox{
      position: relative;
      width: 100%;
      height: 8px;
      background-color: #eee;
      border-radius: 4px;
      cursor: pointer;
      z-index: 0;

      .progress-bar{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 4px;
        background-color: var(--themeColor);
        z-index: 1;
        width: 0;
        transition: all .3s ease-out;
      }
      .tool-tip{
        position: absolute;
		    top: -30px;
		    transform: translateX(-20px);
		    background-color: #303133;
		    color: #fff;
		    font-size: 12px;
		    padding: 5px 6px;
	    	border-radius: 4px;
		    z-index: 2;
        .sanjiao{
          position: absolute;
          bottom: -12px;
          right: 50%;
          transform: translateX(50%);
          width: 0;
          height: 0;
          border: 8px solid;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: transparent;
          border-top-color: #303133;
        }
      }
      .hover-bar{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,.25);
        border-radius: 4px;
        z-index: 2;
      }
    }

  }
    .radius-btn {
	position: absolute;
	top: -50%;
	left: 0;
	transform: translateX(-10px);
	width: 15px;
	height: 15px;
	border-radius: 50%;
	border: 2px solid var(--themeColor);
	background: #fff;
	z-index: 3;
	transition: all 0.3s ease-out;
	&:hover {
		width: 18px;
		height: 18px;
		top: -60%;
		cursor: grab;
	}
  }
</style>
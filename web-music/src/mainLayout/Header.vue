<template>
  <div class="header">
    <!-- 标题 -->
    <div class="title">
      <div class="icon"><span class="iconfont icon-yinleyanzou"></span></div>
      <div class="text"><span>WebMusic</span></div>
    </div>
    <!-- 前后按钮 -->
    <div class="operation">
      <span class="iconfont icon-shangyiye" @click="goBack"></span>
      <span class="iconfont icon-xiayiye" @click="goForward"></span>
    </div>
    <!-- 搜索框 -->
    <div class="search">
      <searchInput/>
    </div>
    <!-- 登录 -->
    <div class="login"></div>
    <!-- 皮肤 -->
    <div class="theme">
        <!-- trigger属性用于设置何时触发 Popover，支持四种触发方式：hover，click，focus 和 manual。
        对于触发 Popover 的元素，有两种写法：使用 slot="reference" 的具名插槽，或使用自定义指令v-popover指向 Popover 的索引ref -->
      <span class="iconfont icon-pifu" v-popover:theme slot="reference"></span>
      <el-popover ref="theme" placement="bottom" width="150" trigger="click">
        <theme-picker></theme-picker>
      </el-popover>
    </div>
    <!-- 全屏 -->
    <div class="full">
      <span
        class="iconfont icon-quanping"
        @click="full"
        v-if="!isFull"
        title="全屏"
      ></span>
      <span
        class="iconfont icon-cancel-full-screen"
        @click="exitFull"
        v-if="isFull"
        title="退出全屏"
      ></span>
    </div>
  </div>
</template>

<script>
import searchInput from '../components/common/searchInput.vue'
import themePicker from '@/components/common/themePicker'
import {requestFullScreen,exitFullscreen,isFullscreen} from '../utils/utils'
import ThemePicker from '../components/common/themePicker.vue';
export default {
  name: "Header",
  data() {
      return {
          isFull: false,
      }
  },
  components:{
      searchInput,
      themePicker,
    ThemePicker
  },
  mounted() {
    // onreset当浏览器被重置大小时执行Javascript代码
    window.onreset = ()=>{
      if(!isFullscreen){
        this.isFull = false
      }
    }
  },
  methods:{
    //   后退
      goBack(){
        this.$router.go(-1)
      },
    //   前进
      goForward(){
        this.$router.go(1)
      },
    //   全屏
      full(){
        requestFullScreen()
        this.isFull = true
      },
    //   退出全屏
      exitFull(){
        exitFullscreen()
        this.isFull = false
      }
  }
};
</script>

<style lang="less" scoped>
.header {
  background-color: var(--themeColor);
  width: 100%;
  height: 60px;
  position: relative;
  align-items: center;
  display: flex;
  z-index: 99;
  //   标题
  .title {
    flex: 2;
    display: flex;
    height: 60px;
    align-items: center;
    margin-left: 10px;
    .icon {
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      .icon-yinleyanzou {
        color: #fff;
        font-size: 34px;
        font-weight: 700;
      }
    }
    .text {
      font-size: 22px;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 60px;
    }
  }
  //   前后按键样式
  .operation {
    flex: 1;
    display: flex;
    justify-content: space-around;
    margin-left: 30px;
    color: #fff;
    span {
      display: block;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: rgba(105, 105, 105, 0.1);
      border-radius: 50%;
      cursor: pointer;
    }
  }
  //   搜索框样式
  .search {
    flex: 2;
  }
//   登录样式
  .login {
    flex: 12;
    display: flex;
    justify-content: flex-end;
    align-content: center;
  }
    // 皮肤样式
    .theme{
        padding-right: 15px;
		color: #fff;
		cursor: pointer;
    }
    // 全屏样式
    .full {
		padding-right: 20px;
		color: #fff;
		cursor: pointer;
	}
}
</style>
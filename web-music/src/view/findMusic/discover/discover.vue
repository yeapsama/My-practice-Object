<template>
  <div class="discover">
    <!-- 轮播图 -->
    <Banner :bannerUrl="banner" />
     <!-- 推荐歌单 -->
    <RecommendMusic :recList="recommendList"/>
    <!-- 最新MV -->
    <newMV :newmv="newmv"/>
    <!-- 最新音乐 -->
    <new-song :newsong="newsong"/>
    <!-- 独家放送 -->
    <Privatecontent :privatecontent="privatecontent"/>
  </div>
</template>

<script>
import { getBanner , getCommendByNotLogin , getNewMV , getNewMusic , getPrivateContent as getPrivate} from 'axiosReq/discoverReq/discoverReq.js'
import Banner from './childComponents/banner.vue'
import RecommendMusic from './childComponents/recommendMusic'
import newMV from './childComponents/newMV'
import NewSong from './childComponents/newSong.vue'
import Privatecontent from './childComponents/Privatecontent.vue'
export default {
    name:'Discover',
    data() {
      return {
        //轮播图图片
        banner:[],
        //推荐歌单相关信息
        recommendList:[],
        //独家放送
        privatecontent: [], 
        //每日推荐新音乐
			  newsong: [], 
        //最新MV
			  newmv: [],
      }
    },
    components:{
        Banner,
        RecommendMusic,
        newMV,
        NewSong,
        Privatecontent,
    },
    created(){
      getBanner().then(res =>{
        this.banner = res.data.banners
      })
      //获取推荐歌单
      this.getRecCommend();
  },
  methods:{
    //获取推荐歌单
    getRecCommend(){
      getCommendByNotLogin(18).then(res =>{
        this.recommendList = res.data.result;
      })
      this.getRecOther()
    },
    getRecOther(){
      //获取最新MV
      getNewMV().then(res =>{
        this.newmv = res.data.result
      })
      //获取每日推荐新音乐
      getNewMusic(15).then(res =>{
        this.newsong = res.data.result
      })
      //获取独家放送内容
      getPrivate().then(res=>{
        this.privatecontent = res.data.result
      })
    }
  },
}
</script>

<style>

</style>
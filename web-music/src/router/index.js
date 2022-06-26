import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
    /* 搜索详情*/
    
    // 重定向
    {
        path:'/',
        redirect:'/findmusic'
    },
    // 发现音乐
    {
        path:'/findmusic',
        component:()=>import('../view/findMusic/findMusic.vue'),
        name:'findMusic',
        redirect: "/findmusic/discover",
        children:[
            // 个性推荐
            {
                path:'/findmusic/discover',
                name:'Discover',
                component:()=>import('../view/findMusic/discover/discover.vue')
            },
            // 最新音乐
            {
                path:'/findmusic/newsongs',
                name:'NewSongs',
                component:()=>import('../view/findMusic/newsongs/newSongs.vue')
            },
            // 歌单
            {
                path:'/findmusic/recsonglist',
                name:'recSongList',
                component:()=>import('../view/findMusic/recsongList/recSongList.vue')
            },
            // 歌手
            {
                path:'/findmusic/singer',
                name:'Singer',
                component:()=>import('../view/findMusic/singer/singer.vue')
            },
            // 排行榜
            {
                path:'/findmusic/songrank',
                name:'SongRank',
                component:()=>import('../view/findMusic/songrank/songRank.vue')
            }
        ]
        
    },
    //推荐视频
    {
        path:'/recvideo',
        component:()=>import('../view/recvideo/recvideo.vue'),
        name:'recVideo'
    },
    //每日推荐
    {
        path:'/receveryday',
        component:()=>import('../view/recEveryday/recEveryday.vue'),
        name:'recEveryday'
    },
    {
        path:'/myfavorite',
        component:()=>import('../view/myFavorite/myFavorite.vue'),
        name:'myFavorite'
    }
]

const router = new VueRouter({
    mode:"hash",
    routes
})

export default router
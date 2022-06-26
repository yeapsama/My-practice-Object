<template>
  <div class="banner">
      <el-carousel :interval="5000" arrow="always" type="card" height="220px">
        <el-carousel-item v-for="(item, index) in bannerUrl" :key="index">
                <img :src="item.imageUrl">
                <div class="title">{{ item.typeTitle }}</div>
        </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
// import {getSongUrl} from "axiosReq/playmusic/playmusic.js"
export default {
    name:'Banner',
    props:{
        bannerUrl:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        getSongDetail(){
            console.log(111);
        }
    }
}
</script>

<style lang="less" scoped>
.banner{
    position: relative;
    img{
        width: 100%;
    }
}
.title {
	position: absolute;
	right: 0;
	bottom: 0;
	padding: 3px 8px;
	color: #fff;
	font-size: 12px;
	background: var(--themeColor);
}
</style>
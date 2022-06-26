<template>
  <div class="recmusic" v-if="recList.lenght!=0">
      <div class="hd">
          <el-divider content-position="left"><h2>推荐歌单</h2></el-divider>
      </div>
      
      <div class="bd">
          <songList :songList="recList"/>
      </div>
  </div>
</template>

<script>
import songList from '@/components/content/songList/songList.vue'
export default {
    name:'recommendMusic',
    components:{
        songList
    },
    props:{
        recList:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>

</style>
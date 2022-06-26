<template>
  <div class="video-list">
      <videoListItem v-for="(item, index) in newmv" :key="item.id" :newMVItem="item"/>
  </div>
</template>

<script>
import videoListItem from '@/components/content/videoList/videoListItem'
export default {
    name:"videoList",
    components:{
        videoListItem
    },
    props:{
        newmv:{
            type:Array,
            default(){
                return []
            }
        }
    },
}
</script>

<style  lang="less" scoped>
.video-list{
    display: grid;
    justify-content: space-between;
    grid-template-rows: repeat(10 , auto-fill);
    grid-template-columns: repeat(4, 24%);
}
</style>
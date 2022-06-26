<template>
  <div class="songlist">
      <songListItem v-for="(item,index) in songList" :key="item.id" :songList="item"></songListItem>
      
  </div>
</template>

<script>
import songListItem from '@/components/content/songList/songListItem'
export default {
    name:'songList',
    components:{
        songListItem
    },
    props:{
        songList:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style lang="less" scoped>
.songlist{
    display: grid;
    justify-content: space-between;
    align-content: space-between;
    // 设置grid网格的行和列属性，repeat为综合属性，repeat（有几行/列，每行/列占容器的大小）
    grid-template-rows: repeat(8, auto-fill);
	grid-template-columns: repeat(6, 15%);
}
</style>
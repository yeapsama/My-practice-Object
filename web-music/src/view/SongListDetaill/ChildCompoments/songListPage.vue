<template>
  <div class="song-list-page">
        <SongTable :songs="songList" @updateSonglist="updateSonglist"/>
  	    <Pagination :total="songListCount" :page-size="48" @handleCurrentChange="clickChangePage"/>



  </div>
</template>

<script>
import SongTable from "@/components/content/SongTable.vue";
import Pagination from '@/components/common/Pagination'

export default{
name:"songListPage",
components:{
    SongTable,Pagination
},
props:{
    songList:{
        type: Array,
        default:[]
    },
    songListCount:{
        type: Number,
        default:0
    }
},
methods:{
    handleCurrentChange(page) {
			this.$emit("handlePage", page);
		},
}

}
</script>

<style lang="less" scoped>




</style>

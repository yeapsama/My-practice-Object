<template>
  <div class="newmv" v-if="newmv.length !== 0">
      	<div class="hd">
			<el-divider content-position="left"><h2>最新MV</h2></el-divider>
		</div>
        <div class="bd">
            <videoList :newmv="newmv"/>
        </div>
  </div>
</template>

<script>
import videoList from '@/components/content/videoList/videoList'
export default {
    name:'newMV',
    components:{
        videoList,
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

<style lang="less" scoped>

</style>
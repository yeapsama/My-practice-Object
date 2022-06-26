<template>
  <div>

    <TypeNav/>
    <ListContenter/>
    <Comment/>
    <GoodRank/>
    <PLike/>
    <Floor v-for="(item,index) in floorListData" :key="item.id" :list="item"/>
    <Brand/>
  </div>

</template>

<script>
import ListContenter from "./ListContenter.vue"
import Comment from "./Comment.vue"
import GoodRank from "./GoodRank.vue"
import PLike from "./PLike.vue"
import Floor from "./Floor.vue"
import Brand from "./Brand.vue"

import {mapState} from 'vuex'
export default {
 name:"Home",

 components:{
   ListContenter,
   Comment,
   GoodRank,
   PLike,
   Floor,
   Brand,
 },
 mounted(){
   this.$store.dispatch("getFloorList");

 },
 computed:{
   ...mapState({
     floorListData: state => state.home.floorListData
   })
 }
}
</script>

<style>

</style>
<template>
  <div class="tab-bar">
      <div class="tab-item" v-for="(item,index) in tabItem" :key="index" :class="{active:currentIndex == index}" @click="switchTab(index)">
        {{item.name}}
      </div>
  </div>
</template>

<script>
export default {
    name:"tabBar",
    props:{
          tabItem:{
              type:Array,
              default(){
                  return []
              }
          }
    },
    data() {
        return {
            //当前的下标
            currentIndex:0
        }
    },
    methods:{
        switchTab(index){
            this.currentIndex = index
            this.$emit("switchTab",index)
        }
    }
}
</script>

<style lang="less" scoped>
    .tab-bar{
        display: flex;
        justify-content: center;
        cursor: pointer;
        .tab-item{
            border: solid 1px #ddd;
            padding:5px 25px;
        }
        .tab-item:nth-child(1){
            border-right: 0px;
        }
        .active{
            background: #ccc;
            color: #fff;
        }
    }
</style>
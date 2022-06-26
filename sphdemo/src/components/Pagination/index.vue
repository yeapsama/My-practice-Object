<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNum',pageNo-1)">上一页</button> 
    <button v-if="startNumAndendNum.start>1" @click="$emit('getPageNum',1)">1</button>
    <button v-if="startNumAndendNum.start>2" disabled="false">···</button>
    <!-- 中间 -->
    <button v-for="(page,index) in startNumAndendNum.end" 
    :key="index" v-if="page>=startNumAndendNum.start" 
    @click="$emit('getPageNum',page)"
    :class="{active:pageNo == page}">{{page}}</button>
    
    <button v-if="startNumAndendNum.end<totalPage-1" disabled="false">···</button>
    <button v-if="startNumAndendNum.end<totalPage" @click="$emit('getPageNum',totalPage)">{{totalPage}}</button>
    <button :disabled ="pageNo === totalPage" @click="$emit('getPageNum',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{totalData}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    //pageNo当前第几页，pageSize一页有多少数据，totalData总共有多少条数据，continues连续页数是多少
    props:['pageNo','pageSize','totalData','continues'],
    computed:{
        //总页数
        totalPage(){
            // 向上取整
            return Math.ceil(this.totalData/this.pageSize)
        },
        
        startNumAndendNum(){
            // 解构赋值，这样就可以少打this
            const {pageNo,continues,totalPage} = this;
            let start = 0 , end = 0;
            //两种情况：1.连续页数大于总页数时；2.正常情况
            if(continues > totalPage){
                start = 1;
                end = totalPage
            }else{
                start =pageNo - Math.floor(continues/2);
                end = pageNo + Math.floor(continues/2);

                if(start<1){
                    start = 1;
                    end = continues;
                }else if(end > totalPage){
                    start = totalPage - continues + 1;
                    end = totalPage;
                }
            }
            return {start,end}
        }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
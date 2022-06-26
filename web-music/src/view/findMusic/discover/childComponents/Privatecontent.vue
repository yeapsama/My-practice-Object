<template>
  <div class="private-content">
      <div class="hd">
			<el-divider content-position="left"><h2>独家放送</h2></el-divider>
		</div>
        <div class="bd">
            <div class="item" v-for="(item, index) in privatecontent" :key="index" @click="videoItemClick(item.id)">
				<div class="item-img">
					<img :src="item.sPicUrl" alt="" />
					<div class="icon">
						<span class="iconfont icon-play-square"></span>
					</div>
				</div>
				<div class="item-text">
					{{ item.name }}
				</div>
			</div>
        </div>
  </div>
</template>

<script>
export default {
    name:'Privatecontent',
    props:{
        privatecontent:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        videoItemClick(id){
            // this.$route.push({ name: "VideoDetail", params: { id, type: "mv" } })
            console.log(111);
        }
    }
}
</script>

<style lang="less" scoped>
.private-content{
    .bd{
        display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 100%;
        .item{
            width: 30%;
            .item-img{
                position: relative;
                img{
                    width: 100%;
                }
                .icon{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    .iconfont{
                        font-size: 38px;
                        color: #FFF;
                    }
                }
            }
            .item-text{
                padding-top: 5px;
				font-size: 14px;
            }
        }
    }
}
</style>
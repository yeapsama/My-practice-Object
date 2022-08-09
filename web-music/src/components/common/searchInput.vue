<template>
  <div class="search-input">
    <el-input
      placeholder="请输入内容"
      size="small"
      v-model.trim="searchWord"
      v-popover:popover
      slot="reference"
      @keyup.enter.native="search"
    >
      <span slot="suffix" class="el-icon-search" @click="search"></span>
    </el-input>
    <el-popover ref="popover" placement="bottom" width="350" trigger="focus">
      <div class="list">
        <!-- 历史记录部分 -->
        <div class="history" v-if="historySearch.length != 0">
          <div class="historyhead">
            <h3>搜索历史</h3>
            <span @click="deleteAll" class="iconfont icon-delete">清空</span>
          </div>

          <div class="historybody">
            <div
              class="historyitem"
              v-for="(item, index) in historySearch"
              :key="index"
              @mouseover="showClear(index)"
              @mouseleave="clearIcon = false"
              @click="toHotWord(item)"
            >
              <span class="icon"></span>
              <span class="txt">{{ item }}</span>
              <span class="icon"
                ><i
                  class="iconfont icon-guanbi"
                  v-if="clearIcon && historySearchIndex == index"
                  @click.stop="deleteHistory(index)"
                ></i
              ></span>
            </div>
          </div>
        </div>

        <!-- 搜索榜单部分 -->
        <div class="hot-search-rank">
          <h3>热搜榜</h3>
          <ul>
            <li
              v-for="(item, index) in searchList"
              :key="index"
              @click="toHotWord(item.searchWord)"
            >
              <!-- 排名 -->
              <div class="paiming" :class="index < 3 ? 'hotword-num' : ''">
                {{ index + 1 }}
              </div>
              <!-- 热搜内容 -->
              <div class="main-content">
                <div class="word">
                  <span :class="index < 3 ? 'hotword' : ''">
                    {{ item.searchWord }}
                  </span>
                  <span class="by">{{ item.score }}</span>
                  <span class="icon" v-if="item.iconUrl">
                    <img :src="item.iconUrl" alt="" />
                  </span>
                </div>
                <p class="by" v-if="item.content">{{ item.content }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { getSearchHotWord } from "axiosReq/searchDetail.js";
export default {
  name: "searchInput",
  data() {
    return {
      searchWord: "",
      searchList: [],
      //搜索历史
      historySearch: this.getItem("historySearch")
        ? this.getItem("historySearch")
        : [],
      //删除搜索历史的叉叉是否显示
      clearIcon: false,
    };
  },
  created() {
    getSearchHotWord().then((res) => {
      this.searchList = res.data.data;
    });
  },
  methods: {
    //搜索方法
    search() {
      if (this.searchWord == "") {
        this.$message({
          showClose: true,
          message: "请输入内容",
          type: "warning",
          center: true,
        });
      } else {
        this.$router.push("/searchdetail/"+this.searchWord).catch(err=> console.log(err))
        this.$refs.popover.doClose(); //关闭弹框
        this.addHistory(this.searchWord);
        this.searchWord = "";
      }
    },
    //添加历史记录的方法
    addHistory(word) {
      if (!this.historySearch.includes(word)) {
        this.historySearch.push(word);
        this.setItem("historySearch", this.historySearch);
      }
    },
    //鼠标移入显示叉叉方法
    showClear(index) {
      this.clearIcon = true;
      this.historySearchIndex = index;
    },
    //历史记录点击后跳转方法
    toHotWord(word) {
      this.$refs.popover.doClose(); //关闭弹框
			this.searchWord = word;
      // console.log(this.searchWord);
			this.$router.push("/searchdetail/" + this.searchWord).catch(err => err);
			this.addHistory(word);
    },
    //删除选中的历史记录的方法
    deleteHistory(index) {
      this.historySearch.splice(index, 1);
      this.setItem("historySearch", this.historySearch);
    },
    //清空搜索历史方法
    deleteAll() {
      this.removeItem("historySearch");
      this.historySearch = [];
    },
  },
};
</script>

<style lang="less" scoped>
// 输入框内容样式
.search-input {
  position: relative;
  display: flex;
  // align-items: center;
  .el-icon-search {
    cursor: pointer;
    padding-top: 10px;
    &:hover {
      color: var(--themeColor);
      font-weight: 700;
    }
  }
}
.list {
  width: 350px;
  height: 450px;
  overflow-y: scroll;
  h3 {
    padding-left: 6px;
  }
}
// 历史记录部分内容样式
.history {
  padding-top: 5px;
  .historyhead {
    display: flex;
    align-items: center;
    .icon-delete {
      font-size: 13px;
      padding-left: 10px;
      &:hover {
        color: var(--themeColor);
        cursor: pointer;
      }
    }
  }
  .historybody {
    display: flex;
    // wrap 规定灵活的项目在必要的时候拆行或拆列
    flex-wrap: wrap;
    padding: 10px 5px;
    .historyitem {
      margin: 0 0 5px 5px;
      padding: 3px 0;
      font-size: 13px;
      border-radius: 15px;
      border: 1px solid #d3d3d3;
      cursor: pointer;
      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 3px;
      }
      .icon-guanbi {
        font-size: 12px;
        &:hover {
          color: var(--themeColor);
        }
      }
    }
  }
}
//排名内容部分样式
.hot-search-rank {
  cursor: pointer;
  background: #fff;
  li {
    display: flex;
    align-items: center;
    height: 45px;
    .paiming {
      width: 30px;
      padding-left: 5px;
    }
    // 热搜前三排名样式
    .hotword-num {
      color: red;
      font-weight: 700;
    }
    //热搜主要内容样式
    .main-content {
      .word {
        span {
          padding-right: 10px;
          
        }
        .icon {
					display: inline-block;
					width: 30px;
					height: 20px;
					img {
						width: 100%;
					}
				}
      }
      .hotword {
        color: black;
        font-weight: 700;
      }
      p{
        padding-top: 5px;
      }
    }
  }
  li:hover {
		background: rgba(220, 220, 220, 0.4);
	}
}
</style>
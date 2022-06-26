<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="changeLeave" @mouseenter="showEnter">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isshow">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ currentCss: indexCount == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 优化性能，绑定自定义属性方便识别身份，传递信息 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix" v-show="indexCount === index">
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c1.categoryName"
                          :data-category1Id="c1.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c1.categoryName"
                            :data-category1Id="c1.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      indexCount: -1,
      isshow: true,
    };
  },
  mounted() {

    if (this.$route.path != "/home") {
      this.isshow = false;
    }
  },
  computed: {
    ...mapState({
      //对象写法，后面需要跟一个函数，当这个计算属性被使用时候就会调用这个函数，里面的state是大仓库的state
      categoryList: (state) => {
        return state.home.categoryListData;
      },
    }),
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.indexCount = index;
    }, 50),
    changeLeave() {
      this.indexCount = -1;
      //鼠标移出时候隐藏
      if (this.$route.path != "/home") this.isshow = false;
    },
    goSearch(event) {
      let element = event.target;
      //解构赋值，获取节点的自定义属性和属性值,属性名会自动转为小写，要注意！！！
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;

      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        if(this.$route.params){
          location.params = this.$route.params
        }
          location.query = query;
          console.log(location);
          this.$router.push(location);
      }
    },
    showEnter() {
      this.isshow = true;
    },
  },
};
</script>

<style lang="less" scope>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: block;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .currentCss {
          background-color: skyblue;
        }
      }
    }
    //（进入）过渡动画开始时状态
    .sort-enter{
      opacity: 0;
    }
    //（进入）过渡动画结束时状态
    .sort-enter-to{
      // height: 461px;
      opacity: 1;
    }
    .sort-enter-active{
      transition: all .3s linear;
    }
  }
}
</style>
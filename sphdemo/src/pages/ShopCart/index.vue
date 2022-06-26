<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(data, index) in cartInfoList"
          :key="data.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="data.isChecked == 1"
              @change="changeChecked(data,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="data.imgUrl" />
            <div class="item-msg">{{ data.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ data.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('mins', -1, data)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="data.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('input', $event.target.value * 1, data)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('plus', 1, data)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ data.skuPrice * data.skuNum }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(data)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="allChecked" @change="changeAllChecked($event)"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrices }}.00</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//节流
import { throttle } from "lodash";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getShopCartList");
    },
    handler: throttle(function (type, disNum, cart) {
      //type区分点的是加减还是input
      //skunum表示变化量
      //cart表示点的是那个数据
      switch (type) {
        case "mins":
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "input":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            //带给服务器的量，用后来的值 - 原来的值
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      this.$store
        .dispatch("getShopCart", { skuId: cart.skuId, skuNum: disNum })
        .then(
          () => {
            this.getData();
          },
          (error) => {
            console.log(error);
          }
        );
    }, 500),

    //删除购物车
    deleteCartById(cart) {
      this.$store.dispatch("deleteCartListById", cart.skuId).then(
        () => {
          this.getData();
        },
        (error) => {
          alert(error.message);
        }
      );
    },

    //修改某个产品的勾选状态
    changeChecked:throttle(function (cart,event){
      let isChecked = event.target.checked?"1":"0"
      this.$store.dispatch('updateCheckedById',{skuId:cart.skuId,isChecked}).then(()=>{
        this.getData();
      },(error)=>{
          alert(error.message);
      })
    },1000),
    deleteAll(){
      this.$store.dispatch('deleteAllCartItem').then(()=>{
        this.getData();
      },(error)=>{
          alert(error.message);
      })
    },
    //全选功能方法
    changeAllChecked:throttle(function (event){
      let isChecked = event.target.checked?'1':'0';
      this.$store.dispatch('changeAllIsChecked',isChecked).then(()=>{
        this.getData();
      },(error)=>{
          alert(error.message);
      })
      console.log(666);
    },1000)
  },
  computed: {
    // ...mapGetters(['cartInfoList']),
    ...mapGetters(["shopCarList"]),
    cartInfoList() {
      return this.shopCarList.cartInfoList || [];
    },

    //计算总价
    totalPrices() {
      let sum = 0;
      this.cartInfoList.forEach((element) => {
        if (element.isChecked == 1) {
          sum += element.skuNum * element.skuPrice;
        }
      });
      return sum;
    },
    //计算是否全选
    allChecked() {
      if(this.cartInfoList.length>0){
        return this.cartInfoList.every((item) => item.isChecked == 1);
      }else{
        return false
      }
      
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 6%;
        }

        .cart-list-con5 {
          width: 15%;
          padding-left: 60px;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
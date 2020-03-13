<template>
  <div>
    <div class="position-relative position-fixed market">
      <a href="#" @click.prevent="openModel">
        <img src="../assets/images/market.png" class="market-img" width="170" alt />
        <h5>
          <span class="badge badge-danger position-absolute market-num">{{carts.length}}</span>
        </h5>
      </a>
    </div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0" style="background:#ffe694">
          <div class="modal-header bg-dark text-white mb-0">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>已選購商品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-12">
                <table
                  class="font-weight-bolder h6"
                  rules="rows"
                  cellpadding="10"
                  v-if="carts.length !== 0"
                  style="margin:0 auto;"
                >
                  <tbody class="productDetail" v-for="item in carts" :key="item.id" @click.prevent="getProductDetail(item.product.id)">
                    <tr>
                      <td style="width:20%; padding:0.3rem" class="d-none d-sm-table-cell">
                        <img
                          :src="item.product.imageUrl"
                          class="img-fluid"
                          style="min-width:50px"
                          :alt="item.product.title"
                        />
                      </td>
                      <td class="text-center">
                        <p class="d-block mb-0">{{item.product.title}}</p>
                        <div class="badge badge-success" v-if="item.coupon">已套用優惠</div>
                      </td>
                      <td class="text-center d-none d-lg-table-cell">
                        <div class="input-group">
                          {{item.qty}}
                        </div>
                      </td>
                      <td class="d-lg-none">
                        <div class="input-group mb-3" id="inputGroupSelect">
                          <select
                            class="custom-select select-text-center"
                            v-model="item.qty"
                            @change="changeQty(item.qty,item.product.id,item.id)"
                          >
                            <option class="select_style" selected disabled>數量</option>
                            <option
                              :value="num"
                              class="select_style"
                              v-for="num in 10"
                              :key="num"
                            >{{num}} {{item.unit}}</option>
                          </select>
                        </div>
                      </td>
                      <td class="text-right" v-if="item.coupon">
                        <del class>{{item.total|currency}}</del>
                        <p class="mb-0 text-danger">{{item.final_total|currency}}</p>
                      </td>
                      <td class="text-right" v-else>{{item.total|currency}}</td>
                    </tr>
                  </tbody>
                </table>
                <h5 v-else-if="carts.length === 0">
                  購物車沒有商品喔，趕快去
                  <a href="#" class="text-light font-weight-bold">商城</a>逛逛!!
                </h5>
              </div>
            </div>
          </div>
          <div class="modal-footer" style="border-top:0;">
            <a href="#" type="button" class="btn btn-primary btn-light w-100 mt-0 text-warning" @click.prevent="goPay">結帳去</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      carts: []
    };
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.$bus.$on('updateCart', function(){
      vm.addMessage();
    });
  },
  beforeDestroy: function() {
    this.$bus.$off('updateCart');
  },
  methods: {
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        vm.carts = response.data.data.carts;
      });
    },
    addMessage() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        vm.carts = response.data.data.carts;
        vm.$bus.$emit('message:push', "已加入購物車", "warning");
      });
    },
    openModel() {
      $("#productModal").modal("show");
    },
    goPay() {
      const vm = this;
      $("#productModal").modal("hide");
      vm.$router.push("/cart");
    },
    getProductDetail(id){
      $("#productModal").modal("hide");
      //this.$router.push(`/detail/${id}`);
      this.$emit('cartUpdateDetail',id);
    },
  }
};
</script>

<style lang="scss">
.market {
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 10;
  .market-img {
    filter: opacity(80%);
  }
  .market-num {
    border-radius: 50%;
    right: 1rem;
    top: 1rem;
  }
  .market-img {
    width: 100px;
    @media (min-width: 568px) {
      width: 170px;
    }
  }
  &:hover {
    filter: opacity(100%);
  }
}
.productDetail{
  cursor:pointer;
  &:hover{
    background: #f9dd79;
  }
}
</style>
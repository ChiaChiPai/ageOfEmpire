<template>
  <div>
    <loading :active.sync="isLoading">
      <template slot="default">
        <img width="400" src="../../assets/images/pageLoading.gif" alt="">
      </template>
    </loading>
    <div class="cart-bg">
      <div class="container" id="cartTop">
        <div class="row justify-content-center py-5" style="border-bottom:2px dashed black">
          <div class="col-sm-4 col-md-3 mt-3 d-flex flex-column align-items-center">
            <img
              src="../../assets/images/fight.gif"
              class="d-none d-lg-block"
              style="width:150px; height:90px"
              alt
            />
            <p class="mb-1 h6">Step 1</p>
            <p class="h4 p-1 bg-dark text-white mb-0" style="border: 4px double black">確認購買</p>
          </div>
          <div class="col-sm-4 col-md-3 mt-3 d-flex flex-column align-items-center">
            <img
              src="../../assets/images/firehouse.png"
              class="d-none d-lg-block"
              style="width:110px; height:90px"
              alt
            />
            <p class="mb-1 h6">Step 2</p>
            <p class="h4 p-1 mb-0" style="border: 4px double black">填寫資料</p>
          </div>
          <div class="col-sm-4 col-md-3 mt-3 d-flex flex-column align-items-center">
            <img
              src="../../assets/images/firehouse.png"
              class="d-none d-lg-block"
              style="width:110px; height:90px"
              alt
            />
            <p class="mb-1 h6">Step 3</p>
            <p class="h4 p-1 mb-0" style="border: 4px double black">完成訂單</p>
          </div>
        </div>
        <div class="pb-5 row flex-md-row">
          <div class="py-5 col-md-8">
            <div class="d-flex justify-content-center">
              <table
                class="font-weight-bolder h6"
                style="border-top:4px double rgb(70, 39, 5) ;"
                rules="rows"
                cellpadding="10"
                v-if="carts.length !== 0"
              >
                <thead class="text-white bg-dark" style="border-bottom: 4px double rgb(70, 39, 5);">
                  <th width="35"></th>
                  <th class="d-none d-lg-table-cell" width="100"></th>
                  <th class="text-center" width="200">品名</th>
                  <th class="text-center d-none d-lg-table-cell" width="140">數量</th>
                  <th class="text-center d-lg-none" width="110">數量</th>
                  <th class="text-center" width="100">價錢</th>
                </thead>
                <tbody v-for="(item,key) in carts"
                :key="item.id">
                  <tr>
                    <td class="text-center">
                      <a href="#" class="text-dark btn" @click.prevent="deleteCart(item.id)" style="padding:0">
                        <i class="far fa-trash-alt h5"></i>
                      </a>
                    </td>
                    <td style="width:20%; padding:0.3rem" class="d-none d-lg-table-cell" >
                      <img
                        :src="item.product.imageUrl"
                        class="img-fluid"
                        style="min-width:100px"
                        :alt="item.product.title"
                      />
                    </td>
                    <td class="text-center">
                      <p class="d-block mb-0">{{item.product.title}}</p>
                      <div class="badge badge-success" v-if="item.coupon">已套用優惠</div>
                    </td>
                    <td class="text-center d-none d-lg-table-cell">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button type="button" class="btn btn-light" style=" border-radius:0" @click="changeQty(item.qty-1,item.product.id,item.id,key)">-</button>
                        </div>
                        <input type="text" class="form-control text-center border-light" v-model="item.qty" disabled>
                        <div class="input-group-append">
                          <button type="button" class="btn btn-light" style="border-radius:0" @click="changeQty(item.qty+1,item.product.id,item.id,key)">+</button>
                        </div>
                      </div>
                    </td>
                    <td class="d-lg-none">
                      <div class="input-group mb-3" id="inputGroupSelect">
                        <select class="custom-select select-text-center" v-model="item.qty" @change="changeQty(item.qty,item.product.id,item.id,key)">
                          <option class="select_style" selected disabled>數量</option>
                          <option :value="num" class="select_style" v-for="num in 10" :key="num">{{num}} {{item.unit}}</option>
                        </select>
                      </div>
                    </td>
                    <td class="text-right" v-if="item.coupon">
                      <del class="">{{item.total|currency}}</del>
                      <p class="mb-0 text-danger">{{item.final_total|currency}}</p>
                    </td>
                    <td class="text-right" v-else>
                      {{item.total|currency}}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h5 v-else-if="carts.length === 0">購物車沒有商品喔，趕快去<a href="#" class="text-light font-weight-bold"> 商城 </a>逛逛!!</h5>
            </div>
          </div>
          <div class="my-5 col-md-4">
            <paymentDetail :childPrice="price"></paymentDetail>
            <div class="input-group input-group-sm mt-3">
              <input type="text" class="form-control couple-input" v-model="couponCode" placeholder="輸入優惠碼 playgame2020 享九折優惠" style="background: rgba(0, 0, 0, 0.13);"/>
              <div class="input-group-append">
                <button class="btn-dark btn" type="button" style="border-radius:0;" @click.prevent="enterCoupon">套用優惠碼</button>
              </div>
            </div>
            <div class="text-center mt-3" v-if="carts.length !== 0">
              <router-link to="cart/customerinfo" class="btn btn-dark btn-lg w-100">下一步</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import paymentDetail from "../../components/paymentDetail"
import $ from "jquery"

export default {
  components:{
    paymentDetail,
  },
  data() {
    return {
      carts: [],
      price: {},
      isLoading: false,
      couponCode: "",
      tempProduct:{},
    };
  },
  created() {
    this.getCart();
    setTimeout(() => {
      var topPositon = $("#cartTop").offset().top;
      $('html, body').animate({scrollTop:topPositon},0);
    }, 10);
  },
  methods: {
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.carts = response.data.data.carts;
        vm.price = response.data.data;
        vm.carts.sort((a,b) =>{
          return b.qty - a.qty
        })
      });
    },
    deleteCart(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(api).then(response => {
        console.log(response);
        vm.isLoading = false;
        this.getCart();
      });
    },
    enterCoupon() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      vm.isLoading = true;
      vm.$http.post(api,{data:{code:vm.couponCode}}).then(response => {
        vm.isLoading = false;
        this.getCart();
      });
    },
    changeQty(qty,itemId,cartId,key){
      const vm = this;
      vm.isLoading = true;
      const deleteApi = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${cartId}`;
      vm.$http.delete(deleteApi).then((response) => {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const cart = {
          product_id:itemId,
          qty:qty,
        };
        vm.$http.post(api,{data: cart}).then((response) => {
          this.getCart();
          vm.isLoading = false;
        });
      });
    }
  }
};
</script>
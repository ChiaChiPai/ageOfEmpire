<template>
  <div>
    <loading :active.sync="isLoading">
      <template slot="default">
        <img width="400" src="../../assets/images/pageLoading.gif" alt="">
      </template>
    </loading>
    <div class="cart-bg">
      <div class="container">
        <!-- step -->
        <div class="row justify-content-center py-5" style="border-bottom:2px dashed black">
          <div class="col-sm-4 col-md-3 mt-3 d-flex flex-column align-items-center">
            <img src="../../assets/images/abond.png" class="d-none d-lg-block" style="width:130px; height:90px" alt="">
            <p class="mb-1 h6">Step 1</p>
            <p class="h4 p-1 mb-0" style="border: 4px double black">確認購買</p>
          </div>
          <div class="col-sm-4 col-md-3 mt-3 d-flex flex-column align-items-center">
            <img src="../../assets/images/abond.png" class="d-none d-lg-block" style="width:130px; height:90px" alt="">
            <p class="mb-1 h6">Step 2</p>
            <p class="h4 p-1 mb-0" style="border: 4px double black">填寫資料</p>
          </div>
          <div class="col-sm-4 col-md-3 mt-3 d-flex flex-column align-items-center">
            <img src="../../assets/images/fight.gif" class="d-none d-lg-block" style="width:150px; height:90px" alt="" v-if="!orderList.is_paid">
            <img src="../../assets/images/abond.png" class="d-none d-lg-block" style="width:130px; height:90px" alt="" v-else>
            <p class="mb-1 h6">Step 3</p>
            <p class="h4 p-1 mb-0 bg-dark text-white" style="border: 4px double black">完成訂單</p>
          </div>
        </div>
        <!-- 表單資料 -->
        <div class="py-5 row">
          <form class="col-lg-8 p-3 form-data" style="border:2px solid rgb(70, 39, 5)" id="checkTop">
            <h4 class="text-dark text-center py-1 mb-0 cart-cal-header mt-2 mb-3">購買資訊確認</h4>
            <table class="w-100 h6 info-table text-secondary">
              <tbody>
                <tr>
                  <td>收件者姓名:</td>
                  <td> {{orderList.user.name}} </td>
                </tr>
                <tr>
                  <td>收件人電話 :</td>
                  <td> {{ orderList.user.tel }} </td>
                </tr>
                <tr>
                  <td>Email :</td>
                  <td> {{ orderList.user.email }}</td>
                </tr>
                <tr>
                  <td>地址 :</td>
                  <td> {{ orderList.user.address }}</td>
                </tr>
                <tr>
                  <td>付款狀態 :</td>
                  <td class="text-danger font-weight-bold" v-if="!orderList.is_paid">尚未付款</td>
                  <td class="text-light font-weight-bold" v-else>付款完成</td>
                </tr>
              </tbody>
            </table>
            
            <div class="text-center mt-5">
              <button class="btn btn-dark btn-lg w-100" v-if="!orderList.is_paid" @click.prevent="payComfirm">確認付款</button>
              <router-link class="btn btn-dark btn-lg w-100" v-else to="/home">回首頁</router-link>
            </div>
          </form>
          <!-- 訂單資料 -->
          <div class="col-lg-4 d-none d-lg-block">
            <buyList :childCarts="productInfo"></buyList>
            <div class="py-4 px-3" style="border:2px solid rgb(70, 39, 5);">
              <h4 class="text-dark text-center py-1 mb-0 cart-cal-header">訂單詳情</h4>
              <div class="d-flex justify-content-between h5 p-2 mt-2">
                <p>總計</p>
                <p v-if="couponRate">{{orderList.total/couponRate||0|currency}}</p>
                <p v-else>{{orderList.total|currency}}</p>
              </div>
              <div class="d-flex justify-content-between h5 mb-0 px-2">
                <p>優惠折抵</p>
                <p v-if="couponRate">{{orderList.total/couponRate-orderList.total||0|currency}}</p>
                <p v-else>0</p>
              </div>
              <hr />
              <div class="d-flex justify-content-between h5 mb-0 px-2">
                <p class="mb-0">應付金額</p>
                <p class="mb-0">{{orderList.total||0|currency}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import paymentDetail from "../../components/paymentDetail"
import buyList from "../../components/buyList"
import $ from "jquery"

export default {
  components:{
    paymentDetail,
    buyList,
  },
  data(){
    return{
      orderId:"",
      orderList:{
        user:{},
        //主要是課程中有提到所有的變數盡可能「預先定義」，否則即使遠端資料雖然是可以讀取到，但是 Vue 無法辨認這個資料，所以會出現 undefined
      },
      productInfo:[],
      couponRate:1,
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrderList();
    setTimeout(() => {
      var topPositon = $("#checkTop").offset().top;
      $('html, body').animate({scrollTop:topPositon},0);
    }, 10);
  },
  methods: {
    getOrderList() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.$http.get(api).then(response => {
        vm.isLoading = false;
        console.log(response);
        vm.orderList = response.data.order;
        vm.productInfo = response.data.order.products;
        let keyId = Object.keys(vm.productInfo)[0];//使用 keys 取出物件中的 id 值
        if(vm.productInfo[keyId].coupon){
          vm.couponRate = (vm.productInfo[keyId].coupon.percent)*0.01; //取出優惠價格
        }
      });
    },
    payComfirm() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.$http.post(api).then(response => {
        vm.isLoading = false;
        this.getOrderList();
      });
    }
  }
}
</script>

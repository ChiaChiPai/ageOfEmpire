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
            <img src="../../assets/images/fight.gif" class="d-none d-lg-block" style="width:150px; height:90px" alt="">
            <p class="mb-1 h6">Step 2</p>
            <p class="h4 p-1 mb-0 bg-dark text-white" style="border: 4px double black">填寫資料</p>
          </div>
          <div class="col-sm-4 col-md-3 mt-3 d-flex flex-column align-items-center">
            <img src="../../assets/images/firehouse.png" class="d-none d-lg-block" style="width:110px; height:90px" alt="">
            <p class="mb-1 h6">Step 3</p>
            <p class="h4 p-1 mb-0" style="border: 4px double black">完成訂單</p>
          </div>
        </div>
        <!-- 表單資料 -->
        <div class="py-5 row">
          <form class="col-lg-8 p-3" style="border:2px solid rgb(70, 39, 5)" id="infoTop" @submit.prevent="creatOrder">
            <h4 class="text-dark text-center py-1 mb-0 cart-cal-header mt-2 mb-3">購買資訊</h4>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="username" class="h6 font-weight-bold">收件人姓名</label>
                <input
                  type="text"
                  class="form-control bg-transparent"
                  :class="{'is-invalid':errors.has('name')}"
                  name="name"
                  id="username"
                  placeholder="輸入姓名"
                  v-model="form.user.name"
                  v-validate="'required'"
                />
                <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
              </div>
              <div class="form-group col-md-6">
                <label for="tel" class="h6 font-weight-bold">手機號碼</label>
                <input type="tel" name="手機號碼" id="tel" class="form-control bg-transparent"
                  :class="{'is-invalid':errors.has('手機號碼')}" v-validate="'required|numeric|digits:10|cellphone'"
                  placeholder="請輸入收件者手機" v-model="form.user.tel" maxlength="10">
                <span class="text-danger" v-if="errors.has('手機號碼')">{{errors.first('手機號碼')}}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="useremail" class="h6 font-weight-bold">Email</label>
              <input
                type="email"
                class="form-control bg-transparent"
                :class="{'is-invalid':errors.has('email')}"
                name="email"
                id="useremail"
                placeholder="請輸入 Email"
                v-model="form.user.email"
                v-validate="'required|email'"
              />
              <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
            </div>
            
            <div class="form-group">
              <label for="usertel" class="h6 font-weight-bold">地址</label>
              <input
                type="text"
                class="form-control bg-transparent"
                :class="{'is-invalid':errors.has('address')}"
                id="usertel"
                placeholder="請輸入地址"
                name="address"
                v-model="form.user.address"
                v-validate="'required'"
              />
              <span class="text-danger" v-if="errors.has('address')">地址必須輸入</span>
            </div>
            <div class="form-group">
              <label for="comment" class="h6 font-weight-bold">留言</label>
              <textarea
                name
                id="comment"
                class="form-control bg-transparent"
                cols="30"
                rows="10"
                style="height:125px"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-center mt-4">
              <button class="btn btn-dark w-100">送出訂單</button>
            </div>
          </form>
          <!-- 訂單資料 -->
          <div class="col-lg-4 d-none d-lg-block">
            <buyList :childCarts="carts"></buyList>
            <paymentDetail :childPrice="price"></paymentDetail>
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
      carts: [],
      price:{},
      form:{
        user: {
            name:'',
            email: '',
            tel: '',
            address: '',
          },
        message: '',
      },
      isLoading: false,
    }
  },
  created() {
    this.getPrice();
    setTimeout(() => {
      var topPositon = $("#infoTop").offset().top;
      $('html, body').animate({scrollTop:topPositon},0);
    }, 10);
  },
  methods: {
    getPrice() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.price = response.data.data;
        vm.carts = response.data.data.carts;
      });
    },
    creatOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      vm.isLoading = true;
      vm.$validator.validate().then((result) =>{
        if(result){
          vm.$http.post(api,{data:vm.form}).then(response => {
          vm.isLoading = false;
          vm.$router.push(`/cart/checkout/${response.data.orderId}`) //使用回傳的 orderId 導向下一個付款頁面
        });
        }else{
          vm.isLoading = false;
          console.log('欄位不完整');
        }
      })
    },
  },
}
</script>

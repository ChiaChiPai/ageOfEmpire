<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-warning">
      <a class="bg-dark text-warning p-3 h5 ml-auto" style="border-radius:5px" href="#" @click.prevent="backToHome">世紀商城</a>
      <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link h5 mb-0" to="/admin/products">
              產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link h5 mb-0" to="/admin/orders">
              訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link h5 mb-0" to="/admin/coupon">
              優惠券列表
            </router-link>
          </li>
          <li class="nav-item text-nowrap ml-lg-5 font-weight-bold">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <ul class="navbar-nav px-3">
        
      </ul>
    </nav> -->
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      const api = `${process.env.APIPATH}/logout`;
      const vm = this
        this.$http.post(api).then((response) => {
        console.log(response.data);
        if(response.data.success){ //登入成功後
          vm.$router.push('/login'); //跳轉至首頁
        }
      });
    },
    backToHome(){
      this.$router.push('/home');
    }
  }
}
</script>
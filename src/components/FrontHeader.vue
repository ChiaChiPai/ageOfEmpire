<template>
  <div>
    <header id="headTop">
      <nav class="navbar navbar-expand-lg navbar-light header_top-bg justify-content-center d-flex">
        <div class="d-lg-none"></div>
        <div class="h2 d-none d-lg-block" style="position:relative;">
          <a href="https://www.facebook.com/ageEmpireShop/" target="_blank" class="header_top-text"><i class="fab fa-facebook-square "></i></a>
          <a href="https://github.com/ChiaChiPai" target="_blank" class="header_top-text"><i class="fab fa-github-square"></i></a>
        </div>
        <div class="ml-auto justify-content-center">
          <a href="#">
            <img src="../assets/images/header.png" alt="">
          </a>
        </div>
        <AudioPlay class="ml-auto"></AudioPlay>
        <div class="d-none d-lg-block">
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <router-link class="nav-item nav-link active header_top-text h3 mb-0" to="/login">
                <i class="fas fa-sign-in-alt text-warning"></i>
              </router-link>
            </div>
          </div>          
        </div>
        
      </nav>
      <nav class="navbar navbar-expand-lg navbar-light header_button-bg">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="h2 d-lg-none mb-0">
          <a href="https://www.facebook.com/ageEmpireShop/" target="_blank" class="header_top-text text-dark"><i class="fab fa-facebook-square "></i></a>
          <a href="https://github.com/ChiaChiPai" target="_blank" class="header_top-text text-dark"><i class="fab fa-github-square"></i></a>
        </div>
        <div class="collapse navbar-collapse mt-2 mt-lg-0" id="navbarNavAltMarkup">
          <div class="navbar-nav h5 justify-content-around row flex-row no-gutters" style="width:100%;">
            <router-link to="/index" class="nav-item nav-link header_button col-sm-6 col-lg-2"><span class="header_button-text">首頁</span></router-link>
            <a href="#" @click.prevent="toNews" class="nav-item nav-link header_button col-sm-6 col-lg-2"><span class="header_button-text">最新消息</span></a>
            <router-link to="/shop" class="nav-item nav-link header_button col-sm-6 col-lg-2"><span class="header_button-text">世紀商城</span></router-link>
            <router-link to="/cart" class="nav-item nav-link header_button col-sm-6 col-lg-2"><span class="header_button-text">購物車</span></router-link>
            <a href="https://github.com/ChiaChiPai" target="_blank" class="nav-item nav-link header_button col-sm-6 col-lg-2"><span class="header_button-text">關於</span></a> <!-- 之後改放履歷 -->
            <router-link to="/login" class="nav-item nav-link header_button col-sm-6 d-lg-none"><span class="header_button-text">登入</span></router-link>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import AudioPlay from "../components/AudioIcon.vue"

export default {
  components:{
    AudioPlay,
  },
  methods:{
    toNews(){
      this.$router.push('/index');
      this.$emit('toNews');
    }
  }
}
</script>
<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <main>
      <div class="jumbotron-fluid">
          <div class="bg-cover main_banner position-relative">
            <div id="bannerMove" class="position-absolute position-relative d-none d-md-block" style="bottom:0;">
              <a class="main_banner_center position-absolute" :class="{'active':BannerSwitch==='專屬傭兵' }" href="#" @click.prevent="tempBannerSwitch"><p class="d-none">專屬傭兵</p><img class="img-colorful" height="725" src="../../assets/images/center.png" alt=""></a>
              <a class="main_banner_left position-absolute" href="#" :class="{'active':BannerSwitch==='獨家技術'}" @click.prevent="tempBannerSwitch"><p class="d-none">獨家技術</p><img class="img-colorful" height="725" src="../../assets/images/left.png" alt=""></a>
              <a class="main_banner_right position-absolute" href="#" :class="{'active':BannerSwitch==='十大建設'}" @click.prevent="tempBannerSwitch"><p class="d-none">十大建設</p><img class="img-colorful" height="725" src="../../assets/images/right.png" alt=""></a>
            </div>
          </div>
      </div>
      <!-- 介紹內容 -->
      <div class="bg-cover main_content-bg">
        <div class="row">
          <div class="col-12 my-5 justify-content-center d-flex text-white">
            <h1 class="text-warning">世紀帝國: 世紀商城</h1>
          </div>
          <div class="my-5 part_content-bg">
            <div class="container d-lg-flex" style="height:100%">
              <div class="row align-items-center">
                <iframe class="part_img col-lg-5 px-0" src="https://www.youtube.com/embed/wRTmEmTMJdw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p class="h4 col-lg-7 mt-4 mt-lg-0 px-5" style="line-height: 40px;">世紀商城系統支援最即時的戰爭資源，馬上下單，立即使用，讓在在戰場上，攻無不克，戰無不勝，你就是手握王者之劍的霸主，現在加入會員還有九折優惠喔。</p>
              </div>
            </div>
          </div>
          <div class="my-5 part_content-bg part_content-bgRight">
            <div class="container d-lg-flex" style="height:100%">
              <div class="row align-items-center flex-column-reverse flex-lg-row">
                <p class="h4 col-lg-7 mt-4 mt-md-0 px-5" style="line-height: 40px;">在人人自危的世界，只有擁有最多資源的的人才會是贏家，在這個地下商城裡，傭兵、裝備...應用盡有，所有你要變強的資源都幫你準備好了。讓我們一起重返榮耀吧 !</p>
                <img class="part_img" src="../../assets/images/part-img.png" width="472" height="312" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新消息 -->
      <div id="news" name="news" class="swiper-container">
        <img class="swiper-bg" src="../../assets/images/block-bg.jpg" alt="">
        <h3 class="position-absolute swiper-news">最新消息</h3>
        <!-- <div class="swiper-wrapper position-absolute" style="top:0"> -->
          <swiper :options="swiperOption" ref="mySwiper" class="swiper-wrapper position-absolute" style="top:0">
            <!-- slides -->
            <swiper-slide  v-for="item in pageContent" :key="item.id">
              <div class="card bg-warning" style="width: 15rem;">
                <a :href="item.url" target="_blank">
                  <img :src="item.media.image.src" class="card-img-top img-cover" height="200" alt="臉書粉專圖">
                </a>
                <span class="position-absolute h3" style="left:0.5rem; color:rgba(122, 116, 107, 0.63)"><i class="fab fa-facebook-square"></i></span>
                <div class="card-body p-2" >
                  <p class="card-text h6" id="scrollbarstyle" style="height:100px; overflow-y:auto;">{{item.description}}</p>
                </div>
              </div>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-button-prev sw" slot="button-prev"></div>
            <div class="swiper-button-next sw" slot="button-next"></div>
          </swiper>  
        
        <img src="../../assets/images/leaf2.png" style="z-index:10; position:absolute; bottom:0; left:-20%; filter: contrast(100%);" height="200" alt="">
      </div>
      <div class="content-product-bg" id="hotProduct">
        <div class="container">
          <ProductCard :childProductCard="randomProducts" :cardSize="sizeCol3"></ProductCard>
        </div>
      </div>
      <MarketCart></MarketCart>
    </main>
  </div>
</template>

<script>      
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MarketCart from "../../components/MarketCart";
import ProductCard from "../../components/ProductCard";
import $ from "jquery"

export default {
  components: {
    MarketCart,
    ProductCard,
    swiper,
    swiperSlide,
  },
  data() {
    return{
      swiperOption: {
        initialSlide: 0,
        slidesPerView: 3,
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        speed: 1500,
        navigation: {
          nextEl: '.swiper-button-next.sw',
          prevEl: '.swiper-button-prev.sw',
        },
        breakpoints: {
          576: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      },
      allProducts:[],
      BannerSwitch:"專屬傭兵",
      sizeCol3:true,
      fb_Id:[],
      pageContent:[],
      isLoading: false,
    }
  },
  created(){
    this.getProducts();
    this.getFB_Content();
  },
  methods: {
    //get page_id
    getFB_Content(){
      // const api = `https://cors-anywhere.herokuapp.com/https://graph.facebook.com/v6.0/ageEmpireShop/feed?access_token=EAAL5Tx0lRX0BAPWlyqaK1X82SwV29NyW1VPoSfKsI5TiXghZAVugInKEFhuNdWfYsG6DWKg5qrBTOqRnC5QUrIyRQnaGZAu2jZAv3iqFHpZA1gWdyEMxoMEPw9kUgA9frCZArxDKO7h0YZC8fvmA8ZAHaapgI4RXYe0wUhZCrK4NYAZDZD`;
      const api = `/graph/v6.0/ageEmpireShop/feed?access_token=EAAL5Tx0lRX0BAPWlyqaK1X82SwV29NyW1VPoSfKsI5TiXghZAVugInKEFhuNdWfYsG6DWKg5qrBTOqRnC5QUrIyRQnaGZAu2jZAv3iqFHpZA1gWdyEMxoMEPw9kUgA9frCZArxDKO7h0YZC8fvmA8ZAHaapgI4RXYe0wUhZCrK4NYAZDZD`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        let dataArr = response.data.data;
        vm.fb_Id= dataArr.map(function(item){
            return item.id;
          }
        );
        if(vm.fb_Id){  //等 id 有資料後再觸發 getFBContent()
          this.getFBContent();
        }
      });
    },
    // get page_data
    getFBContent(){
      const vm = this;
      for(let i=0 ; i<=vm.fb_Id.length ; i++){
        let id = vm.fb_Id[i];
        // api = `https://cors-anywhere.herokuapp.com/https://graph.facebook.com/v2.2/${id}?fields=attachments&access_token=EAAL5Tx0lRX0BAPWlyqaK1X82SwV29NyW1VPoSfKsI5TiXghZAVugInKEFhuNdWfYsG6DWKg5qrBTOqRnC5QUrIyRQnaGZAu2jZAv3iqFHpZA1gWdyEMxoMEPw9kUgA9frCZArxDKO7h0YZC8fvmA8ZAHaapgI4RXYe0wUhZCrK4NYAZDZD`;
        vm.$http.get(`/graph/v2.2/${id}?fields=attachments&access_token=EAAL5Tx0lRX0BAPWlyqaK1X82SwV29NyW1VPoSfKsI5TiXghZAVugInKEFhuNdWfYsG6DWKg5qrBTOqRnC5QUrIyRQnaGZAu2jZAv3iqFHpZA1gWdyEMxoMEPw9kUgA9frCZArxDKO7h0YZC8fvmA8ZAHaapgI4RXYe0wUhZCrK4NYAZDZD`).then((response) => {
        //  this.$http.get(api).then((response) => {
          vm.pageContent.push(response.data.attachments.data[0]); //問題: 為什麼 console 會說 data
          console.log(response);
        });
      }
      vm.isLoading = false;
    },
    getProducts(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.allProducts = response.data.products;
        vm.isLoading = false;
      });
    },
    tempBannerSwitch(e) {
      const vm = this;
      vm.BannerSwitch = e.currentTarget.text;
      var topPositon = $("#hotProduct").offset().top;
      $('html, body').animate({scrollTop:topPositon},800);
    }
  },
  computed: {
    randomProducts:function(){  //之前我用 randomProducts(){..}不行??
      let vm = this;
      let filterData = vm.allProducts.filter(function(item){
        return vm.BannerSwitch === item.category;
      })
      let newArray=[];
      if(filterData.length<=4){
        return filterData;
      }else{
        for(let index=0;index<4;index++){
          let n=Math.floor(Math.random()*filterData.length);
          newArray.push(filterData[n]);
          filterData.splice(n,1);
        }
        return newArray;
      }
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
}

//計算 banner 按鈕位移距離
let originWidth = window.innerWidth;
if(window.screen.availWidth !== originWidth){ //如果一開始視窗不是全視窗
  let widthOffset = (originWidth - window.screen.availWidth)*0.5;
  console.log(widthOffset);
  setTimeout(() => {
    document.querySelector("#bannerMove").style.left =`${widthOffset}px`;
  }, 10);
  window.onresize = function(){
    let normalWidth = window.innerWidth;
    let normalHeight = window.innerHeight;
    if(normalWidth !== originWidth){
      let tempWidth = (normalWidth-originWidth)*0.5;
      document.querySelector("#bannerMove").style.left = `${widthOffset+tempWidth||0}px`;
    }else if(normalWidth === originWidth){
      document.querySelector("#bannerMove").style.left = `0px`;
    }
  }
}else{
  window.onresize = function(){ //如果一開始視窗就是全視窗
    let normalWidth = window.innerWidth;
    let normalHeight = window.innerHeight;
    if(normalWidth !== originWidth){
      let tempWidth = (normalWidth-originWidth)*0.5;
      document.querySelector("#bannerMove").style.left = `${tempWidth||0}px`;
    }else if(normalWidth === originWidth){
      document.querySelector("#bannerMove").style.left = `0px`;
    }
  }
}


</script>

<style lang="scss">
#scrollbarstyle::-webkit-scrollbar {
  width: 12px;
  background-color: rgb(248, 199, 126);
}
#scrollbarstyle::-webkit-scrollbar-thumb  {
  border-radius: 1px;
  box-shadow: inset 0 0 6px rgba(201, 126, 14, 0.945);
  background-color: rgb(134, 54, 1);
}
#scrollbarstyle::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(179, 24, 24, 0.3);
  border-radius: 1px;
  background-color: rgb(248, 199, 126);
}

</style>
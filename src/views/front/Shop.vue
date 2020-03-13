<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="shop-banner"></div>
    <div class="shop-bg" id="shopTop">
      <div class="container">
        <div class="row">
          <div class="col-md-5 col-lg-4">
            <div class="sideBar my-3 d-flex justify-content-center">
              <ul class="sideBar-menu h3 pt-5 pl-0">
                <li>
                  <a href="#" @click.prevent="tempMenuSwitch"><img width="40" src="../../assets/images/lion-all.png" alt />全部商品</a>
                </li>
                <li>
                  <a href="#" @click.prevent="tempMenuSwitch"><img width="40" src="../../assets/images/rider.png" alt />專屬傭兵</a>
                </li>
                <li>
                  <a href="#" @click.prevent="tempMenuSwitch"><img width="40" src="../../assets/images/crown-removebg-preview.png" alt />獨家技術</a>
                </li>
                <li>
                  <a href="#" @click.prevent="tempMenuSwitch"><img width="40" src="../../assets/images/egos.png" alt />十大建設</a>
                </li>
                <li>
                  <a href="#" @click.prevent="tempMenuSwitch"><img width="40" src="../../assets/images/lion.png" alt />嗆人必備</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-7 col-lg-8">
          <!-- 商品列表 -->
          <ProductCard :childProductCard="productsFilter" v-if="productsFilter.length !== 0"></ProductCard>
          <h5 v-else class="text-warning h4 mt-3 text-center">小編正在趕上架喔....</h5>
          <!-- 頁數 -->
          <Pagination class="d-flex justify-content-center" :childPaginations="pagination" :cardSize="sizeCol4" @changePage="getPageProducts" v-if="filterProducts.length>10"></Pagination>
          <!-- $emit 觸發 @changePage(不是click) ，之後才觸發 getPageProducts(不用再寫()帶參數，已經自帶參數)。 -->
          </div>
        </div>
      </div>
    </div>
    <MarketCart></MarketCart>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard"
import MarketCart from "../../components/MarketCart";
import $ from "jquery"

export default {
  components: {
    Pagination,
    ProductCard,
    MarketCart,
  },
  data() {
    return {
      allProducts: [],
      pageProducts: [],
      filterProducts:[],
      singleProduct: {},
      tempMenu:"全部商品",
      pagination:{},
      sizeCol4:false,
      isLoading:false,
    };
  },
  created() {
    this.getAllProducts();
    this.getPageProducts();
    this.getParams();
    setTimeout(() => {
        var topPositon = $("#shopTop").offset().top;
        $('html, body').animate({scrollTop:topPositon},800);
    }, 10);
  },
  methods: {
    //取得全部資料
    getAllProducts(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.allProducts = response.data.products;
        vm.isLoading = false;
      });
    },
    //取得分頁資料
    getPageProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.pageProducts = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },

    //從 detail 麵包屑回來的資料
    getParams() {
      if(this.$route.query.category){
        this.tempMenu = this.$route.query.category;
      }
      //接收 Detail 麵包屑回來的網址資料會變成 shop?category=獨家技術
      //這時就可以使用 this.$route.query.category 去撈 "category=獨家技術" 的資料
      //藉此改變 this.tempMenu 分類
    },

    //切換商品頁面
    tempMenuSwitch(e) {
      const vm = this;
      vm.tempMenu = e.target.text;
      if (this.$route.query.category) {
        vm.$router.push('/shop');
      }
    }
  },
  computed: {
    //三、問題: 在切換到別的主題時，存在第二頁的商品只會存在第二頁，必須切換頁面才看的到?
    //解決:一開始 filterData 從所有資料(allProducts)的頁面抓取做過濾，
    //當 filterData 那個頁面內的資料超過 10 筆時，改從分頁資料(pagePaginations)做抓取
    //因為要做頁數出現與否的判斷，多新增的 filterProductsion 的資料讓 v-if="filterProducts.length>10" 判斷
    productsFilter() {
      const vm = this;
      var filterData = vm.allProducts.filter(function(item){
        if(vm.tempMenu === '全部商品'){
          return item;
        }else{
          return vm.tempMenu === item.category;
        }
      })
      vm.filterProducts = filterData;
      if(filterData.length > 10){
        var moreFilterData = vm.pageProducts.filter(function(item){
          if(vm.tempMenu === '全部商品'){
            return item;
          }else{
            return vm.tempMenu === item.category;
          }
        })
        return moreFilterData;
      }else{
        return filterData;
      }
    }
  }
};
</script>
<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-6 my-3" :class="{'col-lg-4': !cardSize,'col-lg-3': cardSize}" v-for="item in childProductCard" :key="item.id">
        <div class="card product-section-bg text-center" @click="getProductDetail(item.id)" style="cursor: pointer;">
          <div class="position-relative">
            <img :src="item.imageUrl" class="product-img" alt="..." />
            <span
              class="badge badge-secondary position-absolute"
              style="right:0; bottom:0;"
            >{{item.category}}</span>
          </div>
          <div class="px-3 py-2">
            <h4 class="card-title">{{item.title}}</h4>
            <p class="card-text text-truncate">{{item.content}}</p>
            <del class="card-text" v-if="item.price">售價 $ {{item.origin_price}}</del>
            <span class="card-text" v-else>售價 $ {{item.origin_price}}</span>
            <span class="h5 d-inline-block mb-0" style="color:red" v-if="item.price">$ {{item.price}}</span>
          </div>
          <div class="d-flex d-md-block pb-0 pb-md-2" style="width:100%">
            <a href="#" @click.prevent="getProductDetail(item.id)" class="btn product-btn product-btn-left">查看更多</a>
            <a href="#" class="btn product-btn product-btn-right" @click.prevent.stop="addToCart(item.id,item.title)">加入購物</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    childProductCard:Array,
    cardSize:Boolean,
  },
  data(){
    return{
      carts:[],
    }
  },
  methods:{
    getProductDetail(id){
      this.$router.push(`/detail/${id}`)
    },
    addToCart(id,addTitle){
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(api).then(response => {
        vm.carts = response.data.data.carts;
        let titleSearch = vm.carts.find(function(item){ 
          return item.product.title === addTitle;
        });
        let addQty = 0;
        if(titleSearch){
          addQty = titleSearch.qty;
          const deleteApi = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${titleSearch.id}`;
          this.$http.delete(deleteApi).then((response) => {
            console.log(response);
          });
        }
        let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const cart = {
          product_id:id,
          qty:addQty+1,
        };
        this.$http.post(api,{data: cart}).then((response) => {
          vm.$bus.$emit('updateCart');
        });
      });
      
    }
  }
}
</script>
<!-- 
1. addToCart
考慮到可能有重複產品的增購，如果同樣產品按了兩次，購物車會出現重複名稱的商品，
會將第一次的刪除，然後用第二次按的產品取代他，同時加上上一次的產品數量。
-->
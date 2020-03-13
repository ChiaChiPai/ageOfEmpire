<template>
  <div>
    <div class="py-4 px-3 mb-3" style="border:2px solid rgb(70, 39, 5);">
      <h4 class="text-dark text-center py-1 mb-0 cart-cal-header">本次購物清單</h4>
      <div v-for="(item,id) in childCarts" :key="id">
        <a href="#" class="p-2 text-dark d-flex justify-content-between align-items-center">
          <img width="50" :src="item.product.imageUrl" alt />
          <p class="h5 mb-0 pl-4"> {{item.product.title}} <span class="d-block h6 mb-0"> x {{item.qty}}</span></p>
          <span class="h5 mb-0 ml-auto">{{item.total|currency}}</span>
        </a>
        <hr class="my-0" style="border-color:rgb(70, 39, 5)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props:{
  //   childCarts:{
  //     type:Array,Object,
  //   }
  // }
  props: ['childCarts'],
}
</script>
<template>
  <div>
    <div class="py-4 px-3" style="border:2px solid rgb(70, 39, 5);">
      <h4 class="text-dark text-center py-1 mb-0 cart-cal-header">訂單詳情</h4>
      <div class="d-flex justify-content-between h5 p-2 mt-2">
        <p>總計</p>
        <p>{{childPrice.total||0|currency}}</p>
      </div>
      <div class="d-flex justify-content-between h5 mb-0 px-2">
        <p>優惠折抵</p>
        <p>{{childPrice.total-childPrice.final_total||0|currency}}</p>
      </div>
      <hr />
      <div class="d-flex justify-content-between h5 mb-0 px-2">
        <p class="mb-0">應付金額</p>
        <p class="mb-0">{{childPrice.final_total||0|currency}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    childPrice:{
      type:Object,
    }
  }
}
</script>
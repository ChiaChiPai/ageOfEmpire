<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !childPaginations.has_pre}">
          <a class="page-link border-light" href="#" aria-label="Previous" @click.prevent="getPagination(childPaginations.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in childPaginations.total_pages"
          :key="page"
          :class="{'active': childPaginations.current_page === page}"
        >
          <a class="page-link border-light" href="#" @click.prevent="getPagination(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled': !childPaginations.has_next}">
          <a class="page-link border-light" href="#" aria-label="Next" @click.prevent="getPagination(childPaginations.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    childPaginations: {
      type: Object,
    },
  },
  methods: {
    getPagination(page) {
      this.$emit('changePage',page);
    }
  }
};
// 外層 <Pagination :childPaginations="pagination" @changePage="getProducts"></Pagination>
//一、 $emit
//1. @click 觸發 "getPagination"，將數值帶入 $emit 傳到外層的 @changePage 
//2. 將 page 的數值傳到 getProducts(page = 1) 裡面改變頁數。
//二、 prop
//1. 外層的 :childPaginations="pagination" 使用 props 將資料傳到內層
//2. 內層 pagination 再使用 childPaginations:{} 內的資料
//三、問題: 在切換到別的主題時，存在第二頁的商品只會存在第二頁，必須切換頁面才看的到?
//解決:一開始 filterData 從所有資料(allProducts)的頁面抓取做過濾，
//當 filterData 那個頁面內的資料超過 10 筆時，改從分頁資料(pagePaginations)做抓取
</script>


<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h3 class="text-center mt-2">優惠券列表</h3>
    <div class="text-right mb-2">
      <button class="btn btn-dark mt-4" @click="openModel(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">優惠主題</th>
          <th>優惠折數</th>
          <th width="120">到期日</th>
          <th width="120">優惠碼</th>
          <th width="150">是否啟用</th>
          <th width="160">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in couponList" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td class="text-right">{{ item.due_date }}</td>
          <td class="text-right">{{ item.code }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-light btn-sm" @click="openModel(false,item)">編輯</button>
            <button class="btn btn-outline-light btn-sm" @click="oepnDeleteModel(key)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination class="d-flex justify-content-center" :childPaginations="pagination" @changePage="getCoupon"></Pagination>
    <!-- model -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠碼</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-6">
                  <div class="form-group">
                    <label for="title">優惠主題</label>
                    <input
                      type="text"
                      v-model="tempCoupon.title"
                      class="form-control"
                      id="title"
                      placeholder="請輸入優惠主題"
                    />
                  </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="origin_price">優惠碼</label>
                    <input
                      type="text"
                      v-model="tempCoupon.code"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入優惠碼"
                    />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="price">到期日</label>
                    <input
                      type="date"
                      v-model="tempCoupon.due_date"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入到期日"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="category">優惠百分比</label>
                    <input
                      type="number"
                      v-model="tempCoupon.percent"
                      class="form-control"
                      max="100"
                      id="category"
                      placeholder="請輸入優惠百分比"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true="1"
                      :false="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-dark" @click="updateCoupon(tempCoupon.id)">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delete model -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">刪除產品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">是否刪除這個產品?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-dark" @click="deleteCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination"
import $ from "jquery";

export default {
  components:{
    Pagination,
  },
  data(){
    return{
      couponList:[],
      addCoupon:{},
      tempCoupon: {}, //暫存的資料存在這裡
      editIsNew: false,
      pagination:{},
    }
  },
  created(){
    this.getCoupon();
  },
  methods:{
    getCoupon(page = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        console.log(response);
        vm.couponList = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    openModel(isNew,item){
      $("#couponModal").modal("show");
      const vm = this;
      if(isNew){
        vm.tempCoupon = {};
        vm.editIsNew = true;
      }else{
        vm.tempCoupon = Object.assign({},item);
        vm.editIsNew = false;
      }
    },
    oepnDeleteModel(key){
      $("#deleteModal").modal("show");
      const vm = this;
      vm.deleteKey = key;
    },
    updateCoupon(id){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      const vm = this;
      vm.isLoading = true;
      let httpStatus = "post";
      if(vm.editIsNew === false){
        httpStatus = "put";
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`;
      }
      this.$http[httpStatus](api,{ data:vm.tempCoupon }).then(response => {
        vm.isLoading = false;
        if(response.data.success){
          this.getCoupon();
          $("#couponModal").modal("hide");
        }else{
          this.getCoupon();
          $("#couponModal").modal("hide");
        }
      });
    },
    deleteCoupon(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.couponList[vm.deleteKey].id}`;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        if(response.data.success){
          vm.isLoading = false;
          this.getCoupon();
          $("#deleteModal").modal("hide");
        }else{
          console.log("刪除失敗");
          this.getCoupon();
          $("#deleteModal").modal("hide");
        }
      });
    },
  },
}
</script>
<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h3 class="text-center mt-2">訂單列表</h3>
    <div class="table-responsive-lg">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>購買時間</th>
            <th width="250">客戶資料</th>
            <th>購買品項</th>
            <th>付款金額</th>
            <th width="200">留言</th>
            <th width="70"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in orderList" :key="item.id">
            <td>{{ item.paid_date|toDate }}</td>
            <td>
              <p>{{ item.user.name }}</p>
              <p>{{ item.user.tel }}</p>
              <p>{{ item.user.email }}</p>
              <p>{{ item.user.address }}</p>
            </td>
            <td>
              <p
                v-for="(product,id) in item.products"
                :key="id"
              >{{ product.product.title }} x {{product.qty}} = {{product.final_total|currency}}</p>
            </td>
            <td class="text-right">
              <p class="mb-0">{{ item.total|currency }}</p>
              <span v-if="item.is_paid" class="badge badge-warning">已付款</span>
            </td>
            <td>{{ item.message }}</td>
            <td>
              <button class="btn btn-outline-light btn-sm" @click="openEditModel(item)">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination class="d-flex justify-content-center" :childPaginations="pagination" @changePage="getOrder"></Pagination>
    <!-- model -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <!-- <div class="form-row">
                  <div class="form-group col-md-6">購買人: {{ tempOrder.user.name }}</div>
                </div> --> <!-- 加上 tempOrder.user.name 就會跳錯-->
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">應付款項</label>
                    <input type="number" class="form-control" id="price" v-model="tempOrder.total" />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="price">已付款</label>
                    <input type="checkbox" id="price" v-model="tempOrder.is_paid" />
                  </div>
                </div>

                <div class="form-group">
                  <label for="note">備註</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="note"
                    placeholder="請輸入產品描述"
                    v-model="tempOrder.message"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateOrder(tempOrder.id)">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../../components/Pagination"

export default {
  components:{
    Pagination,
  },
  data() {
    return {
      orderList: {
        products: [],
        user: []
      },
      tempOrder: {
        user:[]
      },
      pagination: [],
      isLoading: false
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder(page = 2) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.orderList = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
        vm.tempOrder = {};
      });
    },
    openEditModel(item) {
      const vm = this;
      $("#orderModal").modal("show");
      vm.tempOrder = Object.assign({},item)
    },
    updateOrder(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.put(api, { data: vm.tempOrder }).then(response => {
        vm.isLoading = false;
        console.log(response);
        $("#orderModal").modal("hide");
      });
    }
  }
};
</script>
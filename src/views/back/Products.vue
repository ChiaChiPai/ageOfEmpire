<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h3 class="text-center mt-2">產品列表</h3>
    <div class="text-right mb-2">
      <button class="btn btn-dark mt-4" @click="openModel(true)">建立新的產品</button>
    </div>
    <div class="table-responsive-lg">
      <table class="table">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th width="240">產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="150">是否啟用</th>
            <th width="160">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-right">{{ item.origin_price|currency  }}</td>
            <td class="text-right">{{ item.price|currency }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-light btn-sm" @click="openModel(false,item)">編輯</button>
              <button class="btn btn-outline-light btn-sm" @click="deleteModel(key)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <Pagination class="d-flex justify-content-center" :childPaginations="pagination" @changePage="getProducts"></Pagination>
    <!-- model -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結" />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="upload" @change="uploadFile"/>
                  <!-- ref="upload" 必掛， 上傳的檔案 file，會放在 upload 裡面，Ajax 中需要透過 DOM 來取得 input file 內的上傳檔案
會透過 ref 來指向該目標，在使用 js  來取得檔案資訊並上傳-->
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" v-model="tempProduct.title" class="form-control" id="title" placeholder="請輸入標題" />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" v-model="tempProduct.category" class="form-control" id="category" placeholder="請輸入分類" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" v-model="tempProduct.unit" class="form-control" id="unit" placeholder="請輸入單位" />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" value="0" v-model="tempProduct.origin_price" class="form-control" min="0" id="origin_price" placeholder="請輸入原價" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" value="0" v-model="tempProduct.price" class="form-control" id="price" min="0" placeholder="請輸入售價" />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" v-model="tempProduct.description" class="form-control" id="description" placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" v-model="tempProduct.content" class="form-control" id="content" placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"  
                    v-model="tempProduct.is_enabled" 
                    :true="1"
                    :false="0"
                    id="is_enabled" />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-dark" @click="updataProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">刪除產品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除這個產品?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-dark" @click="deleteProduct">確認刪除</button>
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
      products: [],
      tempProduct: {}, //新增的資料存在這裡
      editIsNew: false,
      deleteKey: 0,
      isLoading: false,
      fileUploading: false,
      pagination: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModel(isNew , item) {
      $("#productModal").modal("show");
      if(isNew){ //如果 isNew 是 true
        this.tempProduct = {}; // 將 model 內容清空
        this.editIsNew = true; // 將編輯狀態是新的改成 true，代表是新增的產品
      }else { //如果 isNew 是 false
        this.tempProduct = Object.assign({},item); //將 item 將 item 的內容放回 tempProduct
        this.editIsNew = false; // 將編輯狀態是新的改成 false，代表是需要編輯的產品
      }
    },
    updataProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      const vm = this;
      let httpStatus = 'post'; 
      if(!vm.editIsNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.tempProduct.id}`;
        httpStatus = 'put';
      }
      this.$http[httpStatus](api, { data:vm.tempProduct }).then((response) => {
        //[httpStatus]是把字串變成變數的方法，傳入的是'post'、'put'，透過 [] 轉成 post、put
        //因為後端的資料型態是 {data:{ }}，所以傳出去的資料也要符合這個格式
        if(response.data.success){//新增成功時
          $("#productModal").modal("hide"); //將 model 的視窗關掉
          vm.getProducts(); //更新產品列表
        }else{// 新增失敗時
          $("#productModal").modal("hide");//將 model 的視窗關掉
          vm.getProducts();//更新產品列表
          console.log('新增失敗');//顯示失敗訊息
        }
      });
    },
    deleteModel(key){
      $("#deleteModal").modal("show");
      const vm = this;
      vm.deleteKey = key;
    },
    deleteProduct(){
      const vm = this;
      console.log(vm.deleteKey);
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.products[vm.deleteKey].id}`;
      this.$http.delete(api).then(response => {
        vm.getProducts();//更新產品列表
        $("#deleteModal").modal("hide");
      });
    },
    uploadFile(){
      const uploadedFile = this.$refs.upload.files[0];
      const vm = this;
      vm.fileUploading = true;
      const formData = new FormData();
      formData.append('file-to-upload',uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      this.$http.post(url, formData, {
        headers: { //居然要加 s
          'Content-Type' : 'multipart/form-data'
          //傳送「檔案」必須使用表單的形式，所以在此把傳送的類型改為 form-data 喔
        }
      }).then(response => {
        if(response.data.success){
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          // console.log(vm.tempProduct);
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl ); //因為 imageUrl 未事先定義，所以必須使用 $set 強制寫進去
          vm.fileUploading = false;
          vm.$bus.$emit('message:push','檔案上傳成功','success');
        }else{
          vm.$bus.$emit('message:push',response.data.message,'danger');
          vm.fileUploading = false;
        }
      })
    },
  },
  created() {
    this.getProducts();
    
  }
};
</script>
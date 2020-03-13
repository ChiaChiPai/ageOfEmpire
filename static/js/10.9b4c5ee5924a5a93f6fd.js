webpackJsonp([10],{dazf:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("woOf"),r=a.n(s),i=a("7t+N"),d=a.n(i),o={components:{Pagination:a("cMGX").a},data:function(){return{orderList:{products:[],user:[]},tempOrder:{user:[]},pagination:[],isLoading:!1}},created:function(){this.getOrder()},methods:{getOrder:function(){var t="https://vue-course-api.hexschool.io/api/csc98104/admin/orders?page="+(arguments.length>0&&void 0!==arguments[0]?arguments[0]:2),e=this;e.isLoading=!0,this.$http.get(t).then(function(t){e.isLoading=!1,e.orderList=t.data.orders,e.pagination=t.data.pagination,e.isLoading=!1,e.tempOrder={}})},openEditModel:function(t){d()("#orderModal").modal("show"),this.tempOrder=r()({},t)},updateOrder:function(t){var e="https://vue-course-api.hexschool.io/api/csc98104/admin/order/"+t,a=this;a.isLoading=!0,this.$http.put(e,{data:a.tempOrder}).then(function(t){a.isLoading=!1,console.log(t),d()("#orderModal").modal("hide")})}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),t._v(" "),a("h3",{staticClass:"text-center mt-2"},[t._v("訂單列表")]),t._v(" "),a("div",{staticClass:"table-responsive-lg"},[a("table",{staticClass:"table mt-4"},[t._m(0),t._v(" "),a("tbody",t._l(t.orderList,function(e){return a("tr",{key:e.id},[a("td",[t._v(t._s(t._f("toDate")(e.paid_date)))]),t._v(" "),a("td",[a("p",[t._v(t._s(e.user.name))]),t._v(" "),a("p",[t._v(t._s(e.user.tel))]),t._v(" "),a("p",[t._v(t._s(e.user.email))]),t._v(" "),a("p",[t._v(t._s(e.user.address))])]),t._v(" "),a("td",t._l(e.products,function(e,s){return a("p",{key:s},[t._v(t._s(e.product.title)+" x "+t._s(e.qty)+" = "+t._s(t._f("currency")(e.final_total)))])}),0),t._v(" "),a("td",{staticClass:"text-right"},[a("p",{staticClass:"mb-0"},[t._v(t._s(t._f("currency")(e.total)))]),t._v(" "),e.is_paid?a("span",{staticClass:"badge badge-warning"},[t._v("已付款")]):t._e()]),t._v(" "),a("td",[t._v(t._s(e.message))]),t._v(" "),a("td",[a("button",{staticClass:"btn btn-outline-light btn-sm",on:{click:function(a){return t.openEditModel(e)}}},[t._v("編輯")])])])}),0)])]),t._v(" "),a("Pagination",{staticClass:"d-flex justify-content-center",attrs:{childPaginations:t.pagination},on:{changePage:t.getOrder}}),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"orderModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog modal-md",attrs:{role:"document"}},[a("div",{staticClass:"modal-content border-0"},[t._m(1),t._v(" "),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"origin_price"}},[t._v("應付款項")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.total,expression:"tempOrder.total"}],staticClass:"form-control",attrs:{type:"number",id:"price"},domProps:{value:t.tempOrder.total},on:{input:function(e){e.target.composing||t.$set(t.tempOrder,"total",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"price"}},[t._v("已付款")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.is_paid,expression:"tempOrder.is_paid"}],attrs:{type:"checkbox",id:"price"},domProps:{checked:Array.isArray(t.tempOrder.is_paid)?t._i(t.tempOrder.is_paid,null)>-1:t.tempOrder.is_paid},on:{change:function(e){var a=t.tempOrder.is_paid,s=e.target,r=!!s.checked;if(Array.isArray(a)){var i=t._i(a,null);s.checked?i<0&&t.$set(t.tempOrder,"is_paid",a.concat([null])):i>-1&&t.$set(t.tempOrder,"is_paid",a.slice(0,i).concat(a.slice(i+1)))}else t.$set(t.tempOrder,"is_paid",r)}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"note"}},[t._v("備註")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.message,expression:"tempOrder.message"}],staticClass:"form-control",attrs:{type:"text",id:"note",placeholder:"請輸入產品描述"},domProps:{value:t.tempOrder.message},on:{input:function(e){e.target.composing||t.$set(t.tempOrder,"message",e.target.value)}}})])])])]),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),t._v(" "),a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.updateOrder(t.tempOrder.id)}}},[t._v("確認")])])])])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("購買時間")]),t._v(" "),a("th",{attrs:{width:"250"}},[t._v("客戶資料")]),t._v(" "),a("th",[t._v("購買品項")]),t._v(" "),a("th",[t._v("付款金額")]),t._v(" "),a("th",{attrs:{width:"200"}},[t._v("留言")]),t._v(" "),a("th",{attrs:{width:"70"}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header bg-dark text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[e("span",[this._v("修改訂單")])]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}]},l=a("VU/8")(o,n,!1,null,null,null);e.default=l.exports}});
//# sourceMappingURL=10.9b4c5ee5924a5a93f6fd.js.map
webpackJsonp([1],{"/IG+":function(t,e,i){t.exports=i.p+"static/img/left.5aa85b0.png"},"93YD":function(t,e,i){"use strict";var s={props:{childProductCard:Array,cardSize:Boolean},data:function(){return{carts:[]}},methods:{getProductDetail:function(t){this.$router.push("/detail/"+t)},addToCart:function(t,e){var i=this,s=this;s.$http.get("https://vue-course-api.hexschool.io/api/csc98104/cart").then(function(a){s.carts=a.data.data.carts;var r=s.carts.find(function(t){return t.product.title===e}),n=0;if(r){n=r.qty;var o="https://vue-course-api.hexschool.io/api/csc98104/cart/"+r.id;i.$http.delete(o).then(function(t){console.log(t)})}var c={product_id:t,qty:n+1};i.$http.post("https://vue-course-api.hexschool.io/api/csc98104/cart",{data:c}).then(function(t){s.$bus.$emit("updateCart")})})}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"row"},t._l(t.childProductCard,function(e){return i("div",{key:e.id,staticClass:"col-md-6 col-6 my-3",class:{"col-lg-4":!t.cardSize,"col-lg-3":t.cardSize}},[i("div",{staticClass:"card product-section-bg text-center",staticStyle:{cursor:"pointer"},on:{click:function(i){return t.getProductDetail(e.id)}}},[i("div",{staticClass:"position-relative"},[i("img",{staticClass:"product-img",attrs:{src:e.imageUrl,alt:"..."}}),t._v(" "),i("span",{staticClass:"badge badge-secondary position-absolute",staticStyle:{right:"0",bottom:"0"}},[t._v(t._s(e.category))])]),t._v(" "),i("div",{staticClass:"px-3 py-2"},[i("h4",{staticClass:"card-title"},[t._v(t._s(e.title))]),t._v(" "),i("p",{staticClass:"card-text text-truncate"},[t._v(t._s(e.content))]),t._v(" "),e.price?i("del",{staticClass:"card-text"},[t._v("售價 $ "+t._s(e.origin_price))]):i("span",{staticClass:"card-text"},[t._v("售價 $ "+t._s(e.origin_price))]),t._v(" "),e.price?i("span",{staticClass:"h5 d-inline-block mb-0",staticStyle:{color:"red"}},[t._v("$ "+t._s(e.price))]):t._e()]),t._v(" "),i("div",{staticClass:"d-flex d-md-block pb-0 pb-md-2",staticStyle:{width:"100%"}},[i("a",{staticClass:"btn product-btn product-btn-left",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.getProductDetail(e.id)}}},[t._v("查看更多")]),t._v(" "),i("a",{staticClass:"btn product-btn product-btn-right",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),i.stopPropagation(),t.addToCart(e.id,e.title)}}},[t._v("加入購物")])])])])}),0)])},staticRenderFns:[]},r=i("VU/8")(s,a,!1,null,null,null);e.a=r.exports},Cu23:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("v2ns");var s=i("7QTg"),a=i("tWc7"),r=i("93YD"),n=i("7t+N"),o=i.n(n),c={components:{MarketCart:a.a,ProductCard:r.a,swiper:s.swiper,swiperSlide:s.swiperSlide},data:function(){return{swiperOption:{initialSlide:0,slidesPerView:3,direction:"horizontal",loop:!0,autoplay:!0,speed:1500,navigation:{nextEl:".swiper-button-next.sw",prevEl:".swiper-button-prev.sw"},breakpoints:{576:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:2,spaceBetween:10},992:{slidesPerView:3,spaceBetween:30}}},allProducts:[],BannerSwitch:"專屬傭兵",sizeCol3:!0,fb_Id:[],pageContent:[],isLoading:!1}},created:function(){this.getProducts(),this.getFB_Content()},methods:{getFB_Content:function(){var t=this,e=this;e.isLoading=!0,e.$http.get("https://cors-anywhere.herokuapp.com/https://graph.facebook.com/v6.0/ageEmpireShop/feed?access_token=EAAL5Tx0lRX0BAPWlyqaK1X82SwV29NyW1VPoSfKsI5TiXghZAVugInKEFhuNdWfYsG6DWKg5qrBTOqRnC5QUrIyRQnaGZAu2jZAv3iqFHpZA1gWdyEMxoMEPw9kUgA9frCZArxDKO7h0YZC8fvmA8ZAHaapgI4RXYe0wUhZCrK4NYAZDZD").then(function(i){var s=i.data.data;e.fb_Id=s.map(function(t){return t.id}),e.fb_Id&&t.getFBContent()})},getFBContent:function(){for(var t=this,e=0;e<=t.fb_Id.length;e++){var i="https://cors-anywhere.herokuapp.com/https://graph.facebook.com/v2.2/"+t.fb_Id[e]+"?fields=attachments&access_token=EAAL5Tx0lRX0BAPWlyqaK1X82SwV29NyW1VPoSfKsI5TiXghZAVugInKEFhuNdWfYsG6DWKg5qrBTOqRnC5QUrIyRQnaGZAu2jZAv3iqFHpZA1gWdyEMxoMEPw9kUgA9frCZArxDKO7h0YZC8fvmA8ZAHaapgI4RXYe0wUhZCrK4NYAZDZD";t.$http.get(i).then(function(e){t.pageContent.push(e.data.attachments.data[0]),console.log(e)})}t.isLoading=!1},getProducts:function(){var t=this;t.isLoading=!0,t.$http.get("https://vue-course-api.hexschool.io/api/csc98104/products/all").then(function(e){t.allProducts=e.data.products,t.isLoading=!1})},tempBannerSwitch:function(t){this.BannerSwitch=t.currentTarget.text;var e=o()("#hotProduct").offset().top;o()("html, body").animate({scrollTop:e},800)}},computed:{randomProducts:function(){var t=this,e=t.allProducts.filter(function(e){return t.BannerSwitch===e.category}),i=[];if(e.length<=4)return e;for(var s=0;s<4;s++){var a=Math.floor(Math.random()*e.length);i.push(e[a]),e.splice(a,1)}return i},swiper:function(){return this.$refs.mySwiper.swiper}}},l=window.innerWidth;if(window.screen.availWidth!==l){var d=.5*(l-window.screen.availWidth);console.log(d),setTimeout(function(){document.querySelector("#bannerMove").style.left=d+"px"},10),window.onresize=function(){var t=window.innerWidth;window.innerHeight;if(t!==l){var e=.5*(t-l);document.querySelector("#bannerMove").style.left=(d+e||0)+"px"}else t===l&&(document.querySelector("#bannerMove").style.left="0px")}}else window.onresize=function(){var t=window.innerWidth;window.innerHeight;if(t!==l){var e=.5*(t-l);document.querySelector("#bannerMove").style.left=(e||0)+"px"}else t===l&&(document.querySelector("#bannerMove").style.left="0px")};var p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),t._v(" "),s("main",[s("div",{staticClass:"jumbotron-fluid"},[s("div",{staticClass:"bg-cover main_banner position-relative"},[s("div",{staticClass:"position-absolute position-relative d-none d-md-block",staticStyle:{bottom:"0"},attrs:{id:"bannerMove"}},[s("a",{staticClass:"main_banner_center position-absolute",class:{active:"專屬傭兵"===t.BannerSwitch},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.tempBannerSwitch(e)}}},[s("p",{staticClass:"d-none"},[t._v("專屬傭兵")]),s("img",{staticClass:"img-colorful",attrs:{height:"725",src:i("F16r"),alt:""}})]),t._v(" "),s("a",{staticClass:"main_banner_left position-absolute",class:{active:"獨家技術"===t.BannerSwitch},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.tempBannerSwitch(e)}}},[s("p",{staticClass:"d-none"},[t._v("獨家技術")]),s("img",{staticClass:"img-colorful",attrs:{height:"725",src:i("/IG+"),alt:""}})]),t._v(" "),s("a",{staticClass:"main_banner_right position-absolute",class:{active:"十大建設"===t.BannerSwitch},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.tempBannerSwitch(e)}}},[s("p",{staticClass:"d-none"},[t._v("十大建設")]),s("img",{staticClass:"img-colorful",attrs:{height:"725",src:i("SuS5"),alt:""}})])])])]),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"swiper-container",attrs:{id:"news",name:"news"}},[s("img",{staticClass:"swiper-bg",attrs:{src:i("eLsL"),alt:""}}),t._v(" "),s("h3",{staticClass:"position-absolute swiper-news"},[t._v("最新消息")]),t._v(" "),s("swiper",{ref:"mySwiper",staticClass:"swiper-wrapper position-absolute",staticStyle:{top:"0"},attrs:{options:t.swiperOption}},[t._l(t.pageContent,function(e){return s("swiper-slide",{key:e.id},[s("div",{staticClass:"card bg-warning",staticStyle:{width:"15rem"}},[s("a",{attrs:{href:e.url,target:"_blank"}},[s("img",{staticClass:"card-img-top img-cover",attrs:{src:e.media.image.src,height:"200",alt:"臉書粉專圖"}})]),t._v(" "),s("span",{staticClass:"position-absolute h3",staticStyle:{left:"0.5rem",color:"rgba(122, 116, 107, 0.63)"}},[s("i",{staticClass:"fab fa-facebook-square"})]),t._v(" "),s("div",{staticClass:"card-body p-2"},[s("p",{staticClass:"card-text h6",staticStyle:{height:"100px","overflow-y":"auto"},attrs:{id:"scrollbarstyle"}},[t._v(t._s(e.description))])])])])}),t._v(" "),s("div",{staticClass:"swiper-button-prev sw",attrs:{slot:"button-prev"},slot:"button-prev"}),t._v(" "),s("div",{staticClass:"swiper-button-next sw",attrs:{slot:"button-next"},slot:"button-next"})],2),t._v(" "),s("img",{staticStyle:{"z-index":"10",position:"absolute",bottom:"0",left:"-20%",filter:"contrast(100%)"},attrs:{src:i("VF4g"),height:"200",alt:""}})],1),t._v(" "),s("div",{staticClass:"content-product-bg",attrs:{id:"hotProduct"}},[s("div",{staticClass:"container"},[s("ProductCard",{attrs:{childProductCard:t.randomProducts,cardSize:t.sizeCol3}})],1)]),t._v(" "),s("MarketCart")],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bg-cover main_content-bg"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 my-5 justify-content-center d-flex text-white"},[e("h1",{staticClass:"text-warning"},[this._v("世紀帝國: 世紀商城")])]),this._v(" "),e("div",{staticClass:"my-5 part_content-bg"},[e("div",{staticClass:"container d-lg-flex",staticStyle:{height:"100%"}},[e("div",{staticClass:"row align-items-center"},[e("iframe",{staticClass:"part_img col-lg-5 px-0",attrs:{src:"https://www.youtube.com/embed/wRTmEmTMJdw",frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}}),this._v(" "),e("p",{staticClass:"h4 col-lg-7 mt-4 mt-lg-0 px-5",staticStyle:{"line-height":"40px"}},[this._v("在人人自危的世界，只有擁有最多資源的的人才會是贏家，在這個地下商城裡，傭兵、裝備...應用盡有，所有你要變強的資源都幫你準備好了。讓我們一起重返榮耀吧 !")])])])]),this._v(" "),e("div",{staticClass:"my-5 part_content-bg part_content-bgRight"},[e("div",{staticClass:"container d-lg-flex",staticStyle:{height:"100%"}},[e("div",{staticClass:"row align-items-center flex-column-reverse flex-lg-row"},[e("p",{staticClass:"h4 col-lg-7 mt-4 mt-md-0 px-5",staticStyle:{"line-height":"40px"}},[this._v("在人人自危的世界，只有擁有最多資源的的人才會是贏家，在這個地下商城裡，傭兵、裝備...應用盡有，所有你要變強的資源都幫你準備好了。讓我們一起重返榮耀吧 !")]),this._v(" "),e("img",{staticClass:"part_img",attrs:{src:i("bM/Q"),width:"472",height:"312",alt:""}})])])])])])}]};var u=i("VU/8")(c,p,!1,function(t){i("mJrl")},null,null);e.default=u.exports},F16r:function(t,e,i){t.exports=i.p+"static/img/center.ed58745.png"},SuS5:function(t,e,i){t.exports=i.p+"static/img/right.6855bc3.png"},VF4g:function(t,e,i){t.exports=i.p+"static/img/leaf2.43ebce6.png"},"bM/Q":function(t,e,i){t.exports=i.p+"static/img/part-img.a38546f.png"},eLsL:function(t,e,i){t.exports=i.p+"static/img/block-bg.54decb8.jpg"},mJrl:function(t,e){}});
//# sourceMappingURL=1.7e460df15fc7da6bc1fa.js.map
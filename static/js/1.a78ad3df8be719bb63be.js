webpackJsonp([1],{"/IG+":function(t,e,s){t.exports=s.p+"static/img/left.5aa85b0.png"},"93YD":function(t,e,s){"use strict";var i={props:{childProductCard:Array,cardSize:Boolean},data:function(){return{carts:[]}},methods:{getProductDetail:function(t){this.$router.push("/detail/"+t)},addToCart:function(t,e){var s=this,i=this;i.$http.get("https://vue-course-api.hexschool.io/api/csc98104/cart").then(function(a){i.carts=a.data.data.carts;var r=i.carts.find(function(t){return t.product.title===e}),n=0;if(r){n=r.qty;var o="https://vue-course-api.hexschool.io/api/csc98104/cart/"+r.id;s.$http.delete(o).then(function(t){console.log(t)})}var c={product_id:t,qty:n+1};s.$http.post("https://vue-course-api.hexschool.io/api/csc98104/cart",{data:c}).then(function(t){i.$bus.$emit("updateCart")})})}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"row"},t._l(t.childProductCard,function(e){return s("div",{key:e.id,staticClass:"col-md-6 col-6 my-3",class:{"col-lg-4":!t.cardSize,"col-lg-3":t.cardSize}},[s("div",{staticClass:"card product-section-bg text-center",staticStyle:{cursor:"pointer"},on:{click:function(s){return t.getProductDetail(e.id)}}},[s("div",{staticClass:"position-relative"},[s("img",{staticClass:"product-img",attrs:{src:e.imageUrl,alt:"..."}}),t._v(" "),s("span",{staticClass:"badge badge-secondary position-absolute",staticStyle:{right:"0",bottom:"0"}},[t._v(t._s(e.category))])]),t._v(" "),s("div",{staticClass:"px-3 py-2"},[s("h4",{staticClass:"card-title"},[t._v(t._s(e.title))]),t._v(" "),s("p",{staticClass:"card-text text-truncate"},[t._v(t._s(e.content))]),t._v(" "),e.price?s("del",{staticClass:"card-text"},[t._v("售價 $ "+t._s(e.origin_price))]):s("span",{staticClass:"card-text"},[t._v("售價 $ "+t._s(e.origin_price))]),t._v(" "),e.price?s("span",{staticClass:"h5 d-inline-block mb-0",staticStyle:{color:"red"}},[t._v("$ "+t._s(e.price))]):t._e()]),t._v(" "),s("div",{staticClass:"d-flex d-md-block pb-0 pb-md-2",staticStyle:{width:"100%"}},[s("a",{staticClass:"btn product-btn product-btn-left",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.getProductDetail(e.id)}}},[t._v("查看更多")]),t._v(" "),s("a",{staticClass:"btn product-btn product-btn-right",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),s.stopPropagation(),t.addToCart(e.id,e.title)}}},[t._v("加入購物")])])])])}),0)])},staticRenderFns:[]},r=s("VU/8")(i,a,!1,null,null,null);e.a=r.exports},Cu23:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("v2ns");var i=s("7QTg"),a=s("tWc7"),r=s("93YD"),n=s("7t+N"),o=s.n(n),c={components:{MarketCart:a.a,ProductCard:r.a,swiper:i.swiper,swiperSlide:i.swiperSlide},data:function(){return{swiperOption:{initialSlide:0,slidesPerView:3,direction:"horizontal",loop:!0,autoplay:!0,speed:1500,navigation:{nextEl:".swiper-button-next.sw",prevEl:".swiper-button-prev.sw"},breakpoints:{576:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:2,spaceBetween:10},992:{slidesPerView:3,spaceBetween:30}}},allProducts:[],BannerSwitch:"專屬傭兵",sizeCol3:!0,fb_Id:[],pageContent:[],isLoading:!1}},created:function(){this.getProducts(),this.getFB_Content()},methods:{getFB_Content:function(){var t=this,e=this;e.isLoading=!0,e.$http.get("https://graph.facebook.com/v6.0/ageEmpireShop/feed?access_token=EAAL5Tx0lRX0BAPWlyqaK1X82SwV29NyW1VPoSfKsI5TiXghZAVugInKEFhuNdWfYsG6DWKg5qrBTOqRnC5QUrIyRQnaGZAu2jZAv3iqFHpZA1gWdyEMxoMEPw9kUgA9frCZArxDKO7h0YZC8fvmA8ZAHaapgI4RXYe0wUhZCrK4NYAZDZD",{header:{"Access-Control-Allow-Origin":"https://graph.facebook.com/","Access-Control-Allow-Methods":get,"Access-Control-Allow-Headers":"X-Requested-With"}}).then(function(s){var i=s.data.data;e.fb_Id=i.map(function(t){return t.id}),e.fb_Id&&t.getFBContent()})},getFBContent:function(){for(var t=this,e=0;e<=t.fb_Id.length;e++){var s="https://graph.facebook.com/v2.2/"+t.fb_Id[e]+"?fields=attachments&access_token=EAAL5Tx0lRX0BAPWlyqaK1X82SwV29NyW1VPoSfKsI5TiXghZAVugInKEFhuNdWfYsG6DWKg5qrBTOqRnC5QUrIyRQnaGZAu2jZAv3iqFHpZA1gWdyEMxoMEPw9kUgA9frCZArxDKO7h0YZC8fvmA8ZAHaapgI4RXYe0wUhZCrK4NYAZDZD";t.$http.get(s,{header:{"Access-Control-Allow-Origin":"https://graph.facebook.com/","Access-Control-Allow-Methods":get,"Access-Control-Allow-Headers":"X-Requested-With"}}).then(function(e){t.pageContent.push(e.data.attachments.data[0]),console.log(e)})}t.isLoading=!1},getProducts:function(){var t=this;t.isLoading=!0,t.$http.get("https://vue-course-api.hexschool.io/api/csc98104/products/all").then(function(e){t.allProducts=e.data.products,t.isLoading=!1})},tempBannerSwitch:function(t){this.BannerSwitch=t.currentTarget.text;var e=o()("#hotProduct").offset().top;o()("html, body").animate({scrollTop:e},800)}},computed:{randomProducts:function(){var t=this,e=t.allProducts.filter(function(e){return t.BannerSwitch===e.category}),s=[];if(e.length<=4)return e;for(var i=0;i<4;i++){var a=Math.floor(Math.random()*e.length);s.push(e[a]),e.splice(a,1)}return s},swiper:function(){return this.$refs.mySwiper.swiper}}},l=window.innerWidth;if(window.screen.availWidth!==l){var d=.5*(l-window.screen.availWidth);console.log(d),setTimeout(function(){document.querySelector("#bannerMove").style.left=d+"px"},10),window.onresize=function(){var t=window.innerWidth;window.innerHeight;if(t!==l){var e=.5*(t-l);document.querySelector("#bannerMove").style.left=(d+e||0)+"px"}else t===l&&(document.querySelector("#bannerMove").style.left="0px")}}else window.onresize=function(){var t=window.innerWidth;window.innerHeight;if(t!==l){var e=.5*(t-l);document.querySelector("#bannerMove").style.left=(e||0)+"px"}else t===l&&(document.querySelector("#bannerMove").style.left="0px")};var p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),t._v(" "),i("main",[i("div",{staticClass:"jumbotron-fluid"},[i("div",{staticClass:"bg-cover main_banner position-relative"},[i("div",{staticClass:"position-absolute position-relative d-none d-md-block",staticStyle:{bottom:"0"},attrs:{id:"bannerMove"}},[i("a",{staticClass:"main_banner_center position-absolute",class:{active:"專屬傭兵"===t.BannerSwitch},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.tempBannerSwitch(e)}}},[i("p",{staticClass:"d-none"},[t._v("專屬傭兵")]),i("img",{staticClass:"img-colorful",attrs:{height:"725",src:s("F16r"),alt:""}})]),t._v(" "),i("a",{staticClass:"main_banner_left position-absolute",class:{active:"獨家技術"===t.BannerSwitch},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.tempBannerSwitch(e)}}},[i("p",{staticClass:"d-none"},[t._v("獨家技術")]),i("img",{staticClass:"img-colorful",attrs:{height:"725",src:s("/IG+"),alt:""}})]),t._v(" "),i("a",{staticClass:"main_banner_right position-absolute",class:{active:"十大建設"===t.BannerSwitch},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.tempBannerSwitch(e)}}},[i("p",{staticClass:"d-none"},[t._v("十大建設")]),i("img",{staticClass:"img-colorful",attrs:{height:"725",src:s("SuS5"),alt:""}})])])])]),t._v(" "),t._m(0),t._v(" "),i("div",{staticClass:"swiper-container",attrs:{id:"news",name:"news"}},[i("img",{staticClass:"swiper-bg",attrs:{src:s("eLsL"),alt:""}}),t._v(" "),i("h3",{staticClass:"position-absolute swiper-news"},[t._v("最新消息")]),t._v(" "),i("swiper",{ref:"mySwiper",staticClass:"swiper-wrapper position-absolute",staticStyle:{top:"0"},attrs:{options:t.swiperOption}},[t._l(t.pageContent,function(e){return i("swiper-slide",{key:e.id},[i("div",{staticClass:"card bg-warning",staticStyle:{width:"15rem"}},[i("a",{attrs:{href:e.url,target:"_blank"}},[i("img",{staticClass:"card-img-top img-cover",attrs:{src:e.media.image.src,height:"200",alt:"臉書粉專圖"}})]),t._v(" "),i("span",{staticClass:"position-absolute h3",staticStyle:{left:"0.5rem",color:"rgba(122, 116, 107, 0.63)"}},[i("i",{staticClass:"fab fa-facebook-square"})]),t._v(" "),i("div",{staticClass:"card-body p-2"},[i("p",{staticClass:"card-text h6",staticStyle:{height:"100px","overflow-y":"auto"},attrs:{id:"scrollbarstyle"}},[t._v(t._s(e.description))])])])])}),t._v(" "),i("div",{staticClass:"swiper-button-prev sw",attrs:{slot:"button-prev"},slot:"button-prev"}),t._v(" "),i("div",{staticClass:"swiper-button-next sw",attrs:{slot:"button-next"},slot:"button-next"})],2),t._v(" "),i("img",{staticStyle:{"z-index":"10",position:"absolute",bottom:"0",left:"-20%",filter:"contrast(100%)"},attrs:{src:s("VF4g"),height:"200",alt:""}})],1),t._v(" "),i("div",{staticClass:"content-product-bg",attrs:{id:"hotProduct"}},[i("div",{staticClass:"container"},[i("ProductCard",{attrs:{childProductCard:t.randomProducts,cardSize:t.sizeCol3}})],1)]),t._v(" "),i("MarketCart")],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bg-cover main_content-bg"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 my-5 justify-content-center d-flex text-white"},[e("h1",{staticClass:"text-warning"},[this._v("世紀帝國: 世紀商城")])]),this._v(" "),e("div",{staticClass:"my-5 part_content-bg"},[e("div",{staticClass:"container d-lg-flex",staticStyle:{height:"100%"}},[e("div",{staticClass:"row align-items-center"},[e("iframe",{staticClass:"part_img col-lg-5 px-0",attrs:{src:"https://www.youtube.com/embed/wRTmEmTMJdw",frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}}),this._v(" "),e("p",{staticClass:"h4 col-lg-7 mt-4 mt-lg-0 px-5",staticStyle:{"line-height":"40px"}},[this._v("在人人自危的世界，只有擁有最多資源的的人才會是贏家，在這個地下商城裡，傭兵、裝備...應用盡有，所有你要變強的資源都幫你準備好了。讓我們一起重返榮耀吧 !")])])])]),this._v(" "),e("div",{staticClass:"my-5 part_content-bg part_content-bgRight"},[e("div",{staticClass:"container d-lg-flex",staticStyle:{height:"100%"}},[e("div",{staticClass:"row align-items-center flex-column-reverse flex-lg-row"},[e("p",{staticClass:"h4 col-lg-7 mt-4 mt-md-0 px-5",staticStyle:{"line-height":"40px"}},[this._v("在人人自危的世界，只有擁有最多資源的的人才會是贏家，在這個地下商城裡，傭兵、裝備...應用盡有，所有你要變強的資源都幫你準備好了。讓我們一起重返榮耀吧 !")]),this._v(" "),e("img",{staticClass:"part_img",attrs:{src:s("bM/Q"),width:"472",height:"312",alt:""}})])])])])])}]};var u=s("VU/8")(c,p,!1,function(t){s("KMWg")},null,null);e.default=u.exports},F16r:function(t,e,s){t.exports=s.p+"static/img/center.ed58745.png"},KMWg:function(t,e){},SuS5:function(t,e,s){t.exports=s.p+"static/img/right.6855bc3.png"},VF4g:function(t,e,s){t.exports=s.p+"static/img/leaf2.43ebce6.png"},"bM/Q":function(t,e,s){t.exports=s.p+"static/img/part-img.a38546f.png"},eLsL:function(t,e,s){t.exports=s.p+"static/img/block-bg.54decb8.jpg"}});
//# sourceMappingURL=1.a78ad3df8be719bb63be.js.map
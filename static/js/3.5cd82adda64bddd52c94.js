webpackJsonp([3],{A2OA:function(t,a,s){t.exports=s.p+"static/media/ageMusic.e1e7bbd.mp3"},Uy5x:function(t,a){},dMef:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e={data:function(){return{clickMute:!1}},methods:{mute:function(){this.clickMute=!this.clickMute,this.clickMute?document.querySelector(".audioPlay").muted=!0:document.querySelector(".audioPlay").muted=!1}}},i={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[t._m(0),t._v(" "),s("a",{staticClass:"bar-c",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.mute(a)}}},[s("div",{staticClass:"bar",class:{noAnim:t.clickMute},attrs:{id:"bar-1"}}),t._v(" "),s("div",{staticClass:"bar",class:{noAnim:t.clickMute},attrs:{id:"bar-2"}}),t._v(" "),s("div",{staticClass:"bar",class:{noAnim:t.clickMute},attrs:{id:"bar-3"}}),t._v(" "),s("div",{staticClass:"bar",class:{noAnim:t.clickMute},attrs:{id:"bar-4"}}),t._v(" "),s("div",{staticClass:"bar",class:{noAnim:t.clickMute},attrs:{id:"bar-5"}}),t._v(" "),s("div",{staticClass:"bar",class:{noAnim:t.clickMute},attrs:{id:"bar-6"}})])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("audio",{staticClass:"audioPlay",attrs:{autoplay:"",loop:"",controls:"",hidden:""}},[a("source",{attrs:{src:s("A2OA")}})])}]};var n={components:{AudioPlay:s("VU/8")(e,i,!1,function(t){s("Uy5x")},null,null).exports},methods:{toNews:function(){this.$router.push("/index"),this.$emit("toNews")}}},r={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("header",{attrs:{id:"headTop"}},[s("nav",{staticClass:"navbar navbar-expand-lg navbar-light header_top-bg justify-content-center d-flex"},[s("div",{staticClass:"d-lg-none"}),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),s("AudioPlay",{staticClass:"ml-auto"}),t._v(" "),s("div",{staticClass:"d-none d-lg-block"},[s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarNavAltMarkup"}},[s("div",{staticClass:"navbar-nav"},[s("router-link",{staticClass:"nav-item nav-link active header_top-text h3 mb-0",attrs:{to:"/login"}},[s("i",{staticClass:"fas fa-sign-in-alt text-warning"})])],1)])])],1),t._v(" "),s("nav",{staticClass:"navbar navbar-expand-lg navbar-light header_button-bg"},[t._m(2),t._v(" "),t._m(3),t._v(" "),s("div",{staticClass:"collapse navbar-collapse mt-2 mt-lg-0",attrs:{id:"navbarNavAltMarkup"}},[s("div",{staticClass:"navbar-nav h5 justify-content-around row flex-row no-gutters",staticStyle:{width:"100%"}},[s("router-link",{staticClass:"nav-item nav-link header_button col-sm-6 col-lg-2",attrs:{to:"/index"}},[s("span",{staticClass:"header_button-text"},[t._v("首頁")])]),t._v(" "),s("a",{staticClass:"nav-item nav-link header_button col-sm-6 col-lg-2",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.toNews(a)}}},[s("span",{staticClass:"header_button-text"},[t._v("最新消息")])]),t._v(" "),s("router-link",{staticClass:"nav-item nav-link header_button col-sm-6 col-lg-2",attrs:{to:"/shop"}},[s("span",{staticClass:"header_button-text"},[t._v("世紀商城")])]),t._v(" "),s("router-link",{staticClass:"nav-item nav-link header_button col-sm-6 col-lg-2",attrs:{to:"/cart"}},[s("span",{staticClass:"header_button-text"},[t._v("購物車")])]),t._v(" "),t._m(4),t._v(" "),s("router-link",{staticClass:"nav-item nav-link header_button col-sm-6 d-lg-none",attrs:{to:"/login"}},[s("span",{staticClass:"header_button-text"},[t._v("登入")])])],1)])])])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"h2 d-none d-lg-block",staticStyle:{position:"relative"}},[a("a",{staticClass:"header_top-text",attrs:{href:"https://www.facebook.com/ageEmpireShop/",target:"_blank"}},[a("i",{staticClass:"fab fa-facebook-square "})]),this._v(" "),a("a",{staticClass:"header_top-text",attrs:{href:"https://github.com/ChiaChiPai",target:"_blank"}},[a("i",{staticClass:"fab fa-github-square"})])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"ml-auto justify-content-center"},[a("a",{attrs:{href:"#"}},[a("img",{attrs:{src:s("nvbl"),alt:""}})])])},function(){var t=this.$createElement,a=this._self._c||t;return a("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation"}},[a("span",{staticClass:"navbar-toggler-icon"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"h2 d-lg-none mb-0"},[a("a",{staticClass:"header_top-text text-dark",attrs:{href:"https://www.facebook.com/ageEmpireShop/",target:"_blank"}},[a("i",{staticClass:"fab fa-facebook-square "})]),this._v(" "),a("a",{staticClass:"header_top-text text-dark",attrs:{href:"https://github.com/ChiaChiPai",target:"_blank"}},[a("i",{staticClass:"fab fa-github-square"})])])},function(){var t=this.$createElement,a=this._self._c||t;return a("a",{staticClass:"nav-item nav-link header_button col-sm-6 col-lg-2",attrs:{href:"https://github.com/ChiaChiPai",target:"_blank"}},[a("span",{staticClass:"header_button-text"},[this._v("關於")])])}]},l=s("VU/8")(n,r,!1,null,null,null).exports,o={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",[a("footer",{staticClass:"footer-bg text-white text-center pt-3"},[a("img",{staticClass:"justify-self-center",attrs:{src:s("qdD0"),height:"100",alt:""}}),this._v(" "),a("p",{staticClass:"d-block"},[this._v("© 2020 PAI. All rights reserved")]),this._v(" "),a("p",{staticClass:"d-block"},[this._v("此網頁為作業練習使用，不做任何商業用途")]),this._v(" "),a("p",{staticClass:"mb-0 pb-3"},[this._v("All images and other content are from Microsoft and internet.")])])])}]},c=s("VU/8")(null,o,!1,null,null,null).exports,u=s("elsE"),v=s("7t+N"),d=s.n(v),h={components:{FrontHeader:l,FrontFooter:c,Alert:u.a},methods:{thisToNews:function(){setTimeout(function(){var t=d()("#news").offset().top;d()("html, body").animate({scrollTop:t},1e3)},100)}}},m={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",[a("Alert"),this._v(" "),a("FrontHeader",{on:{toNews:this.thisToNews}}),this._v(" "),a("router-view"),this._v(" "),a("FrontFooter")],1)},staticRenderFns:[]},f=s("VU/8")(h,m,!1,null,null,null);a.default=f.exports},elsE:function(t,a,s){"use strict";var e={name:"Navbar",data:function(){return{messages:[]}},methods:{updateMessage:function(t,a){var s=Math.floor(new Date/1e3);this.messages.push({message:t,status:a,timestamp:s}),this.removeMessageWithTiming(s)},removeMessage:function(t){this.messages.splice(t,1)},removeMessageWithTiming:function(t){var a=this;setTimeout(function(){a.messages.forEach(function(s,e){s.timestamp===t&&a.messages.splice(e,1)})},5e3)}},created:function(){var t=this;t.$bus.$on("message:push",function(a){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"warning";t.updateMessage(a,s)})}},i={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"message-alert"},t._l(t.messages,function(a,e){return s("div",{key:e,staticClass:"alert alert-dismissible",class:"alert-"+a.status},[t._v("\n    "+t._s(a.message)+"\n    "),s("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(a){return t.removeMessage(e)}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}),0)},staticRenderFns:[]};var n=s("VU/8")(e,i,!1,function(t){s("otdc")},null,null);a.a=n.exports},nvbl:function(t,a,s){t.exports=s.p+"static/img/header.e3f9ab8.png"},otdc:function(t,a){},qdD0:function(t,a,s){t.exports=s.p+"static/img/age1-footer-logo.fecedc4.png"}});
//# sourceMappingURL=3.5cd82adda64bddd52c94.js.map
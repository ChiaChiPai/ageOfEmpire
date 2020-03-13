<template>
  <div>
    <Alert></Alert>
    <FrontHeader @toNews="thisToNews"></FrontHeader>
    <router-view></router-view>
    <FrontFooter></FrontFooter>
  </div>
</template>

<script>
import FrontHeader from "../../components/FrontHeader";
import FrontFooter from "../../components/FrontFooter";
import Alert from '../../components/AlertMessage';
import $ from 'jquery'

export default {
  components: {
    FrontHeader,
    FrontFooter,
    Alert,
  },
  methods:{
    thisToNews(){
      setTimeout(() => {
        var newsPosition = $("#news").offset().top;
        $('html, body').animate({scrollTop:newsPosition},1000);
      }, 100);
      //設定 100 毫秒，等跳轉到首頁後，在把位置移到最新消息的區域
    },
  }
};
</script>

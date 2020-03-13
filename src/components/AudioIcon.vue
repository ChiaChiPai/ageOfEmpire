<template>
  <div>
    <audio class="audioPlay" autoplay loop controls hidden>
      <source src="../assets/voice/ageMusic.mp3">
    </audio>
    <a href="#" class="bar-c" @click.prevent="mute">
      <div id="bar-1" class="bar" :class="{'noAnim':clickMute}"></div>
      <div id="bar-2" class="bar" :class="{'noAnim':clickMute}"></div>
      <div id="bar-3" class="bar" :class="{'noAnim':clickMute}"></div>
      <div id="bar-4" class="bar" :class="{'noAnim':clickMute}"></div>
      <div id="bar-5" class="bar" :class="{'noAnim':clickMute}"></div>
      <div id="bar-6" class="bar" :class="{'noAnim':clickMute}"></div>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return{
      clickMute: false,
    }
  },
  // created(){
  //   this.volumnSet();
  // },
  methods:{
    // volumnSet(){
    //   document.querySelector(".audioPlay").volumn = 0.3;
    // },
    mute(){
      const vm = this;
      vm.clickMute= !vm.clickMute;
      if(vm.clickMute){
        document.querySelector(".audioPlay").muted = true;
      }else{
        document.querySelector(".audioPlay").muted = false;
      }
    }
  },
}
</script>

<style lang="scss">
  .bar-c {
    display: inline-block;
    overflow: hidden;
    height: 30px;
    width: 40px;
    margin: 0 auto;
    position: relative;
    cursor:pointer;
  }
  .bar {
    height: 1px;
    width: 3px;
    display: inline-block;
    background-color: #ffffd2;
    bottom: 0;
    position: absolute;
    
    &.noAnim {
      animation: none;
      animation-name: none;
    }
    
    &#bar-1 { 
      left: 0; 
      animation-name: danceHeight1;
      animation-delay: 0ms;
    }
    &#bar-2 { 
      left: 6px; 
      animation-name: danceHeight2; 
      animation-delay: 300ms;
    }
    &#bar-3 { 
      left: 12px;
      animation-name: danceHeight3;
      animation-delay: 600ms;
    }
    &#bar-4 { 
      left: 18px;
      animation-name: danceHeight4;
      animation-delay: 900ms;
    }
    &#bar-5 { 
      left: 24px;
      animation-name: danceHeight5;
      animation-delay: 1200ms;
    }
    &#bar-6 { 
      left: 30px;
      animation-name: danceHeight6;
      animation-delay: 1500ms;
    }
    
    animation-duration: 500ms;
    animation-play-state: running;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes danceHeight1 {
    from { height: 1px; }
    to { height: 22px; }
  }
  @keyframes danceHeight2 {
    from { height: 1px; }
    to { height: 15px; }
  }
  @keyframes danceHeight3 {
    from { height: 1px; }
    to { height: 30px; }
  }
  @keyframes danceHeight4 {
    from { height: 1px; }
    to { height: 20px; }
  }
  @keyframes danceHeight5 {
    from { height: 1px; }
    to { height: 15px; }
  }
  @keyframes danceHeight6 {
    from { height: 1px; }
    to { height: 15px; }
  }
</style>
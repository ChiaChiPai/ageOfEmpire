<template>
  <div>
    <NavBar></NavBar>
    <Alert></Alert>
    <div class="container" >
      <div class="row">
        <main class="col">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../../components/SideBar';
import NavBar from '../../components/Navbar';
import Alert from '../../components/AlertMessage';

export default {
  components: {
    SideBar,
    NavBar,
    Alert,
  },
};
</script>
<template>
    <div id="app">
      <MyHeader></MyHeader>
      <div class="main-content">
          <router-view/>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
import MyHeader from './components/MyHeader';
import Footer from './components/Footer';

export default {
    components:{
      MyHeader, Footer
    }
}
</script>
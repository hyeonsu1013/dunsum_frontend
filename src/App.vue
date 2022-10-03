<template>
    <div id="app">
      <Header></Header>
      <div class="main-content">
          <router-view/>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
    components:{
      Header, Footer
    }
}
</script>
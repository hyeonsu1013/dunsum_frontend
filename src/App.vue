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
  import app from "./app";
  export default app;
</script>
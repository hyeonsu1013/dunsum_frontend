<template>
      <v-app id="app">
        <DunsumHeader/>
        <v-main>
          <div class="main-content">
              <router-view/>
          </div>
          <Footer></Footer>
        </v-main>
        
              
      </v-app>
</template>

<script>
  import app from "./app";
  export default app;
</script>
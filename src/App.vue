<template>
      <v-app id="app">
        <DunsumHeader/>
        <v-main>
          <div class="main-content">
              <router-view/>
          </div>
          <DunsumFooter/>
        </v-main>
      </v-app>
</template>

<script>
  import app from "./app";
  export default app;
</script>
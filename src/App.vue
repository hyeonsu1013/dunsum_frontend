<template>
      <v-app id="app">
        <dunsum-header></dunsum-header>
        <v-main>
          <v-container fluid>
            <!-- If using vue-router -->
            <div class="main-content">
                <router-view/>
            </div>
          </v-container>
        </v-main>
        <!-- <div class="main-content">
            <router-view/>
        </div> -->
        <Footer></Footer>
      </v-app>
</template>

<script>
  import app from "./app";
  export default app;
</script>
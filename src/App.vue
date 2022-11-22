<template>
  <v-app id="app">
    <DunsumHeader/>
    <v-main>
      <div class="main-content">
          <router-view/>
      </div>
      <DunsumFooter/>
    </v-main>
    <DunsumAlert
      :iconType="alertData.iconType"
      :maxWidth="alertData.maxWidth"
      :btnColorL="alertData.btnColorL"
      :btnColorR="alertData.btnColorR"
      :title="alertData.title"
      :msg="alertData.msg"
      :btnTxtL="alertData.btnTxtL"
      :btnTxtR="alertData.btnTxtR"
      @left="alertData.left"
      :leftParam="alertData.leftParam"
      @right="alertData.right"
      :rightParam="alertData.rightParam"
      ref="dunsumAlert"
    ></DunsumAlert>
  </v-app>
</template>

<script>
  import app from "./app";
  export default app;
</script>
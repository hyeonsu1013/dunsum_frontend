<template>
  <v-dialog v-model="show" :max-width="maxWidth">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ msg }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn v-if="btnTxtL != ''" :color="btnColorL" text @click="left">
          {{ btnTxtL }}
        </v-btn>

        <v-btn v-if="btnTxtR != ''" :color="btnColorR" text @click="right">
          {{ btnTxtR }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DunsumAlert",
  props: {
    iconType : {
      type: String,
      default: "",
    },
    // 알럿 최대 너비
    maxWidth : {
      type: Number,
      default: 300,
    },
    // 제목 입력
    title: {
      type: String,
      default: "",
    },
    // 내용 입력
    msg: {
      type: String,
      default: "",
    },
    // 왼쪽 버튼 색상 지정
    btnColorL: {
      type: String,
      default: "",
    },
    // 하단 좌측 버튼명 지정
    btnTxtL: {
      type: String,
      default: "",
    },
    //left callback 함수 인자
    leftParam: [String, Number, Boolean, Array, Object],
    // 오른쪽 버튼 색상 지정
    btnColorR: {
      type: String,
      default: "",
    },
    // 하단 우측 버튼명 지정
    btnTxtR: {
      type: String,
      default: "확인",
    },
    //right callback 함수 인자
    rightParam: [String, Number, Boolean, Array, Object],
  },
  data() {
    return {
      show : false,
    };
  },
  computed : {},
  watch: {},
  methods: {
    showAlert() {
      this.show = true;
    },
    hideAlert() {
      this.show = false;
      this.initAlertData();
    },
    //하단 좌측 버튼 클릭
    left() {
      this.$emit("left", this.leftParam);
    },
    //하단 우측 버튼 클릭
    right() {
      this.$emit("right", this.rightParam);
    },
  },
  mounted() {},
  created() {},
};
</script>
<template>
  <v-dialog v-model="show" :max-width="maxWidth" ref="popover">
    <v-card>
      <v-card-title v-if="isNotEmpty(title)" class="dl_title pt20 ml10">
        {{ title }}
      </v-card-title>
      <aside class="dl_content" ref="layer">
        <div class="dl_body">
          <v-spacer class="mb10"></v-spacer>
          <slot></slot>
        </div>
      </aside>
      
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
    show: {
      type: Boolean,
      default: false,
    },
    iconType : {
      type: String,
      default: "",
    },
    // 알럿 최대 너비
    maxWidth : {
      type: Number,
      default: 780,
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
      default: "닫기",
    },
    //right callback 함수 인자
    rightParam: [String, Number, Boolean, Array, Object],
  },
  data() {
    return {
      layer: null,
      popover: null,
    };
  },
  computed : {},
  watch: {},
  methods: {
    initPopup(){
      let addClass = this.addClass;

      if (addClass) {
        this.popover.$el.className += " " + addClass;
      }
    },
    //하단 좌측 버튼 클릭
    left() {
      this.$emit("left", this.leftParam);
    },
    //하단 우측 버튼 클릭
    right() {
      this.$emit("right", this.rightParam);
    },
    isNotEmpty(v) {
      return v != null && v!='';
    }
  },
  mounted() {
    this.layer = this.$refs.layer;
    this.popover = this.$refs.popover;
    this.initPopup();
  },
  created() {},
};
</script>
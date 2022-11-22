var globalMixin={
	data(){
		return{}
	},
	methods: {
    // 뒤로가기 막기
    _preventBack() {
      history.pushState(null, null, location.href);
      window.onbeforeunload = null;

      window.onpopstate = function () {
          history.go(1);
      };
    },

    // 알럿 열기
    showAlert(v) {
			this.$root.$children[0].alertData = {...this.$root.$children[0].alertData, ...v};
			this.$root.$children[0].$refs.dunsumAlert.showAlert();
		},
    // 알럿 닫기
		hideAlert() {
			this.$root.$children[0].$refs.dunsumAlert.hideAlert();
		},
	}
}

export default globalMixin;

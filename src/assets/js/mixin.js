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
	}
}

export default globalMixin;
